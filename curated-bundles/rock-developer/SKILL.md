---
name: rock-developer
description: "Use when contributing to Rock RMS itself or writing native C#/Vue plugins for Rock — coding standards, commit discipline, the release process, the Obsidian (Vue 3) block framework, the design system, AI agent integration, packaging plugins and themes for the Rock Shop, Slingshot bulk imports, the realtime visualizer, quickstart tutorials, branch model, changelog, and the 101/202/303 onboarding tracks. NOT for end-user, admin, Lava, or mobile-app questions — load rock-user / rock-administration / rock-advanced / rock-mobile for those."
metadata:
  generator: rockumentation-skill-builder
  generatedAt: 2026-05-18T18:29:51.867Z
  sources:
    - url: "https://community.rockrms.com/developer/developer-codex"
      label: Developer Codex
      note: "Coding standards, commit discipline, release process, and core conventions."
    - url: "https://community.rockrms.com/developer/obsidian"
      label: Obsidian
      note: Vue 3 / TypeScript front-end framework powering modern Rock blocks.
    - url: "https://community.rockrms.com/developer/design-system"
      label: Design System
      note: "Component library, design tokens, and patterns."
    - url: "https://community.rockrms.com/developer/ai-agents"
      label: AI Agents
      note: Building AI-powered features inside Rock.
    - url: "https://community.rockrms.com/developer/packaging-plugins-themes"
      label: "Packaging Plugins & Themes"
      note: Plugin/theme manifest format and the Rock Shop publishing flow.
    - url: "https://community.rockrms.com/developer/slingshot"
      label: Slingshot
      note: Bulk-import format for migrating data into Rock.
    - url: "https://community.rockrms.com/developer/realtime-visualizer"
      label: Realtime Visualizer
    - url: "https://community.rockrms.com/developer/quickstart-tutorials"
      label: Quickstart Tutorials
    - url: "https://community.rockrms.com/developer/rock-branches"
      label: Rock Branches
    - url: "https://community.rockrms.com/developer/changelog"
      label: Changelog
    - url: "https://community.rockrms.com/developer/101---launchpad"
      label: 101 — Launchpad
    - url: "https://community.rockrms.com/developer/202---ignition"
      label: 202 — Ignition
    - url: "https://community.rockrms.com/developer/303---blast-off"
      label: 303 — Blast Off
---

This skill bundles 86 references from 13 sources. Load topics on demand via the index below.

## Topics

### Developer Codex

> Coding standards, commit discipline, release process, and core conventions.

- [Rules](references/rules.md) — Use when following Rock RMS development standards, naming conventions, code patterns, DateTime formatting, backward compatibility requirements, or Grid column references
- [Documenting Code](references/documenting-code.md) — Use when asking about code documentation standards, engineering notes format, internal API marking conventions, or C# naming conventions in Rock
- [Method Behavior Parameters ("Options")](references/method-behavior-parameters-options.md) — Use when designing method signatures that accept multiple behavioral parameters or options to determine if a POCO should replace individual parameters
- [Plugin Hotfix Migrations](references/plugin-hotfix-migrations.md) — Use when creating or managing plugin hotfix migrations, disabling hotfix migrations in develop branch, or coordinating migrations across hotfix and develop branches
- [Process to Chop or Swap](references/process-to-chop-or-swap.md) — Use when migrating production WebForms blocks to Obsidian blocks, determining if replacement is simple or complex, and executing chop or swap operations
- [API Patterns](references/api-patterns.md) — Use when implementing v2 API endpoints in Rock v17+, configuring API security, or understanding EXECUTE_READ/WRITE authorization patterns

### Obsidian

> Vue 3 / TypeScript front-end framework powering modern Rock blocks.

