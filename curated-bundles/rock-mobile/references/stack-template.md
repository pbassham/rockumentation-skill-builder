---
description: "Use when building tvOS layouts with stacked product categories displayed as carousels, grids, or shelves"
source: "https://community.rockrms.com/developer/apple-tv-docs"
sourceLabel: Apple TV Docs
---
> **Path:** 

Use this template to display, for example, displaying different categories of series. Each group of products is displayed directly underneath the previous group. Products can be displayed in different ways using `carousel`, `grid`, and `shelf` elements.

![](https://community.rockrms.com/GetImage.ashx?Id=66434)

## Tips & Tricks

- Default theme: System preference
- This is a powerful and versatile template that can be used for a variety of content or pages

## Templates

**Grouping**

![](https://community.rockrms.com/GetImage.ashx?Id=66435)

```
<document>
  <head>
    <style>
    .showTextOnHighlight {
      tv-text-highlight-style: show-on-highlight;
    }
    .3ColumnGrid {
      tv-interitem-spacing: 48;
    }
    .5ColumnGrid {
      tv-interitem-spacing: 50;
    }
    .6ColumnGrid {
      tv-interitem-spacing: 48;
    }
    </style>
  </head>
  <stackTemplate>
    <collectionList>
      <carousel>
        <section>
          <lockup>
            <img src="/resources/images/carousel/carousel_2.jpg" width="1740" height="500" />
          </lockup>
          <lockup>
            <img src="/resources/images/carousel/carousel_3.jpg" width="1740" height="500" />
          </lockup>
          <lockup>
            <img src="/resources/images/carousel/carousel_1.jpg" width="1740" height="500" />
          </lockup>
        </section>
      </carousel>
      <shelf class="6ColumnGrid">
        <header>
          <title>Movie Shelf (250x375, 6 Column Grid, 48 spacing)</title>
        </header>
        <section>
          <lockup>
            <img src="/resources/images/lockups/movie_1.lcr" width="250" height="375" />
            <title class="showTextOnHighlight">Title 1</title>
          </lockup>
          <lockup>
            <img src="/resources/images/lockups/movie_2.lcr" width="250" height="375" />
            <title class="showTextOnHighlight">Title 2</title>
          </lockup>
          <lockup>
            <img src="/resources/images/lockups/movie_3.lcr" width="250" height="375" />
            <title class="showTextOnHighlight">Title 3</title>
          </lockup>
          <lockup>
            <img src="/resources/images/lockups/movie_4.lcr" width="250" height="375" />
            <title class="showTextOnHighlight">Title 4</title>
          </lockup>
          <lockup>
            <img src="/resources/images/lockups/movie_5.lcr" width="250" height="375" />
            <title class="showTextOnHighlight">Title 5</title>
          </lockup>
          <lockup>
            <img src="/resources/images/lockups/movie_6.lcr" width="250" height="375" />
            <title class="showTextOnHighlight">Title 6</title>
          </lockup>
          <lockup>
            <img src="/resources/images/lockups/movie_7.lcr" width="250" height="375" />
            <title class="showTextOnHighlight">Title 7</title>
          </lockup>
          <lockup>
            <img src="/resources/images/lockups/movie_8.lcr" width="250" height="375" />
            <title class="showTextOnHighlight">Title 8</title>
          </lockup>
          <lockup>
            <img src="/resources/images/lockups/movie_9.lcr" width="250" height="375" />
            <title class="showTextOnHighlight">Title 9</title>
          </lockup>
          <lockup>
            <img src="/resources/images/lockups/movie_10.lcr" width="250" height="375" />
            <title class="showTextOnHighlight">Title 10</title>
          </lockup>
        </section>
      </shelf>
      <shelf class="5ColumnGrid">
        <header>
          <title>TV Show and Music Shelf (308x308, 5 Column Grid, 50 spacing)</title>
        </header>
        <section>
          <lockup>
            <img src="/resources/images/lockups/square_1.jpg" width="308" height="308" />
            <title class="showTextOnHighlight">Title 1</title>
          </lockup>
          <lockup>
            <img src="/resources/images/lockups/square_2.jpg" width="308" height="308" />
            <title class="showTextOnHighlight">Title 2</title>
          </lockup>
          <lockup>
            <img src="/resources/images/lockups/square_3.jpg" width="308" height="308" />
            <title class="showTextOnHighlight">Title 3</title>
          </lockup>
          <lockup>
            <img src="/resources/images/lockups/square_4.jpg" width="308" height="308" />
            <title class="showTextOnHighlight">Title 4</title>
          </lockup>
          <lockup>
            <img src="/resources/images/lockups/square_5.jpg" width="308" height="308" />
            <title class="showTextOnHighlight">Title 5</title>
          </lockup>
          <lockup>
            <img src="/resources/images/lockups/square_6.jpg" width="308" height="308" />
            <title class="showTextOnHighlight">Title 6</title>
          </lockup>
          <lockup>
            <img src="/resources/images/lockups/square_7.jpg" width="308" height="308" />
            <title class="showTextOnHighlight">Title 7</title>
          </lockup>
          <lockup>
            <img src="/resources/images/lockups/square_8.jpg" width="308" height="308" />
            <title class="showTextOnHighlight">Title 8</title>
          </lockup>
          <lockup>
            <img src="/resources/images/lockups/square_9.jpg" width="308" height="308" />
            <title class="showTextOnHighlight">Title 9</title>
          </lockup>
          <lockup>
            <img src="/resources/images/lockups/square_10.jpg" width="308" height="308" />
            <title class="showTextOnHighlight">Title 10</title>
          </lockup>
        </section>
      </shelf>
      <shelf class="3ColumnGrid">
        <header>
          <title>Featured Content (548x250, 3 Column Grid, 48 spacing)</title>
        </header>
        <section>
          <lockup>
            <img src="/resources/images/lockups/featured_1.jpg" width="548" height="250" />
            <title class="showTextOnHighlight">Title 1</title>
          </lockup>
          <lockup>
            <img src="/resources/images/lockups/featured_2.jpg" width="548" height="250" />
            <title class="showTextOnHighlight">Title 2</title>
          </lockup>
          <lockup>
            <img src="/resources/images/lockups/featured_3.jpg" width="548" height="250" />
            <title class="showTextOnHighlight">Title 3</title>
          </lockup>
          <lockup>
            <img src="/resources/images/lockups/featured_4.jpg" width="548" height="250" />
            <title class="showTextOnHighlight">Title 4</title>
          </lockup>
          <lockup>
            <img src="/resources/images/lockups/featured_5.jpg" width="548" height="250" />
            <title class="showTextOnHighlight">Title 5</title>
          </lockup>
        </section>
      </shelf>
      <grid class="5ColumnGrid">
        <header>
          <title>Grid (308x308, 5 Column Grid, 50 spacing)</title>
        </header>
        <section>
          <lockup>
            <img src="/resources/images/lockups/square_1.jpg" width="308" height="308" />
            <title class="showTextOnHighlight">Title 1</title>
          </lockup>
          <lockup>
            <img src="/resources/images/lockups/square_2.jpg" width="308" height="308" />
            <title class="showTextOnHighlight">Title 2</title>
          </lockup>
          <lockup>
            <img src="/resources/images/lockups/square_3.jpg" width="308" height="308" />
            <title class="showTextOnHighlight">Title 3</title>
          </lockup>
          <lockup>
            <img src="/resources/images/lockups/square_4.jpg" width="308" height="308" />
            <title class="showTextOnHighlight">Title 4</title>
          </lockup>
          <lockup>
            <img src="/resources/images/lockups/square_5.jpg" width="308" height="308" />
            <title class="showTextOnHighlight">Title 5</title>
          </lockup>
          <lockup>
            <img src="/resources/images/lockups/square_6.jpg" width="308" height="308" />
            <title class="showTextOnHighlight">Title 6</title>
          </lockup>
          <lockup>
            <img src="/resources/images/lockups/square_7.jpg" width="308" height="308" />
            <title class="showTextOnHighlight">Title 7</title>
          </lockup>
          <lockup>
            <img src="/resources/images/lockups/square_8.jpg" width="308" height="308" />
            <title class="showTextOnHighlight">Title 8</title>
          </lockup>
          <lockup>
            <img src="/resources/images/lockups/square_9.jpg" width="308" height="308" />
            <title class="showTextOnHighlight">Title 9</title>
          </lockup>
          <lockup>
            <img src="/resources/images/lockups/square_10.jpg" width="308" height="308" />
            <title class="showTextOnHighlight">Title 10</title>
          </lockup>
        </section>
      </grid>

      <separator>
        <text style="tv-text-style:body; margin: 0 10;">Separator Title</text>
      </separator>

      <shelf>
        <header>
          <title>Hetrogeneous Shelf</title>
        </header>
        <section>
          <lockup>
            <img src="/resources/images/lockups/movie_1.lcr" width="205" height="308" />
            <title class="showTextOnHighlight">Title 1</title>
          </lockup>
          <lockup>
            <img src="/resources/images/lockups/square_1.jpg" width="308" height="308" />
            <title class="showTextOnHighlight">Title 2</title>
          </lockup>
          <lockup>
            <img src="/resources/images/lockups/movie_2.lcr" width="205" height="308" />
            <title class="showTextOnHighlight">Title 3</title>
          </lockup>
          <lockup>
            <img src="/resources/images/lockups/square_2.jpg" width="308" height="308" />
            <title class="showTextOnHighlight">Title 4</title>
          </lockup>
          <lockup>
            <img src="/resources/images/lockups/movie_3.lcr" width="205" height="308" />
            <title class="showTextOnHighlight">Title 5</title>
          </lockup>
          <lockup>
            <img src="/resources/images/lockups/square_3.jpg" width="308" height="308" />
            <title class="showTextOnHighlight">Title 6</title>
          </lockup>
          <lockup>
            <img src="/resources/images/lockups/movie_4.lcr" width="205" height="308" />
            <title class="showTextOnHighlight">Title 7</title>
          </lockup>
          <lockup>
            <img src="/resources/images/lockups/square_4.jpg" width="308" height="308" />
            <title class="showTextOnHighlight">Title 8</title>
          </lockup>
          <lockup>
            <img src="/resources/images/lockups/movie_5.lcr" width="205" height="308" />
            <title class="showTextOnHighlight">Title 9</title>
          </lockup>
          <lockup>
            <img src="/resources/images/lockups/square_5.jpg" width="308" height="308" />
            <title class="showTextOnHighlight">Title 10</title>
          </lockup>
        </section>
      </shelf>
      <grid>
        <header>
          <title>Hetrogeneous Grid</title>
        </header>
        <section>
          <lockup>
            <img src="/resources/images/lockups/movie_1.lcr" width="205" height="308" />
            <title class="showTextOnHighlight">Title 1</title>
          </lockup>
          <lockup>
            <img src="/resources/images/lockups/movie_2.lcr" width="205" height="308" />
            <title class="showTextOnHighlight">Title 2</title>
          </lockup>
          <lockup>
            <img src="/resources/images/lockups/square_2.jpg" width="308" height="308" />
            <title class="showTextOnHighlight">Title 3</title>
          </lockup>
          <lockup>
            <img src="/resources/images/lockups/movie_3.lcr" width="205" height="308" />
            <title class="showTextOnHighlight">Title 4</title>
          </lockup>
          <lockup>
            <img src="/resources/images/lockups/square_3.jpg" width="308" height="308" />
            <title class="showTextOnHighlight">Title 5</title>
          </lockup>
          <lockup>
            <img src="/resources/images/lockups/movie_4.lcr" width="205" height="308" />
            <title class="showTextOnHighlight">Title 6</title>
          </lockup>
          <lockup>
            <img src="/resources/images/lockups/square_1.jpg" width="308" height="308" />
            <title class="showTextOnHighlight">Title 7</title>
          </lockup>
          <lockup>
            <img src="/resources/images/lockups/square_4.jpg" width="308" height="308" />
            <title class="showTextOnHighlight">Title 8</title>
          </lockup>
          <lockup>
            <img src="/resources/images/lockups/movie_5.lcr" width="205" height="308" />
            <title class="showTextOnHighlight">Title 9</title>
          </lockup>
          <lockup>
            <img src="/resources/images/lockups/square_5.jpg" width="308" height="308" />
            <title class="showTextOnHighlight">Title 10</title>
          </lockup>
        </section>
      </grid>
    </collectionList>
  </stackTemplate>
</document>
```

**Shelf & Grid**

![](https://community.rockrms.com/GetImage.ashx?Id=66436)

```
<document>
  <head>
    <style>
.listItemLockup {
  height: 90;
}
.lilImg {
  tv-position: left;
}
.lilTitle {
  tv-text-style: headline;
  tv-text-highlight-style: marquee-on-highlight;
  tv-text-max-lines: 1;
  tv-position: center;
  tv-align: left;
  margin: 0 20;
}
.lilSubtitle {
  tv-text-style: subtitle1;
  tv-text-max-lines: 1;
  tv-position: center;
  tv-align: left;
  margin: 0 20;
}
@media tv-template and (tv-theme:dark) {
  .lilSubtitle {
    color: rgba(255, 255, 255, 0.6);
    tv-highlight-color: rgba(0, 0, 0, 0.6);
  }
}
    </style>
  </head>
  <stackTemplate>
    <banner>
      <title>Title</title>
    </banner>
    <collectionList>
      <shelf rowCount="3" style="tv-line-spacing: 30; tv-interim-spacing: 30;">
        <header>
          <title>Shelf (3 Rows, &lt;listItemLockup&gt;)</title>
        </header>
        <section>
          <listItemLockup class="listItemLockup">
            <img class="lilImg" src="/resources/images/lockups/square_1.jpg" width="90" height="90" />
            <title class="lilTitle">Title 1</title>
            <subtitle class="lilSubtitle">Subtitle 1</subtitle>
          </listItemLockup>
          <listItemLockup class="listItemLockup">
            <img class="lilImg" src="/resources/images/lockups/square_2.jpg" width="90" height="90" />
            <title class="lilTitle">Title 2</title>
            <subtitle class="lilSubtitle">Subtitle 2</subtitle>
          </listItemLockup>
          <listItemLockup class="listItemLockup">
            <img class="lilImg" src="/resources/images/lockups/square_3.jpg" width="90" height="90" />
            <title class="lilTitle">Title 3</title>
            <subtitle class="lilSubtitle">Subtitle 3</subtitle>
          </listItemLockup>
          <listItemLockup class="listItemLockup">
            <img class="lilImg" src="/resources/images/lockups/square_4.jpg" width="90" height="90" />
            <title class="lilTitle">Title 4</title>
            <subtitle class="lilSubtitle">Subtitle 4</subtitle>
          </listItemLockup>
          <listItemLockup class="listItemLockup">
            <img class="lilImg" src="/resources/images/lockups/square_5.jpg" width="90" height="90" />
            <title class="lilTitle">Title 5</title>
            <subtitle class="lilSubtitle">Subtitle 5</subtitle>
          </listItemLockup>
          <listItemLockup class="listItemLockup">
            <img class="lilImg" src="/resources/images/lockups/square_6.jpg" width="90" height="90" />
            <title class="lilTitle">Title 6</title>
            <subtitle class="lilSubtitle">Subtitle 6</subtitle>
          </listItemLockup>
          <listItemLockup class="listItemLockup">
            <img class="lilImg" src="/resources/images/lockups/square_7.jpg" width="90" height="90" />
            <title class="lilTitle">Title 7</title>
            <subtitle class="lilSubtitle">Subtitle 7</subtitle>
          </listItemLockup>
          <listItemLockup class="listItemLockup">
            <img class="lilImg" src="/resources/images/lockups/square_8.jpg" width="90" height="90" />
            <title class="lilTitle">Title 8</title>
            <subtitle class="lilSubtitle">Subtitle 8</subtitle>
          </listItemLockup>
          <listItemLockup class="listItemLockup">
            <img class="lilImg" src="/resources/images/lockups/square_9.jpg" width="90" height="90" />
            <title class="lilTitle">Title 9</title>
            <subtitle class="lilSubtitle">Subtitle 9</subtitle>
          </listItemLockup>
          <listItemLockup class="listItemLockup">
            <img class="lilImg" src="/resources/images/lockups/square_10.jpg" width="90" height="90" />
            <title class="lilTitle">Title 10</title>
            <subtitle class="lilSubtitle">Subtitle 10</subtitle>
          </listItemLockup>
          <listItemLockup class="listItemLockup">
            <img class="lilImg" src="/resources/images/lockups/square_10.jpg" width="90" height="90" />
            <title class="lilTitle">Title 11</title>
            <subtitle class="lilSubtitle">Subtitle 11</subtitle>
          </listItemLockup>
          <listItemLockup class="listItemLockup">
            <img class="lilImg" src="/resources/images/lockups/square_9.jpg" width="90" height="90" />
            <title class="lilTitle">Title 12</title>
            <subtitle class="lilSubtitle">Subtitle 12</subtitle>
          </listItemLockup>
          <listItemLockup class="listItemLockup">
            <img class="lilImg" src="/resources/images/lockups/square_8.jpg" width="90" height="90" />
            <title class="lilTitle">Title 13</title>
            <subtitle class="lilSubtitle">Subtitle 13</subtitle>
          </listItemLockup>
          <listItemLockup class="listItemLockup">
            <img class="lilImg" src="/resources/images/lockups/square_7.jpg" width="90" height="90" />
            <title class="lilTitle">Title 14</title>
            <subtitle class="lilSubtitle">Subtitle 14</subtitle>
          </listItemLockup>
          <listItemLockup class="listItemLockup">
            <img class="lilImg" src="/resources/images/lockups/square_6.jpg" width="90" height="90" />
            <title class="lilTitle">Title 15</title>
            <subtitle class="lilSubtitle">Subtitle 15</subtitle>
          </listItemLockup>
          <listItemLockup class="listItemLockup">
            <img class="lilImg" src="/resources/images/lockups/square_5.jpg" width="90" height="90" />
            <title class="lilTitle">Title 16</title>
            <subtitle class="lilSubtitle">Subtitle 16</subtitle>
          </listItemLockup>
          <listItemLockup class="listItemLockup">
            <img class="lilImg" src="/resources/images/lockups/square_4.jpg" width="90" height="90" />
            <title class="lilTitle">Title 17</title>
            <subtitle class="lilSubtitle">Subtitle 17</subtitle>
          </listItemLockup>
          <listItemLockup class="listItemLockup">
            <img class="lilImg" src="/resources/images/lockups/square_3.jpg" width="90" height="90" />
            <title class="lilTitle">Title 18</title>
            <subtitle class="lilSubtitle">Subtitle 18</subtitle>
          </listItemLockup>
          <listItemLockup class="listItemLockup">
            <img class="lilImg" src="/resources/images/lockups/square_2.jpg" width="90" height="90" />
            <title class="lilTitle">Title 19</title>
            <subtitle class="lilSubtitle">Subtitle 19</subtitle>
          </listItemLockup>
          <listItemLockup class="listItemLockup">
            <img class="lilImg" src="/resources/images/lockups/square_1.jpg" width="90" height="90" />
            <title class="lilTitle">Title 20</title>
            <subtitle class="lilSubtitle">Subtitle 20</subtitle>
          </listItemLockup>
        </section>
      </shelf>

      <shelf rowCount="2">
        <header>
          <title>Shelf (308x308, 2 Rows)</title>
        </header>
        <section>
          <lockup>
            <img src="/resources/images/lockups/square_1.jpg" width="308" height="308" />
            <title>Title 1</title>
          </lockup>
          <lockup>
            <img src="/resources/images/lockups/square_2.jpg" width="308" height="308" />
            <title>Title 2</title>
          </lockup>
          <lockup>
            <img src="/resources/images/lockups/square_3.jpg" width="308" height="308" />
            <title>Title 3</title>
          </lockup>
          <lockup>
            <img src="/resources/images/lockups/square_4.jpg" width="308" height="308" />
            <title>Title 4</title>
          </lockup>
          <lockup>
            <img src="/resources/images/lockups/square_5.jpg" width="308" height="308" />
            <title>Title 5</title>
          </lockup>
          <lockup>
            <img src="/resources/images/lockups/square_6.jpg" width="308" height="308" />
            <title>Title 6</title>
          </lockup>
          <lockup>
            <img src="/resources/images/lockups/square_7.jpg" width="308" height="308" />
            <title>Title 7</title>
          </lockup>
          <lockup>
            <img src="/resources/images/lockups/square_8.jpg" width="308" height="308" />
            <title>Title 8</title>
          </lockup>
          <lockup>
            <img src="/resources/images/lockups/square_9.jpg" width="308" height="308" />
            <title>Title 9</title>
          </lockup>
          <lockup>
            <img src="/resources/images/lockups/square_10.jpg" width="308" height="308" />
            <title>Title 10</title>
          </lockup>
          <lockup>
            <img src="/resources/images/lockups/square_10.jpg" width="308" height="308" />
            <title>Title 11</title>
          </lockup>
          <lockup>
            <img src="/resources/images/lockups/square_9.jpg" width="308" height="308" />
            <title>Title 12</title>
          </lockup>
          <lockup>
            <img src="/resources/images/lockups/square_8.jpg" width="308" height="308" />
            <title>Title 13</title>
          </lockup>
          <lockup>
            <img src="/resources/images/lockups/square_7.jpg" width="308" height="308" />
            <title>Title 14</title>
          </lockup>
          <lockup>
            <img src="/resources/images/lockups/square_6.jpg" width="308" height="308" />
            <title>Title 15</title>
          </lockup>
          <lockup>
            <img src="/resources/images/lockups/square_5.jpg" width="308" height="308" />
            <title>Title 16</title>
          </lockup>
          <lockup>
            <img src="/resources/images/lockups/square_4.jpg" width="308" height="308" />
            <title>Title 17</title>
          </lockup>
          <lockup>
            <img src="/resources/images/lockups/square_3.jpg" width="308" height="308" />
            <title>Title 18</title>
          </lockup>
          <lockup>
            <img src="/resources/images/lockups/square_2.jpg" width="308" height="308" />
            <title>Title 19</title>
          </lockup>
          <lockup>
            <img src="/resources/images/lockups/square_1.jpg" width="308" height="308" />
            <title>Title 20</title>
          </lockup>
        </section>
      </shelf>

      <grid style="tv-line-spacing: 30; tv-interim-spacing: 30;">
        <header>
          <title>Grid (&lt;listItemLockup&gt;)</title>
        </header>
        <section>
          <listItemLockup class="listItemLockup">
            <img class="lilImg" src="/resources/images/lockups/square_1.jpg" width="90" height="90" />
            <title class="lilTitle">Title 1</title>
            <subtitle class="lilSubtitle">Subtitle 1</subtitle>
          </listItemLockup>
          <listItemLockup class="listItemLockup">
            <img class="lilImg" src="/resources/images/lockups/square_2.jpg" width="90" height="90" />
            <title class="lilTitle">Title 2</title>
            <subtitle class="lilSubtitle">Subtitle 2</subtitle>
          </listItemLockup>
          <listItemLockup class="listItemLockup">
            <img class="lilImg" src="/resources/images/lockups/square_3.jpg" width="90" height="90" />
            <title class="lilTitle">Title 3</title>
            <subtitle class="lilSubtitle">Subtitle 3</subtitle>
          </listItemLockup>
          <listItemLockup class="listItemLockup">
            <img class="lilImg" src="/resources/images/lockups/square_4.jpg" width="90" height="90" />
            <title class="lilTitle">Title 4</title>
            <subtitle class="lilSubtitle">Subtitle 4</subtitle>
          </listItemLockup>
          <listItemLockup class="listItemLockup">
            <img class="lilImg" src="/resources/images/lockups/square_5.jpg" width="90" height="90" />
            <title class="lilTitle">Title 5</title>
            <subtitle class="lilSubtitle">Subtitle 5</subtitle>
          </listItemLockup>
          <listItemLockup class="listItemLockup">
            <img class="lilImg" src="/resources/images/lockups/square_6.jpg" width="90" height="90" />
            <title class="lilTitle">Title 6</title>
            <subtitle class="lilSubtitle">Subtitle 6</subtitle>
          </listItemLockup>
          <listItemLockup class="listItemLockup">
            <img class="lilImg" src="/resources/images/lockups/square_7.jpg" width="90" height="90" />
            <title class="lilTitle">Title 7</title>
            <subtitle class="lilSubtitle">Subtitle 7</subtitle>
          </listItemLockup>
          <listItemLockup class="listItemLockup">
            <img class="lilImg" src="/resources/images/lockups/square_8.jpg" width="90" height="90" />
            <title class="lilTitle">Title 8</title>
            <subtitle class="lilSubtitle">Subtitle 8</subtitle>
          </listItemLockup>
          <listItemLockup class="listItemLockup">
            <img class="lilImg" src="/resources/images/lockups/square_9.jpg" width="90" height="90" />
            <title class="lilTitle">Title 9</title>
            <subtitle class="lilSubtitle">Subtitle 9</subtitle>
          </listItemLockup>
        </section>
      </grid>
    </collectionList>
  </stackTemplate>
</document>
```

**Banner, Theme & Background**

![](https://community.rockrms.com/GetImage.ashx?Id=66437)

```
<document>
  <head>
    <style>
    .5ColumnGrid {
      tv-interitem-spacing: 50;
    }
    </style>
  </head>
  <stackTemplate theme="dark">
    <background>
      <heroImg src="/resources/images/lockups/square_1.jpg"/>
    </background>
    <banner>
      <title>Title</title>
    </banner>
    <collectionList>
      <grid class="5ColumnGrid">
        <section>
          <lockup>
            <img src="/resources/images/lockups/square_1.jpg" width="308" height="308" />
            <title class="showTextOnHighlight">Title 1</title>
          </lockup>
          <lockup>
            <img src="/resources/images/lockups/square_2.jpg" width="308" height="308" />
            <title class="showTextOnHighlight">Title 2</title>
          </lockup>
          <lockup>
            <img src="/resources/images/lockups/square_3.jpg" width="308" height="308" />
            <title class="showTextOnHighlight">Title 3</title>
          </lockup>
          <lockup>
            <img src="/resources/images/lockups/square_4.jpg" width="308" height="308" />
            <title class="showTextOnHighlight">Title 4</title>
          </lockup>
          <lockup>
            <img src="/resources/images/lockups/square_5.jpg" width="308" height="308" />
            <title class="showTextOnHighlight">Title 5</title>
          </lockup>
          <lockup>
            <img src="/resources/images/lockups/square_6.jpg" width="308" height="308" />
            <title class="showTextOnHighlight">Title 6</title>
          </lockup>
          <lockup>
            <img src="/resources/images/lockups/square_7.jpg" width="308" height="308" />
            <title class="showTextOnHighlight">Title 7</title>
          </lockup>
          <lockup>
            <img src="/resources/images/lockups/square_8.jpg" width="308" height="308" />
            <title class="showTextOnHighlight">Title 8</title>
          </lockup>
          <lockup>
            <img src="/resources/images/lockups/square_9.jpg" width="308" height="308" />
            <title class="showTextOnHighlight">Title 9</title>
          </lockup>
          <lockup>
            <img src="/resources/images/lockups/square_10.jpg" width="308" height="308" />
            <title class="showTextOnHighlight">Title 10</title>
          </lockup>
        </section>
      </grid>
    </collectionList>
  </stackTemplate>
</document>
```

**Hero Image Background**

![](https://community.rockrms.com/GetImage.ashx?Id=66438)

```
<document>
  <head>
    <style>
    .5ColumnGrid {
      tv-interitem-spacing: 50;
    }
    </style>
  </head>
  <stackTemplate theme="dark">
    <background>
      <heroImg src="/resources/images/lockups/square_1.jpg"/>
    </background>
    <banner>
      <title>Title</title>
    </banner>
    <collectionList>
      <grid class="5ColumnGrid">
        <section>
          <lockup>
            <img src="/resources/images/lockups/square_1.jpg" width="308" height="308" />
            <title class="showTextOnHighlight">Title 1</title>
          </lockup>
          <lockup>
            <img src="/resources/images/lockups/square_2.jpg" width="308" height="308" />
            <title class="showTextOnHighlight">Title 2</title>
          </lockup>
          <lockup>
            <img src="/resources/images/lockups/square_3.jpg" width="308" height="308" />
            <title class="showTextOnHighlight">Title 3</title>
          </lockup>
          <lockup>
            <img src="/resources/images/lockups/square_4.jpg" width="308" height="308" />
            <title class="showTextOnHighlight">Title 4</title>
          </lockup>
          <lockup>
            <img src="/resources/images/lockups/square_5.jpg" width="308" height="308" />
            <title class="showTextOnHighlight">Title 5</title>
          </lockup>
          <lockup>
            <img src="/resources/images/lockups/square_6.jpg" width="308" height="308" />
            <title class="showTextOnHighlight">Title 6</title>
          </lockup>
          <lockup>
            <img src="/resources/images/lockups/square_7.jpg" width="308" height="308" />
            <title class="showTextOnHighlight">Title 7</title>
          </lockup>
          <lockup>
            <img src="/resources/images/lockups/square_8.jpg" width="308" height="308" />
            <title class="showTextOnHighlight">Title 8</title>
          </lockup>
          <lockup>
            <img src="/resources/images/lockups/square_9.jpg" width="308" height="308" />
            <title class="showTextOnHighlight">Title 9</title>
          </lockup>
          <lockup>
            <img src="/resources/images/lockups/square_10.jpg" width="308" height="308" />
            <title class="showTextOnHighlight">Title 10</title>
          </lockup>
        </section>
      </grid>
    </collectionList>
  </stackTemplate>
</document>
```

**Overlay With Blurred Visual Effect**

![](https://community.rockrms.com/GetImage.ashx?Id=66439)

```
<document>
  <head>
    <style>
    .5ColumnGrid {
      tv-interitem-spacing: 50;
    }
    .blurOverlayImage {
      tv-img-treatment: blurOverlay;
      padding: 310 0 0 0;
    }
    .blurOverlayBanner {
      height: 310;
    }
    </style>
  </head>
  <stackTemplate theme="dark">
    <background>
      <img class="blurOverlayImage" src="/resources/images/background/background_2.jpg" />
    </background>
    <banner class="blurOverlayBanner">
      <title style="tv-visual-effect: none; color: rgba(0, 0, 0, 0.6);">Title</title>
    </banner>
    <collectionList>
      <grid class="5ColumnGrid">
        <section>
          <lockup>
            <img src="/resources/images/lockups/square_1.jpg" width="308" height="308" />
            <title class="showTextOnHighlight">Title 1</title>
          </lockup>
          <lockup>
            <img src="/resources/images/lockups/square_2.jpg" width="308" height="308" />
            <title class="showTextOnHighlight">Title 2</title>
          </lockup>
          <lockup>
            <img src="/resources/images/lockups/square_3.jpg" width="308" height="308" />
            <title class="showTextOnHighlight">Title 3</title>
          </lockup>
          <lockup>
            <img src="/resources/images/lockups/square_4.jpg" width="308" height="308" />
            <title class="showTextOnHighlight">Title 4</title>
          </lockup>
          <lockup>
            <img src="/resources/images/lockups/square_5.jpg" width="308" height="308" />
            <title class="showTextOnHighlight">Title 5</title>
          </lockup>
          <lockup>
            <img src="/resources/images/lockups/square_6.jpg" width="308" height="308" />
            <title class="showTextOnHighlight">Title 6</title>
          </lockup>
          <lockup>
            <img src="/resources/images/lockups/square_7.jpg" width="308" height="308" />
            <title class="showTextOnHighlight">Title 7</title>
          </lockup>
          <lockup>
            <img src="/resources/images/lockups/square_8.jpg" width="308" height="308" />
            <title class="showTextOnHighlight">Title 8</title>
          </lockup>
          <lockup>
            <img src="/resources/images/lockups/square_9.jpg" width="308" height="308" />
            <title class="showTextOnHighlight">Title 9</title>
          </lockup>
          <lockup>
            <img src="/resources/images/lockups/square_10.jpg" width="308" height="308" />
            <title class="showTextOnHighlight">Title 10</title>
          </lockup>
        </section>
      </grid>
    </collectionList>
  </stackTemplate>
</document>
```

**Identity Banner**

![](https://community.rockrms.com/GetImage.ashx?Id=66440)

```
<document>
  <head>
    <style>
    .5ColumnGrid {
      tv-interitem-spacing: 50;
    }
    </style>
  </head>
  <stackTemplate theme="dark">
    <identityBanner>
      <heroImg src="/resources/images/lockups/square_1.jpg" width="200" height="200" />
      <title>Title</title>
      <subtitle>Subtitle</subtitle>
      <row>
        <buttonLockup>
          <badge src="resource://button-add" />
          <title>Title 1</title>
        </buttonLockup>
        <buttonLockup>
          <badge src="resource://button-rate" />
          <title>Title 2</title>
        </buttonLockup>
      </row>
    </identityBanner>
    <collectionList>
      <grid class="5ColumnGrid">
        <section>
          <lockup>
            <img src="/resources/images/lockups/square_1.jpg" width="308" height="308" />
            <title class="showTextOnHighlight">Title 1</title>
          </lockup>
          <lockup>
            <img src="/resources/images/lockups/square_2.jpg" width="308" height="308" />
            <title class="showTextOnHighlight">Title 2</title>
          </lockup>
          <lockup>
            <img src="/resources/images/lockups/square_3.jpg" width="308" height="308" />
            <title class="showTextOnHighlight">Title 3</title>
          </lockup>
          <lockup>
            <img src="/resources/images/lockups/square_4.jpg" width="308" height="308" />
            <title class="showTextOnHighlight">Title 4</title>
          </lockup>
          <lockup>
            <img src="/resources/images/lockups/square_5.jpg" width="308" height="308" />
            <title class="showTextOnHighlight">Title 5</title>
          </lockup>
          <lockup>
            <img src="/resources/images/lockups/square_6.jpg" width="308" height="308" />
            <title class="showTextOnHighlight">Title 6</title>
          </lockup>
          <lockup>
            <img src="/resources/images/lockups/square_7.jpg" width="308" height="308" />
            <title class="showTextOnHighlight">Title 7</title>
          </lockup>
          <lockup>
            <img src="/resources/images/lockups/square_8.jpg" width="308" height="308" />
            <title class="showTextOnHighlight">Title 8</title>
          </lockup>
          <lockup>
            <img src="/resources/images/lockups/square_9.jpg" width="308" height="308" />
            <title class="showTextOnHighlight">Title 9</title>
          </lockup>
          <lockup>
            <img src="/resources/images/lockups/square_10.jpg" width="308" height="308" />
            <title class="showTextOnHighlight">Title 10</title>
          </lockup>
        </section>
      </grid>
    </collectionList>
  </stackTemplate>
</document>
```

**Banner w/ Blended Background**

![](https://community.rockrms.com/GetImage.ashx?Id=66441)

```
<?xml version="1.0" encoding="UTF-8" ?>
<!--
See LICENSE folder for this sample’s licensing information.
-->
<document>
  <head>
    <style>
      .5ColumnGrid {
        tv-interitem-spacing: 50;
      }
      .showTextOnHighlight {
        tv-text-highlight-style: show-on-highlight;
      }
      .templateBackground {
          background-color: #091a2a;
      }
    </style>
  </head>
  <stackTemplate class="templateBackground" theme="dark">
    <banner>
      <background >
        <img src="/resources/images/background/bg_banner.jpg" width="1920" height="360" />
      </background>
      <description>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</description>
    </banner>
    <collectionList>
      <grid class="5ColumnGrid">
        <section>
          <lockup>
            <img src="/resources/images/lockups/square_1.jpg" width="308" height="308" />
            <title class="showTextOnHighlight">Title 1</title>
          </lockup>
          <lockup>
            <img src="/resources/images/lockups/square_2.jpg" width="308" height="308" />
            <title class="showTextOnHighlight">Title 2</title>
          </lockup>
          <lockup>
            <img src="/resources/images/lockups/square_3.jpg" width="308" height="308" />
            <title class="showTextOnHighlight">Title 3</title>
          </lockup>
          <lockup>
            <img src="/resources/images/lockups/square_4.jpg" width="308" height="308" />
            <title class="showTextOnHighlight">Title 4</title>
          </lockup>
          <lockup>
            <img src="/resources/images/lockups/square_5.jpg" width="308" height="308" />
            <title class="showTextOnHighlight">Title 5</title>
          </lockup>
          <lockup>
            <img src="/resources/images/lockups/square_6.jpg" width="308" height="308" />
            <title class="showTextOnHighlight">Title 6</title>
          </lockup>
          <lockup>
            <img src="/resources/images/lockups/square_7.jpg" width="308" height="308" />
            <title class="showTextOnHighlight">Title 7</title>
          </lockup>
          <lockup>
            <img src="/resources/images/lockups/square_8.jpg" width="308" height="308" />
            <title class="showTextOnHighlight">Title 8</title>
          </lockup>
          <lockup>
            <img src="/resources/images/lockups/square_9.jpg" width="308" height="308" />
            <title class="showTextOnHighlight">Title 9</title>
          </lockup>
          <lockup>
            <img src="/resources/images/lockups/square_10.jpg" width="308" height="308" />
            <title class="showTextOnHighlight">Title 10</title>
          </lockup>
        </section>
      </grid>
    </collectionList>
  </stackTemplate>
</document>
```

**Separator w/ button**

![](https://community.rockrms.com/GetImage.ashx?Id=66442)

```
<document>
  <head>
    <style>
    .showTextOnHighlight {
      tv-text-highlight-style: show-on-highlight;
    }
    .3ColumnGrid {
      tv-interitem-spacing: 48;
    }
    .5ColumnGrid {
      tv-interitem-spacing: 50;
    }
    .6ColumnGrid {
      tv-interitem-spacing: 48;
    }
    </style>
  </head>
  <stackTemplate>
    <collectionList>
      <carousel>
        <section>
          <lockup>
            <img src="/resources/images/carousel/carousel_2.jpg" width="1740" height="500" />
          </lockup>
          <lockup>
            <img src="/resources/images/carousel/carousel_3.jpg" width="1740" height="500" />
          </lockup>
          <lockup>
            <img src="/resources/images/carousel/carousel_1.jpg" width="1740" height="500" />
          </lockup>
        </section>
      </carousel>
      <separator style="margin: 40 0 20">
        <button>
          <text>Options</text>
          <badge width="31" height="14" style="margin: 0 0 0 10;" src="resource://button-dropdown" />
        </button>
      </separator>
      <shelf class="6ColumnGrid">
        <header>
          <title>Movie Shelf (250x375, 6 Column Grid, 48 spacing)</title>
        </header>
        <section>
          <lockup>
            <img src="/resources/images/lockups/movie_1.lcr" width="250" height="375" />
            <title class="showTextOnHighlight">Title 1</title>
          </lockup>
          <lockup>
            <img src="/resources/images/lockups/movie_2.lcr" width="250" height="375" />
            <title class="showTextOnHighlight">Title 2</title>
          </lockup>
          <lockup>
            <img src="/resources/images/lockups/movie_3.lcr" width="250" height="375" />
            <title class="showTextOnHighlight">Title 3</title>
          </lockup>
          <lockup>
            <img src="/resources/images/lockups/movie_4.lcr" width="250" height="375" />
            <title class="showTextOnHighlight">Title 4</title>
          </lockup>
          <lockup>
            <img src="/resources/images/lockups/movie_5.lcr" width="250" height="375" />
            <title class="showTextOnHighlight">Title 5</title>
          </lockup>
          <lockup>
            <img src="/resources/images/lockups/movie_6.lcr" width="250" height="375" />
            <title class="showTextOnHighlight">Title 6</title>
          </lockup>
          <lockup>
            <img src="/resources/images/lockups/movie_7.lcr" width="250" height="375" />
            <title class="showTextOnHighlight">Title 7</title>
          </lockup>
          <lockup>
            <img src="/resources/images/lockups/movie_8.lcr" width="250" height="375" />
            <title class="showTextOnHighlight">Title 8</title>
          </lockup>
          <lockup>
            <img src="/resources/images/lockups/movie_9.lcr" width="250" height="375" />
            <title class="showTextOnHighlight">Title 9</title>
          </lockup>
          <lockup>
            <img src="/resources/images/lockups/movie_10.lcr" width="250" height="375" />
            <title class="showTextOnHighlight">Title 10</title>
          </lockup>
        </section>
      </shelf>
      <shelf class="5ColumnGrid">
        <header>
          <title>TV Show and Music Shelf (308x308, 5 Column Grid, 50 spacing)</title>
        </header>
        <section>
          <lockup>
            <img src="/resources/images/lockups/square_1.jpg" width="308" height="308" />
            <title class="showTextOnHighlight">Title 1</title>
          </lockup>
          <lockup>
            <img src="/resources/images/lockups/square_2.jpg" width="308" height="308" />
            <title class="showTextOnHighlight">Title 2</title>
          </lockup>
          <lockup>
            <img src="/resources/images/lockups/square_3.jpg" width="308" height="308" />
            <title class="showTextOnHighlight">Title 3</title>
          </lockup>
          <lockup>
            <img src="/resources/images/lockups/square_4.jpg" width="308" height="308" />
            <title class="showTextOnHighlight">Title 4</title>
          </lockup>
          <lockup>
            <img src="/resources/images/lockups/square_5.jpg" width="308" height="308" />
            <title class="showTextOnHighlight">Title 5</title>
          </lockup>
          <lockup>
            <img src="/resources/images/lockups/square_6.jpg" width="308" height="308" />
            <title class="showTextOnHighlight">Title 6</title>
          </lockup>
          <lockup>
            <img src="/resources/images/lockups/square_7.jpg" width="308" height="308" />
            <title class="showTextOnHighlight">Title 7</title>
          </lockup>
          <lockup>
            <img src="/resources/images/lockups/square_8.jpg" width="308" height="308" />
            <title class="showTextOnHighlight">Title 8</title>
          </lockup>
          <lockup>
            <img src="/resources/images/lockups/square_9.jpg" width="308" height="308" />
            <title class="showTextOnHighlight">Title 9</title>
          </lockup>
          <lockup>
            <img src="/resources/images/lockups/square_10.jpg" width="308" height="308" />
            <title class="showTextOnHighlight">Title 10</title>
          </lockup>
        </section>
      </shelf>
      <shelf class="3ColumnGrid">
        <header>
          <title>Featured Content (548x250, 3 Column Grid, 48 spacing)</title>
        </header>
        <section>
          <lockup>
            <img src="/resources/images/lockups/featured_1.jpg" width="548" height="250" />
            <title class="showTextOnHighlight">Title 1</title>
          </lockup>
          <lockup>
            <img src="/resources/images/lockups/featured_2.jpg" width="548" height="250" />
            <title class="showTextOnHighlight">Title 2</title>
          </lockup>
          <lockup>
            <img src="/resources/images/lockups/featured_3.jpg" width="548" height="250" />
            <title class="showTextOnHighlight">Title 3</title>
          </lockup>
          <lockup>
            <img src="/resources/images/lockups/featured_4.jpg" width="548" height="250" />
            <title class="showTextOnHighlight">Title 4</title>
          </lockup>
          <lockup>
            <img src="/resources/images/lockups/featured_5.jpg" width="548" height="250" />
            <title class="showTextOnHighlight">Title 5</title>
          </lockup>
        </section>
      </shelf>
    </collectionList>
  </stackTemplate>
</document>
```
