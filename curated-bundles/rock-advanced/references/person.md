---
description: "Use when you need to retrieve or format a person's address by type (home, work, mailing, map location) with optional custom formatting templates"
source: "https://community.rockrms.com/Lava"
sourceLabel: Lava
---
> **Path:** Lava > Filters > Person

Rock is based on managing people, so it's not surprising that we have special Lava filters for the *Person* model.

 

# Address

Server: v2.0

Provides an address for the person you provide.

**Additional Details**

This filter has some input parameters:

- Address Type: Home, Work, etc.
- Format Template (optional) v3.0: An optional template parameter to help you format the address any way you wish. See notes below for details.

**Example:**

```
"CurrentPerson": {
    "FullName": "Ted Decker",
    "AnniversaryDate": '',
}
```

```
Home Address: {{ CurrentPerson | Address:'Home' }}
```

```
Home Address: 11624 N 31st Dr Phoenix, AZ 85029
```

**Note:**  

v3.0 In Rock v2.0 the 'Address' filter returns a simple string of the address. Rock v3.0 adds an optional template parameter to help you format the address any way you wish. Using this syntax, the Lava below would return 'Phoenix, AZ'.

```
{{ CurrentPerson | Address:'Home','[[City]], [[State]]' }}
```

Note the use of double-brackets to denote the address merge fields. The fields available to you include:

- Street1: 11624 N 31st Dr
- Street2: Apt12
- City: Phoenix
- State: AZ
- PostalCode: 85383
- Country: US
- FormattedAddress: 11624 N 31st Dr Phoenix, AZ 85029
- FormattedHtmlAddress: 11624 N 31st Dr<br\>Phoenix, AZ 85029
- GeoPoint: 33.593043,-112.126518
- Latitude: 33.593043
- Longitude: -112.126518
- Name: \[if named location, the name would be returned\]
- v13.0Guid: db3e790e-b43f-41ab-a79c-6c887d8e0f14

v4.0 Starting in Rock 4.0 you can also use two new address types 'Mailing' and 'MapLocation'. These will return the addresses that are configured specifically for the family's mailing address and location on a map.

v7.0 Rock v7 added the ability to alternately pass in a PersonId instead of a full person model.

v13.0 Rock v13 added the ability to get the Guid of the Location which is useful when you need to populate an Address or Location field type.

 

# AddSegment

Server: v14.1

Adds a person to one or more personalization segments.

**Additional Details**

Input:  
The input to this filter can be any valid person reference - a Person object, Guid or Id.

Available Parameters

1. The segment keys, specified as a comma-delimited list (required).

Output:  
This filter doesn't produce any output. It adds the person to the specified personalization segments.

**Example:**

```
Logged-In User:
Bill Marble
```

```
{% assign items = CurrentVisitor | PersonalizationItems:'Segments' %}
<p><strong>Before:</strong></p>
{% for item in items %}
    <br>{{ item.Type }} - {{ item.Key }}
{% endfor %}
<p><strong>After:</strong></p>
{{ CurrentPerson | AddSegment:'IN_SMALL_GROUP,HAS_GIVEN' }}
{% assign items = CurrentVisitor | PersonalizationItems:'Segments' %}
{% for item in items %}
    <br>{{ item.Type }} - {{ item.Key }}
{% endfor %}
```

```
<p><strong>Before:</strong></p>
    <br>Segment - ALL_MEN
<p><strong>After:</strong></p>
    <br>Segment - ALL_MEN
    <br>Segment - IN_SMALL_GROUP
    <br>Segment - HAS_GIVEN
```

**Note:**  

The person will be added to the specified segments with immediate effect. However, if they don't meet the criteria set for the segment they will be removed on the next run of the 'Update Personalization Data' job.

 

# Campus

Server: v5.0

Campus returns the person's campus. Since a person can have more than one campus (if they are a part of more than one family) the first campus will be provided. If you would like an array of all their campuses you can provide the 'All' extension.

**Additional Details**

If you would like an array of all the person's campus try using: {{ CurrentPerson | Campus:'All' }} This will return an array of campuses for the person.

**Example:**

```
"CurrentPerson": {
    "FullName": "Ted Decker",
    "AnniversaryDate": '',
}
```

```
{% assign personCampus = CurrentPerson | Campus %}
{{ CurrentPerson.NickName }}, your campus is {{ personCampus.Name  }}
```

