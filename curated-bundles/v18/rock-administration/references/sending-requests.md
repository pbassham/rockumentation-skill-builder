---
description: "Use when sending assessment requests to individuals or groups in Rock, or viewing assessment history for a person"
source: "https://community.rockrms.com/documentation/bookcontent/37/351"
sourceLabel: Assessments
---
> **Path:** Assessments > Sending Requests

Sending Requests

Before we get into each assessment one by one, let’s take a look at how requests are sent to groups or individuals. Out of the box, Rock comes with these assessments ready to go, so you don’t have to do any background work.

# Individual Requests

One way to send a request is through a person’s profile page. This is done by clicking the Actions button located below the person's photo. Click on the button and choose *Request Assessment*.

![Send Request](https://rockrms.blob.core.windows.net/documentation/Books/37/1.18.0/images/send-individual-request-v18.png)

Send Request

A page will then show all five assessments to choose and add a message to send with the request. You can select one assessment or multiple.

![Choose](https://rockrms.blob.core.windows.net/documentation/Books/37/1.18.0/images/choose-assessments-to-send-v18.png)

Assessments

# Group Requests

Alternatively, you can use the [Lava](https://community.rockrms.com/lava/) codes below in any communication to send to large groups of people at the same time. See our [Communicating With Rock](https://community.rockrms.com/documentation/bookcontent/8/) guide for more information on creating and sending communications.

`               {{ 'Global' | Attribute:'PublicApplicationRoot' }}/DISC/{{ Person.UrlEncodedKey }}           `

`              {{ 'Global' | Attribute:'PublicApplicationRoot' }}/SpiritualGifts/{{ Person.UrlEncodedKey }}          `

`              {{ 'Global' | Attribute:'PublicApplicationRoot' }}/EQ/{{ Person.UrlEncodedKey }}          `

`              {{ 'Global' | Attribute:'PublicApplicationRoot' }}/Motivators/{{ Person.UrlEncodedKey }}          `

`              {{ 'Global' | Attribute:'PublicApplicationRoot' }}/ConflictProfile/{{ Person.UrlEncodedKey }}          `

Once the request has been sent, the person will receive the email with an external link to start the assessment. They can also access the request and other assessments on their *My Account* page on the external website.

![Email](https://rockrms.blob.core.windows.net/documentation/Books/37/1.17.0/images/assessment_email_v9.png)

Email


---

## Assessment History {#assessment-history}

> **Path:** Assessments > Assessment History

A history of assessments can be viewed from an individual's *Person Profile* page under the *History* tab. This history includes assessments that were taken with or without a formal request.

![Person Profile Assessment History](https://rockrms.blob.core.windows.net/documentation/Books/37/1.18.0/images/person-profile-assessment-history-v18.png)

Person Profile - Assessment History

