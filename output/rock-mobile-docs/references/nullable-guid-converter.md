> **Path:** Mobile Docs > 🧱 Essentials > Controls > XAML Extensions > Nullable Guid Converter

# Nullable Guid Converter

This converter allows you to change a String to a Guid type. Some properties and bindings in XAML require this type, meaning a string with an actual Guid value within will still fail without this converter.

```xaml
<Rock:Parameter Name="Guid" Value="{Binding ItemGuid, Converter={Rock:NullableGuidConverter}}" />
```

In this example, the string Guid value within `ItemGuid` would be converted to a Guid type.
