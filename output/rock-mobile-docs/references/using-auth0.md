> **Path:** Mobile Docs > 🧱 Essentials > Blocks > CMS > Login > Using Auth0

# Using Auth0

Using Auth0 for your Rock mobile application login.

M v5.0 C v15.1

![](https://community.rockrms.com/GetImage.ashx?Id=66839)

![](https://community.rockrms.com/GetImage.ashx?Id=66840)

Note

If you are building your app utilizing the orange/blue Rock Mobile application and would like to test Auth0, you should coordinate your efforts with the App Factory publishing service.  

### What is Auth0?

Auth0 is a cloud-based identity and access management (IAM) platform that provides developers and organizations with secure and easy-to-use solutions for authenticating and authorizing user access to applications. Auth0 offers a range of authentication methods such as username and password, social identity providers, multi-factor authentication, and more.

With Auth0, developers can add authentication and authorization capabilities to their applications quickly and easily. Check out their website to learn more about the services they offer.

[Auth0](https://auth0.com/)

### Setup

To ensure Auth0 works seamlessly in Rock Mobile, follow this step-by-step guide to configure a new Auth0 application for Rock Mobile. In this guide, we will:

1.  Create and configure a new Auth0 application for Rock Mobile.
2.  Configure Auth0 to provide enough data for Rock sign-up.
3.  Configure Rock Mobile to support Auth0.

Note

Rock requires a First Name, Last Name and either a valid Phone Number or Email to process external authentication. You should take steps to ensure that those specific data points are always returned from Auth0 authentication.  

### Creating an Auth0 Application

To begin, let's create the Auth0 application that will handle our Rock Mobile logins. You should only need one application for all of your mobile applications.

1.  In the [Auth0 Dashboard](https://manage.auth0.com/dashboard/), create a new application.

![Create an Auth0 application.](https://community.rockrms.com/GetImage.ashx?Id=66841)

Note

You cannot use the same application you've configured for Rock Web, since it requires settings specific to mobile authentication.

2.  Select `Native` as the type of application.  

![<br>](https://community.rockrms.com/GetImage.ashx?Id=66859)

3\. Head into the `Settings` of the Application. You can ignore the Quick Start guide that they typically start you on. Note down the `Client ID` and `Domain` of your Auth0 application.  

![&nbsp; Note down the&nbsp;Client ID&nbsp;and&nbsp;Domain&nbsp;of your Auth0 application.&nbsp;&nbsp;](https://community.rockrms.com/GetImage.ashx?Id=66842)

4.  Make sure you have your app's `Bundle ID` (iOS) and `Package Name` (android) available. If you are unsure of these values or where to retrieve them you should contact the AppFactory publishing service.   

5\. In the `Allowed Callback URLs` of the Auth0 application, add an entry in the following format. If your package name and bundle identifier differ, you will require two URLs, one for each.  

```
<Bundle Identifier/Package Name>://auth0/callback
```

![Add Allowed Callback URLs for post-authentication.](https://community.rockrms.com/GetImage.ashx?Id=66843)

6.  Under `Credentials`, ensure the `Token Endpoint Authentication Method` is set to `None`. Mobile apps use a different form of authentication in comparison to web applications.  

![&nbsp; Ensure Token Endpoint Authentication Method is set toNone.&nbsp;&nbsp;](https://community.rockrms.com/GetImage.ashx?Id=66844)

Great! We should now have all of the basic configuration finished.

### Getting Additional Data for Rock

In order to sign a person up, Rock requires a `First Name`, `Last Name`, and either a `Phone Number` or an `Email`. Auth0 does not require all of these data points out of the box. There are quite a few ways that you could customize the login flow to support this additional data, but we're going to keep it pretty straightforward in this guide.

To ensure all of the necessary data for Rock is obtained, we will:

1.  Configure Universal Login to add additional fields for database sign-up.
2.  (*optional)* Configure a post-login rule to pass additional information to Rock.

### Configuring Universal Login

1.  First, we need to configure Auth0's `Universal Login` to ensure there is enough data collected to create a person in Rock. Head over to `Branding > Universal Login > Advanced Options > Login`. Enable the `Customize Login Page` option.  

![](https://community.rockrms.com/GetImage.ashx?Id=66850)

2.  Scroll down to the customizable HTML. This section will allow us to modify the sign-up page to request additional information. You can supply `additionalSignUpFields` to the main `Lock` object to set specific user data. In this tutorial, we'll be accepting an additional phone number, gender, and the individual's first and last name. You can view the [Auth0 documentation](https://community.auth0.com/t/how-to-configure-additional-signup-fields-on-the-universal-login-page/82448) to see more about what you can do with these fields.  

```
additionalSignUpFields: [{
    name: "given_name",
    placeholder: "Enter your first name",
    storage: "root" // IMPORTANT!
    {
    name: "family_name",
    placeholder: "Enter your last name",
    storage: "root" // IMPORTANT!
    },
    {
}]
```

The entire file looks like this if you want to copy and paste the entire example.

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
  <title>Sign In with Auth0</title>
  <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0" />
</head>
<body>

  <!--[if IE 8]>
  <script src="//cdnjs.cloudflare.com/ajax/libs/ie8/0.2.5/ie8.js"></script>
  <![endif]-->

  <!--[if lte IE 9]>
  <script src="https://cdn.auth0.com/js/base64.js"></script>
  <script src="https://cdn.auth0.com/js/es5-shim.min.js"></script>
  <![endif]-->

  <script src="https://cdn.auth0.com/js/lock/11.32/lock.min.js"></script>
  <script>
    // Decode utf8 characters properly
    var config = JSON.parse(decodeURIComponent(escape(window.atob('@@config@@'))));
    config.extraParams = config.extraParams || {};
    var connection = config.connection;
    var prompt = config.prompt;
    var languageDictionary;
    var language;

    if (config.dict && config.dict.signin && config.dict.signin.title) {
      languageDictionary = { title: config.dict.signin.title };
    } else if (typeof config.dict === 'string') {
      language = config.dict;
    }
    var loginHint = config.extraParams.login_hint;
    var colors = config.colors || {};

    // Available Lock configuration options: https://auth0.com/docs/libraries/lock/v11/configuration
    var lock = new Auth0Lock(config.clientID, config.auth0Domain, {
      auth: {
        redirectUrl: config.callbackURL,
        responseType: (config.internalOptions || {}).response_type ||
          (config.callbackOnLocationHash ? 'token' : 'code'),
        params: config.internalOptions
      },
      configurationBaseUrl: config.clientConfigurationBaseUrl,
      overrides: {
        __tenant: config.auth0Tenant,
        __token_issuer: config.authorizationServer.issuer
      },
      assetsUrl:  config.assetsUrl,
      allowedConnections: connection ? [connection] : null,
      rememberLastLogin: !prompt,
      language: language,
      languageBaseUrl: config.languageBaseUrl,
      languageDictionary: languageDictionary,
      theme: {
        //logo:            'YOUR LOGO HERE',
        primaryColor:    colors.primary ? colors.primary : 'green'
      },
      prefill: loginHint ? { email: loginHint, username: loginHint } : null,
      closable: false,
      defaultADUsernameFromEmailPrefix: false,
    	additionalSignUpFields: [
    	{
        name: "given_name",
        placeholder: "Enter your first name",
        storage: "root" // IMPORTANT
    	},
     	{
        name: "family_name",
        placeholder: "Enter your last name",
        storage: "root" // IMPORTANT!
         },
	]
});

    if(colors.page_background) {
      var css = '.auth0-lock.auth0-lock .auth0-lock-overlay { background: ' +
                  colors.page_background +
                ' }';
      var style = document.createElement('style');

      style.appendChild(document.createTextNode(css));

      document.body.appendChild(style);
    }

    lock.show();
  </script>
</body>
</html>
```

Once finished, paste it into the HTML section into the box. Ensure the preview looks correct.

### (optional) Pass in Additional Information to your Rock Instance

This part of the tutorial utilizes an [Auth0 Action](https://auth0.com/docs/customize/actions), which is not part of the free Auth0 plan. If you don't want or need to pass down custom fields such as `Gender`, feel free to skip to [Configuring Rock Mobile](https://community.rockrms.com/developer/mobile-docs/essentials/blocks/cms/login/using-auth0#configuring-rock-mobile).

There are a billion ways in which you can configure your Auth0 login process. You may want to enhance the process to return additional information to your Rock instance (such as `Gender`, `BirthDate`, etc).

This is supported through the use of [Identity Claims](https://auth0.com/docs/get-started/apis/scopes/sample-use-cases-scopes-and-claims). In short, identity claims are set during your authentication process to provide additional information about an authenticated individual. There are quite a few ways you can set these claims as well, mostly through Auth0 Rules or Actions.

1.  Do you remember the `additionalSignUpFields` we configured [earlier](https://community.rockrms.com/developer/mobile-docs/essentials/blocks/cms/login/using-auth0#configuring-universal-login)? Let's add some more fields to that.  

```
type: "select",
    name: "gender",
    placeholder: "choose your gender",
    options: [
      {value: "1", label: "Male"},
      {value: "2", label: "Female"},
      {value: "0", label: "Unspecified"}
      ],
    },
    {
    name: "phone_number",
    placeholder: "Phone Number"
```

This will add a `Gender` picker that reflects the Gender enum, and a basic `Phone Number` field.

2\. Jump into `Action > Flows` and press `Login` to configure a post-login flow. Select `Build Custom`.   

![Create a new Custom Action.](https://community.rockrms.com/GetImage.ashx?Id=66845)

![Custom action creation settings.](https://community.rockrms.com/GetImage.ashx?Id=66846)

3\. In `onExecutePostLogin` method, configure the identity claims to pass down the proper data, like such:  

```
exports.onExecutePostLogin = async (event, api) => {
  var userPhoneNumber = event.user.phone_number ?? event.user.user_metadata?.phone_number;
  var userEmail = event.user.email ?? event.user.user_metadata?.email;

  var needsPhoneOrEmail = (userPhoneNumber && userPhoneNumber != "") || (userEmail && userEmail != "");

  if( needsPhoneOrEmail )
  {
    // Invalid login. Here you could customize the login flow to prompt the users for the values, if you wanted to.
  }

  if (event.authorization) {
    // We're careful here to only update the claims if they don't
    // already exist. These can be set previously be social providers, so 
    // if we have a value that's null it's likely it came from there,
    // and the claim is already set (so we don't need to reference metadata).
    if( userPhoneNumber )
    {
      api.idToken.setCustomClaim("phone", userPhoneNumber );
    }
    if( event.user.user_metadata?.gender )
    {
      api.idToken.setCustomClaim("gender", event.user.user_metadata?.gender );
    }
    if( event.user.user_metadata?.given_name )
    {
      api.idToken.setCustomClaim("given_name", event.user.user_metadata?.given_name );
    }
    if(  event.user.user_metadata?.family_name )
    {
      api.idToken.setCustomClaim("family_name", event.user.user_metadata?.family_name );
    }
  }
};
```

Press `Deploy`. The last thing we need to do is add it to the login flow. Add the `Action` you just created before the completion of the login, like such. Make sure to press `Apply` afterwards.

![](https://community.rockrms.com/GetImage.ashx?Id=66854)

## Configuring Rock Mobile

There are a couple of configuration steps for Rock Mobile.

1.  In your mobile application (`Cms Configuration > Mobile Applications`), look for the `Auth0 Client ID` and `Auth0 Domain` settings. Update them with your application values.  

![Auth0 Client ID and Domaun mobile settings.](https://community.rockrms.com/GetImage.ashx?Id=66856)

2. Enable Auth Login in the Login block.

![&nbsp; Login block settings.&nbsp;](https://community.rockrms.com/GetImage.ashx?Id=66857)

Hooray! You should now be fully capable of handling Auth0-related logins.

Go into your login block, and press the `Login With Auth0` button. That button has a `btn-auth0` style class applied for customization. You should now be prompted with an Auth0 login.

![](https://community.rockrms.com/GetImage.ashx?Id=66848)

In the `Sign Up` tab, you should see all of the additional fields you configured.

![](https://community.rockrms.com/GetImage.ashx?Id=66849)

When you successfully log in with Auth0 (even for new accounts), a `Person` in Rock will be matched or created with the values of the Auth0 account.

## Supported Claims

The following identity claims are supported and can be utilized to supply additional information about a Rock Person. Since Auth0 configurations can vary, we supply a few different keys that are recognized and translated accordingly.

| Key(s) | Type | Value |
| --- | --- | --- |
| firstname, first\_name, given\_name | string | The FirstName of the Person.   |
| lastname, last\_name, family\_name | string | The LastName of the Person.   |
| phone, phonenumber, phone\_number | string | The PhoneNumber of the Person.   |
| campus, campus\_guid | Guid | The Guid of the Person campus.   |
| photo, picure, profile\_image, avatar | string | The source of the Person profile image.   |
| nickname | string | The nickname of the Person.   |
| birthday, birth\_date, birthdate, date\_of\_birth | DateTime | TheDateTime representation of the Person date of birth.   |
| gender | string | The Gender representation of the Person. Can be interpreted as the enum integer or corresponding string value.   |
