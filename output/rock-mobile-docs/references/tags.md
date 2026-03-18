> **Path:** Mobile Docs > 🎨 Styling > Legacy > Styling Components > Tags

# Tags

Tags are amazing as they come, but you can style them with just a bit of CSS.

## Tag Selectors

Tags can be selected in CSS using the `.tag` class. There are several additional hooks available to limit your selections.

| Selector | Description |
| --- | --- |
| .tag-sm | Selects only small tags. |
| .tag-md | Selects the default sized tags. |
| .tag-lg | Selects only large tags. |
| .tag-\[type\] | Selects tags by their type. Options include:  
.tag-primary  
.tag-secondary  
.tag-success  
.tag-info  
.tag-warning  
.tag-danger |

## Example

```
.tag.tag-sm.tag-info {
    /* would select small tags of type info */
}
```

## Styling the Tag's Text

To style the text of the tag use the `.tag-text` child selector.

```
.tag .tag-text {
    color: #ee7625;
}
```
