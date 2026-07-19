---
name: rock-advanced
description: "Use when a Rock RMS staff developer is building inside Rock day to day — authoring Lava templates and shortcodes, writing Helix blocks, designing and building Rock-powered websites, writing custom SQL reports or dataview filters, and theming/styling. Covers Lava (filters, tags, commands, shortcodes), Helix, Designing and Building Websites Using Rock, Styling, the SQL Style Guide, Dynamic LINQ syntax, and shortcode authoring."
metadata:
  generator: rockumentation-skill-builder
  generatedAt: 2026-07-19T09:39:11.132Z
  sources:
    - url: "https://community.rockrms.com/Lava"
      label: Lava
      note: "Filters, tags, commands, shortcodes — the templating language used everywhere in Rock."
    - url: "https://community.rockrms.com/developer/helix"
      label: Helix
      note: "Helix block framework: HTMX, Lava applications, Lava commands, forms, strategies."
    - url: "https://community.rockrms.com/documentation/bookcontent/14/370"
      label: Designing and Building Websites Using Rock
    - url: "https://community.rockrms.com/styling"
      label: Styling
      note: "Rock's design system, theming, and CSS conventions."
    - url: "https://community.rockrms.com/developer/sql-style-guide"
      label: SQL Style Guide
      note: House style for SQL written against the Rock database.
    - url: "https://community.rockrms.com/developer/dynamic-linq-syntax"
      label: Dynamic LINQ Syntax
      note: "Filter syntax used in dataviews, reports, and Lava `Where` filters."
    - url: "https://community.rockrms.com/developer/the-long-short-on-shortcodes"
      label: Lava Shortcodes
      note: Authoring custom Lava shortcodes.
---

This skill bundles 73 references from 7 sources. Load topics on demand via the index below.

## Topics

### Lava

> Filters, tags, commands, shortcodes — the templating language used everywhere in Rock.

- [Lava](references/lava.md) — Use when you need to understand Lava templating syntax, output markup, filters, tags, or how to dynamically generate content in Rock
- [Lava Style Guide](references/lava-style-guide.md) — Use when formatting Lava code, configuring indentation and whitespace, naming variables, or styling comments and HTML attributes
- [Text Filters](references/text-filters.md) — Use when you need to manipulate text strings like appending, capitalizing, converting case, encrypting/decrypting, or setting default values
- [Date Filters](references/date-filters.md) — Use when converting dates to UTC format or formatting dates with custom patterns like day/month/year/time elements
- [Numeric Filters](references/numeric-filters.md) — Use when you need to perform mathematical operations on numbers like absolute value, rounding, division, min/max limits, or converting integers to enum values
- [Color Filters](references/color-filters.md) — Use when applying dynamic color transformations like hue adjustment, lightening, darkening, desaturation, opacity changes, or grayscale conversion to UI elements
- [Arrays](references/arrays.md) — Use when working with array and dictionary operations like adding items, retrieving keys, or removing null values from collections
- [Person](references/person.md) — Use when you need to retrieve or format a person's address by type (home, work, mailing, map location) with optional custom formatting templates
- [Attributes](references/attributes.md) — Use when working with Rock Attributes in Lava—accessing attribute values, retrieving specific properties, handling attribute security, or working with nested attribute objects
- [Other](references/other.md) — Use when you need to add CSS links, JavaScript files, meta tags, or custom headers to a Rock page in Lava
- [If / Else](references/if-else.md) — Use when you need to implement conditional logic with if/elsif/else statements or compare values in Lava templates
- [For](references/for.md) — Use when building loops in Lava templates to iterate over arrays, control iterations, or access loop helper variables like index and first/last flags
- [Lava](references/lava-tags.md) — Use when working with Rock's Fluid Lava engine to understand the reversed-syntax lava tag for logic-heavy code with less repetitive bracket notation
- [Adaptive Message](references/adaptive-message.md) — Use when retrieving personalized adaptive messages for individuals in message or category mode using Lava commands
- [Cache](references/cache.md) — Use when configuring caching strategies for Lava commands to improve performance, including setting cache keys, duration, and handling personalized cached content
- [Calendar Events](references/calendar-events.md) — Use when you need to retrieve upcoming calendar events from a specific calendar, optionally filtered by audience, campus, or date range
- [Entity](references/entity.md) — Use when querying Rock entities like People, Groups, and Transactions with Lava parameters such as where, filtering, sorting, limiting results, or applying security settings
- [Event Scheduled Instance](references/event-scheduled-instance.md) — Use when querying recurring event instances, scheduling calendars, or displaying upcoming event occurrences with iCal pattern support
- [Interaction Content Channel Item Write](references/interaction-content-channel-item-write.md) — Use when logging content channel item interactions programmatically or tracking user engagement with content channel items using Lava commands
- [Interaction Intent Write](references/interaction-intent-write.md) — Use when you need to log interaction records for intents in Rock using the InteractionIntentWrite Lava command
- [Interaction Write](references/interaction-write.md) — Use when you need to log interaction records in Lava with channel type, component, and entity details
- [Personalize](references/personalize.md) — Use when configuring conditional content display based on visitor segments, demographics, device type, location, or request parameters
- [Print ZPL](references/print-zpl.md) — Use when you need to send ZPL commands to Zebra label printers or configure printer device IDs and IP addresses in Lava templates
- [Search](references/search.md) — Use when building search queries in Lava to filter Rock entities by query terms, entity types, and field criteria with various matching strategies
- [SQL](references/sql.md) — Use when querying or modifying database data using SQL within Lava templates, including SELECT, UPDATE, and DELETE commands
- [Stylesheet](references/stylesheet.md) — Use when adding custom CSS styles to a page header or styling content conditionally using the stylesheet Lava command
- [Web Request](references/web-request.md) — Use when configuring advanced Web Request parameters like headers, authentication, request body, content types, timeout, or HTTP method
- [Workflow Activate](references/workflow-activate.md) — Use when you need to launch a new workflow or activate activities on existing workflows using Lava commands
- [Authoring Shortcodes](references/authoring-shortcodes.md) — Use when learning to create custom shortcodes in Lava, choosing shortcode types, or configuring shortcode parameters
- [Using Lava Remotely](references/using-lava-remotely.md) — Use when integrating Lava templates with external websites or applications outside of Rock using REST API calls
- [Creating APIs Using Lava](references/creating-apis-using-lava.md) — Use when building custom APIs in Rock using Lava templates and webhooks to respond to HTTP requests
- [Workflows and Lava](references/workflows-and-lava.md) — Use when building Rock workflows and needing to understand attribute value storage formats, field types, and how to access raw data identifiers in Lava

