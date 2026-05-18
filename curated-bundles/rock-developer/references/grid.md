---
description: "Use when configuring grid column properties, data binding, and feature settings like sticky headers, live updates, and entity type identification"
source: "https://community.rockrms.com/developer/obsidian"
sourceLabel: Obsidian
---
> **Path:** 

## Properties

**Data**

Type: GridData | Promise<GridDataBag\>  
Required

The data to be displayed in the grid. This may either be an object that contains the grid data directly or a function that returns the grid data. The function may return a Promise which will be waited asynchronously until the data is ready.

**Definition**

Type: GridDefinitionBag

Contains the definition data about the grid. This contains information about the fields, action URLS and other features of the grid.

**keyField**

Type: string

Identifies the field that will be used to uniquely identify each row. This is not required but many advanced features of the grid require this to function.

**personKeyField**

Type: string

Identifies the field that will contain the person key. If the grid does not represent Person records then leave this unset.

**communicationRecipientPersonKeyFields**

Type: string\[\]

Specifies the fields to be used to identify communication recipients when using the communicate action. This will take precedence over the personKeyField if both are set.

**tooltipField**

Type: string

Identifies the key that will be used to provide the tooltip text for each row in the Grid. This property is not reactive.

**light**

Type: boolean  
Default: false

Indicates that this grid should operate in light mode which disables a number of features. This is intended to be used with small grids that are embedded inside other blocks or controls.

**liveUpdates**

Type: boolean  
Default: false

Determines if the grid will monitor for changes in the data of existing rows, new rows and removed rows. Should not be used for grids with more than 10,000 rows. This property is not reactive.

**stickyHeader**

Type: boolean  
Default: false

If enabled then the grid will have a sticky header.

**itemTerm**

Type: string  
Optional

The term that identifies individual rows in the grid. This property is not reactive. If not specified it will default to "item". This value should be singular and not plural.

**entityTypeGuid**

Type: Guid  
Optional

**exportTitle**

The unique identifier of the entity type that the rows represent.

**personAsBusiness**

Type: string  
Optional

The title to use when exporting the grid contents. This is used as the exported filename as well as some other information inside the export file. If not specified it will default to the itemTerm property.

**mergeTemplateAsPerson**

Type: boolean  
Default: false

If `true`, then any Person operations will instead be Business operations.

**showBulkUpdate**

Type: boolean  
Default: false

If `true`, then the merge template operation will operate as if the records are Person records. If they are not then it will not work correctly. This required that personKeyField also be set.

**showPersonMerge**

Type: boolean  
Optional

Determines if the bulk update action will be available. If not explicitly set then it will default to enabled if the personKeyField property has been set.

**showLaunchWorkflow**

Type: boolean  
Optional

Determines if the merge person/business action will be available. If not explicitly set then it will default to enabled if the personKeyField property has been set.

**showCommunicate**

Type: boolean  
Optional

Determines if the launch workflow action will be available. If not explicitly set then it will default to enabled if the entityTypeGuid and keyField properties have been set.

**showMergeTemplate**

Type: boolean  
Optional

Determines if the communicate action will be available. If not explicitly set then it will default to enabled if either the personKeyField or communicationRecipientPersonKeyFields properties have been set.

**showExport**

Type: boolean  
Optional

Determines if the merge template action will be available. If not explicitly set then it will default to being shown. In the future this default state might change.

**communicationMergeFields**

Type: boolean  
Optional

Determines if the export action will be available. If not explicitly set then it will default to being shown. In the future this default state might change.

**expectedRowCount**

Type: string\[\]  
Optional

Any fields that should be included when sending a communication. If a column name matches the field name then the formatted value of the column will be used. Otherwise the raw field value will be used.

**customActions**

Type: number  
Optional

The number of rows expected to fill the table. This does not need to be anywhere close to the real number. It is used to determine optimization settings and calculate how many skeleton rows to display while loading.

