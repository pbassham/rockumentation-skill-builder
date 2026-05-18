---
description: "Use when learning how Rock's RealTime engine enables server-client communication, including topics, channels, and the custom abstraction layer"
source: "https://community.rockrms.com/developer/303\u002D\u002D\u002Dblast-off"
sourceLabel: 303 — Blast Off
---
> **Path:** 

Rock uses a custom RealTime engine to allow the server to communicate with client devices in real-time. You might ask why use something custom instead of just standard SignalR. The reason for this decision is two-fold.

1. The RealTime engine is abstracted so that neither the server code nor the client code need to care about how the connection is established. Specifically, no code changes should be needed when upgrading SignalR versions to support ASP.Net Core, or when using Azure SignalR in a web-farm environment.
2. A plain SignalR connection isn't really meant to be used by multiple services at the same time. Meaning, it is expected that a single code author is using the connection. In Rock, multiple blocks on the same page - including 3rd party blocks - might be communicating over the connection at the same time.

Rock RealTime system is broken down into the following components: Engine, Topic, Channel, and Connection. Let's take a look at each of these in more detail.

## Engine

A single engine instance exists in Rock. However, the implementation of the engine will change across different Rock versions. For example, ASP.Net core requires a different engine than ASP.Net 4.7.2. The engine is responsible for the low-level communication between Rock and a client device.

The engine also tracks various information about each connection. Such as which topics they have joined and any state information required by the individual topics.

## Topic

Basically, this is the *how* of communication. A topic defines the way we communicate between the server and a client device. What method names are supported by both, what parameters they take, etc. Beyond that, topics also provide a way to compartmentalize the communication to avoid collisions. Let's look at an example of that.

For example, two blocks on a single page might use `updateAttendance` as the name of the message sent to clients to update some value related to attendance. But one might be passing a simple "percent attended" value while another passes an object that contains complex information about which person is now attended or not. This would cause the two blocks to error out because they will not understand how to handle the data they are receiving.

Each topic in Rock is unique and defines a concrete language used to communicate between client and server. So in the example with `updateAttendance`, two topics can define that message name but they won't see each other's messages because the actual communication is limited to each topic. So messages from topic `A` won't be seen by topic `B` and vice-versa.

In our case, we are going to work with a block that handles group attendance. So we create a topic called `GroupAttendanceTopic`. In that topic we will define our `updateAttendance` method along with the parameters it takes.

## Channel

Where Topics allow us to define *how* we are going to communicate, a Channel defines *who* we are going to communicate with. When we send our `updateAttendance` message (or any message for that matter) we don't want to send it to every single device that is currently connected. Let's look at an example of how this works.

Ted is supposed to take attendance for a large event with over 100 people attending. That is a lot of work so he asks Pete to help him out. And just to make things interesting, Ted is going to use his churches mobile app while Pete will use the churches website. We want both Ted and Pete to see an up to date list of who is marked as attended. So when Pete marks somebody as attended on the website, Ted will instantly see that change reflected on his mobile app.

Our mobile block and web block will each add their respective connections to the same channel, say `Group:6832f3cd-40ee-4f44-95ee-e3932f61253d`. Then, when Ted marks somebody as attended the server will send the message `updateAttendance` to everybody in the `Group:6832f3cd-40ee-4f44-95ee-e3932f61253d` channel on the `GroupAttendanceTopic` topic. So even if Cindy is is taking attendance for her small group at the same time, she won't see the messages Ted and Pete are sending.

When working in a Web Farm with multiple Rock servers, a channel is shared across all servers. Meaning if Ted is on server A and Pete is on server B, everything still works just like we described above.

## Connection

We talked about connections in the previous section, and you probably have a pretty good idea what this means. But because there might be some guess work involved in the specifics, we are going to clarify.

A mobile app using the Mobile Shell will have a single shared connection between all open pages. So even if Ted has 5 pages open in the mobile app, only a single connection will be open.

