> **Path:** Mobile Docs > 🧱 Essentials > Controls > Form Fields > Text Box

# Text Box

*Inherits from [Xamarin.Forms.Entry](https://docs.microsoft.com/en-us/dotnet/api/xamarin.forms.entry)*

Come on. Do we really need to explain what a text box is for? But seriously, as the name implies this view provides a place for the user to enter text on a page.

### Properties

| Property | Type | Description |
| --- | --- | --- |
| Label | string | The label title to be used when wrapped in a control that displays a label for the field. |
| IsRequired | bool | If True, any validation performed will require that some text be entered. |
| MaxLength | int | The maximum allowed length of the entered text, set to 0 for no limit. |
| ValidationExpression | string | A regular expression that will be used to validate the input. |
| ValidationExpressionMessage | string | The error message to display when input fails the ValidationExpression. |
| Text | string | The content to be displayed inside the text box. |

![](https://community.rockrms.com/GetImage.ashx?Id=67202)

### Example

```
<Rock:FieldContainer>
    <Rock:TextBox Label="Rock Text Box"
        IsRequired="false"
        Text="Rock Lobster!" />
</Rock:FieldContainer>
```

### Disabled Styling

When a TextBox has `IsEnabled` set to `False`, the text color will be black or white depending on the iOS theme. This may be present in Workflow Entry forms, Prayer Request Details, and other blocks that use this TextBox to display an entry form. Use the [Visual State Manager](https://learn.microsoft.com/en-us/xamarin/xamarin-forms/user-interface/visual-state-manager) to override this to your desired color. You can add this to your page or even a Layout to affect all of its child pages.

```
<StackLayout>
    ...
    <StackLayout.Resources>
        <Style TargetType="Rock:TextBox">
            <Setter Property="VisualStateManager.VisualStateGroups">
                <VisualStateGroupList>
                    <VisualStateGroup x:Name="CommonStates">
                        <VisualState x:Name="Disabled">
                            <VisualState.Setters>
                                <Setter Property="TextColor"
                                    Value="{Rock:PaletteColor Gray-500}" />
                            </VisualState.Setters>
                        </VisualState>
                    </VisualStateGroup>
                </VisualStateGroupList>
            </Setter>
        </Style>
    </StackLayout.Resources>
</StackLayout>
```
