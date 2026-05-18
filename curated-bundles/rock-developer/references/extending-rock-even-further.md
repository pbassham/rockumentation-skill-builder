---
description: Use when building custom FieldTypes and Field Attributes in Rock to extend data model functionality
source: "https://community.rockrms.com/developer/303\u002D\u002D\u002Dblast-off"
sourceLabel: 303 — Blast Off
---
> **Path:** 

## Custom Field Attributes and FieldTypes

Rock has nearly 150 FieldTypes and Field Attributes out of the box. But when you are building custom data models, you sometimes need a custom field type and attribute to work with them. First, there is one thing to keep in mind. All Field Attributes have a related FieldType, but not all FieldTypes have a related Field Attribute. So what is the difference?

A FieldType provides the user interface to edit a value, which normally gets stored into the database. The FieldType can be used inside custom blocks and as custom Attributes (think Person Attribute). This means that for what you want to accomplish you may only need to create a FieldType.

Conversely, a Field Attribute must have a related FieldType and is what allows you to put, for example, a setting value on a Block Type. This is when you do things like \[TextField(...)\] above your Block Type definition. As an example of this, there is a ColorFieldType that provides a color picker to the user, but there is currently no ColorFieldAttribute to allow you to provide a color picker when configuring your block.

The simple distinction is that a FieldType is used by the end-user (in attributes they create) and the Field Attribute is used by other developers in C# code to apply a configuration field to whatever they are building. When building a plug-in, you only need to create a Field Attribute for your FieldType if you are going to use it yourself. Other developers will not have access to it. When developing a new FieldType that is going to be included in core, you probably want to create a Field attribute to go along with it since other developers would have access to it.

So let’s look at the FieldTypes first since they drive Field Attributes.

## Custom FieldType

Seeing as Rock does not have a field type for picking a Device, we are going to build one. Though after this section is written Rock may finally have a DeviceFieldType out of the box. You could technically accomplish this with a Single Select field type and some SQL, but that is not a very user friendly experience for your users. Building a custom FieldType involves five regions of code, only one of which is required.

You will commonly see these regions identified in existing classes as `#region Configuration`, `#region Edit Control`, `#region Formatting`, `#region Entity Methods`, and `#region Persistence`. Only the Edit Control region is strictly required, though you will probably want to include a Formatting region so you can display the value in a friendly manner. The Configuration section allows you to provide a place to configure extra limiting options to the user, such as the type of device to pick from. The Entity Methods section is only used if you are writing a field for selecting zero or one values that directly map to a database Entity. In our example we will cover all four.

We will start with an empty class in our namespace that defines the basic structure.

```
public class DeviceFieldType : Rock.Field.FieldType, Rock.Field.IEntityFieldType
{
    #region Configuration
    #endregion

    #region Edit Control
    #endregion

    #region Formatting
    #endregion

    #region Entity Methods
    #endregion

    #region Persistence
    #endregion
}
```

You will always need to inherit from the base type `FieldType` (or another existing FieldType that you are going to extend). If this is a FieldType that maps to a database entity, you will want to implement the `IEntityFieldType` interface as well. Doing that will allow Lava to return the full entity in the Lava Attribute filter.

### Configuration Section

Starting with our Configuration section, we need to define a number of methods to allow the user to configure the optional settings for this field.

```
private const string DEVICE_TYPE = "deviceType";

/// <summary>
/// Returns a list of the configuration keys
/// </summary>
/// <returns>A list of configuration keys that are in use by this field type.</returns>
public override List<string> ConfigurationKeys()
{
    var configKeys = base.ConfigurationKeys();

    configKeys.Add( DEVICE_TYPE );

    return configKeys;
}
```

Our first method retrieves all the configuration keys used by this field. The values provided by this method are not currently in use but may be used in the future to help the system determine which keys should be present in a properly configured field. We have defined a configuration key for DEVICE\_TYPE so that we can let the user limit the possible choices to a specific Device Type. To actually make use of that key we need to provide a Control on the field configuration screen where they can select an optional Device Type.

```
/// <summary>
/// Creates the HTML controls required to configure this type of field
/// </summary>
/// <returns>A collection of controls that will be added to the page.</returns>
public override List<Control> ConfigurationControls()
{
    var controls = base.ConfigurationControls();

    // Device Type picker.
    var ddl = new RockDropDownList();
    controls.Add( ddl );
    ddl.AutoPostBack = true;
    ddl.SelectedIndexChanged += OnQualifierUpdated;
    ddl.Label = "Device Type";
    ddl.BindToDefinedType( Rock.Web.Cache.DefinedTypeCache.Read( Rock.SystemGuid.DefinedType.DEVICE_TYPE.AsGuid() ), true );
    ddl.Required = false;
    ddl.Help = "Limit the choice of devices to those that math this device type.";

    return controls;
}
```

We are creating a single RockDropDownList control that is populated by values from the DeviceType DefinedType (yes, that is mouthful). One important thing to note is the use of the AutoPostBack and SelectedIndexChanged. When editing a field the user has the option to set a default value. Since our default value list depends on what they select here these two options ensure that the default value control is updated whenever the user changes the value of the drop down. The OnQualifierUpdated is a standard event method of all FieldTypes that you can use to let the system know to rebuild the Default Value control.

```
/// <summary>
/// Gets the configuration values.
/// </summary>
/// <param name="controls">The configuration controls that the user has entered values into.</param>
/// <returns>A dictionary of configuration values that identify user selections in the controls.</returns>
public override Dictionary<string, ConfigurationValue> ConfigurationValues( List<Control> controls )
{
    Dictionary<string, ConfigurationValue> configurationValues = new Dictionary<string, ConfigurationValue>();
    configurationValues.Add( DEVICE_TYPE, new ConfigurationValue( "Device Type", "Limit the choice of devices to those that math this device type.", "" ) );

    if ( controls != null )
    {
        if ( controls.Count > 0 && controls[0] != null && controls[0] is RockDropDownList )
        {
            configurationValues[DEVICE_TYPE].Value = ( ( RockDropDownList ) controls[0] ).SelectedValue;
        }
    }

    return configurationValues;
}
```

While the above looks like a lot is going on, we are simply creating a new Dictionary of configuration values and adding the placeholder for our Device Type configuration value. Then if we have a list of controls that match what we expect we update that placeholder with the actual value selected in the drop down list. There is a lot going on in that if statement because we need to make sure that we don’t cause an exception if we somehow get passed a different set of controls.

```
/// <summary>
/// Sets the values of the configuration controls based on database values.
/// </summary>
/// <param name="controls">The configuration controls that were previously created.</param>
/// <param name="configurationValues">The values that were set previously.</param>
public override void SetConfigurationValues( List<Control> controls, Dictionary<string, ConfigurationValue> configurationValues )
{
    if ( controls != null && configurationValues != null )
    {
        if ( controls.Count > 0 && controls[0] != null && controls[0] is RockDropDownList && configurationValues.ContainsKey( DEVICE_TYPE ) )
        {
            ( ( RockDropDownList ) controls[0] ).SelectedValue = configurationValues[DEVICE_TYPE].Value;
        }
    }
}
```

This is another method that appears to be very complex, but really it’s just the opposite of the previous method. Here we are again checking that our list of controls is the one we expect and also that the configuration values have the key we expect it to have. Once we know that all is safe we set the current value of the control to that which is stored in the dictionary.

These four methods comprise the Configuration section of our class. If your custom FieldType does not need any user configuration then you can omit them entirely.

### Edit Control Section

This section provides the methods needed to generate a user-interface control for the person to interact with in order to edit the value for this field. The first method is a bit long so we’ll break it down after you look over the code.

