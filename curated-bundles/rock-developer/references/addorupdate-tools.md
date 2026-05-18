---
description: "Use when implementing add or update operations for database entities in Rock, including entity creation, property modification, and persistence patterns"
source: "https://community.rockrms.com/developer/ai-agents"
sourceLabel: AI Agents
---
> **Path:** 

## Overview

Add Or Update tools handle modifying an existing entity or adding a new one to the database. We're going to take a look at adding or updating a group. We will not be including all possible properties and values. Instead we will have just enough to give you an idea of the pattern, which can be broken down into three steps:

1. Load or create entity
2. Update values
3. Save changes

## Load or Create Entity

The sample code for this might get a bit long, but bear with it. Most of it is fairly simple, we just need to show all the parameters that the tool can accept as arguments.

```
public IAgentToolResult AddOrUpdateGroup(
    [Description( "Required when editing an existing group." )]
    string groupIdKey = null,

    [Description( "Only valid and required when adding a new group." )]
    string groupTypeIdKey = null,

    string name = null,
    SetOrClear<string> description = null,
    bool? isPublic = null,
    List<AttributeValueResult> attributeValues = null )
{
    using var rockContext = RockApp.Current.CreateRockContext();
    var helper = new AgentToolHelper( rockContext, AgentRequestContext, _logger );

    Group group;

    if ( groupIdKey.IsNotNullOrWhiteSpace() )
    {
        group = helper.GetRequiredEntity<Group>( groupIdKey, checkSecurity: true );
    }
    else
    {
        group = rockContext.Set<Group>().Create();
        new GroupService( rockContext ).Add( group );

        var groupType = helper.GetOptionalEntity<GroupType>( groupTypeIdKey, checkSecurity: true );

        if ( groupType != null )
        {
            group.GroupTypeId = groupType.Id;
        }
        else
        {
            helper.AddError( $"You must provide either {nameof( groupIdKey )} to update an existing group or a {nameof( groupTypeIdKey )} to add a new group." );
        }
    }

    if ( helper.HasErrors )
    {
        return helper.ErrorResult;
    }
```

Alright, lets break this down. The first half of this code simply declares the tool method signature and then creates a new rock context and tool helper.

After that we have some extended logic to handle loading an existing group or creating a new one. The if statement `groupIdKey.IsNotNullOrWhiteSpace()` tells us if we are editing or adding. If we are going to edit, then we perform a required entity lookup. This may still return null, but it will report an error that we will check later.

In our else block, we handle adding a new group. Because a group cannot be created without a group type, this logic is a bit more complex than you would need to do if that wasn't the case. Put simply, this creates a new group, adds it to the context, and then sets the `GroupTypeId` if we can, otherwise reports an error.

The reason we call `GetOptionalEntity()` instead of `GetRequiredEntity()` is that in this case, if it is missing, we want to report a more useful error than just saying it is required. We want the error to include enough context to the language model that it understands the true problem. Meaning, maybe what it really forgot was to pass in `groupIdKey` because it wants to edit.

After all this, we check for any errors. Now is a good time to do so, since any errors likely means that `group` is also null.

Tip

Pay attention to the fact that we we call `rockContext.Set<Group>().Create()` instead of just new `Group()`. This is because the former will create a proxy object. With a proxy object entity framework can correctly handle navigation properties, which is required later when we return the details of the new group.

## Update Values

Most values can be updated with the tool's helper methods. But you may run into cases where you need to handle them with special logic, such as the name property below. It is required when adding, but optional when editing.

```
if ( group.Id == 0 )
    {
        if ( name.IsNotNullOrWhiteSpace() )
        {
            group.Name = name.Value;
        }
        else
        {
            helper.AddError( $"{nameof( name )} is required when adding a new group." );
        }
    }
    else
    {
        helper.UpdateProperty( group, g => g.Name, name );
    }

    helper.UpdateProperty( group, g => g.Description, description );
    helper.UpdateProperty( group, g => g.IsPublic, isPublic );
    helper.SetAttributeValues( group, attributeValues );
```

As you can see, the other properties are very simple to handle. Name is the one that requires some additional logic because a group isn't valid without a name. We also declared the `name` parameter as just a `string` instead of `SetOrClear<string>` because that helps indicate to the language model that clearing the group's name is not valid.

## Save Changes

The final step is, of course, saving the changes and then returning the success result.

```
helper.SaveChangesIfNoErrors();

    if ( helper.HasErrors )
    {
        return helper.ErrorResult;
    }

    return Success( GetFullGroupResult( group ) )
        .WithHistoryContent( new KeyNameResult
        {
            Id = group.Id,
            Name = group.Name,
        } )
        .WithInstructions( $"The group has been {( groupIdKey.IsNullOrWhiteSpace() ? "created" : "updated" )}." );
}
```

If you will notice, we don't check for errors first. Instead we use the special helper method `SaveChangesIfNoErrors()`. This will do nothing if there were already errors. After that we check for errors. This allows us to reduce the number of checks for errors during this whole operation.

If we don't have any errors, then we return a success message with the full group result. Your success message should include the full entity details (within reason). Since these are the same details that would be returned by the Get tool we recommend creating a common method that can be used by both. See the Get tool documentation for an example of what this common method might look like.
