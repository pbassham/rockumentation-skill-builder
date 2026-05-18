---
description: "Use when working with array and dictionary operations like adding items, retrieving keys, or removing null values from collections"
source: "https://community.rockrms.com/Lava"
sourceLabel: Lava
---
> **Path:** Lava > Filters > Arrays

These filters help you in working with arrays.

 

# AddToArray

Server: v13.0

Add a new item to an existing array.

**Additional Details**

It will create a new array if null or '' is used as the source array. While the examples use simple strings, you can add anything to an array - even entity objects such as a Group or Person.

**Example:**

```
"Items": [
    "one"
]
```

```
{% assign array = Items | AddToArray:'two' | AddToArray:'three' %}
<ul>
{% for item in array %}
    <li>{{ item }}</li>
{% endfor %}
</ul>
```

```
<ul>
    <li>one</li>
    <li>two</li>
    <li>three</li>
</ul>
```

 

# AddToDictionary

Server: v13.0

Takes an existing (or empty) dictionary and returns a new dictionary with the added key and value.

**Additional Details**

You can pass null or '' to initialize a new dictionary.

**Example:**

```
{% assign colors = '' | AddToDictionary:'success','green' | AddToDictionary:'warning','orange' | AddToDictionary:'error','red' %}
<div style='color:{{ colors["success"]}}'>
    This request is approved.
</div>
<div style='color:{{ colors["warning"]}}'>
    This request is incomplete.
</div>
<div style='color:{{ colors["error"]}}'>
    This request is denied.
</div>
```

```
<div style='color:green'>
    This request is approved.
</div>
<div style='color:orange'>
    This request is incomplete.
</div>
<div style='color:red'>
    This request is denied.
</div>
```

**Note:**  
- If the key already exists, it updates the key/value pair in the dictionary. v16.0

 

# AllKeysFromDictionary

Server: v13.0

Retrieves all keys that exist in the dictionary object and returns them in an array.

**Additional Details**

**Example:**

```
"Object": {
    "Id": 23,
    "FirstName": "Ted",
    "LastName": "Decker"
}
```

```
{% assign keys = Object | AllKeysFromDictionary %}
<ul>
    {% for key in keys %}
    <li>{{ key }}</li>
    {% endfor %}
</ul>
```

```
<ul>
    <li>Id</li>
    <li>FirstName</li>
    <li>LastName</li>
</ul>
```

 

# AsDictionary

Server: v19.0

Takes an object and creates a new dictionary that contains the same keys and values. If the input is already a dictionary, then the input is returned without change.

**Additional Details**

You can pass null or '' to initialize a new dictionary.

**Example:**

```
{% sql %}
SELECT [Id], [Name] FROM [Campus]
{% endsql %}

{% assign items = null %}

{% for result in results %}
    {% assign item = result | AsDictionary %}
    {% assign idKey = item.Id | ToIdHash %}
    {% assign item = item | AddToDictionary:'IdKey',idKey | RemoveFromDictionary:'Id' %}
    {% assign items = items | AddToArray:item %}
{% endfor %}

<pre>{{ items | ToJSON }}</pre>
```

```
<pre>[
  {
    "Name": "Main Campus",
    "IdKey": "QN8mrQBVyn"
  },
  {
    "Name": "South-Inactive",
    "IdKey": "OX9mQWPQo8"
  }
]</pre>
```

 

# Compact

Server: v16.0

Removes empty or null values from an array.

**Additional Details**

**Example:**

```
{% assign fruits = '' | AddToArray:'apples' | AddToArray:nil | AddToArray:'oranges' | AddToArray:nil | AddToArray:'peaches' %}
Whole Fruit: {{ fruits | Join:', ' }}.
{% assign squashedFruits = fruits | Compact %}
Squashed Fruit: {{ squashedFruits | Join:', ' }}.
```

```
Whole Fruit: apples, , oranges, , peaches.
Squashed Fruit: apples, oranges, peaches.
```

 

# Concat

Server: v16.0

Joins multiple arrays together so that the result contains all the items from the input arrays.

**Additional Details**

**Example:**

```
{% assign primaryColors = 'red, yellow, blue' | Split: ', ' %}
{% assign secondaryColors = 'orange, green, violet' | Split: ', ' %}
{% assign allColors = primaryColors | Concat: secondaryColors %}
{{ allColors | Join:', ' }}
```

```
red, yellow, blue, orange, green, violet
```

 

# Contains

Server: v8.0 Mobile: v1.0

The contains filter returns true if the specified value is in the array

**Additional Details**

