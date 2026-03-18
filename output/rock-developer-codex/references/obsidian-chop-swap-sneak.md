> **Path:** Developer Codex > Coding Standards > Obsidian Chop, Swap, Sneak

# Obsidian Chop, Swap, Sneak

As we convert webforms blocks to Obsidian, we will generally perform either a "chop", a "swap" or a "sneak" defined as follows:

-   **Chop** \- the old block type and it's block instances are automatically replaced with the new Obsidian block type (and all instance block settings are copied over to the new instances), *then the old block type is permanently deleted* (both the files and BlockType record).
-   **Swap** \- This is the same as a Chop except *we do not* permanently delete the old block type. Swapped blocks will eventually (in a few releases/hotfixes later) need to be *chopped* in case a Rock admin put the old block type back in place.
-   **Sneak** - This is where we put the new block into Rock but only tell a select few organizations who will then test/use it in production and let us know. These also eventually need to be *chopped* a few releases/hotfixes later.

We prefer chop since it removes legacy code from our base and is one less thing to maintain.
