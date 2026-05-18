---
description: "Use when styling element borders, border colors, or applying rounded corners to components"
source: "https://community.rockrms.com/styling"
sourceLabel: Styling
---
> **Path:** Styling > Utilities > Borders

## Border Utilities

Utilities to quickly style the border and border-radius of any element.

### Adding Borders

Add borders to any element, and then use [color classes](#border-colors) to set the border color.

.border

.border-top

.border-right

.border-bottom

.border-left

| Class | Properties |
| --- | --- |
| `border` | `border: 1px solid #000000;` |
| `border-top` | `border-top: 1px solid #000000;` |
| `border-right` | `border-right: 1px solid #000000;` |
| `border-bottom` | `border-bottom: 1px solid #000000;` |
| `border-left` | `border-left: 1px solid #000000;` |

---

### Removing Borders

Use the `.border-0` and `.border-{side}-0` utilities to remove borders from an element.

| Class | Properties |
| --- | --- |
| `border-0` | `border: 0` |
| `border-top-0` | `border-top: 0` |
| `border-right-0` | `border-right: 0` |
| `border-bottom-0` | `border-bottom: 0` |
| `border-left-0` | `border-left: 0` |

---

### Border Colors

Brand specific colors are avalible in addtion to the colors availble on the [color utilities](https://community.rockrms.com/styling/utilities/colors) page.

.border-primary

.border-success

.border-danger

.border-warning

.border-info

.border-white

| Class | Properties |
| --- | --- |
| `border-primary` | `border-color: @brand-primary;` |
| `border-success` | `border-color: @brand-success;` |
| `border-danger` | `border-color: @brand-danger;` |
| `border-warning` | `border-color: @brand-warning;` |
| `border-info` | `border-color: @brand-info;` |
| `border-white` | `border-color: #fff;` |
| `border-transparent` | `border-color: transparent;` |

---

### Rounded Corners

Use utilities like `.rounded-sm`, `.rounded`, or `.rounded-lg` to apply different border radius sizes to an element.

.rounded-0

.rounded-sm

.rounded

.rounded-lg

.rounded-circle

.rounded-pill

.rounded-top

.rounded-right

.rounded-bottom

.rounded-left

| Class | Properties |
| --- | --- |
| `rounded-0` | `border-radius: 0px;` |
| `rounded-sm` | `border-radius: 3px;` |
| `rounded` | `border-radius: @border-radius-base;` |
| `rounded-lg` | `border-radius: @border-radius-large;` |
| `rounded-circle` | `border-radius: 50%;` |
| `rounded-pill` | `border-radius: 999px;` |
| `rounded-top` | `border-top-left-radius: @border-radius-base;      border-top-right-radius: @border-radius-base;` |
| `rounded-right` | `border-top-right-radius: @border-radius-base;      border-bottom-right-radius: @border-radius-base;` |
| `rounded-bottom` | `border-bottom-right-radius: @border-radius-base;      border-bottom-left-radius: @border-radius-base;` |
| `rounded-left` | `border-top-left-radius: @border-radius-base;      border-bottom-left-radius: @border-radius-base;` |