```
Ted, your campus is Main Campus.
```

**Note:**  
**Pro Tip:** Just need the campus name. Try this: {{ CurrentPerson | Campus | Property:'Name' }}

 

# Children

Server: v6.0

Returns a list of children for the person

**Additional Details**

This Lava filter takes either a Person object or an integer that represents a PersonId.

**Example:**

```
"CurrentPerson": {
    ...
}
```

```
{% assign children = CurrentPerson | Children %}

<ul>
{% for child in children %}
    <li>{{ child.FullName }}</li>
{% endfor %}
</ul>
```

```
<ul>
    <li>Noah Decker</li>
    <li>Alex Decker</li>
</ul>
```

**Note:**  
Using the power of Lava arrays, you can combine this filter with other array filters to do things such as order the results by age:
```
{% assign childrenYoungToOld = Person | Children | Sort:'Age' %}
{% assign childrenOldToYoung = Person | Children | Sort:'Age', 'desc' %}
```

 

# DeleteUserPreference

Server: v7.0

Rock has the concept of saved settings / preferences for each user. This filter allows you to clean up the setting based on its key.

**Additional Details**

This Lava filter takes either a Person object or an integer that represents a PersonId.

**Example:**

```
"CurrentPerson": {
    ...
}
```

```
{{ CurrentPerson | DeleteUserPreference:'block-id-12-last-run-date' }}
```

```
none
```

 

# FamilySalutation

Server: v7.0

Returns the salutation of the family for a given person.

**Additional Details**

This Lava filter takes either a Person object or an integer that represents a PersonId.

**Example:**

```
"CurrentPerson": {
    ...
}
```

```
{{ CurrentPerson | FamilySalutation }}
```

```
Ted & Cindy Decker
```

**Note:**  

There are a couple of optional parameters you should be aware of.

1. Include Children: Should children be included on the list? The default is no (false).
2. Include Inactive: Determines if inactive people should be listed. By default inactive people are displayed but deceased are never shown. We default to show inactive as many families are entirely inactive and therefore no salutation would be returned... which is... confusing...
3. Use Formal Name: Should we use the nick name or first (formal) name By default informal names will be displayed.
4. Final Separator: What should the final separator be? By default the & character will be used, but you can change this to something like 'and' if you'd rather.
5. Separator: Commas not good enough for you? Well you can provide your own separator if you wish.

So using all the parameters would look like.

{{ 4 | FamilySalutation:true,false,true,'and','-' }}

And would return:  
Theodore Decker - Cynthia Decker - Noah Decker and Alexis Decker

 

# GeofencingGroupMembers

Server: v4.0

Returns a collection of group members whose groups geofence the person's map location address.

**Additional Details**

Parameters include:

- Group type id to filter on
- The group role id to filter on

**Example:**

```
"CurrentPerson": {
    ...
}
```

```
{% assign areaLeaders = CurrentPerson | GeofencingGroupMembers:'24','44'   %}

<ul>
{% for leader in areaLeaders %}
    <li>{{ leader.FullName }}</li>
{% endfor %}
</ul>
```

```
<ul>
    <li>Pete Foster</li>
    <li>Ted Decker</li>
</ul>
```

 

# GeofencingGroups

Server: v4.0

Returns a collection of groups that geofence the person's map location address.

**Additional Details**

Parameters include:

- Group type id to filter on

**Example:**

```
"CurrentPerson": {
    ...
}
```

```
{% assign areas = CurrentPerson | GeofencingGroups:'24'  %}

<ul>
{% for area in areas %}
    <li>{{ area.Name }}</li>
{% endfor %}
</ul>
```

```
<ul>
    <li>Area A</li>
    <li>Area B</li>
</ul>
```

 

# GetPersonAlternateId

Server: v8.1

Returns the person's alternate id.

**Additional Details**

You can pass in either a full person object or just a person id.

**Example:**

```
"CurrentPerson": {
    ...
}
```

```
Your person alternate id is: 
{{ CurrentPerson | GetPersonAlternateId }}.
```

```
Your person alternate id is: 18bf456-f2fc443.
```

 

# GetUserPreference

Server: v7.0

Rock has the concept of saved settings / preferences for each user. This filter allows you to retrieve the setting based on its key. This is a great way of remembering something about the user (like settings from the last time they ran something) for use when they return.

