---
description: Use when retrieving personalized adaptive messages for individuals in message or category mode using Lava commands
source: "https://community.rockrms.com/Lava"
sourceLabel: Lava
---
> **Path:** Lava > Commands > Adaptive Message

v17.0

This Lava command provides an easy way to retrieve personalized adaptive messages for an individual. This command operates in two modes: **Message Mode** or **Category Mode**.

## Message Mode

In this mode the command returns adaptive messages that best match the individual. Below is an example of how to retrieve up to two matching adaptations for the "giving" Adaptive Message:

```
{% adaptivemessage messagekey:'giving' adaptationspermessage:'2' %}

    {% for messageAdaptation in messageAdaptations %}
          {{ messageAdaptation | Attribute:'CallToAction' }}
    {% endfor %}

{% endadaptivemessage %}
```

Because we asked for two adaptations, a `for` loop is used to handle each one. Inside that loop we're displaying the value of the *CallToAction* attribute for each message adaptation.

Here is another example that shows only the first matching message (based on its 'order' property) and logs an interaction recording that the message was viewed.

```
{% adaptivemessage messagekey:'giving' adaptationspermessage:'1' trackviews:'true' %}

    {{ messageAdaptation | Attribute:'CallToAction' }}

{% endadaptivemessage %}
```

Similar to entity commands, if only one adaptation is returned, you can skip the `for` loop as shown.

## Category Mode

Category Mode retrieves adaptations across a specific category of Adaptive Messages. Use this mode when you want to find a variety of matching adaptations across multiple Adaptive Messages. In this mode, there are few new options.

```
{% adaptivemessage categoryid:'21' maxadaptations:'3' adaptationspermessage:'1' %}

    {% for messageAdaptation in messageAdaptations %}
          {{ messageAdaptation | Attribute:'CallToAction' }}
    {% endfor %}

{% endadaptivemessage %}
```

This example fetches up to three (3) total adaptations, with only one (1) adaptation per Adaptive Message within the specified category.

# Base Attributes

Rock provides these base attributes for adaptations, but you can add custom attributes as needed.

| Attribute | Key | Type |
| --- | --- | --- |
| Call To Action | `CallToAction` | Text |
| Call To Action Link | `CallToActionLink` | URL Link |
| Summary Image | `SummaryImage` | Image |
| Detail Image | `DetailImage` | Image |
| Summary | `Summary` | Memo |
| Details | `Details` | Structure Content Editor |

# Parameters

**Quick Links:**

- [adaptationspermessage](#adaptationspermessage)
- [categoryid](#categoryid)
- [maxadaptations](#maxadaptations)
- [messagekey](#messagekey)
- [trackviews](#trackviews)

## Adaptations Per Message

Defines the number of matching adaptations to return for each Adaptive Message.

## Category Id

This is the Id of an Adaptive Message category to search. Enables *Category Mode*, allowing you to retrive adaptations from multiple messages within the specified category. Use this when you don't want a particular Adaptive Message, but instead want to find a variety of matching adaptations all the Adaptive Messages for the given category.

## Max Adaptations

Sets the total number of adaptations to return. Used in *Category Mode* when working with multiple Adaptive Messages.

## MessageKey

The unique key identifying a specific Adaptive Message.

## Trackviews

Indicates whether to log a "Viewed" interaction in the *Adaptive Message* interaction channel.

**Saturation:** When tracking views, once an adaptation reaches its saturation point for a viewer—based on the combination of the *View Saturation Count* and *View Saturation Date Range*—it will no longer be displayed to them.

