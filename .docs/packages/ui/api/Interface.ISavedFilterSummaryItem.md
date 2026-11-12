---
title: 'Interface: ISavedFilterSummaryItem'
generated: true
editUrl: false
---
# Interface: ISavedFilterSummaryItem

Defined in: [libs/ui/src/components/filter-bar/saved-filters/ISavedFilterSummaryItem.ts:12](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/filter-bar/saved-filters/ISavedFilterSummaryItem.ts#L12)

Visual summary item for a saved filter definition.

## Properties

### condition?

```ts
readonly condition?: FilterConditionValue;
```

Defined in: [libs/ui/src/components/filter-bar/saved-filters/ISavedFilterSummaryItem.ts:31](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/filter-bar/saved-filters/ISavedFilterSummaryItem.ts#L31)

Group condition when the item represents a condition group.

***

### conditionLabel?

```ts
readonly conditionLabel?: string;
```

Defined in: [libs/ui/src/components/filter-bar/saved-filters/ISavedFilterSummaryItem.ts:36](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/filter-bar/saved-filters/ISavedFilterSummaryItem.ts#L36)

Human readable condition label.

***

### depth

```ts
readonly depth: number;
```

Defined in: [libs/ui/src/components/filter-bar/saved-filters/ISavedFilterSummaryItem.ts:26](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/filter-bar/saved-filters/ISavedFilterSummaryItem.ts#L26)

Tree depth for advanced filters.

***

### fieldLabel?

```ts
readonly fieldLabel?: string;
```

Defined in: [libs/ui/src/components/filter-bar/saved-filters/ISavedFilterSummaryItem.ts:41](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/filter-bar/saved-filters/ISavedFilterSummaryItem.ts#L41)

Human readable field label.

***

### id

```ts
readonly id: string;
```

Defined in: [libs/ui/src/components/filter-bar/saved-filters/ISavedFilterSummaryItem.ts:16](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/filter-bar/saved-filters/ISavedFilterSummaryItem.ts#L16)

Stable rendering key.

***

### kind

```ts
readonly kind: "group" | "rule";
```

Defined in: [libs/ui/src/components/filter-bar/saved-filters/ISavedFilterSummaryItem.ts:21](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/filter-bar/saved-filters/ISavedFilterSummaryItem.ts#L21)

Item kind.

***

### operatorLabel?

```ts
readonly operatorLabel?: string;
```

Defined in: [libs/ui/src/components/filter-bar/saved-filters/ISavedFilterSummaryItem.ts:46](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/filter-bar/saved-filters/ISavedFilterSummaryItem.ts#L46)

Human readable operator label.

***

### valueLabel?

```ts
readonly valueLabel?: string;
```

Defined in: [libs/ui/src/components/filter-bar/saved-filters/ISavedFilterSummaryItem.ts:51](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/filter-bar/saved-filters/ISavedFilterSummaryItem.ts#L51)

Human readable value label.
