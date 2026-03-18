> **Path:** Mobile Docs > 🧱 Essentials > Controls > Content Controls > Geo Boundary View

# Geo Boundary View

Display content based on whether or not a person is within a geofence.

M v5.0

*Inherits from* [*Xamarin.Forms.ContentView*](https://docs.microsoft.com/en-us/dotnet/api/xamarin.forms.contentview)

## Creating Fences

Don't let the words mislead you - creating a geofence isn't hard! All a geofence really is comprised of is a list of points (latitude and longitude) that connect at different areas.

### Using Points and PointRadius

You can provide any number of singular points with a `PointRadius` to create perfect circle geo-fences around that point.

For example, take the point `(31.7058, 35.2007)` (the latitude/longitude of Bethlehem) and supply it with a 2-kilometer `PointRadius`.

```
<Rock:GeoBoundaryView x:Name="GeoBoundary"
    Points="31.7058,35.2007"
    PointRadius="2">
    <Rock:GeoBoundaryView.InBoundary>
        <Label Text="You're really in Bethlehem? Cool!" />
    </Rock:GeoBoundaryView.InBoundary>
    <Rock:GeoBoundaryView.OutOfBoundary>
        <StackLayout Spacing="0">
            <Label Text="The closest Geographical Boundary is:" />
            <Label Text="{Binding ClosestGeoFence, Source={x:Reference GeoBoundary}}" />
        </StackLayout>
    </Rock:GeoBoundaryView.OutOfBoundary>
</Rock:GeoBoundaryView>
```

Results in a 2km radius circle around Bethlehem:

![](https://community.rockrms.com/GetImage.ashx?Id=67043)

You can provide multiple points ([syntax](https://mobiledocs.rockrms.com/essentials/controls/content-controls/geo-boundary-view#point-syntax)) to create multiple geo-fences.

### Properties

| Property | Type | Description |
| --- | --- | --- |
| Points | string | Represents the coordinates or reference points within the geofence. |
| Fences | string | Defines the polygons or boundaries for geofencing. |
| PointRadius | int | If provided with a singular point, this amount of distance (in kilometers) will be applied to the point to create a geofence. |
| DisableLocationPermissionRequest | bool | Should you prefer not to have this request potentially seek permissions, you can deactivate the permission prompt. (defaults to false). |
| InBoundary | View | Content to display when the location is within the specified boundaries. |
| OutOfBoundary | View | Content to display when the location is outside the specified boundaries. |
| PermissionNotRequested | View | Content to display when the location permission has not been requested. Only shown if AlwaysRequestLocation is false. |
| NoPermission | View | Content to display when the location permission is not granted. |
| Error | View | Content to display in case of any error related to geofencing or location permissions. |
| GeolocationCheckInterval | int | The amount of time (in milliseconds) to wait in between re-checking the person's geolocation to see if they're within a fence. Defaults to 15000 (15 seconds). |
| ClosestGeoFence | string | The key of the closest geofence. |
| ClosestGeoFenceDistance | double | The distance(km) to the closest geo fence. Will be negative if you're inside of it. |

### Point Syntax

Latitude and longitude should be comma delimited, while points are pipe `|` delimited. For example:

`31.7,35.2|33,36`

This would result in two separate points. The first point is the latitude and the second point is the longitude.

When you're supplying the [Points](https://community.rockrms.com/developer/mobile-docs/essentials/controls/content-controls/geo-boundary-view#properties) property, you can specify a key for each point that you want to recognize. That key of the closest geofence is stored in the [ClosestGeoFence](https://community.rockrms.com/developer/mobile-docs/essentials/controls/content-controls/geo-boundary-view#properties) property.

To supply a key, simply prepend the point with `Key=`.

`FirstPoint=31.7,35.2|SecondPoint=33,36`

### Fence Syntax

Fences are comprised of points, and delimited by a caret `^`. For example, here is a singular geofence around the Cardinals stadium:

`33.5281,-112.2645|33.5281,-112.2630|33.5270,-112.2630|33.5270,-112.2645`

And now let's add one around the Phoenix Suns court:

`33.5281,-112.2645|33.5281,-112.2630|33.5270,-112.2630|33.5270,-112.2645^ 33.4460,-112.0712|33.4460,-112.0697|33.4449,-112.0697|33.4449,-112.0712`

When you're supplying the [Fences](https://community.rockrms.com/developer/mobile-docs/essentials/controls/content-controls/geo-boundary-view#properties) property, you can specify a key for each point that you want to recognize. That key of the closest geofence is stored in the [ClosestGeoFence](https://community.rockrms.com/developer/mobile-docs/essentials/controls/content-controls/geo-boundary-view#properties) property.

To supply a key, simply prepend the point with `Key=`.

`Cardinals=``33.5281,-112.2645|33.5281,-112.2630|33.5270,-112.2630|33.5270,-112.2645^``Suns=``33.4460,-112.0712|33.4460,-112.0697|33.4449,-112.0697|33.4449,-112.0712`
