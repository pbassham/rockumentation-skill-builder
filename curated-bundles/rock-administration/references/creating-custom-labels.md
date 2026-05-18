---
description: Use when user needs to create custom check-in labels using ZebraDesigner software or wants to understand Rock's label system and customization options
source: "https://community.rockrms.com/documentation/bookcontent/10/372"
sourceLabel: Checking-out Check-in
---
> **Path:** Checking-out Check-in > Creating Custom Labels

Creating Custom Labels

You can create your own labels for check-in with the free ZebraDesigner software. Once you've created the labels, you can upload them to Rock and apply them to various check-in areas. Let's walk through that process step-by-step.

# About System Labels

Rather than modifying the built-in labels that come with Rock, you'll want to create your own new ones. If you want to start with an existing one and "tweak" it, we'd suggest copying the code into a newly-created label. Rock updates can overwrite system labels that you've modified.

# Installing ZebraDesigner

ZebraDesigner is a WYSIWYG design tool for designing ZPL-formatted labels. While Zebra has several different versions of the software, the free ZebraDesigner has everything you'll need to make labels.

# Don't Go Pro

The 'Pro' version doesn’t have any additional features necessary for creating check-in labels. It only adds capabilities such as embedding RFID codes.

To install Zebra Designer, follow these steps:

1. Download the [ZebraDesigner Software](https://www.zebra.com/ap/en/support-downloads/software/printer-software/zebra-designer-3-downloads.html).
2. Run the setup, selecting all of the defaults.
3. Launch the application. The first time it's run, it will ask you to install a ZDesigner print driver. Select the Add Printer button to add this driver.
4. Walk through the wizard steps until you reach the Select Printer screen. Here, select the printer model you'll be working with.
5. Next, you'll need to pick the port where the printer is attached. While it's easier to select a printer connected through USB, connecting to one via IP would allow it to also be used from Rock. To connect it via IP, first get the IP address of the printer (press and hold the feed button until it flashes once, then release. A network configuration label should be printed that lists the printer’s IP.) Next, press the Add Port... button and type in the IP address in both the *Port Name* and *IP Address Field*. Finally, press OK. Select this new port and click Next.
6. Double check that the *Launch installation of Zebra Font Downloader Setup Wizard* is checked and click Next.
7. Walk through the setup wizard.
8. Congratulations! ZebraDesigner is now installed. You should now be able to open the program, select a default label and print it to the printer you configured.

For more information, read the [ZebraDesigner User Guide](https://www.zebra.com/ap/en/support-downloads/software/printer-software/zebra-designer-3-downloads.html#Ta-item-126cf29be9-tab&c=us&l=en).

# What's a Zero Font?

Before we dive into creating a label, we should talk about fonts. Zebra printers come with a plethora of built-in fonts, named A, B, C, Zero (0), T…wait. Zero? Interesting! The 0 font is unique, in that it's the only pre-installed font that is scalable, i.e., resizable. All the other fonts are fixed in size (well, they can be doubled, tripled, etc., but that doesn't sound like a useful plan). You'll want to use the 0 font for all normal text fields, since it can easily be scrunched (or blown up) to fit a text field (and yes, those are technical terms used in the font world.)

# Creating Your First Basic Label

Follow the steps below to create a simple check-in label. We'll talk about more advanced features in just a bit:

1. Open ZebraDesigner.
2. Choose to Create a new label (or create a new blank label by selecting File \> New from the menu).
	1. You can skip the *Select Stock* screen (this option is to select the type of sticker you are using, such as selecting a paper weight/finish for a regular printer.)
		2. On the *Page Size* screen, enter the size of your labels (often 4x2).
		3. Select the print orientation of your label on the *Label Layout* screen. (It might seem counter-intuitive, but you need to select the portrait orientation. Trust us, we went through stacks of labels figuring this out.)
		4. Make sure you *uncheck* Rotated, or the labels will print upside down.
		5. Finally, enter your label canvas height and width (4x2) and click Finish.
	You should now have a blank label.
3. Add a text field to the label:
	1. Click the Text button on the left side of the screen and click on the blank label in the approximate place you'd like to place the text object you're creating.
		2. A text wizard pops up; choose Fixed text.
		3. Enter your church name in the box.
		4. Make sure the font is set to Zebra 0 and sized to 18pt.
		5. Click Finish and your brand-new text object is placed on the label. You can move it around or resize it (a word to the wise: it's best to define the font size when you create the object. Resizing after you place the object can lead to undesirable effects later when you use the label in Rock).
4. Add an additional text field to the label with "NickName" as the text, set to 24 pt. and again, using the zero font.
5. Print your label to the printer to see the result.
6. Save your label as a .lbl (ZebraDesigner) file for future edits.
7. When you're satisfied with your creation, create the ZPL file (which will export with the extension of .prn) for the label by printing again, but choosing *Print to File* on the print screen. When you click Print, the save dialog will be displayed. Save the file, remembering the name you gave it (and where you put it).

# Add Your Label to Rock

Now we'll add our new label to Rock. Open the Rock *Check-in Label* page under Admin Tools \> Check-in \> Check-in Labels.

Click \[+\] to add a new check-in label. Once you upload the ZPL file (.prn) you should see the merge field list open, showing the text fields you created. Link the *NickName* merge code from your label to the *Nick Name* merge field in Rock. Delete the field that contains your church's name (since it's just text, and not a merge field).

Your simple label is now ready to be used in Rock. To use it, follow these steps:

1. Open up the check-in configurator Admin Tools \> Check-in \> Check-in Configuration.
2. Determine the check-in configuration type you want to add it to (e.g., *Weekly Service Check-in*) and click on the check-in area you want to add the label to.
3. Add the label to the list of labels on the right side by clicking the \[+\] button and choosing your new label from the drop-down list. Click Add.
4. Click the Save button to complete the configuration.

Your new label should now print with every check-in to that area.

# Merge Fields

You might be wondering where that merge field came from and what others are available for your use. We like the way you think! Merge fields are created as Defined Values under Admin Tools \> Check-in \> Label Merge Fields. There you will see all of the merge fields currently set up. Pretty much everything you see on the built-in labels is a merge field. You'll also see that merge fields are simple fragments of Lava matched to a keyword.

For instance, the *Birthday Icon* merge field is simply:

            {% if Person.DaysToBirthday <\= 7 %}B{% endif %}
            

This Lava looks at the birthdate of the person checking in and if it's within seven days it prints the letter 'B' (or a birthday present icon if the Rock icon font is installed on the printer).

You can see a list of all of the fields available for you to use in your Lava by pressing the Show/Hide Merge Fields button of the defined type. Impressive, isn't it?

# Adding a Person Photo

If you need a photo in your nametag, you can use your newly-acquired custom label knowledge to make it happen. Just follow the steps below:

1. As described in the last section, add a new Label Merge Field (Defined Type) with a value of *Person Photo* and a MergeField containing the Lava "{{ Person | ZebraPhoto }}".
2. Photos are always printed as squares; you can adjust the size by adding the length of one side as a parameter in the merge field Lava: {{ Person | ZebraPhoto:'208' }}. This would print a photo slightly larger than one inch by one inch on a 203-dpi printer. Note: the size parameter must be a multiple of 8 to avoid printing a black bar at the right side of the label. Coming soon: the ability to rotate your photos.
3. While editing your custom label's ZPL file (.prn), add three new lines exactly like in this snippet (anywhere between the ^LL and ^XZ commands):
	^LL812
	...
	^FDPhoto^FS
	^FO25,68^XGR:LOGO.PNG^FS
	...
	^IDR:LOGO.PNG
	^XZ
4. The first line performs the magic of downloading and storing the photo in the printer's memory, and the second recalls it from memory and places it on the label. (25,68) is the coordinate of the upper left corner of the printed image (you can adjust this to place the image where you want it on the label). The last line deletes the image from printer memory so it doesn't print again on the next check-in if that person doesn't have a profile photo.
5. Lastly, when you upload your new check-in label's ZPL file (.prn) into Rock, link the *Photo* on the label to the *Person Photo* merge field.

The photo of the person checking in should now appear on the label when they check in. You can find more details on the [ZebraPhoto Lava filter](https://community.rockrms.com/lava/person#zebraphoto) in the Person section of the Lava documentation.

# Achievement Labels

When a check-in results in an Achievement being earned, you can print an additional label recognizing the successful completion. In this example the label will print the person's name and the name of the Achievement.

1. Create a new Label Merge Field by adding to the list under Admin Tools \> Check-in \> Label Merge Fields. The MergeField value will be as shown below:
	^FS
	{% for completedAchievement in JustCompletedAchievements %}
	CT~~CD,~CC^~CT~
	^XA~TA000~JSN^LT0^MNW^MTD^PON^PMN^LH0,0^JMA^PR6,6~SD24^LRN^CI28^XZ
	^XA
	^MMT
	^PW812
	^LL0406
	^LS0
	^FT16,256^A0N,56,55^FH\\^FD{{ Person.NickName }} {{ Person.LastName }}^FS
	^FT18,328^A0N,56,55^FH\\^FDCelebrates {{ completedAchievement.AchievementType.Name }}^FS
	^LRY^FO0,0^GB812,0,122^FS^LRN
	^PQ1,0,1,Y^XZ
	{% endfor %}
	^FD
2. Next, create a new label under Admin Tools \> Check-in \> Check-in Labels. You'll need to add a new Merge Code with a Key of "Achievements" and a Value that matches the Label Merge Field created in the prior step.
3. Save the label, then open it up again and click the Edit Label Contents button.
4. In the *Label Contents* area, add the following:
	^FDAchievements^FS
5. Save your changes and save the label.

Don't want an entire label for the Achievement? You can add individual fields to an existing label. For instance, if you want to print the name of the Achievement simply create a new Label Merge Field with the MergeField value set as shown below and add it to your existing label.

{% for completedAchievement in JustCompletedAchievements %}
    {{ completedAchievement.AchievementType.Name }}
{% endfor %}            
        

The `JustCompletedAchievements` merge field used in the above example is a list of `CompletedAchievement`, which has fields of:

- Achievement Type
- Name
	- Description
	- Category
	- AchievementIconCssClass
	- AllowOverAchievement
	- CustomSummaryLavaTemplate
	- ComponentEntityTypeId
	- (etc...)
- AchievementTypeId
- AttemptStartDateTime
- AttemptEndDateTime
- PersonId

# Best Practices and Lessons Learned

Creating labels is easy using the ZebraDesigner software. Below are a few best practices to help you create the highest quality labels:

- When you're working with images, be sure to make the image the exact size you want on the label (do not stretch or shrink it.) The best way to achieve this is to create the label first in Photoshop. Set your Photoshop file to be the same size in inches as your label with a DPI of 203. If you adjust the image size in the Zebra Designer, you’ll get a bad case of the jaggies (a pixelated look).
- Only use embedded printer fonts. These fonts are noted with a small printer icon in the ZebraDesigner font picker. If you would like to use a different font, be sure to upload it to the printer. (Note: You’ll need to do this to each printer that will be used in the check-in process.) For instructions on how to do this, see the section [Installing the Rock Icon Font on Zebra Printers](#installingtherockiconfontonzebraprinters).
- If you create some truly custom labels, you will likely run into issues with things like centered or justified text. There is a bug in ZebraDesigner where the size of a field on the rendered (.prn file) label is incorrect (even though it looks perfect in the Designer app), and you end up with a jumble of text printed over itself when trying to print the label. If you run into this issue, you can edit the label's ZPL directly via the Edit Label Content button after uploading your label into Rock under Admin Tools \> Check-in \> Check-In Labels This lets you play with the field's coordinates and length and see your changes in real time until you get it right.

# Important

If you are manually updating the contents of your label file, make sure that you do not end up with line breaks in your label merge code (between the ^FD and ^FS). The check-in application will be looking for the codes in the label, and if you add line-breaks the pattern may not match.

Equally important, if you create your own Merge Fields in Rock for your custom labels, do not add line breaks to your Lava to make it pretty. Line breaks can cause the wrong icons to print.


---

## Beyond Children's Check-In {#beyond-childrens-check-in}

> **Path:** Checking-out Check-in > Beyond Children's Check-In

Beyond Children's Check-In

While much of this document has focused on using check-in for childcare activities, Rock is capable of much more. Below we'll discuss a few ideas on how to extend check-in.

# Serving Groups

Serving groups are one of the pre-configured group types in Rock. There are many benefits to having people check in when they serve. To help you gather that data, we've configured the serving groups to allow check-in. All you need to do is provide two settings for each group to help Rock know where and when to allow check-in. Let's take a look at how to do this.

![Configuring Serving Groups For Checkin](https://rockrms.blob.core.windows.net/documentation/Books/10/1.17.0/images/configure-serving-groups.png)

Configuring Serving Groups For Checkin

Voila! Your serving group is now ready for checking in.

# Double Check:

Make sure that the check-in kiosk you are using is configured for the location you chose for the group.

# Configuring New Group Types for Check-in

Now that you've seen ~~the power of the dark-side~~ how serving groups can check in, we bet you're wondering how to configure other group types for check-in. Just follow these steps.

![Configuring A New Group Type For Checkin](https://rockrms.blob.core.windows.net/documentation/Books/10/1.17.0/images/configure-group-type-for-checkin-v13.png)

Configuring A New Group Type For Check-In

Once enabled, you'll still need to add the meeting details just like we illustrated in the *Serving Groups* section above.

Well done. You are now a check-in whiz. You can properly configure check-in for any group type.

# Got Labels?

Do you have a group of a type that doesn't usually print labels that needs labels printed? Rock has you covered. There is an advanced option that allows you to print labels for group types that don't typically print labels at check-in. To learn more about this feature, see the [Appendix - Advanced Options](#appendixadvancedoptions) section below.


---

## Rapid Attendance Entry {#rapid-attendance-entry}

> **Path:** Checking-out Check-in > Rapid Attendance Entry

Rapid Attendance Entry

The *Rapid Attendance Entry* block allows you to record attendance for lots of people very quickly. This could come in handy for certain situations, such as checking a lot of people in for a worship service and wanting to do so as fast as possible. *Rapid Attendance Entry* can also be very useful outside of attendance. It's great for entering communication cards, prayer cards or other information you might collect in large volumes. The *Rapid Attendance Entry* block makes these tasks quick and simple. Let's look at how it works.

To start, navigate to People \> Rapid Attendance Entry. You’ll begin the process by selecting the group for which you want to record attendance. The group's settings and attributes determine which options will be available on the screen.

![Rapid Attendance Entry Screen](https://rockrms.blob.core.windows.net/documentation/Books/10/1.17.0/images/rapid-attendance-entry-contact-entry-v13.png)

Rapid Attendance Entry Screen

After filling out the required fields as described above, click the Start button to proceed to the page pictured below.

Your page may look slightly different depending on how your organization has configured the block settings.

![Rapid Attendance Entry Search](https://rockrms.blob.core.windows.net/documentation/Books/10/1.17.0/images/rapid-attendance-entry-search-v13.png)

Rapid Attendance Entry Search

After entering a name and clicking Go, you’re ready to start recording attendance...and more!

Again, keep in mind that there are many block settings to tailor this page to your organization’s needs. The example pictured below highlights some useful features, but they aren’t required and may not be visible when you access the page in your system.

![Attendance and Contact Entry](https://rockrms.blob.core.windows.net/documentation/Books/10/1.17.0/images/rapid-attendance-entry-results-decker-v13.png)

Attendance and Contact Entry

Workflows launched from this block will be passed the person as the workflow’s entity. If they exist, the block will also fill in any of the workflow attributes listed below:

- **Group -** The group for which the attendance is being entered. The attribute should be of type group.
- **Location -** The selected location for which attendance is being entered.
- **Schedule -** The schedule selected for entering the attendance.

# Rapid Attendance Entry Block Settings

It’s easy to see that there’s a lot more to *Rapid Attendance Entry* than entering attendance. But to truly understand all your options for this feature, we’ll need to dive into the block settings. There are a lot of settings to cover, so we’ll break it down into a few parts.

![Block Settings - General and Attendance](https://rockrms.blob.core.windows.net/documentation/Books/10/1.17.0/images/rae-block-settings-general-attendance-v10.png)

Block Settings - General and Attendance

![Block Settings - Family and Individual](https://rockrms.blob.core.windows.net/documentation/Books/10/1.17.0/images/rae-block-settings-family-individual-v15.png)

Block Settings - Family and Individual

![Block Settings - Notes, Prayers and Workflows](https://rockrms.blob.core.windows.net/documentation/Books/10/1.17.0/images/rae-block-settings-notes-prayer-workflow-v10.png)

Block Settings - Notes, Prayers and Workflows