**preferencePrefix**

Type: GridAction\[\]  
Optional

Any custom actions that should be available for the individual to see in the list of actions.

**disabledPreferences**

Type: string  
Optional

The custom prefix to use when accessing person preferences related to the grid. This prefix is appended to the standard prefix used by the grid. This property is not reactive.

**gridSettings**

Type: boolean  
Default: false

When `true`, all preferences will be disabled on the grid. Preferences will not be read nor will they be saved. This property is not reactive.

**gridSettingsActive**

Type: boolean  
Default: false

When `true`, a grid settings icon will be displayed and emit the `gridSettingsClick` event when clicked.

**gridSettingsActive**

Type: boolean  
Default: false

When `true`, the grid settings icon will be displayed in an active state. When `false`, the grid settings icon will be displayed in an in-active state.

**onAddItem**

Type: () =\> void | Promise<void\>  
Optional

The function to call in response to the add button being clicked. Providing this function will automatically enable the add button.

**onSelectItem**

Type: (key: string) =\> void | Promise<void\>  
Optional

The function to call in response to a row being clicked. This requires that an keyField be specified. Providing this function will automatically enable row selection.

---

## Columns {#columns}

# Columns

---

## Standard Columns {#standard-columns}

Documents the standard properties and templates available on most columns.

## Properties

| Property | Type | Default / Optional | Description |
| --- | --- | --- | --- |
| name | string | Default: "" | The unique name that identifies this column in the grid. |
| title | string | Optional | The title of the column, this is displayed in the table header. |
| field | string | Optional | The name of the field on the row that will contain the data. Used by default columns and other features to automatically display the data. If building a completely custom column it is not required. |
| quickFilterValue | Function \| string | Optional | Overrides the default method of obtaining the value to use when matching against the quick filter. Accepts a function or a Lava template string. |
| sortField | string | Optional | Field name to use when sorting. Defaults to value from field if not specified. Column must have a title to be sortable. |
| sortValue | Function \| string | Optional | Overrides sortField with a custom sort value, either via function or Lava template. |
| filter | Object | Optional | Enables filtering of this column and specifies the type of filtering to apply. |
| filterValue | Function \| string | Optional | Used in conjunction with filter, defines how to derive filter value via function or Lava template. |
| exportValue | Function \| string | Optional | Function or Lava template used for exporting the cell's data. Defaults to format template if not provided. |
| headerClass | string | Optional | Additional CSS class for the header cell. |
| itemClass | string | Optional | Additional CSS class for the data item cell. |
| formatComponent | Component | Optional | Custom component to format and display the cell. Rarely needed if body template is used. |
| condensedComponent | Component | Optional | Custom component to format the cell in condensed views. Falls back to formatComponent if not defined. |
| headerComponent | Component | Optional | Custom component for rendering the header. Rarely needed if header template is used. |
| skeletonComponent | Component | Optional | Custom component used during loading phase. Rarely needed if skeleton template is defined. |
| hideOnScreen | boolean | Default: false | Hides the column from visual display but retains inclusion in exports or processing. |
| excludeFromExport | boolean | Default: false | Excludes this column from export operations. |
| visiblePriority | "xs" \| "sm" \| ... \| "xl" | Default: "xs" | Defines the minimum screen size for the column to appear. |
| width | string | Optional | Width of column as percentage (e.g., "30%") or fixed pixels. Used to compute relative column widths. |
| disableSort | boolean | Default: false | Disables the built-in sorting feature for this column. |
| tooltip | Function \| string | Optional | Specifies the source of the tooltip text for each cell in this column. A string represents the name of a field in the row to pull the text from. If a function is specified it will be called with the row data and should return the tooltip text. |
| tooltipHtml | boolean | Default: false | If false then the tooltip text will be automatically escaped to make it HTML safe. Otherwise it is expected to contain HTML and should have any plain text strings pre-escaped. |

## Templates

