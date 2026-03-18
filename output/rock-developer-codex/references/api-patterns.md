> **Path:** Developer Codex > Coding Standards > API Patterns

# API Patterns

Starting in Rock v17 a new "v2" API pattern has been introduced. The information on this page only applies to these v2 API endpoints.

The new API endpoints are designed to be secure by default. This means that default security is to not allow anyone access to execute the APIs until they have been granted explicit authorization.

This means if you add a new endpoint that is `[Secured]` so that only certain people can use it, you must write a migration to set the default security if applicable. In other words, if out-of-the-box Staff Workers need access to this API for Rock to function correctly, then you need to add that permission in a migration.

If the new endpoint is not needed by Rock but simply provides new features for 3rd parties to use then you can leave it with the default security (deny all) and require the Rock administrator to configure it.

API endpoints no longer use "View" and "Edit" security actions. In the future these might return to indicate who has access to view or edit settings on the endpoints in the UI. But actually calling the API endpoint now uses different security actions, which are defined in Rock.Security.Authorization:

-   EXECUTE\_READ
-   EXECUTE\_WRITE
-   EXECUTE\_UNRESTRICTED\_READ
-   EXECUTE\_UNRESTRICTED\_WRITE

The READ and WRITE variants should be used depending on if your endpoint reads or writes data as the primary purpose. The UNRESTRICTED variants mean "do not check per-entity security while processing". The EXECUTE\_READ and EXECUTE\_WRITE actions implicitly mean that per-entity security should be checked. In the context of a "get group by id" endpoint, EXECUTE\_READ would mean they can call the API but the security on the group will also be checked. On the flip side, EXECUTE\_UNRESTRICTED\_READ means they can call the API and no additional security check on the group will be performed.

Only include the security actions that make sense and are actually used by your endpoint. This can be done with the `ExcludeSecurityAction` attribute. Placing this on the endpoint (or controller) will remove those security actions from the UI when editing security. In other words, our "get group by id" endpoint should exclude EXECUTE\_WRITE and EXECUTE\_UNRESTRICTED\_WRITE because it only reads data, it doesn't write data so those actions wouldn't be used.

If the endpoint inherently requires unrestricted access, such as endpoints for Campus which does not have security itself, then the EXECUTE\_READ and EXECUTE\_WRITE actions should be excluded. Again, they don't make sense so don't include them in the UI.

The goal is to make the UI as simple and obvious for the Administrator to understand as possible. We don't want them having to go look at source code to see what security action they need to use.

If you need to add a new security action this can also be done with a C# attribute called `SecurityAction`. This lets you specify the action and a description to be included. Don't do this without approval from DSD or above.

## Code Generation

The code generator will automatically generate the required files, however most of the logic for these CRUDS endpoints is handled by the `CrudEndpointHelper` class. Which means the generated code is extremely lean.

Every model must be decorated with the `CodeGenerateRest` attribute to tell the code generator what to do. If it is missing then a warning will be displayed when generating code. If no parameters are given then all CRUDS endpoints are created. However, you can specify which endpoints to create.

```csharp
[CodeGenerateRest]
[CodeGenerateRest( CodeGenerateRestEndpoint.ReadOnly )]
[CodeGenerateRest( CodeGenerateRestEndpoint.CreateItem )]
[CodeGenerateRest( DisableEntitySecurity = true )]
```

The first line will generate all API endpoints and include per-entity security checks (these will be bypassed if UNRESTRICTED access is granted). The second line generates only the read-only API endpoints, such as Get and Search. The third line will create *only* the CreateItem endpoint. These enums are flags which means you can use the `|` operator to make multiple selections. You can also pass something like `~CodeGenerateRestEndpoint.CreateItem` to create all endpoints except the CreateItem endpoint. The `~` character means "all values except...".

The fourth line will generate all API endpoints but disable per-entity security checks. This will also cause the EXECUTE\_READ and EXECUTE\_WRITE security actions to be excluded.

