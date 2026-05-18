---
description: Use when embedding videos on Rock websites using the Media Player Lava shortcode with analytics tracking and content channel integration
source: "https://community.rockrms.com/documentation/bookcontent/14/370"
sourceLabel: Designing and Building Websites Using Rock
---
> **Path:** Designing and Building Websites Using Rock > Publishing Digital Media

Publishing Digital Media

You can use Rock's Media features to access data about plays, engagement and the overall effectiveness of your videos. For full details about the Media features, see the [Rock Admin Hero Guide](https://community.rockrms.com/documentation/bookcontent/9#DigitalMedia). But, in order to gather and track all that information, people need to be able to access your videos. In this chapter we'll look at how to publish digital media to your site.

# Media Player Lava Shortcode

Trying to get a video displayed on a page used to be kind of a pain. But not anymore, thanks to the Media Player Lava shortcode. At a minimum, you can add a media player and a video to a page by simply providing the video's URL in the *src* parameter of the shortcode as shown in the example below for a YouTube video.



{\[ mediaplayer src:'https://www.youtube.com/watch?v=FZUH2tFM2Zg' \]}{\[ endmediaplayer \]}
            

Pretty easy, right? All it takes is that single line of code. And if you're using Rock's media features for your videos then you can also easily choose which file (e.g. HLS, HD, SD) you want to use by copying the URL directly from the *Media Files* page, which is accessible from the *Media Element* page under Admin Tools \> CMS Configuration \> Media Accounts \> \[Your Account\] \> \[Your Folder\] \> \[Your Media Element\].

But the example above only scratches the surface of what you can do with the Media Player shortcode. Especially when combined with Rock's media features, you'll see how powerful this can truly be. We'll go over an example below, but for full details you'll want to check out the shortcode yourself under Admin Tools \> CMS Configuration \> Lava Shortcodes \> Media Player.

## Using with Content Channel Items

While you can use the Media Player shortcode anywhere, a common use will be for Content Channel Items. After all, a new Content Channel Item can be automatically created whenever a new video gets uploaded to your video service provider. This feature requires that the Content Channel has an Item Attribute of type Media Element, which we'll reference in the example Lava template below.

The below template is mostly the same as the *PodcastMessageDetail.lava* template that ships with Rock. For this example, a new `mediaElement` variable was added, and a new `if` statement was added, both to replace the former `videoEmbed` logic. Note that we're using the *media* parameter and providing it with the GUID of the Media Element. The *media* parameter, as opposed to the *src* parameter from the example above, is needed to get interactions and analytics data for video watches.

We've also added additional parameters to set the *autoresumeindays* and *combineplaystatisticsindays* to 14 days each (default is 7). With these settings, if the person goes more than 14 days without watching then they'll start from the beginning of the video on their next watch and a new "Individual Play" will be added to the [Media Element analytics](https://community.rockrms.com/documentation/bookcontent/9#mediaanalytics) page. Lastly, we're setting the *width* of the player to 75% to make it a little smaller on the screen.



{% assign mediaElement = Item | Attribute:'MediaElement','RawValue' %}

<article class\="message-detail"\>
	
	{% if mediaElement != '' %}
	    {\[ mediaplayer media:'{{ mediaElement }}' autoresumeindays:'14' combineplaystatisticsindays:'14' width:'75%' \]}{\[ endmediaplayer \]}
	{% endif %}

	<h1\>{{ Item.Title }}</h1\>

	<p\>
		<strong\> {{ Item | Attribute:'Speaker' }} - {{ Item.StartDateTime | Date:'M/d/yyyy' }}</strong\>
	</p\>

	<div class\="row"\>
		<div class\="col-md-8"\>
			{{ Item.Content }}
		</div\>
		<div class\="col-md-4"\>
		    \[...\]
		</div\>
	</div\>
</article\>
                

Again, you'll want to check out the shortcode for yourself to get familiar with the many different parameters you can use to adjust the look and functionality of the media player to suit your specific needs and digital strategy. It's still only one line of code, but will have thousands of lines of impact.

