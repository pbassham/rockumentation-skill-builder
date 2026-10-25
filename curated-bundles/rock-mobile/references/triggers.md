---
description: Use when configuring what user interaction triggers a Helix request on a rock-mobile element
source: "https://community.rockrms.com/developer/mobile-docs"
sourceLabel: Mobile Docs
---
> **Path:** 

By default, a Helix request fires on the element's natural interaction: a tap. `Hx.Trigger` changes that.

| Property | Type | Description | Inherits |
| --- | --- | --- | --- |
| `Hx.Trigger` | string | An event name, then optional modifiers, separated by spaces. | No. A trigger belongs to the element it is written on. |

```
<!-- Fire once, when the element first appears. The lazy-load idiom. -->
<ContentView Hx.Get="^/group-toolbox/dashboard"
             Hx.Trigger="load"
             Hx.Target="this"
             Hx.Swap="outer" />

<!-- Validate a field when the person leaves it, but only if they changed it. -->
<Rock:TextBox Hx.Id="email"
              Hx.Post="^/group-toolbox/contact/email"
              Hx.Trigger="Unfocused changed"
              Hx.Target="EmailStatus" />

<!-- Search as you type, without a request per keystroke. -->
<Rock:TextBox Hx.Id="q"
              Hx.Get="^/group-toolbox/search"
              Hx.Trigger="TextChanged changed delay:400ms"
              Hx.Target="Results" />
```

## Events

| Value | What it does |
| --- | --- |
| *unset* | The element's natural interaction. |
| `tap`, `tapped`, `clicked` | The same thing, written explicitly. **This is how you make a `HelixForm` respond to a tap**, since forms suppress natural wiring. |
| `load` | Fires once, when the element enters the visual tree. |
| `appear` | Fires every time the containing page appears, the first time included. |
| `every <time>` | Polls on an interval while the page is visible and the app is in the foreground. Five second minimum. |
| any MAUI event name | Looked up on the element by name, case-insensitively. |
| `revealed`, `intersect` | Not implemented. **Wires nothing at all.** |

Named events are looked up on the control itself, so what is available depends on what you put the trigger on.

| Event | Available on | Notes |
| --- | --- | --- |
| `Unfocused`, `Focused` | **every** visual element | Wires everywhere, but only *fires* on controls that can take focus. |
| `TextChanged` | `Entry`, `Editor`, `SearchBar`, `Rock:TextBox` | Not on a `Label`, a layout, or `Rock:CheckBox`. |
| `Toggled` | `Switch` |  |
| `DateSelected` | `DatePicker`, `Rock:DatePicker` |  |
| `SelectedIndexChanged` | `Picker`, `Rock:Picker` |  |
| `Clicked` | `Button`, `ImageButton` | Also a natural-interaction keyword, so it works on any element. |

### Silent failures

**`Unfocused` on something that cannot take focus.** Every visual element declares `Unfocused`, so it wires successfully on a `Label` or a `VerticalStackLayout`, and then never fires, because those never receive focus. Use it on `Entry`, `Editor`, `SearchBar`, `Rock:TextBox`, or `Rock:Picker`.

**An event name that does not exist falls back to a tap.** `Hx.Trigger="TextChanged"` on a `Label` is not an error. Helix does not find the event, so the element gets a tap gesture instead and your request still fires, just from the wrong interaction.

**`revealed` and `intersect` wire nothing at all.** These are the exception to the tap fallback above, deliberately so: falling back to a surprise tap would be worse than doing nothing. An element with `Hx.Trigger="revealed"` is simply inert, with no error to tell you why, so do not reach for HTMX's scroll-into-view idiom yet. See [Limitations](https://community.rockrms.com/developer/mobile-docs/essentials/lava/helix-lava-applications/limitations).

### The "load" trigger

**`load` fires once per element, ever.** If you set `Hx.Trigger="load"` on an element that is already on screen, it fires immediately. But it will **not** fire again when the element re-attaches, for instance after the person pushes a detail page and comes back. When you need a refresh on return, that is what `appear` is for.

### The "appear" trigger

`load` answers "get this once." `appear` answers "keep this current." It hooks the page that contains the element and fires each time that page appears, which includes the first appearance, so it is a superset of `load` rather than an alternative to it.

```
<!-- Re-fetched every time the person returns to this screen. -->
<ContentView Hx.Get="^/group-toolbox/pending-count"
             Hx.Trigger="appear"
             Hx.Target="this"
             Hx.Swap="inner" />
```

The case it exists for: the person taps into a detail screen, changes something there, and comes back. With `load` the summary they return to is the one rendered before they left, and it is now wrong. With `appear` it re-fetches on the way back in.

Pair it with `throttle` when the screen is one people bounce in and out of, so a quick there-and-back does not fire a second request:

```
<ContentView Hx.Get="^/group-toolbox/dashboard" Hx.Trigger="appear throttle:30s" Hx.Target="this" Hx.Swap="inner" />
```

Things to know:

