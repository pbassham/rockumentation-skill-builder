> **Path:** Mobile Docs > 🏭 App Factory > In-App Giving

# In-App Giving

As of shell v7.0, Rock Mobile has native controls for in-app giving:

[Giving](https://community.rockrms.com/developer/mobile-docs/essentials/blocks/finance/giving)

Optionally, it's possible your giving platform could be integrated into your app through an embedded web view. If you go this route, it is recommended to style this page in a way that does not compete with the native navbar (or tab bar). This configuration and approval process is the responsibility of the submitting church, their support partner, and the giving platform. The submission information required by Apple and Google must be provided to App Factory before we'll be able to submit. Rejection fees may apply.

Important

In order for native or WebView giving to be approved by Apple, you'll need to register as a non-profit with [Benevity](https://benevity.com/). Through this registration, information will be provided that is required during the App Factory publishing process.  

**Benevity Requirements**

-   Charity Id
-   Certification Date
-   Link to Certificate

According to Apple Policy 3.2.1 (vi), Apple Pay is required for nonprofit fundraising: [https://developer.apple.com/app-store/review/guidelines/#other-business-model-issues](https://developer.apple.com/app-store/review/guidelines/#other-business-model-issues)

If Apple Pay + native giving or a WebView aren't an option, the app must link out to an external browser using the OpenExternalBrowser navigation command to comply with Apple and Google's payment policies.
