---
description: "Use when users need guidance on hosting Rock RMS on Azure, including service options, sizing decisions, and nonprofit hosting credits"
source: "https://community.rockrms.com/documentation/bookcontent/31/359"
sourceLabel: Rock Solid Azure Hosting
---
> **Path:** Rock Solid Azure Hosting

This skill catalogs the chapters of *Rock Solid Azure Hosting* from the Rock RMS documentation.

Each chapter below is available as a separate reference file. Load only the chapters relevant to the task at hand.


---

## Introduction {#introduction}

> **Path:** Rock Solid Azure Hosting > Introduction

The big factors in deciding where to host are cost and quality. Microsoft brings the best of both worlds to non-profits by offering a generous $2,000 annual Azure hosting credit. That's right, you can get premium hosting services with an industry-leading cloud provider at a significantly reduced rate. Depending on your organization's size and needs, your hosting costs might even be completely covered by the credit. We've got all the details to get you started in the [Hosting Credit for Non-Profits](#hosting-credit-for-non-profits) chapter below.

But remember that cost isn't the only factor. There are hosting services available at a fraction of the cost of Azure, but they vary widely in overall quality when it comes to running Rock. This is where Azure stands out. As a part of Microsoft, they are true experts in the foundational technologies (Windows, .NET, SQL Server) upon which Rock itself is built. We're not saying you can't or shouldn't host elsewhere, but this is certainly an advantage of hosting with Azure.

# Feeling overwhelmed?

Unless you have a background in technology, all this talk about servers and hosting can be intimidating. Don't worry, that's perfectly understandable and not a problem at all. We have partners who can help get this all up and running for you, so you can focus on other aspects of your ministry. Visit [rockrms.com/partners](https://rockrms.com/partners) for details.

The rest of this guide will help you through the steps needed to get Rock up and running with Azure. As you'll see in the next chapter, there are different Azure hosting options available depending on the size and needs of your organization. Be sure to consider these factors before deciding on a service. If you haven't already, it's also a good idea to check out our [Planning for Rock](https://community.rockrms.com/documentation/bookcontent/2/) guide to make sure you're ready to get started.


---

## Sizing and Service Options {#sizing-and-service-options}

> **Path:** Rock Solid Azure Hosting > Sizing and Service Options

Sizing and Service Options

How much power and space will you need for your Rock instance? It’s difficult to predict the perfect configuration. Fortunately, we have some suggestions based on our experience and the experiences shared with us by the Rock community. We've provided recommendations based on average attendance.

It's important to note that while average attendance is a good starting point, it's often too simplistic of a measure to be applied in every use case. For instance, a medium-sized church might run their website on Rock and heavily use most of Rock’s features in a significant way. They may need more resources than an extra-large church that is only getting started with Rock. Keep this in mind as you consider the recommendations below.

<table><caption>Azure Hosted Services Sizing</caption><thead><tr><th></th><th>Small</th><th>Medium</th><th>Large</th><th>Extra-Large</th><th>Above</th></tr></thead><tbody><tr><td>Max Weekend Attendance</td><td>500</td><td>2,000</td><td>5,000</td><td>10,000</td><td rowspan="4">Custom</td></tr><tr><td>Web VM</td><td>B2als-v2</td><td>B2as-v2</td><td>B4as-v2</td><td>B8as-v2</td></tr><tr><td>Azure SQL</td><td>S1</td><td>S2</td><td>S3</td><td>S4</td></tr><tr><td>Est. Cost / Month</td><td>$48</td><td>$108</td><td>$218</td><td>$436</td></tr></tbody></table>

# Price Updates

The prices discussed in this guide are estimated costs only, as of the time of writing. These prices tend to change frequently.

If you need more resources than the recommended "Extra-Large" configuration, pricing will vary. As the size of the church increases by orders of magnitude above the sizes we've listed, the price is likely to increase at a faster rate than the table would imply. For instance, a church three times the size of an "Extra-Large" church might expect to pay much more than $1,300 per month.

# Running Your Website on Rock?

If you're running your website on Rock, we recommend that you move one tier to the right on the chart above. This will help ensure you have the resources needed for a smooth and performant web experience.

## Demystifying Terms

Microsoft offers *Infrastructure as a Service* (IaaS) and *Platform as a Service* (PaaS) hosting options.

- **IaaS:** With IaaS you're responsible for setting up and managing SQL Server and the Windows Server operating system. This gives you a higher level of control and flexibility, but also requires that you have staff with the appropriate skills.
- **PaaS:** PaaS is a comparatively more hands-off option because more services are managed for you. The only drawback is that you have less control over your platform and infrastructure.

Our current recommendation is that you run your Rock Web/Application server on a Windows VM (IaaS) and Azure SQL (PaaS).

