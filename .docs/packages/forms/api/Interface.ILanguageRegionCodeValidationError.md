---
title: 'Interface: ILanguageRegionCodeValidationError'
generated: true
editUrl: false
---
# Interface: ILanguageRegionCodeValidationError

Defined in: [validators/ILanguageRegionCodeValidationError.ts:12](https://github.com/pixel-brewery/ngpel/blob/main/libs/forms/src/validators/ILanguageRegionCodeValidationError.ts#L12)

Validation error emitted for an invalid language-region code such as `de-DE`.

## Extends

- `ValidationError`

## Properties

### actualValue

```ts
readonly actualValue: string;
```

Defined in: [validators/ILanguageRegionCodeValidationError.ts:18](https://github.com/pixel-brewery/ngpel/blob/main/libs/forms/src/validators/ILanguageRegionCodeValidationError.ts#L18)

The rejected field value.

***

### kind

```ts
readonly kind: "languageRegionCode";
```

Defined in: [validators/ILanguageRegionCodeValidationError.ts:15](https://github.com/pixel-brewery/ngpel/blob/main/libs/forms/src/validators/ILanguageRegionCodeValidationError.ts#L15)

Identifies the kind of error.

#### Overrides

`ValidationError.kind`