- [Debugging Obsidian in VS Code](references/debugging-obsidian-in-vs-code.md) — Use when setting up or troubleshooting VS Code debugging for Obsidian development, including attaching debuggers to existing Chrome instances
- [Plugin Development](references/plugin-development.md) — Use when developing Rock plugins with the rock-dev-tool CLI, setting up development environments, understanding plugin directory structures, or configuring multi-plugin development workflows
- [Obsidian Component Structure](references/obsidian-component-structure.md) — Use when building or structuring Rock Obsidian components, including template setup, imports, properties, events, and component architecture
- [Form Validation](references/form-validation.md) — Use when building forms with validation rules, handling form submission, or implementing required/optional field validation in Obsidian components
- [Creating Blocks](references/creating-blocks.md) — Use when building Obsidian blocks in Rock RMS, including architecture of C# blocks, TypeScript components, and Block Actions for server-client communication
- [Creating Detail Blocks](references/creating-detail-blocks.md) — Use when building detail blocks that display entity information with edit capabilities, labels, badges, and customizable header/footer actions
- [Implementing IHasCustomActions](references/implementing-ihascustomactions.md) — Use when implementing custom configuration settings for Rock blocks using the IHasCustomActions interface
- [Creating UI Controls](references/creating-ui-controls.md) — Use when developing custom UI controls in Obsidian, including component file structure, .obs file conventions, and Control Gallery documentation
- [Creating Field Types](references/creating-field-types.md) — Use when building custom field types or understanding how field types handle viewing, editing, filtering, and configuration functionality
- [Converting Core Field Types](references/converting-core-field-types.md) — Use when building a new Obsidian field type, enabling field type support, or implementing field type components in Rock
- [Core Field Type Patterns](references/core-field-type-patterns.md) — Use when implementing custom Obsidian Field Type patterns, including Edit and Configuration components for field type development
- [Universal Field Types](references/universal-field-types.md) — Use when building universal field types for Rock that work across UI frameworks without WebForms dependencies
- [Browser Bus](references/browser-bus.md) — Use when implementing pub-sub messaging between components on a single page using the browser bus API
- [Grids](references/grids.md) — Use when implementing or configuring a Grid control in Obsidian to display, filter, sort, and paginate tabular data
- [Grid](references/grid.md) — Use when configuring grid column properties, data binding, and feature settings like sticky headers, live updates, and entity type identification
- [LabelColumn](references/labelcolumn.md) — Use when displaying status values or enum fields as styled pill labels with customizable colors based on the field value
- [PersonColumn](references/personcolumn.md) — Use when implementing person columns in Rock grids to display formatted person information with name, avatar, and optional details
- [Misc Notes](references/misc-notes.md) — Use when configuring picker required behavior, deselection options, or diagnosing Vue compiler syntax errors
- [App Laws](references/app-laws.md) — Use when you need guidance on Rock developer code style, naming conventions, formatting rules, and best practices for TypeScript and component development

### Design System

> Component library, design tokens, and patterns.

- [Design System](references/design-system.md) — Use when designing UI components or layouts for Rock RMS using the Figma component library and design system

### AI Agents

> Building AI-powered features inside Rock.

- [AI Agents](references/ai-agents.md) — Use when building or customizing AI agent skills and tools in Rock, including security, configuration, and best practices for developers
- [Agent Instructions](references/agent-instructions.md) — Use when configuring agent instructions, system prompts, and guidance for how agents should handle requests and respond to users
- [Types of Tools](references/types-of-tools.md) — Use when deciding whether a tool should be a Lookup or List type, or when naming and structuring data retrieval tools for AI agent skills
- [Lava Tools](references/lava-tools.md) — Use when building custom Lava tools for Rock to enable AI agents to query data, execute commands, and interact with Rock entities through prompts and SQL
- [Lookup Tools](references/lava-tools-lookup-tools.md) — Use when you need to understand how to build lookup tools that translate data into agent-readable formats for quick reference retrieval
- [List Tools](references/lava-tools-list-tools.md) — Use when building list tools that filter data, format results into record sets, and apply pagination to return matching records
- [Get Tools](references/lava-tools-get-tools.md) — Use when you need to understand how to retrieve and format a single specific record using Get tools with ID parameters and related data joins
- [Insight Tools](references/insight-tools.md) — Use when analyzing or aggregating data patterns like counts, group statistics, or summary metrics rather than retrieving individual records
- [Native Tools](references/native-tools.md) — Use when building advanced AI agent tools in C# with complex logic, external APIs, or heavy database operations using AgentSkillComponent classes
- [Lookup Tools](references/native-tools-lookup-tools.md) — Use when implementing lookup tools that retrieve and format cached data without parameters for AI natural language processing
- [List Tools](references/native-tools-list-tools.md) — Use when implementing list tools with filtering, pagination, and result formatting for Rock platform queries
- [Get Tools](references/native-tools-get-tools.md) — Use when building a simple Get tool that loads an entity and returns formatted results for an AI agent
- [AddOrUpdate Tools](references/addorupdate-tools.md) — Use when implementing add or update operations for database entities in Rock, including entity creation, property modification, and persistence patterns
- [AvailableAttributes Tools](references/availableattributes-tools.md) — Use when discovering which data fields are available for an entity and their expected data types
- [Summary Tools](references/summary-tools.md) — Use when building summary tools that aggregate data with filtering options and configurable grouping dimensions
- [Rock Tool Helper](references/rock-tool-helper.md) — Use when implementing Native Tools that need validation, error collection, pagination, or standardized entity access patterns

