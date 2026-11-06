---
title: 'Class: RecurrenceEditorComponent\<TNumber, TEnd\>'
generated: true
editUrl: false
---
# Class: RecurrenceEditorComponent\<TNumber, TEnd\>

Defined in: [libs/ui/src/components/recurrence-editor/RecurrenceEditorComponent.ts:328](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/recurrence-editor/RecurrenceEditorComponent.ts#L328)

Reusable RFC 5545 recurrence editor for Signal Forms.

## Type Parameters

| Type Parameter | Default type |
| ------ | ------ |
| `TNumber` *extends* `string` \| `number` \| `null` | `string` |
| `TEnd` *extends* `string` \| `Date` \| `null` | `string` |

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

Defined in: [libs/ui/src/components/recurrence-editor/RecurrenceEditorComponent.ts:374](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/recurrence-editor/RecurrenceEditorComponent.ts#L374)

Shows the controls for limiting the series.

***

### allowNone

```ts
readonly allowNone: InputSignal<boolean>;
```

Defined in: [libs/ui/src/components/recurrence-editor/RecurrenceEditorComponent.ts:371](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/recurrence-editor/RecurrenceEditorComponent.ts#L371)

Allows a one-off occurrence in the frequency options.

***

### byDaysField

```ts
readonly byDaysField: InputSignal<() => FieldState<string>>;
```

Defined in: [libs/ui/src/components/recurrence-editor/RecurrenceEditorComponent.ts:352](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/recurrence-editor/RecurrenceEditorComponent.ts#L352)

***

### countField

```ts
readonly countField: InputSignal<() => FieldState<TNumber>>;
```

Defined in: [libs/ui/src/components/recurrence-editor/RecurrenceEditorComponent.ts:356](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/recurrence-editor/RecurrenceEditorComponent.ts#L356)

***

### endAtField

```ts
readonly endAtField: InputSignal<() => FieldState<TEnd>>;
```

Defined in: [libs/ui/src/components/recurrence-editor/RecurrenceEditorComponent.ts:358](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/recurrence-editor/RecurrenceEditorComponent.ts#L358)

***

### endModeField

```ts
readonly endModeField: InputSignal<() => FieldState<RecurrenceEndMode>>;
```

Defined in: [libs/ui/src/components/recurrence-editor/RecurrenceEditorComponent.ts:354](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/recurrence-editor/RecurrenceEditorComponent.ts#L354)

***

### endModeOptions

```ts
protected readonly endModeOptions: readonly IRecurrenceOption<RecurrenceEndMode>[] = RECURRENCE_END_MODE_OPTIONS;
```

Defined in: [libs/ui/src/components/recurrence-editor/RecurrenceEditorComponent.ts:474](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/recurrence-editor/RecurrenceEditorComponent.ts#L474)

***

### frequencyField

```ts
readonly frequencyField: InputSignal<() => FieldState<RecurrenceFrequency>>;
```

Defined in: [libs/ui/src/components/recurrence-editor/RecurrenceEditorComponent.ts:348](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/recurrence-editor/RecurrenceEditorComponent.ts#L348)

***

### frequencyOptions

```ts
protected readonly frequencyOptions: Signal<readonly RecurrenceFrequency[]>;
```

Defined in: [libs/ui/src/components/recurrence-editor/RecurrenceEditorComponent.ts:461](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/recurrence-editor/RecurrenceEditorComponent.ts#L461)

***

### intervalField

```ts
readonly intervalField: InputSignal<() => FieldState<string>>;
```

Defined in: [libs/ui/src/components/recurrence-editor/RecurrenceEditorComponent.ts:350](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/recurrence-editor/RecurrenceEditorComponent.ts#L350)

***

### intervalOptions

```ts
protected readonly intervalOptions: readonly IRecurrenceOption<number>[] = RECURRENCE_INTERVAL_OPTIONS;
```

Defined in: [libs/ui/src/components/recurrence-editor/RecurrenceEditorComponent.ts:466](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/recurrence-editor/RecurrenceEditorComponent.ts#L466)

***

### labels

```ts
readonly labels: InputSignal<Partial<IRecurrenceEditorLabels>>;
```

Defined in: [libs/ui/src/components/recurrence-editor/RecurrenceEditorComponent.ts:368](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/recurrence-editor/RecurrenceEditorComponent.ts#L368)

***

### monthDayField

```ts
readonly monthDayField: InputSignal<() => FieldState<TNumber>>;
```

Defined in: [libs/ui/src/components/recurrence-editor/RecurrenceEditorComponent.ts:362](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/recurrence-editor/RecurrenceEditorComponent.ts#L362)

***

### monthlyModeField

```ts
readonly monthlyModeField: InputSignal<() => FieldState<RecurrenceMonthlyMode>>;
```

Defined in: [libs/ui/src/components/recurrence-editor/RecurrenceEditorComponent.ts:360](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/recurrence-editor/RecurrenceEditorComponent.ts#L360)

***

### monthlyModeOptions

```ts
protected readonly monthlyModeOptions: readonly IRecurrenceOption<RecurrenceMonthlyMode>[] = RECURRENCE_MONTHLY_MODE_OPTIONS;
```

Defined in: [libs/ui/src/components/recurrence-editor/RecurrenceEditorComponent.ts:470](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/recurrence-editor/RecurrenceEditorComponent.ts#L470)

***

### previewFrom

```ts
readonly previewFrom: InputSignal<Date | null>;
```

Defined in: [libs/ui/src/components/recurrence-editor/RecurrenceEditorComponent.ts:377](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/recurrence-editor/RecurrenceEditorComponent.ts#L377)

Reference day for the weekday and monthly choice previews. Omit to show the labels alone.

***

### resolvedLabels

```ts
protected readonly resolvedLabels: Signal<IRecurrenceEditorLabels>;
```

Defined in: [libs/ui/src/components/recurrence-editor/RecurrenceEditorComponent.ts:456](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/recurrence-editor/RecurrenceEditorComponent.ts#L456)

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

Defined in: [libs/ui/src/components/recurrence-editor/RecurrenceEditorComponent.ts:380](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/recurrence-editor/RecurrenceEditorComponent.ts#L380)

Reactive component capabilities available to an external tour mapping.

#### Implementation of

```ts
ITourAccessor.targets
```

***

### weekdayField

```ts
readonly weekdayField: InputSignal<() => FieldState<RecurrenceWeekday>>;
```

Defined in: [libs/ui/src/components/recurrence-editor/RecurrenceEditorComponent.ts:366](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/recurrence-editor/RecurrenceEditorComponent.ts#L366)

***

### weekdayOptions

```ts
protected readonly weekdayOptions: readonly IRecurrenceOption<RecurrenceWeekday>[] = RECURRENCE_WEEKDAY_OPTIONS;
```

Defined in: [libs/ui/src/components/recurrence-editor/RecurrenceEditorComponent.ts:468](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/recurrence-editor/RecurrenceEditorComponent.ts#L468)

***

### weekdayOrdinalField

```ts
readonly weekdayOrdinalField: InputSignal<() => FieldState<string>>;
```

Defined in: [libs/ui/src/components/recurrence-editor/RecurrenceEditorComponent.ts:364](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/recurrence-editor/RecurrenceEditorComponent.ts#L364)

***

### weekdayOrdinalOptions

```ts
protected readonly weekdayOrdinalOptions: readonly IRecurrenceOption<string>[] = RECURRENCE_WEEKDAY_ORDINAL_OPTIONS;
```

Defined in: [libs/ui/src/components/recurrence-editor/RecurrenceEditorComponent.ts:472](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/recurrence-editor/RecurrenceEditorComponent.ts#L472)

## Methods

### endModeLabel()

```ts
protected endModeLabel(value): string;
```

Defined in: [libs/ui/src/components/recurrence-editor/RecurrenceEditorComponent.ts:648](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/recurrence-editor/RecurrenceEditorComponent.ts#L648)

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

Defined in: [libs/ui/src/components/recurrence-editor/RecurrenceEditorComponent.ts:485](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/recurrence-editor/RecurrenceEditorComponent.ts#L485)

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

Defined in: [libs/ui/src/components/recurrence-editor/RecurrenceEditorComponent.ts:568](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/recurrence-editor/RecurrenceEditorComponent.ts#L568)

#### Returns

`boolean`

***

### isMonthlyRecurrence()

```ts
protected isMonthlyRecurrence(): boolean;
```

Defined in: [libs/ui/src/components/recurrence-editor/RecurrenceEditorComponent.ts:539](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/recurrence-editor/RecurrenceEditorComponent.ts#L539)

#### Returns

`boolean`

***

### isMonthlyWeekdayOfMonthMode()

```ts
protected isMonthlyWeekdayOfMonthMode(): boolean;
```

Defined in: [libs/ui/src/components/recurrence-editor/RecurrenceEditorComponent.ts:572](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/recurrence-editor/RecurrenceEditorComponent.ts#L572)

#### Returns

`boolean`

***

### isRecurrenceEnabled()

```ts
protected isRecurrenceEnabled(): boolean;
```

Defined in: [libs/ui/src/components/recurrence-editor/RecurrenceEditorComponent.ts:531](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/recurrence-editor/RecurrenceEditorComponent.ts#L531)

#### Returns

`boolean`

***

### isRecurrenceEndCount()

```ts
protected isRecurrenceEndCount(): boolean;
```

Defined in: [libs/ui/src/components/recurrence-editor/RecurrenceEditorComponent.ts:644](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/recurrence-editor/RecurrenceEditorComponent.ts#L644)

#### Returns

`boolean`

***

### isRecurrenceEndModeSelected()

```ts
protected isRecurrenceEndModeSelected(value): boolean;
```

Defined in: [libs/ui/src/components/recurrence-editor/RecurrenceEditorComponent.ts:632](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/recurrence-editor/RecurrenceEditorComponent.ts#L632)

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

Defined in: [libs/ui/src/components/recurrence-editor/RecurrenceEditorComponent.ts:640](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/recurrence-editor/RecurrenceEditorComponent.ts#L640)

#### Returns

`boolean`

***

### isRecurrenceIntervalSelected()

```ts
protected isRecurrenceIntervalSelected(value): boolean;
```

Defined in: [libs/ui/src/components/recurrence-editor/RecurrenceEditorComponent.ts:523](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/recurrence-editor/RecurrenceEditorComponent.ts#L523)

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

Defined in: [libs/ui/src/components/recurrence-editor/RecurrenceEditorComponent.ts:560](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/recurrence-editor/RecurrenceEditorComponent.ts#L560)

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

Defined in: [libs/ui/src/components/recurrence-editor/RecurrenceEditorComponent.ts:604](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/recurrence-editor/RecurrenceEditorComponent.ts#L604)

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

Defined in: [libs/ui/src/components/recurrence-editor/RecurrenceEditorComponent.ts:580](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/recurrence-editor/RecurrenceEditorComponent.ts#L580)

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

Defined in: [libs/ui/src/components/recurrence-editor/RecurrenceEditorComponent.ts:543](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/recurrence-editor/RecurrenceEditorComponent.ts#L543)

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

Defined in: [libs/ui/src/components/recurrence-editor/RecurrenceEditorComponent.ts:535](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/recurrence-editor/RecurrenceEditorComponent.ts#L535)

#### Returns

`boolean`

***

### monthlyModeLabel()

```ts
protected monthlyModeLabel(value): string;
```

Defined in: [libs/ui/src/components/recurrence-editor/RecurrenceEditorComponent.ts:576](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/recurrence-editor/RecurrenceEditorComponent.ts#L576)

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

Defined in: [libs/ui/src/components/recurrence-editor/RecurrenceEditorComponent.ts:588](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/recurrence-editor/RecurrenceEditorComponent.ts#L588)

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

Defined in: [libs/ui/src/components/recurrence-editor/RecurrenceEditorComponent.ts:480](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/recurrence-editor/RecurrenceEditorComponent.ts#L480)

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

Defined in: [libs/ui/src/components/recurrence-editor/RecurrenceEditorComponent.ts:509](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/recurrence-editor/RecurrenceEditorComponent.ts#L509)

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

Defined in: [libs/ui/src/components/recurrence-editor/RecurrenceEditorComponent.ts:519](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/recurrence-editor/RecurrenceEditorComponent.ts#L519)

#### Returns

`string`

***

### recurrenceSummary()

```ts
protected recurrenceSummary(): string;
```

Defined in: [libs/ui/src/components/recurrence-editor/RecurrenceEditorComponent.ts:501](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/recurrence-editor/RecurrenceEditorComponent.ts#L501)

#### Returns

`string`

***

### setRecurrenceEndMode()

```ts
protected setRecurrenceEndMode(value): void;
```

Defined in: [libs/ui/src/components/recurrence-editor/RecurrenceEditorComponent.ts:636](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/recurrence-editor/RecurrenceEditorComponent.ts#L636)

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

Defined in: [libs/ui/src/components/recurrence-editor/RecurrenceEditorComponent.ts:527](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/recurrence-editor/RecurrenceEditorComponent.ts#L527)

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

Defined in: [libs/ui/src/components/recurrence-editor/RecurrenceEditorComponent.ts:564](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/recurrence-editor/RecurrenceEditorComponent.ts#L564)

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

Defined in: [libs/ui/src/components/recurrence-editor/RecurrenceEditorComponent.ts:608](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/recurrence-editor/RecurrenceEditorComponent.ts#L608)

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

Defined in: [libs/ui/src/components/recurrence-editor/RecurrenceEditorComponent.ts:584](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/recurrence-editor/RecurrenceEditorComponent.ts#L584)

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

Defined in: [libs/ui/src/components/recurrence-editor/RecurrenceEditorComponent.ts:547](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/recurrence-editor/RecurrenceEditorComponent.ts#L547)

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

Defined in: [libs/ui/src/components/recurrence-editor/RecurrenceEditorComponent.ts:612](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/recurrence-editor/RecurrenceEditorComponent.ts#L612)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `value` | [`RecurrenceWeekday`](TypeAlias.RecurrenceWeekday) |

#### Returns

`string`
