---
title: 'Interface: IDateAfterValidationError'
generated: true
editUrl: false
---
# Interface: IDateAfterValidationError

Defined in: [validators/IDateAfterValidationError.ts:12](https://github.com/pixel-brewery/ngpel/blob/main/libs/forms/src/validators/IDateAfterValidationError.ts#L12)

Validation error emitted when a date is not strictly after its exclusive lower bound.

## Extends

- `ValidationError`

## Properties

### actualValue

```ts
readonly actualValue: Date;
```

Defined in: [validators/IDateAfterValidationError.ts:18](https://github.com/pixel-brewery/ngpel/blob/main/libs/forms/src/validators/IDateAfterValidationError.ts#L18)

The rejected field value.

***

### kind

```ts
readonly kind: "dateAfter";
```

Defined in: [validators/IDateAfterValidationError.ts:15](https://github.com/pixel-brewery/ngpel/blob/main/libs/forms/src/validators/IDateAfterValidationError.ts#L15)

Identifies the kind of error.

#### Overrides

```ts
ValidationError.kind
```

***

### minimum

```ts
readonly minimum: Date;
```

Defined in: [validators/IDateAfterValidationError.ts:21](https://github.com/pixel-brewery/ngpel/blob/main/libs/forms/src/validators/IDateAfterValidationError.ts#L21)

The exclusive lower bound the value had to exceed.
