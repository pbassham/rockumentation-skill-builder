> **Path:** Mobile Docs > 🧱 Essentials > Blocks > CMS > Workflow Entry

# Workflow Entry

*Displays a native workflow form.*

This is an extremely powerful block for managing workflows from a mobile application. If you aren't sure what workflows are quite yet, please refer to [Blasting Off With Workflows](https://community.rockrms.com/Rock/BookContent/12#workflownotes), a Rock manual that goes over the subject.

Important

Not all Rock field types are supported by this block. Those that aren't will be omitted within the app. See [Field Types](https://community.rockrms.com/developer/mobile-docs/essentials/field-types) for more info about which types are supported.  

Important

This block does not currently support Conditional Display Logic and will only respect the `Visible`, `Editable` and `Required` attributes of the field. In cases where conditional logic is required, you should consider using an external browser or a [WebView](https://mobiledocs.rockrms.com/essentials/controls/content-controls/web-view)[.](https://community.rockrms.com/developer/mobile-docs/essentials/controls/content-controls/web-view)  

### Page Parameters

| Name | Type | Description |
| --- | --- | --- |
| WorkflowTypeGuid | Guid | Sets the workflow type context for the block if the Workflow Type block setting is empty. *This parameter will* *not* *override the block setting* |

### Block Configuration

Warning

Enable Person Entry is not supported within Rock Mobile

| Workflow Type | The type of workflow that is to be launched when a page containing this block is rendered. To manage your existing workflow types navigate to '*General Settings > Workflow Configuration*'.   |
| --- | --- |
| Completion Action | The completion action can be set to one of three different options. **1**. *Show Message From Workflow:* The block will display the configured message in the workflow settings. **2**. *Show Completion Xaml:* The block will display the XAML set in the Completion Xaml block setting. Within this template, the workflow attribute values can be accessed as usual: {{ Workflow | Attribute:'Key' }}**3**. *Redirect to Page:* The block will redirect the individual to the page set in the Redirect To Page block setting.     |
| Completion XAML | The Xaml to render upon completion. Note that the Completion Action must be set to *Show Completion Xaml*.   |
| Enabled Lava Commands | The lava commands that this block is allowed to use. Note, that if your workflow utilizes Lava, you must match these settings to give your workflow full functionality. Please note that you may have to also enable the '*Process Lava on Server'* setting in the '*Mobile Settings'* of the block. A good example of how to find and enable that setting is seen [here](https://community.rockrms.com/developer/mobile-docs/essentials/blocks/cms/content#using-lava).   |
| Redirect To Page | This is the page in your mobile app to redirect to upon completion. Note that the Completion Action must be set to *Redirect to Page*.   |

### Styling

This block consisted of mostly fields, please refer to this [style guide](https://community.rockrms.com/page/3516?slug=styling%2fstyle-guide%2fforms) for styling.
