---
description: "Use when implementing custom Obsidian Field Type patterns, including Edit and Configuration components for field type development"
source: "https://community.rockrms.com/developer/obsidian"
sourceLabel: Obsidian
---
> **Path:** 

*Some of the common patterns utilized in Obsidian Field Types*

Note

This section is only relevant for the core team when creating a new custom field type. Plugins and, whenever possible, new core field types should use the new Universal Field Type pattern.

## Obsidian Edit Component

For the most part, the Edit Component is usually the simple one. It takes the current value and configuration values in via the `modelValue` and `configurationValues` props, respectively, and uses those values to display the picker/control with the correct configuration. It converts the data to something useful (e.g. the string "True" to the boolean true), watches for changes to either of the props, and updates accordingly.

But, there are circumstances where some of the configuration specifies which values are selectable. Let's look at the Campuses field type for example:

![](https://community.rockrms.com/GetImage.ashx?Id=66786)

You can specify which options are available to choose from

So you can't rely on the existing control, which fetches the available values from the server itself. Instead, we pass the selectable values as `ListItemBag`s via the configuration values, and use a simple `DropDownList` and/or `CheckBoxList` component to display them rather than the already-built picker:

```
export const EditComponent = defineComponent({
    name: "CampusesField.Edit",

    //...

    setup(props, context: SetupContext) {
        /** The options to choose from in the drop down list */
        const options = computed((): ListItemBag[] => {
            try {
                return JSON.parse(props.configurationValues[ConfigurationValueKey.Values] ?? "[]") as ListItemBag[];
            }
            catch {
                return [];
            }
        });

        // ...

        return { options, /* ... */ };
    },

    template: \`
<DropDownList v-if="enhance" v-model="internalValue" enhanceForLongLists multiple :items="options" />
<CheckBoxList v-else v-model="internalValue" horizontal :items="options" :repeatColumns="repeatColumns" />
\`
});
```

This is the current pattern for handling these cases. As we continue developing these fields, we may determine that this isn't the best way to handle this and we may need to find a different solution, such as adding a `providedOptions` prop to components like this that we can pass that list of items to and have the control use them instead of fetching from the server. This is still an open discussion, so feel free to reach out to Daniel H to discuss it if you think we should go in a different direction.

## Obsidian Configuration Component

The Defined Value field type is a good example of many of the patterns you'll see across field types, so you can refer to that file to look deeper into these patterns and get them in context.

### Normal Configuration Updates

The `modelValue` prop refers to the configuration values for the field. Most of the time, a change to one of these configuration values can be handled entirely on the client side, so no trip to the server needs to happen. In these cases, we simply fire the `"update:modelValue"` event with the updated configuration. This gives the updated configuration to the parent component.

To verify if the event needs to be fired, we conventionally create a `maybeUpdateModelValue` function that constructs a new object with all the current configuration values from the configuration controls, then compares each property to the prop's value. If any property has changed, we fire the `"update:modelValue"` event and return `true`, otherwise return `false`.

The boolean return is used by a function named `maybeUpdateConfiguration` that will, if true, fire the `"updateConfigurationValue"` event with a key/value pair that changed. At time of writing, I haven't seen anything actually use the key/value pair information, but this event is what actually tells the parent that the configuration has changed and should be propagated to everywhere it needs to go.

This function is used by watchers on individual configuration values, so it can receive the key/value pair based on which watcher was fired.

Putting this all together looks something like this:

```
function maybeUpdateModelValue (): boolean {
    const newValue: Record<string, string> = {
        ...props.modelValue
    };

    newValue[ConfigurationValueKey.KEY1] = value1.value;
    // Be sure to convert the local value to match what will go into the DB
    newValue[ConfigurationValueKey.KEY2] = asTrueFalseOrNull(value2.value);
    // ... for each configuration value

    // Compare the new value and the old value.
    const anyValueChanged = newValue[ConfigurationValueKey.KEY1] !== props.modelValue[ConfigurationValueKey.KEY1]
        || newValue[ConfigurationValueKey.KEY2] !== (props.modelValue[ConfigurationValueKey.KEY2] ?? "")
        || // ... for each configuration value

    // If any value changed then emit the new model value.
    if (anyValueChanged) {
        emit("update:modelValue", newValue);
        return true;
    }
    else {
        return false;
    }
};

function maybeUpdateConfiguration (key: string, value: string): void {
    if (maybeUpdateModelValue()) {
        emit("updateConfigurationValue", key, value);
    }
};

// Watch for changes in properties that only require a local UI update.
watch(value1, () => maybeUpdateConfiguration(ConfigurationValueKey.KEY1, value1.value));
watch(value2, () => maybeUpdateConfiguration(ConfigurationValueKey.KEY2, asTrueOrFalseString(value2.value)));
// ... for each configuration value
```

## Configuration Changes that Require Server Updates

Sometimes, when you change a configuration value, other configuration options need data from the server. For example, with the Defined Value field type, if you change the Defined Type option or the Display Descriptions option or Include Inactive options, you need to update the Selectable Values option with the defined values that match that configuration. To do this, you need to fire the `"updateConfiguration"` event after one of these configuration values change and after firing the `"update:modelValue"` event, which conventionally looks like this:

```
// Watch for changes in properties that require new configuration
// properties to be retrieved from the server.
watch([value1, value2], () => {
    if (maybeUpdateModelValue()) {
        emit("updateConfiguration");
    }
});
```

### Configuration Properties

This isn't so much a code pattern as just a clarification of one of the features we have built in for the configuration components. Along with configuration values (available via the `modelValue` prop), we also have configuration properties (available via the `configurationProperties` prop). Configuration properties are a one-way prop, so making changes to them has no effect outside the configuration component and there's no `"update:configurationProperties"` event.

Configuration properties is an object that contains data needed by the configuration value controls. For example, in the Defined Value field type, the dropdown for choosing a a Defined Type needs a list of the defined types to choose from. That list is provided in the configuration properties.

By not including that data with configuration values, we can let the configuration values be purely used to hold configuration values and also ensures that this data is only fetched during configuration where is the only place it's needed.
