---
description: "Use when building Rock mobile endpoints that return XAML fragments, troubleshooting fragment rendering issues, or understanding namespace and Lava execution requirements for mobile responses"
source: "https://community.rockrms.com/developer/mobile-docs"
sourceLabel: Mobile Docs
---
> **Path:** 

A **fragment** is the XAML your endpoint returns. Throughout these docs "fragment" always means the response body, never the page XAML that fired the request.

This page is short on purpose: the rules below are the most common reason a fragment fails to render. The namespace rules in particular apply to **any** XAML the server sends the shell, so a Lava Application Content block's Initial Template plays by them too.

## The rules

**One root element.** A fragment has exactly one root. If you need to return several cards, wrap them in a layout. HTMX allows sibling nodes for `append` and `prepend`; mobile does not.

**Lava runs on the server, not on the device.** Write as much Lava in your Code Template as you like. The device never evaluates Lava, so what it receives is the rendered result. This has a consequence worth its own section, below.

## Where Lava runs

Your Code Template is Lava, and it can be as complex as you need. It runs on the server, and the app receives only its output. So this template:

```
{% if ClientType == 'Mobile' %}
	<VerticalStackLayout Padding="12" Spacing="2" StyleClass="bg-interface-soft">
	    <Label Text="Method: {{ Method }}" StyleClass="footnote, text-interface-strong" />
	    <Label Text="q: {{ QueryString['q'] | Default:'(none)' | Escape }}" StyleClass="footnote, text-interface-strong" />
	    <Label Text="At {{ 'Now' | Date:'h:mm:ss tt' }}" StyleClass="footnote, text-interface-medium" />
	</VerticalStackLayout>
{% else %}
	<pre>Method: {{ Method }}</pre>
{% endif %}
```

reaches the device as this fragment, with no Lava left in it:

```
<VerticalStackLayout Padding="12" Spacing="2" StyleClass="bg-interface-soft">
    <Label Text="Method: GET" StyleClass="footnote, text-interface-strong" />
    <Label Text="q: hello" StyleClass="footnote, text-interface-strong" />
    <Label Text="At 9:41:07 AM" StyleClass="footnote, text-interface-medium" />
</VerticalStackLayout>
```

**A fragment is therefore a snapshot.** That clock shows the time the request was served and stays frozen there until something swaps the fragment again. Nothing in a fragment re-evaluates on its own, so anything that needs to change has to come from another request.

There is no second Lava pass on the device, and the Content block's `ProcessLava` setting does not apply to Helix fragments.

### Why you must not declare xmlns

The `Hx.*` attributes only resolve in the namespace the app sets up for you. If your fragment root declares its own `xmlns`, it overrides that for the whole fragment. Standard controls still work, so the fragment looks fine at a glance, but **every `Hx.*` attribute stops working** and your interactions silently do nothing.

```
<!-- Wrong. Hx.Get will not resolve anywhere inside this fragment. -->
<VerticalStackLayout xmlns="http://schemas.microsoft.com/dotnet/2021/maui">
    <Button Text="Load" Hx.Get="^/sink/rows" />
</VerticalStackLayout>

<!-- Right. Let the wrapper handle namespaces. -->
<VerticalStackLayout>
    <Button Text="Load" Hx.Get="^/sink/rows" />
</VerticalStackLayout>
```
