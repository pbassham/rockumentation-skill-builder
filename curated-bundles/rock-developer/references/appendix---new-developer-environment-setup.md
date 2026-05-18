---
description: Use when a new .NET developer needs to set up their local development environment including SQL Server and database configuration
source: "https://community.rockrms.com/developer/quickstart-tutorials"
sourceLabel: Quickstart Tutorials
---
> **Path:** 

If you're a relatively new .Net web developer we can walk you through a few things to help get you started on the right foot. If you're not a .Net developer already, we probably can't make you one by reading this chapter. In that case you would be best served by going through [some .Net introductions](https://www.asp.net/web-forms/overview/getting-started/getting-started-with-aspnet-45-web-forms/introduction-and-overview) or [tutorials](https://www.lynda.com/NET-tutorials/C-NET-Programming/440660-2.html).

## Installing Your Microsoft SQL Server (Database) Environment

We like to setup the database first. If you're licensed to use one of the paid versions of SQL Server go ahead and download that now. Otherwise you can [download](https://www.microsoft.com/en-us/sql-server/sql-server-downloads) and use the free [SQL Server Express](https://www.microsoft.com/en-us/sql-server/sql-server-downloads) version.

Going through the installer can be an *interesting* experience. For the most part we've found you can typically use the default settings -- except for a few places. In those spots you really need to be careful and set things just right:

- **Instance Configuration** - On the Instance Configuration page, choose Default Instance with Instance ID: MSSQLSERVER (you can create a named instance if you want, but you might have to figure out your connection strings on your own).

![](https://community.rockrms.com/GetImage.ashx?Id=67485)

- **Feature Selection -** On the Feature Selection page, you'll need at a minimum: Database Engine Services, Management Tools, and SQL Client Connectivity SDK.

![](https://community.rockrms.com/GetImage.ashx?Id=67486)

- **Database Engine Configuration** -   On the Database Engine Configuration page, make sure to choose Mixed Mode. This is important! If you get weird errors later when trying build the Rock Database for the first time, an incorrect setting here might be the problem. Also, enter some password for the SA account. Then, click Add Current User, and make sure it adds your account. By the way, you probably won't ever really need to login as SA if you do the Add Current User. Then press Next, and click thru the rest of the OK and Next buttons until the install is complete.

![](https://community.rockrms.com/GetImage.ashx?Id=67487)

You will need to create a SQL Server Login called "RockUser". (You can actually use any name you wish but we recommend RockUser to keep things simple for now.) You will need to use SQL Server Management Studio do to this (which would have been installed when you did the Install SQL Server step, or if you add the Management Tools feature to an existing SQL Server install.

1. After logging in, in the Object Explorer window, navigate to localhost | Security | Logins. Next, right-click on Logins and click "New Login...".New Login

![](https://community.rockrms.com/GetImage.ashx?Id=67488)

2. On the Login - New page, put RockUser as the Login name and choose SQL Server authentication. For the password you'll probably want to uncheck the "Enforce password" and "User must change password" checkboxes.

![](https://community.rockrms.com/GetImage.ashx?Id=67489)

3. While still on the Login - New page, select "Server Roles" then check "dbcreator" and "public". Now you can press OK, and your SQL Server RockUser login is created.Login Properties, Server Roles

![](https://community.rockrms.com/GetImage.ashx?Id=67490)

## Installing Visual Studio

If you're licensed to use one of the paid versions of Visual Studio go ahead and download it now. Otherwise you can [download the free "Visual Studio Community"](https://www.visualstudio.com/downloads/#d-express-web) version. If you run into any trouble Microsoft even has a [Live Chat support](http://landinghub.visualstudio.com/visual-studio-installer-support) to assist you.

### Visual Studio Workloads

Run the Visual Studio Installer and select "Modify" on your installation. Then install these workloads:

- "ASP.NET and web development"
- "Node.js development"
- (optional) ".NET desktop development"

Visual Studio Workloads

![](https://community.rockrms.com/GetImage.ashx?Id=67491)

### Troubleshooting

If Visual Studio crashes upon running, make sure the Visual Studio "Start" \> "Web Browser" has a browser selected.

**Visual Studio Debug Web Browser Setting**

![](https://community.rockrms.com/GetImage.ashx?Id=67492)

**Visual Studio Debug with missing Web Browser**

![](https://community.rockrms.com/GetImage.ashx?Id=67493)

### Running

Once you have Visual Studio up and running, you're all set to open up the Rock solution file. Once you open that you'll want to adjust your web.ConnectionStrings.config file as described in the Setup Appendix.

---

## Appendix - Setup {#appendix---setup}

These are the steps you'll follow the first time you use the Rock solution.

1 . Open the Rock.sln file. This should launch Visual Studio 2022.

2.  Edit the web.ConnectionStrings.config.sample and replace the `[server_name]`, `[database_name]`, `[user_name]`, and `[password]` with the values for your system. When you're done it might look something like this:

```
<add name="RockContext" 
    connectionString="Data Source=localhost;Initial Catalog=RockTestDB; 
    User Id=MyRockUser; password=yOursShouldBeBetter;MultipleActiveResultSets=true"
    providerName="System.Data.SqlClient"/>
```

3. Then rename the file to web.ConnectionStrings.config

4. Go to Tools \> NuGet Package Manager \> Manage NuGet Packages for Solution...

5\. If you see a Restore button you'll need to click it in order to fetch the required open-source libraries Rock needs to compile. *We don't ship them in the SDK in order to keep the file size small.* After clicking "Restore" you can close the window.  

![Manage NuGet Packages for Solution](https://community.rockrms.com/GetImage.ashx?Id=67496)

Press F5 to build and run (debug) Rock. After completing the compile/build process, it will start your web-browser (on something like http://localhost:57566/) and you'll see a white screen for several minutes while it creates the database.

When finished, you will see a Login screen:

![Login](https://community.rockrms.com/GetImage.ashx?Id=67497)

...and after logging in with 'admin' you should see this:

![Home](https://community.rockrms.com/GetImage.ashx?Id=67498)

That's it. Happy coding!

Steps to keep your environment up-to-date with upcoming Rock releases:

1. Subscribe to our developer group (in the [Community Developer Subscribe](https://community.rockrms.com/Developer) sidebar) to get notified when a release goes alpha.
2. Join the #develop channel on our [community.rockrms.com/chat](https://community.rockrms.com/chat). Let us know you're new and a friendly developer in the community should greet you there.
3. Pull the latest from the Rock repo as needed. We use a [Gitflow Branching Strategy](https://github.com/SparkDevNetwork/Rock/wiki/Git-Branching-Strategy) so if you wanted to only work from a particular release, you can pull that particular `release-x.y.z` branch. Hotfix branches are `hotfix-x.y.z`.
