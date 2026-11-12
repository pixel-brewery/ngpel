---
title: 'Interface: IDynamicFormValidationRule'
generated: true
editUrl: false
---
# Interface: IDynamicFormValidationRule

Defined in: [libs/ui/src/components/dynamic-form/IDynamicFormValidationRule.ts:12](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/dynamic-form/IDynamicFormValidationRule.ts#L12)

UI-owned declarative validation rule for a dynamic form field.

## Properties

### key

```ts
readonly key: DynamicFormValidationRuleKeyValue;
```

Defined in: [libs/ui/src/components/dynamic-form/IDynamicFormValidationRule.ts:19](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/dynamic-form/IDynamicFormValidationRule.ts#L19)

Stable rule key interpreted by the UI renderer.

***

### message?

```ts
readonly message?: string;
```

Defined in: [libs/ui/src/components/dynamic-form/IDynamicFormValidationRule.ts:35](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/dynamic-form/IDynamicFormValidationRule.ts#L35)

Optional localized validation message.

***

### value?

```ts
readonly value?: number;
```

Defined in: [libs/ui/src/components/dynamic-form/IDynamicFormValidationRule.ts:27](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/dynamic-form/IDynamicFormValidationRule.ts#L27)

Optional numeric rule parameter, such as the maximum string length.
