---
description: "Use when helping users configure native mobile giving features like Apple Pay, Google Pay, and saved payment methods in Rock Mobile Shell"
source: "https://community.rockrms.com/developer/mobile-docs"
sourceLabel: Mobile Docs
---
> **Path:** 

M v7.0 C v17.1 [Integrated Scroll](https://community.rockrms.com/page/3516?slug=essentials%2fblocks#integrated-scroll)

The Rock Mobile Giving experience is only compatible with the [MyWell](https://www.mywell.org/) gateway.

To use platform payments (such as Apple or Google Pay), you will need to wait until you have coordinated publication with [App Factory](https://community.rockrms.com/developer/mobile-docs/app-factory) before this feature can be functional.

## Overview

Native giving is here! Starting with Mobile Shell V7, contributions can be processed using native payment methods like Apple Pay and Google Pay—even without logging in. Individuals can also use their saved accounts in Rock or easily add new payment methods using a convenient card scanning feature. Scheduled transactions are fully supported.

This polished experience has been crafted with great attention to detail, featuring smooth animations, an intuitive user interface, and more.

## Prerequisites

### General

1. The MyWell Gateway plugin.

### Apple Pay

1. A Benevity account.
2. A merchant identifier.
3. Apple Pay to be configured in the MyWell settings.

### Google Pay

1. Screenshots depicting the giving process (come submission time).

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

 M19.2  Use the .give-button class to target the giving button colors after entering an amount.

```
.give-button { background-color: pink; color: blue; }
```

This block requires the CSS Style Framework to be set to **Default (.NET MAUI)**

![](https://community.rockrms.com/GetImage.ashx?Id=73536)

---

## Scheduled Transaction List {#scheduled-transaction-list}

### M v7.0C v16.10

Displays a list of scheduled transactions.

## Block Configuration

### Template

The XAML template to display your scheduled transaction list with.

### Include Inactive

Choose whether to include inactive scheduled transactions in the list.

### Detail Page

The page will display the Giving Block when selecting a one of the scheduled transactions.

### Accounts

Filter the list of scheduled transactions by the associated accounts.

## Merge Fields

| Property | Type | Description |
| --- | --- | --- |
| DetailPage | Guid | The page selected in the Detail Page setting. |
| ScheduledTransactionInfo | FinancialScheduledTransaction | The info about the scheduled transaction. |
| FrequencyText | string | Representing the payment frequency associated with the scheduled transaction. |

### Styling

Since this is a XAML template, there’s no styling X-Ray available.

---

## Transaction Detail {#transaction-detail}

### M v7.0C v16.10

*Display the detail of the transaction.*

This block allows you to view the details of your transactions.

## Page Parameter

This block checks for the following page parameter.

| Name | Type | Definition |
| --- | --- | --- |
| Transaction | string | The identifier of the transaction (IdKey or Guid). |

## Styling

![](https://community.rockrms.com/GetImage.ashx?Id=67253)

---

## Transaction List {#transaction-list}

*Displays a list of transactions.*

### M v7.0C v16.10

## Block Configuration

### Past Years Filter Limit

The maximum number of past years a user can filter when viewing transaction history.

### Detail Page

Page to link to when user taps on a Transaction List. Detail Page GUID is passed in the query string.

### Give Now Action

When no result is shown how should the 'Give Now' button behave.

## Styling

![](https://community.rockrms.com/GetImage.ashx?Id=67258)

---

## Financial Batch List {#financial-batch-list}

*Displays a list of batches.*

### M v7.0C v17.4

## Block Configuration

### Post Batch Save Action

Specifies the navigation action to perform after adding a new batch.

### Item Template

Defines the XAML template used to display each batch item.

### Status

Determines which batches to display based on their status.

### Allow Add

Indicates whether individual are allowed to add a new batch.

### Detail Page

The financial batch detail page to navigate to when a batch is clicked.

### Allow Filter By Campus

Specifies whether batches can be filtered by campus.

### Display Campus Types

Specifies which campus types to filter batches by.

### Display Campus Statues

The statues of campus statues to filter the batches by.

### Page Load Size

Defines the number of batches to load per pagination step.

### Styling

![](https://community.rockrms.com/GetImage.ashx?Id=71489)

---

## Financial Batch Detail {#financial-batch-detail}

*Display the batch detail.*

## Overview

This block provides functionality for managing financial batches. It allows you to view and edit the details of existing batches. In addition, it integrates with Azure Document Intelligence, enabling you to scan checks, automatically extract MICR (Magnetic Ink Character Recognition) data, and allocate funds to the appropriate financial accounts. This reduces manual data entry, improves accuracy, and streamlines the batch processing workflow.

## M v7.0C v18

## Block Configuration

### Transaction Detail Page

The page to navigate to when a batch transaction is clicked.

### Accounts

The list of accounts that can be selected for fund allocation.

### Document Intelligence API Key

The API key for Azure Document Intelligence. Required for check processing.

### Document Intelligence Endpoint

The endpoint for Azure Document Intelligence. Required for check processing.

### Accounts Allocation Required

Specifies whether fund allocation to accounts is required.

### Required Control Amount

Specifies whether a control amount is required when adding batches.

### Required Control Item Count

Specifies whether a control item count is required when adding batches.

## Styling

![](https://community.rockrms.com/GetImage.ashx?Id=71933)

---

## Check Scanning {#check-scanning}

## Overview

Check Scanner use document intelligence prebuilt model specifically for scanning US Check. Below is instruction on how to set up the document intelligence for check scanning.

### Set up Document Intelligence (AI Foundry)

1\. Open Document Intelligence in your AI Foundry.

2\. Click "Create".

![](https://community.rockrms.com/GetImage.ashx?Id=69088)

3\. Fill out the project and instance details, then continue.

![](https://community.rockrms.com/GetImage.ashx?Id=69090)

4\. Review the configuration and create the resource.

![](https://community.rockrms.com/GetImage.ashx?Id=69091)

5. After the resource is deployed, open your Document Intelligence instance.

6\. Copy the Endpoint and an API key from the Overview page.

![](https://community.rockrms.com/GetImage.ashx?Id=69094)

### Configuring Rock

1\. In Rock, navigate to the Financial Batch Detail block settings.

2. Paste the Endpoint and API key into the block settings.

![](https://community.rockrms.com/GetImage.ashx?Id=69095)

Now your check scanning is ready.

### Styling

There’s no styling X-Ray available.

---

## Groups {#groups}

This section is in reference to the 'Groups' mobile block group.

---

## Group Attendance Entry {#group-attendance-entry}

![](https://community.rockrms.com/GetImage.ashx?Id=67259)

This block displays a list of group members that can be selected to mark attendance for a specified date. You can read more about group attendance here in the [Rock Your Groups manual](https://community.rockrms.com/Rock/BookContent/7#groupattendance).

Important

Unlike the web, groups must have a schedule configured in order to use this block.

## Parameters

| Name | Type | Description |
| --- | --- | --- |
| GroupGuid | Guid | The guid of the group you wish to mark attendance for. |

## Settings

| Property | Description |
| --- | --- |
| Number of Days Forward to Allow | The number of days forward to allow attendance to be entered for. |
| Number of Days Back to Allow | The number of days back to allow attendance to be entered for. |
| Save Redirect Page | When the 'Save' button is pressed, this is the page that is navigated back to. If Show Save Button is disabled, this will be irrelevant. |
| Show Save Button | Whether or not you want to display the save button. |
| Allow Any Date Selection | Whether or not any custom date can be selected. |
| Show Attendance Notes | Whether or not the text field for note entry will be visible. |
| Attendance Note Label | The attendance label that appears above the notes field. If Show Attendance Notes is disabled, this will be irrelevant. |

## Styles

| Class | Element | Description |
| --- | --- | --- |
| group-attendance-entry-layout | StackLayout | Outer content wrapper |
| header | ContentView | Header content wrapper |
| divider | [Divider](https://community.rockrms.com/developer/mobile-docs/essentials/controls/content-controls/divider) | Applies to all dividers |
| notes | [Text Editor](https://community.rockrms.com/developer/mobile-docs/essentials/controls/form-fields/text-editor) | The conditional notes editor |
| save-button | [Button](https://community.rockrms.com/developer/mobile-docs/styling/legacy/styling-components/button) | The conditional save button |

![](https://community.rockrms.com/GetImage.ashx?Id=71504)

---

## Group Edit {#group-edit}

This is a block that allows you to edit specific details and attributes about a particular group.

## Getting Content

Content is passed in through a page parameter, referenced as `GroupGuid`. There are quite a few examples of passing page parameters (also known as query parameters) lying around the documentation, and here is a great [example](https://community.rockrms.com/developer/mobile-docs/essentials/blocks/connection/connection-request-list#using-query-parameters).

### Page parameters

The parameters that this block looks for are as follows.

| Name | Type | Description |
| --- | --- | --- |
| GroupGuid | Guid | The guid of the group you wish to edit. |

## Block Configuration

### Show Header

This setting determines whether a "Group Details" header should be displayed.

### Limiting Group Configuration

Each configurable facet of the group will have two options, one to show the field and the other to enable the ability to edit the field.

![](https://community.rockrms.com/GetImage.ashx?Id=67260)

These are the configurable fields. For instance, if I wanted to show the group name and disable the ability to edit it, I could leave `Show Group Name` checked, but uncheck `Enable Group Name Edit`. It's also important to keep in mind that if a field isn't shown, it isn't possible to edit it, so that value will be irrelevant.

### Attribute Category

This should be set to a category of group attributes that you would like to show and be editable.

### Group Detail Page

This setting should be set to a page that you wish to [replace the current one with](https://community.rockrms.com/developer/mobile-docs/essentials/commands/navigation-commands#replacepage) when the "cancel" button is pressed. It takes the `GroupGuid` and passes it as a page parameter.

### Styling

There’s no styling X-Ray available.

---

## Group Finder {#group-finder}

M3.0 C13.0

This block provides the ability to search for groups based on campus, day of week, time of day, location, and custom attributes.

Note

The returned groups matching the filters do not account for user security. Use the HasRightsToLava filter to check view permissions for each group as needed.

## Query Strings

| Value | Description |
| --- | --- |
| LoadResults | true – Bypasses the filter and shows results immediately. |

## Template

The Deploy button is not required for content changes.

### Merge Fields

| Property | Type | Description |
| --- | --- | --- |
| DetailPage | Guid | The page GUID defined in the block settings. |
| Groups | List | A collection of Group objects. |
| Distances | List<groupId, distance\> | A collection of key value pairs with the groupId and distance in miles. |

### Settings

| Property | Type | Description |
| --- | --- | --- |
| Campus Context Enabled | bool | When enabled and Campus context is set by the [Campus Context Picker](https://community.rockrms.com/developer/mobile-docs/essentials/controls/content-controls/campus-context-picker) or [Set Context command](https://community.rockrms.com/developer/mobile-docs/essentials/commands/utility-commands#setcontext), the campus value will be selected automatically. |
| Show Location Filter | bool | When enabled, provides a selection between the person's Home address or a new address. An OS permission will appear to request location access.      Note that groups without a location will **not** be returned in the results when the location filter is enabled. |

## Styles

| Class | Type |
| --- | --- |
| .group-finder-filter | [StackLayout](https://docs.microsoft.com/en-us/dotnet/api/xamarin.forms.stacklayout?view=xamarin-forms) |
| .campus-picker | [Picker](https://community.rockrms.com/developer/mobile-docs/essentials/controls/form-fields/picker) |
| .day-of-week-picker | [Picker](https://community.rockrms.com/developer/mobile-docs/essentials/controls/form-fields/picker) |
| .time-of-day-picker | [Picker](https://community.rockrms.com/developer/mobile-docs/essentials/controls/form-fields/picker) |
| .group-finder-search-button | [Button](https://docs.microsoft.com/en-us/dotnet/api/xamarin.forms.button?view=xamarin-forms) |
