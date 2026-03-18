> **Path:** Mobile Docs > 🎨 Styling > Style Guide > Migrating

# Migrating

Use this page as a resource when migrating your application to use the new colors and styles available in Core v16.7.

## Style Framework

To ease migration, there is now an additional setting in your mobile application labeled `Mobile Style Framework`. Any change to this setting requires a deploy to take effect.

![](https://community.rockrms.com/GetImage.ashx?Id=67095)

There are three values that can drastically impact the styling of your application.

### Default (.NET MAUI)

This should be the value any new application uses. This ensures that your mobile shell utilizes the latest and greatest styling components and enables full light and dark mode responsiveness. When the framework is set to this value, none of the old legacy colors will be utilized.

### Blended (XF + MAUI)

This is useful for an existing application when it comes time to migrate to the new style framework. This ensures all of the legacy block CSS and colors are included, and they take a higher priority over the new styles/colors. When you have it set to this, you may notice some parts of your application become dark mode responsive while others do not.

### Legacy

Maintain the same exact styling patterns as any mobile shell application before V6. This is the default for existing applications. You can view the legacy documentation [here](https://community.rockrms.com/developer/mobile-docs/styling/legacy).
