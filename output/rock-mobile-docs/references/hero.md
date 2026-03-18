> **Path:** Mobile Docs > 🧱 Essentials > Blocks > CMS > Hero

# Hero

*Displays an image with text overlay on the page.*

Want big, styled images that you can overlay with Lava content? You're in the right place. Hero images are a great way to attractively display a picture with text overlay.

#### Example

![](https://community.rockrms.com/GetImage.ashx?Id=66828)

This is an example of a display created using this block. The Background Image was set to a stock photo, and to render the title, the block setting was set to `{{ CurrentPerson.FirstName }}`.

## Using Lava

In order to use Lava in this block, please make sure to enable the '*Process Lava on Server*' under the '*Block Settings > Mobile Settings*'. If you are struggling to find or enable this setting, [here](https://community.rockrms.com/developer/mobile-docs/essentials/lava) is a good example.

If you are unfamiliar with Lava, please check out our [Lava Reference](https://community.rockrms.com/developer/mobile-docs/essentials/lava).

### Block Settings

**Title**

The main title that overlays the Background Image. Lava enabled.

**Subtitle**

The text that overlays the image, underneath the title. Lava enabled.

**Background Image**

*Phone:* The image to display on a phone. Recommended to be at least 1024px wide, and at least double the height of the Height - Phone setting.

*Tablet:* The image to display on a tablet. Recommended to be at least 2048 pixels wide, and at least double the height of the Height - Tablet setting.

**Height**

*Phone:* The height of the rendered image on a phone.

*Tablet:* The height of the rendered image on a tablet.

**Text Align**

This setting allows you to align the overlayed text to the left, center or right side of the image.

**Title Color**

Sets the color of the Title.

**Subtitle Color**

Sets the color of the Subtitle.

**Padding**

The padding around the inside of the Background Image.

### Styling

There’s no styling X-Ray available.
