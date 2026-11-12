---
title: 'Interface: IHostnameValidationError'
generated: true
editUrl: false
---
# Interface: IHostnameValidationError

Defined in: [validators/IHostnameValidationError.ts:12](https://github.com/pixel-brewery/ngpel/blob/main/libs/forms/src/validators/IHostnameValidationError.ts#L12)

Validation error emitted for a string that is not a fully qualified hostname.

## Extends

- `ValidationError`

## Properties

### actualValue

```ts
readonly actualValue: string;
```

Defined in: [validators/IHostnameValidationError.ts:18](https://github.com/pixel-brewery/ngpel/blob/main/libs/forms/src/validators/IHostnameValidationError.ts#L18)

The rejected field value.

***

### kind

```ts
readonly kind: "hostname";
```

Defined in: [validators/IHostnameValidationError.ts:15](https://github.com/pixel-brewery/ngpel/blob/main/libs/forms/src/validators/IHostnameValidationError.ts#L15)

Identifies the kind of error.

#### Overrides

`ValidationError.kind`
