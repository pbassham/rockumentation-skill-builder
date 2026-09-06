---
description: "Use when looking up HTMX attributes (Hx.*) available in Rock Mobile views, their types, inheritance behavior, and applicable targets"
source: "https://community.rockrms.com/developer/mobile-docs"
sourceLabel: Mobile Docs
---
> **Path:** 

Every `Hx.*` attribute in one table, plus the reserved values you can put in them.

## Attributes

| Attribute | Type | Inherits | Applies to | Details |
| --- | --- | --- | --- | --- |
| `Hx.Get` | string | No | any `View` | [Requests and Targeting](https://community.rockrms.com/developer/mobile-docs/essentials/lava/lava-application/requests-and-targeting) |
| `Hx.Post` | string | No | any `View` | [Requests and Targeting](https://community.rockrms.com/developer/mobile-docs/essentials/lava/lava-application/requests-and-targeting) |
| `Hx.Put` | string | No | any `View` | [Requests and Targeting](https://community.rockrms.com/developer/mobile-docs/essentials/lava/lava-application/requests-and-targeting) |
| `Hx.Delete` | string | No | any `View`. | [Requests and Targeting](https://community.rockrms.com/developer/mobile-docs/essentials/lava/lava-application/requests-and-targeting) |
| `Hx.Target` | string | **Yes** | any `View`. The target it names has type requirements. | [Requests and Targeting](https://community.rockrms.com/developer/mobile-docs/essentials/lava/lava-application/requests-and-targeting) |
| `Hx.Swap` | string | **Yes** | any `View`. Constrains the target's type. | [Requests and Targeting](https://community.rockrms.com/developer/mobile-docs/essentials/lava/lava-application/requests-and-targeting) |
| `Hx.Id` | string | No | any `View` | [Requests and Targeting](https://community.rockrms.com/developer/mobile-docs/essentials/lava/lava-application/requests-and-targeting) |
| `Hx.Trigger` | string | No | any `View`. Named events need the control to declare them. | [Triggers](https://community.rockrms.com/developer/mobile-docs/essentials/lava/lava-application/triggers) |
| `Hx.Include` | `Rock:Parameter` list | No | any `View` | [Forms and Values](https://community.rockrms.com/developer/mobile-docs/essentials/lava/lava-application/forms-and-values) |
| `Hx.Params` | string | **Yes** | any `View`, and its subtree | [Forms and Values](https://community.rockrms.com/developer/mobile-docs/essentials/lava/lava-application/forms-and-values) |
| `Hx.Validator` | `Validator` | **Yes** | any `View` | [Forms and Values](https://community.rockrms.com/developer/mobile-docs/essentials/lava/lava-application/forms-and-values) |
| `Hx.Indicator` | string | **Yes** | any `View`. Names any `View`. | [Indicators and Errors](https://community.rockrms.com/developer/mobile-docs/essentials/lava/lava-application/indicators-and-errors) |
| `Hx.Confirm` | string | **Yes** | any `View` | [Indicators and Errors](https://community.rockrms.com/developer/mobile-docs/essentials/lava/lava-application/indicators-and-errors) |
| `Hx.Prompt` | string | **Yes** | any `View` | [Indicators and Errors](https://community.rockrms.com/developer/mobile-docs/essentials/lava/lava-application/indicators-and-errors) |
| `Hx.Notification` | string | **Yes** | any `View`. The slot must be a `ContentView` or `Layout`. | [Indicators and Errors](https://community.rockrms.com/developer/mobile-docs/essentials/lava/lava-application/indicators-and-errors) |
| `Hx.DisabledElt` | string | **Yes** | any `View`. One id, not a list. | [Indicators and Errors](https://community.rockrms.com/developer/mobile-docs/essentials/lava/lava-application/indicators-and-errors) |
| `Hx.Disable` | bool | Applies to the subtree | any element | [Indicators and Errors](https://community.rockrms.com/developer/mobile-docs/essentials/lava/lava-application/indicators-and-errors) |
| `Hx.Headers` | string | **Yes** | any `View` | below |
| `Hx.Disinherit` | string | No | any `View` | [Inheritance](https://community.rockrms.com/developer/mobile-docs/essentials/lava/lava-application/inheritance) |
| `Hx.PageTitle` | string | No | **a response fragment's root only** | [Cover Sheets](https://community.rockrms.com/developer/mobile-docs/essentials/lava/lava-application/cover-sheets) |

Note

`Hx.*` only works on visual elements. Setting a verb or `Hx.Id` on something that is not one, such as a context menu action or a toolbar item, is ignored.

### Hx.Headers

The one attribute without a home elsewhere. Extra request headers, written as a query string, not JSON.

```
<Button Text="Load"
        Hx.Get="^/sink/rows"
        Hx.Headers="X-Sink-Mode=compact&X-Sink-Page=2" />
```

**Inherits: yes.** Your headers are applied **after** the standard Helix headers, so deliberately overriding a standard header works. Read them from the `Headers` merge field.

## Reserved values

### Hx.Target

| Value | Meaning |
| --- | --- |
| an `Hx.Id` or `x:Name` | that element, anywhere on the page |
| `this` | the element that **carries** the attribute, which is the declaring ancestor when inherited |
| `coversheet` | present the fragment in a cover sheet |
| *unset* | the enclosing block, or the sheet host inside a cover sheet |

### Hx.Swap

| Value | The target must be |
| --- | --- |
| `inner` (default) | a `ContentView` or a `Layout` |
| `outer` | any `View` whose parent is a `Layout` or `ContentView` |
| `append` | a `Layout` |
| `prepend` | a `Layout` |
| `after` | any `View` whose **parent** is a flow `Layout`, not `Grid` or `AbsoluteLayout` |
| `none` | anything |

### Hx.Swap modifiers

Order-independent, and applied after the strategy token. An unrecognized modifier is an **error**, unlike a `Hx.Trigger` modifier.

| Value | Behavior |
| --- | --- |
| `animate:<name>` | `none`, `fade`, `slide-up`, `slide-down`, `slide-left`, `slide-right`, `scale`. `collapse` and `expand` are deferred and swap instantly. |
| `swap:<time>` | Exit duration. Default `150ms`. |
| `settle:<time>` | Enter duration. Default `200ms`. |
| `easing:<name>` | `linear`, `ease-in`, `ease-out`, `ease-in-out`, `spring`, `bounce`. Overrides both halves. |
| `distance:<units>` | `slide-*` travel in device-independent units. Default `24`. A bare number, no unit suffix. |

Only `inner` and `outer` animate the exit. A duration declared without `animate:` is inert rather than an error. Platform reduce-motion collapses every animation to an instant swap.

### Hx.Trigger events

| Value | Behavior |
| --- | --- |
| *unset* | natural interaction |
| `tap`, `tapped`, `clicked` | natural interaction, written explicitly |
| `load` | once, when the element enters the tree |
| `appear` | every time the containing page appears, first appearance included |
| a MAUI event name | wired by name, case-insensitively |
| `every`, `revealed`, `intersect` | not implemented, wires nothing |

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

## Case sensitivity, in one place

This trips people up because it is not uniform.

| Case-**sensitive** | Case-**insensitive** |
| --- | --- |
| `Hx.Id` values, and the `Hx.Target` / `Hx.Indicator` / `Hx.DisabledElt` / `Hx.Notification` / `HX-Retarget` ids that resolve against them | `this` and `coversheet` |
|  | swap strategy names, including `HX-Reswap` values |
|  | `Hx.Params="none"` |
|  | `Hx.Disinherit` tokens |
|  | `Hx.Trigger` event names |
|  | response header names |

## Request headers the app sends

| Header | Value |
| --- | --- |
| `X-Helix-Client` | `RockMobile` |
| `X-Helix-Shell-Version` | the app version, for example `20.0.0` |
| `X-Helix-CSRF-Protection` | `true` |
| `X-Helix-Prompt` | the `Hx.Prompt` entry, when one was shown |

Plus anything from `Hx.Headers`, and standard Rock authentication.

## Response headers the app honors

| Header | Behavior |
| --- | --- |
| `HX-Redirect` | navigate, short-circuits the swap |
| `HX-Refresh` | `true` reloads the page, short-circuits the swap |
| `HX-Retarget` | override the target id |
| `HX-Reswap` | override the swap strategy |
| `X-Helix-Command` / `X-Helix-Command-Parameter` | run a client command after the swap |

`HX-Location`, `HX-Push-Url`, `HX-Replace-Url`, and `HX-Trigger` do nothing. See [Endpoint Responses](https://community.rockrms.com/developer/mobile-docs/essentials/lava/lava-application/endpoint-responses).

## Mobile-only vocabulary

If you are porting from web Helix, this is the delta.

| Piece | Why it exists |
| --- | --- |
| `Hx.Id` | Fills the role of the DOM `id`, since there are no CSS selectors to target with. |
| `Hx.PageTitle` | Fills the role of HTMX's `<title>` handling. |
| `Hx.Validator` | A pre-request gate against the existing `Validator` control. |
| `Hx.Notification` | Declares where request errors render. |
| `HelixForm` | The container analog of web Helix's `lava-form`, not of an HTMX attribute. |
| `coversheet` target | The nearest web pattern is targeting a modal. |
| `X-Helix-Command` headers | Response-driven client commands. |
| `X-Helix-Client`, `X-Helix-Shell-Version`, `X-Helix-Prompt` | The mobile shape of `HX-Request` and `HX-Prompt`, plus app version gating. |

---

## Security {#lava-application-security}

The endpoints your fragments call are the **same** Lava Application endpoints a browser calls, so the [Helix security guidance](https://community.rockrms.com/helix/overview/security) applies unchanged: Execute verbs are the real boundary, never modify data on a GET, never treat an IdKey or Guid as the authorization mechanism, and sanitize anything you interpolate into SQL. Read that page first.

This page is only the part that is different because the client is an app.

## Granting Edit on an Application is a privileged grant

This is the one to internalize before you open Application editing to a wider group.

On the web, a fragment is HTML rendered in a browser. On mobile, **a fragment is XAML, and XAML can invoke the app's commands.** So anyone who can edit a Lava Application can run app commands for anyone who opens the screen that hosts it.

That is the same trust model the Content block has always had, where server-supplied XAML is trusted. What Helix changes is *who* can author it: not just a block developer, but anyone with Edit on an Application.

The mitigations are the security defaults that already ship: deny-all View on Applications, and the `RSR - Lava Application Developers` role. Leave them in place, and treat adding someone to that role the way you would treat giving them a code deploy.

## Fragments can call more than Lava Application routes

A verb is not limited to `^` routes. Any absolute server path is sent as-is, carrying the signed-in person's credentials:

```
<ContentView Hx.Post="/api/v2/some-endpoint" Hx.Trigger="load" />
```

**This is not privilege escalation.** The request is still authorized as that person, and they cannot reach anything they could not already reach.

What it does mean is that a fragment can make an authenticated request **on their behalf without them tapping anything**, since a `load` trigger fires as soon as the screen renders. Reading data back out is awkward, because a JSON response fails to parse as XAML and lands as an error notification, but writes go through fine.

It is the same trust model as the section above: anyone with Edit on the Application can author it. Worth knowing explicitly when you decide who gets that grant.

## X-Helix-Client and ClientType are hints, never inputs

The app sends `X-Helix-Client: RockMobile`, and the server derives the `ClientType` merge field from it. Any caller can send that header with curl.

Branch **presentation** on it. Never gate **data access** on it.

```
{% comment %} Fine. Chooses markup. {% endcomment %}
{% if ClientType == 'Mobile' %}...{% endif %}

{% comment %} Not fine. This is not a security check. {% endcomment %}
{% if ClientType == 'Mobile' %}{% sql %}SELECT ...{% endsql %}{% endif %}
```

## Values gathered from the screen are still untrusted

Automatic value inclusion collects values from controls by name, which makes it easy to forget that what arrives is just an HTTP request. A caller can send whatever `Form` and `QueryString` values they like, and the `IsRequired` and `ValidationExpression` rules you configured are a UX feature, not enforcement.

Validate on the server regardless of what the shell "should" have sent.

---

## Limitations {#limitations}

Helix follows the web Helix subset that makes sense in MAUI, not the full HTMX spec. This page is the honest list of what is missing, so you can plan around it instead of discovering it halfway through a build.

## Supported, but only partly

| Feature | The subset you get |
| --- | --- |
| `Hx.Params` | `none` only. You cannot include or exclude by name. |
| `Hx.Swap` animations | `fade`, the four `slide-*` directions and `scale`. The height-based `collapse` and `expand` are deferred: they warn and swap instantly. |
| `Hx.Trigger` | Named events plus `once`, `changed`, `delay`, `throttle`. The rest are ignored. |

## Rough edges to design around

These are not missing features, they are behaviors that will surprise you. Each is covered in detail on its own page.

- **`Border` cannot be an `inner` target.** It is neither a `ContentView` nor a `Layout`. Target a layout inside it. See [Requests and Targeting](https://community.rockrms.com/developer/mobile-docs/essentials/lava/lava-application/requests-and-targeting).
- **A failed request that was going to `append` replaces the target's contents** with the error, because errors are placed with an `inner` swap. Declare an `Hx.Notification` slot on anything that appends. See [Indicators and Errors](https://community.rockrms.com/developer/mobile-docs/essentials/lava/lava-application/indicators-and-errors).
- **`changed` silently blocks every request on a control that has no value**, such as a `Label`, a layout, or a bare MAUI `Picker`. It only works on inputs. See [Triggers](https://community.rockrms.com/developer/mobile-docs/essentials/lava/lava-application/triggers).
- **`Unfocused` wires on anything but only fires on focusable controls.** See [Triggers](https://community.rockrms.com/developer/mobile-docs/essentials/lava/lava-application/triggers).
- **An unknown trigger event name silently becomes a tap.** See [Triggers](https://community.rockrms.com/developer/mobile-docs/essentials/lava/lava-application/triggers).
- **`appear` is not `revealed`.** `appear` fires when the *page* comes into view and is implemented; `revealed` is about the *element* scrolling into the viewport and is not. An element low on a long page fires its `appear` as soon as the page opens. See [Triggers](https://community.rockrms.com/developer/mobile-docs/essentials/lava/lava-application/triggers).
- **An error placed next to a trigger can land in the wrong `Grid` cell**, overlapping the first cell rather than appearing below the trigger. Most likely on a Load More button using `outer` on `this`. An `Hx.Notification` slot avoids it. See [Indicators and Errors](https://community.rockrms.com/developer/mobile-docs/essentials/lava/lava-application/indicators-and-errors).
- **Id lookups are case-sensitive** while almost everything else is not. See [Attribute Reference](https://community.rockrms.com/developer/mobile-docs/essentials/lava/lava-application/attribute-reference).
- **`after` does not give you infinite scroll on its own.** See [Requests and Targeting](https://community.rockrms.com/developer/mobile-docs/essentials/lava/lava-application/requests-and-targeting).
