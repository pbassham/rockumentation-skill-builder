---
description: "Use when troubleshooting Rock application startup failures, database exceptions, file system errors, or 500 server errors"
source: "https://community.rockrms.com/documentation/bookcontent/9/368"
sourceLabel: Rock Admin Hero Guide
---
> **Path:** Rock Admin Hero Guide > What To Do When Things Go Wrong

In life there will always be problems. The key is how you go about solving them. Below are a few tips to help you successfully navigate issues as they arise.

Your best resource in dealing with problems is knowledge. The more you know about how Rock works, the better off you'll be. We strongly recommend reading each manual that comes with Rock. You even might make it a habit to re-read manuals more than once. With each reading, your understanding of the material will grow. You may find that new ideas come to you as you cover the material on multiple reads.

# What to Do When Rock Won't Load

You make a configuration change and next thing you know Rock's not loading any longer. What should you do?! First, relax. A calm mind will lead to a quicker resolution while stress might only dig you in deeper. Below are some things you should try first.

## Check for Exceptions in The Database

First check the exceptions log in the database. This is made a bit tricky because you can't use Rock's built-in screens to check the logs. Instead, you'll have to use SQL Server Manager or a similar tool to view the errors.

Once you connect to your database, look into the *ExceptionLog* table. You can also try running the SQL statement below to view the error.

    SELECT TOP 100 \*
        FROM \[ExceptionLog\]
        ORDER BY \[CreatedDateTime\] DESC                    
                

## Check for Exceptions in The File System Log

When things are so bad that Rock can't even write to the database, we'll write the exception to a comma-delimited file on the web server's file system. The file is located at ~/App\_Data/Logs/RockExceptions.csv.

## Getting 500 Errors to Display

When all you get back from Rock is a server 500 error, you can modify your web.config to return a more detailed error message.

# Be Very Careful

Incorrectly editing your web.config file can cause serious problems. Be sure to make a copy of the original file before editing. Also be sure to change these settings back when you're done.

Two changes will need to be made before a detailed error will be displayed.

1. Immediately after the line `<system.web>` add a new line with this text `<customErrors mode="Off"/>`
2. Next, you'll need to comment out the custom error configuration. To do this, simply edit the existing comment from this:
	<!-- Add a custom handler for 404 errors to load Http404Error page.
	The Http404Error page will check to see if the site has a configured 404 page, and if so, it will then redirect to the custom page.--\> 
	<httpErrors errorMode="Custom" existingResponse="Replace"\>
	   <remove statusCode="404" subStatusCode="-1" /\>
	   <error statusCode="404" path="/Http404Error.aspx" responseMode="ExecuteURL" /\>
	</httpErrors\>
	                        to this:
	<!-- Add a custom handler for 404 errors to load Http404Error page.
	The Http404Error page will check to see if the site has a configured 404 page, and if so, it will then redirect to the custom page.
	<httpErrors errorMode="Custom" existingResponse="Replace"\>
	   <remove statusCode="404" subStatusCode="-1" /\>
	   <error statusCode="404" path="/Http404Error.aspx" responseMode="ExecuteURL" /\>
	</httpErrors\>\--\>

## What To Do Next

At this point, you should now have more information about what's going on behind the scenes. Hopefully you can fix it from here. If not, you might try:

- Posting into the [Rock Q&A](https://community.rockrms.com/Ask). Be sure to include any error message you're getting.
- Posting on the [Rocket Chat](https://community.rockrms.com/chat).
- Seeking help from a [Rock consultant](https://www.rockrms.com/Partners?Category=13). You might ask in the Q&A section for a recommendation. We hope to build a rating system for external resources soon.


---

## Scaling Rock {#scaling-rock}

> **Path:** Rock Admin Hero Guide > Scaling Rock

Scaling Rock

Large organizations may be interested in scaling Rock using multiple servers. This not only provides extra capacity but provides failover in case a server goes down. To learn more about running Rock on multiple servers, check out our [Hyper Scaling Rock RMS](https://community.rockrms.com/documentation/bookcontent/40) guide.


---

## Under The Hood {#under-the-hood}

> **Path:** Rock Admin Hero Guide > Under The Hood

Under The Hood

While Rock comes preconfigured to run optimally on most systems, here are a few things you should know.

# Initial Slow Response Times

Here's the scoop on slow initial Rock load times. Rock uses a database access technology called Entity Framework (EF). On first load (the very first page that's started when the application loads) it can take a few seconds for EF to check the database to see if any changes are required. Subsequent pages will load much faster. You'll notice that once a page loads the second load of that page is super-fast. That’s Rock’s caching engine kicking in. So that's all fine and good until…

IIS's AppPools (think of it as the engine that powers Rock) need to be refreshed on occasion. By default, this happens every 29 hours (you should reset yours to always occur at a specific time, like 1am). When the AppPool recycles the whole EF start up happens again. For more information on configuring the AppPool see [this blog post.](http://weblogs.asp.net/owscott/why-is-the-iis-default-app-pool-recycle-set-to-1740-minutes)

We'd recommend that you use an HTTP status tool like [Pingdom](https://tools.pingdom.com/) to constantly poll your site. Not only will this notify you when it's down, but it will also be the first to load your page after an AppPool recycle.

Once Rock is started there's an internal keep-alive process to ensure your site doesn't go into a sleep-like mode. Once the initial page is loaded this process will ensure that Rock stays awake and responsive.

