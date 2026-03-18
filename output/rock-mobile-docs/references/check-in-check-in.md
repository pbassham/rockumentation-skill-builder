> **Path:** Mobile Docs > 🧱 Essentials > Blocks > Check-in > Check-in

# Check-in

*The Rock Mobile check-in experience.*

M v17.7 C v6.0 [Integrated Scroll](https://community.rockrms.com/page/3516?slug=essentials%2fblocks#integrated-scroll)

## Overview

At first glance, check-in seems simple—just a way for someone to say, "I'm here!" However, from a technical perspective, recording this data involves several requirements. To streamline the process, we've broken down these requirements and provided solutions to ensure the check-in block is as seamless as possible.

### Block Configuration

First and foremost, the block must be configured properly to function. Almost any block setting can alternatively be [passed in as a page parameter.](https://community.rockrms.com/developer/mobile-docs/essentials/blocks/check-in/check-in#page-parameters)

Important

Block settings override page parameters for check-in. This ensures that your configuration is not overridden by undesired values, so consider the security needed for your setup.

### Check-in Settings

#### Check-in Configuration

This is a required setting. The configuration template to use for this check-in block.

#### Kiosk

This is a required setting. The kiosk to associate this check-in process with. Necessary for things like location based check-in, etc.

#### Primary Areas

The areas directly associated with the check-in configuration, to make available to this block.

#### Secondary Areas

The areas not directly associated with the check-in configuration.

### Mobile Settings

#### Loading Screen Template

The XAML content to display when the block is loading data.

#### Completion Screen Template

The XAML content to display when a check-in process successfully completes.

#### Login Screen Template

The XAML content to display when a user presses log-in. If no content is provided, the application Login page will be used.

#### Allow Add Family Member

Whether or not you should be able to add a new family member during the check-in process.

#### Add Person Attributes

The custom attribute fields to display when a family member is being added.

## Page Parameters

| Key | Type | Description |
| --- | --- | --- |
| ConfigurationTemplateId | string | The IdKey or GUID for the configuration template to use for the check-in process. |
| AreaIds | List<string> | The IdKeys or GUID of the areas to limit this check-in process to. Comma-delimited. |
| LocationIds | List<string> | The IdKeys or GUIDs of the locations that are available for this check-in process. Comma-delimited. |
| KioskId | string | The IdKey or GUID of the kiosk associated with this check-in process. |
| SelfCheckIn | bool | Whether or not this check-in process is strictly tied to the logged in individual. |

## Data Requirements

Successful check-in requires a lot of data. The diagram below highlights the key information needed to have a complete check-in process:

![](https://community.rockrms.com/GetImage.ashx?Id=72307)

If any required data is missing, the UI will prompt the user, potentially extending the check-in process. However, by providing more context through page parameters—such as using deep links, QR codes, or NFC tags—you can create a faster, more seamless experience.

Additionally, Rock intelligently fills in missing data where possible. For example, if only one applicable schedule exists for the selected Area, Group, and Location, that step is skipped automatically. This especially applies to schedule because you can't pass that one in through page parameters.

#### Providing Context

The more data you can give the check-in process, the better.

When navigating to the Check-in (through a deep link, or from anywhere) you can pass in the parameters like such:

```
<Button Text="Check-In"
    Command="{Binding PushPage}"
    CommandParameter="008c0d6f-349a-41c3-b482-fd8b363260eb?ConfigurationTemplateId=QN8mrQBVyn" />
```

The query string in this instance would tell the block which configuration to use, while expecting the block settings to fill in the remaining gaps.

#### Deep Linking

Let's say you wanted to provide an NFC token in the Bears Room that could be tapped to Check-In. Your deep link route would look something like:

```
https://mychurch.com/m/checkin/{ConfigurationId}/{AreaId}/{LocationId}/{KioskId}
```

Your NFC token would be encoded to something that looks like:

```
https://mychurch.com/m/checkin/QN8mrQBVyn/OX9mQWPQo8/yqMlAxmENZ/OX9mQWPQo8
```

Assuming that the AreaId, LocationId and KioskId are all the proper values for that schedule, if there is only one available person to check-in, you would likely be navigated directly to the success screen. You have successfully filled in most of the needed information for checking-in without the end-user knowing a thing. Magic!

### Styling

![](https://community.rockrms.com/GetImage.ashx?Id=71453)

![](https://community.rockrms.com/GetImage.ashx?Id=71454)
