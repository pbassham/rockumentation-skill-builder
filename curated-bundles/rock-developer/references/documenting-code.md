---
description: "Use when asking about code documentation standards, engineering notes format, internal API marking conventions, or C# naming conventions in Rock"
source: "https://community.rockrms.com/developer/developer-codex"
sourceLabel: Developer Codex
---
> **Path:** 

Documentation in code should explain the why more than anything else.

## Engineering Notes

An engineering note is meant to provide extra context for why something exists. Often this is because of a change that was made to existing code or when the reason for the code is not clear without it.

Engineering notes should be placed in the code. Below is a sample of a good engineering note.

Copy

```
/*
     9/27/2018 - JME

     If the SupportsCredentials property is true, the HTTP response will include an
     Access-Control-Allow-Credentials header. This header tells the browser that the
     server allows credentials for a cross-origin request.
     If the browser sends credentials, but the response does not include
     a valid Access-Control-Allow-Credentials header, the browser will not expose the
     response to the application, and the AJAX request fails.
     In the future we could move this to be a configuration on the CORS defined value
     to enable/disable the header for each domain, but at this time it doesn't see
     to be justified.

     Reason: Rocket Chat Integration
*/
```

The formula is: “When – Who” followed by the “Why” and the “Reason:” (why-summary). Include which customer requested the change in the Reason.

## Internal Usage Notation

Whenever code is meant to be used internally by the Rock team only, it should be marked as "internal".'

However, because of RockWeb (and plugin architecture), we sometimes have to mark classes, interfaces, or methods as public. For example, when adding a new type of component we might want to treat it as experimental until we know it works. But because of the nature of components, we had to make it public.

In these situations, those elements should be marked as internal use only with XMLDOC comments as well as a C# attribute. The XMLDOC is for the IntelliSense popup in Visual Studio (as well as people just browsing the code). The attribute will be used at a later time by automation tools, such as automatically throwing an error if a plugin tries to use such an "internal use only" item.

