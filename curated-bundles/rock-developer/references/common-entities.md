---
description: "Use when you need to understand Rock's Person entity structure, properties, and relationships for developer tasks"
source: "https://community.rockrms.com/developer/202\u002D\u002D\u002Dignition"
sourceLabel: 202 — Ignition
---
> **Path:** 

Now that we've got some of the inner workings out of the way, let's learn a little about each of the primary entities in Rock. This section might seem a bit tricky because entities often refer to other entities that we haven't explained yet -- please bear with us. If you read something that's not quite making sense, just keep reading and it should become clear.

Note

If you think we've missed the mark trying to explain something, please let us know. Use the little megaphone "Improve" feature (available online on the right side of the page) and give us the details on how you might write it. We love it when you help us help everyone.

## Person

What can we tell you about this that you don't already know? This is a pretty straightforward entity except perhaps its relationship to the PersonAlias that we touched on in the last book. The PersonAlias is almost always the glue that connects other entities to the Person entity. You'll do well to not forget this tidbit.

Here the more commonly used properties you should consider when working with people in your code:

**FirstName, NickName, LastName, FullName, FullNameFormal, FullNameReversed:**

These are their various names in various formats. Many of these are virtual properties that are just computed from the first and last name properties.

**EmailPreference:**

Tells you whether when it's ok or not ok to use their email (ok, never, or no mass/bulk emails, etc.)

**BirthDay, BirthMonth, BirthYear:**

Of the date of birth. Sometimes you won't have the BirthYear (because it can be a sensitive topic for some people -- ahem.)

**GraduationDate:**

This is the date they will have completed their secondary schooling (not their higher education or vocational schooling). In the United States this is their High School graduation date.

**PhotoUrl:**

This is a URL to their photo or if no photo exists, it will be a URL to the generic male/female/child SVG image.

**RecordStatusValue:**

This is the status of their record. You know...whether they're active, inactive, or pending. This value is actually a DefinedValue which we'll explain in greater detail in the DefinedType DefinedValue section.

**IsDeceased:**

A Boolean flag that would indicate they are deceased.

**ConnectionStatusValue:**

This tells you the nature of their connection with your organization. This is also a DefinedValue which comes from the list of possible options of the Connection Status DefinedType.

**PrimaryAlias:**

This is the person's primary PersonAlias.

**Aliases:**

A collection of all of the person's PersonAlias records. This collection slowly builds over time as a person's duplicate records are merged together.

Some properties are not required, so keep in mind you may not have this data for some people:

**Email:**

The person's email address.

**PhoneNumbers:**

A collection of their PhoneNumber entities.

**Users:**

A collection of UserLogin entities for the person. Similar to the Aliases, a person can have one or more UserLogins as their duplicates records are merged.

Here are a few very handy methods you can use on a person or via the Person class:

**GetAnchorTag(...):**

This builds a HTML anchor/link tag to the person's profile. You just need to pass it the URL to Rock's root. You'll see this commonly called like this: `GetAnchorTag( ResolveRockUrl( "/" ) )`

**GetEmailTag(...):**

This builds an HTML email anchor tag for sending an email to the person through Rock’s communication system. The HTML will also note whether or not the person has an email address, allows email, allows bulk emails, etc.

**GetPersonPhotoImageTag(...):**

This will build the markup necessary for a photo of the given person or person alias.

```
// Get the HTML for the person’s photo as a 50x50 image.
lPersonIconHtml.Text = Person.GetPersonPhotoImageTag( aPersonAlias, 50, 50 );
```

**GetHomeLocation():**

This method makes it trivial to fetch a person’s home address:

```
var homelocation = person.GetHomeLocation();
```

Note

We don't want to bore you to death by listing out every single property a Person or the other entities have. You can find the complete list in the Model Map block under Power Tools which shows the Rock model entities. Additionally, there is now a REST "API Docs" reference (found under your Rock system's Power Tools) which shows you all entities that have REST endpoints you can use with your custom code.  

## Attributes

Before we move on to the next entity, we should mention one very important thing: Attributes. Attributes can be tied to any entity, which means you can track specific values for any instance of that entity. For the Person entity, you'll notice under Admin Tools \> General Settings we set up the Person Attributes page. This lets you add/manage custom attributes for the Person entity.

### Loading Attribute Values

Before you try to access an entity's attribute values **you must first load the attributes** as seen in this example:

```
person.LoadAttributes();
string personAbilityLevel = person.GetAttributeValue( "AbilityLevel" );
```

### Saving Attribute Values

Before you save an entity's attribute values **you have to load the attributes** as seen in this example:

```
group.LoadAttributes( rockContext );
// After you’ve loaded the attributes... you can set and save values
group.SetAttributeValue( "Topic", smallGroupTopicDefinedValue.Guid.ToString() );
group.SaveAttributeValues( rockContext );
```

# Group

Groups represent collections of people. Serving teams are groups, as are home and neighborhood "Small Group" groups. In fact, as you will read below, you will see that security roles and families are groups too.

