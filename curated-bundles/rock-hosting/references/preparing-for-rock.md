---
description: "Use when users need Windows Server system requirements, hardware specifications, or server configuration recommendations for hosting Rock installations"
source: "https://community.rockrms.com/documentation/bookcontent/1/358"
sourceLabel: Rock Solid Internal Hosting
---
> **Path:** Rock Solid Internal Hosting > Preparing for Rock

Preparing for Rock

In this chapter we will cover what you need for Rock to perform at its best.

# System Requirements

Rock was developed on Microsoft's ASP.Net platform so it requires a Windows Server environment to run. Below are specific requirements of the hosting platform:

## Small Installs

1,000-5,000 records  
One server with the following specs:  

| Server |
| --- |
| - CPU: 2Ghz dual core or higher - Memory: 2GB or higher - Storage: 1TB - Operating System: Windows Server 2016 or newer - Software: SQL Server Express 2014 (free) or SQL Server 2014 Standard or higher    - Note that the server versions above are the minimum. We would of course recommend using the latest versions if you can. Starting with Rock v15, SQL Server 2016 will be required at a minimum. |

# Keep in Mind PCI Compliance

While a single server configuration will do a lot quite well for small churches, you should be aware that it does not meet PCI requirements (which state you need to have your database and your web host in separate environments). So if you plan to take payments through your Rock site, or store financial information in Rock, you'll probably need to use the Medium Installs configuration instead (or use an external host).

## Medium Installs

5,000-15,000 records  
Two servers with the following specs:  

| Web Server | Database Server |
| --- | --- |
| - CPU: 2Ghz quad core - Memory: 8GB or higher - Storage: 1TB - Operating System: Windows Server 2016 or newer | - CPU: 2Ghz quad core - Memory: 8GB or higher - Storage: 1TB - Operating System: Windows Server 2016 or newer - Software: SQL Server 2014 Standard (Starting with Rock v15, SQL Server 2016 will be required at a minimum) |

## Large Installs

15,000+ records  
Two servers with the following specs:  

| Web Server | Database Server |
| --- | --- |
| - CPU: 2.5Ghz quad core - Memory: 16GB or higher - Storage: 1TB - Operating System: Windows Server 2016 or newer | - CPU: 2.5Ghz quad core - Memory: 16GB or higher - Storage: 1TB - Operating System: Windows Server 2016 or newer - Software: SQL Server 2014 Standard (Starting with Rock v15, SQL Server 2016 will be required at a minimum) |

# SQL Server 2014

Note that we are ending support for SQL Server 2014 as of Rock version 15.0. We generally recommend using the [latest versions](https://www.microsoft.com/en-us/sql-server/sql-server-downloads) if you can.

# Note:

The storage estimates above do not include room for backups. If you are considering local backups, please adjust the volumes appropriately.

# More Info:

If you plan to install Rock on a two server configuration, be sure to check out the [*Two-Server Configuration*](#two-server-configuration) chapter for some helpful tips.

# Things You'll Need During Installation

Here is a short list of settings that you'll need to complete the Rock installation.

- Internal and external web addresses for your organization
- An email address to send exception messages to

# Other Considerations

**Windows Updates**  
Rock's foundation is built upon Microsoft's .NET technology. Since .NET is an ever-evolving technology, we recommend that you install all the latest updates for your Windows Server.  
  
**Server Version**  
The instructions and pictures in this guide are written for Windows Server 2012. If you plan to install Rock on a newer version, there are a few differences in the installation you will need to watch out for.  
  
**Certificates**  
As you configure Rock, make sure you purchase and configure an SSL certificate before making it available at a publicly accessible domain. Prices range from $9–$100+ per year, and while the setup may seem daunting, there are plenty of helpful tutorials that walk you through the setup process. Also, you can check with your current domain registrar to see if they offer SSL Certificates. If you're new to SSL, Google provides a [detailed list of best practices](https://support.google.com/webmasters/answer/6073543?utm_source=wmx_blog%3Camp%20/%3Eamp;utm_medium=referral%3Camp%20/%3Eamp;utm_campaign=tls_en_post). Check out the [Configuring IIS](#configuringinternetinformationservicesiis) chapter below for additional details.

# Free SSL Plugin Available

Thanks to the Rock Community, there is an easier option available for configuring SSL. Check out the [Acme Certificate](https://www.rockrms.com/Plugin/74) plugin in the Rock Shop. This will walk you through getting and installing a free Lets Encrypt certificate - a much easier route for anyone who has never set up website encryption before.

# Encryption Best Practice

You might be wondering where and when you should add your encryption for your website. Every secure website will have an HTTPS address on every page. The simplest way of doing this for each site within Rock is by encrypting at the Site Level. This is done by checking the box for every site at: Admin Tools \> CMS Configuration \> Sites \> Edit Site \> Require Encryption. The two Rock sites for which you should enable SSL are the internal RockRMS Site, and the external facing website. Even if you don’t plan to use Rock for your main website, it’s important to protect the information flowing between your server and those who are giving you their information. Users typing http:// addresses in their browsers to visit your pages will be redirected automatically to the secure https:// site when “Require Encryption” is checked.

Now that we have these things covered, let’s begin!


---

## Rock Solid Internal Hosting {#rock-solid-internal-hosting}

> **Path:** Rock Solid Internal Hosting

This skill catalogs the chapters of *Rock Solid Internal Hosting* from the Rock RMS documentation.

Each chapter below is available as a separate reference file. Load only the chapters relevant to the task at hand.


---

## Introduction {#introduction}

> **Path:** Rock Solid Internal Hosting > Introduction

Introduction

Looking for information on how to host Rock internally? Well look no further. In this step-by-step guide we'll walk through the process of getting Rock up and running. Before we jump in, let's cover a few things to make sure we get started off on the right foot.

