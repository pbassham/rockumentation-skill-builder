---
description: Use when presenting detail views as sliding cover sheets over the current screen instead of replacing content in place
source: "https://community.rockrms.com/developer/mobile-docs"
sourceLabel: Mobile Docs
---
> **Path:** 

Sometimes you do not want to swap content into the current screen; you want to slide up a detail view over it. `Hx.Target="coversheet"` presents the response fragment in a cover sheet instead of swapping it in place.

```
<Button Text="Get Person Information"
        Hx.Get="^/group-toolbox/person-details"
        Hx.Target="coversheet" />
```

`coversheet` is a reserved target name, alongside `this`. Both are case-insensitive.

## Sheet scope

This is the part to plan around. The sheet is not part of the page it covers, which means:

- **Ids are scoped to the sheet.** Requests inside the sheet target ids inside the sheet. A sheet **cannot** target the presenting page, and the page cannot target into the sheet.
- **Dismissing the sheet cancels its in-flight requests.**
- **The opener's application carries over**, so short `^/endpoint-slug` routes keep working inside the sheet.
- **A request with no `Hx.Target` swaps into the element that made it**, as it does on a page. To refill the whole sheet, give the fragment's root an `Hx.Id` and target that. Errors render inside the sheet either way.

To update the presenting page from inside a sheet, use `HX-Refresh` or an `X-Helix-Command` header. See [Endpoint Responses](https://community.rockrms.com/developer/mobile-docs/essentials/lava/helix-lava-applications/endpoint-responses).

## Sheet options

**The fragment configures the sheet**, not the button that opens it. Set these on the root element of what your endpoint returns:

| Property | Type | Description | Inherits |
| --- | --- | --- | --- |
| `Hx.PageTitle` | string | Sets the title of whatever is presenting the fragment. | No. Read only from a response fragment's root element. |
| `Hx.SheetNavigationBar` | bool | Whether a cover sheet draws its navigation bar. Default `True`. | No. Read only from a response fragment's root element. |
| `Hx.SheetPresentation` | string | How a cover sheet is presented: `FormSheet` (default), `PageSheet`, `FullScreen`, or `OverFullScreen`. | No. Read only from a response fragment's root element. |

```
<!-- Returned by your endpoint. -->
<VerticalStackLayout Hx.PageTitle="Group Details">
    <Label Text="..." />
</VerticalStackLayout>
```

For a `coversheet` target this sets the sheet title. For a normal swap it sets the page title.

`Hx.SheetNavigationBar` and `Hx.SheetPresentation` only matter when the fragment is presented with `Hx.Target="coversheet"`. On a normal swap they do nothing.

Note

Putting `Hx.PageTitle` on the *initiating* element does nothing at all, silently. That is a decision, not an oversight: keeping the title server-controlled is better than a pile of `Hx.CoverSheet.*` properties on every button that opens a sheet. Put it on what you return.

### Hiding the navigation bar

A sheet with no navigation bar also has no title and no close button. The fragment owns all of it:

```
<!-- Returned by your endpoint. -->
<Grid Hx.SheetNavigationBar="False"
      Hx.SheetPresentation="PageSheet"
      RowDefinitions="Auto,*"
      StyleClass="p-16">
    <Grid ColumnDefinitions="*,Auto" Margin="0,16,0,12">
        <Label Text="Group Details" StyleClass="title2,bold" />
        <Button Grid.Column="1"
                Text="Close"
                StyleClass="btn,btn-link"
                Command="{Binding CloseCoverSheet}" />
    </Grid>
    <Label Grid.Row="1" Text="..." />
</Grid>
```

Note

Without the bar, the fragment starts directly under the status bar, so give it its own top spacing. `FormSheet` and `PageSheet` can still be swiped down to close. `FullScreen` and `OverFullScreen` cannot, so a fragment that hides the bar in those styles **must** include a `{Binding CloseCoverSheet}` button, or the person has no way out.

## Sheet behavior

- **One sheet at a time.** Presenting while a sheet is already open **drops the response** rather than queueing it or stacking a second sheet.
- **Retitling an open sheet does not repaint the title bar** before iOS 26. The sheet reads its title when it is presented, so a later swap that changes `Hx.PageTitle` updates nothing visible.
- **Sheet chrome is fixed once the sheet is open.** `Hx.SheetNavigationBar` and `Hx.SheetPresentation` are read when the sheet is presented, so changing them in a later swap inside the sheet does nothing.
- **`HX-Refresh` from inside a sheet reloads the presenting page but leaves the sheet open.**

The general cover sheet guidance still applies: use them for secondary detail, and keep to one at a time.
