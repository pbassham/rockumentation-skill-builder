---
description: "Use when creating or managing email, SMS or push notification flows without tracking conversion goals in Rock"
source: "https://community.rockrms.com/documentation/bookcontent/8/363"
sourceLabel: Communicating With Rock
---
> **Path:** Communicating With Rock > Communication Flows

Communication Flows

*Communication Flows* turn scattered messages into smart, strategic nudges that move people to action. Whether you’re announcing a new event or rallying a ministry team, Flows help you send the right message at the right moment, with a clear goal in mind.

No more guessing what’s working. With built-in tracking, you’ll see exactly who’s engaging, what actions they’re taking and how close you are to hitting your target. Imagine hearing, “We want 25% of new attendees in our Intro Class by December,” and knowing you can measure every step of the journey with Flows.

![Flow performance dashboard showing engagement and conversions](https://rockrms.blob.core.windows.net/documentation/Books/8/1.18.0/images/flow-performance-v18.png)

Flow Performance Overview

You’re not just sending messages. You’re building momentum like a river gathering strength as it flows.

## What is a Flow?

A *Flow* is a sequence of Rock-powered communications — *Email*, *SMS* or *Push* notifications — designed to guide people toward a specific goal. You can schedule messages over time, target exactly who should receive them and remove individuals once they’ve completed the journey.

### What is a Conversion Goal?

A *Goal* defines success for your Flows. It’s based on actions like filling out a form, joining a group, registering for an event or appearing in a data view. With *Conversion Tracking* enabled, you’ll know if your messages are doing what they set out to do.

### Flow Types

- *Recurring*: Sends to a selected audience on a defined recurring schedule (daily, weekly, monthly).
- *On-Demand*: Assigns individuals to a flow instance as needed through workflows or other events, such as the *Activate Communication Flow* workflow action.
- *One-Time*: A single message or series of messages scheduled for a specific date with no repeats (e.g., a stream of Christmas communications).

# Flows Without Conversion Goals:

You can still use Flows to package related communications even if you don’t need to track specific outcomes. This works well when conversions aren’t essential to your process.

![List of communication flows with status and schedule](https://rockrms.blob.core.windows.net/documentation/Books/8/1.18.0/images/communication-flows-list-v18.png)

Communication Flows List

## Create a Flow

To create a Flow, navigate to People \> Communication Flows and press the button in the top right.

![Creating a new flow screen](https://rockrms.blob.core.windows.net/documentation/Books/8/1.18.0/images/new-flow-v18.png)

New Flow Setup

For *Recurring* flow types, you’ll need to set up a recurring schedule (that makes sense, right?).

Click the Edit Schedule button, and you will see the pop-up below.

![Schedule builder popup for recurring flows](https://rockrms.blob.core.windows.net/documentation/Books/8/1.18.0/images/schedule-builder-v18.png)

Schedule Builder

Here you can:

- Set an *Occurrence Pattern* (specific dates, daily, weekly, or monthly).
- Decide how long the flow should continue (no end, end by a certain date, or after a number of occurrences).
- Add exclusions if needed by choosing specific date ranges to skip.

This makes it easy to create a rhythm for your messages, whether that is weekly follow-ups, monthly reminders or a custom pattern.

# Best Practices for Recurring Flows:

Recurring flows are powerful because each scheduled send counts as a new instance. This means results are tracked per occurrence, giving you a clear view of how each cycle performs.

Be mindful when scheduling frequent messages. If recipients have already completed your *Conversion Goal* or engaged with your communications, they may receive messages they no longer need. Too many unnecessary messages could increase the chance they click Unsubscribe. Always make sure your schedule aligns with your purpose and your audience’s needs.

Most importantly, your *Data Views* should be solid, targeting the right audience, those people who will benefit from your communications.

When your schedule is ready, select OK in the Schedule Builder.

To create a Goal, click Next.

### Set a Goal

“If you did not enable goal tracking during flows creation, you can skip this section.”

#### Conversion Goals

Conversion goals measure whether your flow is accomplishing its purpose. Think of them as success markers tied to real actions recipients take.

![Conversion goal configuration screen](https://rockrms.blob.core.windows.net/documentation/Books/8/1.18.0/images/flow-converison-goal-v18.png)

Conversion Goal Setup

Each Conversion Type connects directly to a Rock feature. For example, you might set a goal for 10% of recipients to complete the Starting Point class within 30 days.

Note that the flow will only count recipients who have not already completed that goal.

# People, Not Activity

Conversion goals are always about people, not actions. One person can only complete a goal once. For example, if someone fills out the same pledge form multiple times, only one conversion is counted. While flows can help meet organizational goals, the real aim is serving people, not checking boxes.

Select Next when you're ready to continue with message creation.

### Set Message Flow

In this step you’ll design the sequence of communications that make up your flow. For each message you can decide what kind it is, when it is sent, and what content it includes.

![Message flow editor screen](https://rockrms.blob.core.windows.net/documentation/Books/8/1.18.0/images/new-message-flow-v18.png)

Message Flow Setup

# Best Practices for Message Flow

Think carefully about when someone should exit a flow. If a recipient has already engaged with your content or completed the goal, continuing to send them messages may feel unnecessary. In many cases, you simply want them to see your main point, not to receive a string of extra communications.

Exiting on conversion can also be helpful. For example, if a recipient registers for your event after the first email, they don’t need further reminders. Use this option wisely to avoid over-messaging and to ensure every communication adds value.

### Create Email

![Email creation screen in flow builder](https://rockrms.blob.core.windows.net/documentation/Books/8/1.18.0/images/create-email-flow-v18.png)

Create Email Message

# Communication Flow Templates

Email templates inside *Communication Flows* differ from system-wide *[Communication Templates](https://community.rockrms.com/documentation/bookcontent/8/363#communicationtemplates)*. When you save a Communication Flow with an email, Rock saves that email as a template for future Flow use.  
Only Communication Flows templates appear in the dropdown under *Styles* in the Email Builder.  

### Create SMS Message

![SMS creation screen in flow builder](https://rockrms.blob.core.windows.net/documentation/Books/8/1.18.0/images/create-sms-flow-v18.png)

Create SMS Message

### Create Push Notification

![Push notification creation screen in flow builder](https://rockrms.blob.core.windows.net/documentation/Books/8/1.18.0/images/create-push-flow-v18.png)

Create Push Notification

When you’re satisfied with your flow, click Save.

## Flow Analytics

Select an active communication flow to view analytics. Flow analytics show how well your messages are performing, and what is driving conversions (if they're enabled). The details you see depend on the *Trigger Type* you selected.

![Flow analytics dashboard](https://rockrms.blob.core.windows.net/documentation/Books/8/1.18.0/images/flows-analytics-v18.png)

Flow Analytics Overview

These charts suggest correlation between messages and conversions, not direct causation.

### Individual Message Metrics

When you select a message from the list, you’ll see detailed analytics. Available metrics vary by message type.

**Metrics for Email Messages**

![Email message metrics dashboard](https://rockrms.blob.core.windows.net/documentation/Books/8/1.18.0/images/message-metrics-email-v18.png)

Email Message Metrics

### Unsubscribing From a Flow

If a recipient clicks Unsubscribe in an email, this is the page they’ll see. The message displayed depends on the unsubscribe message you set earlier in the flow setup (*Unsubscribe Message*).

This helps people manage their preferences without unsubscribing from all church communication. Coaching tip: Be intentional when setting your unsubscribe message so recipients know exactly what they’re opting out of.

# Unsubscribing from a Flow

When someone clicks Unsubscribe from a flow, they’re removed from future messages in that flow. See the [Communication Preferences](https://community.rockrms.com/documentation/bookcontent/8#communicationpreferences) chapter for full details on unsubscribing.


---

## Mass Push Notifications {#mass-push-notifications}

> **Path:** Communicating With Rock > Mass Push Notifications

Mass Push Notifications

The *Mass Push Notification* page lets you send a push notification to every active mobile device in your system. By default, a device is considered active if it's had an interaction recorded within the past year. That's a lot of notifications, so this isn't something you'll use every day, but you'll find it's perfect for certain communications.

# Sending Mass Push Notifications

You'll find the *Mass Push Notification* page under People \> Communications \> Mass Push Notification. If you've used tools like the [Communication Wizard](#communicationwizard) to send push notifications, then this page will look familiar to you.

![Mass Push Notifications](https://rockrms.blob.core.windows.net/documentation/Books/8/1.18.0/images/mass-push-notification-v18.png)

Mass Push Notification

By default, this block will send a notification to every device that has had an interaction recorded in your system within the past year. Administrators can edit the block settings to change the number of days that the device must have had an interaction for it to be considered active.

