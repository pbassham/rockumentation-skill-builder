> **Path:** Developer Codex > Coding Standards > Testing > Unit Testing > Docker Desktop

# Docker Desktop

We use Docker Desktop to provide a clean database for each suite of integration tests. This makes sure the database is 1) in a known clean state and 2) does not require any specific steps to prepare the database for tests.

To run the integration tests you just need to make sure Docker Desktop is installed and running. Everything else will be automatic. The first time you run the tests for that specific version of Rock it will take quite some time to initialize the database and migrations. Once that is done subsequent test runs will be much faster (though still relatively slow since it takes a few seconds for the database to spin up/down).
