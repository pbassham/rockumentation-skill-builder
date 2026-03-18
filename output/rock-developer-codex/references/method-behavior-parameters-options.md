> **Path:** Developer Codex > Coding Standards > Method Behavior Parameters ("Options")

# Method Behavior Parameters ("Options")

***When building a method that takes options (parameters) that change the behavior of the method, a POCO should be used instead of individual parameters. This is a recent change to our style (12/1/2021).***

The reason for this is that many methods have grown over the years to include additional parameters. Because we need to maintain backwards binary compatibility that means we need to keep the old method signatures around, thus resulting in multiple methods that just call the main method. It often also leaves us with a method that has 8 or more parameters that must be passed in order to get to the one parameter you actually want.

This is cumbersome in both the method implementation as well as when calling the method.

For example, suppose you have a method called `GetCampuses()` and need to pass it the following parameters that alter it's behavior:

-   includeInactive
-   campusType
-   campusStatus

If these are all passed as parameters then we might have ended up with the following method signatures defined for our method:

```csharp
GetCampuses();
GetCampuses( bool includeInactive );
GetCampuses( bool includeInactive, CampusType campusType );
GetCampuses( bool includeInactive, CampusType campusType, CampusStatus campusStatus );
```

Instead, we will pass a POCO that defines the options:

```csharp
GetCampuses( CampusQueryOptions options = null );

class CampusQueryOptions
{
    public bool IncludeInactive { get; set; }
}
```

In our implementation of `GetCampuses()`, we would check if options is null and if so assign a new (empty) `CampusQueryOptions` value to it. Ideally, this should be taken from a static field somewhere to reduce the number of object creations.

However, the point is we can now add additional options to `CampusQueryOptions` without changing any method signatures or existing code. When adding new options a default value should be set in the POCO that maintains the desired existing functionality.

For example, suppose our initial `CampusQueryOptions` POCO didn't have `IncludeInactive` and the method was always including in-active campuses. If that was the desired intention then the initial value should be set to `true`. On the other hand, if the intention was that normally the method would not include inactive campuses, then the initial value could be `false`. Said another way, is the current implementation a bug or intended? Often, this decision should be made with the DSD and/or PO.

If the new option does not need to alter existing functionality then it can be simply defined with a default value that means as much. In our example above, when we add the campusType and campusStatus values, we would alter the POCO in a way to maintain that. In this case, by using nullable values:

```csharp
class CampusQueryOptions
{
    public bool IncludeInactive { get; set; }

    public CampusType? CampusType { get; set; } = null;

    public CampusStatus? CampusStatus { get; set; } = null;
}
```

Note: The `= null;` is not necessary, but was added above to make the point that the value is null by default and would therefore be ignored in the `GetCampuses()` method.

Remember to document these new `CampusType` and `CampusStatus` properties properly. A comment that says "gets or sets the campus type" is not enough. Your comment should indicate how the query will change based on the value set: "Limits the results to only campuses that match the specified CampusType. If null, then all campus types will be included."

In this particular case, a better POCO would probably be one that takes multiple campus types and statuses. It is likely that at some point we will want to set "get all campuses that are either open or pending":

```csharp
class CampusQueryOptions
{
    public bool IncludeInactive { get; set; }

    public List<CampusType> CampusTypes { get; set; } = null;

    public List<CampusStatus> CampusStatuses { get; set; } = null;
}
```

In this case, your documentation comment would be along the lines of "Limits the results to only campuses that match one of the specified values. If null or empty, then all campus types will be included."

Remember, that this new "options POCO" only applies to *behavior parameters*. Meaning, if one of the parameters to your `GetCampuses()` method is `RockContext`, that should not be included in the POCO. That parameter doesn't alter the behavior of the method, simply where it gets the data from. Likewise, if you instead had something like `FilterCampuses()` that took a list of campuses, you would define it as such:

```csharp
FilterCampuses( List<Campus> campuses, CampusQueryOptions options );
```

As you can see, we can now use `CampusQueryOptions` in both the `GetCampuses()` method as well as the `FilterCampuses()` method. Sometimes this can't be done, but whenever possible you should try to implement the specific properties and functionality in a way that can be used beyond your one specific method.

This new "options POCO" style does not apply across the board to every method you create. Remember that your method name should clearly indicate the intent. So if your method is a laser focused implementation that is *not* intended to be changed, you don't need to use a POCO (unless you are going to have a ton of parameters right off the bat). An example of this would be something like:

```csharp
/// <summary>
/// This method will retrieve all campuses that are currently active,
/// open and physical.
/// </summary>
GetAllCurrentPhysicalCampuses( bool includeInactive = false );
```

Three things to note.

1.  Our method name clearly states what the method is doing by use of a few terms:
    1.  "All" - This implies everything with no additional filtering options available.
    2.  "Current" - This implies the campus is Open. We could have said "Open" in the method name, but that locks us into a specific status. i.e. what if we later added a "Temporary" status?
    3.  "Physical" - This implies that only Type = Physical will be returned.
2.  Because of how specific the method name is, a developer that comes along later should think twice about altering the method to add some new feature.
3.  The XML documentation clearly states the intent of what is returned. In this case we do use the word "open" but later that might change to "open or temporary".

**Remember**: to keep these methods focused on a single task. i.e. our above `GetCampuses()` and `FilterCampuses()` methods should only be concerned about loading the data and returning the models. They should not be performing any conversions (such as to a ViewModel) or calculations. Keep the unit of work on target. This serves to keep the method easy to understand, easy to unit test, and easy to re-use. It also helps keep the POCO in a state that can be re-used by other similar methods.
