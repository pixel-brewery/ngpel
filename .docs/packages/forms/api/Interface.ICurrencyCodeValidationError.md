---
title: 'Interface: ICurrencyCodeValidationError'
generated: true
editUrl: false
---
# Interface: ICurrencyCodeValidationError

Defined in: [validators/ICurrencyCodeValidationError.ts:12](https://github.com/pixel-brewery/ngpel/blob/main/libs/forms/src/validators/ICurrencyCodeValidationError.ts#L12)

Validation error emitted for an invalid ISO 4217 alphabetic currency code.

## Extends

- `ValidationError`

## Properties

### actualValue

```ts
readonly actualValue: string;
```

Defined in: [validators/ICurrencyCodeValidationError.ts:18](https://github.com/pixel-brewery/ngpel/blob/main/libs/forms/src/validators/ICurrencyCodeValidationError.ts#L18)

The rejected field value.

***

### kind

```ts
readonly kind: "currencyCode";
```

Defined in: [validators/ICurrencyCodeValidationError.ts:15](https://github.com/pixel-brewery/ngpel/blob/main/libs/forms/src/validators/ICurrencyCodeValidationError.ts#L15)

Identifies the kind of error.

#### Overrides

```ts
ValidationError.kind
```
