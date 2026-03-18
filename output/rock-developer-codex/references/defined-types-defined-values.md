> **Path:** Developer Codex > Coding Standards > Defined Types & Defined Values

# Defined Types & Defined Values

When creating a feature that has new defined types and defined values, you must add them (new well known GUIDs) as constants to the Rock.SystemGuid.DefinedType and Rock.SystemGuid.DefinedValue classes. However when consuming these do not assume they exist, still check for and handle nulls.