### Packaging Plugins & Themes

> Plugin/theme manifest format and the Rock Shop publishing flow.

- [Packaging Plugins & Themes](references/packaging-plugins-themes.md) — Use when a developer wants to understand what types of extensions can be published to the Rock Shop and initial guidelines for getting started with plugin development
- [Submitting to the Rock Shop](references/submitting-to-the-rock-shop.md) — Use when a developer needs to submit their plugin, theme, or external app to the Rock Shop marketplace

### Slingshot

> Bulk-import format for migrating data into Rock.

- [Specifics of Migration](references/specifics-of-migration.md) — Use when asking what data can be imported from specific CMS systems into Rock or what fields are supported during migration

### Realtime Visualizer

- [RealTime Visualizer](references/realtime-visualizer.md) — Use when configuring real-time messaging topics, channels, and visual themes for Rock entity updates like attendance and achievements

### Quickstart Tutorials

- [Quickstart Tutorials](references/quickstart-tutorials.md) — Use when a developer needs to create a basic Rock block plugin and add it to a Rock CMS page
- [Fetching Data](references/fetching-data.md) — Use when building a Rock block that fetches and displays data from the Rock database, such as listing records in a grid
- [Configurable Blocks](references/configurable-blocks.md) — Use when developer needs to add configurable block attributes to customize block behavior through Rock's admin interface
- [Connecting Blocks](references/connecting-blocks.md) — Use when implementing clickable grid rows to navigate to related entity details pages with event handlers and linked page properties
- [Customizing and Securing Blocks](references/customizing-and-securing-blocks.md) — Use when implementing role-based UI visibility in Rock blocks, such as showing Add buttons only to users with Edit authorization
- [Appendix - New Developer Environment Setup](references/appendix---new-developer-environment-setup.md) — Use when a new .NET developer needs to set up their local development environment including SQL Server and database configuration

### Rock Branches

- [Rock Branches](references/rock-branches.md) — Use when asking about Rock's Git branching strategy, develop vs pre-alpha-release branches, or risks of running bleeding-edge Rock versions

### Changelog

- [Technical Release Notes](references/technical-release-notes.md) — Use when a developer needs to understand breaking changes, removed APIs, or migration requirements for Rock platform updates

### 101 — Launchpad

- [A Basic Block](references/a-basic-block.md) — Use when a developer needs to understand Rock block fundamentals, structure, markup, code-behind files, or how to create a basic reusable block component
- [Different Ways to Get Input Values](references/different-ways-to-get-input-values.md) — Use when needing to retrieve input values from QueryString, page parameters, or Block Attributes in Rock blocks
- [Person Preferences](references/person-preferences.md) — Use when implementing user preference storage and retrieval for blocks, such as remembering filter, sort, or display settings per person
- [Securing Access to Your Blocks](references/securing-access-to-your-blocks.md) — Use when implementing security checks in Rock blocks to authorize user actions like View, Edit, and Administrate
- [Loading Entities](references/loading-entities.md) — Use when loading existing entities from Rock database using Service classes and LINQ queries
- [Saving Entities](references/saving-entities.md) — Use when saving new or updated entities to Rock database, or handling entity relationships after save operations
- [Using the Grid and GridFilter](references/using-the-grid-and-gridfilter.md) — Use when implementing data grids, sortable tables, or filtering interfaces in Rock blocks
- [Using Breadcrumbs](references/using-breadcrumbs.md) — Use when implementing custom breadcrumb navigation trails in Rock blocks or controlling breadcrumb display settings on pages
- [The Block Configuration Slide Out Bar](references/the-block-configuration-slide-out-bar.md) — Use when implementing custom edit buttons or configuration controls in the Rock block slide-out bar
- [Dates and Times](references/dates-and-times.md) — Use when handling dates and times in Rock development, including time zone conversions, formatting for international audiences, and date range comparisons
- [Using PersonAlias vs Person](references/using-personalias-vs-person.md) — Use when storing person references in custom data models to understand why PersonAlias IDs should be used instead of Person IDs
- [Extension Methods](references/extension-methods.md) — Use when you need to extend .NET classes with helper methods for booleans, controls, dates, dictionaries, enums, and other common data types in Rock applications
- [Naming Conventions](references/naming-conventions.md) — Use when developer needs to follow naming conventions for Rock CMS projects, blocks, tables, stored procedures, attributes, and other code components

