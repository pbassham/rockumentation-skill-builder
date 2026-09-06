---
description: "Use when asking how to build forms in rock-mobile, handle form submission, validate fields, or structure form inputs with HelixForm and Hx attributes"
source: "https://community.rockrms.com/developer/mobile-docs"
sourceLabel: Mobile Docs
---
> **Path:** 

On the web, a form posts its inputs because each one has a `name`. Mobile does the same thing, using `HelixForm` as the scope and `Hx.Id` as the name.

## HelixForm

`HelixForm` is the mobile analog of web Helix's `lava-form`. It needs no prefix, and it **is a `VerticalStackLayout`**, so it stacks its children vertically and takes `Spacing`, `Padding`, and the rest.

```
<HelixForm Hx.Post="^/sink/contact" Hx.Notification="formErrors" Spacing="8">

    <ContentView Hx.Id="formErrors" />

    <Rock:FieldContainer Hx.Target="this" Hx.Swap="outer">
        <Rock:TextBox Hx.Id="email"
                      Label="Email"
                      IsRequired="True"
                      Hx.Post="^/sink/contact/email"
                      Hx.Trigger="Unfocused changed" />
    </Rock:FieldContainer>

    <Rock:FieldContainer>
        <Rock:TextBox Hx.Id="firstName" Label="First Name" IsRequired="True" />
        <Rock:TextBox Hx.Id="lastName" Label="Last Name" IsRequired="True" />
    </Rock:FieldContainer>

    <Button StyleClass="btn,btn-primary" Text="Submit" />
    <Button StyleClass="btn,btn-link" Text="Cancel" Command="{Binding PopPage}" />
</HelixForm>
```

### The form carries the verb

`Hx.Post` goes on the `HelixForm`, not on the submit button. Any `Button` inside the form with no verb of its own and no `Command` **is** a submit button. That is the default, so the Submit button above needs no Helix attributes at all.

To opt a button out, give it any one of these:

- its own `Command`, which is what makes the Cancel button above a cancel button
- its own `Hx.*` verb, so it fires its own request instead
- `Hx.Disable`

**Tapping the form's background does not submit it.** Forms are excluded from natural tap wiring. If you genuinely want a tappable form surface, say so explicitly with `Hx.Trigger="tapped"`.

### Form behavior details

- **Only `Button` submits by default, not `ImageButton`.** An `ImageButton` that should submit needs its own verb.
- **Depth does not matter.** A button nested several layouts deep still submits, including one that arrives later in a fragment swapped into the form.
- If a submit button is tapped and the form declares no verb, nothing is sent.
- **A submission's initiator is the form**, not the button. So the *form's* `Hx.Target`, `Hx.Swap`, `Hx.Confirm`, and `Hx.Notification` are what apply. Putting `Hx.Target` on the submit button does nothing useful.

### Inline validation, and why this matters

Look again at the email field above. `Hx.Target="this" Hx.Swap="outer"` sits on the **`FieldContainer`**, not on the `TextBox`. The `TextBox` inherits both, and `this` resolves to the element that *declared* it, which is the container. So every time the person leaves that field, the response replaces that one field's container in place.

**Which means your endpoint has to return the field, not just a message.** `outer` destroys the container it replaces, so whatever comes back *is* the field from then on. Return the whole container:

```
<Rock:FieldContainer Hx.Target="this" Hx.Swap="outer">
    <Rock:TextBox Hx.Id="email"
                  Label="Email"
                  IsRequired="True"
                  Text="{{ Form['email'] | Escape }}"
                  Hx.Post="^/sink/contact/email"
                  Hx.Trigger="Unfocused changed" />
    {% if isTaken %}
    <Label Text="That email is already in use." StyleClass="footnote, text-danger-strong" />
    {% endif %}
</Rock:FieldContainer>
```

Every attribute reappears, and each one breaks something different if you leave it out:

| Left out | What breaks |
| --- | --- |
| `Text="{{ Form['email'] }}"` | the field comes back empty and the person loses what they typed |
| `Hx.Id="email"` | the field stops contributing its value, so submitting the form silently drops `email` |
| `Hx.Post` or `Hx.Trigger` | validation runs once and never again |
| `Hx.Target` or `Hx.Swap` on the container | the next validation targets the enclosing block instead of the field |

