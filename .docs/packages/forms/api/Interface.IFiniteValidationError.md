---
title: 'Interface: IFiniteValidationError'
generated: true
editUrl: false
---
# Interface: IFiniteValidationError

Defined in: [validators/IFiniteValidationError.ts:12](https://github.com/pixel-brewery/ngpel/blob/main/libs/forms/src/validators/IFiniteValidationError.ts#L12)

Validation error emitted for a number that is `NaN` or infinite.

## Extends

- `ValidationError`

## Properties

### actualValue

```ts
readonly actualValue: number;
```

Defined in: [validators/IFiniteValidationError.ts:18](https://github.com/pixel-brewery/ngpel/blob/main/libs/forms/src/validators/IFiniteValidationError.ts#L18)

The rejected field value.

***

### kind

```ts
readonly kind: "finite";
```

Defined in: [validators/IFiniteValidationError.ts:15](https://github.com/pixel-brewery/ngpel/blob/main/libs/forms/src/validators/IFiniteValidationError.ts#L15)

Identifies the kind of error.

#### Overrides

`ValidationError.kind`
