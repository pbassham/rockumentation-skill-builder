---
description: "Use when you need to add CSS links, JavaScript files, meta tags, or custom headers to a Rock page in Lava"
source: "https://community.rockrms.com/Lava"
sourceLabel: Lava
---
> **Path:** Lava > Filters > Other

These filters provide various utility roles in creating your Lava.

 

# AddCssLink

Server: v7.0

Adds a CSS link to the page. If the link has already been previously registered (by a block or other Lava) it will not be duplicated.

**Additional Details**

**Example:**

```
{{ 'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css' | AddCssLink }}
```

```
<link type="text/css" rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
```

**Note:**  
Couple of usage notes:
- You can use ~/ to have Rock append the application path or ~~/ to append your theme root to your relative links.
- You can pass in an option parameter to add fingerprinting to your file. This only works on local links and serves to cache the file on the user's browser. {{ '/Styles/myfile.css' | AddCssLink:true }}

 

# AddLinkTagToHead

Server: v4.0

Adds a link to the HTML head of the current page.

**Additional Details**

**Example:**

```
"CurrentPerson": {
   "PhotoUrl": "/GetImage.ashx?id=55"
}
```

```
{{ CurrentPerson.PhotoUrl | AddLinkTagToHead:'rel','image_src' }}
```

```
The tag below will be added to the head of the page.
<link rel="image_src" href="/GetImage.ashx?id=55">
```

**Note:**  
This filter will only work on blocks that are on a page. This may not be the case with some workflow actions and email templates.

 

# AddMetaTagToHead

Server: v4.0

