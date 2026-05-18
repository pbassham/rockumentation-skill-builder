---
description: "Use when you need to apply margin or padding utilities to elements, or find spacing class names and their pixel values"
source: "https://community.rockrms.com/styling"
sourceLabel: Styling
---
> **Path:** Styling > Utilities > Spacing

## Spacing Utilities

Add, remove, or change the amount of spacing on the inside/outside of any element.

Position (Top/Right/Bottom/Left/Horizontal/Vertical/All), Amount (0,1,2,3,4,5,auto), Breakpoint (xs,sm,md,lg,xl)

### Margin and padding

Assign responsive-friendly `margin` or `padding` values to an element or a subset of its sides with shorthand classes. Includes support for individual properties, all properties, and vertical and horizontal properties. Classes range from `.25rem (4px)` to `3rem (48px)`.

#### Notation

Bootstrap-inspired spacing utilities that apply to all breakpoints, from `xs` to `lg`, have no breakpoint abbreviation in them. This is because those classes are applied from `min-width: 0` and up, and thus are not bound by a media query. The remaining breakpoints, however, do include a breakpoint abbreviation.

The classes are named using the format `{property}{sides}-{size}` for `xs` and `{property}{sides}-{breakpoint}-{size}` for `sm`, `md`, and `lg`.

Where *property* is one of:

- `m` - for classes that set `margin`
- `p` - for classes that set `padding`

Where *sides* is one of:

- `t` - (Top) for classes that set `margin-top` or `padding-top`
- `b` - (Bottom) for classes that set `margin-bottom` or `padding-bottom`
- `l` - (Left) for classes that set `margin-left` or `padding-left`
- `r` - (Right) for classes that set `margin-right` or `padding-right`
- `x` - (X-Axis) for classes that set both `*-left` and `*-right`
- `y` - (Y-Axis) for classes that set both `*-top` and `*-bottom`
- blank - for classes that set a `margin` or `padding` on all 4 sides of the element

Where *size* is one of:

- `0` - for classes that eliminate the `margin` or `padding` by setting it to `0`
- `1` - for classes that set the `margin` or `padding` to `.25rem (4px)`
- `2` - for classes that set the `margin` or `padding` to `.5rem (8px)`
- `3` - for classes that set the `margin` or `padding` to `1rem (16px)`
- `4` - for classes that set the `margin` or `padding` to `1.5rem (24px)`
- `5` - for classes that set the `margin` or `padding` to `3rem (48px)`
- `auto` - for classes that set the `margin` to auto

---

#### Additional Spacing Utilities v19.0

Beginning in version 19.0, included are similar padding and margin classes, but include more sizes, are named closer to Rock CSS variables, and set to fixed pixel values that range from 4px (tiny) to 80px (huge).

The classes are named using the format `{property}{sides}-spacing-{size}`.

Where *property* is one of:

- `m` - for classes that set `margin`
- `p` - for classes that set `padding`

Where *sides* is one of:

- `t` - (Top) for classes that set `margin-top` or `padding-top`
- `b` - (Bottom) for classes that set `margin-bottom` or `padding-bottom`
- `l` - (Left) for classes that set `margin-left` or `padding-left`
- `r` - (Right) for classes that set `margin-right` or `padding-right`
- `x` - (X-Axis) for classes that set both `*-left` and `*-right`
- `y` - (Y-Axis) for classes that set both `*-top` and `*-bottom`
- blank - for classes that set a `margin` or `padding` on all 4 sides of the element

Where *size* is one of:

- `none` - for classes that eliminate the `margin` or `padding` by setting it to `0`
- `tiny` - for classes that set the `margin` or `padding` to `4px`
- `xs` - for classes that set the `margin` or `padding` to `8px`
- `sm` - for classes that set the `margin` or `padding` to `12px`
- `md` - for classes that set the `margin` or `padding` to `16px`
- `lg` - for classes that set the `margin` or `padding` to `24px`
- `xl` - for classes that set the `margin` or `padding` to `48px`
- `huge` - for classes that set the `margin` or `padding` to `80px`

Examples:

- `p-spacing-sm` sets 12px padding on all sides.
- `pr-spacing-huge` sets 80px padding on the right side.
- `mx-spacing-md` sets 16px margin on the left and right sides.
- `mb-spacing-xs` sets 8px margin on the bottom.


---

## Vertical Alignment {#vertical-alignment}

> **Path:** Styling > Utilities > Vertical Alignment

## Vertical alignment Utilities

Easily change the vertical alignment of inline, inline-block, inline-table, and table cell elements.

Change the alignment of elements with the vertical-alignment utilities. Please note that vertical-align only affects inline, inline-block, inline-table, and table cell elements.

Choose from .align-baseline, .align-top, .align-middle, .align-bottom, .align-text-bottom, and .align-text-top as needed.

To vertically center non-inline content (like `<div>`s and more), use our flex box utilities.

With inline elements:

baseline top middle bottom text-top text-bottom

```
<span class="align-baseline">baseline</span>
<span class="align-top">top</span>
<span class="align-middle">middle</span>
<span class="align-bottom">bottom</span>
<span class="align-text-top">text-top</span>
<span class="align-text-bottom">text-bottom</span>
```

With table cells:

| baseline | top | middle | bottom | text-top | text-bottom |
| --- | --- | --- | --- | --- | --- |

```
<table style="height: 100px;">
  <tbody>
    <tr>
      <td class="align-baseline">baseline</td>
      <td class="align-top">top</td>
      <td class="align-middle">middle</td>
      <td class="align-bottom">bottom</td>
      <td class="align-text-top">text-top</td>
      <td class="align-text-bottom">text-bottom</td>
    </tr>
  </tbody>
</table>
```


---

## Z-index {#z-index}

> **Path:** Styling > Utilities > Z-index

## Z-index Utilities

Use our low-level z-index utilities to quickly change the stack level of an element or component.

z-40

z-30

z-20

z-10

z-0

| Class | Properties |
| --- | --- |
| `-z-10` | `z-index: -10;` |
| `z-0` | `z-index: 0;` |
| `z-10` | `z-index: 10;` |
| `z-20` | `z-index: 20;` |
| `z-30` | `z-index: 30;` |
| `z-40` | `z-index: 40;` |
| `z-50` | `z-index: 50;` |
| `z-auto` | `z-index: auto;` |

