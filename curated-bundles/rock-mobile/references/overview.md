---
description: "Use when building dynamic, interactive mobile screens with XAML using Helix endpoints and Lava without C# code"
source: "https://community.rockrms.com/developer/mobile-docs"
sourceLabel: Mobile Docs
---
> **Path:** 

Helix lets you build dynamic, interactive screens in the mobile app without writing a single line of C#. A Lava Application endpoint returns a chunk of XAML, the app swaps that XAML into the live page, and the person never leaves the screen they were on.

If you have used HTMX on the web, this will feel immediately familiar. Helix is Rock's HTMX-based approach, and the mobile vocabulary is a deliberate port of it. If you have used the mobile Content block's Callbacks, you already know most of the idea: Helix is that same swap loop, generalized so **any** element can start a request and **any** named element on the page can receive the result.

## Your first Helix screen

Three pieces: an element to receive the content, an element to go get it, and an endpoint to serve it.

### On the page

```
<VerticalStackLayout Hx.Id="GroupList">
    <Label Text="Nothing loaded yet." />
</VerticalStackLayout>

<Button Text="Load My Groups"
        StyleClass="btn,btn-primary"
        Hx.Get="^/group-toolbox/my-groups"
        Hx.Target="GroupList"
        Hx.Swap="inner" />
```

### The endpoint

A GET endpoint with the slug `my-groups`, in an application with the slug `group-toolbox`. Its Code Template is ordinary Lava that happens to emit XAML instead of HTML (`25` here being whichever group type you care about):

```
{% assign memberships = CurrentPerson | Groups:'25' %}

<VerticalStackLayout Spacing="8">
    {% for membership in memberships %}
        <Label Text="{{ membership.Group.Name | Escape }}" />
    {% else %}
        <Label Text="You are not in any groups yet." />
    {% endfor %}
</VerticalStackLayout>
```

## Four things to internalize first

**All Lava runs on the server.** Write as much Lava as you like in your Code Template; the shell receives its rendered output. There is no second Lava pass on the device, so a fragment is a snapshot of the moment it was served. The Content block's `ProcessLava` setting does not apply to Helix fragments.

**One request, one target.** A response has a single root element and lands in one place. There are no out-of-band swaps and no response content selection.

**Setting a verb wires the interaction for you.** You do not need `Command="{Binding ...}"` plumbing. The moment you put `Hx.Get` on a `Button`, its `Clicked` is wired. Put it on anything else and it gets a tap gesture.

**Targeting is by id, not by selector.** HTMX aims at the DOM with CSS selectors. Helix aims at an element you have given an `Hx.Id`. Ids work across the whole page, which is what makes it possible for one block to update an element inside a *different* block.

## Vocabulary

These terms come up constantly in the rest of these docs.

| Term | Meaning |
| --- | --- |
| **Endpoint** | A Lava Application endpoint whose Code Template emits XAML instead of HTML. |
| **Fragment** | The XAML an endpoint returns, never the page XAML that fired the request. Always server-finished, always a single root element. |
| **Initiator** | The element whose interaction fired the request. Usually the element carrying the verb. |
| **Target** | The element the fragment is placed into or beside. |
| **Swap** | *How* the fragment is placed: replace the contents, replace the element, append, and so on. |
| **Trigger** | *When* the request fires. Defaults to the element's natural interaction. |
| **Host** | What an id is looked up within, and what a request's lifetime is tied to. The page, or a cover sheet. |

## Routes

Mobile uses the same `^` shorthand web does.

| Form | Resolves to |
| --- | --- |
| `^/app-slug/endpoint-slug` | `/api/v2/lava-app/1/app-slug/endpoint-slug` |
| `^/endpoint-slug` | the same, using the application from the enclosing Lava Application Content block |
| `/api/...` | that server path, verbatim |

Any of them may carry a query string, and query string values stay in the URL for every verb.

## What the shell sends

Every Helix request carries these, so `CurrentPerson` resolves and your Execute security verbs are enforced exactly as they are for a browser.

| Header | Value | Why |
| --- | --- | --- |
| `X-Helix-Client` | `RockMobile` | The mobile analog of HTMX's `HX-Request`. |
| `X-Helix-Shell-Version` | for example `20.0.0` | The app version, so you can gate newer XAML controls. |
| `X-Helix-CSRF-Protection` | `true` | Required when the endpoint has cross-site forgery protection on. |
| Standard Rock authentication | (existing) | The signed-in person's credentials, so the endpoint runs as them. |

To serve both a browser and the app from one endpoint, branch on the **ClientType** merge field rather than reading the header yourself. It is `Mobile` for the app and `Web` for everything else:

```
{% if ClientType == 'Mobile' %}
    <VerticalStackLayout>
        <Label Text="Hello from the app" />
    </VerticalStackLayout>
{% else %}
    <div>Hello from the browser</div>
{% endif %}
```

Note

`ClientType` is a rendering hint, never an authorization input. It is derived from a header that any caller can send, so branch presentation on it and never gate data access on it. See [Security](https://community.rockrms.com/developer/mobile-docs/essentials/lava/lava-application/security).

## Where to next

- [Writing Fragments](https://community.rockrms.com/developer/mobile-docs/essentials/lava/lava-application/writing-fragments) is short and you should read it before you write your first endpoint. It covers the namespace rules, which are the most common reason a fragment fails to parse.
- [Requests and Targeting](https://community.rockrms.com/developer/mobile-docs/essentials/lava/lava-application/requests-and-targeting) for verbs, `Hx.Target`, `Hx.Id`, and the swap strategies.
- [Attribute Reference](https://community.rockrms.com/developer/mobile-docs/essentials/lava/lava-application/attribute-reference) if you just want the lookup table.
