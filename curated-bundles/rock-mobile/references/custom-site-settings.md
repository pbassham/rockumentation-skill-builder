---
description: Use when configuring static or dynamic values in a Persisted Dataset for mobile app access without Site entities or attributes
source: "https://community.rockrms.com/developer/mobile-docs"
sourceLabel: Mobile Docs
---
> **Path:** 

### Overview

Ever wanted custom configuration values available to your mobile application that you can access and utilize in your XAML? A Persisted Dataset built from static, hand-authored JSON gives you exactly that — a cached, centralized place to define values like colors, labels, or feature flags, with no Site entity and no Site Attributes involved at all.

If the values you need aren't really "attributes of the site" so much as configuration values for your mobile experience, you don't need an entity or an attribute record to hold them — you can just declare them directly in the dataset. You still get everything that matters from the Rigging Pattern: one place to manage the values, and zero database lookups when a page reads them.

### Example Configuration

In the below example, we're configuring Start Gradient Color and End Gradient Color values to access in our mobile content.

#### 1\. Build a Persisted Dataset with static JSON

Create a Persisted Dataset (for example, with the key `MobileSiteRigging`) whose build script is just the literal JSON you want available — no entity command, no attribute lookup, nothing dynamic required:

```
{
    "site": {
        "StartGradientColor": "#1E90FF",
        "EndGradientColor": "#00BFFF"
    }
}
```

Because there's no entity being queried, this dataset doesn't need any Lava commands enabled at all — it's just static content, cached exactly as written. Set whatever refresh schedule you like; it mainly matters for how quickly an edit to the dataset itself takes effect.

Tip

This example uses static values for clarity, but the build script isn't limited to that — it can use Lava and entity commands to pull dynamic data from Rock at refresh time. Once the dataset is persisted, that output is just as static as hand-authored JSON, so consuming pages still get zero database hits either way.

#### 2\. Update values by editing the dataset directly

When you want to change a color (or add a new value), edit the Persisted Dataset's build script and save — there's no separate attribute-assignment step, no Mobile Application Detail block, and no entity to manage. The dataset is the source of truth.

#### 3\. Read the dataset in your Content block

Load the dataset and reference the values the same way you'd reference any other property:

```
{% assign rigging = 'MobileSiteRigging' | PersistedDataset %}
{% assign StartGradientColor = rigging.site.StartGradientColor %}
{% assign EndGradientColor = rigging.site.EndGradientColor %}
```

Here's an example of using the Lava variables to create a gradient background:

```
<Border>     
    <Border.Background>
        <LinearGradientBrush  StartPoint="0,0" EndPoint="1,1">
            <GradientStop Color="{{ StartGradientColor }}" Offset="0"/>
            <GradientStop Color="{{ EndGradientColor }}" Offset="0.53"/>
        </LinearGradientBrush>
    </Border.Background>
    
    <Label Text="Rock"
       TextColor="White"
       FontSize="18"
       FontAttributes="Bold" />
</Border>
```

Note

Because this dataset holds static JSON rather than entity data, there's no Rock Entity or Lava-on-server setting to enable anywhere in this flow — on the dataset or on the consuming page.

The result:

![](https://community.rockrms.com/GetImage.ashx?Guid=226c7b66-99af-4f1a-9d46-e5433a73e35d)

Values like the gradient colors in this example are just the beginning! A static-JSON dataset works well for any configuration that isn't naturally "an attribute of an entity" — feature flags, labels, thresholds, whatever your mobile experience needs. Once they're routed through a persisted dataset, you get the performance and single-source-of-truth benefits of the Rigging Pattern without having to create or maintain any entity attributes at all.

---

## Custom Page Attributes {#custom-page-attributes}

Mobile pages are Rock entities, which means you can hang your own attributes on them and read those values back in your XAML. That turns per-page details like a hero image, an accent color, or a headline into something an administrator changes from the page's settings rather than something a developer changes in code.

### Example Configuration

Navigate to System Settings \> Entity Attributes and add a new attribute against the **Page** entity type. Include the `SiteId` in the **Qualified Field** and set your mobile site Id in the **Qualifier Value** so that this attribute doesn't appear on unrelated pages.

In the example below, we are configuring a `Hero Image` attribute using the `Image` field type. The key is what we will reference in Lava, so keep it predictable.

![](https://community.rockrms.com/GetImage.ashx?Guid=dacf92f3-85d4-4a2d-b3f5-3fb6ab3dea5b)

Now open the mobile page you want to customize and edit its settings. Your new attribute appears alongside the built-in page settings, ready for someone to upload an image.

The Content block hands your XAML the page it is sitting on as `CurrentPage`, so you can read the attribute directly with the `Attribute` filter:

```
{% assign heroImageGuid = CurrentPage | Attribute:'HeroImage','RawValue' %}
```

The `RawValue` qualifier gives you the GUID of the uploaded file rather than rendered HTML. Pair it with `GetImage.ashx` and a fully qualified root so the app can resolve the image, then guard against a page that has no value set:

```
{% assign publicRoot = 'Global' | Attribute:'PublicApplicationRoot' %}
{% assign heroImageGuid = CurrentPage | Attribute:'HeroImage','RawValue' %}

{% if heroImageGuid != '' %}
    <Image Source="{{ publicRoot }}GetImage.ashx?Guid={{ heroImageGuid }}"
        Aspect="AspectFill"
        HeightRequest="220" />
{% endif %}
```

Important

Ensure that Process Lava on Server is enabled on the block. CurrentPage is only merged in when the Lava is resolved on the server, so with server-side processing turned off the reference will come back empty.

A hero image is just one example of many practical use cases. Because the value lives on the page instead of in the markup, the same XAML can be reused across pages and each one looks different. Swapping the artwork for a new series becomes an upload rather than a deployment, and the same pattern works just as well for headlines, accent colors, or any other per-page detail you would rather not hard-code.
