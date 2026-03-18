> **Path:** Developer Codex > Coding Standards > Rules

# Rules

The following rules have been agreed to by all those who “Code for Core”: The Prime Directive First and foremost, follow the established patterns in the existing codebase. Don’t invent your own pattern.

**The Prime Directive**

> First and foremost, follow the established patterns in the existing codebase.

*Don’t invent your own patterns. If you have an alternative or newer pattern, bring it up to the DSD, who will bring it to the TA/TL to review.*

0\. Read this document quarterly.

1\. Do not break backward compatability unless instructed to do so.

2\. Always use RockDateTime instead of DateTime.

-   When producing DateTime values make sure to convert them to international ISO 8601 format.
    -   `RockDateTime.ToString("s");`
    -   `not` `RockDateTime.ToString();`
    -   Example:

![Correctly formatted RockDateTime](https://community.rockrms.com/GetImage.ashx?Id=66650)

![Correctly formatted RockDateTime using interpolation](https://community.rockrms.com/GetImage.ashx?Id=66651)

3. Thou shall not add optional parameters that change the signature of a method. This will break code compiled using the previous assembly. Instead, add the new method signature with the original one intact. Keep in mind that plugins do not get re-compiled as often as core.

4.  Never reference a grid column by its position in the collection of columns. Columns are always being added or removed and if columns are referenced by position, it’s likely the wrong column will be returned after an update is made to the grid. Instead, use the ColumnsOfType extension method to query for the correct column. For example, instead of this: `grid.Columns[3]`use something like this: `grid.ColumnsOfType<RockBoundField>().First( c => c.DataField == "BirthDate")`.  

5. Regarding Booleans

-   Boolean property field names should always ask a question that is answered by the value. For example, a boolean property to indicate if something is active should be named “IsActive” and not just “Active.” A boolean property to indicate if a category field should be displayed should be named “IsCategoryFieldVisible” and not “ShowCategoryField”.
-   (Apr 2022) \[For Obsidian components\] The default value must be `false` — and **the name should reflect a default value of 'false'** as the typical/normal setting. Examples:
    -   If a panel is normally hidden, then the name would be `IsPanelShown` with the default value of `false`.
    -   If a 'foo' option is normally enabled, then the name would be `IsFoo` `Disabled` with a default value of `false`.
    -   If a 'foo' option is normally disabled, then the name would be `IsFoo` `Enabled` with a default value of `false`.
    -   It is also OK for a property to use "Has" instead of "Is" as the prefix when it reads better.

6\. All Page Parameters (query string params) should be in Pascal Case (AccountId).

7\. When adding a new Field Type, it MUST be documented at [rockrms.com/workflowsandlava](http://rockrms.com/workflowsandlava)

8. When needing to persist configuration (Data Views, FieldTypes, etc.) do not use delimiters but instead use JSON.

9.  Use `private static readonly` for strings that may change.  

10.  Use `const` only for constants – for things that will never change such as our SystemGuid, SystemSetting, UserPreferences, etc. [Constants are baked-into referencing assembly’s IL](https://stackoverflow.com/questions/55984/what-is-the-difference-between-const-and-readonly)

11. All keys for personal settings will be well-known. If the scope of the setting is for a specific block, the key can be defined as a variable on the user control. If the setting will be used in several places then it should be defined as a const under ‘Rock > SystemKey > UserPreference.cs’.

12. All keys for system settings will also be well known and defined under ‘Rock > SystemKey > SystemSetting’.

13. When editing a string property on a model use <Rock:DataTextBox /> with the SourceTypeName and PropertyName attributes set to ensure proper validation with the model.

14.  The user should not need to reload the block to see the effects of block setting changes. Instead, be sure to affect these changes in the `Block_BlockUpdated` event. If you run across a block that did not implement this, fix it as you make edits. If you notice it and are not currently making edits please add an Asana task in the ‘[Technical Debt](https://app.asana.com/0/495431846745457/list)’ project.  

15.  When writing `.Where()` expressions in blocks, instead consider adding reusable expressions on the service. This article documents this well: [https://www.red-gate.com/simple-talk/dotnet/net-framework/giving-clarity-to-linq-queries-by-extending-expressions/](https://www.red-gate.com/simple-talk/dotnet/net-framework/giving-clarity-to-linq-queries-by-extending-expressions/)

![](https://community.rockrms.com/GetImage.ashx?Id=66652)

**Also, when writing .Where() expressions that mix &&’s and ||’s always group each type within parenthesis. This provides clarity as to the original intent rather than "it just happens to work". Here are some examples of what they should look like:**

![](https://community.rockrms.com/GetImage.ashx?Id=66653)

16. When writing a LINQ query that filters results against a list of elements \[*e.g.*, a query like “`.Where( p => personNameList.Contains( p.FirstName )`” and personNameList is a List<string>\] because this will result in a “WHERE IN” clause. Avoid situations where the number of elements causes the SQL query to become too complex. The upper bound of the number of elements you can include is not a hard and fast rule, but if it causes the size of the query itself to exceed the batch size limit it will result in an error (“The query processor ran out of internal resources and could not produce a query plan.”)

-   Batch Size Limit is 65,536 \* (network packet size, which defaults to 4k) [https://docs.microsoft.com/en-us/sql/sql-server/maximum-capacity-specifications-for-sql-server?redirectedfrom=MSDN&view=sql-server-ver15](https://docs.microsoft.com/en-us/sql/sql-server/maximum-capacity-specifications-for-sql-server?redirectedfrom=MSDN&view=sql-server-ver15)
-   If your list of elements comes from another query, consider using the query as to the basis of your `Contains()` match before calling `.ToList()` on the query. The practical effect of this is that Entity Framework will construct a SQL subquery rather than a very large WHERE IN clause with hard-coded elements.
-   If you cannot use the method above, you will need to find another workaround to avoid hitting the batch size limit, like breaking the query into smaller batches and reassembling the results in memory. Be sure you consider the performance ramifications of this approach carefully.

17. When defining Field Attributes for a Block (or Component, Job, etc), declare them vertically and assign the Properties of the Field, and not the constructor parameters. Also, define the Attribute Keys as constants in an AttributeKey private static class within the class that the field attributes are on. See the example in the StarkDetail block. It should look something like this

![](https://community.rockrms.com/GetImage.ashx?Id=66654)

18. When adding large strings to field attributes create an Attribute Strings region and define a private const string to use for the long string.

![](https://community.rockrms.com/GetImage.ashx?Id=66655)

19\. If you are breaking field attributes into multiple categories, define the categories as constants in an AttributeCategory static class.

![](https://community.rockrms.com/GetImage.ashx?Id=66656)

20\. When your block uses page parameters, set those in a PageParameterKey private static class.

-   \[Fall 2024\] Favor using the simple entity string name (such as `Person`) when a page parameter can accept an Id, IdKey or Guid.
-   \[Fall 2024\] Retrieve the entity using the entity service layer method passing in the Site's DisablePredictableIds setting like this:
    -   `var entity = entityService.Get( key, !PageCache.Layout.Site.DisablePredictableIds );`

![](https://community.rockrms.com/GetImage.ashx?Id=66657)

21. When the block uses User Preferences, set those in a UserPreferenceKey private static class

![](https://sparkdevnetwork.gitbook.io/rock-developer-codex/~gitbook/image?url=https%3A%2F%2Fstatic.slab.com%2Fprod%2Fuploads%2F3xqnyj9y%2Fposts%2Fimages%2FZBr5bW101kCY54ddrAzz_QVj.png&width=768&dpr=4&quality=100&sign=b62ca2b&sv=2)

22. Now that you have AttributeKey, UserPreferenceKey and PageParameterKey consts defined, you can now use them in your code.

![<br>](https://community.rockrms.com/GetImage.ashx?Id=66658)

23\. When accessing a page parameter use:

-   PageParameter( PageParameterKey.Group )
-   instead of
    -   Request.Params\[ “Group” \] or PageParameter( “Group” )

24. When creating a link to a page use the LinkedPageUrl

```csharp
var pageParams = new Dictionary<string, string>();
pageParams.Add( PageParameterKey.PersonId, Person.Id.ToString() );
pageParams.Add( PageParameterKey.GroupId, group.Id.ToString() );
var url = LinkedPageUrl( AttributeKey.AttendancePageAttribute, pageParams );
```

25. Business logic methods that work with the database must be made on the service (e.g. GetImpliedGroup(). If there is a clear case for having it in the model add it there by calling the service. These must be approved by Developer Discussion.

26.  Always use braces – even for single line blocks (for, if/else, etc.). (Not convinced? - [read this](https://embeddedgurus.com/barr-code/2014/03/apples-gotofail-ssl-security-bug-was-easily-preventable/).)  

27. Try/Catch/Ignore pattern – When doing a try catch, ignoring the exception should be rare, but they should be formatted as follows.

![](https://community.rockrms.com/GetImage.ashx?Id=66659)

For example:

![](https://community.rockrms.com/GetImage.ashx?Id=66660)

28\. Early Out Ifs - Avoid IF statement nesting and use early returns in your methods. (Watch two minutes of [this video](https://youtu.be/ldqDpmMkXgw?t=322). )

29. Use variables to document the intent for complicated if conditions.

**For example, this if statement**

```csharp
if ( expirationMonth.Value < 1 ||
expirationMonth.Value > 12 ||
expirationYear <= DateTime.MinValue.Year ||
expirationYear >= DateTime.MaxValue.Year )
{
   // invalid month (or year)
   continue;
}
```

**Could be re-written as:**

```csharp
bool areMonthAndYearInvalid = expirationMonth.Value < 1 ||
expirationMonth.Value > 12 ||
expirationYear <= DateTime.MinValue.Year||
expirationYear >= DateTime.MaxValue.Year;
if ( areMonthAndYearInvalid )
{
   continue;
}
```

**The benefit is**: the variable name tells the other developers what the intent of the logic was supposed to be. You also no longer need the comment because the variable name is the comment.

30.  In general, use `var`. This is mostly for consistency (see The Prime Directive). It is OK to use the actual type name in some cases such as when the type cannot be inferred from the declaration.  

31. Only use obsolete methods when agreed upon by the technical lead. When doing so, use the standard \[Obsolete(…)\] and the custom \[RockObsolete( "1.X" )\] where 1.X means the item is obsoleted as of Rock 1.X.0 (aka X.0).

32. When Obsoleting a method, add the reason why as an engineering note above the method (see Documenting Code).

33\. Be mindful of which classes, properties, methods, etc you put public on. There are a lot of things that need to be public (RockWeb needs it, another DLL needs it, or a plugin developer would need it), but it can be not public, which allows us to avoid the worry of breaking changes. There are many cases where `internal`, `protected` or `private` is the better choice.  

34. Avoid using a Guid in a Where LINQ (e.g., g.GroupType.Guid == someguid , which has to do a JOIN) when you can use the Id (namely if it’s a cached item) as in g.GroupTypeId == thethingsId.

35. Don’t declare class variables on singletons. This is not thread-safe. Rock has several.

-   Anything that inherits from Rock.Extension.Component. There are lots of these in Rock! For example:
    -   Workflow Actions
    -   DataFilter
    -   DataSelect
    -   Financial Gateways
    -   Communication Mediums
    -   Communication Transports
    -   Badges
    -   SMS Actions
    -   Storage Providers
    -   And More!
-   FieldTypes - These are also singletons.
-   Cache types – These obviously have to have class variables, so be careful that they aren’t updated outside of the normal flush logic, and treat them as readonly.
-   If something must be a class variable, there are some ways to avoid the problem
    -   Make it a const or readonly (set the values in the constructor)
    -   Store it in HttpContext.Current.Items (see [https://github.com/sparkdevnetwork/rock/commit/b6989f562843165b9b87b8757600003a03ee2a22](https://github.com/sparkdevnetwork/rock/commit/b6989f562843165b9b87b8757600003a03ee2a22) for examples)
    -   Pass things around in parameters
    -   See some examples in [https://github.com/sparkdevnetwork/rock/commit/d82ea9420a1efbd88eea1d0af4478371acac6e12](https://github.com/sparkdevnetwork/rock/commit/d82ea9420a1efbd88eea1d0af4478371acac6e12)

36. Use the AttributeValuesContainer to display and edit attributes for an entity. See the example below:

> The benefit is: the variable name tells the other developers what the intent of the logic was supposed to be. You also no longer need the comment because the variable name is the comment.

![](https://community.rockrms.com/GetImage.ashx?Id=66661)

![](https://community.rockrms.com/GetImage.ashx?Id=66662)

![](https://community.rockrms.com/GetImage.ashx?Id=66663)

37. For OnRowDatabound type events do not create a new context and query for each row. The preferred method is to load up the data into a block-level List (or dictionary) and use that for the event. Creating a RockContext takes 0.12ms and the round-trip cost of each query is at least 0.5ms, this adds up fast depending on the dataset. If creating a List is not possible or practical then create a block-level context instead of creating a new one for each row. Make sure to add a developer note in those cases so no one tries to fix it later.

38. **Enums**: When creating these, avoid putting in the Rock.Model space but if you must, use the suffix \*Specifier. Example: RoleType**Specifier**
