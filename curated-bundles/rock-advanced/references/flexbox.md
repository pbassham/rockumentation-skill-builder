---
description: "Use when styling flexible layouts, aligning flex items on main/cross axes, or setting flex direction and item distribution with CSS utility classes"
source: "https://community.rockrms.com/styling"
sourceLabel: Styling
---
> **Path:** Styling > Utilities > Flexbox

## Flexbox Utilities

Quickly manage the layout, alignment, and sizing of grid columns, navigation, components, and more with a full suite of responsive flexbox utilities.

### Enable flex behaviors

Apply `display` utilities to create a flexbox container and transform **direct children elements** into flex items. Flex containers and items are able to be modified further with the utility classes below.

##### Example: Enable Flex Behaviors

I'm a flexbox container!

```
<div class="d-flex p-2">I'm a flexbox container!</div>
```

**Display Flex Classes**

- `.d-flex` - Display Flex.
- `.d-inline-flex` - Display inline flex

---

### Flex Direction

Set the direction of flex items in a flex container with direction utilities.

- `.flex-row` (Default) - left to right
- `.flex-row-reverse` - right to left
- `.flex-column` - top to bottom
- `.flex-column-reverse` - bottom to top

**Responsive Classes**

- `.flex-[sm, md & lg]-[value]` for breakpoint and up

##### Example: Flex Direction

Flex item 1

Flex item 2

Flex item 3

Flex item 1

Flex item 2

Flex item 3

Flex item 1

Flex item 2

Flex item 3

Flex item 1

Flex item 2

Flex item 3

```
<!-- Example 1 -->
<div class="d-flex flex-row mb-3">
    <div class="p-2">Flex item 1</div>
    <div class="p-2">Flex item 2</div>
    <div class="p-2">Flex item 3</div>
</div>

<!-- Example 2 -->
<div class="d-flex flex-row-reverse mb-3">
    <div class="p-2">Flex item 1</div>
    <div class="p-2">Flex item 2</div>
    <div class="p-2">Flex item 3</div>
</div>

<!-- Example 3 -->
<div class="d-flex flex-column mb-3">
    <div class="p-2">Flex item 1</div>
    <div class="p-2">Flex item 2</div>
    <div class="p-2">Flex item 3</div>
</div>

<!-- Example 4 -->
<div class="d-flex flex-column-reverse">
    <div class="p-2">Flex item 1</div>
    <div class="p-2">Flex item 2</div>
    <div class="p-2">Flex item 3</div>
</div>
```

---

### Justify Content

Use justify-content utilities on flexbox containers to change the alignment of flex items on the main axis (the x-axis to start, y-axis if `flex-direction: column`). Choose from start (browser default), end, center, between, or around.

- `.justify-content-start` (default) items anchored to the start
- `.justify-content-end` - items anchored to the end
- `.justify-content-center` - items centered
- `.justify-content-between` - items evenly distributed in the line. First item in on the start and last item is at the end
- `.justify-content-around` - start and end items are not to the edge but have 1 unit of space on each side

**Responsive Classes**

- `.justify-content-[sm, md & lg]-[value]` for breakpoint and up

##### Example: Justify Content

Flex item

Flex item

Flex item

Flex item

Flex item

Flex item

Flex item

Flex item

Flex item

Flex item

Flex item

Flex item

Flex item

Flex item

Flex item

Flex item

Flex item

Flex item

```
<!-- Example 1 -->
<div class="d-flex justify-content-start mb-3">
    <div class="p-2">Flex item</div>
    <div class="p-2">Flex item</div>
    <div class="p-2">Flex item</div>
</div>

<!-- Example 2 -->
<div class="d-flex justify-content-end mb-3">
    <div class="p-2">Flex item</div>
    <div class="p-2">Flex item</div>
    <div class="p-2">Flex item</div>
</div>

<!-- Example 3 -->
<div class="d-flex justify-content-center mb-3">
    <div class="p-2">Flex item</div>
    <div class="p-2">Flex item</div>
    <div class="p-2">Flex item</div>
</div>

<!-- Example 4 -->
<div class="d-flex justify-content-between mb-3">
    <div class="p-2">Flex item</div>
    <div class="p-2">Flex item</div>
    <div class="p-2">Flex item</div>
</div>

<!-- Example 5 -->
<div class="d-flex justify-content-around mb-3">
    <div class="p-2">Flex item</div>
    <div class="p-2">Flex item</div>
    <div class="p-2">Flex item</div>
</div>

<!-- Example 6 -->
<div class="d-flex justify-content-evenly">
    <div class="p-2">Flex item</div>
    <div class="p-2">Flex item</div>
    <div class="p-2">Flex item</div>
</div>
```

