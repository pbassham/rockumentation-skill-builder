---
description: "Use when user needs to embed and execute C# code directly within Lava templates to generate dynamic content or perform complex logic"
source: "https://community.rockrms.com/Lava"
sourceLabel: Lava
---
> **Path:** Lava > Commands > Execute

**Deprecated**

This command has been deprecated and should be eliminated from any usage since it will eventually be removed from core.

If you know C# the world is now your oyster! You can now use those skills to make rich and powerful Lava templates. For this tutorial we'll start simple and work our way to more sophisticated script blocks.

**Warning**

This command is not recommended for normal use. It was created to help developers with testing.

## Hello World

Where else would we start, but 'Hello World'?

```
{% execute %}
    return "Hello World!";
{% endexecute %}
```

As you probably inferred, anything inside the execute tags is treated as C#. Your scripts must return a single string that then becomes the output.

## Lava Generated C# That Renders As Lava

What!? So get this... Your C# script will be processed as a Lava template, run as C# all inside a Lava template. Clear as mud? This simple example will help.

```
{% execute %}
    return "{{ Person.FullName }}";
{% endexecute %}
```

See that? Consider the Inception-like logic of this one...

```
{% capture personScriptResults %}
    {% execute %}
        return "{{ Person.FullName }}";
    {% endexecute %}
{% endcapture %}

{{ personScriptResults }}
```

While this example is a simplistic use case, we hope you see the patterns that you can achieve.

## Importing

You've probably noticed that this is basic C#. So far we haven't seen any classes, methods, etc. You might be wondering what you do when you need to reference a class that's in another assembly. Normally, you'd use an import to configure the assembly. You can add imports using the 'import' parameter. Below is a quick script that grabs the last GitHub commit from the Rock repo.

```
{% execute import:'RestSharp,Newtonsoft.Json,Newtonsoft.Json.Linq' %}
    
    var client = new RestClient( "https://api.github.com" );
    var request = new RestRequest("repos/SparkDevNetwork/Rock/commits", Method.GET);
    
    IRestResponse response = client.Execute(request);

    JArray commitArray = JArray.Parse(response.Content);

    dynamic firstCommit = commitArray.First["commit"];
    return firstCommit.message + "<br />" + firstCommit.author.name;
    
{% endexecute %}
```

Yes, we know the code above is a bit of a hack. It was built for brevity and to show a few specific features. Notice that we added two assemblies in the import.

To keep you from having to add too many imports, we auto-import the following assemblies for you. (You're welcome.)

- System
- Rock
- Rock.Model
- Rock.Data

Note that the import parameter is only used with scripts. If you provide a class you're on your own for importing what you need.

## Full Class

OK you C# geniuses... you can use full classes if you want to.

```
{% execute type:'class' %}
    using Rock;
    using Rock.Data;
    using Rock.Model;
    
    public class MyScript 
    {
        public string Execute() {
            using(RockContext rockContext = new RockContext()){
                var person = new PersonService(rockContext).Get({{ CurrentPerson.Id }});
                
                return person.FullName;
            }
        }
    }
{% endexecute %}
```

Take a closer look at that class. It pulls up the Person model for person in the context of the page.


---

## HTTP Response {#http-response}

> **Path:** Lava > Commands > HTTP Response

v18.0

HTMX (Lava Applications) allows your response to actually change the behavior of the initial request. For example, your server-side logic can perform an action like:

- Redirect the request to a new page
- Retarget the area of the page to place the new content with
- Trigger another event on the page
- Tell the page to reload
- Push a new URL to the history stack

To enable all of this logic we created a special Lava command to interact with the response in a robust way.

## Basic Example

The example below would tell the page to reload itself.

```
{% httpresponse %}
  [[ header key:'HX-Refresh' ]]true[[ endheader ]]
{% endhttpresponse %}
```

Note that multiple headers can be provided at once.

## Changing the Response Status

By default the HTTP response status will be 200 when your call is matched and run successfully. You might want to change that based on the logic of your endpoint. For instance, you may want to return a 404 status if the group you are updating was not found. Below is an example of updating the return status.

```lava
{% httpresponse status:'404' %}
{% endhttpresponse %}
```

