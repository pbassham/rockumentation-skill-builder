---
description: Use when building a product catalog interface with category listings on the left and product images displayed on the right side
source: "https://community.rockrms.com/developer/apple-tv-docs"
sourceLabel: Apple TV Docs
---
> **Path:** 

Use this template to display information about groups of like products; for example, a movie catalog that provides categories for dramas, comedies, and all movies. Each group of products is contained in its own section and displayed along the left side of the screen. Images depicting the products contained within a selected group are displayed in the related content area on the right side of the screen.

![](https://community.rockrms.com/GetImage.ashx?Id=66416)

## Tips & Tricks

- Default theme: System default

## Templates

Default

![](https://community.rockrms.com/GetImage.ashx?Id=66417)

```
<document>
    <head>
      <style>
      </style>
    </head>
    
    <catalogTemplate>
      <banner>
        <title>Title</title>
      </banner>
      
      <list>
        <section>
          <header>
            <title>Section Header</title>
          </header>
          
          <listItemLockup>
            <title>Title 1</title>
            <decorationLabel>6</decorationLabel>
            <relatedContent>
              <grid>
                <section>
                  <lockup>
                    <img src="/resources/images/lockups/square_1.jpg" width="340" height="340" />
                    <title class="whiteText">Title 1</title>
                  </lockup>
                  
                  <lockup>
                    <img src="/resources/images/lockups/square_2.jpg" width="340" height="340" />
                    <title class="whiteText">Title 2</title>
                  </lockup>
                  
                  <lockup>
                    <img src="/resources/images/lockups/square_3.jpg" width="340" height="340" />
                    <title class="whiteText">Title 3</title>
                  </lockup>
                  
                  <lockup>
                    <img src="/resources/images/lockups/square_4.jpg" width="340" height="340" />
                    <title class="whiteText">Title 4</title>
                  </lockup>
                  
                  <lockup>
                    <img src="/resources/images/lockups/square_5.jpg" width="340" height="340" />
                    <title class="whiteText">Title 5</title>
                  </lockup>
                  
                  <lockup>
                    <img src="/resources/images/lockups/square_6.jpg" width="340" height="340" />
                    <title class="whiteText">Title 6</title>
                  </lockup>
                </section>
              </grid>
            </relatedContent>
          </listItemLockup>
        </section>
        
        <section>
          <header>
            <title>Section Header</title>
          </header>
          
          <listItemLockup>
            <title>Title 2</title>
            <decorationLabel>10</decorationLabel>
            <relatedContent>
              <grid>
                <section>
                  <lockup>
                    <img src="/resources/images/lockups/square_10.jpg" width="340" height="340" />
                    <title class="whiteText">Title 1</title>
                  </lockup>
                  
                  <lockup>
                    <img src="/resources/images/lockups/square_9.jpg" width="340" height="340" />
                    <title class="whiteText">Title 2</title>
                  </lockup>
                  
                  <lockup>
                    <img src="/resources/images/lockups/square_8.jpg" width="340" height="340" />
                    <title class="whiteText">Title 3</title>
                  </lockup>
                  
                  <lockup>
                    <img src="/resources/images/lockups/square_7.jpg" width="340" height="340" />
                    <title class="whiteText">Title 4</title>
                  </lockup>
                  
                  <lockup>
                    <img src="/resources/images/lockups/square_6.jpg" width="340" height="340" />
                    <title class="whiteText">Title 5</title>
                  </lockup>
                  
                  <lockup>
                    <img src="/resources/images/lockups/square_5.jpg" width="340" height="340" />
                    <title class="whiteText">Title 6</title>
                  </lockup>
                  
                  <lockup>
                    <img src="/resources/images/lockups/square_4.jpg" width="340" height="340" />
                    <title class="whiteText">Title 7</title>
                  </lockup>
                  
                  <lockup>
                    <img src="/resources/images/lockups/square_3.jpg" width="340" height="340" />
                    <title class="whiteText">Title 8</title>
                  </lockup>
                  
                  <lockup>
                    <img src="/resources/images/lockups/square_2.jpg" width="340" height="340" />
                    <title class="whiteText">Title 9</title>
                  </lockup>
                  
                  <lockup>
                    <img src="/resources/images/lockups/square_1.jpg" width="340" height="340" />
                    <title class="whiteText">Title 10</title>
                  </lockup>
                </section>
              </grid>
            </relatedContent>
          </listItemLockup>
          
          <listItemLockup>
            <title>Title 3</title>
            <decorationLabel>6</decorationLabel>
            <relatedContent>
              <grid>
                <section>
                  <lockup>
                    <img src="/resources/images/lockups/square_6.jpg" width="340" height="340" />
                    <title class="whiteText">Title 1</title>
                  </lockup>
                  
                  <lockup>
                    <img src="/resources/images/lockups/square_5.jpg" width="340" height="340" />
                    <title class="whiteText">Title 2</title>
                  </lockup>
                  
                  <lockup>
                    <img src="/resources/images/lockups/square_4.jpg" width="340" height="340" />
                    <title class="whiteText">Title 3</title>
                  </lockup>
                  
                  <lockup>
                    <img src="/resources/images/lockups/square_3.jpg" width="340" height="340" />
                    <title class="whiteText">Title 4</title>
                  </lockup>
                  
                  <lockup>
                    <img src="/resources/images/lockups/square_2.jpg" width="340" height="340" />
                    <title class="whiteText">Title 5</title>
                  </lockup>
                  
                  <lockup>
                    <img src="/resources/images/lockups/square_1.jpg" width="340" height="340" />
                    <title class="whiteText">Title 6</title>
                  </lockup>
                </section>
              </grid>
            </relatedContent>
          </listItemLockup>
          
          <listItemLockup>
            <title>Loading...</title>
            <relatedContent>
              <activityIndicator />
            </relatedContent>
          </listItemLockup>
          
        </section>
      </list>
    </catalogTemplate>
  </document>
```
