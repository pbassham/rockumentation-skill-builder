> **Path:** Developer Codex > Coding Standards > Maintaining Compatibility

# Maintaining Compatibility

Maintaining code compatibility with previous versions of Rock within the established support window is extremely important, because we need to offer a predictable and stable operating environment for developers and users of third-party plugins.

For this reason, it's important to avoid any changes that would result in breaking backward-compatibility. The current policy for Rock development is that we should strive to maintain compatibility with the two previous major releases of the application. After this support window has passed, obsoleted methods will be removed from the code in the following release.

Do not break backwards compatibility unless instructed to do so, and only obsolete methods when agreed upon by the technical lead.
