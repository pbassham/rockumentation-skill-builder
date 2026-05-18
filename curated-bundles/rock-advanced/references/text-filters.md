---
source: "https://community.rockrms.com/Lava"
sourceLabel: Lava
---
> **Path:** Lava > Filters > Text Filters

Text filters allow you to do creative adjustments to strings of text. They are placed within an output tag {{ }} and are separated with a pipe character '|'.

 

# Append

Server: v1.0 Mobile: v1.0

Adds a given string to the end of the input.

**Additional Details**

**Example:**

```
"Person": {
    "FullName": "Ted Decker"
}
```

```
<strong>{{ Person.FirstName | Append:' have a great day!'}}</strong>
```

```
<strong>Ted have a great day</strong>
```

**Note:**  
You might wonder why append is even needed when you could do something similar with:
```
{{ Person.NickName }} have a great day!
```
Append is very useful when it comes to filter chaining consider this example:
```
{{ Person.FirstName | Append:' have a nice day!' | Truncate:15 }}
```
Doing this without the append filter would be much more complex as you would have to use a mixture of variables and the capture tag.

 

# Capitalize

Server: v1.0 Mobile: v1.0

Capitalizes the first letter of each word in the string. The string 'lorem ipsum dolor' would become 'Lorem Ipsum Dolor'.

**Additional Details**

**Example:**

```
"Person": {
    "FullName": "ted decker"
}
```

```
<h1>{{ Person.FullName | Capitalize }}</h1>
```

```
<h1>Ted Decker</h1>
```

 

# Decrypt

Server: v7.4

Decrypts an encrypted value.

**Additional Details**

**Example:**

```
"Item": {
    "EncryptedValue": "EAAAACRNk6LPcaap5MAIHV2+8ld/IzM2sLbG8PdcGNBDtJN5"
}
```

```
{{ Item.EncryptedValue | Decrypt }}
```

```
Hello there!
```

 

# Default

Server: v3.0 Mobile: v1.0

Returns the passed default value if the value is undefined or empty, otherwise the value of the variable.

**Additional Details**

**Example:**

```
"Person": {
    "FullName": "Ted Decker",
    "AnniversaryDate": '',
}
```

```
Anniversary Date: {{ Person.AnniversaryDate | Default:'(none)' }}
```

```
Anniversary Date: (none)
```

 

# Downcase

Server: v1.0 Mobile: v1.0

This filter transforms all characters in the string to lower case. The string 'LoRem IpSum DoLor' would become 'lorem ipsum dolor'.

**Additional Details**

**Example:**

```
"Person": {
    "FullName": "Ted Decker"
}
```

```
<h1>{{ Person.FullName | Downcase }}</h1>
```

```
<h1>ted decker</h1>
```

 

# Encrypt

Server: v16.3

Encrypts a string of text using the encryption key configured for the current Rock instance.

**Additional Details**

**Example:**

```
{% assign encryptedText = 'This is my secret!' | Encrypt %}
<p>The encrypted message is: {{ encryptedText }}</p>
{% assign decryptedText = encryptedText | Decrypt %}
<p>The decrypted message is: {{ decryptedText }}</p>
```

```
The encrypted message is: EAAAACRNk6LPcaap5MAIHV2+8ld/IzM2sLbG8PdcGNBDtJN5
The decrypted message is: This is my secret!
```

**Note:**  

The encryption algorithm uses the DataEncryptionKey configured for the current Rock installation. Decryption of a string encrypted using this method can only be performed with a matching DataEncryptionKey.

Also, the encryption process includes an initialization vector (IV) to randomize the result, so repeated executions of this filter will produce different results for the same input text.

 

# Escape

Server: v1.0 Mobile: v1.0

HTML encode string. All <tags\> will be encoded to '&lt;tags&gt;'

**Additional Details**

**Example:**

```
"Workflow": {
    "HtmlExample": "<span class='label label-success'>Approved</span>"
}
```

```
{{ Workflow.HtmlExample | Escape }}
```

```
&amp;lt;span class=&amp;#39;label label-success&amp;#39;&amp;gt;Approved&amp;lt;/span&amp;gt;
```

 

# EscapeDataString (aka UrlEncode)

Server: v5.0 Mobile: v1.0

