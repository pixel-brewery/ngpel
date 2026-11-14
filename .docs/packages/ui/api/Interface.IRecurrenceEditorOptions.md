---
title: 'Interface: IRecurrenceEditorOptions'
generated: true
editUrl: false
---
# Interface: IRecurrenceEditorOptions

Defined in: [libs/ui/src/components/recurrence-editor/IRecurrenceEditorOptions.ts:6](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/recurrence-editor/IRecurrenceEditorOptions.ts#L6)

Initial value, available options and labels for the recurrence drawer.

## Properties

### allowEnd?

```ts
readonly allowEnd?: boolean;
```

Defined in: [libs/ui/src/components/recurrence-editor/IRecurrenceEditorOptions.ts:9](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/recurrence-editor/IRecurrenceEditorOptions.ts#L9)

***

### allowNone?

```ts
readonly allowNone?: boolean;
```

Defined in: [libs/ui/src/components/recurrence-editor/IRecurrenceEditorOptions.ts:8](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/recurrence-editor/IRecurrenceEditorOptions.ts#L8)

***

### applyLabel?

```ts
readonly applyLabel?: string;
```

Defined in: [libs/ui/src/components/recurrence-editor/IRecurrenceEditorOptions.ts:34](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/recurrence-editor/IRecurrenceEditorOptions.ts#L34)

***

### cancelLabel?

```ts
readonly cancelLabel?: string;
```

Defined in: [libs/ui/src/components/recurrence-editor/IRecurrenceEditorOptions.ts:35](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/recurrence-editor/IRecurrenceEditorOptions.ts#L35)

***

### defaultTime?

```ts
readonly defaultTime?: string;
```

Defined in: [libs/ui/src/components/recurrence-editor/IRecurrenceEditorOptions.ts:15](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/recurrence-editor/IRecurrenceEditorOptions.ts#L15)

Initial time in HH:mm when there is no stored time. This does not enable timed recurrence.

***

### description?

```ts
readonly description?: string;
```

Defined in: [libs/ui/src/components/recurrence-editor/IRecurrenceEditorOptions.ts:26](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/recurrence-editor/IRecurrenceEditorOptions.ts#L26)

***

### endDateMode?

```ts
readonly endDateMode?: "instant" | "calendar-day";
```

Defined in: [libs/ui/src/components/recurrence-editor/IRecurrenceEditorOptions.ts:11](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/recurrence-editor/IRecurrenceEditorOptions.ts#L11)

Selects a local calendar day ending at 23:59:59. Defaults to editing an instant.

***

### invalidLabel?

```ts
readonly invalidLabel?: string;
```

Defined in: [libs/ui/src/components/recurrence-editor/IRecurrenceEditorOptions.ts:36](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/recurrence-editor/IRecurrenceEditorOptions.ts#L36)

***

### labels?

```ts
readonly labels?: Partial<IRecurrenceEditorLabels>;
```

Defined in: [libs/ui/src/components/recurrence-editor/IRecurrenceEditorOptions.ts:27](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/recurrence-editor/IRecurrenceEditorOptions.ts#L27)

***

### locale?

```ts
readonly locale?: string;
```

Defined in: [libs/ui/src/components/recurrence-editor/IRecurrenceEditorOptions.ts:31](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/recurrence-editor/IRecurrenceEditorOptions.ts#L31)

Locale for formatting the detailed summary.

***

### previewFrom?

```ts
readonly previewFrom?: Date | null;
```

Defined in: [libs/ui/src/components/recurrence-editor/IRecurrenceEditorOptions.ts:24](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/recurrence-editor/IRecurrenceEditorOptions.ts#L24)

Reference day for weekday previews. Defaults to today. Pass null to hide the dates.

***

### scheduleTimeLabel?

```ts
readonly scheduleTimeLabel?: string;
```

Defined in: [libs/ui/src/components/recurrence-editor/IRecurrenceEditorOptions.ts:32](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/recurrence-editor/IRecurrenceEditorOptions.ts#L32)

***

### summaryLabels?

```ts
readonly summaryLabels?: Partial<IRecurrenceSummaryLabels>;
```

Defined in: [libs/ui/src/components/recurrence-editor/IRecurrenceEditorOptions.ts:29](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/recurrence-editor/IRecurrenceEditorOptions.ts#L29)

Displays the supplied summary labels in the editor's two-line summary.

***

### timeLabel?

```ts
readonly timeLabel?: string;
```

Defined in: [libs/ui/src/components/recurrence-editor/IRecurrenceEditorOptions.ts:33](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/recurrence-editor/IRecurrenceEditorOptions.ts#L33)

***

### timeMode?

```ts
readonly timeMode?: "DATE" | "DATETIME";
```

Defined in: [libs/ui/src/components/recurrence-editor/IRecurrenceEditorOptions.ts:13](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/recurrence-editor/IRecurrenceEditorOptions.ts#L13)

Locks the time mode. Omit to let the user choose all-day or timed recurrence.

***

### timeModeChoices?

```ts
readonly timeModeChoices?: Readonly<Record<"DATE" | "DATETIME", {
  hint?: string | ((time) => string);
  label: string;
}>>;
```

Defined in: [libs/ui/src/components/recurrence-editor/IRecurrenceEditorOptions.ts:17](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/recurrence-editor/IRecurrenceEditorOptions.ts#L17)

Uses two labeled choices for the time mode when it is editable. Defaults to a toggle.

***

### title?

```ts
readonly title?: string;
```

Defined in: [libs/ui/src/components/recurrence-editor/IRecurrenceEditorOptions.ts:25](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/recurrence-editor/IRecurrenceEditorOptions.ts#L25)

***

### tour?

```ts
readonly tour?: {
  anchors: Readonly<Partial<Record<
     | keyof typeof RECURRENCE_EDITOR_TOUR_TARGETS
     | "timeMode"
     | "time"
     | "cancel"
    | "save", string>>>;
  tourId: string;
};
```

Defined in: [libs/ui/src/components/recurrence-editor/IRecurrenceEditorOptions.ts:19](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/recurrence-editor/IRecurrenceEditorOptions.ts#L19)

Maps editor fields and drawer actions to anchors of the caller's tour. The timeMode target accepts a boolean.

#### anchors

```ts
readonly anchors: Readonly<Partial<Record<
  | keyof typeof RECURRENCE_EDITOR_TOUR_TARGETS
  | "timeMode"
  | "time"
  | "cancel"
| "save", string>>>;
```

#### tourId

```ts
readonly tourId: string;
```

***

### value?

```ts
readonly value?: IRecurrenceValue;
```

Defined in: [libs/ui/src/components/recurrence-editor/IRecurrenceEditorOptions.ts:7](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/recurrence-editor/IRecurrenceEditorOptions.ts#L7)