---

### Align Items

Use `align-items` utilities on flexbox containers to change the alignment of flex items on the cross axis (the y-axis to start, x-axis if `flex-direction: column`). Choose from `start`, `end`, `center`, `baseline`, or `stretch` (browser default).

- `.align-items-start` - cross axis align items to start
- `.align-items-end` - cross axis align items to end
- `.align-items-center` - cross axis align items center
- `.align-items-baseline` - align baselines
- `.align-items-stretch` (default) - stretch to fill the container

**Responsive Classes**

- `.align-items-[sm, md & lg]-[value]` for breakpoint and up

##### Example: Align Items

Flex item

Flex item

Flex item

Flex item

Flex item

Flex item

Flex item

Flex item

Flex item

Flex item

Flex item

Flex item

Flex item

Flex item

Flex item

```
<!-- Example 1 -->
<div class="d-flex align-items-start mb-3" style="height: 100px">
    <div class="p-2">Flex item</div>
    <div class="p-2">Flex item</div>
    <div class="p-2">Flex item</div>
</div>

<!-- Example 2 -->
<div class="d-flex align-items-end mb-3" style="height: 100px">
    <div class="p-2">Flex item</div>
    <div class="p-2">Flex item</div>
    <div class="p-2">Flex item</div>
</div>

<!-- Example 3 -->
<div class="d-flex align-items-center mb-3" style="height: 100px">
    <div class="p-2">Flex item</div>
    <div class="p-2">Flex item</div>
    <div class="p-2">Flex item</div>
</div>

<!-- Example 4 -->
<div class="d-flex align-items-baseline mb-3" style="height: 100px">
    <div class="p-2">Flex item</div>
    <div class="p-2">Flex item</div>
    <div class="p-2">Flex item</div>
</div>

<!-- Example 5 -->
<div class="d-flex align-items-stretch" style="height: 100px">
    <div class="p-2">Flex item</div>
    <div class="p-2">Flex item</div>
    <div class="p-2">Flex item</div>
</div>
```

---

### Align Self

Use `align-self` utilities on flexbox items to individually change their alignment on the cross axis (the y-axis to start, x-axis if `flex-direction: column`). Choose from the same options as align-items: `start`, `end`, `center`, `baseline`, or `stretch` (browser default).

- `.align-self-start` - cross axis align items to start
- `.align-self-end` - cross axis align items to end
- `.align-self-center` - cross axis align items center
- `.align-self-baseline` - align baselines
- `.align-self-stretch` (default) - stretch to fill the container

**Responsive Classes**

- `.align-self-[sm, md & lg]-[value]` for breakpoint and up

##### Example: Align Self

Flex item

Aligned flex item

Flex item

Flex item

Aligned flex item

Flex item

Flex item

Aligned flex item

Flex item

Flex item

Aligned flex item

Flex item

Flex item

Aligned flex item

Flex item

```
<!-- Example 1 -->
<div class="d-flex mb-3" style="height: 100px">
    <div class="p-2">Flex item</div>
    <div class="align-self-start p-2">Aligned flex item</div>
    <div class="p-2">Flex item</div>
</div>

<!-- Example 2 -->
<div class="d-flex mb-3" style="height: 100px">
    <div class="p-2">Flex item</div>
    <div class="align-self-end p-2">Aligned flex item</div>
    <div class="p-2">Flex item</div>
</div>

<!-- Example 3 -->
<div class="d-flex mb-3" style="height: 100px">
    <div class="p-2">Flex item</div>
    <div class="align-self-center p-2">Aligned flex item</div>
    <div class="p-2">Flex item</div>
</div>

<!-- Example 4 -->
<div class="d-flex mb-3" style="height: 100px">
    <div class="p-2">Flex item</div>
    <div class="align-self-baseline p-2">Aligned flex item</div>
    <div class="p-2">Flex item</div>
</div>

<!-- Example 5 -->
<div class="d-flex" style="height: 100px">
    <div class="p-2">Flex item</div>
    <div class="align-self-stretch p-2">Aligned flex item</div>
    <div class="p-2">Flex item</div>
</div>
```

