---
description: "Use when understanding how Hx.* attributes cascade down the visual tree and which attributes inherit versus require explicit declaration on each element"
source: "https://community.rockrms.com/developer/mobile-docs"
sourceLabel: Mobile Docs
---
> **Path:** 

`Hx.*` attributes inherit down the visual tree, the same way HTMX attributes do. Declare `Hx.Target` once on a container and every trigger inside it uses that target without repeating it.

```
<VerticalStackLayout Hx.Target="Sidebar" Hx.Swap="inner">
    <Button Text="Announcements" Hx.Get="^/sink/announcements" />
    <Button Text="Events"        Hx.Get="^/sink/events" />
    <Button Text="Serving"       Hx.Get="^/sink/serving" />
</VerticalStackLayout>
```

All three buttons update `Sidebar`. Only the routes differ, because verbs never inherit.

When a request fires, the app walks up from the initiating element looking for the nearest ancestor that sets the property. A value written directly on the element wins over anything inherited.

## What inherits

| Inherits | Never inherits |
| --- | --- |
| `Hx.Target` | `Hx.Get`, `Hx.Post`, `Hx.Put`, `Hx.Delete` |
| `Hx.Swap` | `Hx.Trigger` |
| `Hx.Confirm` | `Hx.Id` |
| `Hx.Prompt` | `Hx.PageTitle` |
| `Hx.Indicator` | `Hx.Include` |
| `Hx.Params` |  |
| `Hx.Headers` |  |
| `Hx.DisabledElt` |  |
| `Hx.Validator` |  |
| `Hx.Notification` |  |
| `Hx.Disable` (already applies to the whole subtree) |  |

The "never" list is not arbitrary. A verb, a trigger, and an id are all specific to one element by definition; inheriting them would mean every child of a button became a button.

`Hx.Include` is the one deliberate exception to HTMX parity. It carries element content (a list of parameters) rather than a selector, and automatic value inclusion already covers the "gather values from up the tree" case, so it stays per-element. See [Forms and Values](https://community.rockrms.com/developer/mobile-docs/essentials/lava/lava-application/forms-and-values).

## An attribute inherits as one value, not as parts

The walk finds the nearest ancestor that sets the property and takes **its whole value**. For most attributes that distinction never comes up, because the value is a single thing: one id, one message, one route.

It matters for `Hx.Swap`, which packs a strategy and its animation modifiers into one string. A child that wants different motion cannot override just the `animate:` part; it has to restate the strategy too, because its own declaration replaces the ancestor's entirely. See [Requests and Targeting](https://community.rockrms.com/developer/mobile-docs/essentials/lava/lava-application/requests-and-targeting#overriding-an-inherited-animation-means-restating-the-strategy).

## Inheritance crosses fragment boundaries

The walk happens when the request fires, up through the screen as it exists at that moment. A swapped-in fragment is part of that screen, so **a fragment inherits from the container it landed in**, even though the two were authored in separate endpoints and never saw each other.

Declare the target once, on the page:

```
<!-- On the page. Anything inside Detail targets Detail. -->
<VerticalStackLayout Hx.Id="Detail" Hx.Target="Detail" Hx.Swap="inner">
    <Button Text="Load page 1" Hx.Get="^/sink/detail?page=1" />
</VerticalStackLayout>
```

Now the fragment that lands there needs no target at all:

```
<!-- Returned by the endpoint. Note: no Hx.Target, no Hx.Swap anywhere. -->
<VerticalStackLayout>
    <Label Text="Page 1" />
    <Button Text="Next" Hx.Get="^/sink/detail?page=2" />
</VerticalStackLayout>
```

Tapping **Next** refills `Detail`. The walk starts at the button, leaves the fragment, reaches `Detail`, and finds the target there. The endpoint that produced the fragment never mentioned a target and did not need to know one.

## Hx.Disinherit

| Property | Type | Description |
| --- | --- | --- |
| `Hx.Disinherit` | string | Property names this element's descendants should stop inheriting, or `*` for all. |

**Inherits: no.**

Names are space- or comma-separated, and the `Hx.` prefix is optional. Matching is case-insensitive.

```
<VerticalStackLayout Hx.Target="Sidebar" Hx.Swap="inner">

    <Button Text="Updates the sidebar" Hx.Get="^/sink/side" />

    <VerticalStackLayout Hx.Disinherit="Target Swap">
        <!-- Falls back to the block default instead of Sidebar. -->
        <Button Text="Updates the block" Hx.Get="^/sink/main" />
    </VerticalStackLayout>
</VerticalStackLayout>
```

Note

An element's own `Hx.Disinherit` does not affect that element. It affects its descendants. So the inner layout above could still declare its own `Hx.Target` and use it; it just stops passing the outer one down.
