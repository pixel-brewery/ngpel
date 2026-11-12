---
title: 'Interface: ISafeIntegerValidationError'
generated: true
editUrl: false
---
# Interface: ISafeIntegerValidationError

Defined in: [validators/ISafeIntegerValidationError.ts:12](https://github.com/pixel-brewery/ngpel/blob/main/libs/forms/src/validators/ISafeIntegerValidationError.ts#L12)

Validation error emitted for a number that is not a safe integer.

## Extends

- `ValidationError`

## Properties

### actualValue

```ts
readonly actualValue: number;
```

Defined in: [validators/ISafeIntegerValidationError.ts:18](https://github.com/pixel-brewery/ngpel/blob/main/libs/forms/src/validators/ISafeIntegerValidationError.ts#L18)

The rejected field value.

***

### kind

```ts
readonly kind: "safeInteger";
```

Defined in: [validators/ISafeIntegerValidationError.ts:15](https://github.com/pixel-brewery/ngpel/blob/main/libs/forms/src/validators/ISafeIntegerValidationError.ts#L15)

Identifies the kind of error.

#### Overrides

`ValidationError.kind`
