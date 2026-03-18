> **Path:** Mobile Docs > 🧱 Essentials > Blocks > Events > Live Experience Occurrences

# Live Experience Occurrences

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
