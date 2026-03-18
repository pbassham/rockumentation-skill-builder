> **Path:** Developer Codex > Coding Standards > Method Behavior Parameters ("Options") > POCO Location

# POCO Location

When dealing with methods/options POCOs that involve the `Rock.Model` namespace (that is things like `GroupType` and `GroupTypeService`) the following rules apply.

1.  Place the *file* that contains the POCO in Rock\\Model\\\[Domain\]\\\[Entity\]\\Options\\\[PocoName\].cs. Example: Rock\\Model\\Group\\GroupType\\Options\\GroupFilterOptions.cs
2.  Place the *class* in the namespace that matches the folder structure. Example: `namespace Rock.Model.Group.GroupType.Options { }`

A similar pattern should be used for anything outside the `Rock.Model` namespace, though the exact formula has not been set in stone just yet. For now, plan on using a child namespace of `Options` to whatever namespace your method is in to store the POCO.
