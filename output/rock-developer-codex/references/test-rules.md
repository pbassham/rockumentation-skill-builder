> **Path:** Developer Codex > Coding Standards > Testing > Unit Testing > Test Rules

# Test Rules

Tests...

1.  …should have method names that say what the test is testing .(ex: NumericCodesShouldNotContain911And666). If it fails, it should immediately tell you what is not working.
2.  …must have at least one Assert.
3.  …must test only one thing. However, you can Assert multiple things about that test to prove it's true.
4.  …must not depend on the order that tests are run.
5.  …must not depend on data that may have been destroyed by another test.
6.  …must not destroy data that other tests are expecting.
7.  …should not be overly complex with many layers. (KISS principle)
8.  …shall not write to hard-coded folders. (C://foo/...)
9.  …should always be able to run in a CI/CD (AppVeyor) environment and without specific/manual setup. (Otherwise mark manual tests as \[Ignore\])

If you find an “illegal” test, decorate it with \[Ignore( "Rewrite; <reason>" )\] or fix it.
