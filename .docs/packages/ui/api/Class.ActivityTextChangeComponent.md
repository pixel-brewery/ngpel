---
title: 'Class: ActivityTextChangeComponent'
generated: true
editUrl: false
---
# Class: ActivityTextChangeComponent

Defined in: [libs/ui/src/components/activity-log/ActivityTextChangeComponent.ts:122](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/activity-log/ActivityTextChangeComponent.ts#L122)

Renders a word comparison and lets the reader reveal runs of unchanged paragraphs.

## Constructors

### Constructor

```ts
new ActivityTextChangeComponent(): ActivityTextChangeComponent;
```

Defined in: [libs/ui/src/components/activity-log/ActivityTextChangeComponent.ts:155](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/activity-log/ActivityTextChangeComponent.ts#L155)

Resets the expanded paragraphs when a different comparison arrives.

#### Returns

`ActivityTextChangeComponent`

## Properties

### afterLabel

```ts
readonly afterLabel: InputSignal<string | undefined>;
```

Defined in: [libs/ui/src/components/activity-log/ActivityTextChangeComponent.ts:136](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/activity-log/ActivityTextChangeComponent.ts#L136)

Announces the meaning of added text for assistive technology.

***

### beforeLabel

```ts
readonly beforeLabel: InputSignal<string | undefined>;
```

Defined in: [libs/ui/src/components/activity-log/ActivityTextChangeComponent.ts:133](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/activity-log/ActivityTextChangeComponent.ts#L133)

Announces the meaning of removed text for assistive technology.

***

### detailed

```ts
readonly detailed: InputSignal<boolean>;
```

Defined in: [libs/ui/src/components/activity-log/ActivityTextChangeComponent.ts:130](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/activity-log/ActivityTextChangeComponent.ts#L130)

Uses the activity timeline's typography and a directional toggle icon.

***

### expanded

```ts
protected readonly expanded: WritableSignal<ReadonlySet<number>>;
```

Defined in: [libs/ui/src/components/activity-log/ActivityTextChangeComponent.ts:138](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/activity-log/ActivityTextChangeComponent.ts#L138)

***

### groups

```ts
protected readonly groups: Signal<ParagraphGroup[]>;
```

Defined in: [libs/ui/src/components/activity-log/ActivityTextChangeComponent.ts:139](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/activity-log/ActivityTextChangeComponent.ts#L139)

***

### paragraphs

```ts
readonly paragraphs: InputSignal<readonly ActivityTextParagraph[]>;
```

Defined in: [libs/ui/src/components/activity-log/ActivityTextChangeComponent.ts:124](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/activity-log/ActivityTextChangeComponent.ts#L124)

Paragraphs produced by `diffActivityText`.

***

### unchangedLabel

```ts
readonly unchangedLabel: InputSignal<(count, expanded) => string>;
```

Defined in: [libs/ui/src/components/activity-log/ActivityTextChangeComponent.ts:127](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/activity-log/ActivityTextChangeComponent.ts#L127)

Builds the localized toggle label for an unchanged run.

## Methods

### toggle()

```ts
protected toggle(index): void;
```

Defined in: [libs/ui/src/components/activity-log/ActivityTextChangeComponent.ts:162](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/activity-log/ActivityTextChangeComponent.ts#L162)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `index` | `number` |

#### Returns

`void`