**Additional Details**

This Lava filter takes either a Person object or an integer that represents a PersonId.

**Example:**

```
"CurrentPerson": {
    ...
}
```

```
{{ CurrentPerson | GetUserPreference:'block-id-12-last-run-date' }}
```

```
4/6/2016
```

**Note:**  
While you might be tempted to overuse this feature as a personalized key value store, keep in mind that it does that store space and there is no UI for managing the values. Also, be careful not to overlap your keys.

 

# Group

Server: v5.0

Returns group member information if a person is in a specific group.

**Additional Details**

This filter has a couple of input parameters:

- Group Id: The Id of the specific group you are interested in.
- Group Member Status (optional): You can also pass in a specific group member status you're looking for ('Active', 'Inactive' or 'Pending'). The default if none is provided is 'Active'. You can also pass in 'All' if you want all statuses.

This filter returns group member records. Keep in mind you could get multiple records for a specific individual as it's possible they are in the same group more than once with different roles.

**Example:**

```
"CurrentPerson": {
    ...
}
```

```
{% assign groupMembers = CurrentPerson | Group:'29','All' %}

<ul>
{% for groupMember in groupMembers %}
    <li>{{ groupMember.Group.Name }} - {{ groupMember.GroupRole.Name }} ( {{ groupMember.GroupMemberStatus }} )</li>
{% endfor %}
</ul>
```

```
<ul>
    <li>General Group 1 - Leader ( Active )</li>
    <li>General Group 1 - Member ( Inactive )</li>
</ul>
```

 

# Groups

Server: v4.0

Returns a list of group member models of a specified group type that an individual belongs to.

**Additional Details**

This filter has a couple of input parameters:

- Group Type: The group type that should be used as a filter. Returned groups must be of this type.
- Group Member Status (optional): You can also pass in a specific group member status you're looking for ('Active', 'Inactive' or 'Pending'). The default if none is provided is 'Active'. You can also pass in 'All' if you want all statuses.
- Group Status (optional): By default the filter will only include active groups. Pass the string 'All' to include inactive groups as well. v9.2

This filter returns group member records. See the example below for how to access common properties.

**Example:**

```
"CurrentPerson": {
    ...
}
```

```
{% assign groupMembers = CurrentPerson | Groups:'29','All' %}

<ul>
{% for groupMember in groupMembers %}
    <li>{{ groupMember.Group.Name }} ( {{ groupMember.GroupMemberStatus }} )</li>
{% endfor %}
</ul>
```

```
<ul>
    <li>General Group 1 ( Active )</li>
    <li>General Group 2 ( Inactive )</li>
</ul>
```

 

# GroupsAttended

Server: v4.0

Returns a list of groups that a person attended within a provided group type.

**Additional Details**

**Example:**

```
"CurrentPerson": {
    ...
}
```

```
{% assign groups = CurrentPerson | GroupsAttended:'29' %}

<ul>
{% for group in groups %}
    <li>{{ group.Name }}</li>
{% endfor %}
</ul>
```

```
<ul>
    <li>General Group 1</li>
    <li>General Group 2</li>
</ul>
```

 

# HasSignedDocument

Server: v7.0

Allows you to determine if someone has already signed a document.

**Additional Details**

**Example:**

```
"CurrentPerson": {
    ...
}
```

```
{% assign hasSigned = CurrentPerson | HasSignedDocument:1 %}
{% if hasSigned %}
  {{ CurrentPerson.NickName }} has signed this document.
{% endif %}
```

```
Ted has signed this document.
```

**Note:**  

Can be passed either a Person object or an Id number of the person to check. The first parameter is the Id of the document template.

Two additional parameters are available that allow the specification of the return values. This is to allow for simplified lava when you just need to display a simple word difference.

```
Hi {{ CurrentPerson.NickName }}, you 
{{ CurrentPerson | HasSignedDocument:1,'have signed','need to sign' }} 
the waiver for camp.
```
Advanced formatted check:
```
Waiver status: <i class="fa {{ somePersonId | HasSignedDocument:1,'fa-check-square-o','fa-square-o' }}"></i>
```

 

# HeadOfHousehold

Server: v7.0

Returns the head of household of the provided person.

**Additional Details**

This Lava filter takes either a Person object or an integer that represents a PersonId.

**Example:**

