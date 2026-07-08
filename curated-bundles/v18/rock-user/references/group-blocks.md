---
description: "Use when you need to understand how to display, filter, or configure group listings, hierarchies, or maps in Rock RMS"
source: "https://community.rockrms.com/documentation/bookcontent/7/361"
sourceLabel: Rock Your Groups
---
> **Path:** Rock Your Groups > Group Blocks

Group Blocks

By now you've seen the power of groups in Rock. Hopefully, you're starting to see all the different ways they can bend and flex to meet the demands of your organization. The real power is when you break free to see *what is* and start to comprehend what *could be*. While we've attempted to *pre-configure* groups with some standard best practices, you shouldn't limit yourself to what is configured out of the box.

The best way to see what's possible is to understand what group blocks are available in Rock. Start thinking of these blocks as your own box of Legos®. How you arrange and build with these blocks is limited only by your imagination. If you're unfamiliar with blocks and how to add them to a page, take a minute and read about them in the [Designing and Building Websites Using Rock](https://community.rockrms.com/documentation/bookcontent/14#addingcontenttorock) guide.

# Group List

As its name suggests, the *Group List* block lists all groups that match a specific filter. The power of this block lies within its block settings. They allow you to:

- **Include Groups Of Type:** Specify which group types to include in the list.
  
- **Exclude Groups Of Type:** Specify which group types not to show in the list.
  
- **Detail Page:** The page you would like to navigate to when someone selects a group from the list.
  
- **Limit to Security Groups:** Remember that security groups are a bit special. While there is a group type for security groups, any specific group can be configured to act as a security group. This setting shows groups that meet any of these criteria.
  
- **Display Filter:** Determines if the filter panel should be displayed above the list.
  
- **Display XYZ Column:** This block also has several block settings to hide or display columns for displaying group type, group description, active status, group member count and system status.

Below is an image of a sample group list.

![](https://rockrms.blob.core.windows.net/documentation/Books/7/1.18.0/images/groupblock-grouplist-v18.png)

Group List Block

# Group Tree View

The *Group Tree View* block is very similar in configuration to the *Group List* block except that it displays the groups in a hierarchical tree view. Below is a sample of what this block would look like.

![](https://rockrms.blob.core.windows.net/documentation/Books/7/1.18.0/images/groupblock-grouptreeview-v18.png)

Group Tree View Block

# Group Details / Group Member List / Group Member Details

While these are three different blocks, they are usually used together to fully display the contents of a group with the ability to edit.

![](https://rockrms.blob.core.windows.net/documentation/Books/7/1.18.0/images/groupblock-groupdetails-memberlist-v18.png)

Group Details & Member List Blocks

# Group Type Map

The *Group Type Map* block maps the location of every group of a specified type. This is different from the [Group Map](#groupmaps), which shows members of a single group. While not included on a page out of the box, the Group Type Map is a very powerful block for mapping all of your small groups. Small organizations could even use it to map all the families in the database (remember families are groups too). Below is a sample of this block in action.

![](https://rockrms.blob.core.windows.net/documentation/Books/7/1.18.0/images/group-type-map-block-v18.png)

Group Type Map Block

# Group Member Add From URL

Say what? OK, this is easy... this block when passed a PersonGuid and GroupId through the query string will add the person to the group and display a Lava template of your design. This is very useful in crafting various group registration scenarios. To get the juices flowing think about all the things you could do with this using the *Dynamic Data* and *Group Finder* blocks. There you go!

![](https://rockrms.blob.core.windows.net/documentation/Books/7/1.18.0/images/group-member-add-from-url-v18.png)

Add Group Member From URL

# Group Member Remove From URL

This block is just like the Group Member Add From URL block - but the opposite. It takes a PersonGuid and GroupId through the query string and will remove the person from the group and display a Lava template of your design. This allows you even more flexibility in creating group registration situations. Alright!

# Group Simple Register

This block is another block that's handy for registration scenarios. It provides a simple form that accepts a first name, last name, and email address, registers the person to a group, and then forwards them on to a confirmation page. This block is most useful when it's used on an external facing site as a simple first point of contact but is flexible enough for many other scenarios!

![](https://rockrms.blob.core.windows.net/documentation/Books/7/1.17.0/images/groupblock-simple-register-block-v13.png)

Simple Register Block

# Group Simple Register Confirm

This block is designed to pair with the Group Simple Register block as a confirmation page. When a user is redirected to this page it provides either a success or a failure message. It's that simple!

# Group Registration

This block is the big brother of the Simple Register block. This block takes a GroupId as a query parameter for context and allows you to do a few neat things like fire off a workflow when a user registers and use Lava options to format the registration form. It also has a full mode that takes down address details and phone details and a full with spouse -- which does exactly what you might expect. Use this mighty block when you want to get more than your standard information about a person or when you want to use a specific workflow process for your registrants.

![](https://rockrms.blob.core.windows.net/documentation/Books/7/1.17.0/images/groupblock-registration-block.png)

Group Registration Block

# Group Map

The *Group Map* block maps the members of a specific group that is passed through the query string (aka passed in through the address of the page http://server.com/page?GroupId=12). While this block isn't too powerful on its own, it can be very helpful when used in conjunction with other blocks like the *Dynamic Data* block. Below is a sample of what this block looks like with a sample group.

![](https://rockrms.blob.core.windows.net/documentation/Books/7/1.18.0/images/groupblock-groupmap-with-connect-statuses-mockup-v18.png)

Group Map Block

You'll notice two sets of color-coded labels near the top of this block. Clicking these will toggle the display of groups and families on the map. Below is a description of how and when these label toggles will appear.

**Group / Group Member Labels** (top left)

- If the selected group has a valid geopoint, or geofence location, that group's name will be displayed as a label in the upper left which can be used to toggle the display of the group. The group will be displayed on the map either as a marker or a polygon depending on whether the selected group had a geopoint or geofence. The color of the marker or polygon is determined by the first color specified in the *Colors* attribute of the selected mapstyle defined value. Note: this option will not appear if the selected group does not have a geopoint or geofence defined.
  
- A *Groups* label will be displayed if the selected group has any child groups with a valid geopoint or geofence location. The child groups may also be either a marker or a polygon. The color of markers is determined by the second color specified in the *Colors* attribute of the selected mapstyle defined value. The color of polygons is determined by the *Polygon Colors* block setting.
  
- A *Group Members* label will be displayed if the selected group has any members with a valid geopoint location. Clicking the label will toggle the display on the map of those members. Note, if the selected group is displayed as a polygon, these members may or may not be within the boundaries of the polygon. The color of the markers is determined by the third color specified in the *Colors* attribute of the selected mapstyle defined value.

**Connection Status Labels** (top right)

- If the selected group has a geofence location and is displayed as a polygon on the map, then the block will also display a list of *Connection status* labels to toggle the display of families whose locations fall within the boundaries of that polygon.
  
- The connection statuses that will be included as toggle options are determined by the Connection Status Defined Values. Only those defined values that have a value specified in the *Color* attribute will be displayed. The color value is also used to determine the color of the markers.
  
- Only families with at least one active record will be included.
  
- If family members have different connection statuses, they will be ordered by the connection status defined value order, and the first connection status found will be used for the family. For example, if a family has a member and a visitor, the family will be displayed when the *Member* label is selected.

