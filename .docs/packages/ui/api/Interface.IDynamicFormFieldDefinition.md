---
title: 'Interface: IDynamicFormFieldDefinition'
generated: true
editUrl: false
---
# Interface: IDynamicFormFieldDefinition

Defined in: [libs/ui/src/components/dynamic-form/IDynamicFormFieldDefinition.ts:17](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/dynamic-form/IDynamicFormFieldDefinition.ts#L17)

UI-owned definition of one dynamically rendered form field.

## Properties

### controlType

```ts
readonly controlType: DynamicFormControlTypeValue;
```

Defined in: [libs/ui/src/components/dynamic-form/IDynamicFormFieldDefinition.ts:32](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/dynamic-form/IDynamicFormFieldDefinition.ts#L32)

Renderer kind selected by the UI.

***

### description?

```ts
readonly optional description?: string;
```

Defined in: [libs/ui/src/components/dynamic-form/IDynamicFormFieldDefinition.ts:48](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/dynamic-form/IDynamicFormFieldDefinition.ts#L48)

Optional supporting description.

***

### emptyValueLabel?

```ts
readonly optional emptyValueLabel?: string;
```

Defined in: [libs/ui/src/components/dynamic-form/IDynamicFormFieldDefinition.ts:160](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/dynamic-form/IDynamicFormFieldDefinition.ts#L160)

Label shown for a missing readonly value.

***

### initialValue?

```ts
readonly optional initialValue?: DynamicFormValue;
```

Defined in: [libs/ui/src/components/dynamic-form/IDynamicFormFieldDefinition.ts:88](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/dynamic-form/IDynamicFormFieldDefinition.ts#L88)

Initial value used when the value map has no matching key.

***

### isReadonly?

```ts
readonly optional isReadonly?: boolean;
```

Defined in: [libs/ui/src/components/dynamic-form/IDynamicFormFieldDefinition.ts:80](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/dynamic-form/IDynamicFormFieldDefinition.ts#L80)

Whether an otherwise editable renderer is locked.

***

### key

```ts
readonly key: string;
```

Defined in: [libs/ui/src/components/dynamic-form/IDynamicFormFieldDefinition.ts:24](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/dynamic-form/IDynamicFormFieldDefinition.ts#L24)

Stable field key used to address its value.

***

### label

```ts
readonly label: string;
```

Defined in: [libs/ui/src/components/dynamic-form/IDynamicFormFieldDefinition.ts:40](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/dynamic-form/IDynamicFormFieldDefinition.ts#L40)

Human-readable field label.

***

### layout?

```ts
readonly optional layout?: IDynamicFormFieldLayout;
```

Defined in: [libs/ui/src/components/dynamic-form/IDynamicFormFieldDefinition.ts:104](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/dynamic-form/IDynamicFormFieldDefinition.ts#L104)

Responsive twelve-column placement.

***

### link?

```ts
readonly optional link?: IDynamicFormLinkConfiguration;
```

Defined in: [libs/ui/src/components/dynamic-form/IDynamicFormFieldDefinition.ts:168](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/dynamic-form/IDynamicFormFieldDefinition.ts#L168)

Labels used by a read-only link renderer.

***

### maximum?

```ts
readonly optional maximum?: number;
```

Defined in: [libs/ui/src/components/dynamic-form/IDynamicFormFieldDefinition.ts:128](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/dynamic-form/IDynamicFormFieldDefinition.ts#L128)

Maximum accepted number.

***

### maximumDate?

```ts
readonly optional maximumDate?: string | Date;
```

Defined in: [libs/ui/src/components/dynamic-form/IDynamicFormFieldDefinition.ts:152](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/dynamic-form/IDynamicFormFieldDefinition.ts#L152)

Latest accepted date.

***

### minimum?

```ts
readonly optional minimum?: number;
```

Defined in: [libs/ui/src/components/dynamic-form/IDynamicFormFieldDefinition.ts:120](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/dynamic-form/IDynamicFormFieldDefinition.ts#L120)

Minimum accepted number.

***

### minimumDate?

```ts
readonly optional minimumDate?: string | Date;
```

Defined in: [libs/ui/src/components/dynamic-form/IDynamicFormFieldDefinition.ts:144](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/dynamic-form/IDynamicFormFieldDefinition.ts#L144)

Earliest accepted date.

***

### multilineRows?

```ts
readonly optional multilineRows?: number;
```

Defined in: [libs/ui/src/components/dynamic-form/IDynamicFormFieldDefinition.ts:112](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/dynamic-form/IDynamicFormFieldDefinition.ts#L112)

Initial row count for a multiline textbox.

***

### options?

```ts
readonly optional options?: readonly IDynamicFormOption[];
```

Defined in: [libs/ui/src/components/dynamic-form/IDynamicFormFieldDefinition.ts:96](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/dynamic-form/IDynamicFormFieldDefinition.ts#L96)

Select options or display mappings for the field.

***

### placeholder?

```ts
readonly optional placeholder?: string;
```

Defined in: [libs/ui/src/components/dynamic-form/IDynamicFormFieldDefinition.ts:56](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/dynamic-form/IDynamicFormFieldDefinition.ts#L56)

Optional empty-input hint.

***

### required?

```ts
readonly optional required?: boolean;
```

Defined in: [libs/ui/src/components/dynamic-form/IDynamicFormFieldDefinition.ts:64](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/dynamic-form/IDynamicFormFieldDefinition.ts#L64)

Whether a non-empty value is required.

***

### step?

```ts
readonly optional step?: number;
```

Defined in: [libs/ui/src/components/dynamic-form/IDynamicFormFieldDefinition.ts:136](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/dynamic-form/IDynamicFormFieldDefinition.ts#L136)

Increment used by a number renderer.

***

### validationRules?

```ts
readonly optional validationRules?: readonly IDynamicFormValidationRule[];
```

Defined in: [libs/ui/src/components/dynamic-form/IDynamicFormFieldDefinition.ts:72](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/dynamic-form/IDynamicFormFieldDefinition.ts#L72)

Declarative validation rules owned and interpreted by the UI.