---

### Flex Wrap

Change how flex items wrap in a flex container. Choose from no wrapping at all (the browser default) with .flex-nowrap, wrapping with .flex-wrap, or reverse wrapping with .flex-wrap-reverse.

- `.flex-nowrap` (default) - Items are not allowed to wrap and will overflow if too wide.
- `.flex-wrap` wraps content
- `.flex-wrap-reverse` - Wraps in the opposite direction, i.e. first row is placed on bottom

**Responsive Classes**

- `.flex-[sm, md & lg]-[value]` for breakpoint and up

##### Example: Flex Wrap

Flex item

Flex item

Flex item

Flex item

Flex item

Flex item

Flex item

Flex item

Flex item

Flex item

Flex item

Flex item

Flex item

Flex item

Flex item

Flex item

Flex item

Flex item

Flex item

Flex item

Flex item

Flex item

Flex item

Flex item

Flex item

Flex item

Flex item

Flex item

Flex item

Flex item

Flex item

Flex item

Flex item

Flex item

Flex item

```
<!-- Example 1 -->
<div class="d-flex flex-nowrap mb-3" style="width: 8rem;">
    <div class="p-2">Flex item</div>
    <div class="p-2">Flex item</div>
    <div class="p-2">Flex item</div>
    <div class="p-2">Flex item</div>
    <div class="p-2">Flex item</div>
</div>

<!-- Example 2 -->
<div class="d-flex flex-wrap mb-3">
    <div class="p-2">Flex item</div>
    <div class="p-2">Flex item</div>
    <div class="p-2">Flex item</div>
    <div class="p-2">Flex item</div>
    <div class="p-2">Flex item</div>
    <div class="p-2">Flex item</div>
    <div class="p-2">Flex item</div>
    <div class="p-2">Flex item</div>
    <div class="p-2">Flex item</div>
    <div class="p-2">Flex item</div>
    <div class="p-2">Flex item</div>
    <div class="p-2">Flex item</div>
    <div class="p-2">Flex item</div>
    <div class="p-2">Flex item</div>
    <div class="p-2">Flex item</div>
</div>

<!-- Example 3 -->
<div class="d-flex flex-wrap-reverse">
    <div class="p-2">Flex item</div>
    <div class="p-2">Flex item</div>
    <div class="p-2">Flex item</div>
    <div class="p-2">Flex item</div>
    <div class="p-2">Flex item</div>
    <div class="p-2">Flex item</div>
    <div class="p-2">Flex item</div>
    <div class="p-2">Flex item</div>
    <div class="p-2">Flex item</div>
    <div class="p-2">Flex item</div>
    <div class="p-2">Flex item</div>
    <div class="p-2">Flex item</div>
    <div class="p-2">Flex item</div>
    <div class="p-2">Flex item</div>
    <div class="p-2">Flex item</div>
</div>
```

---

### Order

Change the visual order of specific flex items with a handful of order utilities. We only provide options for making an item first or last, as well as a reset to use the DOM order.

- `.order-{1-12}`

**Responsive Classes**

- `.order-[sm, md & lg]-[value]` for breakpoint and up

##### Example: Order

First flex item

Second flex item

Third flex item

```
<div class="d-flex flex-nowrap">
    <div class="order-3 p-2">First flex item</div>
    <div class="order-2 p-2">Second flex item</div>
    <div class="order-1 p-2">Third flex item</div>
</div>
```

---

### Fill

Use the `flex-fill` class on a series of sibling elements to force them into widths equal to their content (or equal widths if their content does not surpass their border-boxes) while taking up all available horizontal space.

Flex item with a lot of content

Flex item

Flex item

```
<div class="d-flex flex-nowrap">
    <div class="flex-fill p-2">Flex item with a lot of content</div>
    <div class="flex-fill p-2">Flex item</div>
    <div class="flex-fill p-2">Flex item</div>
</div>
```

