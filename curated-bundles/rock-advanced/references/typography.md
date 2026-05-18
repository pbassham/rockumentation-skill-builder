---
description: "Use when styling text elements, controlling font sizes, text alignment, colors, case transformations, or formatting inline text in Rock UI"
source: "https://community.rockrms.com/styling"
sourceLabel: Styling
---
> **Path:** Styling > Content > Typography

## Styling Type

Documentation and examples for typography, headings, body text, lists, and more.

### Text Alignment

Left aligned text on all viewport sizes.

Center aligned text on all viewport sizes.

Right aligned text on all viewport sizes.

```
<p class="text-left">Left aligned text on all viewport sizes.</p>
<p class="text-center">Center aligned text on all viewport sizes.</p>
<p class="text-right">Right aligned text on all viewport sizes.</p>
```

### Inline text elements

Styling for common inline HTML5 elements.

You can use the mark tag to ==highlight== text.

~~This line of text is meant to be treated as deleted text.~~

~~This line of text is meant to be treated as no longer accurate.~~

This line of text is meant to be treated as an addition to the document.

This line of text will render as underlined.

This line of text is meant to be treated as fine print.

**This line rendered as bold text.**

*This line rendered as italicized text.*

```
<p>You can use the mark tag to <mark>highlight</mark> text.</p>
<p><del>This line of text is meant to be treated as deleted text.</del></p>
<p><s>This line of text is meant to be treated as no longer accurate.</s></p>
<p><ins>This line of text is meant to be treated as an addition to the document.</ins></p>
<p><u>This line of text will render as underlined.</u></p>
<p><small>This line of text is meant to be treated as fine print.</small></p>
<p><strong>This line rendered as bold text.</strong></p>
<p><em>This line rendered as italicized text.</em></p>
```

### Text Color

