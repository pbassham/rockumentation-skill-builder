> **Path:** Mobile Docs > 🧱 Essentials > Controls > XAML Extensions > On Device Type

# On Device Type

M v1.0

Warning

This is deprecated in Rock Mobile V6 and later. There is a built-in XAML extension for .NET MAUI.  

Similar to the [On Device Platform](https://community.rockrms.com/developer/mobile-docs/essentials/controls/xaml-extensions/on-device-platform), this extension lets you change property values and entire nodes depending on what type of device the app is running on. A good use case for this would be if you want to display a different image on tablets than you do on phones.

### Properties

| Property | Type | Description |
| --- | --- | --- |
| Phone | object | The value to be used when the device is a phone. |
| Tablet | object | The value to be used when the device is a tablet. |
| Default | object | The value to be used when the device is something else. |

### Example

```
<Image Source="https://www.rocksolidchurchdemo.com/GetImage.ashx?guid=923329f4-819e-4eaa-8d96-9611624736e8"
       HeightRequest="{Rock:OnDeviceType Phone=300, Tablet=150}" />
```

When running on a phone, the image will have a height of 300 pixels. But on a tablet it will only have a height of 150 pixels. This might be useful if you are worried that the image might take up too much vertical space on a tablet under normal sizing circumstances.

```
<StackLayout>
    <Rock:OnDeviceType>
        <Rock:OnDeviceType.Tablet>
            <Button Text="Go" />
        </Rock:OnDeviceType.Tablet>
        <Rock:OnDeviceType.Default>
            <Label Text="This feature requires a tablet." />
        </Rock:OnDeviceType.Default>
    </Rock:OnDeviceType>
</StackLayout>
```

Here is a more interesting example. In this case we are replacing not just a property but an entire element. On tablet devices, they will see a button which they can tap. On every other device type they will see a label that informs them the feature only works on tablets.
