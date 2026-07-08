---
description: "Use when installing Rock RMS on an internal server, configuring the database connection, setting up admin accounts, and completing initial Rock setup"
source: "https://community.rockrms.com/documentation/bookcontent/1/358"
sourceLabel: Rock Solid Internal Hosting
---
> **Path:** Rock Solid Internal Hosting > Installing Rock

Installing Rock

Now that our foundation is set, we can begin the best part - installing Rock!

The first thing we need to do is to download the Rock installer, which you can find at [rockrms.com/Rock/GetStarted](http://www.rockrms.com/Rock/GetStarted). Place the *Start.aspx* and *web.config* files from the installer package in the root of the web folder. By default, the web root folder will be located here: C:\\inetpub\\wwwroot.

# Tip: make a fresh start!

If you're installing in the default wwwroot folder, you'll see that Windows has already placed some content here. Be sure to delete that before starting your installation; only Start.aspx and web.config should be in that directory.

Open up a web browser and go to [http://localhost/Start.aspx](http://localhost/Start.aspx) to begin the installation process.

![](https://rockrms.blob.core.windows.net/documentation/Books/1/1.17.0/images/rock-1.png)

Rock Installer

Now we will enter in the SQL server information. If the SQL server is installed on this server, you can type in "localhost" in the *Database Server* box. If you are using another server for SQL, you can enter the server name instead.  
  
Next, enter in a name for the Rock Database (e.g. "Rock") and enter in the username and password we created earlier in the SQL Chapter. Click Next.

![](https://rockrms.blob.core.windows.net/documentation/Books/1/1.17.0/images/rock-2.png)

Database Configuration

Now the Rock installer will run some checks to make sure the environment is ready for use. If everything checks out, you will see the *Pass!* screen. Click Next.

![](https://rockrms.blob.core.windows.net/documentation/Books/1/1.17.0/images/rock-3.png)

Environment Checks

The next screen will allow us to create an admin username and password for Rock. This will be the default admin account for Rock. Be sure to use a good password, and limit who has access to it. Click Next.

# Note:

We recommend using a general or organization account, not a personal one. You can create your own login after the install.

![](https://rockrms.blob.core.windows.net/documentation/Books/1/1.17.0/images/rock-4.png)

Admin Account Setup

Now you'll need to enter in your organization URLs.

- **Internal URL:** The web address you'll use to connect to Rock internally. (Example: http://admin.rocksolidchurchdemo.com)
- **Public URL:** The public facing website for your organization. (Example: http://www.rocksolidchurchdemo.com)

# Note:

Don't worry if these addresses aren't configured to point to your new server yet. These addresses are intended to be the ones you'll use once you're ready to go live.

![](https://rockrms.blob.core.windows.net/documentation/Books/1/1.17.0/images/rock-5.png)

Hosting Configuration

Now let's enter in your Organization Information.

- **Organization Name:** The name of your organization
- **Organization Default Email Address:** The default email sending address for Rock
- **Organization Phone Number:** The main phone number of your organization
- **Organization Website:** The website of your organization

# Note:

Don't worry, these settings can be changed later under Admin Tools \> General Settings \> Global Attributes

![](https://rockrms.blob.core.windows.net/documentation/Books/1/1.17.0/images/rock-6.png)

Organization Information

Now that you have all of your organization's information entered into Rock, click Next to begin the Rock installation.

![](https://rockrms.blob.core.windows.net/documentation/Books/1/1.17.0/images/rock-8.png)

Installation Progress

Rock will begin downloading the needed files onto the webserver and configuring the database. You can observe this process by clicking on the Show Console button.

![](https://rockrms.blob.core.windows.net/documentation/Books/1/1.17.0/images/rock-9.png)

Installation Console

When complete, click on the Flip the Switch button. Keep in mind, this loading screen will take the longest to load since Rock is starting up for the first time.

![](https://rockrms.blob.core.windows.net/documentation/Books/1/1.17.0/images/rock-10.png)

Installation Complete!

# Note

If you arrive at the external site instead of the internal login page it could be that the domain name is set to be used as the external site. When Rock isn't provided with a specific page to load in the URL it looks at the domain and finds a site in the database that matches. If this happens to you, you can get to the internal site by this URL: http://{yourserver}/page/12

Now that Rock is installed, you can begin by logging in. Log in with the Rock admin account you created during the installation.

![](https://rockrms.blob.core.windows.net/documentation/Books/1/1.18.0/images/rock-11-v18.png)

Logon Screen

Once logged in, you'll be taken to the Rock homepage. You will see the *Administrator Checklist*, which is a list of the recommended first steps to maximize the potential of Rock at your organization. Don't worry about completing the list today. You can get to it as you become more familiar with Rock. The list will disappear once you mark off all the items. It may reappear after updates, if special configurations are needed. Think of it as a friend that only shows up in your time of need.

![](https://rockrms.blob.core.windows.net/documentation/Books/1/1.18.0/images/rock-12-v18.png)

Rock Home Page

## Snapshot Isolation Settings

We recommend enabling snapshot isolation for your Rock database. This keeps database reads from being locked by database writes. Below are the settings we recommend (found by right-clicking on the database name in SQL Server Management Studio and selecting Properties.)

![](https://rockrms.blob.core.windows.net/documentation/Books/1/1.17.0/images/snapshot-isolation.png)

Snapshot Isolation Settings

# Default Settings May Vary

Depending on your SQL Server edition and version this may already be the default.


---

## Two-Server Configuration {#two-server-configuration}

> **Path:** Rock Solid Internal Hosting > Two-Server Configuration

Two-Server Configuration

If you were looking at the system requirements in this guide's introduction, you might have noticed that there is a two-server configuration for larger installations. Even for smaller installations, we recommend two servers for the following reasons:

- **Performance:** Having your Rock Database and Web Environment on separate servers means they won't be sharing resources and will be able to perform at a higher capacity.
  
- **Security:** If you plan to use a public website with Rock, you can put the web server in a DMZ for added network security. Setting up a DMZ is outside the scope of this guide, but if this is something you plan on pursuing, reach out to the Rock community.
  
- **PCI Compliance:** PCI Requirements in the U.S. require that if you are taking or storing financial information through your website, your database must be separate from your web host.

# It's All in the Details

The process for setting up a two-server environment is not that much different from the single-server setup described in this guide. Here is a high-level task list for each server:

  
  
**Database Server**
- Install & Configure SQL Server
**Web Server**
- Install the required Server Roles and Features
- Configure Internet Information Services (IIS)
- Point Rock at the database server during installation

Be sure to check out the rest of the Rock guides and manuals to help you get started.

# Self-Installing Rock

If you're installing Rock and SQL Server on separate VMs or servers yourself, in your own network (not in Azure), then port 1433 should only be open to the Rock server. This is so Rock itself can talk to the SQL db. In this setup your self-hosted SQL server should not be NATed (exposed via a public IP) to the Internet at all. It should be internal to your network with only Rock (and perhaps a dev machine) allowed to talk to it.

To do this, open the firewall rule you created in the [Installing & Configuring SQL Server](#installingconfiguringsqlserver) chapter above. Under the *Scope* tab, add the IP address of your Rock web server to the Local IP address if it's on your internal network, or to the Remote IP address section if it is external to your network. No other ports need to be open if the database is external to the network (i.e., on another external server).

Table of Contents

- [Introduction](#introduction)
- [Preparing for Rock](#preparingforrock)
- [Installing Server Roles & Features](#installingserverrolesfeatures)
- [Configuring Internet Information Services (IIS)](#configuringinternetinformationservicesiis)
- [Installing & Configuring SQL Server](#installingconfiguringsqlserver)
- [Installing Rock](#installingrock)
- [Two-Server Configuration](#twoserverconfiguration)

Improve

<iframe id="modal-popup_iframe" scrolling="no"></iframe>

