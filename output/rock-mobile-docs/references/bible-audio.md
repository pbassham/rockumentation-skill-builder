> **Path:** Mobile Docs > 🧱 Essentials > Controls > Content Controls > Bible Audio

# Bible Audio

*Listen to specific Bible verses on the fly.*

M v2.0C v12.1

This control is a component designed for playing audio content of Bible verses. This is handled via the Spark Data API to retrieve the information about the Bible and the verses to be displayed.

Note

When including Psalms in the reading Reference be sure to use Psalms, notPsalm.  

| Property | Type | Description |
| --- | --- | --- |
| Reference | String | One or more Bible references separated by a semicolon. Example: Genesis 1:1-9; Matthew 2,3. This would result in the contents of Genesis chapter 1 verses 1-9 being displayed, followed by Matthew chapters 2 and 3.   |
| WriteInteraction | Boolean | A property that allows you to enable or disable the writing of interactions. |
| WriteInteractionParameters | [InteractionParameters](https://community.rockrms.com/developer/mobile-docs/essentials/commands/utility-commands#write-interaction) | An object containing parameters that control how the audio is interacted with. This could include behaviors like the audio play speed, volume, etc. |

You can supply custom content to your Bible Audio control, and maintain a reactive UI through bindings and commands.

| Property | Type | Description |
| --- | --- | --- |
| IsPlaying | Boolean |   A flag indicating whether audio is currently playing. A value of true means the audio is playing; false means it's not.   |
| PlayAudio | ICommand | A command that triggers the playing of the Bible audio. This is used to start the audio. |
| PauseAudio | ICommand | A command that triggers the pausing of the Bible audio. This is used to pause the audio. |
| PlayOrPauseAudio | ICommand | A command that either plays or pauses the Bible audio based on the current state (if it's playing or not). |

Then the content is simply supplied as the direct child of the control:

```
<Rock:BibleAudio Reference="Psalms 1">
    <Rock:Icon IconClass="{Binding BibleAudio.IsPlaying, Converter={Rock:BooleanValueConverter True=pause, False=volume-up}}"
        FontSize="20"
        StyleClass="text-primary"
        Command="{Binding BibleAudio.PlayOrPauseAudio}" />
</Rock:BibleAudio>
```
