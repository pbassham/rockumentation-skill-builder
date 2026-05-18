---
description: Use when storing person references in custom data models to understand why PersonAlias IDs should be used instead of Person IDs
source: "https://community.rockrms.com/developer/101---launchpad"
sourceLabel: 101 — Launchpad
---
> **Path:** 

Over the course of time, duplicate person records happen and then they're merged. Because of this, avoid storing the *Id* of a Person. Instead, use the Id of their PersonAlias. In other words your custom data models should reference the PersonAlias and not the Person object. PersonAlias records will always exist (even after a merge) and each one has a PersonId which points to the correct Person.

Consider this example where code is referencing PersonAlias Ids 100 and 101 which point to two Tom Miller records with Person Id 16 and 17, respectively.

*A representation of two duplicate person records and their aliases.*

| Your Reference | PersonAlias Id -\>Person Id | Person (Id) |
| --- | --- | --- |
| 100 | 100 -\> 16 | (16) |
| 101 | 101 -\> 17 | (17) |

**Person (Id) = (16)**

![](https://community.rockrms.com/GetImage.ashx?Id=67449)

**Person (Id) = (17)**

![](https://community.rockrms.com/GetImage.ashx?Id=67447)

After the two Tom Miller records are merged, the PersonAlias references are intact and point to the Tom Miller whose PersonId is 16.

*A representation of the person records and their aliases after a merge.*

| Your Reference | PersonAlias Id -\>Person Id | Person (Id) |
| --- | --- | --- |
| 100 | 100 -\> 16 | (16) |
| 101 | 101 -\> 16 |  |

**Person (Id) = (16)**

![](https://community.rockrms.com/GetImage.ashx?Id=67450)

Note

The fact that person Id 16 survived the merge is somewhat arbitrary. It's based on the record that was selected as the 'primary' when they were merged. The important thing to note is this: if you were referencing 17 in your code, things would not be good.

So, in code, when you've got a person's alias id (aka AliasPersonId) and you need to find the person record you can use the PersonAliasService's `GetByAliasId( int aliasId )` method.

```
// use the PersonAliasService
var rockContext = new RockContext();
var personAliasService = new PersonAliasService( rockContext );

// get the PersonAlias record using one of their known aliasIds
var personAlias = personAliasService.GetByAliasId( 101 );

// the Id of the PersonAlias (which you will usually want to associate to another entity)
int id = personAlias.Id;

// the person's Person record
var person = personAlias.Person;
```
