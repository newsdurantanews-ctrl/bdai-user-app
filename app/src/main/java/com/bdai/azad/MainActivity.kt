package com.bdai.azad

import android.Manifest
import android.annotation.SuppressLint
import android.app.AlertDialog
import android.content.Intent
import android.content.pm.PackageManager
import android.net.Uri
import android.os.Build
import android.os.Bundle
import android.webkit.*
import android.widget.Toast
import androidx.activity.result.contract.ActivityResultContracts
import androidx.appcompat.app.AppCompatActivity
import androidx.core.content.ContextCompat
import androidx.swiperefreshlayout.widget.SwipeRefreshLayout
import com.google.android.gms.auth.api.signin.*
import com.google.android.gms.common.api.ApiException
import com.google.firebase.auth.*
import com.google.firebase.firestore.*
import com.google.firebase.Timestamp
import org.json.JSONObject

class MainActivity : AppCompatActivity() {

    private lateinit var webView: WebView
    private lateinit var swipe: SwipeRefreshLayout
    private lateinit var auth: FirebaseAuth
    private lateinit var db: FirebaseFirestore
    private lateinit var gsc: GoogleSignInClient
    private var fileCallback: ValueCallback<Array<Uri>>? = null
    private var pendingPermissionAction: (() -> Unit)? = null

    // ── Activity Result Launchers ────────────────────────────────────
    private val googleSignInLauncher = registerForActivityResult(
        ActivityResultContracts.StartActivityForResult()
    ) { result ->
        try {
            val acc = GoogleSignIn.getSignedInAccountFromIntent(result.data)
                .getResult(ApiException::class.java)
            firebaseAuthWithGoogle(acc.idToken!!)
        } catch (e: ApiException) {
            jsCallback("window._authError('Google Sign-In failed: ${e.statusCode}')")
        }
    }

    private val fileChooserLauncher = registerForActivityResult(
        ActivityResultContracts.StartActivityForResult()
    ) { result ->
        fileCallback?.onReceiveValue(
            WebChromeClient.FileChooserParams.parseResult(result.resultCode, result.data)
        )
        fileCallback = null
    }

    private val audioPermLauncher = registerForActivityResult(
        ActivityResultContracts.RequestPermission()
    ) { granted ->
        if (granted) { pendingPermissionAction?.invoke() }
        else { jsCallback("window._permDenied('audio')") }
        pendingPermissionAction = null
    }

    private val cameraPermLauncher = registerForActivityResult(
        ActivityResultContracts.RequestPermission()
    ) { granted ->
        if (granted) { pendingPermissionAction?.invoke() }
        else { jsCallback("window._permDenied('camera')") }
        pendingPermissionAction = null
    }

    private val storagePermLauncher = registerForActivityResult(
        ActivityResultContracts.RequestMultiplePermissions()
    ) { perms ->
        if (perms.values.any { it }) { pendingPermissionAction?.invoke() }
        else { jsCallback("window._permDenied('storage')") }
        pendingPermissionAction = null
    }

    private val notifPermLauncher = registerForActivityResult(
        ActivityResultContracts.RequestPermission()
    ) { /* Notification is optional, no callback needed */ }

    // ── onCreate ─────────────────────────────────────────────────────
    @SuppressLint("SetJavaScriptEnabled")
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        auth = FirebaseAuth.getInstance()
        db = FirebaseFirestore.getInstance()

        val gso = GoogleSignInOptions.Builder(GoogleSignInOptions.DEFAULT_SIGN_IN)
            .requestIdToken(getString(R.string.default_web_client_id))
            .requestEmail()
            .build()
        gsc = GoogleSignIn.getClient(this, gso)

        webView = findViewById(R.id.webView)
        swipe = findViewById(R.id.swipeRefresh)
        swipe.setColorSchemeResources(R.color.accent)
        swipe.setOnRefreshListener { webView.reload() }

        setupWebView()