### Helix

> Helix block framework: HTMX, Lava applications, Lava commands, forms, strategies.

- [Overview](references/overview.md) — Use when building dynamic web pages with HTMX, creating Lava Applications and endpoints, or using Lava Commands for data modification in Rock's Helix framework
- [Endpoints](references/endpoints.md) — Use when building or configuring endpoints in Rock Lava applications, including setting up HTTP methods, security modes, caching, and accessing merge fields
- [Loading Indicator](references/loading-indicator.md) — Use when implementing loading indicators and spinners for HTMX requests in Rock applications

### Designing and Building Websites Using Rock

- [Designing and Building Websites Using Rock](references/designing-and-building-websites-using-rock.md) — Use when addressing concerns or objections about adopting Rock RMS as a content management system
- [Adding Content to Rock](references/adding-content-to-rock.md) — Use when adding new pages or blocks to a Rock website from the external site interface
- [Managing Content and Pages](references/managing-content-and-pages.md) — Use when users need guidance on page load time monitoring, admin toolbar features, or managing website pages and blocks in Rock CMS
- [HTML Content Block](references/html-content-block.md) — Use when users need guidance on editing HTML content blocks in Rock, including editor modes, date-range settings, and WYSIWYG vs code editor options
- [Content Component](references/content-component.md) — Use when designing website page layouts with reusable content templates that allow editors to add formatted content without HTML knowledge
- [Content Channels](references/content-channels.md) — Use when creating or configuring structured content types in Rock, such as blogs, bulletins, ads, and custom content containers for dynamic website content
- [Content Collections](references/content-collections.md) — Use when user needs to create, configure, or customize a Content Collection View block for searching and filtering across multiple content channels
- [Working With Images](references/working-with-images.md) — Use when configuring image file types in Rock, setting dimensions and transformations, or optimizing image performance with GetImage.ashx parameters
- [Asset Manager System](references/asset-manager-system.md) — Use when configuring cloud storage providers (AWS S3, Azure, Google Cloud, local file system) for Rock's Asset Management System
- [Landing Pages](references/landing-pages.md) — Use when user wants to create a focused single-topic page for events, registrations, or calls-to-action in Rock
- [Creating A New Site](references/creating-a-new-site.md) — Use when configuring and managing Rock website sites, including activation status, site attributes, page attributes, and setting up new sites in the CMS
- [Getting Social](references/getting-social.md) — Use when optimizing Rock website pages for social media sharing with meta tags and page descriptions
- [Using Context](references/using-context.md) — Use when implementing context-aware content in Rock pages, such as displaying dynamic group-specific information or configuring HTML blocks to access contextual data through query parameters
- [Personalization](references/personalization.md) — Use when setting up and configuring personalization segments to display dynamic content based on visitor characteristics, behaviors, or Rock database attributes
- [Font Awesome 5](references/font-awesome-5.md) — Use when configuring Font Awesome Pro in Rock or understanding free vs. Pro icon features and font weights
- [Designing Themes](references/designing-themes.md) — Use when you need to understand the structure and components of Rock themes, including directories, assets, layouts, scripts, styles, and how to create a custom theme using the Stark template
- [Persisted Datasets](references/persisted-datasets.md) — Use when needing to understand how to cache and reuse large datasets in Rock using the PersistedDataset Lava filter for performance optimization
- [Caching for Rock Websites](references/caching-for-rock-websites.md) — Use when understanding what content types can be cached in Rock websites and how different caching mechanisms work
- [Publishing Digital Media](references/publishing-digital-media.md) — Use when embedding videos on Rock websites using the Media Player Lava shortcode with analytics tracking and content channel integration
- [Content Library](references/content-library.md) — Use when user needs to browse, search, download, or manage shared church content from Rock's Content Library through the Library Viewer interface
- [Interactive Experiences](references/interactive-experiences.md) — Use when creating engaging real-time interactive experiences for church services via Rock Mobile, including polls, Q&A, and managing live audience participation

