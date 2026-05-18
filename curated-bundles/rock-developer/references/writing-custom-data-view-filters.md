---
description: Use when implementing custom data view filters in Rock to retrieve data based on conditions not available in existing filters
source: "https://community.rockrms.com/developer/303\u002D\u002D\u002Dblast-off"
sourceLabel: 303 — Blast Off
---
> **Path:** 

Rock has many existing filters that you can use to retrieve the data you want in your Data Views. But sometimes you want to do something new that nobody else has built a filter for. If you are adding custom models to store data in the database, then you may want to consider adding some filters to go along with those new models.

Since we need something concrete to go over, let’s start with something that would be familiar to you: Groups. In Rock, a group can have a capacity limit placed on it. However, if you want to run a report to show all groups that are full, or have less than 2 capacity left, you would have to resort to SQL as that filter does not exist - yet. So how about we build it right now?

Let’s start with some boilerplate code to define the class that will hold all the actual filtering code. To keep things organized we are going to place this new class in the `org.rocksolidchurch.DataFilter` namespace of our project.

```
using System;
using System.ComponentModel;
using System.ComponentModel.Composition;
using System.Linq;
using System.Linq.Expressions;
using System.Web.UI;
using System.Web.UI.WebControls;
using Rock;
using Rock.Data;
using Rock.Model;
using Rock.Web.UI.Controls;
 
namespace org.rocksolidchurch.DataFilter
{
    /// <summary>
    /// Filter groups based on the available capacity in the group
    /// </summary>
    [Description( "Filter groups based on the available capacity in the group" )]
    [Export( typeof( DataFilterComponent ) )]
    [ExportMetadata( "ComponentName", "Available Capacity" )]
    public class AvailableCapacityFilter : DataFilterComponent
    {
        /// <summary>
        /// Gets the entity type that filter applies to.
        /// </summary>
        public override string AppliesToEntityType
        {
            get { return typeof( Rock.Model.Group ).FullName; }
        }
 
        /// <summary>
        /// Gets the title of this filter.
        /// </summary>
        /// <param name="entityType">The entity type to which this filter will be applied.</param>
        /// <returns></returns>
        public override string GetTitle( Type entityType )
        {
            return "Available Capacity";
        }
 
        /// <summary>
        /// Gets the section to display this filter in.
        /// </summary>
        public override string Section
        {
            get { return "Rock Solid Church"; }
        }
    }
}
```

As you can see, we also included a method that informs the DataView system what kind of entity this filter applies to, which in this case is a Group. The second method returns the title to display to the user for this filter. Lastly comes the section to use when grouping filters together. So far this is rather standard code. Next, we get into some custom code for this particular data view filter.

## Building the User Interface

Before we can process any data, we need a user interface so that we can provide the filter with the criteria it will use. We have only one criterion and that is the number of spots available in the group. The first thing your implementation will do for the user interface is create the controls that will exist on the page.

Because of the way some ASP.NET internals work, the page needs to know about these controls pretty early. The method below will create the controls and then return them so they can be registered with the page. This does not actually do anything to display the controls, we’ll take care of that next.

```
/// <summary>
/// Creates the child controls required by this filter.
/// </summary>
/// <returns>An array of controls to be added to the parent.</returns>
public override Control[] CreateChildControls( Type entityType, FilterField filterControl )
{
    // Create the standard comparison control, less than, greater than, etc.
    var ddlIntegerCompare = ComparisonHelper.ComparisonControl( ComparisonHelper.NumericFilterComparisonTypes );
    ddlIntegerCompare.Label = "Count";
    ddlIntegerCompare.ID = string.Format( "{0}_ddlIntegerCompare", filterControl.ID );
    ddlIntegerCompare.AddCssClass( "js-filter-compare" );
    filterControl.Controls.Add( ddlIntegerCompare );
 
    // Use a number box for the user to type in the numerical count to use.
    var nbCapacityCount = new NumberBox();
    nbCapacityCount.Label = "&nbsp;";
    nbCapacityCount.ID = string.Format( "{0}_nbCapacityCount", filterControl.ID );
    nbCapacityCount.AddCssClass( "js-filter-control js-capacity-count" );
    nbCapacityCount.FieldName = "Capacity Count";
    filterControl.Controls.Add( nbCapacityCount );
 
    return new Control[] { ddlIntegerCompare, nbCapacityCount };
}
```