However, things are different on web. Web pages can't communicate between each other (they can, but lets not go there as it is complicated). So if Pete is sitting at his laptop and has 5 tabs open in his browser, each one on a different Rock page, he is using 5 connections.

So a connection is not a device and is also not a person. A connection is a *single point of communication between a device and the server*. As a developer, you can send a message to either a channel (that is all connections that have been placed in that channel) or to a single connection.

## Creating a Topic

In our attendance example above, we want to send to a channel because it makes sense. Multiple devices need to receive the information. However, in the case of a bulk update operation we only need to notify the specific device that clicked the "Update" button. So we can send any progress messages to the specific connection.

All core topics should be in the `Rock.RealTime.Topics` namespace. Plugin developers can use any namespace inside their plugin they wish, but a recommendation would be `com.rocksolidchurchdemo.Topics`. By convention, all topic class names should end with the `Topic` suffix.

In order to create and register a Topic in Rock, you must do a couple things.

1. Define an interface that describes the methods that can be invoked on clients by the server.
2. Inherit from the `Rock.RealTime.Topic<T>` base class (where T is the interface you defined above).
3. Decorate the class with the `[Rock.RealTime.RealTimeTopic]` attribute.
4. Define any methods you want clients to be able to call.
5. Use the topic in JavaScript/TypeScript.

### Server Implementation

Defining the interface is fairly simple. By convention the interface should start with an `I` like normal and then match your topic name without the `Topic` suffix. Let's look at an example.

```
// Rock/RealTime/Topics/IGroupAttendance.cs

public interface IGroupAttendance
{
    Task UpdateAttendance( Guid groupGuid, Guid personGuid, bool didAttend );
}
```

Our interface declares a single method and defines the properties that will be passed along with it when sending the message to clients. All methods must return a Task. The Task will indicate when the message has been placed in the queue to be sent to all of the specified clients. It does *not* indicate that the message has been received and acted upon by the client(s).

```
// Rock/RealTime/Topics/GroupAttendanceTopic.cs

[RealTimeTopic]
public class GroupAttendanceTopic : Topic<IGroupAttendance>
{
    public async Task MarkAttendance( Guid groupGuid, Guid personGuid, bool didAttend )
    {
        using ( var rockContext = new RockContext() )
        {
            // 1
            var group = new GroupService( rockContext ).Get( groupGuid );

            var currentPerson = Context.CurrentPersonId.HasValue
                ? new PersonService( rockContext ).Get( Context.CurrentPersonId.Value )
                : null;
            
            if ( !group.IsAuthorized( Authorization.VIEW, currentPerson ) )
            {
                throw new RealTimeException( "Not authorized for this group." );
            }
            
            // 2
            group.MarkPersonAttendance( personGuid, didAttend );
            
            rockContext.SaveChanges();
            
            // 3
            await Clients.Channel( GetChannelForGroup( groupGuid ) )
                .UpdateAttendance( groupGuid, personGuid, didAttend );
        }
    }
    
    public static string GetChannelForGroup( Guid groupGuid )
    {
        return $"Group:{groupGuid}";
    }
}
```

This is a very simplified version, without the error checking we should really have, but it is enough to discuss how this works. We have two methods defined above. One is an instance method that will be called by clients. The other is a static method that will be called by server-side code.

Our `MarkAttendance` method is broken up into 3 sections. The first section loads the group and the current person and then checks authorization. Anybody can access this topic because there is no specific security requirement to taking attendance in general. So we verify that the individual has not done anything tricky and started sending falsified data to us.

Note the use of the `RealTimeException`. This is the only exception type that will actually be sent back to the client. All other exception types will be masked and a generic error will be returned. This is to prevent accidental leakage of information in exception messages. So if you want the error message to make it back to the client so you can display it to the user, use the `RealTimeException` class.

