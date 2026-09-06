---
description: "Use when configuring HTTP requests, routing, and response placement in Rock Mobile Helix interactions"
source: "https://community.rockrms.com/developer/mobile-docs"
sourceLabel: Mobile Docs
---
> **Path:** 

Three questions decide what a Helix interaction does: **what** it calls, **where** the answer goes, and **how** it gets placed. This page covers all three.

## Verbs

| Property | Type | Description |
| --- | --- | --- |
| `Hx.Get` | string | Route to send a GET to. |
| `Hx.Post` | string | Route to send a POST to. |
| `Hx.Put` | string | Route to send a PUT to. |
| `Hx.Delete` | string | Route to send a DELETE to. |

Set one on any element and it becomes interactive.

```
<!-- Application-qualified. Works anywhere. -->
<Button Text="Join" Hx.Post="^/group-toolbox/join?groupId=GRxxxx" />

<!-- Short form. Only inside a Lava Application Content block. -->
<Button Text="Join" Hx.Post="^/join" />

<!-- An absolute API path. -->
<Button Text="Refresh" Hx.Get="/api/v2/models/groups?$top=10" />
```

**Verbs never inherit.** A verb belongs to the element it is written on, always.

### What gets wired

| Element | Interaction |
| --- | --- |
| `Button`, `ImageButton` | `Clicked` |
| `HelixForm` | **Nothing.** Tapping a form's background never submits it. |
| Anything else: `Label`, `Border`, `Grid`, `Image`, a layout | A tap gesture |

