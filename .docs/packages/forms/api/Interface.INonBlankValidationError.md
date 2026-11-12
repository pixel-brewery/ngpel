---
title: 'Interface: INonBlankValidationError'
generated: true
editUrl: false
---
# Interface: INonBlankValidationError

Defined in: [validators/INonBlankValidationError.ts:12](https://github.com/pixel-brewery/ngpel/blob/main/libs/forms/src/validators/INonBlankValidationError.ts#L12)

Validation error emitted when a string contains no non-whitespace character. The kind aliases Angular's built-in `required` error so existing error slots match.

## Extends

- `ValidationError`

## Properties

### actualValue

```ts
readonly actualValue: string;
```

Defined in: [validators/INonBlankValidationError.ts:18](https://github.com/pixel-brewery/ngpel/blob/main/libs/forms/src/validators/INonBlankValidationError.ts#L18)

The rejected field value.

***

### kind

```ts
readonly kind: "required";
```

Defined in: [validators/INonBlankValidationError.ts:15](https://github.com/pixel-brewery/ngpel/blob/main/libs/forms/src/validators/INonBlankValidationError.ts#L15)

Identifies the kind of error.

#### Overrides

`ValidationError.kind`
