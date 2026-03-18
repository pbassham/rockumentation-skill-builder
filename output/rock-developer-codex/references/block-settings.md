> **Path:** Developer Codex > Coding Standards > Building Blocks > Block Settings

# Block Settings

Starting in v9, all new blocks should use the ‘Vertical’ format for block settings, where the Properties of the FieldAttribute is assigned (not the constructor parameters)

Example:

```csharp
[BooleanField( "Enable Giving",
        Description = "If true, the giving data will be loaded otherwise it will be skipped.",
        Key = AttributeKey.EnableGiving,
        DefaultBooleanValue = true,
        Order = 3 )]
```
