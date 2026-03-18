> **Path:** Mobile Docs > 🧱 Essentials > Blocks > Finance > Giving

# Giving

M v7.0 C v17.1 [Integrated Scroll](https://community.rockrms.com/page/3516?slug=essentials%2fblocks#integrated-scroll)

The Rock Mobile Giving experience is only compatible with the [MyWell](https://www.mywell.org/) gateway.

To use platform payments (such as Apple or Google Pay), you will need to wait until you have coordinated publication with [App Factory](https://community.rockrms.com/developer/mobile-docs/app-factory) before this feature can be functional.

## Overview

Native giving is here! Starting with Mobile Shell V7, contributions can be processed using native payment methods like Apple Pay and Google Pay—even without logging in. Individuals can also use their saved accounts in Rock or easily add new payment methods using a convenient card scanning feature. Scheduled transactions are fully supported.

This polished experience has been crafted with great attention to detail, featuring smooth animations, an intuitive user interface, and more.

## Prerequisites

### General

1.  The MyWell Gateway plugin.

### Apple Pay

1.  A Benevity account.
2.  A merchant identifier.
3.  Apple Pay to be configured in the MyWell settings.

### Google Pay

1.  Screenshots depicting the giving process (come submission time).

## Block Configuration

Due to the number of settings, we placed this in expandable content below.

### Block Settings

#### Enable ACH 

Determines whether the block allows individuals to add ACH payment methods, such as bank accounts, and process transactions using those methods.

#### Enable Credit Card 

Controls whether the block supports the use of credit and debit cards for payments. When enabled, individuals can enter add card payment methods and use them to complete transactions. This is enabled by default.

#### Enable Fee Coverage 

Determines if the block offers individuals the option to cover transaction processing fees. When this feature is enabled, individuals can choose to add a percentage-based or fixed fee to their payment to offset processing costs (configured in the gateway).

#### Accounts 

Specifies the list of financial accounts available for giving within the block.

#### Enable Multi-Account 

Allows individuals to allocate their contributions across multiple financial accounts by specifying amounts for each account. This feature is enabled by default.

#### Scheduled Transactions 

Determines whether the block provides an option for individuals to set up recurring (scheduled) transactions.

#### Transaction List Page 

Defines the page to which individuals are redirected when they wish to view a history of their completed transactions. This is typically a page showing a list of financial transactions.

#### Scheduled Transaction List Page 

Defines the page to which individuals are redirected to manage or review their scheduled transactions (recurring giving).

#### Saved Account List Page 

Specifies the page where individuals can view and manage their saved payment methods, such as credit cards or bank accounts.

#### Connection Status 

Specifies the default connection status (e.g., "Prospect") to assign to new individuals created during the giving process.

#### Record Status 

Determines the default record status (e.g., "Pending") assigned to new individuals created by this block.

#### Address Type 

Defines the location type (e.g., "Home") used for saving the address information of new individuals.

#### Ask for Campus if Known 

Controls whether the campus field is displayed for individuals whose campus is already known to the system.

#### Include Inactive Campuses 

Determines if inactive campuses are displayed in the campus selection dropdown.

#### Campus Types 

Filters the available campuses by specific types (e.g., "Main Campus" or "Online Campus").

#### Campus Statuses 

Filters the available campuses by their statuses (e.g., "Active" or "Inactive").

#### Use Account Campus Mapping Logic 

When enabled, determines account selection based on campus associations, with specific logic applied for child accounts and campuses.

#### Receipt Email 

Specifies the system email template used to send receipts for successful transactions.

#### Success Template 

Provides the customizable template, written in Lava, to display a confirmation message upon successful transaction completion.

#### Transaction Type 

Indicates the type of financial transaction processed by the block (e.g., "Contribution"). Defaults to the "Contribution" transaction type.

#### Batch Name Prefix 

Defines the prefix for naming financial batches created by transactions processed in this block. Defaults to "Online Giving."

#### Account Campus Context 

Configures filtering options for the accounts list based on campus context.

## Styling

This block has internal scroll mechanics and built-in padding. It should be placed in a layout with no scrollable container and no external padding applied.  
  
This block requires the CSS Style Framework to be set to **Default (.NET MAUI)**

![](https://community.rockrms.com/GetImage.ashx?Id=73536)