Groups will always have a Name and a GroupType. There are all kinds of GroupTypes in Rock. Your code will use this to distinguish and handle things differently for different types of groups. (Read more about GroupTypes below.)

Unless it is a top level group, it will probably have a ParentGroup, and unless it's a leaf group, it will have a Groups property which holds the collection of its child groups. A group will also generally have a Members property which holds a collection of GroupMember entities, and will sometimes have a GroupLocations property that holds a collection of locations (GroupLocation) associated with the group.

The rest of the properties are pretty self-explanatory too.

## Code Recipes

Here are a few code recipes for some typical situations you may be in...

When adding a new person, if you also wish to create their new family (group) too, you can use the PersonService's handy SaveNewPerson() method. It will return the newly created group in case you want to do something with it.

```
// once you have your person object setup...
var familyGroup = PersonService.SaveNewPerson( person, rockContext, campusId, false );
```

When adding a person to a group you will usually want to set their group member status and the role that is the default for that particular group type.

```
// Adds a person (using an Id) to a group with the default role.
GroupMember groupMember = new GroupMember
{
    PersonId = personId,
    GroupMemberStatus = GroupMemberStatus.Active,
    GroupRoleId = aGroup.GroupType.DefaultGroupRoleId.Value
};
aGroup.Members.Add( groupMember );
```

Listing all addresses of a group:

```
var html = new StringBuilder();
var groupId = 68;
var group = new GroupService( new RockContext() ).Get( groupId );
foreach ( var groupLocation in group.GroupLocations )
{
    var location = groupLocation.Location;
    html.AppendFormat( "<li>{0}{1}{2}<br>{3}, {4} {5}</li>",
        location.Street1,
        (string.IsNullOrEmpty(location.Street2) ? string.Empty : "<br>"),
        location.Street2,
        location.City,
        location.State,
        location.PostalCode );
}

lList.Text = string.Format( "<ul>{0}</ul>", html.ToString() );
```

## GroupType

Every group has a specific group type. The group type establishes attributes and has properties that helps control part of the group's behavior. For example, any groups that are of type "Check in by Grade" will have a "Grade Range" attribute which is inherited from that group type. For an example of this in action (controlling behavior), refer to the check-in related blocks which use a group's GroupTypePurposeValue to decide whether or not to show/use a particular group for check-in purposes.

*Group Types will always have:*

**Name:**

The name by which the group is known.

**GroupTerm:**

This defines the term used to describe groups of this type. Examples are: group, community, class, family, etc.

**GroupMemberTerm:**

This is the term used to describe the member. Examples are family member, team member, member, employee, etc.

*Group Types may have:*

**AllowMultipleLocations:**

Boolean that controls whether or not these groups are allowed to have multiple locations.

**DefaultGroupRole:**

The default role that a new member should have when placed into this group type.

**InheritedGroupType:**

If set, indicates which GroupType it inherits settings and properties from.

**ShowInGroupList**:

Indicates whether these groups are shown in GroupList blocks.

**ShowInNavigation:**

Indicates whether these groups are shown in navigation (such as TreeViews and menus).

**TakesAttendance:**

Flag that indicates whether or not this type supports taking attendance.

**SendAttendanceReminder:**

Flag that indicates if an attendance reminder should be sent to group leaders.

## GroupMember:

A group member is the entity that connects a person and a group. It holds any attribute values the member has and a property that points to the actual group and person instances.

**Group:**

The group to which the person belongs.

**Person:**

The person who is in the group.

**GroupRole:**

The role the person has within the group (leader, member, etc.). These come from the GroupType and are configurable.

**GroupMemberStatus:**

Indicates whether the person is Inactive (0), Active (1), or Pending (2). This is an enum in Rock.

### Code Recipes:

Adding a person to a group:

```
var groupMemberService = new GroupMemberService( rockContext );
var groupMember = new GroupMember();
groupMember.PersonId = person.Id;
groupMember.GroupId = group.Id;
groupMember.GroupRoleId = groupRoleId.Value;
groupMember.GroupMemberStatus = GroupMemberStatus.Active;
if ( groupMember.IsValid )
{
    groupMemberService.Add( groupMember );
    rockContext.SaveChanges();
}
```

It's rather important that you remember to set the group member's role and status as seen above.

## GroupLocation:

This holds all the location details for a group. Examples could include a Person/Family's address, a Business' address, a room where a Bible study meets, etc. Pretty much any place where a group of people meet or where they are located.

**Group:**

The group to which the address belongs.

**Location:**

The postal/mailing/geographical details for the address. This is another object class described in the next section.

**GroupLocationTypeValue:**

This will be one of the values from the Location Type DefinedType for Groups (representing either Home, Meeting Location, Work, or Previous Address).

**Schedule:**

The date/time details about when the group is at that location.

## Location:

A location could be a street address, building, floor, room, kiosk location, etc. A location is also stackable/hierarchical. For example, for a church's campus can have multiple buildings or facilities, each building can be multi story and a story can have multiple rooms.

**Name:**

The common name the location is known by.

**CampusId:**

The Id of the location's campus.

**ParentLocation:**

