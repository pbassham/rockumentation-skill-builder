---
description: "Use when helping users set up Azure hosting resources for Rock, including creating resource groups, Web VMs, and SQL databases"
source: "https://community.rockrms.com/documentation/bookcontent/31/359"
sourceLabel: Rock Solid Azure Hosting
---
> **Path:** Rock Solid Azure Hosting > Next Steps

Next Steps

Whether or not you qualify for Microsoft's non-profit credit, your next steps will be about the same. Azure hosting includes Windows Server and Azure SQL Server, so you don’t need to worry about obtaining separate licenses. Once your account is set up with Azure, you're ready to start provisioning.

# Provision Your Services

First, create the *resource group* that you'll use to group all of your Rock services. A resource group is a logical container that holds related resources, like having the files on your computer organized into a folder within a directory. If you need more details, Microsoft has some recommendations on setting up [resource groups](https://docs.microsoft.com/en-us/azure/azure-resource-manager/management/overview#resource-groups). You can name the resource group anything you like, but we recommend something like "rock-rg-production" to ensure it's clear and easy to identify.

Next, through your Azure portal, you'll create your Web VM (virtual machine). We'd like to provide detailed instructions for this, but the steps and screens change often. Choose the resource group created above when prompted. Like the resource group, what you name the Web VM is up to you but we suggest "rock-vm-web-production" or similar. This server is your new Web Host, where you'll configure IIS.

Lastly, you'll follow similar steps to create the Azure SQL server and database. They should be in the same resource group as your Web VM. Again, the specific steps and screens change frequently, which is why we don't document them. We suggest a clear naming convention such as:

- **Azure SQL Server:** rock-sql-production
- **Azure SQL Database:** rock-sqldb-production

# Existing Licenses

If you already have licenses that you'd like to use, see Azure’s [hybrid use plans](https://azure.microsoft.com/en-us/pricing/hybrid-benefit/). However, keep in mind that we still recommend Azure SQL over a VM running SQL Server.

With the above in place, you're ready to head over to our [Rock Solid Internal Hosting Guide](http://community.rockrms.com/documentation/bookcontent/1/) for instructions on installing Rock.

# Need Some Help?

Without certain technical knowledge these processes can be a bit confusing, so it's normal if you're feeling intimidated by all of this. Luckily, we have partners who can help get this all up and running for you. Visit [rockrms.com/partners](https://rockrms.com/partners) for details.

Before you go, don't forget to review the other [Rock guides and manuals](http://community.rockrms.com/documentation/) to ensure you get the most out of your Rock experience.

Table of Contents

- [Introduction](#introduction)
- [Sizing and Service Options](#sizingandserviceoptions)
- [Hosting Credit for Non-Profits](#hostingcreditfornonprofits)
- [Next Steps](#nextsteps)

Improve

<iframe id="modal-popup_iframe" scrolling="no"></iframe>

