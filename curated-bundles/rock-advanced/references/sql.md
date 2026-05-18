---
description: "Use when querying or modifying database data using SQL within Lava templates, including SELECT, UPDATE, and DELETE commands"
source: "https://community.rockrms.com/Lava"
sourceLabel: Lava
---
> **Path:** Lava > Commands > SQL

The SQL Lava command allows you to run SQL, returning the results in a Lava variable that you can then iterate over. Let's see it in action.

```
{% sql %}
    SELECT [NickName], [LastName] FROM [Person] 
    WHERE [LastName] = 'Decker'
{% endsql %}

{% for item in results %}
    {{ item.NickName }} {{ item.LastName }} <br />
{% endfor %}
```

In this example we're querying for all of the people in the database with the last name of 'Decker' and then writing out the results.

Your SQL can also contain Lava. When adding Lava variables, you need to be VERY careful to not allow [SQL injection attacks](https://en.wikipedia.org/wiki/SQL_injection).

```
{% assign lastName = 'Decker' %}

{% sql %}
    SELECT [NickName], [LastName] FROM [Person] 
    WHERE [LastName] = '{{ lastName }}'
{% endsql %}

{% for item in results %}
    {{ item.NickName }} {{ item.LastName }} <br />
{% endfor %}
```

**Quick Links:**

- [statement](#statement)
- [return](#return)
- [parameters](#parameters)
- [timeout](#timeout)
- [aggregate functions](#aggregatefunctions)

## SQL Commands

What about UPDATE and DELETE? You can actually use the syntax above to run updates and deletes, but if you want to get the number of rows returned you'll need to add the 'statement' parameter like:

```
{% sql statement:'command' %}
    DELETE FROM [DefinedValue] WHERE [Id] IN (186,187)
{% endsql %}

{{ results }} {{ 'record' | PluralizeForQuantity:results }} were deleted.
```

If you update something directly via SQL, the cache manager won't know about it so you'll need to take care of flushing it from cache yourself.

Again, be VERY careful about SQL injection. DROP statements do work in the Lava SQL command.

**Note:** Even if you're not selecting anything (such as in an INSERT or UPDATE statement), you'll still need to set a 'results' Attribute for the SQL to execute.

## Changing The Return Variable

By default the return variable is always called 'results'. You can change this however by providing the 'return' parameter.

```
{% sql return:'mylist' %}
    SELECT [NickName], [LastName] FROM [Person] 
    WHERE [LastName] = 'Decker'
{% endsql %}

{% for item in mylist %}
    {{ item.NickName }} {{ item.LastName }} <br />
{% endfor %}
```

## SQL Parameters

v9.0

Earlier we mentioned that you should be very careful about SQL injection when using this command. One way to prevent this is to use parameters. This ensures that whatever value you are going to pass through to the SQL statement will not be executed *as* SQL.

Parameters can be passed by way of the `{% sql %}` line in the block. Any `parameter:'value'` pairs will be treated as parameters and made available to the SQL statement. The two exceptions are 'statement' and 'return', which may not be used for passing parameters as they already have their respective purposes as described above. SQL parameters are referenced in the SQL statement by prefixing the property name with '@'.

Let's revisit a previous example but use SQL parameters instead of placing the variable inline with the SQL statement.

```
{% assign lastName = 'Decker' %}

{% sql name:'{{ lastName }}' %}
    SELECT [NickName], [LastName] FROM [Person] 
    WHERE [LastName] = @name
{% endsql %}

{% for item in results %}
    {{ item.NickName }} {{ item.LastName }} <br />
{% endfor %}
```

## Timeout

v12.0

If you are certain a particular query is going to take a very long time to execute (perhaps you are using this SQL Lava in a Persisted Dataset) and you cannot improve it to run faster, you can now set a `timeout:'value'` parameter with an integer value in seconds.

```
{% sql timeout:'60' %}
    SELECT [PersonAliasId], [Operation], [InteractionComponentId] FROM [Interaction] 
    WHERE [InteractionDateKey] = 20200704
{% endsql %}
```

## SQL Aggregate Functions

Note that you will need to assign an alias/name to aggregated fields. For instance, the below SQL requires `MIN(gm.CreatedDateTime)` to be assigned a name like `'Date'` so it can be used later in the `{{ item.Date }}` Lava.

```
{% sql %}
    SELECT
        MIN(gm.[CreatedDateTime]) AS 'Date'
    FROM
        [GroupMember] AS gm
        INNER JOIN [Group] AS g ON g.[Id] = gm.[GroupId]
        INNER JOIN [Person] AS p ON p.[Id] = gm.[PersonId]
    WHERE
        g.[GroupTypeId] IN (1, 2, 3)
{% endsql %}

{% for item in results %}
    {{ item.Date }}
{% endfor %}
```

