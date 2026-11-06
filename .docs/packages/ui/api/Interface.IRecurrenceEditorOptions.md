---
title: 'Interface: IRecurrenceEditorOptions'
generated: true
editUrl: false
---
# Interface: IRecurrenceEditorOptions

Defined in: libs/ui/src/components/recurrence-editor/IRecurrenceEditorOptions.ts:5

Initial value, available options and labels for the recurrence drawer.

## Properties

### allowEnd?

```ts
readonly optional allowEnd?: boolean;
```

Defined in: libs/ui/src/components/recurrence-editor/IRecurrenceEditorOptions.ts:8

***

### allowNone?

```ts
readonly optional allowNone?: boolean;
```

Defined in: libs/ui/src/components/recurrence-editor/IRecurrenceEditorOptions.ts:7

***

### applyLabel?

```ts
readonly optional applyLabel?: string;
```

Defined in: libs/ui/src/components/recurrence-editor/IRecurrenceEditorOptions.ts:18

***

### cancelLabel?

```ts
readonly optional cancelLabel?: string;
```

Defined in: libs/ui/src/components/recurrence-editor/IRecurrenceEditorOptions.ts:19

***

### description?

```ts
readonly optional description?: string;
```

Defined in: libs/ui/src/components/recurrence-editor/IRecurrenceEditorOptions.ts:14

***

### invalidLabel?

```ts
readonly optional invalidLabel?: string;
```

Defined in: libs/ui/src/components/recurrence-editor/IRecurrenceEditorOptions.ts:20

***

### labels?

```ts
readonly optional labels?: Partial<IRecurrenceEditorLabels>;
```

Defined in: libs/ui/src/components/recurrence-editor/IRecurrenceEditorOptions.ts:15

***

### previewFrom?

```ts
readonly optional previewFrom?: Date | null;
```

Defined in: libs/ui/src/components/recurrence-editor/IRecurrenceEditorOptions.ts:12

Reference day for weekday previews. Defaults to today. Pass null to hide the dates.

***

### scheduleTimeLabel?

```ts
readonly optional scheduleTimeLabel?: string;
```

Defined in: libs/ui/src/components/recurrence-editor/IRecurrenceEditorOptions.ts:16

***

### timeLabel?

```ts
readonly optional timeLabel?: string;
```

Defined in: libs/ui/src/components/recurrence-editor/IRecurrenceEditorOptions.ts:17

***

### timeMode?

```ts
readonly optional timeMode?: "DATE" | "DATETIME";
```

Defined in: libs/ui/src/components/recurrence-editor/IRecurrenceEditorOptions.ts:10

Locks the time mode. Omit to let the user choose all-day or timed recurrence.

***

### title?

```ts
readonly optional title?: string;
```

Defined in: libs/ui/src/components/recurrence-editor/IRecurrenceEditorOptions.ts:13

***

### value?

```ts
readonly optional value?: IRecurrenceValue;
```

Defined in: libs/ui/src/components/recurrence-editor/IRecurrenceEditorOptions.ts:6
