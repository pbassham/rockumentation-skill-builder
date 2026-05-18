---
description: Use when building custom APIs in Rock using Lava templates and webhooks to respond to HTTP requests
source: "https://community.rockrms.com/Lava"
sourceLabel: Lava
---
> **Path:** Lava > Misc > Creating APIs Using Lava

Please note that there isn't any security on running Lava through these webhooks. Please be careful what data you expose through them.

We've seen how we can add dynamic content using Lava. Now, let's look at how we can use Lava to create new custom APIs.

This method of creating APIs is a great way to build things like an XML API for Apple TV or a Roku channel. This is all done through a webhook built into Rock that will respond with the output from a Lava template. The configuration for this is all done using a Defined Type. Let's see how this is configured.

## Matching a Request to a Template

When a new request comes in to the webhook, Rock will attempt to match the request to a template configured in the Defined Type ('Admin Tools \> General Settings \> Defined Types \> Lava Webhook'). This matching is done on two characteristics of the request:

1. The HTTP Verb (GET, POST, etc.)
2. The URL
Let's look at an example.

Say a new web request was made to the webhook using the following URL as a GET (GET is the most basic of requests; it's what the typical webpage is loaded as when you type its address into the browsers).

```
http://www.myserver.com/Webhooks/Lava.ashx/myapp/home
```

Based on this request Rock would look for a Defined Value whose value matched 'myapp/home'. If the Defined Value also included a verb, that would also be used as a filter (if no verb was provided then all verbs would be matched). The matching on the URL allows for regular expression matching.

**Regular Expression Tips**  

Issues could arise if you are trying to define a URL containing characters such as (, ), \[, \], \*, +, but those are not really common (valid?) in URL paths anyway. The only one that may cause issues is . as that matches "any character" in regular expressions. The only problem this should cause is if the matching URL is /home/page.ext and the requested URL is /home/pageDext. Then it would still match.

If the URL value is defined to begin with ^ or end with $ then the value is left as is, otherwise ^ and $ are prepended and appended respectively. This allows the user to match on ^/page/ to match anything that begins with /page/.

.NET style route variables can be used. For example, you can define your URL as /series/{seriesId} and it will match /series/123, or /series/abc, etc. This also will provide an additional variable to the Lava code called seriesId.

## Lava Variables

The following Lava variables will be made available to your Lava template.

- **Url** - The relative URL requested after the webhook handler. For instance, http://www.rocksolidchurchdemo.com/Webhooks/Lava.ashx/series/123?simple=true would render in this variable as /series/123.
- **RawUrl** - The full URL including any query string parameters. This should match what the user typed in the URL bar.
- **Method** - The HTTP Verb used, such as GET.
- **QueryString** - Dictionary of any query string parameters, with the above sample URL accessing {{ QueryString.simple }} would yield the text true.
- **RemoteAddress** - Remote IP address of the client.
- **RemoteName** - Remote DNS Name (or IP address) of the client.
- **ServerName** - The server name as specified in the requesting URL.
- **RawBody** - Any POST data, for example some JSON data posted would come through as {"key1":"value1", "key2":"value2"}.
- **Body** - Any decoded values from the POST data. Form post data, JSON and XML data is decoded automatically. In the above JSON post you could access {{ Body.key1 }} to render value1.
- **Headers** - Any HTTP headers that were included with the request.
- **Cookies** - Any cookies that were included with the request.

As previously mentioned, any route variables will be made available as well.

## Lava Commands

Lava isn't very powerful without its commands. On each Defined Value you can configure which commands to make available to the templates. These commands are what will provide access to the data you wish to return.

