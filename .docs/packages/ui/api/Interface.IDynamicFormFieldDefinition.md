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
readonly description?: string;
```

Defined in: [libs/ui/src/components/dynamic-form/IDynamicFormFieldDefinition.ts:48](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/dynamic-form/IDynamicFormFieldDefinition.ts#L48)

Optional supporting description.

***

### emptyValueLabel?

```ts
readonly emptyValueLabel?: string;
```

Defined in: [libs/ui/src/components/dynamic-form/IDynamicFormFieldDefinition.ts:166](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/dynamic-form/IDynamicFormFieldDefinition.ts#L166)

Label shown for a missing readonly value.

***

### initialValue?

```ts
readonly initialValue?: DynamicFormValue;
```

Defined in: [libs/ui/src/components/dynamic-form/IDynamicFormFieldDefinition.ts:91](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/dynamic-form/IDynamicFormFieldDefinition.ts#L91)

Initial value used when the value map has no matching key.

***

### integer?

```ts
readonly integer?: boolean;
```

Defined in: [libs/ui/src/components/dynamic-form/IDynamicFormFieldDefinition.ts:134](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/dynamic-form/IDynamicFormFieldDefinition.ts#L134)

Whether a number field accepts only whole values.

***

### isClearable?

```ts
readonly isClearable?: boolean;
```

Defined in: [libs/ui/src/components/dynamic-form/IDynamicFormFieldDefinition.ts:83](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/dynamic-form/IDynamicFormFieldDefinition.ts#L83)

Whether an optional field offers a clear action. Defaults to true.

***

### isReadonly?

```ts
readonly isReadonly?: boolean;
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
readonly layout?: IDynamicFormFieldLayout;
```

Defined in: [libs/ui/src/components/dynamic-form/IDynamicFormFieldDefinition.ts:107](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/dynamic-form/IDynamicFormFieldDefinition.ts#L107)

Responsive twelve-column placement.

***

### link?

```ts
readonly link?: IDynamicFormLinkConfiguration;
```

Defined in: [libs/ui/src/components/dynamic-form/IDynamicFormFieldDefinition.ts:174](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/dynamic-form/IDynamicFormFieldDefinition.ts#L174)

Labels used by a read-only link renderer.

***

### maximum?

```ts
readonly maximum?: number;
```

Defined in: [libs/ui/src/components/dynamic-form/IDynamicFormFieldDefinition.ts:131](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/dynamic-form/IDynamicFormFieldDefinition.ts#L131)

Maximum accepted number.

***

### maximumDate?

```ts
readonly maximumDate?: string | Date;
```

Defined in: [libs/ui/src/components/dynamic-form/IDynamicFormFieldDefinition.ts:158](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/dynamic-form/IDynamicFormFieldDefinition.ts#L158)

Latest accepted date.

***

### minimum?

```ts
readonly minimum?: number;
```

Defined in: [libs/ui/src/components/dynamic-form/IDynamicFormFieldDefinition.ts:123](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/dynamic-form/IDynamicFormFieldDefinition.ts#L123)

Minimum accepted number.

***

### minimumDate?

```ts
readonly minimumDate?: string | Date;
```

Defined in: [libs/ui/src/components/dynamic-form/IDynamicFormFieldDefinition.ts:150](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/dynamic-form/IDynamicFormFieldDefinition.ts#L150)

Earliest accepted date.

***

### multilineRows?

```ts
readonly multilineRows?: number;
```

Defined in: [libs/ui/src/components/dynamic-form/IDynamicFormFieldDefinition.ts:115](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/dynamic-form/IDynamicFormFieldDefinition.ts#L115)

Initial row count for a multiline textbox.

***

### options?

```ts
readonly options?: readonly IDynamicFormOption[];
```

Defined in: [libs/ui/src/components/dynamic-form/IDynamicFormFieldDefinition.ts:99](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/dynamic-form/IDynamicFormFieldDefinition.ts#L99)

Choice options or display mappings for the field. Multiple-choice options use string values.

***

### placeholder?

```ts
readonly placeholder?: string;
```

Defined in: [libs/ui/src/components/dynamic-form/IDynamicFormFieldDefinition.ts:56](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/dynamic-form/IDynamicFormFieldDefinition.ts#L56)

Optional empty-input hint.

***

### required?

```ts
readonly required?: boolean;
```

Defined in: [libs/ui/src/components/dynamic-form/IDynamicFormFieldDefinition.ts:64](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/dynamic-form/IDynamicFormFieldDefinition.ts#L64)

Whether a non-empty value is required.

***

### step?

```ts
readonly step?: number;
```

Defined in: [libs/ui/src/components/dynamic-form/IDynamicFormFieldDefinition.ts:142](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/dynamic-form/IDynamicFormFieldDefinition.ts#L142)

Increment used by a number renderer.

***

### validationRules?

```ts
readonly validationRules?: readonly IDynamicFormValidationRule[];
```

Defined in: [libs/ui/src/components/dynamic-form/IDynamicFormFieldDefinition.ts:72](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/dynamic-form/IDynamicFormFieldDefinition.ts#L72)

Declarative validation rules owned and interpreted by the UI.
