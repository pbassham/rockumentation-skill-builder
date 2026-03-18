> **Path:** Mobile Docs > 🧱 Essentials > Commands

# Commands

The .NET MAUI framework and the Rock Mobile application shell both utilize *Commands* to manage most actions and events. When a button is tapped, a Command executes. Typically, a Command is accessible via a `Command` property, although sometimes a view may support multiple Commands, in which case their names vary. Additionally, each Command can accept a parameter to fine-tune how it performs its task.

Since all Commands follow the same structure, you can use any Command anywhere. For instance, a Command configured for a button to open a browser window can also be assigned to a swipe gesture, enabling a browser to open when an individual swipes the screen.

Below, you’ll find details about various Commands. But first, here’s a quick example of using Commands. Here’s how to set up a button to open a browser window when tapped:

```
<StackLayout>
    <Button Text="Search"
            StyleClass="btn, btn-primary"
            Command="{Binding OpenBrowser}"
            CommandParameter="https://www.google.com/search?q=rockrms" />
</StackLayout>
```

Here, we bind the button's `Command` to the built-in `OpenBrowser` handler and pass the URL via the `CommandParameter`. Now, let’s add a textbox where an individual can enter a search term, using that term in the URL.

```
<StackLayout>
    <Rock:FieldContainer>
        <Rock:TextBox Label="Search" x:Name="SearchTerm" />
    </Rock:FieldContainer>

    <Button Text="Search"
            StyleClass="btn, btn-primary"
            Command="{Binding OpenBrowser}">
        <Button.CommandParameter>
            <Rock:OpenBrowserParameters Url="https://www.google.com/search">
                <Rock:Parameter Name="q"
                                Value="{Binding Path=Text, Source={x:Reference SearchTerm}}" />
            </Rock:OpenBrowserParameters>
        </Button.CommandParameter>
    </Button>
</StackLayout>
```

In this example, we create an inline object in XAML within the `CommandParameter` property of the button. The `<Rock:OpenBrowserParameters>` object sets the base URL, and the nested parameters are appended as query strings. We define a parameter `q`, which Google uses for the search term. By binding the textbox's value dynamically with `{Binding Source={x:Reference SearchTerm}, Path=Text}`, we capture the input text from `SearchTerm` and insert it as the query value.

Now, we have a search button that opens a search results page using the text input without writing a single line of code!

Most Commands support a simplified form for `CommandParameter`. As seen in the `OpenBrowser` example, a static URL can be passed directly if no custom parameters are needed. Each Command specifies the forms its `CommandParameter` can accept.

Many Commands work within a block’s context (except for the `Callback` Command, which only functions in Content-derived blocks). While most Commands are accessible outside a block, such as in a flyout menu, some require page-specific context, like `ShowActionPanel`, which needs to know the page to overlay the panel.

Command parameter objects also support a shorthand form for XAML extensions, which simplifies the syntax. Here’s a comparison:

```
<Button Text="Scroll"
        Command="{Binding ScrollToVisible}">
    <Button.CommandParameter>
        <Rock:ScrollToVisibleParameters Anchor="{x:Reference myLabel}"
                                        Position="Start" />
    </Button.CommandParameter>
</Button>
```

Using the shorthand, this becomes:

```
<Button Text="Scroll"
        Command="{Binding ScrollToVisible}"
        CommandParameter="{Rock:ScrollToVisibleParameters Anchor={x:Reference myLabel}, Position=Start}" />
```

This condensed syntax is more succinct but doesn’t support arrays in parameters. When values contain commas, they should be enclosed in single quotes within the double-quoted property string.

```
<Button Text="Send"
        Command="{Binding SendSms}"
        CommandParameter="{SendSmsParameters Message='Hello, Dave.' Recipients=1558881234}" />
```

Complex binding scenarios often arise with nested action items like `ShowCoverSheet`, `ShowActionPanel`, and `ShowPopup`. These items may require additional `BindingContext` references to maintain functionality at deeper nesting levels, as demonstrated below:

```
<Button x:Name="BindingContext" 
        Text="Action Panel With Aggregate Bindings"
        Command="{Binding ShowActionPanel}">
            
        <Button.CommandParameter>
            <Rock:ShowActionPanelParameters Title="Action Panel Bindings"
                                        CancelTitle="Cancel">
                
                <Rock:ActionPanelButton Title="AggregateCommand"
                                    Command="{Binding BindingContext.AggregateCommand, Source={x:Reference BindingContext}}">
                    
                    <Rock:ActionPanelButton.CommandParameter>
                        <Rock:AggregateCommandParameters>
                            <Rock:CommandReference Command="{Binding BindingContext.ShowToast, Source={x:Reference BindingContext}}"
                                               CommandParameter="Successful binding implementation" />
                            <Rock:CommandReference Command="{Binding BindingContext.PushPage, Source={x:Reference BindingContext}}"
                                               CommandParameter="2cda9cfc-4717-4455-bfc2-633735cda86f" />
                        </Rock:AggregateCommandParameters>
                    </Rock:ActionPanelButton.CommandParameter>
                </Rock:ActionPanelButton>
            </Rock:ShowActionPanelParameters>
        </Button.CommandParameter>
</Button>
```

In this configuration, `BindingContext` references ensure the Commands remain connected to the correct data context at each level.
