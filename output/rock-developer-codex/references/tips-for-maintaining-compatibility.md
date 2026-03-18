> **Path:** Developer Codex > Coding Standards > Maintaining Compatibility > Tips for Maintaining Compatibility

# Tips for Maintaining Compatibility

Be mindful of which classes, properties, methods, etc. that you declare as `public` or `protected`. There are a lot of things that need to be public (RockWeb needs it, another dll needs it, or a plugin developer would need it), but in many cases `internal` or `private` is the better choice and will avoid breaking changes.

Also be aware that code elements marked as `internal` are still available to be referenced in unit tests or integration tests, because the test projects are given access to the internals of other Rock assemblies using the `InternalsVisibleToAttribute`.