Converts a string to its escaped representation using Uri.EscapeDataString (aka URL Encoding).

**Additional Details**

**Example:**

```
"CurrentPerson": {
    "NickName": "Ted"
    ...
}

"Context": {
    "Campus": {
        "Name": "Jackson Hole"
        ...
    }
}
```

```
{% capture body %}
You are invited to go to Fun Event with me at the {{ Context.Campus.Name }} campus.
Wanna Go? There will be lots of fun stuff to do!

Your friend,

{{ CurrentPerson.NickName }}
{% endcapture %}

<a href="mailto:?subject=Welcome&body={{ body | EscapeDataString }}">Email</a>
```

```
<a class="btn btn-default" href="mailto:?subject=Welcome&body=You%20are%20invited%20to%20go%20to%20Fun%20Event%20with%20me%20at%20the%20Jackson%20Hole%20campus.%0AWanna%20Go%3F%20There%20will%20be%20lots%20of%20fun%20stuff%20to%20do!%0A%0AYour%20friend%2C%0A%0ATed">Email</a>
```

**Note:**  
You can use either the filter EscapeDataString or UrlEncode for this logic as of (v8). Before that only EscapeDataString existed.

 

# EscapeOnce

Server: v16.0

HTML encodes a string without changing any existing encoding. All <tags\> will be encoded to '&lt;tags&gt;', whereas previously encoded text such as '&lt;tags&gt;' won't be modified.

**Additional Details**

**Example:**

```
{% assign unescaped = "Have you read 'The Lion, The Witch & the Wardrobe by C.S. Lewis'?" %}
{% assign escaped = unescaped | Escape %}
Source Text: {{ unescaped }}
Applying the Escape filter twice to the source text:
{{ unescaped | Escape | Escape }}
Applying the EscapeOnce filter twice to the source text:
{{ unescaped | EscapeOnce | EscapeOnce }}
```

```
Source Text: Have you read 'The Lion, The Witch & the Wardrobe by C.S. Lewis'?
Applying the Escape filter twice to the source text:
Have you read &amp;#39;The Lion, The Witch &amp;amp; the Wardrobe by C.S. Lewis&amp;#39;?
Applying the EscapeOnce filter twice to the source text:
Have you read &#39;The Lion, The Witch &amp; the Wardrobe by C.S. Lewis&#39;?
```

 

# FromMarkdown

Server: v5.0

