---
title: 'Interface: IParseRecurrenceRuleOptions'
generated: true
editUrl: false
---
# Interface: IParseRecurrenceRuleOptions

Defined in: [libs/ui/src/components/recurrence-editor/RecurrenceRule.ts:36](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/recurrence-editor/RecurrenceRule.ts#L36)

## Properties

### endDateMode?

```ts
readonly endDateMode?: "instant" | "calendar-day";
```

Defined in: [libs/ui/src/components/recurrence-editor/RecurrenceRule.ts:39](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/recurrence-editor/RecurrenceRule.ts#L39)

Converts date-only ends to the inclusive local end instant. Timed ends retain their instant.

***

### recurrenceEndAt?

```ts
readonly recurrenceEndAt?: string | null;
```

Defined in: [libs/ui/src/components/recurrence-editor/RecurrenceRule.ts:37](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/recurrence-editor/RecurrenceRule.ts#L37)
