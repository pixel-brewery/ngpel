---
title: 'Class: ColorSelectorComponent'
generated: true
editUrl: false
---
# Class: ColorSelectorComponent

Defined in: [libs/ui/src/components/color-selector/ColorSelectorComponent.ts:154](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/color-selector/ColorSelectorComponent.ts#L154)

A reusable color selector component with palette selection and eye dropper support.
Implements ControlValueAccessor for Reactive Forms integration.

## Implements

- `ControlValueAccessor`

## Constructors

### Constructor

```ts
new ColorSelectorComponent(): ColorSelectorComponent;
```

Defined in: [libs/ui/src/components/color-selector/ColorSelectorComponent.ts:176](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/color-selector/ColorSelectorComponent.ts#L176)

Constructs a new instance of the `ColorSelectorComponent` class.

#### Returns

`ColorSelectorComponent`

## Properties

### \_intl

```ts
protected readonly _intl: ColorSelectorComponentIntl;
```

Defined in: [libs/ui/src/components/color-selector/ColorSelectorComponent.ts:157](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/color-selector/ColorSelectorComponent.ts#L157)

***

### colorPalette

```ts
readonly colorPalette: InputSignal<readonly string[]>;
```

Defined in: [libs/ui/src/components/color-selector/ColorSelectorComponent.ts:261](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/color-selector/ColorSelectorComponent.ts#L261)

The color palette to display. Defaults to Tailwind palette.

***

### colorSelected

```ts
readonly colorSelected: OutputEmitterRef<IColorSelectedEvent>;
```

Defined in: [libs/ui/src/components/color-selector/ColorSelectorComponent.ts:213](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/color-selector/ColorSelectorComponent.ts#L213)

Emitted when a color is selected.

***

### customColor

```ts
protected readonly customColor: Signal<string | null>;
```

Defined in: [libs/ui/src/components/color-selector/ColorSelectorComponent.ts:314](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/color-selector/ColorSelectorComponent.ts#L314)

Returns the custom color if the current value is not in the palette.

***

### disabled

```ts
readonly disabled: InputSignal<boolean>;
```

Defined in: [libs/ui/src/components/color-selector/ColorSelectorComponent.ts:245](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/color-selector/ColorSelectorComponent.ts#L245)

Disables color selection.

***

### formField

```ts
readonly formField: InputSignal<(() => FieldState<string>) | null>;
```

Defined in: [libs/ui/src/components/color-selector/ColorSelectorComponent.ts:278](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/color-selector/ColorSelectorComponent.ts#L278)

Optional Signal Forms field binding.
When provided, the component syncs its value with the form field.

***

### hint

```ts
readonly hint: InputSignal<string>;
```

Defined in: [libs/ui/src/components/color-selector/ColorSelectorComponent.ts:237](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/color-selector/ColorSelectorComponent.ts#L237)

Optional hint text displayed below the color selector.

***

### id

```ts
readonly id: InputSignal<string | null>;
```

Defined in: [libs/ui/src/components/color-selector/ColorSelectorComponent.ts:221](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/color-selector/ColorSelectorComponent.ts#L221)

Unique identifier for the component.

***

### isDisabled

```ts
protected readonly isDisabled: Signal<boolean>;
```

Defined in: [libs/ui/src/components/color-selector/ColorSelectorComponent.ts:298](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/color-selector/ColorSelectorComponent.ts#L298)

Computed disabled state combining input and form control state.

***

### isInteractionDisabled

```ts
protected readonly isInteractionDisabled: Signal<boolean>;
```

Defined in: [libs/ui/src/components/color-selector/ColorSelectorComponent.ts:306](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/color-selector/ColorSelectorComponent.ts#L306)

Computed interaction disabled state.

***

### label

```ts
readonly label: InputSignal<string>;
```

Defined in: [libs/ui/src/components/color-selector/ColorSelectorComponent.ts:229](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/color-selector/ColorSelectorComponent.ts#L229)

Optional label text displayed above the color selector.

***

### readonly

```ts
readonly readonly: InputSignal<boolean>;
```

Defined in: [libs/ui/src/components/color-selector/ColorSelectorComponent.ts:253](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/color-selector/ColorSelectorComponent.ts#L253)

Marks control as readonly.

***

### resolvedId

```ts
protected readonly resolvedId: Signal<string>;
```

Defined in: [libs/ui/src/components/color-selector/ColorSelectorComponent.ts:286](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/color-selector/ColorSelectorComponent.ts#L286)

Resolved unique identifier.

***

### showEyeDropper

```ts
readonly showEyeDropper: InputSignal<boolean>;
```

Defined in: [libs/ui/src/components/color-selector/ColorSelectorComponent.ts:269](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/color-selector/ColorSelectorComponent.ts#L269)

Whether to show the eye dropper button.

***

### value

```ts
readonly value: ModelSignal<string | null>;
```

Defined in: [libs/ui/src/components/color-selector/ColorSelectorComponent.ts:205](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/color-selector/ColorSelectorComponent.ts#L205)

The currently selected color value (hex string).

## Methods

### isSelected()

```ts
protected isSelected(color): boolean;
```

Defined in: [libs/ui/src/components/color-selector/ColorSelectorComponent.ts:373](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/color-selector/ColorSelectorComponent.ts#L373)

Checks if a color is currently selected.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `color` | `string` | The color to check. |

#### Returns

`boolean`

True if the color is selected.

***

### onEyeDropperColorChange()

```ts
protected onEyeDropperColorChange(event): void;
```

Defined in: [libs/ui/src/components/color-selector/ColorSelectorComponent.ts:358](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/color-selector/ColorSelectorComponent.ts#L358)

Handles color selection from the eye dropper.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `event` | [`IEyeDropperColorChange`](Interface.IEyeDropperColorChange) | The eye dropper color change event. |

#### Returns

`void`

***

### registerOnChange()

```ts
registerOnChange(fn): void;
```

Defined in: [libs/ui/src/components/color-selector/ColorSelectorComponent.ts:393](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/color-selector/ColorSelectorComponent.ts#L393)

Registers a callback for value changes.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `fn` | (`value`) => `void` | The callback function. |

#### Returns

`void`

#### Implementation of

```ts
ControlValueAccessor.registerOnChange
```

***

### registerOnTouched()

```ts
registerOnTouched(fn): void;
```

Defined in: [libs/ui/src/components/color-selector/ColorSelectorComponent.ts:403](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/color-selector/ColorSelectorComponent.ts#L403)

Registers a callback for touch events.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `fn` | () => `void` | The callback function. |

#### Returns

`void`

#### Implementation of

```ts
ControlValueAccessor.registerOnTouched
```

***

### selectColor()

```ts
protected selectColor(color): void;
```

Defined in: [libs/ui/src/components/color-selector/ColorSelectorComponent.ts:336](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/color-selector/ColorSelectorComponent.ts#L336)

Selects a color from the palette.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `color` | `string` | The color value to select. |

#### Returns

`void`

***

### setDisabledState()

```ts
setDisabledState(isDisabled): void;
```

Defined in: [libs/ui/src/components/color-selector/ColorSelectorComponent.ts:413](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/color-selector/ColorSelectorComponent.ts#L413)

Sets the disabled state from the form control.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `isDisabled` | `boolean` | Whether the control should be disabled. |

#### Returns

`void`

#### Implementation of

```ts
ControlValueAccessor.setDisabledState
```

***

### writeValue()

```ts
writeValue(value): void;
```

Defined in: [libs/ui/src/components/color-selector/ColorSelectorComponent.ts:383](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/color-selector/ColorSelectorComponent.ts#L383)

Writes a new value from the form model.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `value` | `string` \| `null` | The value to write. |

#### Returns

`void`

#### Implementation of

```ts
ControlValueAccessor.writeValue
```
