> **Path:** Mobile Docs > 🧱 Essentials > Controls > Content Controls > Gradient Label

# Gradient Label

M v8.0

*Inherits from* [*Label*](https://learn.microsoft.com/en-us/dotnet/maui/user-interface/controls/label?view=net-maui-9.0)

The `GradientLabel` is a custom UI component that extends the standard `Label` control by allowing you to apply gradient effects to its text. This enables more dynamic and visually appealing text presentation within your application.

## Examples

The following example demonstrates how to apply a linear gradient to the text of a `GradientLabel`:

```
<Rock:GradientLabel Text="Rock Solid Church" FontSize="50" HorizontalTextAlignment="Center" FontAttributes="Bold">
	<Rock:GradientLabel.TextBrush>
		<LinearGradientBrush StartPoint="0, 0" EndPoint="1, 1">
			<GradientStop Color="Yellow" Offset="0.0" /> 
			<GradientStop Color="Red" Offset="0.25" /> 
			<GradientStop Color="Blue" Offset="0.75" /> 
			<GradientStop Color="LimeGreen" Offset="1.0" />
		</LinearGradientBrush>
	</Rock:GradientLabel.TextBrush>
</Rock:GradientLabel>
```

![](https://community.rockrms.com/GetImage.ashx?Id=67045)

This example shows how to apply a radial gradient:

```
<Rock:GradientLabel Text="Radial Solid Church" FontSize="50" HorizontalTextAlignment="Center" FontAttributes="Bold">
	<Rock:GradientLabel.TextBrush>
		<RadialGradientBrush Center="0.5,0.5">
			<GradientStop Color="Red" Offset="0.1" />
			<GradientStop Color="DarkBlue" Offset="1" />
		</RadialGradientBrush>
	</Rock:GradientLabel.TextBrush>
</Rock:GradientLabel>
```

![](https://community.rockrms.com/GetImage.ashx?Id=67046)

Alternatively, you can defined a resource in your parent view and reuse the brush.

```
<StackLayout Spacing="24">
    
    <StackLayout.Resources>
	<LinearGradientBrush x:Key="GradientTextBrush" StartPoint="0, 0" EndPoint="1, 1">
    		<GradientStop Color="Yellow" Offset="0.0" /> 
    		<GradientStop Color="Red" Offset="0.25" /> 
    		<GradientStop Color="Blue" Offset="0.75" /> 
    		<GradientStop Color="LimeGreen" Offset="1.0" />
    	</LinearGradientBrush>
    </StackLayout.Resources>
    
    <Rock:GradientLabel Text="Rock Solid Church" 
                        FontSize="50" 
                        HorizontalTextAlignment="Center" 
                        FontAttributes="Bold" 
                        TextBrush="{StaticResource GradientTextBrush}" />
    
    <Rock:GradientLabel Text="Linear Gradient" 
                        FontSize="50" 
                        HorizontalTextAlignment="Center" 
                        FontAttributes="Bold" 
                        TextBrush="{StaticResource GradientTextBrush}" /> 
    
</StackLayout>
```

## Properties

| Property | Type | Description |
| --- | --- | --- |
| TextBrush | GradientBrush | Specify the type of effect you want your text to have (e.g., linear). |
