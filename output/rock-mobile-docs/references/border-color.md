> **Path:** Mobile Docs > 🎨 Styling > Legacy > Borders > Border Color

# Border Color

Applies to: [Button](https://docs.microsoft.com/en-us/dotnet/api/xamarin.forms.button?view=xamarin-forms), [Frame](https://docs.microsoft.com/en-us/dotnet/api/xamarin.forms.frame?view=xamarin-forms), [ImageButton](https://docs.microsoft.com/en-us/dotnet/api/xamarin.forms.imagebutton?view=xamarin-forms)

We've seen the [colors that the Downhill framework provides](https://community.rockrms.com/developer/mobile-docs/styling/legacy/colors) us for use in our applications. These colors can be used to specify border colors.

## Application Colors

Note that the actual colors you select will be substituted for the `?color-value`.

| Class | Property |
| --- | --- |
| .border-primary | color: ?color-primary; |
| .border-secondary | color: ?color-secondary; |
| .border-success | color: ?color-success; |
| .border-danger | color: ?color-danger; |
| .border-warning | color: ?color-warning; |
| .border-info | color: ?color-info; |
| .border-light | color: ?color-light; |
| .border-dark | color: ?color-dark; |
| .border-white | color: ?color-white; |

Each of the palette colors can also be used for text. Use the notation of `.border-color-intensity` to specify the color.

```
<Label StyleClass="border-gray-400" Text="Lots of trouble. Lots of bubble." />
```