### 202 — Ignition

- [202 - Ignition](references/202---ignition.md) — Use when understanding Rock's core entity framework, data models, and how entities like Person manage data properties and relationships
- [Common Entities](references/common-entities.md) — Use when you need to understand Rock's Person entity structure, properties, and relationships for developer tasks
- [Advanced Entity Guide](references/advanced-entity-guide.md) — Use when understanding less common Rock entities like Attendance records, Attributes, and AttributeValues for data modeling
- [Saving Custom Data](references/saving-custom-data.md) — Use when a developer needs to create custom database entities in Rock using Entity Framework and the code-first approach
- [The Data Migration](references/the-data-migration.md) — Use when learning how to create or modify database tables, schema, and data migrations for Rock plugins
- [Data Migration Helper Methods](references/data-migration-helper-methods.md) — Use when developer needs to simplify data migration code using Rock's helper methods for adding/updating blocks, pages, attributes, groups, and defined types

### 303 — Blast Off

- [Writing Custom Rock Jobs](references/writing-custom-rock-jobs.md) — Use when a user needs to create, configure, or implement scheduled jobs that run custom code periodically in Rock RMS
- [Writing Custom Workflow Actions](references/writing-custom-workflow-actions.md) — Use when developers need to create custom workflow actions in Rock RMS beyond the built-in options
- [Writing Custom Data View Filters](references/writing-custom-data-view-filters.md) — Use when implementing custom data view filters in Rock to retrieve data based on conditions not available in existing filters
- [Blocks](references/blocks.md) — Use when customizing Rock block configuration UI, security settings, inter-block data sharing, or implementing entity-level permissions in grids
- [Context Aware Blocks](references/context-aware-blocks.md) — Use when developing custom Rock blocks that need to access and respond to entities in the user's current context
- [Extending Rock Even Further](references/extending-rock-even-further.md) — Use when building custom FieldTypes and Field Attributes in Rock to extend data model functionality
- [Extending Your Models by Adding Custom Logic on Saves](references/extending-your-models-by-adding-custom-logic.md) — Use when implementing custom business logic, validation, or cascading deletes in Rock model classes using PreSaveChanges and PostSaveChanges hooks
- [Performance Related Considerations](references/performance-related-considerations.md) — Use when optimizing Rock code performance, leveraging caches to reduce database queries, or improving LINQ query efficiency
- [The Rock Rest API](references/the-rock-rest-api.md) — Use when integrating with Rock's REST API, authenticating requests, or accessing Rock data from external applications
- [Rock Logging Engine](references/rock-logging-engine.md) — Use when a Rock developer needs to implement logging, configure logging levels, or understand Rock's logging engine and best practices
- [Rock RealTime Engine (v16)](references/rock-realtime-engine-v16.md) — Use when learning how Rock's RealTime engine enables server-client communication, including topics, channels, and the custom abstraction layer
- [Using Data Views](references/using-data-views.md) — Use when implementing custom Rock blocks or plugins that need to execute data views programmatically with best practices for caching and performance
- [Patterns in Rock](references/patterns-in-rock.md) — Use when implementing flexible, schema-agnostic data storage on Rock models that may evolve without database migrations
