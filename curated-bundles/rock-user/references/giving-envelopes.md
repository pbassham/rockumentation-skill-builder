---
description: Use when setting up or managing giving envelope numbers for church members in Rock
source: "https://community.rockrms.com/documentation/bookcontent/15/367"
sourceLabel: Rock Solid Finances
---
> **Path:** Rock Solid Finances > Giving Envelopes

Giving Envelopes

Does your church use envelopes for giving? You can use Rock to generate envelope numbers, search for members by envelope number, and use envelope numbers to help with matching transactions. Let’s look at how to set up Rock to do this.

# Enabling the Envelope Number Global Attribute

![Enable Envelope Number Global Attribute](https://rockrms.blob.core.windows.net/documentation/Books/15/1.18.0/images/envelope-number-global-attribute-v18.png)

Envelope Number Global Attribute

Envelope numbers are a global attribute in Rock, which means switching them on in one place makes them available across the system. To turn the envelope numbers option on, go to Admin Tools \> Settings \> Global Attributes. Select *Enable Giving Envelope Number* from the attributes list and choose 'Yes' from the dropdown menu. Click Save. Rock is now set to display giving envelope options.

# Assigning Envelope Numbers to Members

Envelope numbers are assigned in the Edit Person screen, accessed from the Person Profile. Simply go to a person’s profile and click the button in the bio block.

![Person Profile Envelope Number](https://rockrms.blob.core.windows.net/documentation/Books/15/1.18.0/images/person-profile-envelope-number-v18.png)

Envelope Number Field on Person Profile Screen

The envelope number field is located in the Advanced Settings section at the bottom of the Edit Person screen. You can enter a person’s existing envelope number into the Envelope # field, or you can allow Rock to assign a new envelope number by clicking the Generate Envelope # button. When finished, click Save. The envelope number is now associated with that person.

![Person Profile Envelope Number Alert](https://rockrms.blob.core.windows.net/documentation/Books/15/1.18.0/images/person-profile-envelope-number-alert-v18.png)

Envelope Number Alert

If you enter a number that is already assigned to someone else, Rock will display an alert asking if you want to proceed. There may be times when you’ll want two or more people to have the same number, such as when assigning numbers to multiple members of the same family. Click OK to continue.

# Searching for Envelope Numbers

Once envelope numbers have been assigned to members, you can quickly view them using the Directory search function (People \> Directory). To do this, you first need to enable envelope numbers in the Person Directory block settings.

![Directory Search Block Settings](https://rockrms.blob.core.windows.net/documentation/Books/15/1.18.0/images/directory-search-block-settings-envelope-number-v13.png)

Person Directory Block Settings

Locate the Show Envelope Number field in the Person Directory block settings and select 'Yes' from the dropdown menu. Click Save. Now envelope numbers will be included in the information returned for directory searches.

![Directory Search with Envelope Number Displayed](https://rockrms.blob.core.windows.net/documentation/Books/15/1.18.0/images/directory-search-envelope-number-display-v18.png)

Directory Search with Envelope Number Displayed

Keeping this functionality in one search screen, rather than accessing individual profile pages, can save you or your volunteers a lot of time.

Now that you have envelope numbers set up, let’s look at how they can be helpful when matching transactions.

# Transaction Matching by Envelope Number

When matching transactions, you can search for members by their assigned envelope numbers. Simply enter the envelope number into the Envelope # field and click Find. The name and information of the individual associated with that number will be displayed.

![Transaction Matching with Envelope Numbers](https://rockrms.blob.core.windows.net/documentation/Books/15/1.18.0/images/transaction-matching-envelope-number-result-v18.png)

Matching Transactions with Envelope Numbers

If the number entered isn’t found, Rock will display an alert. If more than one person has been assigned that number, you’ll be prompted to choose which person you wish to associate with the transaction.

![Multiple Envelope Numbers Alert](https://rockrms.blob.core.windows.net/documentation/Books/15/1.18.0/images/transaction-matching-envelope-search-multiple-v18.png)

Multiple Envelope Numbers Alert Message

