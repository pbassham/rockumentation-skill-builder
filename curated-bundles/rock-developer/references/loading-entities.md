---
description: Use when loading existing entities from Rock database using Service classes and LINQ queries
source: "https://community.rockrms.com/developer/101\u002D\u002D\u002Dlaunchpad"
sourceLabel: 101 — Launchpad
---
> **Path:** 

Next let's look at how your block will fetch existing entities from Rock. For this we'll use a Service class for entity we're trying to load.

## Service Layer

Nearly every entity in Rock has a corresponding <EntityName\>Service class that handles loading (and storing) data from the database. When you use a service class, you'll need to give it a RockContext database context so it can communicate with the database.

The service classes will always have a `Queryable()` method for returning an IQueryable you can [query using LINQ](https://msdn.microsoft.com/en-us/library/vstudio/bb896342\(v=vs.100\).aspx), but they will often have other methods for loading specific sets of data.

## Examples

Let's use the PersonService class to illustrate a few ways you can get a person or a set of people.

```
// create a person service to perform different queries
var rockContext = new RockContext();
var personService = new PersonService( rockContext );

// a single person based on either their Id or Guid
var person = personService.Get( personId );
var person2 = personService.Get( personGuid );

// a collection of all people (including deceased)
var allPeople = personService.Queryable( includeDeceased: true );

// all males
var allMales = personService.Queryable().Where( p => p.Gender == Gender.Male )

// all people with the given email address
var matchingPeople = personService.GetByEmail( "ted.decker@rocksolidchurch.org" );

// all people with the matching partial phone number
var peopleWithPhone = personService.GetByPhonePartial( "1212" );
```

Certain service classes also return things other than collections of its corresponding entity. Some return a single entity, related entities, strings, or whatever is appropriate for that method. For example, the PersonService class has a method for getting a collection of families (Groups) for the given person. It also has methods for getting other things related to a person such as GroupMember, a GroupLocation, a PhoneNumber, etc.

```
// a collection of familes for the given "person" object
var familyGroups = personService.GetFamilies( person.Id );

// get the person's home phone number
var phone = personService.GetPhoneNumber( person, DefinedValueCache.Read( Rock.SystemGuid.DefinedValue.PERSON_PHONE_TYPE_HOME.AsGuid() ) );
```

Tip

If you'll be using many services, it is more efficient to create a single instance of a RockContext and just pass it along to each service you use.

## Eager Loading Properties

You know how some entities have properties that are actually other entities? For example, a Group has a property called `Members` which is a collection of GroupMembers and a GroupMember has a Person property. If you know you're going to be querying and using those properties, you'll see significant performance improvements if you pass the property names to the `Queryable()` method.

Consider this example where the group members and member's names will be used to decide which groups you are fetching. Notice how the properties are passed as an include string by comma delimiting them if there are more than one. Also notice how you can refer to sub-properties via dot notation.

```
var rockContext = new RockContext();
var groupService = new GroupService( rockContext );

var query = groupService.Queryable( "Members,Members.Person" );

// only select groups whose members have someone with a nick-name 
// that starts with the given value.
if ( !string.IsNullOrWhiteSpace( nickName ) )
{
    query = query.Where( g => g.Members.Any( m => m.Person.NickName.StartsWith( nickName ) ) );
}
```

## Read Only Queries

You should always add `AsNoTracking()()` on your queryable when you're not saving the collection back to the database. Doing so will significantly improve performance since it allows the Entity Framework to ignore certain bookkeeping activities. You'll need to include a `using System.Data.Entity;` to see this method.

```
var query = new PersonService( new RockContext() ).Queryable().AsNoTracking();
```

Just remember - you cannot do this if you are going to call `SaveChanges()` on the service.

## ToList() Your DataSource

Make sure to call `ToList()` on your queryable collection if you're going to bind it to a DataGrid or use it as a DataSource somewhere.

```
var query = new PersonService( new RockContext() ).Queryable();

gPeople.DataSource = query.ToList();
gPeople.DataBind();
```
