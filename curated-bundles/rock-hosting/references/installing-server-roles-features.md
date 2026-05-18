---
description: "Use when setting up IIS server roles and features for Rock hosting, including Web Server, ASP.NET, and HTTP Redirection configuration"
source: "https://community.rockrms.com/documentation/bookcontent/1/358"
sourceLabel: Rock Solid Internal Hosting
---
> **Path:** Rock Solid Internal Hosting > Installing Server Roles & Features

Installing Server Roles & Features

In this chapter, we'll install the required server roles and features needed for Rock.

Let’s open up Start \> Server Manager. Once opened, the first thing we need to do is to install the Web Server role. That can be done by clicking on Manage and then Add Roles and Features.

![](https://rockrms.blob.core.windows.net/documentation/Books/1/1.17.0/images/server-1.png)

Server Manager Dashboard

Click Next.

![](https://rockrms.blob.core.windows.net/documentation/Books/1/1.17.0/images/server-2.png)

Add Roles and Features Wizard

On the next screen, select Role-based or feature-based installation.

![](https://rockrms.blob.core.windows.net/documentation/Books/1/1.17.0/images/server-3.png)

Select Installation Type

Choose Select a server from the server pool and then highlight your server from the list below. Click Next.

![](https://rockrms.blob.core.windows.net/documentation/Books/1/1.17.0/images/server-4.png)

Select Destination Server

On the next screen, check the box for Web Server (IIS).

![](https://rockrms.blob.core.windows.net/documentation/Books/1/1.17.0/images/server-5.png)

Select Server Roles

# HTTP Redirection

By default HTTP Redirection is not installed/activated. If it is installed, you'll typically want to redirect to nothing (*Redirect requests to this destination* will not be checked).

You will be prompted to add some required features for IIS. Click on Add Features. Then click Next.

![](https://rockrms.blob.core.windows.net/documentation/Books/1/1.17.0/images/server-6.png)

Required Features Prompt

On the *Select Features* screen, add .NET Framework 3.5 Features and click Next.

![](https://rockrms.blob.core.windows.net/documentation/Books/1/1.17.0/images/server-7.png)

Select Features

You will be presented with some information about the IIS feature. Click Next.

![](https://rockrms.blob.core.windows.net/documentation/Books/1/1.17.0/images/server-8.png)

Web Server Role (IIS)

On the *Select Role Services* screen, scroll down to *Application Development* and check the boxes for *ASP.NET 4.7* and *Websocket Protocol*.

![](https://rockrms.blob.core.windows.net/documentation/Books/1/1.17.0/images/server-9-v14.png)

Select Role Services

# Version information

Server 2012 has ASP.NET 4.5, and Server 2016 has ASP.NET 4.6, instead of ASP.NET 4.7. Don't worry about that difference; just check the box next to the correct version and it'll work the same.

You will be prompted to add some required features for ASP.NET. Click on Add Features.

![](https://rockrms.blob.core.windows.net/documentation/Books/1/1.17.0/images/server-10.png)

Required Features Prompt

Next, check the box labeled *Application Initialization*. Then click Next.

![](https://rockrms.blob.core.windows.net/documentation/Books/1/1.17.0/images/server-10a.png)

Install ASP.NET and Application Initialization

On the final screen, select Restart the destination server automatically if required and click Install.

# Warning:

If this is a production server, you might not want to have the server automatically reboot.

![](https://rockrms.blob.core.windows.net/documentation/Books/1/1.17.0/images/server-11.png)

Confirming Installation Settings

# Alternate Sources

If the installation gives you an error about sources not being available (as in the screenshot above), you can click Specify an alternate source path before beginning installation. Make sure that your installation disc (or image) is available, then type in the path to it's the "sources\\sxs" directory. For instance, if the Windows Server installation DVD is inserted in your D:\\ drive on the server, type d:\\sources\\sxs in the alternate source path dialogue and click OK.

Installation will begin.

![](https://rockrms.blob.core.windows.net/documentation/Books/1/1.17.0/images/server-12.png)

Installation Progress

## Performance: Disable Unnecessary Windows OS Services

Built-in Windows services, such as the *Print Spooler* can consume CPU resources and increase exposure to future security vulnerabilities. To optimize performance, stop these unnecessary services and set their startup type to *Disabled*.

![Disable the Print Spooler service if you don't use it](https://rockrms.blob.core.windows.net/documentation/Books/1/1.14.0/images/os-services-print-spooler.png)

Print Spooler Service Properties

Congratulations! The web server is now installed. Let's move on to configuring Internet Information Services.

