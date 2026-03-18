> **Path:** Developer Codex > Coding Standards > Tips, Tricks, and Recommendations > SQL Database Recommended Settings

# SQL Database Recommended Settings

Please configure your local SQL databases to prevent using read-committed snapshots. Using snapshots in Rock while changing data can cause timeouts or errors when updating key constrained values. A programmer could find this issue when using a second `RockContext` in Rock while an existing `RockContext` is completing a (wrapped) transaction.

***In order to complete this, all connections to \[YOUR\_DB\_NAME\] need to be closed.***

Run the query `ALTER DATABASE [YOUR_DB_NAME] SET READ_COMMITTED_SNAPSHOT OFF`

or you can use *SQL Server Management Studio* to update your settings:

![](https://community.rockrms.com/GetImage.ashx?Id=66707)

Setting Read Committed Snapshot On to FALSE in SSMS

For further technical reading, [https://sqlperformance.com/2014/05/t-sql-queries/read-committed-snapshot-isolation](https://sqlperformance.com/2014/05/t-sql-queries/read-committed-snapshot-isolation).