You may have noticed the three CSS classes that we added to the controls using a `js-` prefix. You will see these types of classes used in various places in Rock. CSS class names that begin with the `js-` prefix are not used for styling but rather to easily reference those controls in JavaScript. A little bit later we will be making use of these in order to display information to the individual.

There is something to make note of in your own implementation. The Control array we return will be passed to us in later method calls, so we need to be consistent in the order we return the controls.

```
/// <summary>
/// Renders the controls.
/// </summary>
/// <param name="entityType">Type of the entity.</param>
/// <param name="filterControl">The filter control.</param>
/// <param name="writer">The writer.</param>
/// <param name="controls">The controls.</param>
public override void RenderControls( Type entityType, FilterField filterControl, HtmlTextWriter writer, Control[] controls )
{
    // 1: Get references to the controls we created in CreateChildControls.
    var ddlCompare = controls[0] as DropDownList;
    var nbValue = controls[1] as NumberBox;
 
    // 2: Begin comparison row.
    writer.AddAttribute( "class", "row field-criteria" );
    writer.RenderBeginTag( HtmlTextWriterTag.Div );
 
    // 3: Render comparison type control.
    writer.AddAttribute( "class", "col-md-4" );
    writer.RenderBeginTag( HtmlTextWriterTag.Div );
    ddlCompare.RenderControl( writer );
    writer.RenderEndTag();
 
    // 4: Hide or show the NumberBox depending on the comparison type.
    ComparisonType comparisonType = ( ComparisonType ) ddlCompare.SelectedValue.AsInteger();
    nbValue.Style[HtmlTextWriterStyle.Display] = ( comparisonType == ComparisonType.IsBlank || comparisonType == ComparisonType.IsNotBlank ) ? "none" : string.Empty;
 
    // 5: Render NumberBox control.
    writer.AddAttribute( "class", "col-md-8" );
    writer.RenderBeginTag( HtmlTextWriterTag.Div );
    nbValue.RenderControl( writer );
    writer.RenderEndTag();
 
    // 6: End comparison row.
    writer.RenderEndTag();
}
```

With this method in the class we will now have some controls rendered on the screen. Some of the numbered code blocks are pretty straightforward, but let’s go over them anyway. We will be covering these blocks slightly out of order, but just bear with us.

The first code block is getting references to the controls we created above. You could just reference the `controls` array directly throughout the method, but that can lead to errors. This way you always reference the correct control and it’s clear on later review which control you are talking about.

The second and sixth code blocks open and close a `div` tag. The seventh block registers some internal JavaScript to handle expanding and collapsing the filter details and should be included in all your filters.

Backing up a bit, the third code block opens and closes another div tag which we define with a `col-md-4` CSS class to properly size it in the filter. Inside of that we render the comparison control, which is rendered as a drop-down list.

The fourth block checks the current selected value of the comparison type. If the comparison type is one that does not need a value, then we add a style attribute to hide the number box. Because the number box has been registered on the page it needs to be rendered, so this method allows us to make it invisible. This is a good pattern to follow; when a control is not needed, update the layout so it doesn’t show up. That way the individual writing the filter is not confused about whether they need to enter a value.

Finally, the fifth block opens and closes yet another `div` tag. This one gets a `col-md-8` CSS class. Inside this tag we render out the number box control. If everything went well then you should end up with a filter that looks like this on screen.

There is one last method to be implemented for the user interface. Notice how other filters show a text string representing the filter conditions in the section header when you collapse them? You will want your filter to do the same thing. Because this happens in JavaScript on the client side, you need to write a bit of JavaScript and return it in a special method.

```
/// <summary>
/// Formats the selection on the client-side.  When the filter is collapsed by
/// the user, the FilterField control will set the description of the filter to
/// whatever is returned by this property.  If including script, the controls
/// parent container can be referenced through a '$content' variable that is
/// set by the control before referencing this property.
/// </summary>
public override string GetClientFormatSelection( Type entityType )
{
	return @"
function () {
	var result = 'Available Capacity';
	result += ' ' + $('.js-filter-compare', $content).find(':selected').text() + ' ';
 
	if ($('.js-capacity-count', $content).filter(':visible').length)
	{
    	result += $('.js-capacity-count', $content).filter(':visible').val()
	}
 
	return result;
    }";
}
```