That is the standing cost of `outer`: it is the only swap that removes the element carrying your attributes, so the response has to re-declare them. See [Requests and Targeting](https://community.rockrms.com/developer/mobile-docs/essentials/lava/lava-application/requests-and-targeting).

This is a direct port of HTMX's canonical inline validation pattern, and it is the clearest reason to understand [Inheritance](https://community.rockrms.com/developer/mobile-docs/essentials/lava/lava-application/inheritance).

## Automatic value inclusion

### What gets included

- **Inside a `HelixForm`**, a submission includes every named, value-carrying control in the form.
- **Outside a form**, only the initiating element's own value is included, and only if it is a named input. Helix does not sweep up arbitrary siblings, matching HTMX.

A control with no name is **never** included. That is the mobile stand-in for HTML's "no `name`, no submit."

### Naming a control: prefer Hx.Id

Either `Hx.Id` or `x:Name` gives a control the name its value is submitted under, and Helix checks `Hx.Id` first, so it wins if a control carries both. Prefer `Hx.Id`: it is the name Helix actually looks for, and it says plainly that the name exists for Helix rather than for something else. `x:Name` works only because MAUI mirrors it onto a property Helix falls back to.

The one place you still need `x:Name` is `{x:Reference ...}`, which resolves XAML names and **cannot see an `Hx.Id`**. If you need to both reference a control in a binding and submit its value, give it both.

### How it travels

| Verb | Where values go |
| --- | --- |
| GET | the query string, so your `QueryString` merge field sees them |
| POST, PUT, DELETE | an `application/x-www-form-urlencoded` body, so your `Form` merge field behaves exactly as it does on web |

### What the app can read

| Control | Value contributed |
| --- | --- |
| any `Rock:` field | see the table below |
| `Entry`, `Editor`, `SearchBar` | `Text` |
| `Switch` | `"true"` or `"false"` |
| **anything else** | **nothing. The control is skipped.** |

That last row surprises people. **A bare MAUI `Picker`, `DatePicker`, `CheckBox`, or `Slider` contributes nothing**, because none of them is a text input or a `Switch`. Use the `Rock:` equivalents, which report their own values:

| Field | Value format |
| --- | --- |
| `Rock:TextBox`, `Rock:TextEditor` | the text, empty string when unset |
| `Rock:PhoneNumberBox` | the phone number, empty string when unset |
| `Rock:CheckBox` | `"true"` or `"false"`, always sent |
| `Rock:DatePicker`, `Rock:DatePartsPicker` | `yyyy-MM-dd`, omitted when unset |
| `Rock:Picker`, `Rock:SingleSelect`, `Rock:RadioButtonList` | the selected value, omitted when nothing is selected |
| `Rock:MultiPicker`, `Rock:CheckBoxList`, `Rock:SwitchList`, `Rock:SingleSelectCheckBoxList` | the selected values, comma-delimited |
| `Rock:PersonPicker` | the selected person's primary alias Guid |
| `Rock:AttributeValueEditor` | the attribute value |

Note

Your endpoint must treat `Form` and `QueryString` as untrusted no matter what the app "should" have sent. See [Security](https://community.rockrms.com/developer/mobile-docs/essentials/lava/lava-application/security).

## Hx.Include

| Property | Type | Description |
| --- | --- | --- |
| `Hx.Include` | list of `Rock:Parameter` | Explicit request values, as element content. |

**Inherits: no**, deliberately.

Use it for values automatic inclusion cannot reach: something computed, or a control outside the initiator's scope.

```
<!-- A control the form does not contain, so automatic inclusion cannot see it. -->
<Rock:TextBox x:Name="promoCode" Label="Promo code" />

<Button Text="Submit" Hx.Post="^/sink/contact">
    <Hx.Include>
        <Rock:Parameter Name="promoCode" Value="{Binding Text, Source={x:Reference promoCode}}" />
        <Rock:Parameter Name="source" Value="mobile-app" />
    </Hx.Include>
</Button>
```

Note

This is the exception to preferring `Hx.Id`. `{x:Reference}` resolves XAML names, so the control it points at needs `x:Name`; an `Hx.Id` alone is invisible to it.

- **`Hx.Include` merges over automatic inclusion.** A parameter whose `Name` matches an automatically collected value **replaces** it rather than sending both.
- Bindings are evaluated **at request time**, so a value that changed since the screen loaded is current.
- A `Parameter` with a blank `Name` is skipped.

## Hx.Params

| Property | Type | Description |
| --- | --- | --- |
| `Hx.Params` | string | `none` excludes this control from automatic inclusion. |

**Inherits: yes.** `none` is the only supported value; anything else is ignored.

```
<Rock:TextBox Hx.Id="scratch" Label="Notes (not submitted)" Hx.Params="none" />

<!-- On a container, excludes the whole subtree. -->
<VerticalStackLayout Hx.Params="none">
    <Rock:TextBox Hx.Id="localFilter" />
</VerticalStackLayout>
```

Note

Because it inherits, `Hx.Params="none"` on a `HelixForm` excludes **every** field in that form. Occasionally that is what you want. Usually it is a mistake.

## Validation

Helix reuses the validation the app already has: `IsRequired`, `ValidationExpression`, and `ValidationExpressionMessage` on Rock fields, plus the [Validator](https://community.rockrms.com/developer/mobile-docs/essentials/controls/developer-controls/validator) control.

There is no opt-in flag. **When a validator is in play, it gates the request.**

### Inside a form

A form submission validates the form's visible fields automatically, before sending.

- An author-placed `Rock:Validator` inside the form is used as the summary, so you control where it appears.
- If you do not place one, a summary is inserted as the form's **first child**.
- The monitored field set is rebuilt on every submission, so fields swapped in between attempts are picked up.
- **Hidden fields do not block submission**, and `Hx.Disable` subtrees are skipped.

**Validation runs only for a form submission.** Inline field triggers inside the form, and buttons with their own verbs, are not submissions and skip it.

### Outside a form: Hx.Validator

| Property | Type | Description |
| --- | --- | --- |
| `Hx.Validator` | `Validator` | A validator that must pass before the request fires. |

**Inherits: yes.** This one takes an object reference rather than an id, so unlike `Hx.Target` it cannot reach across a fragment boundary.

```
<Rock:Validator x:Name="checks">
    <Rock:Validator.ControlsToValidate>
        <x:Reference>email</x:Reference>
    </Rock:Validator.ControlsToValidate>
</Rock:Validator>

<Button Text="Send" Hx.Post="^/sink/contact" Hx.Validator="{x:Reference checks}" />
```

Failure shows the validator's messages and aborts. No request is sent.