```
/// <summary>
/// Creates the control(s) necessary for prompting user for a new value
/// </summary>
/// <param name="configurationValues">The configuration values.</param>
/// <param name="id">The identifier to use with our control.</param>
/// <returns>
/// The control that allows the user to edit a field value.
/// </returns>
public override System.Web.UI.Control EditControl( Dictionary<string, ConfigurationValue> configurationValues, string id )
{
    // 1
    var editControl = new RockDropDownList { ID = id };
    editControl.Items.Add( new ListItem() );

    // 2
    var deviceService = new DeviceService( new RockContext() );
    var deviceQry = deviceService.Queryable();

    // 3
    int? deviceTypeId = null;
    if ( configurationValues != null )
    {
        if ( configurationValues.ContainsKey( DEVICE_TYPE ) )
        {
            deviceTypeId = configurationValues[DEVICE_TYPE].Value.AsInteger();
        }
    }

    if ( deviceTypeId.HasValue && deviceTypeId.Value != 0 )
    {
        deviceQry = deviceQry.Where( d => d.DeviceTypeValueId == deviceTypeId.Value );
    }

    // 4
    var deviceList = deviceQry.OrderBy( d => d.Name ).ToList();
    if ( deviceList.Any() )
    {
        foreach ( var device in deviceList )
        {
            editControl.Items.Add( new ListItem( device.Name, device.Id.ToString() ) );
        }
    }

    return editControl;
}
```

So here is what we have going on... This method is passed an id which is a unique value that we can use to identify our control on the page. If you have multiple controls you can use this id value as a prefix and add something to the end to uniquely identify each control. Since you can only return a single control you would need to create one parent control and then add your multiple real controls as children. We only have one control so we can just return it directly.

Note that there are some circumstances where your edit control may need specific functionality that isn’t available by combining the controls in the standard Rock toolbox. In that case, you can create your own custom control - refer to the “Custom Controls” topic in the next section for more information.

The first section creates our RockDropDownList control and then adds a blank entry to be our “no value” selection. The second section creates a queryable collection of Devices that exist in the database - by default this will be *all* Device records. The third section checks our configuration values to see if we need to filter by a specific DeviceType and if so filters the query down. Finally the fourth section orders that query by Name and adds each Device into the RockDropDownList control by its name and Id number.

```
/// <summary>
/// Reads new values entered by the user for the field ( as int )
/// </summary>
/// <param name="control">Control that was returned in the CreateEditControl() method</param>
/// <param name="configurationValues">The configuration values.</param>
/// <returns>The current selection represented as a string.</returns>
public override string GetEditValue( System.Web.UI.Control control, Dictionary<string, ConfigurationValue> configurationValues )
{
    List<string> values = new List<string>();

    RockDropDownList dropDownList = control as RockDropDownList;

    if ( dropDownList != null && dropDownList.SelectedValue != None.IdValue )
    {
        return dropDownList.SelectedValue;
    }

    return null;
}
```

The GetEditValue method’s purpose is to retrieve the currently selected values from the edit control. We return that selection in a string, but there is no parsing done so it is up to us what the contents of that string mean. Since we are only storing a simple Id number value it is fairly straightforward. Some controls need to store multiple values and you usually find those separated by a `|` character (for an example of this, see the Group Type Group field).

In our specific case, we simply check to make sure the control passed to us is actually a RockDropDownList and that the currently selected value is not the “no selection” value. If that is the case we return the selected value, which is the Id of the Device. Otherwise we return null which indicates that the default value should be used instead.

```
/// <summary>
/// Sets the value. ( as int )
/// </summary>
/// <param name="control">Control that was returned in the CreateEditControl() method</param>
/// <param name="configurationValues">The configuration values.</param>
/// <param name="value">The value from a previous call to GetEditValue().</param>
public override void SetEditValue( System.Web.UI.Control control, Dictionary<string, ConfigurationValue> configurationValues, string value )
{
    RockDropDownList dropDownList = control as RockDropDownList;

    if ( value != null && dropDownList != null )
    {
        dropDownList.SetValue( value );
    }
}
```

The previous method allowed us to save the user’s selection into a format that can be saved in the database somewhere (usually in an AttributeValue record). This method does the reverse. We have previously saved a value and now the user is about to edit this field again so we need to set the current value to what they had previously selected. Because this is a simple drop down list, we can just verify that the control is the one we expected (and that we have a valid value) and then set the value of the control.

Again, if you had multiple controls you would need to do some parsing on this value string and then set the individual values of the various controls.

### Formatting Section

Okay, so we have our edit control and if we ran Rock now we would be able to select a Device from the drop down. We would quickly end with being a sad panda, however, as quickly we would discover that when viewing the selected value it displays the Id number of the Device rather than the name. That isn’t helpful to our users. Lets add a method to our Formatting section to take care of that.

```
/// <inheritdoc/>
Public override string GetTextValue( string privateValue, Dictionary<string, string> privateConfigurationValues )
{
    int? deviceId = value != null ? value.AsIntegerOrNull() : null;

    if ( deviceId.HasValue )
    {
        var rockContext = new RockContext();
        var device = new DeviceService( rockContext ).Get( deviceId.Value );

        return device != null ? device.Name : null;
    }

    return null;
}

/// <summary>
/// Returns the field's current value(s)
/// </summary>
/// <param name="parentControl">The parent control that this value will be displayed in.</param>
/// <param name="value">Information about the value as saved by GetEditValue method.</param>
/// <param name="configurationValues">The configuration values.</param>
/// <param name="condensed">Flag indicating if the value should be condensed (i.e. for use in a grid column)</param>
/// <returns>The name of the selected device.</returns>
public override string FormatValue( Control parentControl, string value, Dictionary<string, ConfigurationValue> configurationValues, bool condensed )
{
    return !condensed
        ? GetTextValue( value, configurationValues.ToDictionary( cv => cv.Key, cv => cv.Value.Value )
        : GetCondensedTextValue( value, configurationValues.ToDictionary( cv => cv.Key, cv => cv.Value.Value );
}
```

The GetTextValue method takes the raw value stored in the database and lets us return a different string that is more user friendly. Users want to see names, not Id numbers, so we will check if we have a valid Id and then load the Device from the database. If we manage to load a Device then return its name. If there is no current selection or you can’t find a value to display then you should return `null`.

There are a few things to note about the parameters passed to this method. First is we are given the configuration values, even though we don’t use them in our example. But if one of your configuration values referred to the output format then we might check it here. For example, we might have created a configuration value of “Include Device Type”. In our GetTextValue method we could then check if that is true and if so return a string that includes both the Type and the Name of the device.

Secondly, there are 3 additional methods that you can implement depending on your needs: GetCondensedTextValue, GetHtmlValue, GetCondensedHtmlValue. Including GetTextValue, each of these methods returns a different type of representation. GetTextValue and GetCondensedTextValue must return plain text representations of the value. GetHtmlValue and GetCondensedHtmlValue can return HTML formatted rich content where it is appropriate. Both of the Condensed methods are expected to return a more condensed version, such as when displaying in a grid. For the 2 text methods, this does not mean you cannot return a “<” character. That is perfectly valid, but it will be HTML escaped before it is displayed. The HTML methods will not - which means you probably want to HTML escape any strings you don’t control (like a Group name) in case the name has a “<” in it.

Thirdly, notice we have a `FormatValue` method that takes the same parameters plus `parentControl` and `condensed` parameters. The FormatValue method is used by WebForms code. This code will slowly be replaced to take advantage of the other 4 `Get…Value` methods in the future. So the pattern on new field types would be to just use what you see in the code snippet above. Existing field types should be modified so that the FormatValue returns exactly the same value it did prior to the implementation of the 4 new `Get…Value` methods.