        // Ask notification permission (Android 13+ only)
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.TIRAMISU) {
            if (ContextCompat.checkSelfPermission(this, Manifest.permission.POST_NOTIFICATIONS)
                != PackageManager.PERMISSION_GRANTED) {
                notifPermLauncher.launch(Manifest.permission.POST_NOTIFICATIONS)
            }
        }

        webView.loadUrl("file:///android_asset/index.html")
    }

    @SuppressLint("SetJavaScriptEnabled")
    private fun setupWebView() {
        webView.settings.apply {
            javaScriptEnabled = true
            domStorageEnabled = true
            allowFileAccess = true
            allowContentAccess = true
            loadWithOverviewMode = true
            useWideViewPort = true
            setSupportZoom(false)
            builtInZoomControls = false
            displayZoomControls = false
            mediaPlaybackRequiresUserGesture = false
            cacheMode = WebSettings.LOAD_DEFAULT
            mixedContentMode = WebSettings.MIXED_CONTENT_NEVER_ALLOW
            safeBrowsingEnabled = true
            userAgentString = "BDAiApp/1.0.0 Android/${Build.VERSION.RELEASE}"
        }

        webView.addJavascriptInterface(NativeBridge(), "Native")

        webView.webViewClient = object : WebViewClient() {
            override fun onPageStarted(v: WebView?, url: String?, f: android.graphics.Bitmap?) {
                swipe.isRefreshing = true
            }
            override fun onPageFinished(v: WebView?, url: String?) {
                swipe.isRefreshing = false
                // Send auth if already signed in
                auth.currentUser?.let { sendAuthToWebView(it) }
            }
            override fun onReceivedError(v: WebView?, r: WebResourceRequest?, e: WebResourceError?) {
                swipe.isRefreshing = false
            }
            override fun shouldOverrideUrlLoading(v: WebView?, r: WebResourceRequest?): Boolean {
                val url = r?.url?.toString() ?: return false
                if (url.startsWith("file://") || url.contains("googleapis.com") ||
                    url.contains("firebase") || url.contains("gstatic.com")) return false
                try { startActivity(Intent(Intent.ACTION_VIEW, Uri.parse(url))) } catch (_: Exception) {}
                return true
            }
        }

        webView.webChromeClient = object : WebChromeClient() {
            override fun onPermissionRequest(req: PermissionRequest?) { req?.grant(req.resources) }
            override fun onConsoleMessage(m: ConsoleMessage?): Boolean = true
            override fun onShowFileChooser(wv: WebView?, cb: ValueCallback<Array<Uri>>?, p: FileChooserParams?): Boolean {
                fileCallback?.onReceiveValue(null)
                fileCallback = cb
                fileChooserLauncher.launch(p?.createIntent())
                return true
            }
        }
    }

    // ── JavaScript Bridge ────────────────────────────────────────────
    inner class NativeBridge {

        @JavascriptInterface
        fun googleLogin() = runOnUiThread { googleSignInLauncher.launch(gsc.signInIntent) }

        @JavascriptInterface
        fun logout() {
            auth.signOut(); gsc.signOut()
            runOnUiThread {
                webView.clearCache(false)
                webView.loadUrl("file:///android_asset/index.html")
            }
        }

        @JavascriptInterface
        fun requestPermission(type: String) = runOnUiThread {
            when (type) {
                "audio"   -> requestAudioPerm()
                "camera"  -> requestCameraPerm()
                "storage" -> requestStoragePerm()
            }
        }

        @JavascriptInterface
        fun hasPermission(type: String): Boolean = when (type) {
            "audio"   -> hasPerm(Manifest.permission.RECORD_AUDIO)
            "camera"  -> hasPerm(Manifest.permission.CAMERA)
            "storage" -> if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.TIRAMISU)
                hasPerm(Manifest.permission.READ_MEDIA_IMAGES)
            else hasPerm(Manifest.permission.READ_EXTERNAL_STORAGE)
            else -> false
        }

        @JavascriptInterface
        fun copy(text: String) {
            val cm = getSystemService(CLIPBOARD_SERVICE) as android.content.ClipboardManager
            cm.setPrimaryClip(android.content.ClipData.newPlainText("BDAi", text))
            runOnUiThread { Toast.makeText(this@MainActivity, "✅ কপি হয়েছে!", Toast.LENGTH_SHORT).show() }
        }

        @JavascriptInterface
        fun share(text: String) = runOnUiThread {
            startActivity(Intent.createChooser(Intent(Intent.ACTION_SEND).apply {
                this.type = "text/plain"; putExtra(Intent.EXTRA_TEXT, text)
            }, "শেয়ার করুন"))
        }

        @JavascriptInterface
        fun vibrate(ms: Long) {
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.S) {
                (getSystemService(VIBRATOR_MANAGER_SERVICE) as android.os.VibratorManager)
                    .defaultVibrator.vibrate(
                        android.os.VibrationEffect.createOneShot(ms, android.os.VibrationEffect.DEFAULT_AMPLITUDE)
                    )
            } else {
                @Suppress("DEPRECATION")
                (getSystemService(VIBRATOR_SERVICE) as android.os.Vibrator).let { v ->
                    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
                        v.vibrate(android.os.VibrationEffect.createOneShot(ms, android.os.VibrationEffect.DEFAULT_AMPLITUDE))
                    } else {
                        @Suppress("DEPRECATION") v.vibrate(ms)
                    }
                }
            }
        }

        @JavascriptInterface fun version(): String = BuildConfig.VERSION_NAME
        @JavascriptInterface fun versionCode(): Int = BuildConfig.VERSION_CODE
        @JavascriptInterface fun deviceId(): String =
            android.provider.Settings.Secure.getString(contentResolver, android.provider.Settings.Secure.ANDROID_ID)

        @JavascriptInterface
        fun openSettings() = runOnUiThread {
            startActivity(Intent(android.provider.Settings.ACTION_APPLICATION_DETAILS_SETTINGS,
                Uri.fromParts("package", packageName, null)))
        }

        @JavascriptInterface
        fun rateApp() = runOnUiThread {
            try { startActivity(Intent(Intent.ACTION_VIEW, Uri.parse("market://details?id=$packageName"))) }
            catch (_: Exception) { startActivity(Intent(Intent.ACTION_VIEW, Uri.parse("https://play.google.com/store/apps/details?id=$packageName"))) }
        }
    }

    // ── Permission Helpers ───────────────────────────────────────────
    private fun hasPerm(p: String) = ContextCompat.checkSelfPermission(this, p) == PackageManager.PERMISSION_GRANTED

    private fun requestAudioPerm(onGranted: (() -> Unit)? = null) {
        if (hasPerm(Manifest.permission.RECORD_AUDIO)) { onGranted?.invoke(); return }
        if (shouldShowRequestPermissionRationale(Manifest.permission.RECORD_AUDIO)) {
            AlertDialog.Builder(this)
                .setTitle(getString(R.string.perm_audio_title))
                .setMessage(getString(R.string.perm_audio_msg))
                .setPositiveButton("অনুমতি দিন") { _, _ -> pendingPermissionAction = onGranted; audioPermLauncher.launch(Manifest.permission.RECORD_AUDIO) }
                .setNegativeButton(getString(R.string.cancel)) { _, _ -> jsCallback("window._permDenied('audio')") }
                .show()
        } else {
            pendingPermissionAction = onGranted
            audioPermLauncher.launch(Manifest.permission.RECORD_AUDIO)
        }
    }

    private fun requestCameraPerm(onGranted: (() -> Unit)? = null) {
        if (hasPerm(Manifest.permission.CAMERA)) { onGranted?.invoke(); return }
        if (shouldShowRequestPermissionRationale(Manifest.permission.CAMERA)) {
            AlertDialog.Builder(this)
                .setTitle(getString(R.string.perm_camera_title))
                .setMessage(getString(R.string.perm_camera_msg))
                .setPositiveButton("অনুমতি দিন") { _, _ -> pendingPermissionAction = onGranted; cameraPermLauncher.launch(Manifest.permission.CAMERA) }
                .setNegativeButton(getString(R.string.cancel)) { _, _ -> jsCallback("window._permDenied('camera')") }
                .show()
        } else {
            pendingPermissionAction = onGranted
            cameraPermLauncher.launch(Manifest.permission.CAMERA)
        }
    }

    private fun requestStoragePerm(onGranted: (() -> Unit)? = null) {
        val perms = if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.TIRAMISU)
            arrayOf(Manifest.permission.READ_MEDIA_IMAGES)
        else arrayOf(Manifest.permission.READ_EXTERNAL_STORAGE)
        if (perms.all { hasPerm(it) }) { onGranted?.invoke(); return }
        pendingPermissionAction = onGranted
        storagePermLauncher.launch(perms)
    }

    // ── Firebase Auth ────────────────────────────────────────────────
    private fun firebaseAuthWithGoogle(idToken: String) {
        auth.signInWithCredential(GoogleAuthProvider.getCredential(idToken, null))
            .addOnSuccessListener { result ->
                val u = result.user ?: return@addOnSuccessListener
                val isNew = result.additionalUserInfo?.isNewUser == true
                val now = Timestamp.now()
                val data: MutableMap<String, Any> = mutableMapOf(
                    "uid" to u.uid, "email" to (u.email ?: ""),
                    "name" to (u.displayName ?: ""), "photo" to (u.photoUrl?.toString() ?: ""),
                    "plan" to "free", "role" to "user", "updatedAt" to now,
                    "dailyUsage" to mapOf("chat" to 0,"image" to 0,"code" to 0,"video" to 0),
                    "lastResetDate" to now
                )
                if (isNew) { data["createdAt"] = now }
                db.collection("users").document(u.uid)
                    .set(data, SetOptions.merge())
                    .addOnSuccessListener { sendAuthToWebView(u) }
                    .addOnFailureListener { e -> jsCallback("window._authError('${e.message}')") }
            }
            .addOnFailureListener { e -> jsCallback("window._authError('${e.message}')") }
    }

    private fun sendAuthToWebView(u: FirebaseUser) {
        u.getIdToken(false).addOnSuccessListener { tokenResult ->
            val j = JSONObject().apply {
                put("uid", u.uid); put("email", u.email ?: "")
                put("name", u.displayName ?: ""); put("photo", u.photoUrl?.toString() ?: "")
                put("token", tokenResult.token ?: "")
            }
            jsCallback("window._nativeAuth($j)")
        }.addOnFailureListener {
            val j = JSONObject().apply {
                put("uid", u.uid); put("email", u.email ?: "")
                put("name", u.displayName ?: ""); put("photo", ""); put("token", "")
            }
            jsCallback("window._nativeAuth($j)")
        }
    }

    private fun jsCallback(js: String) = runOnUiThread { webView.evaluateJavascript(js, null) }

    // ── Back Button ──────────────────────────────────────────────────
    @Deprecated("Deprecated in Java")
    override fun onBackPressed() {
        if (webView.canGoBack()) webView.goBack()
        else jsCallback("window._onBack()")
    }

    override fun onResume()  { super.onResume();  webView.onResume()  }
    override fun onPause()   { super.onPause();   webView.onPause()   }
    override fun onDestroy() { webView.destroy(); super.onDestroy()   }
}
