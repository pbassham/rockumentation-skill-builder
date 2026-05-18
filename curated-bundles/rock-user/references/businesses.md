---
description: "Use when managing business records, business contacts, business giving settings, or viewing business contribution history in Rock"
source: "https://community.rockrms.com/documentation/bookcontent/15/367"
sourceLabel: Rock Solid Finances
---
> **Path:** Rock Solid Finances > Businesses

While Rock is all about managing people, there are some scenarios when financial transactions need to be managed for entities like businesses. Don't worry. Rock still has you covered. Businesses can be easily managed under Finance \> Businesses.

Managing business giving is also easy. Out of the box, Rock is set to allow business giving. When an individual gives as a business, both the individual and business information and giving history will appear in the Give Now and Giving History screens. If you don't want business giving available for your organization, simply disable this feature by selecting 'no' in the Enable Business Giving option in the Contributions block settings of the Give Now screen. For more information on Rock's business giving options, see the [Online Giving](#onlinegiving) section above.

![](https://rockrms.blob.core.windows.net/documentation/Books/15/1.18.0/images/business-list-v18.png)

Business List

From the business list you can add new businesses, or you can click on a business to edit its details.

![](https://rockrms.blob.core.windows.net/documentation/Books/15/1.18.0/images/business-detail-edit-v18.png)

Business Details

# Businesses Are People Too

Behind the scenes, businesses are actually stored as special types of person records. You'll find people and businesses have much in common. For instance, you can optionally include businesses as valid values for attributes of type Person.

# Business Contacts

While businesses will be the source of donations and gifts (financial transactions), there will most likely be an individual that links the business to your organization. Being able to manage these relationships is important.

Once a business is saved, you can add contacts to the business from the individuals stored within Rock. These relationships can be viewed on the *Business Detail* page and also on the *Known Relationships* section of the *Person Profile* page of the individual.

![](https://rockrms.blob.core.windows.net/documentation/Books/15/1.18.0/images/business-detail-showing-contacts-v18.png)

Business Details

![](https://rockrms.blob.core.windows.net/documentation/Books/15/1.18.0/images/business-known-relationship-person-profile-v18.png)

Person Detail Page

# Business Contributions

Just as you can view the giving information for a specific person, you can also view the giving information for a business. To do this, simply go to Finance \> Businesses and select the business name from the Business List. Rock will display all of the information and contribution history for that business, including yearly contribution statements. Financial transactions can also be entered from the Business Detail screen. Options include either a one-time gift or a new scheduled transaction.

![](https://rockrms.blob.core.windows.net/documentation/Books/15/1.18.0/images/business-detail-contributions-v18.png)

Contributions - Business Detail Page

# Scheduled Transactions for Businesses

Just as you can set up scheduled transactions for an individual, you can also set them up for a business. The process is the same, but rather than going to the contributions tab on a person's profile, you locate the business in the Businesses screen (Finances \> Businesses). From the Business Detail screen, you can either enter a one-time gift or set up a new scheduled transaction.

# Business Details

At the top of the *Business Detail* page is the Business Detail block. This block shows details about the business like the name and contact information and allows you to edit those details. It also has a few settings that you'll want to know about.

![Business Detail Block Settings](https://rockrms.blob.core.windows.net/documentation/Books/15/1.18.0/images/business-detail-block-settings-v18.png)

Business Detail Block Settings

# Converting a Person to a Business

While working with transactions, you may realize it would be best for Rock to consider a particular person a business or vice versa. Rock allows you to do this, though you'll rarely need to.

The process of converting a person to a business or a business to a person is simple. Access the *Business Conversion* screen by clicking the Convert Person/Business button at the top of the *Business List* screen, located at Finance \> Businesses.

![](https://rockrms.blob.core.windows.net/documentation/Books/15/1.18.0/images/business-convert-to-person-v18.png)

Business Conversion Screen

Select the person or business you want to convert, double check that the settings Rock will use to convert the person or business are correct and click Save.

Rock won't convert a person with family members to a business because it would result in those family member records being lost. To convert a person with family members to a business, first move the person to their own family.

# Merging Business Records

Just like you can [merge person records](https://community.rockrms.com/documentation/bookcontent/5#mergingrecords), you can also merge business records. Typically, this is only needed if a single business has more than one record in your system.

You can merge business records directly from Finance \> Businesses by selecting the businesses you want to merge and clicking the icon. You can also use the Smart Search to look for businesses with similar names.

![Select Businesses to Merge](https://rockrms.blob.core.windows.net/documentation/Books/15/1.18.0/images/businesses-list-block-for-merge-v18.png)

Select Businesses to Merge

If you've ever merged person records before, the page below will look very familiar. The first thing you'll want to do on this screen is pick the master record near the top. This is the record that the others will be merged into. Then, look at each row and ensure that the correct value is selected. If a value isn’t correct on the master record, you can choose to select the data from one of the other records. After you've selected the data to keep, just click Merge Records to complete the merge.

![Merge Businesses](https://rockrms.blob.core.windows.net/documentation/Books/15/1.18.0/images/businesses-merge-records-v18.png)

Merge Businesses

The address displayed at the top of the merge block is shown for reference only. After selecting the primary/master record, you'll still need to pick which address(es) to carry forward.


---

## Security For Finance {#security-for-finance}

> **Path:** Rock Solid Finances > Security For Finance

Security For Finance

The finance features in Rock have been secured to only give access to those who need it. The following security roles have been created with the permissions below.

# Finance Security Roles

**RSR - Finance Worker:** The finance user role is allowed to view and edit basic finance information like batches and transactions. They are not allowed to make modifications to the configuration of the finance features. For instance, they can't add a new account or edit an existing account. Similarly, this role can view businesses but cannot add new businesses or edit existing ones. This role does not have access to any benevolence features.

**RSR - Finance Administration:** The finance administrator role is allowed to view and edit all finance information including configuration information like accounts.

# Areas That Are Secured

The following areas of Rock have been secured to limit access to financial information. Only those in the finance roles will have access to the following:

- **Finance Admin Pages:** All the pages under *Finance* on the main navigation.
- **Person Details Contribution Tab:** The *Contributions* tab on the *Person Profile* page.
- **Rock Check Scanner:** Log-in to use this application.
- **Data View Filters:** Write data views that report on financial information. (Once the data views are created however, anyone who has permission to view the data view can run them. Be sure to secure the data views you create.)
- **Reports:** Creating reports. (Once the reports are created though, they can be run by anyone with view access to the report.)

# Additional Security Actions

The following can be secured separately from the permissions provided to Finance Workers and Administrators:

- **Financial Batch Entity:** Only those with security permission will be able to reopen or delete a batch.
- **Financial Transaction Entity:** Only those with security permission will be able to initiate a refund.
- **Filter by Person on Transaction List Block:** Only those with security permission will be able to filter transactions on the Transaction List block by person.

