> **Path:** Mobile Docs > 🧱 Essentials > Blocks > CMS > Login

# Login

The block used to log an individual in to your mobile application.

The purpose of this block is pretty obvious, but in case you are unsure, it is to log a registered individual into your application using a Rock credential.

If you need to set up registration, check out the [Register](https://community.rockrms.com/developer/mobile-docs/essentials/blocks/cms/register) or [Onboard Person](https://community.rockrms.com/developer/mobile-docs/essentials/blocks/security/onboard-person) blocks.

### Login Page App Settings

When you create an instance of the `Login` block, it would be a good idea to also set the `Login Page` application setting. This allows the app to perform auto-security redirects and is used in a couple of other places functionally.

![](https://community.rockrms.com/GetImage.ashx?Id=66829)

![](https://community.rockrms.com/GetImage.ashx?Id=66830)

### Settings

| Property | Description |
| --- | --- |
| Registration Page | The mobile page to open when the Register button is tapped. Leave this option blank if you want to hide the Register button. |
| Forgot Password URL | The URL that is opened in an external browser when the Forgot Password button is pressed. Leave this option blank if you want to hide the forgot password button. *This URL is typically* *\[\[ YourRootDomain \]\]/ForgotUserName* |
| Confirmation Page | Set to a web page on your public site that has been configured to handle account confirmation. If this option is left unset, it will not send the communication configured to confirm an account. *External Homepage > Support Pages > Account Confirmation* |
| Confirm Account Template | Set to the communication template you wish to use when an individual needs to confirm their account. If the Confirmation Page is not set, this communication will not be delivered. |
| Return Page Mv3.0 | The page to return to after an individual has successfully logged in. If this is not set, it will default to the Home page. |
| Cancel Page M v3.0 | The page to return to after tapping the Cancel button. If this is not set, it will default to the Home page. |

### Page Parameters

The following page parameters are recognized by the `Login` block.

| Key | Type | Description |
| --- | --- | --- |
| ReturnPage | Guid | The page to show once login has successfully completed. Takes precedence over the block setting. |

### External Authentication

| Use Embedded Web View For External Authentication C v17.1 |   This will change (in Microsoft Entra only) the logic to use an external browser instead of an internal one. For Fido2/Passkey support, this must be set to false.   |
| --- | --- |

Listed below is the corresponding documentation for every external authentication provider that can be integrated with Rock Mobile.

[Using Auth0](https://community.rockrms.com/developer/mobile-docs/essentials/blocks/cms/login/using-auth0)

[Using Entra](https://community.rockrms.com/developer/mobile-docs/essentials/blocks/cms/login/using-entra)

*If/when more are added, corresponding documentation will be added to this section.*

Important

When considering integration with external authentication, be mindful of the UX change for your users. Rock uses credentials (username and password) to log people in. In many cases, people enter their email address as their username and likely assume the login is directly linked to that email, but it is not. This changes when external authentication is used.External authentication is typically linked to another account that is directly tied to an email. If this is an email address shared between family members, a person match will not occur, and a duplicate will be created. Individuals will not be able to share an email in this way.

### Styling

There’s no styling X-Ray available.
