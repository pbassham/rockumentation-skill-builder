---
description: "Use when building advanced AI agent tools in C# with complex logic, external APIs, or heavy database operations using AgentSkillComponent classes"
source: "https://community.rockrms.com/developer/ai-agents"
sourceLabel: AI Agents
---
> **Path:** 

*[Lava Tools](https://community.rockrms.com/developer/ai-agents/writing-custom-tools/lava-tools)* are great for fast, low-code development inside Rock. Native Tools go further by using compiled C# and the full Rock infrastructure. By creating custom classes that inherit from `AgentSkillComponent`, you can build more advanced tools for complex logic, external API integrations and heavier database work, while still giving the AI agent clear instructions and strong guardrails.

## Method Definition

```
[AgentSkillName( "Communication" )]
[Description( "A description of the skill that will be displayed in the UI." )]
[AgentPurpose( "The purpose this skill fulfills that will be sent to the AI." )]
[AgentUsage( "When composing SMS messages, try to keep the draft below 160 characters." )]
[AgentGuardrail( "Never send a communication without first getting explicit approval from the user." )]
[AgentSkillGuid( "e0799671-f063-4f55-90f8-f3aba24a551a" )]
[EntityTypeGuid( "6dcaa0f4-1549-4c33-a117-c51628ff7f46" )]
public class CommunicationSkill : AgentSkillComponent
{
    [AgentToolName( "ComposeEmail" )]
    [Description( "A description that will be displayed in the UI." )]
    [AgentPurpose( "The purpose this tool fulfills that will be sent to the AI." )]
    [AgentToolReturnsDescription( "A description of the type data returned by the tool." )]
    [AgentUsage( "The recipient should always be specified by the user and never inferred." )]
    [AgentGuardrail( "Critical rule that must be followed." )]
    [AgentToolPrerequisite( "Something that must be performed or achieved before calling this tool." )]
    [AgentToolExample( "An example of how to call the tool." )]
    [AgentToolGuid( "2cd93dc2-8e3b-4363-8605-4b7ca96db5dd")]
    [AgentToolPreamble( "Composing Email" )]
    public RockToolResult ComposeEmail( string instructions, string tone, string recipientIdKey )
    {
        return Error( "Not Implemented." )
    }
}
```

The following attributes can be specified multiple times. This allows you to break up longer items for easier readability. It also helps the language model understand the logic groupings of your statements.

- **AgentPurpose** - Describes the basic purpose of the tool.
- **AgentUsage** - Provides details on usage instructions for the tool.
- **AgentGuardrail** - Provides instructions around how to safely call the tool (like warnings that data will be updated or deleted.)
- **AgentToolPrerequisite** - Describes steps that should be completed before calling this step.
- **AgentToolExample** - Provides an example of usage for the orchestrator.
- **AgentToolPreamble** - This is the text that will be shown to the user when the tool is called. This is only used for Rock Agents and does not impact MCP clients.

All attributes are optional except the `AgentToolGuid` attribute.

## Processing Logic

We recommend that every native function returns a \`RockToolResult\`.

If your tool returns structured data, use a POCO (we recommend names ending with `Result`) and return it via the static helper `RockToolResult.Success(...)`. 

```
List<PersonResult> results = GetResults();

var meta = new Dictionary<string, object>
{
    ["returnedRows"] = results.Count,
    ["hasMore"] = hasMore
};

return Success(results)
    .WithInstructions(
        "These results include exact matches and phonetic (metaphone) matches. " +
        "Display all results, even if they don’t exactly match the query."
    )
    .WithMetadata(meta)
```

This method only requires the results you wish to return (in this case List<PersonResult\>) to be returned. You can further customize the result using the builder methods:

`WithInstructions( string instructions )`\- Provides guidance to the LLM on what to do next.

`WithMetadata( Dictionary<string, object> meta )`\- Additional metadata to be returned with the result. Useful for paging, noting if more data is available, and any filters that were used.

Common Metadata Keys

- `returnedRows` (int) — Number of items returned.
- `hasMore` (bool) — Indicates additional pages are available.

`WithHistoryContent( object content, string key = "" )`\- Stored to chat history with role `tool` (not visible in agent chat). This allows the agent to maintain context of what the tool returned. Providing a key will ensure only one value exists in the chat history and allows you to update the content in later tool calls. Note: you can only have one history content. Repeated calls of this method will override previous values.

`WithContent( object content )`\- Sets or overrides the same content as `RockToolResult.Success(...)` . This method is typically not needed. It is available for the rare cases where you need to set the response content directly instead of using the standard `Success()` pattern.  

`WithReferenceRoute( string text, string route, bool secured = false )` - Add a reference URL. This will check if the current person has access to view the page if `secured` is true (default false). If the current person does not have access to the provided page no value will be set. This will prepend the Public Application Root global attribute. An example of a usage of this would be to provide a link to the communication page after a new communication is created.

`WithHistoryKey( string key )`\- Add a key to be associated with the history. This allows the history to be updated by future calls. This is only needed if the contents of the history will change.

### Types of Returned Content

There are two types of content that can be returned:

1. Content: This is the normal content your tool responds with that will be used by the LLM to generate the final response to the individual. This content is not stored in the chat history so it won't be available on future requests. An example of this would be a list of matching people for a given search query.
2. History Content: This content is not used by the current response but will be placed into the chat history to be used by subsequent chat interactions. An example of this would be for a stripped down list of people so that you can reference different people from the match list in later requests. Only include items in `HistoryContent` that are essential for continuing the conversation. Keep it as minimal as possible.

## Return Objects

Below are some best practices to use when working with returning data.

### Rules of Thumb

1. Keep payloads small, only send back what is needed.
2. You don't need to pass back IdKey's for all values that have them, just ones where they will be needed to make additional calls with. For example, the Campus result has a CampusStatus which is a defined value. We just need to return the text value as currently there is no need for the IdKey of the defined value.
3. When returning a Person always use the PersonResult common return object
	1. You only need to fill the properties that you believe are needed. Properties with null values will not be included in the JSON.
		2. Providing a value for Id will autogenerate the IdKey. The Id property is \[JsonIgnore\] so you don't need to worry about it being returned in JSON.

### Attribute Values

To filter attribute values, it is a good idea to use the `<Entity>AttributeValues` property if you need to do filtering. However, if you are returning attribute values it is almost always faster to call the `.LoadAttributes()` method on either the entity or collection of entities.

### Examples

Below is an example tool result from creating a communication draft to a person:

```
var draftResult = new
{
    CommunicationIdKey = communication.IdKey,
    Subject = communication.Subject,
    Body = communication.Body,
    Medium = "E-mail"
};

var returnInstructions = "Never call SendCommunication directly after this. Always ask for confirmation before sending.";

var historyContent = new
{
    Recipient = new KeyNameResult( recipient.IdKey, recipient.FullName ),
    CommunicationIdKey = communicationIdKey
};

return Success( draftResult )
    .WithInstructions( returnInstructions )
    .WithHistoryContent( historyContent )
    .WithReferenceRoute( AgentRequestContext.RockRequestContext, "Draft Communication", $"/Communication/{draftCommunication.Id}", false );
```

So what is happening with our RockToolResult?

- Well, first we are creating a success result. In that result we are going to return the `draftResult` object as the content. The LLM will use this content to generate a final message to display in response to the individual. This contains a lot of information, including the subject and body text of the communication.
	- By default, this `draftResult` object will also be used as the history content because this is a success result.
- Next we are including some instructions to the LLM about how to proceed from here. In this case, we are being very cautious and letting the LLM know it should never automatically send an e-mail until the individual has explicitly given their okay. We don't want a communication sent that the individual hasn't had a chance to review.
- After that we specify that we want to use `historyContent` as the content to be saved into the chat history. Since this data is used for we don't need the full body or subject text here. We just need enough information that is the individual asks for it to be sent or deleted, it knows what key to use when doing that operation. In this case, we store just the recipient and the IdKey of the communication in our chat history. Again, if we didn't call `WithHistoryContent()` we then it would have used the `draftResult` for history by default. If your content is small, that's probably fine.
- Finally, we want to display a link to view the communication. Our `WithReferenceRoute()` method allows us to do just that. We want the link to be called "Draft Communication" and to send them to the route for the Communication View page. In this case, we are also saying that we don't want page security to be checked.

Now lets take a look at a different example. In this case, we have an error response. You'll see that these are handled slightly differently. In this context, we are handling a message such as "Update Ted Decker's mobile phone to 6235553322."

```
// Values that came in from the method parameters.
string phoneTypeIdKey = null;
string personIdKey = "Qk37JnskE4";
string phoneNumber = "6235553322";

if ( mediumTypeIdKey == null )
{
    var phoneTypes = new List<KeyNameResult>
    {
        new KeyNameResult( "82lJ2ms903", "Home Phone" ),
        new KeyNameResult( "KM20s83Jsl", "Mobile Phone" )
    };

    return RockToolResult.Error( "No phone number type was provided." )
        .WithInstructions( "Use the provided list of phone number types and try again." )
        .WithContent( phoneTypes )
        .WithHistoryContent( phoneTypes );
}

// Process and handle successful response.
```

In this case, we have some error checks that happen because there might be data we need that isn't provided by the LLM initially.

- First we generate an error result type. The text is a message that helps the LLM understand what went wrong. If it decides it can't do anything about the problem, it will also use this to craft a response back to the individual.
- Next we provide some instructions to help the LLM rectify the problem. This is only used to problem solve, it will not be used when crafting a response back to the individual. In this case, we are informing the LLM that we are going to give it some content it can use to determine which phone number key to provide.
- After that comes the actual content that contains the list of phone number types that are valid to choose from.
- Finally, we are adding some history content. Now, at this point we don't actually have any default history content. Remember that the error result type does not provide any content or history content by default. Also, note that things would work perfectly fine even if we didn't provide the history content. However, in some cases providing history content like this can be useful. For example, suppose the LLM picks the phone type and calls the tool again. The change is saved. Then the individual asks to "make that his home phone instead". Because it has the phone types in history, it can immediately call the tool with the correct phone type key.

## Error Handling

The core framework allows you to elegantly handle errors that may be generated in your tools. 

```
return Error( "Invalid CampusIdKey provided." )
  .WithInstructions( "The CampusIdKey provided does not match any existing campus. Use the LookupCampus function to get a list of valid campuses." )
```

The first property is the error message which describes the nature of what went wrong. The second optional property allows you to provide recovery instructions to assist the LLM (e.g. "Please call LookupGroupTypes to get a valid list of GroupTypeIdKeys.") The final optional parameter is for metadata.

A well written tool will check and provide error handling for the following cases:

1. Required parameters that are null.
2. Passed IdKeys whose values are not valid (do not exist in the database).

## Tips and Tricks

1. You can access the Agent Type (Agent or MCP) using `this.AgentRequestContext.AgentType`.
2. You can access the Audience Type (Internal or public) using `this.AgentRequestContext.AudienceType`.
3. You should not reference Semantic Kernel anywhere from within your tools. We've carefully abstracted this out in case we need to switch to a different SDK in the future.

### Data Objects

When creating POCOs here's a few things that will help you out.

- Decorating a property with the `[Description("...")]` attribute has the effect of providing a custom instruction to the LLM that is related to this field.
- Decorating a property with the `[JsonRequired]` attribute tells the LLM that this field is required.
- Adding an attribute to a property of `[JsonIgnoreAgentType( AgentType.Mcp )] `or `[JsonIgnoreAgentType( AgentType.Agent )] `can hide a property depending on the agent type.
- Adding an attribute to a property of `[JsonIgnoreAudienceType( AudienceType.Internal)] `or `[JsonIgnoreAudienceType( AudienceType.Public)]` can hide a property depending on the audience type.
- If your property is an enum you may want to decorate it with `[JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingDefault)]` if you don't want it to show if it's null. Otherwise, it's default value (0) will be returned.

#### Native Tools List
