---
description: "Use when users ask about compatible operating systems, supported check scanners, or driver installation for Rock's check scanning software"
source: "https://community.rockrms.com/documentation/bookcontent/15/367"
sourceLabel: Rock Solid Finances
---
> **Path:** Rock Solid Finances > Scanning Checks

Scanning Checks

Rock provides special tools to help automate the scanning of large amounts of checks. Let's take a look at what's available.

# Supported Operating Systems

Rock's check scanning software should work with anything greater than Windows 7. It will NOT work with Windows XP.

# Supported Scanners

Rock supports three types of scanners with its scanning tools.

## Scanners that Support the Ranger Interface

Rock has integrated with the Ranger Interface API toolset from Silver Bullet Technologies. Technically any check scanner that works with the Ranger API should work with Rock. That said, in the process of developing Rock and testing, we have exclusively used the Canon CR-series of check scanners (specifically the CR-L1). While other makes and models should also work, we haven't tested them. Ranger provides a list of supported scanners [on their website](https://sbullet.com/products/ranger-2/ranger-supported-check-scanners/).

# Use the Latest Ranger Driver

In our testing, we've noticed that the latest Ranger drivers work better at reading the check's MICR information. Be sure to download the latest driver from your scanner manufacturer. For those using the Canon CR-L1 try [this link](https://www.usa.canon.com/support/p/imageformula-cr-l1-check-scanner).

## MagTek MICRImage

Because of the large number of these legacy scanners available, we have also integrated and tested with the MagTek MICRImage check scanners. To use the MagTek MICRImage, please install the drivers from [MICRImage](https://www.magtek.com/support/micrimage?tab=software). Once on the "software" page scroll down to the OCX title and download the MICRImage OCX - PN99510045 - v112.

Additionally, as part of the MagTek family, we support the Image Safe USB check scanner. Download and install the drivers for this scanner here: [Image Safe](https://www.magtek.com/support/imagesafe?tab=software).

# Installing Image Safe drivers

When you reach the MagTek website to download the driver for the Image Safe scanner, the download contains several files. Once the download is complete unzip the download and follow the instructions on where the files are located. Once you reach the ExcellaSTXImageSafeInstall folder you'll choose the 'setup' application to install.

# If purchasing a new scanner

If you're in the market for new scanners, we highly recommend using the Canon CR-series.

# Rock Check Scanning Software

Rock's check scanning software allows you to quickly and easily add checks to transactions in Rock. Let's walk through the process of scanning checks using this software.

## Installing the Rock Check Scanning Software

Installing the check scanning software is easy. It requires a Windows machine running Windows 7 or later to run. To install, follow these steps:

1. First, install the drivers for the scanner you'll be using. If you're using the Canon CR-series, that will be the Ranger software that came with your scanner. In either case, these are simple installs.
2. Download the setup application under Admin Tools \> Settings \> External Applications \> Rock Check Scanner.
3. Run the setup. The check scanning setup is a breeze with just three quick screens.

## Using Rock Check Scanning Software

Once everything is installed, start by launching the Rock check scanning software and logging in. Users must be a member of one of the security groups below to log in using this software:

- RSR - Finance Administration
- RSR - Finance Worker
- RSR - Rock Administration

If this is your first time logging in, you'll also be asked for the web address of your Rock server. This is the address that the scanning software will upload checks to.

![](https://rockrms.blob.core.windows.net/documentation/Books/15/1.17.0/images/log-in-screen-scanner.png)

Login Screen

# Software Options

First off, we'll show you where the software settings are so you can configure them to meet your needs. To do this, select the icon located on the bottom right of the check scanner window. You can always come back to this page to make any adjustments at any time.

## Capture Amount on Scan

Before we dive too deep into the settings, we want to highlight one setting in particular. As noted below, you have the option to *Capture Amount on Scan* while scanning checks. When this is enabled the scanning process will pause after each check so you can type in the amount of the check. This saves you from having to go into Rock later and add the amount for each check as part of a separate step. Simply read the amount of the check from the scanned image, and add that amount to the appropriate account(s) listed on the screen in the Check Scanner app.

The list of accounts that you can add amounts to is configurable when you turn on *Capture Amount on Scan* in the configuration area pictured below. From this configuration screen, check the box next to any accounts that you want available during the scanning process. Selecting multiple accounts also allows you to split a single check into different accounts if needed.

Scanner Settings

![Scanner Settings](https://rockrms.blob.core.windows.net/documentation/Books/15/1.17.0/images/scanner-settings-v10.png)

1 **Scanner Information**

This area displays information about the physical check scanner that is currently configured.

2 **Rock URL**

You’ll want to confirm this contains the correct Rock server address for your organization.

3 **Scanner Interface**

Select the type of interface that’s currently set up (Ranger or MagTek).

4 **Scan Image Color Type**

Select the color depth that should be used when scanning. Options will vary by scanner. The Ranger interface supports black/white, grayscale and color. Just understand that using an option other than black/white will significantly grow the size of your database.

5 **Scanning Options**

Select the options that best fit your scanning process.

- **Capture Amount on Scan:** If enabled, the scanning process pauses after each check is scanned to allow the entry of the dollar amount on the check. Enabling this also enables the "Batch Options" and "Accounts for Capturing Batches" options.
- **Campus Filter:** The list of available accounts (when *Capture Amount on Scan* is enabled) can be filtered by campus. Accounts that are not tied to any campus will always appear in the list.
- **Batch Options:** Select whether the *Control Amount* and/or *Item Count* fields in the Batch Details should be required. These options are only available if *Capture Amount on Scan* is enabled.

6 **MICR Read Sensitivity/Plurality**

The Ranger driver allows you to adjust the sensitivity and/or plurality of the MICR reading. You probably won’t need to change these unless your check scanner is having problems reading checks properly. See the next section below for full details on these settings.

7 **Accounts for Capturing Batches**

Used when entering the amount for the check to go to a specific account. The list of accounts is only available if Capture Amount on Scan is enabled.

# Sensitivity and Plurality

For the most part you shouldn’t need to adjust these settings. However, if you’re running into problems reading checks, changing the *Sensitivity* and *Plurality* values might help.

## Scores

To understand how sensitivity and plurality work, you need to know about scores. When the scanner reads a character, that character is assigned a score. The score is based on how confident the scanner is that it read the character correctly.

For instance, let’s say the number “3” is being read on the check. We know it’s the number “3” but the check scanner thinks it could also be an “8” because those numbers have similar shapes. The scanner will assign a score to both “3” and “8” based on how confident it is about which number is being read. In this example, we’ll say “3” is assigned a score of 240 and “8” is assigned a score of 130. These scores indicate the scanner is more confident about “3” than “8”.

## Sensitivity

The *Sensitivity* setting is like a cutoff, or threshold, for the scores described above. By default, the sensitivity is set to 128. So, if the score for a character is below 128, that character is rejected as incorrect. You can raise or lower the sensitivity to accept or reject different confidence scores. Any value between 1 and 255 can be chosen.

In the example described above, the numbers “3” and “8” were assigned scores of 240 and 130, respectively. Because the default sensitivity value is 128, and because both scores are above 128, both are potentially correct. If we increased the sensitivity to 138, the score for “8” would be too low and the scanner will select “3” as the correct character being read.

## Plurality

Let’s say the numbers “3” and “8” are assigned scores of 130 and 125, respectively. In this case, with a default *Sensitivity* setting of 128, the number “3” is favored because its score is higher than 128. But the scanner is almost equally confident about both numbers, so there’s a risk it could pick “3” when the true character is actually “8”.

To account for this scenario, the *Plurality* setting looks at the difference between scores. This lets you set how different the scores should be before deciding on the correct character. By default, the plurality value is set to 128. This means the difference between scores must be at least 128. In this example, the difference between scores of 130 and 125 is only 5, which falls below the plurality threshold. In that case, the scores aren’t different enough to know for sure which one is correct, and neither is chosen.

## Working with Sensitivity and Plurality

Now let’s bring it all together. We’ll circle back to the original example, with the character “3” assigned a score of 240 and the character “8” assigned a score of 130. To start, we’ll assume default (blank) values of 128 for both *Sensitivity* and *Plurality* settings.

Keeping in mind what you now know about these settings, we can already tell that neither “3” nor “8” will be selected. Even though both scores meet the sensitivity threshold, the difference between them is only 110, which does not meet the plurality threshold of 128. The scores are too close together to be sure which one is correct. Lowering the *Plurality* setting to 100 would resolve this, and “3” would be returned as the correct character.

Both thresholds must be met for a character to be returned. If the *Sensitivity* setting is changed to 255, and the *Plurality* setting is changed to 100, then no character will be returned in this example. Even though the plurality threshold has been met, neither of the scores are high enough to meet the sensitivity threshold of 255.

## Troubleshooting

When the scanner can’t determine a character, it will return the “@” symbol. If you’re seeing lots of “@” symbols in your scans, adjusting the *Sensitivity* and *Plurality* might help.

Finding the right settings can be a bit of a challenge because, unlike the examples we’ve discussed above, you won’t know what the scores are. The scores are assigned and evaluated behind the scenes. So, you might need to run a few tests with different settings to see what works best.

We recommend changing in increments of 10 as a general guideline. Given default values of 128, you might change the *Sensitivity* to 138 and the *Plurality* to 118. If that doesn’t work, you might try keeping the *Sensitivity* at 128 but lowering the *Plurality* to 118. When you make these changes, be sure to test with several different checks. The key is to find the right balance that gets you the most consistently accurate results.

# Scanning Checks

When you're ready you'll be at the home page. Here you can start scanning checks to a current batch listed or create a new batch right from this window by pressing the icon next to the *batches* panel.

Now press the Scan button pictured below to start scanning and advance to the *Scan Settings* page.

![Check Scanner Home Screen](https://rockrms.blob.core.windows.net/documentation/Books/15/1.17.0/images/check-scanner-home-screen-v10.png)

Check Scanner Home Screen

The *Scan Settings* page (pictured below) lets you select which tender type you'll be scanning into Rock. In most cases you'll be scanning checks, but you can also select "Cash" if you want to scan the envelopes that the cash transaction came in.

![Scan Settings](https://rockrms.blob.core.windows.net/documentation/Books/15/1.17.0/images/New-scanner-setting-v9.PNG)

Scan Settings

# Extra Features

The double-sided scanning and double document detection options are only available on scanners using the Ranger API. See the [Supported Scanners](#supportedscanners) section above for more info on scanners that support the Ranger API.

Now the check scanner will start scanning checks. If there is a problem reading one of the checks, it will immediately stop the scanning process and warn you of the error (upside down check, check facing backwards, etc.) From here, you can skip the bad scan and attempt a rescan, upload the scan as-is without the check account information, or stop the scanning process.

# Capture Amount On Scan

When *Capture Amount On Scan* is enabled, you'll notice (pictured below) that the check scanning pauses for each check so you can add the amount. It also shows the *Control Items* and the *Control Amounts* at the top, which will be updated after each scan.

![Check Scanning - Capture Enabled](https://rockrms.blob.core.windows.net/documentation/Books/15/1.17.0/images/check-scanning-capture-enabled-v10.png)

Check Scanning - Capture Enabled

If *Capture Amount On Scan* is not enabled, the page pictured above will instead appear as pictured below. You’ll note below that the *Control Items*, *Control Amounts* and check amount fields are no longer visible.

![Check Scanning - Capture Disabled](https://rockrms.blob.core.windows.net/documentation/Books/15/1.17.0/images/check-scanning-capture-disabled-v10.png)

Check Scanning - Capture Disabled

After the scanner finishes with the batch of checks in its hopper, you can add more and scan again. When you’re done scanning, press the Close button. The main page (pictured below) will show the list of batches and the scanned items. From here, you can add and delete batches, view or delete individual transactions, or start scanning additional items.

![Home Screen with Transaction](https://rockrms.blob.core.windows.net/documentation/Books/15/1.17.0/images/home-screen-with-transaction-v10.png)

Home Screen with Transaction

When viewing transaction details, you can see the scanned date and time, the transaction date and time (determined by the batch date), and additional details of the transaction. You can also adjust the amount of the check and its disbursement for accounts.

![Transaction Details - Capture Enabled](https://rockrms.blob.core.windows.net/documentation/Books/15/1.17.0/images/transaction-details-capture-enabled-v10.png)

Transaction Details - Capture Enabled

The details page is also impacted by whether *Capture Amount On Scan* is enabled or not. It is enabled in the screenshot pictured above, so the check amount is available for editing. In the example pictured below, *Capture Amount On Scan* was not enabled, so there is no amount to edit, but the other details can still be viewed.

![Transaction Details - Capture Disabled](https://rockrms.blob.core.windows.net/documentation/Books/15/1.17.0/images/transaction-details-capture-disabled-v10.png)

Transaction Details - Capture Disabled

# Dates Associated with Scanning

The Scanned Date/Time that you see in the Scanner Grid is the Date/Time that the scanned item was uploaded. The Transaction Date/Time of each scanned transaction is determined by the Batch Date at the time of the scan. Note that if the Batch Date was changed after some checks were already uploaded, the previously scanned checks would have the old Batch Date and the new scanned checks will have the new Batch Date.

