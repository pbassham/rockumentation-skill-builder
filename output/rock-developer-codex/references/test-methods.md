> **Path:** Developer Codex > Coding Standards > Testing > Unit Testing > Test Methods

# Test Methods

When writing the body of a unit test, follow the [AAA pattern](https://dev.to/coderjay06/the-three-a-s-of-unit-testing-b22). Your test should be divided into 3 sections: Arrange; Act; Assert. There are times, especially with complex integration tests, where you have to break the mold. That's okay, just question if this should really be multiple tests or if it does need to be one large test.

-   **A**rrange the state of the data to set it up for testing.
-   **A**ct on the data through some method that performs an action.
-   **A**ssert that the result from acting on that data is what we expect it to be.

For simple tests the last two will each be one-liners. Do not merge these into a single line for "simplicity". It might make sense to you now, but later and to other developers they will have to pause to understand what exactly is being tested.

```csharp
// Don't do this
Assert.IsTrue( obj.IsSomethingIncluded() );

// Do this
var isIncluded = obj.IsSomethingIncluded();

Assert.IsTrue( isIncluded );
```

In the linked example they include comments showing each section. You do not need to that unless you have a large test where it is not obvious when you are moving from one section to the next.

**Use helper methods.** Your test will likely be creating the same objects over and over again with only slight differences. If it is a one-liner to create it then just put it inline. But if it takes a few lines to create the object and set the sane-default values, create a private helper method.

```csharp
// Don't do this
var obj = new AgeFilter();
obj.MinimumAge = 34; // This is the only value that ever changes.
obj.MaximumAge = null;
obj.Id = 1;
obj.Name = "test filter";

// Do this (see below on variables)
var obj = CreateAgeFilter( 34 );
```

**Use well named variables** related to the things being tested (as described in the method name).

```csharp
// Don't do this
var obj = CreateAgeFilter( 34 );

// Don't do this
var age = 34;
var obj = CreateAgeFilter( age );

// Do this
var minimumPersonAge = 34;
var ageFilter = CreateAgeFilter( minimumPersonAge );
```
