---
description: "Use when implementing person columns in Rock grids to display formatted person information with name, avatar, and optional details"
source: "https://community.rockrms.com/developer/obsidian"
sourceLabel: Obsidian
---
> **Path:** 

Displays a cell as a Person. This has a few options to control the formatting, but generally follows a standard layout so different grids with person columns all look the same.

## Example

```
<PersonColumn name="requestedBy"
              title="Requested By"
              field="requestedBy"
              detailField="phoneNumber"
              showAsLink />
```

Note

This requires that the field be added to the grid with the `.AddPersonField()` method so that all the required values are available.  

![](https://community.rockrms.com/GetImage.ashx?Id=66793)

## Properties

Example of standard PersonColumn

This column provides default values for the following standard properties:

- formatComponent
- skeletonComponent
- quickFilterValue
- exportValue
- sortValue

Type: string, boolean Required: false

### detailField

If `detailField` is not specified, then it displays the Person's connection status. If `detailField` is passed a property string value from props.row, then it will display that text value. If `detailField` is `false`, then it will display nothing in that area.

### hideAvatar

Type: boolean  
Default: false

If `true` then the avatar image will not be shown.

### alwaysShowAvatar v18.3

Type: boolean  
Default: false

By default, the avatar image is hidden on smaller screens. Set this to `true` to always display the avatar, regardless of screen size.

### showLastNameFirst

Type: boolean  
Default: false

Normally the column will display the nick name first, such as "Ted Decker". If this is set to `true` then it will show the last name first, such as "Decker, Ted".

### showAsLink

Type: boolean  
Default: false

If `true` then the person will be displayed as a hyperlink to the person detail page. No checking is performed if the current individual has access to that page. (v17 only)

### enableHoverInfo

Type: boolean  
Default: false

If `true` then when hovering over the avatar will show a popover with some additional information about the person:

![](https://community.rockrms.com/GetImage.ashx?Id=66792)

---

## NumberColumn {#numbercolumn}

Displays the cell value as a formatted number. This uses the browsers current locale to format the number with thousands and decimal separators.

## Example

```
<NumberColumn name="quantity"
              title="Quantity"
              field="quantity" />
```

## Properties

This column provides default values for the following standard properties:

- formatComponent
- skeletonComponent
- exportValue

This column does not define any additional properties.

---

## ReorderColumn {#reordercolumn}

Displays a standard re-order cell that can be used by the individual to drag and drop the row to change the order in the list.

## Example

```
<ReorderColumn />
```

## Properties

This column provides default values for the following standard properties:

- name
- formatComponent
- headerClass
- itemClass
- width

## onOrderChanged

Type: (item: Record<string, unknown\>, beforeItem: Record<string, unknown\> | null): (void | Promise<void\> | boolean | Promise<boolean\>)  
Optional

Called when the order of an item has changed. The first parameter is the row item that was moved. The second parameter is the row item it was dropped in front of or `null` if it was dropped at the end of the grid. The grid rows will already be updated when this is called so you only need to handle any additional logic, such as updating the database.

If `false` is returned then the the re-order operation is aborted. If a Promise is returned then the grid will wait until it is resolved before allowing another re-order operation.

---

## RockFieldColumn {#rockfieldcolumn}

Allows a single rock field value to be displayed. This is a special column and should be considered internal to Rock and not used by plugins.

## Examples

```
<AttributeColumn name="customAttrib"
                 title="Custom Attribute"
                 field="customAttrib" />
```

## Properties

This column provides default values for the following standard properties:

- formatComponent
- exportValue

## attribute

Type: PublicAttributeBag  
Required

Defines the attribute that represents this column. It will be used to format the value for display.

---

## SecurityColumn {#securitycolumn}

Displays a security button that will open the standard Security editor modal for the item.

## Example

```
<SecurityColumn />
```

## Properties

  
This column provides default values for the following standard properties:

- name
- formatComponent
- headerClass
- itemClass
- width

Type: string | ((row: Record<string, unknown\>, grid: IGridState) =\> string)  
Optional

### itemTitle

Type: string | ((row: Record<string, unknown\>, grid: IGridState) =\> string)  
Optional

The row item title to use when opening the security dialog. If a plain string is provided it is the field name that contains the item name. Otherwise it is a function that will be called with the row and grid state and must return a string.

### disabledField

Type: strin  
Default: "isSecurityDisabled"

The field to use to determine if the security button for a single row should be disabled. If the value of this field is `true` then the security button will be disabled.

---

## SelectColumn {#selectcolumn}

Displays a checkbox that can be used to select the row for bulk operations performed by grid actions.

## Example

```
<SelectColumn />
```

## Properties

This column provides default values for the following standard properties:

- name
- formatComponent
- headerComponent
- headerClass
- itemClass
- width

This column does not define any additional properties.

---

## TextColumn {#textcolumn}

Displays a simple column that will render a plain text string in the cell.

## Example

```
<TextColumn name="description"
            title="Description"
            field="description" />
```

## Properties

This column provides default values for the following standard properties:

- formatComponent
- skeletonComponent
- exportValue

This column does not define any additional properties.

---

## Filters {#filters}

There are a number of standard filters that can be used with columns. Custom filters can also be created. These consist of a Component that is displayed in the popup which builds the "filter value" and a function that will be passed each row and the "filter value" to determine if the row matches.

| Filter | Description |
| --- | --- |
| booleanValueFilter | A column filter that can be used with boolean values. |
| dateValueFilter | A column filter that can be used with date values. |
| numberValueFilter | A column filter that can be used with numeric values. |
| textValueFilter | A column filter that performs simple substring matching. |
| pickExistingValueFilter | A column filter that can displays unique value and let's the individual pick one or more values to use in filtering. |