Creates a meta tag that will be inserted into the HTML head. This is useful for adding [social media links](http://moz.com/blog/meta-data-templates-123).

**Additional Details**

**Example:**

```
"CurrentPerson": {
   "PhotoUrl": "/GetImage.ashx?id=55"
}
```

```
{{ CurrentPerson.PhotoUrl | AddMetaTagToHead:'property','og:image' }}
```

```
The tag below will be added to the head of the page.
<meta property="og-image" content="/GetImage.ashx?id=55">
```

**Note:**  
This filter will only work on blocks that are on a page. This may not be the case with some workflow actions and email templates.

 

# AddResponseHeader

Server: v12.0

Adds a header to the HTTP response. This allows you to set custom headers. Note that any headers already being set in Rock will overwrite the values you provide. These should only be used to add custom headers.

**Additional Details**

**Example:**

```
{{ 'public, max-age=120' | AddResponseHeader:'cache-control' }}
```

```
There is no output displayed, but the HTTP response object will have a new header added.
```

 

# AddScriptLink

Server: v7.0

Adds a script link to the page. If the link has already been previously registered (by a block or other Lava) it will not be duplicated.

**Additional Details**

**Example:**

```
{{ 'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js' | AddScriptLink }}
```

```
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js" type="text/javascript"></script>
```

**Note:**  
Couple of usage notes:
- You can use ~/ to have Rock append the application path or ~~/ to append your theme root to your relative links.
- You can pass in an option parameter to add fingerprinting to your file. This only works on local links and serves to cache the file on the user's browser. {{ '/Styles/myfile.js' | AddScriptLink:true }}

 

# AddToMergeFields

Server: v16.2

Allows you to add a new item to the provided Lava merge fields.

**Additional Details**

**Example:**

```
{{ 'Ted Decker' | AddToMergeFields:'SelectedPerson' }}

{{ SelectedPerson }}
```

```
Ted Decker
```

**Note:**  
This is a special filter that has limited use cases.

 

# AppendFollowing

Server: v10.0

Returns the following status for the currently logged in user to the results of an entity command or Persisted Dataset.

**Additional Details**

The append following filter is exclusively used by entity commands and adds the property `IsFollowing` to the returned data object. Details on how to create a Persisted Dataset are available in the [Designing & Building Websites Using Rock](https://www.rockrms.com/documentation/bookcontent/14#persisteddatasets) guide.  
  
An optional purpose key can be provided as a parameter in v13.4+.

**Example:**

```
<p>Entity Command Example</p>
{% person where:'Id != 1' limit:'3' iterator:'People' %}
  {% assign followedItems = People | AppendFollowing %}
  <ul>
  {% for item in followedItems %}
    <li>{{ item.FullName }} - {{ item.IsFollowing }} </li>
  {% endfor %}
  </ul>
{% endperson %}

<p>Persisted Dataset Example</p>
{% assign data = 'mydataset' | PersistedDataset | AppendFollowing %}
<ul>
{% for item in data %}
  <li>{{ item.Title }} - {{ item.IsFollowing }}</li>
{% endfor %}
</ul>
```

```
<p>Entity Command Example</p>
<ul>
    <li>Ted Decker - true</li>
    <li>Cindy Decker - false</li>
    <li>Noah Decker - false</li>
</ul>

<p>Persisted Dataset Example</p>
<ul>
    <li>Friday 3/25 - true</li>
    <li>Saturday 3/26 - false</li>
    <li>Sunday 3/27 - false</li>
</ul>
```

 

# AppendSegments

Server: v17.0

Adds personalization segment information for the currently logged in user to the results of an entity command or Persisted Dataset.

**Additional Details**

This filter is exclusively used by entity commands and adds these properties to the elements of the result set.

- `IsInSegment` - a flag indicating if the current person matches any of the segments associated with this entity.
- `MatchingSegments` - a comma-delimited list of the segments associated with this entity that are matched by the current person.
Details on how to create a Persisted Dataset are available in the [Designing & Building Websites Using Rock](https://www.rockrms.com/documentation/bookcontent/14#persisteddatasets) guide.  
  

This filter has the following parameters:

1. `Segment` (optional): A Personalization Segment Key that can be used to restrict the output to a single segment.

**Example:**

```
<h1>Entity Command Example</h1>
{%- contentchannel where:'Name == "Messages"' -%}
    {%- assign channelId = contentchannel.Id -%}
    {%- contentchannelitem where:'ContentChannelId == {{ contentchannel.Id }}' iterator:'Items' -%}
    {%- assign segments = Items | AppendSegments:'MARRIED' | Sort:'Title' -%}
     <p>{{ CurrentPerson.NickName }}, you might be interested in these messages on the topic of Marriage:</p>
    <ul>
        {%- for item in segments -%}
            {%- if item.IsInSegment == true -%}
                <li>{{ item.Title }} [{{ item.MatchingSegments }}]</li>
            {% endif -%}
        {%- endfor -%}
    </ul>
    {%- endcontentchannelitem -%}
{%- endcontentchannel -%}

<h1>Persisted Dataset Example</h1>
{% assign matchedSegmentItems = 'MyContentChannelItemsDataset' | PersistedDataset | AppendSegments %}
<p>Recommendations for {{ CurrentPerson.NickName }}:</p>
<ul>
  {%- for item in matchedSegmentItems -%}
    <li>{{ item.Title }} - {{ item.IsInSegment }}{% if item.MatchingSegments > '' %} [{{ item.MatchingSegments }}]{% endif %}</li>
  {% endfor -%}
</ul>
```

```
<h1>Entity Command Example</h1>
<p>Ted, you might be interested in these messages on the topic of Marriage:</p>
<ul>
  <li>Extended Family [Married]</li>
  <li>How To Make Your Marriage Better Today [Married]</li>
  <li>Immediate Family [Married]</li>
  <li>The Secret That Could Cost You Your Marriage [Married]</li>
</ul>
<h1>Persisted Dataset Example</h1>

<p>Recommendations for Ted:</p>
<ul>
  <li>Of Myths and Money - true [Attender, Has Given]</li>
  <li>Of Faith and Firsts - true [Attender, Has Given]</li>
  <li>Are You Dealing With Insecurity? - false</li>
  <li>Hallelujah! - false</li>
  <li>The Secret That Could Cost You Your Marriage - true [Married]</li>
  <li>How To Make Your Marriage Better Today - true [Married]</li>
  <li>Extended Family - true [Married, Small Group]</li>
  <li>Immediate Family - true [Married]</li>
  <li>Momentum At Home - true [Small Group]</li>
  <li>Momentum At Work - false</li>
  <li>Rich Fool - false</li>
  <li>Two Debtors - false</li>
</ul>
```

**Note:**  
When using Persisted Datasets, you must include the following keys:
- `Id`
- `EntityTypeId`

 

# AppendWatches

Server: v16.0

Returns information about whether the current person has watched various media files provided. This filter is highly customizable to work in various different scenarios.

**Additional Details**

The following inputs are available for this filter:

1. Attribute Key (optional) - The key of the attribute that represents the media element for the entity. This is only needed when working with entities.
2. Watch Window (optional) - By default all watch interactions will be considered. This parameter allows you to provide either the number of days back to look (as an integer) or the start date of the window to consider. If you want to provide this parameter you'll need to also provide an Attribute Key.

Below are notes about how to use this filter with various different types of data structures.

- Collection of Entities - In this use case you will need to provide the attribute key that contains the media element. This is most commonly used with a collection of Content Channel Items.
- Collection of Media Elements - No additional information is needed.
- Single Entity - Here again you will need to provide the attribute key that contains the media element.
- Single Media Element - No additional information is needed.
- Persisted Dataset of Multiple Media Elements - Like the AppendFollowing command you can provide the data from a persisted dataset. Your dataset does need to have a integer property called MediaId.
- Persisted Dataset of a Single Media Element - This pattern again requires that the object have a integer property called MediaId.

The output of this command will be the original dataset with the follow additional properties:

- HasWatched - Boolean value that determines if the current person has watched any portion of the media element.
- WatchLength - The percentage of the media file that the person has watched.
- WatchMap - The watch map of the person's viewing of the file. [How To Read a Watch Map](https://community.rockrms.com/media-watch-maps)
- MediaId - In the case when you provided an entity or set of entities the filter will also append the media id to the return set. This allows you use this field in your Lava instead of having to load the attribute's value again from the database.
- MediaGuid - The filter will also provide the media elements Guid value in cases where you provided an entity or set of entities.
- MediaDefaultFileUrl - The default media file URL for the media element.
- MediaDefaultThumbnailUrl - The default media thumbnail URL for the media element.
- ResumePercentage - The position as a percentage between 0 and 100 that the media should resume at. If the media has been fully watched, this will be 100. This can be used to paint progress bars on the video. Server: v17.1
- ResumeLocationInSeconds - The position in seconds that the media should resume at. This is the last spot viewed in the media. If it has been fully viewed, this will be 0. Server: v17.1
- WatchInteractionGuid - The Guid of the interaction related to the previous view.
- WatchInteractionDateTime - The date time of the interaction related to the previous view.

The extra return data elements are provided so that you can wire up a media watch shortcode in a way that watch tracking and resume can be enabled without additional database calls. This shortcode requires the following parameters to be configured in this mannner: media (MediaGuid), interactionguid (WatchInteractionGuid), watchmap (WatchMap), and src (MediaDefaultFileUrl).

*Note: The additional parameters needed to wire up the media watch shortcode are not appended to persisted datasets as this would require additional database calls. It's up to your dataset definition to provide these recommended values.*

**Example:**

```
{% contentchannelitem where:'ContentChannelId == 5' sort:'StartDateTime desc' limit:'3' %}
    
    {% assign messagesWithWatches = contentchannelitemItems | AppendWatches:'Media',30 %}

    <ul>
    {% for item in messagesWithWatches %}
    
        <li>
            <h4>{{ item.Title }}</h4>
            <p>
                <strong>Has Watched:</strong> {{ item.HasWatched }}<br>
                <strong>Watch Length:</strong> {{ item.WatchLength }}<br>
                <strong>Watch Map:</strong> {{ item.WatchMap | ToJSON }}<br>
                <strong>Watch Interaction Guid:</strong> {{ item.WatchInteractionGuid }}<br>
                <strong>Media Id:</strong> {{ item.MediaId }}<br>
                <strong>Media Guid:</strong> {{ item.MediaGuid }}<br>
                <strong>Media Default Thumbnail URL:</strong> {{ item.MediaDefaultThumbnailUrl }}<br>
                <strong>Media Default File URL:</strong> {{ item.MediaDefaultFileUrl }}<br>
                <strong>Resume Percentage:</strong> {{ item.ResumePercentage }}<br>
                <strong>Resume Location In Seconds:</strong> {{ item.ResumeLocationInSeconds }}<br>
                
            </p>
        </li>
    {% endfor %}
    </ul>
{% endcontentchannelitem %}
```

```
<ul>
    <li>
        <h4>Of Myths and Money</h4>
        <p>
            <strong>Has Watched:</strong> true<br>
            <strong>Watch Length:</strong> 11.29<br>
            <strong>Watch Map:</strong> "71,550"<br>
            <strong>Watch Interaction Guid:</strong> 376ac970-b281-425f-860a-3f040ebae97c<br>
            <strong>Media Id:</strong> 1<br>
            <strong>Media Guid:</strong> 198a9b5a-32f0-43b0-89ac-996ef9e3d6b6<br>
            <strong>Media Default Thumbnail URL:</strong> https://rockrms.blob.core.windows.net/videos/rock-sample-video.mp4<br>
            <strong>Media Default Thumbnail URL:</strong> https://placehold.co/1920x1080<br>
            <strong>Resume Percentage:</strong> 11.29<br>
            <strong>Resume Location In Seconds:</strong> 7<br>
        </p>
    </li>
    <li>
        <h4>Of Faith and Firsts</h4>
        <p>
            <strong>Has Watched:</strong> true<br>
            <strong>Watch Length:</strong> 25.81<br>
            <strong>Watch Map:</strong> "121,200,41,260"<br>
            <strong>Media Id:</strong> 2<br>
            <strong>Media Guid:</strong> c36a0866-d172-4c6f-8ba2-a3d8c0c8b892<br>
            <strong>Media Default Thumbnail URL:</strong> https://rockrms.blob.core.windows.net/videos/rock-sample-video.mp4<br>
            <strong>Media Default Thumbnail URL:</strong> https://placehold.co/1920x1080<br>
            <strong>Resume Percentage:</strong> 58.06<br>
            <strong>Resume Location In Seconds:</strong> 36<br>
        </p>
    </li>
</ul>
```

 

# AsBoolean

Server: v7.0 Mobile: v1.0

Converts the input to a Boolean (true/false) value.

**Additional Details**

**Example:**

```
"Workflow": {
    "Option": "f"
}
```

```
{% assign isEnabled = Workflow | Attribute:'Option' | AsBoolean %}

{% if isEnabled == true %}
    It is enabled.
{% else %}
    Nope, it's disabled.
{% endif %}
```

```
Nope, it's disabled.
```

 

# AsDateTime

Server: v7.0 Mobile: v1.0

Converts the input to a DateTime value.

**Additional Details**

**Example:**

```
{{ '1/1/2017' | AsDateTime |  DateAdd:3,'d' }}
```

```
1/4/2017 12:00:00 AM
```

 

# AsDecimal

Server: v7.0 Mobile: v1.0

Converts the input to a decimal value.

**Additional Details**

**Example:**

```
"Workflow": {
    "Miles": "5.0001"
}
```

```
{% assign miles = Workflow | Attribute:'Miles' | AsDecimal %}

{% if miles > 5.0 %}
    {{ miles }} is more than 5.
{% else %}
    Less than 5 miles.
{% endif %}
```

```
5.0001 is more than 5.
```

 

# AsDouble

Server: v7.0 Mobile: v1.0

Converts the input to a double value (which has less precision than a decimal).

**Additional Details**

**Example:**

```
"Workflow": {
    "Precision": "5.00000000000000009"
}
```

```
{% assign miles = Workflow | Attribute:'Precision'| AsDouble %}

{% if miles > 5.0 %}
    {{ miles }} is more than 5.
{% else %}
    Well, it looks like {{ miles }} ({{ miles | ToJSON }}) is less than 5 miles.
{% endif %}
```

```
Well, it looks like 5 (5.0) is less than 5 miles.
```

**Note:**  
Use AsDecimal if you need the highest amount of precision.

 

# AsGuid

Server: v16.5

Converts the input to a Guid value.

**Additional Details**

Guids are used to uniquely identify items in a Rock instance, and they can be stored and retrieved in multiple text formats. This filter ensures that Guid values with different formats can be compared correctly.

If the input cannot be converted to a Guid, this filter returns an empty string.

**Example:**

```
{% assign guidString1 = '8FEDC6EE-8630-41ED-9FC5-C7157FD1EAA4' %}
{% assign guidString2 = '8FEDC6EE863041ED9FC5C7157FD1EAA4' %}
<p>Value 1: {{ guidString1 }}</p>
<p>Value 2: {{ guidString2 }}</p>
{% if guidString1 != guidString2 %}
<p>Compared as Strings, these values are different.</p>
{% endif %}
{% assign guidValue1 = '8FEDC6EE-8630-41ED-9FC5-C7157FD1EAA4' | AsGuid %}
{% assign guidValue2 = '8FEDC6EE863041ED9FC5C7157FD1EAA4' | AsGuid %}
{% if guidValue1 == guidValue2 %}
<p>Compared as Guids, these values are the same.</p>
{% endif %}
```

```
Value 1: 8FEDC6EE-8630-41ED-9FC5-C7157FD1EAA4
Value 2: 8FEDC6EE863041ED9FC5C7157FD1EAA4
Compared as Strings, these values are different.
Compared as Guids, these values are the same.
```

 

# AsInteger

Server: v7.0 Mobile: v1.0

Converts the input to an integer value.

**Additional Details**

**Example:**

```
"Workflow": {
    "Quantity": "3"
}
```

```
{% assign quantity = Workflow | Attribute:'Quantity' | AsInteger %}

{% if quantity > 0 %}
    There are more than none.
{% else %}
    There are none.
{% endif %}
```

```
There are more than none.
```

 

# AsString

Server: v7.0 Mobile: v1.0

Converts the input to a string value.

**Additional Details**

**Example:**

```
{{ CurrentPerson | AsString }}
```

```
Alisha Marble
```

 

# Base64Encode

Server: v7.0

Encodes the contents of a Rock binary file as a Base64 encoded string.

**Additional Details**

This filter is intended for binary files stored in Rock and does not encode arbitrary text values.

This filter has an optional input parameter:

- Image Resize Parameters: If the binary file is an image, this optional parameter can be used to resize and/or format the image using a collection of key/values. See notes below for details.

**Example:**

```
"CurrentPerson": {
    "FullName": "Ted Decker",
    "PhotoId": 85,
    "AnniversaryDate": '',
}
```

```
Base64Format: {{ CurrentPerson.PhotoId | Base64Encode }}<br/>
Base64Format: {{ CurrentPerson.PhotoId | Base64Encode:'h=25&w=25&mode=max&format=jpg' }}
```

```
Base64Format: /9j/4QAYRXhpZgAASUkqAAgAAAAAAAAAAAAAAP/sABFEdWNreQABAAQAAABb......KWv//Z
Base64Format: /9j/4AAQSkZJRgA...210uf/Z
```

**Note:**  

If using the optional Image Resize parameter, the filter will use the [ImageResizer](http://imageresizing.net/docs/v4/docs/basics) component to resize and/or format the image. Any of that component's supported parameters can be used (click the link for details).

If you need to encode a text value to Base64, use the ToBase64 filter instead.

 

# Client

Server: v7.0

Returns information about the client browser.

**Additional Details**

**Example:**

```
IP Address: {{ 'Global' | Client:'ip' }} <br />
Login: {{ 'Global' | Client:'login' }} <br />
Browser: {{ 'Global' | Client:'browser' }} <br />
```

```
IP Address: 12.34.55.15 (note this is not guaranteed to be the user's IP address, it could be
the users firewall / proxy server)
Login: tdecker
Browser: Windows 10 Other Chrome 57.0.2987
```

**Note:**  

Starting with Rock v20, the 'browser' parameter actually returns a structured object with lots of additional information. Below is a JSON representation of the details.

```
{
  "UserAgent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/57.0.2987.133 Safari/537.36",
  "OSFamily": "Windows",
  "OSVersion": {
    "Major": 10,
    "Minor": null,
    "Patch": null,
    "PatchMinor": null
  },
  "BrowserFamily": "Chrome",
  "BrowserVersion": {
    "Major": 147,
    "Minor": 0,
    "Patch": null
  },
  "DeviceFamily": "Other",
  "DeviceBrand": "",
  "DeviceModel": "",
  "ClientType": "Desktop"
}
```

ASP.Net also provides several additional server variables. The number and nature of these can change based on server and client. You can pass in any server variable key and the filter will return the value. To get a full list of keys use:

```
{{ 'Global' | Client:'parmlist' }}
```

 

# CreateEntitySet

Server: v16.3

Creates a new EntitySet from a list of entity identifiers of the specified type.

**Additional Details**

This filter accepts a set of entity identifiers, either as a comma-delimited list of values, an array, or an entity collection.

##### Parameters

1. EntityType: The Id, IdKey, Guid or Name of the Entity Type that identifies the type of the entities supplied in the filter input. This parameter is ignored if the input is an entity collection.
2. ExpireInMinutes (optional): The number of minutes after which the EntitySet is considered to be expired. If not specified, expiry is set to 20 minutes.
3. EntitySetPurposeValueId (optional): The identifier of a value from the Defined Type "Entity Set Purpose" that specifies the intended use of the EntitySet.
4. Note (optional): Additional information that describes the content of the EntitySet.
5. ParentEntitySetId (optional): Specifies a parent relationship between this EntitySet and an existing set.

#### Output

This filter returns a new EntitySet object.

**Example:**

```
{% person where:'LastName == "Miller" && FirstName ^= "T"' select:'Id' limit:4 %}
    {% assign personIdList = personItems %}
{% endperson %} 

{% assign entityTypeId = 15 %}

//- 578 is the "Person Merge Request" EntitySet Purpose
{% assign entitySet = personIdList | CreateEntitySet:entityTypeId,5,578,'Please merge.','' %}
Entity Set (Id={{ entitySet.Id }}) was created with {{ personIdList | Size }} people.
```

```
Entity Set (Id=1) was created with 2 people.
```

 

# CreateShortLink

Server: v8.0

Creates a [URL short link](https://community.rockrms.com/documentation/digital-publishing/websites/manage-pages/short-links) for the provided URL.

**Additional Details**

**Definitions**

- token (string): If you'd like to provide the token to use in the short code you can provide it here. Leave this blank ('') to use a random code.
- siteId (int): The id of the site to use for the shorting. By default the first site found with the 'Enabled for Shortening' set to true will be used. Pass in 0 if you'd like to force the default site.
- overwrite (bool): This determines what to do if the token you provided already exists. By default it will not overwrite an existing shortcode. If you provided a token, it exists and overwrite is set to false, a new random token will be returned. When set to true then the existing token will be used.
- randomLength (int): If using a random code, this determines how long it should be.
- categoryId (int): The ID of the category to assign this short link to. Useful for organizing and filtering links.
- isPinned (bool): Whether this link should be pinned to the top of the list. Use true to pin or false to leave it unpinned.

**Example:**

```
"ConnectionOpportunity": {
    "Url": "http://www.rocksolidchurchdemo.com/greeters"
}
```

```
Your personalized link is:
{{ ConnectionOpportunity | Attribute:'Url' | CreateShortLink }}
```

```
Your personalized link is:
http://www.rocksolidchurchdemo.com/HSGFTSF
```

**Note:**  
This filter attempts to return a valid shortlink at all cost. This means that if the configuration passed to it is invalid it will try to correct it with reasonable defaults. For instance if you pass in an invalid siteId, the first active site will be used. If you pass in an empty URL, or if no shortened site is enabled in Rock you will get an empty string.

 

# Debug

Server: v7.0

The debug filter provides you with a ton of information on the variables you have access to in your Lava.

**Additional Details**

**Example:**

```
"CurrentPerson": {
    "FullName": "Ted Decker"
}
```

```
{{ 'Lava' | Debug }}
```

**Note:**  

There are a couple of options on how you use this filter. The default shown in the example above will output the debug information for all the variables provided in the merge fields. The information will be shown to ALL logged in users.

If you'd like to limit who can see the debug information you can provide a username to limit on. In the example below only Ted Decker would be able to see the debug information.

```
{{ 'Lava' | Debug:'tdecker' }}
```

Up till this point we've gotten all of the variables back from the merge fields. You can optionally just report on a single field by piping it to the filter instead of the global 'Lava' keyword like so:

```
{{ CurrentPerson | Debug:'tdecker' }}
```

 

# EntityFromCachedObject

Server: v11.0

Returns a full entity object loaded from the database from its cached counterpart.

**Additional Details**

When you request the object for an attribute, you will get back a cached version of that entity if one is available. One example of this is a Campus attribute. This provides significant speed boosts to Rock and your Lava as it doesn't have to hit the database to load it. Occasionally, though, you might need an actual entity object rather than the cached object. This filter will let you take that cached object and get back a real database entity.

**Example:**

```
{% assign cached = Workflow | Attribute:'TargetCampus','Object' %}
{% assign campus = cached | EntityFromCachedObject %}
{{ campus.Location.FormattedAddress }}
```

```
3120 W Cholla St Phoenix, AZ 85029-4113
```

**Note:**  
If you pass in anything other than a cached object, the original value will be returned by the filter.

 

# FilterFollowed

Server: v10.0

Returns a subset of followed entities for the current user from either a Persisted Dataset or an entity command.

**Additional Details**

The filter is used in conjunction with either a Persisted Dataset or an entity command. Details on how to create a Persisted Dataset are available in the [Designing & Building Websites Using Rock](https://www.rockrms.com/documentation/bookcontent/14#persisteddatasets) guide.

**Example:**

```
<p>Entity Command Example</p>
{%- person where:'Id != 1' limit:'3' iterator:'People' -%}
  {%- assign followedItems = People | AppendFollowing | FilterFollowed -%}
<ul>
  {%- for item in followedItems -%}
    <li>{{ item.FullName }} - {{ item.IsFollowing }} </li>
  {%- endfor -%}
</ul>
{%- endperson -%}

<p>Persisted Dataset Example</p>
{%- assign data = 'mydataset' | PersistedDataset | AppendFollowing | FilterFollowed -%}
<ul>
{%- for item in data -%}
  <li>{{ item.Title }} - {{ item.IsFollowing }}</li>
{%- endfor -%}
</ul>
```

```
<p>Entity Command Example</p>
<ul>
    <li>Ted Decker - true</li>
</ul>

<p>Persisted Dataset Example</p>
<ul>
    <li>Friday 3/25 - true</li>
</ul>
```

 

# FilterUnfollowed

Server: v10.0

Returns a subset of entities that have not been followed by the current user from either a Persisted Dataset or an entity command.

**Additional Details**

The filter is used in conjunction with either a Persisted Dataset or an entity command. Details on how to create a Persisted Dataset are available in the [Designing & Building Websites Using Rock](https://www.rockrms.com/documentation/bookcontent/14#persisteddatasets) guide.

**Example:**

```
<p>Entity Command Example</p>
{%- person where:'Id != 1' limit:'3' iterator:'People' -%}
  {%- assign followedItems = People | AppendFollowing | FilterUnfollowed -%}
<ul>
  {%- for item in followedItems -%}
    <li>{{ item.FullName }} - {{ item.IsFollowing }} </li>
  {%- endfor -%}
</ul>
{%- endperson -%}

<p>Persisted Dataset Example</p>
{%- assign data = 'mydataset' | PersistedDataset | AppendFollowing | FilterUnfollowed-%}
<ul>
{%- for item in data -%}
  <li>{{ item.Title }} - {{ item.IsFollowing }}</li>
{%- endfor -%}
</ul>
```

```
<ul>
    <li>Cindy Decker - false</li>
    <li>Noah Decker - false</li>
</ul>

<p>Persisted Dataset Example</p>
<ul>
    <li>Saturday 3/26 - false</li>
    <li>Sunday 3/27 - false</li>
</ul>
```

 

# FromBase64

Server: v13.0

Decodes the base 64 encoded string and returns the resulting data.

**Additional Details**

If the true parameter is provided, then the data is returned as a human readable string. Otherwise a byte array of the raw data is returned. Why might I need this filter? Base 64 encoding is sometimes returned from API calls and usually must be decoded before it can be used.

**Example:**

```
"Object": {
    "Id": 23,
    "Data": "VGVkIERlY2tlcg=="
}
```

```
{{ Object.Data | FromBase64:true }}
```

```
Ted Decker
```

 

# FromCache

Server: v7.0

Reads objects from the Rock cache which will reduce the number of database reads your Lava produces.

**Additional Details**

This filter works by passing in either an integer or Guid of the cached item you'd like - or 'All' to retrieve all cached items of a given type v12.0 - along with the cache object type. Supported types are:

- DefinedValue
- DefinedType
- Campus
- Category
- GroupType
- Page
- Block
- BlockType
- EventCalendar
- Attribute
- NoteType
- ContentChannel
- EntityType
- ContentChannelItem (v20+)

**Example:**

```
"CurrentPerson": {
    "CampusId": "2"
}
```

```
<h4>Current Person's Campus</h4>

{% assign campus = CurrentPerson.PrimaryCampusId | FromCache:'Campus' %}

Current Person's Campus Is: {{ campus.Name }}

{% assign allCampuses = 'All' | FromCache:'Campus' %}

<h4>All Campuses</h4>

<ul>
{% for c in allCampuses %}
    <li>{{ c.Name }} </li>
{% endfor %}
</ul>
```

```
<h4>Current Person's Campus</h4>

Current Person's Campus Is: West-side Campus

<h4>All Campuses</h4>

<ul>
    <li>Main Campus</li>
    <li>West-side Campus</li>
</ul>
```

 

# FromIdHash

Server: v16.0

Returns a Rock Entity Id from an IdHash string generated by the ToIdHash filter.

**Additional Details**

This filter accepts an IdHash string generated by the ToIdHash filter. If the IdHash cannot be converted to a valid integer Id, this filter returns an empty value.

**Example:**

```
//- Get the IdHash for Ted Decker.
{% person where:'LastName == "Decker" && NickName =="Ted"' %}
...
   {% assign idHash = person.IdKey %}
...
{% endperson %}
Ted's IdHash is: {{ idHash }}.<br>
//- Pass the IdHash to the FromIdHash filter to get the person's Id.
{% assign personFromHash = idHash | FromIdHash | PersonById %}
Hello {{ personFromHash.NickName }}!
```

```
Ted's IdHash is: 5R6B5VmEYw.<br>
Hello Ted!
```

**Note:**  

v17.3 Starting in Rock v17.3, if the provided input represents a non-hashed integer string, this integer value will be immediately returned. This will be especially helpful if you're retrieving an Entity's identifier from a page parameter, and you're not sure whether it will be an IdHash or an integer.

 

# FromJSON

Server: v5.0 Mobile: v1.0

Takes a JSON string and makes a Lava object from it.

**Additional Details**

**Example:**

```
NA
```

```
{% capture jsonString %}
{
    "Name": "Ted Decker",
    "ServingTimes": [
      {
        "Date": "Friday 3/25",
        "Times": [
          "5:30 pm",
          "7:00 pm"
        ]
      },
      {
        "Date": "Saturday 3/26",
        "Times": [
          "4:30 pm",
          "6:00 pm"
        ]
      },
      {
        "Date": "Sunday 3/27",
        "Times": [
          "6:30 am sunrise",
          "9:00 am",
          "10:30 am",
          "12:00 pm"
        ]
      }
    ]
}
{% endcapture %}

{% assign jsonObject = jsonString | FromJSON %}
{{ jsonObject.Name }}
<ul>
{% for servingTime in jsonObject.ServingTimes %}
  <li>{{ servingTime.Date }}</li>
{% endfor %}
</ul>
```

```
Ted Decker
<ul>
    <li>Friday 3/25</li>
    <li>Saturday 3/26</li>
    <li>Sunday 3/27</li>
</ul>
```

 

# GroupByGuid

Server: v7.0

Returns a full Group object from the Guid of the group.

**Additional Details**

**Example:**

```
"GroupMember" {
    "Group": {
        Guid: "8fedc6ee-8630-41ed-9fc5-c7157fd1eaa4"
    }
    ...
}
```

```
{% assign group = GroupMember.Group.Guid | GroupByGuid %}

Group Name: {{ group.Name }}!
```

```
Group Name: Ushers
```

 

# GroupById

Server: v7.0

Provides a full Group object by providing an Id of the group.

**Additional Details**

**Example:**

```
"GroupMember" {
    "GroupId": 234
    ...
}
```

```
{% assign group = GroupMember.GroupId | GroupById %}

Group Name: {{ group.Name }}!
```

```
Group Name: Ushers
```

 

# GuidToId

Server: v17.0

Converts one or more entity Guid identifiers to corresponding Id values for the specified entity type.

**Additional Details**

This filter accepts a single Guid value, a comma-delimited list of values, or an array. If the input consists of multiple values, the output is an array of corresponding Id values in the same order as the input values.

This filter has the following parameters:

1. EntityType (required): The Id, Guid or Name of the Entity Type that matches the type of entity identified by the input Guid.

**Example:**

```
{% assign personGuid = '8fedc6ee-8630-41ed-9fc5-c7157fd1eaa4' %}
{% assign personEntityTypeId = '72657ed8-d16e-492e-ac12-144c5e7567e7' | GuidToId:'EntityType' %}
{% assign personId = personGuid | GuidToId:personEntityTypeId %}
Ted Decker's record can be identified by Guid '{{ personGuid }}' or Id '{{ personId }}'.
```

```
Ted Decker's record can be identified by Guid '8fedc6ee-8630-41ed-9fc5-c7157fd1eaa4' or Id '1'.
```

 

# HasRightsTo

Server: v6.0

This filter helps you check the security of the model you pass it.

**Additional Details**

**Example:**

```
[person model]
```

```
{{ person | HasRightsTo:'View' }}
```

```
true
```

**Note:**  

In the typical use case you'll be passing full models to the filter. It can also take just the Id of the model as long as you also provide the entity type. The example below would check for edit rights for the group with the id of 12.

{{ 12 | HasRightsTo:'Edit','Rock.Model.Group' }}

 

# HmacSha1

Server: v10.0 Mobile: v1.0

Converts a string into a SHA-1 hash using a hash message authentication code (HMAC).

**Additional Details**

Pass the secret key for the message as a parameter to the filter.

**Example:**

```
{% assign my_secret_string = 'RockIsAwesome!' | HmacSha1:'secret_key' %}
My encoded string is: {{ my_secret_string }}
```

```
My encoded string is: 17dbf467d8f49e9f541c7af8adf26c8422bdb342
```

 

# HmacSha256

Server: v10.0 Mobile: v1.0

Converts a string into a SHA-256 hash using a hash message authentication code (HMAC).

**Additional Details**

Pass the secret key for the message as a parameter to the filter.

**Example:**

```
{% assign my_secret_string = 'RockIsAwesome!' | HmacSha256:'secret_key' %}
My encoded string is: {{ my_secret_string }}
```

```
My encoded string is: 3518d7aa4ad81041e14033f2bbfa317e8f2f5aa26d6f48f719783aeaebe481ae
```

 

# ImageUrl

Server: v12.0

Simplifies making an image URL with a fallback.

**Additional Details**

This filter works by passing in either an integer or Guid of the image for which you want to create a URL. There are two input parameters:

- Fallback URL (optional): The URL to be returned if the integer ID or Guid input is not defined.
- Root URL (optional): This parameter is multipurpose:
	- If the parameter is not passed (is null), or a value of false is passed, the image URL will be returned without prepending Rock's root application URL.
		- If a value of true or 'rootUrl' is passed, the returned image URL will include Rock's root application URL, meaning it will be the complete URL to the image.

**Example:**

```
None
```

```
{% contentchannelitem id:'1' %}
    <img src="{{ contentchannelitem | Attribute:'Image','RawValue' | ImageUrl }}" />
    
    <img src="{{ contentchannelitem | Attribute:'Image','RawValue' | ImageUrl:'https://via.placeholder.com/150', true }}" />
{% endcontentchannelitem %}

<img src="{{ item | Attribute:'Image','RawValue' | ImageUrl:'https://via.placeholder.com/150' }}" />
```

```
<img src="/GetImage.ashx?Guid=0241ED2F-B527-424C-917C-1142A398711F">

<img src="http://www.rocksolidchurchdemo.com/GetImage.ashx?Guid=0241ED2F-B527-424C-917C-1142A398711F">

<img src="https://via.placeholder.com/150">
```

 

# IsFollowed

Server: v10.0

Takes an entity object as input and tests if it is being followed by the current person. Returns a boolean value of either true or false.

**Additional Details**

Has optional parameters to provide a purpose key (v13.4) and specify a different the person to test against instead of the current person.

**Example:**

```
{% assign group = 56 | GroupById %}
{% assign followed = group | IsFollowed %}
{% if followed == true %}
  <p>You are following the group {{ group.Name }}.</p>
{% else %}
  <p>You are not currently following the group {{ group.Name }}.</p>
{% endif %}
```

```
<p>You are following the group Serving Teams.</p>
```

 

# IsInDataView

Server: v14.1

Takes the given Entity or Entity Id and returns a boolean that indicates whether the entity is in the data view or not.

**Additional Details**

This filter operates on the given entity object or entity Id and has a single parameter:

- Data View Id: The Id of the specific data view you want to check.

**Example:**

```
"CurrentPerson": {
    ...
}

"Group" {
    "Id": 111,
    "Name" : "Decker Group"
    ...
}
```

```
{% assign inDataView = CurrentPerson.Id | IsInDataView:'1337' %}
{% if inDataView %}
   That person is in the 1337 data view.
{% endif %}

{% assign inDataView = Group | IsInDataView:'230' %}
{% if inDataView %}
   The '{{Group.Name}}' is in the 230 data view.
{% endif %}
```

```
That person is in the 1337 data view.

The 'Decker Group' is in the 230 data view.
```

**Note:**  
The Data View's 'Applies To' entity type is the assumed entity type for the given entity/entityId.

 

# Md5

Server: v10.0 Mobile: v1.0

Converts a string into an MD5 hash.

**Additional Details**

An example use case for this filter is showing the Gravatar image associated with the poster of a comment:

**Example:**

```
"Person": {
    "Email": "hi@example.com"
}
```

```
<img src="https://www.gravatar.com/avatar/{{ Person.Email | Trim | Downcase | Md5 }}" />
```

```
<img src="https://www.gravatar.com/avatar/767fc9c115a1b989744c755db47feb60">
```

 

# MetersToMiles

Server: v18.0

Converts meters to miles.

**Additional Details**

This filter converts meters to miles and accepts the following parameter:

- **Precision** (optional): The number of decimal places to convert to (default is 1).

**Example:**

```
7,623 meters is: {{ 7623 | MetersToMiles:2 }} miles
```

```
7,623 meters is: 4.74 miles
```

 

# MilesToMeters

Server: v18.0

Converts miles to meters.

**Additional Details**

Converts miles to meters.

**Example:**

```
2.4 miles is {{ 2.4 | MilesToMeters }} meters
```

```
2.4 miles is 3862 meters
```

 

# Notes

Server: v7.0

Retrieves notes for the provided entity.

**Additional Details**

This filter has plenty of options to help make retrieving notes simple. First you can pass the filter either a full entity (any type) or an integer that represents the entity id.

You must pass in either an integer that represents a note type id or a comma delimited string of note type ids.

Optional parameters include:

- Sort Order: string ('asc' or 'desc'). If no option is provided 'desc' is assumed.
- Count: an integer of how many items you'd like returned.

Security is checked on the notes based on the currently logged in user.

**Example:**

```
"CurrentPerson": {
    ...
}
```

```
{% assign notes = CurrentPerson | Notes:'4,5','asc',2 %}

Notes
{% for note in notes %}
    <p>{{ note.Text }} </p>
{% endfor %}
```

```
Notes
<p>Note one.</p>
<p>Note two.</p>
```

 

# Page

Server: v4.0

Returns information about the current page.

**Additional Details**

**Example:**

```
None
```

```
Title: {{ 'Global' | Page:'Title' }} <br />
BrowserTitle: {{ 'Global' | Page:'BrowserTitle' }} (v9) <br />
Description: {{ 'Global' | Page:'Description' }} (v7 +)<br /> 
URL: {{ 'Global' | Page:'Url' }} <br />
Page Id: {{ 'Global' | Page:'Id' }} <br />
Host: {{ 'Global' | Page:'Host' }} <br />
Path: {{ 'Global' | Page:'Path' }} <br />
Site Name: {{ 'Global' | Page:'SiteName' }} <br />
Site Id: {{ 'Global' | Page:'SiteId' }} <br />
Theme: {{ 'Global' | Page:'Theme' }} <br />
Layout: {{ 'Global' | Page:'Layout' }} <br />
Scheme: {{ 'Global' | Page:'Scheme' }} <br />
Cookies: {{ 'Global' | Page:'Cookies' }} (v8.4)<br />

{% assign queryParms = 'Global' | Page:'QueryString'  %}
Query Parms <br />
{% for item in queryParms %}
    {% assign kvItem = item | PropertyToKeyValue %}
    {{ kvItem.Key }}: {{ kvItem.Value }} <br />
{% endfor %}
```

```
Title: Home 
BrowserTitle: Home of the Browser's Title
Description: This is the page description 
URL: http://localhost:6229/page/1 
Page Id: 1 
Host: localhost 
Path: /page/1 
Site Name: External Website 
Site Id: 3 
Theme: Stark 
Layout: Homepage 
Scheme: http 

Query Parms 
Id: 12
SomeOtherId: 23
```

**Note:**  

In most cases the properties are returned as strings. The 'QueryString' property will return an array of query parameters. The Lava sample below shows how to use them.

```
{% assign queryParms = 'Global' | Page:'QueryString'  %}
{% for item in queryParms %}
    {% assign kvItem = item | PropertyToKeyValue %}
    {{ kvItem.Key }}: {{ kvItem.Value }} 
{% endfor %}
```

The Cookies property will return an array of Cookie objects.

```
{% assign cookies = 'Global' | Page:'Cookies'  %}
{% for cookie in cookies %}
    {{ cookie.Name }}: {{ cookie.Value }} 
{% endfor %}
```

 

# PageParameter

Server: v7.0

Returns the value of a specified page parameter.

**Additional Details**

**Example:**

```
Example URL: http://rock.rocksolidchurchdemo.com/Group/12
```

```
The Group Id passed in from the URL is: {{ 'Global' | PageParameter:'GroupId' }}
```

```
The Group Id passed in from the URL is: 12
```

**Note:**  
If the value is an integer it will be returned as an integer otherwise it will be a string.

 

# PageRedirect

Server: v4.0

Will redirect the page to the provided URL.

**Additional Details**

Be very careful on how you configure this filter. You always want to provide a way to get back to this page, without it redirecting, so that you can edit your lava. Below are two strategies for doing this.

If your lava is inside of an HTML block you can use that block's 'CurrentPersonCanEdit' merge field to stop the redirect if the current user has edit access to the block. An example of this usage is below.

```
{% if CurrentPersonCanEdit %}
    <p class="alert alert-warning">If you could not edit you would be redirected to: <a href="http://www.rockrms.com">http://www.rockrms.com</a>.</p>
{% else %}
    {{ 'http://www.rockrms.com' | PageRedirect }}
{% endif %}
```

Another strategy to allow the editing of the lava content is to add ?Redirect=false to the query string. If the lava filter sees this in the page's address it will not perform the redirect. Instead it will display the link that it would have redirected to.

**Example:**

```
"Event": {
    "ExternalUrl": "http://www.rockrms.com",
}
```

```
{{ Event.ExternalUrl | PageRedirect }}
```

```
The current page request will be redirected to the address provided.
```

 

# PageRoute

Server: v13.0

Converts a page identifier into a URL string.

**Additional Details**

The identifier can either be a Page Id, a Page Guid or a full page route (as shown in the example) which contains <PageGuid\>,<RouteGuid\>. You can optionally pass in a string of parameters to use when generating the URL. The parameters should be separated by `^`. Each parameter should consist of a key and value separated by an `=`. You may also pass in a dictionary object that contains the parameters.

**Example:**

```
{{ 'Global' | Attribute:'WorkflowEntryPage','RawValue' | PageRoute:'WorkflowTypeId=10^WorkflowId=324' }}
```

```
/WorkflowEntry/10/324
```

 

# PersistedDataset

Server: v10.0

Returns data contained in a Persisted Dataset as a Lava object.

**Additional Details**

Details on how to create a Persisted Dataset are available in the [Designing & Building Websites Using Rock](https://www.rockrms.com/documentation/bookcontent/14#persisteddatasets) guide.

Note: If your persisted dataset is configured to be cached in memory, the results provided come from the shared in-memory version. Using filters like AddToDictionary or RemoveFromDictionary will modify this shared instance.

**Example:**

```
{% assign data = 'mydataset' | PersistedDataset %}
<ul>
{% for item in data %}
  <li>{{ item.Title }}</li>
{% endfor %}
</ul>
```

```
<ul>
    <li>Friday 3/25</li>
    <li>Saturday 3/26</li>
    <li>Sunday 3/27</li>
</ul>
```

 

# Postback

Server: v3.0

This is a very specialized Lava filter that helps to wire-up ASP.Net postbacks. This is only available on specific blocks that provide 'Postback Commands'. The 'Group Details Lava' is an example of a block that provides these hooks.

**Additional Details**

**Example:**

```
"Group": {
    "Id": 1
}
```

```
<a class="btn btn-default btn-sm pull-right" href="#" onclick="{{ Group.Id | Postback:'EditGroup' }}">Edit</a>
```

```
<a class="btn btn-default btn-sm pull-right" href="#" onclick="javascript:__doPostBack('ctl00_main_ctl33_ctl01_ctl06_upnlContent','EditGroup^1'); return false;">Edit</a>
```

 

# Property

Server: v5.0 Mobile: v1.0

Returns the property of a provided object. This often saves you from having to assign an object to a variable to get just one of its properties.

**Additional Details**

**Example:**

```
"CurrentPerson": {
    "FullName": "Ted Decker",
    "AnniversaryDate": '',
}
```

```
{{ CurrenPerson.NickName}}, your campus is: {{ CurrentPerson | Campus | Property:'Name'  }}
```

```
Ted, your campus is: Main Campus
```

**Note:**  
The 'Property' filter does allow you to use dot notation so you can do things like:  
`{% assign campusLeader = CurrentPerson | Campus | Property:'LeaderPersonAlias.Person' %}    {{ campusLeader.FullName }}`

 

# PropertyToKeyValue

Server: v4.0

Takes a property and returns it as a key/value pair. This is helpful for iterating over a list of properties.

**Additional Details**

**Example:**

```
"CurrentPerson": {
    "Attributes": [
        {
            "FavoriteMovie": "Star Wars"
        },
        {
            "FavoriteStarWarsEpisode": "Episode VI"
        },
        {
            "FavoriteStarWarsCharacter": "Boba Fett"
        }
    ]
}
```

```
<ul>
{% for attribute in Attributes %}
    {% assign attributeParts = attribute | PropertyToKeyValue %}

    <li>{{ attributeParts.Key | Humanize | Capitalize }}: {{ attributeParts.Value }} </li>
{% endfor %}
</ul>
```

```
<ul>
    <li>Favorite Movie: Star Wars</li>
    <li>Favorite Star Wars Episode: Episode VI</li>
    <li>Favorite Star Wars Character: Boba Fett</li>
</ul>
```

 

# ReadCookie

Server: v12.1

Gets the value of a HTTP cookie for the current user session.

**Additional Details**

This filter has the following format:  

```
{{ 'cookieName' | ReadCookie }}
```

**Definitions**

- cookieName (string): A name that uniquely identifies the cookie. This should be the same as the name that used to set the cookie with the WriteCookie filter.

**Example:**

```
You recently told us that your favorite cookie is {{ 'FavoriteCookie' | ReadCookie }}
and your favorite color is {{ 'FavoriteColor' | ReadCookie }}.
```

```
You recently told us that your favorite cookie is choc-chip
and your favorite color is green.
```

**Note:**  
If a cookie with the specified name does not exist or has expired, the filter will return an empty string.

 

# RenderStructuredContentAsHtml

Server: v15.0

Takes the given [structured content](https://community.rockrms.com/documentation/digital-publishing/content-management/content-channels) and renders it as HTML.

**Additional Details**

This filter operates on the given structured content and renders it as HTML:

- Content: String saved using the StructuredContentEditor control. The string is saved with metadata which this filter uses to render it as HTML.
- User Values (optional): If there are corresponding user values to include in the rendered output, those can be included (introduced v16.7).

**Example:**

```
"StructuredContent": {
    ""time"":1676039688279,
    ""blocks"":[
       {
          ""id"":""a2FYCrj8NG"",
          ""type"":""header"",
          ""data"":{
             ""text"":""Things I love."",
             ""level"":2
          }
       },
       {
          ""id"":""egdM-bpIfg"",
          ""type"":""list"",
          ""data"":{
             ""style"":""ordered"",
             ""items"":[
                {
                   ""content"":""Reading a good book."",
                   ""items"":[
                      
                   ]
                },
                {
                   ""content"":""Helping others."",
                   ""items"":[
                      
                   ]
                },
                {
                   ""content"":""Seeing other people laugh."",
                   ""items"":[
                      
                   ]
                }
             ]
          }
       }
    ],
    ""version"":""2.22.1""
 }
```

```
{{ StructuredContent | RenderStructuredContentAsHtml }}
```

```
<h2>Things I love.</h2>
<ol>
    <li>Reading a good book.</li>
    <li>Helping others.</li>
    <li>Seeing other people laugh.</li>
</ol>
```

**Note:**  
The filter will return an empty string if the 'StructuredContent' is not in the right format or cannot be parsed as HTML.

 

# ResolveRockUrl

Server: v7.0

This filter helps to resolve the application path in Rock using ~/ for the application home and ~~/ for the theme home. This is helpful when writing Lava that may be used by several organizations.

**Additional Details**

**Example:**

```
"Person": {
    "Id": 12623
}
```

```
{% assign personProfilePage = '~/Person/' %}

The link for this person is: '{{ personProfilePage | ResolveRockUrl }}{{ CurrentPerson.Id }}'
```

```
The link for this person is: '/Rock/Person/12623'
( assumes Rock was stored in a virtual directory called 'Rock')
```

 

# RockInstanceConfig

Server: v12.0

Shows configuration values for the current Rock instance.

**Additional Details**

The five supported settings are shown in the example.

**Example:**

```
Application Directory: {{ 'ApplicationDirectory' | RockInstanceConfig }}
Physical Directory: {{ 'PhysicalDirectory' | RockInstanceConfig }}
Machine Name: {{ 'MachineName' | RockInstanceConfig }}
Is Clustered: {{ 'IsClustered' | RockInstanceConfig }}
System Date/Time: {{ 'SystemDateTime' | RockInstanceConfig | Date:'yyyy-MM-dd HH:mm:ss' }}
```

```
Application Directory: D:\inetpub\wwwroot\Rock\bin
Physical Directory: D:\inetpub\wwwroot\Rock\bin
Machine Name: MYROCKSERVER
Is Clustered: false
System Date/Time: 2020-11-17 10:30:01
```

 

# RunLava

Server: v13.0

Executes Lava that is inside a string.

**Additional Details**

This can be useful when taking Lava from an Attribute Value that needs to be processed before displaying to an individual. The Lava executes in the same security context as the existing Lava. So if you have Entity Commands enabled in your parent Lava, then the child Lava you execute will also be able to run Entity Commands.

**Example:**

```
{
    "Value": "{% assign test = 'Hello World' %}{{ test }}"
}
```

```
<p>
    {{ Value }}
</p>
<p>
    {{ Value | RunLava }}
</p>
```

```
<p>
    {% assign test = 'Hello World' %}{{ test }}
</p>
<p>
    Hello World
</p>
```

 

# SetPageTitle

Server: v4.0

Takes a string as input and sets the page's title.

**Additional Details**

**Example:**

```
"CurrentPerson": {
    "FullName": "Ted Decker",
    ...
}
```

```
{% capture pageTitle %}Current Person - {{ CurrentPerson.FullName }}{% endcapture %}
{{ pageTitle | SetPageTitle }}
```

```
The page title would be: 'Current User - Ted Decker'.
```

**Note:**  
The example show will change the page title on the page and in browser window. As of v9.0, if you'd like to update just one you can add an additional parameter to your filter.
- {{ 'New Title' | SetPageTitle:'BrowserTitle' }}
- {{ 'New Title' | SetPageTitle:'PageTitle' }}

 

# SetUrlParameter

Server: v14.0

Sets a parameter in the input URL string and returns the updated URL.

**Additional Details**

To modify the URL of the current page, specify "Current" as the input string.

Available parameters:

1. the URL parameter name. If the parameter exists in the page route, the route will be modified - if not, the parameter will be added to the query string.
2. the parameter value. To remove an existing parameter, specify an empty string.
3. the format of the output URL (optional):
	- absolute = A complete URL, including scheme and host name.
		- relative = A URL that is expressed relative to the current Rock host server.
If the input string is not recognized as a URL, it will be returned unmodified.

**Example:**

```
Example 1:
{{ 'https://rocksolidchurchdemo.com/reporting/reports/12' | SetUrlParameter:'ReportId','155' }}

Example 2:
{{ 'https://rocksolidchurchdemo.com/reporting/reports' | SetUrlParameter:'CategoryId','101' }}
```

```
Example 1:<br>
https://rocksolidchurchdemo.com/reporting/reports/155
<hr>
Example 2:<br>
https://rocksolidchurchdemo.com/reporting/reports?CategoryId=101
```

**Note:**  

If the input URL specifies a Rock page on the current site, modifying the "PageId" parameter changes the target page of the URL. Parameters from the input URL are reapplied to the new target page URL, with route parameters being assigned first and the remaining parameters added to the query string.

 

# Sha1

Server: v10.0 Mobile: v1.0

Converts a string into a SHA-1 hash.

**Additional Details**

**Example:**

```
{% assign my_secret_string = 'RockIsAwesome!' | Sha1 %}
My encoded string is: {{ my_secret_string }}
```

```
My encoded string is: 845b0f246f221697761d085847fbc056652d03d0
```

 

# Sha256

Server: v10.0 Mobile: v1.0

Converts a string into a SHA-256 hash.

**Additional Details**

**Example:**

```
{% assign my_secret_string = 'RockIsAwesome!' | Sha256 %}
My encoded string is: {{ my_secret_string }}
```

```
My encoded string is: 06530e8aabeb6becaabcd0c357134f3cd0a340d87500002b0a14929d92e0ac78
```

 

# ToBase64

Server: v19.0

Encodes a string (or byte collection) as a Base64 string.

**Additional Details**

When provided a text value, the string is encoded using UTF-8 before being converted to Base64. If a byte collection is provided, the raw bytes are encoded directly.

If you need to encode a binary file stored in Rock (such as a BinaryFile), use the `Base64Encode` filter instead.

**Example:**

```
"CurrentPerson": {
    "FullName": "Ted Decker",
    "AnniversaryDate": '',
}

"BinaryData": [0, 1, 2, 3, 255]
```

```
ToBase64: {{ CurrentPerson.FullName | ToBase64 }}<br/>
ToBase64: {{ BinaryData | ToBase64 }}<br/>
```

```
ToBase64: VGVkIERlY2tlcg==
ToBase64: AAECA/8=
```

 

# ToIdHash

Server: v16.0

Returns an alphanumeric string that can be used to uniquely identify a Rock Entity.

**Additional Details**

This filter accepts either a Rock entity object or an integer Id value.

**Example:**

```
{% person id:'5' %}
   {{ person.NickName }}'s IdHash is '{{ person | ToIdHash }}' and Id is {{ person.Id }}.
{% endperson %}
```

```
Ted's IdHash is '5R6B5VmEYw' and Id is 5.
```

**Note:**  
Using an IdHash identifier provides an added layer of security to your external links by using a non-sequential entity reference in situations where a bad actor could otherwise attempt to gain access to similar entities by substituting the reference in the original link with a predictable alternative such as the next number in a sequence.

 

# ToJSON

Server: v4.0 Mobile: v1.0

Returns a JSON representation of the object. This is useful if you are wanting to return the object for use in JavaScript.

**Additional Details**

**Example:**

```
"CurrentPerson": {
    "NickName": "Ted",
    "LastName": "Decker"
}
```

```
{{ CurrentPerson | ToJSON }}
```

```
{
    "NickName": "Ted",
    "LastName": "Decker"
}
```

 

# UniqueIdentifier

Server: v7.0

Generates a new GUID (UUID) string. These are generally considered to be globally unique. This makes them ideal to use inside a shortcode where you need to identifier an HTML element by id but know the shortcode may be used twice on the same page.

**Additional Details**

- The input value is ignored.
- The generated string takes the format of "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx", where each "x" can be 0-9 or A-F.

**Example:**

```
{{ '' | UniqueIdentifier }}
```

```
E9206998-3Fb5-4ED1-A372-C593A79C7DD1
```

 

# UpdatePersistedDataset

Server: v18.0

Updates a persisted dataset using the specified key.

**Additional Details**

This triggers a persisted dataset to update by running its Lava template.

- **Delay Processing Until Complete** (optional, default: false): Determines whether the filter should wait until persistence is complete. In most cases, you won't need to wait—but for certain use cases, it might be necessary.

**Example:**

```
{{ 'DataSetKey' | UpdatePersistedDataset }}
```

 

# UploadBinaryFile

Server: v18.0

Uploads content into a Rock Binary File. This allows file content to be persisted in the database and used at a later time. The filter returns either a BinaryFile object or null.

**Additional Details**

This filter has the following format:

```
{{ 'content' | UploadBinaryFile:'binaryFileTypeId','filename','mimeType','format',isTemporary,'binaryFileId' }}
```

**Definitions**

- binaryFileTypeId (string): The identifier of the binary file type to use when storing the file data. This may be an integer id, encrypted id, or unique identifier.
- filename (string): The name of the file.
- mimeType (string, optional): The MIME type that will be used to identify the type of file, such as 'application/pdf'. If not provided then 'application/octet-stream' will be used by default.
- format (string, optional): The type of input being passed to the filter. This can be either 'base64' or 'raw'. If not provided then 'raw' will be used by default. If 'base64' is specified then the string will be decoded from base64 and be stored as binary data.
- isTemporary (bool, optional): The file will be marked for permanent storage by default, if you instead want to make the file temporary then pass 'true' without quotes here.
- binaryFileId (string, optional): If specified, then an existing binary file will be updated instead of a new file being created. This may be an integer id, encrypted id, or unique identifier.

**Example:**

```
{% assign content = 'Hello Rock Community' %}
{% assign file = content | UploadBinaryFile:'3', 'hello.txt', 'text/plain' %}
<a href="/GetFile.ashx?Guid={{ file.Guid }}">Download</a>
```

```
<a href="/GetFile.ashx?Guid=48a414ab-23b8-4700-9dda-00c156adb360">Download</a>
```

 

# Url

Server: v7.0 Mobile: v1.0

The Url filter allows you to easily get access to parts of a URL without a ton of string manipulation.

**Additional Details**

**Example:**

```
{% assign url = 'https://www.rockrms.com/WorkflowEntry/35?PersonId=2' %}
Testing URL {{ url }}
host - {{ url | Url:'host' }}
port - {{ url | Url:'port' }}
segments - {{ url | Url:'segments' | ToJSON }}
scheme - {{ url | Url:'scheme' }}
protocol - {{ url | Url:'protocol' }}
localpath - {{ url | Url:'localpath' }}
pathandquery - {{ url | Url:'pathandquery' }}
queryparameter no key - {{ url | Url:'queryparameter' }}
queryparameter with key - {{ url | Url:'queryparameter','PersonId' }}
url - {{ url | Url:'url' }}
invalid_part - {{ url | Url:'invalid_part' }}
```

```
Testing URL https://www.rockrms.com/WorkflowEntry/35?PersonId=2
host - www.rockrms.com
port - 443
segments - [ "/", "WorkflowEntry/", "35" ]
scheme - https
protocol - https
localpath - /WorkflowEntry/35
pathandquery - /WorkflowEntry/35?PersonId=2
queryparameter no key -
queryparameter with key - 2
url - https://www.rockrms.com/WorkflowEntry/35?PersonId=2
invalid_part -
```

 

# WriteCookie

Server: v12.1

Sets a HTTP cookie for the current user session. Cookies provide a means of storing information about the current user's session that can be accessed in subsequent requests.

**Additional Details**

This filter has the following format:  

```
{{ 'cookieName' | WriteCookie:'value','expiryInMinutes' }}
```

**Definitions**

- cookieName (string): A name that uniquely identifies the cookie. The name is required and is used to retrieve the cookie in subsequent requests.
- value (string): The value to be stored in the cookie.
- expiryInMinutes (int, optional): Setting an expiry value cause the cookie to be deleted after the specified number of minutes has elapsed. If you do not specify an expiry time, the cookie will be available until it is overwritten, deleted by the user, or the session expires.

**Example:**

```
{{ 'FavouriteCookie' | WriteCookie:'choc-chip','5' }}
{{ 'FavouriteColor' | WriteCookie:'green' }}
```

```
(none)
<p>
This filter modifies the response sent back to the user by including the specified cookie with an expiration time of 5 minutes.
It does not produce any output.
</p>
```

 

# XamlWrap

Server: v10.0 Mobile: v1.0

Wraps XAML in CDATA tags to make it XML compliant.

**Additional Details**

**Example:**

```
"Item": {
    "Id": 12,
    "Content": '# Heading
    The quick brown folx jumped over the lazy dog.
    ',
}
```

```
<Rock:Markdown>{{ Item.Content | XamlWrap }}</Rock:Markdown>
```

```
<Rock:Markdown><![CDATA[The quick brown folx jumped over the lazy dog.]]</Rock:Markdown>
```


---

## Assign / Capture {#assign-capture}

> **Path:** Lava > Tags > Assign / Capture

As you become more familiar with Lava you'll find it necessary to start creating your own variables for use in your templates. This guide will walk you through several options you have in creating and using variables within Lava.

## Starting Simple

The simplest way to create a variable is with the `assign` tag. Its usage is pretty straight forward.

```
{% assign name = 'Ted Decker' %}
Oh it's you {{ name }}...
```

Just keep in mind that variables must not contain spaces. You can have a variable called `fullname` but `full name` won't work.

Note: If you have a single quote character (') in your raw string you must encode it as ASCII code `&#39` or use double quotes for the string in the assign.

## Going Deeper

A more realistic sample of using variables might be one that uses them with filters and conditional logic.

```
{% assign hour = 'Now' | Date:' H' %}

{% if hour <= 12 %}
    Good Morning!
{% elsif hour < 6 %}
    Good Afternoon!
{% else %}    
    Good Evening!
{% endif %}
```

## Complex Assignments

If you would like to combine several strings into a single variable you can use the `capture` tag. This tag 'captures' whatever is rendered inside it and stores it into a variable instead of displaying it on the screen.

```
{% capture message %}{{ Person.NickName }} is a {{ Person.ConnectionStatusValue.Value }}{% endcapture %}
{{ message }}
```

