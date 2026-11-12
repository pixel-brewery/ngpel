---
title: 'Interface: IUuidValidationError'
generated: true
editUrl: false
---
# Interface: IUuidValidationError

Defined in: [validators/IUuidValidationError.ts:12](https://github.com/pixel-brewery/ngpel/blob/main/libs/forms/src/validators/IUuidValidationError.ts#L12)

Validation error emitted for a string that is not a canonical RFC 9562 UUID.

## Extends

- `ValidationError`

## Properties

### actualValue

```ts
readonly actualValue: string;
```

Defined in: [validators/IUuidValidationError.ts:18](https://github.com/pixel-brewery/ngpel/blob/main/libs/forms/src/validators/IUuidValidationError.ts#L18)

The rejected field value.

***

### kind

```ts
readonly kind: "uuid";
```

Defined in: [validators/IUuidValidationError.ts:15](https://github.com/pixel-brewery/ngpel/blob/main/libs/forms/src/validators/IUuidValidationError.ts#L15)

Identifies the kind of error.

#### Overrides

`ValidationError.kind`
