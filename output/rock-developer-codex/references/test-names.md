> **Path:** Developer Codex > Coding Standards > Testing > Unit Testing > Test Names

# Test Names

Unit test names should follow the natural English language when reading them and almost always follow this pattern: <what is being tested>\_With<how it is being tested>\_<expected result>.

The "what is being tested" might be the class name itself, a method name, or something a bit more abstract. But remember, the more abstract it is the less understandable it is. Also, to keep good english and not be overly verbose you don't always need to perfectly match the class name or method name. For example with a class name of `AgeOpportunityFilter` might make the "what is being tested" just `AgeFilter`.

The "how it is being tested" should begin with the word `With` unless it just doesn't make grammatical sense. Remember to use good english, so instead of `WithMinMax` say `WithMinAndMax`.

Finally the "expected result" should clearly and specifically describe the expected result by looking at just the test name and not the test body. In other words, don't use `IsValid`. Use something like `IncludesPerson` or `ReturnsCorrectNumberOfDecimals`.

Some examples of bad test names:

-   DictionaryReturnsCorrectValue
-   RootActivityDoesNotExceedCap
-   NoFilterIncludesAll

Some examples of good test names:

-   Dictionary\_WithStringKey\_ReturnsMatchingValueForKey
-   RootActivity\_WithTooManyChildren\_DoesNotExceedMaxChildCount
-   AgeFilter\_WithNoConditions\_IncludesAnyBirthdate