**Example:**

```
"Fruits": [
    "Banana",
    "Orange",
    "Banana",
    "Apple"
]
```

```
{{ Fruits | Contains:'Banana' }}
```

```
true
```

**Note:**  
This filter only works with string arrays.

 

# Distinct

Server: v13.0

Takes an array as input and returns the distinct (unique) elements of the array.

**Additional Details**

This works much like the Uniq filter, but it can be used on more complex objects. An optional parameter can be specified that will be used as the property name of the object when determining the uniqueness.

**Example:**

```
"Items": [
    {
        "Person": {
            "Id": 1,
            "FirstName": "Ted",
            "LastName": "Decker"
        },
        "GroupId": 3
    },
    {
        "Person": {
            "Id": 2,
            "FirstName": "Cindy",
            "LastName": "Decker"
        },
        "GroupId": 4
    },
    {
        "Person": {
            "Id": 1,
            "FirstName": "Ted",
            "LastName": "Decker"
        },
        "GroupId": 4
    },
]
```

```
{% assign array = Items | Distinct:'Person.Id' %}
<ul>
{% for item in array %}
    <li>{{ item.Person.FirstName }}</li>
{% endfor %}
</ul>
```

```
<ul>
    <li>Ted</li>
    <li>Cindy</li>
</ul>
```

 

# First

Server: v1.0 Mobile: v1.0

Returns the first item from an array/collection.

**Additional Details**

**Example:**

```
"CurrentPerson": {
    "PhoneNumbers": [
        {
            "NumberFormatted": "(555) 555-5551"
        },
        {
            "NumberFormatted": "(555) 555-5552"
        },
        {
            "NumberFormatted": "(555) 555-5553"
        }
    ]
}
```

```
{% assign firstPhone = CurrentPerson.PhoneNumbers | First %}
The first phone number is {{ firstPhone.NumberFormatted }}.
```

```
The first phone number is (555) 555-5551.
```

 

# GroupBy

Server: v13.0

Takes a collection of items and groups them by the specified property tree value.

**Additional Details**

The returned data is a dictionary. Each distinct property tree value is represented as a key in the dictionary with all associated original objects as values of that key. As such, when iterating through the result you need to use the PropertyToKeyValue filter to get the key and the array of values.

**Example:**

```
"Members": [
    {
        "GroupRole": {
            "Name": "Member"
        },
        "Person": {
            "FirstName": "Alex"
        }
    },
    {
        "GroupRole": {
            "Name": "Leader"
        },
        "Person": {
            "FirstName": "Ted"
        }
    },
    {
        "GroupRole": {
            "Name": "Member"
        },
        "Person": {
            "FirstName": "Cindy"
        }
    }
]
```

```
{% assign groupedMembers = Members | GroupBy:'GroupRole.Name' %}
<ul>
{% for group in groupedMembers %}
    {% assign parts = group | PropertyToKeyValue %}
    <li>{{ parts.Key }}</li>
    <ul>
        {% for member in parts.Value %}
            <li>{{ member.Person.FirstName }}</li>
        {% endfor %}
    </ul>
{% endfor %}
</ul>
```

```
<ul>
    <li>Leader</li>
    <ul>
        <li>Ted</li>
    </ul>
    <li>Member</li>
    <ul>
        <li>Alex</li>
        <li>Cindy</li>
    </ul>
</ul>
```

 

# Index

Server: v7.0 Mobile: v1.0

Provides an easy way to retrieve an item from an array using its index when chaining filters.

**Additional Details**

**Example:**

```
"CurrentPerson": {
    "PhoneNumbers": [
        {
            "NumberFormatted": "(555) 555-5551"
        },
        {
            "NumberFormatted": "(555) 555-5552"
        },
        {
            "NumberFormatted": "(555) 555-5553"
        }
    ]
}
```

```
{% assign secondPhone = CurrentPerson.PhoneNumbers | Index:1 %}
	
{{ secondPhone.NumberFormatted }}
```

```
(555) 555-5552
```

**Note:**  
Note that indexes are zero based (the first item is 0, the second is 1, etc.)

 

# Indexer

Server: v7.0

Returns the item at the specified index location in an array. Note that array numbering starts from zero, so the first item in an array is referenced with \[0\].

**Additional Details**

**Example:**

```
{% assign fruits = "orange apple banana orange" | Split:' ' %}
{{ fruits[2] }}
```

```
banana
```

**Note:**  
Note that indexes are zero based (the first item is 0, the second is 1, etc.)

 

# Join

