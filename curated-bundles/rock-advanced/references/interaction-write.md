---
description: "Use when you need to log interaction records in Lava with channel type, component, and entity details"
source: "https://community.rockrms.com/Lava"
sourceLabel: Lava
---
> **Path:** Lava > Commands > Interaction Write

v11.0

This Lava command allows you to write an interaction for just about anything!

**Tip** As long as you provide a valid channel type medium value id (Defined Value), the rest of the parameters are technically optional. **However**, you'll probably want to provide as much detail as possible in order to make your interactions useful when analyzing them later.

## The Basics

By specifying the channel type medium value id - along with any combination of the remaining parameters - you can log an interaction directly from Lava.

```
{% interactionwrite 
    channeltypemediumvalueid:'1'
    channelentityid:'1' 
    channelname:'Some Channel'
    componententitytypeid:'1'
    interactionentitytypeid:'1'
    componententityid:'1'
    componentname:'Some Component'
    entityid:'1'
    operation:'View'
    summary:'Viewed Some Page'
    relatedentitytypeid:'1'
    relatedentityid:'1'
    channelcustom1:'Some Custom Value'
    channelcustom2:'Another Custom Value' 
    channelcustomindexed1:'Some Indexed Custom Value'  
    personaliasid:'10' 
%}
    Here is the interaction data.
{% endinteractionwrite %}
```

And just like that, an interaction record has been logged! The above example shows all possible parameters you can provide this Lava command, but not all of them are required. Let's dive into the specifics.

## Parameters

