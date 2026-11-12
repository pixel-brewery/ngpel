---
title: 'Type Alias: ActivityTextParagraph'
generated: true
editUrl: false
---
# Type Alias: ActivityTextParagraph

```ts
type ActivityTextParagraph =
  | {
  text: string;
  unchanged: true;
}
  | {
  parts: ReadonlyArray<IActivityTextPart>;
  unchanged: false;
};
```

Defined in: [libs/ui/src/components/activity-log/ActivityTextParagraph.ts:4](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/activity-log/ActivityTextParagraph.ts#L4)

Paragraph from a text comparison.