Converts a string of Markdown to HTML. See the [Commonmark website](http://commonmark.org/help/) for details on Markdown syntax.

**Additional Details**

**Example:**

```
"ContentChannelItem": {
    "Summary": "# Lorem Ipsum
## Lorem ipsum dolor sit amet
- Lorem ipsum dolor sit amet
- consectetur adipiscing elit
- sed do eiusmod tempor incididunt ut labore et dolore magna aliqua
\`\`\`
Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum
\`\`\`
";
}
```

```
{{ ContentChannelItem.Summary | FromMarkdown }}
```

```
<h1>Lorem Ipsum</h1>
<h2>Lorem ipsum dolor sit amet</h2>
<ul>
  <li>Lorem ipsum dolor sit amet</li>
  <li>consectetur adipiscing elit</li>
  <li>sed do eiusmod tempor incididunt ut labore et dolore magna aliqua</li>
</ul>
<pre>
<code>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum
</code>
</pre>
```

 

# HtmlDecode

Server: v4.0

Decodes an escaped string of HTML.

**Additional Details**

**Example:**

```
"Workflow": {
    "Name": "This &amp; That"
}
```

```
This workflow is called '{{ Workflow.Name | HtmlDecode }}'.
```

```
This workflow is called 'This & That'.
```

 

# Humanize

Server: v1.0 Mobile: v1.0

This filter takes computer friendly strings like 'camelCase', 'underscore\_a\_point' or 'css-classes' and makes them friendly to us humans... 'Camel case', 'underscore a point' or 'css classes'.

**Additional Details**

**Example:**

```
"Workflow": {
    "AssemblyName": "MandrillSmtp"
}
```

```
This workflow is using the '{{ Workflow.AssemblyName | Humanize }}'
component.
```

```
This workflow is using the 'Mandrill Smtp'
component.
```

 

# Linkify

Server: v8.0

Convert strings within the text that appear to be http/ftp/https links into clickable html links

**Additional Details**

**Example:**

```
"Item": {
    "Text": "Go to http://www.rockrms.com for more details"
}
```

```
{{ Item.Text | Linkify }}
```

```
Go to <a href="http://www.rockrms.com " target="_blank">http://www.rockrms.com </a> for more details
```

 

# NewlineToBr

Server: v1.0 Mobile: v1.0

Add <br/\> tags in front of all newlines in the string

**Additional Details**

**Example:**

```
"Workflow": {
    "Notes": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean sodales, metus id viverra semper, nibh ipsum porttitor nibh, in luctus nulla eros non sapien. Vivamus efficitur cursus condimentum. 

Ut blandit felis vitae nunc feugiat euismod. Aliquam quam urna, malesuada eu rutrum et, porttitor quis nisl. In congue pulvinar euismod."
}
```

```
<div>{{ Workflow.Note | NewlineToBr }} </div>
```

```
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean sodales, metus id viverra semper, nibh ipsum porttitor nibh, in luctus nulla eros non sapien. Vivamus efficitur cursus condimentum. <br />
<br />
Ut blandit felis vitae nunc feugiat euismod. Aliquam quam urna, malesuada eu rutrum et, porttitor quis nisl. In congue pulvinar euismod."
```

 

# ObfuscateEmail

Server: v4.0 Mobile: v1.0

Hides the details of an email address with enough information to confirm that it was sent to an address the user would recognize.

**Additional Details**

**Example:**

```
"Person": {
    "Email": "ted@rocksolidchurchdemo.com"
}
```

```
An email has been sent to {{ Person.Email | ObfuscateEmail }}.
```

```
An email has been sent to txxxxx@rocksolidchurchdemo.com.
```

 

# Pluralize

Server: v1.0 Mobile: v1.0

Pluralizes the provided input while taking irregular and uncountable words into consideration.

**Additional Details**

Turns 'tree' to 'trees', but also is smart enough to turn 'man' to 'men', 'goose' to 'geese', etc. Yeah, it’s like magic!

**Example:**

```
"Workflow": {
    "WorkTerm": "Request"
}
```

```
There are many {{ Workflow.WorkTerm | Pluralize | Downcase }} in the system.
```

```
There are many requests in the system.
```

 

# PluralizeForQuantity

Server: v4.0 Mobile: v1.0

Pluralizes the provided word if the quantity provided neither 1 (or -1).

**Additional Details**

**Example:**

```
"Group": {
    "Leaders": [
        { 
            "Id": 12,
            "Name": "Ted Decker"
        },
        { 
            "Id": 14,
            "Name": "Alisha Marble"
        }
    ]
}
```

```
{% assign leaderCount = Group.Leaders | Size %}

{{ 'Leader' | PluralizeForQuantity:leaderCount }}: {{ leaderCount }}
```

```
Leaders: 2
```

 

# Possessive

Server: v4.0 Mobile: v1.0

Returns the possessive form of the string.

**Additional Details**

**Example:**

```
"Person": {
    "NickName": "Ted"
}

"Person": {
    "NickName": "Charles"
}
```

```
{{ Person.NickName | Possessive }} Group
```

```
Ted's Group - Charles' Group
```

 

# Prepend

Server: v1.0 Mobile: v1.0

Adds a given string to the beginning of the input.

**Additional Details**

**Example:**

```
"Person": {
    "NickName": "Ted"
}
```

```
<strong>{{ Person.NickName | Prepend:'Hello ' }}!</strong>
```

```
<strong>Hello Ted!</strong>
```

 

# ReadTime

Server: v10.0 Mobile: v1.0

Calculates the approximate reading time for a given string.

**Additional Details**

There are two optional parameters for 'words per minute' and 'seconds per image'.

```
{{ Item.Content | ReadTime:275 }} <- words per min (default to 275)
{{ Item.Content | ReadTime:275,12 }} <- seconds per image (default to 12)
```

The read time calculation uses 12 seconds (or the provided value), and subtracts a second for each subsequent image, with each additional image adding a minimum of 3 seconds to the read time.

Results are formatted "1 hr 23 mins" for longer than one hour, "23 mins" for less than an hour, and "30 secs" for less than one minute.

**Example:**

```
"Item": {
    "Content": "The quick brown fox jumps over the lazy dog."
}
```

```
{{ Item.Content | ReadTime }}
```

```
2 secs
```

 

# RegExMatch

Server: v5.0 Mobile: v1.0

Tests the input against a Regular Expression to determine if it is a match.

**Additional Details**

**Example:**

```
"CurrentPerson": {
    "Email": "ted@rocksolidchurchdemo.com"
}
```

```
{% capture expression %}\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*{% endcapture %}
{% assign isValidEmail = CurrentPerson.Email | RegExMatch: expression %}

{% if isValidEmail %}
    This is a valid email!
{% endif %}
```

```
This is a valid email!
```

**Note:**  

Regular Expressions are not for the faint of heart, but they are incredibly powerful. Below are a couple of useful patterns to help get you started.

- Email Addresses: \\w+(\[-+.\]\\w+)\*@\\w+(\[-.\]\\w+)\*\\.\\w+(\[-.\]\\w+)\* Note... there is no perfect expression for emails addresses. This is the one that Rock uses internally for validation emails.
- URL Validation: ^http(s)?://(\[\\w-\]+.)+\[\\w-\]+(/\[\\w- ./?%&\=\])?$
- 4 Digit Number: ^\[0-9\]{4}$

When testing expressions you might find the [Regular Expressions 101](https://regex101.com/) site helpful. Be sure to set the 'flavor' to javascript for best results.

**Important!**  
If your expression contains a { or } or any non-valid escape sequence ([valid escape sequences can be found here](https://docs.microsoft.com/en-us/cpp/c-language/escape-sequences?view=msvc-160)) you will get a Lava error. To use an expression with one of these characters you'll need to capture the expression into a variable first ala:  
  
{% capture expression %}^\[0-9\]{5}${% endcapture %}  
{{ '33333' | RegExMatch:expression }}  

 

# RegExMatchValue

Server: v9.0 Mobile: v1.0

Tests the input against a [Regular Expression](https://regex101.com/) and returns the matching substring if a match is made; otherwise it returns nothing.

**Additional Details**

**Example:**

```
{% capture expression %}\d+{% endcapture %}
{% assign message = "group 12345" %}

{% assign groupId = message | RegExMatchValue: expression %}
{{ groupId }}
```

```
12345
```

**Note:**  

When building expressions you might find the [Regular Expressions 101](https://regex101.com/) site helpful. Be sure to set the 'flavor' to javascript for best results.

**Important!**  
If your expression contains a { or } or any non-valid escape sequence ([valid escape sequences can be found here](https://docs.microsoft.com/en-us/cpp/c-language/escape-sequences?view=msvc-160)) you will get a Lava error. To use an expression with one of these characters you'll need to capture the expression into a variable first ala:  
  
{% capture expression %}^\[0-9\]{5}${% endcapture %}  
{{ '33333' | RegExMatch:expression }}  

 

# RegExMatchValues

Server: v11.0 Mobile: v1.0

Tests the input against a [Regular Expression](https://regex101.com/) and returns an *array* of the matching substrings. If no match is made, it will return an empty array.

**Additional Details**

**Example:**

```
{% capture expression %}\b\w+day\b{% endcapture %}
{% assign days = "Services on Saturday and Sunday" | RegExMatchValues: expression %}
Found {{ days | Size }} matches:
{% for day in days %}
 {{ day }}
{% endfor %}
```

```
Found 2 matches: Saturday Sunday
```

**Note:**  

When building expressions you might find the [Regular Expressions 101](https://regex101.com/) site helpful. Be sure to set the 'flavor' to javascript for best results.

**Important!**  
If your expression contains a { or } or any non-valid escape sequence ([valid escape sequences can be found here](https://docs.microsoft.com/en-us/cpp/c-language/escape-sequences?view=msvc-160)) you will get a Lava error. To use an expression with one of these characters you'll need to capture the expression into a variable first ala:  
  
{% capture expression %}^\[0-9\]{5}${% endcapture %}  
{{ '33333' | RegExMatch:expression }}  

 

# RegExReplace

Server: v13.0

Replaces a portion of the string passed as the input to the filter with [Regular Expression](https://regex101.com/) matching.

**Additional Details**

The first parameter is the regular expression to match against. The second parameter is the replacement string value. An optional third parameter contains any regular expression flags to use. Back-references can be used, as in the second example, but are slightly different than normal regular expression syntax. Normally you would use `\1` to indicate the first capture group however .NET uses `$1` to indicate the same.

Available parameters:

1. the regular expression
2. the replacement string
3. flags (optional):
	- i = Do comparison in a case-insensitive manner.
		- m = Multiline mode. `^` and `$` will match the beginning and end of lines instead of the beginning and end of the entire input.
See [https://regex101.com/](https://regex101.com/) for help with constructing your regular expressions.

**Example:**

```
"Message": "Hello Ted, how are you?"
```

```
{{ 'The Rock is awesome.' | RegExReplace:'the rock','Rock','i' }}
{% capture expression %}[Hh]ello (\w+){% endcapture %}
{{ Message | RegExReplace: expression,'Greetings $1' }}
```

```
Rock is awesome.
Greetings Ted, how are you?
```

**Note:**  

**Important!**  
If your expression contains a { or } or any non-valid escape sequence ([valid escape sequences can be found here](https://docs.microsoft.com/en-us/cpp/c-language/escape-sequences?view=msvc-160)) you will get a Lava error. To use an expression with one of these characters you'll need to capture the expression into a variable first ala:  
  
{% capture expression %}^\\d{4}(\\d\*)${% endcapture %}  
{{ '1234567' | RegExReplace:expression,'Replaced first four digits so that only $1 remains' }}  

 

# Remove

Server: v1.0 Mobile: v1.0

Remove all occurrences of a given string.

**Additional Details**

**Example:**

```
"Workflow": {
    "Note": "We Will We Will Rock You"
}
```

```
<strong>{{ Workflow.Note | Remove:'We Will' }}</strong>
```

```
<strong>Rock You</strong>
```

**Note:**  
This is a case sensitive compare so 'we will' will not match 'We Will'.

 

# RemoveFirst

Server: v1.0 Mobile: v1.0

Removed the first occurrence of a given string.

**Additional Details**

**Example:**

```
"Workflow": {
    "Note": "We Will We Will Rock You"
}
```

```
<strong>{{ Workflow.Note | RemoveFirst:'We Will' }}</strong>
```

```
<strong>We Will Rock You</strong>
```

**Note:**  
This is a case sensitive compare so 'we will' will not match 'We Will'.

 

# Replace

Server: v1.0 Mobile: v1.0

Replace all occurrences of a given string.

**Additional Details**

**Example:**

```
"Workflow": {
    "Note": "We Will We Will Rock You"
}
```

```
<strong>{{ Workflow.Note | Replace:'We Will','Rock Will' }}</strong>
```

```
<strong>Rock Will Rock Will Rock You</strong>
```

**Note:**  
This is a case sensitive compare so 'we will' will not match 'We Will'.

 

# ReplaceFirst

Server: v1.0 Mobile: v1.0

Replace the first occurrence of a given string.

**Additional Details**

**Example:**

```
"Workflow": {
    "Note": "We Will We Will Rock You"
}
```

```
<strong>{{ Workflow.Note | ReplaceFirst:'We Will', 'Rock Will' }}</strong>
```

```
<strong>Rock Will We Will Rock You</strong>
```

**Note:**  
This is a case sensitive compare so 'we will' will not match 'We Will'.

 

# ReplaceLast

Server: v4.0 Mobile: v1.0

Replaces the last occurrence of a string pattern with a new value.

**Additional Details**

**Example:**

```
"Workflow": {
    "Note": "Red, White, Blue"
}
```

```
<strong>{{ Workflow.Note | ReplaceLast:',', ' and' }}</strong>
```

```
<strong>Red, White and Blue</strong>
```

 

# Right

Server: v7.0 Mobile: v1.0

Returns the right most part of a string of the given length.

**Additional Details**

**Example:**

```
"CurrentPerson": {
    "LastName": "Decker"
}
```

```
The last four letters are '{{ CurrentPerson.LastName | Right:4 }}'.
```

```
The last four letters are 'cker'.
```

 

# SanitizeSql

Server: v8.0

Accepts a string as input and sanitizes it for use in a SQL statement.

**Additional Details**

**Example:**

```
"CurrentPerson": {
    "LastName": "O'Neal"
}
```

```
{% sql %}
    SELECT [FirstName] FROM [Person] WHERE [LastName] = '{{ CurrentPerson.LastName | SanitizeSql }}'
{% endsql %}

<p>Used sanitized string {{ CurrentPerson.LastName | SanitizeSql }} to find these names.</p>
<ul>
    {% for item in results %}
        <li>{{ item.FirstName }}</li>
    {% endfor %}
</ul>
```

```
<p>Used sanitized string O''Neal to find these names.</p>
<ul>
    <li>Jack</li>
</ul>
```

**Note:**  

Sanitization is done by replacing single quotes with two single quote characters so that it will be interpreted correctly by SQL Server. Therefore, the sanitized string should always be placed inside single quotes in the SQL query.

If you are expecting to have a number entered by the user then consider using the AsInteger filter instead to force the value to be numeric only.

 

# SentenceCase

Server: v1.0 Mobile: v1.0

Changes the string to be in sentence case.

**Additional Details**

**Example:**

```
"Workflow": {
    "ArticleTitle": "Good To Great"
}
```

```
{{ Workflow.ArticleTitle | SentenceCase }}.
```

```
Good to great.
```

 

# Singularize

Server: v1.0 Mobile: v1.0

It’s like the antidote to pluralize. Makes plural words singular.

**Additional Details**

Turns 'trees' to 'tree', but also is smart enough to turn 'women' to 'woman', 'geese' to 'goose', etc.

**Example:**

```
"Workflow": {
    "ConnectionStatusType": "Members"
}
```

```
Ted is a {{ Workflow.ConnectionStatusType | Singularize | Downcase }}.
```

```
Ted is a member.
```

 

# Size

Server: v1.0

Returns the length of the string, including all characters and spaces.

**Additional Details**

**Example:**

```
"Person": {
    "FullName": "Ted Decker"
}
```

```
{% assign nameLength = Person.FullName | Size %}

{% if nameLength < 8 %}
	{{ Person.FullName }}
{% else %}
	{{ Person.FullName | Truncate:8 }}
{% endif %}
```

```
Ted D...
```

 

# Slice

Server: v6.0 Mobile: v1.0

The slice filter returns a substring, starting at the specified index. An optional second parameter can be passed to specify the length of the substring. If no second parameter is given, a substring of one character will be returned.

**Additional Details**

**Example:**

```
"Person": {
    "SecurityCode": "GX925"
}
```

```
First two characters '{{ Person.SecurityCode | Slice: 0, 2 }}'
and the last three characters '{{ Person.SecurityCode | Slice: 2, 3 }}'.
```

```
First two characters 'GX' and the last three characters '925'.
```

 

# Split

Server: v1.0 Mobile: v1.0

Splits a string into an array based on a matching pattern.

**Additional Details**

This filter has the following input parameters:

1. Pattern: The string to use as the separator when splitting the input.
2. Remove Empty (optional; default true)v13.0: By default, standard Liquid removes empty entries from the array, but passing 'false' to this optional setting can override that behavior.
3. Maximum (number; optional)v14.1: This option will split the string into a maximum number of substrings.

**Example:**

```
"Person": {
    "Email": "ted@rocksolidchurchdemo.com"
}

"Item": {
    "Title": "Topic: Man vs 10:00"
}
```

```
// Simple example
{% assign emailParts = CurrentPerson.Email | Split:'@' %}
Your email domain is: {{ emailParts[1] }}.

// Split with Maximum option
{% assign stringParts = item.Title | Split:':', 2 %}
The first part is: {{ stringParts[0] }}
The second part is: {{ stringParts[1] }}

// Split with Remove Empty false and Maximum option
{% assign itemsList = "A,B,,D,E,F,G" | Split:',', false, 4 %}
The first part is: {{ itemsList[0] }}
The second part is: {{ itemsList[1] }}
The third part is: {{ itemsList[2] }}
The fourth part is: {{ itemsList[3] }}
```

```
Your email domain is: rocksolidchurchdemo.com.

The first part is: Topic
The second part is: Man vs 10:00

The first part is: A
The second part is: B
The third part is:
The fourth part is: D,E,F,G
The fifth part is:
```

 

# StripHtml

Server: v1.0 Mobile: v1.0

Remove all HTML tags from the string.

**Additional Details**

**Example:**

```
"Workflow": {
    "Note": "<h1>Lorem Iipsum Dolor</h1> <p>Sit amet, consectetur adipiscing elit. Aenean sodales, metus id viverra semper.</p>"
}
```

```
{{ Workflow.Note | StripHtml }}
```

```
Lorem Iipsum Dolor Sit amet, consectetur adipiscing elit. Aenean sodales, metus id viverra semper.
```

 

# StripNewlines

Server: v1.0 Mobile: v1.0

Remove all new line characters (\\r\\n) from the string.

**Additional Details**

**Example:**

```
"Workflow": {
    "Notes": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean sodales, metus id viverra semper, nibh ipsum porttitor nibh, in luctus nulla eros non sapien. Vivamus efficitur cursus condimentum. 

Ut blandit felis vitae nunc feugiat euismod. Aliquam quam urna, malesuada eu rutrum et, porttitor quis nisl. In congue pulvinar euismod."
}
```

```
<div>{{ Workflow.Notes | StripNewlines }}</div>
```

```
<div>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean sodales, metus id viverra semper, nibh ipsum porttitor nibh, in luctus nulla eros non sapien. Vivamus efficitur cursus condimentum. Ut blandit felis vitae nunc feugiat euismod. Aliquam quam urna, malesuada eu rutrum et, porttitor quis nisl. In congue pulvinar euismod.</div>
```

 

# TitleCase

Server: v1.0 Mobile: v1.0

Takes an ordinary string like 'of mice and men' and makes it usable as a title, 'Of Mice And Men'.

**Additional Details**

**Example:**

```
"Workflow": {
    "Name": "Job posting for groundskeeper"
}
```

```
<h1>{{ Workflow.Name | TitleCase }}</h1>
```

```
<h1>Job Posting For Groundskeeper</h1>
```

 

# ToCssClass

Server: v1.0 Mobile: v1.0

Converts string to a CSS class name format (e.g. home-phone).

**Additional Details**

**Example:**

```
"Person": {
    "ConnectionStatus": "Community Participant"
}
```

```
<span class="{{ Person.ConnectionStatusValue.Value | ToCssClass }}">Label</span>
```

```
<span class="community-participant">Label</span>
```

 

# ToPascal

Server: v1.0 Mobile: v1.0

For all the programmers in the house. This will take a string and return it back in PascalCase.

**Additional Details**

**Example:**

```
"Person": {
    "ConnectionStatus": "Community Participant"
}
```

```
{{ Person.ConnectionStatus | ToPascal }}
```

```
CommunityParticipant
```

 

# Trim

Server: v4.0 Mobile: v1.0

Removes all blank spaces (or instances of an optional character string) from the beginning and end of the input string.

**Additional Details**

This filter supports the following parameters:

1. the string to remove (optional). If not specified, blank spaces will be removed. v14

**Example:**

```
<h1>Example 1:</h1>
<p>-{{ '  Ted Decker  ' | Trim }}-</p>
<hr>
<h1>Example 2:</h1>
<i>{{ '/*/*/*/Ted Decker//*/*/*' | Trim:'/*' }}</i>
```

```
<h1>Example 1</h1>
<p>-Ted Decker-</p>
<hr>
<h1>Example 2</h1>
<p>/Ted Decker/</p>
```

**Note:**  
Instances of the specified string will be trimmed from the input recursively, until there are no remaining matches.

v14.0 Rock v14 added the ability to optionally pass in a character string to remove.

 

# TrimEnd

Server: v14.0

Removes all blank spaces (or instances of an optional character string) from the end of the input string.

**Additional Details**

This filter supports the following parameters:

1. the string to remove (optional). If not specified, blank spaces will be removed.

**Example:**

```
<h1>Example 1:</h1>
<p>-{{ '  Ted Decker  ' | TrimEnd }}-</p>
<hr>
<h1>Example 2:</h1>
<i>{{ '/*/*/*/Ted Decker//*/*/*' | TrimEnd:'/*' }}</i>
```

```
<h1>Example 1</h1>
<p>-  Ted Decker-</p>
<hr>
<h1>Example 2</h1>
<p>/*/*/*/Ted Decker/</p>
```

**Note:**  
Instances of the specified string will be trimmed from the input recursively, until there are no remaining matches.

 

# TrimStart

Server: v14.0

Removes all blank spaces (or instances of an optional character string) from the beginning of the input string.

**Additional Details**

This filter supports the following parameters:

1. the string to remove (optional). If not specified, blank spaces will be removed.

**Example:**

```
<h1>Example 1:</h1>
<p>-{{ '  Ted Decker  ' | TrimStart }}-</p>
<hr>
<h1>Example 2:</h1>
<i>{{ '/*/*/*/Ted Decker//*/*/*' | TrimStart:'/*' }}</i>
```

```
<h1>Example 1</h1>
<p>-Ted Decker   -</p>
<hr>
<h1>Example 2</h1>
<p>/Ted Decker//*/*/*</p>
```

**Note:**  
Instances of the specified string will be trimmed from the input recursively, until there are no remaining matches.

 

# Truncate

Server: v1.0 Mobile: v1.0

Will shorten the input down to the provided size and append an optional string to the end. The length of the appending string will be counted in the truncate size. If no appending string is provided '...' will be used.

**Additional Details**

**Example:**

```
"Person": {
    "FullName": "Ted Decker"
}
```

```
<small>{{ Person.FullName | Truncate:9,'...' }}</small>
```

```
<small>Ted De...</small>
```

 

# TruncateWords

Server: v1.0 Mobile: v1.0

Shortens the input to the number of words provided and appends an optional string to the end. If no appending string is provided it will use '...'.

**Additional Details**

**Example:**

```
"Workflow": {
    "Note": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce hendrerit odio ut ex pretium laoreet. In ac viverra urna. Nunc consectetur vulputate leo tincidunt porta."
}
```

```
<p>{{ Workflow.Note | TruncateWords:7 }}</p>
```

```
<p>Lorem ipsum dolor sit amet, consectetur adipiscing...</p>
```

 

# UnescapeDataString (aka UrlDecode)

Server: v8.0 Mobile: v1.0

Converts a string to its unescaped representation using Uri.UnescapeDataString (aka URL Decoding).

**Additional Details**

**Example:**

```
Consider the URL: 
http://www.rocksolidchurchdemo.com/page/12?EventTitle=Hello%20There
```

```
{{ 'Global' | PageParameter:'EventTitle' | UnescapeDataString }}
```

```
Hello There
```

**Note:**  
You can use either the filter UnescapeDataString or UrlDecode for this logic.

 

# Upcase

Server: v1.0 Mobile: v1.0

This filter transforms the string to all upper case. The string 'Lorem Ipsum Dolor' would become 'LOREM IPSUM DOLOR'.

**Additional Details**

**Example:**

```
"Person": {
    "FullName": "Ted Decker"
}
```

```
<h1>{{ Person.FullName | Upcase }}</h1>
```

```
<h1>TED DECKER</h1>
```

 

# WithFallback

Server: v6.0 Mobile: v1.0

This filter allows you to eliminate conditional tests for null or empty values by allowing you to provide fallback text.

**Additional Details**

The key two parameters are 'success text' and 'fallback text'. If the input is not null or an empty string the 'success text' will be appended to the input. If it is null or empty then the 'fall back' text will be used instead.

As of v7.4 there is an optional third parameter to control the append order. By default the success text will be prepended at the beginning of the input. You can override that by passing in the text 'append' to the filter.

```
{{ CurrentPerson.NickName | WithFallback:', are', 'Are', 'append' }} you interested in baptism?
```

**Example:**

```
"CurrentPerson": {
    "NickName": "Ted",
    ...
}
```

```
{{ CurrentPerson.NickName | WithFallback:', are', 'Are', 'append' }} you interested in baptism?
```

```
Ted, are you interested in baptism?
- or if {{ CurrentPerson }} was null -
Are you intersted in baptism?
```

