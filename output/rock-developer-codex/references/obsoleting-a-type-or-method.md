> **Path:** Developer Codex > Coding Standards > Maintaining Compatibility > Obsoleting a Type or Method

# Obsoleting a Type or Method

When it is necessary to obsolete a Type or Method because it has been superseded, apply both the .NET `[Obsolete(…)]` Attribute and the custom `[RockObsolete( "1.X" )]` Attribute. (where 1.X means the item is obsoleted as of Rock 1.X.0 (aka X.0))

When Obsoleting a method, add the reason why as an engineering note above the method (see Documenting Code).
