---
description: "Use when you need guidance on Rock developer code style, naming conventions, formatting rules, and best practices for TypeScript and component development"
source: "https://community.rockrms.com/developer/obsidian"
sourceLabel: Obsidian
---
> **Path:** 

## Naming Conventions

- Type names should be in "PascalCase".
- Interfaces will be prefixed by a capital "I" (eye).
- Function names should be in "camelCase".
- Variable and property names should be in "camelCase".
	- Do not prefix private proeprties with underscore. Instead mark them as actually private in TypeScript.
- Filenames should be in "camelCase.ts".
- Directory names should be in "PascalCase".

## Components

- Props should be in a "default as false" state, with a few exceptions. Meaning, if you are adding functionality that would normally be hidden use a name like "showCoolFeature" with a default value of false. If you are adding functionality that would normally be shown use a name like "hideCoolFeature" with a default value of false.

## Formatting and Styling

*We know some of these styling/formatting options are different than C# styles. These are more inline with default/expected JavaScript and TypeScript formatting.*

- Use spaces instead of tabs.
- Use 4 spaces for indentation.
- Use double quotes or string literals instead of single quotes.
- Do not use additional white-space in things like function declarations, calls, or flow-control statements.
- Use named exports whenever possible.
- Avoid default exports unless it is unavoidable, such as with components.
- Use `@Obsidian/xyz` style references instead of relative references like `../../../xyz`.
	- Exception to this rule is if you are accessing a file in the same package or directory.
- Use JSDoc comments on every class, type, interface, function, property, etc.
	- Do not just restate the name, give information on how or why it is used.
- Use semicolons even if they are not strictly required.
	- There are a few places they cannot be used, such as after interface or enum declarations.
- Use strict comparison `===` and `!==` over vague comparisons `==` and `!=`.
- Prefer truthy checks over explicitly checking for both `null` and `undefined` when you can.

ESLint will enforce most of the rules for you so make sure to enable it in your development environment.

## Deprecation

To deprecate or obsolete something, use the \`@deprecated\` JSDoc tag. It should follow this pattern: `@deprecated since version 18.0. [optional text to describe alternative`.

```
/*
 * Some old functionality.
 *
 * @deprecated since version 18.0. Use the newFunctionality() function instead.
 */
function oldFunctionality(): void {
}
```

## Package and References

Just like C# has "using" statements to allow you to reference information in another namespace or assembly, TypeScript has an "import" statement that behaves in a similar way.

The primary difference is that in C# everything has a namespace. But TypeScript doesn't use namespaces in this way. Instead, the file system structure is what it uses to organize information.

Another difference is that TypeScript doesn't have assemblies. A similar concept is packages. Packages are referenced the same way as any other import statement in TypeScript, you just start your path reference with the package name.

For example, `import ... from "linqjs/list"` means you are referring to the "linqjs" package and want the "list" file inside of it.

Because Obsidian is such a large framework, we have divided it into multiple packages:

- @Obsidian/Controls
- @Obsidian/Core
- @Obsidian/Directives
- @Obsidian/Enums
- @Obsidian/FieldTypes
- @Obsidian/PageState
- @Obsidian/SystemGuids
- @Obsidian/Templates
- @Obsidian/Types
- @Obsidian/Utility
- @Obsidian/ValidationRules
- @Obsidian/ViewModels

Each package contains only objects that are related to that package. For example, there should be no field types declared in the @Obsidian/Controls package.

There is also a dependency structure associated with all these packages. Because cyclical dependencies are not allowed, you must be careful to put new objects in the correct package. Meaning, if Utility package references the Controls package, the Controls package cannot (even indirectly) reference the Utility package.

The dependency tree for these packages looks like this. The arrow points towards the dependency, meaning the arrowhead is attached to the package that is depended on by the tail.

![](https://community.rockrms.com/GetImage.ashx?Id=66794)

As a Block developer, you are safe to use any of those packages. If you are adding something to the core framework, you need to follow this dependency tree. So if you are adding a new Control, you can use something that is in the ValidationRules package. But not the other way around. Basically, you can use anything further up the tree from where you are currently.
