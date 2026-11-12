---
title: 'Class: RecurrenceEditorService'
generated: true
editUrl: false
---
# Class: RecurrenceEditorService

Defined in: [libs/ui/src/components/recurrence-editor/RecurrenceEditorService.ts:10](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/recurrence-editor/RecurrenceEditorService.ts#L10)

Opens the recurrence editor in the application's Mosaik drawer.

## Constructors

### Constructor

```ts
new RecurrenceEditorService(): RecurrenceEditorService;
```

#### Returns

`RecurrenceEditorService`

## Methods

### open()

```ts
open(options?): Promise<IRecurrenceValue | undefined>;
```

Defined in: [libs/ui/src/components/recurrence-editor/RecurrenceEditorService.ts:24](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/recurrence-editor/RecurrenceEditorService.ts#L24)

Opens a draft of the recurrence.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `options?` | [`IRecurrenceEditorOptions`](Interface.IRecurrenceEditorOptions) | Initial value, editable options and localized labels. |

#### Returns

`Promise`\<[`IRecurrenceValue`](Interface.IRecurrenceValue) \| `undefined`\>

The applied recurrence, or undefined when the drawer is dismissed.
