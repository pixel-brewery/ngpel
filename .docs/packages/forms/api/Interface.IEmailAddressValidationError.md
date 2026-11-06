---
title: 'Interface: IEmailAddressValidationError'
generated: true
editUrl: false
---
# Interface: IEmailAddressValidationError

Defined in: [validators/IEmailAddressValidationError.ts:12](https://github.com/pixel-brewery/ngpel/blob/main/libs/forms/src/validators/IEmailAddressValidationError.ts#L12)

Validation error emitted for an invalid email address.

## Extends

- `ValidationError`

## Properties

### actualValue

```ts
readonly actualValue: string;
```

Defined in: [validators/IEmailAddressValidationError.ts:18](https://github.com/pixel-brewery/ngpel/blob/main/libs/forms/src/validators/IEmailAddressValidationError.ts#L18)

The rejected field value.

***

### kind

```ts
readonly kind: "email";
```

Defined in: [validators/IEmailAddressValidationError.ts:15](https://github.com/pixel-brewery/ngpel/blob/main/libs/forms/src/validators/IEmailAddressValidationError.ts#L15)

Identifies the kind of error.

#### Overrides

```ts
ValidationError.kind
```
