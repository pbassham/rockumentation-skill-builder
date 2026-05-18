---
description: "Use when configuring conditional content display based on visitor segments, demographics, device type, location, or request parameters"
source: "https://community.rockrms.com/Lava"
sourceLabel: Lava
---
> **Path:** Lava > Commands > Personalize

v14.0

The Personalize command allows you to control the content you show to somone currently viewing your page, based on something you know about them or the nature of the request they are making. You can set the visibility of this block by specifying Personalization Segments and Request Filters that are relevant to particular visitors to your site.

Personalization Segments provide information about the demographics of registered Rock users. Request Filters give details about the page request that is currently being processed: the location and type of the device being used, previously stored cookies, or parameters from the current URL.

You can customize the user experience for your site in powerful ways when you apply these filters to your content. And don't forget, you can use the Personalize command in emails too!

Let's take a look at a simple example:

```
{% personalize segment:'YoungAdults' requestfilter:'ViewingFromCollegeCampusIP' matchtype:'all' %}
  Welcome university students! If you want to stay in the loop, connect with us on Instagram
  to get our latest feeds direct to your mobile.
{% endpersonalize %}
```

This Lava block will only be visible if the current person belongs to the Personalization Segment identified by the key `YoungAdults` and the request is coming from an IP address that was previously identified as a local college campus (defined by a Request Filter with the key `ViewingFromCollegeCampusIP`). If a match type parameter is not specified, the default of "any" applies - which means that both the segment and requestfilter conditions must be matched.

It is also possible to use an "otherwise" to display alternate content if the segment does not match, but be careful to not assume too much about the viewer -- they could still be in that segment.

```
{% personalize segment:'NotBaptised,Seeker' %}
   Are you ready to take that next step? Join us this weekend as we explore what it 
   means to be Baptised.
{% otherwise %}
   Are you or someone you know looking for what it means to be a follower of Christ?
   Join us this weekend as we explore what it means to be Baptised.
{% endpersonalize %}
```

What about a more complex example that uses both types of filters in combination?

```
{% personalize segment:'InSmallGroup,InServingTeam' requestfilter:'MobileFilter,Tablet' matchtype:'any' %}
  If you haven't already, don't forget to download our mobile app to keep up with
  the latest notifications from your small groups and serving teams.
{% endpersonalize %}
```

The content of this block will be shown to people who belong to any of the personalization segments that identify them as a member of a small group or a serving team. In addition, it will only be visible if the user is currently viewing your page from a mobile phone or tablet.

## Site Visitors

The Personalize command behaves slightly differently if the person viewing your page is not logged in to Rock. In this case, segment filters can't be matched because we don't have access to any specific information about the current person, so content that requires a segment match won't be visible. By contrast, request filters are applied to visitors in just the same way as logged in users.

# Parameters

- [segment](#segment)
- [requestfilter](#requestfilter)
- [matchtype](#matchtype)

## Segment

*Optional.*  
A comma-delimited list of personalization segment keys. Depending on the specified matchtype, the current person must be linked to 'any' or 'all' of the segments in this list for the content of the block to be visible.

## RequestFilter

*Optional.*  
A comma-delimited list of request filters. Depending on the specified matchtype, the current request must match 'any' or 'all' of the filters in this list for the content of the block to be visible.

## MatchType

*Optional. Values = { all | any }, Default = any*  
The type of match required for filter values. The same match type is applied separately to each filter, so a match type of "all" requires matching all given segments **and** matching all given request filters or the block will not be shown.

