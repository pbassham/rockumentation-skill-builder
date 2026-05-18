---
description: "Use when user needs to create, manage, or apply merge documents in Rock to format and export data from grids into Word or HTML documents"
source: "https://community.rockrms.com/documentation/bookcontent/9/368"
sourceLabel: Rock Admin Hero Guide
---
> **Path:** Rock Admin Hero Guide > Merge Documents

Merge Documents

Hopefully by now you've had a chance to play with "Lava", Rock's templating engine. To know Lava is to love Lava. Much of the time Lava is used to format many of the pages in Rock. But what if you wanted to use Lava to format documents? Well, that's exactly what merge documents do.

Rock ships with two different merge document formats: Word and HTML. The HTML format is pretty simple—just create a new HTML file and embed Lava much like you do elsewhere in Rock. The Word format makes it super simple to achieve amazing results. Let's take a look at the output from a few sample documents to see what's possible.

![](https://rockrms.blob.core.windows.net/documentation/Books/9/1.17.0/images/mergedoc-samples.png)

Merge Documents

Let's look at how you manage and use merge docs. Then we'll dive deeper into how to create and format them.

# Using a Merge Document

You'll notice at the bottom of most grids there's a button. Pressing this button will take the contents of the grid and make it available to import into a merge document.

![](https://rockrms.blob.core.windows.net/documentation/Books/9/1.18.0/images/merge-template-entry-v18.png)

Merge Document Page

That’s it! Pretty easy, no?

# Administrating Merge Templates

Merge documents are created from templates. Some merge templates will be used by everyone; others, though, can be limited to a specific role or person. To help keep the list of merge documents from getting out of hand, we’ve created the ability to classify templates as either global or personal.

## Global Merge Templates

You can set up a list of merge templates that are accessible to everyone in the database under Admin Tools \> Settings \> Merge Templates.

![](https://rockrms.blob.core.windows.net/documentation/Books/9/1.18.0/images/merge-templates-v18.png)

Global Templates

Security can be added to templates on the *Merge Template Detail* block. Security settings are enforced whenever a merge document is created.

## Personal Merge Templates

You can set up a merge document for your personal use on your *My Settings* page (found under the dropdown in the upper-right corner of the screen).

![](https://rockrms.blob.core.windows.net/documentation/Books/9/1.18.0/images/mergedoc-personal-v18.png)

Personal Templates

From this screen you’ll see your own personal templates. You can also access Global templates by updating the block's settings.

# Creating a Merge Document

As mentioned previously, Rock currently supports two different merge document formats: HTML and Word. Below we cover how to create a merge document for each format.

## Word

The most common document format is Word. Creating these documents is actually pretty simple. Before we jump in it's important to talk about the two strategies for merging using Word.

The first strategy is to create a Word document where the whole document acts as a template for each record. This is most common for things like letters.

![](https://rockrms.blob.core.windows.net/documentation/Books/9/1.17.0/images/mergedoc-wordmarkup-letter.png)

Sample Merge Letter Template

With this type of document, you can simply open Word, type your letter and then add in the Lava where you want the dynamic text to show.

You have access to several Lava functions in Word. So, things like `{{ 'Now' | Date:' MMMM d, yyyy ' }}` will add the current date and time. You can also print data using the "Row" format, as in `{{ Row.NickName }}`. That pattern should get you most of what you need. You can additionally add in variables (like `{% assign now = 'Now' | Date %}`) and then print those variables. All of the Lava tags work except `if`, `raw`, and `lava`, while none of the Lava commands or Lava Shortcodes will work.

The second merge document strategy is for occasions when you want more than one record to be displayed on a single page. This is often the case for tasks like creating mailing labels. When creating these types of documents add a `{% Next %}` code to move to the next record in the list.

![](https://rockrms.blob.core.windows.net/documentation/Books/9/1.16.0/images/sample-label-merge-template-v16.png)

Sample Label Merge Template

Rock will automatically figure out what strategy your document is using so there's no extra configuration.

## HTML

You might be wondering, "Why would I ever want to use HTML for a merge document?" At first blush it does seem a little odd. HTML, however, is a great tool for incorporating rich media into a format that can easily be printed. It’s often the best choice when you need to print a report that requires showing maps (easy to display using Google's static map API) or person photos (links to their photo in Rock).

Below is a quick example of some HTML/Lava that will present a list of people with their photos (this assumes that the merge document is passed a list of people).

![](https://rockrms.blob.core.windows.net/documentation/Books/9/1.17.0/images/mergedoc-htmlsample-v12.png)

Output of HTML Template



1   <html\>
2       <head\>
3   		<title\>Group Roster</title\>
4   		<link rel\="stylesheet" href\="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css"\>
5    	</head\>
6    	
7    	<body\>
8    	    <div class\="container" style\="margin-top: 100px"\>
9    			<div class\="row"\>
10    			    
11    				{% for row in Rows %}
12    					<div class\="col-xs-6 clearfix" style\="margin-bottom: 24px; min-height: 200px;"\>
13   						<div class\="pull-left" style\="margin-right: 24px; width:20%;"\>
14    							<img src\="{{ 'Global' | Attribute:'PublicApplicationRoot' }}{{ row.PhotoUrl }}" style\="width: 100%; border-radius: 100px;" /\>
15    						</div\>
16    						<div class\="pull-left"\>
17    							<h1\>{{ row.FullName }}</h1\>
18    							{{ row.Email }} <br /\>
19    							{% for phone in row.PhoneNumbers %}
20    								{{ phone.NumberFormatted }} <small\>{{ phone.NumberTypeValue.Value }}</small\> <br /\>
21    							{% endfor %}
22    						</div\>
23   					</div\>
24    				{% endfor %}
25    				
26    			</div\>
27    		</div\>
28    	</body\>
29  </html\>

Note a few things in the code:

- **Line 4:** We link out to a hosted version of the Bootstrap CSS file. This provides an easy way to get a default set of styles.
- **Line 11:** Now we simply run through each of the rows that were passed to us.
- **Line 14:** Inserting a photo is simple! The *PhotoUrl* property for a person even returns a generic image if the person doesn’t have a photo.

As you can see, creating HTML merge documents is easy. Here are a few additional tips:

- Adding map images to your merge documents is also fairly simple. Use the following links for more information:
	- [Google Maps API](https://developers.google.com/maps/documentation/staticmaps/intro)
		- [Static Map Helper](http://staticmapmaker.com/)
- HTML merge documents are usually printed. While most people think of HTML as an online-only file format, it actually does have several print capabilities like page breaks. Here are a few links to point you in the right direction:
	- [Styling for Print](https://codex.wordpress.org/Styling_for_Print)
		- [CSS Page Breaks](http://davidwalsh.name/css-page-breaks/)

# Cloud Flare

Enabling Scrape Shield with Cloud Flare will block email addresses in HTML merge documents. If you're using this service, it will need to be disabled.

# Lava Tips With Merge Documents

For the most part your [Lava](https://community.rockrms.com/lava/) skills will all work with Merge Templates. There are a couple of tricks, though, that we'll outline below.

- While merge templates can be used on any entity type, they'll most often be used on people. To help make your templates work with as many 'grids' of people data as possible we convert group member entities to people.
- Should you need access to the group member data (e.g., group member attributes) you can use the GroupMember property on the person like: `{{ Row.GroupMember | Attribute:'attributekey' }}`
- Be sure you're using straight quotes and not curved or stylized quotes. For instance, `{{ 'Now' | Date:'MMMM d, yyyy' }}` is correct, while `{{ ‘Now’ | Date:‘MMMM d, yyyy’ }}` will likely give you an error.

