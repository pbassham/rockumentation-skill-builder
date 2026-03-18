> **Path:** Developer Codex > Coding Standards > Rock Architecture > Locks: C# and/or SQL

# Locks: C# and/or SQL

If you run into a situation where you think you need a `lock()` in code, you must first consult with the DSD. In general, our philosophy is that locks should be very rare. It's really only necessary in cases where you cannot control the environment in which your code is being run (OS, filesystem, database, etc.). Read this [Thread Safety and Locks](https://triumph.slab.com/posts/thread-safety-and-locks-45sk2yi0).

Due to the increasing nature of clustered/web-farm Rock environments, we are looking into database level locking strategy. Once we have a convention for locking at the database level, we will put that information here. For now, most cases should involve relying on the unique constraints of the table' definitions to prevent accidental insertion of the same thing twice (for example, a system setting with the same key).
