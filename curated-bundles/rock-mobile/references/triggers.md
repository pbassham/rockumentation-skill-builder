---
description: Use when you need to configure what event or interaction triggers a Helix request on an element
source: "https://community.rockrms.com/developer/mobile-docs"
sourceLabel: Mobile Docs
---
> **Path:** 

By default, a Helix request fires on the element's natural interaction: a tap. `Hx.Trigger` changes that.

| Property | Type | Description |
| --- | --- | --- |
| `Hx.Trigger` | string | An event name, then optional modifiers, separated by spaces. |

**Inherits: no.** A trigger belongs to the element it is written on.

```
<!-- Fire once, when the element first appears. The lazy-load idiom. -->
<ContentView Hx.Get="^/sink/dashboard"
             Hx.Trigger="load"
             Hx.Target="this"
             Hx.Swap="outer" />

<!-- Validate a field when the person leaves it, but only if they changed it. -->
<Rock:TextBox Hx.Id="email"
              Hx.Post="^/sink/contact/email"
              Hx.Trigger="Unfocused changed" />

<!-- Search as you type, without a request per keystroke. -->
<Rock:TextBox Hx.Id="q"
              Hx.Get="^/sink/search"
              Hx.Trigger="TextChanged changed delay:400ms" />
```

## Events

| Value | What it does |
| --- | --- |
| *unset* | The element's natural interaction. |
| `tap`, `tapped`, `clicked` | The same thing, written explicitly. **This is how you make a `HelixForm` respond to a tap**, since forms suppress natural wiring. |
| `load` | Fires once, when the element enters the visual tree. |
| `appear` | Fires every time the containing page appears, the first time included. |
| any MAUI event name | Looked up on the element by name, case-insensitively. |
| `every`, `revealed`, `intersect` | Not implemented. **Wires nothing at all.** |

Named events are looked up on the control itself, so what is available depends on what you put the trigger on.

| Event | Available on | Notes |
| --- | --- | --- |
| `Unfocused`, `Focused` | **every** visual element | Wires everywhere, but only *fires* on controls that can take focus. |
| `TextChanged` | `Entry`, `Editor`, `SearchBar`, `Rock:TextBox` | Not on a `Label`, a layout, or `Rock:CheckBox`. |
| `Toggled` | `Switch` |  |
| `DateSelected` | `DatePicker`, `Rock:DatePicker` |  |
| `SelectedIndexChanged` | `Picker`, `Rock:Picker` |  |
| `Clicked` | `Button`, `ImageButton` | Also a natural-interaction keyword, so it works on any element. |

### Three ways a trigger quietly does the wrong thing

**`Unfocused` on something that cannot take focus.** Every visual element declares `Unfocused`, so it wires successfully on a `Label` or a `VerticalStackLayout`, and then never fires, because those never receive focus. Use it on `Entry`, `Editor`, `SearchBar`, `Rock:TextBox`, or `Rock:Picker`.

**An event name that does not exist falls back to a tap.** `Hx.Trigger="TextChanged"` on a `Label` is not an error. Helix does not find the event, so the element gets a tap gesture instead and your request still fires, just from the wrong interaction.

**`every`, `revealed`, and `intersect` wire nothing at all.** These are the exception to the tap fallback above, deliberately so: falling back to a surprise tap would be worse than doing nothing. An element with `Hx.Trigger="revealed"` is simply inert, with no error to tell you why, so do not reach for HTMX's polling or scroll-into-view idioms yet. See [Limitations](https://community.rockrms.com/developer/mobile-docs/essentials/lava/lava-application/limitations).

## Modifiers

| Modifier | What it does |
| --- | --- |
| `once` | Only the first activation ever fires. |
| `changed` | Only fire when the control's value differs from its value at the last fire. |
| `delay:<time>` | Debounce. Wait out the quiet period; a new activation restarts the clock. |
| `throttle:<time>` | Rate limit. Fire immediately, then ignore activations for this long. |

One of each, on a control that suits it:

```
<!-- once: an action that must never run a second time, however often it is tapped. -->
<Button Text="Check In" Hx.Post="^/sink/check-in" Hx.Trigger="clicked once" />

<!-- changed: skip the request when the person tabbed through without editing anything. -->
<Rock:TextBox Hx.Id="email" Hx.Post="^/sink/validate-email" Hx.Trigger="Unfocused changed" />

<!-- delay: debounce, so search fires once the typing stops instead of per keystroke. -->
<Rock:TextBox Hx.Id="q" Hx.Get="^/sink/search" Hx.Trigger="TextChanged delay:400ms" />

<!-- throttle: honor the first tap now, then ignore further taps for two seconds. -->
<Button Text="Refresh" Hx.Get="^/sink/rows" Hx.Trigger="clicked throttle:2s" />
```

