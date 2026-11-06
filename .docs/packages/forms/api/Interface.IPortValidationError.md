---
title: 'Interface: IPortValidationError'
generated: true
editUrl: false
---
# Interface: IPortValidationError

Defined in: [validators/IPortValidationError.ts:12](https://github.com/pixel-brewery/ngpel/blob/main/libs/forms/src/validators/IPortValidationError.ts#L12)

Validation error emitted for a string that is not a TCP port number between 1 and 65535.

## Extends

- `ValidationError`

## Properties

### actualValue

```ts
readonly actualValue: string;
```

Defined in: [validators/IPortValidationError.ts:18](https://github.com/pixel-brewery/ngpel/blob/main/libs/forms/src/validators/IPortValidationError.ts#L18)

The rejected field value.

***

### kind

```ts
readonly kind: "port";
```

Defined in: [validators/IPortValidationError.ts:15](https://github.com/pixel-brewery/ngpel/blob/main/libs/forms/src/validators/IPortValidationError.ts#L15)

Identifies the kind of error.

#### Overrides

```ts
ValidationError.kind
```
