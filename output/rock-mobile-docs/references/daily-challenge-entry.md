> **Path:** Mobile Docs > 🧱 Essentials > Blocks > CMS > Daily Challenge Entry

# Daily Challenge Entry

Displays a set of challenges for the individual to complete today.

M v3.0 C v12.5

This one is going to be a *challenge* to describe, but we'll get you up to speed on how to use it. This block allows you to build a visual interface to provide challenges to your people. These challenges span multiple days and comprise one or more individual challenge items on each day. An example might make more sense of what we are talking about.

Let's suppose you want to have a 7 day "Get to Know God" challenge. Each day they are prompted to complete two tasks: Prayer and Bible reading. Each day would give different instructions about what to pray for and what verses to read. When they first land on the page hosting this block they will see the challenge items for day 1. After they tick those off they might see a "way to go" type message. Then the next day when they return they will see the items for day 2, and so on. Once they finish day 7 and come back the next day they start on day 1 again.

## Lava Reference

When your lava template is parsed, you will get a number of merge fields to help you render the daily challenge. There is some sequence of operations you will need to be aware of.

First, you will probably want to check if the CompletedChallenge merge field is not `null`. If it contains a value then that means the user just finished the final challenge item for a day. In this case, you likely want to display some kind of "well done" message, or possibly switch to a read-only view that removes the check-boxes - since trying to uncheck an item from a fully completed day is not allowed. In this case, the Challenge merge field may contain either the same object as the CompletedChallenge or it may contain what the system thinks is the "next" daily challenge, depending on the situation. But generally you probably don't want to just display whatever is in the Challenge at this point.

Secondly, if the MissedDates merge field contains any values then those should be displayed to the user and must be filled in before you display the challenge in the "Challenge" merge field. Otherwise, they will start a new challenge. Also, the MissedDates must be filled in sequentially. Meaning, if they missed two dates they need to fill in the challenge for the first date and then the second date, otherwise it will also break the challenge and start them over. The default template displays just the first date of the array.

Note

You can have both a CompletedChallenge value as well as items in the MissedDates array. For example, say there are two missed dates and you have them continue and fill out the first missed date. Upon completion, your CompletedChallenge merge field will contain the first missed date challenge they just completed and your MissedDates array will now have a single item for the second day they had missed.

If both MissedDates is empty and CompletedChallenge is `null`, then the `Challenge` merge field contains the DailyChallenge that needs to be displayed for the user to complete. You will need to check the IsComplete property to determine if this is a challenge that has already been completed and if so display it in a read-only manner.

### Merge Fields

-   MissedDates - An array of dates that indicate the user has missed one or more dates in their current challenge that they can still go back and fill in. Note that this merge field will be empty if you have requested by any means that a specific challenge be shown.
-   Challenge - The current DailyChallenge. This is normally the challenge that should be displayed. However, if there are any MissedDates then this value will be for "Day 1" and start a new challenge. If you wish to allow the individual to continue their previous challenge you must first have them complete any missed dates (in order).
-   CompletedChallenge - This will be set to the DailyChallenge that the user completed upon clicking the last checkbox. It can be used to draw different content (like a "well done" message) once they have completed all the challenges for a day.
-   TodaysChallengeGuid - The unique identifier of the daily challenge that indicates today's challenge. This can be different than the Challenge value in as it takes into account an ongoing challenge where they might have skipped some days. One exception to this is if you pass a query string parameter of DailyChallengeGuid to request a specific challenge then this value will match that challenge.
-   Progress - This contains an array of ChallengeState objects that show you the progress of their current challenge. This is an ordered array where the first item in the array corresponds to "Day 1" and the last item in the array corresponds to the last day of the challenge.

### Object Structure

#### ChallengeState

-   Guid - The unique identifier of the daily challenge.
-   IsComplete - Will be `true` if the individual has completed the challenge corresponding with this day.

#### DailyChallenge

This object contains all the details about a single day of a challenge.

