---
description: "Use when implementing or styling Rock badges including standard, icon, fraction, overlay, and label badge types in Rock V14+"
source: "https://community.rockrms.com/styling"
sourceLabel: Styling
---
> **Path:** Styling > Components > Rock Badges

## Styling Badges

Use Rock’s built-in badge styles to simplify the creation of custom Rock badges starting in V14.

When using our recommended markup, Rock Badges will automatically scale wherever they are placed within the Rock interface.

**Note:** Examples on this page will not work correctly on Rock versions prior to V14.

##### Enabling Legacy Badge Markup

If custom badges that are not rendering correctly in Rock V14 add the following snippet to the top of the Rock theme CSS Overrides section. This can be found by selecting the "Rock" theme in `CMS Configuration` \> `Themes`. Migrating to the new V14 markup as soon as possible is recommended.

```
@enable-legacy-badges: true;
```

##### Rockbadge Standard

![](https://community.rockrms.com/Content/community/styling/rockbadge-standard.png)

```
<div class="rockbadge rockbadge-standard">
    <span class="metric-value">9</span>
    <span class="metric-unit">yr</span>
</div>

<div class="rockbadge rockbadge-standard">
    <span class="metric-value">eRA</span>
</div>
```

##### Rockbadge Icon

![](https://community.rockrms.com/Content/community/styling/rockbadge-icon.png)

```
<div class="rockbadge rockbadge-icon">
    <i class="badge-icon fa fa-tint"></i>
</div>

<div class="rockbadge rockbadge-icon rockbadge-circle">
    <i class="badge-icon fa fa-tint"></i>
</div>

<div class="rockbadge rockbadge-icon rockbadge-disabled">
    <i class="badge-icon fa fa-tint"></i>
</div>

<div class="rockbadge rockbadge-icon rockbadge-disabled rockbadge-slash">
    <i class="badge-icon fa fa-tint"></i>
</div>

<div class="rockbadge rockbadge-icon rockbadge-slash">
    <i class="badge-icon fa fa-tint"></i>
</div>

<div class="rockbadge rockbadge-icon rockbadge-icon-nobg">
    <i class="badge-icon fa fa-tint"></i>
</div>
```

##### Rockbadge Fraction

![](https://community.rockrms.com/Content/community/styling/rockbadge-fraction.png)

```
<div class="rockbadge rockbadge-fraction">
    <span class="metric-value">0</span>
    <span class="metric-unit">/16</span>
</div>
```

##### Rockbadge Overlay

![](https://community.rockrms.com/Content/community/styling/rockbadge-overlay.png)

```
<div class="rockbadge rockbadge-overlay">
    <i class="badge-icon fa fa-chalkboard"></i>
    <span class="metric-value">13</span>
</div>
```

##### Rockbadge Label

![](https://community.rockrms.com/Content/community/styling/rockbadge-label.png)

```
<div class="rockbadge rockbadge-label">
    <span class="label label-info">General Group</span>
</div>
```

---

### Tooltips

Rockbadges support HTML tooltips using the following markup. Details are provided below.

![](https://community.rockrms.com/Content/community/styling/rockbadge-tooltip.png)

```
<div class="rockbadge" data-toggle="tooltip" data-html="true" data-title="No baptism date entered for Ted Decker.">
    ...
</div>
```
**Options**
- `data-toggle="tooltip"` (required) - Required to activate tooltips
- `data-title` (required) - The contents of the tooltip
- `data-html` - Set the value to `data-html="true"` to allow HTML to be displayed inside a tooltip. (Starting in v14.2 this is the default behavior)
- `data-placement` - How to position the tooltip - top | bottom | left | right | auto. "auto" is the default orientation, and it will dynamically reorient the tooltip based on the space available. For example, if placement is "auto left", the tooltip will display to the left when possible, otherwise it will display right.

