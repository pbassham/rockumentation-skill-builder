---
description: "Use when users need to understand Rock's real-time capabilities, configure WebSocket updates, or learn how real-time attendance tracking and live data synchronization work"
source: "https://community.rockrms.com/documentation/bookcontent/9/368"
sourceLabel: Rock Admin Hero Guide
---
> **Path:** Rock Admin Hero Guide > Real-Time Engine

Real-Time Engine

Welcome to the future! In this chapter we’ll be discussing Rock’s real-time capabilities. With this feature, certain areas of the system will be updated in real-time, providing you with the ability to see changes made by other people, live as they're being made. Imagine being able to collaborate with team members in real-time and see updates to your database as they happen.

![Real-Time Engine](https://rockrms.blob.core.windows.net/documentation/Books/9/1.17.0/images/real-time-v15.png)

Real-Time Engine

# Real-Time in Rock

Not everything in Rock can be updated in real-time. That’s very difficult to do, especially in an environment like Rock that we want to be extensible. However, there are a few strategic areas that you’ll see updated in real-time.

## Group Attendance Detail

With real-time updates, the Group Attendance Detail block can be kept up-to-date more accurately. This means that those taking attendance can have an accurate view of who is present in real-time, which can help with things like taking roll and monitoring attendance trends. Changes to attendance data are reflected almost instantly, without the need to constantly refresh the page.

![Group Attendance Detail](https://rockrms.blob.core.windows.net/documentation/Books/9/1.18.0/images/group-attendance-detail-v18.png)

Group Attendance Detail

# Under the Hood of the Real-Time Engine

To understand how the real-time engine works, you’ll need to know a little bit about what happens when you visit a webpage.

Let's say you're in a restaurant and you want to order some food. Normally, you would call the waiter over and place your order. The waiter would then go to the kitchen, get your food, and bring it back to you.

This is like a regular HTTP request. You (the browser) send a request to the server (the waiter) asking for some information or data (your order). The server (waiter) then goes and retrieves the data from a database or other source (the kitchen) and sends it back to you (the food) as a response. Bon Appétit.

But what if you wanted to ask the waiter a question about the menu, or make a special request for your food? With regular HTTP requests, you need to wait until the waiter comes back with your food. But with WebSockets, it's like having a direct line to the waiter. You can ask questions or make requests in real-time, without having to wait for the server to respond to your original request.

So, using the restaurant analogy, WebSockets are like having a direct line to the waiter that you can use to make requests or ask questions in real-time, while regular HTTP requests are like placing an order and waiting for the waiter to bring your food back to you. WebSockets allow for faster and more efficient communication between the browser and the server, making real-time updates and interactions possible.

# Configuring Real-Time

There are different ways to do WebSockets, and one of them is SignalR. In order for SignalR to work properly, you may need to update your web server configuration to enable WebSocket Protocol.

![Enable WebSocket Protocol](https://rockrms.blob.core.windows.net/documentation/Books/9/1.17.0/images/enable-web-socket-protocol-v15.png)

Enable WebSocket Protocol

If you’re in a web farm environment, you can’t just get a WebSocket to any one node. That wouldn’t work because that one node might not know about all the things that are going on elsewhere. So, in that case, you need to get Azure SignalR, which is a service of Microsoft. Even for a very large setup it should be less than $50/month.

# Azure SignalR Service Mode

As you're going through the setup process, you'll be prompted to select a *Service Mode*. Select "Default" when you're given this option.

Once you’re signed up with Azure, you’ll come to Rock under Admin Tools \> Settings \> System Configuration and add your Endpoint and AccessKey.

![System Configuration](https://rockrms.blob.core.windows.net/documentation/Books/9/1.18.0/images/system-configuration-azure-signalr-v18.png)

System Configuration

