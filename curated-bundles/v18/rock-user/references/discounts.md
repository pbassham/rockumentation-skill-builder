---
description: "Use when users ask about discount rules, registration discounts, or how multiple discounts interact in Rock event registration"
source: "https://community.rockrms.com/documentation/bookcontent/29/365"
sourceLabel: "Event & Calendar Guide"
---
> **Path:** Event & Calendar Guide > Discounts

People often ask, "Do you have quantity or early bird discounts?" Well, Rock has something better. Rock's discount feature gives you a ton of flexibility to create discounts customized for your organization's needs. Want to provide a discount code? You can do that. Want to offer a discount for families registering more than three children? You can do that, too. How about a unique combination of both of these only for a limited time *and* you want the discount to be automatically applied? Yep, Rock's got you covered. Let's take a closer look at these options and how they work.

Discounts are listed in the *Discounts* section of the Registration Template. Here you can add, edit and delete discounts.

![](https://rockrms.blob.core.windows.net/documentation/Books/29/1.17.0/images/registration-discounts-v13.png)

Discount List

Click the button to create a new discount.

![](https://rockrms.blob.core.windows.net/documentation/Books/29/1.17.0/images/registration-discounts-dialog.png)

Discount Editor

All of the discount options are available in the *Discount Code* screen. From here you can create whatever combination of criteria you want for each discount.

# One Discount Per Registration Instance

Keep in mind that only one discount can be applied to each registration instance. If multiple discounts are set up to automatically apply, and if the registration qualifies for all of them, then the first discount listed in the template will be applied. When a discount is automatically applied, it can be manually replaced with a single other code.

OK, let's take a closer look at each of the discount options.

# Discount Codes

Discount codes allow you to give individuals a code to reduce the amount of their registration. This discount can be in the form of a percentage of costs/fees or a fixed amount. To create a discount code, enter a percentage or amount in the *Discount Type* and *Discount Percentage* fields of the *Discount Code* screen. Individuals can then apply the discount code at the time of registration, or after registering if they haven’t yet paid in full (see [Post-Registration Discount Codes](#postregistrationdiscountcodes)).

# Quantity Discounts

Quantity discounts allow you to create a discount for multiple registrations in the same transaction, such as a group registration. To create this type of discount, enter the minimum and maximum number of registrants in the *Discount Code* screen. When Rock processes the registration, if the number of registrants entered falls within the parameters entered, the discount is applied.

# Maximum Registrants

The number of Maximum Registrants reflects how many people within the registration can have the discount applied. If you have three registrants being signed up, and if Maximum Registrants is set to '1', then the discount will only apply to one of the three registrants. If you want to have a group or family pay only the price of a single person, set the Maximum Registrants to be one less than Minimum Registrants, and make sure the discount covers all the costs and fees of only a single person.

# Early Bird Discounts

Early bird discounts apply a discount for registrations that fall within a certain date range. That date range is entered in the *Effective Dates* fields of the *Discount Code* screen. When Rock processes the registration, if the date of registration falls within the entered timeframe, the discount is applied.

# Customized Discounts

You can create your own, unique discount by combining any of these discount types. Just know that when the registration is processed, all of the criteria you enter has to be met for the discount to be applied. So, that super complicated option we mentioned above? Maybe not the best practice.

# Automatic Discounts

The *Discount Code* screen includes an option to automatically apply the discount. If this option is selected, Rock will automatically check the registrations against the discount codes available and apply the first discount that matches the criteria. The order the codes are listed in the Registration Template is the order in which Rock applies them. A registrant can override any automatic discount with a discount code entered manually during the registration process.

# Maximum Usage

You can limit the number of times a discount code can be used by entering a value in the *Maximum Usage* field. For example, you might use this to grant a discount to the first 100 people who register. Leave this field blank if you want the discount code to be available for use indefinitely.

# Viewing and Reporting Used Discounts

Once discounts for a particular registration event are used, they're recorded under the *Discounts* tab in the *Registration Instance* screen. You can filter these records by:

- **Discount Date Range** - Displays all of the discount codes used during the dates specified.
- **Discount Code** - Displays the discounts matching the code selected from the dropdown menu.
- **Code Search** - Displays all discount codes that match the search criteria, whether it be a word, partial word or number. For example, if you search for "ly", Rock will display any codes with names that contain "ly". If you create discount codes with specific prefixes, such as numbers or abbreviations, the search function can help you quickly locate all of the codes matching a particular prefix. Note: If you select a discount code from the dropdown menu, the discount code search option will be disabled.

The amounts displayed in the *Total Results* section of the screen are based on the discount codes displayed. If you filter the discounts, the totals will be recalculated and updated based on the filter parameters.

