---
description: "Use when configuring the Utility Payment Entry block for online giving, scheduled transactions, fundraising, or other donation collection purposes in Rock RMS"
source: "https://community.rockrms.com/documentation/bookcontent/15/367"
sourceLabel: Rock Solid Finances
---
> **Path:** Rock Solid Finances > Advanced Utility Payment Entry Block Settings

Advanced Utility Payment Entry Block Settings

This section may get a bit advanced. Not that you can't handle advanced; we just want to give you a heads up that we're going to be talking about detailed settings and their uses. It isn't rocket science, but it might be a little challenging.

# Transaction Entry Block

The Utility Payment Entry block is the eventual replacement for the Transaction Entry block. The documentation for the Transaction Entry block can still be [found here](https://community.rockrms.com/documentation/bookcontent/15/261#advancedtransactionentryblocksettings) if needed during this transition period.

The Utility Payment Entry block is one of the most useful and versatile blocks available in Rock. You can set it up on any page of your site and use it for any number of purposes: online giving, on-site giving, scheduled transactions, fundraising, text giving...and so on. It's the Swiss Army Knife of transaction entry features.

![Utility Payment Entry](https://rockrms.blob.core.windows.net/documentation/Books/15/1.17.0/images/utility-payment-entry-v15.png)

Utility Payment Entry

The reason this block can be used in so many ways is because of its settings. There are two configuration tabs in the Utility Payment Entry block: Basic Settings and Advanced Settings. Let's take a look at the options available on both.

# Basic Settings Tab

The Basic Settings tab is where you'll likely do most configuring.

![Utility Payment Entry Block Settings - 1](https://rockrms.blob.core.windows.net/documentation/Books/15/1.17.0/images/utility-payment-entry-block-settings-1-v14.png)

Utility Payment Entry Block Settings - 1

![Utility Payment Entry Block Settings - 2](https://rockrms.blob.core.windows.net/documentation/Books/15/1.17.0/images/utility-payment-entry-block-settings-2-v14.png)

Utility Payment Entry Block Settings - 2

![Utility Payment Entry Block Settings - 3](https://rockrms.blob.core.windows.net/documentation/Books/15/1.17.0/images/Utility-Payment-Entry-Block -Settings-3.png)

Utility Payment Entry Block Settings - 3

![Utility Payment Entry Block Settings - 4](https://rockrms.blob.core.windows.net/documentation/Books/15/1.17.0/images/utility-payment-entry-block-settings-4-v14.png)

Utility Payment Entry Block Settings - 4

![Utility Payment Entry Block Settings - 5](https://rockrms.blob.core.windows.net/documentation/Books/15/1.17.0/images/utility-payment-entry-block-settings-5-v14.png)

Utility Payment Entry Block Settings - 5

# Advanced Settings Tab

The Utility Payment Entry block has additional settings under Advanced Settings.

![Utility Payment Entry Block Settings - 6](https://rockrms.blob.core.windows.net/documentation/Books/15/1.17.0/images/utility-payment-entry-block-settings-6-v14.png)

Utility Payment Entry Block Settings - 6

![Utility Payment Entry Block Settings - 7](https://rockrms.blob.core.windows.net/documentation/Books/15/1.17.0/images/utility-payment-entry-block-settings-7-v14.png)

Utility Payment Entry Block Settings - 7

# Account Selection Behavior

The Utility Payment Entry block allows people to enter payment information for selected accounts. The account selection behavior for the block is primarily controlled by four block settings:

1. **Accounts:** The *Accounts* block setting lets you restrict the block to only being used with specified accounts.
2. **Additional Accounts:** The *Additional Accounts* setting allows you to make payments for active public accounts not listed under "Accounts" above.
3. **Enable Account Hierarchy for Additional Accounts:** Financial Accounts can be nested and, when enabled, this will group accounts under their parents when looking at the Additional Accounts dropdown list. Those that are top-level accounts will be the root of the dropdown. For those that have parents, their parent account will be in the dropdown. What this means is that:
	1. If an account called "Special Fund" is at the root of the account tree it will be at the root of the dropdown.
		2. If an account called "Glendale Campus" exists under a Parent account called "General Fund" ("General Fund \> Glendale Campus") Glendale Campus will be shown in the dropdown under a parent item of "General Fund".
		3. If there is a 3-level nested account hierarchy like "Events \> Youth Events \> Summer Camp", Summer Camp will be shown in the dropdown under the parent item of "Youth Events". The "Events" grandparent will not be displayed.
4. **Use Account Campus Mapping Logic:** When enabled, this will match payments to accounts based on the associated campus. The account mapping is determined as follows:
1. If the selected account is not associated with a campus, the selected account will be the first matching active child account that is associated with the selected campus.
	2. If the selected account is not associated with a campus, but there are no active child accounts for the selected campus, the parent account (the one you see) will be returned.
	3. If the selected account is associated with a campus, that account will be returned regardless of campus selection (and it won't use the child account logic).

Note that the *Use Account Campus Mapping Logic* setting is not compatible with the *Enable Account Hierarchy for Additional Accounts* setting, since *Use Account Campus Mapping Logic* automatically picks the best fit account based on the associated campus and *Enable Account Hierarchy for Additional Accounts* allows you to pick a specific account from a hierarchy of accounts. Use one or the other, but not both.

