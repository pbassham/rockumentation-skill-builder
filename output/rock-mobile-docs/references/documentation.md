> **Path:** Mobile Docs > 🧱 Essentials > Codex > Documentation

# Documentation

When updating the demo app there are CSS styles and snippets that can help you out. Below are some examples.

To add a code snippet in the demo app use:

```
<Label StyleClass="code">
    {{ '<Rock:Image Source="https://yourserver.com/photo.jpg" />' | XamlWrap }}
</Label>
```

Result:

![](https://community.rockrms.com/GetImage.ashx?Id=66935)

Note the `code` CSS class handles the styling. For code snippets that are more than one line you'll need to use a Lava capture.

```
<Label StyleClass="code">
        {% capture source %}<Button Text="Action Name" 
        StyleClass="btn, btn-primary-outline"  />{% endcapture %}{{ source | XamlWrap }}</Label>
```
