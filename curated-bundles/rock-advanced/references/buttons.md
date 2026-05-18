---
description: "Use when styling buttons with different colors, sizes, and states in Rock UI components"
source: "https://community.rockrms.com/styling"
sourceLabel: Styling
---
> **Path:** Styling > Content > Buttons

## Styling Buttons

Use Rock’s button styles to elevate your UI in forms, dialogs, and more with support for multiple sizes, states, and more.

**Heads up**, the best way to create elements that function like buttons is to use `<a>` elements with the `btn` classes shown below. Using a button element can cause undesirable effects.

### Examples

Default [Primary](#) [Success](#) [Info](#) [Warning](#) [Danger](#) [Link](#)

```
<!-- Standard button -->
<a type="button" class="btn btn-default">Default</a>

<!-- Provides extra visual weight and identifies the primary action in a set of buttons -->
<a href="#" class="btn btn-primary">Primary</a>

<!-- Indicates a successful or positive action -->
<a href="#" class="btn btn-success">Success</a>

<!-- Contextual button for informational alert messages -->
<a href="#" class="btn btn-info">Info</a>

<!-- Indicates caution should be taken with this action -->
<a href="#" class="btn btn-warning">Warning</a>

<!-- Indicates a dangerous or potentially negative action -->
<a href="#" class="btn btn-danger">Danger</a>

<!-- Deemphasize a button by making it look like a link while maintaining button behavior -->
<a href="#" class="btn btn-link">Link</a>
```

### Sizes

Fancy larger or smaller buttons? Add .btn-lg, .btn-sm, or .btn-xs for additional sizes.

[Large button](#) [Large button](#)

[Default button](#) [Default button](#)

[Small button](#) [Small button](#)

[Extra small button](#) [Extra small button](#)

```
<p>
  <a href="#" class="btn btn-primary btn-lg">Large button</a>
  <a href="#" class="btn btn-default btn-lg">Large button</a>
</p>
<p>
  <a href="#" class="btn btn-primary">Default button</a>
  <a href="#" class="btn btn-default">Default button</a>
</p>
<p>
  <a href="#" class="btn btn-primary btn-sm">Small button</a>
  <a href="#" class="btn btn-default btn-sm">Small button</a>
</p>
<p>
  <a href="#" class="btn btn-primary btn-xs">Extra small button</a>
  <a href="#" class="btn btn-default btn-xs">Extra small button</a>
</p>
```

