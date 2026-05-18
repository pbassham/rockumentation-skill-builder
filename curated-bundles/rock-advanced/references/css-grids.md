---
description: "Use when designing responsive multi-column layouts, configuring grid gaps, or controlling how content spans across grid cells"
source: "https://community.rockrms.com/styling"
sourceLabel: Styling
---
> **Path:** Styling > Layout > CSS Grids

## CSS Grids

A modern grid system for creating sophisticated and fluid layouts.

## How it works

- **Defining a CSS Grid** The way you define a CSS grid is by using either the `d-grid` or `d-inline-grid` classes. By placing one of these classes on a div, the browser will automatically assume that any direct child of this div is a "column" or "row" of the grid. No extra child div classes necessary.
- **CSS grid within Rock supports four responsive breakpoints.** Breakpoints are based on `min-width` media queries, meaning they affect that breakpoint and all those above it (e.g., `.grid-cols-sm-4` applies to `sm`, `md`, and `lg`. This means you can control column sizing by each breakpoint.
- **Most simple grids require no child-node CSS classes**

## Defining a Grid & Direction

### Grids

01

02

03

```
<div class="d-grid gap-3">
    <div>01</div>
    <div>02</div>
    <div>03</div>
  </div>
```

### Inline Grids

01

02 has more text

03

```
<div class="d-inline-grid gap-3">
    <div>01</div>
    <div>02 has more text</div>
    <div>03</div>
  </div>
```

## Column/Row Auto Flow Direction

### Column Grid

01

02

03

```
<div class="d-grid grid-flow-column gap-3">
    <div>01</div>
    <div>02</div>
    <div>03</div>
  </div>
```

### Row Grid

01

02

03

```
<div class="d-grid grid-flow-row gap-3">
    <div>01</div>
    <div>02</div>
    <div>03</div>
  </div>
```

## Defining a Number of Columns/Rows

**Note:** Shrink or expand the width of the browser to see how the number of columns transitions between breakpoints.

01

02

03

04

05

06

07

08

09

```
<div class="d-grid grid-cols-sm-2 grid-cols-md-3 grid-cols-lg-6 gap-3">
    <div>01</div>
    <div>02</div>
    <div>03</div>
    <div>04</div>
    <div>05</div>
    <div>06</div>
    <div>07</div>
    <div>08</div>
    <div>09</div>
  </div>
```

## Grid Gaps

**Note:** Grid gaps are only added between columns and rows, and not around the outer perimeter of the grid (gutter). If you need spacing on the sides of the grid, consider using a padding class on the parent grid element, such as `px-3`. If you only need horizontal or vertical gaps in your grid, consider using the `gap-x-#` and `gap-y-#` classes.

01

02

03

04

05

06

```
<div class="d-grid grid-cols-2 grid-cols-md-3 gap-x-2 gap-x-md-4">
    <div>01</div>
    <div>02</div>
    <div>03</div>
    <div>04</div>
    <div>05</div>
    <div>06</div>
  </div>
```

01

02

03

04

05

06

```
<div class="d-grid grid-cols-2 grid-cols-md-3 gap-y-2 gap-y-md-4">
    <div>01</div>
    <div>02</div>
    <div>03</div>
    <div>04</div>
    <div>05</div>
    <div>06</div>
  </div>
```

## Custom Column/Row Sizes

### Column/Row Spanning

01

02

03

04

05

```
<div class="d-grid grid-cols-3 gap-2">
    <div>01</div>
    <div class="col-span-2">02</div>
    <div class="col-span-2">03</div>
    <div>04</div>
    <div class="col-span-3">05</div>
  </div>
```

### Column/Row Start/End

## Practical Applications for Rock

**Want even more examples?** Visit the [Tailwind CSS Grid documentation](https://tailwindcss.com/docs/grid-template-columns) for even more examples.

