---
title: 'Interface: ICountryCodeValidationError'
generated: true
editUrl: false
---
# Interface: ICountryCodeValidationError

Defined in: [validators/ICountryCodeValidationError.ts:12](https://github.com/pixel-brewery/ngpel/blob/main/libs/forms/src/validators/ICountryCodeValidationError.ts#L12)

Validation error emitted for an invalid ISO 3166-1 alpha-2 country code.

## Extends

- `ValidationError`

## Properties

### actualValue

```ts
readonly actualValue: string;
```

Defined in: [validators/ICountryCodeValidationError.ts:18](https://github.com/pixel-brewery/ngpel/blob/main/libs/forms/src/validators/ICountryCodeValidationError.ts#L18)

The rejected field value.

***

### kind

```ts
readonly kind: "countryCode";
```

Defined in: [validators/ICountryCodeValidationError.ts:15](https://github.com/pixel-brewery/ngpel/blob/main/libs/forms/src/validators/ICountryCodeValidationError.ts#L15)

Identifies the kind of error.

#### Overrides

```ts
ValidationError.kind
```
