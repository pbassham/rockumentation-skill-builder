---
description: Use when needing to understand how to cache and reuse large datasets in Rock using the PersistedDataset Lava filter for performance optimization
source: "https://community.rockrms.com/documentation/bookcontent/14/370"
sourceLabel: Designing and Building Websites Using Rock
---
> **Path:** Designing and Building Websites Using Rock > Persisted Datasets

Persisted Datasets

Extensibility and performance are often in conflict. Some large datasets can be resource intensive to process, so users might be left waiting seconds, or even minutes for results. Other datasets, like getting an attribute of another attribute, might perform adequately, but cause issues at scale. With Persisted Datasets you can shape data for speed and reuse demanding queries without worrying about performance.

By simply caching data as JSON, you can re-use it for later transformations (website, app, etc.) without having to rebuild it from scratch. Persisted Datasets are cached on the database or in memory and can be called by Lava filters to transform data for as many uses as you can think of.

# How Persisted Datasets Work

Let’s take a look at what makes Persisted Datasets tick.

## Output

To output a persisted dataset, you just need to use the `PersistedDataset` Lava filter, which looks something like this:



{%- assign data = 'mydataset' | PersistedDataset -%}
{%- for item in data -%}
  {{ item.Title }}
{%- endfor -%}
                

In the above example, `mydataset` is the name of the Persisted Dataset *Access Key* and `data` returns the data contained in the dataset. You can find more information on how to use the `PersistedDataset` Lava filter in the [How to Use It](#howtouseit) section below.

## Behind the Scenes

To create a Persisted Dataset, you’ll use a Lava-based build script to create JSON, which is then stored in memory.



\[
    {% campus where:'Id != "0"' %}
        {% for item in campusItems %}
            {
                "Id": {{ item.Id | ToJSON }},
                "Name": {{ item.Name | ToJSON }}
            }
            {% if forloop.last == false %},{% endif %}
        {% endfor %}
    {% endcampus %}
\]
                

Because this is Lava-enabled, you have access to all the power of Lava, including SQL, Entity Commands, Execute and Web Requests.

# How to Use It

Let's see how to actually set up your first Persisted Dataset. In your Rock instance, go to Admin Tools \> CMS Configuration \> Persisted Datasets and create a new dataset. You’ll see the screen pictured below.

Add New Persisted Dataset

![Add New Persisted Dataset](https://rockrms.blob.core.windows.net/documentation/Books/14/1.18.0/images/add-new-persisted-dataset-v18.png)

1 Name

Choose a memorable name to use for organizing your Persisted Datasets.

2 Access Key

The Access Key uniquely identifies the dataset. This will be the key to use when using the `PersistedDataset` Lava filter.

3 Description

Include a note about the information you’re storing and where it’s being used. Your future self will thank you for providing an informative description.

4 Build Script

Provide the Lava Template to use for building the JSON that will be used as the cached dataset object.

5 Enabled Lava Commands

Use these settings to control what code can run inside of your build script.

6 Persistence Schedule

If enabled, your dataset will update on a persisted schedule. Choose one of the following types:

- **Interval**: Saves the cached dataset at a regular cadence, such as every 12 hours or every 3 days.
- **Schedule**: Sets specific days and times to rebuild the dataset, like M/W/F at 3 a.m. Ideal for large data volumes.

7 Memory Cache Duration

Because Persisted Datasets are generally stored in memory, the duration allows you to automatically remove a dataset from memory after the specified number of hours. For example, if you were to set the field to “24” and the dataset was not accessed for over 24 hours, the data would be removed from memory. This frees up memory for other tasks and keeps Rock running fast.

This is a sliding timeline, so each time the object is read the counter will reset. You can also leave this field blank to not cache the object in memory, which means it will be deserialized into the object on each request (still fast).

8 Entity Type

The JSON object will be associated with the Entity Type selected here.

9 Allow Manual Refresh

If you need to force a dataset to use the most recent data, enable this setting and Rock will add a button to the list view grid to manually update data.

10 Expires on

The dataset will not return data and won’t be updated by the refresh job after this date.

## Building Persisted Dataset Lava

The Persisted Dataset *Build Script* is Lava that has been specifically formatted to output as JSON. You’ll need to format your *Build Script* to create properly formatted JSON that Rock can then deserialize. So, when you’re creating a *Build Script* using Lava, keep a few things in mind:

- When outputting values use the `ToJSON` filter, which automatically sanitizes and formats your output. For example, `"Name": {{ item.Name | ToJSON }}` will output `"Name": "Phoenix Campus"`.
- You’ll need to add commas between values to create valid JSON.
- Your build script is compiled once, and the Lava should not be customized per user.

##### Example Build Script



\[
{%- assign slots = '140' | FromCache:'DefinedType' -%}
    {%- for item in slots.DefinedValues -%}
        {
            "Id": {{ item.Id | ToJSON }},
            "Slot": {{ item.Value | ToJSON }},
            "SlotDay": {{ item | Attribute:'Day' | ToJSON }},
            "SlotTime": {{ item | Attribute:'Time' | ToJSON }},
            "SlotDateTime": {{ item | Attribute:'DateTime' | ToJSON }},
            "SlotIsSchedulable": {{ item | Attribute:'IsSchedulable' | ToJSON }},
            "SlotLength": {{ item | Attribute:'Length' | ToJSON }},
            "SlotDateTime": {{ item | Attribute:'DateTime' | ToJSON }}
        }{%- unless forloop.last -%},{%- endunless -%}
    {%- endfor -%}
\]
                

Now that you know a little bit more about how Persisted Datasets work, let’s take a look at a specific example. A good use case is displaying the output of timeslots for a conference. From the example pictured below, there are a few details we want to point out.

![Example Persisted Dataset](https://rockrms.blob.core.windows.net/documentation/Books/14/1.18.0/images/example-persisted-dataset-v18.png)

Example Persisted Dataset

Given the example *Build Script* pictured above, you could use the Lava shown below to output to your page:



{%- assign slots = 'conferenceslots' | PersistedDataset -%}
<ul\>
{%- for item in slots -%}
  <li\>{{ item.Slot }} ({{ item.SlotTime }} minutes) - {{ item.SlotDateTime }}</li\>
{%- endfor -%}
</ul\>

