---
description: "Use when handling dates and times in Rock development, including time zone conversions, formatting for international audiences, and date range comparisons"
source: "https://community.rockrms.com/developer/101\u002D\u002D\u002Dlaunchpad"
sourceLabel: 101 — Launchpad
---
> **Path:** 

When developing a framework that works across time zones and internationally, you've got to be careful with how you store and present dates and times. This chapter will show you what you need to know about all things date and time in Rock.

## RockDateTime vs DateTime

Because a Rock server is not always running or is not configured to be in the same time zone of the organization using Rock, you should always avoid creating new date/times or the current time (aka ".Now") using the standard system *DateTime.*

Use the `RockDateTime.Now` or `RockDateTime.Today` static class methods when creating new date/times.

```
// Get the current date time
DateTime now = RockDateTime.Now;

// Get only the date component for today (wherever today is)
DateTime today = RockDateTime.Today;
```

If you're in need of checking the date/time of a file on the file-system, you should use the `ConvertLocalDateTimeToRockDateTime( ... )` method to convert the time to a correctly adjusted time.

```
DateTime fileDateTime = File.GetCreationTime( file );
DateTime adjustedDateTime = RockDateTime.ConvertLocalDateTimeToRockDateTime( fileDateTime );
```

These methods always work because organizations set their particular time zone when they first install Rock. Behind the scenes, Rock stored a `OrgTimeZone` property into their web.config which is used by the Rock DateTime helper methods.

## DateTime Formatting

For people, there is not one correct way to format dates and times. In some countries "MM/DD/YYYY" is the standard while in others it's "DD/MM/YYYY" or "YYYY-MM-DD" or one of hundreds of other styles. However, using the incorrect format isn't just a small issue, in some cases it will change the meaning of the date value to the viewer.

For the most part, the framework displays dates and times using the culture setting of the viewer's browser. However, to achieve this, when a date is stored in a `string` field (such as a string Attribute) you must set that string using the "Round-trip" (aka ISO 8601) format specifier "o" as shown here:

```
// set the value to the current time
thing.SetAttributeValue( attrKey, RockDateTime.Now.ToString( "o" ) );
```

Note

If you're using Rock.DateTime for SQL migrations, be sure to use the ISO format for datetime strings before writing to SQL, especially in interpolated strings. For example, use `'{RockDateTime.Now:s}'` instead of `'{RockDateTime.Now}'`.  

## Date, Time, Datetime Comparison

When writing LINQ (or SQL) queries where there is a Date, Time, Date/Time, or Numeric comparison involved, it's important to be consistent in how they are written. For example, if the user wants to filter the a list of records using a Date/Time range, do you use `>=` and `<` or `>` and `<=?`.

In general, we say let your start be "inclusive" and your end be "exclusive" as illustrated in each of the examples below.

Warning

Don't use the `BETWEEN` operator in SQL because it is fully inclusive and is in conflict with our "let your end be exclusive" rule.  

**DateTime range**

```
var qry = new MyService().Queryable();

DateTime startDateTime = DateTime.Parse("11/1/2012 01:00 pm");
DateTime endDateTime = DateTime.Parse("11/2/2012 01:00 pm");

// Get the records equal to and greater than the StartDateTime, but just less than (but not equal)
// the EndDateTime.
qry = qry.Where( a => a.DateTime >= startDateTime && a.DateTime < endDateTime );
```

**Date range**

```
var qry = new MyService().Queryable();

DateTime startDate = DateTime.Parse("11/1/2012");
DateTime endDate = DateTime.Parse("11/2/2012");

// For a little extra safety, since we are doing a Date comparison (not a DateTime comparison)
// get just the Date portion without the time (just in case).
startDate = startDate.Date;
endDate = endDate.Date;

// Get the records equal to and greater than the StartDate, but add a whole day to 
// the selected endDate since users will expect to see all the stuff that happened 
// on the endDate up until the very end of that day.

// calculate the query endDate before including it in the qry statement to avoid Linq error
endDate = endDate.AddDays(1); 

qry = qry.Where( a => a.DateTime >= startDate && a.DateTime < endDate );
```

**Specific Date (of a DateTime column)**

```
var qry = new MyService().Queryable();

DateTime startDate = DateTime.Parse("11/1/2012");

// For a little extra safety, since we are doing a Date comparison (not a DateTime comparison)
// get just the Date portion without the time.
// (just in case)
startDate = startDate.Date;

// When querying for stuff that occurred on a specific date, when the data is a DateTime,
// just add a day to the specific date to get records for the entire day.

// calculate the query endDate before including it in the qry statement to avoid Linq error
DateTime endDate = startDate.AddDays(1); 

qry = qry.Where( a => a.DateTime >= startDate && a.DateTime < endDate );
```

**Specific Date (of a Date column)**

