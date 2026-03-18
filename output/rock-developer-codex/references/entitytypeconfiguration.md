> **Path:** Developer Codex > Coding Standards > Service Layers > Data Service Layer > EntityTypeConfiguration

# EntityTypeConfiguration

*Each model class has an EntityTypeConfiguration in the main class file. In a few special cases there are some things to point out.*

-   Cascade Null - Entity Framework has a WillCascadeOnDelete(bool), but it doesn't have ON DELETE SET NULL. So, in those cases where we really want it to NULL instead, we can accomplish this by editing the migration a little. See [https://github.com/SparkDevNetwork/Rock/commit/6953aa1986d46c9c84663ce818333425c0807c01#diff-c186f80fb19435fe5f3021730e98123b508f15928b1e05b17881a12f3c4848d9R35-R42](https://github.com/SparkDevNetwork/Rock/commit/6953aa1986d46c9c84663ce818333425c0807c01#diff-c186f80fb19435fe5f3021730e98123b508f15928b1e05b17881a12f3c4848d9R35-R42) for an example.
-   Global Filter on Queries. There are a couple of cases where we want all queries on a model to exclude some records. For example, a soft-delete indicator. We accomplish this by using [https://entityframework-plus.net/query-filter](https://entityframework-plus.net/query-filter). In our case we use it to exclude Group and GroupMembers that have IsArchived = true. In addition to the filter, we also override the GroupService.Queryable to exclude IsArchived. We do both to ensure that IsArchived Groups don't show up in results unless we explicitly ask for IsArchive records.
