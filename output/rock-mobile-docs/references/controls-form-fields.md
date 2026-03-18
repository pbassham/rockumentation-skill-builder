> **Path:** Mobile Docs > 🧱 Essentials > Controls > Form Fields

# Form Fields

*Rock Mobile supports several custom form fields. This page contains information on using form fields and covers each of the various field types.*

### Using Form Fields

Before we go through the various fields available, let's take a look at how they look with their different embed options.

The first way to display one of these fields is just by itself without a container view.

```
<Rock:TextBox Label="Name" Placeholder="Your Name" />
```

![](https://community.rockrms.com/GetImage.ashx?Id=67188)

The `<Rock:FormField>` view provides a way to show the label. It also handles showing a required indicator. This will be covered in more detail when reading up on that view itself.

```
<Rock:FieldContainer>
        <Rock:TextBox Label="Name" Placeholder="Your Name" />
</Rock:FieldContainer>
```

![](https://community.rockrms.com/GetImage.ashx?Id=67189)

Now we're talking. The `<Rock:FormGroup>` adds a border as well as some other sugar to your layout. Again, you can get all the details by reading up on the `FormGroup` view. However, note that in this sample we removed the `Label` from the `TextBox` and moved it to the `Title` property of the `FormGroup`. When displaying a single field this works well.

This will be the format the screenshots for each individual field will be shown in as it provides a good way to see the entire view and what it will look like.
