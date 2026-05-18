---
description: Use when you need to log interaction records for intents in Rock using the InteractionIntentWrite Lava command
source: "https://community.rockrms.com/Lava"
sourceLabel: Lava
---
> **Path:** Lava > Commands > Interaction Intent Write

v16.4

This Lava command will write an intent interaction for the specified intent.

## The Basics

By specifying the interaction intent value ID - as well as a few other optional values - you can log an interaction.

```
{% interactionintentwrite 
    intentvalueid:'1'
    operation:'View'
    summary:'Viewed content with discipleship intent'
    personaliasid:'10' %}
```

And just like that, an interaction record has been logged! The above example shows some possible parameters you can provide this Lava command, but not all of them are required. Let's dive into the specifics.

## Parameters

- [intentvalueid](#intentvalueid)
- [operation](#operation)
- [summary](#summary)
- [personaliasid](#personaliasid)
- [campaign](#campaign)
- [source](#source)
- [medium](#medium)
- [content](#content)
- [term](#term)

## Intent Value ID

*Required:* This ID will be used to look up the interaction intent defined value for which an interaction should be logged.

```
intentvalueid:'1'
```

## Operation

*Optional:* Leaving this blank will result in the value of "View" being logged. Otherwise, you may specify any value you like here, as long as it's 25 characters or less. If you go over 25 characters, the value that's logged will be truncated.

```
operation:'View'
```

## Summary

*Optional:* Leaving this blank will result in the current page's title being logged. Otherwise, you may specify any value you like here, as long as it's 500 characters or less. If you go over 500 characters, the value that's logged will be truncated. Note that this value is what is displayed within the "Interaction Session List" on Rock's *Tools \> Interactions* page.

```
summary:'Viewed content with discipleship intent'
```

## Person Alias ID

*Optional:* Leaving this blank or supplying an invalid value will result in the current person (the person who is viewing the page) being logged.

```
personaliasid:'1'
```

## Campaign

*Optional:* This represents the campaign name of the interaction. If you go over 50 characters, the value will be truncated.

```
campaign:'The Campaign Name'
```

## Source

*Optional:* This represents the campaign source of the interaction. If you go over 25 characters, the value will be truncated.

```
source:'The Campaign Source'
```

## Medium

*Optional:* This represents the campaign medium of the interaction. If you go over 25 characters, the value will be truncated.

```
medium:'The Campaign Medium'
```

## Content

*Optional:* This represents the campaign content of the interaction. If you go over 50 characters, the value will be truncated.

```
content:'Some Campaign Content'
```

## Term

*Optional:* This represents the term(s) of the interaction. If you go over 50 characters, the value will be truncated.

```
term:'Campaign Term(s)'
```

