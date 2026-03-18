> **Path:** Mobile Docs > 📱 Building Your First App > Adding Content

# Adding Content

When saving a new app, or selecting an existing one from the list, you'll be taken to the **Application** page. The title bar will show the name of your app on the left and the Site/App Id on the right, as well as the deployment status. Underneath you'll find tabbed navigation for the different areas of your app and some of the configuration values you previously selected.

![](https://community.rockrms.com/GetImage.ashx?Id=66804)

To begin adding content to our app we need to navigate to the **Pages** area. The homepage has already been created for you. Selecting this page will bring you to the page details area where you can change the configuration and add blocks, similar to the process on Rock web.

Let's add our first block by selecting the Content block and dragging it into the **Main** section.

![](https://community.rockrms.com/GetImage.ashx?Id=66805)

![](https://community.rockrms.com/GetImage.ashx?Id=66806)

Once added click the Gear icon to change the block properties. In this Content block we'll add our first lines of XAML. Let's add a label and card to our page with the XAML below:

```
<StackLayout StyleClass="p-16"
    Spacing="16">
 
    <Label Text="News Feed"
        StyleClass="h4" />
    
    <Rock:ContainedCard Image="https://realchip.rocks/Content/Chip%20Rocks/Images/Chip%20Sticker@4x.png"
        Tagline="ANNOUNCEMENT"
        Title="Welcome to Rock Mobile"
        ImageRatio=".75:1">
        Check out just how easy it is to create a new mobile app for your organization...
    </Rock:ContainedCard>
    
</StackLayout>
```

First we started with a [StackLayout](https://docs.microsoft.com/en-us/xamarin/xamarin-forms/user-interface/layouts/stacklayout), which can display any number of child elements in a vertical orientation. Next we added a [Label](https://docs.microsoft.com/en-us/xamarin/xamarin-forms/user-interface/text/label) control with some text and a style class. Finally we added a [Contained Card](https://community.rockrms.com/developer/mobile-docs/essentials/controls/content-controls/cards/contained-card) with some various text properties.

Below the content input are some options for enabling Lava commands and selecting if block is Dynamic Content. If enabled, making changes to the XAML content will be shown upon refresh of the page instead of requiring a full redeploy.

Note

Page contents should be wrapped inside a [Xamarin Forms layout](https://docs.microsoft.com/en-us/xamarin/xamarin-forms/user-interface/controls/layouts) to allow for rendering of multiple child elements. It's generally recommended to use a `<StackLayout>`.  

Clicking Save will add our XAML to the block. Now let's deploy our application and view it on a device.