There are just two pieces to this JavaScript. Remember earlier we talked about those `js-` prefixes? This is where they come into play. We need an easy way to reference those two controls on screen to check their values, and thus we can use the `js-` class names to find them.

We start with a friendly string to identify what this filter is doing. Often this will just be the name of the filter, but it doesn’t have to be. Next, we append the text value of the comparison type drop down list. The control is referenced by `js-filter-compare` class and would return something like “Equal To”. Finally, we check if the number box, identified by `js-capacity-count`, is visible. If it is, append its value to the result string.

## Formatting User Selections

There are four methods and a new Class you need to implement to process the user selections. These methods work with selection data as a string, because the database stores this data as strings.

First, we will write the selection configuration class within the AvailableCapacityFilter class. This class will allow us to define what the filter selection string means, and how to separate it into values.

```
/// <summary>
/// Get and set the filter settings from DataViewFilter.Selection
/// </summary>
protected class SelectionConfig
{
    /// <summary>
    /// Initializes a new instance of the <see cref="SelectionConfig"/> class.
    /// </summary>
    public SelectionConfig()
    {
        // Add values to set defaults / populate upon object creation.
    }
 
    /// <summary>
    /// The selected integer value of the compare filter control.
    /// </summary>
    public int CapacityCompareId { get; set; }
 
    /// <summary>
    /// The integer value for the capacity filter.
    /// </summary>
    public int? CapacityNumber { get; set; }
 
    /// <summary>
    /// Parses the specified selection from a JSON string.
    /// </summary>
    /// <param name="selection">The filter selection control.</param>
    /// <returns></returns>
    public static SelectionConfig Parse( string selection )
    {
        return selection.FromJsonOrNull<SelectionConfig>();
    }
}
```

This defines a new class (SelectionConfig), and two properties, CapacityCompareId and CapacityNumber. We will use the Parse method to convert the filter selections into JavaScript Object Notation, or JSON.

The next method is just the server-side version of that GetClientFormatSelection we implemented in JavaScript. It’s going to do the same thing, but work with the data stored in the selection string. You can see how this string is generated in a later block of code.

```
/// <summary>
/// Formats the selection data into a user-friendly string.
/// </summary>
/// <param name="entityType">The type of the entity.</param>
/// <param name="selection">The selection(s) from filter controls.</param>
/// <returns></returns>
public override string FormatSelection( Type entityType, string selection )
{
	SelectionConfig selectionConfig = SelectionConfig.Parse( selection );
	string result = "Available Capacity";
 
	ComparisonType comparisonType = ( ComparisonType ) selectionConfig.CapacityCompareId;
	int? capacityCountValue = selectionConfig.CapacityNumber;
 
	result += " " + comparisonType.ConvertToString();
 
	if ( comparisonType != ComparisonType.IsBlank && comparisonType != ComparisonType.IsNotBlank )
	{
    	result += " " + capacityCountValue.ToString();
	}
 
	return result;
}
```

As you can see, the `selection` value is sent to the SelectionConfig Parse method. We can directly reference the values that we stored in the selection string as properties now.

As we did in the JavaScript version, we add the text of the comparison type to our result string and then check if there is a valid numerical value. If so, we append that numerical value to the string as well. What we end up with will be the exact same format you saw in the previous screenshot.

Our next function is very straightforward. This function is called when the user clicks the Save button. The system cannot store the controls in the database so instead it asks your class to construct a string representation of the selected values. In our case, we simply take the value of the comparison type drop-down list and the value of the number box and put them in a new SelectionConfig object and convert that to a JSON string.

