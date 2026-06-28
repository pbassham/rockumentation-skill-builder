---
name: rock-mobile
description: "Use when building a Rock Mobile app — iOS, Android, Apple TV, or Roku. Covers the Mobile Docs (shell setup, blocks, styling, deep links, push, app store submission), Apple TV docs, and Roku docs. This is the bundle to load whenever the question is about a native Rock-powered mobile or TV app."
metadata:
  generator: rockumentation-skill-builder
  generatedAt: 2026-06-28T10:05:25.082Z
  sources:
    - url: "https://community.rockrms.com/developer/mobile-docs"
      label: Mobile Docs
      note: Building Rock Mobile apps (iOS/Android via Xamarin/.NET MAUI).
    - url: "https://community.rockrms.com/developer/apple-tv-docs"
      label: Apple TV Docs
    - url: "https://community.rockrms.com/developer/roku-docs"
      label: Roku Docs
---

This skill bundles 119 references from 3 sources. Load topics on demand via the index below.

## Topics

### Mobile Docs

> Building Rock Mobile apps (iOS/Android via Xamarin/.NET MAUI).

- [App Configuration](references/app-configuration.md) — Use when configuring Rock mobile app settings like application name, type, orientation, pages, and API key
- [Deploying Your App](references/deploying-your-app.md) — Use when user needs guidance on deploying Rock mobile apps, testing with the Rock Mobile Core app, or configuring app switcher settings with API credentials
- [Advanced Topics](references/advanced-topics.md) — Use when building DataViews with dynamic JSON content sources or creating reusable DataTemplates as static resources in Rock Mobile layouts
- [Dynamic Content](references/dynamic-content.md) — Use when building interactive content blocks that respond to user actions like button taps or form submissions using Callbacks
- [Deep Linking](references/deep-linking.md) — Use when configuring deep links to route external URLs directly into a Rock mobile application on iOS or Android
- [Proximity Attendance](references/proximity-attendance.md) — Use when configuring automatic check-in/check-out via Bluetooth beacons or implementing proximity-based attendance tracking in mobile apps
- [Animations](references/animations.md) — Use when building UI animations in Rock Mobile to respond to user actions or view loading events
- [Content](references/content.md) — Use when building Rock Mobile app layouts that display dynamic or static content using Lava and XAML markup
- [Content Collection View](references/content-collection-view.md) — Use when helping users search, filter, and sort content across multiple content collection sources in Rock Mobile
- [Daily Challenge Entry](references/daily-challenge-entry.md) — Use when users need to set up, configure, or understand daily challenge workflows that track multi-day task completion with daily check-ins
- [Hero](references/hero.md) — Use when displaying full-width hero images with text overlays on mobile pages, including title, subtitle, and background image customization
- [Login](references/login.md) — Use when a user needs to configure or understand the login block for a Rock mobile application, including authentication settings and page navigation
- [Using Auth0](references/using-auth0.md) — Use when configuring Auth0 identity authentication for Rock mobile applications on iOS or Android
- [Using Entra](references/using-entra.md) — Use when configuring Microsoft Entra authentication for Rock Mobile applications
- [Structured Content View](references/structured-content-view.md) — Use when displaying interactive structured content like sermon notes with rich formatting, tap-to-reveal sections, and note-taking areas in Rock mobile apps
- [Check-in](references/check-in-check-in.md) — Use when setting up or configuring the Rock Mobile check-in block, including kiosk setup, screen templates, and check-in workflow parameters
- [Chat View](references/chat-view.md) — Use when a user needs help setting up or using real-time chat messaging in Rock Mobile, including channels, direct messages, threads, and group communications
- [Communication Entry](references/communication-entry.md) — Use when user needs to send bulk email or SMS messages to groups of recipients in Rock Mobile
- [SMS Conversation](references/sms-conversation.md) — Use when a user needs to display, configure, or style SMS text message conversations in a Rock mobile app interface
- [Connection Type List](references/connection-type-list.md) — Use when displaying a mobile list of connection types with customizable templates and request counts
- [Connection Opportunity List](references/connection-opportunity-list.md) — Use when displaying available connection opportunities for a specific connection type in Rock mobile applications
- [Connection Request List](references/connection-request-list.md) — Use when displaying pending connection requests for a specific ministry opportunity or managing volunteer assignments in Rock mobile
- [Connection Request Detail](references/connection-request-detail.md) — Use when displaying detailed information about a specific connection request including its status, activities, and contact options in a Rock mobile application
- [Notes](references/notes.md) — Use when displaying, adding, or editing notes for people or other entities in Rock Mobile applications
- [Search](references/search.md) — Use when implementing a search interface with configurable search components, result templates, and search history display functionality in Rock Mobile
- [Smart Search](references/smart-search.md) — Use when implementing multi-component search functionality to find people by birthdate, name, email, address or groups by name with configurable results display
- [My Notes](references/my-notes.md) — Use when users need to view, edit, delete, or manage their personal notes in Rock Mobile, including linking notes to people, reminders, or connections
- [Person Profile](references/person-profile.md) — Use when helping users display, configure, or customize person profile information in Rock mobile applications
- [Calendar Event Item Occurrence View](references/calendar-event-item-occurrence-view.md) — Use when displaying details about a specific event occurrence including registration status, location, schedule, and contact information
- [Event Item Occurrence List By Audience Lava](references/event-item-occurrence-list-by-audience-lava.md) — Use when building a mobile block to display upcoming event occurrences filtered by audience, campus, and calendar with customizable Lava templating
- [Giving](references/giving.md) — Use when helping users configure native mobile giving features like Apple Pay, Google Pay, and saved payment methods in Rock Mobile Shell
- [Group Member Edit](references/group-member-edit.md) — Use when modifying group member details like role, status, communication preferences, or notes in Rock Mobile
- [Group Member List](references/group-member-list.md) — Use when users need to display or view a list of members belonging to a specific group in a Rock mobile application
- [Group Registration](references/group-registration.md) — Use when user needs to register for a group or configure group registration settings in Rock Mobile
- [Schedule Toolbox](references/schedule-toolbox.md) — Use when user needs to accept, decline, or cancel group scheduling attendance requests in Rock mobile
- [Prayer Card View](references/prayer-card-view.md) — Use when configuring or customizing the prayer card view block in Rock mobile, including template settings, merge fields, and prayer request display options
- [Reminder List](references/reminder-list.md) — Use when configuring reminder list displays, filtering reminders by status or due date, or understanding reminder settings and parameters
- [Onboard Person](references/onboard-person.md) — Use when a user needs guidance on configuring the account onboarding flow for Rock mobile apps, including verification, demographics, campus, and notification preferences setup
- [Fallback Chat Notifications](references/fallback-chat-notifications.md) — Use when configuring fallback notifications for Chat members without the Rock Mobile app or disabled notifications via email or SMS.
- [Commands](references/commands.md) — Use when asking about how to handle button taps, gestures, and user interactions in Rock Mobile applications using Commands and CommandParameters
- [Communication Commands](references/communication-commands.md) — Use when users need to initiate phone calls, send emails, or compose text messages from within an application
- [Navigation Commands](references/navigation-commands.md) — Use when needing to configure page navigation behavior (Push, Replace, Show modes) or implement commands to open maps, app settings, or browser links in mobile apps
- [Media Commands](references/media-commands.md) — Use when building mobile app features that play audio or video files in full-screen with customizable parameters like titles, thumbnails, and player controls
- [Utility Commands](references/utility-commands.md) — Use when user wants to add calendar events to a device calendar or chain multiple commands together in sequence
- [Avatar](references/avatar.md) — Use when you need to display a person's profile picture or avatar image with customizable styling, colors, and text options
- [Bible Browser](references/bible-browser.md) — Use when building a Bible browsing interface that needs to navigate between books and chapters with automatic logic for next/previous availability
- [Cards](references/cards.md) — Use when building card-based UI layouts in Rock mobile with Contained, Block, or Inline card components
- [Masks](references/masks.md) — Use when applying transparent gradient overlays or masks to images and cards in Rock mobile designs
- [Confetti View](references/confetti-view.md) — Use when implementing celebratory confetti animations in mobile apps with customizable particles, shapes, colors, and physics behaviors
- [Context Menu](references/context-menu.md) — Use when building native context menus that trigger on tap or long press for mobile controls in Rock Mobile applications
- [Countdown](references/countdown.md) — Use when implementing countdown timers on pages with date/time configuration and styling options
- [Cover Sheet](references/cover-sheet.md) — Use when styling cover sheet navigation bars, configuring cover sheet display parameters, or implementing cover sheet presentation on iOS and Android
- [Field Container](references/field-container.md) — Use when implementing form field containers with labels, borders, and required field indicators in Rock Mobile apps
- [Following Icon](references/following-icon.md) — Use when implementing a follow/unfollow toggle icon for content items in Rock Mobile apps that tracks user preferences
- [Geo Boundary View](references/geo-boundary-view.md) — Use when displaying different content based on whether a user is inside or outside a geofenced location area
- [Gradient Label](references/gradient-label.md) — Use when applying gradient color effects to text labels in Rock Mobile UI components
- [HTML](references/html.md) — Use when a user needs to render HTML content in a Rock Mobile app, including supported tags, styling options, and Lava integration
- [Icon](references/icon.md) — Use when adding icons to mobile app pages from FontAwesome, Material Design, or Tabler icon libraries
- [Image](references/image.md) — Use when building mobile UI components that display images with customization options like aspect ratios, placeholders, blur effects, and tap handlers
- [Items Collection](references/items-collection.md) — Use when displaying a performant list of items in a mobile app with JSON data and a consistent item template
- [Media Player](references/media-player.md) — Use when implementing audio or video playback, configuring media players, handling streaming formats, or integrating Rock's Media Accounts with playback analytics
- [Legacy](references/media-player-legacy.md) — Use when implementing embedded video/audio playback in Rock Mobile apps using the legacy Media Player control for versions before 6.0
- [Responsive Layout](references/responsive-layout.md) — Use when building responsive mobile layouts that adapt to different device sizes and orientations using column-based grid systems
- [Segment Picker](references/segment-picker.md) — Use when building mobile UI components that need horizontal segmented selection controls with multiple options displayed as a single row of selectable segments
- [Styled View](references/styled-view.md) — Use when you need to apply advanced styling to views including gradients, custom borders, corner radius, shadows, and Material Design elevation
- [Tag](references/tag.md) — Use when implementing pill-shaped tag labels or toggle button controls in Rock Mobile applications with styling and property configuration
- [Scan Code](references/scan-code.md) — Use when implementing barcode scanning functionality in Rock mobile apps, including camera modes, scan triggers, and passing scanned values to commands
- [Blur Effect](references/blur-effect.md) — Use when implementing blur effects on iOS visual elements like cards, layouts, or navigation components in Rock Mobile apps
- [Safe Area Padding Behavior](references/safe-area-padding-behavior.md) — Use when handling notches, rounded corners, or safe area padding on mobile screens to keep content visible in safe zones
- [Attribute Value Editor](references/attribute-value-editor.md) — Use when building custom mobile forms that need to render attribute fields with proper Rock field type handling and validation
- [Date Picker](references/date-picker.md) — Use when building mobile forms that require date selection inputs, email validation fields, or read-only label displays in Rock mobile applications
- [Text Box](references/text-box.md) — Use when implementing single-line or multi-line text input fields in Rock mobile forms with validation and styling requirements
- [On Device Platform](references/on-device-platform.md) — Use when customizing Rock Mobile UI elements to display different content or styles based on the device's operating system platform or device type
- [Outreach Toolbox](references/outreach-toolbox.md) — Use when users ask about setting up personal contact lists, prayer reminders, relationship tracking, or the Outreach Toolbox mobile features for spiritual engagement
- [Voice Agent](references/features-voice-agent.md) — Use when the user wants to add a hands-free voice conversation feature to their mobile app or needs guidance on implementing voice-based interaction with an AI agent
- [Lava](references/lava.md) — Use when building Rock Mobile experiences with Lava templating, filters, whitespace optimization, or accessing shell variables like PageParameter and CurrentPerson
- [Performance](references/performance.md) — Use when optimizing XAML layout performance, choosing between layout types, or reducing view hierarchy overhead in Rock Mobile apps
- [Tips and Tricks](references/tips-and-tricks.md) — Use when customizing spacing, margins, and layout properties in Rock Mobile, or implementing device-specific UI variations for phone and tablet displays
- [Custom Site Attributes](references/custom-site-attributes.md) — Use when configuring custom entity attributes for Rock mobile applications accessible via Lava in XAML components
- [Migrating to .NET MAUI (V6)](references/migrating-to-net-maui-v6.md) — Use when users need guidance on upgrading Rock Mobile applications from Xamarin Forms V5 to .NET MAUI V6, including layout changes and migration steps
- [Page Anchors](references/page-anchors.md) — Use when implementing deep linking or navigation that scrolls to specific page elements using anchor fragments or AnchorScrollParameters
- [Walkthrough](references/walkthrough.md) — Use when building responsive mobile UI layouts with Rock Mobile styling utilities, typography, colors, and component styling for XAML views
- [Colors](references/style-guide-colors.md) — Use when customizing colors, implementing dark mode responsiveness, or applying color utility classes in Rock Mobile applications
- [Typography](references/typography.md) — Use when building Rock Mobile interfaces and need to configure fonts, font weights, or text sizes across iOS and Android platforms
- [Utilities](references/utilities.md) — Use when styling Rock Mobile applications with utility CSS classes for margins, padding, opacity, visibility, spacing, and grid layouts
- [Shell Components](references/shell-components.md) — Use when styling mobile shell UI components like navigation bar, tab bar, status bar, and their colors, transparency, and blur effects
- [Colors](references/legacy-colors.md) — Use when you need to configure color schemes, hex color values, interface colors, or access predefined color palettes for Rock mobile applications
- [Alpha Transparency](references/alpha-transparency.md) — Use when user needs to convert between hexadecimal opacity codes and percentage values for Xamarin Forms colors
- [Text Size](references/text-size.md) — Use when customizing text sizes in Xamarin.Forms controls with platform-specific sizing standards and user font scaling support
- [iOS Shadows](references/ios-shadows.md) — Use when styling UI elements in Rock Mobile with shadows, frames, drop shadows on iOS, or customizing tag appearance with CSS
- [Button](references/button.md) — Use when styling buttons in Rock Mobile with different colors, sizes, outline styles, and alignment options
- [Custom CSS](references/custom-css.md) — Use when styling Rock Mobile apps with CSS, including inline styles, global styles, utility classes for platforms/devices, and targeting pages or blocks
- [Custom Blocks](references/custom-blocks.md) — Use when building custom mobile block types in Rock with C# instead of Lava, including configuration, mobile UI markup, and callback handling
- [App Store Product Page](references/app-store-product-page.md) — Use when optimizing the Rock Mobile app's App Store product page including name, icon, subtitle, and screenshots to improve discoverability and downloads
- [Push Notifications](references/push-notifications.md) — Use when answering questions about sending push notifications to Rock Mobile app users, configuring notification transports, or authoring notification messages with links and details

