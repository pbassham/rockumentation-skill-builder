> **Path:** Mobile Docs > 🧱 Essentials > Controls > Content Controls > Countdown

# Countdown

M v1.0

Adding a countdown timer to your page is simple. There are several options for providing a date and time to the control.

### String

Simply enter a raw date time value as a string.

```
<Rock:Countdown StartDateTime="08/27/2020 10:30AM" />
```

### Lava Filter

See the [Lava documentation](https://community.rockrms.com/lava/filters/date-filters) for more information.

```
<Rock:Countdown StartDateTime="{{ 'Now' | DateAdd:3, 'd' }}" />
```

### Lava Shortcode

Utilize the `scheduledcontent` Lava shortcode.

```
{[ scheduledcontent scheduleid:'3' showwhen:'both' ]}
    <Rock:Countdown StartDateTime="{{ NextOccurrenceDateTime }}" />
{[ endscheduledcontent ]}
```

*Note: This shortcode's logic does take some overhead. You may consider caching the output if your page will be heavily visited, even if it's only cached for a minute or two.*

### Properties

| Property | Type | Description |
| --- | --- | --- |
| StartDateTime | object | The date/time that the event starts can be provided as either a string or a date object. |
| ShowLabels | bool | Determines if the date unit labels below the values should be displayed. Default is to show. |
| AbbreviateLabels | bool | Determines if the labels values should be abbreviated (Minutes vs Mins). The default is to abbreviate. |
| SeparatorValue | string | The character to use to separate values. The default is ':'. |
| CompletedMessage | object | What to show at when the counter reaches 0. This can be either a string message or a view control. If no value is provided the counter will end at 00:00:00:00.   |

![](https://community.rockrms.com/GetImage.ashx?Id=67030)

### Special CSS Classes

The countdown timer will add specific CSS classes as it gets close to completion. These are outlined below.

Warning

Avoid extensive styling changes to the countdown labels, as each second there's some processing happening to update the values. This can introduce a brief stutter while scrolling.

| CSS Class | Purpose |
| --- | --- |
| .less-than-day | Add when the countdown timer is less and a day from completion. |
| .less-than-hour | Added when there is less than 60 minutes on the timer. |
| .less-than-15-mins | Added when there is less than 15 minutes on the timer. |
| .less-than-5-mins | Added when there is less than 5 minutes left. |
| .countdown-complete | When the timer has reached 0. |

### CSS X-Ray

While the countdown timer looks simple it's actually made up of a series of StackLayouts and Labels. This is to ensure that everything says aligned as the timer ticks. Below is a view of the various CSS classes available to you.

![](https://community.rockrms.com/GetImage.ashx?Id=67029)

*Note: Each unit of time is actually a .countdown-field though we only note it for clarity once above. Likewise each separator has the same classes.*
