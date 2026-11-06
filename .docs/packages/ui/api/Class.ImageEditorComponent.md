---
title: 'Class: ImageEditorComponent'
generated: true
editUrl: false
---
# Class: ImageEditorComponent

Defined in: [libs/ui/src/components/image-editor/ImageEditorComponent.ts:100](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/image-editor/ImageEditorComponent.ts#L100)

A reusable image editor component with avatar display, file picker, and remove button.
Implements ControlValueAccessor for Reactive Forms integration.

## Implements

- `ControlValueAccessor`

## Constructors

### Constructor

```ts
new ImageEditorComponent(): ImageEditorComponent;
```

Defined in: [libs/ui/src/components/image-editor/ImageEditorComponent.ts:120](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/image-editor/ImageEditorComponent.ts#L120)

Constructs a new instance of the `ImageEditorComponent` class.

#### Returns

`ImageEditorComponent`

## Properties

### accept

```ts
readonly accept: InputSignal<string[]>;
```

Defined in: [libs/ui/src/components/image-editor/ImageEditorComponent.ts:230](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/image-editor/ImageEditorComponent.ts#L230)

Accepted file types for the file picker.

***

### appearance

```ts
readonly appearance: InputSignal<Appearance>;
```

Defined in: [libs/ui/src/components/image-editor/ImageEditorComponent.ts:222](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/image-editor/ImageEditorComponent.ts#L222)

The appearance style of the avatar.

***

### disabled

```ts
readonly disabled: InputSignal<boolean>;
```

Defined in: [libs/ui/src/components/image-editor/ImageEditorComponent.ts:181](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/image-editor/ImageEditorComponent.ts#L181)

Disables the image editor.

***

### editLabel

```ts
readonly editLabel: InputSignal<string | null>;
```

Defined in: [libs/ui/src/components/image-editor/ImageEditorComponent.ts:195](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/image-editor/ImageEditorComponent.ts#L195)

Localized accessible label and tooltip of the edit action.

***

### formField

```ts
readonly formField: InputSignal<(() => FieldState<string>) | null>;
```

Defined in: [libs/ui/src/components/image-editor/ImageEditorComponent.ts:239](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/image-editor/ImageEditorComponent.ts#L239)

Optional Signal Forms field binding.
When provided, the component syncs its value with the form field.

***

### iconName

```ts
readonly iconName: InputSignal<string>;
```

Defined in: [libs/ui/src/components/image-editor/ImageEditorComponent.ts:206](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/image-editor/ImageEditorComponent.ts#L206)

The icon to display when no image is set.

***

### id

```ts
readonly id: InputSignal<string | null>;
```

Defined in: [libs/ui/src/components/image-editor/ImageEditorComponent.ts:173](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/image-editor/ImageEditorComponent.ts#L173)

Unique identifier for the component.

***

### imageAdded

```ts
readonly imageAdded: OutputEmitterRef<IImageAddedEvent>;
```

Defined in: [libs/ui/src/components/image-editor/ImageEditorComponent.ts:157](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/image-editor/ImageEditorComponent.ts#L157)

Emitted when a new image file is selected.

***

### imageRemoved

```ts
readonly imageRemoved: OutputEmitterRef<IImageRemovedEvent>;
```

Defined in: [libs/ui/src/components/image-editor/ImageEditorComponent.ts:165](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/image-editor/ImageEditorComponent.ts#L165)

Emitted when the image is removed.

***

### isDisabled

```ts
protected readonly isDisabled: Signal<boolean>;
```

Defined in: [libs/ui/src/components/image-editor/ImageEditorComponent.ts:259](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/image-editor/ImageEditorComponent.ts#L259)

Computed disabled state combining input and form control state.

***

### isInteractionDisabled

```ts
protected readonly isInteractionDisabled: Signal<boolean>;
```

Defined in: [libs/ui/src/components/image-editor/ImageEditorComponent.ts:267](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/image-editor/ImageEditorComponent.ts#L267)

Computed interaction disabled state.

***

### isRemoveDisabled

```ts
protected readonly isRemoveDisabled: Signal<boolean>;
```

Defined in: [libs/ui/src/components/image-editor/ImageEditorComponent.ts:275](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/image-editor/ImageEditorComponent.ts#L275)

Whether the remove button should be disabled.

***

### readonly

```ts
readonly readonly: InputSignal<boolean>;
```

Defined in: [libs/ui/src/components/image-editor/ImageEditorComponent.ts:189](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/image-editor/ImageEditorComponent.ts#L189)

Marks control as readonly.

***

### removable

```ts
readonly removable: InputSignal<boolean>;
```

Defined in: [libs/ui/src/components/image-editor/ImageEditorComponent.ts:192](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/image-editor/ImageEditorComponent.ts#L192)

Whether the caller allows removing the current image.

***

### removeLabel

```ts
readonly removeLabel: InputSignal<string | null>;
```

Defined in: [libs/ui/src/components/image-editor/ImageEditorComponent.ts:198](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/image-editor/ImageEditorComponent.ts#L198)

Localized accessible label and tooltip of the remove action.

***

### resolvedId

```ts
protected readonly resolvedId: Signal<string>;
```

Defined in: [libs/ui/src/components/image-editor/ImageEditorComponent.ts:247](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/image-editor/ImageEditorComponent.ts#L247)

Resolved unique identifier.

***

### size

```ts
readonly size: InputSignal<Size>;
```

Defined in: [libs/ui/src/components/image-editor/ImageEditorComponent.ts:214](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/image-editor/ImageEditorComponent.ts#L214)

The size of the avatar.

***

### value

```ts
readonly value: ModelSignal<string | undefined>;
```

Defined in: [libs/ui/src/components/image-editor/ImageEditorComponent.ts:149](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/image-editor/ImageEditorComponent.ts#L149)

The current image URL value.

## Methods

### onFilesPicked()

```ts
protected onFilesPicked(event): void;
```

Defined in: [libs/ui/src/components/image-editor/ImageEditorComponent.ts:287](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/image-editor/ImageEditorComponent.ts#L287)

Handles file selection from the file picker.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `event` | `IFilesPickedEventDetail` | The files picked event detail. |

#### Returns

`void`

***

### onRemove()

```ts
protected onRemove(): void;
```

Defined in: [libs/ui/src/components/image-editor/ImageEditorComponent.ts:307](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/image-editor/ImageEditorComponent.ts#L307)

Handles the remove button click.

#### Returns

`void`

***

### registerOnChange()

```ts
registerOnChange(fn): void;
```

Defined in: [libs/ui/src/components/image-editor/ImageEditorComponent.ts:350](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/image-editor/ImageEditorComponent.ts#L350)

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

Defined in: [libs/ui/src/components/image-editor/ImageEditorComponent.ts:360](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/image-editor/ImageEditorComponent.ts#L360)

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

### setDisabledState()

```ts
setDisabledState(isDisabled): void;
```

Defined in: [libs/ui/src/components/image-editor/ImageEditorComponent.ts:370](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/image-editor/ImageEditorComponent.ts#L370)

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

Defined in: [libs/ui/src/components/image-editor/ImageEditorComponent.ts:340](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/image-editor/ImageEditorComponent.ts#L340)

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
