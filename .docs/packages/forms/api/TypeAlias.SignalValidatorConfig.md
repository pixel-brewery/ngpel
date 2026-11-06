---
title: 'Type Alias: SignalValidatorConfig\<TValue, TPathKind\>'
generated: true
editUrl: false
---
# Type Alias: SignalValidatorConfig\<TValue, TPathKind\>

```ts
type SignalValidatorConfig<TValue, TPathKind> =
  | {
  error?: never;
  message?: string | LogicFn<TValue, string, TPathKind>;
  when?: LogicFn<TValue, boolean, TPathKind>;
}
  | {
  error?:   | OneOrMany<ValidationError>
     | LogicFn<TValue, OneOrMany<ValidationError>, TPathKind>;
  message?: never;
  when?: LogicFn<TValue, boolean, TPathKind>;
};
```

Defined in: [config/SignalValidatorConfig.ts:17](https://github.com/pixel-brewery/ngpel/blob/main/libs/forms/src/config/SignalValidatorConfig.ts#L17)

Shared configuration accepted by every ngpel Signal Forms validator: an optional message or a
custom error (mutually exclusive) plus an optional activation condition. Messages and errors may
be static values or `LogicFn`s evaluated against the field context, which is where a product
plugs in its translation service.

## Type Parameters

| Type Parameter | Default type | Description |
| ------ | ------ | ------ |
| `TValue` | - | The value type of the validated field. |
| `TPathKind` *extends* `PathKind` | `PathKind.Root` | The kind of the validated path (root, child or array item). |

## Union Members

### Type Literal

```ts
{
  error?: never;
  message?: string | LogicFn<TValue, string, TPathKind>;
  when?: LogicFn<TValue, boolean, TPathKind>;
}
```

| Name | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| `error?` | `never` | - | [config/SignalValidatorConfig.ts:21](https://github.com/pixel-brewery/ngpel/blob/main/libs/forms/src/config/SignalValidatorConfig.ts#L21) |
| `message?` | `string` \| `LogicFn`\<`TValue`, `string`, `TPathKind`\> | Static message or context-dependent message resolver attached to the default error. | [config/SignalValidatorConfig.ts:20](https://github.com/pixel-brewery/ngpel/blob/main/libs/forms/src/config/SignalValidatorConfig.ts#L20) |
| `when?` | `LogicFn`\<`TValue`, `boolean`, `TPathKind`\> | Activation condition; the validator is skipped while it returns `false`. | [config/SignalValidatorConfig.ts:23](https://github.com/pixel-brewery/ngpel/blob/main/libs/forms/src/config/SignalValidatorConfig.ts#L23) |

***

### Type Literal

```ts
{
  error?:   | OneOrMany<ValidationError>
     | LogicFn<TValue, OneOrMany<ValidationError>, TPathKind>;
  message?: never;
  when?: LogicFn<TValue, boolean, TPathKind>;
}
```

| Name | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| `error?` | \| `OneOrMany`\<`ValidationError`\> \| `LogicFn`\<`TValue`, `OneOrMany`\<`ValidationError`\>, `TPathKind`\> | Custom error (or errors) replacing the validator's default error shape. | [config/SignalValidatorConfig.ts:27](https://github.com/pixel-brewery/ngpel/blob/main/libs/forms/src/config/SignalValidatorConfig.ts#L27) |
| `message?` | `never` | - | [config/SignalValidatorConfig.ts:28](https://github.com/pixel-brewery/ngpel/blob/main/libs/forms/src/config/SignalValidatorConfig.ts#L28) |
| `when?` | `LogicFn`\<`TValue`, `boolean`, `TPathKind`\> | Activation condition; the validator is skipped while it returns `false`. | [config/SignalValidatorConfig.ts:30](https://github.com/pixel-brewery/ngpel/blob/main/libs/forms/src/config/SignalValidatorConfig.ts#L30) |
