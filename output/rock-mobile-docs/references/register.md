> **Path:** Mobile Docs > 🧱 Essentials > Blocks > CMS > Register

# Register

Allows the user to register a new account on a mobile application.

M v3.0 C v13.0

This block allows an individual to register for a new account. There are a number of options that control what information you collect and which bits are required.

Important

Be careful about what information you require. Because of recent changes in both Apple and Google's app stores, it is getting more difficult to require personal information. You may have to argue with either Apple or Google (or both) for why you are requiring certain personal information to be entered.    

## Block Configuration

#### Person Matching

In order for person matching to work, there are a few things that must come together:

1.  Block Settings
    1.  Check For Duplicates (Enabled by default)
    2.  Confirmation Page (You must configure this)
    3.  Confirm Account Template (Configured by default)
2.  Mobile Shell Version 3 or Later
3.  E-mail Address Provided by Individual

The first is, obviously, that you must turn on `Check For Duplicates`. This is the primary setting that dictates if the entire feature is enabled or not.

Once that is enabled, you also need to specify the `Confirmation Page` that the user will be sent to from their e-mail. This is a web page and not a mobile page, for example on your External Website you would select the "Support Pages > Account Confirmation" page.

Third, you must select the system e-mail that will be used as the template when generating the e-mail. This is selected by default.

In addition to the above block settings, there are two other things. First, as is pretty clear from the above, your users must be using version 3 or later of the Mobile Shell. This is because additional support was added in the shell to handle the UI to inform the user that the account was created but they need to confirm it. If an individual is running version 2 or below of the Mobile Shell then they will get the old behavior, which is no person matching.

Finally, they must provide an e-mail address. Because we need to send an e-mail when performing person matching the user must enter an e-mail address. This causes strict matching to be enabled in the search which means only people whose current, or previous, e-mail matches the one being searched for are considered for the duplicate search. Since adding a new user login to an existing person is a security-sensitive process, we need to be more strict about these things.

### Styling

This block consisted of mostly fields, please refer to this [style guide](https://community.rockrms.com/page/3516?slug=styling%2fstyle-guide%2fforms) for styling.
