---
description: "Use when building long scrollable lists or feeds that need pagination, search filtering, and item virtualization without writing custom code"
source: "https://community.rockrms.com/developer/mobile-docs"
sourceLabel: Mobile Docs
---
> **Path:** 

Most Helix swaps place a XAML fragment into the page. The two **items** strategies do something different: the endpoint returns a JSON array, and the app feeds it to a native list as that list's items. The list keeps its own item template, scrolls with full virtualization, and asks for the next page on its own as the person nears the end.

This is how you build a long roster, a search screen, or any feed that is too big to render all at once, without writing a custom block.

## When to use it

`append` and a Load More button, described in [Swaps and Animations](https://community.rockrms.com/developer/mobile-docs/essentials/lava/helix-lava-applications/swaps-and-animations), work well for short lists. Every row becomes a real control inside a layout, nothing is recycled, and each batch nests one layout deeper than the last. That is fine for a few dozen rows and gets heavier from there.

Reach for an items swap when:

- The list is long or has no fixed end, such as a group roster, a directory, or a content feed.
- The person should be able to search or filter it while they type.
- You want paging to follow the scroll, with no Load More button to tap.
- Every row has the same shape, so one item template can draw all of them.

Stay with XAML fragments when the rows differ in structure from one to the next, or when the list is short enough that recycling buys you nothing.

## The items strategies

| Strategy | What it does | The target must be |
| --- | --- | --- |
| `items-append` | Parses the body as a JSON array and adds its items to the end of the list's items. | a `CollectionView`, `CarouselView`, or `Rock:ItemsCollection` |
| `items-replace` | Parses the body as a JSON array and replaces the list's items with it, scrolling back to the top. | a `CollectionView`, `CarouselView`, or `Rock:ItemsCollection` |

Both are set with `Hx.Swap`, like any other strategy, and both are mobile only. HTMX has no data swap to alias, so a shared endpoint should only send them to the app.

- **Animation modifiers are ignored.** The list animates its own inserts, so `items-append animate:fade` parses but behaves exactly like `items-append`.
- **The app owns the list's items once an items swap has run.** Do not also set `ItemsSource`. If the list already has one, the first response replaces it.
- **`HX-Reswap` and `HX-Retarget` can move a response into or out of an items strategy.** The target rules are checked again against what the response will actually do. See [Endpoint Responses](https://community.rockrms.com/developer/mobile-docs/essentials/lava/helix-lava-applications/endpoint-responses).

### Target types

| Target | Default paging threshold | Notes |
| --- | --- | --- |
| `CollectionView` | 5 items from the end | The common case. Holds back its `EmptyView` until the first response arrives. |
| `CarouselView` | 2 items from the end | Does not page when `Loop` is on, since a looping carousel never reaches an end. |
| `Rock:ItemsCollection` | 5 items from the end, not adjustable | Has no `RemainingItemsThreshold` property. If you have already given it an `InfiniteListLoader`, the app leaves yours alone and does not wire paging. |

Anything else is an error. A `VerticalStackLayout`, a layout using `BindableLayout`, and `Rock:ItemsView` are not list targets, even though they can show a list. The error names the type it found: *The "items-append" swap needs a CollectionView, CarouselView or ItemsCollection target, not a VerticalStackLayout.* An items swap also cannot target `coversheet`.

### Self-loading lists

A list that fires its own request, with no `Hx.Target` on it or any ancestor, targets itself. That is the usual setup: the list loads on `load` and fills itself.

`Hx.Target` inherits, though. If a container above the list declares a target for its buttons, the list inherits that too, and its JSON heads for the wrong element and fails the target check. Writing `Hx.Target="this"` on the list makes it immune to whatever its ancestors declare. See [Inheritance](https://community.rockrms.com/developer/mobile-docs/essentials/lava/helix-lava-applications/inheritance).

## Response format

Your endpoint's Code Template emits a JSON array of objects, one per row. Each object's keys are what the item template binds to.

- **An empty body counts as an empty array.** On `items-replace` it clears the list, which is the natural "no results" response. On `items-append` it adds nothing.
- **A body that is not valid JSON is an error**, reported as *The items response is not valid JSON.* followed by the parser's message. A Lava error rendered into the output is the usual cause.
- **Valid JSON that is not an array is an error**, reported as *The items response must be a JSON array.* Wrap a single object in brackets.

Note

The app decides to read JSON from the swap strategy, not from the endpoint's Content Type. Setting the endpoint's Content Type to `application/json` is still good practice, because a web caller of the same endpoint does read it.

### How values convert

Items convert exactly the way `{Rock:FromJson}` converts JSON, so anything you already know about binding to `FromJson` data applies here.

| JSON value | Becomes | Notes |
| --- | --- | --- |
| object | a dictionary model | Each key is bindable. Nested objects become dictionary models too. |
| array | a list | Bind it to a `BindableLayout` inside the row. |
| string | a string | A string in ISO 8601 date format is read as a date, so `StringFormat` date patterns work on it. |
| whole number | a 64-bit integer |  |
| decimal number | a double |  |
| `true` / `false` | a boolean | Binds straight to `IsVisible` or `IsChecked`. |
| `null` | null | Use `TargetNullValue` to show a fallback. |

## Item templates

The item template lives on the list in your page XAML, not in the response. Each item's binding context is one object from the array, so you bind to its keys.

```
<CollectionView Hx.Id="members"
                Hx.Get="^/group-toolbox/members?groupId=GRxxxx"
                Hx.Trigger="load"
                Hx.Target="this"
                Hx.Swap="items-replace">
    <CollectionView.ItemTemplate>
        <DataTemplate>
            <VerticalStackLayout Padding="16,12">
                <Label Text="{Binding [Name]}" />
                <Label Text="{Binding [JoinedDate], StringFormat='Joined {0:MMM d, yyyy}'}" />
                <Label Text="Leader" IsVisible="{Binding [IsLeader]}" />
            </VerticalStackLayout>
        </DataTemplate>
    </CollectionView.ItemTemplate>
</CollectionView>
```

**Use the indexer form, `{Binding [Key]}`.** It reads the key straight from the item, it is the form tested with items swaps, and it is the only form that works for a key containing a space or a dash.

The property form, `{Binding Key}`, resolves through the same model and also works for simple keys. Pick one and use it consistently in a template.

Note

Keys are case-sensitive. `{Binding [name]}` does not find `"Name"`. Emit every key the template binds on every item, sending `null` for a missing value rather than leaving the key out.

## Paging with X-Helix-Next

Paging is driven by one response header. When the endpoint has more rows, it names the route for the next page, and the app requests it as the list scrolls near its end.

| Header | What it does |
| --- | --- |
| `X-Helix-Next` | **Mobile only.** The route for the next page, as a `^/` route or an absolute `/api/...` path. Leave it out on the last page. |

Set it with the same `httpresponse` Lava command you use for every other header:

```
{% httpresponse %}
    [[ header key:'X-Helix-Next' ]]^/group-toolbox/members?groupId=GRxxxx&page=2[[ endheader ]]
{% endhttpresponse %}
```

What happens from there:

1. The app remembers the route from the last response it applied to that list.
2. When the list scrolls within its threshold of the end, the app sends a GET to that route and appends the result, whatever `Hx.Swap` the list declares.
3. Each page's response replaces the remembered route. A response with no `X-Helix-Next` means there are no more pages, and scrolling stops asking.
4. Only one page request runs per list at a time. Scroll events that arrive while a page is loading are dropped, so the same page is never fetched twice.

### Detecting the last page

Your endpoint needs to know whether another page exists before it decides to send the header. The cheap way is to ask the database for one more row than the page size:

- Query `pageSize + 1` rows, starting at `(page - 1) * pageSize`.
- Emit only the first `pageSize` of them.
- Send `X-Helix-Next` only when the extra row came back.

That avoids a separate count query, and it never sends a route that leads to an empty page. If an empty page does come back anyway, that is harmless: it appends nothing, and with no header on it, paging stops.

### Next-page routes

**A page request sends only what its route carries.** It does not gather values from the page, and it does not run `Hx.Confirm`, `Hx.Prompt`, or `Hx.Validator`. So if page 1 was a search for "smi", the route for page 2 has to say so:

```
{% capture nextRoute %}^/group-toolbox/members?groupId={{ groupIdKey | EscapeDataString }}&q={{ search | EscapeDataString }}&page={{ page | Plus:1 }}{% endcapture %}
```

Escape every value you put in the route with `EscapeDataString`. The app decodes the query string before sending it, so an unescaped `&` or `=` in a search term splits it into the wrong parameters.

The short `^/endpoint-slug` form works in the header when the list sits inside a Lava Application Content block with an Application set. The long form works everywhere, so it is the safer choice for an endpoint that more than one page uses.

### Tuning the threshold

| Property | Type | Description | Inherits |
| --- | --- | --- | --- |
| `RemainingItemsThreshold` | int | How many items from the end the list asks for the next page. When you leave it unset, the app uses 5 on a `CollectionView` and 2 on a `CarouselView`. | No. A standard MAUI property on the list. |

MAUI's own default of `-1` never asks for more, which is why the app fills it in. A larger value starts the next request earlier, so it lands before the person reaches the end. Around half a page is a good starting point, for example `RemainingItemsThreshold="10"` with a page size of 20.

Make the page size large enough to more than fill the screen. Paging follows the scroll, so a first page that does not fill the list gives the person nothing to scroll toward the next one.

## Search and filter

Point a search field at the list with `items-replace`, and each search swaps in a fresh first page:

```
<SearchBar Hx.Id="q"
           Placeholder="Search members"
           Hx.Get="^/group-toolbox/members?groupId=GRxxxx"
           Hx.Target="members"
           Hx.Swap="items-replace"
           Hx.Trigger="TextChanged changed delay:400ms" />
```

The field's value is included automatically under its `Hx.Id`, so the endpoint reads it as `QueryString.q`. `changed` skips events where the text did not really change, and `delay:400ms` waits for a pause in typing before sending. See [Triggers](https://community.rockrms.com/developer/mobile-docs/essentials/lava/helix-lava-applications/triggers) and [Forms and Values](https://community.rockrms.com/developer/mobile-docs/essentials/lava/helix-lava-applications/forms-and-values).

What `items-replace` takes care of for you:

- **A newer search supersedes an older one.** Other Helix requests are dropped while one is in flight from the same element. An `items-replace` request instead cancels the one already running from that field and takes its place, so the last thing typed is always what gets searched.
- **Stale responses are thrown away.** Once an `items-replace` starts against a list, any earlier request for that list that is still on its way, including a page fetch, is discarded when it arrives. Results for "sm" never land on top of results for "smi".
- **Paging restarts.** The new response's `X-Helix-Next` becomes the list's next route, so scrolling pages through the new results.
- **The field stays usable.** Unlike other requests, an items request does not disable the element that fired it, so the search field keeps focus and its keyboard while results load.

A list whose own request can fire more than once, for example with `Hx.Trigger="appear"` to refresh when the person returns, should declare `items-replace` too. With `items-append`, each repeat adds a second copy of page 1 below the first.

## Empty view

A `CollectionView` shows its `EmptyView` whenever it has no items, which would include the moment before the first response arrives. The app holds the `EmptyView` back while the first request for a list is in flight, so the person does not see "No results" flash up before the results do.

- It comes back as soon as items are applied. If the first response is an empty array, the `EmptyView` shows, which is what you want.
- It also comes back if the first request fails, so a list that never loaded does not sit blank.
- After that, it behaves as it normally does. A later search keeps showing the previous results until the new ones replace them, then shows the `EmptyView` if there are none.
- `Rock:ItemsCollection` has no `EmptyView`, so none of this applies to it.

## Indicators

**Put `Hx.Indicator` on the list to cover page fetches.** A page request is fired by the list itself, so the list is its initiator and its `Hx.Indicator` is the one shown. Put one on the search field to cover searches. Both can point at the same element. See [Indicators and Errors](https://community.rockrms.com/developer/mobile-docs/essentials/lava/helix-lava-applications/indicators-and-errors).

```
<Grid RowDefinitions="*">
    <CollectionView Hx.Id="members"
                    Hx.Indicator="membersLoading"
                    ... />
    <ActivityIndicator Hx.Id="membersLoading"
                       IsRunning="True"
                       Opacity="0"
                       InputTransparent="True"
                       VerticalOptions="End"
                       HorizontalOptions="Center"
                       Margin="0,0,0,24" />
</Grid>
```

An indicator overlaid on the list, resting at `Opacity="0"`, works well. The app raises it to full opacity during a request and restores the resting value after.

Avoid using a spinner inside the list's `Footer` as the indicator. An id is only usable while its element is on screen, and the list creates and removes its footer as it scrolls, so the indicator is not reliably there to show.

## Errors

A list cannot hold an error notification among its items, so an error never goes into an items target. It goes to the first of these that applies:

1. **The `Hx.Notification` slot**, when one is declared and resolves.
2. **Beside the initiator**, otherwise. For a search that is the search field. For a page fetch it is the list itself.

A failed page leaves every item already loaded in place, and the next route stays as it was, so scrolling again retries that page.

**Declare an `Hx.Notification` slot on anything with a list in it.** A list usually fills a `Grid` row, and an error placed beside an element that sits directly in a `Grid` overlaps the first cell. Declaring the slot on the container covers the search field and the list at once, because it inherits.

## Worked example

A leader opens a group and sees its active members, can search by name, and scrolls through the whole roster 20 at a time. The page hosts a Lava Application Content block whose Application is the *Group Toolbox* application (slug `group-toolbox`), and the page is opened with a `GroupId` page parameter carrying the group's IdKey.

**The block's Initial Template**

```
{% assign groupIdKey = PageParameter.GroupId | EscapeDataString %}
<Grid RowDefinitions="Auto,Auto,*"
      Hx.Notification="rosterErrors">

    <SearchBar Grid.Row="0"
               Hx.Id="q"
               Placeholder="Search members"
               Hx.Get="^/group-toolbox/members?groupId={{ groupIdKey }}"
               Hx.Target="members"
               Hx.Swap="items-replace"
               Hx.Trigger="TextChanged changed delay:400ms"
               Hx.Indicator="rosterLoading" />

    <ContentView Grid.Row="1"
                 Hx.Id="rosterErrors" />

    <CollectionView Grid.Row="2"
                    Hx.Id="members"
                    Hx.Get="^/group-toolbox/members?groupId={{ groupIdKey }}"
                    Hx.Trigger="load"
                    Hx.Target="this"
                    Hx.Swap="items-replace"
                    Hx.Indicator="rosterLoading"
                    RemainingItemsThreshold="10">
        <CollectionView.ItemTemplate>
            <DataTemplate>
                <VerticalStackLayout Padding="16,12">
                    <Label Text="{Binding [Name]}"
                           StyleClass="body, text-interface-strongest" />
                    <Label Text="{Binding [Role]}"
                           StyleClass="footnote, text-interface-medium" />
                </VerticalStackLayout>
            </DataTemplate>
        </CollectionView.ItemTemplate>
        <CollectionView.EmptyView>
            <Label Text="No members match your search."
                   StyleClass="body, text-interface-medium"
                   HorizontalTextAlignment="Center"
                   Margin="16,32" />
        </CollectionView.EmptyView>
    </CollectionView>

    <ActivityIndicator Grid.Row="2"
                       Hx.Id="rosterLoading"
                       IsRunning="True"
                       Opacity="0"
                       InputTransparent="True"
                       VerticalOptions="End"
                       HorizontalOptions="Center"
                       Margin="0,0,0,24" />
</Grid>
```

**The `members` endpoint's Code Template**

```
{% assign groupIdKey = QueryString.groupId %}
{% assign groupId = groupIdKey | FromIdHash | Default:0 %}
{% assign search = QueryString.q | Default:'' %}
{% assign page = QueryString.page | AsInteger | Default:1 %}
{% assign pageSize = 20 %}
{% assign skip = page | Minus:1 | Times:pageSize %}
{% assign take = pageSize | Plus:1 %}

{% sql groupid:'{{ groupId }}' personid:'{{ CurrentPerson.Id | Default:0 }}' search:'{{ search }}' skip:'{{ skip }}' take:'{{ take }}' %}
    DECLARE @term nvarchar(100) = LTRIM( RTRIM( @search ) );

    SELECT p.[NickName] + ' ' + p.[LastName] AS [Name], r.[Name] AS [Role]
    FROM [GroupMember] gm
    INNER JOIN [Person] p ON p.[Id] = gm.[PersonId]
    INNER JOIN [GroupTypeRole] r ON r.[Id] = gm.[GroupRoleId]
    WHERE gm.[GroupId] = @groupid
        AND gm.[IsArchived] = 0
        AND gm.[GroupMemberStatus] = 1
        AND EXISTS (
            SELECT 1
            FROM [GroupMember] leader
            INNER JOIN [GroupTypeRole] lr ON lr.[Id] = leader.[GroupRoleId]
            WHERE leader.[GroupId] = @groupid
                AND leader.[PersonId] = @personid
                AND leader.[IsArchived] = 0
                AND lr.[IsLeader] = 1 )
        AND ( @term = '' OR p.[NickName] LIKE @term + '%' OR p.[LastName] LIKE @term + '%' )
    ORDER BY p.[LastName], p.[NickName], gm.[Id]
    OFFSET CAST( @skip AS int ) ROWS FETCH NEXT CAST( @take AS int ) ROWS ONLY;
{% endsql %}

{% assign rowCount = results | Size %}
{% if rowCount > pageSize %}
    {% capture nextRoute %}^/group-toolbox/members?groupId={{ groupIdKey | EscapeDataString }}&q={{ search | EscapeDataString }}&page={{ page | Plus:1 }}{% endcapture %}
    {% httpresponse %}
        [[ header key:'X-Helix-Next' ]]{{ nextRoute }}[[ endheader ]]
    {% endhttpresponse %}
{% endif %}
[
{% for row in results limit:pageSize %}
    {
        "Name": {{ row.Name | ToJSON }},
        "Role": {{ row.Role | ToJSON }}
    }{% unless forloop.last %},{% endunless %}
{% endfor %}
]
```

**Endpoint settings:** slug `members`, HTTP method GET, Content Type `application/json`, and **Sql** in Enabled Lava Commands. Grant Execute to the people who should be able to call it, and see [Security](https://community.rockrms.com/developer/mobile-docs/essentials/lava/helix-lava-applications/security) before you do.

How the pieces fit:

1. The list loads itself on `load` and gets page 1. Because the query asked for 21 rows and got them, the response carries `X-Helix-Next` for page 2.
2. As the person scrolls within 10 rows of the end, the app requests page 2 and appends it. That repeats until a page comes back with 20 rows or fewer and no header.
3. Typing in the search field sends `q` with an `items-replace`. The list jumps back to the top with the first page of matches, and the next route now carries `q`, so paging continues through the matches only.
4. Values reach the SQL as parameters, not pasted into the statement, so a name like O'Brien is searched safely.
5. The `EXISTS` clause only returns rows when the current person leads the group. Anyone else gets an empty list and the empty view. To show them an error instead, return a 403 with a plain text message, and it appears in the `rosterErrors` slot.

## Limitations

- **There is no built-in "loading more" row.** The app does not add a spinner to the end of the list while a page loads. Use `Hx.Indicator` as shown above.
- **Reaching the end while a page is loading waits for the next scroll.** The request that was already running is the only one, and the app does not ask again on its own when it lands. In practice the new rows give the person something to scroll into, which asks for the page after.
- **Rows cannot be updated one at a time.** There is no way to change, insert, or remove a single item from a response. Re-run the list's request with `items-replace` after a change.
- **Grouped lists are not supported.** The response is a flat array and the list is not grouped, even if you set `IsGrouped`.
- **The template is fixed by the page.** The endpoint sends data, not XAML, so every row uses the item template the page declared.

For more patterns, see [Tips and Tricks](https://community.rockrms.com/developer/mobile-docs/essentials/lava/helix-lava-applications/tips-and-tricks) and [Limitations](https://community.rockrms.com/developer/mobile-docs/essentials/lava/helix-lava-applications/limitations).
