---
description: Use when user needs to convert between hexadecimal opacity codes and percentage values for Xamarin Forms colors
source: "https://community.rockrms.com/developer/mobile-docs"
sourceLabel: Mobile Docs
---
> **Path:** 

Adding these codes as a prefix to a Hex color will set the opacity.

| HEX | % Opacity |  | HEX | % Opacity |
| --- | --- | --- | --- | --- |
| 00 | 0% |  | 80 | 50% |
| 03 | 1% |  | 82 | 51% |
| 05 | 2% |  | 85 | 52% |
| 08 | 3% |  | 87 | 53% |
| 0A | 4% |  | 8A | 54% |
| 0D | 5% |  | 8C | 55% |
| 0F | 6% |  | 8F | 56% |
| 12 | 7% |  | 91 | 57% |
| 14 | 8% |  | 94 | 58% |
| 17 | 9% |  | 96 | 59% |
| 1A | 10% |  | 99 | 60% |
| 1C | 11% |  | 9C | 61% |
| 1F | 12% |  | 9E | 62% |
| 21 | 13% |  | A1 | 63% |
| 24 | 14% |  | A3 | 64% |
| 26 | 15% |  | A6 | 65% |
| 29 | 16% |  | A8 | 66% |
| 2B | 17% |  | AB | 67% |
| 2E | 18% |  | AD | 68% |
| 30 | 19% |  | B0 | 69% |
| 33 | 20% |  | B3 | 70% |
| 36 | 21% |  | B5 | 71% |
| 38 | 22% |  | B8 | 72% |
| 3B | 23% |  | BA | 73% |
| 3D | 24% |  | BD | 74% |
| 40 | 25% |  | BF | 75% |
| 42 | 26% |  | C2 | 76% |
| 45 | 27% |  | C4 | 77% |
| 47 | 28% |  | C7 | 78% |
| 4A | 29% |  | C9 | 79% |
| 4D | 30% |  | CC | 80% |
| 4F | 31% |  | CF | 81% |
| 52 | 32% |  | D1 | 82% |
| 54 | 33% |  | D4 | 83% |
| 57 | 34% |  | D6 | 84% |
| 59 | 35% |  | D9 | 85% |
| 5C | 36% |  | DB | 86% |
| 5E | 37% |  | DE | 87% |
| 61 | 38% |  | E0 | 88% |
| 63 | 39% |  | E3 | 89% |
| 66 | 40% |  | E6 | 90% |
| 69 | 41% |  | E8 | 91% |
| 6B | 42% |  | EB | 92% |
| 6E | 43% |  | ED | 93% |
| 70 | 44% |  | F0 | 94% |
| 73 | 45% |  | F2 | 95% |
| 75 | 46% |  | F5 | 96% |
| 78 | 47% |  | F7 | 97% |
| 7A | 48% |  | FA | 98% |
| 7D | 49% |  | FC | 99% |
|  |  |  | FF | 100% |

---

## Borders {#borders}

# Borders

---

## Border Color {#border-color}

Applies to: [Button](https://docs.microsoft.com/en-us/dotnet/api/xamarin.forms.button?view=xamarin-forms), [Frame](https://docs.microsoft.com/en-us/dotnet/api/xamarin.forms.frame?view=xamarin-forms), [ImageButton](https://docs.microsoft.com/en-us/dotnet/api/xamarin.forms.imagebutton?view=xamarin-forms)

We've seen the [colors that the Downhill framework provides](https://community.rockrms.com/developer/mobile-docs/styling/legacy/colors) us for use in our applications. These colors can be used to specify border colors.

## Application Colors

Note that the actual colors you select will be substituted for the `?color-value`.

| Class | Property |
| --- | --- |
| .border-primary | color: ?color-primary; |
| .border-secondary | color: ?color-secondary; |
| .border-success | color: ?color-success; |
| .border-danger | color: ?color-danger; |
| .border-warning | color: ?color-warning; |
| .border-info | color: ?color-info; |
| .border-light | color: ?color-light; |
| .border-dark | color: ?color-dark; |
| .border-white | color: ?color-white; |

Each of the palette colors can also be used for text. Use the notation of `.border-color-intensity` to specify the color.

```
<Label StyleClass="border-gray-400" Text="Lots of trouble. Lots of bubble." />
```

---

## Border Radius {#border-radius}

Applies to: [BoxView](https://docs.microsoft.com/en-us/dotnet/api/xamarin.forms.boxview?view=xamarin-forms), [Button](https://docs.microsoft.com/en-us/dotnet/api/xamarin.forms.button?view=xamarin-forms), [Frame](https://docs.microsoft.com/en-us/dotnet/api/xamarin.forms.frame?view=xamarin-forms), [ImageButton](https://docs.microsoft.com/en-us/dotnet/api/xamarin.forms.imagebutton?view=xamarin-forms)

The following classes are provided to adjust the radius of borders.

| Class | Property |
| --- | --- |
| .rounded-sm | border-radius: 4; |
| .rounded | border-radius: 8; |
| .rounded-lg | border-radius: 16; |
| .rounded-full | border-radius: 1000; (not recommended on iOS) |

Note that for normal sized buttons values above `22` cause rendering issues on iOS. Use `22` for fully rounded buttons.

---

## Border Width {#border-width}

Applies to: [Button](https://docs.microsoft.com/en-us/dotnet/api/xamarin.forms.button?view=xamarin-forms), [ImageButton](https://docs.microsoft.com/en-us/dotnet/api/xamarin.forms.imagebutton?view=xamarin-forms)

The following border width classes are provided to help with styling buttons.

| Class | Property |
| --- | --- |
| .border-0 | border-width: 0; |
| .border-1 | border-width: 0.25; |
| .border-2 | border-width: 0.5; |
| .border-3 | border-width: 1; |
| .border-4 | border-width: 2; |
| .border-5 | border-width: 3; |

---

## Text {#text}

Below is information on how to style text in your application. Several utility classes are provided to help you easily style your text in a way that is consistent and easy to maintain.

## Custom Properties for Text

Rock Mobile adds custom CSS properties that are not part of Xamarin Forms.

### Text Shadow

If you would like to add shadows to text in Label elements. You can do so like this:

```
cssCopyEdit.heading1 {
    -rock-text-shadow: 6,7, 2, #000000;
}
```

The values represent the following:

1. Distance X
2. Distance Y
3. Blur Radius

---

## Background Color {#background-color}

Applies to: [VisualElement](https://docs.microsoft.com/en-us/dotnet/api/xamarin.forms.visualelement?view=xamarin-forms)

We've seen the [colors that the Downhill framework provides](https://community.rockrms.com/developer/mobile-docs/styling/legacy/colors) us for use in our applications. These colors can be used to specify background colors.

### Application Colors

Note that the actual colors you select will be substituted for the `?color-value`.

| Class | Property |
| --- | --- |
| .bg-primary | color: ?color-primary; |
| .bg-secondary | color: ?color-secondary; |
| .bg-success | color: ?color-success; |
| .bg-danger | color: ?color-danger; |
| .bg-warning | color: ?color-warning; |
| .bg-info | color: ?color-info; |
| .bg-light | color: ?color-light; |
| .bg-dark | color: ?color-dark; |
| .bg-white | color: ?color-white; |

### Palette Colors

Each of the palette colors can also be used for text. Use the notation of `.bg-color-intensity` to specify the color.

```
xmlCopyEdit<Label StyleClass="bg-gray-400" Text="Lots of trouble. Lots of bubble." />
```
