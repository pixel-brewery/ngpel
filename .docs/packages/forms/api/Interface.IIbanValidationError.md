---
title: 'Interface: IIbanValidationError'
generated: true
editUrl: false
---
# Interface: IIbanValidationError

Defined in: [validators/IIbanValidationError.ts:12](https://github.com/pixel-brewery/ngpel/blob/main/libs/forms/src/validators/IIbanValidationError.ts#L12)

Validation error emitted for a structurally invalid IBAN or a failed IBAN checksum.

## Extends

- `ValidationError`

## Properties

### actualValue

```ts
readonly actualValue: string;
```

Defined in: [validators/IIbanValidationError.ts:18](https://github.com/pixel-brewery/ngpel/blob/main/libs/forms/src/validators/IIbanValidationError.ts#L18)

The rejected field value.

***

### kind

```ts
readonly kind: "iban";
```

Defined in: [validators/IIbanValidationError.ts:15](https://github.com/pixel-brewery/ngpel/blob/main/libs/forms/src/validators/IIbanValidationError.ts#L15)

Identifies the kind of error.

#### Overrides

`ValidationError.kind`
