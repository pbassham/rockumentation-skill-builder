---
description: Use when users need to filter people by age group classifications like adults or children in data views and reports
source: "https://community.rockrms.com/documentation/bookcontent/6/364"
sourceLabel: Taking Off With Reporting
---
> **Path:** Taking Off With Reporting > Filtering Using Data Views

Filtering Using Data Views

The bulk of your reporting will happen in Data Views. Data Views are a way to select and filter records based on any field in the system. And by any, we mean any! For the most part, you'll be creating views that display individuals and sometimes groups. Data Views are not limited to just these two entities though. You can write a Data View for any type of data in Rock including financial transactions (aka giving), metrics, page views, etc.

Let's start by looking at a couple of the Data Views that come out-of-the-box. Data Views are configured under Tools \> Data Views.

Below is a figure of the default list of data views. Over time you'll collect plenty of data views. To help you organize them we allow you to create a hierarchical directory of categories. The use of categories again becomes a part of your reporting strategy. What good is a reusable data view if you can't find it when you need it?

![Anatomy of a Dataview](https://rockrms.blob.core.windows.net/documentation/Books/6/1.18.0/images/data-view-overview-v18.png)

Anatomy of a Data View

Now let's drill into the first data view called *Adult Members & Attendees*. As you probably guessed, this view filters adults who have the connection status of *Member* or *Attendee*. It also only returns only active records. Click the Edit button to see how this data view is configured.

![Editing a Data View](https://rockrms.blob.core.windows.net/documentation/Books/6/1.18.0/images/data-view-edit-v18.png)

Editing a Data View

Next, let's look at the Adult Members & Attendees \> Females Data View. Initially you might expect to see a lot of the same criteria as the previous *Adult Members & Attendees* data view, with the addition of the female gender filter. Clicking the Edit button, you’ll see the data view strategy at work.

![Female Members and Attendees](https://rockrms.blob.core.windows.net/documentation/Books/6/1.18.0/images/example-data-view-female-members-v18.png)

Female Members and Attendees

Notice how the first criterion is *Included in Data View: Adult Members & Attendees*? That says, "Take all of the filter criteria from the *Adult Members & Attendees* data view and apply it here." Since that logic was already built, all we needed to do here was add the gender filter.

Now, let's say in the future you'd like to enhance the definition of *Adult Members & Attendees* by ensuring that the age of the individual is over 18. You can add this to the base view, and it will dynamically apply to all subsequent views that use it.

# Age Classifications

Speaking of the ages of individuals...Rock allows for simple and quick filtering on whether an individual is an Adult or a Child using the Age Classification property. This property is available as a Person filter type when creating Data Views and as a Field Type when creating Reports (more on that in the next chapter). In Rock, an adult is anyone over the age of 18 or marked as an adult in one or more families. A child is anyone less than 18 or a child in all families. If neither of these conditions are met, the individual is marked as Unknown. Rock calculates age each time a person is saved and re-calculates it every time the Rock Cleanup job is run.

# Any vs All

At the top of the filter group, you’ll notice a setting that says *Show if Any/All of these are true*. You might be wondering what’s the difference between *Any* and *All*. Let’s define each:

- **All:** This means that each of the filter criteria must be true in order for a record to be displayed. One helpful trick is to read through each filter and insert the word *and* in between each. So, for a record to display in the *Adult Members & Attendee* view, a record must: have a record status of active AND a connection status of member or attendee AND must be an adult in a family.
  
- **Any:** This setting means that if *Any* of the filter criteria is true then display the record. It's like inserting the word *OR* between each criterion.

# If You Forget

If you forget the difference, read the *Filter* summary on the data view detail view. It writes out the criteria inserting *AND* or *OR* for you.

# Filter Groups

For complex views you may need to include both *AND* and *OR* type logic into your view. Filter groups give you this option. Say for instance you need to create a view that shows individuals who are married AND a member OR who are single AND an attendee. That data view would be configured like this:

![Filter Groups](https://rockrms.blob.core.windows.net/documentation/Books/6/1.18.0/images/data-view-using-filter-groups-v18.png)

Filter Groups

Note how we have two filter groups where if *Any* of them is true the record is selected. They in turn have criteria that must *All* match.

# Post-Filter Transformations

The Post-Filter Transformation gives you the option to "flip" the results of a Data View with ease. For example, if your Data View includes the kids attending summer camp, selecting the *Parent* transformation will find the parents of those kids. If your Data View includes *Adult Members & Attendees*, choosing the *Children* transformation will give you the children of those selected. To provide as much flexibility as possible, Rock allows you to transform data views by applying the following transformations:

- Allowed Check-In
- Allowed Check-In Children
- Children
- Family Members
- Father
- Giving Leader
- Grandchild
- Grandparent
- Head of Household
- Mother
- Parents
- Spouse

# Securing Data Views

There will be Data Views that you want to limit access to. Note that you can control who has access to Data Views. To change the default security on a Data View, click the button on the data view details screen.

You can also check the access for Data View categories. This allows you to modify the security for all Data Views in that category.

# Taking Security Further

Controlling who has access to Data Views is important. But you also need to limit who can make new Data Views with certain criteria. You can limit what filters are available to specific people and groups under  
Admin Tools \> Settings \> Data Filters. Here you'll see a list of available filters with the ability to change who has access to use each filter.

When filtering on the attributes of an entity (like person attributes), normal attribute security will be used in controlling access.

You can also control security on the Data View transforms. This can be configured under  
Admin Tools \> Settings \> Data Transformations.

# Let's Go Farther

You can create your own post filter transforms and custom filters. Doing this does take some programming knowledge, but it's possible. See our [developer docs](https://community.rockrms.com/developer) for more information.

# Persisting Data Views

Sometimes when you have an extremely large or complex Data View, it can take a long time for Rock to filter down to just the records you're interested in. This can be critical when you're relying on the information in the data view for reports, for workflow actions (using [Lava](https://community.rockrms.com/lava/commands/entity-commands#dataview)) and just to keep the load on your server as low as possible. This is especially true when you have data views referencing several other data views.

Persisted Data Views to the rescue! If Persistence is enabled, Rock will only calculate the records in the list as frequently as you specify. That means that when you click on the data view, Rock already knows what records are in the list and can provide them extremely quickly. (Calculating the contents of persisted data views is what the [Update Persisted Dataviews](https://community.rockrms.com/documentation/bookcontent/9/#jobs) job does, in case you were wondering).

When you persist a Data View, keep in mind that the statistical data (Time to Run, Runs Since, and Last Run) may not update as frequently as you'd expect. These values usually change only when the Data View's results are updated, not when the persisted results are being used. In other words, retrieving data from a persisted Data View doesn’t require it to be re-run, so the run statistics aren't always updated. Most of the time, the Data View will only be truly re-run when the job recalculates its contents, and that’s when you can generally expect the statistics to change.

Since Rock isn't calculating the contents of these Data Views every time you load it, that does mean that the list might be out of date by up to the interval you specify. For instance, let's say that you have a very involved data view that, among other requirements, requires that the people in it are members of a certain group. But it's such an involved data view that it takes quite some time to load, so you set a Persistence Interval of "2 Hours". If Ted Decker matches all of the filters, then he will show up in the Data View when it's calculated, as expected (along with anyone else who matches all the filters). Now, if Ted leaves the group that you have to be a member of to be included in that Data View, it's possible that he will continue showing up in that Data View for up to two hours; the next time that persisted Data View will be re-evaluated.

Usually, it's not extremely important that your Data Views be absolutely accurate up to the second, so that might not be a big deal. But if you're relying on a data view for something that needs to truly reflect the absolute latest data, then you should leave the *Enable Persistence* setting disabled.

## Nested Persisted Data Views

Now, let's look deeper at nested Data Views and how it works when they're persisted. Let's say that we make "Adult Member & Attendees" a Persisted Data View - it's going to be calculated every two hours. Let's also say that we have another Data View that has a filter that specifies that the people must also be in the "Adult Member & Attendees" Data View. (Usually, you'd have other filters as well, naturally). It would look something like this:

![Nested Data View](https://rockrms.blob.core.windows.net/documentation/Books/6/1.18.0/images/nested-persisted-dataview-v18.png)

Nested Data Views

Since "Adult Member & Attendees" is now persisted and only calculated every two hours, then whenever you load a Data View that references it (with "Use Persisted" selected as shown) the list of Adult Members and Attendees might be as much as two hours old. Hopefully nobody stopped being a member/attendee that quickly, but if they did, they could continue showing up in this Data View until the next time the nested Data View is calculated.

Put another way: if a Data View has persisted child data views, it will use the **persisted version** of the child data view if "Use Persisted" is enabled.

In general, it would be much faster to persist a data view if "Use Persisted" is enabled on its child data views. However, its accuracy is limited to the child data view that had the *longest* "Persistence Interval".