The second section is for updating the database. We call a service layer method that knows how to create an attendance record or update an existing one and then save those changes to the database.

Once the database has been updated, we send a message to all connections associated with the channel that handles attendance for this group. As you can see, we are calling the `UpdateAttendance()` method that we defined in our interface. The `Clients` property has various methods that can be called to select which clients. Each of these methods returns a proxy of your interface. This allows your code to be readable and less error prone.

Note

In reality, the logic in the third section should be placed inside the Group.MarkPersonAttendance() method. The reason for this is to make it so that any place in Rock that marks a person as attended will now notify the RealTime engine automatically.  This means that any block or process in the system that marks a person as attended would automatically gain use of the RealTime engine (assuming they are using this common method).So for example, when a person checks in at a kiosk for the event Ted and Pete are taking attendance for, their devices would automatically update to show that they are now in attendance.

What about that static `GetChannelForGroup()` method. That is a pattern that you should follow. Never hard code your channel name somewhere. Just like with block attribute keys, if you try to just type it in every single time, eventually you are going to accidentally type in `$"Grup:{groupGuid}"` and then waste time trying to figure out why the real-time notification isn't working.

In our tip above, we mentioned that the `Group.MarkPersonAttendance()` method should send the RealTime notifications. Here is an example of how that would work outside of your Topic class.

```
// Rock/Model/Group/Group/GroupService.cs

public static void MarkPersonAttendance( Guid groupGuid, Guid personGuid, bool didAttend )
{
    // NOTE: This is an over-simplified example. Attendance data is actually
    // more complex and would need more parameters passed in.
    
    using ( var rockContext = new RockContext() )
    {
        // Do something to write to the database.
    }
    
    // Send notification.
    _ = Rock.RealTime.RealTimeHelper.GetTopicContext<IGroupAttendance>()
        .Clients
        .Channel( GroupAttendanceTopic.GetChannelForGroup( groupGuid ) )
        .UpdateAttendance( groupGuid, personGuid, didAttend ); 
}
```

Notice that we modified the method to be static and to also take the GroupGuid. The reason for this is because our service-layer logic needs to be sure that the change has hit the database before sending the real-time message. Otherwise an error during save might happen even though we already notified clients.

This pattern doesn't always work. For example, if you are updating the attendance of 20 people all at once, it doesn't make sense to call this method 20 times and perform 20 individual writes to the database. In such cases, consider an additional method that allows multiple updates to happen at once (such as passing a dictionary whose key is a Person Guid and value is the didAttend boolean).

Another option is to add another static method to `GroupAttendanceTopic` class that takes the GroupGuid, PersonGuid and DidAttend parameters. This method could then handle getting the topic context and sending the notification.

Note

In short, think through how you are going to use the RealTime engine. Who do you want to receive the notifications and also what parts of Rock do you want to send the notifications. Think through future use cases that might come up.  

There is one more thing we need to do before moving to the client implementation. Currently, we can send messages to any clients that are in the channel - but we never add them to the channel. We are going to add two methods to our topic to handle that.

```
// Rock/RealTime/Topics/GroupAttendanceTopic.cs

public async Task StartMonitoringGroup( Guid groupGuid )
{
    using ( var rockContext = new RockContext() )
    {
        // TODO: Check permissions to group.
        
        var channelName = GetChannelForGroup( groupGuid );
        await Channels.AddToChannelAsync( Context.ConnectionId, channelName );
    }
}

public async Task StopMonitoringGroup( Guid groupGuid )
{
    var channelName = GetChannelForGroup( groupGuid );
    await Channels.RemoveFromChannelAsync( Context.ConnectionId, channelName );
}
```

Before adding the connection to the channel, we first ensure the person has access to the group. However, you will note we don't bother with the check when removing the connection from the group. In this case, they shouldn't be in the channel anyway and even if the are, what is the harm of removing them? So we don't waste the CPU/DTU cycles to perform the security check on removal.

