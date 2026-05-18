---
description: "Use when you need to extend .NET classes with helper methods for booleans, controls, dates, dictionaries, enums, and other common data types in Rock applications"
source: "https://community.rockrms.com/developer/101---launchpad"
sourceLabel: 101 — Launchpad
---
> **Path:** 

Extension methods are a great way to add functionality to existing .Net classes and we made some to make your life easier. Just include the "`using Rock;`" in your code. You should definitely review the full list in the `Rock.ExtensionMethods` class, but we've highlighted most of them here for your reference.

## Boolean Extensions

**Bit()** returns a numeric 1 (if true) or 0 (if false).

**ToYesNo()** returns either "Yes" or "No".

**ToTrueFalse()** returns the string "True" or "False".

## CheckBoxList Extensions

**SetValues()** sets the Selected property of each item to true for each given matching values.

## Control Extensions

**LoadControl()** loads a user control using the constructor with the parameters specified.

**RockBlock()** gets the parent RockBlock.

**ParentUpdatePanel()** returns the parent update panel for the given control (or null if none is found).

**ControlsOfTypeRecursive()** gets all controls of Type recursively [http://stackoverflow.com/questions/7362482/c-sharp-get-all-web-controls-on-page](http://stackoverflow.com/questions/7362482/c-sharp-get-all-web-controls-on-page).

## DateTime Extensions

**Age()** returns the age at the current date.

**TotalMonths()** returns the total months.

**TotalYears()** returns the total years.

**ToElapsedString()** returns a friendly elapsed time string.

**ToRelativeDateString()** returns a string in FB style relative format (x seconds ago, x minutes ago, about an hour ago, etc.), or if max days has already passed, in FB datetime format (February 13 at 11:28am or November 5, 2011 at 1:57pm).

**ToJavascriptMilliseconds()** converts the date to an Epoch of milliseconds since 1970/1/1.

**ToMonthDayString()** converts the date to a string containing month and day values (culture-specific).

## Dictionary (liquid) Extension Methods

**Update()** adds a new key/value to dictionary or if key already exists will update existing value.

## Dictionary Extension Methods

**AddOrReplace<TKey, TValue\>()** adds or replaces an item in a Dictionary.

**AddOrIgnore<TKey, TValue\>()** adds an item to a Dictionary if it doesn't already exist in Dictionary.

## Enum Extensions

**ConvertToString()** converts the enum value to its string value.

**GetDescription()** gets the enum description.

**ConvertToInt()** converts to int.

**ConvertToEnum()** converts a string value to an enum value.

```
// Assuming you've got an enum such as:
    public enum Status
    {
        Success,
        Fail,
        EpicFail,
    }

    // elsewhere, you can get the enum if you've only got the string value:
    Status s = "Epic Fail".ConvertToEnum<status>();    // w00t!</status>
```

**ConvertToEnumOrNull()** converts to enum or null.

**AsDelimited()** concatenates the items.

**AsGuidList()** converts a List to List only returning items that could be converted to a guid.

**AsIntegerList()** converts a List to List only returning items that could be converted to an int.

**Join()** joins a dictionary of items.

## Geography Extension  Methods

**Coordinates()** coordinates the specified geography.

## HiddenField Extensions

**ValueAsInt()** values as int.

**SetValue()** sets the value.

**IsZero()** determines whether the specified hidden field is zero.

## HTMLControl Extensions

**AddCssClass()** adds a CSS class name to an html control.

**RemoveCssClass()** removes a CSS class name from an html control.

## IEntity Extensions

**RemoveEntity()** removes the entity.

## IHasAttributes Extensions

**LoadAttributes()** loads the attributes.

**SaveAttributeValues()** saves the attribute values.

**CopyAttributesFrom()** copies the attributes.

**DefinedValue()** gets the Defined Value name associated with this id.

**SetReadOnlyValue()** sets the read only value.

**BindToEnum()** binds to enum.

**BindToDefinedType()** binds to the values of a definedType.

```
ListControl ddl = new ListControl();
ddl.BindToDefinedType( DefinedTypeCache.Read( myConfiguredDefinedTypeGuid ) );
```

**SelectedValueAsInt()** returns the Value as Int or null if Value is.

**SelectedValueAsId()** returns the value of the currently selected item. It will return NULL if either is selected.

**SelectedValueAsEnum()** selects the value as enum.

**SelectedValueAsEnumOrNull()** selects the value as enum or null.

**SelectedValueAsGuid()** selects the value as unique identifier.

## Object Extensions

**ToJson()** converts object to JSON string.

**GetPropertyValue()** gets the property value.

**ToStringSafe()** safely ToString() this item, even if it's null.

**lavaDebugInfo()** returns an html representation of object that is available to Lava.

## Route Extensions

**AddPageRoute()** adds the page route.

## Stream Extension Methods

**ReadBytesToEnd()** reads entire stream and converts to byte array.

## String Extensions

**RemoveSpecialCharacters()** removes special characters from strings.

**SplitCase()** splits a Camel or Pascal cased identifier into separate words.

**SplitDelimitedValues()** returns a string array that contains the substrings in this string that are delimited by any combination of whitespace, comma, semi-colon, or pipe characters.

**GetListItems()** returns a List of ListItems that contains the values/text in this string that are formatted as either 'value1,value2,value3,...' or 'value1^text1,value2^text2,value3^text3,...'

**ReplaceCaseInsensitive()** replaces every instance of oldValue (regardless of case) with the newValue.

**ReplaceWhileExists()** replaces every instance of oldValue with newValue. Will continue to replace values after each replace until the oldValue does not exist.

**EscapeQuotes()** adds escape character for quotes in a string.

**Quoted()** adds quotes around the specified string and escapes any quotes that are already in the string.

**Left()** returns the specified number of characters, starting at the left side of the string.

**Truncate()** truncates a string after a max length and adds ellipsis. Truncation will occur at first space prior to maxLength.

**Pluralize()** pluralizes the specified string.

**Singularize()** singularizes the specified string.

**AsNumeric()** removes any non-numeric characters.

**AsBoolean()** returns True for 'True', 'Yes', 'T', 'Y', '1' (case-insensitive).

**AsBooleanOrNull()** returns True for 'True', 'Yes', 'T', 'Y', '1' (case-insensitive), null for empty string/null.

**AsInteger()** attempts to convert string to integer. Returns 0 if unsuccessful.

**AsIntegerOrNull()** attempts to convert string to an integer. Returns null if unsuccessful.

**AsGuid()** attempts to convert string to Guid. Returns Guid.Empty if unsuccessful.

**AsGuidOrNull()** attempts to convert string to Guid. Returns null if unsuccessful.

**IsEmpty()** determines whether the specified unique identifier is Guid.Empty.

**AsDecimal()** attempts to convert string to decimal. Returns 0 if unsuccessful.

**AsDecimalOrNull()** attempts to convert string to decimal. Returns null if unsuccessful.

**AsDouble()** attempts to convert string to double. Returns 0 if unsuccessful.

**AsDoubleOrNull()** attempts to convert string to double. Returns null if unsuccessful.

**AsDateTime()** attempts to convert string to DateTime. Returns null if unsuccessful.

**AsTimeSpan()** attempts to convert string to TimeSpan. Returns null if unsuccessful.

**ResolveMergeFields()** uses DotLiquid to resolve any merge codes within the content using the values in the mergeObjects.

**HasMergeFields()** determines whether the specified content has merge fields.

**FormatAsHtmlTitle()** converts string to a HTML title "first-word rest of string".

**ConvertCrLfToHtmlBr()** converts CR (carriage return) LF (line feed) to non-encoded html breaks (br).

**ConvertBrToCrLf()** converts the HTML br to cr lf.

**EncodeHtml()** HTML encodes the string.

**SanitizeHtml()** sanitizes the HTML by removing tags. If strict is true, all html tags will be removed; if false, only a blacklist of specific XSS dangerous tags and attribute values are removed.

**ScrubHtmlAndConvertCrLfToBr()** scrubs any html from the string but converts carriage returns into html suitable for web display.

**IsValidEmail()** returns true if the given string is a valid email address.

**AsType()** converts the value to Type, or if unsuccessful, returns the default value of Type.

**Masked()** masks the specified value if greater than 4 characters (such as a credit card number). For example, the return string becomes "\*\*\*\*\*\*\*\*\*\*\*\*6789".

**EnsureTrailingBackslash()** ensures the trailing backslash. Handy when combining folder paths.

**EnsureTrailingForwardslash()** ensures the trailing forward slash. Handy when combining URL paths.

**IfEmpty()** evaluates string and if null or empty returns nullValue instead.

**CompareTo()** compares to the given value returning true if comparable.

## TimeSpan Extensions

**ToTimeString()** returns a TimeSpan to HH:MM AM/PM. Examples: 1:45 PM, 12:01 AM.

## Where Extensions

**GetFriendlyTypeName()** gets the name of the friendly type.

**Where()** queries a list of items that match the specified expression.

**OrderBy()** orders the list by the name of a property.

**OrderByDescending()** orders the list by the name of a property in descending order.

**ThenBy()** then orders the list by the name of a property.

**ThenByDescending()** then orders the list by a property in descending order.

**Sort()** sorts the object by the specified sort property.

**WhereAttributeValue()** filters a Query to rows that have matching attribute value.

---

## Internal Features {#internal-features}

## Rock Internal

If a class, method, or property is decorated with the \[RockInternal\] attribute, then it should not be used.
