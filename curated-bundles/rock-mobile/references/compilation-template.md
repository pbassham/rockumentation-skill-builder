---
description: "Use when displaying a product composed of multiple related items, like a podcast with episodes, that needs grouped sections, header info, related images, and action buttons"
source: "https://community.rockrms.com/developer/apple-tv-docs"
sourceLabel: Apple TV Docs
---
> **Path:** 

Use this template to display information about one product that is made up of several distinct pieces; for example, a podcast and all of the episodes that it contains. The header area on the left side of the screen contains general product information. Directly underneath the header area are several section areas that group like types of information; for example, one section can contain all of the episodes in the podcast. The related content on the right side of the screen contains any images associated with the product and buttons that the user can use to interact with the product, such as Play and Favorite buttons.

![](https://community.rockrms.com/GetImage.ashx?Id=66418)

## Tips & Tricks

- Default theme: System preference
- Supports blurred image background: True
- Quick navigation is automatically handled when scrolling through a long list of items

## Templates

**Default**

![](https://community.rockrms.com/GetImage.ashx?Id=66419)

```
<document>
  <head>
    <style>
    </style>
  </head>
  
  <compilationTemplate theme="dark">
    <list>
      <relatedContent>
        <itemBanner>
          <heroImg src="/resources/images/general/square_l_2.jpg" width="556" height="556" />
          <row>
            <buttonLockup>
              <badge src="resource://button-add-alt" class="whiteButton" />
              <title>Title 1</title>
            </buttonLockup>
            
            <buttonLockup>
              <badge src="resource://button-rate" class="whiteButton" />
              <title>Title 2</title>
            </buttonLockup>
            
            <buttonLockup>
              <badge src="resource://button-more" class="whiteButton" />
              <title>Title 3</title>
            </buttonLockup>
          </row>
        </itemBanner>
      </relatedContent>
      
      <header>
        <title>Title</title>
        <subtitle>Subtitle</subtitle>
        <row>
          <text>Text 1</text>
          <text>Text 2</text>
        </row>
      </header>

      <section>
        <description handlesOverflow="true">Lorem ipsum dolor sit amet, ligula suspendisse nulla pretium, rhoncus tempor placerat fermentum, enim integer ad vestibulum volutpat. Nisl rhoncus turpis est, vel elit, congue wisi enim nunc ultricies sit, magna tincidunt. Maecenas aliquam maecenas ligula nostra, accumsan taciti. Sociis mauris in integer, a dolor netus non dui aliquet, sagittis felis sodales, dolor sociis mauris, vel eu libero cras. Interdum at. Eget habitasse elementum est, ipsum purus pede porttitor class, ut adipiscing, aliquet sed auctor, imperdiet arcu per diam dapibus libero duis. Enim eros in vel, volutpat nec pellentesque leo, temporibus scelerisque nec.</description>
      </section>

      <section>
        <listItemLockup autoHighlight="true">
          <ordinal minLength="2">1</ordinal>
          <title>Title 1</title>
          <subtitle>Subtitle 1</subtitle>
          <decorationLabel>Text</decorationLabel>
        </listItemLockup>
        
        <listItemLockup>
          <ordinal minLength="2">2</ordinal>
          <title>Title 2</title>
          <subtitle>Subtitle 2</subtitle>
          <decorationLabel>Text</decorationLabel>
        </listItemLockup>
        
        <listItemLockup>
          <ordinal minLength="2">3</ordinal>
          <title>Title 3</title>
          <subtitle>Subtitle 3</subtitle>
          <decorationLabel>Text</decorationLabel>
        </listItemLockup>
        
        <listItemLockup>
          <ordinal minLength="2">4</ordinal>
          <title>Title 4</title>
          <subtitle>Subtitle 4</subtitle>
          <decorationLabel>Text</decorationLabel>
        </listItemLockup>
        
        <listItemLockup>
          <ordinal minLength="2">5</ordinal>
          <title>Title 5</title>
          <subtitle>Subtitle 5</subtitle>
          <decorationLabel>Text</decorationLabel>
        </listItemLockup>
        
        <listItemLockup>
          <ordinal minLength="2">6</ordinal>
          <title>Title 6</title>
          <subtitle>Subtitle 6</subtitle>
          <decorationLabel>Text</decorationLabel>
        </listItemLockup>
        
        <listItemLockup>
          <ordinal minLength="2">7</ordinal>
          <title>Title 7</title>
          <subtitle>Subtitle 7</subtitle>
          <decorationLabel>Text</decorationLabel>
        </listItemLockup>
        
        <listItemLockup>
          <ordinal minLength="2">8</ordinal>
          <title>Title 8</title>
          <subtitle>Subtitle 8</subtitle>
          <decorationLabel>Text</decorationLabel>
        </listItemLockup>
        
        <listItemLockup>
          <ordinal minLength="2">9</ordinal>
          <title>Title 9</title>
          <subtitle>Subtitle 9</subtitle>
          <decorationLabel>Text</decorationLabel>
        </listItemLockup>
        
        <listItemLockup>
          <ordinal minLength="2">10</ordinal>
          <title>Title 10</title>
          <subtitle>Subtitle 10</subtitle>
          <decorationLabel>Text</decorationLabel>
        </listItemLockup>
      </section>
    </list>
  </compilationTemplate>
</document>
```

**Background Image**

![](https://community.rockrms.com/GetImage.ashx?Id=66420)

```
<document>
  <head>
    <style>
    </style>
  </head>
  
  <compilationTemplate>
    <background>
        <img srcset="/resources/images/background/bg_list_uber.jpg (layout-direction:ltr), /resources/images/background/bg_list_uber_rtl.jpg (layout-direction:rtl)" />
    </background>
    
    <list>
      <relatedContent>
        <itemBanner>
          <row>
            <buttonLockup>
              <badge src="resource://button-add-alt" class="whiteButton" />
              <title>Title 1</title>
            </buttonLockup>
            <buttonLockup>
              <badge src="resource://button-rate" class="whiteButton" />
              <title>Title 2</title>
            </buttonLockup>
            <buttonLockup>
              <badge src="resource://button-more" class="whiteButton" />
              <title>Title 3</title>
            </buttonLockup>
          </row>
        </itemBanner>
      </relatedContent>
      
      <header>
        <title>Title</title>
        <subtitle>Subtitle</subtitle>
        <row>
          <text>Text 1</text>
          <text>Text 2</text>
        </row>
      </header>

      <section>
        <description handlesOverflow="true">Lorem ipsum dolor sit amet, ligula suspendisse nulla pretium, rhoncus tempor placerat fermentum, enim integer ad vestibulum volutpat. Nisl rhoncus turpis est, vel elit, congue wisi enim nunc ultricies sit, magna tincidunt. Maecenas aliquam maecenas ligula nostra, accumsan taciti. Sociis mauris in integer, a dolor netus non dui aliquet, sagittis felis sodales, dolor sociis mauris, vel eu libero cras. Interdum at. Eget habitasse elementum est, ipsum purus pede porttitor class, ut adipiscing, aliquet sed auctor, imperdiet arcu per diam dapibus libero duis. Enim eros in vel, volutpat nec pellentesque leo, temporibus scelerisque nec.</description>
      </section>

      <section>
        <listItemLockup autoHighlight="true">
          <img src="/resources/images/lockups/square_1.jpg" width="90" height="90" />
          <title>Title 1</title>
          <subtitle>Subtitle 1</subtitle>
          <decorationLabel>Text</decorationLabel>
        </listItemLockup>
        
        <listItemLockup>
          <img src="/resources/images/lockups/square_2.jpg" width="90" height="90" />
          <title>Title 2</title>
          <subtitle>Subtitle 2</subtitle>
          <decorationLabel>Text</decorationLabel>
        </listItemLockup>
        
        <listItemLockup>
          <img src="/resources/images/lockups/square_3.jpg" width="90" height="90" />
          <title>Title 3</title>
          <subtitle>Subtitle 3</subtitle>
          <decorationLabel>Text</decorationLabel>
        </listItemLockup>
        
        <listItemLockup>
          <img src="/resources/images/lockups/square_4.jpg" width="90" height="90" />
          <title>Title 4</title>
          <subtitle>Subtitle 4</subtitle>
          <decorationLabel>Text</decorationLabel>
        </listItemLockup>
        
        <listItemLockup>
          <img src="/resources/images/lockups/square_5.jpg" width="90" height="90" />
          <title>Title 5</title>
          <subtitle>Subtitle 5</subtitle>
          <decorationLabel>Text</decorationLabel>
        </listItemLockup>
        
        <listItemLockup>
          <img src="/resources/images/lockups/square_6.jpg" width="90" height="90" />
          <title>Title 6</title>
          <subtitle>Subtitle 6</subtitle>
          <decorationLabel>Text</decorationLabel>
        </listItemLockup>
        
        <listItemLockup>
          <img src="/resources/images/lockups/square_7.jpg" width="90" height="90" />
          <title>Title 7</title>
          <subtitle>Subtitle 7</subtitle>
          <decorationLabel>Text</decorationLabel>
        </listItemLockup>
        
        <listItemLockup>
          <img src="/resources/images/lockups/square_8.jpg" width="90" height="90" />
          <title>Title 8</title>
          <subtitle>Subtitle 8</subtitle>
          <decorationLabel>Text</decorationLabel>
        </listItemLockup>
        
        <listItemLockup>
          <img src="/resources/images/lockups/square_9.jpg" width="90" height="90" />
          <title>Title 9</title>
          <subtitle>Subtitle 9</subtitle>
          <decorationLabel>Text</decorationLabel>
        </listItemLockup>
        
        <listItemLockup>
          <img src="/resources/images/lockups/square_10.jpg" width="90" height="90" />
          <title>Title 10</title>
          <subtitle>Subtitle 10</subtitle>
          <decorationLabel>Text</decorationLabel>
        </listItemLockup>
      </section>
    </list>
  </compilationTemplate>
</document>
```

---

## Menu Bar Template {#menu-bar-template}

Use this template to display a list of selectable items across the top of the screen. Users can move between menu bar items to change the information displayed below the menu bar.

Important

Navigation with this template will not work with the current version of the shell.

![](https://community.rockrms.com/GetImage.ashx?Id=66421)

## Tips & Tricks

- Default theme: System preference

## Templates

**Default**

![](https://community.rockrms.com/GetImage.ashx?Id=66422)

```
<document>
  <menuBarTemplate>
    <menuBar>
      <menuItem documentURL="/templates/menubar/MenuBar_Page_1.xml">
        <title>Tab 1</title>
      </menuItem>
      
      <menuItem documentURL="/templates/menubar/MenuBar_Page_2.xml" autoHighlight="true">
        <title>Tab 2</title>
      </menuItem>
      
      <menuItem documentURL="/templates/menubar/MenuBar_Page_3.xml">
        <title>Tab 3</title>
      </menuItem>
    </menuBar>
  </menuBarTemplate>
</document>
```