-   Guid - The unique identifier of the daily challenge.
-   HeaderContent - This contains the same text content as the "Content" box when editing the "Day 1", "Day 2", etc. items. This is normally displayed at the top of the page before any checkboxes.
-   IsComplete - Will be `true` if the individual has completed this daily challenge already. For example, if they have just checked the last checkbox, or if you are linking directly to a previously completed daily challenge.
-   ChallengeItems - An array of all the ChallengeItem objects (checkboxes) for this specific day. These will already be in the order you defined.
-   ChallengeItemValues - A dictionary that contains any values for the ChallengeItems. The dictionary key is the item unique identifier and the value is a ChallengeItemValue object. If you are building a read-only view of the challenge you can use these values. However, if you are building an editable view then you will want to use the bindings version.
-   AttributeValues - If you defined any custom attributes for the daily challenge then they will show up here. This is a dictionary of attribute keys and string values.

#### ChallengeItem

This object contains the information about a single checkbox item that will be displayed for the user to complete.

-   Guid - The unique identifier of the challenge item.
-   Title - The text from the content channel item title. This is normally displayed next to the checkbox.
-   Content - The text from the "Content" box of the content channel item.
-   InputType - This is a special use attribute. If it is not blank then the internal block logic will require the user to enter a value in the ChallengeItemValue's Value property.
-   AttributeValues - If you defined any custom attributes for the challenge item then they will show up here. This is a dictionary of attribute keys and string values. You can use this to provide custom rendering logic to your lava template. It will not include the "InputType" value.

#### ChallengeItemValue

Contains the user-supplied information about a single challenge item. Meaning, if it has been completed and any custom user value that was entered.

-   Guid - The unique identifier of the challenge item this value is for.
-   IsComplete - Will be `true` if the checkbox is checked.
-   Value - Contains any custom value the user has typed into a text field for this item.

## XAML Bindings

So your lava template will set up the initial XAML content to paint the page. But how do you link user actions (like tapping a checkbox) back so it actually does something? There are some special bindings available to you:

-   Challenge.ItemValues - An array of ChallengeItemValues. This array is in the same order as the one provided to your lava template.
-   Challenge.ToggleChallengeItem - A command that toggles a checkbox on or off. The command parameter is the item unique identifier.
-   Challenge.ShowChallengeForDate - A command that will run your lava template again with the DailyChallenge for the date. The command parameter is the value from the MissedDates array.
-   Challenge.ShowCurrentChallenge - A command that will run your lava template again with the specified DailyChallenge. The command parameter is the unique identifier of the DailyChallenge to be shown.

Okay, so those are the XAML bindings available. But examples certainly make more sense than just the description. For a moment, lets imagine that all we are going to display is a checkbox and the name of the item to be completed. So we will loop through the Challenge.ChallengeItems array and render out a horizontal stacklayout to contain our checkbox and then the label.

```
{% for item in Challenge.ChallengeItems %}
    <StackLayout Orientation="Horizontal" Spacing="0">
        <Rock:Icon IconClass="{Binding Challenge.ItemValues[{{ forloop.index0 }}].IsComplete, Converter={Rock:BooleanValueConverter True=check-circle, False=circle}}"
            TextColor="{Binding Challenge.ItemValues[{{ forloop.index0 }}].IsComplete, Converter={Rock:BooleanValueConverter True=#EF8903, False=#C3CED1}}"
            Margin="0 8 0 0"
            VerticalOptions="Center"
            Command="{Binding Challenge.ToggleChallengeItem}"
            CommandParameter="{{ item.Guid }}" />
                    
        <Label Text="{{ item.Title | Escape }}"
            VerticalTextAlignment="Center"
            VerticalOptions="Center"
            StyleClass="challenge-title">
            <Label.GestureRecognizers>
                <TapGestureRecognizer Command="{Binding Challenge.ToggleChallengeItem}"
                    CommandParameter="{{ item.Guid }}" />
            </Label.GestureRecognizers>
        </Label>
    </StackLayout>
{% endfor %}
```

Most of that should look pretty normal to you. We have a bit of a mix between lava and bindings. In some places we are using lava to display a value (for example, the Label text). In others, you will notice we are using binding values. The binding value means it will actually persist the change in value. If we had used a normal lava "if" statement then it wouldn't automatically update or track the change in value.