```
/// <summary>
/// Gets the selection data from the user selection in the controls.
/// </summary>
/// <param name="entityType">Type of the entity.</param>
/// <param name="controls">The controls.</param>
/// <returns></returns>
public override string GetSelection( Type entityType, Control[] controls )
{
    SelectionConfig selectionConfig = new SelectionConfig();
    DropDownList ddlCompare = controls[0] as DropDownList;
    NumberBox nbValue = controls[1] as NumberBox;
    
    selectionConfig.CapacityCompareId = ddlCompare.SelectedValue.ToIntSafe();
    selectionConfig.CapacityNumber = nbValue.Text.ToIntSafe();
    
    return selectionConfig.ToJson();
}
```

Next, we need to be able to reverse this operation. When the user wants to edit an existing Data View all the on-screen controls need to be populated with their appropriate values. This is done by passing the selection string that was loaded from the database to a function of yours. In that function you will parse the string into a SelectionConfig object and set the values of the controls.

```
/// <summary>
/// Sets the control values based on the selection data.
/// </summary>
/// <param name="entityType">Type of the entity.</param>
/// <param name="controls">The controls.</param>
/// <param name="selection">The selection.</param>
public override void SetSelection( Type entityType, Control[] controls, string selection )
{
    SelectionConfig selectionConfig = SelectionConfig.Parse( selection );
    DropDownList ddlCompare = controls[0] as DropDownList;
    NumberBox nbValue = controls[1] as NumberBox;
    
    ComparisonType comparisonType = ( ComparisonType ) selectionConfig.CapacityCompareId;
    ddlCompare.SelectedValue = comparisonType.ConvertToInt().ToString();
    nbValue.Text = selectionConfig.CapacityNumber.ToString();
}
```

## Filtering Data

You’re almost done! At this point our custom filter can now be saved to and loaded from the database and we have generated the on-screen controls. The last piece is to do some SQL filtering on a result set. Don’t worry, you don’t need to write actual SQL - though you may wish you could until you get your mind fully wrapped around manually building LINQ queries. If you already know about how LINQ expressions work under the hood, feel free to skip forward to the code. Otherwise put your thinking cap on and follow us on a brief tour.

A LINQ Expression is, simply put, the where clause of a SQL query. It is also an abstract term, much like that clause. What we mean is a where clause can be a simple comparison such as `where Id = 1`. It can also be a far more complex statement like `WHERE Id BETWEEN 1 AND 10 && IsValid = 1`. Both of these are expressions. However, the second statement is actually comprised of three different expressions.

The first expression is the` Id BETWEEN 1 AND 10` part. The second expression is the `IsValid = 1` portion. Our third expression is what is called a binary expression. Binary expressions are your `AND` and `OR` operators. So, the third expression is basically a combination of the first two expressions by an and operator.

What our final method is going to do is build an expression that filters based upon a specific criteria. If this was a filter to check if the group was active, it would be an extremely simple expression to build. But we need to build a more complex binary expression because we are dealing with two values. The first is the group’s capacity rule. The second is the number of available spots in the group.

The logic we are going to use for our expression is: If group available capacity matches filter, include group in list. We need to expound on that a bit to clarify one item in the logic. A group whose capacity rule is not set to hard will always be considered a match. Because we cannot calculate available capacity for a group that does not have a capacity limit, we simply assume it to always be a match.

```
/// <summary>
/// Gets the expression.
/// </summary>
/// <param name="entityType">Type of the entity.</param>
/// <param name="serviceInstance">The service instance.</param>
/// <param name="parameterExpression">The parameter expression.</param>
/// <param name="selection">The selection.</param>
/// <returns></returns>
public override Expression GetExpression( Type entityType, IService serviceInstance, ParameterExpression parameterExpression, string selection )
{
	// 1: Get user provided filter selections.
	SelectionConfig selectionConfig = SelectionConfig.Parse( selection );
	ComparisonType comparisonType = ( ComparisonType ) selectionConfig.CapacityCompareId;
 
	int? capacityCountValue = selectionConfig.CapacityNumber;
 
	// 2: Generate generic queryable object of type Group.
	var query = new GroupService( ( RockContext ) serviceInstance.Context ).Queryable();
 
	// 3: Generate the query for available capacity.
	var capacityCountQuery = query
    	.Where( p =>
        	( ( p.GroupCapacity ?? int.MaxValue ) - p.Members.Count( a => a.GroupMemberStatus == GroupMemberStatus.Active ) )
        	== capacityCountValue );
 
	// 4: Generate the query for capacity rule.
	var capacityRuleQuery = query.Where( p => p.GroupType.GroupCapacityRule != GroupCapacityRule.Hard );
 
	// 5: Extract the pure expressions.
	var compareCountExpression = FilterExpressionExtractor.Extract<Rock.Model.Group>( capacityCountQuery, parameterExpression, "p" ) as BinaryExpression;
	var capacityRuleExpression = FilterExpressionExtractor.Extract<Rock.Model.Group>( capacityRuleQuery, parameterExpression, "p" ) as BinaryExpression;
 
	// 6: Alter the comparison type to match user selection.
	var compareResultExpression = FilterExpressionExtractor.AlterComparisonType( comparisonType, compareCountExpression, 0 );
 
    // 7: Generate final compound expression.
	BinaryExpression result = Expression.MakeBinary( ExpressionType.Or, compareResultExpression, capacityRuleExpression );
	return result;
}
```

