> **Path:** Mobile Docs > 🧱 Essentials > Controls > Form Fields > Marital Status Picker

# Marital Status Picker

Inherits from [Picker](https://community.rockrms.com/developer/mobile-docs/essentials/controls/form-fields/picker).

Note

This control is only available in Shell v2 and later. It also requires your Rock Server to be on v1.13.0 or later as it needs the server to send down the Marital Status Defined Values.

This control provides a convenience for you to place a picker for a person's marital status. It automatically populates the available options based on what you have defined on the server. The picker item values are the defined value Guids.

### Example

```
<Rock:MaritalStatusPicker Label="Marital Status" IsRequired="true" />
```
