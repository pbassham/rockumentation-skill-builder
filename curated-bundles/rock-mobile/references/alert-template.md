---
description: Use when you need to create a modal alert displaying important information with action buttons for Rock mobile apps
source: "https://community.rockrms.com/developer/apple-tv-docs"
sourceLabel: Apple TV Docs
---
> **Path:** 

Use this template to display important information, such as a message telling the user to perform an action before continuing. At a minimum, provide a description of the alert and a button so the user can take any required actions.

![](https://community.rockrms.com/GetImage.ashx?Id=66405)

## Tips & Tricks

- Default theme: System preference

## Templates

**Default**

![](https://community.rockrms.com/GetImage.ashx?Id=66406)

```
<document>
	<head>
	</head>
	<alertTemplate>
	    <title>Title</title>
	    <description>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</description>
		<button>
			<text>Button 1</text>
		</button>
		<button>
			<text>Button 2</text>
		</button>
	    <text>Additional Text 1</text>
	    <text>Additional Text 2</text>
	</alertTemplate>
</document>
```

**Background Image**

![](https://community.rockrms.com/GetImage.ashx?Id=66407)

```
<document>
    <alertTemplate>
        <background>
            <img srcset="/resources/images/background/bg_dark.jpg (theme:dark), /resources/images/background/bg_light.jpg (theme:light)" />
        </background>
        <title>Title</title>
        <button>
            <text>Button 1</text>
        </button>
        <button>
            <text>Button 2</text>
        </button>
        <button disabled="true">
            <text>Button 3</text>
        </button>
        <button>
            <text>Button 4</text>
        </button>
        <button>
            <text>Button 5</text>
        </button>
        <button autoHighlight="true">
            <text>Button 6</text>
            <badge src="resource://button-checkmark" style="margin:0 20 0;" />
        </button>
        <button>
            <text>Button 7</text>
        </button>
        <button>
            <text>Button 8</text>
        </button>
        <button>
            <text>Button 9</text>
        </button>
        <button>
            <text>Button 10</text>
        </button>
        <button>
            <text>Button 11</text>
        </button>
        <button>
            <text>Button 12</text>
        </button>
        <button>
            <text>Button 13</text>
        </button>
        <button>
            <text>Button 14</text>
        </button>
        <button>
            <text>Button 15</text>
        </button>
    </alertTemplate>
</document>
```
