> **Path:** Mobile Docs > 🏭 App Factory > Publishing Requirements

# Publishing Requirements

A brief review of the policies and requirements by Apple and Google for apps to be published.

[App Store Review Guidelines](https://developer.apple.com/app-store/review/guidelines/)

[Google Play Developer Policy Center](https://play.google.com/about/developer-content-policy/)

## Account Deletion

Applev5.1.1

This requirement for account deletion was enforced starting on July 30, 2022. You can read more about this [policy here](https://developer.apple.com/app-store/review/guidelines/#5.1.1v). In summary, any app that supports account creation must also offer account deletion within the app. How you decide to implement this is up to you, but here are some recommendations that have been approved by Apple previously.

Most people configure a new workflow in Rock that confirms the account information and provides verbiage surrounding the deletion process. This form can be added to the mobile app via the Workflow Entry block. Upon submission, the workflow could notify a mailbox via email. You might choose to follow up with the individual or simply process their request without interaction. Typically, you'll want to merge the individual with the Anonymous Giver account.

Note

You may need to provide contribution statements or other information the individual needs since they won't have access to sign in once processed.

GoogleApril 2023

"To give users more control over their data, we're introducing a new account deletion requirement under our [User Data policy](https://support.google.com/googleplay/android-developer/answer/13316080). If your app allows users to create an account, then it must also allow users to request for their account to be deleted in the app and through a web resource."

Prior to requesting a Shell Update or App Factory Publish, please ensure that you have a deletion request feature on both Mobile and Web in accordance with the aforementioned platform requirements.

## Audio Playback

Apple

The shell has a built-in setting enabled for background audio playback. This cannot be turned off and must be in use to publish a Rock Mobile app on Apple's App Store. If you don't have audio playback in your app, you will need to temporarily add something in order to get the app approved.

In general, the audio content itself doesn't really matter, so you can add something relevant to your app and initiate playback with the [PlayAudio](https://community.rockrms.com/developer/mobile-docs/essentials/commands/media-commands#playaudio) command. Optionally, you can leave this in your app and conditionally show this to the account that Apple uses to review the app via Lava, though we'd recommend against this being on the Home page to avoid additional performance overhead.

## European Digital Service Act (DSA)

Warning

App Factory cannot provide legal advice on the declaration of trader vs. non-trader status.

##### Resources

-   [European Commission DSA Overview](https://commission.europa.eu/strategy-and-policy/priorities-2019-2024/europe-fit-digital-age/digital-services-act_en)
-   [Apple Developer DSA Information](https://developer.apple.com/help/app-store-connect/manage-compliance-information/manage-european-union-digital-services-act-compliance-information/)
-   [Google Play Store DSA Information](https://developer.chrome.com/docs/webstore/program-policies/trader-disclosure)

The Digital Service Act protects consumers rights online. To do this, any individual, organization, or corporation who provides a good or service must provide additional information on any platform they use. To make this determination, the DSA requires individuals, organizations, and companies to declare themselves as a "Trader" or "Non-Trader".

"The DSA defines a trader as “any natural person, or any legal person irrespective of whether privately or publicly owned, who is acting, including through any person acting in his or her name or on his or her behalf, for purposes relating to his or her trade, business, craft or profession.” If you have questions about your status as a trader, consult with your legal advisor." In the case of App Factory and the Google Play Store/Apple App Store, this new requirement must be declared to update, create, or retain applications within the respective stores.
