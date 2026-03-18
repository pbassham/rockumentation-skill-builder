> **Path:** Developer Codex > Coding Standards > Testing > SQL Backup For Testing

# SQL Backup For Testing

Before using a SQL Database backup in a testing environment, the post deploy SQL script has to be applied. The script changes the e-mail addresses to invalid addresses to avoid sending out e-mails on testing.

The script is located at:

**./Dev Tools/Sql/Tool\_PostDeployTestDatabase.sql**

This is found in the Core Rock Repo.
