---
description: "Use when querying Rock entities like People, Groups, and Transactions with Lava parameters such as where, filtering, sorting, limiting results, or applying security settings"
source: "https://community.rockrms.com/Lava"
sourceLabel: Lava
---
> **Path:** Lava > Commands > Entity

So you may be wondering, "What's an entity?" An entity is simply a type of data that's stored in Rock. Things like People, Groups, and Financial Transactions are all entities.

Lava allows you to retrieve data from any entity using a simple and consistent pattern. For instance, to find all the Deckers you would use:

```
{% person where:'LastName == "Decker"' %}
    {% for person in personItems %}
            {{ person.FullName }} <br />
    {% endfor %}
{% endperson %}
```

Let's look at each line to unpack what's going on here.

- 1\. The first thing to note is the name of the Lava command 'person'. This tells Lava that we'd like to return people from our query. You can put any entity name here. Next we see our first parameter 'where'. The syntax used for parameters is:  
	  
	parameterName:'parameterValue'  
	  
	Note the use of the colon to separate the parameter name from the value. It's also important to wrap the parameter value in single quotes (double quotes won’t work as they are needed for determining expressions within the values (ala LastName == "Decker").
  
- 2\. Next we see the 'for' loop over the results. The iterator name is <entityName\>Items. As you'll see soon, you can change the default if you wish.
  
- 3\. On line 3 we see that we're printing the FullName of the person.
  
- 4\. Finally, we have the end of the entity command.

So that's querying a person. What about a group?

```
{% group where:'GroupTypeId == 25' %}
    {% for group in groupItems %}
        {{ group.Name }} <br />
    {% endfor %}
{% endgroup %}
```

See, we told you it was consistent.

# Parameters

We already saw the 'where' parameter in action, but we haven't even scratched the surface of what's possible. Let's jump in!

The id parameter takes precedent over the other selection parameters, specifically where, dataview, and dynamicparameters. If the id parameter is specified, the other selection parameters are ignored. Therefore it is not recommended to mix id with where, dataview, nor dynamicparameters in the same entity command.

We strongly recommend using the 'securityenabled' parameter to disable security when you're confident it is not needed. This will dramatically improve the performance of your Lava, especially when implementing pagination.

**Quick Links:**

