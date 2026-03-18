> **Path:** Developer Codex > App Laws

# App Laws

This section covers decisions that have been made in the past that bind how we write certain parts of the Rock codebase.

1.  Home Directory – While most people install Rock in a website's root folder, we should never assume this. Some have installed it under a application directory in the home (
2.  An attribute value is shown for a list of options (which was formerly set when the underlying item was 'Active' but has since become inactive (IsActive=false)), the value should still appear to be selected when editing. Once the value has been deselected and saved, it is correct to no longer show the inactive items in the list of options.
