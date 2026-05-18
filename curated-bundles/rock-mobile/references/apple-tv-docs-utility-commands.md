---
description: "Use when styling Rock Mobile UI elements, toggling CSS classes, managing application context, or implementing follow/unfollow functionality"
source: "https://community.rockrms.com/developer/apple-tv-docs"
sourceLabel: Apple TV Docs
---
> **Path:** 

## Set Context

Sets the application context using the give key/value.

```
<buttonLockup rockCommand="setContext" rockContextKey="Campus" rockContextValue="FC0001DF-4F5E-45F3-B0EA-A780AF75E7E9">
    <title>Glendale Campus</title>
</buttonLockup>
```

Parameters for this command include:

| Parameter | Type | Description |
| --- | --- | --- |
| rockContextKey | string | The key for the context. |
| rockContextValue | string | The value to store for the context. |

## Clear Context

Clears the context value for the given key.

```
<buttonLockup rockCommand="clearContext" rockContextKey="Campus">
    <title>Clear Campus</title>
</buttonLockup>
```

Parameters for this command include:

| Parameter | Type | Description |
| --- | --- | --- |
| rockContextKey | string | The key for the context. |

## Toggle Attribute

TV v2.0

This is a command used to change the style of objects on the DOM. Loops through the applied styles in the `rockToggleAttributeSelector`.

For these examples, imagine we have the following styles:

```
<!-- Note, these styles are meant to go in the head section of the document. -->
<style>
    .red { tv-highlight-color: red; }
    .blue { tv-highlight-color: blue; }
    .green { tv-highlight-color: green; }
    .yellow { tv-highlight-color: yellow; }
    .small { height: 100; width: 100; }
    .medium { height: 200; width: 200; }
    .large { height: 300; width: 300; }
</style>
```

A title that changes colors when the button is selected:

```
<row>
    <title id="fun-title">Look, I change colors!</title>
</row>

<row>
    <button rockCommand="toggleAttribute" 
        rockToggleAttributeKey="class"
        rockToggleAttributeSelector="#fun-title" 
        rockToggleAttributeValues="small red, medium blue, large green, medium yellow">
        <text>Color + size change!</text>
    </button>
</row>
```

Changing all red to green:

```
<row>
    <title class="red">To green I go.</title>
</row>

<row>
<button rockCommand="toggleAttribute" 
        rockToggleAttributeKey="class"
        rockToggleAttributeSelector=".red" 
        rockToggleAttributeValues="green">
        <text>Color change!</text>
    </button>
</row>
```

Parameters for this command include:

| Parameter | Type | Description |
| --- | --- | --- |
| rockToggleAttributeSelector | string | A CSS selector value to apply these changes to. |
| rockToggleAttributeValues | string | A list of styles to toggle the state between, delimited by a comma. |

## Follow

TV v2.0

This is a command used to follow/unfollow entities within your application. This command specifically applies related styling and source changes of an object on the DOM, if you do not provide the `rockFollowIconSelector`, it will inherit from the element the command is attributed to.

For example, the following code:

```
<buttonLockup rockCommand="follow" 
    rockFollowEntityTypeGuid="82c34fd7-f91d-4dc9-91b6-0507706b789a"
    rockFollowEntityGuid="5ff652e6-c7dc-40c2-88de-54dfe303b782"
    rockFollowIsFollowed="False"
    rockFollowIconSelector="#follow-icon-1"
    rockFollowIconIsNotFollowedIcon="resource://button-rate"
    rockFollowIconIsFollowedIcon="resourced://button-rated>
    <badge id="follow-icon-1" />
</buttonLockup>
```

Produces an output of a heart icon that toggles between hollow and filled in red when selected.

You can also update the source of a resource dependent on the following state. For example, the following code:

```
<buttonLockup rockCommand="follow" 
    rockFollowEntityTypeGuid="82c34fd7-f91d-4dc9-91b6-0507706b789a"
    rockFollowEntityGuid="5ff652e6-c7dc-40c2-88de-54dfe303b782"
    rockFollowIsFollowed="False"
    rockFollowIconSelector="#follow-icon-2"
    rockFollowIsNotFollowedIcon="resource://button-add"
    rockFollowIsFollowedIcon="resource://button-remove">
    <badge id="follow-icon-2" />
</buttonLockup>
```

Produces an output of an add icon when the button is not followed and remove icon when the button is.

Parameters for this command include:

| Parameter | Type | Description |
| --- | --- | --- |
| rockFollowEntityTypeGuid | Guid | The entity type to follow. |
| rockFollowEntityGuid | Guid | The entity to follow. |
| rockFollowIsFollowed | bool | Used to provide the initial state of the object (is followed, or is not). Defaults to false. |
| rockFollowToggleStyle | bool | If set to false, the command will not perform any styling updates on the DOM. Defaults to true. |
| rockFollowIsFollowedIcon | string | The source of a resource to display when the entity is followed. |
| rockFollowIsNotFollowedIcon | string | The source of a resource to display when the entity is not followed. |
| rockFollowIconSelector | string | A CSS selector value to apply source and style changes to. ([?](https://www.w3schools.com/cssref/css_selectors.asp)) |
| rockFollowPurposeKey | string | An optional parameter that allows you to set a 'Purpose Key' while following or unfollowing. |

## Remove Item

TV v2.0

This command removes an object from the DOM when executed.

```
<buttonLockup rockCommand="removeItem">
    <title>See ya!</title>
</buttonLockup>
```

To target another object, use the `rockRemoveSelector` property.

```
<text id="text-to-remove">Nooooo! Don't do it!</text>
<buttonLockup rockCommand="removeItem" rockRemoveSelector="#text-to-remove">
    <title>Remove the text</title>
</buttonLockup>
```

Parameters for this command include:

| Parameter | Type | Description |
| --- | --- | --- |
| rockRemoveDelay | int | The number of milliseconds to wait before removing the object from the DOM. |
| rockRemoveSelector | string |  |

## Pray For Request

TV v2.0

Use this command to create a unique prayer experience in your TV application. This command increments a [PrayerRequest](https://community.rockrms.com/rocku/individuals-in-rock/prayer-requests). Simply pass in a `rockPrayerRequestGuid`.

```
<buttonLockup rockCommand="prayForRequest"
    rockPrayerRequestGuid="d263d91e-65d7-40b3-9fa3-f5e3c0e77ffb">
    <title>I prayed</title>
</buttonLockup>
```

| Parameter | Type | Description |
| --- | --- | --- |
| rockPrayerRequestGuid | Guid | The Guid of the PrayerRequest to pray for. |
| rockRecordInteraction | bool | Whether or not to record a 'Prayed' Interaction. (Defaults to true). |

---

## 🎨 Styling {#styling}

# 🎨 Styling
