---
description: "Use when writing SQL queries, migrations, or code examples that need to follow Rock's SQL formatting and style conventions"
source: "https://community.rockrms.com/developer/sql-style-guide"
sourceLabel: SQL Style Guide
---
> **Path:** SQL Style Guide

# SQL Style Guide

Whenever you need to write SQL for a migration, tool or for sharing in the community please use the following conventions.

Example
  SELECT
      g.\[Id\]
      , g.\[Name\] + ' Group' AS \[GroupName\]
      , g.\[Guid\]
      , gt.\[Name\]
  FROM
      \[Group\] g
      INNER JOIN \[GroupType\] gt ON gt.\[Id\] = g.\[GroupTypeId\]
  WHERE
      gt.\[Id\] = 12
  ;
  INSERT INTO \[Group\]
       (\[Name\], \[IsSystem\], \[Guid\])
  VALUES
      ('Ted Decker Group', 0, 'A55B9391-B673-4FBD-4691-63388F41533A')
  ;
  UPDATE
      \[Group\]
  SET
      \[Name\] = 'Ted Decker Group'
      , \[IsSystem\] = 0
  WHERE
      \[Id\] = 12
  ;

Note the following:

- All keywords are upper case
- All tables and fields are enclosed in brackets (whether they are needed or not)
- Joins should use the JOIN clause (WHERE clauses are for filters only)
- [https://poorsql.com/](https://poorsql.com/) can be used to help format the SQL