- [where](#where)
- [id](#id)
- [ids](#ids)
- [dataview](#dataview)
- [entitysearch](#entitysearch)
- [sort](#sort)
- [limit](#limit)
- [offset](#offset)
- [dynamicparameters](#dynamicparameters)
- [iterator](#iterator)
- [count](#count)
- [securityenabled](#securityenabled)
- [expression](#expression)
- [lazyloadenabled](#lazyloadenabled)
- [include](#include)
- [select](#select)
- [selectmany](#selectmany)
- [groupby](#groupby)
- [prefetchattributes](#prefetchattributes)
- [disableattributeprefetch](#disableattributeprefetch)

## Where

The 'where' parameter allows us to filter the entities based on their properties or attributes. So if we wanted to search for people with the LastName (property) of "Decker" and the Position (attribute) of "Outreach Pastor" we would use:

```
where:'LastName == "Decker" && Position == "Outreach Pastor"'
```

To use a group's IsActive property in combination with the earlier query we would use:

```
where:'GroupTypeId == 25 && IsActive == true'
```

Pretty cool right?! But there's more! Our example above uses 'equal' but there are several other conditions you can use including:

| \== | Equal |
| --- | --- |
| != | Not equal |
| ^= | Starts with |
| \*= | Contains |
| \*! | Does not contain |
| \_= | Is blank |
| \_! | Is not blank |
| \> | Greater than |
| \>\= | Greater than or equal |
| < | Less than |
| <\= | Less than or equal |
| $= | Ends with |
| && | Conditional logical AND operator |
| \|\| | Conditional logical OR operator |

Think of the powerful queries you'll soon be writing!

There is one current limitation with the 'where' parameter, which is that it does not allow for nested or grouped conditions (think parentheses in the SQL 'where' clause). While we'll remove this limitation in an upcoming release, you'll see later there are some ways around this (we think you'll be very satisfied).

**Tip:** The `_=` and `_!` operators are special in that they ignore the right side of the expression and only evaluate the left side for null/blank. Example: `{% tag where:'OwnerPersonAliasId _= ""' %}` will return all tags where the OwnerPersonAliasId column is null (All Organization tags).

## Id

Sometimes you may want to query for entities, other times you'll know the exact entity you're looking for. With the 'Id' parameter you can specify the exact Id that you'd like.

```
{% person id:'3' %}
    {{ person.FullName }} <br />
{% endperson %}
```

By providing a single Id you can specify the exact entity (in this case a person) you're interested in. This example also shows another interesting tidbit. If your expression only returns a single value, you can drop the 'for' iterator and simply use the name of the entity. You're welcome to still use it if you'd like though.

v17.0 **Note:** When using this 'single-value' technique, if the entity command returns multiple items, the entity-named variable will be set to the first item in the list.

## Ids

Sometimes you might want to specify a list of Ids. In that case try:

```
{% person ids:'3,4,5,50' %}
    {% for person in personItems %}
        {{ person.FullName }} <br />
    {% endfor %}
{% endperson %}
```

## Data View

The `dataview` parameter limits an entity command to the records returned by a Rock Data View. It accepts an Id. Using a Data View inside Lava allows you to reuse logic you have already defined in Rock, so your templates stay simple and consistent. If the Data View changes in Rock, those changes are automatically reflected in your Lava output.

```
{% person dataview:'1' %}
    {% for person in personItems %}
        {{ person.FullName }} <br />
    {% endfor %}
{% endperson %}
```

In this example, Lava loads all people returned by **Data View 1** and outputs their full names. This pattern makes it easy to plug in any Data View you’ve created and immediately use the results in your template.

## Entity Search v17

Creating Data Views or manually typing in search expressions is one way to load entities. Another is to use entity searches that you define once and then can re-use them. You still use the expression language to perform your filtering, but you do it in one place and then can reference those searches across Rock. To do this, simply specify the entitysearch parameter and pass it the key of the entity search you previously created.

```
{% person entitysearch:'decker-family' expression:'NickName != "Cindy"' %}
    <p>People matching entity search and custom where clause:</p>
    {% for person in personItems %}
        <p>{{ person.NickName }}</p>
    {% endfor %}
{% endperson %}
```

As you can see, you can combine a pre-defined entity search with a custom expression to further filter it. You can combine entity searches with the following parameters: expression, groupby, select, selectmany, sort, offset, limit.

For more on setting up Entity Search, see the [Entity Search Documentation](https://community.rockrms.com/documentation/bookcontent/9/#entitysearch).

## Expression v13 - Fluid

Allows you to provide a more complex filter than can be achieved by the 'where' parameter. Expressions can't filter on attributes, however. You can use both Expression and Where parameters for added flexibility.

```
{% financialtransactiondetail expression:'Transaction.AuthorizedPersonAlias.Person.GivingId == "P01"' %}
    {% for financialtransactiondetail in financialtransactiondetailItems %}
        {{ financialtransactiondetail.Account.Name }} - {{ financialtransactiondetail.Amount }} <br>
    {% endfor %}
{% endfinancialtransactiondetail %}
```

You can use aggregates too:

```
{% person expression:'PhoneNumbers.Count() > 1' %}

    {% for person in personItems %}
        {{ person.FullName }} <br>
    {% endfor %}

{% endperson %}
```

## Sort

The 'sort' parameter does exactly what you'd think it would do. It orders the results by the fields you define (fields are delimited by a comma). These fields can consist of either entity properties or attributes. By default the sort is ascending, but you can make it descending by adding 'desc' as shown below:

```
{% person where:'Position _! "" ' sort:'LastName,NickName desc' %}
    {% for person in personItems %}
        {{ person.LastName }}, {{ person.NickName }} ({{ person | Attribute:'Position' }}) <br />
    {% endfor %}
{% endperson %}
```

## Limit

The 'limit' parameter will ensure that your results only have a certain number of records. The default limit is 1,000 records.

```
{% person dataview:'1' limit:'2' %}
    {% for person in personItems %}
        {{ person.FullName }} <br />
    {% endfor %}
{% endperson %}
```

## Offset

The 'offset' parameter will skip the provided number of records. This is helpful for activities like paging. In order to use the 'offset' parameter you must have a 'limit' parameter configured.

```
{% person dataview:'1' limit:'2' offset:'2' %}
    {% for person in personItems %}
        {{ person.FullName }} <br />
    {% endfor %}
{% endperson %}
```

## Dynamic Parameters

Hopefully by this point you're starting to drool thinking of all the cool things you can build with the Entity Lava command. But there's more!

Using the 'dynamicparameters' parameter you can tell the command that you'd like to use values from the query string as parameters in the command. Here are a few examples of what you can achieve.

```
{% person dynamicparameters:'Id' %}
    {% for person in personItems %}
        {{ person.FullName }} <br />
    {% endfor %}
{% endperson %}
```

In this example, the command's 'id' parameter will be appended to the command based on the value from the query string. Assuming the query string of `/MyPage?Id=3`, Ted Decker from the sample data will be shown. Let's check out some more...

```
{% assign groupid = PageParameter['groupId'] %}

{% groupmember where:'GroupId == {{groupid}}' %}
    {% for gm in groupmemberItems %}
        {{ gm.Person.FullName }} <br />
    {% endfor %}
{% endgroupmember %}
```

As you see above, you can even pull the group Id from a *page route* such as `/Group/82` you'll find on the group detail page. One last example...

```
{% person dynamicparameters:'LastName,NickName' %}
    {% for person in personItems %}
        {{ person.FullName }} <br />
    {% endfor %}
{% endperson %}
```

Notice in this example that there are no command parameters called 'LastName' and 'NickName'. When this occurs Lava assumes that you'd like to add these as filter expressions. The query string `/MyPage?LastName=Decker&NickName=Ted` would again show Ted Decker's name.

Other common uses for the 'dynamicparameters' parameter include:

- Passing in the 'offset' value for paging.
- Providing various sorting options.
- Changing the 'limit' parameter to adjust the number of rows returned.

## Iterator

As we mentioned in the very beginning, the standard naming convention for the iterator is '<entityName\>Items'. If you'd like to, you can change the name of the iterator variable like so:

```
{% person dataview:'1' iterator:'people' %}
    {% for person in people %}
        {{ person.FullName }}  <br />
    {% endfor %}
{% endperson %}
```

## Count

The 'count' parameter will return the number of records returned from your entity query. This is handy if you just want to know how many items there are without actually loading all the records.

```
{% contentchannelitem where:'ContentChannelId == 5' count:'true' %}
  {{ count }}
{% endcontentchannelitem %}
```

## Security Enabled

By default Rock will check the current person's security of each item returned before giving the results to your Lava template. While this is nice, it's slow. As an architect of good Lava you often know if security should be considered but until now you've been handcuffed a bit. Well, the handcuffs are coming off. You can now disable security checks on your entity commands.

We just said security is enabled by default. This is true for all entities except person. There isn't user specific security for the person model, so we have defaulted the security to be off when using the entity command on person records.

```
{% group where:'GroupTypeId == 25' securityenabled:'false' %}
    {% for group in groupItems %}{{ group.Name }}{% endfor %}
{% endgroup %}
```

## Expression v13 - Fluid

Allows you to provide a more complex filter than can be achieved by the 'where' parameter. Expressions can't filter on attributes, however. You can use both Expression and Where parameters for added flexibility.

```
{% financialtransactiondetail expression:'Transaction.AuthorizedPersonAlias.Person.GivingId == "P01"' %}
    {% for financialtransactiondetail in financialtransactiondetailItems %}
        {{ financialtransactiondetail.Account.Name }} - {{ financialtransactiondetail.Amount }} <br>
    {% endfor %}
{% endfinancialtransactiondetail %}
```

You can use aggregates too:

```
{% person expression:'PhoneNumbers.Count() > 1' %}

    {% for person in personItems %}
        {{ person.FullName }} <br>
    {% endfor %}

{% endperson %}
```

## Lazy Load Enabled v13 - Fluid

Toggles lazy loading of properties. This is good to use as a check to see how many extra database queries your Lava might be generating. This uses true/false to indicate enabled/disabled.

**Note:** Disabling lazy loading will bypass full security checking, so use this where appropriate.

```
{% person where:'LastName == "Decker"' lazyloadenabled:'true' %}

    {% for person in personItems %}
        {{ person.FullName }} <br>
    {% endfor %}

{% endperson %}
```

## Include v13 - Fluid

Eager loads the provided models.

```
{% person where:'LastName == "Decker"' include:'ConnectionStatusValue' %}

    {% for person in personItems %}
        {{ person.NickName }} - {{ person.ConnectionStatusValue.Value }} <br>
    {% endfor %}

{% endperson %}
```

## Select v13 - Fluid

Creates an anonymous type of just the data elements you need.

```
{% person where:'LastName == "Decker"' select:'new ( Id AS PersonId, NickName + " " + LastName AS FullName, ConnectionStatusValue.Value AS ConnectionStatus )' %}

    {% for person in personItems %}
        {{ person.FullName }} - {{ person.ConnectionStatus }} <br>
    {% endfor %}

{% endperson %}
```

The below example nests Anonymous Types

```
{% group where:'GroupTypeId == 25' select:'new ( Id AS GroupId, Name AS GroupName, Members.Select( new ( Person.NickName AS NickName, Person.LastName AS LastName, GroupRole.Name AS Role ) ) AS GroupMembers )' %}

<ul>
    {% for group in groupItems %}
    <li>{{ group.GroupName }} <br>
        <ul>
            {% for member in group.GroupMembers %}
                <li>{{ member.NickName }} {{ member.LastName }} ({{ member.Role }})</li>
            {% endfor %}
        </ul>
    </li>
    {% endfor %}
</ul>

{% endgroup %}
```

You can also get aggregates!

```
{% group where:'GroupTypeId == 25' select:'new ( Id AS GroupId, Name AS GroupName, Members.Count() AS GroupMemberCount )' %}
    <ul>
        {% for group in groupItems %}
            <li>{{ group.GroupName }} Members: {{ group.GroupMemberCount }} </li>
        {% endfor %}
    </ul>

<pre>
{{ groupItems | First | ToJSON }}
</pre>

{% endgroup %}
```

## Select Many v13 - Fluid

This flattens queries that return lists of lists. It takes the related entity and makes it the primary entity. For instance, let's say you want a list of phone numbers for men, but you don't need information on the men.

```
{% person where:'Gender == 1' selectmany:'PhoneNumbers.Select( NumberFormatted ).Distinct()' %}

    {% for phone in personItems %}
        {{ phone }}<br>
    {% endfor %}

{% endperson %}
```

## Group By v13 - Fluid

Groups rows that have the same values into summary rows. In the below example we're doing a simple groupby with Key and Array of Entities. Note 'it' is a keyword that refers to the grouped Entity

```
{% person groupby:'LastName' where:'Gender == 1' select:'new (Key as Key, it AS People)' %}

    {% for row in personItems %}
        <strong>{{ row.Key }}</strong><br>
    {% for person in row.People %}
        {{ person.LastName }}, {{ person.NickName }} <br>
    {% endfor %}
    {% endfor %}

{% endperson %}
```

You can also build your own return grouping as shown below.

```
{% person groupby:'LastName' where:'Gender == 1' select:'new (Key as Key, Select( new (LastName AS LastName, NickName AS NickName) ) as People)' %}

    {% for row in personItems %}
        <strong>{{ row.Key }}</strong><br>
    {% for person in row.People %}
        {{ person.LastName }}, {{ person.NickName }} <br>
    {% endfor %}
    {% endfor %}

{% endperson %}
```

## Disable Attribute Prefetch v15

Starting in v15, Rock will automatically prefetch all of the attributes for the entities that are returned. This makes use of new cababilities that greatly improve the attribute lookup performance when done on a collection of entities. Since most use-cases of the entity command show attribute information, attribute prefetching was enabled by default. This immediately improves existing templates. If you know for certain that you will not be needing attributes in your return set, you can choose to disable the prefetch. This will save ~10ms on your query.

```
{% person where:'Gender == 1' disableattributeprefetch:'true' %}

    {% for person in personItems %}
        {{ person.FullName }}<br>
    {% endfor %}

{% endperson %}
```

## Prefetch Attributes v15

Starting in v15, Rock will automatically prefetch all of the attributes for the entities that are returned. By default this includes all attributes. If you'd like to limit the attributes that are returned you can provide a comma-separated list of attribute keys to limit the returned attributes. In most cases this will be over-kill. But with some entities that contain a large number of attributes, like Person, this can reduce the strain on the server (memory and CPU). Note that if you do not provide an attribute in this list it will not be available to your Lava.

```
{% person where:'Gender == 1' prefetchattributes:'Position,Employer' %}

    {% for person in personItems %}
        {{ person.FullName }} - {{ person | Attribute:'Position' }} {{ person | Attribute:'Employer' }} <br>
    {% endfor %}

{% endperson %}
```

# Special Cases

For the most part, things work just as you'd expect. There are a couple of special cases you should be aware of though.

1. For those who are astute with Rock's entities, you might know that both People and Businesses share the 'person' entity. To help reduce confusion, we've mapped the 'person' and 'business' entities to separate commands and added dynamic filters to ensure they return the proper record type.
  
3. We've also added a dynamic filter for the 'person' entity to ensure that deceased people are not displayed. You can optionally disable this filter by adding `includedeceased:'true'` as a parameter.
  
5. With the `select` parameter, you can specify computed fields as data elements in the anonymous type as long as security is enabled. If you also specify `securityenabled:'false'`, computed fields are not allowed in the anonymous type. Because the `person` entity by default has security disabled, computed fields can't be specified in a select anonymous type when accessing the 'person' entity.
  
7. If you want to use a Lava variable in your where clause you need to enclose it in double braces: `{{ variable }}`.
	```
	{% assign tag = PageParameter['tag'] %}
	{% assign now = 'Now' | Date %}
	{% contentchannelitem where:'Status.Value == "Approved" && Tags *= "{{ tag }}" && StartDateTime > "{{ now }}"' %}
	    {% for item in contentchannelitemItems %}
	        	{{ item.Title }}
		{% endfor %}
	{% endcontentchannelitem %}
	```
  
9. If you need to use a combination of `&&` and `||` then make sure the `&&` condition is listed last.
	```
	{% groupmember where:'GroupId == 3 || GroupId == 33 || GroupId == 2 && PersonId == {{ Person.Id }}' %}
	```