```
"CurrentPerson": {
    ...
}
```

```
{% assign headOfHouse = CurrentPerson | HeadOfHousehold %}
{{ headOfHouse.FullName }}
```

```
Ted Decker
```

 

# IsInSecurityRole

Server: v14.0

Takes the given person object and tests if they are the given security role. Returns a boolean value of either true or false.

**Additional Details**

This filter operates on the given person object and has a single parameter:

- Group Id: The Id of the specific *security role* you are interested in.

If the given group Id is not a security role, it will return false but also log an exception.

**Example:**

```
"CurrentPerson": {
    ...
}
```

```
{% assign isInRole = CurrentPerson | IsInSecurityRole:18 %}
{% if isInRole == true %}
  <p>{{ CurrentPerson.FullName }} is in that Role.</p>
{% else %}
  <p>{{ CurrentPerson.FullName }} is not in that Role.</p>
{% endif %}
```

```
<p>Alisha Marble is in that Role.</p>
```

**Note:**  
This filter only applies to Security groups and will return false if the GroupId passed is not for a Security Role.

 

# LastAttendedGroupOfType

Server: v4.0

Returns the latest attendance record for a group of the type given.

**Additional Details**

StartDateTime

**Example:**

```
"CurrentPerson": {
    ...
}
```

```
{% assign lastAttended = CurrentPerson | LastAttendedGroupOfType:'25' %}

{{ CurrentPerson.NickName }} last attended the group '{{ lastAttended.Occurrence.Group.Name }}' on {{ lastAttended.StartDateTime | Date:'dddd, MMMM d, yyyy' }}.
```

```
Ted last attended the group 'Alisha Marble’s Group' on Wednesday, May 13, 2015.
```

 

# NearestCampus

Server: v16.0

Gets the nearest campus or campuses for a person's mapped location address.

**Additional Details**

This filter accepts the following parameters:

- Result Count (optional): The maximum number of campuses to return. If this parameter is not specified, the default value is 1.

**Example:**

```
{% assign campus = CurrentPerson | NearestCampus %}
The nearest campus to {{ CurrentPerson.NickName }} is: {{ campus.Name }}.

{% assign campusList = CurrentPerson | NearestCampus:2 %}
The two nearest campuses to {{ CurrentPerson.NickName }} are: {{ campusList | Select:'Name' | Join:', ' }}.
```

```
The nearest campus to Ted is: Main Campus.
The two nearest campuses to Ted are: Main Campus, North Campus.
```

**Note:**  
If a single result is requested, the filter returns a single Campus object. If more than 1 result is requested, an array of Campus objects will be returned in order of distance. The person's address must be geocoded.

 

# NearestGroup

Server: v4.0

Returns the nearest group of a specified group type to the person's mapped location address.

**Additional Details**

**Example:**

```
"CurrentPerson": {
    ...
}
```

```
{% assign nearestGroup = CurrentPerson | NearestGroup:'25'  %}

Your nearest group is the {{ nearestGroup.Name }}.
```

```
Your nearest group is the Decker Group.
```

 

# NearestGroups

Server: v18.0

Returns the nearest groups of a specified group type to the person's mapped location address.

**Additional Details**

To power this functionality, your Rock instance needs an active Google API key stored in the "Google API Key Server" global attribute. This is separate from the "Google API Key" attribute used for client-side JavaScript. The key must have the Routes API enabled.

This filter accepts the following parameters:

- **Group Type Id**: The group type to filter by.
- **Max Results** (optional): The maximum number of results to return. Defaults to 10.
- **Travel Mode** (optional): The filter can append the travel distance and travel time if you provide a mode of travel (drive, walk or bicycle). This requires that you have provided a Google Maps API key and that key has permissions to use the Routes API.
- **Consider Closest Location** (optional): Determines what to do if a group has more than one location. When set to true, the default, only the group's closest location will be returned. When false, all of the groups locations will be considered. This will have the effect of putting the group into the collection more than once.
- **Max Distance** (optional): The maximum distance to consider, in meters (1 mile ≈ 1,609.34 meters) .

The filter returns a collection of items with the following properties:

- **StraightLineDistanceInMeters**: The distance between the person and the group, in meters.
- **Group**: The group.
- **Location**: The group's location.

**Note:** If a group has multiple locations, each location will be evaluated independently. As a result, the same group may appear in the list more than once.

