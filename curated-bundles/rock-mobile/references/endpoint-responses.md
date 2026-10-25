---
description: "Use when building endpoint responses for rock-mobile that need to return XAML fragments, set redirect/refresh headers, or execute client commands"
source: "https://community.rockrms.com/developer/mobile-docs"
sourceLabel: Mobile Docs
---
> **Path:** 

Your endpoint's job is to return a XAML fragment. It can also send response headers to tell the app to do something other than a plain swap.

## The response contract

| Response | What the app does |
| --- | --- |
| **2xx with a body** | Treats the body as a XAML fragment and swaps it per the initiator's target and swap. For an items swap, the body is a JSON array instead. See [Data Lists and Paging](https://community.rockrms.com/developer/mobile-docs/essentials/lava/helix-lava-applications/data-lists-and-paging). |
| **2xx with an empty body** | No swap. This is a valid fire-and-forget response, not an error, and response headers such as `X-Helix-Command` are still honored. For an items swap it counts as an empty array. |
| **Non-2xx** | Treats the body as a **plain text message** and shows it in an error notification. |

Note

Never return a XAML fragment with an error status code. Non-2xx bodies are never parsed. If you want to render an error *as UI*, return 200 with the error markup as your fragment, or use `HX-Retarget` to aim it at an error slot.

## Response headers

| Header | What it does |
| --- | --- |
| `HX-Redirect` | Navigate to the given page Guid. Short-circuits the swap. |
| `HX-Refresh: true` | Reload the current page. Short-circuits the swap. |
| `HX-Retarget` | Override the request's target id for this response. |
| `HX-Reswap` | Override the request's swap strategy for this response. |
| `X-Helix-Command` / `X-Helix-Command-Parameter` | **Mobile only.** Run a named client command. |
| `X-Helix-Next` | **Mobile only.** The next page's route for an items swap. See [Data Lists and Paging](https://community.rockrms.com/developer/mobile-docs/essentials/lava/helix-lava-applications/data-lists-and-paging). |

All of them are set the same way, with the existing `httpresponse` Lava command, and a template can send more than one. No server changes are needed.

```
{% httpresponse %}
    [[ header key:'HX-Reswap' ]]outer[[ endheader ]]
    [[ header key:'X-Helix-Command' ]]ShowToast[[ endheader ]]
{% endhttpresponse %}
```

They are read in the order listed above, which matters because the first two short-circuit everything after them: if you send `HX-Redirect`, your body is never swapped and your `X-Helix-Command` never runs. Both are also read *before* the status code, so a redirect or a refresh is honored even on a non-2xx response, and the error notification you might have expected never appears.

### HX-Redirect

Replaces the current page with another one. The value is a **page Guid**, optionally carrying a query string and an anchor.

```
{% httpresponse %}
    [[ header key:'HX-Redirect' ]]0d1a1e37-e5f1-4a0f-9d0a-0d0e1a9d3b21[[ endheader ]]
{% endhttpresponse %}
```
```
{% comment %} Page parameters, and an anchor to scroll to on arrival. {% endcomment %}
{% assign target = '0d1a1e37-e5f1-4a0f-9d0a-0d0e1a9d3b21?GroupId=' | Append:groupIdKey %}
{% httpresponse %}
    [[ header key:'HX-Redirect' ]]{{ target }}#roster[[ endheader ]]
{% endhttpresponse %}
```
- **It takes a page Guid, not a URL.** A value that does not parse as a Guid, or one naming a page the app has not cached, does nothing at all and reports nothing. Check the Guid first when a redirect looks like it was ignored.
- The query string arrives as page parameters, readable with `PageParameter`.
- To send someone to a web address instead, use `X-Helix-Command` with `OpenBrowser`.

### HX-Refresh

Reloads the current page, so every block on it re-renders.

