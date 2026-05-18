---
description: "Use when you need to understand financial account types, benevolence request statuses, credit card types, currency codes, or other defined types used in Rock's financial features"
source: "https://community.rockrms.com/documentation/bookcontent/15/367"
sourceLabel: Rock Solid Finances
---
> **Path:** Rock Solid Finances > Defined Types For Financial Features

Defined Types For Financial Features

There are several defined types used by the various financial features of Rock. Below we'll talk about each of them and tell you why they're important. See our [Rock Admin Hero Guide](https://community.rockrms.com/documentation/bookcontent/9#definedtypes) for more information on defined types in general. Defined types can be accessed under Admin Tools \> Settings \> Defined Types.

# Account Type

This groups or categorizes Accounts by their usage. It’s provided for you specifically to help with reporting and is not used by Rock for any specific purpose.

# Benevolence Request Status

Benevolence requests can have a status assigned to them, to indicate where they are in the process. Rock ships with three values (Pending, Approved, Denied) but you may wish to add others to reflect different stages in your benevolence process. For more information see the [Benevolence](#benevolence) chapter above.

# Benevolence Result Type

The *Benevolence Result Type* indicates the outcome of a benevolence request. Some values that ship with Rock include *Provided Financial Assistance*, *Referred to Counseling* or *Unable to Make Contact*. You may wish to add new values for different outcomes of a benevolence request. For more details see the [Benevolence](#benevolence) chapter above.

# Credit Card Type

This defined type determines which credit card types your organization will accept. Each card type also has several configuration options. These include:

- **Regular Expression Pattern:** This pattern helps Rock determine if a given card number matches this type of credit card. The default values should not be altered.
- **Batch Name Suffix:** Many times, accounting teams want online transactions to be placed in batches specific to the credit card types when they are downloaded from the payment gateways. The suffix is what helps group the cards into batches. If all the cards have the same suffix, they will all share a batch (default setting). If you'd like all the Visa transactions to be in their own batch, then you'd change the suffix to something like *Visa*.

# Currency Code

This defined type lists codes that reflect a given country and the type of currency used by that country. For instance, the code "USD" indicates "United States Dollars". It's unlikely that you would ever need to make changes or additions to this defined type. It's primarily used by the *Organization Currency Code* global attribute. For more information see our [Rock Admin Hero Guide](https://community.rockrms.com/documentation/bookcontent/9#currency).

# Currency Type

Determines the method (Cash, Check, Credit Card, etc.) a person used to make a financial transaction. Currency Type is used to help describe the payment source for a transaction and is also used in determining how batches are created.

# Non-Cash Asset Types

This defined type only applies to the Non-Cash Asset *Currency Type*. Rock ships with values for Property, Stocks and Bonds, Vehicles and Other. You can add your own values for other types of non-cash assets.

# Recurring Transaction Frequency

This defined type determines which frequency types you want to offer your guests. These options must be supported by your payment gateway to work, so don't add new ones and wonder why they don't show up.

# Refund Reason

This defined value is used to specify why a refund was granted. The values that ship with Rock should cover a variety of scenarios, but additional values can be added if needed.

# Transaction Source

This value helps determine where the transaction took place. This is helpful in reporting. Many of the transaction entry blocks allow you to pick this value, so by all means add additional items that make sense to your organization. For instance, if you run multiple websites with their own giving pages, you may want to make a new source type for each site. This will help you determine which is most effective in generating donations.

# Transaction Type

The Transaction Type helps describe the purpose of each transaction to Rock. For instance, all transactions of type 'Contribution' tell Rock that these are contributions and should be shown on [Contribution Statements](#contributionstatements). You should not create new types that replace the ones that come out of the box. You can, however, rename the existing ones. For instance, you could rename 'Contributions' to 'Offerings' if you prefer.

