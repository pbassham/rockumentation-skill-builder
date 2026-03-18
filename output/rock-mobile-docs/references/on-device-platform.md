> **Path:** Mobile Docs > 🧱 Essentials > Controls > XAML Extensions > On Device Platform

# On Device Platform

M v1.0

Warning

This is deprecated in Rock Mobile V6 and later. There is a built-in XAML extension for .NET MAUI.  

In some cases, it can be useful to customize content or appearance across platforms—for example, applying one style on Android and a different one on iOS to match each platform's native aesthetic. This extension provides a way to set content or property values depending on the device's OS platform.

### Example

```
<Label Text="{OnPlatform iOS=Hello iOS!, Android=Hello Android!}" />
```

### Example

```
<ContentView>
    <OnPlatform x:TypeArguments="View">
        <On Platform="iOS"><Label Text="Hello iOS"/></On>
        <On Platform="Android"><Label Text="Hello Android"/></On>
    </OnPlatform>
</ContentView>
```

Note

  You can also style platforms independently via Custom CSS classes.  

Below is legacy documentation for the original `Rock:OnDevicePlatform` extension.

### Properties

| Property | Type | Description |
| --- | --- | --- |
| Android | object | The value to be used when the device is running on Android. |
| iOS | object | The value to be used when the device is running on iOS. |
| Default | object | The value to be used when the device is running on something else. |

### Examples

```
<Label Text="Hello World!"
    TextColor="{Rock:OnDevicePlatform Android=Blue, iOS=Red, Default=Black}" />
```

When running on an Android device, the text will be blue. If instead running on an iOS device then the text will be red. Otherwise, the text will be black. While not currently required, the Default value should be specified in case we add other platforms in the future.

```
<StackLayout>
    <Rock:OnDevicePlatform>
        <Rock:OnDevicePlatform.Android>
            <Button Text="Go" />
        </Rock:OnDevicePlatform.Android>
        <Rock:OnDevicePlatform.Default>
            <Label Text="This feature required Android." />
        </Rock:OnDevicePlatform.Default>
    </Rock:OnDevicePlatform>
</StackLayout>
```

Here is a more interesting example. In this case, we are replacing not just a property but an entire element. On Android, they will see a button that they can tap. On every other platform, they will see a label that informs them the feature only works on Android.
