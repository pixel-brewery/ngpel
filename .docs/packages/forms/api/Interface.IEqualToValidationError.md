---
title: 'Interface: IEqualToValidationError\<TValue\>'
generated: true
editUrl: false
---
# Interface: IEqualToValidationError\<TValue\>

Defined in: [validators/IEqualToValidationError.ts:13](https://github.com/pixel-brewery/ngpel/blob/main/libs/forms/src/validators/IEqualToValidationError.ts#L13)

Validation error emitted when a value differs from its expected value.

## Extends

- `ValidationError`

## Type Parameters

| Type Parameter | Description |
| ------ | ------ |
| <a id="type-parameter-tvalue"></a> `TValue` | The value type of the validated field. |

## Properties

### actualValue

```ts
readonly actualValue: TValue;
```

Defined in: [validators/IEqualToValidationError.ts:19](https://github.com/pixel-brewery/ngpel/blob/main/libs/forms/src/validators/IEqualToValidationError.ts#L19)

The rejected field value.

***

### expectedValue

```ts
readonly expectedValue: TValue;
```

Defined in: [validators/IEqualToValidationError.ts:22](https://github.com/pixel-brewery/ngpel/blob/main/libs/forms/src/validators/IEqualToValidationError.ts#L22)

The value the field was expected to equal.

***

### kind

```ts
readonly kind: "equalTo";
```

Defined in: [validators/IEqualToValidationError.ts:16](https://github.com/pixel-brewery/ngpel/blob/main/libs/forms/src/validators/IEqualToValidationError.ts#L16)

Identifies the kind of error.

#### Overrides

`ValidationError.kind`
