---
title: 'Function: calendarDateNotBefore()'
generated: true
editUrl: false
---
# Function: calendarDateNotBefore()

```ts
function calendarDateNotBefore<TPathKind>(
   path,
   minDate,
   config?
): void;
```

Defined in: [validators/calendarDateNotBefore.ts:26](https://github.com/pixel-brewery/ngpel/blob/main/libs/forms/src/validators/calendarDateNotBefore.ts#L26)

Requires a present valid `Date` to fall on or after a minimum calendar day. Times are deliberately
ignored because form dates represent business calendar days rather than instants; the comparison
uses the local calendar day of both values. Invalid dates are left to `validDate`; `null` values
and a `null` bound pass.

## Type Parameters

| Type Parameter | Default type | Description |
| ------ | ------ | ------ |
| <a id="type-parameter-tpathkind"></a> `TPathKind` *extends* `PathKind` | `Root` | The kind of the validated path. |

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `path` | `SchemaPath`\<`Date` \| `null`, `1`, `TPathKind`\> | Signal Forms schema path to validate. |
| `minDate` | [`CalendarDateReference`](TypeAlias.CalendarDateReference)\<`TPathKind`\> | Earliest accepted calendar date or its context-dependent resolver. |
| `config?` | [`SignalValidatorConfig`](TypeAlias.SignalValidatorConfig)\<`Date` \| `null`, `TPathKind`\> | Optional custom message, error or activation condition. |

## Returns

`void`
