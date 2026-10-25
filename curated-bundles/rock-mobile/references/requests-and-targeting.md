---
description: "Use when configuring HTTP requests, routing, and response targeting in Helix mobile interactions with verbs like Hx.Get, Hx.Post, Hx.Put, and Hx.Delete"
source: "https://community.rockrms.com/developer/mobile-docs"
sourceLabel: Mobile Docs
---
> **Path:** 

A Helix interaction is shaped by **what** it calls, **where** the answer goes, and **how** it gets placed. This page covers what a request calls and where the answer goes. How the response is placed once it arrives, and how that change animates, is covered in [Swaps and Animations](https://community.rockrms.com/developer/mobile-docs/essentials/lava/helix-lava-applications/swaps-and-animations).

## Verbs

| Property | Type | Description | Inherits |
| --- | --- | --- | --- |
| `Hx.Get` | string | Route to send a GET to. | No |
| `Hx.Post` | string | Route to send a POST to. | No |
| `Hx.Put` | string | Route to send a PUT to. | No |
| `Hx.Delete` | string | Route to send a DELETE to. | No |

Set one on any element and it becomes interactive.

```
<!-- Application-qualified. Works anywhere. -->
<Button Text="Join" Hx.Post="^/group-toolbox/join?groupId=GRxxxx" Hx.Target="JoinStatus" />

<!-- Short form. Only inside a Lava Application Content block. -->
<Button Text="Join" Hx.Post="^/join" Hx.Target="JoinStatus" />

<!-- An absolute API path. -->
<Button Text="Refresh" Hx.Get="/api/v2/models/groups?$top=10" Hx.Target="GroupList" />
```

**Verbs never inherit.** A verb belongs to the element it is written on, always.

**What gets wired.** A verb wires the element's natural interaction:

| Element | Interaction |
| --- | --- |
| `Button`, `ImageButton` | `Clicked` |
| `HelixForm` | **Nothing.** Tapping a form's background never submits it. |
| Anything else: `Label`, `Border`, `Grid`, `Image`, a layout | A tap gesture |

Use [`Hx.Trigger`](https://community.rockrms.com/developer/mobile-docs/essentials/lava/helix-lava-applications/triggers) when you want something other than the natural interaction.

Note

Attribute order in your markup does not matter. The wiring is recalculated whenever a verb or `Hx.Trigger` changes, so a trigger written before or after its verb behaves the same.

**Exactly one verb per element.** Two verbs on one element does not pick a winner. It renders an error notification and sends nothing.

**The short `^/endpoint-slug` form needs an ambient application.** It resolves against the nearest enclosing [Lava Application Content](https://community.rockrms.com/developer/mobile-docs/essentials/blocks/cms/lava-application-content) block that has an Application configured. Outside one, the route fails **on the device** with a message telling you to use the long form, and no request is sent. Inside a cover sheet, the ambient application is inherited from whatever opened the sheet.

**A route must start with `^/` or `/`.** A bare `^endpoint` with no slash, or a relative `api/...`, is rejected before anything leaves the device.

**Query strings stay in the URL for every verb,** including POST. Only included form values move to the body. See [Forms and Values](https://community.rockrms.com/developer/mobile-docs/essentials/lava/helix-lava-applications/forms-and-values).

Note

A verb is not limited to `^` Lava Application routes. Any absolute server path is sent as-is, carrying the signed-in person's credentials, so a fragment containing `<ContentView Hx.Post="/api/v2/..." Hx.Trigger="load" />` fires an authenticated request as that person the moment the screen renders. Read [Security](https://community.rockrms.com/developer/mobile-docs/essentials/lava/helix-lava-applications/security) before you widen who can edit Applications.

## Hx.Target

| Property | Type | Description | Inherits |
| --- | --- | --- | --- |
| `Hx.Target` | string | The `Hx.Id` of the element to place the response into, or `this`, or `coversheet`. | Yes. Default: the element that made the request. |

```
<!-- A named element somewhere on the page. -->
<Button Hx.Get="^/group-toolbox/rows" Hx.Target="RowList" Hx.Swap="append" />

<!-- The element that carries the attribute. -->
<Button Text="Load More" Hx.Get="^/group-toolbox/page?p=2" Hx.Target="this" Hx.Swap="outer" />

<!-- Present the response in a cover sheet instead of swapping. -->
<Button Text="Details" Hx.Get="^/group-toolbox/person-details" Hx.Target="coversheet" />
```

**Id matching is case-sensitive.** `Hx.Target="grouplist"` will not find `Hx.Id="GroupList"`. The reserved words `this` and `coversheet` *are* case-insensitive, as are the swap strategy names.

**`x:Name` works as a fallback.** Helix looks for a matching `Hx.Id` first, then for a matching `x:Name`. So an explicit `Hx.Id` always wins if both exist.

**An unresolvable target is an error, not a no-op.** You get an error notification and no request.

**A cover sheet is a separate scope.** A fragment in a sheet cannot target the presenting page, and the page cannot target into the sheet. See [Cover Sheets](https://community.rockrms.com/developer/mobile-docs/essentials/lava/helix-lava-applications/cover-sheets).

### Default target

When neither the element nor any ancestor sets `Hx.Target`, the response goes into the element that made the request, as it does in HTMX and web Helix. That suits a container that loads or refreshes itself, and a `HelixForm`, whose submission swaps the response into the form. A Lava Application Content block's own initial load still fills the block.

```
<!-- Fine. A ContentView can hold the response, so it fills itself. -->
<ContentView Hx.Get="^/group-toolbox/next-meeting" Hx.Trigger="load" />

<!-- Error once a body comes back. A Button cannot hold content. -->
<Button Text="Join" Hx.Post="^/group-toolbox/join" />

<!-- Right. Say where the response goes. -->
<Button Text="Join" Hx.Post="^/group-toolbox/join" Hx.Target="JoinStatus" />
```

**A control that cannot hold content needs somewhere to put the answer.** A `Button`, `Label`, `Image`, `Rock:TextBox`, or `Border` cannot take an `inner` swap, so a request from one with no target shows the incompatible-target error as soon as a response body arrives. Give it an `Hx.Target`, set `Hx.Swap="outer"` to replace the control itself, or return an empty body when the request only needs to run. An empty body skips the swap, and `X-Helix-Command` still runs.

### Id scope

Ids are looked up across the whole page, so **one block can target an element inside another block**. This is the capability Callbacks never had; a Callback could only ever replace its own block.

Bindings keep working wherever a fragment lands. The standard client commands (`PopPage`, `ShowToast`, `OpenBrowser`, and so on) are available in every block, so `Command="{Binding PopPage}"` in your fragment works no matter which block hosts it.

### Targeting "this"

**`this` means the element that carries the attribute**, not the element that fired. Think of the English word: whoever says "this" is pointing from where they stand.

Written directly on your trigger, the two are the same element:

```
<!-- The button says "this", so "this" is the button. outer replaces the button itself. -->
<Button Text="Load More" Hx.Get="^/group-toolbox/page?p=2" Hx.Target="this" Hx.Swap="outer" />
```

Inherited from an ancestor, they are not:

```
<!-- The wrapper says "this", so "this" is the wrapper. -->
<VerticalStackLayout Hx.Target="this" Hx.Swap="outer">
    <Rock:FieldContainer>
        <Rock:TextBox Hx.Id="email"
                      Hx.Post="^/group-toolbox/contact/email"
                      Hx.Trigger="Unfocused changed" />
    </Rock:FieldContainer>
</VerticalStackLayout>
```

The `TextBox` fires the request, but it declares no `Hx.Target` of its own, so it inherits the wrapper's. `this` resolves to the **`VerticalStackLayout`**, and the response replaces that whole wrapper: container, label, input, and all.

That is exactly what inline validation needs. Your endpoint returns a fresh wrapper holding the field plus an error message beside it. If `this` meant "the element that fired," the swap would replace only the `TextBox` and there would be nowhere to put the message. The wrapper is a plain layout rather than the `FieldContainer` itself because a `FieldContainer` only accepts Rock fields, so it cannot hold the message. See [Forms and Values](https://community.rockrms.com/developer/mobile-docs/essentials/lava/helix-lava-applications/forms-and-values).

## Hx.Id

| Property | Type | Description | Inherits |
| --- | --- | --- | --- |
| `Hx.Id` | string | Registers this element as a named swap target, and names it for value inclusion. | No |

`Hx.Id` fills the role of the DOM `id` attribute. It does two jobs: it makes an element targetable, and it gives a form control the name its value is submitted under.

```
<VerticalStackLayout Hx.Id="RowList" />
```

Details:

- **Duplicate ids: the newest one wins.** That is deliberate. It is what lets a swapped-in fragment take over an id from the content it replaced.
- An id is only usable while the element is on screen.
- Ids are scoped to the page, or to the cover sheet for a fragment presented in one.
