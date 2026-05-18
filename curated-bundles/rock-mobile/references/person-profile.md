---
description: "Use when helping users display, configure, or customize person profile information in Rock mobile applications"
source: "https://community.rockrms.com/developer/mobile-docs"
sourceLabel: Mobile Docs
---
> **Path:** 

### M v5.0C v15.2

Display and edit information about a Person.

## Getting Started

This block is pretty straightforward to get working. The only thing really required is a `Person` context, which can be configured through the page settings.

![](https://community.rockrms.com/GetImage.ashx?Id=67238)

Navigate to `Mobile Applications > Person Profile Page > Edit`.

![](https://community.rockrms.com/GetImage.ashx?Id=67239)

Under `Advanced Settings`, set the `Person Parameter Name` of the `Context Parameters`.

## Block Configuration

### Phone Types

The phone number types to display.

### Header Template

The template that displays at the very top of the block.

#### Commands

The header template has access to the following specialized commands.

| Command | Parameter Type | Description |
| --- | --- | --- |
| ShowEdit | n/a | If allowed (through security authorization checks), displays a cover sheet containing the Person Profile edit information. |

#### Merge Fields

The header template gets supplied the following merge fields.

| Field | Type | Description |
| --- | --- | --- |
| Person | Rock.Model.Person | The Person retrieved from context. |
| CanEdit | bool | A value depicting whether or not the CurrentPerson has authorization to edit the Person retrieved from context. |

### Custom Actions Template

The template that displays underneath the contact buttons supplied by the block.

#### Merge Fields

| Field | Type | Description |
| --- | --- | --- |
| Person | Rock.Model.Person | The Person retrieved from context. |

### Badge Bar Template

The template that displays underneath the [Custom Actions Template](https://community.rockrms.com/developer/mobile-docs/essentials/blocks/crm/person-profile#custom-actions-template).

#### Merge Fields

| Field | Type | Description |
| --- | --- | --- |
| Person | Rock.Model.Person | The Person retrieved from context. |

### Show Demographics Panel

A boolean value depicting whether or not the demographics panel should be shown.

### Show Contact Information Panel

A boolean value depicting whether or not the contact information panel should be shown.

### Reminder Page

If selected (and there is a valid reminder type), a 'Reminder' button will be shown that shows this page in a cover sheet.

### Styling

![](https://community.rockrms.com/GetImage.ashx?Id=71446)

---

## Events {#events}

This section refers to the 'Events' mobile block group.

---

## Live Experience Occurrences {#live-experience-occurrences}

### M v4.0C v15.0

Displays a set of interactive experience occurrences to an individual.

## Configuration

### Destination Page

The page to link to when selecting an occurrence. This should typically pass a `InteractiveExperienceOccurrenceKey` to a [Live Experience](https://community.rockrms.com/developer/mobile-docs/essentials/blocks/events/live-experience) block.

### Login Page

The page to use when showing the login page. If not set, then the Login page provided in the Application settings will be used.

### Show All

This should really only be used for testing, and hidden from public view. When enabled, all active occurrences will be shown.

### Always Request Location

When enabled, the device location will always be requested. If disabled, then the location will only be requested dependent on whether or not the person has already been requested in the past.

### Template

The template to use when rendering the content.

#### Merge Fields

The following merge fields are available to you in the template.

| Key | Type | Value |
| --- | --- | --- |
| Occurrences | List | A list of interactive experience occurrences that are available. |
| LoginRecommended | bool | If there are occurrences that require a logged in person, this will be true, so you may show a login button in the content. |
| GeolocationRecommended | bool | If there are occurrences that are tied to a location, this will be true, so you may show a login button in the content. |

### Refresh Interval

When assigned a value more than 0, the block will self-refresh at regular intervals, specifically every `Refresh Interval` seconds, but only if the block is visible on the page. It's generally advised not to set the value under 60 (with the exception of 0, which deactivates it).

### Styling

Since this is a XAML template, there’s no styling X-Ray available.

---

## Live Experience {#live-experience}

### M v4.0C v15.0

Interact with an event in real time.

## Configuration

### Live Experience Web Page

The web page that will be displayed in a specialized [WebView](https://community.rockrms.com/developer/mobile-docs/essentials/controls/content-controls/web-view) for Live Experience. This web page should contain a `Live Experience` block.

### Always Request Location

If enabled, the location will always be requested. If not, the OS will only prompt them for location dependent on whether or not they have been asked.

### Keep Screen On

If enabled, the screen display will be marked to keep active while a Person is active in a Live Experience.

## Page Parameters

| Name | Description |
| --- | --- |
| InteractiveExperienceOccurrenceKey | The Guid or the Id Key of the Interactive Experience Occurrence to join. |

### Styling

Since this is a XAML template, there’s no styling X-Ray available.
