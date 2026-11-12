---
title: 'Type Alias: CalendarDateReference\<TPathKind\>'
generated: true
editUrl: false
---
# Type Alias: CalendarDateReference\<TPathKind\>

```ts
type CalendarDateReference<TPathKind> =
  | Date
  | null
| LogicFn<Date | null, Date | null, TPathKind>;
```

Defined in: [validators/CalendarDateReference.ts:14](https://github.com/pixel-brewery/ngpel/blob/main/libs/forms/src/validators/CalendarDateReference.ts#L14)

Static or context-dependent minimum calendar date accepted by [calendarDateNotBefore](Function.calendarDateNotBefore).
`null` disables the bound.

## Type Parameters

| Type Parameter | Default type | Description |
| ------ | ------ | ------ |
| <a id="type-parameter-tpathkind"></a> `TPathKind` *extends* `PathKind` | `PathKind.Root` | The kind of the validated path. |
