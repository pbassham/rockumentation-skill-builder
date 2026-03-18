> **Path:** Mobile Docs > 🧱 Essentials > Blocks > CMS > Profile Details

# Profile Details

*Allows the user to edit their account on a mobile application.*

This block is pretty self-explanatory. It can be used to edit the profile details of the currently logged-in individual.

### Block Configuration

#### Connection Status

The connection status to use for new individuals. Defaults to `Prospect`.

#### Record Status

The record status to use for new individuals. Defaults to `Pending`.

#### Showing/Requiring Fields

In the *Mobile Local Settings*, each field follows a specific pattern. There is one setting for whether or not to show a field, and another that determines whether or not the field is required. If show is set to `No`, then the required field is irrelevant. This takes place for every field on that list, although the `Gender` field follows a newer style, the concept is the same (because it was added later).

![](https://community.rockrms.com/GetImage.ashx?Id=66873)

#### Modifying Another Person Profile

In order to modify another person's profile, you must pass in the `PersonGuid` as a page parameter. Note that you must have access to make modifications.

### Styling

This block consisted of mostly fields, please refer to this [style guide](https://community.rockrms.com/page/3516?slug=styling%2fstyle-guide%2fforms) for styling.
