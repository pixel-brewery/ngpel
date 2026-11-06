---
title: 'Interface: IAllowedValueValidationError\<TValue\>'
generated: true
editUrl: false
---
# Interface: IAllowedValueValidationError\<TValue\>

Defined in: [validators/IAllowedValueValidationError.ts:13](https://github.com/pixel-brewery/ngpel/blob/main/libs/forms/src/validators/IAllowedValueValidationError.ts#L13)

Validation error emitted when a value is not part of the allowed set.

## Extends

- `ValidationError`

## Type Parameters

| Type Parameter | Description |
| ------ | ------ |
| `TValue` | The value type of the validated field. |

## Properties

### actualValue

```ts
readonly actualValue: TValue;
```

Defined in: [validators/IAllowedValueValidationError.ts:19](https://github.com/pixel-brewery/ngpel/blob/main/libs/forms/src/validators/IAllowedValueValidationError.ts#L19)

The rejected field value.

***

### allowedValues

```ts
readonly allowedValues: readonly TValue[];
```

Defined in: [validators/IAllowedValueValidationError.ts:22](https://github.com/pixel-brewery/ngpel/blob/main/libs/forms/src/validators/IAllowedValueValidationError.ts#L22)

The values the field accepts.

***

### kind

```ts
readonly kind: "allowedValue";
```

Defined in: [validators/IAllowedValueValidationError.ts:16](https://github.com/pixel-brewery/ngpel/blob/main/libs/forms/src/validators/IAllowedValueValidationError.ts#L16)

Identifies the kind of error.

#### Overrides

```ts
ValidationError.kind
```