```
{% httpresponse %}
    [[ header key:'HX-Refresh' ]]true[[ endheader ]]
{% endhttpresponse %}
```
- **Only the exact value `true` does anything**, case-insensitively. Any other value, including `1` or `yes`, is ignored and the response swaps normally.
- This is the blunt instrument. Prefer swapping the one region that changed, and reach for a refresh when a write invalidated more of the screen than you can reasonably target.
- It is one way to re-run an `Hx.Trigger="load"` fragment, since `load` never fires twice on the same element. For the specific case of refreshing when the person returns to a screen, `Hx.Trigger="appear"` is the lighter tool: it re-fetches one element instead of rebuilding the page. See [Triggers](https://community.rockrms.com/developer/mobile-docs/essentials/lava/helix-lava-applications/triggers).

### HX-Retarget

Aims this one response somewhere other than where the request said. The id resolves the same way `Hx.Target` does, and an id that does not resolve is an error.

The common use is the one the Note above describes: keep the 200, but send failure markup to an error slot instead of into the target the request originally named.

```
{% if isEmailTaken %}
    {% comment %} Land in the form's error slot rather than replacing the field. {% endcomment %}
    {% httpresponse %}
        [[ header key:'HX-Retarget' ]]formErrors[[ endheader ]]
    {% endhttpresponse %}
    <Rock:NotificationBox NotificationType="Error" Text="That email is already in use." />
{% else %}
    <Rock:FieldContainer>
        <Rock:TextBox Hx.Id="email" Label="Email" Text="{{ Form['email'] | Escape }}" />
    </Rock:FieldContainer>
{% endif %}
```

**A retargeted response always lands in the page**, even when the request declared `Hx.Target="coversheet"`. That is how you let a cover sheet action write back into the page-side flow instead of opening another sheet.

### HX-Reswap

Overrides the strategy. Reach for it when the response is a different *shape* than the request expected, most often an empty state coming back to a target that was set up to append.

```
{% if rows == empty %}
    {% comment %} Nothing to append, so replace the list with an empty state instead. {% endcomment %}
    {% httpresponse %}
        [[ header key:'HX-Reswap' ]]outer[[ endheader ]]
    {% endhttpresponse %}
    <Label Text="No more results." StyleClass="text-interface-medium" />
{% else %}
    <VerticalStackLayout>
        {% for row in rows %}
            <Label Text="{{ row.Name | Escape }}" />
        {% endfor %}
    </VerticalStackLayout>
{% endif %}
```

It accepts **both** vocabularies, so a shared endpoint can emit one value that works for the browser and the app:

| Mobile name | HTMX name |
| --- | --- |
| `inner` | `innerHTML` |
| `outer` | `outerHTML` |
| `append` | `beforeend` |
| `prepend` | `afterbegin` |
| `after` | `afterend` |
| `none` | `none` |
| `items-append`, `items-replace` | none, mobile only |

```
{% comment %} Understood by both clients, so no ClientType branch is needed. {% endcomment %}
{% httpresponse %}
    [[ header key:'HX-Reswap' ]]outerHTML[[ endheader ]]
{% endhttpresponse %}
```

The strategy you name still has to suit the target. `HX-Reswap` overrides your `Hx.Swap`, it does not exempt you from the target type rules in [Swaps and Animations](https://community.rockrms.com/developer/mobile-docs/essentials/lava/helix-lava-applications/swaps-and-animations), and an unknown strategy is an error.

`HX-Reswap` goes through the same parser `Hx.Swap` does, so it can carry the [animation modifiers](https://community.rockrms.com/developer/mobile-docs/essentials/lava/helix-lava-applications/swaps-and-animations) too. That lets an endpoint pick the motion to match the content it is returning:

```
{% comment %} An empty state replaces the list, and should fade rather than slide. {% endcomment %}
{% httpresponse %}
    [[ header key:'HX-Reswap' ]]outer animate:fade[[ endheader ]]
{% endhttpresponse %}
```

Because the header replaces the whole declaration, any modifiers the element declared are replaced along with the strategy. Repeat the ones you still want.

### X-Helix-Command

The mobile-only extension to the header channel. It runs one of the app's named client commands, the same way a Callback's command response does.

```
{% comment %} An object parameter, sent as JSON. {% endcomment %}
{% httpresponse %}
    [[ header key:'X-Helix-Command' ]]ShowToast[[ endheader ]]
    [[ header key:'X-Helix-Command-Parameter' ]]{"Message":"Saved."}[[ endheader ]]
{% endhttpresponse %}
```
```
{% comment %} No parameter needed. Swap in the saved state, then close the page behind you. {% endcomment %}
{% httpresponse %}
    [[ header key:'X-Helix-Command' ]]PopPage[[ endheader ]]
{% endhttpresponse %}
```
- Only the app's standard client commands are reachable. It cannot call arbitrary code.
- A parameter value starting with `{` or `[` is parsed as JSON. Anything else is passed as a string.
- The same command set (`PopPage`, `ShowToast`, `OpenBrowser`, and so on) is available in every block, so the command you name works no matter which block hosts the swap.
- **If you send both a body and a command, the swap happens first, then the command runs.** That ordering lets you update the UI and then pop the page.
- **A command name the app does not recognize does nothing, silently.** There is no error notification, so check the spelling first when a command appears not to fire.

### Unsupported headers

`HX-Location`, `HX-Push-Url`, `HX-Replace-Url`, and `HX-Trigger` do nothing. The app has no URL bar and no history stack, and client-side event triggering is not implemented.

## From a cover sheet

`HX-Redirect` and `HX-Refresh` act on the **presenting page**, and they do **not** dismiss the sheet. Refreshing the presenting page is the supported way for a sheet to update it, since a sheet cannot target ids on the page. See [Cover Sheets](https://community.rockrms.com/developer/mobile-docs/essentials/lava/helix-lava-applications/cover-sheets).

## Caching and rate limiting

**The app does not cache Helix responses.** Every request goes to the server, and response cache headers are ignored. Your endpoint's cache settings still apply to web clients.

The per-endpoint rate limit fields in the endpoint editor are **not currently enforced** on the execute route, so do not rely on them to protect an expensive endpoint. If the app does receive a 429, it shows it as an error and never retries automatically.
