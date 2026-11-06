---
title: 'Interface: ISingleLineValidationError'
generated: true
editUrl: false
---
# Interface: ISingleLineValidationError

Defined in: [validators/ISingleLineValidationError.ts:12](https://github.com/pixel-brewery/ngpel/blob/main/libs/forms/src/validators/ISingleLineValidationError.ts#L12)

Validation error emitted when text contains control characters or Unicode line or paragraph separators.

## Extends

- `ValidationError`

## Properties

### actualValue

```ts
readonly actualValue: string;
```

Defined in: [validators/ISingleLineValidationError.ts:18](https://github.com/pixel-brewery/ngpel/blob/main/libs/forms/src/validators/ISingleLineValidationError.ts#L18)

The rejected field value.

***

### kind

```ts
readonly kind: "singleLine";
```

Defined in: [validators/ISingleLineValidationError.ts:15](https://github.com/pixel-brewery/ngpel/blob/main/libs/forms/src/validators/ISingleLineValidationError.ts#L15)

Identifies the kind of error.

#### Overrides

```ts
ValidationError.kind
```
