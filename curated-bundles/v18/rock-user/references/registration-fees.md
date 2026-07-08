---
description: "Use when users need to configure registration fees, understand fee types, or set up required vs optional fees for events"
source: "https://community.rockrms.com/documentation/bookcontent/29/365"
sourceLabel: "Event & Calendar Guide"
---
> **Path:** Event & Calendar Guide > Registration Fees

Registration Fees

We get it - events are tricky and often come with odd requirements for additional fees. We've tried to think of as many combinations as possible when creating the features here, so we have a lot to cover.

# Fee Types

Below is a chart of the various types of fees that are available. You can use any combination of these to create the fee structure you need for each registration event.

![Fee Types](https://rockrms.blob.core.windows.net/documentation/Books/29/1.17.0/images/fee-types.png)

Types of Fees

Now that we see what's possible, let's look at how to set up fees.

# Setting Up Fees

You can add, edit and delete fees in the *Fees* section of the Registration Template.

![](https://rockrms.blob.core.windows.net/documentation/Books/29/1.17.0/images/registration-fees-v13.png)

Fee List

Click the button to create a new fee.

![](https://rockrms.blob.core.windows.net/documentation/Books/29/1.17.0/images/registration-fees-dialog-v13.png)

Fee Editor

# Optional vs. Required Fees

Fees can be either optional or required. To designate a fee as required select the *Is Required* checkbox on the *Fee Editor* screen. Required fees are designated by a red dot on the event registration screens. If a registration is submitted with a missing required fee value, Rock will display a message asking the registrar to select a value before proceeding.

Here's a closer look at how Rock handles each of the fee types above when they are designated as required:

- **Single Option** - Rock automatically checks the box and disables it to prevent changes.
- **Single Option with Quantity** - Rock sets the minimum quantity to "1" and prevents it from being changed to less.
- **Multiple Options** - Rock creates the same dropdown list as an optional fee but displays a message if no value is selected.
- **Multiple Options with Quantity** - Because at least one option must have a value selected, Rock displays a warning if all options have a value of "0".
![](https://rockrms.blob.core.windows.net/documentation/Books/29/1.17.0/images/Required-limit-number-registration-fee.png)

Required Fees Options

Keeping the *Is Required* checkbox on the *Fee Editor* screen unchecked creates *Additional Options* in the registration.

![](https://rockrms.blob.core.windows.net/documentation/Books/29/1.17.0/images/optional-limit-number-registration-fee-v9.png)

Optional Fees Options

![](https://rockrms.blob.core.windows.net/documentation/Books/29/1.17.0/images/optional-number-registration-fee-v9.png)

Registering with Optional Fees

# Fee Reports

All of the fees for each registration are listed under the *Fees* tab on the *Registration Instance* screen. You can use the filter options to filter the information by date range, fee name, and/or one or more of the options that apply to that fee. (Note: because the options vary with each fee, the available filter options are only displayed once a particular fee name is selected.)

![Viewing Fees](https://rockrms.blob.core.windows.net/documentation/Books/29/1.18.0/images/registration-instance-fees-tab-v18.png)

Viewing Fees

To further help you track and work with fees, you also have the option of exporting fees to an Excel spreadsheet. To do this, click the button on the *Fees* tab on the *Registration Instance* screen.