- **It fires exactly once per appearance**, no matter which order the platform raises the page's appearance and the element's own load. You will not get a double fire on one platform and a single fire on the other.
- **A cover sheet is its own page here.** A fragment presented in a sheet hooks the sheet, not the page underneath, matching how sheets scope ids and cancellation. See [Cover Sheets](https://community.rockrms.com/developer/mobile-docs/essentials/lava/helix-lava-applications/cover-sheets).
- **Swap with `inner`, not `outer`.** The subscription belongs to the element, so `outer` throws it away along with the element. If the fragment leaves out `Hx.Trigger="appear"`, the region refreshes once and never again. If the fragment declares it again, the new element fires as soon as it loads, its response replaces it with another element that does the same, and the requests never stop. `throttle` does not prevent this, because each new element starts with its own clock. `inner` keeps the element and replaces only its content, so the subscription survives. Return plain content from the endpoint, with no trigger of its own. See [Swaps and Animations](https://community.rockrms.com/developer/mobile-docs/essentials/lava/helix-lava-applications/swaps-and-animations).
- **An element outside a page is not wired**, silently. In practice this only happens in places a fragment does not normally live.

Note

`appear` is not `revealed`. `appear` is about the *page* coming into view; `revealed` is about the *element* scrolling into the viewport, and it is still [not implemented](https://community.rockrms.com/developer/mobile-docs/essentials/lava/helix-lava-applications/limitations). An element far down a long scroll fires its `appear` when the page opens, whether or not anyone has scrolled to it.

Note

Adding `once` to it (`appear once`) collapses it back to `load` behavior: first appearance only. Write `load` instead, which says the same thing more plainly.

### The "every" trigger

`every` is HTMX's polling form. The interval goes straight after the event name, and any modifiers come after the interval.

```
<!-- Refresh a live count every 30 seconds while this screen is showing. -->
<ContentView Hx.Get="^/group-toolbox/checked-in-count"
             Hx.Trigger="every 30s">
    <!-- Rendered by the server, so the count is right before the first tick. -->
    <Label Text="42 checked in" />
</ContentView>
```

The poller has no `Hx.Target` of its own or from an ancestor, so each response replaces its own content. Return just the inner content from the endpoint, not another poller. Things to know:

- **Five second minimum.** A shorter interval is raised to five seconds. Every open copy of the app polls your Rock server, so the floor keeps one template from flooding it.
- **Only while the page is on screen and the app is in the foreground.** The timer stops when the person navigates to another page or the app goes to the background, and restarts when they come back. Nothing polls in the background.
- **It catches up on return.** If a full interval passed while it was paused, it fires as soon as the page is back, so nobody looks at stale content for another whole interval. Otherwise the next tick comes one interval after the restart.
- **It does not fire at load**, as in HTMX. The element shows what it was rendered with until the first tick, so render the starting content on the server.
- **Ticks never stack up.** A tick that comes due while the previous request is still in flight is dropped.
- **Swap with `inner`.** `outer` replaces the element and its timer with it. That still works if the replacement declares the same trigger, since it starts a timer of its own, but leave the trigger out and polling stops after one tick.
- **A missing or unreadable interval wires nothing.** `every` on its own, or `every soon`, is inert.

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
<Button Text="Check In" Hx.Post="^/group-toolbox/check-in" Hx.Trigger="clicked once" Hx.Target="CheckInStatus" />

<!-- changed: skip the request when the person tabbed through without editing anything. -->
<Rock:TextBox Hx.Id="email" Hx.Post="^/group-toolbox/validate-email" Hx.Trigger="Unfocused changed" Hx.Target="EmailStatus" />

<!-- delay: debounce, so search fires once the typing stops instead of per keystroke. -->
<Rock:TextBox Hx.Id="q" Hx.Get="^/group-toolbox/search" Hx.Trigger="TextChanged delay:400ms" Hx.Target="Results" />

<!-- throttle: honor the first tap now, then ignore further taps for two seconds. -->
<Button Text="Refresh" Hx.Get="^/group-toolbox/rows" Hx.Trigger="clicked throttle:2s" Hx.Target="RowList" />
```

Times accept `400ms`, `2s`, or a bare number of milliseconds. A time that cannot be parsed is dropped, leaving the trigger with no delay or throttle at all.

Modifiers stack. They always apply in the order `once`, `changed`, `throttle`, `delay`, no matter what order you write them in. The search example at the top of this page combines two: `TextChanged changed delay:400ms` waits for a pause in typing *and* skips the request when the text came back to what it already was.

Note

A modifier is only a modifier when an event name comes first. `Hx.Trigger="once"` reads `once` as the *event* name, finds no such event on the control, and falls back to a tap that fires every single time. Write `clicked once`.

Unrecognized modifiers, including HTMX's `from:`, `target:`, `consume`, and `queue`, are parsed and ignored rather than treated as errors, so a template written for a newer version of the app degrades instead of failing.

### The "changed" modifier

**`changed` needs a control with a readable value.** It compares against the same value mapping automatic value inclusion uses. On a control the app cannot read a value from, the current value and the last value are both empty, they compare equal, and **the request never fires**. No error, no warning.

Use `changed` only on:

- any `Rock:` field
- `Entry`, `Editor`, `SearchBar`
- `Switch`

See [Forms and Values](https://community.rockrms.com/developer/mobile-docs/essentials/lava/helix-lava-applications/forms-and-values) for the full mapping.

## When a trigger fires

The order matters, because each step below explains a symptom that otherwise looks inexplicable.

**Resolution happens before any dialog.** The verb, route, target, swap, and indicator are all resolved first. So if `Hx.Target` names an id that does not exist, you never see your `Hx.Confirm` prompt at all. You get the error notification instead, and it looks as though the confirmation was ignored.

**Then the gates, in this order:** `Hx.Confirm`, `Hx.Prompt`, a form submission's own validation, then `Hx.Validator`. Cancelling a dialog or failing a validator aborts before anything is sent.

**A second tap while a request is in flight is dropped.** This is per element, so it is real double-tap protection without locking the rest of the screen. You do not need to add your own.

**Navigating away cancels whatever is in flight**, including a pending `delay`, so a response can never arrive and swap into a screen that is gone.

For what happens once the response arrives, see [Endpoint Responses](https://community.rockrms.com/developer/mobile-docs/essentials/lava/helix-lava-applications/endpoint-responses).