This will be another location that contains this location. If the location is a campus, this value will be null.

**LocationTypeValueId:**

This will be one of the Id values from the Location Type DefinedType (representing either Campus, Building, or Room).

**Street1:**

The first line of the mailing address.

**Street2:**

The second (optional) line of a mailing address.

**City:**

The city.

**State:**

The state.

**PostalCode:**

The Zip/postal code of the mailing address.

**Country:**

The optional value indicating the country of the address.

**GeoPoint:**

The DbGeography object that holds the latitude and longitude of the location. This will be null if the location is a GeoFence.

**GeoFence:**

A DbGeography object that holds the set of coordinates that make up the fence (or perimeter) contains the location.

**Latitude:**

If it's a GeoPoint, this will give you the latitude of the point.

**Longitude:**

If it's a GeoPoint, this will give you the longitude of the point.

**GeocodeAttemptedResult:**

The resulting code given by the service when the geocode took place. This depends on the service. For example, SmartyStreets will use their "precision" result described here: [https://smartystreets.com/docs/address](https://smartystreets.com/docs/address)

**GeocodeAttemptedDateTime:**

The date the geocoding took place.

**GeocodeAttemptedServiceType:**

The name of the service that performed the geocoding.

**StandardizeAttemptedDateTime:**

Represents when the most recent address standardization attempt was made. If this is not applicable to this location, or if the address has not been standardized, this value will be null.

**StandardizedDateTime:**

The date and time that the Location's address was successfully standardized.

**StandardizeAttemptedServiceType:**

The component name of the service that last attempted to standardize this Location's address.

**StandardizeAttemptedResult:**

The result code that was returned by the address standardization service.

## Campus:

This entity represents the physical or logical site where the organization holds its activities. For multi-site organizations there should be a campus record for each site. Many of the primary entities in Rock can be tied to either a single or multiple campuses.

**Name:**

The name of the campus.

**Location:**

The actual geographical details about the campus.

**PhoneNumber:**

The main, public office phone number for the campus.

**ServiceTimes:**

The delimited data you put in here is primarily intended to be displayed on your campus service time's web page. It's not actually structured data – for that, use the Schedule entity.

### Single Campus Special Considerations:

Starting with Rock v10, when a Rock system has only 1 campus defined, we want to ensure that no one using that system has to worry about seeing or picking that single campus. We want the system to seamlessly just use that single campus and never really expose it (except in very rare, specific places).

## Schedule:

This holds the date and time details for some sort of event. It is used with the check-in system, the group locator system, and the event calendar.

**Name:**

A friendly name for the schedule.

**iCalendarContent:**

This is the iCal representation of the date/time. Since iCal is quite sophisticated, you may wish to get the full DDay.iCal.Event object using the `GetCalenderEvent()` method. From that object you can programmatically access the properties of the schedule.

**EffectiveStartDate:**

The date that the schedule becomes active.

**EffectiveEndDate:**

The date that the schedule becomes inactive.

**WeeklyDayOfWeek:**

This is the day of the week that the weekly item takes place.

**WeeklyTimeOfDay:**

This is the time of day that the weekly item take place.

Note

DDay.iCal InfoAlthough this project has been moved to a new code base, you may still find the examples and information about iCal from this old repository useful, namely the Event class.  

## Role

This is a special entity that represents a security role and has a collection of users that have the role. Behind the scenes its data is stored in the Group and GroupMember tables and it is primarily used by Rock’s security system including the Authorization class.

A role will have:

**Name** \- The Role class also has a method that is used to quickly determine if the given person has the role:

**IsPersonInRole** \- Returns true if the person is in the role; false otherwise..

## DefinedType & DefinedValue

A DefinedType is a dictionary of mostly-unchanging values for a particular thing in Rock. The thing's individual item values are referred to as DefinedValues. Therefore, if Marital Status was the DefinedType, then its DefinedValues are Single, Married, Unknown, Widowed, etc.

Several classic examples of DefinedTypes are Phone Type, Shirt Sizes, Small Group Topic, Countries, etc.

Defined Values can be categorized, ordered and can be furthered specified by a FieldType. And, of course they can have Attributes which means you can expand on them quite a bit. Attributes and AttributeValues are covered in the next chapter.

The benefit of managing these values in this way is that it avoids having to create new Entity types for each defined type/value that you want to create. Similar to attributes, these can be created as the need arises without having to change the Rock core or add a plug-in just to provide additional lookup data.

If you are looking for a good case study showing how far you can go with the DefineType and DefinedValue, check out the DISC Results DataType. It has nine attributes of varying datatypes and they are used programmatically by the DiscResults block.

## Category

A category is another fairly generic entity type in Rock which can be used to... well... categorize things. Each category will belong to one Entity type, and categories can be created in a parent-child hierarchy as well as ordered.

![Example of Prayer Request Categories](https://community.rockrms.com/GetImage.ashx?Id=67456)

There is even a Categories block in Rock that can be configured and bound to any Entity in order to manage categories for that entity.

![Example of Managing Prayer Request Categories](https://community.rockrms.com/GetImage.ashx?Id=67457)
