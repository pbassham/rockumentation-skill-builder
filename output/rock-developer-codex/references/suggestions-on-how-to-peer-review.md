> **Path:** Developer Codex > Coding Standards > Peer Reviews > Suggestions on How to Peer Review

# Suggestions on How to Peer Review

-   Look for common code.
    -   Code that should probably be moved to a common class or service layer or something similar.
-   Look out for confusing code.
    -   If you don't really understand it during peer review, there's a good chance the next developer to fix a bug in the code won't understand it either.
-   Observe new Property/Method/Class naming.
    -   If it doesn't seem like the right name, whether by context or by the [Naming Conventions](https://community.rockrms.com/developer/developer-codex/coding-standards/naming-conventions), push back and get a consensus.
-   Does it pass the smell test?
    -   If something just feels off, call it out. Let the other developer defend the decision. If they can, it is iron sharpening iron. If they can't, it is probably a good opportunity to refactor the code.
-   Don't be timid.
    -   Don't just say "*oh well, I don't really get it, but they must know what they are doing*".
    -   A peer review is not about one developer being more experienced or better than another. It's all about a second set of eyes. We all get tunnel vision when writing code and miss the obvious.
-   Ignore reviewing code generated files.
    -   For example, look at the C# view model bag files. Then just ignore the TypeScript bag files.
-   Learn from your own reviewed code.
    -   Many of the things we can call out to others are things that were called out in a peer review to us in the past. Make a note, then keep an eye out for those things in the future on other reviews.
-   Look at existing/working **Obsidian** blocks
    -   **Obsidian** DateTime usage
        -   Not safe to use over the wire, meaning in view model bags or block actions.
    -   **Obsidian** Integer identifiers
        -   These should be avoided in view model bags and block actions. But sometimes it is the lesser of two evils, so it's okay. Use judgement and don't be afraid to call it out and ask if it was intentionally done instead of a Guid.
-   Look for poor performance (or potential extraneous load/strain).
    -   Example: Impact of `UpdateDataViewStatistics.Execute()` (see [Excessive DataView Statistics, Change to ITransaction](https://app.asana.com/0/0/1204393914853672))
    -   Example: Code that loads an entire Person object when it only needs the AgeBracket property.
    -   Example: LINQ queries in loops, etc.