The ability to exclude single endpoints is helpful when some custom step needs to be performed. For example, when creating a Widget suppose we need to validate that the Key property is valid - but only when creating via API. In this case you exclude the CreateItem endpoint and implement it manually, perform the additional check and then call the standard CrudEndpointHelper method to do the actual work.

Warning

Each REST endpoint has a unique identifier. This is calculated in a deterministic way, so re-running the code generator will generate the same identifier for each endpoint. However, this means if you exclude an API endpoint to manually implement it and then later decide the standard implementation is fine, the identifier would change and cause problems in Rock.  
  
Therefore, if you are going to exclude an API endpoint so you can manually implement it, then generate it first. Then you can copy the code out into your own partial file and re-generate with it excluded. This will make sure you have the correct identifier as well as the correct security and other C# attributes defined.

## Naming

The C# namespaces and API paths are used for the new v2 APIs:

-   Rock.Rest.v2.Models \[/api/v2/models/\] - This is where CRUDS controllers (both code generated and your custom partials) go.
-   Rock.Rest.v2.Models.Actions \[/api/v2/models//actions\] - This is where non-CRUDS endpoints related to a model will go. For example, if we wanted and endpoint to retrieve the groups the authenticated person is a leader of, it would go in here.
-   Rock.Rest.v2 \[/api/v2\] - This will contain non-model related API endpoints.

In all cases, please keep cleanliness in mind. If you need to create a new endpoint or controller, spend extra time thinking through both the location and naming. Come up with a plan that makes sense and then ask another developer if it makes sense to them. In 5 years we want to look back over our v2 API and say "we did a good job" and not "wow, what a mess".

## API Documentation

We use OpenAPI and Swagger-UI to generate a nice API documentation hosted by Rock. This documentation is generated at runtime using a mix of reflection and XML documentation comments.

-   Each controller must have a `RoutePrefix` attribute that describes the base path of all actions in the class, for example `api/v2/models/dataviews` would be the prefix of the CRUDS controller for DataViews.
-   Each endpoint should one or more `ProducesResponseType` attributes to describe the data returned by the endpoint.
-   The `summary` documentation should be a single sentence. You can provide additional details in the `remarks` documentation of the class or method.
-   Include an `HttpVERB` attribute even if it is the default of GET (i.e. `HttpGet`, `HttpPost` etc.).

![Sample Method Documentation](https://community.rockrms.com/GetImage.ashx?Id=66712)

Above is an example of an endpoint with all the documentation and attributes. The order of the attributes should be preserved for consistency. It should read the same way the server would process the request:

1.  What HTTP method is this? GET, POST, etc.
2.  What route gets us to this method?
3.  Authenticate the user so we have a CurrentPerson so that we can...
4.  ... secure the endpoint with EXECUTE\_READ permissions.
5.  We don't need EXECUTE\_WRITE or EXECUTE\_UNRESTRICTED\_WRITE so exclude those.
6.  When the endpoint completes, it produces...

Now below is a sample of what this well-defined API should look like in the API documentation. The summary is displayed in the header and the remarks are below that after the panel is expanded. Then comes the parameters, along with descriptive details about what the parameter is for. In other words, don't just say "The workflow type id". Below that comes all the responses that can be generated.

![Sample API Documentation](https://community.rockrms.com/GetImage.ashx?Id=66710)

## Future Compatibility

`System.Web` **is our enemy** and these new v2 API endpoints need to be compatible with the future .NET Core version of Rock. If you need to create a new controller class file, make sure you include the standard `#if WEBFORMS` block from an existing file. These are designed to allow the actual code to be the same between .NET Framework and .NET Core.

![](https://community.rockrms.com/GetImage.ashx?Id=66711)

Once the above is in place, you can simply have your methods return `IActionResult` and when compiled on .NET Core they will switch to using the new return types. There are others you might need beyond what is listed above, the best place to look is one of the code generated files as they are usually the most complete list.