Server: v1.0 Mobile: v1.0

Combines the properties of an array with the character passed as the parameter.

**Additional Details**

**Example:**

```
"FavoriteColors" : ["Red", "Green", "Orange"]
```

```
{{ FavoriteColors | Join:', ' }}
```

```
Red, Green, Orange
```

 

# Last

Server: v1.0 Mobile: v1.0

Returns the last item from an array/collection.

**Additional Details**

**Example:**

```
"CurrentPerson": {
    "PhoneNumbers": [
        {
            "NumberFormatted": "(555) 555-5551"
        },
        {
            "NumberFormatted": "(555) 555-5552"
        },
        {
            "NumberFormatted": "(555) 555-5553"
        }
    ]
}
```

```
{% assign firstPhone = CurrentPerson.PhoneNumbers | Last %}
The last phone number is {{ firstPhone.NumberFormatted }}.
```

```
The last phone number is (555) 555-5553.
```

 

# Map

Server: v1.0 Mobile: v1.0

Takes a property name as a parameter, and creates a new array of each object's value for that property. If an object doesn't have that property, a null will be included in the final array.

**Additional Details**

**Example:**

```
Campuses {
    {
        Name - Avalon Campus
        ShortCode - AVL
        Id - 1
    },
    {
        Name - Tacoma Campus
        ShortCode - TAC
        Id - 2
    },
    {
        Name - Corolla Campus
        ShortCode - COR
        Id - 3
    }
}
```

```
{{ Campuses | Map:'Name' | ToJSON }}
```

```
[ "Avalon Campus", "Tacoma Campus", "Corolla Campus" ]
```

 

# OrderBy

Server: v10.0 Mobile: v1.0

Orders a collection of elements by the specified property tree and returns a new collection in that order.

**Additional Details**

You can sort by multiple keys, for example you can sort by LastName and then by FirstName at once. Each key to sort by is separated by a comma (`,`) character. Each sorted property can change the default order from ascending (default) to descending by appending a space and `desc` to the property name.

For example, if you specify the order by property of `FirstName desc` then the collection will be sorted by `FirstName` and the results will be returned in descending order.

**Example:**

```
"Members": [
    {
        "GroupRole": {
            "Name": "Member",
            "IsLeader": false
        },
        "Person": {
            "FirstName": "Alex"
        }
    },
    {
        "GroupRole": {
            "Name": "Leader",
            "IsLeader": true
        },
        "Person": {
            "FirstName": "Ted"
        }
    },
    {
        "GroupRole": {
            "Name": "Member",
            "IsLeader": false
        },
        "Person": {
            "FirstName": "Cindy"
        }
    }
]
```

```
{% assign members = Members | OrderBy:'GroupRole.IsLeader desc,Person.FirstName' %}
<ul>
{% for member in members %}
    <li>{{ member.Person.FirstName }} - {{ member.GroupRole.Name }}</li>
{% endfor %}
</ul>
```

```
<ul>
    <li>Ted - Leader</li>
    <li>Alex - Member</li>
    <li>Cindy - Member</li>
</ul>
```

 

# RemoveFromArray

Server: v13.0

Take a collection of objects and return a new collection which does not contain the specified value.

**Additional Details**

**Example:**

```
"Items": [
    "one",
    "two",
    "three"
]
```

```
{% assign array = Items | RemoveFromArray:'two' %}
<ul>
{% for item in array %}
    <li>{{ item }}</li>
{% endfor %}
</ul>
```

```
<ul>
    <li>one</li>
    <li>three</li>
</ul>
```

**Note:**  
This filter only works with string arrays.

 

# RemoveFromDictionary

Server: v13.0

Removes the specified key from a dictionary of keys and values.

**Additional Details**

**Example:**

```
"Object": {
    "Id": 23,
    "FirstName": "Ted",
    "LastName": "Decker"
}
```

```
{% assign data = Object | RemoveFromDictionary:'FirstName' %}
{{ data | ToJSON }}
```

```
{
    "Id": 23,
    "LastName": "Decker"
}
```

 

# Reverse

Server: v14.0

Reverses the order of the items in an array.

**Additional Details**

**Example:**

```
{% assign my_array = "apples, oranges, peaches, plums" | Split:", " %}

{{ my_array | Reverse | Join:", " }}
```

```
plums, peaches, oranges, apples
```

 

# Select

Server: v4.0 Mobile: v1.0

Takes a property name as a parameter, and creates a new array of each object's value for that property. If an object doesn't have that property, it won't be included in the final array.

**Additional Details**

**Example:**

