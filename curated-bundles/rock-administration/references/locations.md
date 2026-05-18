---
description: "Use when configuring location settings, understanding location types, setting up geo-fences, or managing address standardization and geocoding in Rock"
source: "https://community.rockrms.com/documentation/bookcontent/9/368"
sourceLabel: Rock Admin Hero Guide
---
> **Path:** Rock Admin Hero Guide > Locations

With the development of mapping technologies, location has taken on a new importance in our lives. Concepts like proximity, distance and location are common in our everyday lives and our interactions with others. Rock has a very robust location strategy. It’s important that you understand all the possibilities as you set out to implement it in your organization.

# Location Descriptors

When you create a location, you can define several location descriptors:

- **Street Address:** This is pretty obvious, the street address of the location.
- **Latitude / Longitude Point:** The lat/long point is simply the latitude/longitude of the address. You can set this by either providing an address and allowing Rock to convert it to a lat/long using the built-in address standardization service or you can reference the point using Rock’s location picker.
- **Geo-fence:** A geo-fence is a virtual perimeter for a real-world geographic area or boundary. Geo-fences are used by Rock to define things like regions for groups and to power features like mobile check-in. Rock allows you to draw these fences right in the address picker.

# Types of Locations

There are two types of locations in Rock. Let’s take a look at each and see how they are used by Rock.

## Positional Locations

Positional locations describe places you could point to on a map. By themselves they don’t tell you anything about the point, just its location on the map. They only find meaning when they are used by features like *Families* (to describe where they live) or *Groups* (where they meet).

## Named Locations

Named locations have position and meaning. The meaning comes from giving the position a name. For instance, after install there's a *Main Campus* location that describes your organization’s campus.

Named locations can also have hierarchy. Think again to your organization’s campus. The campus itself is a location, but it’s also made up of sub-locations like buildings. Buildings have locations too - rooms. Having a hierarchy allows Rock to build rich location contexts into applications like check-in.

Named locations must be setup under Admin Tools \> Settings \> Named Locations before they can be used in the application.

# Address Standardization and Geocoding

Your attendees' addresses are very valuable, so it's important that they are formatted correctly and validated through the USPS database. Also, in order for these addresses to be used with the latest mapping technologies it's important to convert them into latitude and longitude points through a process called geocoding. Fortunately, Rock makes both of these tasks simple.

As addresses are entered into the system, Rock will automatically send them to an online service to standardize and geocode them. This service will ensure that:

- Addresses are formatted correctly (e.g., fix upper / lower case issues)
- Items like Streets, Avenues, West and East are abbreviated correctly
- Zip+4 is researched and added
- Latitude and longitude are added to your addresses

Out of the box Rock uses SmartyStreets to provide this service. SmartyStreets is a service for address standardizing and geocoding capabilities. They have also generously granted the Rock community a license to use their service for free. We've built this license directly into the product so there's nothing you need to do to enable this functionality. Just sit back and enjoy quality addresses.

While you don't need to configure anything to enable SmartyStreets, there are settings of which you should be aware:

- **Acceptable DPV Code** - This setting determines the acceptable quality match for standardizing an address. You can find all of the options on the [SmartyStreets documentation site](http://smartystreets.com/kb/liveaddress-api/field-definitions#dpvmatchcode). The default setting is 'Y,S,D' which is a full or partial match.
- **Acceptable Precisions** - This setting is similar to the DPV code but is related to the required precision of the geocoding in order for it to be considered a successful match. You can find more information on the [SmartyStreets documentation site](http://smartystreets.com/kb/liveaddress-api/field-definitions#precision). The default setting, 'Zip7,Zip8,Zip9' determines a successful match if the address is matched at Zip+2 (e.g., 85383.23\_\_) or better.

If you'd like to make changes to the services used by Rock, you can under:  
Admin Tools \> Settings \> Location Services.  
There you'll see a list of services that Rock supports. Not every service supports both standardization and geocoding.

| Service Name | Description | Service Type | Cost |
| --- | --- | --- | --- |
| SmartyStreets | SmartyStreets is the default solution because of their high-quality results for US addresses and free license for the Rock community. [Find out more on their website](http://smartystreets.com/). | Address Standardization & Geocoding | Free |
| StrikeIron | StrikeIron provides a paid option for geocoding data. You can find more information on [their website](https://www.strikeiron.com/product-list/address/us-geocode-information/). | Geocoding | Must request a quote |

# Want Even More Options?

If you have a developer handy, you can even write your own location service provider to add to the list.

# Maintaining Locations

Locations are used in different contexts so there are different ways you might change a location's details. If it's a family's address on the *Person Profile* page then hover your mouse over the address and click on the icon that appears to the right. If it's a named location, you can adjust it by navigating to Admin Tools \> Settings \> Named Locations as described above.

Wherever you access a location, you'll generally be able to edit the same common fields (e.g., Address Line 1, City, State). However, there are some configuration options that are specific to the context of the location. For instance, below is an example of a *Named Location*. Here you can provide a *Parent Location*, a *Location Type* or an *Image*. But you won't see those options when you're editing a family's address or a group's meeting location. Keep this in mind as we cover the location configuration options pictured below.

![Named Location Configuration](https://rockrms.blob.core.windows.net/documentation/Books/9/1.18.0/images/named-location-configuration-v18.png)

Named Location Configuration

