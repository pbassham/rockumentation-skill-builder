> **Path:** Mobile Docs > 🧱 Essentials > Troubleshooting

# Troubleshooting

Troubleshooting an issue in Rock Mobile can be a bit tricky since you don't have an inspector or a way to debug. Sometimes the error message won't be particularly helpful either. We'll include some common issues here and potential solutions to try, as well as some best practices.

Note

If there's no error message shown and the page is blank, that could indicate an issue with the Layout XAML. It's generally good practice to keep your Layout(s) simple.

## RockError #1000

"You appear to be disconnected from the internet."

This is most common when connected to Wi-Fi and the network goes down.

## RockError #1001

![](https://community.rockrms.com/GetImage.ashx?Id=67219)

This connection error is shown on app startup if the shell is unable to connect to the Rock server. The most common cause of this issue would be the Rock server itself going down.

Another issue that might arise is if your Public Application Root global attribute value is incorrect. This URL is used to reference resources the shell needs, so when it can't find them, you'll see this.

Note

Note that the shell cannot connect to localhost without additional tooling like [ngrok](https://ngrok.com/) or something that can expose Rock to the web.  

If you're only seeing an issue on Android, there may be a problem with the SSL certificate. Check out [this comment](https://chat.rockrms.com/channel/mobile?msg=iB9GxBDCavo6L6B9w) from RocketChat for more details.

## XAML Errors

### One of the identified items was in an invalid format.

Sometimes shown when a property has an invalid value, for example a Grid's `RowDefinitions`.
