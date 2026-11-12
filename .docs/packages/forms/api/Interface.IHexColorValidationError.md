---
title: 'Interface: IHexColorValidationError'
generated: true
editUrl: false
---
# Interface: IHexColorValidationError

Defined in: [validators/IHexColorValidationError.ts:12](https://github.com/pixel-brewery/ngpel/blob/main/libs/forms/src/validators/IHexColorValidationError.ts#L12)

Validation error emitted for an invalid six-digit hexadecimal color.

## Extends

- `ValidationError`

## Properties

### actualValue

```ts
readonly actualValue: string;
```

Defined in: [validators/IHexColorValidationError.ts:18](https://github.com/pixel-brewery/ngpel/blob/main/libs/forms/src/validators/IHexColorValidationError.ts#L18)

The rejected field value.

***

### kind

```ts
readonly kind: "hexColor";
```

Defined in: [validators/IHexColorValidationError.ts:15](https://github.com/pixel-brewery/ngpel/blob/main/libs/forms/src/validators/IHexColorValidationError.ts#L15)

Identifies the kind of error.

#### Overrides

`ValidationError.kind`