```
"CurrentPerson": {
    "FullName": "Ted Decker"
    "PhoneNumbers":  [
        {
            Number - 6235555551
            NumberFormatted - (623) 555-5551
            NumberTypeValueId - 12
        },
        {
            Number - 6235555552
            NumberFormatted - (623) 555-5552
            NumberTypeValueId - 13
        },
        {
            Number - 6235555553
            NumberFormatted - (623) 555-5553
            NumberTypeValueId - 136
        }
    ]
}
```

```
{{ CurrentPerson.NickName }}'s work phone is: {{ CurrentPerson.PhoneNumbers | Where:'NumberTypeValueId', 136 | Select:'NumberFormatted' }}.
```

```
Ted's work phone is: (623) 555-5553.
```

 

# Shuffle

Server: v4.0 Mobile: v1.0

Randomizes the order of an array. Useful for ads on a homepage where you'd like a different ad to be first for each visit.

**Additional Details**

**Example:**

```
{
    [0] {
        "Id": 1,
        "Image": "<img src="/GetImage.ashx?Id=1>"
    },
    [1] {
        "Id": 2,
        "Image": "<img src="/GetImage.ashx?Id=2>"
    },
    [2] {
        "Id": 3,
        "Image": "<img src="/GetImage.ashx?Id=3>"
    }
}
```

```
{% assign randomOrderedAds = Items | Shuffle %}
    
{% for ad in randomOrderedAds %}
  <div class="item">
    <a href="{{ LinkedPages.DetailPage }}?Item={{ ad.Id }}">{{ ad.Image }}</a>
  </div>
{% endfor %}
```

```
<div class="item">
    <a href="AdDetail?Item=2"><img src="/GetImage.ashx?Id=2></a>
</div>

<div class="item">
    <a href="AdDetail?Item=3"><img src="/GetImage.ashx?Id=3></a>
</div>

<div class="item">
    <a href="AdDetail?Item=1"><img src="/GetImage.ashx?Id=1></a>
</div>
```

 

# Size

Server: v1.0 Mobile: v1.0

Provides the number of items in the array.

**Additional Details**

**Example:**

```
"Person": {
    "PhoneNumbers": [
        {
            "NumberFormatted": "(555) 555-5551"
        },
        {
            "NumberFormatted": "(555) 555-5552"
        },
        {
            "NumberFormatted": "(555) 555-5553"
        }
    ]
}
```

```
Ted has {{ Person.PhoneNumbers | Size }} phone numbers.
```

```
Ted has 3 phone numbers.
```

 

# Slice (arrays)

Server: v13.1

The slice filter (when used on an array) returns a subset of the given array, starting at the specified index. An optional second parameter can be passed to specify the length of the subset. If no second parameter is given, a subset of one item will be returned.

**Additional Details**

**Example:**

```
"List": [
    1,
    2,
    3,
    4,
    5
]
```

```
{% assign sublist = List | Slice:2,3 %}

<ul>
{% for i in sublist %}
    <li>{{ i }}</li>
{% endfor %}
</ul>
```

```
<ul>
    <li>2</li>
    <li>3</li>
    <li>4</li>
</ul>
```

**Note:**  
This only works using the Fluid engine and does not work using the older DotLiquid engine.

 

# Sort

Server: v1.0 Mobile: v1.0

Sorts a primitive array (in case-sensitive order in Fluid). To sort by the properties of an array, use OrderBy.

**Additional Details**

**Example:**

```
"Fruits": [
    "Banana",
    "Orange",
    "Apple"
]
```

```
{% assign fruitsSorted = Fruits | Sort %}

<ul>
{% for fruit in fruitsSorted %}
    <li>{{ fruit }}</li>
{% endfor %}
</ul>
```

```
<ul>
    <li>Apple</li>
    <li>Banana</li>
    <li>Orange</li>
</ul>
```

**Note:**  
The default sort order is always ascending. To create a decending sorted list use the Reverse filter.  
`{% assign fruitsSorted = Fruits | Sort | Reverse %}`  
  
In Fluid, the items are sorted in case sensitive order, where capitalized letters \[A-Z\] come before \[a-z\]. To sort without case sensitivity use SortNatural or OrderBy.

 

# SortByAttribute

Server: v5.0

Sorts an array of items based on an attribute value.

**Additional Details**

**Example:**

```
Campuses {
    {
        Id: 1
        Name: Avalon Campus
        (with Attribute 'SeatingCapacity': 250)
    },
    {
        Id: 2
        Name: Tacoma Campus
        (with Attribute 'SeatingCapacity': 150)
    },
    {
        Id: 3
        Name: Corolla Campus
        (with Attribute 'SeatingCapacity': 550)
    }
}
```

