---
description: "Use when integrating with Rock's REST API, authenticating requests, or accessing Rock data from external applications"
source: "https://community.rockrms.com/developer/303---blast-off"
sourceLabel: 303 — Blast Off
---
> **Path:** 

Rock features a REST-based web service that supports integration with third-party websites and applications. The REST API is also utilized by various internal Rock components to retrieve and modify data such as populating item pickers, displaying person badges, and showing charts for metrics. The API is also used for external applications that access Rock data, such as the check-scanner and the financial statement generator.

## Accessing the REST API

One of the major advantages of using the REST API to interact with Rock is cross-platform support. REST messages can be sent and received in any application that supports HTTP communications.

### Authorization

To access the REST API, you must first obtain authorization to do so. The REST API can be configured to allow access based on a HTTP Cookie or an Authorization-Token.

### Using a HTTP Cookie

To access the REST API using an authorization cookie, you must first request the cookie from the web service and then include a reference to the content of that cookie in subsequent requests. The request must specify valid login credentials for an existing Rock user, and the validated response will contain a cookie named “.ROCK” with a value representing the authorization token. This token must be included in the header of subsequent requests to the REST API for the user session represented by the cookie.

Here is an example of obtaining and using an authorization cookie in a C# client application:

```
var baseAddress = new Uri( "https://rock.rocksolidchurchdemo.com" );
var cookieContainer = new CookieContainer();
var handler = new HttpClientHandler();
handler.CookieContainer = cookieContainer;
var client = new HttpClient( handler );
client.BaseAddress = baseAddress;
 
// Create the login parameters
var loginParameters = new
{
   	UserName = "admin",
   	Password = "admin"
};
 
var content = new StringContent( JsonConvert.SerializeObject( loginParameters ),
   	Encoding.UTF8,
   	"application/json" );
 
var result = client.PostAsync( "/api/auth/login", content ).Result;
result.EnsureSuccessStatusCode();
 
// The authentication cookie is returned with the login response.
var token = cookieContainer.GetCookies( baseAddress )[".ROCK"];
 
// Get a Person by Id.
result = client.GetAsync( "/api/people/GetCurrentPerson" ).Result;
result.EnsureSuccessStatusCode();
 
// Get the Person object from the response.
var person = result.Content.ReadAsAsync<Person>().Result;
```

### Using an Authorization Token

An authorization token can be used when an application requires access to the REST API without a specific user login.

To create a new REST authorization token in Rock, use the web interface and navigate to `Home > Security > REST Keys.`

After the token is created, you must add Rock security permissions to define the specific operations that are allowed for users of the token. It’s important to be aware that any agent with access to the token can perform operations on the REST API, and the token can be used until it is explicitly revoked – that is, it has no expiry. For these reasons, tokens must be stored securely and privately - for example, authorization tokens should never be stored in a public code repository.

To use the token from the caller application, set the Authorization-Token key in the header of your REST API HTTP request.

Here is an example of a request using an authorization token in C#:

```
// Create a client to call the REST API.
var baseAddress = new Uri( "https://rock.rocksolidchurchdemo.com" );
var handler = new HttpClientHandler();
var client = new HttpClient( handler );
client.BaseAddress = baseAddress;
 
// Create the data to send.
var presence = new List<MACPresence>
{
    new MACPresence
    {
        Mac = "002596123456",
        Presence = new List<Presence>
        {
       	    new Presence { Space = "Auditorium", SessionId = "Session1" },
       	    new Presence { Space = "Meeting Room 1", SessionId = "Session2" }
        }
    }
};

var content = new StringContent( JsonConvert.SerializeObject( presence ),
   	Encoding.UTF8,
   	"application/json" );
 
// Set authorization to use the default "Presence" token, unique for each Rock installation.
content.Headers.Add( "Authorization-Token", "B421A0508102448AA50506E3452BB08D" ); // "C5E93131DC7848B7AF9C5EA71F821ACB" );
 
// Post the data.
var result = client.PostAsync( "/api/presence", content ).Result;
result.EnsureSuccessStatusCode();
```

## Cross-Domain Access

If you are interacting with Rock from a web application hosted on a different domain than the Rock server, it’s important to be aware of Cross-Origin Resource Sharing (CORS). This is the mechanism used to inform web clients that your web application is allowed to access resources in a different domain.

To specify that a domain is permitted access to the Rock API, configure it in Rock by navigating to `Home > Security > REST CORS Domains` and adding an entry for the web application that is accessing Rock.

## Interacting with the REST API

The REST API supports a variety of methods for executing commands and retrieving data from Rock. Comprehensive information about these methods is beyond the scope of this document, however a complete list can be found by navigating to `Home > Security > REST Controllers`.

View the detail page for a controller entry to view its individual methods and their associated parameters.

### Retrieving Data with OData

Caution

This OData is deprecated and is not available in the API v2. 

