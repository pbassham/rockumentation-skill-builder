---
description: "Use when styling panel components with headings, icons, and tables in Rock using HTML or lava shortcodes"
source: "https://community.rockrms.com/styling"
sourceLabel: Styling
---
> **Path:** Styling > Components > Panels

## Styling Panels

While not always necessary, sometimes you need to put your content into a box. For those situations, try the panel component.

The easiest way to make a panel in Rock is to use the Panel lava shortcode.

### Important Stuff

This is a super simple panel.

```
{[ panel title:'Important Stuff' icon:'fa fa-star' ]}
This is a super simple panel.
{[ endpanel ]}
```

**Heads Up!**  
The `.panel-block` class is used on standard Rock blocks, typical Rock website themes will remove padding from the `.panel-body` and hide the `.panel-heading` to make the block more visually cohesive with the site.

For advanced usage of the panel, creating the HTML by hand is required.

### Using Panels and Tables

Add any non-bordered `.table` within a panel for a seamless design. If there is a `.panel-body`, we add an extra border to the top of the table for separation.

# Panel heading

Some default panel content here. Nulla vitae elit libero, a pharetra augue. Aenean lacinia bibendum nulla sed consectetur. Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum. Nullam id dolor id nibh ultricies vehicula ut id elit.

| # | First Name | Last Name |
| --- | --- | --- |
| 1 | Ted | Decker |
| 2 | Alisha | Marble |
| 3 | Pete | Foster |

```
<div class="panel panel-default">
  <!-- Default panel contents -->
  <div class="panel-heading">
    <h1 class="panel-title"><i class="fa fa-star"></i> Panel heading</h1>
  </div>
  <div class="panel-body">
    <p>...</p>
  </div>

  <!-- Table -->
  <table class="table">
    ...
  </table>
</div>
```

If there is no panel body, the component moves from panel header to table without interruption.

# Panel heading

| # | First Name | Last Name |
| --- | --- | --- |
| 1 | Ted | Decker |
| 2 | Alisha | Marble |
| 3 | Pete | Foster |

```
<div class="panel panel-default">
  <!-- Default panel contents -->
  <div class="panel-heading"><h1 class="panel-title"><i class="fa fa-star"></i> Panel heading</h1></div>

  <!-- Table -->
  <table class="table">
    ...
  </table>
</div>
```

