> **Path:** Mobile Docs > 🧱 Essentials > Controls > Form Fields > Number Box

# Number Box

Inherits from [TextBox](https://community.rockrms.com/developer/mobile-docs/essentials/controls/form-fields/text-box)

The Number Box view provides an input box for the user to enter a decimal number. It ensures the value is a valid decimal number during validation. The number may be negative and may or may not contain a fractional amount. However, if it does contain a decimal separator then it must also include at least one digit after the separator.

### Properties

See [TextBox](https://community.rockrms.com/developer/mobile-docs/essentials/controls/form-fields/text-box) for available properties.

### Example

```
<Rock:FieldContainer>
    <Rock:NumberBox Label="Rock Number Box"
                    IsRequired="false"
                    Text="-1325" />
</Rock:FieldContainer>
```

![](https://community.rockrms.com/GetImage.ashx?Id=67198)