One of the most common uses of the REST API is to retrieve data from Rock for use in your application. Rock supports the Open-Data (OData) protocol, an industry-standard method of creating powerful data queries that can be serviced by a REST service.

OData queries can be formed for most of the entities in Rock. To execute a data query that returns a list of matching entities, use the following format:

`{RockSiteUrl}/api/{EntityName}?{ODataQuery}`

The `{RockSiteUrl}` parameter corresponds to the base URL of your Rock web application. For example, to access data from the Rock demonstration web service, use “https://rock.rocksolidchurchdemo.com”.

The `{EntityName}` parameter is the name of the entity that will be returned by the query. For a complete list of the Entities available for OData queries in the Rock API, navigate to `Home > Security > REST Controllers`

The `{ODataQuery}` parameter is a query string expressed in OData syntax that specifies the data to be returned. Below are examples of some common OData queries that can be used to return data from the Rock API. Refer to the OData website ([https://www.odata.org/](https://www.odata.org/)) for a complete guide to query syntax.

#### OData Query Examples

In these examples, the `{RockSiteUrl}` parameter is represented by “~” to denote your Rock website URL. Replace the “~” with the appropriate base address of your website, such as “http://rock.rocksolidchurchdemo.com”

1. People with LastName of “Decker”
	1. `~/api/people?$filter=LastName eq 'Decker'`
2. People with BirthYear between 1971 and 1981
	1. `~/api/people?$filter=Birthyear gt 1971 and Birthyear lt 1981`
3. People with FirstName starting with “T”
	1. `~/api/people?$filter=startswith(NickName,'T')`
4. People who are deceased.
	1. `~/api/People?$filter=IsDeceased eq true`
5. Person with specific Guid value.
	1. `~/api/People?$filter=Guid eq guid'8FEDC6EE-8630-41ED-9FC5-C7157FD1EAA4'`
6. People with a Record Status of Active.
	1. `~/api/People?$filter=RecordStatusValue/Value eq 'Active'`
7. Financial Transactions greater than $20.
	1. `~/api/FinancialTransaction?$filter=Amount gt 20.00`
8. Financial Transactions occurring after 22 October 2014 2:35PM
	1. `~/api/FinancialTransaction?$filter=TransactionDateTime ge datetime'2014-10-22T14:35:00'`
9. Adult members of the Decker family.
	1. `~/api/GroupMembers?$filter=GroupRole/Name eq 'Adult' and Person/LastName eq 'Decker'`
10. People with phone numbers starting with ‘602’.
	1. `~/api/people?$PhoneNumbers/any() and PhoneNumbers/all(a:startswith(a/Number, '602')`

#### Pagination Data

You can limit the number of records retrieved to a specific page of data by using the `$skip` and `$top` parameters.

For example, to skip the first 20 items in the result set and return the next 10 records:

`~/api/Attendances?$orderby=StartDateTime&$skip=20&$top=10`

#### Shaping the Return Data

Use the `$select` parameter to specify the fields to be returned in the result set. Add the `$expand` parameter to include one or more properties of a related child object in the result set.

For example, to return a selection of properties for Attendance records and include a property of the associated child Device:

*Message:*

```
/api/Attendances?$expand=Device&$select=Id,StartDateTime,Device/Name
```

*Response:*

```
[
   	{
         	"StartDateTime": "2012-12-25T10:16:36",
         	"Id": 1,
         	"Device" : {
                	"Name": "Main Campus: Central Kiosk"
         	}
   	},
   	{
         	"StartDateTime": “2013-01-01T10:17:38”,
         	"Id": 2,
         	“Device" : {
                	"Name": "Main Campus: Central Kiosk"
         	}
   	}
]
```

## Tools and Utilities

Postman ([www.postman.com](http://www.postman.com/)) is a free tool that is extremely useful for testing and troubleshooting issues with the Rock REST API. The Postman web app provides a workbench- for sending requests to a web service and inspecting the responses. This is very useful to verify the format and content of messages sent to and from the REST API, independent of the client you are using to call the service.

---

## Rock Security {#rock-security}

See [https://community.rockrms.com/developer/videos/70](https://community.rockrms.com/developer/videos/70) (from the beta launch at CITRT 2014)

- Block Security Order
- Entity Parent Authority
- Block Security Actions
- Entity Type Security (Admin UI)
- Custom Action Verbs
- **PersonActionIdentifier** The RSVP system uses our newer 'non-security' type identification token generator (called PersonActionIdentifier) which identifies a person for only one particular action. In this case, the person token that's generated is bound to the 'RSVP' action
- **IdKey** IdKey is a way to not expose the ID number (and not have something as long and complex as a Guid in the URL). Starting with Rock v14 Obsidian blocks, the IdKey can/should be used instead of IDs -- especially in public facing blocks.

## Developing with security in mind

- Never use `HiddenField `for Ids or Guids without revalidating them upon postback.