Use [`Hx.Trigger`](https://community.rockrms.com/developer/mobile-docs/essentials/lava/lava-application/triggers) when you want something other than the natural interaction.

Note

Attribute order in your markup does not matter. The wiring is recalculated whenever a verb or `Hx.Trigger` changes, so a trigger written before or after its verb behaves the same.

### Route rules worth knowing

**Exactly one verb per element.** Two verbs on one element does not pick a winner. It renders an error notification and sends nothing.

**The short `^/endpoint-slug` form needs an ambient application.** It resolves against the nearest enclosing Lava Application Content block that has an Application configured. Outside one, the route fails **on the device** with a message telling you to use the long form, and no request is sent. Inside a cover sheet, the ambient application is inherited from whatever opened the sheet.

**A route must start with `^/` or `/`.** A bare `^endpoint` with no slash, or a relative `api/...`, is rejected before anything leaves the device.

**Query strings stay in the URL for every verb,** including POST. Only included form values move to the body. See [Forms and Values](https://community.rockrms.com/developer/mobile-docs/essentials/lava/lava-application/forms-and-values).

Note

A verb is not limited to `^` Lava Application routes. Any absolute server path is sent as-is, carrying the signed-in person's credentials, so a fragment containing `<ContentView Hx.Post="/api/v2/..." Hx.Trigger="load" />` fires an authenticated request as that person the moment the screen renders. Read [Security](https://community.rockrms.com/developer/mobile-docs/essentials/lava/lava-application/security) before you widen who can edit Applications.

## Hx.Target

| Property | Type | Description |
| --- | --- | --- |
| `Hx.Target` | string | The `Hx.Id` of the element to place the response into, or `this`, or `coversheet`. |

**Inherits: yes.** Default: the enclosing block.

```
<!-- A named element somewhere on the page. -->
<Button Hx.Get="^/sink/rows" Hx.Target="RowList" Hx.Swap="append" />

<!-- The element that carries the attribute. -->
<Button Text="Load More" Hx.Get="^/sink/page?p=2" Hx.Target="this" Hx.Swap="outer" />

<!-- Present the response in a cover sheet instead of swapping. -->
<Button Text="Details" Hx.Get="^/sink/person-details" Hx.Target="coversheet" />
```

### Ids are page-global

Ids are looked up across the whole page, so **one block can target an element inside another block**. This is the capability Callbacks never had; a Callback could only ever replace its own block.

Bindings keep working wherever a fragment lands. The standard client commands (`PopPage`, `ShowToast`, `OpenBrowser`, and so on) are available in every block, so `Command="{Binding PopPage}"` in your fragment works no matter which block hosts it. This means the element that carries the attribute, not the element that fired. Think of the English word: whoever says "this" is pointing from where they stand.

Written directly on your trigger, the two are the same element:

```
<!-- The button says "this", so "this" is the button. outer replaces the button itself. -->
<Button Text="Load More" Hx.Get="^/sink/page?p=2" Hx.Target="this" Hx.Swap="outer" />
```

Inherited from an ancestor, they are not:

```
<!-- The FieldContainer says "this", so "this" is the FieldContainer. -->
<Rock:FieldContainer Hx.Target="this" Hx.Swap="outer">
    <Rock:TextBox Hx.Id="email"
                  Hx.Post="^/sink/contact/email"
                  Hx.Trigger="Unfocused changed" />
</Rock:FieldContainer>
```

The `TextBox` fires the request, but it declares no `Hx.Target` of its own, so it inherits the container's. `this` resolves to the **`FieldContainer`**, and the response replaces that whole container: label, input, and all.

That is exactly what inline validation needs. Your endpoint returns a fresh `FieldContainer` holding the field plus an error message. If `this` meant "the element that fired," the swap would replace only the `TextBox` and there would be nowhere to put the message. See [Forms and Values](https://community.rockrms.com/developer/mobile-docs/essentials/lava/lava-application/forms-and-values).

### Other targeting details

**Id matching is case-sensitive.** `Hx.Target="grouplist"` will not find `Hx.Id="GroupList"`. The reserved words `this` and `coversheet` *are* case-insensitive, as are the swap strategy names.

**`x:Name` works as a fallback.** Helix looks for a matching `Hx.Id` first, then for a matching `x:Name`. So an explicit `Hx.Id` always wins if both exist.

**An unresolvable target is an error, not a no-op.** You get an error notification and no request.

**A cover sheet is a separate scope.** A fragment in a sheet cannot target the presenting page, and the page cannot target into the sheet. See [Cover Sheets](https://community.rockrms.com/developer/mobile-docs/essentials/lava/lava-application/cover-sheets).

## Hx.Id

| Property | Type | Description |
| --- | --- | --- |
| `Hx.Id` | string | Registers this element as a named swap target, and names it for value inclusion. |

**Inherits: no.**

`Hx.Id` fills the role of the DOM `id` attribute. It does two jobs: it makes an element targetable, and it gives a form control the name its value is submitted under.

```
<VerticalStackLayout Hx.Id="RowList" />
```

Details:

- **Duplicate ids: the newest one wins.** That is deliberate. It is what lets a swapped-in fragment take over an id from the content it replaced.
- An id is only usable while the element is on screen.
- Ids are scoped to the page, or to the cover sheet for a fragment presented in one.

## Hx.Swap

| Property | Type | Description |
| --- | --- | --- |
| `Hx.Swap` | string | How the fragment is placed: `inner` (default), `outer`, `append`, `prepend`, `after`, or `none`, plus optional [animation modifiers](https://community.rockrms.com/developer/mobile-docs/#animating-a-swap). |

**Inherits: yes.**

| Strategy | What it does | The target must be |
| --- | --- | --- |
| `inner` (default) | Replaces the target's content or children | a `ContentView` **or** a `Layout` |
| `outer` | Removes the target and inserts the fragment at its index | any `View` whose parent is a `Layout` or `ContentView` |
| `append` | Adds the fragment as the last child | a `Layout` |
| `prepend` | Inserts the fragment as the first child | a `Layout` |
| `after` | Inserts the fragment as the target's next sibling, target stays | any `View` whose **parent** is a flow `Layout`, not a `Grid` or `AbsoluteLayout` |
| `none` | Discards the body. Response headers are still honored. | anything |

```
<Button Hx.Get="^/sink/rows?page=2" Hx.Target="RowList" Hx.Swap="append" />
```

### Animating a swap

A swap is instant unless you ask for motion. Everything after the strategy is an optional modifier, and their order does not matter:

```
<strategy> [animate:<name>] [swap:<time>] [settle:<time>] [easing:<name>] [distance:<units>]
```
```
<Button Text="Load"
        Hx.Get="^/sink/rows"
        Hx.Target="RowList"
        Hx.Swap="inner animate:slide-up settle:250ms" />
```

| Modifier | Default | What it sets |
| --- | --- | --- |
| `animate:` | none, an instant swap | Which motion to run |
| `swap:` | `150ms` | How long outgoing content animates away |
| `settle:` | `200ms` | How long incoming content animates in |
| `easing:` | `ease-in` out, `ease-out` in | The curve, applied to both halves when you set it |
| `distance:` | `24` | How far `slide-*` travels, in device-independent units |

**`animate:`** takes `none`, `fade`, `slide-up`, `slide-down`, `slide-left`, `slide-right`, or `scale`. Slide directions name the *direction of travel*, so `slide-up` arrives from below and leaves upward.

**`easing:`** takes `linear`, `ease-in`, `ease-out`, `ease-in-out`, `spring`, or `bounce`. Left alone, content accelerates as it leaves and decelerates as it arrives, which is what you usually want; setting `easing:` explicitly overrides both halves with the one curve.

**`swap:` and `settle:` keep the web's words but not quite its meaning.** On the web they are phase holds that give CSS time to transition. Here they are the animation durations themselves, because MAUI has no CSS transition engine and the shell runs the motion itself. `swap:` is the exit, `settle:` is the enter. Times accept `150ms`, `0.2s`, or bare milliseconds.

### Picking a motion

```
<!-- Content changing in place. Fade is the safe default: nothing moves, so nothing lands wrong. -->
<Button Text="Refresh" Hx.Get="^/sink/summary" Hx.Target="Summary" Hx.Swap="inner animate:fade" />

<!-- Rows appended to a list. slide-up matches the direction they enter from. -->
<Button Text="Load More" Hx.Get="^/sink/rows?page=2" Hx.Target="RowList" Hx.Swap="append animate:slide-up" />

<!-- A card arriving on its own. scale reads as settling rather than travelling. -->
<ContentView Hx.Get="^/sink/next-meeting" Hx.Trigger="load" Hx.Target="this" Hx.Swap="outer animate:scale" />

<!-- Everything tuned at once: a longer, springier entrance covering twice the default distance. -->
<Button Text="Open"
        Hx.Get="^/sink/detail"
        Hx.Target="Detail"
        Hx.Swap="inner animate:slide-left swap:120ms settle:320ms easing:spring distance:48" />
```

A reasonable default: `fade` when content is replaced in place, a `slide-*` when content is added alongside what is already there, and `scale` for a single element appearing on its own. Reach for the timing and easing modifiers only when the default 150/200 pair feels wrong on a real device.

### Overriding an inherited animation means restating the strategy

`Hx.Swap` inherits as **one string**, not as separate settings. A child cannot add or replace a single modifier; whatever it declares replaces the entire declaration, strategy included.

```
<VerticalStackLayout Hx.Target="Detail" Hx.Swap="inner animate:fade">

    <!-- Inherits the whole declaration. Fades. -->
    <Button Text="Fades" Hx.Get="^/sink/a" />

    <!-- Wrong. With no strategy token, "animate:slide-up" is read as the strategy
         and fails with an unknown-strategy error. -->
    <Button Text="Broken" Hx.Get="^/sink/b" Hx.Swap="animate:slide-up" />

    <!-- Right. Restate the strategy, then the motion you want. -->
    <Button Text="Slides" Hx.Get="^/sink/c" Hx.Swap="inner animate:slide-up" />

    <!-- Opting out of the inherited motion. -->
    <Button Text="Instant" Hx.Get="^/sink/d" Hx.Swap="inner animate:none" />
</VerticalStackLayout>
```

This is the one place the whole-string design bites. It is also why declaring motion low, on the elements that need it, ages better than declaring it high and fighting it in the children.

### Other animation details

- **Only `inner` and `outer` animate the exit.** `append`, `prepend` and `after` remove nothing, so there is nothing to animate away; they animate the incoming fragment only.
- **A duration without `animate:` is inert, not an error.** An ancestor can declare timings that only some descendants animate with, so an inheriting child that never animates must not fail.
- **`distance:` wants a bare number.** `distance:40` is fine, `distance:40px` is an error. It also does nothing on `fade` and `scale`, which do not translate.
- **`collapse` and `expand` are accepted and deferred.** They need a measured height, which a server-authored fragment cannot be trusted to provide, so they warn and degrade to an instant swap instead of failing.
- **Reduce motion wins.** When the person has asked the platform to minimize animation, every swap collapses to an instant one and no tween runs. You do not need to check for it or offer your own opt-out.

### Border cannot be an inner target

This one catches almost everyone, because `Border` is the container the mobile styling docs steer you toward. `inner` needs a `ContentView` or a `Layout`, and MAUI's `Border` is neither, even though it has a `Content` property.

```
<!-- Wrong. The swap fails with an incompatible-target error. -->
<Border Hx.Id="Card" StyleClass="card">
    <Label Text="..." />
</Border>

<!-- Right. Target a layout inside the border. -->
<Border StyleClass="card">
    <VerticalStackLayout Hx.Id="Card">
        <Label Text="..." />
    </VerticalStackLayout>
</Border>
```

The same applies to `Rock:NotificationBox` and `Rock:Validator`, which are both `Border`\-derived. Your other option is to target the `Border` itself with `outer`, which cares about the *parent* rather than the target.

### "after" constrains the parent

Every other strategy puts the fragment *inside* the target. `after` puts it *beside* the target, so the element that has to accept a new child is the target's **parent**:

```
<VerticalStackLayout>          <!-- the parent takes the new child -->
    <Label Hx.Id="Row1" />     <!-- the target stays put -->
    <!-- the fragment is inserted here -->
</VerticalStackLayout>
```

That works because in a stack layout **child order is visual order**. Inserting at the next index really does mean "appears below."

A `Grid` does not work that way. It positions children by `Grid.Row` and `Grid.Column`, and child order means nothing visually. A new child with no row set lands in the first cell, on top of whatever is already there. `AbsoluteLayout` is the same story with `LayoutBounds`. So `after` refuses both, and shows the incompatible-target error rather than silently overlapping your content.

`outer` gets away with a `Grid` parent because it *replaces* the target, so it can copy the target's exact row and column and land where the old element was. `after` would need the *next* cell, and in a grid there is no such thing.

**One consequence to remember:** a block's parent is a `Zone`, which is a grid. Since the default target is the enclosing block, `Hx.Swap="after"` with no `Hx.Target` always fails. Point `after` at a target that sits inside a stack layout.

### Other swap details

**An incompatible target fails visibly.** You get an error notification next to the target, never a silent no-op.

**`outer` only preserves `Grid` positioning.** `outer` removes the target and puts the fragment where it was, which only works if the replacement inherits how the target was positioned. The only attached properties copied over are the grid ones: `Row`, `Column`, `RowSpan`, `ColumnSpan`.

```
<!-- Fine. The replacement is given Row 2, Column 1. -->
<Grid>
    <Label Grid.Row="2" Grid.Column="1" Hx.Id="Cell" />
</Grid>

<!-- Fine. Position is child order, and the fragment is inserted at the same index. -->
<VerticalStackLayout>
    <Label Hx.Id="Row1" />
</VerticalStackLayout>

<!-- Broken. LayoutBounds is not copied, so the replacement jumps to the top-left corner. -->
<AbsoluteLayout>
    <Label AbsoluteLayout.LayoutBounds="20,40,100,40" Hx.Id="Floating" />
</AbsoluteLayout>
```

`FlexLayout` is a milder version of the same problem. The fragment keeps its place in the flow, because flex follows child order, but any `Basis`, `Grow`, `Shrink`, `AlignSelf`, or `Order` set on the target is lost and the replacement sizes itself with the defaults.

**This one fails silently.** You get no error notification, because the swap did succeed; the fragment is just in the wrong place. If the element you want to replace is positioned absolutely or flex-tuned, wrap it: put a container in that slot and `inner`\-swap its contents, so the positioned element itself is never replaced.

**After an `outer` swap, re-declare what has to survive.** `outer` replaces the target element itself, so the element carrying its `Hx.Id` and its inheritable attributes is gone. [Inheritance](https://community.rockrms.com/developer/mobile-docs/essentials/lava/lava-application/inheritance) keeps this cheap: declare them once on the replacement's own root and the triggers inside it inherit again. `inner` preserves the target, so it needs no re-declaration.

```
<!-- Returned by an endpoint, replacing the previous batch via outer. -->
<VerticalStackLayout Hx.Id="RowList" Hx.Target="this" Hx.Swap="outer">
    <Label Text="Row 1" />
    <Button Text="Load More" Hx.Get="^/sink/rows?page=3" />
</VerticalStackLayout>
```

`Load More` carries only its verb. It inherits `Hx.Target="this"` from the container, and `this` means the element that *declared* it, so the next tap replaces this whole batch with the following one.

**An unknown modifier is an error.** Unlike `Hx.Trigger`, which ignores what it does not recognize, a swap declaration fails loudly. That is deliberate: a silently ignored `animate:fadde` is indistinguishable from "no animation configured," which you cannot debug by looking at the screen. See [Animating a swap](https://community.rockrms.com/developer/mobile-docs/#animating-a-swap) for the modifiers that are recognized.

**`after` does not give you infinite scroll on its own.** That pattern needs two pieces: a `revealed` trigger that fires when an element scrolls into view, and an `after` swap that inserts the next batch beside it. Only the second one exists today.

Substituting a tap for the missing trigger does not work:

```
<!-- Broken. Do not do this. -->
<Button Text="Load More" Hx.Get="^/sink/rows?page=2" Hx.Target="this" Hx.Swap="after" />
```

`after` leaves the target in place, so the button survives its own request and ends up sitting *above* the rows it just loaded, stranded in the middle of the list. And because the route is server-rendered text, it still says `page=2`, so tapping again reloads the batch you already have.

Keep Load More on `outer` targeting `this`. The button replaces itself with the next batch plus a fresh button carrying the next page:

```
<!-- What your endpoint returns for page 2. -->
<VerticalStackLayout>
    <Label Text="Row 21" />
    <Label Text="Row 22" />
    <Button Text="Load More" Hx.Get="^/sink/rows?page=3" Hx.Target="this" Hx.Swap="outer" />
</VerticalStackLayout>
```

The one cost is that each batch nests one layout deeper than the last, because every batch replaces a button that lived inside the previous batch. That is fine for a Load More list, and it is exactly what `revealed` plus `after` will avoid once `revealed` exists.