Okay, the first block of code takes the selection string from the database and parses out the comparison type and the number value the user had previously configured in the user interface with the SelectionConfig.

Second block, we simply generate an IQueryable object for the entity Group that we can use to build our queries with. This lets us use standard LINQ syntax to build much of the query.

Third block takes a little explaining. Basically, this builds a query for comparing the available group capacity. If the group has a capacity defined, we use that, otherwise we use the maximum integer value as a starting point. Then we subtract the number of active group members. This would be our available capacity. Finally, we compare that computed value to the capacity count that the user configured. Note that this is an == comparison, don’t worry about that. We will change the comparison dynamically later.

Our fourth block generates the more simple query for checking the group’s capacity rule. Here we are filtering for any group that does not have its capacity rule set to Hard.

Fifth block has some magic. Notice in the last two code blocks I said we were generating queries and not expressions. We need to extract the pure expression object so that we can use make modifications to it and then combine then. Rock has an extension method that allows us to do just that. You will always pass the parameterExpression object that you are passed in your variable list. The final parameter of p must match the variable name used inside the `Where( p => ... )` LINQ method.

Sixth block. We’re on the home stretch. We mentioned above that we would later convert the comparison type to match what the user selected. This is where we do that. This method call converts that hard coded `==` comparison into one that matches the rule specified by the user.

The seventh block is where we combine the two expressions. Because we want any groups that have a matching capacity or any groups that do not have a hard capacity rule, we are going to combine them using `ExpressionType.Or`. The Makebinary method is pretty simple. You simply give it the binary operator type (and, or, less than, greater than, etc.) and a left-hand and right-hand expression to be used with that operator. It returns a new expression. This new expression is what we return back to the filter system.

Finally, under the hood, the Data View system is going to take all these expressions returned by the various filter classes and combine them to get a final query. The results of that query are what you see in the Data View results.

We don’t want to scare you off and have you think that *all* expressions are this complex. Remember we mentioned earlier that the expression for an `IsActive` check would be much simpler? Well, to give you an idea, here is the method that would be used for that kind of check.

```
public override Expression GetExpression( Type entityType, IService serviceInstance, ParameterExpression parameterExpression, string selection )
{
    var value = selection.AsBoolean();
 
    var query = new GroupService( ( RockContext ) serviceInstance.Context ).Queryable();
 
    var isActiveQuery = query.Where( p => p.IsActive == value );
 
    return FilterExpressionExtractor.Extract<Rock.Model.Group>( isActiveQuery, parameterExpression, "p" );
}
```

As you can see, sometimes the expressions end up being very simple. In this case we just need to perform a simple check on the group’s `IsActive` value against what the user provided and then extract the pure expression.

## Last Step

Once you’ve created your project add it as a reference to the RockWeb project. See the **Adding the Project to RockWeb** chapter for those details.

---

## Adding The Project to RockWeb {#adding-the-project-to-rockweb}

Once you’ve created a project, whether it’s a custom job, workflow action, etc., remember to add a reference to the RockWeb project -- otherwise the actions won’t be seen when you start Rock and your migrations won’t run either.

![](https://community.rockrms.com/GetImage.ashx?Id=66717)

![](https://community.rockrms.com/GetImage.ashx?Id=66718)

That’s it. Ready, set, action!