---

### Equal

Use the `flex-eq` class to allow a flex item to grow as needed, ignoring its initial size.

**Responsive Classes**

- `.flex-[sm, md & lg]-eq` for breakpoint and up

Flex item with a lot of content

Flex item

```
<div class="d-flex flex-nowrap">
    <div class="flex-eq p-2">Flex item with a lot of content</div>
    <div class="flex-eq p-2">Flex item</div>
    <div class="flex-eq p-2"> </div>
</div>
```

---

### Grow and shrink

Use `.flex-grow-*` utilities to toggle a flex item’s ability to grow to fill available space. In the example below, the `.flex-grow-1` elements uses all available space it can, while allowing the remaining two flex items their necessary space.

Flex item

Flex item

Flex item

```
<div class="d-flex flex-nowrap">
    <div class="flex-grow-1 p-2">Flex item</div>
    <div class="p-2">Flex item</div>
    <div class="p-2">Flex item</div>
</div>
```

Use `.flex-shrink-*` utilities to toggle a flex item’s ability to shrink if necessary. In the example below, the second flex item with `.flex-shrink-1` is forced to wrap its contents to a new line, “shrinking” to allow more space for the previous flex item with `.w-100`.

Flex item

Flex item

```
<div class="d-flex flex-nowrap">
    <div class="w-100 p-2">Flex item</div>
    <div class="flex-shrink-1 p-2">Flex item</div>
</div>
```

Responsive variations also exist for flex-grow and flex-shrink.

- `.flex-{grow|shrink}-0`
- `.flex-{grow|shrink}-1`
- `.flex-sm-{grow|shrink}-0`
- `.flex-sm-{grow|shrink}-1`
- `.flex-md-{grow|shrink}-0`
- `.flex-md-{grow|shrink}-1`
- `.flex-lg-{grow|shrink}-0`
- `.flex-lg-{grow|shrink}-1`
- `.flex-xl-{grow|shrink}-0`
- `.flex-xl-{grow|shrink}-1`


---

## Opacity {#opacity}

> **Path:** Styling > Utilities > Opacity

## Opacity

Control the opacity of elements.

The `opacity` property sets the opacity level for an element. The opacity level describes the transparency level, where `1` is not transparent at all, `.5` is 50% visible, and `0` is completely transparent.

Set the `opacity` of an element using `.o-{value}` utilities.

100%

80%

50%

20%

0%

```
<div class="o-100">100%</div>
<div class="o-80">80%</div>
<div class="o-50">50%</div>
<div class="o-20">20%</div>
<div class="o-0">0%</div>
```

| Class | Properties |
| --- | --- |
| `o-0` | `opacity: 0;` |
| `o-10` | `opacity: .1;` |
| `o-20` | `opacity: .2;` |
| `o-30` | `opacity: .3;` |
| `o-40` | `opacity: .4;` |
| `o-50` | `opacity: .5;` |
| `o-60` | `opacity: .6;` |
| `o-70` | `opacity: .7;` |
| `o-80` | `opacity: .8;` |
| `o-90` | `opacity: .9;` |
| `o-100` | `opacity: 1;` |


---

## Object Fit {#object-fit}

> **Path:** Styling > Utilities > Object Fit

## Object Fit

Use the object fit utilities to modify how the content of a replaced element, such as an `<img>` or `<video>`, should be resized to fit its container.

Change the value of the object-fit property with our responsive object-fit utility classes. This property tells the content to fill the parent container in a variety of ways, such as preserving the aspect ratio or stretching to take up as much space as possible.

