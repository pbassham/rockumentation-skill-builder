> **Path:** Mobile Docs > 🧱 Essentials > Controls > Content Controls > Context Menu

# Context Menu

Display a native context menu that can be attached to nearly any control.

A popular pattern in mobile development is attaching a native menu to a control that opens with a tap or long press. With Rock Mobile, this is not only easy to implement but also highly customizable!

Note

Due to limitations on Android, these are *more* fleshed out on iOS. We didn't want to take the native iOS features away, so some properties may not translate to Android.  

## Getting Started

To get started, we've introduced three controls:

[Menu](https://community.rockrms.com/developer/mobile-docs/essentials/controls/content-controls/context-menu#menu) \- The top-level menu, can be nested for submenus.

[MenuAction](https://community.rockrms.com/developer/mobile-docs/essentials/controls/content-controls/context-menu#menu-action) - An action that can be taken from the menu (think of this as a Menu item).

[MenuGroup](https://community.rockrms.com/developer/mobile-docs/essentials/controls/content-controls/context-menu#menugroup) \- A group of `Action`s or `Menu`s. These cannot be nested.

### Menu

| Name | Type | Description |
| --- | --- | --- |
| Title | string | A string title to be displayed at the top of the menu. iOS ✅ Android ❌ |

### Menu Action

| Name | Type | Description |
| --- | --- | --- |
| Title | string | The title of the action. |
| Command | ICommand | The command to execute when the action is selected. |
| CommandParameter | object | The parameter to pass along to the command. |
| Icon | ImageSource | An image icon to display with the menu action. |
| SystemIcon | string | The system icon to display with the menu icon. See the System Icons section for more info. iOS ✅ Android ❌ |
| IsEnabled | bool | Enables or disabled the menu action. |
| IsVisible | bool | Whether or not the action should currently display. |
| IsDestructive | bool | Whether or not this is a destructive menu item. |

### MenuGroup

| Name | Type | Description |
| --- | --- | --- |
| Title | string | The title of the group. |

## System Icons

These are only really supported on iOS. These are in the form of [SF Symbols](https://hotpot.ai/blog/sf-symbols-online), and you should be careful to ensure this only gets set on the iOS platform. You can see examples of this below.

## Examples

### Default

Opens a Context Menu when the Border is held down.

```
<Border HeightRequest="100" 
    BackgroundColor="White"
    Padding="16">
    
    <Label Text="Example Group Item" 
        StyleClass="title2, text-interface-stronger" 
        VerticalOptions="Center" />
           
    <Rock:ContextMenu.Menu>
        <DataTemplate>
            <Rock:Menu>
                <Rock:MenuGroup Title="Group Actions">
                    <Rock:MenuAction Title="Take attendance" 
                        Command="{Binding PushPage}"   
                        CommandParameter="d7a2700b-8c24-4ff2-908e-6f9ddcced79f" />
                    <Rock:MenuAction Title="View details" 
                        Command="{Binding ShowToast}"
                        CommandParameter="Group details" />
                    <Rock:MenuAction Title="Delete" 
                        IsDestructive="true"
                        SystemIcon="{OnPlatform iOS=xmark}" />
                </Rock:MenuGroup>
            </Rock:Menu>
        </DataTemplate>
    </Rock:ContextMenu.Menu>
</Border>
```

![](https://community.rockrms.com/GetImage.ashx?Id=67027)

### Show Menu on Click

In certain cases, you may want the Context Menu to open instantly without a long-press. For this to work properly, the Menu must be attached to a Button.

```
<Button Rock:ContextMenu.ShowMenuOnClick="True">
    <Rock:ContextMenu.Menu>
        <DataTemplate>
            <Rock:Menu>
                <Rock:MenuGroup Title="Group Actions">
                    <Rock:MenuAction Title="View details" 
                        Command="{Binding ShowToast}"
                        CommandParameter="Group details" />
                </Rock:MenuGroup>
            </Rock:Menu>
        </DataTemplate>
    </Rock:ContextMenu.Menu>
</Button>
```

### Click Command

The Context Menu can sometimes interfere with a `TapGestureRecognizer` or other command triggers. To avoid this, you can use the `ClickCommand` and `ClickCommandParameter` attached properties. This lets you define both the long-press context menu and tap functionality simultaneously!

```
<ContentView 
    Rock:ContextMenu.ClickCommand="{Binding ShowToast}"
    Rock:ContextMenu.ClickCommandParameter="Hello">
    <Rock:ContextMenu.Menu>
        <DataTemplate>
            <!-- ... -->
        </DataTemplate>
    </Rock:ContextMenu.Menu>
</ContentView>
```
