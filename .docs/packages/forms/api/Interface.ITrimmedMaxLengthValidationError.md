---
title: 'Interface: ITrimmedMaxLengthValidationError'
generated: true
editUrl: false
---
# Interface: ITrimmedMaxLengthValidationError

Defined in: [validators/ITrimmedMaxLengthValidationError.ts:13](https://github.com/pixel-brewery/ngpel/blob/main/libs/forms/src/validators/ITrimmedMaxLengthValidationError.ts#L13)

Validation error emitted when trimmed text exceeds its maximum length. The kind matches
Angular's built-in `maxLength` error.

## Extends

- `ValidationError`

## Properties

### actualValue

```ts
readonly actualValue: string;
```

Defined in: [validators/ITrimmedMaxLengthValidationError.ts:19](https://github.com/pixel-brewery/ngpel/blob/main/libs/forms/src/validators/ITrimmedMaxLengthValidationError.ts#L19)

The rejected field value.

***

### kind

```ts
readonly kind: "maxLength";
```

Defined in: [validators/ITrimmedMaxLengthValidationError.ts:16](https://github.com/pixel-brewery/ngpel/blob/main/libs/forms/src/validators/ITrimmedMaxLengthValidationError.ts#L16)

Identifies the kind of error.

#### Overrides

`ValidationError.kind`

***

### maxLength

```ts
readonly maxLength: number;
```

Defined in: [validators/ITrimmedMaxLengthValidationError.ts:22](https://github.com/pixel-brewery/ngpel/blob/main/libs/forms/src/validators/ITrimmedMaxLengthValidationError.ts#L22)

The maximum length of the trimmed text.