![Placeholder : Object fit contain](data:image/svg+xml,%3Csvg%20style='font-size:%201.125rem;%20font-family:system-ui,-apple-system,%22Segoe%20UI%22,Roboto,%22Helvetica%20Neue%22,%22Noto%20Sans%22,%22Liberation%20Sans%22,Arial,sans-serif,%22Apple%20Color%20Emoji%22,%22Segoe%20UI%20Emoji%22,%22Segoe%20UI%20Symbol%22,%22Noto%20Color%20Emoji%22;%20-webkit-user-select:%20none;%20-moz-user-select:%20none;%20user-select:%20none;%20text-anchor:%20middle;'%20width='200'%20height='200'%20xmlns='http://www.w3.org/2000/svg'%3E%3Ctitle%3EPlaceholder%3C/title%3E%3Crect%20width='100%25'%20height='100%25'%20fill='%23dee2e6'%3E%3C/rect%3E%3Ctext%20x='50%25'%20y='50%25'%20fill='%23868e96'%20dy='.3em'%3EObject%20fit%20contain%3C/text%3E%3C/svg%3E) ![Placeholder : Object fit cover](data:image/svg+xml,%3Csvg%20style='font-size:%201.125rem;%20font-family:system-ui,-apple-system,%22Segoe%20UI%22,Roboto,%22Helvetica%20Neue%22,%22Noto%20Sans%22,%22Liberation%20Sans%22,Arial,sans-serif,%22Apple%20Color%20Emoji%22,%22Segoe%20UI%20Emoji%22,%22Segoe%20UI%20Symbol%22,%22Noto%20Color%20Emoji%22;%20-webkit-user-select:%20none;%20-moz-user-select:%20none;%20user-select:%20none;%20text-anchor:%20middle;'%20width='200'%20height='200'%20xmlns='http://www.w3.org/2000/svg'%3E%3Ctitle%3EPlaceholder%3C/title%3E%3Crect%20width='100%25'%20height='100%25'%20fill='%23dee2e6'%3E%3C/rect%3E%3Ctext%20x='50%25'%20y='50%25'%20fill='%23868e96'%20dy='.3em'%3EObject%20fit%20cover%3C/text%3E%3C/svg%3E) ![Placeholder : Object fit fill](data:image/svg+xml,%3Csvg%20style='font-size:%201.125rem;%20font-family:system-ui,-apple-system,%22Segoe%20UI%22,Roboto,%22Helvetica%20Neue%22,%22Noto%20Sans%22,%22Liberation%20Sans%22,Arial,sans-serif,%22Apple%20Color%20Emoji%22,%22Segoe%20UI%20Emoji%22,%22Segoe%20UI%20Symbol%22,%22Noto%20Color%20Emoji%22;%20-webkit-user-select:%20none;%20-moz-user-select:%20none;%20user-select:%20none;%20text-anchor:%20middle;'%20width='200'%20height='200'%20xmlns='http://www.w3.org/2000/svg'%3E%3Ctitle%3EPlaceholder%3C/title%3E%3Crect%20width='100%25'%20height='100%25'%20fill='%23dee2e6'%3E%3C/rect%3E%3Ctext%20x='50%25'%20y='50%25'%20fill='%23868e96'%20dy='.3em'%3EObject%20fit%20fill%3C/text%3E%3C/svg%3E) ![Placeholder : Object fit scale down](data:image/svg+xml,%3Csvg%20style='font-size:%201.125rem;%20font-family:system-ui,-apple-system,%22Segoe%20UI%22,Roboto,%22Helvetica%20Neue%22,%22Noto%20Sans%22,%22Liberation%20Sans%22,Arial,sans-serif,%22Apple%20Color%20Emoji%22,%22Segoe%20UI%20Emoji%22,%22Segoe%20UI%20Symbol%22,%22Noto%20Color%20Emoji%22;%20-webkit-user-select:%20none;%20-moz-user-select:%20none;%20user-select:%20none;%20text-anchor:%20middle;'%20width='200'%20height='200'%20xmlns='http://www.w3.org/2000/svg'%3E%3Ctitle%3EPlaceholder%3C/title%3E%3Crect%20width='100%25'%20height='100%25'%20fill='%23dee2e6'%3E%3C/rect%3E%3Ctext%20x='50%25'%20y='50%25'%20fill='%23868e96'%20dy='.3em'%3EObject%20fit%20scale%20down%3C/text%3E%3C/svg%3E) ![Placeholder : Object fit none](data:image/svg+xml,%3Csvg%20style='font-size:%201.125rem;%20font-family:system-ui,-apple-system,%22Segoe%20UI%22,Roboto,%22Helvetica%20Neue%22,%22Noto%20Sans%22,%22Liberation%20Sans%22,Arial,sans-serif,%22Apple%20Color%20Emoji%22,%22Segoe%20UI%20Emoji%22,%22Segoe%20UI%20Symbol%22,%22Noto%20Color%20Emoji%22;%20-webkit-user-select:%20none;%20-moz-user-select:%20none;%20user-select:%20none;%20text-anchor:%20middle;'%20width='200'%20height='200'%20xmlns='http://www.w3.org/2000/svg'%3E%3Ctitle%3EPlaceholder%3C/title%3E%3Crect%20width='100%25'%20height='100%25'%20fill='%23dee2e6'%3E%3C/rect%3E%3Ctext%20x='50%25'%20y='50%25'%20fill='%23868e96'%20dy='.3em'%3EObject%20fit%20none%3C/text%3E%3C/svg%3E)

