---
title: 'Class: ImageEditorComponent'
generated: true
editUrl: false
---
# Class: ImageEditorComponent

Defined in: [libs/ui/src/components/image-editor/ImageEditorComponent.ts:89](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/image-editor/ImageEditorComponent.ts#L89)

A reusable image editor component with avatar display, file picker, and remove button.
Implements ControlValueAccessor for Reactive Forms integration.

## Implements

- `ControlValueAccessor`

## Constructors

### Constructor

```ts
new ImageEditorComponent(): ImageEditorComponent;
```

Defined in: [libs/ui/src/components/image-editor/ImageEditorComponent.ts:109](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/image-editor/ImageEditorComponent.ts#L109)

Constructs a new instance of the `ImageEditorComponent` class.

#### Returns

`ImageEditorComponent`

## Properties

### accept

```ts
readonly accept: InputSignal<string[]>;
```

Defined in: [libs/ui/src/components/image-editor/ImageEditorComponent.ts:210](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/image-editor/ImageEditorComponent.ts#L210)

Accepted file types for the file picker.

***

### appearance

```ts
readonly appearance: InputSignal<Appearance>;
```

Defined in: [libs/ui/src/components/image-editor/ImageEditorComponent.ts:202](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/image-editor/ImageEditorComponent.ts#L202)

The appearance style of the avatar.

***

### disabled

```ts
readonly disabled: InputSignal<boolean>;
```

Defined in: [libs/ui/src/components/image-editor/ImageEditorComponent.ts:170](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/image-editor/ImageEditorComponent.ts#L170)

Disables the image editor.

***

### formField

```ts
readonly formField: InputSignal<(() => FieldState<string>) | null>;
```

Defined in: [libs/ui/src/components/image-editor/ImageEditorComponent.ts:219](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/image-editor/ImageEditorComponent.ts#L219)

Optional Signal Forms field binding.
When provided, the component syncs its value with the form field.

***

### iconName

```ts
readonly iconName: InputSignal<string>;
```

Defined in: [libs/ui/src/components/image-editor/ImageEditorComponent.ts:186](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/image-editor/ImageEditorComponent.ts#L186)

The icon to display when no image is set.

***

### id

```ts
readonly id: InputSignal<string | null>;
```

Defined in: [libs/ui/src/components/image-editor/ImageEditorComponent.ts:162](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/image-editor/ImageEditorComponent.ts#L162)

Unique identifier for the component.

***

### imageAdded

```ts
readonly imageAdded: OutputEmitterRef<IImageAddedEvent>;
```

Defined in: [libs/ui/src/components/image-editor/ImageEditorComponent.ts:146](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/image-editor/ImageEditorComponent.ts#L146)

Emitted when a new image file is selected.

***

### imageRemoved

```ts
readonly imageRemoved: OutputEmitterRef<IImageRemovedEvent>;
```

Defined in: [libs/ui/src/components/image-editor/ImageEditorComponent.ts:154](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/image-editor/ImageEditorComponent.ts#L154)

Emitted when the image is removed.

***

### isDisabled

```ts
protected readonly isDisabled: Signal<boolean>;
```

Defined in: [libs/ui/src/components/image-editor/ImageEditorComponent.ts:239](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/image-editor/ImageEditorComponent.ts#L239)

Computed disabled state combining input and form control state.

***

### isInteractionDisabled

```ts
protected readonly isInteractionDisabled: Signal<boolean>;
```

Defined in: [libs/ui/src/components/image-editor/ImageEditorComponent.ts:247](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/image-editor/ImageEditorComponent.ts#L247)

Computed interaction disabled state.

***

### isRemoveDisabled

```ts
protected readonly isRemoveDisabled: Signal<boolean>;
```

Defined in: [libs/ui/src/components/image-editor/ImageEditorComponent.ts:255](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/image-editor/ImageEditorComponent.ts#L255)

Whether the remove button should be disabled.

***

### readonly

```ts
readonly readonly: InputSignal<boolean>;
```

Defined in: [libs/ui/src/components/image-editor/ImageEditorComponent.ts:178](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/image-editor/ImageEditorComponent.ts#L178)

Marks control as readonly.

***

### resolvedId

```ts
protected readonly resolvedId: Signal<string>;
```

Defined in: [libs/ui/src/components/image-editor/ImageEditorComponent.ts:227](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/image-editor/ImageEditorComponent.ts#L227)

Resolved unique identifier.

***

### size

```ts
readonly size: InputSignal<Size>;
```

Defined in: [libs/ui/src/components/image-editor/ImageEditorComponent.ts:194](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/image-editor/ImageEditorComponent.ts#L194)

The size of the avatar.

***

### value

```ts
readonly value: ModelSignal<string | undefined>;
```

Defined in: [libs/ui/src/components/image-editor/ImageEditorComponent.ts:138](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/image-editor/ImageEditorComponent.ts#L138)

The current image URL value.

## Methods

### onFilesPicked()

```ts
protected onFilesPicked(event): void;
```

Defined in: [libs/ui/src/components/image-editor/ImageEditorComponent.ts:267](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/image-editor/ImageEditorComponent.ts#L267)

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

Defined in: [libs/ui/src/components/image-editor/ImageEditorComponent.ts:287](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/image-editor/ImageEditorComponent.ts#L287)

Handles the remove button click.

#### Returns

`void`

***

### registerOnChange()

```ts
registerOnChange(fn): void;
```

Defined in: [libs/ui/src/components/image-editor/ImageEditorComponent.ts:330](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/image-editor/ImageEditorComponent.ts#L330)

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

Defined in: [libs/ui/src/components/image-editor/ImageEditorComponent.ts:340](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/image-editor/ImageEditorComponent.ts#L340)

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

Defined in: [libs/ui/src/components/image-editor/ImageEditorComponent.ts:350](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/image-editor/ImageEditorComponent.ts#L350)

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

Defined in: [libs/ui/src/components/image-editor/ImageEditorComponent.ts:320](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/image-editor/ImageEditorComponent.ts#L320)

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
