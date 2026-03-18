> **Path:** Developer Codex > Coding Standards > RockInternal Attribute

# RockInternal Attribute

The RockInternal attribute is used to signify internal code within Rock. This attribute requires a first parameter of a version string that represents the Rock Version it was introduced in. An optional boolean parameter of "keepInternalForever" indicates whether it should stay internal forever (ex. WebForms code needs to use it but plugins never should). In the future, a helper tool will be run before every major release that provides a list of all "internal" items that should now be made public based on this version number.

The should be used in the follow 3 cases:

1.  Code is for internal use only and will always be used for internal use only
    1.  Code has no intention of ever becoming available to 3rd party plugins
    2.  If the property needs to be accessed by code in RockWeb, it must be public and denoted with the `[RockInternal]` attribute alongside a specific version and the "true" value for the optional "keepInternalForever" parameter
2.  Code is *currently* for internal use only but should become public eventually
    1.  Code for a new feature but the method names and parameters are not yet confirmed
    2.  Feature is considered experimental
    3.  The intention is that this code will eventually become public
3.  Code is public for plugins to use
    1.  Once internal-use code becomes fully public, the "RockInternal" attribute is removed and the accessor is switched to "public"