```
var qry = new MyService().Queryable();

DateTime specificDate = DateTime.Parse("11/1/2012");

// Since we are doing a Date comparison (not a DateTime comparison) get just the Date
// portion without the time (just in case).
specificDate = specificDate.Date;

qry = qry.Where( a => a.LogDate == specificDate );
```

**Time Range (when querying off of a Time column)**

```
var qry = new MyService().Queryable();

TimeSpan startime = TimeSpan.Parse("01:00 pm");
TimeSpan endTime = TimeSpan.Parse("02:00 pm");

// Get the records equal to and greater than the startTime, but just less
// than (but not equal) the endTime.
qry = qry.Where( a => a.Time >= startTime && a.Time < endTime );
```

**Time Range (when querying off of a DateTime column)**

```
var qry = new MyService().Queryable();

TimeSpan startime = TimeSpan.Parse("01:00 pm");
TimeSpan endTime = TimeSpan.Parse("02:00 pm");

// We can't do DateTime.TimeOfDay in a queryable, so fetch it into a list first.
var list = qry.ToList();

// Get the records equal to and greater than the startTime, but just less than
// (but not equal) the endTime.
list = list.Where( a => a.DateTime.TimeOfDay >= startTime && a.DateTime.TimeOfDay < endTime)
```

**Numeric range**

```
var qry = new MyService().Queryable();

int startValue = int.Parse("100");
int endValue = int.Parse("150");

// Unless the UI has some text that explicitly states how the values are going to be
// compared, simply get the records equal to and greater than the startValue and
// less than or equal to the endValue. In other words, for integer comparison, do
// an "inclusive" compare

qry = qry.Where( a => a.Rating >= startValue && a.Rating <= endValue; )
```

---

## Referencing Files and Images {#referencing-files-and-images}

There are two ways to fetch (reference) files and images from storage: using `GetFile.ashx` or `GetImage.ashx` while passing either the ID or GUID as shown in this example:

```
# Getting a file
GetFile.ashx?guid=735A97A3-7A9A-4D3F-BE86-B3874E85E141

# Getting an image
GetImage.ashx?id=3
```

The final reference might look like this `<img src="~/GetImage.ashx?id=3" alt='logo'>` in your block.

Using the `GetFile.ashx` handler to fetch large files is fast and efficient because the file is streamed from the storage asynchronously and is not loaded into memory to do so.

Using the `GetImage.ashx` handler gives you additional features such as resizing, rotating, as well as it will cache those transformations. To rotate an image simply pass `rotate` with the number of degrees. To resize an image, simply pass `height` and `width` parameters or `maxheight` and `maxwidth`. Using the latter will maintain the aspect ratio while using the former will force the image into the provided dimensions.

```
# Rotate 45 degrees
GetImage.ashx?guid=735A97A3-7A9A-4D3F-BE86-B3874E85E141&rotate=45

# Resize forcing into 300 x 200
GetImage.ashx?id=3&width=300&height=200
```

Note

Image resizing and rotation are provided by the ImageResizer project (v4). Their [complete reference](http://imageresizing.net/docs/reference) can be found on the ImageResizer project website.  

## QR Codes

There is also a `GetQRCode.ashx` handler to dynamically generate QR codes that can be embedded in web pages, printed on materials, etc. The QR codes are generated based on the text or URL you provide through the query string parameters.

To use this handler, you need to provide the `data` parameter in the query string, which will be encoded into the QR code.

The following parameters are supported by this handler:

- **data** \- The text or URL to encode in the QR code. This is a required parameter.
- **outputType** \- The image type to generate; either
- **pixelsPerModule** \- The pixel size each b/w module is drawn. (Default is 20)
- **foreground (v17)** \- The color hex value to use for the foreground (b) color. Transparency is supported using RGBA values. (Default is #000000)
- **background (v17)** \- The color hex value to use for the background (w) color. Transparency is supported using RGBA values. (Default is #FFFFFF)
```
/GetQRCode.ashx?data=ABC&background=%23FF5C0077
```

The example above generates a QR code that encodes the text `ABC` to output as a PNG with a semi-transparent orange background color.

---

## UI Tooklit {#ui-tooklit}

As mentioned earlier, we've created over a hundred reusable UI controls to help you write-less-code(TM) and get on with the task of solving your "business" problems. There are just too many to cover so we decided to put them in their own book. You'll definitely need to spend some time becoming familiar with these before you start writing any serious blocks.

**UI Toolkit**

![](https://community.rockrms.com/GetImage.ashx?id=131&width=179&height=232)

Note

The UI Toolkit book isn't finished yet. In the mean time you can check out the [Control Gallery](https://www.rocksolidchurchdemo.com/admin/cms/control-gallery) block on your Rock instance or on the [Demo site](https://www.rocksolidchurchdemo.com/admin/cms/control-gallery).
