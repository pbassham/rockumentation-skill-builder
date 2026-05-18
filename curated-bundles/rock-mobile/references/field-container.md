---
description: "Use when implementing form field containers with labels, borders, and required field indicators in Rock Mobile apps"
source: "https://community.rockrms.com/developer/mobile-docs"
sourceLabel: Mobile Docs
---
> **Path:** 

M v1.0

## Field Container

*Inherits from* [*Xamarin.Forms.Layout*](https://docs.microsoft.com/en-us/dotnet/api/xamarin.forms.layout-1)

You know those fancy input fields that have the nice labels, borders, required field markers, and all that? Well, the FieldContainer view handles all that fancy work for you.

A FieldContainer displays views that implement the IRockField interface. You can find all the views that implement this interface in the [Form Fields](https://community.rockrms.com/developer/mobile-docs/essentials/controls/form-fields) section of the documentation. All of these views implement the required properties to get the title of the field as well as know if the field should be considered required.

The fields can be displayed in one of two ways. Either as individual fields or as grouped fields. An example of the grouped fields would be the login block. The username and password fields are displayed in a single grouping that contains both fields. While a good example of individual fields would be the workflow entry block, each field is displayed one at a time.

Usually, you will want to display fields individually, unless you have full control over the titles. The reason for this is that the titles take up much more space in a Grouped layout vs an Individual layout. So if you are, for example, displaying attributes in a Grouped layout, some of those attributes might have names consisting of 10-15 words, which will just look really odd in the Grouped layout.

Finally, on the layout, some fields require an Individual layout. One example of this is the [Address](https://open.gitbook.com/~space/-LnfHr7q46y6lOQNgsA4/~gitbook/pdf?limit=300&back=false#pdf-page--M90iEvcSa5wJaUMZuX3) field. It actually displays its components in a grouped stack already, so trying to force that inside another Grouped layout will result in a visual headache.

### Properties

| Property | Type | Description |
| --- | --- | --- |
| Title | string | When in Grouped layout, this value provides the title that will be used above the entire group. If not set or set to an empty string, then no group title will be displayed. |
| FieldLayout | [FieldLayout](https://community.rockrms.com/developer/mobile-docs/essentials/controls/content-controls/field-container#field-layout) | The type of layout to use when rendering the fields. *Defaults to Automatic*. |

### Field Layout

| Value | Description |
| --- | --- |
| Automatic | The container will examine its own contents and determine the best layout to use. If only a single field has been provided or if any of the fields require Individual layout, then Individual layout will be used. Otherwise Grouped layout will be used. |
| Individual | Each field will be displayed with a title above and then the field itself will be displayed full-width below. |
| Grouped | A single group title will be displayed above all the fields, then each field will be displayed with a title on the left and the field on the right in a sort of grid. |

```
<Rock:FieldContainer Title="Your Name">
    <Rock:TextBox Label="First Name"
        IsRequired="True" />
    <Rock:TextBox Label="Last Name" />
</Rock:FieldContainer>
```

The above will render as a Grouped layout with a title for the entire group of `Your Name` and then will display the individual fields for `First Name` (which will be marked as required) and `Last Name` in a single group below.

```
<Rock:FieldContainer>
    <Rock:TextBox Label="Your Name"
        IsRequired="True" />
</Rock:FieldContainer>
```

The above will render an Individual field (since there is only one). It will display the label `Your Name` above and then have the text input box placed below it.

```
<Rock:FieldContainer FieldLayout="Individual">
    <Rock:TextBox Label="First Name" IsRequired="True" />
    <Rock:TextBox Label="Last Name" />
</Rock:FieldContainer>
```

The above is very similar to our first example. But because we are specifically requesting Individual layout, you will first get the `First Name` label with the related text input below it. Then slightly further down you will have the `Last Name` label with the related text input below it.

---

## Flip View {#flip-view}

M v2.0C v12.4

*Inherits from* [*Xamarin.Forms.ContentView*](https://docs.microsoft.com/en-us/dotnet/api/xamarin.forms.contentview)*.*

This is a simple view that allows you to have two views take up the same space on the page. You wire up whatever interaction you want to cause the view to flip from front to back and vice-versa. So you can wire it up to a tap on the view itself, or whatever else you want.

There are two ways to initiate a flip. You can bind the `IsFlipped` property to a boolean value that will cause the view to flip when the value changes. This is probably not a common situation for you. Instead there is a `FlipCommand` property that you can bind to an action to initiate the flip, as you will see in the example below.

## Properties

| Property | Type | Description |
| --- | --- | --- |
| FrontView | View | The view content to display on the front side. |
| BackView | View | The view content to display on the back side. |
| IsFlipped | boolean | If true then the back view will be displayed, otherwise the front view will be displayed. *Default is* *false**.* |
| IsHeightNormalized | boolean | If true then the flip view will always take the height of whichever view is taller and ensure it always takes up that much space. If false then when you flip views content below may shift up or down. *Default is* *true**.* |
| Duration | boolean | The time in milliseconds that the transition between views will take. *Default is* *400**.* |
| Orientation | [FlipOrientation](https://community.rockrms.com/developer/mobile-docs/essentials/controls/content-controls/flip-view#flip-orientation) | The orientation of the flip. *Default is* *Horizontal**.* |
| Easing | [Easing](https://docs.microsoft.com/en-us/dotnet/api/xamarin.forms.easing) | The type of animation easing function to use. *Default is* *Linear**.* |
| FlipCommand | ICommand | You can bind an action to this property to initiate a flip. |

### Flip Orientation

| Value | Description |
| --- | --- |
| Horizontal | The content is flipped horizontally. |
| Vertical | The content is flipped vertically. |

### Example

The `FlipCommand` is not a standard command, so as you can see we are actually using a named reference to the FlipView in our binding.

```
<Rock:FlipView x:Name="textCard">
    <Rock:FlipView.GestureRecognizers>
        <TapGestureRecognizer Command="{Binding FlipCommand, Source={x:Reference textCard}}" />
    </Rock:FlipView.GestureRecognizers>
    
    <Rock:FlipView.FrontView>
        <Label Text="Front Text" />
    </Rock:FlipView.FrontView>

    <Rock:FlipView.BackView>
        <Label Text="Back Text" />
    </Rock:FlipView.BackView>
</Rock:FlipView>
```
