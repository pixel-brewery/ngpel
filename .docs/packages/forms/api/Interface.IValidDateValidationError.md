---
title: 'Interface: IValidDateValidationError'
generated: true
editUrl: false
---
# Interface: IValidDateValidationError

Defined in: [validators/IValidDateValidationError.ts:12](https://github.com/pixel-brewery/ngpel/blob/main/libs/forms/src/validators/IValidDateValidationError.ts#L12)

Validation error emitted for a value that is not a `Date` with a valid timestamp.

## Extends

- `ValidationError`

## Properties

### actualValue

```ts
readonly actualValue: Date;
```

Defined in: [validators/IValidDateValidationError.ts:18](https://github.com/pixel-brewery/ngpel/blob/main/libs/forms/src/validators/IValidDateValidationError.ts#L18)

The rejected field value.

***

### kind

```ts
readonly kind: "validDate";
```

Defined in: [validators/IValidDateValidationError.ts:15](https://github.com/pixel-brewery/ngpel/blob/main/libs/forms/src/validators/IValidDateValidationError.ts#L15)

Identifies the kind of error.

#### Overrides

`ValidationError.kind`
