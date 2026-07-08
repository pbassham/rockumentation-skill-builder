---
description: Use when analyzing communication frequency patterns to avoid overwhelming members with excessive messages and managing communication strategy
source: "https://community.rockrms.com/documentation/bookcontent/8/363"
sourceLabel: Communicating With Rock
---
> **Path:** Communicating With Rock > Communication Saturation Report

Communication Saturation Report

You may have had this experience before: your phone has been pinging off the charts, and you think you may have become famous! After opening your inbox or messages, you see it’s the same reminder you got last week… and the week before. Your next dental appointment needs to be scheduled. You already knew that but didn’t get around to messaging them back. Nothing makes you want to click the Unsubscribe button more. The truth of the matter is that each and every communication matters. Using Rock’s communication features, you have great power to send messages for anything and everything under the sun, but loading a member’s inbox can feel impersonal.

The *Communication Saturation Report* helps you keep tabs on recipients who may feel overwhelmed by the amount of communication they are receiving. In this report you can see the "Saturation Spread", "Top Recipients" of communications and "Communications With Most Recipients". Each one informs your communication strategy.

To see the report navigate to People \> Communication Reports \> Communication Saturation.

Use The Communication Saturation Report

![Communication Saturation Report](https://rockrms.blob.core.windows.net/documentation/Books/8/1.18.0/images/communications-saturation-report-v18.png)

1 Select Date Range

Choose the time period you want to report on. This sets the window for the communication metrics shown.

2 Data View

Filter your report using a Data View to focus on a specific group of people—like a ministry team or demographic segment.

3 Connection Status

Narrow results by Connection Status, such as visitors, members or attendees. Great for analyzing communication impact by group stage.

4 Medium

Pick which communication mediums (Email, SMS, etc.) to include. If you don’t see one listed, you can configure it in Mediums and Transports.

5 Bulk Only

This toggle limits the report to bulk communications only. It is switched off by default.

6 View Select

Choose the format for your report. Each view offers a different angle:

- *Chart*: Shows how many people received messages over time.
- *Recipients*: Highlights who is receiving the most messages.
- *Communications*: Displays which communications had the widest reach.

## Chart View

The *Chart* view shows the number of messages each person has received within your specified time frame. For example, you will notice that 13 people received 11-15 messages this month! Those people probably feel a little overwhelmed. Maybe it's a sign to press Send a bit less this month.

Discover the count and percentage of contacts who haven’t received any communications. Look for the gray text at the top right of the chart.

![Communication Saturation Report - Chart View](https://rockrms.blob.core.windows.net/documentation/Books/8/1.18.0/images/communications-saturation-report-chart-v18.png)

Communication Saturation Report - Chart View

## Recipients View

The *Recipients* view helps you drill down into your communications to see which individuals are receiving the most messages. Every person matters, and sending bulk communications can make it hard to know whose attention you’re demanding. By filtering on *Connection Status*, you get a clear picture of which segments (e.g., visitors, members or attendees) are hearing from you most often. You may discover that members receive the lion’s share of messages (which usually makes sense) or uncover new prospects whose inboxes are overloaded. Either way, these insights help you adjust your strategy for maximum engagement.

Studies show that 57% of consumers who unsubscribe from an email do so because they received too many (OTA, 2018, p. 4). Keeping the number of emails you send to recipients each week below three is a good practice. Clicking takes you to the *Communication History* for the specified person, where you can see exactly which messages they’ve received.

![Communication Saturation Report - Recipients View](https://rockrms.blob.core.windows.net/documentation/Books/8/1.18.0/images/communications-saturation-recipients-chart-v18.png)

Communication Saturation Report - Recipients View

## Communications View

Find the communications reaching the widest audience. On closer look, that bulk message might not have needed to hit every inbox. The more focused your communications, the more impact they’ll have. Click the icon to view *Email Analytics* for that specific communication.

![Communication Saturation Report - Communications View](https://rockrms.blob.core.windows.net/documentation/Books/8/1.18.0/images/communications-saturation-report-communications-v18.png)

Communication Saturation Report - Communications View

### Block Settings

These settings adjust how your report displays, so it’s worth taking a moment to explore them.

![Communication Saturation Report - Block Settings](https://rockrms.blob.core.windows.net/documentation/Books/8/1.18.0/images/communications-saturation-block-settings-chart-v18.png)

Communication Saturation Report - Block Settings

**Email/SMS/Push Notification Bucket Ratio**

Sets how many days each x-axis bucket covers in the chart. If the ratio is 10, each bucket spans 10 days of your selected date range. A 30-day range with a ratio of 10 will yield buckets like 1–3, 4–6, 7–9 days, etc. Note: The system defaults to the lowest bucket ratio when multiple mediums are selected.

**Max Recipients To List**

Sets the max number of recipients shown on the Recipients report. Fewer names mean faster load times, but less visibility.

**Max Communications To List**

Sets the max number of communications shown on the Communications report. Fewer items means quicker loading, but less detail.


---

## System Communications {#system-communications}

> **Path:** Communicating With Rock > System Communications

System Communications

*System Communications* (formerly known as "System Emails") are communication templates that are used by Rock to send very specific messages. Typically, these are automated communications, such as the message someone receives when they've forgotten their password and requested to reset it.

*System Communications* can be used with either emails or SMS messaging. While Rock sets these up to look professional from the start, you may want to modify them to match your organization's branding. You can edit these communications under Admin Tools \> Settings \> System Communications.

![System Communications](https://rockrms.blob.core.windows.net/documentation/Books/8/1.18.0/images/system-communications-v18.png)

System Communications

# System Communication Preview

As noted in the screenshot above, you can click the icon to view a preview of the system communication. However, this is not the typical preview you might be used to seeing when editing the system communication. This is a special preview that's interactive, allowing you to choose a person and a date to populate merge fields. This helps you see what the communication will look like with certain merge fields filled in.

![System Communication Preview](https://rockrms.blob.core.windows.net/documentation/Books/8/1.18.0/images/system-communication-preview-v18.png)

System Communication Preview

# CSS Inlining

CSS Inlining of Email Templates is only available if the email Communication Transport supports it. You can allow CSS Inlining for all emails by updating the Communication Medium settings.

