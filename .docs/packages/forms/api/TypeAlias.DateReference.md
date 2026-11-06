---
title: 'Type Alias: DateReference\<TPathKind\>'
generated: true
editUrl: false
---
# Type Alias: DateReference\<TPathKind\>

```ts
type DateReference<TPathKind> =
  | Date
  | null
| LogicFn<Date | null, Date | null, TPathKind>;
```

Defined in: [validators/DateReference.ts:14](https://github.com/pixel-brewery/ngpel/blob/main/libs/forms/src/validators/DateReference.ts#L14)

Static or context-dependent exclusive lower bound accepted by [dateAfter](Function.dateAfter). `null` disables
the bound.

## Type Parameters

| Type Parameter | Default type | Description |
| ------ | ------ | ------ |
| `TPathKind` *extends* `PathKind` | `PathKind.Root` | The kind of the validated path. |
