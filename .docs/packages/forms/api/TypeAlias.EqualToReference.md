---
title: 'Type Alias: EqualToReference\<TValue, TPathKind\>'
generated: true
editUrl: false
---
# Type Alias: EqualToReference\<TValue, TPathKind\>

```ts
type EqualToReference<TValue, TPathKind> = TValue | LogicFn<TValue, TValue, TPathKind>;
```

Defined in: [validators/EqualToReference.ts:14](https://github.com/pixel-brewery/ngpel/blob/main/libs/forms/src/validators/EqualToReference.ts#L14)

Static or context-dependent expected value accepted by [equalTo](Function.equalTo).

## Type Parameters

| Type Parameter | Default type | Description |
| ------ | ------ | ------ |
| `TValue` | - | The value type of the validated field. |
| `TPathKind` *extends* `PathKind` | `PathKind.Root` | The kind of the validated path. |
