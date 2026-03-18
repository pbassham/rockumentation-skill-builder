> **Path:** Developer Codex > Coding Standards > Writing Migrations > Normalize Carriage Return Line Feeds

# Normalize Carriage Return Line Feeds

Use the "[NormalizeColumnCRLF](https://github.com/sparkdevnetwork/rock/commit/0b0f318b54ecba56481683f1eefb1bae4d36bb23#diff-4d7a2aacfbdc3dc51cac0a6ae680745f)" helper method against a *column name* when writing data migrations that have multi line strings. Namely, if the strings are used in a WHERE clause or REPLACE function. It will deal with inconsistencies of CRLFs being changed to LFs when someone edits data.

Example usage:

```csharp
/// <summary>
/// Fixes the Group Administrator feature's Lava templates that were missed with the original migration
/// due to CRLF issues.
/// </summary>
public void FixGroupAdministratorLavaTemplate()
{
  string lavaTemplate = @"{% if Group.GroupCapacity != null and Group.GroupCapacity != '' %}
  <dt> Capacity </dt>
  <dd>{{ Group.GroupCapacity }}</dd>
  {% endif %}".Replace( "'", "''" );
  
  string newLavaTemplate = @"{% if Group.GroupCapacity != null and Group.GroupCapacity != '' %}
  <dt> Capacity </dt>
  <dd>{{ Group.GroupCapacity }}</dd>
  {% endif %}
  {% if Group.GroupType.ShowAdministrator and Group.GroupAdministratorPersonAlias != null and Group.GroupAdministratorPersonAlias != '' %}
  …
  {% endif %}".Replace( "'", "''" );
  
  // Use NormalizeColumnCRLF when attempting to do a WHERE clause or REPLACE using multi line strings!
  var targetColumn = RockMigrationHelper.NormalizeColumnCRLF( "GroupViewLavaTemplate" );

  Sql( $@"
  UPDATE [GroupType]
  SET [GroupViewLavaTemplate] = REPLACE( {targetColumn}
  ,'{lavaTemplate}'
  ,'{newLavaTemplate}' )
  WHERE {targetColumn} NOT LIKE '%{newLavaTemplate}%'"
  );
}
```
