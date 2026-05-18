---
description: Use when building a mobile landing page that showcases a main content item with associated related items displayed in a horizontal shelf below
source: "https://community.rockrms.com/developer/apple-tv-docs"
sourceLabel: Apple TV Docs
---
> **Path:** 

Use this template to display detailed information about a content with a number of associated items, such as a page that describes a series, including information about the messages, speakers, and related videos. It could also be used as a landing page, showcasing the latest message, series, or other important promotional content. The top two-thirds of the screen displays general information about the series. The shelf at the bottom provides a row of related items, such as messages in the series.

You can change the look of this page by removing `heroImage` from the `stack` element and replacing it with an `img` element that covers the entire screen.

![](https://community.rockrms.com/GetImage.ashx?Id=66426)

## Tips & Tricks

- Default theme: System preference (`dark` when a background image is specified)
- The `title` element within the `banner``stack` is shown at the top of the page and also appears within the first shelf section once scrolled down. If this isn't desired, use a `text` element instead and style accordingly.
- Consider the readability and contrast of the top stack text if using a background image. Using a color wash, desaturation, or darkened gradient may help the text stand out. Don't forget to check both light and dark themes if supporting both.
- The first shelf area's height is one-third of the screen height by default. Stick with a 5-column grid to keep the full 16:9 ratio lockups in view at the top of the page, otherwise the full lockup images will be shown when scrolled down.
- The first shelf area will have it's own distinct background blur to highlight the section. All other shelves and content sections underneath will fall under another darker background blur.
- Adding lockups to the top shelf without providing `relatedContent` will automatically hide the additional description area below the lockups that updates per selection.
- If there are no focusable elements in the top `banner`, the page will load at the top but immediately scroll to the first shelf. There is no way to scroll back up.

## Templates

**Normal**

![](https://community.rockrms.com/GetImage.ashx?Id=66427)

```
<document>
  <head>
    <style>
    .showTextOnHighlight {
      tv-text-highlight-style: show-on-highlight;
    }
    .badge {
      tv-tint-color: rgb(0, 0, 0);
    }
    .5ColumnGrid {
      tv-interitem-spacing: 50;
    }
    @media tv-template and (tv-theme:dark) {
        .badge {
          tv-tint-color: rgb(255, 255, 255);
        }
    }
    </style>
  </head>
  
  <productBundleTemplate theme="dark">
    <banner>
      <stack>
        <title>Title</title>
        <subtitle>Subtitle</subtitle>
        <row> 
          <text>Text 1</text>
          <text>Text 2</text>
          <badge src="resource://tv-14" class="badge" />
          <badge src="resource://hd" class="badge" />
        </row>

        <description handlesOverflow="true">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim.</description>
        <row>
          <buttonLockup>
            <badge src="resource://button-preview" />
            <title>Title 1</title>
          </buttonLockup>
          <buttonLockup>
            <badge src="resource://button-play" />
            <title>Title 2</title>
          </buttonLockup>
          <buttonLockup>
            <badge src="resource://button-add" />
            <title>Title 3</title>
          </buttonLockup>
        </row>
      </stack>
      <heroImg src="/resources/images/general/square_l_7.jpg" width="666" height="666" />
    </banner>
    
    <shelf class="5ColumnGrid">
      <header>
        <title>Shelf Header (308x175, 5 Column Grid, 50 spacing)</title>
      </header>
      
      <section>
        <lockup>
          <img src="/resources/images/lockups/episode_1.jpg" width="308" height="175" />
          <title class="showTextOnHighlight">Title 1</title>
          <overlay>
            <progressBar value="0.1" />
          </overlay>
          <relatedContent>
            <infoTable>
              <header>
                <title>“Title 1”</title>
              </header>

              <info>
                <header>
                </header>
                <row>
                  <text>Text 1</text>
                  <text>Text 2</text>
                  <badge src="resource://tv-14" class="badge" />
                  <badge src="resource://cc" class="badge" />
                </row>
              </info>

              <info>
                <header>
                  <title>Text 1&#xD;Text 2&#xD;Text 3</title>
                </header>
                <description handlesOverflow="true">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim.</description>
              </info>
            </infoTable>
          </relatedContent>
        </lockup>
        
        <lockup>
          <img src="/resources/images/lockups/episode_2.jpg" width="308" height="175" />
          <title class="showTextOnHighlight">Title 2</title>
          <relatedContent>
            <infoTable>
              <header>
                <title>“Title 2”</title>
              </header>

              <info>
                <header>
                </header>
                <row>
                  <text>Text 1</text>
                  <text>Text 2</text>
                  <badge src="resource://tv-14" class="badge" />
                  <badge src="resource://cc" class="badge" />
                </row>
              </info>

              <info>
                <header>
                  <title>Text 1&#xD;Text 2&#xD;Text 3</title>
                </header>
                <description handlesOverflow="true">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim.</description>
              </info>
            </infoTable>
          </relatedContent>
        </lockup>
        
        <lockup>
          <img src="/resources/images/lockups/episode_3.jpg" width="308" height="175" />
          <title class="showTextOnHighlight">Title 3</title>
          <relatedContent>
            <infoTable>
              <header>
                <title>“Title 3”</title>
              </header>

              <info>
                <header>
                </header>
                <row>
                  <text>Text 1</text>
                  <text>Text 2</text>
                  <badge src="resource://tv-14" class="badge" />
                  <badge src="resource://cc" class="badge" />
                </row>
              </info>

              <info>
                <header>
                  <title>Text 1&#xD;Text 2&#xD;Text 3</title>
                </header>
                <description handlesOverflow="true">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim.</description>
              </info>
            </infoTable>
          </relatedContent>
        </lockup>
        
        <lockup>
          <img src="/resources/images/lockups/episode_4.jpg" width="308" height="175" />
          <title class="showTextOnHighlight">Title 4</title>
          <relatedContent>
            <infoTable>
              <header>
                <title>“Title 4”</title>
              </header>

              <info>
                <header>
                </header>
                <row>
                  <text>Text 1</text>
                  <text>Text 2</text>
                  <badge src="resource://tv-14" class="badge" />
                  <badge src="resource://cc" class="badge" />
                </row>
              </info>

              <info>
                <header>
                  <title>Text 1&#xD;Text 2&#xD;Text 3</title>
                </header>
                <description handlesOverflow="true">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim.</description>
              </info>
            </infoTable>
          </relatedContent>
        </lockup>
        
        <lockup>
          <img src="/resources/images/lockups/episode_5.jpg" width="308" height="175" />
          <title class="showTextOnHighlight">Title 5</title>
          <relatedContent>
            <infoTable>
              <header>
                <title>“Title 5”</title>
              </header>

              <info>
                <header>
                </header>
                <row>
                  <text>Text 1</text>
                  <text>Text 2</text>
                  <badge src="resource://tv-14" class="badge" />
                  <badge src="resource://cc" class="badge" />
                </row>
              </info>

              <info>
                <header>
                  <title>Text 1&#xD;Text 2&#xD;Text 3</title>
                </header>
                <description handlesOverflow="true">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim.</description>
              </info>
            </infoTable>
          </relatedContent>
        </lockup>
        
        <lockup>
          <img src="/resources/images/lockups/episode_6.jpg" width="308" height="175" />
          <title class="showTextOnHighlight">Title 6</title>
          <relatedContent>
            <infoTable>
              <header>
                <title>“Title 6”</title>
              </header>

              <info>
                <header>
                </header>
                <row>
                  <text>Text 1</text>
                  <text>Text 2</text>
                  <badge src="resource://tv-14" class="badge" />
                  <badge src="resource://cc" class="badge" />
                </row>
              </info>

              <info>
                <header>
                  <title>Text 1&#xD;Text 2&#xD;Text 3</title>
                </header>
                <description handlesOverflow="true">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim.</description>
              </info>
            </infoTable>
          </relatedContent>
        </lockup>
      </section>
    </shelf>
    
    <shelf>
      <header>
        <title>Shelf Header</title>
      </header>
      
      <section>
        <lockup>
          <img src="/resources/images/lockups/square_1.jpg" width="172" height="172" />
          <title class="showTextOnHighlight">Title 1</title>
        </lockup>
        
        <lockup>
          <img src="/resources/images/lockups/square_2.jpg" width="172" height="172" />
          <title class="showTextOnHighlight">Title 2</title>
        </lockup>
        
        <lockup>
          <img src="/resources/images/lockups/square_3.jpg" width="172" height="172" />
          <title class="showTextOnHighlight">Title 3</title>
        </lockup>
        
        <lockup>
          <img src="/resources/images/lockups/square_4.jpg" width="172" height="172" />
          <title class="showTextOnHighlight">Title 4</title>
        </lockup>
        
        <lockup>
          <img src="/resources/images/lockups/square_5.jpg" width="172" height="172" />
          <title class="showTextOnHighlight">Title 5</title>
        </lockup>
        
        <lockup>
          <img src="/resources/images/lockups/square_6.jpg" width="172" height="172" />
          <title class="showTextOnHighlight">Title 6</title>
        </lockup>
        
        <lockup>
          <img src="/resources/images/lockups/square_7.jpg" width="172" height="172" />
          <title class="showTextOnHighlight">Title 7</title>
        </lockup>
        
        <lockup>
          <img src="/resources/images/lockups/square_8.jpg" width="172" height="172" />
          <title class="showTextOnHighlight">Title 8</title>
        </lockup>
        
        <lockup>
          <img src="/resources/images/lockups/square_9.jpg" width="172" height="172" />
          <title class="showTextOnHighlight">Title 9</title>
        </lockup>
        
        <lockup>
          <img src="/resources/images/lockups/square_10.jpg" width="172" height="172" />
          <title class="showTextOnHighlight">Title 10</title>
        </lockup>
      </section>
    </shelf>
    
    <shelf>
      <header>
        <title>Reviews &amp; Ratings</title>
      </header>
      
      <section>
        <ratingCard>
          <title>4.1 / 5</title>
          <ratingBadge value="0.7"></ratingBadge>
          <description>Average of 2,241 iTunes user ratings and reviews.</description>
        </ratingCard>
        
        <reviewCard>
          <title>Publisher</title>
          <description>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</description>
          <text>Stephanie Vidal Dec, 24 2015</text>
        </reviewCard>
        
        <reviewCard>
          <title>Publisher</title>
          <description>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</description>
          <text>Euna Kwon Dec, 5 2015</text>
        </reviewCard>
        
        <reviewCard>
          <title>Publisher</title>
          <description>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</description>
          <text>Paul Cashman <date>Dec, 10 2015</date></text>
        </reviewCard>
      </section>
    </shelf>
    
    <shelf>
      <header>
        <title>Shelf Header</title>
      </header>
      
      <section>
        <monogramLockup>
          <monogram src="/resources/images/lockups/square_1.jpg" />
          <title>Adam Gooseff</title>
          <subtitle>Actor</subtitle>
        </monogramLockup>
        
        <monogramLockup>
          <monogram src="/resources/images/lockups/square_2.jpg" />
          <title>Ailish Kimber</title>
          <subtitle>Actor</subtitle>
        </monogramLockup>
        
        <monogramLockup>
          <monogram firstName="Allen" lastName="Buchinski" />
          <title>Allen Buchinski</title>
          <subtitle>Actor</subtitle>
        </monogramLockup>
        
        <monogramLockup>
          <monogram firstName="Dave" lastName="Elfving" />
          <title>Dave Elfving</title>
          <subtitle>Actor</subtitle>
        </monogramLockup>
        
        <monogramLockup>
          <monogram firstName="Ethan" lastName="Izzarelli" />
          <title>Ethan Izzarelli</title>
          <subtitle>Actor</subtitle>
        </monogramLockup>
        
        <monogramLockup>
          <monogram firstName="Euna" lastName="Kwon" />
          <title>Euna Kwon</title>
          <subtitle>Director</subtitle>
        </monogramLockup>
        
        <monogramLockup>
          <monogram firstName="Fritz" lastName="Ogden" />
          <title>Fritz Ogden</title>
          <subtitle>Director</subtitle>
        </monogramLockup>
        
        <monogramLockup>
          <monogram firstName="Gilbert" lastName="Solano" />
          <title>Gilbert Solano</title>
          <subtitle>Director</subtitle>
        </monogramLockup>
      </section>
    </shelf>

    <separator />
    
    <productInfo>
      <infoTable>
        <header>
          <title>Header</title>
        </header>
        
        <info>
          <header>
            <title>Header</title>
          </header>
          <text>Text</text>
        </info>
        
        <info>
          <header>
            <title>Header</title>
          </header>
          <text>Text</text>
        </info>
        
        <info>
          <header>
            <title>Header</title>
          </header>
          <text>Text</text>
        </info>
        
        <info>
          <header>
            <title>Header</title>
          </header>
          <text>Text</text>
        </info>
        
        <info>
          <header>
            <title>Header</title>
          </header>
          <text>Text</text>
        </info>
        
        <info>
          <header>
            <title>Header</title>
          </header>
          <text>Text</text>
        </info>
        
        <footer>
          <text>Footer Text</text>
        </footer>
      </infoTable>
      
      <infoTable>
        <header>
          <title>Header</title>
        </header>
        
        <info>
          <header>
            <badge src="resource://cc" class="badge" />
          </header>
          <text>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.</text>
        </info>
      </infoTable>
      
      <infoTable>
        <header>
          <title>Header</title>
        </header>
        <info>
          <header>
            <title>Title</title>
          </header>
          <text>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.</text>
        </info>
      </infoTable>
      
    </productInfo>
  </productBundleTemplate>
</document>
```

**Background Image**

![](https://community.rockrms.com/GetImage.ashx?Id=66428)

```
<document>
  <head>
    <style>
    .showTextOnHighlight {
      tv-text-highlight-style: show-on-highlight;
    }
    .badge {
      tv-tint-color: rgb(0,0,0);
    }
    .5ColumnGrid {
      tv-interitem-spacing: 50;
    }
    @media tv-template and (tv-theme:dark) {
        .badge {
          tv-tint-color: rgb(255, 255, 255);
        }
    }
    </style>
  </head>
  
  <productBundleTemplate theme="light">
    <background>
      <img srcset="/resources/images/background/bg_product_uber.jpg (layout-direction:ltr), /resources/images/background/bg_product_uber_rtl.jpg (layout-direction:rtl)" />
    </background>
    
    <banner>
      <stack>
        <title>Title</title>
        <subtitle>Subtitle</subtitle>
        <row> 
          <text>Text 1</text>
          <text>Text 2</text>
          <badge src="resource://tv-14" class="badge" />
          <badge src="resource://hd" class="badge" />
        </row>

        <description handlesOverflow="true">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim.</description>
        <row>
          <buttonLockup>
            <badge src="resource://button-preview" />
            <title>Title 1</title>
          </buttonLockup>
          <buttonLockup>
            <badge src="resource://button-play" />
            <title>Title 2</title>
          </buttonLockup>
          <buttonLockup>
            <badge src="resource://button-add" />
            <title>Title 3</title>
          </buttonLockup>
        </row>
      </stack>
    </banner>
    
    <shelf class="5ColumnGrid">
      <header>
        <title>Shelf Header (308x175, 5 Column Grid, 50 spacing)</title>
      </header>
      
      <section>
        <lockup>
          <img src="/resources/images/lockups/episode_1.jpg" width="308" height="175" />
          <title class="showTextOnHighlight">Title 1</title>
          <overlay>
            <progressBar value="0.1" />
          </overlay>
          <relatedContent>
            <infoTable>
              <header>
                <title>“Title 1”</title>
              </header>

              <info>
                <header>
                </header>
                <row>
                  <text>Text 1</text>
                  <text>Text 2</text>
                  <badge src="resource://tv-14" class="badge" />
                  <badge src="resource://cc" class="badge" />
                </row>
              </info>

              <info>
                <header>
                  <title>Text 1&#xD;Text 2&#xD;Text 3</title>
                </header>
                <description handlesOverflow="true">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim.</description>
              </info>
            </infoTable>
          </relatedContent>
        </lockup>
        
        <lockup>
          <img src="/resources/images/lockups/episode_2.jpg" width="308" height="175" />
          <title class="showTextOnHighlight">Title 2</title>
          <relatedContent>
            <infoTable>
              <header>
                <title>“Title 2”</title>
              </header>

              <info>
                <header>
                </header>
                <row>
                  <text>Text 1</text>
                  <text>Text 2</text>
                  <badge src="resource://tv-14" class="badge" />
                  <badge src="resource://cc" class="badge" />
                </row>
              </info>

              <info>
                <header>
                  <title>Text 1&#xD;Text 2&#xD;Text 3</title>
                </header>
                <description handlesOverflow="true">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim.</description>
              </info>
            </infoTable>
          </relatedContent>
        </lockup>
        
        <lockup>
          <img src="/resources/images/lockups/episode_3.jpg" width="308" height="175" />
          <title class="showTextOnHighlight">Title 3</title>
          <relatedContent>
            <infoTable>
              <header>
                <title>“Title 3”</title>
              </header>

              <info>
                <header>
                </header>
                <row>
                  <text>Text 1</text>
                  <text>Text 2</text>
                  <badge src="resource://tv-14" class="badge" />
                  <badge src="resource://cc" class="badge" />
                </row>
              </info>

              <info>
                <header>
                  <title>Text 1&#xD;Text 2&#xD;Text 3</title>
                </header>
                <description handlesOverflow="true">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim.</description>
              </info>
            </infoTable>
          </relatedContent>
        </lockup>
        
        <lockup>
          <img src="/resources/images/lockups/episode_4.jpg" width="308" height="175" />
          <title class="showTextOnHighlight">Title 4</title>
          <relatedContent>
            <infoTable>
              <header>
                <title>“Title 4”</title>
              </header>

              <info>
                <header>
                </header>
                <row>
                  <text>Text 1</text>
                  <text>Text 2</text>
                  <badge src="resource://tv-14" class="badge" />
                  <badge src="resource://cc" class="badge" />
                </row>
              </info>

              <info>
                <header>
                  <title>Text 1&#xD;Text 2&#xD;Text 3</title>
                </header>
                <description handlesOverflow="true">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim.</description>
              </info>
            </infoTable>
          </relatedContent>
        </lockup>
        
        <lockup>
          <img src="/resources/images/lockups/episode_5.jpg" width="308" height="175" />
          <title class="showTextOnHighlight">Title 5</title>
          <relatedContent>
            <infoTable>
              <header>
                <title>“Title 5”</title>
              </header>

              <info>
                <header>
                </header>
                <row>
                  <text>Text 1</text>
                  <text>Text 2</text>
                  <badge src="resource://tv-14" class="badge" />
                  <badge src="resource://cc" class="badge" />
                </row>
              </info>

              <info>
                <header>
                  <title>Text 1&#xD;Text 2&#xD;Text 3</title>
                </header>
                <description handlesOverflow="true">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim.</description>
              </info>
            </infoTable>
          </relatedContent>
        </lockup>
        
        <lockup>
          <img src="/resources/images/lockups/episode_6.jpg" width="308" height="175" />
          <title class="showTextOnHighlight">Title 6</title>
          <relatedContent>
            <infoTable>
              <header>
                <title>“Title 6”</title>
              </header>

              <info>
                <header>
                </header>
                <row>
                  <text>Text 1</text>
                  <text>Text 2</text>
                  <badge src="resource://tv-14" class="badge" />
                  <badge src="resource://cc" class="badge" />
                </row>
              </info>

              <info>
                <header>
                  <title>Text 1&#xD;Text 2&#xD;Text 3</title>
                </header>
                <description handlesOverflow="true">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim.</description>
              </info>
            </infoTable>
          </relatedContent>
        </lockup>
      </section>
    </shelf>
    
    <shelf>
      <header>
        <title>Shelf Header</title>
      </header>
      
      <section>
        <lockup>
          <img src="/resources/images/lockups/square_1.jpg" width="172" height="172" />
          <title class="showTextOnHighlight">Title 1</title>
        </lockup>
        
        <lockup>
          <img src="/resources/images/lockups/square_2.jpg" width="172" height="172" />
          <title class="showTextOnHighlight">Title 2</title>
        </lockup>
        
        <lockup>
          <img src="/resources/images/lockups/square_3.jpg" width="172" height="172" />
          <title class="showTextOnHighlight">Title 3</title>
        </lockup>
        
        <lockup>
          <img src="/resources/images/lockups/square_4.jpg" width="172" height="172" />
          <title class="showTextOnHighlight">Title 4</title>
        </lockup>
        
        <lockup>
          <img src="/resources/images/lockups/square_5.jpg" width="172" height="172" />
          <title class="showTextOnHighlight">Title 5</title>
        </lockup>
        
        <lockup>
          <img src="/resources/images/lockups/square_6.jpg" width="172" height="172" />
          <title class="showTextOnHighlight">Title 6</title>
        </lockup>
        
        <lockup>
          <img src="/resources/images/lockups/square_7.jpg" width="172" height="172" />
          <title class="showTextOnHighlight">Title 7</title>
        </lockup>
        
        <lockup>
          <img src="/resources/images/lockups/square_8.jpg" width="172" height="172" />
          <title class="showTextOnHighlight">Title 8</title>
        </lockup>
        
        <lockup>
          <img src="/resources/images/lockups/square_9.jpg" width="172" height="172" />
          <title class="showTextOnHighlight">Title 9</title>
        </lockup>
        
        <lockup>
          <img src="/resources/images/lockups/square_10.jpg" width="172" height="172" />
          <title class="showTextOnHighlight">Title 10</title>
        </lockup>
      </section>
    </shelf>
    
    <shelf>
      <header>
        <title>Reviews &amp; Ratings</title>
      </header>
      
      <section>
        <ratingCard>
          <title>4.1 / 5</title>
          <ratingBadge value="0.7"></ratingBadge>
          <description>Average of 2,241 iTunes user ratings and reviews.</description>
        </ratingCard>
        
        <reviewCard>
          <title>Publisher</title>
          <description>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</description>
          <text>Stephanie Vidal Dec, 24 2015</text>
        </reviewCard>
        
        <reviewCard>
          <title>Publisher</title>
          <description>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</description>
          <text>Euna Kwon Dec, 5 2015</text>
        </reviewCard>
        
        <reviewCard>
          <title>Publisher</title>
          <description>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</description>
          <text>Paul Cashman <date>Dec, 10 2015</date></text>
        </reviewCard>
      </section>
    </shelf>
    
    <shelf>
      <header>
        <title>Shelf Header</title>
      </header>
      
      <section>
        <monogramLockup>
          <monogram src="/resources/images/lockups/square_1.jpg" />
          <title>Adam Gooseff</title>
          <subtitle>Actor</subtitle>
        </monogramLockup>
        
        <monogramLockup>
          <monogram src="/resources/images/lockups/square_2.jpg" />
          <title>Ailish Kimber</title>
          <subtitle>Actor</subtitle>
        </monogramLockup>
        
        <monogramLockup>
          <monogram firstName="Allen" lastName="Buchinski" />
          <title>Allen Buchinski</title>
          <subtitle>Actor</subtitle>
        </monogramLockup>
        
        <monogramLockup>
          <monogram firstName="Dave" lastName="Elfving" />
          <title>Dave Elfving</title>
          <subtitle>Actor</subtitle>
        </monogramLockup>
        
        <monogramLockup>
          <monogram firstName="Ethan" lastName="Izzarelli" />
          <title>Ethan Izzarelli</title>
          <subtitle>Actor</subtitle>
        </monogramLockup>
        
        <monogramLockup>
          <monogram firstName="Euna" lastName="Kwon" />
          <title>Euna Kwon</title>
          <subtitle>Director</subtitle>
        </monogramLockup>
        
        <monogramLockup>
          <monogram firstName="Fritz" lastName="Ogden" />
          <title>Fritz Ogden</title>
          <subtitle>Director</subtitle>
        </monogramLockup>
        
        <monogramLockup>
          <monogram firstName="Gilbert" lastName="Solano" />
          <title>Gilbert Solano</title>
          <subtitle>Director</subtitle>
        </monogramLockup>
      </section>
    </shelf>

    <separator />
    
    <productInfo>
      <infoTable>
        <header>
          <title>Header</title>
        </header>
        
        <info>
          <header>
            <title>Header</title>
          </header>
          <text>Text</text>
        </info>
        
        <info>
          <header>
            <title>Header</title>
          </header>
          <text>Text</text>
        </info>
        
        <info>
          <header>
            <title>Header</title>
          </header>
          <text>Text</text>
        </info>
        
        <info>
          <header>
            <title>Header</title>
          </header>
          <text>Text</text>
        </info>
        
        <info>
          <header>
            <title>Header</title>
          </header>
          <text>Text</text>
        </info>
        
        <info>
          <header>
            <title>Header</title>
          </header>
          <text>Text</text>
        </info>
        
        <footer>
          <text>Footer Text</text>
        </footer>
      </infoTable>
      
      <infoTable>
        <header>
          <title>Header</title>
        </header>
        
        <info>
          <header>
            <badge src="resource://cc" class="badge" />
          </header>
          <text>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.</text>
        </info>
      </infoTable>
      
      <infoTable>
        <header>
          <title>Header</title>
        </header>
        
        <info>
          <header>
            <title>Title</title>
          </header>
          <text>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.</text>
        </info>
      </infoTable>
      
    </productInfo>
  </productBundleTemplate>
</document>
```

---

## Rating Template {#rating-template}

Use this template to display a rating for an item.

![](https://community.rockrms.com/GetImage.ashx?Id=66429)

## Tips & Tricks

- Default theme: System preference

## Templates

**Default**

![](https://community.rockrms.com/GetImage.ashx?Id=66430)

```
<document>
	<ratingTemplate>
	    <title>Rate Lorem Ipsum</title>
	    <!-- Add event listener of type "change" which will be called if user rates. the new value is in event dictionary which is a value between 0.2 (1 star) - 1.0 (5 stars) -->
	    <ratingBadge value="0.6"></ratingBadge>
	</ratingTemplate>
</document>
```
