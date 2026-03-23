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
import org.json.JSONObject
import java.util.Calendar

class MainActivity : AppCompatActivity() {

    private lateinit var webView: WebView
    private lateinit var swipe: SwipeRefreshLayout
    private var fileCallback: ValueCallback<Array<Uri>>? = null
    private var pendingPermissionAction: (() -> Unit)? = null

    // ── Expiry: ২০২৬ এপ্রিল ২৪ ───────────────────────────────────────
    private val EXPIRY_YEAR  = 2026
    private val EXPIRY_MONTH = 3   // Calendar.APRIL = 3 (0-based)
    private val EXPIRY_DAY   = 24

    private fun isExpired(): Boolean {
        val now = Calendar.getInstance()
        val exp = Calendar.getInstance().apply {
            set(EXPIRY_YEAR, EXPIRY_MONTH, EXPIRY_DAY, 0, 0, 0)
        }
        return now.after(exp)
    }

    private fun showExpiryDialog() {
        AlertDialog.Builder(this)
            .setTitle("⏰ টেস্ট সময়কাল শেষ")
            .setMessage("এই টেস্ট ভার্সনের মেয়াদ ২৪ এপ্রিল ২০২৬ তারিখে শেষ হয়েছে।\n\nনতুন ভার্সনের জন্য MR IT LTD-এর সাথে যোগাযোগ করুন।")
            .setCancelable(false)
            .setPositiveButton("বন্ধ করুন") { _, _ -> finishAffinity() }
            .show()
    }