- [channeltypemediumvalueid](#channeltypemediumvalueid)
- [channelentityid](#channelentityid)
- [channelname](#channelname)
- [componententitytypeid](#componententitytypeid)
- [componententityid](#componententityid)
- [componentname](#componentname)
- [interactionentitytypeid](#interactionentitytypeid)
- [entityid](#entityid)
- [operation](#operation)
- [summary](#summary)
- [relatedentitytypeid](#relatedentitytypeid)
- [relatedentityid](#relatedentityid)
- [channelcustom1](#channelcustom1)
- [channelcustom2](#channelcustom2)
- [channelcustomindexed1](#channelcustomindexed1)
- [personaliasid](#personaliasid)
- [campaign](#campaign)
- [source](#source)
- [medium](#medium)
- [content](#content)
- [term](#term)
- [data](#data)

## Channel Type Medium Value ID

*Required:* This ID will be used to look up the interaction channel's "Channel Type" Defined Value, representing what type of interaction channel this is. If you provide an invalid value here, an interaction will not be logged.

```
channeltypemediumvalueid:'1'
```

## Channel Entity ID

*Optional:* This value will be used to look up an existing interaction channel, or create a new one if a matching channel is not found. Note that this ID is used in conjunction with the channeltypemediumvalueid to specify exactly which Entity this interaction is referring to.

```
channelentityid:'1'
```

## Channel Name

*Optional:* This value is used to give a name to the resulting interaction channel that will be inserted (if a matching channel is not found).

```
channelname:'Some Channel'
```

## Component Entity Type ID

*Optional:* This value is used to specify the Entity type for any interaction components tied to this interaction channel.

```
componententitytypeid:'1'
```

## Component Entity ID

*Optional:* This value will be used to look up an existing interaction component, or create a new one if a matching component is not found. Note that this value is used in conjunction with the componententitytypeid to specify exactly which Entity this interaction component is referring to.

```
componententityid:'1'
```

## Component Name

*Optional:* This value is used to give a name to the resulting interaction component that will be inserted (if a matching component is not found).

```
componentname:'Some Component'
```

## Interaction Entity Type Id

*Optional:* This value is used to specify the Entity type for any interactions tied to this interaction channel and interaction component combination.

```
interactionentitytypeid:'1'
```

## Entity ID

*Optional:* This value is used in conjunction with the interactionentitytypeid to specify exactly which Entity this interaction is referring to.

```
entityid:'1'
```

## Operation

*Optional:* Leaving this blank will result in the value of "View" being logged. Otherwise, you may specify any value you like here, as long as it's 25 characters or less. If you go over 25 characters, the value that's logged will be truncated.

```
operation:'View'
```

## Summary

*Optional:* Leaving this blank will result in the current page's title being logged. Otherwise, you may specify any value you like here, as long as it's 500 characters or less. If you go over 500 characters, the value that's logged will be truncated. Note that this value is what is displayed within the "Interaction Session List" on Rock's *Tools \> Interactions* page.

```
summary:'Viewed Some Page'
```

## Related Entity Type ID

*Optional:* This value is used to specify the Entity type for a related Entity you wish to link to the interaction.

```
relatedentitytypeid:'1'
```

## Related Entity ID

*Optional:* This value is used in conjunction with the relatedentitytypeid to specify exactly which Entity a related Entity is referring to.

```
relatedentityid:'1'
```

## Channel Custom 1

*Optional:* This represents any custom value that relates to this interaction channel and interaction combination. If you go over 500 characters, the value that's logged will be truncated.

```
channelcustom1:'Some Custom Value'
```

## Channel Custom 2

*Optional:* This represents any custom value that relates to this interaction channel and interaction combination. If you go over 2,000 characters, the value that's logged will be truncated.

```
channelcustom2:'Another custom Value'
```

## Channel Custom Indexed 1

*Optional:* This represents any custom value that relates to this interaction channel and interaction combination. Note that this field will be indexed in the database, allowing for faster querying against this field. If you go over 500 characters, the value that's logged will be truncated.

```
channelcustomindexed1:'Some Indexed Custom Value'
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

## Data

*Optional:* Note that this value should be provided between the opening and closing {% interactioncontentchannelitemwrite %} tags. This value will be logged in the interaction's "InteractionData" field.

```
{% interactioncontentchannelitemwrite ... %}
    Here is the interaction data.
{% endinteractioncontentchannelitemwrite %}
```


---

## JavaScript {#javascript}

> **Path:** Lava > Commands > JavaScript

The javascript command allows you to place a script into the page header. While you technically can have inline scripts in the body of your HTML it's a best practice to put this into the page header (well where could be argued, but putting it in the page header allows your script to be available before the content on the page loads).

```
{% javascript %}
    alert("Hello world!");
{% endjavascript %}
```

Simple right? The javascript command takes your script and places it in a script tag for you. It also wraps your code into a self-executing anonymous function. Who... what??? This function protects your code from other code on the page (and honestly, it protects the other code from yours too). This ensures that all of the variables you define don't conflict with others on the page. For the most part you don't need to worry or think about it. But, we highly recommend that you tell those around you not to worry, your code is running in a 'self-executing anonymous function'. You just earned that raise... you're welcome.

Note: This command requires a full page reload in order for your changes to be displayed.

Remember this is Lava so anything is possible. This includes writing your JavaScript with Lava. Oh... yes we did!

```
{% javascript %}
    alert("Hello {{ CurrentPerson.NickName }}!");
{% endjavascript %}
```

# Parameters

Below is a complete list of the parameters that are available to the javascript command.

**Quick Links:**

- [id](#id)
- [references](#references)
- [disableanonymousfunction](#disableanonymousfunction)
- [url](#url)

## Id

If you provide an id parameter for your script Lava will be sure to only add the script once per id value.

## References

This property allows you to pass in specific JavaScript objects on the page to your anonymous function. This accepts a comma delimited list of globally scoped JavaScript objects.

## Disable Anonymous Function

Don't want the protection afforded by the anonymous function? Well, you can disable it by setting the value of this property to true. Your script will then simply be added to a script tag as is.

## URL

This property allows you to add a script reference using a URL. Paired with the id property and you can ensure that it's only added once per page.

