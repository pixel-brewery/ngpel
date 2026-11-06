---
title: 'Interface: IContentNavigationItem'
generated: true
editUrl: false
---
# Interface: IContentNavigationItem

Defined in: [libs/ui/src/components/content-navigation/IContentNavigationItem.ts:6](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/content-navigation/IContentNavigationItem.ts#L6)

Describes a stable in-page destination exposed by a content navigation.

## Properties

### id

```ts
readonly id: string;
```

Defined in: [libs/ui/src/components/content-navigation/IContentNavigationItem.ts:13](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/content-navigation/IContentNavigationItem.ts#L13)

Stable HTML anchor identifier without a leading hash.

***

### label

```ts
readonly label: string;
```

Defined in: [libs/ui/src/components/content-navigation/IContentNavigationItem.ts:21](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/content-navigation/IContentNavigationItem.ts#L21)

Human-readable navigation label.

***

### level?

```ts
readonly optional level?: number;
```

Defined in: [libs/ui/src/components/content-navigation/IContentNavigationItem.ts:29](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/content-navigation/IContentNavigationItem.ts#L29)

Semantic outline level from one through six.

***

### order?

```ts
readonly optional order?: number;
```

Defined in: [libs/ui/src/components/content-navigation/IContentNavigationItem.ts:37](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/content-navigation/IContentNavigationItem.ts#L37)

Optional explicit ordering value. DOM registration order is used otherwise.
