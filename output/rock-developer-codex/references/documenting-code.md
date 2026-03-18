> **Path:** Developer Codex > Coding Standards > Documenting Code

# Documenting Code

Documentation in code should explain the why more than anything else.

## Engineering Notes

An engineering note is meant to provide extra context for why something exists. Often this is because of a change that was made to existing code or when the reason for the code is not clear without it.

Engineering notes should be placed in the code. Below is a sample of a good engineering note.

Copy

```csharp
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

```csharp
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

**NOTE**: This does not remove the need to properly fill out the <summary> tag of the documentation.
