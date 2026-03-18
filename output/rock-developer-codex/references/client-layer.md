> **Path:** Developer Codex > Coding Standards > Service Layers > Client Layer

# Client Layer

Finally comes the client layer. In the WebForms world, this layer and the block layer are often one and the same. But in newer technologies these are distinct layers. Rock Mobile is a completely separate application running on a different device. Obsidian (and other JavaScript frameworks) are also separate applications that run on different devices from the server. Those are very distinct layers.

You may or may not have much direct interaction with the client layer depending on your area of focus. But you need to have an understanding of how the separation of layers works and what each layer is primarily responsible for.

Put simply, the client layer is responsible for final formatting and rendering. When a client wants to display a list of *things*, it may receive a JSON array that contains the information to be displayed. Such as the name and identifier. It can choose to display that any way it desires. Or more specifically, any way that fits the medium it is using.

For example, on a desktop website, there is plenty of screen space available. The client layer might then choose to display that list as a set of horizontal checkboxes. However, on a mobile phone application, there is not much screen space. So it might opt to display a field that shows only the selected items and then a popup when pressed to show all available choices.

The point is, under ideal circumstances, it is up to the client to decide final formatting and rendering.

**Note**: Lava puts a wrench in that statement. When you have a Lava template, it becomes the block layer that handles the formatting. While not ideal in this 4-layer model, it is the world we live in.
