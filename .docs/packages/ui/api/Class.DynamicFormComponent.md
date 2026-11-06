---
title: 'Class: DynamicFormComponent'
generated: true
editUrl: false
---
# Class: DynamicFormComponent

Defined in: [libs/ui/src/components/dynamic-form/DynamicFormComponent.ts:344](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/dynamic-form/DynamicFormComponent.ts#L344)

Renders a versioned UI-owned form definition with Mosaik controls and Signal Forms.

## Implements

- `OnChanges`

## Constructors

### Constructor

```ts
new DynamicFormComponent(): DynamicFormComponent;
```

Defined in: [libs/ui/src/components/dynamic-form/DynamicFormComponent.ts:357](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/dynamic-form/DynamicFormComponent.ts#L357)

#### Returns

`DynamicFormComponent`

## Properties

### canSubmit

```ts
readonly canSubmit: Signal<boolean>;
```

Defined in: [libs/ui/src/components/dynamic-form/DynamicFormComponent.ts:419](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/dynamic-form/DynamicFormComponent.ts#L419)

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
  Number: "number";
  Password: "password";
  Readonly: "readonly";
  Select: "select";
  Text: "text";
} = DynamicFormControlType;
```

Defined in: [libs/ui/src/components/dynamic-form/DynamicFormComponent.ts:431](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/dynamic-form/DynamicFormComponent.ts#L431)

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

#### Number

```ts
readonly Number: "number" = 'number';
```

#### Password

```ts
readonly Password: "password" = 'password';
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

Defined in: [libs/ui/src/components/dynamic-form/DynamicFormComponent.ts:376](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/dynamic-form/DynamicFormComponent.ts#L376)

Definition rendered by the component.

***

### isReadonly

```ts
readonly isReadonly: InputSignal<boolean>;
```

Defined in: [libs/ui/src/components/dynamic-form/DynamicFormComponent.ts:384](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/dynamic-form/DynamicFormComponent.ts#L384)

Forces every editable control into a read-only presentation.

***

### valid

```ts
readonly valid: Signal<boolean>;
```

Defined in: [libs/ui/src/components/dynamic-form/DynamicFormComponent.ts:411](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/dynamic-form/DynamicFormComponent.ts#L411)

Indicates whether the complete dynamic form is valid and has no pending validation.

***

### validationAttempted

```ts
readonly validationAttempted: InputSignal<boolean>;
```

Defined in: [libs/ui/src/components/dynamic-form/DynamicFormComponent.ts:395](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/dynamic-form/DynamicFormComponent.ts#L395)

Indicates that the host attempted to submit the form.

The renderer keeps validation presentation UI-owned and marks its
editable controls as touched when a host requests validation.

***

### value

```ts
readonly value: ModelSignal<DynamicFormValues>;
```

Defined in: [libs/ui/src/components/dynamic-form/DynamicFormComponent.ts:403](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/dynamic-form/DynamicFormComponent.ts#L403)

Two-way value map of all dynamic fields.

## Methods

### copyLink()

```ts
protected copyLink(field): Promise<void>;
```

Defined in: [libs/ui/src/components/dynamic-form/DynamicFormComponent.ts:689](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/dynamic-form/DynamicFormComponent.ts#L689)

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

Defined in: [libs/ui/src/components/dynamic-form/DynamicFormComponent.ts:462](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/dynamic-form/DynamicFormComponent.ts#L462)

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

Defined in: [libs/ui/src/components/dynamic-form/DynamicFormComponent.ts:512](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/dynamic-form/DynamicFormComponent.ts#L512)

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

Defined in: [libs/ui/src/components/dynamic-form/DynamicFormComponent.ts:501](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/dynamic-form/DynamicFormComponent.ts#L501)

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

Defined in: [libs/ui/src/components/dynamic-form/DynamicFormComponent.ts:490](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/dynamic-form/DynamicFormComponent.ts#L490)

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

Defined in: [libs/ui/src/components/dynamic-form/DynamicFormComponent.ts:479](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/dynamic-form/DynamicFormComponent.ts#L479)

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

Defined in: [libs/ui/src/components/dynamic-form/DynamicFormComponent.ts:646](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/dynamic-form/DynamicFormComponent.ts#L646)

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

Defined in: [libs/ui/src/components/dynamic-form/DynamicFormComponent.ts:668](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/dynamic-form/DynamicFormComponent.ts#L668)

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

Defined in: [libs/ui/src/components/dynamic-form/DynamicFormComponent.ts:657](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/dynamic-form/DynamicFormComponent.ts#L657)

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

Defined in: [libs/ui/src/components/dynamic-form/DynamicFormComponent.ts:633](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/dynamic-form/DynamicFormComponent.ts#L633)

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

Defined in: [libs/ui/src/components/dynamic-form/DynamicFormComponent.ts:583](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/dynamic-form/DynamicFormComponent.ts#L583)

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

Defined in: [libs/ui/src/components/dynamic-form/DynamicFormComponent.ts:545](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/dynamic-form/DynamicFormComponent.ts#L545)

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

Defined in: [libs/ui/src/components/dynamic-form/DynamicFormComponent.ts:523](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/dynamic-form/DynamicFormComponent.ts#L523)

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

Defined in: [libs/ui/src/components/dynamic-form/DynamicFormComponent.ts:534](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/dynamic-form/DynamicFormComponent.ts#L534)

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

Defined in: [libs/ui/src/components/dynamic-form/DynamicFormComponent.ts:443](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/dynamic-form/DynamicFormComponent.ts#L443)

Rebuilds the versioned field tree when its definition changes.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `changes` | \{ \[`propName`: `string`\]: `SimpleChange`\<`any`\>; \} | Angular input changes. |

#### Returns

`void`

#### Implementation of

```ts
OnChanges.ngOnChanges
```

***

### readonlyValue()

```ts
protected readonlyValue(field): string;
```

Defined in: [libs/ui/src/components/dynamic-form/DynamicFormComponent.ts:556](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/dynamic-form/DynamicFormComponent.ts#L556)

Resolves a readonly value to its human-readable representation.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `field` | [`IDynamicFormFieldDefinition`](Interface.IDynamicFormFieldDefinition) | Dynamic field definition. |

#### Returns

`string`

Human-readable value.