The reason we have the 4 `Get…Value` methods is that it allows greater flexibility when using emerging technologies like JavaScript frameworks. They also provide a much clearer indication of what value is expected to be returned by the method. For example, a grid might call GetCondensedHtmlValue method on the Email field type to display a clickable link. But that string isn’t a great choice to use when exporting the same data to CSV. So at export it might then call the GetTextValue method to get a plain text version that is more appropriate to export.

There are two other methods you may want to implement if it makes sense. The first is the FormatValueAsHtml method. As the name implies, it allows you to format the value with HTML syntax. An example of this would be the Url Link Field. The URL entered in the edit control is rendered as a clickable link. If this method is not provided then the value from the FormatValue method is used instead.

The second method is the SortValue. This method will allow you to provide a different object type that will be used for sorting a collection of these values. If you are displaying a numerical value as a string, you may want to override this method and return the same value as an integer so it can be properly sorted. A good example of this would be the Rating Field Type.

At this point you could pretty much use your new FieldType as is, except that we implemented the IEntityFieldType interface. This interface requires us to implement a few more methods, but the core functionality of the FieldType is done and working. These extra methods provide usefulness when somebody wants to work with the actual entity object instead of just the formatted value. This is especially true when working with Lava.

### Entity Methods Section

Let’s dive into our last section and write our entity methods. As we mentioned before, these methods provide a way for the internals of Rock to know what the actual entity is that the user selected rather than just knowing it is some string value. This is especially useful when working with Lava where you want to retrieve the actual object specified by the attribute value so that you can run further filters against it. An example of this type of Lava would be:

`{{ object | Attribute:’MyDevice’,’DeviceTypeId’ }}`

In this case, the user wants to get the DeviceTypeId of the selected device in the attribute field. In order to accomplish that, Lava needs to be able to retrieve the actual entity object rather than just the field value.

There are a couple methods needed to accomplish all this, but don’t worry. Nearly all of them are just a single line of code.

```
/// <summary>
/// Gets the edit value as the IEntity.Id
/// </summary>
/// <param name="control">Control that was returned in the CreateEditControl() method</param>
/// <param name="configurationValues">The configuration values.</param>
/// <returns>A nullable integer that identifies the Id of the selected Device.</returns>
public int? GetEditValueAsEntityId( System.Web.UI.Control control, Dictionary<string, ConfigurationValue> configurationValues )
{
    return GetEditValue( control, configurationValues ).AsIntegerOrNull();
}
```

Our first method gets the currently selected value in the edit control as an Id number that identifies the Entity in its table. Since the edit value is already the Id number, just as a string, we simply need to use the existing `GetEditValue()` method and then convert it to an `int?` data type. Most of the time, this is all you will need to do. But if you are storing a different value in the field’s value, such as Guid, then you would need to load the entity first in order to retrieve the Id number.

```
/// <summary>
/// Sets the edit value from IEntity.Id value
/// </summary>
/// <param name="control">Control that was returned in the CreateEditControl() method</param>
/// <param name="configurationValues">The configuration values.</param>
/// <param name="id">The identifier of the Device.</param>
public void SetEditValueFromEntityId( System.Web.UI.Control control, Dictionary<string, ConfigurationValue> configurationValues, int? id )
{
    SetEditValue( control, configurationValues, id.ToString() );
}
```

Another monster huh? This method allows Rock to pass the Id of an entity to us and have us use that value to set the current selection of the edit control. Since we use the identifier as the edit value we can simply reuse the existing SetEditValue method and pass in the identifier converted to a string. Again, if you store the edit value as a Guid or something else you might need to do some more work to convert that Id into the value you need.

```
/// <summary>
/// Gets the entity from the user selection.
/// </summary>
/// <param name="value">The value selected by the user.</param>
/// <param name="rockContext">The rock context.</param>
/// <returns>The Device entity that corresponds to the value.</returns>
public IEntity GetEntity( string value, RockContext rockContext )
{
    int? id = value.AsIntegerOrNull();

    if ( id.HasValue )
    {
        rockContext = rockContext ?? new RockContext();

        return new DeviceService( rockContext ).Get( id.Value );
    }

    return null;
}
```

This is the only method of the set that does any real work, and there really isn’t that much to do. We are passed two parameters, the first is the stored value like that returned by the `GetEditValue()` method. The second, optional, parameter is the RockContext to operate in. Both of these parameters could be null so you need to check for that. In the case of the `value` parameter, a `null` value means we should return null.

In the case of the `rockContext` parameter, a null value means we need to create our own RockContext. In case you didn’t know this before, you can use that double `??` format to shorthand checking if it is null and if so assigning a value to it. If `rockContext` is not `null` then it is assigned its own value (nothing changes), otherwise it is assigned a new RockContext.

Finally, once we have a valid entity Id and RockContext we load the entity from the database and return it.

```
/// <summary>
/// Gets the entity (Device) that is identified by the value.
/// </summary>
/// <param name="value">The value selected by the user.</param>
/// <returns>The Device entity that corresponds to the value.</returns>
public IEntity GetEntity( string value )
{
    return GetEntity( value, null );
}
```

If you couldn’t tell, this is just a convenience method for the last method we built. It allows the caller to not need to worry about passing in a RockContext.

That’s it. These four simple methods are all you need to implement the IEntityFieldType interface, and now your field type can provide details about the entity itself. Remember, this should only be implemented if your field type represents a database entity and is a single selection. This doesn’t work if you allow multiple selections.

### Persistence Section

This section controls the logic for persisted attribute values. But what is a persisted value? Well, the database stores the raw value returned by the editor. In this case, the id number. But when we want the formatted name, we have to call a method that will load it from the database and return the device name. That works well when looking at a page with a single Device field type on it. But what to do when you have a grid with 10,000 entities displayed, with a column to show this Device field type associated with the entity? That would result in 10,000 database calls to load all those devices - many of which are probably the same device!

To alleviate this load on the server, we calculate the 4 formatted values ahead of time: text value, condensed text value, html value, condensed html value. Now when we display our grid of 10,000 entities, we don’t need to perform a secondary load of 10,000 devices. We already have the value that should be displayed in the cell.

Most field types probably will not need to worry about this as the default implementations by the base FieldType class will suffice. But depending on what you are building you might need to override one or more of these methods.

```
bool IsPersistedValueSupported( Dictionary<string, string> privateConfigurationValues );
```
```
bool IsPersistedValueVolatile( Dictionary<string, string> privateConfigurationValues );
```
```
string GetPersistedValuePlaceholder( Dictionary<string, string> privateConfigurationValues );
```
```
bool IsPersistedValueInvalidated( Dictionary<string, string> oldPrivateConfigurationValues, Dictionary<string, string> newPrivateConfigurationValues );
```
```
PersistedValues GetPersistedValues( string privateValue, Dictionary<string, string> privateConfigurationValues );
```

Let’s talk about what each of these method’s purpose is and the default value provided by FieldType.

As the name implies, IsPersistedValueSupported allows you to opt-out of persisted values. By default this method will return true. In extremely rare cases, you just won’t be able to have a persisted value because it is too complex and changes too rapidly. To give you an idea of how unlikely this is, we have only a single field type to date that disables persistence. When disabled, the system will calculate the formatted value when it is displayed in some cases, such as a detail page. In others, it will simply display a placeholder value instead.