Warning

There is a bit more work that needs to be done in these two "add to channel" and "remove from channel" methods, but we will cover that later in the section on concurrency.

### Client Implementation

We've seen how to create the topic and send messages from the server. But now we need to look at what to do on the client to connect to that topic and listen for messages.

Note

We'll be using examples as if you were using TypeScript and Obsidian, but the same can be done with plain JavaScript. You just don't get all the type-checking.

We're going to take this in small bite-size chunks. So first let's look at how to just connect to a topic.

```
// groupAttendanceDetail.obs

import { getTopic, ITopic } from "@Obsidian/Utility/realTime";

interface IGroupAttendanceTopic {
    markAttendance(groupGuid: Guid, personGuid: Guid, didAttend: boolean);
}

const topicName = "Rock.RealTime.Topics.GroupAttendanceTopic";
const realTimeTopic = await getTopic<IGroupAttendanceTopic>(topicName);
```

So we imported the RealTime engine from our Obsidian file. This `getTopic()` function also handles connecting to the server if the connection is not already established.

Next we declare the interface that corresponds to the server `GroupAttendanceTopic` class. If you recall, the interface we made earlier described the client methods. This interface is describing the server methods instead.

Finally, we declare the variable to hold our topic and then try to get the topic from the server. If the connection fails, or the topic can't be joined then `getTopic()` will throw an error. Notice the topic name is the full name of the C# class. This can be overridden with the `RealTimeTopic` attribute, but you shouldn't do so unless you have a special case.

We now have our topic that we can use to communicate with the server. But before we look at how to communicate with the server we are going to cover the common connect pattern. This is something you will want to follow so that you can handle disconnects and reconnects gracefully.

Note

The RealTime engine will do it's own reconnect attempts, but there are many cases where it won't be able to do that. When that happens, a disconnect event will be raised.

```
// groupAttendanceDetail.obs

let realTimeTopic: ITopic<IGroupAttendanceTopic> = null;

async function startRealTime(isReconnecting: boolean): Promise<void> {
    const topicName = "Rock.RealTime.Topics.GroupAttendanceTopic";
    const topic = await getTopic<IGroupAttendanceTopic>(topicName);

    topic.onDisconnected(async () => {
        await startRealTime(true);
    });

    setupTopicListeners(topic);

    await topic.server.startMonitoringGroup(config.groupGuid);
    
    // Extra logic that needs to happen on every connection goes here.

    realTimeTopic = topic;

    if (!isReconnecting) {
        // One time logic goes here.
    }
}

startRealTime(false);
```

We have omitted some of the code, but we still declare a variable to hold the RealTime Topic being connected to. We also declare a function that will be used to start the RealTime connection and then call it to initially start the connection.

Tip

You don't need to worry about throttling the reconnect attempts. The RealTime engine will handle that for you automatically.

After the connection is established we add code to handle disconnection. That code just requests that the RealTime engine be started up again. Next we call a function to add our topic listeners - which you will see in a bit. If you only have 1 listener then you can just put it inside the your `startRealTime` function. But it wouldn't be strange to have 3 or 4 listeners get registered, in which case it's better to put them in a self-contained function.

Once the listeners are set up, we ask the server to monitor the group for attendance data - that is, we request to be added to the proper message channel.

Then we set our `realTimeTopic` variable and if this is our first connection we execute any code required to finish setting things up.

Note

You will probably want some more logic, and/or possibly make your realTimeTopic a ref so that you can watch for changes. That coupled with the logic you will add to detect reconnecting states will let you update the UI whenever the RealTime engine is not available. This way the user understands what is happening (or not happening).  

Now that we are properly reconnecting, we will take a look at how to communicate with the server over the topic.