| Template | row | column | grid | Description |
| --- | --- | --- | --- | --- |
| format | row: Record<string, unknown\> - The row to be displayed. | column: ColumnDefinition - The definition details about the column being displayed. | grid: IGridState - Details about the current state of the grid. | This template allows defining how the cell will be rendered on screen. Defining this template will override the formatComponent property. |
| condensed | row: Record<string, unknown\> - The row to be displayed. | column: ColumnDefinition - The definition details about the column being displayed. | grid: IGridState - Details about the current state of the grid. | This template allows defining how the cell should be rendered when it needs to be displayed in a condensed format. Additional information that is normally displayed, but not strictly required, should be excluded. For example, a cell that normally displays a person photo and their name might display just their name in condensed mode. Defining this template will override the condensedComponent property. |
| header | N/A | column: ColumnDefinition - The definition details about the column being displayed. | grid: IGridState - Details about the current state of the grid. | This template allows defining the way the header cell will be displayed. Defining this template will override the headerComponent property. |
| filterPrepend | N/A | column: ColumnDefinition - The definition details about the column being displayed. | grid: IGridState - Details about the current state of the grid. | This template allows defining content that will be displayed inside the column filter popup. It will be displayed above the actual filter component. |
| export | row: Record<string, unknown\> - The row to be displayed. | column: ColumnDefinition - The definition details about the column being displayed. | grid: IGridState - Details about the current state of the grid. | This template allows defining text content that will be used when exporting cells to CSV or Excel. If the property exportValue is defined it will override this template (for performance reasons). |
| skeleton | N/A | column: ColumnDefinition - The definition details about the column being displayed. | grid: IGridState - Details about the current state of the grid. | This template allows defining the way the skeleton cell will be displayed while waiting for grid data to load. Defining this template will override the skeletonComponent property. |

---

## AttributeColumns {#attributecolumns}

This is a special placeholder column that informs the grid where to place dynamic columns that will hold the entity attribute values.

## Example

```
<AttributeColumns :attributes="attributeFields" />
```

## Attributes

This column does not inherit any of the standard column properties.

| Property | Type | Default | Description |
| --- | --- | --- | --- |
| attributes | AttributeFieldDefinitionBag\[\] | \[\] | A collection of objects that define the attributes that will be displayed in the grid. |
| \_\_attributeColumns | boolean | true | (No description provided in source content) |
| filter | ColumnFilter | { component: PickExistingFilter, matches: pickExistingFilterMatches } | The filter component to used for filtering these attributes. |
| skeletonComponent | Component | TextSkeletonCell | The skeleton that will be used while the grid contents are still being loaded. |

---

## BooleanColumn {#booleancolumn}

Displays a boolean value as a checkmark if the value is `true`, otherwise the cell is blank.

## Example

```
<BooleanColumn name="isSystem"
               title="Is System"
               field="isSystem"
               visiblePriority="xs" />
```

## Properties

This column provides default values for the following standard properties:

- formatComponent
- exportValue

This column defines no additional properties.

---

## ButtonColumn {#buttoncolumn}

A column that displays a single button with an icon on it.

## Example

```
<ButtonColumn name="customAction"
              iconClass="fa fa-lightbulb"
              @click="onCustomAction" />
```

## Properties

This column provides default values for the following standard properties:

- headerClass
- itemClass
- width
- formatComponent

## action

Type: (key: string, grid: IGridState) =\> (void | Promise<void\>) Required

Called when the button has been clicked.

## iconClass

Type: string Required

The icon CSS class to use as the content for the button.

---

## Column {#column}

A generic column definition that can be used to display custom information in the cell.

```
<Column name="firstName" title="First Name">
    <template #format="{ row }">
        <div><strong>{{ row.firstName }}</strong></div>
    </template>
</Column>
```

## Properties

This column defines no additional properties.

---

## CopyColumn {#copycolumn}

