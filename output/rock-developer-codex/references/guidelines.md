> **Path:** Developer Codex > Coding Standards > Service Layers > Guidelines

# Guidelines

There is a lot of existing code in Rock that does not follow the above layers. Our goal is not to go back and rewrite everything to use the new layer model. Instead, when new functionality is added these guidelines should be used.

You will notice below the use of the word "avoid" instead of forbidden. If you can't think of a way to adhere to the guidelines and still accomplish your goal then they can be bent or even broken. However, that should happen with the approval of the DSD to make sure that doesn't paint us into a corner later.

-   Avoid putting a lower layer's functionality into a higher layer.
    -   Example: Do not create a method in GroupTypeService that return a GroupTypeViewModel. View models should be handled by the client service.
-   Avoid putting a higher layer's functionality into a lower layer, attempt to split the functionality instead.
    -   Example: ConnectionTypeClientService.GetConnectionTypes() should not query the database directly. Instead, move the query logic into a reusable method that lives in the Data Service Layer. This allows others to retrieve the same data but format it differently.

Remember, the goal is to make our lives easier in the long run. There will be times when you are building a complex LINQ query that needs to both query the database, perform calculations and format results. Depending on the calculations it might not be performant to try and separate the logic into the data service layer and the client service layer. In such a case, just get the approval of the DSD to your solution.
