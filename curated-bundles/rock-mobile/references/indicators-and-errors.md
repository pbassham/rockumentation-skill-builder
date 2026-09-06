---
description: "Use when user asks about loading indicators, spinners, confirmation dialogs, or text prompts during request execution in rock-mobile apps"
source: "https://community.rockrms.com/developer/mobile-docs"
sourceLabel: Mobile Docs
---
> **Path:** 

Everything on this page is about what the person sees while a request is in flight, and what they see when it fails.

## Hx.Indicator

| Property | Type | Description |
| --- | --- | --- |
| `Hx.Indicator` | string | The `Hx.Id` of an element to show during the request. |

**Inherits: yes.**

There are two ways to show a spinner, and which one you use depends on whether your trigger can hold children.

### Container triggers: the CSS class convention

If your trigger is a layout, nest an indicator inside it with `StyleClass="htmx-indicator"`. While a request is in flight the initiating element gets the `htmx-request` class, and the default stylesheet reveals any indicator inside it.

```
<VerticalStackLayout Hx.Get="^/sink/slow">
    <Label Text="Tap to load" />
    <ActivityIndicator StyleClass="htmx-indicator" IsRunning="True" />
</VerticalStackLayout>
```

These rules ship in the default styles, matching web:

```
.htmx-indicator { opacity: 0; }
.htmx-request .htmx-indicator { opacity: 1; }
```

Opacity rather than `IsVisible` is intentional. It matches HTMX and avoids the layout jump you would get from collapsing the indicator's space.

### Buttons and other leaf triggers: Hx.Indicator

A MAUI `Button` has no child content, only `Text` and `ImageSource`, and a sibling is not a descendant, so the CSS rule above cannot reach it. Point `Hx.Indicator` at the sibling's id instead.

```
<HorizontalStackLayout>
    <Button Text="Save" Hx.Post="^/sink/save" Hx.Indicator="saving" />
    <ActivityIndicator Hx.Id="saving" StyleClass="htmx-indicator" IsRunning="True" />
</HorizontalStackLayout>
```

Note

Because a button is the most common trigger, this is the ordinary path, not an escape hatch. Reach for it first.

The app sets the named element's opacity to 1 and adds `htmx-request` to it, so a nested `.htmx-indicator` inside your indicator also reveals. The prior opacity is restored when the request finishes. If the id does not resolve, the request still fires; you just get no indicator.

## Hx.Confirm

| Property | Type | Description |
| --- | --- | --- |
| `Hx.Confirm` | string | A message shown in a native alert before the request fires. |

**Inherits: yes.**

```
<Button Text="Remove"
        Hx.Post="^/group-toolbox/remove-member?id=GMxxxx"
        Hx.Confirm="Remove this person from the group?" />
```

The alert has no title, and OK and Cancel buttons. Cancelling aborts before any request state changes. Because it inherits, a container or a form can declare one confirmation that covers all of its triggers.

## Hx.Prompt

| Property | Type | Description |
| --- | --- | --- |
| `Hx.Prompt` | string | A message shown in a native text-input dialog before the request fires. |

**Inherits: yes.**

The value the person types is sent as the **`X-Helix-Prompt` request header**, not as a form value.

```
<Button Text="Add Note" Hx.Post="^/sink/note" Hx.Prompt="What should the note say?" />
```

Read it in your endpoint from the `Headers` merge field:

```
{% assign note = Headers['X-Helix-Prompt'] %}
```

Two details:

- **An empty entry is a real value.** Only Cancel aborts the request.
- Newlines in the entry become spaces, because the value travels in a header and headers cannot carry newlines.

## Hx.DisabledElt

| Property | Type | Description |
| --- | --- | --- |
| `Hx.DisabledElt` | string | The id of one more element to disable while the request is in flight. |

**Inherits: yes.**

```
<Button Text="Save" Hx.Post="^/sink/save" Hx.DisabledElt="cancelButton" />
<Button Hx.Id="cancelButton" Text="Cancel" Command="{Binding PopPage}" />
```

**The initiating element is always disabled during flight**, so you never need this for double-tap protection on the trigger itself. Use it for the *other* controls that should not be touched mid-request.

It takes a single id, not a list. The prior enabled state is captured and restored, so this never force-enables something that was already disabled.

## Hx.Disable

| Property | Type | Description |
| --- | --- | --- |
| `Hx.Disable` | bool | Turns Helix processing off for this element and everything under it. |

Default `false`. It applies to the element and everything beneath it.

```
<VerticalStackLayout Hx.Disable="True">
    <!-- Every Hx.* attribute in here is inert. -->
</VerticalStackLayout>
```

It does three jobs at once, which is worth knowing:

1. Blocks requests from the subtree.
2. Opts a button out of `HelixForm` submit defaulting.
3. Makes a form skip the subtree when collecting fields to validate.

## Hx.Notification

| Property | Type | Description |
| --- | --- | --- |
| `Hx.Notification` | string | The id of an element that request errors render into. |

**Inherits: yes.**

This is mobile-only, and it is the single most useful thing on this page. It declares an error slot by id: request errors render *there* instead of into your target or beside your button.

```
<VerticalStackLayout Hx.Notification="formErrors">

    <ContentView Hx.Id="formErrors" />

    <Button Text="Save" Hx.Post="^/sink/save" />
    <Button Text="Archive" Hx.Post="^/sink/archive" />
</VerticalStackLayout>
```
- **Errors replace rather than stack.** A second failure overwrites the first instead of piling up notifications.
- **A later success clears the slot.** The app remembers what it put there and removes it on the next successful request from the same declaration.
- **Because it inherits, one slot covers every trigger beneath it.** That is the main reason to use it, and why declaring it on a form or a card container is the idiom.

Note

The slot has to be a `ContentView` or a `Layout`, because the error is placed with an `inner` swap. Pointing `Hx.Notification` at a `Rock:NotificationBox` does not work, since that is `Border`\-derived. An empty `<ContentView Hx.Id="..." />` is the idiomatic slot.

If the named slot cannot be found, the error still appears using the default placement below, so a failure is never invisible.

## Where errors go

Three placements, chosen in this order:

1. **The `Hx.Notification` slot**, if one is declared and resolves.
2. **Beside the initiator**, if there is no target, or if the requested swap would have removed the initiating element (`outer` on `this`, or a target that contains it). This keeps the control usable so the person can retry, instead of deleting the thing they just tapped.
3. **Into the target**, otherwise.

Errors render as a notification box with an "Error" header. Both the slot placement and the beside-the-initiator placement replace the previous error rather than stacking, and both clear on the next success.

### What produces an error

- Two verbs on one element, or a route the app cannot parse.
- An unresolvable `Hx.Target` or `HX-Retarget`, or an unknown `Hx.Swap` or `HX-Reswap` value.
- A network failure, or any non-2xx status. The body of a non-2xx response is treated as **plain text**, never parsed as XAML.
- A swap strategy applied to a target type that cannot host it.
- A fragment that fails to parse. The parse error becomes a notification that swaps in normally, so it fails visible rather than silent.

### Two limitations to design around

**An error rendered into the target uses an `inner` swap.** So if your request appends rows to a list and it fails, the error **replaces the whole list**. Declare an `Hx.Notification` slot on anything that appends or prepends. This is the main practical reason to use one.

**An error placed beside a trigger that sits directly in a `Grid` lands in the wrong cell.** It gets no row or column of its own, so it overlaps whatever is in the first cell. The error is still visible, just badly positioned. Declaring an `Hx.Notification` slot avoids it entirely.
