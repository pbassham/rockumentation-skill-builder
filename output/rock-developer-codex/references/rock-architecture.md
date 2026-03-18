> **Path:** Developer Codex > Coding Standards > Rock Architecture

# Rock Architecture

Below are a few architecture rules that you should keep in mind while using Rock.

1.  Lava is an important part of the Rock ecosystem. Our design pattern is that if you have access to write Lava, then, in many ways, you have the keys to the kingdom. In many cases the Lava author has access to data that is not accessible to the CurrentPerson (logged in individual). It’s up to them to determine how to handle that. We do provide many filters and means of knowing if the person should have access ‘HasRightsTo’, but these need to be optionally used. Having access to this data is important for personalization and tailoring the experience to the individual.
2.  Home Directory – While most people install Rock in the application home directory, we should never take it for granted that it will always be there. Some have installed it under a directory in the home ([http://myorg.com/rock/](http://myorg.com/rock/)). So always use MapPath (~/) or similar logic when making URLs. Lava has a similar filter ResolveRockUrl.
3.  Be mindful of where you wrap your new RockContext()’s with a using. Disposing the RockContext() used to fetch an entity will disable lazy-loading:

![](https://community.rockrms.com/GetImage.ashx?Id=66674)

4. When a block has an on RowDataBound situation, you can use a block private RockContext like this (but see rule 36):

![](https://community.rockrms.com/GetImage.ashx?Id=66675)

5. Dynamic Objects and Lava – You’ll often find the need to create custom objects to pass to Lava as merge objects. Instead of using POCOs you can use the RockDynamic `LavaDataObject` object. Below is a quick example of its usage.  

![](https://community.rockrms.com/GetImage.ashx?Id=66676)

6. Creating or using POCOs that you need to make available to lava

-   If you are creating plain C# class that you want to make available to Lava, have it inherit from Rock.Utility.RockDynamic Rock.Lava.LavaDataObject. Inheriting from there will make all of the declared properties available to Lava. This is an example:

![](https://community.rockrms.com/GetImage.ashx?Id=66677)

-   Use the suffix of "Info" as seen above when the object represents a special set or subset of properties related to an entity.
-   If you are trying to make an object available to Lava, but aren’t able to have it inherit from Rock.Lava.LavaDataObject, you can use Rock.Lava.LavaDataObject as a proxy. This is an example:

![](https://community.rockrms.com/GetImage.ashx?Id=66678)

![](https://community.rockrms.com/GetImage.ashx?Id=66679)

![](https://community.rockrms.com/GetImage.ashx?Id=66680)

7. When creating a new model that utilizes EntityId and EntityType and if the EntityType could be Person then the stored procedure dbo.spCrm\_PersonMerge needs to be updated to handle the new model. This stored procedure is used to merge Person records, and if it is not updated then the new model will have orphaned rows after a Person merge. In general the stored procedure will need to have logic to handle the new model. Usually the EntityId will have to be updated from the old Person.Id to the new Person.Id. A simple example is the Document Model. The EntityId is updated to the new Person.Id if DocumentType .EntityTypeId is the Person EntityType.

```sql
UPDATE [dbo].[Document]
SET [EntityId] = @NewId
WHERE [Id] IN (
     SELECT d.[Id]
     FROM [Document] d
     JOIN [DocumentType] dt ON dt.[Id] = d.[DocumentTypeId]
     WHERE dt.[EntityTypeId] = @PersonEntityTypeId
     AND d.[EntityId] = @OldId)
```
