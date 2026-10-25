---
description: "Use when implementing swap strategies to control how response fragments are placed, replaced, or animated in Rock mobile views"
source: "https://community.rockrms.com/developer/mobile-docs"
sourceLabel: Mobile Docs
---
> **Path:** 

`Hx.Swap` decides how a response is placed once it arrives: whether the fragment replaces the target's content or the target itself, is added alongside what is already there, feeds a list, or is discarded, and whether the change animates.

Which route a request calls and which element receives the response are covered in [Requests and Targeting](https://community.rockrms.com/developer/mobile-docs/essentials/lava/helix-lava-applications/requests-and-targeting). This page picks up from there, once the target is known.

## Swap strategies

| Property | Type | Description | Inherits |
| --- | --- | --- | --- |
| `Hx.Swap` | string | How the fragment is placed: `inner` (default), `outer`, `append`, `prepend`, `after`, `none`, `items-append`, or `items-replace`, plus optional animation modifiers, covered in Animating a swap, below. | Yes |

| Strategy | What it does | The target must be |
| --- | --- | --- |
| `inner` (default) | Replaces the target's content or children | a `ContentView` **or** a `Layout` |
| `outer` | Removes the target and inserts the fragment at its index | any `View` whose parent is a `Layout` or `ContentView` |
| `append` | Adds the fragment as the last child | a `Layout` |
| `prepend` | Inserts the fragment as the first child | a `Layout` |
| `after` | Inserts the fragment as the target's next sibling, target stays | any `View` whose **parent** is a flow `Layout`, not a `Grid` or `AbsoluteLayout` |
| `none` | Discards the body. Response headers are still honored. | anything |
| `items-append` | Feeds a list from a JSON array response, adding the items after the ones already there. See [Data Lists and Paging](https://community.rockrms.com/developer/mobile-docs/essentials/lava/helix-lava-applications/data-lists-and-paging) | a `CollectionView`, `CarouselView`, or Rock `ItemsCollection` |
| `items-replace` | Feeds a list from a JSON array response, replacing the items already there. See [Data Lists and Paging](https://community.rockrms.com/developer/mobile-docs/essentials/lava/helix-lava-applications/data-lists-and-paging) | a `CollectionView`, `CarouselView`, or Rock `ItemsCollection` |

```
<Button Hx.Get="^/group-toolbox/rows?page=2" Hx.Target="RowList" Hx.Swap="append" />
```

**An incompatible target fails visibly.** You get an error notification next to the target, never a silent no-op.

### Border targets

**`Border` cannot be an `inner` target.** This one catches almost everyone, because `Border` is the container the mobile styling docs steer you toward. `inner` needs a `ContentView` or a `Layout`, and MAUI's `Border` is neither, even though it has a `Content` property.

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

### Using "after"

**`after` constrains the parent, not the target.** Every other strategy puts the fragment *inside* the target. `after` puts it *beside* the target, so the element that has to accept a new child is the target's **parent**:

```
<VerticalStackLayout>          <!-- the parent takes the new child -->
    <Label Hx.Id="Row1" />     <!-- the target stays put -->
    <!-- the fragment is inserted here -->
</VerticalStackLayout>
```

That works because in a stack layout **child order is visual order**. Inserting at the next index really does mean "appears below."

A `Grid` does not work that way. It positions children by `Grid.Row` and `Grid.Column`, and child order means nothing visually. A new child with no row set lands in the first cell, on top of whatever is already there. `AbsoluteLayout` is the same story with `LayoutBounds`. So `after` refuses both, and shows the incompatible-target error rather than silently overlapping your content.

`outer` gets away with a `Grid` parent because it *replaces* the target, so it can copy the target's exact row and column and land where the old element was. `after` would need the *next* cell, and in a grid there is no such thing.

**One consequence to remember:** with no `Hx.Target`, the strategy applies to the element that made the request. `append` and `prepend` need that element to be a `Layout`. `after` inserts beside it, so its parent has to be a flow layout, and a `Button` sitting directly in a `Grid` fails for exactly the reason above. Give these strategies an explicit `Hx.Target` whenever the element that asks is not the element that should change.

### Using "outer"

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

**After an `outer` swap, re-declare what has to survive.** `outer` replaces the target element itself, so the element carrying its `Hx.Id` and its inheritable attributes is gone. [Inheritance](https://community.rockrms.com/developer/mobile-docs/essentials/lava/helix-lava-applications/inheritance) keeps this cheap: declare them once on the replacement's own root and the triggers inside it inherit again. `inner` preserves the target, so it needs no re-declaration.

```
<!-- Returned by an endpoint, replacing the previous batch via outer. -->
<VerticalStackLayout Hx.Id="RowList" Hx.Target="this" Hx.Swap="outer">
    <Label Text="Row 1" />
    <Button Text="Load More" Hx.Get="^/group-toolbox/rows?page=3" />
</VerticalStackLayout>
```

`Load More` carries only its verb. It inherits `Hx.Target="this"` from the container, and `this` means the element that *declared* it, so the next tap replaces this whole batch with the following one.

### Load More buttons

**`after` does not give you infinite scroll on its own.** That pattern needs two pieces: a `revealed` trigger that fires when an element scrolls into view, and an `after` swap that inserts the next batch beside it. Only the second one exists today. For a list that pages as the person scrolls, feed a `CollectionView` with `items-append` instead, as described in [Data Lists and Paging](https://community.rockrms.com/developer/mobile-docs/essentials/lava/helix-lava-applications/data-lists-and-paging).

Substituting a tap for the missing trigger does not work:

```
<!-- Broken. Do not do this. -->
<Button Text="Load More" Hx.Get="^/group-toolbox/rows?page=2" Hx.Target="this" Hx.Swap="after" />
```

`after` leaves the target in place, so the button survives its own request and ends up sitting *above* the rows it just loaded, stranded in the middle of the list. And because the route is server-rendered text, it still says `page=2`, so tapping again reloads the batch you already have.

Keep Load More on `outer` targeting `this`. The button replaces itself with the next batch plus a fresh button carrying the next page:

```
<!-- What your endpoint returns for page 2. -->
<VerticalStackLayout>
    <Label Text="Row 21" />
    <Label Text="Row 22" />
    <Button Text="Load More" Hx.Get="^/group-toolbox/rows?page=3" Hx.Target="this" Hx.Swap="outer" />
</VerticalStackLayout>
```

The one cost is that each batch nests one layout deeper than the last, because every batch replaces a button that lived inside the previous batch. That is fine for a short Load More list. For a long one, use an items swap, which keeps every row in a single native list.

## Animating a swap

A swap is instant unless you ask for motion. Everything after the strategy is optional, and the order of the modifiers does not matter:

```
<strategy> [animate:<name>] [swap:<time>] [settle:<time>] [easing:<name>] [distance:<units>]
```
```
<Button Text="Load"
        Hx.Get="^/group-toolbox/rows"
        Hx.Target="RowList"
        Hx.Swap="inner animate:slide-up settle:250ms" />
```

| Modifier | Default | What it sets |
| --- | --- | --- |
| `animate:` | none, an instant swap | Which motion to run |
| `swap:` | `150ms` | How long outgoing content animates away |
| `settle:` | `200ms` | How long incoming content animates in |
| `easing:` | `ease-in` on the exit, `ease-out` on the enter | The curve, applied to both halves when you set it |
| `distance:` | `24` | How far `slide-*` travels, in device-independent units |

**`animate:`** takes `none`, `fade`, `slide-up`, `slide-down`, `slide-left`, `slide-right`, or `scale`. Slide directions name the *direction of travel*, so `slide-up` arrives from below and leaves upward.

**`easing:`** takes `linear`, `ease-in`, `ease-out`, `ease-in-out`, `spring`, or `bounce`. Left alone, content accelerates as it leaves and decelerates as it arrives, which is what you usually want; setting `easing:` explicitly overrides both halves with the one curve.

**`swap:` and `settle:` keep the web's words but not quite its meaning.** On the web they are phase holds that give CSS time to transition. Here they are the animation durations themselves, because MAUI has no CSS transition engine and the app runs the motion itself. `swap:` is the exit, `settle:` is the enter. Times accept `150ms`, `0.2s`, or bare milliseconds.

**An unknown modifier is an error.** Unlike `Hx.Trigger`, which ignores what it does not recognize, a swap declaration fails loudly. That is deliberate: a silently ignored `animate:fadde` is indistinguishable from "no animation configured," which you cannot debug by looking at the screen. The modifiers and values above are the ones recognized.

- **Only `inner` and `outer` animate the exit.** `append`, `prepend` and `after` remove nothing, so there is nothing to animate away; they animate the incoming fragment only.
- **A duration without `animate:` is inert, not an error.** An ancestor can declare timings that only some descendants animate with, so an inheriting child that never animates must not fail.
- **`distance:` wants a bare number.** `distance:40` is fine, `distance:40px` is an error. It also does nothing on `fade` and `scale`, which do not translate.
- **`collapse` and `expand` are accepted and deferred.** They need a measured height, which a server-authored fragment cannot be trusted to provide, so they warn and degrade to an instant swap instead of failing.
- **Reduce motion wins.** When the person has asked the platform to minimize animation, every swap collapses to an instant one and no tween runs. You do not need to check for it or offer your own opt-out.

**Picking a motion.** A reasonable default: `fade` when content is replaced in place, a `slide-*` when content is added alongside what is already there, and `scale` for a single element appearing on its own. Reach for the timing and easing modifiers only when the default 150/200 pair feels wrong on a real device.

```
<!-- Content changing in place. Fade is the safe default: nothing moves, so nothing lands wrong. -->
<Button Text="Refresh" Hx.Get="^/group-toolbox/summary" Hx.Target="Summary" Hx.Swap="inner animate:fade" />

<!-- Rows appended to a list. slide-up matches the direction they enter from. -->
<Button Text="Load More" Hx.Get="^/group-toolbox/rows?page=2" Hx.Target="RowList" Hx.Swap="append animate:slide-up" />

<!-- A card arriving on its own. scale reads as settling rather than travelling. -->
<ContentView Hx.Get="^/group-toolbox/next-meeting" Hx.Trigger="load" Hx.Target="this" Hx.Swap="outer animate:scale" />

<!-- Everything tuned at once: a longer, springier entrance covering twice the default distance. -->
<Button Text="Open"
        Hx.Get="^/group-toolbox/detail"
        Hx.Target="Detail"
        Hx.Swap="inner animate:slide-left swap:120ms settle:320ms easing:spring distance:48" />
```

### Overriding animations

`Hx.Swap` inherits as **one string**, not as separate settings. A child cannot add or replace a single modifier; whatever it declares replaces the entire declaration, strategy included.

```
<VerticalStackLayout Hx.Target="Detail" Hx.Swap="inner animate:fade">

    <!-- Inherits the whole declaration. Fades. -->
    <Button Text="Fades" Hx.Get="^/group-toolbox/a" />

    <!-- Wrong. With no strategy token, "animate:slide-up" is read as the strategy
         and fails with an unknown-strategy error. -->
    <Button Text="Broken" Hx.Get="^/group-toolbox/b" Hx.Swap="animate:slide-up" />

    <!-- Right. Restate the strategy, then the motion you want. -->
    <Button Text="Slides" Hx.Get="^/group-toolbox/c" Hx.Swap="inner animate:slide-up" />

    <!-- Opting out of the inherited motion. -->
    <Button Text="Instant" Hx.Get="^/group-toolbox/d" Hx.Swap="inner animate:none" />
</VerticalStackLayout>
```

This is the one place the whole-string design bites. It is also why declaring motion low, on the elements that need it, ages better than declaring it high and fighting it in the children.