Next we have IsPersistedValueVolatile. The default return value for this is false for internal Rock field types and true for 3rd party plugins - though in the future that may change to always default to false once plugins have had a chance to implement. When an attribute (that is a field type combined with its configuration values) is volatile, that means the formatted values are likely to change without notice. A great example of this would be a single select field type with a SQL query providing the list of options. There might be no way to detect when that persisted value is no longer valid. In this case, a volatile value will always be recalculated every time a certain job runs.

Third up is GetPersistedValuePlaceholder. When the field type does not support persistence, this value will be stored in the persisted value columns in the database. Basically this is meant to let the user know some value is here, but we don’t have a way to display it right now.

Coming in fourth is the IsPersistedValueInvalidated method. This will be called anytime the configuration values have changed. This allows you to detect when something that was changed in configuration should cause all the persisted values to be updated. An example of this might be if the Device field type included a configuration value called “Include Device Type”. When enabled, the formatted value would be the name of the device followed by the type of device, such as “kiosk-01 (Checkin Device)”. If that option is turned on or off, all the persisted values will be wrong and need to be re-calculated.

Lastly is GetPersistedValues. When getting the persisted values, the core logic would have to call all 4 of the Get…Value methods. In the case of our Device field type that would mean 4 hits to the database so we can load the device and get the name. Instead, this method is called. The base implementation will call all 4 methods for you, which is fine for something like Integer field type. Not so good for our Device field type. Instead, you should override this method to load the device once and then return all 4 values.

One additional note about field types that reference entities. There is an additional interface that should be implemented: IEntityReferenceFieldType. We say *should* because it’s not a strict requirement, but your persisted values may break if you don’t.

```
List<ReferencedEntity> GetReferencedEntities( string privateValue, Dictionary<string, string> privateConfigurationValues );
```
```
List<ReferencedProperty> GetReferencedProperties( Dictionary<string, string> privateConfigurationValues );
```

Basically, these two methods let you tell the system which entity (or entities) are referenced by your field type. This makes Rock monitor those entities for changes and automatically recalculate the persisted values. Let’s take a look at an implementation of these two.

```
List<ReferencedEntity> GetReferencedEntities( string privateValue, Dictionary<string, string> privateConfigurationValues )
{
    using ( var rockContext = new RockContext() )
    {
        int? deviceId = /* parse value and get Device identifier. */

        if ( !deviceId.HasValue )
        {
            return null;
        }

        return new List<ReferencedEntity>
        {
            new ReferencedEntity( EntityTypeCache.GetId<Device>().Value, deviceId.Value )
        };
    }
}

List<ReferencedProperty> GetReferencedProperties( Dictionary<string, string> privateConfigurationValues )
{
    return new List<ReferencedProperty>
    {
        var deviceEntityTypeId = EntityTypeCache.GetId<Device>().Value;
        new ReferencedProperty( deviceEntityTypeId, nameof( Device.Name ) )
    };
}
```

In the first method, we determine the identifier of the Device. If we have one, then we return a list with a single ReferencedEntity object. This takes the entity type identifier of the type of entity we are referencing as the first parameter. The second parameter is the identifier of the actual entity.

The second method specifies which properties to be monitored. In the code above, we are saying that any time the Name property of a Device entity is modified and is one we are referencing from the first method, update our persisted values.

So if the person selects the “kiosk-01” device and clicks Save, the name “kiosk-01” will be stored in the persisted value columns of AttributeValue. Now when the person goes over to the device detail page and edits that device and changes the name to “checkingkiosk-01”, our persisted values will automatically be updated.

### To Copy or Not To Copy

There are some places in Rock where an entity and its attributes can be copied. As of v11, when that mechanism occurs, the `Rock.Attribute.Helper.CopyAttributes` helper method calls the field type’s `GetCopyValue()` method. By default, that virtual method will just return the original value, but if your field type is too complex or holds complex data that should not be copied then you can override that method and do something complex or simply return nothing as seen in this example from the MatrixFieldType:

```
public override string GetCopyValue( string originalValue, RockContext rockContext )
{
    // Don't copy
    return string.Empty;
}
```

You will notice that the method takes a RockContext, this is because in some blocks the attributes are copied in a transaction, and if this method was going to create new attributes we would want to be able to do that on the same transaction.

## Custom Field Attribute

The good news is, once you have created your custom FieldType, creating a Field Attribute for it is extremely simple. In order to define a custom Field Attribute, you only need to create a new class that inherits from `Rock.Attribute.FieldAttribute` and implement one or more constructors. All the magic happens in the core Rock libraries. Our example is long, but you will notice nearly all of it is comments describing the various parameters.

```
public class DeviceFieldAttribute : Rock.Attribute.FieldAttribute
{
    private const string DEVICE_TYPE = "deviceType";

    /// <summary>
    /// Initializes a new instance of the <see cref="DeviceFieldAttribute"/> class.
    /// </summary>
    /// <param name="name">The name of the attribute.</param>
    /// <param name="description">The help text to provide to the user.</param>
    /// <param name="deviceTypeGuid">The defined value unique identifier that specifies which device types can be selected.</param>
    /// <param name="required">If set to <c>true</c> [required].</param>
    /// <param name="defaultValue">The default value.</param>
    /// <param name="category">The category to use when attributes are categorized.</param>
    /// <param name="order">The order this attribute should appear at.</param>
    /// <param name="key">The key to use when accessing this attribute.</param>
    public DeviceFieldAttribute( string name, string description = "", string deviceTypeGuid = "", bool required = true, string defaultValue = "", string category = "", int order = 0, string key = null ) :
        base( name, description, required, defaultValue, category, order, key, typeof( DeviceFieldType ).FullName )
    {
        FieldConfigurationValues.Add( DEVICE_TYPE, new Rock.Field.ConfigurationValue( deviceTypeGuid ) );
    }
}
```

As you can see, we again define our DEVICE\_TYPE constant to represent the configuration key of the FieldType we created previously. Following that we have a single constructor which really does nothing but call the base constructor (where the magic happens) and then set some configuration values.

Every Field Attribute you create should have the following parameters in its constructor: `name`, `description`, `required`, `defaultValue`, `category`, `order`, and `key`. These are standard values that all attributes have. As you can see, most of them can be defaulted to blank strings. All of these parameters get passed into the base constructor.

If you notice, there is an additional parameter being passed to the base constructor: `typeof( DeviceFieldType ).FullName`. This tells the base constructor what FieldType to use when generating the user interface for this field attribute. Since this is a field attribute for the DeviceFieldType, that is what we pass in.

We also have an extra parameter in our constructor that doesn’t get passed to the base constructor: `deviceTypeGuid`. This is what would allow the developer to indicate which Device Type they want to limit the user’s selections too. Field Attribute constructors have access to a `FieldConfigurationValues` property that lets us set the configuration of the Field Type when it is created. We set the DEVICE\_TYPE key to the value provided by the developer.

If the FieldType you are using doesn’t have any configuration values then your constructor can be empty and all it needs to do in that case is call the base constructor.

Note

Field Attributes do not generate the same configuration values that an attribute created in the Attribute Editor may have. When creating new Field Types, make sure that you do not rely on values such as Attribute Qualifiers that may exist for your Field Types, because they might not have been added via your Field Attribute.

## Registering Your Custom FieldType

When creating a new FieldType, we need to make sure it will be easy to consistently target moving forward, both within the code and the database. Registering a FieldType is a two-step process that involves adding a well-known Guid, and then using that Guid, creating a migration that will add the FieldType to the database.

## Add a Well-Known Guid

