---
description: Use when displaying status values or enum fields as styled pill labels with customizable colors based on the field value
source: "https://community.rockrms.com/developer/obsidian"
sourceLabel: Obsidian
---
> **Path:** 

Displays a value as a pill label. The style can be customized on a per value basis. So you can, for example, have "success" type values show a green label and "failure" type values show a red label.

## Example

```
<LabelColumn name="status"
             title="Status"
             field="status"
             :textSource="source"
             :classSource="labelClasses" />
```
```
const source: Record<number, string> = {
    0: "Unknown",
    1: "Success",
    2: "Failed"
};

const labelClasses: Record<string, string> = {
    "Unknown": "warning",
    "Success": "success",
    "Failed": "danger"
};
```

## Properties

This column provides default values for the following standard properties:

- formatComponent
- skeletonComponent
- quickFilterValue
- filterValue
- sortValue
- exportValue

## textSource

Type: Record<string | number, string\>  
Optional

The lookup table to use to translate the raw value into a string. This can be used, for example, to translate an enum into its text format. This table is used before the classSource and colorSource tables are used.

## classSource

Type: Record<string, string\>  
Optional

The lookup table to use when applying a custom label type tag to the badge. The key is the text value of the field. The value is a standard label suffix such as `primary` or `danger`.

## colorSource

Type: Record<string, string\>  
Optional

The lookup table to use when applying a custom background color to the badge. The key is the text value of the field. The value is a standard CSS color designation.

---

## NumberBadgeColumn {#numberbadgecolumn}

Displays a number inside a badge (pill) with a color that is defined by

- the range group the number falls into.

## Example

```
<NumberBadgeColumn name="completed"
                   title="% Completed"
                   field="completed"
                   :infoMinimum="0"
                   :infoMaximum="59"
                   :warningMinimum="60"
                   :warningMaximum="79"
                   :successMinimum="80" />
```

## Properties

This column provides default values for the following standard properties:

- formatComponent
- skeletonComponent
- exportValue

| Name | Type | Optional | Description |
| --- | --- | --- | --- |
| hideMinimum | number | Yes | A value greater than or equal to hideMinimum and less than or equal to hideMaximum will be hidden. |
| hideMaximum | number | Yes | A value greater than or equal to hideMinimum and less than or equal to hideMaximum will be hidden. |
| infoMinimum | number | Yes | A value greater than or equal to infoMinimum and less than or equal to infoMaximum will draw the badge with the info color scheme. This will take precedence over the hide properties. |
| infoMaximum | number | Yes | A value greater than or equal to infoMinimum and less than or equal to infoMaximum will draw the badge with the info color scheme. This will take precedence over the hide properties. |
| successMinimum | number | Yes | A value greater than or equal to successMinimum and less than or equal to successMaximum will draw the badge with the success color scheme. This will take precedence over the info properties. |
| successMaximum | number | Yes | A value greater than or equal to successMinimum and less than or equal to successMaximum will draw the badge with the success color scheme. This will take precedence over the info properties. |
| warningMinimum | number | Yes | A value greater than or equal to warningMinimum and less than or equal to warningMaximum will draw the badge with the warning color scheme. This will take precedence over the success properties. |
| warningMaximum | number | Yes | A value greater than or equal to warningMinimum and less than or equal to warningMaximum will draw the badge with the warning color scheme. This will take precedence over the success properties. |
| dangerMinimum | number | Yes | A value greater than or equal to dangerMinimum and less than or equal to dangerMaximum will draw the badge with the danger color scheme. This will take precedence over the warning properties. |
| dangerMaximum | number | Yes | A value greater than or equal to dangerMinimum and less than or equal to dangerMaximum will draw the badge with the danger color scheme. This will take precedence over the warning properties. |
