---
description: "Use when looking up how to view, filter, and track past communications or check individual engagement history with specific messages"
source: "https://community.rockrms.com/documentation/bookcontent/8/363"
sourceLabel: Communicating With Rock
---
> **Path:** Communicating With Rock > Communication History and Analytics

Communication History and Analytics

A communication from Rock continues to provide value even long after it's sent. Using the tools described in this chapter, you can measure the success of past communications to inform your future communications. You can even drill down to an individual's communication history to see which communications they engage with.

# Communication History

Even for the most avid communicators, finding that email you sent five years ago... to just three people... is a breeze. Your list of communications can be filtered by status, topic, date and more. You can view your communication history under People \> Communication Reports \> Communication History.

![Communication History](https://rockrms.blob.core.windows.net/documentation/Books/8/1.18.0/images/communication-list-v18.png)

Communication History

With just a few clicks, you can narrow down your *Communication History* list to find exactly what you need. To filter by Communication Medium, use the icons at the top of the list: Mail Text Push Notification Personal Preference You can also filter or sort directly from the column headers. Click the icon to filter a column, or double-click any column to reverse the sort order.

Need even more control?

![Apply Filters](https://rockrms.blob.core.windows.net/documentation/Books/8/1.18.0/images/apply-filters-v18.png)

Apply Filters

Use the icon to open the List Settings panel. There, you can filter by:

- Creator
- Number of recipients
- Send date range
- Topic
- Communication name
- Even message content!

# Important: Filtering Large Lists Improves Load Time

If your list includes hundreds or even thousands of communications, applying filters will improve performance and reduce load times significantly.

# See the Bigger Picture

Those with Approve permissions on this block will be able to see every communication in the system and can filter by a specific person.

# Person Communication History

A history of communications that have been sent to an individual can be viewed on the *Person Profile* page, under the History tab. This is where you'll come to find out which communications a person has received, and to view the details of those communications.

![Person Profile Communication History](https://rockrms.blob.core.windows.net/documentation/Books/8/1.18.0/images/person-profile-communication-history-v18.png)

Person Profile Communication History

# Phone Number Security in Communication History

You can set a security which allows specific people to view the SMS messages when setting up the SMS communication. But please note that the personalized communication history block does not respect SMS view access. This means that people will be able to see the SMS communication even if they do not have the security permission to do so.

# Communication Analytics

Communication is important, but what matters most is how it’s received and what people do with it. Did the right people see it? Did they engage or tune it out? Rock helps you find answers fast with visuals and charts that show exactly how each communication performed. You’ll see not just who received your message but how it looked, what they did with it and how they engaged. Every detail counts and Rock makes sure you can track the ones that matter.

When you open a message from the *Communication History* list, Rock displays a detailed analytics page showing delivery status, engagement rates and other key insights. You can monitor opens, clicks and calls to action to see what resonated. And if you’re using an email integration, you’ll get even deeper metrics to help you refine future messages.

With services like Mailgun you can see how many people have opened your message and even which links they've clicked. To learn more about Mailgun, see the [Integrations](#integrations) chapter below.

## Analytics Tab

![Analytics Tab](https://rockrms.blob.core.windows.net/documentation/Books/8/1.18.0/images/communication-analytics-v18.png)

Analytics Tab

## Delivery Breakdown

![Delivery Breakdown](https://rockrms.blob.core.windows.net/documentation/Books/8/1.18.0/images/delivery-breakdown-v18.png)

Delivery Breakdown

Analytics show how your message moved through the system: from queue to open (or not). The states shown depend on the transport used, so you might not see every one every time.

- **Pending** - Your message is saved or queued but hasn’t gone out yet. Think of it as waiting in line.
- **Delivered** - The message made it to the recipient’s server. For email, this means it landed at their provider, like Gmail or Outlook, not necessarily in their inbox.
- **Failed** - The message couldn’t be delivered. Usually caused by a hard bounce or an invalid address.
- **Cancelled** - The sender called it off. This status shows up when a communication is cancelled before sending.

## Performance KPIs

![Performance KPIs](https://rockrms.blob.core.windows.net/documentation/Books/8/1.18.0/images/kpi-v18.png)

Performance KPIs

Get a snapshot of how your message performed after sending: opens, clicks, unsubscribes and more.

- **Open Rate** - Percentage of recipients who opened your message. The higher the better!
- **Click-Through Rate** - Measures how many people clicked a link in your message. One of the best signs of engagement.
- **Marked As Spam** - The number of people who flagged your message as spam in their inbox.
- **Unsubscribe Rate** - Tracks how many people unsubscribed from future communications.

## Performance Chart (Time)

![Performance Chart (Time)](https://rockrms.blob.core.windows.net/documentation/Books/8/1.18.0/images/performance-chart-time-v18.png)

Performance Chart (Time)

This chart shows how your key metrics trend over time. You’ll see rates for opens, clicks, unsubscribes and spam complaints plotted across the first 45 days after sending (or from launch to today if the message is older).

Use this view to spot patterns—for example, if clicks surge on the first day but drop off quickly, or if unsubscribes rise after a certain number of days.

Switch to the Flow option in the picker (top right) to see the same performance data, but with a different lense.

## Performance Chart (Flow)

![Performance Chart (Flow)](https://rockrms.blob.core.windows.net/documentation/Books/8/1.18.0/images/performance-flow-v18.png)

Performance Chart (Flow)

The flow view illustrates how recipients move through the stages of your message, from sent to delivered to opened and clicked. This helps you see the full recipient journey at a glance.

### How to Read This Chart

The chart flows left to right. Each color represents a status, and the width of the band shows how many people reached that stage. Hover over a band to see exact counts.

For example, you might see that most messages were delivered, fewer were opened, and only a fraction were clicked. This makes it easy to gauge drop-off points and overall engagement.

## Top Performing Links

![Top Performing Links](https://rockrms.blob.core.windows.net/documentation/Books/8/1.18.0/images/top-performing-links-v18.png)

Top Performing Links

This report shows which links received the most clicks, insight you can use to refine future messages. Each link displays:

- **Click-Through Rate** – the percentage of recipients who clicked that link.
- **Total Clicks** – how many times the link was clicked overall.
- **Unique Clicks** – how many distinct people clicked the link.

### What Does Click-Through Rate Mean?

The Click-Through Rate shows how many unique recipients clicked a link compared to how many people received the message.

For example, if 100 people received the message and 10 clicked a link, that link’s Click-Through Rate is 10%.

## Unique Opens

![Unique Opens](https://rockrms.blob.core.windows.net/documentation/Books/8/1.18.0/images/unique-opens-v18.png)

Unique Opens

These charts break down who opened your message, helping you see which groups are most engaged.

- **By Gender** - Shows open rates by gender. Useful for spotting engagement differences across your audience.
- **By Age Range** - Shows opens across age brackets. Use this to gauge which generations are interacting most with your communication.

Keep in mind that some people may not have gender or age data recorded in Rock, so they’ll appear in the *Unknown* category.

## Top Email Clients

![Top Email Clients](https://rockrms.blob.core.windows.net/documentation/Books/8/1.18.0/images/top-clients-v18.png)

Top Email Clients

This chart shows which email apps your audience used to open your message. Knowing the most common clients helps you design messages that display well across devices.

The list includes percentages for each client, along with an *Unknown* category when the system can’t detect the app.

# Medium Matters

Analytics vary depending on the medium you used to send the message. Email provides detailed insights like client usage, while SMS and push notifications only include basic stats such as delivery. Many metrics like *Top Client* apply only to email.

Analytics give you the big picture of how your message performed. Next, let’s look at the message itself:.

# Message Details Tab

## Email

This page shows you details related to the communication itself. Reviewing things like the subject of an email or the phone number used to send a text message can be helpful both for sent messages and for future communications that are pending.

![Volunteer Training Session](https://rockrms.blob.core.windows.net/documentation/Books/8/1.18.0/images/analytics-message-details-v18.png)

Volunteer Training Session

If the communication is a draft (i.e., not yet sent) you'll also see the option to *Cancel Send*. Additionally, if the communication hasn't been approved, you will have the option to approve or deny from this screen.

## SMS

![SMS Preview](https://rockrms.blob.core.windows.net/documentation/Books/8/1.18.0/images/sms-analytics-v18.png)

SMS Preview

## Push

![Push Preview](https://rockrms.blob.core.windows.net/documentation/Books/8/1.18.0/images/push-analytics-v18.png)

Push Preview

# Recipient Details

Communication is personal, and Rock makes it easy to see how each individual engaged with your message. The *Recipient Details* tab shows exactly who received the message and how they interacted with it as if you were there when they opened it (but not in a creepy way!). This is especially useful when you want to track opens, clicks and delivery for specific people.

![Recipient Details](https://rockrms.blob.core.windows.net/documentation/Books/8/1.18.0/images/recipient-details-list-2-v18.png)

Recipient Details

You may have hundreds of recipients in a bulk email, so use to sort and filter by column, or to add extra columns with details such as:

- Age
- Birthdate
- Gender
- Email
- Custom Person Attributes

You can filter or sort these columns just like the main list.

And when you select a recipient, you’ll see the nittiest-grittiest details: when the message was delivered, if they opened it and whether they clicked a link.

![Recipient Details](https://rockrms.blob.core.windows.net/documentation/Books/8/1.18.0/images/recipient-details-analytics-2-v18.png)

Recipient Details

# Communication Transports Matter

The transport you use (for example, *Mailgun*) determines how much detail you’ll see in your analytics. Some providers offer in-depth metrics, while others only provide high-level data. For more on the differences between transports, see the Integrations chapter below.

