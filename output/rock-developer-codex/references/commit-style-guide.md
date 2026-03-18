> **Path:** Developer Codex > Coding Standards > Committing Code > Commit Style Guide

# Commit Style Guide

-   Although the "-" commit notes are typically fragments, each should still be a sentence and end in a period.
-   Use sentence case capitalization and proper noun casing. Proper nouns include the specific names of people, places, and things (including block names, specific Rock named features, field names, properties, and entity types).
    -   `+ (Core) Fixed the PageListAsBlocks Lava template in the Flat and Stark themes.`
-   Specific values should be in single quotation marks.
    -   `+ Fixed Scheduled Transaction Summary so that it does not always show a`
    -   `recurring NMI schedule as having a next payment of 'Today'.`
-   The abbreviation of “identification” (i.e., “ID”) should be capitalized unless it is part of a name or proper noun.
    -   `+ Added the ability for workflows to have sequential IDs based on a`
    -   `prefix associated with the type of workflow.`
-   Verbs should be in the simple past tense. If directions or instructions are included in the note, use the present tense.
    -   `+ Fixed Twilio transport being on by default. If using Twilio consider`
    -   `deleting the log file to regain some disk space on your web server.`
-   Words should be spelled correctly.
-   Word breaks and pagination should be handled automatically by the text field. Hyphens should follow AP standards and only be used for compound modifiers, to avoid duplicate vowels, and/or to avoid ambiguity. See
-   TOPIC/DOMAIN should be included in parentheses (not square brackets).
    -   `+ (CRM) Added option to collect child email addresses to the Family Pre`
    -   `Registration Block.`
-   Approved breaking changes. If a commit contains an approved breaking change then include the string “(Approved breaking change)” after the commit message but before the period and fixes string.
    -   `+ (CRM) Fixed CampusDetails block getting 404 error if the location`
    -   `doesn’t have an address (Approved breaking change). (Fixes #0000)`
