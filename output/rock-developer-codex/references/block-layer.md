> **Path:** Developer Codex > Coding Standards > Service Layers > Block Layer

# Block Layer

The block layer is where the logic for a specific block lives. This usually consists of a pattern similar to:

1.  Using page parameters and block settings to define the functional configuration.
2.  Using that configuration to lookup data via the data service layer.
3.  Filtering and translating that data via the client service layer into something the block (and later client layer) can more easily consume.
4.  Preparing the data for display by the client layer. Ideally this is almost a direct passthru from the client service layer. But some blocks might need to perform even more adjustments, such as the event registration entry block.
5.  Sending the data to the client layer.

Step 3 is important. The ideal situation is that the block layer does not perform any logic. Note we said *ideal*. In reality, that probably will seldom be the case. But as much *reusable* logic as possible should be put in the client service layer. Note again we said *reusable*. That is an important distinction. Just because your block has logic doesn't automatically mean it can (or should) be reused.

A method that returns a list of campuses that should be displayed in a list to the user is a reusable piece of logic. A method that returns some rendered Lava from a set of connection types is probably not reusable. It's too specific to the block itself and the output medium.

It might help to think of the Block Layer almost as an API layer. You are providing api methods (block actions) for the client to use to get to the specific data it wants. Additional block configuration allows those block actions to be reused in different ways on different pages.
