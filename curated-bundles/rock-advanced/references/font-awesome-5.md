---
description: Use when configuring Font Awesome Pro in Rock or understanding free vs. Pro icon features and font weights
source: "https://community.rockrms.com/documentation/bookcontent/14/370"
sourceLabel: Designing and Building Websites Using Rock
---
> **Path:** Designing and Building Websites Using Rock > Font Awesome 5

Font Awesome 5

Font Awesome is still available within Rock, but we are transitioning to a new font-based icon called Tabler. For more, see our [Tabler documentation.](https://community.rockrms.com/documentation/bookcontent/14/370#tablericons)

Font Awesome 5 is a revolutionary step forward in font-based icons for the web. With these new capacities, though, come some complexities. First let’s look at some of the new features and discuss how they will be implemented in Rock.

# Free vs. Pro

Font Awesome has always been free and will continue to be so. In version 5 they are also offering a Pro version. The Pro version gives you not only tons of new icons, but different weights (solid, regular and thin) as well. While the free version does have two weights, only the solid weight is icon complete (has all the icons implemented). Because of this, “solid” is the only choice in Rock if you have the free version.

# Installing Font Awesome Pro

If you do purchase the Pro version (again, this is completely optional), you'll now need to install it in Rock. To start, you will need to log in to your account at [fontawesome.com](https://fontawesome.com/account). You'll need to get both your Key and the Pro Download file. See the below screenshot to make sure you're getting the right items:

![Downloading Font Awesome Pro](https://rockrms.blob.core.windows.net/documentation/Books/14/1.8.0/images/font-awesome-pro-WEB.png)

Downloading Font Awesome Pro

Now that you have your key and the .zip file, log in to your Rock site and navigate to Admin Tools \> CMS Configuration \> Font Awesome Settings. This is where you'll paste in your Font Awesome Pro Key and upload the Font Awesome Pro for Web package that we just downloaded. Then click Install and it will tell you that Font Awesome Pro has been updated. You'll need to do this again from time to time as Font Awesome adds new icons to their Pro package.

![Installing Font Awesome Pro](https://rockrms.blob.core.windows.net/documentation/Books/14/1.18.0/images/font-awesome-pro-install-v18.png)

Installing Font Awesome Pro

# Font Weights

As we mentioned above, you need the Pro edition to have access to the various font weights in Rock. Currently, there are three weights: solid, regular and thin. It's our intent to allow you to pick a weight and have the theme auto update to show your selected weight.

Each of the weights is implemented in a separate font file. There's also a separate font file for all the brand icons. To reduce page load times, we allow you to select which fonts you’d like to implement on your theme.

Font Awesome 5 added the ability to specify the weight of the icons in CSS. So, if you wanted a light icon, you’d use “fal fa-cog.” However, this hard-codes the icon to always be light. Instead of using the weight classes, we highly recommend that you continue to use the normal `fa` prefix (e.g., `ti ti-settings`). This will allow Rock to dynamically change the weight based on administrator preference.

# SVG Fonts

You might be asking, "What about SVG fonts? There are a bunch of new features that only they support!" At this point, we have not supported the Font Awesome SVG fonts natively in Rock. While that might change in the future, the community felt that the increased file sizes of the SVG font files was a concern and that the traditional font files were a better option for now. We hope that Font Awesome will have a solution to these concerns in the future.

# Other Features

Font Awesome 5 has a ton of other features that you should read about on their [website](https://fontawesome.com).

# Custom Themes

If you are writing a custom theme you can select to either hard code your theme to use a specific weight of Font Awesome or plug into Rock’s theme customizer to allow Rock Administrators to update it from the UI. Both options are discussed below. Note that if you don't do anything, Rock's core Bootstrap implementation will include the solid weight for you.

## Hardcoding Font Weights

Don’t trust the administrators not to ruin your perfect theme by changing the font weight? No problem. You can hardcode the weight using the following custom mix-in.

@import "../../../Styles/FontAwesome/\_rock-fa-mixins.less";
.fa-font-face( 'thin' );

The mix-in is really the last line of code. It will write out the font face for you. You can write out more than one if you wish by calling the mix-in several times. The only parameter for the mix-in is the weight (solid, regular or thin).

## Allowing for Weight Changes

So, you'd rather take the high road, good... good... Well, honestly, supporting the ability to change the weight of the icons is super simple. Just ensure that your theme includes a \_variable-overrides.less file and that this file is imported into your bootstrap.less and theme.less files. The Rock UI will then write into this file the configuration needed to allow administrators to select the weight of fonts they prefer.

