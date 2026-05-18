---
description: "Use when configuring real-time messaging topics, channels, and visual themes for Rock entity updates like attendance and achievements"
source: "https://community.rockrms.com/developer/realtime-visualizer"
sourceLabel: Realtime Visualizer
---
> **Path:** RealTime Visualizer

# RealTime Visualizer

## Topics and Channels

Messages in Rock are sent to specific topic and channel pairs. For example, a message with topic “A” and channel “1” will only be received by clients listening to channel “1” on topic “A”. A client listening to channel "1" on topic "B" will not see that message.

The RealTime Visualizer block can listen to any topic and channel, but this documentation focuses on the attendance and achievement configuration. The block configuration panel displays a list of available topics, but it cannot show the available channels since they are dynamically created when needed. To know what channels are available, you need to either have knowledge of the code or rely on documentation like this.

For now, the only topic we will look at is the `Rock.RealTime.Topics.EntityUpdatedTopic`, which is used for both attendance and achievement information. The related channels you may be interested in are:

1. `AchievementAttempt:Completed:{guid}`
2. `Attendance:Group:{guid}`
3. `Attendance:Location:{guid}`
4. `Attendance:Deleted`

The first three channels are named dynamically based on a unique identifier value. The first channel uses the AchievementType.Guid value, the second uses a Group.Guid value, and the third uses a Location.Guid value. The last channel name is constant because the group or location is unknown when an attendance record is deleted.

For example, the channel for attendance records where a person attends a specific group might look like `Attendance:Group:ba2d0c54-5853-42c1-949b-7fa9331a7a60`. Currently, the only way to see the Guid values is through SQL. However, as the existing blocks get replaced with the new Obsidian blocks, you will gain the ability to see these identifiers in the UI as well.

Don’t worry, this block allows you to subscribe to as many topics and channels as you need. So, if you need to display attendance data from 13 different locations, you can include all 13 channel names in the list.

## Theme

The theme controls how the content gets visually displayed on the screen. At RX 2023, we used a slightly customized version of the Toast theme. In addition to the themes provided out of the box, you can create your own from scratch or use an existing theme as a starting point. You can find these themes and create your own in the Defined Types list, under “RealTime Visualizer Themes”.

For simple testing, you can use the Group Attendance Detail block by getting the Guid of a Group that takes attendance. The settings we have covered so far would look something like this:

![](https://community.rockrms.com/Content/Developer/RealTimeSettings.png)

The built-in themes have many settings that allow you to configure their behavior. Often, you can achieve the results you want by changing the theme settings described in “Theme Documentation” and applying a little custom CSS.

## Template

Templates are the final piece of the configuration. They determine what is displayed, while the theme decides how it’s displayed (e.g., sliding in, appearing, duration of display, etc.). Put simply, the template generates the HTML content that is displayed by the theme.

There are two templates available by default:

1. Attendance messages
2. Achievement messages

Just like themes, templates can be customized as needed.

Templates are based on Lava and receive three variables: `Topic`, `Message`, and `Args`.

- `Topic`: The name of the topic the message was received on. This allows a single block instance to listen to multiple topics and display different information depending on the topic of the message.
- `Message`: Essentially, this is the name of the C# method that delivers the message to the clients. For example, with the Rock.RealTime.Topics.EntityUpdatedTopic topic, you would be interested in these messages:
	1. `achievementCompleted`
		2. `attendanceUpdated`
		3. `attendanceDeleted`
- `Args`: This is an array of parameters passed to the C# method. Sometimes it’s an array of values, other times it’s a single argument representing the actual message data. The reason for this comes down to the amount of data that needs to be sent. The attendanceDeleted message only sends the Guid of the attendance record that was deleted so it is just one of the arguments. The achievementCompleted and attendanceUpdated messages send down a lot of information about the entities so they pack all those arguments up into a single bag object.

To find out what message names are used and what arguments they receive, you’ll need to look at the source code. In the future, there may be built-in documentation for RealTime like there is for the API.

Tip: If you are looking at the source code to determine the available messages and what the arguments are, you will be looking for the C# interface file. So if you are looking for the EntityUpdatedTopic then the messages will be in the IEntityUpdated.cs file under Rock/RealTime/Topics. Because you can use Lava to format the data, there is an alternative method to finding this information - though it is less precise. You can make your lava template something like the following to just spit out all the details:

```
Topic: {{ Topic }}
Message: {{ Message }}
Args: {{ Args | ToJSON }}
```

While we try to include the most commonly required display information (like "PersonFullName" for attendance data), there may be times when you need more data than we provide. In such cases, you can use Lava entity commands to load the original entity and access the data you need.

