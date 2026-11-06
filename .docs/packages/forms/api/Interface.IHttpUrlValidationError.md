---
title: 'Interface: IHttpUrlValidationError'
generated: true
editUrl: false
---
# Interface: IHttpUrlValidationError

Defined in: [validators/IHttpUrlValidationError.ts:12](https://github.com/pixel-brewery/ngpel/blob/main/libs/forms/src/validators/IHttpUrlValidationError.ts#L12)

Validation error emitted for a string that is not an absolute HTTP or HTTPS URL.

## Extends

- `ValidationError`

## Properties

### actualValue

```ts
readonly actualValue: string;
```

Defined in: [validators/IHttpUrlValidationError.ts:18](https://github.com/pixel-brewery/ngpel/blob/main/libs/forms/src/validators/IHttpUrlValidationError.ts#L18)

The rejected field value.

***

### kind

```ts
readonly kind: "httpUrl";
```

Defined in: [validators/IHttpUrlValidationError.ts:15](https://github.com/pixel-brewery/ngpel/blob/main/libs/forms/src/validators/IHttpUrlValidationError.ts#L15)

Identifies the kind of error.

#### Overrides

```ts
ValidationError.kind
```
