---
title: 'Interface: IHttpsUrlValidationError'
generated: true
editUrl: false
---
# Interface: IHttpsUrlValidationError

Defined in: [validators/IHttpsUrlValidationError.ts:12](https://github.com/pixel-brewery/ngpel/blob/main/libs/forms/src/validators/IHttpsUrlValidationError.ts#L12)

Validation error emitted for a string that is not an absolute HTTPS URL.

## Extends

- `ValidationError`

## Properties

### actualValue

```ts
readonly actualValue: string;
```

Defined in: [validators/IHttpsUrlValidationError.ts:18](https://github.com/pixel-brewery/ngpel/blob/main/libs/forms/src/validators/IHttpsUrlValidationError.ts#L18)

The rejected field value.

***

### kind

```ts
readonly kind: "httpsUrl";
```

Defined in: [validators/IHttpsUrlValidationError.ts:15](https://github.com/pixel-brewery/ngpel/blob/main/libs/forms/src/validators/IHttpsUrlValidationError.ts#L15)

Identifies the kind of error.

#### Overrides

`ValidationError.kind`