![](https://sparkdevnetwork.gitbook.io/rock-developer-codex/~gitbook/image?url=https%3A%2F%2Fstatic.slab.com%2Fprod%2Fuploads%2F3xqnyj9y%2Fposts%2Fimages%2FqsjzXHcHnV2Tlq3d1hC4aj4g.jpg&width=768&dpr=4&quality=100&sign=3aa3920d&sv=2)

```
/// <remarks>
///     <para>
///         <strong>This is an internal API</strong> that supports the Rock
///         infrastructure and not subject to the same compatibility standards
///         as public APIs. It may be changed or removed without notice in any
///         release and should therefore not be directly used in any plug-ins.
///     </para>
/// </remarks>
[RockInternal]
```

**NOTE**: This does not remove the need to properly fill out the <summary\> tag of the documentation.

---

## Naming Conventions {#naming-conventions}

# Naming Conventions

---

## C# {#c}

Our original naming conventions were adopted from items 1-7 in the Naming Conventions and Standard of the http://www.dotnetspider.com/tutorials/CodingStandards.doc

1. Use Pascal casing for class names
2. Use Pascal casing for method names
3. Use Camel casing for variables and method parameters
4. Use the prefix “I” with Camel casing for interfaces ( Example: IEntity )
5. Do not use Hungarian notation to name member variables, but instead prefix them with an underscore only.
6. Use meaningful, descriptive words to name variables. Do not use abbreviations.
7. Do not use single-character variable names like i, n, s, etc. Use names like index, temp. (One exception is “i” for iteration loops)

Additionally, all core developers must follow the naming conventions defined in our 101 Launchpad document: [https://www.rockrms.com/Rock/BookContent/16#namingconventions](https://www.rockrms.com/Rock/BookContent/16#namingconventions)

**NOTE**: All domain names shall be in *lower* case.

- Core attribute keys will start with ‘core\_’.
- Use
- Prefix private properties that have no getter/setter with an underscore “\_”

---

## TypeScript {#typescript}

*Rock uses ESLint to lint the TypeScript files, so nearly all of these rules will be enforced for you through compiler warnings and errors.*

1. Use Pascal casing for classes, interfaces, namespaces, types, and enum names.
2. Use Camel casing for function names, variables, and function parameters.
3. Do not prefix private properties or fields with the underscore "\_".
4. Use meaningful, descriptive words to name variables. Do not use abbreviations.
5. Use Camel casing for filenames.

---

## Database Naming Conventions {#database-naming-conventions}

*Follow all the property/field/database naming conventions described in the Developer guide:*

[Developer Guide](https://community.rockrms.com/developer/book/16/16/content#standardfieldpropertynaming)

**Additionally:**

- Fields ending with ‘`Id`’ must be int (if you need a field ending with ‘`Id`’ that is not an `int `consider ending with ‘`Key`’ instead.)
- Properties that refer to other entity's should be 'fully' qualified.
	- in `Interaction`, use `InteractionChannelId `and not `ChannelId`.
		- in `StepType`, use `StepProgramId` and not `ProgramId`
- **Data View** should be two separate words when not in a parameter / class / method name.

---

## Code Styles {#code-styles}

To ensure that all code is written with matching style it is essential that everyone follows these conventions.

The best way to get the proper configuration is to use the Visual Studio settings file located at:

**./Dev Tools/Env/rock\_vs2019.vssettings**

This file is found in the Core Rock Repo. Otherwise you can configure them manually here: [https://github.com/SparkDevNetwork/Rock/wiki/Coding-standards](https://github.com/SparkDevNetwork/Rock/wiki/Coding-standards)

![](https://community.rockrms.com/GetImage.ashx?Id=66664)

**Formatting JavaScript**

JavaScript contained in our block code does not need to be formatted/styled like our C# code. See "Developer Environment Settings" in the [Obsidian](https://community.rockrms.com/developer/obsidian) Guide.

---

## Style Cop {#style-cop}

*StyleCop analyzes C# source code to enforce a set of style and consistency rules*

StyleCop is configured using a Setting.StyleCop configuration file that is part of your Rock repo.

![](https://community.rockrms.com/GetImage.ashx?Id=66665)

You can download the (classic) extension from Visual Studio.

![](https://community.rockrms.com/GetImage.ashx?Id=66666)

Once installed you can Run a full scan from **Tools\> Run StyleCop** which may take some time and it will give you a lot of formatting warnings in your Error List window in Visual Studio since some files may not be directly related to the Core Rock code you are working with.

So it is recommended you run StyleCop on each document\\.cs file you are working with by right-clicking on a blank area in your file and running Style Cop.

![](https://community.rockrms.com/GetImage.ashx?Id=66667)

Alternatively you can bind a hot-key in Visual Studio to make the part of your development routine just like formatting your code.

So you can then press CTRL-K,CTRL-D to format your document then for example press CTRL-R,CTRL-C to run StyleCop on the current document.

To do this from Visual Studio go to **Tools \> Options \> Environment \> Keyboard** search for **stylecop** and create and assignment for the EditorContextMenus.CodeWindow.RunStyleCop and assign the global hot key to it.

![](https://community.rockrms.com/GetImage.ashx?Id=66668)

An example of StyleCop warnings

![](https://community.rockrms.com/GetImage.ashx?Id=66669)

---

## Method Size {#method-size}

*The size of a method is a common way to judge its complexity. Smaller methods are more likely to be reused and have been proven to reduce errors and increase efficiency.*

We want to keep things simple, which is usually short.

Keep in mind [SOLID principles](https://en.wikipedia.org/wiki/SOLID_\(object-oriented_design\)). A simple method should do one thing and be unit testable. Dependency injection, extension methods, and service methods are some good ways to simplify the code.

If breaking up the method makes it harder to read or debug then it is better to leave it as one long method. Two examples of this would be switch statements with lots of cases or when a lot of variables would have to be passed between the smaller methods. In the case of the large number of variables consider encapsulating them into an object or moving them to the class level. Otherwise, the large method is the lesser of two evils.

---

## Commenting Code {#commenting-code}

*Document every method (public, private and internal) and any code block/section that is non-intuitive/non-obvious or complex.*

1. The documentation should explain *why* the code exists (its purpose).
2. Method comments should use proper English (upper case character, end with period, etc.)
3. Comments should exist approximately every 50-100 lines or roughly within view of a page of code.