| Class | Properties |
| --- | --- |
| `object-contain` | `cursor: auto;` |
| `object-cover` | `cursor: default;` |
| `object-fill` | `cursor: pointer;` |
| `object-none` | `cursor: wait;` |
| `object-scale-down` | `cursor: text;` |


---

## Position {#position}

> **Path:** Styling > Utilities > Position

## Position Utilities

Use these shorthand utilities for quickly configuring the position of an element.

### Position values

Quick positioning classes are available, though they are not responsive.

```
<div class="position-static">...</div>
<div class="position-relative">...</div>
<div class="position-absolute">...</div>
<div class="position-fixed">...</div>
```


---

## Shadows {#shadows}

> **Path:** Styling > Utilities > Shadows

## Shadow Utilities

Add or remove shadows to elements with box-shadow utilities.

Use the `shadow`, `shadow-md`, `shadow-lg`, `shadow-xl`, or `shadow-2xl` utilities to apply different sized outer box shadows to an element.

.shadow-none

.shadow

.shadow-md

.shadow-lg

.shadow-xl

.shadow-2xl

.shadow-inner

| Class | Properties |
| --- | --- |
| `shadow` | `box-shadow: 0 1px 3px 0 rgba(0,0,0,.1), 0 1px 2px 0 rgba(0,0,0,.06) !important;` |
| `shadow-md` | `box-shadow: 0 4px 6px -1px rgba(0,0,0,.1), 0 2px 4px -1px rgba(0,0,0,.06) !important;` |
| `shadow-lg` | `box-shadow: 0 10px 15px -3px rgba(0,0,0,.1), 0 4px 6px -2px rgba(0,0,0,.05) !important;` |
| `shadow-xl` | `box-shadow: 0 20px 25px -5px rgba(0,0,0,.1), 0 10px 10px -5px rgba(0,0,0,.04) !important;` |
| `shadow-2xl` | `box-shadow: 0 25px 50px -12px rgba(0,0,0,.25) !important;` |
| `shadow-inner` | `box-shadow: inset 0 2px 4px 0 rgba(0,0,0,.06) !important;` |
| `shadow-none` | `box-shadow: none !important;` |


---

## Sizing {#sizing}

> **Path:** Styling > Utilities > Sizing

## Sizing Utilities

Easily make an element as wide or as tall (relative to its parent) with these width and height utilities.

### Width

| Class | Properties |
| --- | --- |
| `w-1` | `width: 1%;` |
| `w-20` | `width: 20%;` |
| `w-25, width-quarter` | `width: 25%;` |
| `width-third` | `width: 33.33%;` |
| `w-50, width-half` | `width: 50%;` |
| `w-75` | `width: 75%;` |
| `w-100, width-full` | `width: 100%;` |
| `w-auto` | `width: auto;` |

### Height

| Class | Properties |
| --- | --- |
| `h-25` | `height: 25%;` |
| `h-50` | `height: 50%;` |
| `h-75` | `height: 75%;` |
| `h-100` | `height: 100%;` |
| `h-auto` | `height: auto;` |

### Minimum/Maximum

| Class | Properties |
| --- | --- |
| `mw-100` | `max-width: 100%;` |
| `mh-100` | `max-height: 100%;` |
| `min-w-0` | `min-width: 0;` |

### Based on Viewport Size

| Class | Properties |
| --- | --- |
| `min-vw-100` | `min-width: 100vw;` |
| `min-vh-100` | `min-height: 100vh;` |
| `vw-100` | `width: 100vh;` |
| `vh-100` | `height: 100vh;` |

