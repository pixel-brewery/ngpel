---
title: 'Class: ColorPickerButtonComponent'
generated: true
editUrl: false
---
# Class: ColorPickerButtonComponent

Defined in: [libs/ui/src/components/color-selector/ColorPickerButtonComponent.ts:61](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/color-selector/ColorPickerButtonComponent.ts#L61)

Opens Mosaik's color picker beside a preset palette and emits an opaque RGB hex value.

## Constructors

### Constructor

```ts
new ColorPickerButtonComponent(): ColorPickerButtonComponent;
```

#### Returns

`ColorPickerButtonComponent`

## Properties

### colorChange

```ts
readonly colorChange: OutputEmitterRef<string>;
```

Defined in: [libs/ui/src/components/color-selector/ColorPickerButtonComponent.ts:79](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/color-selector/ColorPickerButtonComponent.ts#L79)

Emits a six-digit uppercase RGB hex color.

***

### disabled

```ts
readonly disabled: InputSignal<boolean>;
```

Defined in: [libs/ui/src/components/color-selector/ColorPickerButtonComponent.ts:77](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/color-selector/ColorPickerButtonComponent.ts#L77)

Whether the editor can open.

***

### fallbackColor

```ts
readonly fallbackColor: InputSignal<string | undefined>;
```

Defined in: [libs/ui/src/components/color-selector/ColorPickerButtonComponent.ts:67](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/color-selector/ColorPickerButtonComponent.ts#L67)

Starting value passed to the color editor when the owning form has no selection.

***

### intl

```ts
readonly intl: InputSignal<Partial<ColorEditorElementIntl> | undefined>;
```

Defined in: [libs/ui/src/components/color-selector/ColorPickerButtonComponent.ts:71](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/color-selector/ColorPickerButtonComponent.ts#L71)

Optional localized labels for the embedded Mosaik color editor.

***

### label

```ts
readonly label: InputSignal<string>;
```

Defined in: [libs/ui/src/components/color-selector/ColorPickerButtonComponent.ts:69](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/color-selector/ColorPickerButtonComponent.ts#L69)

Accessible label for the custom color action.

***

### showInputs

```ts
readonly showInputs: InputSignal<boolean | undefined>;
```

Defined in: [libs/ui/src/components/color-selector/ColorPickerButtonComponent.ts:73](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/color-selector/ColorPickerButtonComponent.ts#L73)

Overrides whether the underlying editor shows fields for typing color values.

***

### spectrum

```ts
readonly spectrum: InputSignal<"hue-wheel" | "theme">;
```

Defined in: [libs/ui/src/components/color-selector/ColorPickerButtonComponent.ts:75](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/color-selector/ColorPickerButtonComponent.ts#L75)

Controls whether the trigger uses theme colors or a full visible hue wheel.

***

### value

```ts
readonly value: InputSignal<string | null>;
```

Defined in: [libs/ui/src/components/color-selector/ColorPickerButtonComponent.ts:65](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/color-selector/ColorPickerButtonComponent.ts#L65)

Current editor color, when chosen.

## Methods

### onColorChange()

```ts
protected onColorChange(value): void;
```

Defined in: [libs/ui/src/components/color-selector/ColorPickerButtonComponent.ts:85](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/color-selector/ColorPickerButtonComponent.ts#L85)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `value` | `unknown` |

#### Returns

`void`
