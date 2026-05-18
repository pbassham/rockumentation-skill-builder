---
description: "Use when configuring advanced Web Request parameters like headers, authentication, request body, content types, timeout, or HTTP method"
source: "https://community.rockrms.com/Lava"
sourceLabel: Lava
---
> **Path:** Lava > Commands > Web Request

While most of Rock's Lava commands focus on data that's inside Rock, the Web Request command helps you interact with data in other systems. It allows you to make different types of web requests (think REST or basic HTTP requests) to remote servers.

## The Basics

Let's take a look at a basic web request that queries the commit history of the Rock GitHub repo.

```
{% webrequest url:'https://api.github.com/repos/SparkDevNetwork/Rock/commits' %}
    <ul>
    {% for item in results %}
	    <li>
            <strong>{{ item.commit.author.name }}</strong><br />
            {{ item.commit.message }}
        </li>
    {% endfor %}
    </ul>
{% endwebrequest %}
```

Pretty simple right? Give it a URL and you get a *results* object to iterate through to get your results.

**Tip** If you're not quite sure of the structure of your results, try using the ` | ToJSON` filter wrapped inside of a `<pre>` tag.

## Passing Parameters

Most requests won't be that simple. In most cases you'll want to pass in parameters to your request. While you're free to use the URL to set the query string, you can also use the 'parameters' parameter to set the values.

The GitHub API from above allows us to filter the results by a specific author and limit the return count. The example below extends the basic sample to show the last commit from a specific author.

```
{% webrequest url:'https://api.github.com/repos/SparkDevNetwork/Rock/commits' parameters:'per_page^1|author^edmistj' %}
    <ul>
    {% for item in results %}
	    <li>
            <strong>{{ item.commit.author.name }}</strong><br />
            {{ item.commit.message }}
        </li>
    {% endfor %}
    </ul>
{% endwebrequest %}
```

Notice that the key value pair notation is in the form of 'key^value'. Each pair is then delimited by a '|'. Long-time Lava junkies may recall that this is the same format used by the Key/Value Pair Attribute type. This is not by accident. In some cases you may find it helpful to simply merge the attribute value into the 'parameters' parameter.

# Other Parameters

We've now seen how the 'parameters' parameter works. Let's look at the rest of the parameters available.

**Quick Links**
- [parameters](#parameters)
- [headers](#headers)
- [method](#method)
- [basicauth](#basicauth)
- [body](#body)
- [requestcontenttype](#requestcontenttype)
- [responsecontenttype](#responsecontenttype)
- [return](#return)
- [timeout](#timeout)

## Parameters

I know we covered it above, but just in case you skipped that section we'll list it again here. The 'parameters' parameter (that's a bit confusing to say) allows you to pass in query string values with the format of 'key1^value1|key2^value2|...' See the example above for more information.

## Headers

The 'headers' parameter is very similar to the 'parameters' item above. It uses the same key/value syntax. Instead of setting query string parameters though, it sets the header values.

## Method

REST, and other web APIs, take advantage of HTTP verbs to help group like functions. While retrieving data you commonly use the GET verb so we made that the default. You can override it though, to use any verb you'd like using the notation `method:'POST'`. (Note that the value is case insensitive - it's Scottish.)

## Basic Authentication

To help simplify your requests to secured endpoints, you can use the 'basicauth' parameter to provide a username and password to your request in the format `basicauth:'username,password'`.

## Body

Some requests will require the request body itself to contain information. Do this with `body:'yourcontenthere'`. Note if you need to send form-data don't use a body, use query parameters and a POST request instead.

## Request Content Type

To enable the target server to process your request correctly you must provide a [MIME](https://en.wikipedia.org/wiki/Media_type) describing the content being sent in the body. To do this use the format `requestcontenttype:'application/json'`. Note this only needs to be used if you're sending a request in the body and will override any Content-Type set in the headers.

## Response Content Type

To help tell Lava what to expect back from your endpoint you can specify its type. The default is 'JSON' but you can also provide 'XML' or simply 'HTML' using `responsecontenttype:'HTML'`. (Note that this is also case insensitive.)

## Return Result

As you've seen in the example, your data will be returned in a variable called 'results'. If you don't like that convention, you can provide your own return variable name ala `return:'myResults'`.

# Tips and Tricks

When working with Web Requests it can be challenging to create the message body because you have to create the JSON yourself. The example below shows how you can collect and format your message body using `Capture`, `Trim` and `Strip New Lines`.

```
{% capture output %}
    {
    "message": "{{message}}",
    "subject": "{{subject}}",
    "person": {
    "email": "{{person.Email}}",
    "first_name": "{{person.NickName}}",
    "last_name": "{{person.LastName}}"
              }
    }
{% endcapture %}

{% assign bodyoutput = output | Trim | StripNewLines %}

{% webrequest url:'https://url.for.post' method:'POST' body:'{{bodyoutput}}' requestcontenttype:'application/json' %}
    {{results | ToJSON}}
{% endwebrequest %}
```

## Timeout

The amount of time, in milliseconds , that the client will wait for a response from the server before giving up on the request. The default value is 12000ms.

