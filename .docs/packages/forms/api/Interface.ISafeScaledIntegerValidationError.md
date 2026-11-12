---
title: 'Interface: ISafeScaledIntegerValidationError'
generated: true
editUrl: false
---
# Interface: ISafeScaledIntegerValidationError

Defined in: [validators/ISafeScaledIntegerValidationError.ts:13](https://github.com/pixel-brewery/ngpel/blob/main/libs/forms/src/validators/ISafeScaledIntegerValidationError.ts#L13)

Validation error emitted when a number leaves JavaScript's safe-integer range once multiplied by
its scale factor.

## Extends

- `ValidationError`

## Properties

### actualValue

```ts
readonly actualValue: number;
```

Defined in: [validators/ISafeScaledIntegerValidationError.ts:19](https://github.com/pixel-brewery/ngpel/blob/main/libs/forms/src/validators/ISafeScaledIntegerValidationError.ts#L19)

The rejected field value.

***

### factor

```ts
readonly factor: number;
```

Defined in: [validators/ISafeScaledIntegerValidationError.ts:22](https://github.com/pixel-brewery/ngpel/blob/main/libs/forms/src/validators/ISafeScaledIntegerValidationError.ts#L22)

The scale factor the value was multiplied by.

***

### kind

```ts
readonly kind: "safeScaledInteger";
```

Defined in: [validators/ISafeScaledIntegerValidationError.ts:16](https://github.com/pixel-brewery/ngpel/blob/main/libs/forms/src/validators/ISafeScaledIntegerValidationError.ts#L16)

Identifies the kind of error.

#### Overrides

`ValidationError.kind`
