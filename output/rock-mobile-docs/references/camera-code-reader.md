> **Path:** Mobile Docs > 🧱 Essentials > Controls > Content Controls > Campus Context Picker > Camera Code Reader

# Camera Code Reader

M v2.0C v12.4

*Inherits from* [*Xamarin.Forms.ContentView*](https://docs.microsoft.com/en-us/dotnet/api/xamarin.forms.contentview)

This is a special use camera control that allows you to scan specially formatted QR codes. When scanned, the app will automatically direct the user to the appropriate page to display the content.

Since an example usage might make things clearer; suppose you are doing small group signups. You want to provide your app-users an easy way to sign up for a group. Normally you might print out a bunch of sign-up sheets that people can write their name and contact information on so that you can later add them to the group. After service, these get laid out on various tables in the lobby.

For our use, you would include a QR code on the sheet that contained a workflow identifier and the group identifier. When the user opens their app to scan the code it would take them to the workflow entry page, launch that workflow and set the group they want to join. If they are logged in, all you have to do is display a confirmation page so that they can verify the group they are joining.

| Property | Type | Description |
| --- | --- | --- |
| Page M v5.0 | string | The page identifier that the reader will navigate to using the NavigationMode property. Whatever code data is retrieved is passed in as a query string parameter with a Data key.   |
| WorkflowPage (Legacy) | Guid | The same as the version 5 property without additional query string parameters. |
| NavigationMode | [NavigateMode](https://community.rockrms.com/developer/mobile-docs/essentials/commands/navigation-commands) | The type of navigation to perform when the code is scanned. *Defaults to* *Push**.* |

Note

When a code is scanned, the scanner will turn off automatically. If you are using Push navigation then when the page becomes visible again the scanner will automatically re-enable itself and start scanning codes again.

### Example

```
<Rock:CameraCodeReader WorkflowPage="2738f829-09a6-4b14-a4b2-4334a47d8de6" />
```

There are currently two types of codes supported.

A workflow code will take the user to the workflow entry page and launch a new workflow. These codes begin with `RK:WF:` and then contain a Guid to identify the workflow type to be launched. If you wish to pass any default values to be set on the new workflow you can pass then as query string parameters after the workflow type Guid.

```
RK:WF:25af66d6-0b7f-41b8-a8ca-bf912574eeb1?GroupId=20&Mode=auto
```

A page code will navigate the user to whatever page Guid is contained in the QR code. These codes begin with `RK:PG:` and then contain a Guid to identify the page to be navigated to. You can also optionally include any query string parameters you wish.

```
RK:PG:6cb5d894-02e1-4868-93b1-6d52d94295de?source=qrcode
```
