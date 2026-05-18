---
description: "Use when customizing Rock check-in theme appearance, changing logos, selecting themes, or styling the Aero theme with colors and images"
source: "https://community.rockrms.com/documentation/bookcontent/10/372"
sourceLabel: Checking-out Check-in
---
> **Path:** Checking-out Check-in > Themes

Rock ships with several different check-in themes. Use these themes to give your check-in process the look and feel that best fits the event you're hosting. Some might be more friendly for children, while others might be better for adults. You can change themes as often as you need to, which is great because we're always adding more!

![Themes](https://rockrms.blob.core.windows.net/documentation/Books/10/1.17.0/images/themes-v11.png)

Rock Check-in Themes

# Change That Logo

The Rock logo on some themes isn't there to promote Rock. It's there as a placeholder, giving you the option to add your own logo with one simple file change.

There are two ways to activate a theme:

1. You can select the theme to use during each check-in session on the check-in admin page that is displayed when you first start the check-in process at `http://[your-rock-server]/checkin`.
2. You can temporarily change the theme by appending `?theme=themename` in the address of your browser on a check-in page. This is a good solution when you'd like to support multiple check-in themes with a simple configuration.

# Working with the Aero Theme

You can use the [Theme Styler](https://community.rockrms.com/documentation/bookcontent/14#themestyler) to customize any of Rock’s check-in themes. However, the Aero theme takes this to the next level. With just a few clicks you can quickly and easily transform your check-in look and feel.

Pictured below is the Aero theme’s welcome screen as it ships with Rock.

![Aero Theme Welcome Screen](https://rockrms.blob.core.windows.net/documentation/Books/10/1.17.0/images/aero-theme-welcome-screen-default-v11.png)

Aero Theme Welcome Screen

Let’s look at the configuration for the Aero theme to see some of the options you have for making changes. You can get to the page pictured below by navigating to Admin Tools \> CMS Configuration \> Themes.

![Aero Theme Styler](https://rockrms.blob.core.windows.net/documentation/Books/10/1.17.0/images/aero-theme-styler-default-v13.png)

Aero Theme Styler

Note the *Background Color* and *Brand Primary* colors above. Also take note of the two images near the bottom. As shown in the next screenshot below, we’re going to change those colors and images.

![Aero Theme Changes](https://rockrms.blob.core.windows.net/documentation/Books/10/1.17.0/images/aero-theme-styler-custom-v13.png)

Aero Theme Changes

With these changes in place, you can see in the screenshot below we now have a theme that looks very different from what we started with. All the changes were done without needing any web design experience.

# Easy Reset

In the screenshot above you might have noticed the small 'X' icons next to the items that were changed. Simply click each 'X' to automatically reset the configuration back to how it was originally.

![Aero Theme Welcome Screen with Changes](https://rockrms.blob.core.windows.net/documentation/Books/10/1.17.0/images/aero-theme-welcome-screen-custom-v11.png)

Welcome Screen with Changes

# Maximizing Impact

You can see in the screen above that we used the changes to promote our upcoming summer camp. You can configure the theme for branding, promotions or anything else you want your guests to see. As if that wasn’t enough, the Aero theme is optimized for mobile, so you don’t have to worry about how it looks on smaller screens.

# Creating New Themes

While standard themes might work for many organizations, some may wish to create a custom theme. This is pretty simple if you have some web design experience. Follow the steps below:

1. Download our Photoshop PSD check-in theme design template from: [https://storage.rockrms.com/resources/Check-in-Template-v1\_0\_0.psd](https://storage.rockrms.com/resources/check-in-theme-template-v1_0_0.psd)
2. Edit this template by:
	1. Changing the background to an image of your choosing. It should be a retina-sized image (2696 x 2048).
		2. Changing the colors on the assets (buttons, headers, etc.) to suit your needs and compliment your background colors.
		3. Hiding the assets layer and saving the background to your desktop as background@2x.jpg.
		4. Re-sizing the file to 50% and saving this to your desktop as background.jpg.
3. Go to the RockWeb\\Themes\\ folder on your server (or better yet - development environment) and make the following edits:
	1. Make a copy of the existing CheckinPark\\ theme folder (along with its subfolders).
		2. Overwrite the two background images in the <themename\>\\Assets\\Images\\ folder with the ones you created earlier. We recommend giving the images new names to avoid caching conflicts with previous themes. Make sure the new file names are correctly specified in the theme settings at Admin Tools \> CMS Configuration \> Themes.
		3. Edit the <themename\>\\CSS\\checkin-theme.less and change the fonts and colors of the named assets (the things you modified in the PSD) found in the *Variables* section of the file.
		4. If you need additional styling, put your changes in the *Custom Overrides* section of the file.
		5. Compile your Less into CSS.
4. Test your theme by appending '?theme=<themename\>' to the address of one of your check-in pages.

# Theme Sounds

You can customize the sound effects of any check-in theme from directly inside the theme's Assets folder. See our [Designing and Building Websites Using Rock](https://community.rockrms.com/documentation/bookcontent/14#designingthemes) guide for more information on working with theme contents.

