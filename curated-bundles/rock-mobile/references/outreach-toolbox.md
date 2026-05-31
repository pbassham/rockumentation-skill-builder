---
description: "Use when users ask about setting up personal contact lists, prayer reminders, relationship tracking, or the Outreach Toolbox mobile features for spiritual engagement"
source: "https://community.rockrms.com/developer/mobile-docs"
sourceLabel: Mobile Docs
---
> **Path:** 

![](https://community.rockrms.com/GetImage.ashx?Id=74764)

The Outreach Toolbox helps the people in your church intentionally pray for and stay connected with the people God has placed in their lives: family, friends, neighbors, coworkers, and anyone they want to encourage or point toward Jesus. Each person builds a private list of contacts, chooses how often they want to pray for or connect with each one, and the app gives them a short, daily set of actions to follow through on. Relationships grow through consistency, and the toolbox keeps that rhythm so people can focus on the relationships themselves.

This page introduces the concepts shared across the toolbox and links to the documentation for each block. The blocks are designed to be used together, but can live on separate pages so you can shape the navigation that fits your app.

## Key Concepts

A few shared terms make the individual block pages easier to follow.

1. **Contact**. A person someone is caring for. A contact is private to its owner and has its own profile: photo, key dates, social links, a personal note, and a focus for the relationship.
2. **Touchpoint**. A single prompt to take one small action for a contact, such as praying for them or reaching out. Touchpoints appear in a guided, one-at-a-time flow. Types include Prayer, Connection, Pulse, Reminder, and special-date touchpoints (birthday, wedding anniversary, baptism anniversary, and salvation anniversary).
3. **Cadence**. How often a contact should generate a touchpoint: for example Daily, Weekly, Every Other Week, Monthly, Every Other Month, or Quarterly. Cadence is set per contact, separately for prayer and connection, and can be changed or paused at any time.
4. **Pulse**. A periodic check-in touchpoint that invites the owner to update where a contact is in their faith journey (for example whether they have accepted Jesus or been baptized), keeping prayer and care current.

Warning

**Outreach contacts are private to the person who added them.** Contact data is stored in Rock, but these are not Person records. Each contact belongs to the individual who created it, not to the church. This data should **never** be used for church contact, communication, or outreach purposes. It exists only to help an individual care for the people in their own life.

## Blocks

Each block has its own page with full settings and linking details.

| Block | Description |
| --- | --- |
| [Outreach Dashboard](https://community.rockrms.com/developer/mobile-docs/essentials/blocks/engagement/outreach-dashboard) | The home of the toolbox. Greets the person, shows their impact (touchpoints completed on schedule, total prayers and connections), surfaces upcoming special events, and provides entry points to add contacts, view contacts, edit preferences, and start their touchpoints. |
| [Outreach Onboarding](https://community.rockrms.com/developer/mobile-docs/essentials/blocks/engagement/outreach-onboarding) | The first-run flow that explains the toolbox and helps the person add their first contact. The add-contact steps are skipped automatically when they already have one. |
| [My Contacts](https://community.rockrms.com/developer/mobile-docs/essentials/blocks/engagement/my-contacts) | A searchable, paginated list of the people the person is caring for. |
| [Add Contact](https://community.rockrms.com/developer/mobile-docs/essentials/blocks/engagement/add-contact) | Adds a contact by hand or imports one from the device address book, with duplicate detection. Gender is required, and a photo, key dates, cadences, and a note can be captured. |
| [Contact Profile](https://community.rockrms.com/developer/mobile-docs/essentials/blocks/engagement/contact-profile) | The detail page for a single contact: prayer and connection cadences, personal note, more info (focus, strength, birthday, age, anniversary, social links), recent activity, salvation and baptism badges, and quick actions to remind, call, text, email, or edit. |
| [Touchpoint Detail](https://community.rockrms.com/developer/mobile-docs/essentials/blocks/engagement/touchpoint-detail) | The guided, one-at-a-time flow through pending touchpoints, with a progress bar, touchpoint history, note editing, and cadence adjustments. Shows an "all caught up" state when nothing is pending. |
| [Outreach Recent Activity](https://community.rockrms.com/developer/mobile-docs/essentials/blocks/engagement/outreach-recent-activity) | A compact block that surfaces a person's recent outreach activity. It hides itself automatically when there is none, which makes it a good fit for a home page. |

## Building the Entry CTA (Onboarding vs Dashboard)

The toolbox has two entry blocks, and they are not interchangeable.

1. Outreach Onboarding is the on-ramp. Completing onboarding is the only thing that turns a person's touchpoint generation on, and it writes their weekly schedule and notification preferences. Send first-time users here.
2. Outreach Dashboard is the home. Once a person is set up, this is where they work day to day.

Your toolbox entry point (a launch button, tile, or routing page) should decide which block to show based on whether the person has finished onboarding. That state lives on the person's `OutreachTouchpointGenerationEnabled` flag, which is available in Lava. When it is true, show the Dashboard page; otherwise show the Onboarding page.

```
{% if CurrentPerson.OutreachTouchpointGenerationEnabled == true %}
    //- Person has onboarded: send them to the Outreach Dashboard page.
{% else %}
    //- Person has not onboarded yet: send them to the Outreach Onboarding page. 
{% endif %}
```

This single check also covers people who opt out: Stop All Touchpoints on the dashboard sets `OutreachTouchpointGenerationEnabled` back to false, so the same condition sends them through onboarding again the next time they enter. Set the Onboarding block's Completion Action to the Dashboard page so people land on their home the moment they finish.

## How Touchpoints are Generated

People do not schedule touchpoints by hand. Based on each contact's cadence and the days of the week the person has chosen, Rock generates the right touchpoints automatically on a schedule and, when enabled, sends a reminder. People simply open the app and work through whatever is waiting.

For this to run, the **Update Outreach Toolbox Touchpoints** job must be active on the server. Schedule it to run at least hourly so that each time-of-day window can fire. The job also needs a push transport configured, and the mobile application must have its Outreach Toolbox touchpoint page set (this is the page a notification opens, and it should host the Touchpoint Detail block).

The job exposes these settings:

| Job setting | Default | What it controls |
| --- | --- | --- |
| Morning Notification Hour | 7 | The hour (24-hour clock) the morning run sends notifications. |
| Afternoon Notification Hour | 13 | The hour the afternoon run sends notifications. |
| Evening Notification Hour | 18 | The hour the evening run sends notifications. |
| Relationship Pulse Interval in Days | 120 | Days between Pulse (relationship check-in) touchpoints per contact. |
| Maximum Active Pulse Touchpoints | 3 | The most open Pulse touchpoints a person can have at once. |
| Mobile Application | first active mobile app | Which mobile application receives the push notifications. |
| Command Timeout | 300 | Seconds allowed for each database operation. |

The three-hour settings are how you shift **when** morning, afternoon, and evening notifications go out. A person picks which of those windows they want; these settings decide the clock time of each window for everyone.

## Notifications

From onboarding or the dashboard preferences, each person can choose:

1. The days of the week they want touchpoints added.
2. A daily reminder when touchpoints are waiting.
3. A special-events reminder for birthdays, anniversaries, and salvation and baptism dates.

**Daily reminders are sent at the time of day the person selects** (morning, afternoon, or evening). **Special touchpoint notifications** (birthdays and anniversaries) are always sent in the morning and cannot be changed.

Note

In order for push notifications to open the correct destination, you must set the Pages \> **Outreach Toolbox Touchpoint Page** in the mobile Application Settings within Rock.

Turning daily notifications off clears the saved time of day. People can also opt out entirely with Stop All Touchpoints and re-enable later by completing onboarding again.

## Styling and Customization

The toolbox uses Rock's CSS utility classes, so it follows your app's palette and adapts to light and dark mode automatically. The illustrations (for example the welcome and schedule art) fall back to bundled defaults, but can be overridden with your own resources of the same name for a branded look.

**Replacing the bundled illustrations**

The toolbox ships with a fixed set of PNG illustrations baked into the app. At render time, each image checks whether a `custom-` prefixed copy of the same file exists in the app bundle and, if so, uses it instead. Because these resources are compiled into the shell, you cannot drop them in from Rock at runtime: send your replacement artwork to the app factory and they will bundle it into your next build.

Provide your override using the exact filename, prefixed with `custom-`. The full set of overrideable images is:

| Default resource | Override filename | Where it appears |
| --- | --- | --- |
| `outreach_prayer.png` | `custom-outreach_prayer.png` | Prayer touchpoint icon, Prayer Cadence step |
| `outreach_connect.png` | `custom-outreach_connect.png` | Connection touchpoint icon, Connection Cadence step |
| `outreach_reminder.png` | `custom-outreach_reminder.png` | Reminder touchpoint icon |
| `outreach_pulse.png` | `custom-outreach_pulse.png` | Pulse touchpoint icon, Relationship Strength step |
| `outreach_birthday.png` | `custom-outreach_birthday.png` | Birthday touchpoint icon |
| `outreach_anniversary.png` | `custom-outreach_anniversary.png` | Wedding Anniversary touchpoint icon |
| `outreach_baptism.png` | `custom-outreach_baptism.png` | Baptism Anniversary touchpoint icon, Spiritual Milestones step |
| `outreach_salvation.png` | `custom-outreach_salvation.png` | Salvation Anniversary touchpoint icon |
| `outreach_target.png` | `custom-outreach_target.png` | Relationship Focus step |
| `outreach_note.png` | `custom-outreach_note.png` | Personal Notes step |
| `outreach_contacts.png` | `custom-outreach_contacts.png` | Contact Profile empty states |
| `outreach_social.png` | `custom-outreach_social.png` | Contact Profile social section |
| `outreach_events.png` | `custom-outreach_events.png` | Contact Profile events section |
| `outreach_people.png` | `custom-outreach_people.png` | Outreach Dashboard empty state |
| `outreach_celebrate.png` | `custom-outreach_celebrate.png` | Pulse celebration view |
| `outreach_success.png` | `custom-outreach_success.png` | Touchpoint completion view |

Tips for the handoff:

1. Match the original dimensions (1024x1024) and transparent background of the file you are replacing.
2. Use the same filename.
3. A single override file applies everywhere that image is used.
