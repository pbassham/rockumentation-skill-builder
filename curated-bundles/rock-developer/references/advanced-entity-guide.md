---
description: "Use when understanding less common Rock entities like Attendance records, Attributes, and AttributeValues for data modeling"
source: "https://community.rockrms.com/developer/202---ignition"
sourceLabel: 202 — Ignition
---
> **Path:** 

Now let's look at several entities that are a little less common or a little more obscure than the day to day entities.

## Attendance

This represents an instance where a person attended or was scheduled to attend a group or event. An attendance will essentially always have the following properties:

**PersonAliasId** \- The alias id of the person who did/was to attend.

**StartDateTime** \- The date and time the person checked in.

**RSVP** \- An enum indicating whether or not the person had RSVP'd. (0 = No, 1 = Yes, 2 = Maybe)

**DidAttend** \- A Boolean indicating whether or not the person attended.

**ScheduleId** \- The Schedule Id for which the person did/was to attend.

**GroupId** \- The Group Id for which the person was related to when the check-in occurred. **SundayDate** \- The date of the Sunday for the week the attendance occurred.

This represents an instance where a person attended or was scheduled to attend a group or event. An attendance will essentially always have the following properties:

**AttendanceCodeId** \- The Id to the AttendanceCode that has the security token that was created for the attendance record.

**LocationId** \- The Location Id where the person did/was to attend.

**DeviceId** \- The device the person used when they checked in.

**CampusId** \- The campus where the attendance occurred.

**DidNotOccur** \- a Boolean which will be set to true if the event for which the person was to attend did not occur.

## Attribute & AttributeValue

As mentioned elsewhere, nearly every entity type can have Attributes and the entity instances can store AttributeValues. Every Attribute has a particular field type such as Text, Date, Date Time, Date Range, Day of Week, Person, Group, etc. and this controls what kind of data can be stored in the AttributeValue. There are about one hundred field types so you should be able to store just about any kind of data you can imagine.

Attributes have the following properties:

**Name** \- This is the friendly name of the attribute.

**Key** \- This is the key that you may use in certain Lava filters to manage your attribute/values. **EntityTypeId** \- Since an attribute is tied to an Entity Type, this holds the value of that type. **EntityTypeQualifierColumn** \- This is only used in those cases where the attribute applies to only a subset of the EntityType.

**EntityTypeQualifierValue** \- This is only used in those cases where the attribute applies to only a subset of the EntityType.

**FieldTypeId** \- This indicates exactly which field type the attribute is using.

**IsMultiValue** \- This boolean controls whether or not the attribute can have multiple assigned values.

**IsRequired** \- This boolean controls whether or not an attribute value must be supplied when editing.

**IsGridColumn** \- This boolean controls whether the attribute/value should appear in grids where the entities are listed.

**Description** \- This is the friendly administrative text that helps you remember what the attribute is use for.

**Order** \- The integer stored here indicates the ordinal when they are displayed in a list.

AttributeValues have the following properties:

**AttributeId** \- This indicates exactly which attribute this value belongs to.

**EntityId** \- This indicates exactly which entity the value belongs to.

**Value** \- This is the string representation of the attribute value for the entity.

**ValueAsNumeric** \- This is the numeric (decimal) representation of the value.

**ValueAsDateTime** \- This is the DateTime representation of the value.

**ValueAsBoolean** \- This is the boolean representation of the value.

**ValueAsPersonId** \- This is the person Id of the Value (if the value is a person alias guid).

Out of the box Rock includes UI for adding/deleting attributes for Person, Group, GroupType, and a few others entities, but there is an "Attributes" block that's very easy to configure to manage new custom attributes for just about any entity. However, not every entity "Detail" block currently has code to manage the Attribute Values for that entity but, if you look at the code history ([33a7217](https://github.com/SparkDevNetwork/Rock/commit/33a7217c30ee8252fcc8e0d4226ce17abfb78842#diff-4bad3c2046024cd04376bac327bdb5d5) and [70f3e16](https://github.com/SparkDevNetwork/Rock/commit/70f3e16d30fa12156cf18b5de4ceb85b5044389f#diff-4bad3c2046024cd04376bac327bdb5d5)) of the [Finance AccountDetail](https://github.com/SparkDevNetwork/Rock/blob/develop/RockWeb/Blocks/Finance/AccountDetail.ascx.cs) block, you will see the code needed to add this feature. Be sure to check the latest code/pattern in the AccountDetail block since some patterns have changed slightly since those two commits were made (for example: [760f7d7](https://github.com/SparkDevNetwork/Rock/commit/760f7d7bec3d3e67b8f48b88d0b39c6068cc29c7)).