Times accept `400ms`, `2s`, or a bare number of milliseconds. A time that cannot be parsed is dropped, leaving the trigger with no delay or throttle at all.

Modifiers stack, and they apply in the order `once`, `changed`, `throttle`, `delay`, whatever order you write them in. The search box at the top of this page combines two: `TextChanged changed delay:400ms` waits for a pause in typing *and* skips the request when the text came back to what it already was.

Note

A modifier is only a modifier when an event name comes first. `Hx.Trigger="once"` reads `once` as the *event* name, finds no such event on the control, and falls back to a tap that fires every single time. Write `clicked once`.

Unrecognized modifiers, including HTMX's `from:`, `target:`, `consume`, and `queue`, are parsed and ignored rather than treated as errors, so a template written for a newer shell degrades instead of failing.

### changed needs a control with a readable value

`changed` compares against the same value mapping automatic value inclusion uses. On a control the app cannot read a value from, the current value and the last value are both empty, they compare equal, and **the request never fires**. No error, no warning.

Use `changed` only on:

- any `Rock:` field
- `Entry`, `Editor`, `SearchBar`
- `Switch`

See [Forms and Values](https://community.rockrms.com/developer/mobile-docs/essentials/lava/lava-application/forms-and-values) for the full mapping.

### load fires once per element, ever

If you set `Hx.Trigger="load"` on an element that is already on screen, it fires immediately. But it will **not** fire again when the element re-attaches, for instance after the person pushes a detail page and comes back. When you need a refresh on return, that is what `appear` is for.

### appear fires every time the page comes back

`load` answers "get this once." `appear` answers "keep this current." It hooks the page that contains the element and fires each time that page appears, which includes the first appearance, so it is a superset of `load` rather than an alternative to it.

```
<!-- Re-fetched every time the person returns to this screen. -->
<ContentView Hx.Get="^/group-toolbox/pending-count"
             Hx.Trigger="appear"
             Hx.Target="this"
             Hx.Swap="outer" />
```

The case it exists for: the person taps into a detail screen, changes something there, and comes back. With `load` the summary they return to is the one rendered before they left, and it is now wrong. With `appear` it re-fetches on the way back in.

Pair it with `throttle` when the screen is one people bounce in and out of, so a quick there-and-back does not fire a second request:

```
<ContentView Hx.Get="^/group-toolbox/dashboard" Hx.Trigger="appear throttle:30s" Hx.Target="this" Hx.Swap="outer" />
```

Four things to know:

- **It fires exactly once per appearance**, no matter which order the platform raises the page's appearance and the element's own load. You will not get a double fire on one platform and a single fire on the other.
- **A cover sheet is its own page here.** A fragment presented in a sheet hooks the sheet, not the page underneath, matching how sheets scope ids and cancellation. See [Cover Sheets](https://community.rockrms.com/developer/mobile-docs/essentials/lava/lava-application/cover-sheets).
- **An element that swaps itself away stops firing**, because the subscription belongs to the element and it is gone. If the replacement should keep refreshing, it has to declare `Hx.Trigger="appear"` again, the same re-declaration `outer` always requires. See [Requests and Targeting](https://community.rockrms.com/developer/mobile-docs/essentials/lava/lava-application/requests-and-targeting).
- **An element outside a page is not wired**, silently. In practice this only happens in places a fragment does not normally live.

Note

`appear` is not `revealed`. `appear` is about the *page* coming into view; `revealed` is about the *element* scrolling into the viewport, and it is still [not implemented](https://community.rockrms.com/developer/mobile-docs/essentials/lava/lava-application/limitations). An element far down a long scroll fires its `appear` when the page opens, whether or not anyone has scrolled to it.

Note

Adding `once` to it (`appear once`) collapses it back to `load` behavior: first appearance only. Write `load` instead, which says the same thing more plainly.

## When a trigger fires

Four things about the order, because each one explains a symptom that otherwise looks inexplicable.

**Resolution happens before any dialog.** The verb, route, target, swap, and indicator are all resolved first. So if `Hx.Target` names an id that does not exist, you never see your `Hx.Confirm` prompt at all. You get the error notification instead, and it looks as though the confirmation was ignored.

**Then the gates, in this order:** `Hx.Confirm`, `Hx.Prompt`, a form submission's own validation, then `Hx.Validator`. Cancelling a dialog or failing a validator aborts before anything is sent.

**A second tap while a request is in flight is dropped.** This is per element, so it is real double-tap protection without locking the rest of the screen. You do not need to add your own.

**Navigating away cancels whatever is in flight**, including a pending `delay`, so a response can never arrive and swap into a screen that is gone.

For what happens once the response arrives, see [Endpoint Responses](https://community.rockrms.com/developer/mobile-docs/essentials/lava/lava-application/endpoint-responses).
