---
title: 'Class: ColorSelectorComponent'
generated: true
editUrl: false
---
# Class: ColorSelectorComponent

Defined in: [libs/ui/src/components/color-selector/ColorSelectorComponent.ts:168](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/color-selector/ColorSelectorComponent.ts#L168)

A reusable color selector component with palette selection and eye dropper support.
Implements ControlValueAccessor for Reactive Forms integration.

## Implements

- `ControlValueAccessor`

## Constructors

### Constructor

```ts
new ColorSelectorComponent(): ColorSelectorComponent;
```

Defined in: [libs/ui/src/components/color-selector/ColorSelectorComponent.ts:190](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/color-selector/ColorSelectorComponent.ts#L190)

Constructs a new instance of the `ColorSelectorComponent` class.

#### Returns

`ColorSelectorComponent`

## Properties

### \_intl

```ts
protected readonly _intl: ColorSelectorComponentIntl;
```

Defined in: [libs/ui/src/components/color-selector/ColorSelectorComponent.ts:171](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/color-selector/ColorSelectorComponent.ts#L171)

***

### colorPalette

```ts
readonly colorPalette: InputSignal<readonly string[]>;
```

Defined in: [libs/ui/src/components/color-selector/ColorSelectorComponent.ts:281](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/color-selector/ColorSelectorComponent.ts#L281)

The color palette to display. Defaults to Tailwind palette.

***

### colorSelected

```ts
readonly colorSelected: OutputEmitterRef<IColorSelectedEvent>;
```

Defined in: [libs/ui/src/components/color-selector/ColorSelectorComponent.ts:233](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/color-selector/ColorSelectorComponent.ts#L233)

Emitted when a color is selected.

***

### customColor

```ts
protected readonly customColor: Signal<string | null>;
```

Defined in: [libs/ui/src/components/color-selector/ColorSelectorComponent.ts:334](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/color-selector/ColorSelectorComponent.ts#L334)

Returns the custom color if the current value is not in the palette.

***

### disabled

```ts
readonly disabled: InputSignal<boolean>;
```

Defined in: [libs/ui/src/components/color-selector/ColorSelectorComponent.ts:265](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/color-selector/ColorSelectorComponent.ts#L265)

Disables color selection.

***

### eyeDropperIcon

```ts
readonly eyeDropperIcon: InputSignal<"eye-dropper" | "hue-wheel">;
```

Defined in: [libs/ui/src/components/color-selector/ColorSelectorComponent.ts:217](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/color-selector/ColorSelectorComponent.ts#L217)

Uses a hue wheel in the eye dropper's icon slot when requested.

***

### eyeDropperLabel

```ts
readonly eyeDropperLabel: InputSignal<string>;
```

Defined in: [libs/ui/src/components/color-selector/ColorSelectorComponent.ts:214](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/color-selector/ColorSelectorComponent.ts#L214)

Accessible label for the eye dropper action.

***

### formField

```ts
readonly formField: InputSignal<(() => FieldState<string>) | null>;
```

Defined in: [libs/ui/src/components/color-selector/ColorSelectorComponent.ts:298](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/color-selector/ColorSelectorComponent.ts#L298)

Optional Signal Forms field binding.
When provided, the component syncs its value with the form field.

***

### hint

```ts
readonly hint: InputSignal<string>;
```

Defined in: [libs/ui/src/components/color-selector/ColorSelectorComponent.ts:257](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/color-selector/ColorSelectorComponent.ts#L257)

Optional hint text displayed below the color selector.

***

### id

```ts
readonly id: InputSignal<string | null>;
```

Defined in: [libs/ui/src/components/color-selector/ColorSelectorComponent.ts:241](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/color-selector/ColorSelectorComponent.ts#L241)

Unique identifier for the component.

***

### isDisabled

```ts
protected readonly isDisabled: Signal<boolean>;
```

Defined in: [libs/ui/src/components/color-selector/ColorSelectorComponent.ts:318](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/color-selector/ColorSelectorComponent.ts#L318)

Computed disabled state combining input and form control state.

***

### isInteractionDisabled

```ts
protected readonly isInteractionDisabled: Signal<boolean>;
```

Defined in: [libs/ui/src/components/color-selector/ColorSelectorComponent.ts:326](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/color-selector/ColorSelectorComponent.ts#L326)

Computed interaction disabled state.

***

### label

```ts
readonly label: InputSignal<string>;
```

Defined in: [libs/ui/src/components/color-selector/ColorSelectorComponent.ts:249](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/color-selector/ColorSelectorComponent.ts#L249)

Optional label text displayed above the color selector.

***

### readonly

```ts
readonly readonly: InputSignal<boolean>;
```

Defined in: [libs/ui/src/components/color-selector/ColorSelectorComponent.ts:273](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/color-selector/ColorSelectorComponent.ts#L273)

Marks control as readonly.

***

### resolvedId

```ts
protected readonly resolvedId: Signal<string>;
```

Defined in: [libs/ui/src/components/color-selector/ColorSelectorComponent.ts:306](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/color-selector/ColorSelectorComponent.ts#L306)

Resolved unique identifier.

***

### showEyeDropper

```ts
readonly showEyeDropper: InputSignal<boolean>;
```

Defined in: [libs/ui/src/components/color-selector/ColorSelectorComponent.ts:289](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/color-selector/ColorSelectorComponent.ts#L289)

Whether to show the eye dropper button.

***

### value

```ts
readonly value: ModelSignal<string | null>;
```

Defined in: [libs/ui/src/components/color-selector/ColorSelectorComponent.ts:225](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/color-selector/ColorSelectorComponent.ts#L225)

The currently selected color value (hex string).

## Methods

### isSelected()

```ts
protected isSelected(color): boolean;
```

Defined in: [libs/ui/src/components/color-selector/ColorSelectorComponent.ts:393](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/color-selector/ColorSelectorComponent.ts#L393)

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

Defined in: [libs/ui/src/components/color-selector/ColorSelectorComponent.ts:378](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/color-selector/ColorSelectorComponent.ts#L378)

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

Defined in: [libs/ui/src/components/color-selector/ColorSelectorComponent.ts:413](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/color-selector/ColorSelectorComponent.ts#L413)

Registers a callback for value changes.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `fn` | (`value`) => `void` | The callback function. |

#### Returns

`void`

#### Implementation of

`ControlValueAccessor.registerOnChange`

***

### registerOnTouched()

```ts
registerOnTouched(fn): void;
```

Defined in: [libs/ui/src/components/color-selector/ColorSelectorComponent.ts:423](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/color-selector/ColorSelectorComponent.ts#L423)

Registers a callback for touch events.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `fn` | () => `void` | The callback function. |

#### Returns

`void`

#### Implementation of

`ControlValueAccessor.registerOnTouched`

***

### selectColor()

```ts
protected selectColor(color): void;
```

Defined in: [libs/ui/src/components/color-selector/ColorSelectorComponent.ts:356](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/color-selector/ColorSelectorComponent.ts#L356)

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

Defined in: [libs/ui/src/components/color-selector/ColorSelectorComponent.ts:433](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/color-selector/ColorSelectorComponent.ts#L433)

Sets the disabled state from the form control.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `isDisabled` | `boolean` | Whether the control should be disabled. |

#### Returns

`void`

#### Implementation of

`ControlValueAccessor.setDisabledState`

***

### writeValue()

```ts
writeValue(value): void;
```

Defined in: [libs/ui/src/components/color-selector/ColorSelectorComponent.ts:403](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/color-selector/ColorSelectorComponent.ts#L403)

Writes a new value from the form model.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `value` | `string` \| `null` | The value to write. |

#### Returns

`void`

#### Implementation of

`ControlValueAccessor.writeValue`
