---
title: 'Interface: ISignalValidationIssueLike'
generated: true
editUrl: false
---
# Interface: ISignalValidationIssueLike

Defined in: [notification/models/ISignalValidationIssueLike.ts:8](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/notification/models/ISignalValidationIssueLike.ts#L8)

Structural shape of a Signal Forms validation issue, for reporting without a dependency on Angular Forms. Each entry of [ISignalValidationIssueLike.errors](#errors)
is inspected for a user-facing message — a string, a signal of a string, or an object carrying
either under `message`.

## Properties

### errors

```ts
readonly errors: readonly unknown[];
```

Defined in: [notification/models/ISignalValidationIssueLike.ts:14](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/notification/models/ISignalValidationIssueLike.ts#L14)

The errors the validator produced for one field.
