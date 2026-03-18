> **Path:** Mobile Docs > 🎨 Styling > Style Guide > Forms

# Forms

## CSS X-Ray for Field Container

### Individual Layout

Below is the image of an x-ray for Field Container with a Individual Layout.

![](https://community.rockrms.com/GetImage.ashx?Id=71438)

### Grouped Layout

Below is the image of an X-Ray for Field Container with a Grouped Layout.

![](https://community.rockrms.com/GetImage.ashx?Id=71439)

### Unlabeled Field Container 

To styled the unlabeled field inside a field container you can target a Rock custom css properties \`-rock-placeholder-text-color\`

Example:

```css
^borderlessentry,
^datepicker,
^picker,
^entry,
^editor,
^personpicker {
 -rock-placeholder-text-color: red;   
}
```

![](https://community.rockrms.com/GetImage.ashx?Id=71442)
