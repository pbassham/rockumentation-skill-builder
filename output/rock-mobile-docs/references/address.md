> **Path:** Mobile Docs > 🧱 Essentials > Controls > Form Fields > Address

# Address

*Inherits from FieldStack*

This view provides a field that allows the user to enter an address, or display an address to be updated. Because it has to account for international addresses very little validation is performed.

### Properties

| Property | Type | Description |
| --- | --- | --- |
| Label | string | The title for this input field. |
| IsRequired | bool | If set to true then the user will need to enter a value. |
| SelectedAddress | MobileAddress | Contains the address as entered by the user. Valid child properties are: Street1, City, State, PostalCode, Country. |

Important

The Address field is one of the few fields that should not be displayed in a [FieldContainer](https://mobiledocs.rockrms.com/essentials/controls/content-controls/field-container) that is forced into grouped mode. It is itself a grouped view so if you try to embed it inside another grouped view then you end up with double padding and double borders.  

### Example

```
<Rock:FieldContainer>
    <Rock:Address Label="Rock Address" IsRequired="false" />
</Rock:FieldContainer>
```

![](https://community.rockrms.com/GetImage.ashx?Id=67190)

If you need to provide a default address to be displayed when the view is rendered, you can do so as follows:

```
<Rock:FieldContainer>
    <Rock:Address Title="Rock Address" IsRequired="false">
        <Rock:Address.SelectedAddress>
            <Common:MobileAddress Street1="1885 Lost Ln"
                                  City="Knowhere"
                                  State="CA"
                                  PostalCode="92710"
                                  Country="USA" />
        </Rock:Address.SelectedAddress>
    </Rock:Address>
</Rock:FieldContainer>
```
