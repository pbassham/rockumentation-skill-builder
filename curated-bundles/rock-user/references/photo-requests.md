---
description: "Use when users ask how to request, upload, or manage photos of people in the system or send bulk photo requests"
source: "https://community.rockrms.com/documentation/bookcontent/5/360"
sourceLabel: "Person & Family Field Guide"
---
> **Path:** Person & Family Field Guide > Photo Requests

Photo Requests

Rock is about fostering relationships. Nothing helps this more than having photos in the system. In the past, keeping up with photos was a complex and time draining task. No longer! Rock makes it easy to populate photos into the database by asking individuals to upload a photo from an emailed request. Let's take a look at how it works.

![Photo Request Process](https://rockrms.blob.core.windows.net/documentation/Books/5/1.17.0/images/photo-request-process-v14.png)

Photo Request Process

# Photo Upload

When the individual clicks the upload link in their email, they'll be taken to the page pictured below. This page is under External Homepage \> Support Pages \> Photo Upload but it isn't linked into the website, so you'll have to get there from Admin Tools \> Settings \> CMS \> Pages.

![Photo Upload](https://rockrms.blob.core.windows.net/documentation/Books/5/1.17.0/images/photo-upload-v14.png)

Photo Upload Page

The link they use to get to this page has an embedded security token that allows them to upload their photo without having to log in.

The block on this page has a couple of settings you can use to alter its behavior. These settings include:

- **Include Family Members:** This setting will allow the individual to upload photos for their whole family from their link. The default value for this setting is true.
  
- **Allow Staff:** This setting allows staff members to change their own photos. Some organizations may not want staff to update their photos as they have standard staff photos they'd like to keep consistent. The default value for this setting is false.

# Bulk Requests

The easiest way to get a large number of photos into the system is to use the bulk photo request option. You can make these requests under Admin Tools \> Settings \> Communications \> Send Photo Requests.

This screen allows you to send an email to a selected list of people asking them to provide a photo for the system.

![Photo Request Send](https://rockrms.blob.core.windows.net/documentation/Books/5/1.18.0/images/photo-request-send-v18.png)

Photo Request Send

After clicking Send, the individuals will receive an emailed request to upload their photos. The contents of this email can be modified under:  
Admin Tools \> Settings \> Communications \> Communication Templates \> Photo Request Template.

# Tip to Limit Abuse

To help minimize the potential abuse of this feature by staff, there's a block setting that limits the number of photo requests that can be sent without approval. The default is 300. Feel free to change this number to suit your needs. The block uses the same approval process as bulk email.

## But There's More

Using the bulk photo request screen above is a great way to send out mass requests for photos. You can also send this same email to a list of people using the *Photo Request* communications template. Let's say you have a report that lists people for an upcoming event, and you'd like to get their photos before the event. By clicking the button in the grid's footer you'll be taken to the *New Communications* page. Click the *Use Simple Editor* button near the top right of the block, then select the *Photo Request Template* from the Template dropdown and you're off to the races!

See our [Communicating With Rock](https://community.rockrms.com/documentation/bookcontent/8/) guide for more information.

# Individual Requests

Bulk requests can help you populate your database with a large number of photos, but sometimes a personal request is needed. From an individual's *Person Profile* page, you can quickly request a photo under:  
Actions \> Photo Request.  
This will launch a short workflow entry screen that allows you to type in a personal message to the recipient. Rock will add some instructions and links to your email to enable the upload process.

# Verifying Photos

While it's highly unlikely, it's possible that someone could upload an inappropriate image. To help filter these out, Rock has a photo verification process. When a person uploads a photo, it's immediately available for viewing. At the same time, it's also added to a list to be manually verified. This list can be found under:  
Tools \> Data Integrity \> Photo Requests \> Verify Photos.

![Verify Photo](https://rockrms.blob.core.windows.net/documentation/Books/5/1.18.0/images/photo-verify-v18.png)

Verify Photos

# Photo Opt-Out

When an individual asks to be opted out of receiving future requests for photos, they are sent to the opt-out page which is located under:  
External Homepage \> Support Pages \> Photo Opt-Out

They are also added to an application group called *Photo Request* with a member status of *Inactive*. You can view and manage this list under:  
Tools \> Data Integrity \> Photo Requests \> Photo Request Application Group

To remove someone from the opt-out list, simply remove them from this group.