```
// groupAttendanceDetail.obs

function setupTopicListeners(topic: ITopic<IGroupAttendanceTopic>): void {
    topic.on("updateAttendance", onUpdateAttendance);
}

function onUpdateAttendance(groupGuid: Guid, personGuid: Guid, didAttend: boolean): void {
    if (config.groupGuid !== groupGuid) {
        return;
    }
    
    updateOrAddPersonRow(personGuid, didAttend);
}
```

Okay, so we added a handler for the `updateAttendance` method that will be called by the server to notify clients of new attendance data.

The first thing we do is check if it is for the group is the one we are monitoring. You might wonder why we need to bother doing that since we specifically joined the channel for our group. Well, the short answer is "because it's safer". The longer answer is that there might be two blocks on this page each monitoring attendance in a different group. So we need to ensure the message is for the group we are displaying data for.

You will also notice we are not going to show you how to implement the `updateOrAddPersonRow` function. That is up to you. But pay close attention to the name of the function. You will need to check if a row for the person already exists and if so simply update the attendance value. If it doesn't exist, you will need to add it (and also retrieve enough information about the person to display the row).

Finally, sending commands to the server. We glossed over it earlier, but in the `startRealTime` function we actually do this.

```
await topic.server.startMonitoringGroup(config.groupGuid);
```

The `server` property of the topic will automatically translate any function calls into messages sent to the server. Those functions will return a Promise that completes when the server method returns. If the server method returns a value then it will be passed all the way down to the client.

### Alternate Channel Selection

At times, if no special logic or security is necessary, you can use a block action to have a connection added to a channel. You'll need to pass the connection ID to the block action from the client because block actions don't have it in their context.

```
// communicationEntryWizard.obs

async function startRealTime(): Promise<void> {
    const topic = await getTopic("Rock.RealTime.Topics.TaskActivityProgressTopic");

    topic.onDisconnected(async () => {
        await startRealTime();
    });

    topic.on("updateTaskProgress", onSendProgressUpdated);
    topic.on("taskStarted", onSendStarted);
    topic.on("taskCompleted", onSendCompleted);

    await invokeBlockAction.subscribeToRealTime({
        connectionId: topic.connectionId,
        communicationGuid: communicationGuid.value
    });
}
```

And here's how the connection is handled in the block action.

```
[BlockAction( "SubscribeToRealTime" )]
public async Task<BlockActionResult> SubscribeToRealTime( string connectionId, Guid communicationGuid )
{
    // Validate connectionId and communicationGuid

    var topicChannels = RealTimeHelper.GetTopicContext<ITaskActivityProgress>().Channels;

    await topicChannels.AddToChannelAsync( connectionId, GetCommunicationSendChannel( communicationGuid ) );

    return ActionOk();
}
```

You can also take this to another level: instead of calling a block action that is designated entirely for connecting to the right channel, if you have a block action that does a lot of work that needs to communicate the progress of in real time, then you can establish that channel within that block action and do the work for that block action in one shot. For example, in the Bulk Import Tool, when firing off the import task, we create a channel specific to that import file to make sure that only the block initiating the import gets the updates.

```
// BulkImportTool.cs

[BlockAction]
public BlockActionResult StartImport( BulkImportRequest request )
{
    // Validate request
    var physicalSlingshotFile = request.SlingshotFilePath;    

    var importTask = new Task( async () =>
    {
        // Set up task

        var taskChannelName = $"BulkImport:{physicalSlingshotFile}";
        var topic = RealTimeHelper.GetTopicContext<ITaskActivityProgress>();

        await topic.Channels.AddToChannelAsync( request.SessionId, taskChannelName );

        var progressReporter = topic.Clients.Channel( taskChannelName );

        // Start task and report progress via progressReporter
    } );

    importTask.Start();
    return ActionOk();
}
```

## Concurrency

There are no specific concurrency issues when accessing the RealTime engine. Meaning, you don't need to worry about locking before sending a message to clients.

However, you do need to worry about concurrency when handling messages on two fronts.

