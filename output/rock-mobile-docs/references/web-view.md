> **Path:** Mobile Docs > 🧱 Essentials > Controls > Content Controls > Web View

# Web View

M v1.0

Inherits from [WebView](https://learn.microsoft.com/en-us/dotnet/maui/user-interface/controls/webview)

Embeds a web page into your mobile app page. This control wraps the standard [WebView](https://learn.microsoft.com/en-us/dotnet/maui/user-interface/controls/webview) and should generally be used instead of the .NET MAUI one. It adds an initial [Activity Indicator](https://community.rockrms.com/developer/mobile-docs/essentials/controls/content-controls/activity-indicator) that will be visible until the web page actually loads. Otherwise, someone might see a blank area for a few seconds before anything appears.

Important

WebView content is completely contained and cannot affect the app shell or native page. For example, an action within a WebView cannot initiate a native navigation command.

## Display & Troubleshooting

To ensure that the web page displays with the proper scale within the application, add the following meta tag to the of the page.

```html
<meta name="viewport" content="width=device-width, initial-scale=1">
```

Note that the WebView control must not be embedded within a ScrollView; otherwise, the content will be clipped. You do not need to define the `HeightRequest` and `WidthRequest` properties when using the Rock Mobile version.

Note

If the embedded web page contains an iframe and only a blank page is shown, it may be a CORS issue. On iOS, these errors are "swallowed" meaning nothing will be shown.  Keep in mind the domain of your API URL that the shell connects to your server with.

On Android, pinch to zoom is disabled by default. Check out [this article](https://learn.microsoft.com/en-us/dotnet/maui/android/platform-specifics/webview-zoom-controls) on how to enable this.

## Properties

| Property | Type | Description |
| --- | --- | --- |
| Source | string | The initial URL to be used when the WebView first loads. |

```xaml
<Rock:WebView Source="https://rock.rocksolidchurchdemo.com/page/482" />
```
