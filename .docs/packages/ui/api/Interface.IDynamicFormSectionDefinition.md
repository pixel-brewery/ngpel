---
title: 'Interface: IDynamicFormSectionDefinition'
generated: true
editUrl: false
---
# Interface: IDynamicFormSectionDefinition

Defined in: [libs/ui/src/components/dynamic-form/IDynamicFormSectionDefinition.ts:12](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/dynamic-form/IDynamicFormSectionDefinition.ts#L12)

Visual section containing related dynamic form fields.

## Properties

### description?

```ts
readonly description?: string;
```

Defined in: [libs/ui/src/components/dynamic-form/IDynamicFormSectionDefinition.ts:35](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/dynamic-form/IDynamicFormSectionDefinition.ts#L35)

Optional section description.

***

### fields

```ts
readonly fields: readonly IDynamicFormFieldDefinition[];
```

Defined in: [libs/ui/src/components/dynamic-form/IDynamicFormSectionDefinition.ts:43](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/dynamic-form/IDynamicFormSectionDefinition.ts#L43)

Fields rendered in their declared order.

***

### key

```ts
readonly key: string;
```

Defined in: [libs/ui/src/components/dynamic-form/IDynamicFormSectionDefinition.ts:19](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/dynamic-form/IDynamicFormSectionDefinition.ts#L19)

Stable section key.

***

### title?

```ts
readonly title?: string;
```

Defined in: [libs/ui/src/components/dynamic-form/IDynamicFormSectionDefinition.ts:27](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/dynamic-form/IDynamicFormSectionDefinition.ts#L27)

Optional section title.
