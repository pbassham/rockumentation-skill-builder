---
description: Use when creating a mobile UI with a category list on the right and auto-scrolling image carousel on the left
source: "https://community.rockrms.com/developer/apple-tv-docs"
sourceLabel: Apple TV Docs
---
> **Path:** 

Use this template to display a list of automatically scrolling, static images on the left that are associated with a selected category on the right.

![](https://community.rockrms.com/GetImage.ashx?Id=66414)

## Tips & Tricks

- Default theme: System preference

## Templates

**Default**

![](https://community.rockrms.com/GetImage.ashx?Id=66415)

```
<?xml version="1.0" encoding="UTF-8" ?>
<!--
See LICENSE folder for this sample’s licensing information.
-->
<document>
  <paradeTemplate>
    <list>
      <header>
        <title>Title</title>
      </header>
      <section>
        <listItemLockup>
          <title>Title 1</title>
          <relatedContent>
            <imgDeck>
              <img src="/resources/images/general/square_l_10.jpg" />
              <img src="/resources/images/general/square_l_8.jpg" />
              <img src="/resources/images/general/square_l_6.jpg" />
              <img src="/resources/images/general/square_l_4.jpg" />
            </imgDeck>
          </relatedContent>
        </listItemLockup>
        <listItemLockup>
          <title>Title 2</title>
        </listItemLockup>
        <listItemLockup>
          <title>Title 3</title>
        </listItemLockup>
        <listItemLockup>
          <title>Title 4</title>
        </listItemLockup>
        <listItemLockup>
          <title>Title 5</title>
        </listItemLockup>
        <listItemLockup>
          <title>Title 6</title>
        </listItemLockup>
      </section>
      <relatedContent>
        <imgDeck>
          <img src="/resources/images/general/square_l_1.jpg" />
          <img src="/resources/images/general/square_l_2.jpg" />
          <img src="/resources/images/general/square_l_3.jpg" />
          <img src="/resources/images/general/square_l_4.jpg" />
          <img src="/resources/images/general/square_l_5.jpg" />
          <img src="/resources/images/general/square_l_6.jpg" />
          <img src="/resources/images/general/square_l_7.jpg" />
          <img src="/resources/images/general/square_l_8.jpg" />
          <img src="/resources/images/general/square_l_9.jpg" />
          <img src="/resources/images/general/square_l_10.jpg" />
        </imgDeck>
      </relatedContent>
    </list>
  </paradeTemplate>
</document>
```