1. Multiple clients might be calling the same method on your topic at the same time, so that method can be called concurrently. In other words, don't read a value, add 1 to it and then write it again without a lock of some kind.
2. In addition, a single connection might call your method more than once. For example, two blocks on the page might both request to monitor attendance for the same group. If blocks A and B both join the channel and then block A requests to leave the channel, it would leave the channel for block B as well.

Note

In regards to the second point, you might ask why bother leaving the channel. The connection gets reset when they browser to a new page. However, many of these RealTime topics will be used by mobile applications (or even desktop applications in the future). These applications will not be creating new connections but simply re-use the same connection during the entire life of the application. So proper join/leave tracking is required.

So how do we do this? Through two mechanisms. First, connections support "state" information that is custom to your topic. Second, we have some helper classes to handle concurrency counting.

### Connection State

Let's take a look at how to create and access connection state. First, you need to create a POCO class to hold your state data. Because the full C# class name is used as the unique key to find your state, you can not use simple primitives as the state unless they are inside a custom POCO.

```
// Rock/RealTime/Topics/GroupAttendanceTopic.cs

internal class GroupAttendanceState
{
    public ConcurrentUsageCounter<Guid> JoinCount { get; } = new();
}
```

This POCO has a single property, `JoinCount`, which will be used to track the number of times the connection has requested to join a channel. But we will look at that in more detail in the next section. Each connection will end up with an instance of this class attached to them.

Note

Remember, any properties you define on your state object must be thread-safe. So don't expect to use a simple Dictionary or List and have it work without blowing up randomly.

To access the state information, use the following code pattern.

```
// Rock/RealTime/Topics/GroupAttendanceTopic.cs

public async Task StartMonitoringGroup( Guid groupGuid )
{
    var state = this.GetConnectionState<GroupAttendanceState>( Context.ConnectionId );

    using ( var rockContext = new RockContext() )
    {
        // TODO: Check permissions to group.
        
        var count = state.JoinCount.Increment( groupGuid );
        
        if ( count == 1 )
        {
            var channelName = GetChannelForGroup( groupGuid );
            await Channels.AddToChannelAsync( Context.ConnectionId, channelName );
        }
    }
}
```

Once again, we will go over the details of that `JoinCount` property and `ConcurrentUsageCounter` class in the next section. But for the "add to channel" pattern, follow the above example. What we are doing is incrementing the "join count" for the specific group unique identifier. Then we check the new value after it is returned. If that value is 1, then this is the first request the connection has made to join the channel.

Next let's take a look at the "remove from channel" pattern.

```
// Rock/RealTime/Topics/GroupAttendanceTopic.cs

public async Task StopMonitoringGroup( Guid groupGuid )
{
    var state = this.GetConnectionState<GroupAttendanceState>( Context.ConnectionId );

    var joinCount = state.JoinCount.Decrement( groupGuid );
    
    if ( joinCount == 0 )
    {
        var channelName = GetChannelForGroup( groupGuid );
        await Channels.RemoveFromChannelAsync( Context.ConnectionId, channelName );
    }
}
```

Here we are simply doing the reverse. We decrement the counter and then if it is 0 we remove the connection from the channel.

Now, we can support multiple blocks all working with the same group on the same topic without running into issues.

### Concurrency Counting

As mentioned above, there is a class you can use to deal with these counting problems. It is called `ConcurrencyUsageCounter`. It is a generic class whose type specifies the type of key to use when tracking counters. In the example above we are using a Guid, but anything that can be used as a key in a regular Dictionary can be used here.

This class handles all the locking required to increment and decrement the values associated with the keys. There are only two public methods: `Increment` and `Decrement`. Both take the key to be incremented or decremented and both return the new value after the operation.

Additionally, the `Decrement` method ensures that the value never falls below 0. So you never have to worry about getting a negative number back.

Note

As you might have surmised, nothing prevents a single block from requesting to leave a channel multiple times. So write your client-side code smart to prevent such occurrences.