    // ── Activity Result Launchers ────────────────────────────────────
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
        if (granted) pendingPermissionAction?.invoke()
        else jsCallback("window._permDenied('audio')")
        pendingPermissionAction = null
    }

    private val cameraPermLauncher = registerForActivityResult(
        ActivityResultContracts.RequestPermission()
    ) { granted ->
        if (granted) pendingPermissionAction?.invoke()
        else jsCallback("window._permDenied('camera')")
        pendingPermissionAction = null
    }

    private val storagePermLauncher = registerForActivityResult(
        ActivityResultContracts.RequestMultiplePermissions()
    ) { perms ->
        if (perms.values.any { it }) pendingPermissionAction?.invoke()
        else jsCallback("window._permDenied('storage')")
        pendingPermissionAction = null
    }

    private val notifPermLauncher = registerForActivityResult(
        ActivityResultContracts.RequestPermission()
    ) { }

    // ── onCreate ─────────────────────────────────────────────────────
    @SuppressLint("SetJavaScriptEnabled")
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        // মেয়াদ শেষ হলে অ্যাপ বন্ধ
        if (isExpired()) {
            setContentView(android.R.layout.simple_list_item_1)
            showExpiryDialog()
            return
        }

        setContentView(R.layout.activity_main)

        webView = findViewById(R.id.webView)
        swipe   = findViewById(R.id.swipeRefresh)
        swipe.setColorSchemeResources(R.color.accent)
        swipe.setOnRefreshListener { webView.reload() }

        setupWebView()

        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.TIRAMISU &&
            ContextCompat.checkSelfPermission(this, Manifest.permission.POST_NOTIFICATIONS)
                != PackageManager.PERMISSION_GRANTED) {
            notifPermLauncher.launch(Manifest.permission.POST_NOTIFICATIONS)
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
            userAgentString = "BDAiApp/1.0.0 Android/${Build.VERSION.RELEASE}"
        }

        webView.addJavascriptInterface(NativeBridge(), "Native")

        webView.webViewClient = object : WebViewClient() {
            override fun onPageStarted(v: WebView?, url: String?, f: android.graphics.Bitmap?) {
                swipe.isRefreshing = true
            }
            override fun onPageFinished(v: WebView?, url: String?) {
                swipe.isRefreshing = false
                injectPremiumUser()
            }
            override fun onReceivedError(v: WebView?, r: WebResourceRequest?, e: WebResourceError?) {
                swipe.isRefreshing = false
            }
            override fun shouldOverrideUrlLoading(v: WebView?, r: WebResourceRequest?): Boolean {
                val url = r?.url?.toString() ?: return false
                if (url.startsWith("file://")) return false
                try { startActivity(Intent(Intent.ACTION_VIEW, Uri.parse(url))) } catch (_: Exception) {}
                return true
            }
        }

        webView.webChromeClient = object : WebChromeClient() {
            override fun onPermissionRequest(req: PermissionRequest?) { req?.grant(req.resources) }
            override fun onConsoleMessage(m: ConsoleMessage?): Boolean = true
            override fun onShowFileChooser(wv: WebView?, cb: ValueCallback<Array<Uri>>?, p: FileChooserParams?): Boolean {
                fileCallback?.onReceiveValue(null); fileCallback = cb
                fileChooserLauncher.launch(p?.createIntent()); return true
            }
        }
    }

    // ── Premium User Inject (Firebase ছাড়া) ─────────────────────────
    private fun injectPremiumUser() {
        val deviceId = android.provider.Settings.Secure.getString(
            contentResolver, android.provider.Settings.Secure.ANDROID_ID
        )
        val j = JSONObject().apply {
            put("uid",   deviceId)
            put("email", "")
            put("name",  "BDAi User")
            put("photo", "")
            put("token", "test_mode_no_firebase")
            put("plan",  "premium")
        }
        jsCallback("window._nativeAuth($j)")
    }

    // ── JS Bridge ────────────────────────────────────────────────────
    inner class NativeBridge {

        @JavascriptInterface
        fun googleLogin() = runOnUiThread { injectPremiumUser() }

        @JavascriptInterface
        fun logout() = runOnUiThread {
            webView.clearCache(false)
            webView.loadUrl("file:///android_asset/index.html")
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
            startActivity(Intent.createChooser(
                Intent(Intent.ACTION_SEND).apply { this.type = "text/plain"; putExtra(Intent.EXTRA_TEXT, text) },
                "শেয়ার করুন"
            ))
        }

        @JavascriptInterface
        fun vibrate(ms: Long) {
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.S) {
                (getSystemService(VIBRATOR_MANAGER_SERVICE) as android.os.VibratorManager)
                    .defaultVibrator.vibrate(android.os.VibrationEffect.createOneShot(ms, android.os.VibrationEffect.DEFAULT_AMPLITUDE))
            } else {
                @Suppress("DEPRECATION")
                (getSystemService(VIBRATOR_SERVICE) as android.os.Vibrator).let { v ->
                    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O)
                        v.vibrate(android.os.VibrationEffect.createOneShot(ms, android.os.VibrationEffect.DEFAULT_AMPLITUDE))
                    else @Suppress("DEPRECATION") v.vibrate(ms)
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
            catch (_: Exception) { startActivity(Intent(Intent.ACTION_VIEW,
                Uri.parse("https://play.google.com/store/apps/details?id=$packageName"))) }
        }
    }

    // ── Permission Helpers ───────────────────────────────────────────
    private fun hasPerm(p: String) =
        ContextCompat.checkSelfPermission(this, p) == PackageManager.PERMISSION_GRANTED

    private fun requestAudioPerm(onGranted: (() -> Unit)? = null) {
        if (hasPerm(Manifest.permission.RECORD_AUDIO)) { onGranted?.invoke(); return }
        pendingPermissionAction = onGranted
        audioPermLauncher.launch(Manifest.permission.RECORD_AUDIO)
    }

    private fun requestCameraPerm(onGranted: (() -> Unit)? = null) {
        if (hasPerm(Manifest.permission.CAMERA)) { onGranted?.invoke(); return }
        pendingPermissionAction = onGranted
        cameraPermLauncher.launch(Manifest.permission.CAMERA)
    }

    private fun requestStoragePerm(onGranted: (() -> Unit)? = null) {
        val perms = if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.TIRAMISU)
            arrayOf(Manifest.permission.READ_MEDIA_IMAGES)
        else arrayOf(Manifest.permission.READ_EXTERNAL_STORAGE)
        if (perms.all { hasPerm(it) }) { onGranted?.invoke(); return }
        pendingPermissionAction = onGranted
        storagePermLauncher.launch(perms)
    }

    private fun jsCallback(js: String) = runOnUiThread { webView.evaluateJavascript(js, null) }

    @Deprecated("Deprecated in Java")
    override fun onBackPressed() {
        if (webView.canGoBack()) webView.goBack()
        else jsCallback("window._onBack()")
    }

    override fun onResume()  { super.onResume();  webView.onResume()  }
    override fun onPause()   { super.onPause();   webView.onPause()   }
    override fun onDestroy() { webView.destroy(); super.onDestroy()   }
}
