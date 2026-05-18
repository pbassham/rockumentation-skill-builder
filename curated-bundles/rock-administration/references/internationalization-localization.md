---
description: "Use when configuring international phone number formatting, country codes, and localization settings in Rock"
source: "https://community.rockrms.com/documentation/bookcontent/9/368"
sourceLabel: Rock Admin Hero Guide
---
> **Path:** Rock Admin Hero Guide > Internationalization & Localization

Internationalization & Localization

While true internationalization is beyond the scope of the Rock project, we do want to make Rock friendly for organizations outside of the United States. Each localization topic is discussed separately below.

# Phone Numbers

Post-install, Rock is configured to support only US-formatted phone numbers. When only one country is configured, the phone entry field looks like the example below.

![](https://rockrms.blob.core.windows.net/documentation/Books/9/1.17.0/images/international-phone-single-choice-v13.png)

Phone Entry With Single Country Configured

This field can easily be adjusted to support other countries. Simply add country specific formatting fields to the Admin Tools \> Settings \> Defined Types \> Phone Country Code defined type.

Each new entry should have the following values.

- **Value:** This is the country code that's used when dialing the number.
- **Description:** A short description of the phone formatting pattern.
- **Match Expression:** This is a [regular expression](http://en.wikipedia.org/wiki/Regular_expression) that's used to match the value you entered and apply the correct formatting to it. For instance, a seven-digit number in the US would match the formatting rule 555-5555 while a 10 digit number would match to (555) 555-5555.
- **Formatting Expression:** This string is used to apply the formatting to the matched number. Each grouping of numbers is represented by a $#.
![](https://rockrms.blob.core.windows.net/documentation/Books/9/1.18.0/images/international-phone-v18.png)

Phone Configuration

# Tip

You can find more information on the [formatting of phone numbers for specific countries on Wikipedia](http://en.wikipedia.org/wiki/National_conventions_for_writing_telephone_numbers).

We've also started a short list of best practices that have been shared by other Rock community members. You can check them out at [http://www.rockrms.com/InternationalPhones](http://www.rockrms.com/InternationalPhones).

Once you add a second country, the phone number field will change a bit in look. You'll notice the addition of a country code selection at the beginning of the input. The phone country code listed at the top of the defined type list will become the default country code, so in the screen shown above grab the hamburger grips to the left of each entry and drag them up and down the list as you desire.

![](https://rockrms.blob.core.windows.net/documentation/Books/9/1.17.0/images/international-phone-multiple-choice-v13.png)

Phone Entry With Multiple Countires Configured

# Formatting Phone Numbers on the Person Profile Page

There's a setting on the Bio block used on the *Person Profile* page that enables the country code to be prepended to all phone numbers. Enabling this setting may help the formatting for many international organizations.

# Dates & Times

We believe the .Net framework that Rock is built on should handle the formatting of dates and times correctly across regions. If you find an area of Rock that shows a date and/or time in a US format, please let us know by [opening a Rock issue](https://github.com/SparkDevNetwork/Rock/issues/new). Before opening a request, be sure to check the server's culture setting. This can be found on the ‘System Information’ dialog accessed from the Admin Toolbar at the bottom of each page.

# Currency

There really isn't any magic in Rock’s implementation of local currencies. Behind the scenes, currency is stored simply as a number. You can change the currency symbol displayed within the application under  
Admin Tools \> Settings \> Global Attributes | Organization Currency Code. The *Organization Currency Code* will be set to 'USD' (United States Dollars) for organizations in the United States.

# It’s Important To Understand...

Changing the currency code doesn’t have any other effect than changing the symbol in front of amounts when displayed. Be sure that your payment gateways are properly configured for the same currency as the symbol you're displaying, otherwise individuals will be incorrectly credited in their account.

If you're displaying currency in Lava, use the [FormatAsCurrency](https://community.rockrms.com/lava/filters/numeric-filters#formatascurrency) filter to return a numeric value with the appropriate symbol according to your *Organization Currency Code*.

# International Address Support

By default, Rock is set to accept and display US-formatted addresses. For most organizations operating inside the US, this will be the preferred configuration. Enabling support for international addresses is simple and remarkably powerful. Let’s take a look.

## Enabling International Addresses

The first step is to tell Rock that you would like to use international addresses when editing and viewing addresses.

1. Navigate to Admin Tools \> Settings \> Global Attributes.
2. Click the attribute *Support International Addresses* and choose *Yes* in the *Support International Addresses* field.

Rock will now display the inputs required for storing international addresses. It will also display addresses in an internationally-friendly way.

That was the simple part—now for the power!

## Configuring International Addresses

Unfortunately, we live in a world with few standards. Why the world hasn't accepted the mile is beyond us (5,280 feet in a mile makes perfect sense. Brilliant really...) Perhaps nowhere is this more evident than with addresses. Some countries have 'states', others 'provinces'; some 'zips', others 'postal codes'. Some put the zip first; others put it last.

Rock allows for a good deal of configuration on how international addresses are entered and displayed. With a few exceptions, the configurations for each country will need to be adjusted as they change on a seemingly daily basis. To complete the configuration, follow these steps.

1. Be sure that the countries you need are in the country list  
	Admin Tools \> Settings \> Defined Types \> Countries.  
	Also ensure that the correct abbreviation is in the *Value* field and the proper terms for City, State and Postal Code are correct. Also adjust the *Address Format* as needed to fit the requirements of the country. This format is what will be used to display addresses inside of Rock for the given country.![](https://rockrms.blob.core.windows.net/documentation/Books/9/1.18.0/images/defined-value-countries-v18.png)
	Country Configuration
2. Next, enter the *Address States* for the countries that will be commonly used. You’ll find these under  
	Admin Tools \> Settings \> Defined Types \> Address States.  
	When entering new states, be sure to match them to the country using the country dropdown.
	When entering states, you'll enter the state abbreviation (e.g., 'AZ') in the *Value* field and the full name (e.g., 'Arizona') in the *Description*. Both values are required.

Rock will now display the inputs required for storing international addresses. It will also display addresses in an internationally-friendly way.

# Country Preference

When showing a list of countries, Rock will put the country of the organization both at the top of the list and also in alphabetical order. This allows the most commonly-selected country to be an easy selection for your users.

# School Grades

Rock provides a customizable system for determining the educational grade/year an individual is in. You can read more about how this grade system works in the [Person & Family Field Guide](https://community.rockrms.com/documentation/BookContent/5#schoolgrades).

# Strategies for Full Localization

Full localization, including the support for multiple languages, is outside of the scope of the Rock project. However, it's possible for someone to fork Rock's source and localize the code and database contents. If you're interested in starting an internationalized port let us know and we'd be happy to help share your work.


---

## Things You Should Not Do {#things-you-should-not-do}

> **Path:** Rock Admin Hero Guide > Things You Should Not Do

Learning from the mistakes of others is a painless way to avoid making mistakes of your own. Based on real-life experiences within the Rock Community, we have some suggestions for things not to do.

# Creating Lots of Fake People

There’s no denying that it can be useful to have fake person records in your production Rock instance. There are times when you want to try something out, but don’t want to risk changing or damaging a real record. That’s understandable, and fairly common. However, having too many of these records can negatively impact things like reporting, communications and system performance. Eventually you’ll want to clean up, and that’s where you’ll run into some challenges.

If you must have fake records, then we strongly recommend that you keep the count as low as you possibly can. Adding even a single person impacts many different tables and data throughout Rock. From attributes to addresses, think of all the things you associate with people and families in Rock, and then consider having to identify and undo all those things. It’s like shooting a shotgun into a bale of hay and then having to find and remove all the pellets without missing any. It’s a manual process; we don’t have a magnet for you.

# Need Some Help?

Removing fake records is very challenging, to the point where you might need to hire outside help. If you do, our [partners](https://www.rockrms.com/partners) are ready and able to assist you. However, even for Rock experts this is a difficult and complex task, so we don’t expect our partners to guarantee every fake record can be removed entirely from all areas of your system. The only way to ensure a clean system is to avoid adding these records in the first place.

# Changing Blocks

It’s possible to inject custom CSS / JavaScript to modify Rock’s core blocks or to change the user interface on a block. While that may be tempting if you have the technical resources to do it, we advise against modifying blocks that ship with Rock or come from the Rock Shop. Trust us, your future self is screaming at you right now not to do this.

Injecting custom code dramatically complicates future troubleshooting and maintenance for yourself and others. The Rock Community is always willing to help and support you, but it’s very challenging if you’re using a different block than everyone else.

Also keep in mind that new Rock releases or fixes could overwrite or conflict with the changes you’ve made, possibly resulting in broken functionality. Rock upgrades assume that the core blocks are unchanged. There are ways to mitigate this risk, but they all require time and resources you wouldn’t otherwise need.

We have a few other suggestions for things to avoid with your website in our [Designing and Building Websites Using Rock](https://community.rockrms.com/documentation/bookcontent/14#thingsyoushouldnotdo) guide.

