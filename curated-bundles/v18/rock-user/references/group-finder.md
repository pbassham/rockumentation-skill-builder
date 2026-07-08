---
description: Use when visitors need to search for and register with public groups by meeting day or study topic
source: "https://community.rockrms.com/documentation/bookcontent/7/361"
sourceLabel: Rock Your Groups
---
> **Path:** Rock Your Groups > Group Finder

Group Finder

The group finder is another very powerful block that allows your website visitors to search for a group and register quickly. The group finder has been configured on the external website under Connect \> Small Groups.

If configured in the block settings, it allows for searching by the day of the week that the group meets and the study topic. Selecting your criteria and clicking Search returns all of the groups that match those criteria. From there you can choose to register for a group.

# Public Groups

Only groups that are marked as Public can be viewed in the group finder. You can change the public setting by editing the group.

![Group Finder](https://rockrms.blob.core.windows.net/documentation/Books/7/1.17.0/images/group-finder-v12.png)

Group Finder

While this default configuration should work for many organizations, there are a number of ways you can alter the experience by modifying the settings of this block. Let's take a look at what's possible in the block's settings:

![Group Finder Block Settings](https://rockrms.blob.core.windows.net/documentation/Books/7/1.17.0/images/group-finder-block-settings-v13.png)

Group Finder Block Settings

# Another Way to Use the Group Finder

If you pass a 'PersonGuid' through the page's query string you can use the group finder to register that person for a group. You can use this trick to say link from a group badge on the person profile page if they are not already in a group. This allows a staff person to quickly register them for a group without a lot of clicking around.

Consider using the [Group Member Add From URL](#groupmemberaddfromurl) block with this feature.

# Group Registration

Registering for a group is a simple process using Rock's Group Registration block. Out-of-the-box this block will ask for basic contact information for the individual and their spouse. By adjusting the block settings, you can customize this block in several different ways. Below we'll walk through some of the common settings but be sure to review all of this block's settings to ensure it's meeting your organization's needs.

- **Mode:** There are three entry modes for the registration form.
	- **Simple:** This mode only asks for the individual's first name, last name and email address.
		- **Full:** This mode additionally asks for more contact information including home phone, cell phone and address.
		- **Full With Spouse:** This mode is identical to the normal *Full* mode but adds the spouse's first name, last name, cell phone and email.
  
- **Group Member Status:** This setting determines the group member status that will be used when they are added to the group. Options include Pending, Active or Inactive.
  
- **Connection Status:** The registration form will attempt to find a matching record in the database using the first name, last name and email. If a record cannot be found, a new record will be created in the database. When that occurs, this will be the connection status that is used for these new records.
  
- **Record Status:** This represents the record status that will be used for new records. It's best to leave this as *Pending* so individuals on your data integrity team can manually review them for possible duplicates and merge the records if needed.
  
- **Workflow:** This option allows you to launch a workflow after the registration. The group member will be attached to the workflow as the Entity.
  
- **Lava Template:** This is a Lava template that will be applied to the top of the registration block. This allows you to customize the experience for the individual.
  
- **Result Lava Template:** This Lava template is used to craft a response message after the registration is completed.
  
- **Result Page:** You can optionally send the individual to a new page after the registration is processed.
  
- **Show SMS Opt-in:** Allows the person to choose whether they would like to receive text messages on their mobile number. The Options for this field may be hidden, shown for first adult or shown for all adults.