But, that binding syntax is probably not what you normally see, so let's break it down. There are two parts to the binding, first is the path and then the converter. Let's take a look at that path first.

`Challenge.ItemValues[{{ forloop.index0 }}].IsComplete`

This is binding to the array `Challenge.ItemValues` and then binding to a specific item in the array, identifies by `{{ forloop.index0 }}`, which is the index of the item being processed in the loop. Finally, in that particular indexed object we are binding to the `IsComplete` property. Next is the converter.

`{Rock:BooleanValueConverter True=check-circle, False=circle}`

What we are doing here is taking that boolean value from the `IsComplete` property and running it through a converter that will return different values depending on if the value is true for false. If it is true we return `check-circle` and if it is false it returns `circle`. This gives us the allusion of a nice checkbox that we can style ourselves.

Note

You might wonder why we didn't just use an actual checkbox. The reason is that the checkbox doesn't have a Command. And when you bind the value of the checkbox to the IsComplete property it won't properly pick up the fact that we might reject the change in value if it isn't allowed.

## Setup

So how do you set up these challenges? You are going to use a Content Channel to do that. You will also need to setup 2 Content Channel Types (if you set up multiple challenges you can re-use these channel types).

### Content Channel Types

The first content channel type will hold the challenges that you are going to set up, in this case we are talking about your 7-day "Get to Know God" challenge. To create a general use Content Channel Type for these challenges. Create a new Content Channel Type with the following settings:

-   Name = Multi-Day Challenge
-   Date Range Type = No Dates
-   Disable Priority = Yes
-   Disable Status = Yes
-   Show in Channel List = Yes

Next, create a second Content Channel Type that will hold the individual items to be completed each day.

-   Name = Challenge Items
-   Date Range Type = No Dates
-   Disable Priority = Yes
-   Disable Status = Yes
-   Show in Channel Lists = Yes
-   Item Attributes
    -   Name = Input Type
    -   Field Type = Single-Select
    -   Values = Text,Memo
    -   Control Type = Drop Down List

The item attribute allows you to specify that the challenge item should have a (required) input field. You can also define other item attributes and these will be included in the Lava so you can better customize how things are displayed.

### Content Channels

First, we are going to create the content channel that will hold the individual challenge items to be completed each day.

-   Name = Challenge Items
-   Type = Challenge Items
-   Default Content Control = Code Editor

Now you need to create a Content Channel for the actual 7-day challenge.

-   Name = Get to Know God
-   Type = Multi-Day Challenge
-   Child Content Channels = Challenge Items (the one you just created above)
-   Items Manually Ordered = Yes
-   Child Items Manually Ordered = Yes

Note

You can also add Item Attributes to this channel. These will apply to the individual days (Day 1, Day 2, etc) and be made available to you in Lava. This allows you to customize each day if you want.

## Day Items

It may seem obvious, but you need to create a Content Channel Item inside your "Get to Know God" channel for each day. To keep things simple, just create 7 items titled "Day 1", "Day 2", and so on up to "Day 7". If you get things out of order, you can use manual sorting to put things in the proper order. That order is used to determine the order of the days, not the title.

All you really need is the Title, but you can enter some XAML in the Content that will be displayed at the top of the page when viewing that day's challenges.

#### Challenge Items

Go into "Day 1" and create a new child item.

-   Title = Pray for 15 minutes

Then add a second item to be the challenge item for reading the bible.

-   Title = Read the Bible
-   Content = <Label Text="Genesis 1:1-18" />

So we now have two items that will be displayed for "Day 1". The first is a checkbox with the title "Pray for 15 minutes" and no additional content. The second item will be a checkbox with the title "Read the Bible" and then below that it will display the verses that they are supposed to read.

To complete this you would do the same for "Day 2" through "Day 7". And obviously you can use different verse references. You can even have them in different order or additional items to be completed on certain days.

Important

The default lava template expects you to use XAML inside the Content fields for both the Day content channel items and the individual challenge item content channel items. If you try to use just a plain text string it will throw a rendering error.

### Styling

Since this is a XAML template there is no styling X-Ray
