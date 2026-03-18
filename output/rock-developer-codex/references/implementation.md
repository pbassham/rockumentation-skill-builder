> **Path:** Developer Codex > Coding Standards > Service Layers > Implementation

# Implementation

Let's look at a simple block that displays Connection Types for the user to interact with. We're going to invert our layer model and look at the methods that will be in play:

-   Client Layer
    -   ShowPage()
-   Block Layer
    -   GetContent()
-   Client Service Layer
    -   GetConnectionTypes()
    -   GetConnectionTypeCounts()
-   Data Service Layer
    -   GetConnectionTypesQuery()
    -   GetViewAuthorizedConnectionTypes()

Each of the methods calls a method in either it's own layer or the layer below (remember we are inverted, so we are saying the client service layer calls methods in either the client service layer or the data service layer).

![](https://community.rockrms.com/GetImage.ashx?Id=66670)

As you can see, everything flows nicely from the client layer all the way down to the data service layer. In reality, this block came out slightly differently because of the need to use Lava to format the final output, but you get the idea.

We now have two methods in the data service layer that can be reused.

One to get an IQueryable of connection types. This method takes an Options parameter that specifies how the query should be constructed. Now the logic of how to construct that query is self contained. If we decide that an "inactive" connection type means something slightly different now, we only have one place we need to update.

The second method is special to connection types. We have some special logic applied to connection types to say when a person can view the connection type (related to if they are assigned as a connector to any request inside the connection type). Again, this method can be reused by other code to further filter a list of connection types.

In our client service layer, we have a helper method to get our connection types. This applies security filtering and would would return a view model ready to send down to the client (in reality, this method actually had to be omitted because of our custom lava formatting we applied in the block, but you get the idea).

Our second client service method gets all the request counts related to that connection type. Total requests, requests assigned to be, overdue requests, etc.

Finally, our block and client layers have simple methods that just call up the chain and do some minor tweaking to the data.
