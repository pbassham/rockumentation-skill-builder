> **Path:** Developer Codex > Coding Standards > Writing Migrations

# Writing Migrations

There are three types of migrations:

1.  Standard EF Migration - These are required when a model change needs to occur since the code is tightly coupled to the database change. For this type, you must reserve the [*developer migration token*](https://community.rockrms.com/Developer/MigrationToken) to let other developers know you are about to make a model/db change.
2.  Migration Rollups (in Asana) or Data Migrations - Any data migration that does not have to be closely coordinated with a corresponding code/class change can be put into the [Migration Rollups](https://app.asana.com/0/22067109204476/list) project under a v.X.Y.Z section for the branch in question. (*We put them in Asana in order to reduce the size of the Rock.Migrations.dll since each EF migration causes it to grow larger.)*
3.  Hotfix Migrations (Rock/Plugin/HotFixes/\*) - These are very similar to the Migration Rollups type since they do not have to be closely coordinated with a corresponding code/class change, but they are going into a release of Rock that is *earlier* than where the EF code migration token is currently located. Like standard EF migrations, they are also ordered ([example: \[MigrationNumber( 145, ... )\]](https://github.com/SparkDevNetwork/Rock/blob/351c39fed9e914ace8c15351fae1394d364043f0/Rock/Plugin/HotFixes/145_UpdateWistiaVideosToVimeo.cs#L23)). Note: We often just put these migrations into the the [Migration Rollups](https://app.asana.com/0/22067109204476/list) project to avoid needing to coordinate the hotfix version number with other developers. In that case, they will be collected from Asana and put into a HotFix migration when the hotfix release is being packaged for the alpha testing phase.

Subpages describe each of these in further detail.
