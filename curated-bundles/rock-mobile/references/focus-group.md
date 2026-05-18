---
description: Use when implementing vertical or horizontal focus navigation in Roku applications or managing initial focus state on pages
source: "https://community.rockrms.com/developer/roku-docs"
sourceLabel: Roku Docs
---
> **Path:** 

Manage vertical or horizontal focus in your Roku application.

*Extends* [*LayoutGroup*](https://developer.roku.com/docs/references/scenegraph/layout-group-nodes/layoutgroup.md)

## Description

Unfortunately, as of 2024, focus management is not built into Roku applications (like we are used to with Apple TV).

This control handles three simple things automatically for you:

1. Display views vertically/horizontally.
2. Handle up and down focus management for vertical orientation.
3. Handle left and right focus management for horizontal orientation.

## Examples

```
<!-- Displays two buttons horizontally, with left/right focus -->
<Rock:FocusGroup layoutDirection="horiz">
    <Rock:Button
        id="exampleButton"
        text="Example Button"
        showFocusFootprint="true"
        rockCommand="pushPage"
        rockPageGuid="4c294b37-fcc1-4432-87ff-3ce73f14a482"
        rockPageCacheControl="personal:600"
        rockPageShowLoading="true"
        minWidth="240"/>

    <Rock:Button
        id="exampleButton2"
        text="Replace Page"
        showFocusFootprint="true"
        rockCommand="replacePage"
        rockPageGuid="4c294b37-fcc1-4432-87ff-3ce73f14a482"
        rockPageCacheControl="personal:600"
        rockPageShowLoading="true"
        minWidth="240"/>
</Rock:FocusGroup>
```
```
<!-- Displays two buttons vertically, with up/down focus -->
<Rock:FocusGroup layoutDirection="vert">
    <Rock:Button
        id="exampleButton"
        text="Example Button"
        showFocusFootprint="true"
        rockCommand="pushPage"
        rockPageGuid="4c294b37-fcc1-4432-87ff-3ce73f14a482"
        rockPageCacheControl="personal:600"
        rockPageShowLoading="true"
        minWidth="240"/>

    <Rock:Button
        id="exampleButton2"
        text="Replace Page"
        showFocusFootprint="true"
        rockCommand="replacePage"
        rockPageGuid="4c294b37-fcc1-4432-87ff-3ce73f14a482"
        rockPageCacheControl="personal:600"
        rockPageShowLoading="true"
        minWidth="240"/>
</Rock:FocusGroup>
```

---

## Page {#page}

The standard control that is used for your page content.

*Extends* [*Group*](https://developer.roku.com/docs/references/scenegraph/layout-group-nodes/group.md)

## Description

This is a group of views that represents an entire page of content.

## Field

| Field | Type | Description |
| --- | --- | --- |
| initialFocus | string | The ID of the item you want to be focused when the page comes into view. |

## Examples

```
<Rock:Page initialFocus="myBtn">

    <Poster uri="headerPhoto.png" 
        width="1280" 
        height="300" />
        
    <Label Text="Rock <3 Roku!" />
    
    <Rock:Button id="myBtn"
        text="Next Page"
        rockCommand="pushPage" 
        rockPageGuid="4443b83e-86c9-4e35-9637-13b8991856ed" />
</Rock:Page>
```

---

## Layout Nodes {#layout-nodes}

Although Roku has many different layouts, very few have default item templates. Be cautious when picking your SceneGraph elements as we try to avoid custom BrightScript components.

---

## RowList {#rowlist}

The RowList Node component within SceneGraph is used to create a horizontal list of items. This component is ideal for displaying a series of elements that can be scrolled horizontally. This layout accepts an unlimited amount of vertical and horizontal scrollability.

| Parameter | Type | Description |
| --- | --- | --- |
| itemSize | vector2d | The size of the RowList element. |
| numRows | int | Specifies the number of visible rows in the list. |
| rowHeights | array of floats | Provides the heights of each row in the list. |
| rowItemSize | array of vector2d | Provides width/height of items in each row. |
| rowItemSpacing | array of vector2d | The spacing between items in each row. |
| RowSpacings | array of floats | The spacing between each row. Allows for spacing to vary from row to row. |
| showRowLabel | array of booleans | Determines if the row label should be shown |
| vertFocusAnimationStyle | option string | Specifies how the focus indicator moves vertically |
| rowFocusAnimationStyle | option string | Specifies how the focus indicator moves horizontally |

### Row Data Bindings

| Parameter | Type | Description |
| --- | --- | --- |
| title | string | Label for the row |

### Item Data Bindings

| Parameter | Type | Description |
| --- | --- | --- |
| hdposterurl | url | Image URL for the rowlist item |

## Structure

A RowList requires a single `ContentNode` as the root of its content field. Within this root element, a child `ContentNode` should be added for each row in the list. Each row `ContentNode` houses child `ContentNodes` that represent the RowList items.

```
<RowList id="rowListExample">
    <Rock:ContentNode role="content">
        <Rock:ContentNode id="rowOne"
            title="Row 1">
            
            <Rock:ContentNode id="itemOneInRowOne" />
        </Rock:ContentNode>
        
        <Rock:ContentNode id="rowTwo"
            title="Row 2">
            
            <Rock:ContentNode id="itemOneInRowTwo" />
        </Rock:ContentNode>
    </Rock:ContentNode>
</RowList>
```

---

## Roku Resources {#roku-resources}

- [SceneGraph Reference](https://developer.roku.com/en-gb/docs/references/references-overview.md) - Roku documentation for all the built-in SceneGraph components.
- [Roku Samples](https://github.com/rokudev/samples) - A repository of Roku sample applications/SceneGraph.

---

## Tips and Tricks {#tips-and-tricks}

- Keep layouts simple. Use layout controls such as RowList to handle media/content selection.

---

## Useful Links {#useful-links}

A page containing some useful information and links.

## Feature Requests

Have an idea to improve the Roku application development in Rock? Submit your feature requests on our [Ideas](https://community.rockrms.com/ideas) Page. We value your feedback and are always looking for ways to make the experience better!

## GitHub Issues

If you run into any bugs or want to track the status of current issues, visit our GitHub Issues Board. Feel free to open new issues, and we’ll work to address them as soon as possible.

## Community Chat

Looking to connect with other developers or ask questions? Join the conversation in our Rocket Chat Channel. It’s a great place to collaborate, share ideas, and discuss all things related to Roku development in Rock.
