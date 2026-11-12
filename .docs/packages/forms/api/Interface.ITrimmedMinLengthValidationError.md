---
title: 'Interface: ITrimmedMinLengthValidationError'
generated: true
editUrl: false
---
# Interface: ITrimmedMinLengthValidationError

Defined in: [validators/ITrimmedMinLengthValidationError.ts:13](https://github.com/pixel-brewery/ngpel/blob/main/libs/forms/src/validators/ITrimmedMinLengthValidationError.ts#L13)

Validation error emitted when trimmed text is shorter than its minimum length. The kind aliases
Angular's built-in `minLength` error so existing error slots match.

## Extends

- `ValidationError`

## Properties

### actualValue

```ts
readonly actualValue: string;
```

Defined in: [validators/ITrimmedMinLengthValidationError.ts:19](https://github.com/pixel-brewery/ngpel/blob/main/libs/forms/src/validators/ITrimmedMinLengthValidationError.ts#L19)

The rejected field value.

***

### kind

```ts
readonly kind: "minLength";
```

Defined in: [validators/ITrimmedMinLengthValidationError.ts:16](https://github.com/pixel-brewery/ngpel/blob/main/libs/forms/src/validators/ITrimmedMinLengthValidationError.ts#L16)

Identifies the kind of error.

#### Overrides

`ValidationError.kind`

***

### minLength

```ts
readonly minLength: number;
```

Defined in: [validators/ITrimmedMinLengthValidationError.ts:22](https://github.com/pixel-brewery/ngpel/blob/main/libs/forms/src/validators/ITrimmedMinLengthValidationError.ts#L22)

The minimum length of the trimmed text.
