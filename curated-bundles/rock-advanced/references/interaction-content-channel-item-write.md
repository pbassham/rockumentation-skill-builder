---
description: Use when logging content channel item interactions programmatically or tracking user engagement with content channel items using Lava commands
source: "https://community.rockrms.com/Lava"
sourceLabel: Lava
---
> **Path:** Lava > Commands > Interaction Content Channel Item Write

v11.0

This Lava command will write a content channel interaction for the specified content channel item.

## The Basics

By specifying the content channel item ID - as well as a few other optional values - you can log an interaction without having to actually load the content channel item on the page.

```
{% interactioncontentchannelitemwrite 
    contentchannelitemid:'1' 
    operation:'View' 
    summary:'Viewed content channel item #1' 
    personaliasid:'10' %}
```

And just like that, an interaction record has been logged! The above example shows all possible parameters you can provide this Lava command, but not all of them are required. Let's dive into the specifics.

## Parameters

- [contentchannelitemid](#contentchannelitemid)
- [operation](#operation)
- [summary](#summary)
- [personaliasid](#personaliasid)
- [campaign](#campaign)
- [source](#source)
- [medium](#medium)
- [content](#content)
- [term](#term)

## Content Channel Item ID

*Required:* This ID will be used to look up not only the content channel item, but also the parent content channel for which an interaction should be logged.

```
contentchannelitemid:'1'
```

## Operation

*Optional:* Leaving this blank will result in the value of "View" being logged. Otherwise, you may specify any value you like here, as long as it's 25 characters or less. If you go over 25 characters, the value that's logged will be truncated.

```
operation:'View'
```

## Summary

*Optional:* Leaving this blank will result in the current page's title being logged. Otherwise, you may specify any value you like here, as long as it's 500 characters or less. If you go over 500 characters, the value that's logged will be truncated. Note that this value is what is displayed within the "Interaction Session List" on Rock's *Tools \> Interactions* page.

```
summary:'Viewed content channel item #1'
```

## Person Alias ID

*Optional:* Leaving this blank will result in the current person (the person who is viewing the page) being logged. Note that if you supply an invalid value here, not only will the interaction fail to be logged, but an exception will appear within Rock's *Exception List*.

```
personaliasid:'1'
```

## Campaign

v12.0

*Optional:* This represents the campaign name of the interaction. If you go over 50 characters, the value will be truncated.

```
campaign:'The Campaign Name'
```

## Source

v12.0

*Optional:* This represents the campaign source of the interaction. If you go over 25 characters, the value will be truncated.

```
source:'The Campaign Source'
```

## Medium

v12.0

*Optional:* This represents the campaign medium of the interaction. If you go over 25 characters, the value will be truncated.

```
medium:'The Campaign Medium'
```

## Content

v12.0

*Optional:* This represents the campaign content of the interaction. If you go over 50 characters, the value will be truncated.

```
content:'Some Campaign Content'
```

## Term

v12.0

*Optional:* This represents the term(s) of the interaction. If you go over 50 characters, the value will be truncated.

```
term:'Campaign Term(s)'
```

