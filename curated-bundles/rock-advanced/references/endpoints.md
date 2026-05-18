---
description: "Use when building or configuring endpoints in Rock Lava applications, including setting up HTTP methods, security modes, caching, and accessing merge fields"
source: "https://community.rockrms.com/developer/helix"
sourceLabel: Helix
---
> **Path:** 

Endpoints are the fundamental units of work for your applications, encapsulating the logic called from the client. Below is the editing panel for an endpoint.

![](https://community.rockrms.com/GetImage.ashx?Id=66746)

Each of the properties of the endpoint are described in more detail below:

- **Name** - A friendly name for you to keep your applications organized
- **Description** - To serve as a place for some documentation about your application.
- **Slug** - Helps to tell HTMX what endpoint to use.
- **HTTP Method** - Specifies which HTTP method the endpoint should listen for to establish a match.
- **Security Mode** - This crucial setting defines who can access the endpoint. The options are:
	- **Execute**: This setting checks the Execute verb for this specific endpoint to determine if the CurrentPerson is permitted to run it.
		- **Application View|Edit|Administrate**: In this mode, we refer to the Application's Execute settings to decide if the endpoint can be edited. This creates a simple, application-wide pattern, reducing administrative overhead.
- **Code Template** - If you can't guess what goes here, perhaps reconsider your career in Lava Application Building...😀 The application's configuration rigging is available to your Lava using the 'ConfigurationRigging' merge field.
- **Enabled Lava Commands** - This setting determines which Lava commands to make available to your template.
- **Caching Settings** - The caching settings specify how CDNs and local browsers are permitted to cache the response from your endpoint.

## Calling The Endpoint

The full route to the endpoint is:

```
/api/v2/lava-app/1/{application-slug}/{endpoint-slug}
```

We've simplified this though when using the Lava Application Content block. Appending a `^` allows you to just use the application and endpoint slug.

```
^/{application-slug}/{endpoint-slug}
```

## HTTP Methods

You might wonder when to use which HTTP method. Generally, the choice of method doesn’t significantly impact operations, but it's crucial to avoid using the GET method for editing database data, as GET requests can be less secure and easily initiated by third-party links. Typically, the following patterns are observed:

- GET - Used to retrieve data for display.
- POST - This is the general purpose method for writing data to the database. Many people use this for create new resources.
- PUT - Commonly used for replacing an existing resource with an updated version.
- DELETE - Used for removing data from the database.

## Lava Merge Fields

When writing Lava for your endpoints you have access to the following merge fields:

- RawUrl - The URL as a single string.
- Method - The HTTP verb that was used for the request.
- QueryString - A dictionary of the various query string parameters. Example: `{% assign articleId = QueryString.articleId %}`
- RemoteAddress - The IP address of the remote client.
- RemoteName - The hostname of the remote client.
- ServerName - The server's host name.
- Form - Dictionary of values of form elements posted to the HTTP request body, with a form using the POST method.
- Headers - A dictionary of the various HTTP headers that were received in the request.
- Cookies - A dictionary of the various HTTP cookies that were received in the request.
- Body `(v19+) `\- The request body. This is not available on GET requests. If the body is JSON or XML then the contents of the body will be converted to objects for you.
- RawBody` (v19+)` - Similar to the Body, but the contents are in their raw string format.

## Special Lava Considerations for Endpoints

In most cases, Lava within your endpoints doesn't require any special handling. However, there are a few exceptions you should keep in mind.

- The Lava `javascript` and `stylesheet` commands are not functional. Because endpoint content is injected into the page using JavaScript, it's not possible to reliably determine if a script or stylesheet tag is already present on the page.

---

## Content Block {#content-block}

With your application and endpoints ready you're pretty much set on the backend. While you can technically call the backend from any webpage by importing the HTMX library yourself, we highly recommend using the provided Lava Application Content block on the front-end. This block automatically registers HTMX for you and provides convenience features and styling.

Below are the block settings for the Lava Application Content Block:

![](https://community.rockrms.com/GetImage.ashx?Id=66747)

The configuration of the block includes:

- **Name** \- The block name. We recommend setting this to a well considered name as it will help with editing inside of Magnus.
- **Application** \- While optional it's wise to set the application that you will be targeting. Doing so will share the application's configuration rigging object to your Lava template using the
- **Lava Template** - The Lava to show on the load of the block.

## Access Endpoints

When you access endpoints from the Lava template you'll want to use the notation of:

```
hx-get="^/application-slug/endpoint-slug"
```

The `^` character indicates that the route is associated with a Lava application. While you can access the endpoint using the full API route, using the caret simplifies the process.

The full endpoint URL is `/api/v2/lava-app/1/{application-slug}/{endpoint-slug}`.

---

## Magnus {#magnus}

Lava Applications and Magnus are a perfect match. You can easily edit your applications and endpoints right in VS Code.

Since content blocks can link to an application, we can group front-end content blocks with back-end endpoints, simplifying application development.

![](https://community.rockrms.com/GetImage.ashx?Id=66748)

See the [Magnus homepage](https://www.triumph.tech/magnus) on the Triumph site for more information on installing and configuring this plugin.

---

## Observability {#observability}

We expect our applications to be fast. Embracing the principle of "inspect what you expect," we've integrated observability into each Lava Endpoint call. Activities for each endpoint are named using the pattern: `LavaEndpoint: {LavaEndpoint.Name} | {LavaEndpoint.LavaApplication.Name}`.

Additionally, we add the following attributes to the root activity:

- rock.lava\_endpoint: the name of the endpoint.
- rock.lava\_application: the name of the application.

The HTTP method for the call is already an attribute on the observability activity.

As you develop your Lava Applications, it's crucial to monitor this observability data to ensure your endpoints are efficient and minimize excessive database calls.

Note

Be sure to sign-up for the non-profit plan at New Relic. More information on Rock's Observability features can be found in the [Admin Hero Guide](https://community.rockrms.com/Rock/BookContent/9#observability).

---

## Lava Commands {#lava-commands}

## Overview

Some Lava Commands are particularly useful when you need to read, update, or interact with data directly from within your Lava templates. These include commands for deleting entities, modifying data, responding to HTTP requests, and more.

You'll now find all of these commands fully documented in the official [Lava Documentation](https://community.rockrms.com/lava).

Here are direct links to each command’s new home:

- [Delete Entity](https://community.rockrms.com/page/3757)
- [Modify Entity](https://community.rockrms.com/page/3758)
- [DB Transaction](https://community.rockrms.com/page/3759)
- [HTTP Response](https://community.rockrms.com/page/3760)
- [Render Lava Endpoint](https://community.rockrms.com/page/3761)

*We've made this change to keep all Lava-related features together in one place, making it easier for you to discover and understand how Lava can be used throughout Rock.*

---

## Forms & Controls {#forms-controls}

# Forms & Controls

---

## Understanding Forms {#understanding-forms}

HTMX, and HTML in general, assume that forms are independent units and that a page may contain multiple forms. However, ASP.Net, specifically WebForms, operates with a single form that encompasses the entire page. Understanding this distinction is crucial to avoid issues with nested forms.

When working with forms for validation we've added the concept of a 'Lava Form'. These forms are independent and make up for the fact that you can't have multiple form tags on your page. You can wrap the markup of your forms in a `<lava-form />` tag.

---

## Using Form Controls {#using-form-controls}

To simplify the process of designing forms we've created a set of Lava shortcodes for common types of form fields.

To create a simple textbox in Rock you'd normally have to provide the following markup:

```
<div class="form-group rock-text-box required">
    <label class="control-label" for="rc-ab5633b7-2a1f-41b6-b346-cb48679ae68d">Last Name</label>
    <div class="control-wrapper">
	<input name="lastname" type="text" id="rc-ab5633b7-2a1f-41b6-b346-cb48679ae68d" class="form-control  " value="Decker" required="" hx-validate="true">
    </div>
</div>
```

Instead you can use the provided shortcode. This makes it as easy as:

```
{[ textbox name:'lastname' label:'Last Name' value:'Decker' ]}
```

This example, though basic, demonstrates significant efficiency gains. When applied to more intricate features, such as a campus picker, the benefits and time savings become even more pronounced.

```
{[ campuspicker name:'campus' label:'Primary Campus' value:'1'  ]}
```

To see all of the controls we provide look under the 'Helix' category on your server's Lava Shortcode page (`Admin Tools > CMS Configuration > Lava Shortcodes`).

Note

We strongly advise against modifying these shortcodes, as we plan to enhance them with additional features, which would overwrite your changes.

---

## Creating New Controls {#creating-new-controls}

Lava shortcodes, acting as controls, streamline the process of rendering form elements, making them more efficient to use.

Note

When considering creating new controls, evaluate whether they're broadly applicable or specific to your project. If you believe a control could benefit the toolkit, let's collaborate. We can either integrate it directly or assist you in submitting a pull request.

## Patterns

Most new controls are developed from the \`rock-control\` base shortcode, which offers the necessary label and control group for a wide range of controls. Utilizing this pattern is advantageous as it prevents redundancy in the basic structure of your control and ensures updates can be made centrally.

Below is an example of using the `rock-control` shortcode from the `dropdown` control.

```
{[ rockcontrol id:'rc-{{ '' | UniqueIdentifier }}' label:'{{ label }}' type:'{{ type }}' isrequired:'{{ isrequired }}' validationmessage:'Please select a campus.' ]}
    <select name="{{ name }}" id="{{ id }}" class="form-control {% if longlistenabled == 'true' %}chosen-select chosen-select-absolute {% endif %}">

	{% for item in items %}
		<option value="{{ item.value }}" {% if item.value == value %}selected="selected"{% endif %}>{{ item.text }}</option>
	{% endfor %}

    </select>
{[ endrockcontrol ]}
```

In most cases you'll want your control to provide the following parameters:

1. **label** \- This is the text that will be placed above the control.
2. **isrequired** \- Determines if a value is required for validation.
3. **type** \- The type of control. This is appended to the root
4. **validationmessage** \- Message to display when the value is not valid. The default message is "Please enter a value."
5. **id** \- This is the unique identifier for the control. The pattern that has been established is for the value to be:

When using the `rock-control` shortcode you'll need to provide the UI element between the tags (lines 2-8 above).

---

## Form Validation {#form-validation}

The form validation logic below only works for inputs that are placed within `<lava-form>` tags.

Warning

This page covers client-side validation, but it's critical to also validate input on the server side. This ensures security even if your endpoints are accessed directly.

Note

Form validation only applies to POST, PUT and DELETE calls. Validation is not processed on GET requests.

## Validation Convention

Streamlining form validation is straightforward with the guidelines outlined below. Leverage the native HTML5 validation attributes to augment your input fields. In the event of a validation error, we'll show the validation message you provide. The message you would like to display will be read from a span with the id of `rfv-{control id}`. Rest assured, utilizing the Lava shortcodes for form fields automates this process for you.If you don't provide a validation message then the default HTML/JavaScript message will be shown.

## Validation Summary

By default, a summary of validation errors appears at the top of the form. To relocate this summary, insert the provided markup at your desired location within the form. Please note, the markup must be placed within the `<lava-form>` tags.`<lava-validationsummary />`

## Validation Logic

The documentation below is not meant to be a full description of what is possible using the HTML validation API, but it provides the basic use cases for you. Note that if you use the Lava shortcodes these values will be provided for you. It's only when you are providing your own controls by calling the `{[ rockcontrol ... ]}` directly or by providing your own entire markup yourself that you need to worry about these fields.

#### HTML Validation Types

HTML5 introduced a range of `input` types that come with inherent validation logic, streamlining the process of ensuring that user-provided data conforms to expected formats or criteria. This feature enhances the user experience by providing immediate feedback on input errors, reducing the likelihood of incorrect data submission. Below is an explanation of how these input types incorporate built-in validation logic:

1. Email (`type="email"`): This input type automatically checks for a valid email format, ensuring the presence of characters typically found in email addresses, such as '@' and '.', and a domain structure. It does not, however, verify the existence of the email address.
2. URL (`type="url"`): Similar to the email type, the URL input type validates that the entered text conforms to the structure of a URL, including the protocol (http, https, etc.) and domain.
3. Number (`type="number"`): This type restricts input to numerical values. Additionally, it supports attributes like `min`, `max`, and `step` to further constrain the acceptable range and increments of the values.
4. Tel (`type="tel"`): While it doesn't enforce a specific format due to the wide variation in telephone number formats globally, this type is useful for semantic purposes and may trigger numeric keypads on mobile devices.
5. Date-related types (`type="date"`, `type="datetime-local"`, `type="month"`, `type="week"`, `type="time"`): These input types ensure that the user's input matches the expected date or time format. They often provide a user-friendly date/time picker interface, although the specific implementation can vary by browser and operating system.

## Validation Attributes

Several attributes are at your disposal to establish validation criteria for input elements. The following offers a succinct overview of their implementation.

1. Required - The `required` field validator is a fundamental tool to ensure that certain input fields in a form must be filled out before the form can be submitted. This validator is critical for fields where input is essential, such as user names, passwords, email addresses, and any other data necessary for the form's purpose.
2. Min - The `min` Value validator ensures that the input provided by the user meets a specified minimum numerical value. This validation is crucial for situations where a certain threshold must be met, such as minimum age requirements, minimum order quantities, or any other scenario where input below a certain value is considered invalid.
3. Max - The `max`Value validator is essential for ensuring that user-provided input does not exceed a specified maximum numerical value. This type of validation is particularly useful in contexts where there is an upper limit on acceptable values, such as maximum capacity, maximum allowed quantity, or maximum age limit.
4. MinLength - The `minlength` validator ensures that the textual input provided by the user in a form field meets or exceeds a specified minimum number of characters. This validation is crucial for fields where a certain amount of information is necessary for the input to be considered valid, such as passwords, personalized messages, or feedback.
5. MaxLength - The `maxlength` validator is designed to ensure that the textual input provided by the user does not exceed a specified maximum number of characters. This validator is essential for fields where there is a limit on the amount of text acceptable, such as usernames, comments, or any input where excessive length could be problematic.
6. Step - The `step` validator is used to ensure that numerical input or values of other input types like date, adhere to a specified step interval. This validator is particularly useful for fields where the input must be in multiples of a given value, such as quantity selections, time intervals, or any scenario where input needs to be constrained to a regular increment.
7. Pattern - The `pattern` validator is a powerful tool used to enforce specific formatting rules on text input fields within a form. It leverages regular expressions to define acceptable patterns, making it ideal for inputs requiring a particular structure, such as phone numbers, postal codes, email addresses, or custom user IDs. Below are some examples. We recommend using ChatGPT to help your create your own expressions.
	1. Zip Codes - Using the pattern of `\d{5}(-\d{4})?` to validate a US ZIP code, which can be either 5 digits or 5 digits followed by a dash and 4 more digits (e.g., 12345 or 12345-6789).
		2. Username - Use `[a-zA-Z][a-zA-Z0-9_]{4,11}` for a username that must start with a letter and can include letters, digits, underscores, and be 5 to 12 characters long.
		3. Password - Use `(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}` to enforce a custom password policy, such as at least 8 characters with at least one uppercase letter, one lowercase letter, and one digit.
