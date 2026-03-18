> **Path:** Mobile Docs > 🏭 App Factory > Android Keystore

# Android Keystore

Java Keystores (.jks or .keystore) are binary files that serve as repositories of certificates and private keys. In the context of Android, these are used to digitally sign and secure an app. This provides a layer of security that prevents, among other things, remote attackers from pushing malicious updates to your application to market (all updates must be signed with the same key).

The keystore is generated and uploaded with the initial publish to Google Play and is used for all subsequent updates. It essentially denotes ownership, meaning it should not be shared and if it is lost, unless the app is enrolled into Play App Signing, access to the app is also lost.

If you'd like to publish a Rock Mobile app over an existing Android app, the original keystore must be provided to the App Factory team (.jks or .keystore). If you worked with a development partner, you may need to reach out and get the keystore from them. In some cases, development partners use the same keystore to publish multiple apps, meaning they will not release the keystore to you. In this case, you will be required to publish a brand new app in the Google Play store.

### Android App Bundle

As of August 2021, all new apps published to Google Play must use [Android App Bundle](https://developer.android.com/guide/app-bundle) which is a publishing format that includes all your app’s compiled code and resources, and defers APK generation and signing to Google Play.

Google Play uses your app bundle to generate and serve optimized APKs for each device configuration, so only the code and resources that are needed for a specific device are downloaded to run your app. You no longer have to build, sign, and manage multiple APKs to optimize support for different devices, and users get smaller, more optimized downloads.

App Factory will configure your Android app to use Android App Bundle for publishing.

### Play App Signing

With [Play App Signing](https://developer.android.com/studio/publish/app-signing#app-signing-google-play), Google manages and protects your app's signing key for you and uses it to sign your APKs for distribution. And, because app bundles defer building and signing APKs to the Google Play Store, you need to configure Play App Signing before you upload your app bundle. Doing so lets you benefit from the following:

-   Use the Android App Bundle and support Google Play’s advanced delivery modes. The Android App Bundle makes your app much smaller, your releases simpler, and makes it possible to use feature modules and offer instant experiences.
-   Increase the security of your signing key, and make it possible to use a separate upload key to sign the app bundle you upload to Google Play.
-   One time key upgrade for new installs lets you change your app signing key in case your existing one is compromised or if you need to migrate to a cryptographically stronger key

App Factory will enroll your Android app into Play App Signing.