**Example:**

```
{% assign closeGroups = CurrentPerson | NearestGroups:25,5,'drive' %}

<ul>
{% for result in closeGroups %}
    <li>
        <strong>{{ result.Group.Name }}</strong>
        <br>{{ result.Location.Latitude }}, {{ result.Location.Longitude }}
        <br>{{ result.Location.Street1 }}
        <br>Distance: {{ result.StraightLineDistanceInMeters }}
        <br>Travel Time In Minutes: {{ result.TravelTimeInMinutes }}
        <br>Travel Distance In Meters: {{ result.TravelDistanceInMeters }}
    </li>
{% endfor %}
</ul>
```

```
<ul>

    <li>
        <strong>Gilbert Group</strong>
        <br>33.58622, -112.135094
        <br>11022 N 35th Dr
        <br>Distance: 2342 
        <br>Travel Time In Minutes: 5
        <br>Travel Distance In Meters: 2567
    </li>

    ...
</ul>
```

**Note:**  
While the most common input is a person, you can also use a PersonId or a specific latitude/longitude in the format '33.663092,-112.202615'. Use the `MetersToMiles` and `MilesToMeters` filters to help convert between meters and miles.

 

# Parents

Server: v4.0

Returns a list of the adults in the family of a specified person.

**Additional Details**

**Example:**

```
"CurrentPerson": {
    ...
}
```

```
{% assign parents = CurrentPerson | Parents %}
My parents are:
{% for person in parents %}
    <li>{{ person.FullName }}</li>
{% endfor %}
```

```
My parents are:
<li>Ted Decker</li>
<li>Cindy Decker</li>
```

**Note:**  

v7.0 Rock v7 added the ability to alternately pass in a PersonId instead of a full person model.

 

# PersonActionIdentifier

Server: v8.7

Creates a non-security type token that identifies a person and a corresponding action. This action is intended for use by developers.

**Additional Details**

The token that is created identifies a person and a corresponding action. It requires a corresponding block that understands how to decode these tokens using specific action names provided when the token was created.

This filter has one required input parameter:

1. Action: The name of an action that the corresponding block knows how to decode.

Here is the list of blocks that can decode these tokens:

- Assessment Blocks (Conflict Profile, DISC, EQ Inventory, Gifts Assessment, Motivators)
- Email Preference Entry
- Group Schedule Confirmation
- Photo Opt Out
- RSVP Response
- GetCommunication.ashx (communication viewer)

**Example:**

```
"Person": {
    ...
}
```

```
Your token is: 
{{ Person | PersonActionIdentifier: 'photo-opt-out' }}
```

```
Your token is: EAAAAEgOBBKHKHzZ7vg2Jl6mSJ!2fQsI6lz3QhqRsjoYp4EgKpdSkvE2gR2nG4yq6l6TJTKBVyJWQudZ!2sdfsfdfsOaj5yGsWNkk!3d
```

**Note:**  

It is intended for use with specific blocks that need to know who a person is and what action they are attempting to perform, but without authenticating the person to log them into the site.

The following is a list of blocks/items that can decode these tokens:

- Assessment Blocks (Conflict Profile, DISC, EQ Inventory, Gifts Assessment, Motivators)
- Email Preference Entry
- Group Schedule Confirmation
- Photo Opt Out
- RSVP Response
- GetCommunication.ashx

 

# PersonalizationItems

Server: v14.0

Returns an array of personalization items for the specified person and the current page context.

**Additional Details**

The input to this filter can be any valid person reference - a Person object, Guid or Id.

Available parameters:

1. The item types, specified as a comma-delimited list (optional;Segments|RequestFilters):
	- Segments = the personalization segments associated with this person.
		- RequestFilters = the request filters associated with the current page request.
	If this parameter is not specified, all item types are returned.

Output: A collection of personalization items with the following properties:

1. ID - the unique identifier of the personalization item
2. Type - the type of personalization item, either "Segment" or "Request Filter".
3. Key - the unique key that identifies the personalization item.
4. Name - the friendly name of the item.

**Example:**

```
URL:
http://rock.rocksolidchurchdemo.com?parameter1=true&parameter2=true

Logged-In User:
Ted Decker
```

```
{% assign items = CurrentVisitor | PersonalizationItems:'Segments,RequestFilters' %}
{% for item in items %}
    {{ item.Type }} - {{ item.Key }}
{% endfor %}
```

