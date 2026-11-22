---
description: "Use when user needs to update a person's profile photo in Rock mobile app, including camera capture or photo library upload"
source: "https://community.rockrms.com/developer/mobile-docs"
sourceLabel: Mobile Docs
---
> **Path:** 

Mobile5.0

This command is used to update the profile photo of either the `CurrentPerson`, or if a `PersonGuid` is supplied as the parameter, it will update theirs. Options are shown with the [ShowActionPanel](https://community.rockrms.com/developer/mobile-docs/commands/showactionpanel) command, including uploading an existing photo or capturing a new one.

Important

Mobile20.0  
Use this command for any person photo upload. It is what notifies the rest of the app, so every `Avatar` showing that person refreshes on its own. Uploading through a different path saves the photo but leaves those avatars showing the old picture, with no error to indicate why. This command works on Person records only.  

Warning

This command requires Edit permissions on the following API endpoint:  
POST api/People/UpdatePersonProfilePhoto?personGuid={personGuid}&filename={filename}  
  
Starting with Core v16, the role of 'RSR - Mobile Application Users' should be given permission. Previous versions should remain using the role of 'All Authenticated Users'. Without it, people see "There was an error updating the profile picture."  
  
The app also needs camera and photo library access on the device.

```
<Button Text="Update Photo"
    Command="{Binding UpdatePersonProfilePhoto}"
    CommandParameter="8fedc6ee-8630-41ed-9fc5-c7157fd1eaa4" />
```

![](https://community.rockrms.com/GetImage.ashx?Id=78179)

The action panel options shown with this command

There are some additional command parameters that can be used for extended functionality. These are `UpdatePersonProfilePhotoCommandParameters`.

## Properties

| Property | Type | Description |
| --- | --- | --- |
| PersonGuid | Guid | The Guid of the Person to update the profile photo for. |
| Image | Image | An `Image` control to update the source of immediately when the new photo is uploaded. Not required for `Rock:Avatar`, which refreshes itself. Useful for giving the block that owns the upload instant feedback, or for updating a plain `Rock:Image`. |

Here's an example for using the Image property:

```
<Rock:Image Source="image.png"
    x:Name="PersonImage" />

<Button Text="Update Photo"
    Command="{Binding UpdatePersonProfilePhoto}">
    <Button.CommandParameter>
        <Rock:UpdatePersonProfilePhotoCommandParameters Image="{x:Reference Name=PersonImage}" />
    </Button.CommandParameter>
</Button>
```

---

## WriteInteraction {#writeinteraction}

Mobile2.0

Allows you to write an Interaction to Rock when the command is executed. For example, you could write an interaction in response to the user tapping a button. By default, only a single Interaction will be written no matter how many times the command is executed. Normally this is probably what you want. If for some reason you want to allow multiple Interactions to be generated, set the `IsMultipleAllowed` property to *true*.

This command takes a parameter object of type `[InteractionParameters](https://community.rockrms.com/developer/mobile-docs/essentials/controls/developer-controls/parameter)` that contains the following details.

Note

This command doesn't need any REST permission. Interactions from people who aren't logged in are recorded without a person.

## Properties

In order for your parameters to be considered valid, you must provide at least one of `ChannelId` or `ChannelGuid`; and you must provide at least one of `ComponentId` or `ComponentName`. Also, note that some event sources will provide defaults for some of the properties in the table below or may even override a value you provide.

| Property | Type | Description |
| --- | --- | --- |
| ChannelId | int? | The identifier of the channel where this interaction will be recorded. Must already exist. *Defaults to* *null**.* |
| ChannelGuid | Guid? | The unique identifier of the channel where this interaction will be recorded. Must already exist. *Defaults to* *null**.* |
| ComponentId | int? | Specifies a specific component identifier where this interaction will be recorded. If used, the component must already exist. *Defaults to* *null*. |
| ComponentName | string | Specifies a component name for where this interaction will be recorded. If you use this property to pick the component then the system will look for a matching component and if not found create one. *Defaults to* *null**.* |
| ComponentEntityId | int? | If the channel is configured to have an Entity associated with the components then this would provide the Id of the Entity if it gets created from the ComponentName property. *Defaults to* *null**.* |
| Data | string | Custom data that should be stored with the interaction. There is no specific format requirements, as long as the data is a string. *Defaults to* *null**.* |
| EntityId | int? | Associates the interaction with the specified entity. The entity type will be taken from the channel configuration. *Defaults to* *null*. |
| Operation | string | The type of operation that identifies this interaction. There is no specific list of strings that you must use, but a few suggestions are View and Watch. *Defaults to* *null**.* |
| Summary | string | The text that describes this event in a user friendly manner. *Defaults to* *null**.* |
| RelatedEntityTypeId | int? | Sets the EntityTypeId of the related entity that should be associated with this Interaction. *Defaults to* *null**.* |
| RelatedEntityId | int? | Sets the EntityId of the related entity that should be associated with this Interaction. *Defaults to* *null**.* |
| ChannelCustom1 | string | Sets the first custom interaction string value. *Defaults to* *null**.* |
| ChannelCustom2 | string | Sets the second interaction string value. *Defaults to* *null**.* |
| ChannelCustomIndexed1 | string | Sets the first custom indexed interaction string value. *Defaults to* *null**.* |
| IsMultipleAllowed | bool | Specifies if multiple interactions can be written for this single command. If set to *true* then each time the command is executed a new interaction will be written. Otherwise only the first execution will write an interaction. Note: If the page is reloaded then a new parameter object is created and a new interaction could again be written. *Defaults to* *false**.* |
| SendMode | InteractionSendMode | Currently accepts two values:Queued: Adds the interaction to the internal queue, that posts to the server every so often. This is recommended and is used to maintain high performance. Immediate: In some rare cases, you may want to make sure an interaction gets posted to the server as soon as possible. This will cause the interaction to bypass the internal queue and post immediately upon execution. Be cautious using this, as you could *flood* your server with POST requests. *Defaults to* *Queued**.* |

## Example

```
<Button Text="Like"
    Command="{Binding WriteInteraction}">
    <Button.CommandParameter>
        <Rock:InteractionParameters Operation="Like"
            Summary="I like this."
            ChannelId="3"
            ComponentId="87" />
    </Button.CommandParameter>
</Button>
```

See the [Interaction](https://community.rockrms.com/developer/mobile-docs/essentials/controls/content-controls/interaction) control for another way to write interactions from XAML.

---

## 🎨 Styling {#styling}

We've worked hard for you to be able to leverage your knowledge of CSS to theme mobile applications. Applying these classes will allow you to build beautiful mobile apps with consistent styling.

## CSS Styling

CSS styling is a powerful way to style your applications. It's also a simple way to bring consistency to your project. Unfortunately, there are a few limitations you should be aware of.

- XAML styling is a first-class citizen in .NET MAUI
- CSS plays a side role in providing a familiar approach to styling XAML elements
- One cannot do everything in CSS that is doable in XAML styling
- Not all standard CSS properties from the web are supported in .NET MAUI

Be sure to start your understanding of CSS for .NET MAUI by reading [the Microsoft documentation](https://learn.microsoft.com/en-us/dotnet/maui/user-interface/styles/css?view=net-maui-8.0).

Warning

CSS properties in .NET MAUI are very picky. If you spell or mistype a property wrong your application could fail to load. Be careful, and test well.

## Downhill Framework

We've given our mobile CSS framework the name Downhill (it's much easier to roll a rock downhill you know). It incorporates standards from Bootstrap, Tailwind, and other CSS frameworks along with our own, so hopefully, it feels somewhat familiar to you.

You can find everything in the public Rock repository here: [https://github.com/SparkDevNetwork/Rock/tree/develop/Rock.DownhillCss](https://github.com/SparkDevNetwork/Rock/tree/develop/Rock.DownhillCss)

---

## Style Guide {#style-guide}

Learn the basics of styling a modern, dark mode responsive application.

Mobile6.0  Core16.7

## Getting Started

All of the built-in Rock components follow a consistent pattern for spacing values, colors and typography.

### Walkthrough

A start-to-finish walkthrough of styling an out of the box application. This encapsulates all of the below topics with progressive examples.

[Walkthrough](https://community.rockrms.com/developer/mobile-docs/styling/style-guide#walkthrough)

### Colors

Understand color theory in Rock Mobile and learn how to leverage built in colors to build truly responsive and beautiful applications.

[Colors](https://community.rockrms.com/developer/mobile-docs/styling/style-guide#colors)

### Typography

Understand how fonts and sizes are determined and utilizing in Rock Mobile.

[Typography](https://community.rockrms.com/developer/mobile-docs/styling/style-guide#typography)

### Margin, Padding and Other Utilities

Utilize built in spacing classes to match the consistency of built-in blocks.

[Utilities](https://community.rockrms.com/developer/mobile-docs/styling/style-guide#margin-padding-and-other-utilities)
