---
description: "Use when user asks about server requirements, system specifications, hosting environment setup, or whether their infrastructure can support Rock"
source: "https://community.rockrms.com/documentation/bookcontent/2/357"
sourceLabel: Planning for Rock
---
> **Path:** Planning for Rock > Deciding Where to Host

Deciding Where to Host

# Hosting Requirements

Rock was developed on Microsoft's ASP.Net platform and therefore requires a Windows Server environment to run. Below are specific requirements of the hosting platform. *Note: You should double or triple these storage requirements if you are going to keep live backups on your hosted server.*

## Small Installs

1,000-5,000 records  
One server with the following specs:  

| Server |
| --- |
| - CPU: 2Ghz dual core or higher - Memory: 2GB or higher - Storage: 1TB - Operating System: Windows Server 2016 or newer - Software: SQL Server Express 2017 (free) or SQL Server 2017 Standard or higher    - Note that the server versions above are the minimum. We would of course recommend using the latest versions if you can. |

Note that the server versions above are the minimum. We would of course recommend using the latest versions if you can. Starting with Rock v18, SQL Server 2022 will be required at a minimum.

# Keep in Mind PCI Compliance

While a single server configuration will do a lot quite well for small churches, you should be aware that it does not meet PCI requirements (which state you need to have your database and your web host in separate environments). So if you plan to take payments through your Rock site, or store financial information in Rock, you'll probably need to use the Medium Installs configuration instead (or use an external host).

## Medium Installs

5,000-15,000 records  
Two servers with the following specs:  

| Web Server | Database Server |
| --- | --- |
| - CPU: 2Ghz quad core - Memory: 8GB or higher - Storage: 1TB - Operating System: Windows Server 2016 or newer | - CPU: 2Ghz quad core - Memory: 8GB or higher - Storage: 1TB - Operating System: Windows Server 2016 or newer - Software: SQL Server 2017 Standard |

## Large Installs

15,000+ records  
Two servers with the following specs:  

| Web Server | Database Server |
| --- | --- |
| - CPU: 2.5Ghz quad core - Memory: 16GB or higher - Storage: 1TB - Operating System: Windows Server 2016 or newer | - CPU: 2.5Ghz quad core - Memory: 16GB or higher - Storage: 1TB - Operating System: Windows Server 2016 or newer - Software: SQL Server 2017 Standard |

# SQL Server 2012

Note that we are [ending support for SQL Server 2012](https://community.rockrms.com/connect/ending-support-for-sql-server-2012) in Rock version 11.0. We generally recommend using the [latest versions](https://www.microsoft.com/en-us/sql-server/sql-server-downloads) if you can.

# Hosting Options

Rock offers you the freedom of where and how to host the application. Many of you might already know how you want to host, but for those still on the fence, here are some tips below.

## On-site Hosting

Many large ministries or organizations with strong technical resources may decide to install Rock on internal servers. This offers the best control, but at the cost of having to support and care for servers (think security patching, backups, upgrades, etc.). Keep in mind that Rock will not only be used by your internal staff, but also by your attendees. This requires that your servers be securely connected to the Internet.

## Rock Hosting Partners

Our [hosting partners](http://www.rockrms.com/Partners) have developed customized hosting and data migration services for Rock. They have a variety of packages for organizations of all sizes. Whether you want a playground or are ready to get started, you can be up and running within the day.

## Cloud Hosting

Today's cloud services companies offer a great hybrid of the power and scalability of on-site hosting with a simplicity similar to traditional webhosting. These services allow you to start small and add capacity as you need it. Setting up these services can be a bit trickier than traditional vendors, but once configured, you don't need to worry about server patches and backups.

While there are numerous cloud hosting providers (Amazon, RackSpace, AppHarbor to name a few), we would suggest that if you are interested in hosting Rock in the cloud, you consider Microsoft's Azure platform because of its generous non-profit program and popularity in the Rock Community.

# Get More Details

For more information, see our [Rock Solid Internal Hosting](https://community.rockrms.com/documentation/bookcontent/1/) and [Rock Solid Azure Hosting](https://community.rockrms.com/documentation/bookcontent/31/) guides.

# Choosing Wisely

As with any purchase, it’s a good idea to consider more than cost alone when picking a hosting service. While there are other services that can meet Rock’s installation requirements, they vary widely in performance, scalability and reliability. It is up to each organization to choose its service wisely.


---

## Help Options {#help-options}

> **Path:** Planning for Rock > Help Options

Help Options

Unlike traditional software, there is no paid support for Rock. We do however have a well-considered plan to make sure you're successful. This plan includes three options.

# Well-Crafted Documentation

We believe documentation can be useful if it's not an afterthought. From the beginning of the project, we've been strategizing about how to make our documentation different; an easy-to-use resource. This won't be the single thick manual that sits on your desk collecting dust. We have a number of concise, well-designed manuals that each cover a single function. These manuals don't insult your intelligence by telling you every button to push. Instead, they will give you a picture of what must be done, then give you steps to make it happen. The manuals are also kept up-to-date, and when large-enough features are added, we'll add new manuals from time to time so you know how to use them. So whenever you update Rock, be sure to check back for the updated manuals!

We also realize you aren't a cookie-cutter ministry; each church is different. We're working on providing ministry recipes that will give you patterns for implementing Rock in a way that matches your church.

We hope that this document gives you an example of what you can expect in the future.

# Still Have Questions?

We know that no matter how good the documentation is, there will still be a time when you need more assistance. With that in mind, we are creating tools for collaboration. As with any product, the people who know the most are the people who use it every day. The problem is that this knowledge is typically unavailable to the larger community.

The [tools](https://community.rockrms.com/Ask) we've developed allow individuals to post a question and have others respond. It's very similar to a website every developer uses daily called StackOverflow.com. This tool collects the tribal knowledge of the community, and at the same time makes it fun through gamification techniques like points and badges. Questions and answers posted here live forever, so they help more than just you.

Finally, we've got [Rocket Chat](https://community.rockrms.com/chat). Rocket Chat is a free realtime chat option for you to connect with other churches using Rock. This is a great platform for questions that just need a quick answer, like where's the best place to look for information, or for help debugging a bit of code. Get started at [https://community.rockrms.com/chat](https://community.rockrms.com/chat). We also have a question/answer page [here](https://community.rockrms.com/ask) that we encourage you to use.

# OK, But I Still Need Help!

We hope that our documentation and community tools will help to make Rock a success at your church. For those with advanced questions, or who need extra assistance there is one other option. As we mentioned in our strategy section, we are building an ecosystem of services around Rock. These services currently include Rock hosting, website themes and paid support, and will continue to grow to include new services, as well. You can find a complete listing of our partners and their services on our [Partners](https://www.rockrms.com/partners) page.

