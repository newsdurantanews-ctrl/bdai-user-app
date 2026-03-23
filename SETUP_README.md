# BDAi User App — Play Store Setup Guide

## ✅ Step 1: GitHub Secrets সেট করুন

Repo → Settings → Secrets → Actions → New secret:

| Secret Name | Value |
|-------------|-------|
| `KEYSTORE_BASE64` | `KEYSTORE_BASE64_FOR_GITHUB_SECRET.txt` এর content |
| `KEYSTORE_PASS` | `BDAi@2024#Azad` |
| `KEY_ALIAS` | `bdai_release` |
| `KEY_PASS` | `BDAi@2024#Azad` |

## ✅ Step 2: Firebase Console এ SHA-1 যোগ করুন

Firebase Console → Project Settings → Your Apps → Add fingerprint:

```
SHA-1:   C8:89:71:5A:A2:05:72:82:A6:7E:D3:AC:68:F9:4B:C8:B2:F3:F8:F7
SHA-256: 84:E2:39:A9:5D:28:12:8C:5E:63:B5:AD:7A:12:31:D5:72:2B:70:34:3B:FB:E4:C1:EA:54:70:84:E6:DD:80:AA
```

⚠️ SHA-1 যোগ না করলে Google Sign-In কাজ করবে না!

## ✅ Step 3: Firebase Services চালু করুন

Firebase Console তে:
1. Authentication → Sign-in method → Google → Enable
2. Firestore Database → Create (Production mode)
3. Cloud Messaging → Auto enabled
4. Rules → Paste করুন (নিচে দেওয়া আছে)

## ✅ Step 4: Firestore Rules

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{uid} {
      allow read, write: if request.auth.uid == uid;
    }
    match /config/{doc} {
      allow read: if request.auth != null;
      allow write: if false; // only admin writes
    }
    match /payment_requests/{id} {
      allow create: if request.auth != null;
      allow read: if request.auth.uid == resource.data.uid;
    }
    match /knowledge/{id} {
      allow read: if request.auth != null;
      allow write: if false;
    }
  }
}
```

## ✅ Step 5: Play Store Submission

1. Google Play Console → Create app
2. Package name: `com.bdai.azad`
3. Upload: `BDAi-release-*.apk`
4. Content rating: Everyone
5. Privacy Policy URL দিন

## 🔑 Keystore Info (গোপন রাখুন!)

- File: `app/bdai-release.keystore`
- Alias: `bdai_release`
- Store password: `BDAi@2024#Azad`
- Key password: `BDAi@2024#Azad`

⚠️ এই keystore হারালে Play Store এ update দিতে পারবেন না!