## Tips and Hints

Warning

The RealTime engine has a hard limit of 32KB per message. However, when using Azure SignalR as the back-end, messages over 2KB are split into multiple and then automatically reassembled. Each of these split messages counts towards the quota. So if you send a 16KB message it counts as 8 messages.  
  
Therefore it is highly recommended that you keep your payloads under 2KB. Also remember these messages need to be sent extremely fast, so smaller is better.

Note

Don't pass large, complex objects with RealTime messages. This is related to the reason above. For example, don't pass a Person object in a RealTime method. Instead pass the Person Guid and have the client code request additional details.  
  
Not only does this keep your payload size small, it also helps to ensure that standard security is enforced. If part of the person details needed is the person attributes then sending those from the server as part of the message means you lose the ability to apply proper security. If you send the Person Guid and then the client requests the Person details, you can check security on those attributes and only return those they can view.  
  
If nearly all use-cases can be covered by including only a couple properties then you can consider sending them down. For example, in our attendance sample the only thing we need for display purposes is probably FullName and ImageUrl. If those are sent in addition to the Person Guid then security is still safe, the size is still small and we remove an API request later.  

## API Reference - TypeScript

### getTopic()

This is the main entry point to the RealTime system. If a connection cannot be established it will retry a number of times with a progressive backoff delay between attempts. After the maximum number of attempts has been reached an error will be thrown.

| Parameter | Type | Description |
| --- | --- | --- |
| identifier | String | The identifier of the topic to be accessed in Rock. |

**Returns** a promise to the `ITopic` object that will be used to interact with the topic in Rock.

### Topic (reference)

**connectionId**

This property contains the unique identifier of the connection. If you need to build a block action that subscribes the individual to a channel on the topic you would need to pass this along. Anytime a new connection is created this value will change.

**isReconnecting**

This property will be `true` if the topic is currently attempting to reconnect to the server. During these automatic reconnects the channels you have joined will persist. The `connectionId` will also not change.

**isDisconnected**

This property will be `true` if the topic has disconnected and can no longer be used. Attempting to call any methods on the server will throw an error.

**onReconnecting()**

Registers a function that will be called when the topic enters a reconnecting state. While reconnecting any attempts to send messages to the server will be delayed until the connection is re-established. A reconnect does not change the `connectionId`.

| Parameter | Type | Description |
| --- | --- | --- |
| callback | Function | The function to call when the topic has entered a reconnecting state. |

**onReconnected()**

Registers a function that will be called when the topic has reconnected to the server and communication has resumed.

| Parameter | Type | Description |
| --- | --- | --- |
| callback | Function | The function to call when the topic has finished reconnecting. |

**onDisconnected()**

Registers a function that will be called when the topic has become disconnected. Further communication with the server will not be possible on this existing topic object. All channels have been left and the `connectionId` is no longer valid.

If you still need to communicate with the server you may call `getTopic()` again to attempt to connect. If that succeeds you will need to re-join all your channels and register all your message handlers again.

| Parameter | Type | Description |
| --- | --- | --- |
| callback | Function | The function to call when the topic has become disconnected from the server. |

**on()**

Registers a handler for a specific message name. The message names correspond to the method names defined on the topic interface. The handler is called with separate arguments. So if your C# interface has 3 arguments, the handler will be called with 3 arguments.

| Parameter | Type | Description |
| --- | --- | --- |
| handler | Function | The function to call when the topic receives a message that matches the specified name. |
| messageName | String | The name of the message that will trigger the handler to be called. This is case-sensitive and should be a camelCase representation of the C# method name. |

**onMessage()**

Registers a handler to be called when any message is received on this topic. The handler function will be passed two arguments. The first is the message name. The second argument is an array of all the arguments passed to the C# method.

| Parameter | Type | Description |
| --- | --- | --- |
| callback | Function | The function to call when the topic receives any message. |
