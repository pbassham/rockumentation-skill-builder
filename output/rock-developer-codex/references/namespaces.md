> **Path:** Developer Codex > Coding Standards > Namespaces

# Namespaces

As a general rule, don't add a new namespace without approval from the DSD or PO.

The exception to this is adding a standard "model domain" where you can see that is already the pattern. For example, if `Rock.Something.Core`, `Rock.Something.CMS`, `Rock.Something.CRM` namespaces already exist, adding `Rock.Something.Workflow` is probably fine. However, do not add `Rock.Something.CoolNewFeature` without getting that approved. Once created, it's nearly impossible to rename these so we want to be sure it's a well-thought-out name that won't conflict with possible upcoming features.

In regards to Rock.ViewModels and Rock.Enums assembly, the following rules apply and should not be deviated from without approval from PO currently.

1.  Do not add any classes, interfaces, or enums to the root of the namespace.
2.  Your namespace should match one of the following patterns:

-   \[Domain\]
-   Blocks.\[Domain\].\[BlockName\]
-   Controls
-   Utility

For example, the following namespaces would be considered valid:

-   Rock.ViewModels.CMS
-   Rock.Blocks.Core.CampusDetail
-   Rock.ViewModels.Utility
-   Rock.Enums.Core

However, the following would *not* be valid:

-   Rock.ViewModels.GroupFinder
-   Rock.Enums.Thinker