### Apple TV Docs

- [Apple TV Docs](references/apple-tv-docs.md) — Use when building Apple TV applications with Rock RMS using TVML, including creating templates and integrating with Rock data
- [Adding Content](references/adding-content.md) — Use when building Apple TV app interfaces and need guidance on adding TVML content, menu bars, templates, and background images to application screens
- [List Template](references/list-template.md) — Use when displaying a scrollable list of individual items with details, such as favorite messages or filtered content within a single category
- [Alert Template](references/alert-template.md) — Use when you need to create a modal alert displaying important information with action buttons for Rock mobile apps
- [Descriptive Alert Template](references/descriptive-alert-template.md) — Use when displaying lengthy important information like terms of service or policies with a title, scrollable content area, and action buttons
- [Main Template](references/main-template.md) — Use when creating a main landing page template with background images, audio, and a bottom menu bar for navigation options
- [Parade Template](references/parade-template.md) — Use when creating a mobile UI with a category list on the right and auto-scrolling image carousel on the left
- [Catalog Template](references/catalog-template.md) — Use when building a product catalog interface with category listings on the left and product images displayed on the right side
- [Compilation Template](references/compilation-template.md) — Use when displaying a product composed of multiple related items, like a podcast with episodes, that needs grouped sections, header info, related images, and action buttons
- [One Up Template](references/one-up-template.md) — Use when building a full-screen image gallery with left/right navigation and expandable captions for Rock tvOS applications
- [Product Template](references/product-template.md) — Use when displaying detailed product or content pages with hero imagery, metadata, descriptions, related items, and interactive elements
- [Product Bundle Template](references/product-bundle-template.md) — Use when building a mobile landing page that showcases a main content item with associated related items displayed in a horizontal shelf below
- [Showcase Template](references/showcase-template.md) — Use when displaying a scrollable carousel of images with titles, subtitles, and descriptions where the focused image enlarges
- [Stack Template](references/stack-template.md) — Use when building tvOS layouts with stacked product categories displayed as carousels, grids, or shelves
- [Creating a Sign-in Page](references/creating-a-sign-in-page.md) — Use when setting up mobile/computer sign-in for Rock TV apps with QR codes and remote authentication
- [Navigation Commands](references/apple-tv-docs-navigation-commands.md) — Use when configuring Apple TV navigation commands to push, replace, or present pages and modals in rock-mobile applications
- [Media Commands](references/apple-tv-docs-media-commands.md) — Use when configuring video or audio playback commands in Apple TV apps, including resume tracking and media metadata
- [Utility Commands](references/apple-tv-docs-utility-commands.md) — Use when styling Rock Mobile UI elements, toggling CSS classes, managing application context, or implementing follow/unfollow functionality
- [Getting Started](references/getting-started.md) — Use when styling Rock Mobile pages with CSS-like rules, classes, ids, and TVML formatting syntax
- [TV Text Style](references/tv-text-style.md) — Use when styling text in Apple TV apps, including text styles, font weights, and formatting like bold, italic, and strikethrough in TVML

### Roku Docs

- [👋 Roku Docs](references/roku-docs.md) — Use when building Roku TV applications in Rock RMS, including app creation, SceneGraph development, authentication, and media playback integration
- [Applications](references/applications.md) — Use when you need to configure Roku application settings in Rock, including page view tracking, API keys, and authentication pages
- [Pages](references/pages.md) — Use when building custom Roku TV app pages with Lava scripting, configuring page settings, caching behavior, and merge fields for personalized content display
- [Navigation](references/navigation.md) — Use when you need to implement page navigation in Rock mobile apps, including pushing, replacing, or popping pages from the navigation stack
- [Media](references/media.md) — Use when configuring video playback in Rock mobile apps, including resume functionality, metadata, and media element properties
- [Focus Group](references/focus-group.md) — Use when implementing vertical or horizontal focus navigation in Roku applications or managing initial focus state on pages
