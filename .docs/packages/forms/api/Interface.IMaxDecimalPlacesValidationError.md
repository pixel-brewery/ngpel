---
title: 'Interface: IMaxDecimalPlacesValidationError'
generated: true
editUrl: false
---
# Interface: IMaxDecimalPlacesValidationError

Defined in: [validators/IMaxDecimalPlacesValidationError.ts:12](https://github.com/pixel-brewery/ngpel/blob/main/libs/forms/src/validators/IMaxDecimalPlacesValidationError.ts#L12)

Validation error emitted when a number carries more decimal places than allowed.

## Extends

- `ValidationError`

## Properties

### actualValue

```ts
readonly actualValue: number;
```

Defined in: [validators/IMaxDecimalPlacesValidationError.ts:18](https://github.com/pixel-brewery/ngpel/blob/main/libs/forms/src/validators/IMaxDecimalPlacesValidationError.ts#L18)

The rejected field value.

***

### kind

```ts
readonly kind: "maxDecimalPlaces";
```

Defined in: [validators/IMaxDecimalPlacesValidationError.ts:15](https://github.com/pixel-brewery/ngpel/blob/main/libs/forms/src/validators/IMaxDecimalPlacesValidationError.ts#L15)

Identifies the kind of error.

#### Overrides

```ts
ValidationError.kind
```

***

### maxDecimalPlaces

```ts
readonly maxDecimalPlaces: number;
```

Defined in: [validators/IMaxDecimalPlacesValidationError.ts:21](https://github.com/pixel-brewery/ngpel/blob/main/libs/forms/src/validators/IMaxDecimalPlacesValidationError.ts#L21)

The maximum number of decimal places accepted.