```
Segment - AllMen
Segment - InSmallGroup
Segment - NotYetBaptized
Request Filter - ViewingFromCollegeCampusIP
Request Filter - QUERY_2
```

**Note:**  

If the input cannot be resolved to a valid Person reference, only the request filters for the current page request will be returned in the results.

 

# PersonByAliasGuid

Server: v8.4

Returns a full person object from the Guid of a person alias.

**Additional Details**

**Example:**

```
"Campus" {
    "LeaderPersonAliasGuid": "b22fc07a-e359-8398-4b66-5a83e439f8f6"
    ...
}
```

```
{% assign campusLeader = Campus.LeaderPersonAliasGuid | PersonByAliasGuid %}

Hello {{ campusLeader.NickName }}!
```

```
Hello Ted!
```

 

# PersonByAliasId

Server: v4.0

Returns a full person object from the Id of a person alias.

**Additional Details**

**Example:**

```
"Campus" {
    "LeaderPersonAliasId": 234
    ...
}
```

```
{% assign campusLeader = Campus.LeaderPersonAliasId | PersonByAliasId %}

Hello {{ campusLeader.NickName }}!
```

```
Hello Ted!
```

 

# PersonByGuid

Server: v5.0

Returns a full person object from the Guid of the person.

**Additional Details**

**Example:**

```
"GroupMember" {
    "Person": {
        Guid: "8fedc6ee-8630-41ed-9fc5-c7157fd1eaa4"
    }
    ...
}
```

```
{% assign groupMemberPerson = GroupMember.Person.Guid | PersonByGuid %}

Hello {{ groupMemberPerson.NickName }}!
```

```
Hello Ted!
```

 

# PersonById

Server: v4.0

Returns a full person object from the Id of the person.

**Additional Details**

**Example:**

```
"GroupMember" {
    "PersonId": 234
    ...
}
```

```
{% assign groupMemberPerson = GroupMember.PersonId | PersonById %}

Hello {{ groupMemberPerson.NickName }}!
```

```
Hello Ted!
```

 

# PersonByPersonActionIdentifier

Server: v17.0

Retrieves a person using a generated action identifier and the corresponding action. The action should be the same one used when the token was created.

**Additional Details**

The filter uses a generated PersonActionIdentifier and the corresponding action to retrieve the details of the person for which the token was generated.

This filter has one required input parameter:

1. Action: The name of the action used when creating the token.

**Example:**

```
"PersonActionIdentifier": "EAAAAEgOBBKHKHzZ7vg2Jl6mSJ!2fQsI6lz3QhqRsjoYp4EgKpdSkvE2gR2nG4yq6l6TJTKBVyJWQudZ!2sdfsfdfsOaj5yGsWNkk!3d"
```

```
{% assign person = PersonActionIdentifier | PersonByPersonActionIdentifier: 'photo-opt-out' %}
Welcome {{ person.NickName }}
```

```
Welcome Bill
```

 

# PersonByPersonAlternateId

Server: v8.1

Returns a person from the provided alternate id.

**Additional Details**

**Example:**

```
"PersonAlternateId": "18bf456-f2fc443"
```

```
{% assign person = PersonAlternateId | PersonByPersonAlternateId %}

Hello {{ person.FullName }}!
```

```
Hello Ted!
```

 

# PersonImpersonationToken

Mobile: v1.0

Appends an impersonation token (with rckipid key) to the end of a URL. It's smart enough to handle URLs with and without query string parameters. If the URL is blank, it will return just the token itself.

**Additional Details**

This filter has optional input parameters:

1. Minutes (optional; defaults to 30 mins): The number of minutes that the token is good for.
2. Max Usage (optional; defaults to 1) : The number of times the token can be used.
3. PageId (optional) : In rare cases you may want the token to only be good for a specific page. NOTE: The page Id must exist otherwise it will not generate a token.

**Example:**

```
{{ 'https://rocksolidchurchdemo.com' | PersonImpersonationToken }}
```

```
https://rocksolidchurchdemo.com?rckipid=EAAAAEgOfZ6BLzZ7vg2Jl6mSJ!2fQsI6lz3QhqRsjoYp4EgKpdSkvE2gR2nG4yq6l6TJTKBVyJWQudZ!2bgxOaj5yGsWNkk!3d
```

 

