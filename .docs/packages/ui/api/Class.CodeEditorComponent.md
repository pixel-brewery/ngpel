---
title: 'Class: CodeEditorComponent'
generated: true
editUrl: false
---
# Class: CodeEditorComponent

Defined in: [libs/ui/src/components/code-editor/CodeEditorComponent.ts:447](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/code-editor/CodeEditorComponent.ts#L447)

A consolidated code editor component built on CodeMirror 6.
Follows the Mosaik code-editor pattern with compartment-based extension management.
Supports placeholder autocompletion for template variables (e.g. <code v-pre>{{firstName}}</code>).

## Implements

- `ControlValueAccessor`
- `OnDestroy`

## Constructors

### Constructor

```ts
new CodeEditorComponent(): CodeEditorComponent;
```

Defined in: [libs/ui/src/components/code-editor/CodeEditorComponent.ts:473](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/code-editor/CodeEditorComponent.ts#L473)

#### Returns

`CodeEditorComponent`

## Properties

### \_intl

```ts
protected readonly _intl: CodeEditorComponentIntl;
```

Defined in: [libs/ui/src/components/code-editor/CodeEditorComponent.ts:450](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/code-editor/CodeEditorComponent.ts#L450)

***

### canPreview

```ts
readonly canPreview: Signal<boolean>;
```

Defined in: [libs/ui/src/components/code-editor/CodeEditorComponent.ts:560](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/code-editor/CodeEditorComponent.ts#L560)

Whether a rendered preview is available for the active language.

***

### initialized

```ts
readonly initialized: OutputEmitterRef<EditorView>;
```

Defined in: [libs/ui/src/components/code-editor/CodeEditorComponent.ts:610](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/code-editor/CodeEditorComponent.ts#L610)

Emits the `EditorView` instance once the editor is initialized.

***

### isMaximized

```ts
readonly isMaximized: Signal<boolean>;
```

Defined in: [libs/ui/src/components/code-editor/CodeEditorComponent.ts:576](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/code-editor/CodeEditorComponent.ts#L576)

Whether the editor is expanded over the drawer content area.

***

### isOverlayOpen

```ts
readonly isOverlayOpen: Signal<boolean>;
```

Defined in: [libs/ui/src/components/code-editor/CodeEditorComponent.ts:592](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/code-editor/CodeEditorComponent.ts#L592)

Whether any drawer-sized overlay mode is active.

***

### isPreviewOpen

```ts
readonly isPreviewOpen: Signal<boolean>;
```

Defined in: [libs/ui/src/components/code-editor/CodeEditorComponent.ts:584](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/code-editor/CodeEditorComponent.ts#L584)

Whether the rendered preview overlay is open.

***

### language

```ts
readonly language: InputSignal<"text" | "html" | "markdown">;
```

Defined in: [libs/ui/src/components/code-editor/CodeEditorComponent.ts:535](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/code-editor/CodeEditorComponent.ts#L535)

The language mode for syntax highlighting.
Supports HTML, Markdown and plain text.

***

### placeholders

```ts
readonly placeholders: InputSignal<readonly string[]>;
```

Defined in: [libs/ui/src/components/code-editor/CodeEditorComponent.ts:552](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/code-editor/CodeEditorComponent.ts#L552)

List of placeholder names available for autocompletion.
These will be offered as <code v-pre>{{placeholderName}}</code> completions.

***

### previewDocument

```ts
readonly previewDocument: Signal<SafeHtml>;
```

Defined in: [libs/ui/src/components/code-editor/CodeEditorComponent.ts:600](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/code-editor/CodeEditorComponent.ts#L600)

Current editor document rendered inside the preview iframe.

***

### previewTitle

```ts
readonly previewTitle: Signal<string>;
```

Defined in: [libs/ui/src/components/code-editor/CodeEditorComponent.ts:568](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/code-editor/CodeEditorComponent.ts#L568)

Accessible title for the active preview mode.

***

### readonly

```ts
readonly readonly: InputSignal<boolean>;
```

Defined in: [libs/ui/src/components/code-editor/CodeEditorComponent.ts:526](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/code-editor/CodeEditorComponent.ts#L526)

Whether the editor is read-only.

***

### tooltipPosition

```ts
readonly tooltipPosition: InputSignal<"fixed" | "absolute">;
```

Defined in: [libs/ui/src/components/code-editor/CodeEditorComponent.ts:543](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/code-editor/CodeEditorComponent.ts#L543)

Tooltip positioning strategy.

## Methods

### focus()

```ts
focus(): void;
```

Defined in: [libs/ui/src/components/code-editor/CodeEditorComponent.ts:665](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/code-editor/CodeEditorComponent.ts#L665)

Focuses the editor.

#### Returns

`void`

***

### ngOnDestroy()

```ts
ngOnDestroy(): void;
```

Defined in: [libs/ui/src/components/code-editor/CodeEditorComponent.ts:616](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/code-editor/CodeEditorComponent.ts#L616)

A callback method that performs custom clean-up, invoked immediately
before a directive, pipe, or service instance is destroyed.

#### Returns

`void`

#### Implementation of

`OnDestroy.ngOnDestroy`

***

### onClosePreviewButtonClick()

```ts
protected onClosePreviewButtonClick(): void;
```

Defined in: [libs/ui/src/components/code-editor/CodeEditorComponent.ts:714](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/code-editor/CodeEditorComponent.ts#L714)

Closes the rendered preview overlay.

#### Returns

`void`

***

### onMaximizeButtonClick()

```ts
protected onMaximizeButtonClick(): void;
```

Defined in: [libs/ui/src/components/code-editor/CodeEditorComponent.ts:674](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/code-editor/CodeEditorComponent.ts#L674)

Toggles the drawer-sized editor mode.

#### Returns

`void`

***

### onPreviewButtonClick()

```ts
protected onPreviewButtonClick(): void;
```

Defined in: [libs/ui/src/components/code-editor/CodeEditorComponent.ts:692](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/code-editor/CodeEditorComponent.ts#L692)

Opens or closes the rendered preview overlay.

#### Returns

`void`

***

### registerOnChange()

```ts
registerOnChange(fn): void;
```

Defined in: [libs/ui/src/components/code-editor/CodeEditorComponent.ts:644](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/code-editor/CodeEditorComponent.ts#L644)

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `fn` | (`value`) => `void` | The callback function to register |

#### Returns

`void`

#### Description

Registers a callback function that is called when the control's value
changes in the UI.

This method is called by the forms API on initialization to update the form
model when values propagate from the view to the model.

When implementing the `registerOnChange` method in your own value accessor,
save the given function so your class calls it at the appropriate time.

#### Usage Notes

### Store the change function

The following example stores the provided function as an internal method.

```ts
registerOnChange(fn: (_: any) => void): void {
  this._onChange = fn;
}
```

When the value changes in the UI, call the registered
function to allow the forms API to update itself:

```ts
host: {
   '(change)': '_onChange($event.target.value)'
}
```

#### Implementation of

`ControlValueAccessor.registerOnChange`

***

### registerOnTouched()

```ts
registerOnTouched(fn): void;
```

Defined in: [libs/ui/src/components/code-editor/CodeEditorComponent.ts:648](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/code-editor/CodeEditorComponent.ts#L648)

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `fn` | () => `void` | The callback function to register |

#### Returns

`void`

#### Description

Registers a callback function that is called by the forms API on initialization
to update the form model on blur.

When implementing `registerOnTouched` in your own value accessor, save the given
function so your class calls it when the control should be considered
blurred or "touched".

#### Usage Notes

### Store the callback function

The following example stores the provided function as an internal method.

```ts
registerOnTouched(fn: any): void {
  this._onTouched = fn;
}
```

On blur (or equivalent), your class should call the registered function to allow
the forms API to update itself:

```ts
host: {
   '(blur)': '_onTouched()'
}
```

#### Implementation of

`ControlValueAccessor.registerOnTouched`

***

### setDisabledState()

```ts
setDisabledState(isDisabled): void;
```

Defined in: [libs/ui/src/components/code-editor/CodeEditorComponent.ts:652](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/code-editor/CodeEditorComponent.ts#L652)

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `isDisabled` | `boolean` | The disabled status to set on the element |

#### Returns

`void`

#### Description

Function that is called by the forms API when the control status changes to
or from 'DISABLED'. Depending on the status, it enables or disables the
appropriate DOM element.

#### Usage Notes

The following is an example of writing the disabled property to a native DOM element:

```ts
setDisabledState(isDisabled: boolean): void {
  this._renderer.setProperty(this._elementRef.nativeElement, 'disabled', isDisabled);
}
```

#### Implementation of

`ControlValueAccessor.setDisabledState`

***

### writeValue()

```ts
writeValue(value): void;
```

Defined in: [libs/ui/src/components/code-editor/CodeEditorComponent.ts:621](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/code-editor/CodeEditorComponent.ts#L621)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `value` | `unknown` |

#### Returns

`void`

#### Description

Writes a new value to the element.

This method is called by the forms API to write to the view when programmatic
changes from model to view are requested.

#### Usage Notes

### Write a value to the element

The following example writes a value to the native DOM element.

```ts
writeValue(value: any): void {
  this._renderer.setProperty(this._elementRef.nativeElement, 'value', value);
}
```

#### Implementation of

`ControlValueAccessor.writeValue`