```
{% assign sortedItems = Items | SortByAttribute:'SeatingCapacity' %}

<ul>
{% for item in sortedItems %}
    <li>{{ item.Name }}: {{ item | Attribute:'SeatingCapacity' }}</li>
{% endfor %}
</ul>
```

```
<ul>
    <li>Tacoma Campus: 150</li>
    <li>Avalon Campus: 250</li>
    <li>Corolla Campus: 550</li>
</ul>
```

**Note:**  
As of Rock v7 you can pass an optional sort order with the values of 'asc' or 'desc' (default is asc if not specified).

 

# SortNatural

Server: v16.0

Fluid only: Sorts a primitive array, in case-insensitive order. To sort by the properties of an array, use OrderBy.

**Additional Details**

**Example:**

```
"Fruits": [
    "Banana",
    "orange",
    "apple"
]
```

```
{% assign fruitsSorted = Fruits | SortNatural %}

<ul>
{% for fruit in fruitsSorted %}
    <li>{{ fruit }}</li>
{% endfor %}
</ul>
```

```
<ul>
    <li>Apple</li>
    <li>banana</li>
    <li>orange</li>
</ul>
```

**Note:**  
The sort order is always ascending. To create a decending sorted list use the Reverse filter.  
`{% assign fruitsSorted = Fruits | SortNatural | Reverse %}`

 

# Sum

Server: v13.0

Performs a mathematical summation of all numeric values in an array and outputs the result.

**Additional Details**

**Example:**

```
"Items": [
    { "Name": "Shirt", "Price": 15.25 },
    { "Name": "Sweater", "Price": 25.00 },
    { "Name": "Jacket", "Price": 45.50 }
]
```

```
Total: ${{ Items | Select:'Price' | Sum }}
```

```
Total: $85.75
```

 

# Uniq

Server: v8.0 Mobile: v1.0

Takes a collection of values and returns only the unique set of those values.

**Additional Details**

**Example:**

```
"Fruits": [
    "Banana",
    "Orange",
    "Banana",
    "Apple"
]
```

```
{{ Fruits | Uniq | Join:',' }}
```

```
Banana,Orange,Apple
```

 

# Where

Server: v4.0 Mobile: v1.0

This filter allows you to filter a collection of items by a key and value.

**Additional Details**

This filter has a couple of input parameters:

- Key: The property name on the collection item that should be evaluated.
- Value: The value that will be compared against the property specified by the key.
- Comparison (optional): Determines how the value comparison should be performed.
	- `equal` – Returns items where the value matches exactly. This is the default if no comparison is provided.
		- `notequal` – Returns items where the value does not match. v12.3
		- `contains` – Returns items where the property contains the specified value. v19.0

**Example:**

```
"CurrentPerson": {
    "FullName": "Ted Decker"
    "PhoneNumbers":  [
        {
            Number - 6235555551
            NumberFormatted - (623) 555-5551
            NumberTypeValueId - 12
        },
        {
            Number - 6235555552
            NumberFormatted - (623) 555-5552
            NumberTypeValueId - 13
        },
        {
            Number - 6235555553
            NumberFormatted - (623) 555-5553
            NumberTypeValueId - 136
        }
    ]
}
```

```
Example 1:
{{ CurrentPerson.NickName }}'s work phone is: {{ CurrentPerson.PhoneNumbers | Where:'NumberTypeValueId', 136 | Select:'NumberFormatted' }}.

Example 2 (v12.3 and above):
{{ CurrentPerson.NickName }}'s other contact numbers are: {{ CurrentPerson.PhoneNumbers | Where:'NumberTypeValueId', 136, 'notequal' | Select:'NumberFormatted' | Join:', ' }}.
```

```
Ted's work phone is: (623) 555-5553.
Ted's other contact numbers are: (623) 555-5551, (623) 555-5552.
```

## Array Filters In Action

Reading through the filters above you might question the value of many of them. For instance what good is the 'Map' filter when it just returns a string of array values all smashed together (Avalon CampusTacoma CampusCorolla Campus). The power comes when you chain these filters together. Consider the kitchen sink example below.

```
{% assign sortedCampuses = Campuses | Sort:'Name' %}
{{ sortedCampuses | Map:'Name' | Join:', ' | ReplaceLast:',',' and' }}

Output:
Avalon Campus, Corolla Campus and Tacoma Campus
```

