---
title: 'Interface: ISignalValidationIssueLike'
generated: true
editUrl: false
---
# Interface: ISignalValidationIssueLike

Defined in: [notification/models/ISignalValidationIssueLike.ts:9](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/notification/models/ISignalValidationIssueLike.ts#L9)

Structural shape of a Signal Forms validation issue, narrow enough that this package does not
depend on the forms package to report one. Each entry of [ISignalValidationIssueLike.errors](#errors)
is inspected for a user-facing message — a string, a signal of a string, or an object carrying
either under `message`.

## Properties

### errors

```ts
readonly errors: readonly unknown[];
```

Defined in: [notification/models/ISignalValidationIssueLike.ts:15](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/notification/models/ISignalValidationIssueLike.ts#L15)

The errors the validator produced for one field.
