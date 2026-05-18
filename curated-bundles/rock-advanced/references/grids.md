---
description: "Use when user needs to understand Rock's responsive grid system, layout containers, columns, breakpoints, or how to structure page layouts"
source: "https://community.rockrms.com/styling"
sourceLabel: Styling
---
> **Path:** Styling > Layout > Grids

## Styling Grids

Rock’s grid system uses a series of containers, rows, and columns to layout and align content.

## How it works

- **Our grid supports four responsive breakpoints.** Breakpoints are based on `min-width` media queries, meaning they affect that breakpoint and all those above it (e.g., `.col-sm-4` applies to `sm`, `md`, and `lg`. This means you can control column sizing by each breakpoint.
- **Containers center and horizontally pad your content**
	Use `.container` for a responsive pixel width, `.container-fluid` for `width: 100%` across all viewports and devices.
- **Rows are wrappers for columns.** Each column has horizontal `padding` (called a gutter) for controlling the space between them. This `padding` is then counteracted on the rows with negative margins to ensure the content in your columns is visually aligned down the left side.
- **Columns are incredibly flexible.** There are 12 template columns available per row, allowing you to create different combinations of elements that span any number of columns. Column classes indicate the number of template columns to span (e.g., `col-xs-4` spans four). `width`s are set in percentages so you always have the same relative sizing.

## Grid Options

Rock’s grid system can adapt across all four default breakpoints. The four default grid tiers are as follow:

<table><thead><tr><th></th><th><strong>xs</strong> <small><768px</small></th><th><strong>sm</strong> <small>≥768px</small></th><th><strong>md</strong> <small>≥992px</small></th><th><strong>lg</strong> <small>≥1200px</small></th></tr></thead><tbody><tr><th scope="row">Container width</th><td>None (auto)</td><td>750px</td><td>970px</td><td>1170px</td></tr><tr><th scope="row">Class prefix</th><td><code>.col-xs-</code></td><td><code>.col-sm-</code></td><td><code>.col-md-</code></td><td><code>.col-lg-</code></td></tr><tr><th scope="row"># of columns</th><td colspan="4">12</td></tr><tr><th scope="row">Gutter width</th><td colspan="4">30px (15px on left and right)</td></tr><tr><th scope="row">Nestable</th><td colspan="4">Yes</td></tr><tr><th scope="row">Offsets</th><td colspan="4">Yes</td></tr><tr><th scope="row">Column ordering</th><td colspan="4">Yes</td></tr></tbody></table>

### Grid Examples

Rock's default grid includes gutters, which are spaces between columns that help to separate the content. By default they provide 30px of space between columns (or 15px on the left and right sides)

These divisions are helpful when trying to use columns to display paragraphs of text, but there may be times where you want to remove this spacing, and have the grid columns be flush with each other. This can be accomplished by adding the `no-gutters` helper class to the same element that contains the `row` class.

#### Standard Grid

Repellendus perspiciatis sed. Expedita corporis inventore ratione nobis autem at qui. Eaque dolores nihil aut quo. Quia beatae nostrum illo tenetur tempora et sit soluta. Qui consequuntur id porro. Facilis quidem et dicta enim et eos. Dignissimos officiis neque fuga et sapiente necessitatibus qui nihil beatae. Qui odit rerum sed omnis sed et deserunt. Laborum vel in est. Nesciunt ullam quia vitae dolorem earum non enim.

Quia et dignissimos a labore corporis sed libero excepturi rerum. Ea dolores deserunt. Illum sint quae. Qui ex. Dicta et odit aliquam illo sed sed totam accusamus. Corrupti et et est illo officia rerum quod dolor. Sunt assumenda temporibus quidem suscipit. Quasi voluptates nihil ipsam repudiandae non quaerat. Cupiditate officiis aspernatur ipsum.

```
<div class="row">
    <div class="col-md-6">
        <p>Repellendus perspiciatis sed. Expedita corporis inventore ratione nobis autem at qui. Eaque dolores nihil aut quo. Quia beatae nostrum illo tenetur tempora et sit soluta. Qui consequuntur id porro. Facilis quidem et dicta enim et eos. Dignissimos officiis neque fuga et sapiente necessitatibus qui nihil beatae. Qui odit rerum sed omnis sed et deserunt. Laborum vel in est. Nesciunt ullam quia vitae dolorem earum non enim.</p>
    </div>
    <div class="col-md-6">
        <p>Quia et dignissimos a labore corporis sed libero excepturi rerum. Ea dolores deserunt. Illum sint quae. Qui ex. Dicta et odit aliquam illo sed sed totam accusamus. Corrupti et et est illo officia rerum quod dolor. Sunt assumenda temporibus quidem suscipit. Quasi voluptates nihil ipsam repudiandae non quaerat. Cupiditate officiis aspernatur ipsum.</p>
    </div>
</div>
```

#### Gutterless Grid

![](https://images.unsplash.com/photo-1491438590914-bc09fcaaf77a?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=100)

![](https://images.unsplash.com/photo-1536010447069-d2c8af80c584?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=100)

```
<div class="row no-gutters">
    <div class="col-md-6">
        <img src="https://images.unsplash.com/photo-1491438590914-bc09fcaaf77a?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=100" class="mw-100" />
    </div>
    <div class="col-md-6">
        <img src="https://images.unsplash.com/photo-1536010447069-d2c8af80c584?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=100" class="mw-100" />
    </div>
</div>
```

#### Stacked-to-horizontal

Using a single set of `.col-md-*` grid classes, you can create a basic grid system that starts out stacked on mobile devices and tablet devices (the extra small to small range) before becoming horizontal on desktop (medium) devices. Place grid columns in any `.row`.

.col-md-1

.col-md-1

.col-md-1

.col-md-1

.col-md-1

.col-md-1

.col-md-1

.col-md-1

.col-md-1

.col-md-1

.col-md-1

.col-md-1

.col-md-8

.col-md-4

.col-md-4

.col-md-4

.col-md-4

.col-md-6

.col-md-6

```
<div class="row mb-3">
  <div class="col-md-1">.col-md-1</div>
  <div class="col-md-1">.col-md-1</div>
  <div class="col-md-1">.col-md-1</div>
  <div class="col-md-1">.col-md-1</div>
  <div class="col-md-1">.col-md-1</div>
  <div class="col-md-1">.col-md-1</div>
  <div class="col-md-1">.col-md-1</div>
  <div class="col-md-1">.col-md-1</div>
  <div class="col-md-1">.col-md-1</div>
  <div class="col-md-1">.col-md-1</div>
  <div class="col-md-1">.col-md-1</div>
  <div class="col-md-1">.col-md-1</div>
</div>
<div class="row mb-3">
  <div class="col-md-8">.col-md-8</div>
  <div class="col-md-4">.col-md-4</div>
</div>
<div class="row mb-3">
  <div class="col-md-4">.col-md-4</div>
  <div class="col-md-4">.col-md-4</div>
  <div class="col-md-4">.col-md-4</div>
</div>
<div class="row">
  <div class="col-md-6">.col-md-6</div>
  <div class="col-md-6">.col-md-6</div>
</div>
```

**Want even more examples?** Visit the [Bootstrap Grid documentation](https://getbootstrap.com/docs/3.4/css/#grid) for even more examples.

