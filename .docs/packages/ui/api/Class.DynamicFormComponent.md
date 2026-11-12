---
title: 'Class: DynamicFormComponent'
generated: true
editUrl: false
---
# Class: DynamicFormComponent

Defined in: [libs/ui/src/components/dynamic-form/DynamicFormComponent.ts:413](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/dynamic-form/DynamicFormComponent.ts#L413)

Renders a versioned UI-owned form definition with Mosaik controls and Signal Forms.

## Implements

- `OnChanges`

## Constructors

### Constructor

```ts
new DynamicFormComponent(): DynamicFormComponent;
```

Defined in: [libs/ui/src/components/dynamic-form/DynamicFormComponent.ts:426](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/dynamic-form/DynamicFormComponent.ts#L426)

#### Returns

`DynamicFormComponent`

## Properties

### canSubmit

```ts
readonly canSubmit: Signal<boolean>;
```

Defined in: [libs/ui/src/components/dynamic-form/DynamicFormComponent.ts:488](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/dynamic-form/DynamicFormComponent.ts#L488)

Indicates whether consumers may submit the current dynamic form values.

***

### controlType

```ts
protected readonly controlType: {
  Boolean: "boolean";
  Date: "date";
  Email: "email";
  Link: "link";
  Multiline: "multiline";
  MultipleChoice: "multiple-choice";
  Number: "number";
  Password: "password";
  Radio: "radio";
  Readonly: "readonly";
  Select: "select";
  Text: "text";
} = DynamicFormControlType;
```

Defined in: [libs/ui/src/components/dynamic-form/DynamicFormComponent.ts:500](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/dynamic-form/DynamicFormComponent.ts#L500)

Renderer kinds available to the template.

#### Boolean

```ts
readonly Boolean: "boolean" = 'boolean';
```

#### Date

```ts
readonly Date: "date" = 'date';
```

#### Email

```ts
readonly Email: "email" = 'email';
```

#### Link

```ts
readonly Link: "link" = 'link';
```

#### Multiline

```ts
readonly Multiline: "multiline" = 'multiline';
```

#### MultipleChoice

```ts
readonly MultipleChoice: "multiple-choice" = 'multiple-choice';
```

#### Number

```ts
readonly Number: "number" = 'number';
```

#### Password

```ts
readonly Password: "password" = 'password';
```

#### Radio

```ts
readonly Radio: "radio" = 'radio';
```

#### Readonly

```ts
readonly Readonly: "readonly" = 'readonly';
```

#### Select

```ts
readonly Select: "select" = 'select';
```

#### Text

```ts
readonly Text: "text" = 'text';
```

***

### definition

```ts
readonly definition: InputSignal<IDynamicFormDefinition>;
```

Defined in: [libs/ui/src/components/dynamic-form/DynamicFormComponent.ts:445](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/dynamic-form/DynamicFormComponent.ts#L445)

Definition rendered by the component.

***

### isReadonly

```ts
readonly isReadonly: InputSignal<boolean>;
```

Defined in: [libs/ui/src/components/dynamic-form/DynamicFormComponent.ts:453](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/dynamic-form/DynamicFormComponent.ts#L453)

Forces every editable control into a read-only presentation.

***

### valid

```ts
readonly valid: Signal<boolean>;
```

Defined in: [libs/ui/src/components/dynamic-form/DynamicFormComponent.ts:480](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/dynamic-form/DynamicFormComponent.ts#L480)

Indicates whether the complete dynamic form is valid and has no pending validation.

***

### validationAttempted

```ts
readonly validationAttempted: InputSignal<boolean>;
```

Defined in: [libs/ui/src/components/dynamic-form/DynamicFormComponent.ts:464](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/dynamic-form/DynamicFormComponent.ts#L464)

Indicates that the host attempted to submit the form.

The renderer keeps validation presentation UI-owned and marks its
editable controls as touched when a host requests validation.

***

### value

```ts
readonly value: ModelSignal<DynamicFormValues>;
```

Defined in: [libs/ui/src/components/dynamic-form/DynamicFormComponent.ts:472](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/dynamic-form/DynamicFormComponent.ts#L472)

Two-way value map of all dynamic fields.

## Accessors

### clearAnswerLabel

#### Get Signature

```ts
get protected clearAnswerLabel(): string;
```

Defined in: [libs/ui/src/components/dynamic-form/DynamicFormComponent.ts:503](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/dynamic-form/DynamicFormComponent.ts#L503)

Accessible text of the optional radio clear button.

##### Returns

`string`

## Methods

### clearAnswer()

```ts
protected clearAnswer(field): void;
```

Defined in: [libs/ui/src/components/dynamic-form/DynamicFormComponent.ts:591](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/dynamic-form/DynamicFormComponent.ts#L591)

Clears the selected answer and updates the field's interaction state.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `field` | [`IDynamicFormFieldDefinition`](Interface.IDynamicFormFieldDefinition) |

#### Returns

`void`

***

### copyLink()

```ts
protected copyLink(field): Promise<void>;
```

Defined in: [libs/ui/src/components/dynamic-form/DynamicFormComponent.ts:778](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/dynamic-form/DynamicFormComponent.ts#L778)

Copies a safe link without surfacing Clipboard API failures as unhandled errors.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `field` | [`IDynamicFormFieldDefinition`](Interface.IDynamicFormFieldDefinition) | Dynamic link field definition. |

#### Returns

`Promise`\<`void`\>

A promise resolved after the copy attempt.

***

### field()

```ts
protected field(key): () => FieldState<DynamicFormValue>;
```

Defined in: [libs/ui/src/components/dynamic-form/DynamicFormComponent.ts:536](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/dynamic-form/DynamicFormComponent.ts#L536)

Returns the Signal Form field addressed by a definition key.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `key` | `string` | Stable field key. |

#### Returns

Dynamic Signal Form field accessor.

() => `FieldState`\<[`DynamicFormValue`](TypeAlias.DynamicFormValue)\>

***

### isFieldClearable()

```ts
protected isFieldClearable(field): boolean;
```

Defined in: [libs/ui/src/components/dynamic-form/DynamicFormComponent.ts:586](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/dynamic-form/DynamicFormComponent.ts#L586)

Indicates whether an optional field may expose its clear action.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `field` | [`IDynamicFormFieldDefinition`](Interface.IDynamicFormFieldDefinition) | Dynamic field definition. |

#### Returns

`boolean`

Whether the renderer may clear the field.

***

### isFieldReadonly()

```ts
protected isFieldReadonly(field): boolean;
```

Defined in: [libs/ui/src/components/dynamic-form/DynamicFormComponent.ts:575](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/dynamic-form/DynamicFormComponent.ts#L575)

Indicates whether a field is immutable either by definition or host policy.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `field` | [`IDynamicFormFieldDefinition`](Interface.IDynamicFormFieldDefinition) | Dynamic field definition. |

#### Returns

`boolean`

Whether the renderer must prevent edits.

***

### isRequired()

```ts
protected isRequired(field): boolean;
```

Defined in: [libs/ui/src/components/dynamic-form/DynamicFormComponent.ts:564](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/dynamic-form/DynamicFormComponent.ts#L564)

Indicates whether the field is required by its definition or declarative rules.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `field` | [`IDynamicFormFieldDefinition`](Interface.IDynamicFormFieldDefinition) | Dynamic field definition. |

#### Returns

`boolean`

Whether the field requires a non-empty value.

***

### layoutClasses()

```ts
protected layoutClasses(field): string;
```

Defined in: [libs/ui/src/components/dynamic-form/DynamicFormComponent.ts:553](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/dynamic-form/DynamicFormComponent.ts#L553)

Resolves a semantic field layout for the template.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `field` | [`IDynamicFormFieldDefinition`](Interface.IDynamicFormFieldDefinition) | Dynamic field definition. |

#### Returns

`string`

Statically discoverable layout classes.

***

### linkCopyLabel()

```ts
protected linkCopyLabel(field): string;
```

Defined in: [libs/ui/src/components/dynamic-form/DynamicFormComponent.ts:735](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/dynamic-form/DynamicFormComponent.ts#L735)

Resolves the accessible label used for copying a link.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `field` | [`IDynamicFormFieldDefinition`](Interface.IDynamicFormFieldDefinition) | Dynamic link field definition. |

#### Returns

`string`

Configured or safe default label.

***

### linkCopyStatus()

```ts
protected linkCopyStatus(field): string | null;
```

Defined in: [libs/ui/src/components/dynamic-form/DynamicFormComponent.ts:757](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/dynamic-form/DynamicFormComponent.ts#L757)

Resolves the status text announced after a copy attempt.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `field` | [`IDynamicFormFieldDefinition`](Interface.IDynamicFormFieldDefinition) | Dynamic link field definition. |

#### Returns

`string` \| `null`

Copy result text or `null` before copying.

***

### linkInvalidLabel()

```ts
protected linkInvalidLabel(field): string;
```

Defined in: [libs/ui/src/components/dynamic-form/DynamicFormComponent.ts:746](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/dynamic-form/DynamicFormComponent.ts#L746)

Resolves the text shown for an unsafe or missing link.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `field` | [`IDynamicFormFieldDefinition`](Interface.IDynamicFormFieldDefinition) | Dynamic link field definition. |

#### Returns

`string`

Configured or safe default text.

***

### linkOpenLabel()

```ts
protected linkOpenLabel(field): string;
```

Defined in: [libs/ui/src/components/dynamic-form/DynamicFormComponent.ts:722](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/dynamic-form/DynamicFormComponent.ts#L722)

Resolves the accessible label used for opening a link.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `field` | [`IDynamicFormFieldDefinition`](Interface.IDynamicFormFieldDefinition) | Dynamic link field definition. |

#### Returns

`string`

Configured or safe default label.

***

### linkUrl()

```ts
protected linkUrl(field): string | null;
```

Defined in: [libs/ui/src/components/dynamic-form/DynamicFormComponent.ts:672](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/dynamic-form/DynamicFormComponent.ts#L672)

Resolves a dynamic link value after applying the UI security policy.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `field` | [`IDynamicFormFieldDefinition`](Interface.IDynamicFormFieldDefinition) | Dynamic link field definition. |

#### Returns

`string` \| `null`

A safe link or `null` for missing and unsafe values.

***

### maximumDate()

```ts
protected maximumDate(field): Date | null;
```

Defined in: [libs/ui/src/components/dynamic-form/DynamicFormComponent.ts:634](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/dynamic-form/DynamicFormComponent.ts#L634)

Resolves an optional maximum date into the value expected by Mosaik.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `field` | [`IDynamicFormFieldDefinition`](Interface.IDynamicFormFieldDefinition) | Dynamic field definition. |

#### Returns

`Date` \| `null`

Latest accepted date or `null`.

***

### maximumLength()

```ts
protected maximumLength(field): number | null;
```

Defined in: [libs/ui/src/components/dynamic-form/DynamicFormComponent.ts:612](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/dynamic-form/DynamicFormComponent.ts#L612)

Resolves the maximum text length declared for a field.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `field` | [`IDynamicFormFieldDefinition`](Interface.IDynamicFormFieldDefinition) | Dynamic field definition. |

#### Returns

`number` \| `null`

Maximum length or `null` when unrestricted.

***

### minimumDate()

```ts
protected minimumDate(field): Date | null;
```

Defined in: [libs/ui/src/components/dynamic-form/DynamicFormComponent.ts:623](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/dynamic-form/DynamicFormComponent.ts#L623)

Resolves an optional minimum date into the value expected by Mosaik.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `field` | [`IDynamicFormFieldDefinition`](Interface.IDynamicFormFieldDefinition) | Dynamic field definition. |

#### Returns

`Date` \| `null`

Earliest accepted date or `null`.

***

### ngOnChanges()

```ts
ngOnChanges(changes): void;
```

Defined in: [libs/ui/src/components/dynamic-form/DynamicFormComponent.ts:517](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/dynamic-form/DynamicFormComponent.ts#L517)

Rebuilds the versioned field tree when its definition changes.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `changes` | \{ \[`propName`: `string`\]: `SimpleChange`\<`any`\>; \} | Angular input changes. |

#### Returns

`void`

#### Implementation of

`OnChanges.ngOnChanges`

***

### readonlyValue()

```ts
protected readonlyValue(field): string;
```

Defined in: [libs/ui/src/components/dynamic-form/DynamicFormComponent.ts:645](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/dynamic-form/DynamicFormComponent.ts#L645)

Resolves a readonly value to its human-readable representation.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `field` | [`IDynamicFormFieldDefinition`](Interface.IDynamicFormFieldDefinition) | Dynamic field definition. |

#### Returns

`string`

Human-readable value.