### Styling

> Rock's design system, theming, and CSS conventions.

- [Cards](references/cards.md) — Use when styling card components with headers, footers, content sections, images, and layout options
- [Panels](references/panels.md) — Use when styling panel components with headings, icons, and tables in Rock using HTML or lava shortcodes
- [Rock Badges](references/rock-badges.md) — Use when implementing or styling Rock badges including standard, icon, fraction, overlay, and label badge types in Rock V14+
- [Avatars](references/avatars.md) — Use when user needs to implement or configure avatar images for person records in Rock, including styling options, avatar types, and customization settings
- [Typography](references/typography.md) — Use when styling text elements, controlling font sizes, text alignment, colors, case transformations, or formatting inline text in Rock UI
- [Buttons](references/buttons.md) — Use when styling buttons with different colors, sizes, and states in Rock UI components
- [Grids](references/grids.md) — Use when user needs to understand Rock's responsive grid system, layout containers, columns, breakpoints, or how to structure page layouts
- [CSS Grids](references/css-grids.md) — Use when designing responsive multi-column layouts, configuring grid gaps, or controlling how content spans across grid cells
- [Aspect Ratios](references/aspect-ratios.md) — Use when styling elements with fixed aspect ratios like video, square, portrait, or landscape containers
- [Borders](references/borders.md) — Use when styling element borders, border colors, or applying rounded corners to components
- [Colors](references/colors.md) — Use when applying background colors, text colors, or border colors to elements in Rock design system
- [Display](references/display.md) — Use when styling element visibility, hiding/showing content at specific screen sizes, or applying display property values responsively
- [Flexbox](references/flexbox.md) — Use when styling flexible layouts, aligning flex items on main/cross axes, or setting flex direction and item distribution with CSS utility classes
- [Spacing](references/spacing.md) — Use when you need to apply margin or padding utilities to elements, or find spacing class names and their pixel values

### SQL Style Guide

> House style for SQL written against the Rock database.

- [SQL Style Guide](references/sql-style-guide.md) — Use when writing SQL queries, migrations, or code examples that need to follow Rock's SQL formatting and style conventions

### Dynamic LINQ Syntax

> Filter syntax used in dataviews, reports, and Lava `Where` filters.

- [Dynamic LINQ Syntax](references/dynamic-linq-syntax.md) — Use when writing Dynamic LINQ queries for Entity Search in Rock API v2 or Lava Entity Commands with Where, Select, Grouping, and Ordering expressions

### Lava Shortcodes

> Authoring custom Lava shortcodes.

- [Intro to Shortcodes](references/intro-to-shortcodes.md) — Use when user needs to understand what shortcodes are, how they simplify Lava syntax, or wants to learn shortcode development basics