Rock provides two primary colors for text used throughout the Rock UI. `text-color`, which sets the color to the default body color, and `text-muted` which de-emphasizes the text. Additional colors are available via [Color Utilities](https://community.rockrms.com/styling/utilities/colors)

Default text color.

Muted text color.

```
<p class="text-color">Default text color.</p>
<p class="text-muted">Muted text color.</p>
```

### Case

Utilities for controlling the transformation of text.

This is lowercase text (.text-lowercase).

This is uppercase text (.text-uppercase).

This text is capitalized (.text-capitalize).

| Class | Properties |
| --- | --- |
| `text-lowercase` | `text-transform: lowercase;` |
| `text-uppercase` | `text-transform: uppercase;` |
| `text-capitalize` | `text-transform: capitalize;` |

### Font Size v19.0

Utilities for controlling the font size of an element.

This is font-size-h1.

This is font-size-h2.

This is font-size-h3.

This is font-size-h4.

This is font-size-h5.

This is font-size-h6.

This is font-size-regular.

This is font-size-sm.

This is font-size-xs.

| Class | Properties |
| --- | --- |
| `font-size-h1` | `font-size: 44px;` |
| `font-size-h2` | `font-size: 36px;` |
| `font-size-h3` | `font-size: 28px;` |
| `font-size-h4` | `font-size: 22px;` |
| `font-size-h5` | `font-size: 18px;` |
| `font-size-h6` | `font-size: 16px;` |
| `font-size-regular` | `font-size: 16px;` |
| `font-size-sm` | `font-size: 14px;` |
| `font-size-xs` | `font-size: 12px;` |

### Font Weight

Utilities for controlling the font weight of an element.

This is text-light.

This is text-normal.

This is text-semibold.

This is text-bold.

| Class | Properties |
| --- | --- |
| `text-light` | `font-weight: 300;` |
| `text-normal` | `font-weight: 400;` |
| `text-semibold` | `font-weight: 700;` |
| `text-bold` | `font-weight: 900;` |

### Underline & Strikethrough

| Class | Properties |
| --- | --- |
| `text-decoration-none` | `text-decoration: none;` |
| `text-linethrough` | `text-decoration: line-through;` |

### Line Height

Utilities for controlling the leading (line height) of an element.

.leading-tight

Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda, quia temporibus eveniet a libero incidunt suscipit laborum, rerum accusantium modi quidem, ipsam illum quis sed voluptatum quae eum fugit earum.

.leading-snug

Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda, quia temporibus eveniet a libero incidunt suscipit laborum, rerum accusantium modi quidem, ipsam illum quis sed voluptatum quae eum fugit earum.

.leading-normal

Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda, quia temporibus eveniet a libero incidunt suscipit laborum, rerum accusantium modi quidem, ipsam illum quis sed voluptatum quae eum fugit earum.

.leading-relaxed

Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda, quia temporibus eveniet a libero incidunt suscipit laborum, rerum accusantium modi quidem, ipsam illum quis sed voluptatum quae eum fugit earum.

.leading-loose

Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda, quia temporibus eveniet a libero incidunt suscipit laborum, rerum accusantium modi quidem, ipsam illum quis sed voluptatum quae eum fugit earum.

.line-height-normal v19.0

Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda, quia temporibus eveniet a libero incidunt suscipit laborum, rerum accusantium modi quidem, ipsam illum quis sed voluptatum quae eum fugit earum.

.line-height-tight v19.0

Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda, quia temporibus eveniet a libero incidunt suscipit laborum, rerum accusantium modi quidem, ipsam illum quis sed voluptatum quae eum fugit earum.

.line-height-compact v19.0

Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda, quia temporibus eveniet a libero incidunt suscipit laborum, rerum accusantium modi quidem, ipsam illum quis sed voluptatum quae eum fugit earum.

| Class | Properties |
| --- | --- |
| `leading-tight` | `line-height: 1.25;` |
| `leading-snug` | `line-height: 1.375;` |
| `leading-normal` | `line-height: 1.5;` |
| `leading-relaxed` | `line-height: 1.625;` |
| `leading-loose` | `line-height: 2;` |

### Text Wrap v16.3

Utilities for controlling how text wraps within an element.

.text-wrap

### Use to wrap overflowing text onto multiple lines at logical points in the text.

.text-nowrap

### Use to no wrap to prevent text from wrapping.

.text-balance

### Use to balanced to distribute the text evenly across each line.

.text-pretty

### Use to prevent orphans (a single word on its own line) at the end of a text block.

### Line Clamp v16.3

Utilities for limiting text to a specific number of lines.

.line-clamp-1

Limits to one line of text even if the text is super long and could span multiple lines because it was written by someone who loves to write and doesn't mind that people need to read everything they write because their prose is so good that of course everyone is going to want to read it even if that's not the case, in fact quite the opposite.

.line-clamp-2

Limits to two line of text even if the text is super long and could span multiple lines because it was written by someone who loves to write and doesn't mind that people need to read everything they write because their prose is so good that of course everyone is going to want to read it even if that's not the case, in fact quite the opposite.

.line-clamp-3

Limits to three line of text even if the text is super long and could span multiple lines because it was written by someone who loves to write and doesn't mind that people need to read everything they write because their prose is so good that of course everyone is going to want to read it even if that's not the case, in fact quite the opposite.

.line-clamp-4

Limits to four line of text even if the text is super long and could span multiple lines because it was written by someone who loves to write and doesn't mind that people need to read everything they write because their prose is so good that of course everyone is going to want to read it even if that's not the case, in fact quite the opposite.

.line-clamp-5

Limits to five line of text even if the text is super long and could span multiple lines because it was written by someone who loves to write and doesn't mind that people need to read everything they write because their prose is so good that of course everyone is going to want to read it even if that's not the case, in fact quite the opposite.

.line-clamp-6

Limits to six line of text even if the text is super long and could span multiple lines because it was written by someone who loves to write and doesn't mind that people need to read everything they write because their prose is so good that of course everyone is going to want to read it even if that's not the case, in fact quite the opposite.

### Font Variants v16.3

Utilities for controlling the variant of numbers. Note, as you can see below not all fonts support these glyphs.

.ordinal

You can find it on the 4th floor.

.diagonal-fractions

We're off by 1/2 an inch.

.stacked-fractions

We're off by 1/2 an inch.

.slashed-zero

I prefer my 0's with lines in them.

.lining-nums

I prefer my numbers to be aligned by their baseline like 1234567890.

.oldstyle-nums

I prefer my numbers to use numeric glyphs where some numbers have descenders like 1234567890.

.proportional-nums

I prefer my numbers to use glyphs that have proportional widths 1234567890.

.tabular-nums

I prefer my numbers to use have uniform/tabular widths like 1234567890.

