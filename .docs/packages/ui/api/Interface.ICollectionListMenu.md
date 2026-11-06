---
title: 'Interface: ICollectionListMenu'
generated: true
editUrl: false
---
# Interface: ICollectionListMenu

Defined in: [libs/ui/src/components/collection-list/ICollectionListMenu.ts:12](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/collection-list/ICollectionListMenu.ts#L12)

Dropdown menu displayed in a collection-list header.

## Properties

### id

```ts
readonly id: string;
```

Defined in: [libs/ui/src/components/collection-list/ICollectionListMenu.ts:19](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/collection-list/ICollectionListMenu.ts#L19)

Stable menu identifier.

***

### label

```ts
readonly label: string;
```

Defined in: [libs/ui/src/components/collection-list/ICollectionListMenu.ts:27](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/collection-list/ICollectionListMenu.ts#L27)

Visible menu label.

***

### options

```ts
readonly options: readonly ICollectionListMenuOption[];
```

Defined in: [libs/ui/src/components/collection-list/ICollectionListMenu.ts:35](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/collection-list/ICollectionListMenu.ts#L35)

Ordered menu options.

***

### subLabel?

```ts
readonly optional subLabel?: string;
```

Defined in: [libs/ui/src/components/collection-list/ICollectionListMenu.ts:43](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/collection-list/ICollectionListMenu.ts#L43)

Optional summary of the active option.

***

### testId?

```ts
readonly optional testId?: string;
```

Defined in: [libs/ui/src/components/collection-list/ICollectionListMenu.ts:51](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/collection-list/ICollectionListMenu.ts#L51)

Optional stable test identifier.
