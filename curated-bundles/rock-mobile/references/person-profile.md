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

## Engagement {#engagement}

# Engagement

---

## Add Contact {#add-contact}

C19.0S19.0

![](https://community.rockrms.com/GetImage.ashx?Id=74773)

Adds a new contact to a person's Outreach Toolbox, either by hand or by importing from the device address book.

## What it does

1. Adds a contact by hand, or imports one from the device address book.
2. Checks for a likely duplicate before saving.
3. Requires gender. A photo, key dates (birthday, wedding, baptism, salvation), prayer and connection cadences, social links, and a personal note can all be captured.
4. Saves the contact as private to the current person.

## Settings

| Setting | What it does |
| --- | --- |
| Post Save Action | The navigation performed after a contact is saved. Leave it on the default to return to the previous page, or point it wherever fits your flow. |

## How it links to other blocks

1. This block is usually opened from another block (the Dashboard, My Contact or Onboarding) through that block's Add Contact Page setting.
2. After saving, Post Save Action controls where the person goes next.

## Notes

1. The contact created here is not a Person record. It belongs to the person who added it and must never be used for church contact purposes. See A note on contacts and privacy.
2. Gender is captured so notifications can use the right pronoun for special-event messages.

---

## Contact Profile {#contact-profile}

C19.0S19.0

![](https://community.rockrms.com/GetImage.ashx?Id=74771)

The detail page for a single contact in the Outreach Toolbox.

## What it does

1. Shows the contact's prayer and connection cadences, with the ability to change or pause each.
2. Shows the personal note and a more-info section: relationship focus, relationship strength, birthday and age, anniversary, and social links.
3. Shows recent activity for the contact and the count of past touchpoints.
4. Shows salvation and baptism badges, and lets the owner record or update salvation and baptism information.
5. Lets the owner change the contact photo.
6. Provides quick actions to remind, call, text, email, or edit the contact, and to delete it.

## Settings

This block has no settings.

## How it links to other blocks

1. It is opened from My Contacts and Outreach Recent Activity through their contact-profile page settings.
2. Editing a contact reuses the same capture fields as Add Contact.

## Notes

1. This is the place where a contact's cadences, note, photo, and salvation and baptism details are maintained.
2. All of this data is private to the owner and is not a Person record. See A note on contacts and privacy.

---

## My Contacts {#my-contacts}

C19.0S19.0

![](https://community.rockrms.com/GetImage.ashx?Id=74770)

A searchable list of the people a person is caring for through the Outreach Toolbox.

## What it does

1. Lists the person's contacts, with search by name.
2. Loads more results on scroll so large lists stay fast.
3. Opens a contact's profile when it is tapped.
4. Provides a plus button to add a new contact.

## Settings

| Setting | What it does |
| --- | --- |
| Add Contact Page | The page opened by the plus button. Point it to the page that hosts Add Contact. |
| Contact Profile Page | The page opened when a contact is tapped. Point it to the page that hosts Contact Profile. |

## How it links to other blocks

1. Plus button to **Add Contact Page** to Add Contact.
2. Contact tap to **Contact Profile Page** to Contact Profile.

## Notes

1. Both settings are required, so configure them before placing this block in front of people.
2. The list only ever shows the current person's own contacts. Contacts are private to their owner.

---

## Outreach Dashboard {#outreach-dashboard}

C19.0S19.0

![](https://community.rockrms.com/GetImage.ashx?Id=74765)

The home of the Outreach Toolbox. It greets the person, shows their impact, surfaces recent special events, and is the launch point for adding contacts, viewing contacts, editing preferences, and starting their touchpoints.

## What it does

1. Greets the person and shows their profile image.
2. Shows impact metrics: contact count, pending touchpoints, prayers and connections completed this month and in total, the percentage of touchpoints finished on time, and a weekly completion view.
3. Surfaces special events (birthdays and anniversaries) from the past week that have not been acted on yet.
4. Provides the **Start Connecting** action, which opens the guided touchpoint flow.
5. Lets the person edit their notification preferences: which days of the week to receive touchpoints, whether to get a daily reminder and at what time of day, and whether to get special-event reminders.
6. Holds **Stop All Touchpoints**, which turns touchpoint generation off entirely.

## Settings

| Setting | What it does |
| --- | --- |
| Detail Page | The page opened by Start Connecting. Point it to the page that hosts Touchpoint Detail. |
| Contact List Page | The page opened when the person views their contacts. Point it to the page that hosts My Contacts. |
| Add Contact Page | The page opened by the add-contact action. Point it to the page that hosts Add Contact. |
| Toolbox Subtitle | The subtitle shown below the toolbox name. |
| Completion Lookback Period | The number of days to look back when calculating the on-time completion percentage. |

## How it links to other blocks

1. Start Connecting to **Detail Page** to Touchpoint Detail.
2. Contact list action to **Contact List Page** to My Contacts.
3. Add-contact action to **Add Contact Page** to Add Contact.

## Notes

1. This is the home block, not the on-ramp. Send people here only after they have finished onboarding. See Navigation and CTAs.
2. Stop All Touchpoints is one-way from here. It sets the person's touchpoint generation off. The only way to turn it back on is to complete Outreach Onboarding again, so route a stopped person back to onboarding.
3. When the person turns daily notifications off in preferences, the saved time of day is cleared.

---

## Outreach Onboarding {#outreach-onboarding}

C19.0S19.0

![](https://community.rockrms.com/GetImage.ashx?Id=74767)

The first-run flow for the Outreach Toolbox. It explains the toolbox, captures the person's schedule and notification preferences, and helps them add their first contact. Finishing onboarding is what turns touchpoint generation on.

## What it does

1. Walks the person through the toolbox: Welcome, How It Works, Weekly Schedule, and Reminder Preferences.
2. Captures the days of the week they want touchpoints, whether they want a daily reminder and at what time of day, and whether they want special-event reminders.
3. Helps them add their first contact. These add-contact steps are skipped automatically when the person already has at least one contact.
4. On completion, writes the person's preferences and turns touchpoint generation on.

## Block Configuration

| Setting | What it does |
| --- | --- |
| Add Contact Page | The page opened to add the first contact. Point it to the page that hosts Add Contact. |
| Completion Action | The navigation performed when onboarding finishes. Set this to navigate to the page that hosts the Outreach Dashboard. |

## How it links to other blocks

1. Add-contact step to **Add Contact Page** to Add Contact.
2. On finish, **Completion Action** to the Outreach Dashboard (recommended).

## Notes

1. This is the on-ramp. Completing onboarding is the only place touchpoint generation is switched on. Use it for first-time users and for anyone who previously used Stop All Touchpoints on the dashboard.
2. Because the add-contact steps are skipped for someone who already has a contact, it is safe to route returning-but-stopped people through onboarding to re-enable their touchpoints.
3. Set Completion Action to the Dashboard page so people land on their home the moment they finish.

---

## Outreach Recent Activity {#outreach-recent-activity}

C19.0S19.0

![](https://community.rockrms.com/GetImage.ashx?Id=74768)

A compact block that surfaces a person's recent outreach activity. It hides itself when there is nothing to show, which makes it a good fit for the main page, somewhere under the Outreach Dashboard block.

## What it does

1. Shows the person's most recent completed touchpoints (up to the last five).
2. Opens a contact's profile when an activity item is tapped.
3. Renders nothing when the person has no recent activity, so it can sit on a shared home page without leaving an empty space.

## Settings

| Setting | What it does |
| --- | --- |
| Contact Profile | The page opened when an activity item is tapped. Point it to the page that hosts Contact Profile. |

## How it links to other blocks

1. Activity item tap to **Contact Profile** to Contact Profile.

## Notes

1. Because it hides itself when empty, this block is a low-risk addition to a general home page for people who may or may not use the toolbox.
2. It only shows the current person's own activity. Outreach data is private to its owner.

---

## Touchpoint Detail {#touchpoint-detail}

C19.0S19.0

![](https://community.rockrms.com/GetImage.ashx?Id=74769)

The guided, one-at-a-time flow through a person's pending touchpoints. This is where the day-to-day work of the toolbox happens.

## What it does

1. Steps through pending touchpoints one at a time, with a progress bar.
2. Lets the person complete a touchpoint, record a note, and choose how they reached out (call, text, email, or in person).
3. Lets the person reschedule a Reminder or Connection touchpoint.
4. Shows touchpoint history for the contact and allows note editing.
5. Shows an "all caught up" state when nothing is pending.
6. During a Pulse touchpoint's baptism questionnaire, can open a configured baptism information page.

## Settings

| Setting | What it does |
| --- | --- |
| Baptism Info | A URL opened within a Pulse touchpoint during the baptism questionnaire. Leave empty to omit it. |

## How it links to other blocks

1. It is opened from the Outreach Dashboard Start Connecting action through the dashboard's Detail Page setting.
2. It is also opened directly by a tapped push notification.

## Notes

1. For notifications to deep-link here, the mobile application's Outreach Toolbox touchpoint page must point to the page that hosts this block. See How touchpoints are generated.
2. Rescheduling applies to Reminder and Connection touchpoints.

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
