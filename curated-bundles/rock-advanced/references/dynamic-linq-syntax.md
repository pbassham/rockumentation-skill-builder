---
description: "Use when writing Dynamic LINQ queries for Entity Search in Rock API v2 or Lava Entity Commands with Where, Select, Grouping, and Ordering expressions"
source: "https://community.rockrms.com/developer/dynamic-linq-syntax"
sourceLabel: Dynamic LINQ Syntax
---
> **Path:** Dynamic LINQ Syntax

# Dynamic LINQ Syntax

## Dynamic LINQ Syntax

**Note:** Multiple Rock features use the **Dynamic LINQ** library along with several Rock-specific methods and expressions. For more details on LINQ syntax, visit the [Dynamic LINQ documentation](https://dynamic-linq.net/).

When you need to use LINQ syntax to write an Entity Search for the API v2 or a Lava Entity Command, please use the following conventions.

## Entity Search

If you're used to writing Lava queries, shifting to `LINQ` might feel like learning a new dialect. Both approaches help you refine and retrieve data, but LINQ follows a different structure and set of conventions. In this chapter, you'll get a clear look at what sets them apart so you can make the switch smoothly and confidently.

**Note:** You can use the **Model Map** page in Rock to explore each entity and its model properties. Navigate to **Admin Tools \> Settings \> Model Map**, then select a model like CRM and choose an entity such as Person. This reveals fields like `Guid`, `Age`, and `AgeClassification`, giving you insight into the data available for workflows, Lava, or Entity Search.

**Expressions:**

- [Where](#where)
- [Grouping](#grouping)
- [Select](#select)
- [Select Many](#selectmany)
- [Ordering](#ordering)

## Where

The where expression allows us to refine the results based on their properties or attributes.

**Example:** Return people with an attribute value of "Employer" whose last name is "Decker" or "Marble"

PersonAttributeValues.Any(pa =\> pa.Key == "Employer" && pa.Value != "")
&& (LastName == "Decker" || LastName == "Marble")
  See full query

###### Entity Type: Person

**Where**
```
PersonAttributeValues.Any(pa => pa.Key == "Employer" && pa.Value != "")
&& (LastName == "Decker" || LastName == "Marble")
```
**Grouping**
```
Disabled
```
**Select**
```
new (
    NickName,
    LastName,
    PersonAttributeValues.FirstOrDefault(pa => pa.Key == "Employer")
                         .Value as Employer
)
```
**Select Many**
```
Disabled
```
**Ordering**
```
Disabled
```
    

**Example:** Returns all active small groups

```
GroupTypeId == 25 && IsActive == true
```
See full query

###### Entity Type: Group

**Where**
```
GroupTypeId == 25 && IsActive == true
```
**Grouping**
```
Disabled
```
**Select**
```
new( Name, Description )
```
**Select Many**
```
Disabled
```
**Ordering**
```
Disabled
```
    

**Note:** This expression behaves much like the where parameter used in Lava Entity Commands. Don’t get this confused with the *where filter* block in Lava—they are different. The **Filter** is for keys and values. The **Parameter** is for refining results based on their properties or attributes.

| Operator | Meaning |
| --- | --- |
| \== | Equal to |
| != | Not equal to |
| \> | Greater than |
| < | Less than |
| \>\= | Greater than or equal to |
| <\= | Less than or equal to |
| && | Conditional logical AND operator |
| \|\| | Conditional logical OR operator |
| ! | Conditional logical NOT operator |
| .StartsWith("") | Starts With |
| .EndsWith("") | Ends With |
| .Contains("") | Contains |
| .IsInDataView(5) | Checks if the entity is in a Data View with an Id of 5. |
| .IsFollowed() | Checks if the entity being searched for is followed by the current person. |

**Note:** Use `@CurrentPersonId` to customize expressions for the person currently making the request. This lets you filter items based on the currently logged-in person. The value will be `NULL` if no one is logged in.  
**Example:** Returns groups where the logged-in person is a leader:  
`Members.Any(gm => gm.GroupRole.IsLeader == true && gm.PersonId == @CurrentPersonId)`

## Grouping

Group results by field. Once grouped, the result is no longer flat — you're working with grouped objects.

**Example:** Group by age

```
Age
```
See full query

###### Entity Type: Person

**Where**
```
Age != null
```
**Grouping**
```
Age
```
**Select**
```
Select(p => new ( p.Age, p.FirstName, p.LastName))
```
**Select Many**
```
Disabled
```
**Ordering**
```
Disabled
```
    

**Note:** When you use the `Grouping` expression on your data, it’s nested inside a new group layer. To access individual items, you’ll need to refer back to the entity using syntax like `Select(g => new ( g.FirstName, g.LastName ))` or `Select(p => new ( p.FirstName, p.LastName ))`.

## Select

Shape the output to only the fields you want. Use `new ()` to select specific fields from the current entity.

**Example:** Select basic fields

```
new ( FirstName, LastName, BirthMonth )
```
See full query

###### Entity Type: Person

**Where**
```
BirthMonth != null
```
**Grouping**
```
BirthMonth
```
**Select**
```
Select(p => new ( p.FirstName, p.LastName, p.BirthMonth ))
```
**Select Many**
```
Disabled
```
**Ordering**
```
Disabled
```
    

**Example:** Select nested and renamed fields

```
new (
    NickName,
    LastName,
    PersonAttributeValues
        .FirstOrDefault(pa => pa.Key == "Employer")
        .Value as Employer,
    new (
        ConnectionStatusValue.Id,
        ConnectionStatusValue.Value
    ) as ConnectionStatus
)
```
See full query

###### Entity Type: Person

**Where**
```
PersonAttributeValues.Any(pa => pa.Key == "Employer" && pa.Value != "")
&& (LastName == "Decker" || LastName == "Marble")
```
**Grouping**
```
Disabled
```
**Select**
```
new (
    NickName,
    LastName,
    PersonAttributeValues
        .FirstOrDefault(pa => pa.Key == "Employer")
        .Value as Employer,
    new (
        ConnectionStatusValue.Id,
        ConnectionStatusValue.Value
    ) as ConnectionStatus
)
```
**Select Many**
```
Disabled
```
**Ordering**
```
Disabled
```
    

## Select Many

Make a child entity the root item. This is helpful for working with nested data.

**Example:** Returns all group members, and the person correlated with each member.

```
Members
.Select(gm => new (
  gm.Person.FirstName,
  gm.Person.LastName,
  gm.Person.Age
))
```
See full query

###### Entity Type: Group

**Where**
```
Name == "Decker Group"
```
**Grouping**
```
Disabled
```
**Select**
```
Disabled
```
**Select Many**
```
Members
.Select(gm => new (
  gm.Person.FirstName,
  gm.Person.LastName,
  gm.Person.Age
))
```
**Ordering**
```
Disabled
```
    

**Note:** `Select` and `SelectMany` cannot be used together in the same expression. `SelectMany` replaces the root entity, making it incompatible with selecting specific fields.

## Ordering

Sort results by field. Sorting is ascending by default. Add `Descending` to reverse the order.

**Example:** Sort by birth year, then descending by birth month

```
BirthYear, BirthMonth Descending
```
See full query

###### Entity Type: Person

**Where**
```
BirthYear != null && BirthMonth != null
```
**Grouping**
```
Disabled
```
**Select**
```
new ( NickName, LastName, BirthYear, BirthMonth )
```
**Select Many**
```
Disabled
```
**Ordering**
```
BirthYear, BirthMonth Descending
```
    

**Note:** The word `it` refers to the current entity being returned in your expression. Use it to simplify your logic.  
**Example:** `it.IsInDataView(7)` checks if the current entity is part of the Data View with an ID of 7.