# PersonTokenCreate

Server: v7.0

Creates a person token for a provided person.

**Additional Details**

This filter has optional input parameters:

1. Minutes (optional; defaults to the value of the *Person Token Expire Minutes* Global Attribute): The number of minutes that the token is good for.
2. Max Usage (optional; defaults to the value of the *Person Token Usage Limit* Global Attribute) : The number of times the token can be used.
3. PageId (optional) : In rare cases you may want the token to only be good for a specific page. A page route cannot be used here. NOTE: The page Id must exist otherwise it will not generate a token.

This is generally used in connection with the page parameter 'rckipid'.  
Example:  
?rckipid={{ Person | PersonTokenCreate }}

**Example:**

```
"Person": {
    ...
}
```

```
Your token is: 
{{ Person | PersonTokenCreate }}
```

```
Your token is: EAAAAEgOfZ6BLzZ7vg2Jl6mSJ!2fQsI6lz3QhqRsjoYp4EgKpdSkvE2gR2nG4yq6l6TJTKBVyJWQudZ!2bgxOaj5yGsWNkk!3d
```

**Note:**  

In the example we showed how you can pass in a person object to get a token. You can also optionally pass in a PersonId or PersonGuid.

**Full Usage:** (good for 30 days, or 3 uses, and only works on page 1543)  

```
{% assign token =  Person | PersonTokenCreate:43200,3,1543 %}
```
Note: Pass null to indicate using the default value.  
```
{% assign token =  Person | PersonTokenCreate:43200,null,1543 %}
```

 

# PersonTokenRead

Server: v7.0

Converts a person token to a person object.

**Additional Details**

This filter has optional input parameters:

1. Increment Usage (default false) : This would determine if the usage counter should be incremented by the reading of the token.
2. Page Id : In rare cases tokens are only good on specific pages. In these cases you'll need to provide the page id to use for the check.

**Example:**

```
{
    ... normally tokens would be read from the query string
}
```

```
{% assign token = 'Global' | PageParameter:'rckipid' %}
{% assign person = token | PersonTokenRead %}
{{ person.FullName }}
```

```
Ted Decker
```

**Note:**  
**Full Usage:**  
```
{% assign person = token | PersonTokenRead:false,1543 %}
```

 

# PhoneNumber

Server: v4.0

Provides a phone number for the person you provide.

**Additional Details**

This filter has some input parameters:

- Phone Type: The name of the phone type you want to fetch (such as Home, Mobile, Work as defined by the Phone Type Defined Value).
- Show Country Code (optional): By default the number's country code is not output but if you include an additional *true* parameter the country code will be shown.

**Example:**

```
"CurrentPerson": {
    "FullName": "Ted Decker"
    "PhoneNumbers":  [
        {
            Number - 6235555551
            NumberFormatted - (623) 555-5551
            NumberType - Home
        },
        {
            Number - 6235555552
            NumberFormatted - (623) 555-5552
            NumberType - Mobile
        },
        {
            Number - 6235555553
            NumberFormatted - (623) 555-5553
            NumberType - Work
        }
    ]
}
```

```
Mobile Number: {{ CurrentPerson | PhoneNumber:'Mobile' }}
```

```
Mobile Number: (623) 555-5552
```

**Note:**  

**Full Usage:**  

```
{{ CurrentPerson | PhoneNumber:'Home', true }}
```

v7.0 Rock v7 added the ability to alternately pass in a PersonId instead of a full person model.

 

# SetUserPreference

Server: v7.0

Rock has the concept of saved settings / preferences for each user. This filter allows you to save the setting based on its key and provided value. This is a great way of remembering something about the user (like settings from the last time they ran something) for use when they return.

**Additional Details**

This Lava filter takes either a Person object or an integer that represents a PersonId.

**Example:**

```
"CurrentPerson": {
    ...
}
```

```
{{ CurrentPerson | SetUserPreference:'block-id-12-last-run-date', '4/6/2016' }}
```

```
none
```

**Note:**  
While you might be tempted to overuse this feature as a personalized key value store, keep in mind that it takes database storage space and there is no UI for managing the values. Also, be careful not to overlap your keys.

 

# Spouse

Server: v7.0

Returns the spouse of the provided person.

**Additional Details**

This Lava filter takes either a Person object or an integer that represents a PersonId.

