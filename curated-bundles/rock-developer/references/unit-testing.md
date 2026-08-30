---
description: Use when writing or debugging unit tests for Rock plugins using mocked databases and the RockRMS.Rock.Tests.Shared testing framework
source: "https://community.rockrms.com/developer/303\u002D\u002D\u002Dblast-off"
sourceLabel: 303 — Blast Off
---
> **Path:** 

## Overview

As of Rock v20 you can write automated unit tests for your plugin code that run against a mocked database, with no SQL Server and no running Rock instance. Rock ships the same test scaffolding it uses internally as a NuGet package, `RockRMS.Rock.Tests.Shared`, which your test project references to mock a `RockContext` and the `RockApp` using the Moq library.

This lets you cover the things plugins most commonly implement - blocks, skills and tools, custom models, jobs, and the logic around them - the same way the Rock core team tests Rock itself.

Note

The mocked database is a lightweight in-memory stand-in, not a real Entity Framework or SQL layer. It is ideal for exercising your own logic; it is not a substitute for integration testing against a real database.

## Setting Up the Test Project

Create a unit test project the way you normally would, add a reference to your plugin project, and add the `RockRMS.Rock.Tests.Shared` package. It brings the mocking support (including Moq) with it.

```
<PackageReference Include="RockRMS.Rock.Tests.Shared" Version="20.0.0" />
```

Important

Match the `RockRMS.Rock.Tests.Shared` version to the Rock version your plugin targets. The mocking helpers live in the same assemblies as the Rock types they wrap, so a version mismatch leads to confusing build or runtime errors.

Note

The examples here use MSTest, but nothing in the mocking support depends on a particular test framework - NUnit, xUnit, or any other works equally well. Only the test attributes and assertions in the samples are MSTest-specific.

## Mocking the Database

The entry point is `TestHelper.CreateScopedRockAppWithMockDatabase()` in the `Rock.Tests.Shared.TestFramework` namespace. It builds a `RockApp` backed by a mocked `RockContext`, makes it the current app for the life of the scope, and on dispose restores the previous app and clears the cache.

Inside the scope, call `scope.App.CreateRockContext()` to get the mocked context, add entities to it with `Set<T>()`, and the code under test reads them back.

```
using System.Linq;

using Microsoft.VisualStudio.TestTools.UnitTesting;

using Rock.Configuration;
using Rock.Model;
using Rock.Tests.Shared.TestFramework;

namespace MyPlugin.Tests;

[TestClass]
[DoNotParallelize]
public class CampusTests
{
    [TestMethod]
    public void MockedContext_RoundTripsACampus()
    {
        using var scope = TestHelper.CreateScopedRockAppWithMockDatabase();

        var rockContext = scope.App.CreateRockContext();

        rockContext.Set<Campus>().Add( new Campus
        {
            Id = 1,
            Name = "Main Campus"
        } );

        var campuses = rockContext.Set<Campus>().ToList();

        Assert.AreEqual( 1, campuses.Count );
        Assert.AreEqual( "Main Campus", campuses[0].Name );
    }
}
```

Warning

`RockApp.Current` is a process-wide singleton, so tests that stand up a mocked app must not run in parallel with one another. Mark those test classes with `[DoNotParallelize]` (or the equivalent in your test framework) so they do not overwrite each other's current app.

## Creating Contexts in Plugin Code

The mock is only used when code obtains its context from the application. `scope.App.CreateRockContext()` and `RockApp.Current.CreateRockContext()` both return the mocked context during a test, while `new RockContext()` constructs a fresh, real context that ignores the mock entirely.

This applies to every code path a test exercises, not just cache lazy-loads: jobs, services, blocks, model logic - anything that opens its own context must create it through the application. If a code path under test calls `new RockContext()`, it will not see your seeded data and will try to reach a real database.

```
// Any plugin code exercised by a test should obtain its context this way
// rather than with \`new RockContext()\`, so the mocked context is used.
using var rockContext = RockApp.Current.CreateRockContext();

// ... use rockContext ...
```

Note

If a code path cannot create its context through the application, a mocked-database test cannot reach it. Cover that path with integration tests against a real database instead.

## Testing Cache-Backed Code

Most Rock read paths go through cache objects such as `ModelCache<T>`. The `All()` and `Get()` overloads that accept a `RockContext` read through the context you pass, so they hydrate from your seeded data. Cache classes that lazy-load without an explicit context follow the rule above - they must create it through the application.

```
using var scope = TestHelper.CreateScopedRockAppWithMockDatabase();

var rockContext = scope.App.CreateRockContext();

rockContext.Set<Campus>().Add( new Campus { Id = 1, Name = "Main Campus", IsActive = true } );
rockContext.Set<Campus>().Add( new Campus { Id = 2, Name = "Old Campus", IsActive = false } );

var activeCampuses = CampusCache.All( rockContext )
    .Where( c => c.IsActive == true )
    .ToList();

Assert.AreEqual( 1, activeCampuses.Count );
```

## Reaching Rock Internals with TestAccess

The general scaffolding - creating the app, mocking the database, and the assertion helpers - lives in `Rock.Tests.Shared.TestFramework`. Some of what you may want to assert against, though, is `internal` to Rock. Rock.Tests.Shared exposes a curated set of these through the `Rock.Tests.Shared.TestAccess` namespace.

`TestAccess` mirrors Rock's own namespaces, so the helpers for a given area live in the matching place - the helpers for `Rock.AI.Agent`, for example, are in `Rock.Tests.Shared.TestAccess.AI.Agent`. It is deliberately scoped to the extension points plugins commonly build on rather than being a blanket window into everything internal, and it grows over time as gaps are reported.

Agent skills and tools are one such area. When testing a skill you will find a `TestAgentRequestContext` to stand in for the chat request, an `InitializeForTesting` extension that primes a skill with configuration and that context the way the chat pipeline would, and extensions on `AgentToolResult` (`GetStatus`, `GetResults`, `GetContent`) to inspect what a tool returned - all without those internals being exposed to production plugin code.

## What the Mock Does and Doesn't Do

The mocked context is deliberately lightweight. Knowing its boundaries keeps your tests honest.

- `SaveChanges()` is a no-op that assigns identifiers to new entities and returns a count. It does not run the entity save pipeline, so pre- and post-save hooks, cache invalidation, and message-bus events do not fire.
- Reads through a `RockContext`, and cache objects that accept a context, work against your seeded data.
- Anything that needs the full Rock runtime - for example Lava that reaches global caches, or code that publishes to the message bus - may require extra setup or may not be a good fit for a mocked unit test.

Tip

Keep mocked-database tests focused on your own logic: filtering, formatting, validation, security checks, and configuration handling. Leave end-to-end behavior to integration tests against a real database.

---

## Appendix - Developer Environment, Upgrading Your Rockit SDK {#appendix---developer-environment-upgrading-yo}

## The Hard Way

It is possible to use the standard RockUpdate block to update your Rockit SDK, but you will need to jump through a few hoops because Visual Studio can lock files that will prevent the RockUpdate block from working correctly.

*Get Daniel’s notes and add them here.*

## The Other Hard Way

*Find the other person who described another way to do it...*
