---
title: 'Class: ColorPickerButtonComponent'
generated: true
editUrl: false
---
# Class: ColorPickerButtonComponent

Defined in: libs/ui/src/components/color-selector/ColorPickerButtonComponent.ts:45

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

Defined in: libs/ui/src/components/color-selector/ColorPickerButtonComponent.ts:55

Emits a six-digit uppercase RGB hex color.

***

### disabled

```ts
readonly disabled: InputSignal<boolean>;
```

Defined in: libs/ui/src/components/color-selector/ColorPickerButtonComponent.ts:53

Whether the editor can open.

***

### label

```ts
readonly label: InputSignal<string>;
```

Defined in: libs/ui/src/components/color-selector/ColorPickerButtonComponent.ts:51

Accessible label for the custom color action.

***

### value

```ts
readonly value: InputSignal<string | null>;
```

Defined in: libs/ui/src/components/color-selector/ColorPickerButtonComponent.ts:49

Current editor color, when chosen.

## Methods

### onColorChange()

```ts
protected onColorChange(value): void;
```

Defined in: libs/ui/src/components/color-selector/ColorPickerButtonComponent.ts:61

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `value` | `unknown` |

#### Returns

`void`
