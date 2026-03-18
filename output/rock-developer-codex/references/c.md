> **Path:** Developer Codex > Coding Standards > Naming Conventions > C#

# C#

Our original naming conventions were adopted from items 1-7 in the Naming Conventions and Standard of the http://www.dotnetspider.com/tutorials/CodingStandards.doc

1.  Use Pascal casing for class names
2.  Use Pascal casing for method names
3.  Use Camel casing for variables and method parameters
4.  Use the prefix “I” with Camel casing for interfaces ( Example: IEntity )
5.  Do not use Hungarian notation to name member variables, but instead prefix them with an underscore only.
6.  Use meaningful, descriptive words to name variables. Do not use abbreviations.
7.  Do not use single-character variable names like i, n, s, etc. Use names like index, temp. (One exception is “i” for iteration loops)

Additionally, all core developers must follow the naming conventions defined in our 101 Launchpad document: [https://www.rockrms.com/Rock/BookContent/16#namingconventions](https://www.rockrms.com/Rock/BookContent/16#namingconventions)

**NOTE**: All domain names shall be in *lower* case.

-   Core attribute keys will start with ‘core\_’.
-   Use
-   Prefix private properties that have no getter/setter with an underscore “\_”
