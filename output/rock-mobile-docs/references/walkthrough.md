> **Path:** Mobile Docs > 🎨 Styling > Style Guide > Walkthrough

# Walkthrough

*Learn how to incorporate all of the built-in styling utilities to build responsive and stylistic views.*

## Getting Started

Rock Mobile provides a rich set of typography, color, and utility classes designed to make building responsive and visually consistent UIs easy. These classes can be used not only within the predefined blocks and components but also in your own custom XAML layouts.

Enough talk... let's dive in! In this walkthrough, we're going to build a "Person" card that automatically adapts to both light and dark modes, ensuring a seamless user experience regardless of the theme.

To start, let's create the base of our "Person" card. This card will display a person's name in a simple yet elegant design, leveraging the utility classes provided by the mobile shell. Here's the XAML code for our base card:

```
<Grid RowDefinitions="*"
      Rock:Zone.Expands="True">
    
    <VerticalStackLayout>
        <Rock:StyledBorder 
            StyleClass="p-16, bg-interface-softest, border, border-interface-soft, rounded">
            <StackLayout Spacing="4">
                <!-- Avatar and Name Section -->
                <Rock:Avatar />
                <Label Text="{{ CurrentPerson.FullName }}"
                       StyleClass="text-interface-strongest, title3, bold"
                       HorizontalOptions="Center" />
                
                <!-- Tags Section -->
                <HorizontalStackLayout HorizontalOptions="Center"
                                        Spacing="4">
                    <Rock:Tag Type="Info"
                              Text="{{ CurrentPerson.PrimaryCampus.Name }}" 
                              Size="Small" />
                    <Rock:Tag Type="Success"
                              Text="{{ CurrentPerson.RecordStatusValue.Value }}" 
                              Size="Small" />
                </HorizontalStackLayout>
            </StackLayout>
        </Rock:StyledBorder>
    </VerticalStackLayout>
</Grid>
```

Let’s take a closer look at what’s happening in this XAML code. There are two elements that utilize our custom utility classes.

1. `<Rock:StyledBorder>`: This is a custom border element that provides styling options through the `StyleClass` property. We provide the following styles:  

-   `p-16`: Adds padding of 16 units inside the border, giving the content some breathing room.
-   `bg-interface-softest`: Sets the background color to the softest level of the interface color palette, ensuring high contrast and readability.
-   `border`: Applies a 1px border around the element.
-   `border-interface-soft`: Sets the border color to a soft tone from the interface color palette, providing a subtle yet distinct outline.
-   `rounded`: Applies an 8px border radius to the frame.

2.`<Rock:Avatar>`: Displays an avatar for the current person.  

3.`<Label>`: Displays the person’s name. The `Label` is styled to stand out prominently on the card.  

-   `StyleClass="text-interface-strongest, title3, bold"`:
    -   `text-interface-strongest`: Ensures the text color is the strongest, providing excellent readability.
    -   `title3`: Applies a title-like font size, making the name visually prominent.
    -   `bold`: Further emphasizes the text by making it bold.

4.`<Rock:Tag>`: Displays the person's campus and record status. Under the hood, these tags use our interface colors dependent on the `Type`.  

Applying these styles results in a theme-responsive card.

![](https://community.rockrms.com/GetImage.ashx?Id=67081)

![](https://community.rockrms.com/GetImage.ashx?Id=67082)

In this walkthrough, we've explored how to leverage Rock Mobile's powerful built-in styling utilities to create responsive and visually appealing user interfaces. By using these utilities, you can ensure that your designs are both consistent and adaptable, providing a seamless user experience across different themes, including light and dark modes.
