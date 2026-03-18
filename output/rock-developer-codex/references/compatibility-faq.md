> **Path:** Developer Codex > Coding Standards > Maintaining Compatibility > Compatibility FAQ

# Compatibility FAQ

There are many ways in which backward compatibility can be broken, and the rules are not always clear because they may depend upon the circumstances. The purpose of this section is to document scenarios that have been encountered and tested in Rock, to provide some guidance for developers making similar changes in the future.

As a general rule, any changes that alter the existing public surface area of a type will violate the requirement for backwards compatibility.

**Q. Can I add Optional Parameters to an Existing Method?**

**A**. No. Any change that alters the signature of a public or protected method will break code compiled using the previous assembly. Instead, add the new method signature with the original one intact. Keep in mind that plugins do not get re-compiled as often as core.

**Q. Can I remove the "virtual" modifier from a public method or property?**

**A**. Sometimes. Removing the virtual modifier will break compatibility for any derived classes that override the method or property, but not where the usage is a simple reference. This change may be justified in circumstances where an override is highly unlikely, and renaming the property or method is undesirable - for example, where a calculated property on a data model is modified to map directly to a database column.

Old Declaration (calculated field)

`public virtual DateTime? NextStartDateTime { get; }`

New Declaration (database column)

`public DateTime? NextStartDateTime { get; set; }`

**Q. How can I test for binary compatibility?**

**A**. One method of testing if a code change is binary compatible is to create a test plugin project containing some sample code (such as a Lava filter) that references the property or method you are testing and produces some verifiable output. Compile the plugin and reference it from RockWeb, then make the code change and rebuild the Rock application with the changes. Confirm binary compatibility by verifying that the plugin loads and produces the same output with the code changes.