**Example:**

```
"CurrentPerson": {
    ...
}
```

```
{% assign spouse = CurrentPerson | Spouse %}
{{ spouse.FullName }}
```

```
Cindy Decker
```

 

# Steps

Server: v13.0

Returns a filtered list of steps that the person has engaged with.

**Additional Details**

This filter supports the following optional parameters:

- Step Program (optional): A step program identifier used to filter the steps. This value can be an Id or Guid (or 'all'), and returned steps must be related to this program.
- Step Status (optional): A step status identifier used to filter the steps. This value can be an Id, Guid, or Name (or 'all'), and returned steps must have this status.
- Step Type (optional): A step type identifier used to filter the steps. This value can be an Id or Guid (or 'all'), and returned steps must be related to this step type.

This filter returns step records. See the example below for how to access common properties.

**Example:**

```
"CurrentPerson": {
    ...
}
```

```
{% assign steps = CurrentPerson | Steps: '1','Complete' %}

<ul>
{% for step in steps %}
    <li>{{ step.StepType.Name }} ( {{ step.StepStatus.Name }} )</li>
{% endfor %}
</ul>
```

```
<ul>
    <li>Baptism ( Complete )</li>
    <li>Starting Point Class ( Complete )</li>
    <li>Small Group ( Complete )</li>
</ul>
```

 

# ZebraPhoto

Server: v4.0

Returns a person's profile photo data in ZPL format for use in Zebra printer labels. If the person has no photo, the default silhouette photo (adult/child, male/female) is used.

**Additional Details**

This filter has optional input parameters:

1. Size (optional): Specifies the width and height of the image in pixels. If not specified it will default to 395 which is good for a 300 dpi Zebra printer but possibly not for a 203 dpi printer. If using a 203 dpi printer try using a number like 150 or so.
2. Brightness (optional) v5.0: Specifies the brightness adjustment (0 to 1.99 fully white).
3. Contrast (optional) v5.0: Specifies the contrast adjustment (0 to 1.99).
4. Filename (optional): The filename that should be used when sending photo contents to the printer.
5. Rotate Degree (optional): The degree of rotation to apply to the photo. Valid values are 90, 180 or 270. v8.4

This filter will insert the image data into a property called "LOGO.PNG". You will still need to write additional ZPL code to specify the *placement* of the LOGO.PNG property onto the label.

**Example:**

```
"Person": {
    ...
}
```

```
^FD{{ Person | ZebraPhoto:'397',1.0,1.0,'LOGO',90 }}^FS
```

```
^FD^FS~DYR:LOGO,P,P,12246,,89504E470A50C317A8C32490DF5A6...90A9CD5B34A9B0FA2A842E095F5CE082^FD^FS
```

**Note:**  

When used with a check-in label, you will need to add a field to your label ZPL (such as `^FDPhoto^FS`) and a new Label Merge Field (with `{{ Person | ZebraPhoto:'397',1.0,1.0 }}`) so you can map them together in Rock's Check-in label editor. When Rock substitutes the "Photo" field with the Lava and executes it, the output shown in the example will be put into the label's ZPL stream with a filename of "LOGO" (or whatever you specified in the lava's optional input parameter). You will also need to specify the X,Y placement of the logo in your ZPL with the ^FO Field Origin command and a ^XG (Recall Graphic) name and extension with a value of LOGO.PNG as seen in this sample: `^FO25,68^XGR:LOGO.PNG,1,1^FS`

The brightness and contrast parameters need to be set to "1" (the default) in order for the generic silhouette images to print. If specified, both parameters need to have a leading digit, i.e. "0.5" instead of ".5". In order to specify rotation, all preceding parameters must be entered (as in the example above).

This Lava filter takes advantage of kind of ZPL injection technique whereby the opening ^FD (start of field data) is closed by the Lava output's ^FS (end field separator) command before the needed ZPL (~DYR:LOGO,P,P,...etc..) is added into the label data (as [described here](http://stackoverflow.com/questions/8818688/printing-png-images-to-a-zebra-network-printer)). Last, the Lava output adds a start of field data ^FD command to match your existing end of field data ^FS command.

Note: Prior to Rock v7 this filter used the E: (EPROM) storage location instead of R: (RAM). Therefore you will also need to replace the XGR: with XGE: in your ZPL for earlier versions of Rock.