There is another code pattern for enabling "List" blocks to show attribute values on the grid when the attribute has the "Show in Grid" (IsGridColumn) checkbox checked. (See [2c59a7f](https://github.com/SparkDevNetwork/Rock/commit/2c59a7f198e5222d2493c2f7bbf9c1714e2cb7e4#diff-0ce49c8bcecac8a5267e5b0ff53c1fed))

## Code Recipes

There isn't a quick way to load attributes in one round trip for a list of entities, but using the “.Where” clause on attribute values for a queryable you can do something like this:

```
var rockContext = new RockContext();
    
// get groups that have a favorite color attribute of blue
IQueryable<Group> groupsWithAttributeValues = new GroupService( rockContext )
    .Queryable().WhereAttributeValue( rockContext, "FavoriteColor", "Blue" );
```

Group attributes are the most complicated to load since they can inherit attributes from their parent GroupType(s) and the above snippet wouldn't work if a group inherited an attribute value from a GroupType, but in most cases, this would do the trick.

You can even do some complex queries using the `WhereAttributeValue` method and the ValueAsBoolean, ValueAsDateTime, ValueAsNumeric forms of the Value. These properties are automatically computed using the Value property but be sure your value stores a Date before trying to use the ValueAsDateTime property, for example.

```
var rockContext = new RockContext();

// Get cool people.
 var catBaptismCutoff = RockDateTime.Now.AddYears( -3 );
 IQueryable<Person> personsThatAreCool = new PersonService( rockContext ).Queryable()
     .WhereAttributeValue( rockContext, av => 
         (av.Attribute.Key == "LovesStarWars" && av.ValueAsBoolean == true) 
      || (av.Attribute.Key == "CatBaptismDate" && av.ValueAsDateTime > catBaptismCutoff ));
```

## BinaryFile

A binary file is basically any kind of file that needs to be stored in Rock (or elsewhere). The file might be an image, a check-in print label, or an uploaded PDF. Using different "Storage Providers" the contents of the file can be stored to the web server's file system, the database or places such as Azure, Amazon S3, etc. The BinaryFile entity will always have the following properties:

**IsTemporary** \- This Boolean lets Rock know if the storage of the file was only temporarily necessary. In other words, Rock is free to delete any that are temporary.

**FileName** \- This is the name of the file, including any extensions. This name is usually captured when the file is uploaded to Rock and this same name will be used when the file is downloaded.

**MimeType** \- No clowning around, these are official. The value recorded here tells you if the file is a PDF, an image, text, video, word document, etc. You can see a rather extensive [official list of valid Mime Types here](http://www.iana.org/assignments/media-types/media-types.xhtml).

Although not technically required, a BinaryFile will also typically have the following:

**BinaryFileTypeId** \- This lets you determine the BinaryTypeType which controls the security requirements on the file, the storage provider to use for storing the file, and whether or not the file can be cached.

**StorageEntityTypeId** \- This tells you which Storage Provider is being used to store the file. This is the Id of record from the EntityType table.

**Path** \- This is the path to the file resource as determined by the storage provider. URL \- Somewhat related to the Path, the value stored here is the public URL used to retrieve the file from the storage provider.

## Communication

A communication represents an email, an SMS message or something similar. Oddly enough there are not many required properties on a communication but they will usually have these:

**Subject** \- Yes, it's what you think it is.

**Status** \- This is one of the following: 0 – Transient, 1 – Draft, 2 – Pending Approval, 3 – Approved, 4 – Denied. Transient communications are those created somehow by the system but not yet edited by the user. They will be removed by the Rock cleanup job periodically. **MediumEntityTypeId** \- This is what tells you if the communication is an email, SMS text, etc. This is the Id of an item in the EntityType table.

**SenderPersonAliasId** \- This is the alias id of the person who is considered the "sender" of the communication.

**IsBulkCommunication** \- Recommended to be set to true, if the communication is being sent to a large amount of people who are probably not expecting it.

**Recipients** \- This is a collection of CommunicationRecipient entities which gives you the particular details about who is going to (or has) received the message.

## CommunicationRecipient

This goes along with a Communication and holds the details about the person who received or should have received the communication.

**Status** \- This is one of the following and tells you whether or not the message was sent, received and/or opened: 0 – Pending, 1 – Delivered, 2 – Failed, 3 – Cancelled, 4 – Opened, 5 – Sending. **StatusNote** \- This will hold any free-form text regarding the message delivery or reason why it could not be delivered.

## ContentChannel & ContentChannelItem

Content channels and the items they contain have become the main vehicle for putting structured content (HTML) on your Rock powered website. When you look at certain pages on the main rockrms.com website such as [https://www.rockrms.com/Rock/Connect](https://www.rockrms.com/Rock/Connect) or the promotion ads on the stock [home page of the demo site](http://rock.rocksolidchurchdemo.com/page/1) you will see them in action.

In actuality, Content Channel's have an underlying Content Channel Type where base, inherited channel attributes and channel item attributes can be put. In this way, Content Channel Types and Content Channels are similar to Group Types and Groups.

You may not be interacting with Content Channels in your code too often, but if you do you'll want to study the ContentChannelView block to see how.

## Note & NoteType

Notes represent an entity that holds user typed information about another entity and Rock provides some blocks to help with their usage. To prevent you from re-creating the wheel, let's make sure you understand the power of the Notes entity. Notes can be seen in action on the person profile page as the "Timeline" feature via the Notes block and on the Group Member Details page. Although Notes are relatively simple, having only a few properties listed here, they can be bound to any entity type in Rock and each Note Type can be secured allowing only certain roles/people to view, add or edit them. The properties of a Note are:

**NoteTypeId** \- Each note has an underlying type that tells Rock which entity type it is tied to and what security it has.

**EntityId** \- This is the Id of the entity that the note is bound to. The Note's type tells you which entity type the Id belongs to.

**IsAlert** \- This Boolean lets Rock know if this special note should be highlighted in some way to bring special attention to the viewer.

**IsPrivateNote** \- This Boolean flag indicates that the note should only be visible to the person who created the note.

**Caption** \- This is a brief, optional title for the note which is typically programmatically generated on the fly by Rock's internal code. For example, on a private note, the caption is set to "You - Personal Note".

**Text** \- This is the main content of the note.

## Putting Notes on an Entity

Regardless of whether you are interacting with notes in your own code, if you find the need to have notes on a new entity consider using the Note block with the following setup:

1. Add a new Note Type
2. Add the Notes block to your entity details page and configure its Context with the entity type of your choosing.
3. Edit the page Advanced Settings and set the Context Parameters so that Rock puts the correct entity into the page context for the Note block to operate against.

## Workflow & WorkflowType

A Workflow is an instance of a WorkflowType. Abstractly speaking, a WorkflowType defines a set of Activities and Actions to perform each time a new workflow instance is created. Typically you won't be trying to work too directly with Workflows and WorkflowTypes in your code, but you may want to start a workflow from your code.

Here's an example of programatically launching a new Workflow using a known workflowType (as found in the PersonUpdate.Kiosk block):

```
if ( workflowType != null && ( workflowType.IsActive ?? true ) )
{
    var workflowService = new WorkflowService( rockContext );
    var workflow = Rock.Model.Workflow.Activate( workflowType, "Kiosk Update Info" );

    // set attributes
    workflow.SetAttributeValue( "PersonId", hfPersonId.Value );
    workflow.SetAttributeValue( "FirstName", tbFirstName.Text );
    workflow.SetAttributeValue( "LastName", tbLastName.Text );
    workflow.SetAttributeValue( "StreetAddress", acAddress.Street1 );
    workflow.SetAttributeValue( "City", acAddress.City );
    
    // ...

    // lauch workflow
    List<string> workflowErrors;
    workflowService.Process( workflow, out workflowErrors );
}
```
