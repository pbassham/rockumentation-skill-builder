---
description: "Use when understanding the structure of analytics tables, facts vs. dimensions, or how to identify BI data tables for reporting in Rock"
source: "https://community.rockrms.com/documentation/bookcontent/35/353"
sourceLabel: Business Intelligence
---
> **Path:** Business Intelligence > Types of Analytics Tables

Types of Analytics Tables

If you’re used to a traditional transaction data model you may find the model for BI a bit confusing. Things like normalization fly out the window in exchange for raw speed. If you have no idea what we’re talking about, no problem; you’re actually at an advantage as you’re unencumbered by the rigid thinking of traditional systems.

There are two different types of analytics tables: Facts and Dimensions. What’s the difference?

# Facts & Dimensions

Facts are the things you’re going to report on, such as Attendance or Financial Transactions. Dimensions (often referred to simply as Dim) are characteristics of the Facts. For instance, Dimensions of Attendance would be the Location, Date or Person of an attendance record. Dimensions of a Financial Transaction would be the Batch, Transaction Type or Account.

Another way to think of this is Facts are what you’re measuring while Dimensions are what you’ll filter by.

The tables that you will be importing into your BI tool are all SQL Server Views and start with the prefix "Analytics". For example, the fact model for financial transaction would be (AnalyticsFactFinancialTransaction). The dimension model for the account would be (AnalyticsDimFinancialAccount), the transaction type would be (AnalyticsDimFinacialTransactionType), and the date would be (AnalyticsDimFinancialTransactionDate), to name a few.

When displaying these models as a diagram the fact model usually goes in the center with the dimension models around it. This arrangement creates what is known as a Star Topology. Diagrams for Rock’s financial and attendance models can be found below.

![BI ER](https://rockrms.blob.core.windows.net/documentation/Books/35/1.17.0/images/bi-er.gif)

Business Intelligence Entity Relationship

# SQL Server Tables & Analytics Source Tables

If you’re super observant you may have noticed some analytics SQL Server Tables, or Analytics Source Tables. Don’t worry about these. They contain some of the source data for the views above. They are not a complete representation of data and should not be used directly.

# Renaming Metrics Tables

Renaming a Metric will not update the metric's table/view name in the context of BI. For instance, `AnalyticsFactMyTableName` will not be updated to `AnalyticsFactMyNewTableName` if the name of the metric is changed in Rock.

