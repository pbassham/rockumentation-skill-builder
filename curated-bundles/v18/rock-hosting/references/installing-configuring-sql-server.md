---
description: "Use when setting up or installing SQL Server 2016 for Rock RMS, including choosing between Express, Web, or Standard editions"
source: "https://community.rockrms.com/documentation/bookcontent/1/358"
sourceLabel: Rock Solid Internal Hosting
---
> **Path:** Rock Solid Internal Hosting > Installing & Configuring SQL Server

Installing & Configuring SQL Server

In this chapter we will walk through installing SQL Server. If your organization doesn't have a SQL Server license, no worries. Rock works great with Microsoft's free version of SQL, SQL Server Express. Please note that SQL Server Express will work best with fewer than 20,000 records. If you are working with more than 20,000 records, your best option would be SQL Server Web or Standard edition.

# Installing SQL Server 2016

The installation steps for SQL Server 2016 are an almost exact match to those pictured below for 2012. Note that we are [ending support for SQL Server 2012](https://community.rockrms.com/connect/ending-support-for-sql-server-2012) in Rock version 11.0.

# Getting SQL Server Express

To download SQL Server Express, [Click Here](https://www.microsoft.com/en-us/sql-server/sql-server-downloads).

Some versions of SQL Server Express come in different editions. The version we recommend is the 64-bit version of SQL Server Express. Once you have SQL Server downloaded, let's move on to the next section.

If you're prompted to choose an installation type at the start of the process, select either *Custom* or *Download Media*.

# Installing SQL Server

In this section, we will be installing SQL Server onto our Rock server. Let's begin.  
  
Start the SQL Server installer and on the first screen click on New SQL Server stand-alone installation or add features to an existing installation.

![SQL Setup](https://rockrms.blob.core.windows.net/documentation/Books/1/1.17.0/images/sql-1.png)

SQL Setup

On the next screen, agree to the license agreement and then click Next.

![License Agreement](https://rockrms.blob.core.windows.net/documentation/Books/1/1.17.0/images/sql-2.png)

License Agreement

Keep the *Include SQL Server Product Updates* checkbox checked and click Next.

![Product Updates](https://rockrms.blob.core.windows.net/documentation/Books/1/1.17.0/images/sql-3.png)

Product Updates

Next, the SQL installer will prepare to set up.

![Installing Setup Files](https://rockrms.blob.core.windows.net/documentation/Books/1/1.17.0/images/sql-4.png)

Installing Setup Files

On the *Feature Selection* screen, we recommend using the settings shown in Figure 4.8. These are the minimum required settings needed for Rock. Click Next to continue.

![Feature Selection](https://rockrms.blob.core.windows.net/documentation/Books/1/1.17.0/images/sql-5.png)

Feature Selection

On the *Instance Configuration* screen, click on the Default Instance button. Click Next.

# Warning

Be sure to use *Default Instance* if you are unfamiliar with SQL Server. This will simplify our Rock setup. We only recommend using *Named Instances* if you are familiar with them.

![Instance Configuration](https://rockrms.blob.core.windows.net/documentation/Books/1/1.17.0/images/sql-6.png)

Instance Configuration

Leave the default settings on the *Server Configuration* screen and click Next.

![Server Configuration](https://rockrms.blob.core.windows.net/documentation/Books/1/1.17.0/images/sql-7.png)

Server Configuration

On the *Database Engine Configuration* screen, set the *Authentication Mode* to Mixed Mode and set a password for SQL Server. Click Next.

# Note:

Keep this password handy since it will be needed later to set up the Rock RMS database. But remember to keep this password secure, and only share it with those who truly need it.

![Database Engine Configuration](https://rockrms.blob.core.windows.net/documentation/Books/1/1.17.0/images/sql-8.png)

Database Engine Configuration

Skip past the *Error Reporting* unless you would like to send Microsoft error reports. Click Next.

![Error Reporting](https://rockrms.blob.core.windows.net/documentation/Books/1/1.17.0/images/sql-9.png)

Error Reporting

Installation will begin, so hold tight.

![SQL Server Installing](https://rockrms.blob.core.windows.net/documentation/Books/1/1.17.0/images/sql-10.png)

SQL Server Installing

Once it's complete with the installation, you can close the installer.

![Installation Complete](https://rockrms.blob.core.windows.net/documentation/Books/1/1.17.0/images/sql-11.png)

Installation Complete

Now, the *SQL Server Installation Center* (the first screen of the installer) should still be open on your desktop. Whereas you clicked the first option last time, now we need to click *Install SQL Server Management Tools*. This will launch the web browser, pointed to the [SSMS Download page](https://docs.microsoft.com/en-us/sql/ssms/download-sql-server-management-studio-ssms). You need to download *SQL Server Management Studio*, not just the upgrade package. Download and then run this package. (You can close the Installation Center window now). There aren't many options in the installation of this package- just accept the license and let the installer run.

# Configuring SQL Server

In this section, we'll start by setting up a user account for Rock to use to access the SQL Server. But before you begin creating users, it's important to understand the type of SQL Server environment you're working with:

- **Azure SQL Database:** A fully managed database service where you interact with the database directly. To create users in Azure SQL Database, you'll need to use actual SQL commands in SSMS. We provide you with those SQL commands after the series of screenshots below.
- **SQL Server on Azure VMs:** A traditional SQL Server instance running on an Azure Virtual Machine. In the context of creating new users, this is the same as hosting locally. Instead of running SQL commands, you can use the windows and screens pictured below.

## Creating a New User Account (Azure VM or Local)

To begin, let's open SQL Server Management Studio. Change the Windows Authentication option to SQL Server Authentication and log in using the password we created during the SQL Server installation. By default, the admin username is `sa`. Use that username when logging in for the first time.

On the Object Explorer, expand the *Security* folder and right click on Logins and click on New Login.

![Object Explorer](https://rockrms.blob.core.windows.net/documentation/Books/1/1.17.0/images/sql-12.png)

Object Explorer

Create a login called RockUser (or another username if you prefer), set the Authentication Type to SQL Server authentication, and create a password. Be sure to keep this password secured and only share it with those who truly need it. Also, uncheck the *Enforce password policy setting* for this account.

![New User Window](https://rockrms.blob.core.windows.net/documentation/Books/1/1.17.0/images/sql-13.png)

New User Window

Next, click on *Server Roles*. Check the dbcreator role. Then click OK.

![Login Properties](https://rockrms.blob.core.windows.net/documentation/Books/1/1.17.0/images/sql-14.png)

Login Properties

## Creating a New User Account (Azure SQL)

Open SQL Server Management Studio and change the Windows Authentication option to SQL Server Authentication. Then, log in with a username of `sa` and the password we created during the SQL Server installation.

We're going to be running some SQL commands. Don't worry if you're not familiar with SQL, we'll walk you through each step.

To start, expand the *Databases* folder and then expand the *System Databases* folder. Right-click the `master` database and select *New Query*.

![Master - New Query](https://rockrms.blob.core.windows.net/documentation/Books/1/1.17.0/images/master-new-query-v17.png)

Master - New Query

Paste the SQL below into the *New Query* window. Be sure to update the password, keeping it in single quotes. Do not use special characters for this password.

CREATE LOGIN \[RockUser\]

WITH PASSWORD = 'xxxxxxx';

CREATE USER \[RockUser\]

FROM LOGIN \[RockUser\]

WITH DEFAULT\_SCHEMA = dbo;

ALTER ROLE dbmanager ADD member \[RockUser\]

ALTER ROLE loginmanager ADD member \[RockUser\]
            

To run the SQL, simply click the *Execute* button as pictured below.

![Run Create Login SQL](https://rockrms.blob.core.windows.net/documentation/Books/1/1.17.0/images/run-create-login-sql-v17.png)

Run Create Login SQL

At this point you would proceed with the *SQL Server Configuration Manager* setup described in the next section below, followed by the firewall configuration. Then proceed to the [Installing Rock](#installingrock) chapter, where your database will be built.

After your database is built, come back to SSMS. To access your new database, expand the *Databases* folder. The new database should be listed below the *System Databases* and *Database Snapshots* folders. Just like we did above, right-click the database name and select *New Query*. Paste the below SQL into the query window and execute it.

CREATE USER \[RockUser\]

FOR LOGIN \[RockUser\]

WITH DEFAULT\_SCHEMA = dbo;

ALTER ROLE db\_owner ADD member \[RockUser\]
            

You can test the newly-created RockUser login by quitting and restarting SSMS, then entering the new user and password to log back in.

## SQL Server Configuration Manager

Now let's open up *SQL Server Configuration Manager*. Expand the *SQL Server Network Configuration* item and click on *Protocols for MSSQLSERVER*. Right click on *TCP/IP* and click on Enable.

# Opening the SQL Manager

You can run the *SQL Server Configuration Manager* by navigating to Start \> Microsoft SQL Server yyyy \> SQL Server yyyy Configuration Manager, or by navigating to Start \> Run. Refer to the [SQL Server Configuration](https://docs.microsoft.com/en-us/sql/relational-databases/sql-server-configuration-manager?view=sql-server-2017) for instructions for your file name depending on your version of SQL Server.

![](https://rockrms.blob.core.windows.net/documentation/Books/1/1.17.0/images/sql-15.png)

Enabling TCP/IP

Next, click on *SQL Server Services* and then right click on SQL Server Agent (MSSQLSERVER) and click on Properties.

![](https://rockrms.blob.core.windows.net/documentation/Books/1/1.17.0/images/sql-16.png)

SQL Server Services

Set the start mode to *Automatic* and click on Apply. Now, since our earlier changes warned us that we'd need to restart the service to take effect, you should right-click the SQL Server service and choose "Restart".

![](https://rockrms.blob.core.windows.net/documentation/Books/1/1.17.0/images/sql-17.png)

SQL Server Agent Properties

## Firewall with Advanced Security

Next, let's open up *Firewall with Advanced Security*. Right click on Inbound Rules and click New Rule.

![](https://rockrms.blob.core.windows.net/documentation/Books/1/1.17.0/images/sql-18.png)

Creating a New Rule

Click on Port and click Next.

![](https://rockrms.blob.core.windows.net/documentation/Books/1/1.17.0/images/sql-19.png)

Define By Port

Choose TCP and type in the specified local port, "1433."

![](https://rockrms.blob.core.windows.net/documentation/Books/1/1.17.0/images/sql-20.png)

Specify Port 1433

Click on Allow the connection and click Next.

![](https://rockrms.blob.core.windows.net/documentation/Books/1/1.17.0/images/sql-21.png)

Allow The Connection

Choose which profiles this rule is applied to and click Next.

![](https://rockrms.blob.core.windows.net/documentation/Books/1/1.17.0/images/sql-22.png)

Firewall Profiles

Give the rule a name and click Finish.

![](https://rockrms.blob.core.windows.net/documentation/Books/1/1.17.0/images/sql-23.png)

Firewall Rule Name

If you're installing Rock and SQL Server on the same server (see warning below) then you'll probably want to lock down port 1433 so that your database is not exposed to the internet. In that case, open the firewall rule you created above. Under the *Scope* tab add `127.0.0.1` to both the Local IP address and to the Remote IP address sections. `127.0.0.1` is the local host where SQL Server is installed. This prevents anyone from outside that server from accessing your database. This does not apply to an Azure setup.

# PCI Compliance

If you're planning on processing credit cards within Rock, it’s not PCI compliant to have the web server and database on the same server. Regardless of the size of your organization, it's not allowed.

That's it! Let's move on to the next chapter.