The easiest way to generate a new Guid is to use an online tool (such as [www.guidgenerator.com](https://www.guidgenerator.com/online-guid-generator.aspx)) or via Sql Server Management Studio by executing the following:

```
SELECT NEWID();
```

When creating a FieldType to be included in Core, we need to include this Guid within the `Rock.SystemGuid.FieldType` class. The values in this class are used throughout Core, as well as migrations, to ensure we’re targeting exactly the FieldType we intend to target, since the database-generated Id for a given record can vary from database to database. If your FieldType is for a custom plug-in, as opposed to Core, you’ll still want to create a well-known Guid, but instead of storing this value in the `Rock.SystemGuid.FieldType` class, you’ll create a similar class within your plug-in project (see the “Saving Custom Data” section of the 202 guide for an example of where to place such custom SystemGuid classes).

Continuing with our example from above, we’re going to add a new Core Guid for our `DeviceFieldType`. Open the `Rock.SystemGuid.FieldType` class, and notice that the members within this class have purposely been placed in alphabetical order. Make sure you maintain this pattern to ensure it’s as easy as possible to locate a given value in the future. Locate the spot in this file to place our new value, and simply follow the patterns that have been established. Note that your Guid will be different than the one shown below:

```
/// <summary>
/// Device field type
/// </summary>
public const string DEVICE = "285EBE50-1D28-45FC-8F6F-751449D2A2E0";
```

## Add a Migration

The next step is to use the well-known Guid we generated above in combination with a RockMigrationHelper method to add a new record to the FieldType table. Within Visual Studio, open the Package Manager Console (Tools \> NuGet Package Manager \> Package Manager Console), select the Rock.Migrations project from the Default project drop-down menu, enter the following command and hit Enter:

```
Add-Migration AddDeviceFieldType
```

Entity Framework will scaffold a new migration file that is ready to go, and open it for you.

*Note that this new file should contain an Up method and a Down method; both of these methods should be empty. If they’re not, make sure you not only understand why they’re not empty, but also that you agree with the proposed changes within the methods. Schema changes are outside of the scope of this section of the guide.*

The goal of this simple migration is to add a new FieldType record within the `Up()` method, and to remove that same FieldType within the `Down()` method. Starting with the Up method, add the following:

```
RockMigrationHelper.UpdateFieldType( "Device", "A Device Field", "Rock", "Rock.Field.Types.DeviceFieldType", Rock.SystemGuid.FieldType.DEVICE, true );
```

You are highly encouraged to “F12” into the `UpdateFieldType` method (as well as the forthcoming `DeleteFieldType` method) to understand exactly how The `RockMigrationHelper` goes about adding, updating or deleting a FieldType.

Next, add the following to the Down method:

```
RockMigrationHelper.DeleteFieldType( Rock.SystemGuid.FieldType.DEVICE );
```

That’s it! You’re now ready to test this migration against your database. Open the Package Manager Console once again, and execute the following command:

```
Update-Database
```

The console will tell you what it’s doing, and finish with a blinking cursor. Make sure you see an output line like the following, indicating success:

```
Applying explicit migration: <DateTimeStamp>_AddDeviceFieldType.
```

Then jump back over to Sql Server Management Studio, `SELECT * FROM FieldType;`, and make sure you see our newly-added FieldType record with the correct Guid.

To test the Down method of our migration, open Solution Explorer within Visual Studio and navigate to the Rock.Migrations \> Migrations directory. Locate our newly-added migration file (`<``*datetimestamp*``>_AddDeviceFieldType.cs`), and then look for the file that immediately precedes ours. Migration order is important, and that’s why migration files are always prefixed with an auto-generated date/time stamp. What we need to do is tell EF to migrate BACK to the migration just before ours. All we need is the name of the previous migration file, without the date/time stamp. So if the name of the previous file is `<``*datetimestamp*``>_AddSomeOtherFieldType.cs`, simply execute the following command within Package Manager Console:

```
Update-Database -TargetMigration AddSomeOtherFieldType
```

The output in the console should match the following, and a `SELECT * FROM FieldType;` should reveal that our new FieldType has been removed from the database:

```
Reverting explicit migration: <datetimestamp>_AddDeviceFieldType.
```

If all of the above steps worked as expected, simply make sure you include the newly-added migration files when pushing your changes to the repository in order to distribute your new FieldType.

### Connecting your FieldType to an EntityType

If your FieldType represents a single database entity, there is one final piece you’ll probably want to put in place. The EntityType table contains a record for each type of entity within Rock. Furthermore, the EntityType model contains a `SingleValueFieldType` property, which allows us to specify what type of field (UI Control) should be used when editing a given EntityType’s value, as well as providing a way to map between that UI Control and the actual Entity that the user is editing: remember the “Entity Methods Section” we created in the `DeviceFieldType` above? To wrap up with the `DeviceFieldType` example, let’s connect it to an appropriate EntityType. When asking yourself if a connection should be made between a given FieldType and EntityType, you can use the following qualifiers:

1. Does the FieldType’s edit control represent a single database entity?
2. Does the FieldType implement the

Note that a given FieldType can be connected to multiple EntityTypes. If you can answer yes to all of the above qualifiers, here’s how to do it: for our example, we’re going to connect the Device entity to the DeviceFieldType. Open the `<``*datetimestamp*``>_AddDeviceFieldType` migration file we created above, and make use of another `RockMigrationHelper` within the `Up()` method:

```
RockMigrationHelper.UpdateEntityTypeSingleValueFieldType( "Rock.Model.Device", Rock.SystemGuid.FieldType.DEVICE );
```

And finally, add the following to the `Down()` method:

```
Sql( "UPDATE EntityType SET [SingleValueFieldTypeId] = NULL WHERE ([Name] = 'Rock.Model.Device'); " );
```

Notice that in the case of the Down method, we didn’t use a `RockMigrationHelper`, but instead made use of the Sql method. You’ll sometimes find the need to drop down to the level of running a raw SQL command. You are reading the 303 guide, so we’re sure you understand the responsibility that comes along with such a powerful tool. Double-check your SQL scripts! As we did before, make sure to test your `Up()` and `Down()` migrations locally before committing your work.

## Custom Controls

Rock has a large library of custom user-interface controls that you can use to implement the functionality of your custom block. However, there may be times when you have specific requirements that are not met by the existing controls, and you need to add a new control to Rock.

Creating a custom control is not difficult if you have some understanding and experience of working with standard controls in ASP.NET Web Forms. A custom control is simply a Web Forms control with some additional extensions that allow it to integrate with the Rock user interface.

In this section, we’ll examine the anatomy of a Rock control by reviewing the implementation of one of the components available in the Rock control toolbox, the `AddressControl`. Reviewing source code for the many other controls in the toolbox is also highly recommended, as you will gain further insights for implementing the specific functionality you need for your custom control.

### Getting Started

Like other Web Forms controls, Rock controls inherit from the `System.Web.UI.Control` base class or a derived class. To set up your control to integrate with the Rock presentation layer, you need to do the following:

1. Implement the
2. Call the
3. Call the
4. Call the

Each of these steps is described in more detail below.

### Implementing the IRockControl Interface

Rock controls should implement the `IRockControl` interface to add specific properties and methods required for integration with the Rock UI.

The interface has several members that are mapped to built-in properties of the base class and do not need to be implemented explicitly, such as `ID` and `ClientID`. These properties are used by the Rock presentation layer to uniquely identify instances of your control.

In other cases, the standard implementation for a property is a simple setter/getter that represents a value persisted in the `ViewState` element of the control. The `AddressControl` follows this pattern to implement the `Label`, `FormGroupCssClass` and `Required` properties.

```
[Bindable( true ),
Category( "Appearance" ),
DefaultValue( "" ),
Description( "The text for the label." )]
public string Label
{
    get
    {
        return ViewState["Label"] as string ?? string.Empty;
    }

    set
    {
        ViewState["Label"] = value;
    }
}
```

### Setting Appearance and Layout

Some of the properties that are implemented to support `IRockControl` are used by the Rock presentation layer to format and interact with the control.

The `Labe`l property gets or sets the text for a preceding label that is displayed for the control. If the property is not set, no label is displayed.

The `Help` property gets or sets the help text that is associated with this control. This property may be used in conjunction with the `HelpBlock` property to show a glyph that displays helpful information for your control when clicked.

The `Warning` property gets or sets any warning text that is associated with this control. This property may be used in conjunction with the `WarningBlock` property to show a glyph that displays warnings for your control when clicked.

The `FormGroupCssClass` gets or sets optional CSS classes that are applied to the outer `<div>` in which your control is rendered.

### Initializing the Control

The Rock presentation layer manages the creating and rendering of your custom control to ensure that it is properly initialized, formatted and integrated with the containing block and page. The `RockControlHelper` utility class is designed to facilitate this process.

To ensure your custom control participates in this process correctly, a few modifications are needed to the standard ASP.NET web control implementation.

The first step requires a call to the `RockControlHelper.Init()` method in the constructor of your custom control. This initializes the state of the control and creates some necessary internal components.

```
protected override void OnInit( System.EventArgs e )
{
    EnsureChildControls();
    base.OnInit( e );

    _ShowCountrySelection = GlobalAttributesCache.Get().GetValue( "SupportInternationalAddresses" ).AsBooleanOrNull() ?? false;

    BindCountries();
}
```

The second step is to call `RockControlHelper.CreateChildControls()` method from the `CreateChildControls()` method of your control. This will initialize child controls for the standard Rock elements you have specified in the `RequiredFieldValidator`, `HelpBlock`, and `WarningBlock` elements.

The following code sample shows how this is implemented in the `AddressControl` component.

```
protected override void CreateChildControls()
{
    base.CreateChildControls();
    Controls.Clear();
    RockControlHelper.CreateChildControls( this, Controls );

…
(additional custom code)
…
}
```

### Rendering the Control

The next step is to override the default Render method of your control to call the `RockControlHelper.RenderControl()` method. This allows `RockControlHelper` to assume control of the rendering process, formatting the appearance and layout of the control container and adding any linked labels, glyphs and validation controls as needed.

The implementation of this step for the `AddressControl` is shown below.

```
public override void RenderControl( HtmlTextWriter writer )
{
    if ( this.Visible )
    {
        RockControlHelper.RenderControl( this, writer );
    }
}
```

While executing the `RenderControl()` action, `RockControlHelper` calls the `RenderBaseControl()` method of your control to render custom elements. The content of this callback method should be identical to the code that would otherwise be placed in the `RenderControl()` method for a standard ASP.NET Web Forms control.

### Validating Input

If your control requires any form of input validation, it needs to be synchronized with the block-level and page-level validation in the Rock presentation layer to be effective. There are several properties that are relevant in this scenario, and each of these is explained below.

#### Required Fields

The `Required` property allows users of your control to specify if it must have a value when the containing form is submitted.

The `RequiredFieldValidator` property gets or sets the Web Forms validator object that is responsible for determining if your custom control has content. The default setting uses the standard Web Forms `RequiredFieldValidator`, which performs a simple check to determine if the control has a non-default value. If your needs are more complex, you can replace this with a custom validator.

The `RequiredErrorMessage` property gets or sets the message that is displayed if the `Required` property is set to true and the control has the initial default value when it is validated.

#### Validation Group

The `ValidationGroup` property gets or sets the name of the set of controls to which this control belongs for the purposes of validating input. This property operates in the same way as the standard ASP.NET property. When your control is added to a Rock Block, the validation group is automatically assigned to a unique value for the instance of the block, to ensure that controls in the block are validated together when the block content is submitted. It’s important to note that if your custom control comprises a collection of other controls that rely on the ASP.NET validation mechanism, these controls should all have the same `ValidationGroup` setting. A sample implementation of this setting for the `AddressControl` is shown below.

```
public string ValidationGroup
{
    get
    {
        EnsureChildControls();

        return _tbStreet1.ValidationGroup;
    }

    set
    {
        EnsureChildControls();

        CustomValidator.ValidationGroup = value;

        if ( this.RequiredFieldValidator != null )
        {
            this.RequiredFieldValidator.ValidationGroup = value;
        }

        _tbStreet1.ValidationGroup = value;
        _tbStreet2.ValidationGroup = value;
        _tbCity.ValidationGroup = value;
…
    }
}
```

#### Client vs Server Validation

As is the case with all Web Forms controls, validation of your control can occur in two places – in the client browser during data-entry, and on the web server when the page is submitted. Server-side validation is critical to ensure that faulty or malicious data is not processed by the Rock application. Client-side validation can be added to your control to improve the user experience, but it should never be considered as a substitute for server-side validation because it can be bypassed in situations where client-side JavaScript is disabled.

The `AddressControl` implements a custom validator that performs both client-side and server-side validation to determine if the control content represents a valid address. This validator is initialized in the `CreateChildControls()` method.

```
protected override void CreateChildControls()
{
    base.CreateChildControls();
    Controls.Clear();
    RockControlHelper.CreateChildControls( this, Controls );

…

    // Add custom validator
    CustomValidator = new CustomValidator();
    CustomValidator.ID = this.ID + "_cfv";
    CustomValidator.ClientValidationFunction = "Rock.controls.addressControl.clientValidate";
    CustomValidator.CssClass = "validation-error help-inline";
    CustomValidator.Enabled = true;
    CustomValidator.Display = ValidatorDisplay.Dynamic;

    CustomValidator.ServerValidate += _CustomValidator_ServerValidate;
    Controls.Add( CustomValidator );
}
```

#### Client-Side Validation

The standard Web Forms validator components add client-side validation by injecting JavaScript into the page on which they are sited. You can also add custom JavaScript to perform more complex validation as necessary for your control.

The `AddressControl` references a validation function that is part of the Rock JavaScript library to implement client-side validation by setting the `CustomValidator.ClientValidateFunction` property. This function is called when the user submits the web form on which the control is sited, before the page is sent to the server.

#### Server-Side Validation

The `IsValid` property returns the current validation state of your control. When the containing page is submitted to the server, the `Page.Validate()` method is called to evaluate the `IsValid` property of all controls on the page and determine the final validation state, indicated by the `Page.IsValid` property.

The `AddressControl` implements a custom validator that performs server-side validation to determine if the control content represents a valid address. The validation is implemented by specifying an event handler for the `CustomValidator.ServerValidate()` action. This event is triggered when server-side page validation occurs, and the corresponding code evaluates the address fields and sets a flag indicating if the validation is successful.

```
private void _CustomValidator_ServerValidate( object source, ServerValidateEventArgs args )
{
    if ( !this.HasValue && !this.Required )
    {
        return;
    }

    var editedLocation = new Location();

    this.GetValues( editedLocation );

    var locationService = new LocationService( new RockContext() );
    string validationMessage;
    var isValid = locationService.ValidateAddressRequirements( editedLocation, out validationMessage );

    if ( !isValid )
    {
        var _addressRequirementsValidator = source as CustomValidator;
        _addressRequirementsValidator.ErrorMessage = validationMessage;
        args.IsValid = false;
        return;
    }
}
```

#### Other Notes

Note

Required Indicator - If you need the required indicator, you have to wrap a div form-group around those controls. Example. https://github.com/SparkDevNetwork/Rock/blob/f7502080c6f1a6f9a8adffad3fee2b0b8c50678c/RockWeb/Blocks/Finance/TransactionEntryV2.ascx#L141

Note

Custom Message - If you want a different error message, see this example. For controls that don't have a label, or you want a different error message than the label text, you can set the Validator control's ErrorMessage property. If it is set, RockControlHelper will use that instead.  

## Custom Following Event Type

Rock allows for extensibility with the types of events you can follow. When you follow some entity, like a Person, you can receive notifications regarding significant moments for them. Most of the Follow Events are based around a specific date that is significant to a Person record. If you are following Ted Decker, then you are likely interested in important moments in his life. His birthday or his anniversary would have an event date, and Rock can notify you when that day is approaching.

In addition, Rock can use Follow Events to inform you that other changes have occurred to a person or entity, such as a specific Note Type was added to Ted’s timeline.

As a demonstration, we will make a Following Event to notify followers of the anniversary of the followees’ first visit.

```
namespace org.rocksolidchurch.Follow.Event
{
	[Description( "Person First Visit" )]
	[Export( typeof( EventComponent ) )]
	[ExportMetadata( "ComponentName", "PersonFirstVisit" )]
	[IntegerField( "Lead Days",
    	Description = "The number of days prior to first visit anniversary that notification should be sent.",
    	IsRequired = false,
    	DefaultIntegerValue = 5,
    	Category = "",
    	Order = 0 )]
	public class PersonFirstVisit : EventComponent
	{
	}
}
```

To create a new Follow Event that we can use, create a class that extends the `EventComponent` base. Include an Integer Field Attribute for "lead days" to give the follower some time to contact the followed person.

You will need to set the FollowedType entity so that the Follow Event knows what type of entity the follower is following. We will use the type “PersonAlias” since we can access Person attributes from that type.

```
public override Type FollowedType
{
    get { return typeof( Rock.Model.PersonAlias ); }
}
```

The `HasEventHappened()` method needs to determine if the event has happened solely based on the given instance of the event type (`FollowingEventType followingEvent`), the given person being followed (`IEntity entity`) and the given date when the follower was last notified (`DateTime lastNotified`).

```
public override bool HasEventHappened( FollowingEventType followingEvent, IEntity entity, DateTime? lastNotified )
{
…
}
```

In this method, we check the validity of the parameters, and cast our entity as the PersonAlias type we specified in the FollowingType method.

```
if ( followingEvent != null && entity != null )
  {
  	var personAlias = entity as PersonAlias;
  	if ( personAlias != null && personAlias.Person != null )
  	{
 	    var person = personAlias.Person;
 	    DateTime? firstVisit = person.GetAttributeValue( "FirstVisit" ).AsDateTime();
...
```

We are also getting a possible DateTime from the Person Attribute “FirstVisit”. If it has a value, we can proceed to see if it’s upcoming or the follower has already been notified recently.

Here is the logic we will use to determine if the First Visit has an upcoming anniversary. If there is a value to this nullable DateTime, then proceed.

```
if ( firstVisit.HasValue )
{
	int leadDays = GetAttributeValue( followingEvent, "LeadDays" ).AsInteger();
```

Now we can set a local int value for the “Lead Days” attribute we created above.

```
int leadDays = GetAttributeValue( followingEvent, "LeadDays" ).AsInteger();
 
var today = RockDateTime.Today;
var thisYearAnniversary = RockDateTime.New( today.Year, firstVisit.Value.Month, firstVisit.Value.Day );
 
// If this year's anniversary is greater than (later) or the same as today, set that as the first visit anniversary.
// Otherwise, set the first visit anniversary as a year ahead of this year's anniversary.
var firstVisitAnniversary = thisYearAnniversary >= today ? thisYearAnniversary : thisYearAnniversary.Value.AddYears(1);
var processDate = today;
```

Our firstVisitAnniversary value contains the date of the followee’s next “first visit” anniversary. Now, we will use logic to make sure that weekend event dates can get notifications before they happen using the date we will set as “processDate”.

```
if ( !followingEvent.SendOnWeekends && firstVisitAnniversary.Value.Date != today )
{
    switch ( today.DayOfWeek )
    {
    	case DayOfWeek.Friday:
        	leadDays += 2;
        	break;
    	case DayOfWeek.Saturday:
        	processDate = processDate.AddDays( -1 );
        	leadDays += 2;
            break;
    	case DayOfWeek.Sunday:
        	processDate = processDate.AddDays( -2 );
        	leadDays += 2;
        	break;
    }
}
```

We can determine if the first visit anniversary date is within the range of lead days and if the follower has been notified regarding this date.

```
if ( ( firstVisitAnniversary.Value.Subtract( processDate ).Days <= leadDays ) &&
    ( !lastNotified.HasValue || firstVisitAnniversary.Value.Subtract( lastNotified.Value.Date ).Days > leadDays ) )
{
    // If leadDays is greater than zero, ignore any first visit anniversaries for today
    if ( leadDays > 0 && firstVisitAnniversary.Value.Date == RockDateTime.Today )
    {
    	return false;
    }
 
    return true;
}
```

The final part is the `FormatEntityNotification` method. This formats the notification to the follower based on the Following Event. The `EventComponent` class has a base method that passes the followee's PersonAlias as "Entity" to a Lava merge field before calling ResolveMergeFields on the FollowingEvent’s EntityNotificationFormatLava property. If you need to do something custom with your notification, you will need to override this method to handle your specific cases (see the `PersonNoteAdded` event type for an example of this).

Now that your Follow Event class is done, you need to create a Following Event Type record. Navigate to Admin -\> System Settings -\> Following Events.

Add a new Following Event and write a clear name and description for your event.

When you choose an “Event Type” from the control, the related attributes for the Following Event will be displayed. In our example, this means the “Lead Days” integer field.

You will need to include some notification content so that followers receive pertinent information related to the followed person’s first visit anniversary. Here is sample HTML / Lava for the EntityNotificationFormatLava property.

```
<tr>
	<td style='padding-bottom: 12px; padding-right: 12px; min-width: 87px;'>
    	{% if Entity.Person.PhotoId %}
        	<img src='{{ 'Global' | Attribute:'PublicApplicationRoot' }}GetImage.ashx?id={{ Entity.Person.PhotoId }}&maxwidth=75&maxheight=75'/>
    	{% endif %}
	</td>
	<td valign="top" style='padding-bottom: 12px; min-width: 300px;'>
    	<strong><a href="{{ 'Global' | Attribute:'PublicApplicationRoot' }}Person/{{ Entity.PersonId }}">{{ Entity.Person.FullName }}</a> has a
 	   first visit anniversary on {{ Entity.Person | Attribute:'FirstVisit' | Date:'MMMM d' }} </strong><br />
    	{% if Entity.Person.Email != empty %}
        	Email: <a href="mailto:{{ Entity.Person.Email }}">{{ Entity.Person.Email }}</a><br />
 	   {% endif %}
	</td>
</tr>
```

Note that the email content will include the month and day of the “First Visit” anniversary with Lava.

Each person that wants to receive a notification for a Following Event will need to go to My Settings -\> Following Settings and check the box for the desired Following Event.

## Custom Payment Gateways

Rock can be integrated with external payment systems in a few ways, but for now, only one of them is going to be documented here, the `IRedirectionGateway`. To understand the others you’ll have to read the code and do a little reverse engineering.

### IRedirectionGatewayComponent Type

Starting with Rock v13, there is a new *experimental* gateway interface called `IRedirectionGatewayComponent` which is compatible with the new Obsidian based Event Registration block (aka Registration Entry or `Rock.Blocks\Event\RegistrationEntry.cs`).

At a very high level, the block and component work together to send (redirect) the individual making the payment over to an external system where payment is made, before redirecting the person back to the Rock page where the \[new\] Registration Entry block exists.

![](https://community.rockrms.com/GetImage.ashx?Id=66724)

What happens on the external Payment System depends on each particular system, but there are particular things that must be passed back or forth between the two systems used to verify/validate the payment was made. There are two methods the gateway component must implement which correspond to the two steps illustrated above, `GetPaymentRedirectUrl()` and then `TryGetPaymentTokenFromParameters()` along with `FetchPaymentTokenTransaction()`.

#### GetPaymentRedirectURL(...)

This method takes a few parameters and must return a URL that Rock should redirect to in order to collect the payment details. The fundId (optional) is the value that was set on the RegistrationInstance.ExternalGatewayFundId.

```
string GetPaymentRedirectUrl( int? fundId, decimal amount, string returnUrl, Dictionary<string, string> metadata );
```

The returnUrl string will contain the direct return URL. This will contain all the information needed for the block to pick up where it left off. If you are unable to use this string for some reason then the metadata will contain a “ReturnToken” value that can be placed in any query string value and allow the block to pick up where it left off.

The metadata Dictionary will hold the following key : values:

- "FirstName" : registrar.NickName
- "LastName" : registrar.LastName
- "EmailAddress" : registrar.Email
- “ReturnToken”: special query string token

If the request is coming from the event registration block then it will also contain these metadata pairs:

- "RegistrationSessionGuid" : registrationSessionGuid.ToString()
- "Note" : "Event registration for {context.RegistrationSettings.Name} for {registrantNames} by {registrarName}"

#### TryGetPaymentTokenFromParameters(...)

This method takes the page parameters and is responsible for determining if those page parameters contain a payment token, as well as returning the payment token:

```
bool TryGetPaymentTokenFromParameters( FinancialGateway financialGateway, IDictionary<string, string> parameters, out string paymentToken );
```

When called, the “parameters” will contain the query string parameters that need to be checked. If the parameters match what you expect to be included in a payment redirect response then you must return true and set the “paymentToken” parameter. The paymentToken will be passed later to the FetchPaymentTokenTransaction() method.

#### FetchPaymentTokenTransaction(...)

This method takes a rockContext and other parameters and is responsible for creating an unsaved Rock financial transaction for the payment:

```
FinancialTransaction FetchPaymentTokenTransaction( RockContext rockContext, FinancialGateway financialGateway, int? fundId, string paymentToken );
```

It is expected that the component’s code would make an API call back to the payment system for the given paymentToken in order to build the needed transaction it must return. *(NOTE: The RegistrationEntry block will perform the* *save* *on the transaction and tie it to the registration record.)* It might also be common for the component to store the given paymentToken in the transaction’s ForeignKey field, however that is left to the implementer to decide what to do with the paymentToken.

Once a registration is complete and the payment received, the TBD.

There are a couple additional methods that you must implement in your gateway as well, though they are not involved in the actual redirect process: `IsPaymentTokenCharged()` and `CreateCustomerAccount()`.

#### IsPaymentTokenCharged(...)

This method is responsible for determining if the payment token represents a payment that has been fully charged or is in a pending state.

```
bool IsPaymentTokenCharged( FinancialGateway financialGateway, string paymentToken );
```

Specifically, this is used by the block(s) to determine what happens if an error prevents them from saving all the data. If something goes wrong and this method returns true, then the payment will be refunded.

#### CreateCustomerAccount(...)

This method is used to create a customer account, if your gateway supports such functionality.

```
string CreateCustomeraccount( FinancialGateway financialGateway, ReferencePaymentInfo paymentInfo, out string errorMessage );
```

If you support such functionality, you must create a customer account and then return the identifier for that account. If you do not support any customer accounts you can simply return null instead.

#### Registration Template and Registration Instance Configuration

When a Rock RegistrationTemplate is configured to use an `IRedirectionGateway`, the Registration Instance will provide two additional configuration options: a Merchant dropdown and a Fund dropdown.

![](https://community.rockrms.com/GetImage.ashx?Id=66725)

It is up to the `IRedirectionGatewayComponent` to return meaningful key value pairs used by the Registration Instance Detail block for both of these fields. Although both selected values will be stored on the RegistrationInstance, only the `fundId` is passed to the component during the two method events described above. NOTE: The “values” in the key value pair must be integers since they will be stored on the `ExternalGatewayMerchantId` and `ExternalGatewayFundId` respectively.

### IObsidianHostedGatewayComponent

Starting with Rock v13, there is a new *experimental* gateway interface called `IObsidianHostedGatewayComponent` which is compatible with the new Obsidian based Event Registration block (aka Registration Entry or `Rock.Blocks\Event\RegistrationEntry.cs`).

At a very high level, the block and component work together to ask the user for payment information without leaving your site. This is usually performed via iframes so that the payment information (for example, credit cards) is never entered directly into your site. This simplifies PCI compliance. The information is then tokenized by the remote gateway and the token sent back to Rock to confirm payment.

In addition to the C# gateway that must be provided to Rock as a plug-in, you must also provide an Obsidian control to handle the user interface. This control is responsible for emitting the payment token back to the block which will then pass it over to Rock (and your C# gateway) to finalize processing.

The C# gateway must implement the IObsidianHostedGatewayComponent interface which contains the following methods:

#### GetObsidianControlFileUrl(...)

This method is responsible for returning the URL path to the JavaScript file that implements the Obsidian control.

```
string GetObsidianControlFileUrl( FinancialGateway financialGateway );
```

The return value should contain a string with a valid URL to the Obsidian control file. This control is responsible for displaying the UI and passing the token back up to the parent control. The control will be passed the following properties:

- “settings”: This contains whatever you return from the GetObsidianControlSettings() method.
- “amount”: The amount that needs to be charged to the payment method.
- “returnUrl”: The URL that should be used to return to the page if your control needs to redirect the user to another site to complete payment.

Your control can emit the following events:

- “success”: Indicates a successful submission, value is a string that contains the payment token.
- “validation”: Indicates a validation error occurred, value is a Record whose keys are the field names and values are the validation messages to display.
- “error”: Indicates a serious error that prevents the gateway from functioning.

Finally, your Obsidian control must use the “onSubmitPayment” function exported from the gatewayControl control. This function takes a callback that will then be called when the individual clicks the Pay button on the page and is your trigger to attempt to convert the payment information into a token.

#### GetObsidianControlSettings(...)

As mentioned above, this method provides an object that will be made available to your Obsidian control.

```
object GetObsidianControlSettings( FinancialGateway financialGateway, HostedPaymentInfoControlOptions options );
```

Whatever you return from this method will be passed to the “settings” property of your Obsidian control. There is no defined structure.

#### TryGetPaymentTokenFromParameters(...)

Even though an Obsidian hosted gateway is not primarily meant for redirection, it does support it. Some payment systems will *conditionally* redirect the user to verify payment. If your system always redirects the user then you should consider implementing IRedirectingGatewayComponent instead. If it will only redirect in some cases then you can implement IObsidianHostedGatewayComponent instead.

See discussion in IRedirectingGatewayComponent.

#### FetchPaymentTokenTransaction(...)

See discussion in IRedirectingGatewayComponent.

#### CreateCustomerAccount(...)

See discussion in IRedirectingGatewayComponent.

#### IsPaymenttokenCharged(...)

See discussion in IRedirectingGatewayComponent.
