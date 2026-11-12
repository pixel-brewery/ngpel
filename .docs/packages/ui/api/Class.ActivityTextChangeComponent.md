---
title: 'Class: ActivityTextChangeComponent'
generated: true
editUrl: false
---
# Class: ActivityTextChangeComponent

Defined in: [libs/ui/src/components/activity-log/ActivityTextChangeComponent.ts:73](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/activity-log/ActivityTextChangeComponent.ts#L73)

Renders a word comparison and lets the reader reveal runs of unchanged paragraphs.

## Constructors

### Constructor

```ts
new ActivityTextChangeComponent(): ActivityTextChangeComponent;
```

Defined in: [libs/ui/src/components/activity-log/ActivityTextChangeComponent.ts:97](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/activity-log/ActivityTextChangeComponent.ts#L97)

Resets the expanded paragraphs when a different comparison arrives.

#### Returns

`ActivityTextChangeComponent`

## Properties

### expanded

```ts
protected readonly expanded: WritableSignal<ReadonlySet<number>>;
```

Defined in: [libs/ui/src/components/activity-log/ActivityTextChangeComponent.ts:80](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/activity-log/ActivityTextChangeComponent.ts#L80)

***

### groups

```ts
protected readonly groups: Signal<ParagraphGroup[]>;
```

Defined in: [libs/ui/src/components/activity-log/ActivityTextChangeComponent.ts:81](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/activity-log/ActivityTextChangeComponent.ts#L81)

***

### paragraphs

```ts
readonly paragraphs: InputSignal<readonly ActivityTextParagraph[]>;
```

Defined in: [libs/ui/src/components/activity-log/ActivityTextChangeComponent.ts:75](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/activity-log/ActivityTextChangeComponent.ts#L75)

Paragraphs produced by `diffActivityText`.

***

### unchangedLabel

```ts
readonly unchangedLabel: InputSignal<(count, expanded) => string>;
```

Defined in: [libs/ui/src/components/activity-log/ActivityTextChangeComponent.ts:78](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/activity-log/ActivityTextChangeComponent.ts#L78)

Builds the localized toggle label for an unchanged run.

## Methods

### toggle()

```ts
protected toggle(index): void;
```

Defined in: [libs/ui/src/components/activity-log/ActivityTextChangeComponent.ts:104](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/activity-log/ActivityTextChangeComponent.ts#L104)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `index` | `number` |

#### Returns

`void`
