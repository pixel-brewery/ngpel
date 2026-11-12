---
title: 'Interface: IDynamicFormOption'
generated: true
editUrl: false
---
# Interface: IDynamicFormOption

Defined in: [libs/ui/src/components/dynamic-form/IDynamicFormOption.ts:12](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/dynamic-form/IDynamicFormOption.ts#L12)

Selectable option owned by the frontend dynamic form contract.

## Properties

### disabled?

```ts
readonly disabled?: boolean;
```

Defined in: [libs/ui/src/components/dynamic-form/IDynamicFormOption.ts:35](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/dynamic-form/IDynamicFormOption.ts#L35)

Whether the option cannot currently be selected.

***

### label

```ts
readonly label: string;
```

Defined in: [libs/ui/src/components/dynamic-form/IDynamicFormOption.ts:19](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/dynamic-form/IDynamicFormOption.ts#L19)

Human-readable option label.

***

### value

```ts
readonly value: DynamicFormOptionValue;
```

Defined in: [libs/ui/src/components/dynamic-form/IDynamicFormOption.ts:27](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/dynamic-form/IDynamicFormOption.ts#L27)

Stable scalar option value.
