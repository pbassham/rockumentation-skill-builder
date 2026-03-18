> **Path:** Mobile Docs > 🏭 App Factory > Image Resources

# Image Resources

When publishing a Rock Mobile app with App Factory, additional image resources can be provided and compiled into the shell that goes into the app stores. The advantage of this feature is that the images are not loaded over the network, improving performance in load time and avoiding pop-ins. This also means that the images are not processed on the server (or if using a CDN), so desired optimizations must be applied in advance.

There is no strict limit to how many resources can be added, however, each resource will increase the size of the app download, so be cautious with adding those that aren't needed for immediate load or used frequently in the app. Changes to these resources require communication with the App Factory team and new updates to the stores, so plan accordingly and keep them to a minimum to avoid additional resubmission fees.

## Usage

To reference an image added as an App Factory resource, use the following syntax:

```xaml
<Rock:Image Source="resource://Rock.Mobile.Resources.{{ FileName | Escape }}" />
```

Replace `{{ FileName }}` with the name and extension of the file you provided to the App Factory team. Don't forget to use the Escape filter or manually escape characters like `&`.

Note

Dashes - are replaced with underscores \_ in the file name when added to App Factory.
