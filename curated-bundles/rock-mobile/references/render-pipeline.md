---
description: "Use when understanding how Rock Mobile renders blocks through server Lava processing, client-side rendering, XAML parsing, and visual tree construction stages"
source: "https://community.rockrms.com/developer/mobile-docs"
sourceLabel: Mobile Docs
---
> **Path:** 

Rock Mobile is a runtime shell. Your screens are not compiled into the app the way they are in a typical .NET MAUI project. The app downloads page and block definitions from your Rock server while it is running, and turns them into a visual tree on the device.

That means a single block passes through several stages before anyone sees it, and different features are resolved at different stages by different engines. Knowing the order is most of what you need to reason about the whole system.

## The Pipeline

![](https://community.rockrms.com/GetImage.ashx?Id=75826)

The five stages that render a Rock Mobile block:

**Stage 1** — the server renders Lava. Your block's XAML is authored with Lava in it. On the server, the full Rock Lava engine runs over that template: shortcodes expand, filters run, entity commands hit the database, merge fields are substituted. What comes out the other side is finished text.

**Stage 2** — the app receives the XAML. The response arrives over HTTP. Depending on the block, the app may also persist it locally, either in the app-shell package it syncs at startup or in a per-block cache with a configurable duration.

**Stage 3** — an optional client-side Lava merge. Some blocks can run a second Lava pass on the device, against merge fields only the device has. This is off unless the block's **Process Lava On Client** setting is enabled, and the engine here is much smaller than the server's.

**Stage 4** — the parse. The app hands the string to MAUI's runtime XAML loader. This is where elements are actually constructed. Before this call there is no `Label`, no `Grid`, no layout — only characters.

**Stage 5** — the live visual tree. The constructed objects are attached to the page. From here bindings evaluate, stylesheets apply, and the tree responds to change for as long as the page lives.

Stages 1 through 3 all do the same kind of work. They transform a string into another string. None of them know what a `Label` is; none of them can inspect or modify a visual tree, because no visual tree exists yet.

Everything before Stage 4 is just text. Everything after it is an object graph. Lava never sees your visual tree. TheXAML parser never sees your Lava. This has two practical consequences worth internalizing:

1. Lava cannot react to anything about the constructed UI. It cannot know a control's measured size, whether a binding resolved, or what the layout did. It finished its work before any of that existed.
2. Any Lava output has to survive as valid XML. Before parsing, the shell round-trips the string through an XML reader and writer in order to inject the namespaces that unprefixed elements and markup extensions resolve through. If a merged value introduces an unclosed tag, a bare `&`, or an unbalanced quote, the failure takes down the whole block, not just the fragment that produced it.

## Two Lava Engines

What is available on the server versus on the device:

|  | Server (stage 1) | Device (stage 3) |
| --- | --- | --- |
| Filters | The full Rock filter set | Lava filters tagged with "Mobile" |
| Shortcodes | Yes | None |
| Entity commands | Yes | None |
| Global attributes | Yes | No |
| Data | The Rock database | Only the merge fields the shell assembled |
| Device state | As reported at app launch | Live |

The client-side engine has no shortcode support at all. An unexpanded `{[ ... ]}` tag is simply text the engine does not recognize, so it passes straight through to the XML reader.

Client-side merge fields are assembled in three layers: app-level (`Device`, `AppValues`, `CurrentPerson`, `DeviceTheme`, `Context`), page-level (`PageParameter`, `PageValues`, `Page`), and block-level (`AttributeValues`, `ConfigurationValues`, `Block`). Property access within them is allow-listed rather than open, so you cannot walk arbitrary object graphs even for objects that are present.

The rule of thumb: if a piece of logic needs data, do it on the server. The device-side pass is for the handful of things only the device knows.

## Mixing Server and Client Lava

**Process Lava On Server** and **Process Lava On Client** are two independent checkboxes on a block's Mobile Settings tab, and a block can have both checked at once. When both are enabled the pipeline still runs in order: stage 1 finishes completely on the server before stage 3 begins on the device. Whatever the server engine can parse, it will parse, and any Lava it does not understand (a client-only filter, for example) either errors or renders as empty text before the device ever sees it.

To hold Lava back for the device, wrap it in `{% raw %}` and `{% endraw %}`. The raw tag tells the server engine to skip processing and pass the enclosed text through verbatim. The tags themselves are removed. The device then receives plain Lava and runs it in stage 3. This is the same [raw tag](https://community.rockrms.com/lava/tags/raw-tags) documented for server Lava. On the web it exists so Lava syntax can be displayed literally; in Rock Mobile it does double duty as the hand-off point between the two engines.

```
//- Stage 1: runs on the server
{% assign campusName = Context.Campus.Name %}

<Label Text="{{ campusName | Escape }}" />

{% raw %}
  {% if DeviceTheme == 'Dark' %}
    <Label Text="Dark mode is on" />
  {% endif %}
{% endraw %}
```

A few consequences follow from the order:

- Server Lava cannot read anything the client produces. Variables assigned inside a raw block do not exist on the server.
- Client Lava can read the server's *output*, because by stage 3 that output is just text in the template. It cannot read server variables by name.
- If only client rendering is enabled, no raw tags are needed. The server never runs Lava on the block, so nothing needs to be protected.
- If only server rendering is enabled, Lava inside raw tags is emitted as literal text and never executes. This is the usual cause of `{{ ... }}` showing up on screen.
- Rock's `//-` comment shorthand is a server-side convenience, not part of the Lava engine on the device. Inside a raw block it is passed through as plain text and will show up on screen. Use `{% comment %}` or keep comments outside the raw block.

**Filter availability is the most common trap.** Filters tagged Mobile in the [Lava filter reference](https://community.rockrms.com/lava) run on the device. Some of those, such as [PersonImpersonationToken](https://community.rockrms.com/lava/filters/person-filters#personimpersonationtoken), exist only on the device and have no server implementation. Their server counterparts ([PersonTokenCreate](https://community.rockrms.com/lava/filters/person-filters#persontokencreate) in this case) do the equivalent work in stage 1. Pick the filter for the stage you are targeting, and if you use the client-only one, it must sit inside raw tags whenever server rendering is also on.

Note

The Lava Tester in Rock runs only the server engine. Client-only filters will not resolve there.

### Which Blocks Honor the Settings

Process Lava On Server and Process Lava On Client live in a settings bag shared by every mobile block, so the two checkboxes appear on the Mobile Settings tab of every block whether or not the block does anything with them.

| Block | Process Lava On Server | Process Lava On Client |
| --- | --- | --- |
| Content | Honored. Unchecked means the template is sent as-is. | Honored |
| Hero | Honored | Honored |
| Content Channel Item View | Ignored. The template is always rendered on the server. | Honored |
| Communication View | Ignored. Always rendered on the server. | Honored |
| Calendar Event Item Occurrence View | Ignored. Always rendered on the server. | Honored |
| Event Item Occurrence List By Audience Lava | Ignored. Always rendered on the server. | Honored |
| Every other mobile block | Ignored | Ignored |

For the template blocks in the middle, unchecking Process Lava On Server does nothing; server Lava runs regardless, so raw tags are required for any client-side Lava in those templates. For blocks not in the table, checking either box has no effect. Their templates are rendered by the block's own code, and the shell does not run a client pass over them. If you need client-side Lava alongside one of those blocks, put it in a Content block on the same page.

## Parse-Time Versus Runtime

Inside stages 4 and 5 there is a second distinction, and it is the one that surprises people coming from compiled XAML.

![](https://community.rockrms.com/GetImage.ashx?Id=75825)

Markup extensions resolve once. When the parser encounters `OnPlatform`, `OnIdiom`, or `Rock:PaletteColor`, it calls the extension, takes the value, sets the property, and discards the extension. There is no live object left behind. These are one-time decisions made while the element is being constructed.

Bindings are built at parse time but evaluated at runtime. The parser constructs a `Binding` object rather than a value. That binding resolves when a `BindingContext` propagates to the element and re-resolves on every change notification afterward. In a Rock Mobile block the `BindingContext` is the block's view model, assigned in the block's constructor — before any XAML is loaded — which is why `{Binding}` expressions in server-authored markup just work.

CSS is applied at runtime and re-applied. Stylesheets resolve against the tree once it is attached, and the shell maintains classes such as `ios`, `android`, `phone`, `tablet`, and `dark-mode`.

So `OnIdiom` will not respond to a rotation and `OnPlatform` will not respond to a theme change. That is not a defect; those values were decided and discarded during construction. Anything that must change after the screen exists needs a binding or a style class.

## Reasoning

Most questions about what works with what have the same shape, and the same method answers them: identify the stage each feature is resolved at. If two features resolve at different stages, they do not interact — the earlier one only hands text to the later one.

As an example, a question that may be unclear at first glance: would an `OnPlatform` definition work inside a shortcode?

Walk the stages. The shortcode expands at stage 1, on the server, and emits characters. If those characters spell `<OnPlatform>`, the server neither knows nor cares — it is producing text. At stage 4, the parser reads that markup and resolves it against the actual device. So yes, it works, and the reason is that the two never meet.

The same walk also surfaces the caveats. Lava written inside the shortcode body is evaluated on the server, so `{% if Device.DevicePlatform == 'iOS' %}` and `<OnPlatform>` are not equivalent even though both appear to branch on platform. And whatever the shortcode emits still has to be valid XML at stage 4.

## Diagnosing Failures

Work down the stages; the earliest one that could have failed usually did.

1. Is the feature available at that stage? Shortcodes and entity commands in a client-merged template are the most common cause of "it works on the web but not in the app."
2. Did the merged output stay well-formed? Unclosed tags and bare ampersands in merged values take the block down.
3. Does the fragment declare its own `xmlns`? It should not. The wrap step injects the default namespace plus `x:`, `Rock:`, and `Common:`; a fragment that declares its own default namespace keeps it for that subtree and loses the shell's additions.
4. Does the value need to change after render? If so it needs a binding or a style class, not a markup extension.
5. Is a cached response involved? A block with `DynamicContent` and a `CacheDuration` can be rendering server output from hours ago.

One trap worth knowing in advance: a Lava error usually surfaces as a markup error. The shell's merge helper catches exceptions and returns the exception message as the rendered string, which is then handed to the XML reader and fails there. If a block shows an error box whose text does not look like markup, read it as a Lava message and check the template syntax first.

## Terms

| Term | Description |
| --- | --- |
| Block | One unit of a page. Has configuration, optional server actions, and authored XAML. |
| Block action | A server endpoint a block calls at runtime, returning XAML or data. |
| Lava | Rock's templating language. Runs as a text transform, server-side and optionally client-side. |
| Shortcode | A Lava construct that expands into a larger block of text. Server-side only. |
| Merge fields | The variables available to a Lava pass. Different sets server-side and client-side. |
| Markup extension | XAML syntax resolved by the parser during element construction, then discarded. |
| Visual tree | The constructed object graph. Does not exist until stage 4. |
| BindingContext | The object a binding resolves against. For a block, its view model. |
| `ProcessLava` | Block setting that enables the stage 3 client-side merge. |
| `raw` | Lava tag that stops the server engine from processing its contents. Used to defer Lava to the stage 3 client-side merge. |
