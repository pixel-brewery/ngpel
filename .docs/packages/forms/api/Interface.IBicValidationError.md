---
title: 'Interface: IBicValidationError'
generated: true
editUrl: false
---
# Interface: IBicValidationError

Defined in: [validators/IBicValidationError.ts:12](https://github.com/pixel-brewery/ngpel/blob/main/libs/forms/src/validators/IBicValidationError.ts#L12)

Validation error emitted for an invalid ISO 9362 Business Identifier Code.

## Extends

- `ValidationError`

## Properties

### actualValue

```ts
readonly actualValue: string;
```

Defined in: [validators/IBicValidationError.ts:18](https://github.com/pixel-brewery/ngpel/blob/main/libs/forms/src/validators/IBicValidationError.ts#L18)

The rejected field value.

***

### kind

```ts
readonly kind: "bic";
```

Defined in: [validators/IBicValidationError.ts:15](https://github.com/pixel-brewery/ngpel/blob/main/libs/forms/src/validators/IBicValidationError.ts#L15)

Identifies the kind of error.

#### Overrides

```ts
ValidationError.kind
```
