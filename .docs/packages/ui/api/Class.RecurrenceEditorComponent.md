---
title: 'Class: RecurrenceEditorComponent\<TNumber, TEnd\>'
generated: true
editUrl: false
---
# Class: RecurrenceEditorComponent\<TNumber, TEnd\>

Defined in: [libs/ui/src/components/recurrence-editor/RecurrenceEditorComponent.ts:352](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/recurrence-editor/RecurrenceEditorComponent.ts#L352)

Reusable RFC 5545 recurrence editor for Signal Forms.

## Type Parameters

| Type Parameter | Default type |
| ------ | ------ |
| <a id="type-parameter-tnumber"></a> `TNumber` *extends* `string` \| `number` \| `null` | `string` |
| <a id="type-parameter-tend"></a> `TEnd` *extends* `string` \| `Date` \| `null` | `string` |

## Implements

- `ITourAccessor`

## Constructors

### Constructor

```ts
new RecurrenceEditorComponent<TNumber, TEnd>(): RecurrenceEditorComponent<TNumber, TEnd>;
```

#### Returns

`RecurrenceEditorComponent`\<`TNumber`, `TEnd`\>

## Properties

### allowEnd

```ts
readonly allowEnd: InputSignal<boolean>;
```

Defined in: [libs/ui/src/components/recurrence-editor/RecurrenceEditorComponent.ts:401](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/recurrence-editor/RecurrenceEditorComponent.ts#L401)

Shows the controls for limiting the series.

***

### allowNone

```ts
readonly allowNone: InputSignal<boolean>;
```

Defined in: [libs/ui/src/components/recurrence-editor/RecurrenceEditorComponent.ts:398](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/recurrence-editor/RecurrenceEditorComponent.ts#L398)

Allows a one-off occurrence in the frequency options.

***

### byDaysField

```ts
readonly byDaysField: InputSignal<() => FieldState<string>>;
```

Defined in: [libs/ui/src/components/recurrence-editor/RecurrenceEditorComponent.ts:376](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/recurrence-editor/RecurrenceEditorComponent.ts#L376)

***

### countField

```ts
readonly countField: InputSignal<() => FieldState<TNumber>>;
```

Defined in: [libs/ui/src/components/recurrence-editor/RecurrenceEditorComponent.ts:380](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/recurrence-editor/RecurrenceEditorComponent.ts#L380)

***

### endAtField

```ts
readonly endAtField: InputSignal<() => FieldState<TEnd>>;
```

Defined in: [libs/ui/src/components/recurrence-editor/RecurrenceEditorComponent.ts:382](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/recurrence-editor/RecurrenceEditorComponent.ts#L382)

***

### endDateMode

```ts
readonly endDateMode: InputSignal<"instant" | "calendar-day">;
```

Defined in: [libs/ui/src/components/recurrence-editor/RecurrenceEditorComponent.ts:404](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/recurrence-editor/RecurrenceEditorComponent.ts#L404)

Controls whether the end field edits a calendar day or an instant.

***

### endModeField

```ts
readonly endModeField: InputSignal<() => FieldState<RecurrenceEndMode>>;
```

Defined in: [libs/ui/src/components/recurrence-editor/RecurrenceEditorComponent.ts:378](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/recurrence-editor/RecurrenceEditorComponent.ts#L378)

***

### endModeOptions

```ts
protected readonly endModeOptions: readonly IRecurrenceOption<RecurrenceEndMode>[] = RECURRENCE_END_MODE_OPTIONS;
```

Defined in: [libs/ui/src/components/recurrence-editor/RecurrenceEditorComponent.ts:511](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/recurrence-editor/RecurrenceEditorComponent.ts#L511)

***

### frequencyField

```ts
readonly frequencyField: InputSignal<() => FieldState<RecurrenceFrequency>>;
```

Defined in: [libs/ui/src/components/recurrence-editor/RecurrenceEditorComponent.ts:372](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/recurrence-editor/RecurrenceEditorComponent.ts#L372)

***

### frequencyOptions

```ts
protected readonly frequencyOptions: Signal<readonly RecurrenceFrequency[]>;
```

Defined in: [libs/ui/src/components/recurrence-editor/RecurrenceEditorComponent.ts:491](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/recurrence-editor/RecurrenceEditorComponent.ts#L491)

***

### intervalField

```ts
readonly intervalField: InputSignal<() => FieldState<string>>;
```

Defined in: [libs/ui/src/components/recurrence-editor/RecurrenceEditorComponent.ts:374](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/recurrence-editor/RecurrenceEditorComponent.ts#L374)

***

### intervalOptions

```ts
protected readonly intervalOptions: Signal<readonly IRecurrenceOption<number>[]>;
```

Defined in: [libs/ui/src/components/recurrence-editor/RecurrenceEditorComponent.ts:496](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/recurrence-editor/RecurrenceEditorComponent.ts#L496)

***

### labels

```ts
readonly labels: InputSignal<Partial<IRecurrenceEditorLabels>>;
```

Defined in: [libs/ui/src/components/recurrence-editor/RecurrenceEditorComponent.ts:392](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/recurrence-editor/RecurrenceEditorComponent.ts#L392)

***

### monthDayField

```ts
readonly monthDayField: InputSignal<() => FieldState<TNumber>>;
```

Defined in: [libs/ui/src/components/recurrence-editor/RecurrenceEditorComponent.ts:386](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/recurrence-editor/RecurrenceEditorComponent.ts#L386)

***

### monthlyModeField

```ts
readonly monthlyModeField: InputSignal<() => FieldState<RecurrenceMonthlyMode>>;
```

Defined in: [libs/ui/src/components/recurrence-editor/RecurrenceEditorComponent.ts:384](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/recurrence-editor/RecurrenceEditorComponent.ts#L384)

***

### monthlyModeOptions

```ts
protected readonly monthlyModeOptions: readonly IRecurrenceOption<RecurrenceMonthlyMode>[] = RECURRENCE_MONTHLY_MODE_OPTIONS;
```

Defined in: [libs/ui/src/components/recurrence-editor/RecurrenceEditorComponent.ts:507](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/recurrence-editor/RecurrenceEditorComponent.ts#L507)

***

### previewFrom

```ts
readonly previewFrom: InputSignal<Date | null>;
```

Defined in: [libs/ui/src/components/recurrence-editor/RecurrenceEditorComponent.ts:407](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/recurrence-editor/RecurrenceEditorComponent.ts#L407)

Reference day for the weekday and monthly choice previews. Omit to show the labels alone.

***

### resolvedLabels

```ts
protected readonly resolvedLabels: Signal<IRecurrenceEditorLabels>;
```

Defined in: [libs/ui/src/components/recurrence-editor/RecurrenceEditorComponent.ts:486](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/recurrence-editor/RecurrenceEditorComponent.ts#L486)

***

### summary

```ts
readonly summary: InputSignal<
  | {
  detail: string;
  head: string;
}
| undefined>;
```

Defined in: [libs/ui/src/components/recurrence-editor/RecurrenceEditorComponent.ts:395](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/recurrence-editor/RecurrenceEditorComponent.ts#L395)

Optional two-line summary. Defaults to the built-in read-only field.

***

### targets

```ts
readonly targets: WritableSignal<Map<
  | "count"
  | "endAt"
  | "endMode"
  | "frequency"
  | "interval"
  | "monthDay"
  | "monthlyMode"
  | "monthlyWeekday"
  | "ordinal"
  | "summary"
| "weekdays", ITourAccessorTarget>>;
```

Defined in: [libs/ui/src/components/recurrence-editor/RecurrenceEditorComponent.ts:410](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/recurrence-editor/RecurrenceEditorComponent.ts#L410)

Reactive component capabilities available to an external tour mapping.

#### Implementation of

`ITourAccessor.targets`

***

### weekdayField

```ts
readonly weekdayField: InputSignal<() => FieldState<RecurrenceWeekday>>;
```

Defined in: [libs/ui/src/components/recurrence-editor/RecurrenceEditorComponent.ts:390](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/recurrence-editor/RecurrenceEditorComponent.ts#L390)

***

### weekdayOptions

```ts
protected readonly weekdayOptions: readonly IRecurrenceOption<RecurrenceWeekday>[] = RECURRENCE_WEEKDAY_OPTIONS;
```

Defined in: [libs/ui/src/components/recurrence-editor/RecurrenceEditorComponent.ts:505](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/recurrence-editor/RecurrenceEditorComponent.ts#L505)

***

### weekdayOrdinalField

```ts
readonly weekdayOrdinalField: InputSignal<() => FieldState<string>>;
```

Defined in: [libs/ui/src/components/recurrence-editor/RecurrenceEditorComponent.ts:388](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/recurrence-editor/RecurrenceEditorComponent.ts#L388)

***

### weekdayOrdinalOptions

```ts
protected readonly weekdayOrdinalOptions: readonly IRecurrenceOption<string>[] = RECURRENCE_WEEKDAY_ORDINAL_OPTIONS;
```

Defined in: [libs/ui/src/components/recurrence-editor/RecurrenceEditorComponent.ts:509](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/recurrence-editor/RecurrenceEditorComponent.ts#L509)

## Methods

### endModeLabel()

```ts
protected endModeLabel(value): string;
```

Defined in: [libs/ui/src/components/recurrence-editor/RecurrenceEditorComponent.ts:685](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/recurrence-editor/RecurrenceEditorComponent.ts#L685)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `value` | [`RecurrenceEndMode`](TypeAlias.RecurrenceEndMode) |

#### Returns

`string`

***

### frequencyLabel()

```ts
protected frequencyLabel(value): string;
```

Defined in: [libs/ui/src/components/recurrence-editor/RecurrenceEditorComponent.ts:522](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/recurrence-editor/RecurrenceEditorComponent.ts#L522)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `value` | [`RecurrenceFrequency`](TypeAlias.RecurrenceFrequency) |

#### Returns

`string`

***

### isMonthlyDayOfMonthMode()

```ts
protected isMonthlyDayOfMonthMode(): boolean;
```

Defined in: [libs/ui/src/components/recurrence-editor/RecurrenceEditorComponent.ts:605](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/recurrence-editor/RecurrenceEditorComponent.ts#L605)

#### Returns

`boolean`

***

### isMonthlyRecurrence()

```ts
protected isMonthlyRecurrence(): boolean;
```

Defined in: [libs/ui/src/components/recurrence-editor/RecurrenceEditorComponent.ts:576](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/recurrence-editor/RecurrenceEditorComponent.ts#L576)

#### Returns

`boolean`

***

### isMonthlyWeekdayOfMonthMode()

```ts
protected isMonthlyWeekdayOfMonthMode(): boolean;
```

Defined in: [libs/ui/src/components/recurrence-editor/RecurrenceEditorComponent.ts:609](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/recurrence-editor/RecurrenceEditorComponent.ts#L609)

#### Returns

`boolean`

***

### isRecurrenceEnabled()

```ts
protected isRecurrenceEnabled(): boolean;
```

Defined in: [libs/ui/src/components/recurrence-editor/RecurrenceEditorComponent.ts:568](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/recurrence-editor/RecurrenceEditorComponent.ts#L568)

#### Returns

`boolean`

***

### isRecurrenceEndCount()

```ts
protected isRecurrenceEndCount(): boolean;
```

Defined in: [libs/ui/src/components/recurrence-editor/RecurrenceEditorComponent.ts:681](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/recurrence-editor/RecurrenceEditorComponent.ts#L681)

#### Returns

`boolean`

***

### isRecurrenceEndModeSelected()

```ts
protected isRecurrenceEndModeSelected(value): boolean;
```

Defined in: [libs/ui/src/components/recurrence-editor/RecurrenceEditorComponent.ts:669](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/recurrence-editor/RecurrenceEditorComponent.ts#L669)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `value` | [`RecurrenceEndMode`](TypeAlias.RecurrenceEndMode) |

#### Returns

`boolean`

***

### isRecurrenceEndUntil()

```ts
protected isRecurrenceEndUntil(): boolean;
```

Defined in: [libs/ui/src/components/recurrence-editor/RecurrenceEditorComponent.ts:677](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/recurrence-editor/RecurrenceEditorComponent.ts#L677)

#### Returns

`boolean`

***

### isRecurrenceIntervalSelected()

```ts
protected isRecurrenceIntervalSelected(value): boolean;
```

Defined in: [libs/ui/src/components/recurrence-editor/RecurrenceEditorComponent.ts:560](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/recurrence-editor/RecurrenceEditorComponent.ts#L560)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `value` | `number` |

#### Returns

`boolean`

***

### isRecurrenceMonthlyModeSelected()

```ts
protected isRecurrenceMonthlyModeSelected(value): boolean;
```

Defined in: [libs/ui/src/components/recurrence-editor/RecurrenceEditorComponent.ts:597](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/recurrence-editor/RecurrenceEditorComponent.ts#L597)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `value` | [`RecurrenceMonthlyMode`](TypeAlias.RecurrenceMonthlyMode) |

#### Returns

`boolean`

***

### isRecurrenceSingleWeekdaySelected()

```ts
protected isRecurrenceSingleWeekdaySelected(value): boolean;
```

Defined in: [libs/ui/src/components/recurrence-editor/RecurrenceEditorComponent.ts:641](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/recurrence-editor/RecurrenceEditorComponent.ts#L641)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `value` | [`RecurrenceWeekday`](TypeAlias.RecurrenceWeekday) |

#### Returns

`boolean`

***

### isRecurrenceWeekdayOrdinalSelected()

```ts
protected isRecurrenceWeekdayOrdinalSelected(value): boolean;
```

Defined in: [libs/ui/src/components/recurrence-editor/RecurrenceEditorComponent.ts:617](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/recurrence-editor/RecurrenceEditorComponent.ts#L617)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `value` | `string` |

#### Returns

`boolean`

***

### isRecurrenceWeekdaySelected()

```ts
protected isRecurrenceWeekdaySelected(value): boolean;
```

Defined in: [libs/ui/src/components/recurrence-editor/RecurrenceEditorComponent.ts:580](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/recurrence-editor/RecurrenceEditorComponent.ts#L580)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `value` | [`RecurrenceWeekday`](TypeAlias.RecurrenceWeekday) |

#### Returns

`boolean`

***

### isWeeklyRecurrence()

```ts
protected isWeeklyRecurrence(): boolean;
```

Defined in: [libs/ui/src/components/recurrence-editor/RecurrenceEditorComponent.ts:572](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/recurrence-editor/RecurrenceEditorComponent.ts#L572)

#### Returns

`boolean`

***

### monthlyModeLabel()

```ts
protected monthlyModeLabel(value): string;
```

Defined in: [libs/ui/src/components/recurrence-editor/RecurrenceEditorComponent.ts:613](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/recurrence-editor/RecurrenceEditorComponent.ts#L613)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `value` | [`RecurrenceMonthlyMode`](TypeAlias.RecurrenceMonthlyMode) |

#### Returns

`string`

***

### ordinalLabel()

```ts
protected ordinalLabel(value): string;
```

Defined in: [libs/ui/src/components/recurrence-editor/RecurrenceEditorComponent.ts:625](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/recurrence-editor/RecurrenceEditorComponent.ts#L625)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `value` | `string` |

#### Returns

`string`

***

### previewLabel()

```ts
protected previewLabel(
   label,
   weekday,
   ordinal?
): string;
```

Defined in: [libs/ui/src/components/recurrence-editor/RecurrenceEditorComponent.ts:517](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/recurrence-editor/RecurrenceEditorComponent.ts#L517)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `label` | `string` |
| `weekday` | [`RecurrenceWeekday`](TypeAlias.RecurrenceWeekday) |
| `ordinal?` | `string` |

#### Returns

`string`

***

### recurrenceIntervalLabel()

```ts
protected recurrenceIntervalLabel(value): string;
```

Defined in: [libs/ui/src/components/recurrence-editor/RecurrenceEditorComponent.ts:546](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/recurrence-editor/RecurrenceEditorComponent.ts#L546)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `value` | `number` |

#### Returns

`string`

***

### recurrenceIntervalValue()

```ts
protected recurrenceIntervalValue(): string;
```

Defined in: [libs/ui/src/components/recurrence-editor/RecurrenceEditorComponent.ts:556](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/recurrence-editor/RecurrenceEditorComponent.ts#L556)

#### Returns

`string`

***

### recurrenceSummary()

```ts
protected recurrenceSummary(): string;
```

Defined in: [libs/ui/src/components/recurrence-editor/RecurrenceEditorComponent.ts:538](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/recurrence-editor/RecurrenceEditorComponent.ts#L538)

#### Returns

`string`

***

### setRecurrenceEndMode()

```ts
protected setRecurrenceEndMode(value): void;
```

Defined in: [libs/ui/src/components/recurrence-editor/RecurrenceEditorComponent.ts:673](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/recurrence-editor/RecurrenceEditorComponent.ts#L673)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `value` | [`RecurrenceEndMode`](TypeAlias.RecurrenceEndMode) |

#### Returns

`void`

***

### setRecurrenceInterval()

```ts
protected setRecurrenceInterval(value): void;
```

Defined in: [libs/ui/src/components/recurrence-editor/RecurrenceEditorComponent.ts:564](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/recurrence-editor/RecurrenceEditorComponent.ts#L564)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `value` | `number` |

#### Returns

`void`

***

### setRecurrenceMonthlyMode()

```ts
protected setRecurrenceMonthlyMode(value): void;
```

Defined in: [libs/ui/src/components/recurrence-editor/RecurrenceEditorComponent.ts:601](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/recurrence-editor/RecurrenceEditorComponent.ts#L601)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `value` | [`RecurrenceMonthlyMode`](TypeAlias.RecurrenceMonthlyMode) |

#### Returns

`void`

***

### setRecurrenceSingleWeekday()

```ts
protected setRecurrenceSingleWeekday(value): void;
```

Defined in: [libs/ui/src/components/recurrence-editor/RecurrenceEditorComponent.ts:645](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/recurrence-editor/RecurrenceEditorComponent.ts#L645)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `value` | [`RecurrenceWeekday`](TypeAlias.RecurrenceWeekday) |

#### Returns

`void`

***

### setRecurrenceWeekdayOrdinal()

```ts
protected setRecurrenceWeekdayOrdinal(value): void;
```

Defined in: [libs/ui/src/components/recurrence-editor/RecurrenceEditorComponent.ts:621](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/recurrence-editor/RecurrenceEditorComponent.ts#L621)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `value` | `string` |

#### Returns

`void`

***

### toggleRecurrenceWeekday()

```ts
protected toggleRecurrenceWeekday(value): void;
```

Defined in: [libs/ui/src/components/recurrence-editor/RecurrenceEditorComponent.ts:584](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/recurrence-editor/RecurrenceEditorComponent.ts#L584)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `value` | [`RecurrenceWeekday`](TypeAlias.RecurrenceWeekday) |

#### Returns

`void`

***

### weekdayLabel()

```ts
protected weekdayLabel(value): string;
```

Defined in: [libs/ui/src/components/recurrence-editor/RecurrenceEditorComponent.ts:649](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/recurrence-editor/RecurrenceEditorComponent.ts#L649)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `value` | [`RecurrenceWeekday`](TypeAlias.RecurrenceWeekday) |

#### Returns

`string`
