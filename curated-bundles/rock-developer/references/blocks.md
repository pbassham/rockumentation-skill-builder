---
description: "Use when customizing Rock block configuration UI, security settings, inter-block data sharing, or implementing entity-level permissions in grids"
source: "https://community.rockrms.com/developer/303\u002D\u002D\u002Dblast-off"
sourceLabel: 303 — Blast Off
---
> **Path:** 

At this point what more could you need to know about Rock Blocks? Just a few more things...

### Customizing the Configuration Slide-Out Bar

If your custom block needs to override the standard "Edit" action seen in the slide-out bar, it's pretty easy to do.

![](https://community.rockrms.com/GetImage.ashx?Id=66719)

1.  Override the `SettingsToolTip` property:  

```
public override string SettingsToolTip
{
    get
    {
        return "Edit Criteria"; // call it what ever you want
    }
}
```

2\. Override the `ShowSettings()` method:

```
protected override void ShowSettings()
{
    // Do whatever you need to do in here.
}
```

#### More Power

If you need total control over the entire bar, you can override the `GetAdministrateControls()` base method. Then you can do anything, but realize your block is responsible for adding in the base controls

```
public override List<Control> GetAdministrateControls( bool canConfig, bool canEdit )
{
    List<Control> configControls = new List<Control>();

    // You can do what ever you want...
    if ( canEdit )
    {
        // TBD
    }

    // ...but don't forget to add the basic controls (Block Properties, 
    // Block Security, Move Block, Delete Block) as needed:
    configControls.AddRange( base.GetAdministrateControls( canConfig, canEdit ) );

    return configControls;
}
```

## Entity Item Security

When your block is managing a list of entities and you want to allow applying security permissions to each individual item, you can use the `Rock:SecurityField` column in your grid:

```
<Rock:Grid ID="gMyEntityList" runat="server" ...>
   <Columns>
       // ...
       <Rock:SecurityField TitleField="Name" />
```

This will put a security (lock button on your grid):

![](https://community.rockrms.com/GetImage.ashx?Id=66720)

But you'll still need to wire up the field's `EntityTypeId` with something like this in your `OnInit()` method. In this case, we're tying it to `DefinedType` entities:

```
var securityField = gMyEntityList.ColumnsOfType<SecurityField>().FirstOrDefault();
securityField.EntityTypeId = EntityTypeCache.Get( typeof( DefinedType ) ).Id;
```

## Security - Regarding External Facing Blocks

When creating a block that is definitely going to be added to the public, externally facing website, you should write as defensively as possible. You should never trust the data you’ve received and should scrub it (when appropriate) for any XML/injection attacks. Expect hidden ids to be tampered with and other kinds of mishap to occur. The internet is a dangerous place.

Also see the section on Rock Security.

## Magic tokens - (person impersonation)

Note

This section is still TBD... PersonActionIdentifier, PersonTokenCreate (rckipid), etc.

## Sharing Objects Between Blocks

There are times when you know it would be ideal to share an entity between various blocks on the page. Sharing avoids the overhead involved with fetching that entity from the database multiple times (once for each block that needs that entity). In this case, you can first look for the item in the shared place before fetching it for your own use. If it was not in the shared place, it would be good to save it using the corresponding SaveSharedItem() method:

- GetSharedItem( string key )
- SaveSharedItem( string key )

When creating a key, it should identify the Entity Type and the entity’s Id similar to this example:

```
string key = string.Format( "EventItem:{0}", eventItemId );
    EventItem eventItem = RockPage.GetSharedItem( key ) as EventItem;

    if ( eventItem == null )
    {
        rockContext = rockContext ?? new RockContext();
        eventItem = new EventItemService( rockContext ).Queryable()
                    .Where( e => e.Id == eventItemId )
                    .FirstOrDefault();
        RockPage.SaveSharedItem( key, eventItem );
    }
```

## Lava Markup and Text/Reporting Templating

See [About Lava Fluid](https://community.rockrms.com/lava/fluid) and the [Upgrading Custom Lava Components for v13](https://community.rockrms.com/page/2305) which gives many details about developing with Lava.

## Implementing ISecondaryBlock

If you have a block that sits on a page that has another block which is editable, and you want your block to vanish automatically when the primary block is being edited, you can just implement this interface.

It's really simple:

1. Extend
2. And implement the

If your block is wrapped in a content panel, you can just use the `visible` boolean that is passed to quickly set your panel invisible:

```
public partial class YourCustomBlock : RockBlock, ISecondaryBlock
{
    ...
    
    #region ISecondaryBlock
    
    /// <summary>
    /// Sets the visible.
    /// </summary>
    /// <param name="visible">if set to <c>true</c> [visible].</param>
    public void SetVisible( bool visible )
    {
        pnlContent.Visible = visible;
    }
    
    #endregion
```

## Cookies, Adding or Updating

There are a few things to be careful about when creating and updating cookies, especially with the new Chromium rules about accepting cookies. These include updating cookie values on the client, and ensuring the correct SameSite setting is applied.

To guarantee a successful update to a client’s cookie the cookie must be removed from the Request and a new one written to the response. The Response cookie should not be the one from the Request for reasons explained below.

Every cookie should obey the SameSite global setting by writing it to HttpCookie.Path. However, if the cookie was created from the Request cookie it is likely that it will include the SameSite property with the default value “None”. HttpCookie.SameSite does not exist in .Net 4.5.2, however at runtime that property can exist if it was sent in the Request cookie. That creates a unique situation where a property will exist at runtime but not at compile time for that instance. Unfortunately, if that cookie is updated and sent back in the Response, then .Net will write the default SameSite setting to the path. What does this mean? You, the developer, correctly set the SameSite value from the global attributes and append it to the path. Then .Net will add the default value of the SameSite property to your formally perfectly crafted cookie when it is sent to the client. The result is two SameSite settings are applied and sent to the client. It looks something like this:

`Set-Cookie: mySettings=value; path=/;SameSite=Lax; SameSite=None`

Chrome doesn’t like that and won’t use it. Other browsers are more tolerant, but we can do better.

Meeting these requirements every time you need to create or update a cookie is a pain. Lemon juice in a paper cut level of pain (or salt if you’re allergic to citrus). Luckily Rock takes care of all of these requirements for you with the static AddOrUpdateCookie methods.

`Rock.Web.UI.RockPage.AddOrUpdateCookie( string name, string value, DateTime? expirationDate )`

`Rock.Web.UI.RockPage.AddOrUpdateCookie( HttpCookie cookie )`

The “name, value, expirationDate” overload creates a cookie using the arguments and then calls the “HttpCookie” overload which does the following:

1. Apply the SameSite setting to the path if it does not already exist
2. Create a Response cookie that is a deep copy of the cookie sent in the argument with only parameters available to .Net 4.5.2
3. Remove the cookie from the Request and the Response by name
4. Add the Response cookie to the Response

And presto, with one line of code you have a cross-browser compliant cookie, with a single correct SameSite setting, that creates or updates the cookie on the client successfully.

### Rock Standard Cookies

Starting with Rock v14, these will be the official cookies in Rock core:

- `.ROCK` (30 days) - Rock’s authorization cookie used to determine the currently logged in person. Expiration is set in the web.config and is defaulted to 30 days.
- `.ROCK_VISITOR_KEY` (x days) - The person alias key for the visitor. This will only have a value when 1.) the person is not logged in 2.) The site is configured to track anonymous individuals
- `.ROCK_VISITOR_CREATED_DATETIME` (x days) - Determines when the visitor was first seen.
- `.ROCK_VISITOR_LASTSEEN` (x days) - Tracks the last page load of the visitor. This is used to determine how long since they were last here. Also used to determine if we should check that the person alias record is in the database.
- `.ROCK_FIRSTTIME_VISITOR `(session) - Flags the individual as being the first time to the site.
- `.ROCK_SESSION_START_DATETIME` (session) - Determines when the session was started. We need this to know if the initial processing for the session has occurred.
- `.ROCK_SEGMENT_FILTERS` (session) - Stores a listing of the individuals (anonymous or known) segments. This will only be stored for the length of the browser’s session. Note we do this for segment filters and not request filters as the segments require a database read and the request filters actually look for things in the query string which will change from page to page.

## Performance Considerations

Note

This section is TBD

## Custom Grid Options Feature

When your block uses a Rock Grid and does not bind directly to a model/entity, but instead has implemented a small view-model-like helper class, remember to have it extend `: RockDynamic` in order to expose the class properties to the Lava of the custom grid options feature (as seen in the BatchList block):

`public class BatchRow : RockDynamic`

## Launching Workflows

There are several ways to launch workflows programmatically, but as usual, there’s usually a “best” way to do it based on the situation.

---

## Exception Handling {#exception-handling}

If there is a situation where you need to catch an exception in order to gracefully cleanup or perform some additional task but you still want the underlying exception to be logged, you can use the `LogException( Exception exception )` method that is on the base RockBlock:

```
// Your code...
try
{
    // ...is doing something important for the Kindgom...
}
catch ( Exception ex )
{
    // ...but something went wrong that needs to be logged.
    LogException( ex );
    
    // Now you can try to gracefully continue if possible
}
```

Just keep in mind that catching and logging exceptions is not free. There is always a small performance penalty when handling exceptions unnecessarily. So use your best judgement when this is needed. If the exception is not actionable, you might consider not logging it.

## Just Logging

If you don't have an exception but just need to log something, you can use Rock's [Logging Engine](https://community.rockrms.com/developer/303---blast-off/rock-logging-engine).