Displays a copy button and places a string of text onto the browser clipboard when the button is clicked. By default this will get a string from the field specified by the `field` property.

## Example

```
<CopyColumn :field="linkUrl" />
```

## Properties

This column provides default values for the following standard properties:

- headerClass
- itemClass
- width
- name
- formatComponent

## valueToCopy

Type: (row: Record<string, unknown\>, column: ColumnDefinition, grid: IGridState) =\> string Optional

Specifies the function that will be called to get the value to place on the clipboard. If not specified then the default is to use the value from the `field` property to find text in the row.

---

## CurrencyColumn {#currencycolumn}

Displays a cell value formatted as a currency.

## Example

```
<CurrencyColumn name="amount"
                title="Amount"
                field="amount" />
```

## Properties

This column provides default values for the following standard properties:

- formatComponent
- skeletonComponent
- exportValue

This column does not define any additional properties.

---

## DateColumn {#datecolumn}

Displays a cell value as a formatted short date value.

## Example

```
<DateColumn name="birthDate"
            title="Birth Date"
            field="birthDate" />
```

## Properties

This column provides default values for the following standard properties:

- formatComponent
- skeletonComponent
- quickFilterValue
- exportValue

This column does not define any additional properties.

---

## DateTimeColumn {#datetimecolumn}

Displays a cell value as a formatted short date and time value.

## Example

```
<DateTimeColumn name="lastModifiedDate"
                title="Last Modified Date"
                field="lastModifiedDate" />
```

## Properties

This column provides default values for the following standard properties:

- formatComponent
- skeletonComponent
- quickFilterValue
- exportValue

Additionally it has these custom properties:

### showSeconds

Type: boolean  
Default: false

Normally the column will display only the date, hour and minutes. If this is set to `true` then it will also show the seconds in the time value.

---

## DeleteColumn {#deletecolumn}

Shows a delete button that will prompt the individual for confirmation before calling the click handler.

## Example

```
<DeleteColumn @click="onDelete" />
```

## Properties

This column provides default values for the following standard properties:

- name
- formatComponent
- headerClass
- itemClass
- width

## disableConfirmation

Type: boolean  
Default: false

Disables the normal confirmation message displayed before calling the click handler.

## rowDisabled

Type: (row: Record<string, unknown\>, grid: IGridState) =\> boolean  
Optional

An optional callback that will be used to determine if the delete button is disabled for the specified row.

## onClick

Type: (key: string, grid: IGridState) =\> (void | Promise<void\>)  
Optional

Called when the delete button has been clicked and the confirmation has been approved. If a Promise is returned then the button will remain disabled until the Promise is resolved.

---

## EditColumn {#editcolumn}

Shows an edit button that will call the click handler when clicked.

## Example

```
<EditColumn @click="onEdit" />
```

## Properties

This column provides default values for the following standard properties:

- name
- formatComponent
- headerClass
- itemClass
- width

## onClick

Type: (key: string) =\> (void | Promise<void\>)  
Optional

Called when the edit button has been clicked. If a Promise is returned then the button will remain disabled until the Promise is resolved.

---

## HighlightDetailColumn {#highlightdetailcolumn}

A general column that displays a value in bold, with a description below it.

## Example

This is an example from the checkInLabelList block.

```
<HighlightDetailColumn name="name"
                       title="Name"
                       field="name"
                       detailField="description"
                       :filter="textValueFilter"
                       visiblePriority="xs" />
```

![<br>](https://community.rockrms.com/GetImage.ashx?Id=68366)

## Properties

Example of standard PersonColumn

This column provides default values for the following standard properties:

- formatComponent
- skeletonComponent
- quickFilterValue
- exportValue

### detailField

Type: string, boolean  
Default: false  
Required: false

If `detailField` is not specified, then it will display nothing in that area. If `detailField` is passed a property string value from props.row, then it will display that text value. If `detailField` is `false`, then it will display nothing in that area.
