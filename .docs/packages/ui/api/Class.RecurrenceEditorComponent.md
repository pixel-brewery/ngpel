---
title: 'Class: RecurrenceEditorComponent'
generated: true
editUrl: false
---
# Class: RecurrenceEditorComponent

Defined in: [libs/ui/src/components/recurrence-editor/RecurrenceEditorComponent.ts:325](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/recurrence-editor/RecurrenceEditorComponent.ts#L325)

Reusable RFC 5545 recurrence editor for Signal Forms.

## Implements

- `ITourAccessor`

## Constructors

### Constructor

```ts
new RecurrenceEditorComponent(): RecurrenceEditorComponent;
```

#### Returns

`RecurrenceEditorComponent`

## Properties

### byDaysField

```ts
readonly byDaysField: InputSignal<() => FieldState<string>>;
```

Defined in: [libs/ui/src/components/recurrence-editor/RecurrenceEditorComponent.ts:348](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/recurrence-editor/RecurrenceEditorComponent.ts#L348)

***

### countField

```ts
readonly countField: InputSignal<() => FieldState<string>>;
```

Defined in: [libs/ui/src/components/recurrence-editor/RecurrenceEditorComponent.ts:352](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/recurrence-editor/RecurrenceEditorComponent.ts#L352)

***

### endAtField

```ts
readonly endAtField: InputSignal<() => FieldState<string>>;
```

Defined in: [libs/ui/src/components/recurrence-editor/RecurrenceEditorComponent.ts:354](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/recurrence-editor/RecurrenceEditorComponent.ts#L354)

***

### endModeField

```ts
readonly endModeField: InputSignal<() => FieldState<RecurrenceEndMode>>;
```

Defined in: [libs/ui/src/components/recurrence-editor/RecurrenceEditorComponent.ts:350](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/recurrence-editor/RecurrenceEditorComponent.ts#L350)

***

### endModeOptions

```ts
protected readonly endModeOptions: readonly IRecurrenceOption<RecurrenceEndMode>[] = RECURRENCE_END_MODE_OPTIONS;
```

Defined in: [libs/ui/src/components/recurrence-editor/RecurrenceEditorComponent.ts:458](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/recurrence-editor/RecurrenceEditorComponent.ts#L458)

***

### frequencyField

```ts
readonly frequencyField: InputSignal<() => FieldState<RecurrenceFrequency>>;
```

Defined in: [libs/ui/src/components/recurrence-editor/RecurrenceEditorComponent.ts:344](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/recurrence-editor/RecurrenceEditorComponent.ts#L344)

***

### frequencyOptions

```ts
protected readonly frequencyOptions: readonly RecurrenceFrequency[];
```

Defined in: [libs/ui/src/components/recurrence-editor/RecurrenceEditorComponent.ts:448](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/recurrence-editor/RecurrenceEditorComponent.ts#L448)

***

### intervalField

```ts
readonly intervalField: InputSignal<() => FieldState<string>>;
```

Defined in: [libs/ui/src/components/recurrence-editor/RecurrenceEditorComponent.ts:346](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/recurrence-editor/RecurrenceEditorComponent.ts#L346)

***

### intervalOptions

```ts
protected readonly intervalOptions: readonly IRecurrenceOption<number>[] = RECURRENCE_INTERVAL_OPTIONS;
```

Defined in: [libs/ui/src/components/recurrence-editor/RecurrenceEditorComponent.ts:450](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/recurrence-editor/RecurrenceEditorComponent.ts#L450)

***

### labels

```ts
readonly labels: InputSignal<Partial<IRecurrenceEditorLabels>>;
```

Defined in: [libs/ui/src/components/recurrence-editor/RecurrenceEditorComponent.ts:364](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/recurrence-editor/RecurrenceEditorComponent.ts#L364)

***

### monthDayField

```ts
readonly monthDayField: InputSignal<() => FieldState<string>>;
```

Defined in: [libs/ui/src/components/recurrence-editor/RecurrenceEditorComponent.ts:358](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/recurrence-editor/RecurrenceEditorComponent.ts#L358)

***

### monthlyModeField

```ts
readonly monthlyModeField: InputSignal<() => FieldState<RecurrenceMonthlyMode>>;
```

Defined in: [libs/ui/src/components/recurrence-editor/RecurrenceEditorComponent.ts:356](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/recurrence-editor/RecurrenceEditorComponent.ts#L356)

***

### monthlyModeOptions

```ts
protected readonly monthlyModeOptions: readonly IRecurrenceOption<RecurrenceMonthlyMode>[] = RECURRENCE_MONTHLY_MODE_OPTIONS;
```

Defined in: [libs/ui/src/components/recurrence-editor/RecurrenceEditorComponent.ts:454](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/recurrence-editor/RecurrenceEditorComponent.ts#L454)

***

### resolvedLabels

```ts
protected readonly resolvedLabels: Signal<IRecurrenceEditorLabels>;
```

Defined in: [libs/ui/src/components/recurrence-editor/RecurrenceEditorComponent.ts:443](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/recurrence-editor/RecurrenceEditorComponent.ts#L443)

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

Defined in: [libs/ui/src/components/recurrence-editor/RecurrenceEditorComponent.ts:367](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/recurrence-editor/RecurrenceEditorComponent.ts#L367)

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

Defined in: [libs/ui/src/components/recurrence-editor/RecurrenceEditorComponent.ts:362](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/recurrence-editor/RecurrenceEditorComponent.ts#L362)

***

### weekdayOptions

```ts
protected readonly weekdayOptions: readonly IRecurrenceOption<RecurrenceWeekday>[] = RECURRENCE_WEEKDAY_OPTIONS;
```

Defined in: [libs/ui/src/components/recurrence-editor/RecurrenceEditorComponent.ts:452](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/recurrence-editor/RecurrenceEditorComponent.ts#L452)

***

### weekdayOrdinalField

```ts
readonly weekdayOrdinalField: InputSignal<() => FieldState<string>>;
```

Defined in: [libs/ui/src/components/recurrence-editor/RecurrenceEditorComponent.ts:360](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/recurrence-editor/RecurrenceEditorComponent.ts#L360)

***

### weekdayOrdinalOptions

```ts
protected readonly weekdayOrdinalOptions: readonly IRecurrenceOption<string>[] = RECURRENCE_WEEKDAY_ORDINAL_OPTIONS;
```

Defined in: [libs/ui/src/components/recurrence-editor/RecurrenceEditorComponent.ts:456](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/recurrence-editor/RecurrenceEditorComponent.ts#L456)

## Methods

### endModeLabel()

```ts
protected endModeLabel(value): string;
```

Defined in: [libs/ui/src/components/recurrence-editor/RecurrenceEditorComponent.ts:627](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/recurrence-editor/RecurrenceEditorComponent.ts#L627)

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

Defined in: [libs/ui/src/components/recurrence-editor/RecurrenceEditorComponent.ts:464](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/recurrence-editor/RecurrenceEditorComponent.ts#L464)

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

Defined in: [libs/ui/src/components/recurrence-editor/RecurrenceEditorComponent.ts:547](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/recurrence-editor/RecurrenceEditorComponent.ts#L547)

#### Returns

`boolean`

***

### isMonthlyRecurrence()

```ts
protected isMonthlyRecurrence(): boolean;
```

Defined in: [libs/ui/src/components/recurrence-editor/RecurrenceEditorComponent.ts:518](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/recurrence-editor/RecurrenceEditorComponent.ts#L518)

#### Returns

`boolean`

***

### isMonthlyWeekdayOfMonthMode()

```ts
protected isMonthlyWeekdayOfMonthMode(): boolean;
```

Defined in: [libs/ui/src/components/recurrence-editor/RecurrenceEditorComponent.ts:551](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/recurrence-editor/RecurrenceEditorComponent.ts#L551)

#### Returns

`boolean`

***

### isRecurrenceEnabled()

```ts
protected isRecurrenceEnabled(): boolean;
```

Defined in: [libs/ui/src/components/recurrence-editor/RecurrenceEditorComponent.ts:510](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/recurrence-editor/RecurrenceEditorComponent.ts#L510)

#### Returns

`boolean`

***

### isRecurrenceEndCount()

```ts
protected isRecurrenceEndCount(): boolean;
```

Defined in: [libs/ui/src/components/recurrence-editor/RecurrenceEditorComponent.ts:623](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/recurrence-editor/RecurrenceEditorComponent.ts#L623)

#### Returns

`boolean`

***

### isRecurrenceEndModeSelected()

```ts
protected isRecurrenceEndModeSelected(value): boolean;
```

Defined in: [libs/ui/src/components/recurrence-editor/RecurrenceEditorComponent.ts:611](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/recurrence-editor/RecurrenceEditorComponent.ts#L611)

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

Defined in: [libs/ui/src/components/recurrence-editor/RecurrenceEditorComponent.ts:619](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/recurrence-editor/RecurrenceEditorComponent.ts#L619)

#### Returns

`boolean`

***

### isRecurrenceIntervalSelected()

```ts
protected isRecurrenceIntervalSelected(value): boolean;
```

Defined in: [libs/ui/src/components/recurrence-editor/RecurrenceEditorComponent.ts:502](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/recurrence-editor/RecurrenceEditorComponent.ts#L502)

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

Defined in: [libs/ui/src/components/recurrence-editor/RecurrenceEditorComponent.ts:539](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/recurrence-editor/RecurrenceEditorComponent.ts#L539)

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

Defined in: [libs/ui/src/components/recurrence-editor/RecurrenceEditorComponent.ts:583](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/recurrence-editor/RecurrenceEditorComponent.ts#L583)

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

Defined in: [libs/ui/src/components/recurrence-editor/RecurrenceEditorComponent.ts:559](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/recurrence-editor/RecurrenceEditorComponent.ts#L559)

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

Defined in: [libs/ui/src/components/recurrence-editor/RecurrenceEditorComponent.ts:522](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/recurrence-editor/RecurrenceEditorComponent.ts#L522)

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

Defined in: [libs/ui/src/components/recurrence-editor/RecurrenceEditorComponent.ts:514](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/recurrence-editor/RecurrenceEditorComponent.ts#L514)

#### Returns

`boolean`

***

### monthlyModeLabel()

```ts
protected monthlyModeLabel(value): string;
```

Defined in: [libs/ui/src/components/recurrence-editor/RecurrenceEditorComponent.ts:555](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/recurrence-editor/RecurrenceEditorComponent.ts#L555)

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

Defined in: [libs/ui/src/components/recurrence-editor/RecurrenceEditorComponent.ts:567](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/recurrence-editor/RecurrenceEditorComponent.ts#L567)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `value` | `string` |

#### Returns

`string`

***

### recurrenceIntervalLabel()

```ts
protected recurrenceIntervalLabel(value): string;
```

Defined in: [libs/ui/src/components/recurrence-editor/RecurrenceEditorComponent.ts:488](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/recurrence-editor/RecurrenceEditorComponent.ts#L488)

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

Defined in: [libs/ui/src/components/recurrence-editor/RecurrenceEditorComponent.ts:498](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/recurrence-editor/RecurrenceEditorComponent.ts#L498)

#### Returns

`string`

***

### recurrenceSummary()

```ts
protected recurrenceSummary(): string;
```

Defined in: [libs/ui/src/components/recurrence-editor/RecurrenceEditorComponent.ts:480](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/recurrence-editor/RecurrenceEditorComponent.ts#L480)

#### Returns

`string`

***

### setRecurrenceEndMode()

```ts
protected setRecurrenceEndMode(value): void;
```

Defined in: [libs/ui/src/components/recurrence-editor/RecurrenceEditorComponent.ts:615](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/recurrence-editor/RecurrenceEditorComponent.ts#L615)

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

Defined in: [libs/ui/src/components/recurrence-editor/RecurrenceEditorComponent.ts:506](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/recurrence-editor/RecurrenceEditorComponent.ts#L506)

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

Defined in: [libs/ui/src/components/recurrence-editor/RecurrenceEditorComponent.ts:543](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/recurrence-editor/RecurrenceEditorComponent.ts#L543)

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

Defined in: [libs/ui/src/components/recurrence-editor/RecurrenceEditorComponent.ts:587](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/recurrence-editor/RecurrenceEditorComponent.ts#L587)

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

Defined in: [libs/ui/src/components/recurrence-editor/RecurrenceEditorComponent.ts:563](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/recurrence-editor/RecurrenceEditorComponent.ts#L563)

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

Defined in: [libs/ui/src/components/recurrence-editor/RecurrenceEditorComponent.ts:526](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/recurrence-editor/RecurrenceEditorComponent.ts#L526)

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

Defined in: [libs/ui/src/components/recurrence-editor/RecurrenceEditorComponent.ts:591](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/recurrence-editor/RecurrenceEditorComponent.ts#L591)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `value` | [`RecurrenceWeekday`](TypeAlias.RecurrenceWeekday) |

#### Returns

`string`
