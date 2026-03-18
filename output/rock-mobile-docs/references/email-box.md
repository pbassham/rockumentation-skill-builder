> **Path:** Mobile Docs > 🧱 Essentials > Controls > Form Fields > Email Box

# Email Box

*Inherits from [TextBox](https://community.rockrms.com/developer/mobile-docs/essentials/controls/form-fields/text-box)*

The Email Box view provides an input box for the user to enter an e-mail address. It ensures the value is a somewhat valid address during validation. This does not sure it is a working e-mail address, only that it matches a basic syntax format.

### Properties

See [TextBox](https://community.rockrms.com/developer/mobile-docs/essentials/controls/form-fields/text-box) for available properties.

### Example

```
<Rock:FieldContainer>
    <Rock:EmailBox Label="Rock Email Box"
                   IsRequired="false"
                   Text="ted@rocksolidchurchdemo.com" />
</Rock:FieldContainer>
```
