---
description: "Use when looking up Hx.* attributes available in Rock Mobile, their types, inheritance, what they apply to, and allowed values"
source: "https://community.rockrms.com/developer/mobile-docs"
sourceLabel: Mobile Docs
---
> **Path:** 

Every `Hx.*` attribute in one table, plus the reserved values you can put in them.

## Attributes

| Attribute | Type | Inherits | Applies to | Details |
| --- | --- | --- | --- | --- |
| `Hx.Get` | string | No | any `View` | [Requests and Targeting](https://community.rockrms.com/developer/mobile-docs/essentials/lava/helix-lava-applications/requests-and-targeting) |
| `Hx.Post` | string | No | any `View` | [Requests and Targeting](https://community.rockrms.com/developer/mobile-docs/essentials/lava/helix-lava-applications/requests-and-targeting) |
| `Hx.Put` | string | No | any `View` | [Requests and Targeting](https://community.rockrms.com/developer/mobile-docs/essentials/lava/helix-lava-applications/requests-and-targeting) |
| `Hx.Delete` | string | No | any `View` | [Requests and Targeting](https://community.rockrms.com/developer/mobile-docs/essentials/lava/helix-lava-applications/requests-and-targeting) |
| `Hx.Target` | string | Yes | any `View`. The target it names has type requirements. | [Requests and Targeting](https://community.rockrms.com/developer/mobile-docs/essentials/lava/helix-lava-applications/requests-and-targeting) |
| `Hx.Swap` | string | Yes | any `View`. Constrains the target's type. | [Swaps and Animations](https://community.rockrms.com/developer/mobile-docs/essentials/lava/helix-lava-applications/swaps-and-animations) |
| `Hx.Id` | string | No | any `View` | [Requests and Targeting](https://community.rockrms.com/developer/mobile-docs/essentials/lava/helix-lava-applications/requests-and-targeting) |
| `Hx.Trigger` | string | No | any `View`. Named events need the control to declare them. | [Triggers](https://community.rockrms.com/developer/mobile-docs/essentials/lava/helix-lava-applications/triggers) |
| `Hx.Include` | `Rock:Parameter` list | No | any `View` | [Forms and Values](https://community.rockrms.com/developer/mobile-docs/essentials/lava/helix-lava-applications/forms-and-values) |
| `Hx.Params` | string | Yes | any `View`, and its subtree | [Forms and Values](https://community.rockrms.com/developer/mobile-docs/essentials/lava/helix-lava-applications/forms-and-values) |
| `Hx.Validator` | `Validator` | Yes | any `View` | [Forms and Values](https://community.rockrms.com/developer/mobile-docs/essentials/lava/helix-lava-applications/forms-and-values) |
| `Hx.Indicator` | string | Yes | any `View`. Names any `View`. | [Indicators and Errors](https://community.rockrms.com/developer/mobile-docs/essentials/lava/helix-lava-applications/indicators-and-errors) |
| `Hx.Confirm` | string | Yes | any `View` | [Indicators and Errors](https://community.rockrms.com/developer/mobile-docs/essentials/lava/helix-lava-applications/indicators-and-errors) |
| `Hx.Prompt` | string | Yes | any `View` | [Indicators and Errors](https://community.rockrms.com/developer/mobile-docs/essentials/lava/helix-lava-applications/indicators-and-errors) |
| `Hx.Notification` | string | Yes | any `View`. The slot must be a `ContentView` or `Layout`. | [Indicators and Errors](https://community.rockrms.com/developer/mobile-docs/essentials/lava/helix-lava-applications/indicators-and-errors) |
| `Hx.DisabledElt` | string | Yes | any `View`. One id, not a list. | [Indicators and Errors](https://community.rockrms.com/developer/mobile-docs/essentials/lava/helix-lava-applications/indicators-and-errors) |
| `Hx.Disable` | bool | No. Applies to its whole subtree. | any element | [Indicators and Errors](https://community.rockrms.com/developer/mobile-docs/essentials/lava/helix-lava-applications/indicators-and-errors) |
| `Hx.Headers` | string | Yes | any `View` | below |
| `Hx.Disinherit` | string | No | any `View` | [Inheritance](https://community.rockrms.com/developer/mobile-docs/essentials/lava/helix-lava-applications/inheritance) |
| `Hx.PageTitle` | string | No | **a response fragment's root only** | [Cover Sheets](https://community.rockrms.com/developer/mobile-docs/essentials/lava/helix-lava-applications/cover-sheets) |
| `Hx.SheetNavigationBar` | bool | No | **a response fragment's root only** | [Cover Sheets](https://community.rockrms.com/developer/mobile-docs/essentials/lava/helix-lava-applications/cover-sheets) |
| `Hx.SheetPresentation` | string | No | **a response fragment's root only** | [Cover Sheets](https://community.rockrms.com/developer/mobile-docs/essentials/lava/helix-lava-applications/cover-sheets) |

Note

`Hx.*` only works on visual elements. Setting a verb or `Hx.Id` on something that is not one, such as a context menu action or a toolbar item, is ignored.

### Hx.Headers

The one attribute without a home elsewhere. Extra request headers, written as a query string, not JSON.

```
<Button Text="Load"
        Hx.Get="^/group-toolbox/rows"
        Hx.Target="RowList"
        Hx.Headers="X-Roster-Mode=compact&X-Roster-Page=2" />
```

**Inherits: yes.** Read them from the `Headers` merge field. Your headers are sent **alongside** the standard Helix headers, not in place of them. If you name one of the app's own headers, it is sent twice, and the server sees both values joined by a comma. `X-Helix-Client=Web` arrives as `RockMobile,Web`. Setting `X-Helix-CSRF-Protection` to anything, even `true`, makes an endpoint with cross-site forgery protection return 401.

Note

Use your own header names. Do not set `X-Helix-Client`, `X-Helix-Shell-Version`, `X-Helix-CSRF-Protection`, or `X-Helix-Prompt` in `Hx.Headers`.

## Reserved values

### Hx.Target

| Value | Meaning |
| --- | --- |
| an `Hx.Id` or `x:Name` | that element, anywhere on the page |
| `this` | the element that **carries** the attribute, which is the declaring ancestor when inherited |
| `coversheet` | present the fragment in a cover sheet |
| *unset* | the element that made the request, as in HTMX. For a `HelixForm` submission that is the form. A Lava Application Content block's initial load fills the block. |

### Hx.Swap

| Value | The target must be |
| --- | --- |
| `inner` (default) | a `ContentView` or a `Layout` |
| `outer` | any `View` whose parent is a `Layout` or `ContentView` |
| `append` | a `Layout` |
| `prepend` | a `Layout` |
| `after` | any `View` whose **parent** is a flow `Layout`, not `Grid` or `AbsoluteLayout` |
| `items-append` | a `CollectionView`, `CarouselView`, or `ItemsCollection` |
| `items-replace` | a `CollectionView`, `CarouselView`, or `ItemsCollection` |
| `none` | anything |

The `items-*` strategies take a JSON array response rather than XAML. See [Data Lists and Paging](https://community.rockrms.com/developer/mobile-docs/essentials/lava/helix-lava-applications/data-lists-and-paging) for those, and [Swaps and Animations](https://community.rockrms.com/developer/mobile-docs/essentials/lava/helix-lava-applications/swaps-and-animations) for the rest.

### Hx.Swap modifiers

Order-independent, and applied after the strategy token. An unrecognized modifier is an **error**, unlike a `Hx.Trigger` modifier.

| Value | Behavior |
| --- | --- |
| `animate:<name>` | `none`, `fade`, `slide-up`, `slide-down`, `slide-left`, `slide-right`, `scale`. `collapse` and `expand` are deferred and swap instantly. |
| `swap:<time>` | Exit duration. Default `150ms`. |
| `settle:<time>` | Enter duration. Default `200ms`. |
| `easing:<name>` | `linear`, `ease-in`, `ease-out`, `ease-in-out`, `spring`, `bounce`. Overrides both halves. |
| `distance:<units>` | `slide-*` travel in device-independent units. Default `24`. A bare number, no unit suffix. |

Only `inner` and `outer` animate the exit. A duration declared without `animate:` is inert rather than an error. Platform reduce-motion collapses every animation to an instant swap. See [Swaps and Animations](https://community.rockrms.com/developer/mobile-docs/essentials/lava/helix-lava-applications/swaps-and-animations).

### Hx.Trigger events

| Value | Behavior |
| --- | --- |
| *unset* | natural interaction |
| `tap`, `tapped`, `clicked` | natural interaction, written explicitly |
| `load` | once, when the element enters the tree |
| `appear` | every time the containing page appears, first appearance included |
| `every <time>` | polls on the interval while the page is on screen and the app is in the foreground; five second minimum; no fire at load |
| a MAUI event name | wired by name, case-insensitively |
| `revealed`, `intersect` | not implemented, wires nothing |

### Hx.Trigger modifiers

| Value | Behavior |
| --- | --- |
| `once` | only the first activation fires |
| `changed` | only when the control's value changed |
| `delay:<time>` | debounce |
| `throttle:<time>` | rate limit |

Times accept `400ms`, `2s`, or bare milliseconds. `from:`, `target:`, `consume`, and `queue` are parsed and ignored.

### Hx.Params

`none` is the only value. Anything else is ignored.

### Hx.Disinherit

Space- or comma-separated attribute names with or without the `Hx.` prefix, or `*` for all.

## Case sensitivity

This trips people up because it is not uniform.

| Case-**sensitive** | Case-**insensitive** |
| --- | --- |
| `Hx.Id` values, and the `Hx.Target` / `Hx.Indicator` / `Hx.DisabledElt` / `Hx.Notification` / `HX-Retarget` ids that resolve against them | `this` and `coversheet` |
|  | swap strategy names, including `HX-Reswap` values |
|  | `Hx.Params="none"` |
|  | `Hx.Disinherit` tokens |
|  | `Hx.Trigger` event names |
|  | response header names |

## Request headers

| Header | Value |
| --- | --- |
| `X-Helix-Client` | `RockMobile` |
| `X-Helix-Shell-Version` | the app version, for example `20.0.0` |
| `X-Helix-CSRF-Protection` | `true` |
| `X-Helix-Prompt` | the `Hx.Prompt` entry, when one was shown |

Plus anything from `Hx.Headers`, and standard Rock authentication.

## Response headers

| Header | Behavior |
| --- | --- |
| `HX-Redirect` | navigate, short-circuits the swap |
| `HX-Refresh` | `true` reloads the page, short-circuits the swap |
| `HX-Retarget` | override the target id |
| `HX-Reswap` | override the swap strategy |
| `X-Helix-Command` / `X-Helix-Command-Parameter` | run a client command after the swap |
| `X-Helix-Next` | next page route for an items swap; see [Data Lists and Paging](https://community.rockrms.com/developer/mobile-docs/essentials/lava/helix-lava-applications/data-lists-and-paging) |

`HX-Location`, `HX-Push-Url`, `HX-Replace-Url`, and `HX-Trigger` do nothing. See [Endpoint Responses](https://community.rockrms.com/developer/mobile-docs/essentials/lava/helix-lava-applications/endpoint-responses).

## Mobile-only vocabulary

If you are porting from web Helix, this is the delta.

| Piece | Why it exists |
| --- | --- |
| `Hx.Id` | Fills the role of the DOM `id`, since there are no CSS selectors to target with. |
| `Hx.PageTitle` | Fills the role of HTMX's `<title>` handling. |
| `Hx.SheetNavigationBar`, `Hx.SheetPresentation` | Cover sheet chrome, set by the server rather than by the button that opens the sheet. |
| `Hx.Validator` | A pre-request gate against the existing `Validator` control. |
| `Hx.Notification` | Declares where request errors render. |
| `HelixForm` | The container analog of web Helix's `lava-form`, not of an HTMX attribute. |
| `coversheet` target | The nearest web pattern is targeting a modal. |
| `items-append`, `items-replace` swaps and the `X-Helix-Next` header | Feed native list controls from a JSON array, with scroll paging. |
| `X-Helix-Command` headers | Response-driven client commands. |
| `X-Helix-Client`, `X-Helix-Shell-Version`, `X-Helix-Prompt` | The mobile shape of `HX-Request` and `HX-Prompt`, plus app version gating. |
