---
description: "Use when managing benevolence requests, adding financial assistance documents, or creating business records in Rock RMS workflows"
source: "https://community.rockrms.com/WorkflowActions"
sourceLabel: Workflow Actions
---
> **Path:** Workflow Actions Documentation > Action Categories > Finance

# Finance

All the details for the finance category.

 # Benevolence Request Add

Show Details

v6.0

Adds a new benevolence request to the system.

This action will create a new benevolence request with options that allow you to complete many of the optional fields. The initial add does not allow you to set custom attributes or add documents, but there are actions you can use to complete those function once the request has been saved. The action will return the benevolence request making it easy to complete those follow-up steps. ![](https://community.rockrms.com/GetImage.ashx?Guid=75c88106-d8e4-4cde-8fac-ab68f6b338d3)  
**Additional Details**

Added the Benevolence Type required setting.v13.6

 # Benevolence Request Add Document

Show Details

v6.0

Adds a document to the provided benevolence request.

Adds a document to the provided benevolence request. ![](https://community.rockrms.com/GetImage.ashx?Guid=b60429d1-dbb6-4fff-819e-7c459582c9fa)  
**Additional Details**

If no document is provided the action will continue on its way. This allows you to use the action without a bunch of action filters if the document is optional.

 # Benevolence Request Set Attribute

Show Details

v6.0

Sets the provided benevolence request attribute to the value provided.

Sets the provided benevolence request attribute to the value provided. ![](https://community.rockrms.com/GetImage.ashx?Guid=ce4ceed5-6698-45cd-91d7-26bde5cff477)  
**Additional Details**

The 'Use Blank Value' will determine what to do with the value you provide when it's blank. The default is to use it which will have the effect of blanking out any existing value.

 # Benevolence Result Add

Show Details

v7.0

Adds a benevolence result

This action will create a benevolence result linked to the benevolence request entity stored in an attribute. The result type must be stored in a `Defined Value` attribute, and the Result Amount must be stored in another attribute before you can use this action. You may optionally provide the "Next Steps" and "Result Details" attributes, as well as the "Result Summary" property as either a text string (which can be generated using Lava), or directly from the values other attributes. ![](https://community.rockrms.com/GetImage.ashx?Guid=369fe003-9ce5-4482-93ba-4e24495ece7b)

 # Business From Attributes

Show Details

v13.7

Creates (or updates) a business from the given data.

Sets an attribute to a business based on a set of fields with the ability to also link a person to the business. ![](https://community.rockrms.com/GetImage.ashx?Guid=26f52bd1-7229-4342-90c6-a767bd603310)  
**Additional Details**

If the first 12 characters of the given business name and any one of the following match, it will match that business: Phone, Email, Street Line 1

If a record is matched it will be updated with the information provided from the workflow action.

The created/matched business will be put into the optional **Business** field attribute.

 # Create Contribution Statement

Show Details

v13.7

Creates and uploads a contribution statement for a given person.

Creates and uploads a PDF contribution statement for a given person. You must either provide a 'Start Date' or an attribute that has the start date to use for generating the statements. ![](https://community.rockrms.com/GetImage.ashx?Guid=33a62cde-5ee3-4165-a51d-40798d36003d)  
**Additional Details**

The statements will automatically be uploaded to the selected person record in the same way that the Statement Generator handles the files. The PDF will also be saved into the optional 'Document' attribute. This is handy if you want to use it in a subsequent workflow action.

The Document Person Key you provide will be what is shown to indivduals to describe what period the statement is for. In most cases this should be the year.

 # Get Saved Account

Show Details

v9.0

Sets an attribute with the default or first saved account for the given person and gateway.

Sets an attribute, which can be used elsewhere in the workflow, with the person's default account. If the person has no default, then the first saved account for the given person and given gateway will be used. ![](https://community.rockrms.com/GetImage.ashx?Guid=fd5e2beb-280c-439a-af59-f90a84aea4b1)

 # Payment Entry

Show Details

17.1

Collects a payment from a person using a financial gateway.

The Payment Entry action collects a payment using a financial gateway and records the transaction in a Workflow Attribute.

To utilize this Workflow Action, you must use the new **Workflow Entry (Obsidian)** block (released in 17.1).

![](https://community.rockrms.com/GetImage.ashx?Guid=44c6f64a-8248-427d-95d1-1e1778834b0a)  
**Additional Details**

Here's an overview of the settings available for this action:

- **Financial Gateway:** Select which gateway to charge with.
- **Authorized Person Attribute:** Workflow attribute that contains the person making the payment. If left blank, the current person will be used.
- **Amount / Amount Attribute:** Set the amount to charge manually, or through an attribute.
- **Account Attribute:** Workflow attribute that contains the target financial account.
- **Transaction Type:** Choose which transaction type this payment should be recorded under such as Contribution or Event Registration.
- **Transaction Source:** Designate the transaction source for classification and reporting.
- **Payment Information Instructions:** Instructions for the payment entry step. This will be displayed to the individual to ensure they understand why they're being asked to enter payment information. A `"PaymentConfiguration"` merge field will have these properties: `Amount`, `Entity`, `AmountEntryLabel`, `TransactionType`, and `TransactionSummary`.
- **Success Message:** The message shown after a successful transaction. Lava merge fields like `{{ TransactionDetail.Amount }}` and `{{ Account.PublicName }}` can be used to personalize the message.
- **Result Transaction Attribute:** An optional attribute to set to the result transaction.

**Campus:**

- **Show Campus Picker:** Choose whether to allow the individual to select a campus during the payment process.
- **Campus Types:** Specify which types of campuses (Online, Physical) are shown if campus selection is enabled.
- **Campus Statuses:** Control visibility based on campus status (Open, Closed, Pending).

**Captions:**

- **Amount Entry Label / Amount Entry Label Attribute:** The label to use on the amount entry field. ‘Amount’ will be used if none is configured.
- **Save Account Title:** The text to display as heading of section for saving payment information.
- **Confirm Payment Button Text / Confirm Payment Button Text Attribute:** The text to display on the payment button. Defaults to 'Confirm Payment' if left blank. Note that this only affects UI.

**Payment/Transaction:**

- **Enable ACH:** Enabling this will *also* control which type of Saved Accounts can be used during the payment process. The payment gateway must still be configured to support ACH.
- **Enable Credit Card:** Enabling this will *also* control which type of Saved Accounts can be used during the payment process. The payment gateway must still be configured to support Credit Card.
- **Entity Type:** The EntityType associated to the Transaction’s detail record (such as GroupMember, Registration, etc.)
- **Entity Attribute:** The Entity associated to the Transaction’s detail record. (such as a group member Id, a registration Id, etc.)
- **Transaction Summary / Transaction Summary Attribute:** Optional summary text to record onto the FinancialTransactionDetail record. `{{ Lava }}` merge fields are supported.
- **Batch Prefix:** The batch prefix name to use when creating a new batch. `{{ Lava }}` merge fields are supported.

 # Process Payment

Show Details

v9.0

Processes a payment from a saved account.

Processes a payment from a saved account. The saved account to use can optionally be set using the Get Saved Account action. ![](https://community.rockrms.com/GetImage.ashx?Guid=7a01cc5b-28d7-4af3-996b-4731c64ce9ea)

