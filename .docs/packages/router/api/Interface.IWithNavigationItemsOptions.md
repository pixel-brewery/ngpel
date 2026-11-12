---
title: 'Interface: IWithNavigationItemsOptions'
generated: true
editUrl: false
---
# Interface: IWithNavigationItemsOptions

Defined in: [navigation/provider/IWithNavigationItemsOptions.ts:12](https://github.com/pixel-brewery/ngpel/blob/main/libs/router/src/navigation/provider/IWithNavigationItemsOptions.ts#L12)

Options of `withNavigationItems(...)`.

## Properties

### id

```ts
readonly id: string;
```

Defined in: [navigation/provider/IWithNavigationItemsOptions.ts:20](https://github.com/pixel-brewery/ngpel/blob/main/libs/router/src/navigation/provider/IWithNavigationItemsOptions.ts#L20)

The stable id of this contribution, unique across every navigation contribution of the
application; it is what makes a duplicate registration a composition error instead of a
silent duplicate menu entry.

***

### items

```ts
readonly items:
  | INavItem
  | readonly INavItem[];
```

Defined in: [navigation/provider/IWithNavigationItemsOptions.ts:25](https://github.com/pixel-brewery/ngpel/blob/main/libs/router/src/navigation/provider/IWithNavigationItemsOptions.ts#L25)

The contributed items.

***

### order?

```ts
readonly order?: number;
```

Defined in: [navigation/provider/IWithNavigationItemsOptions.ts:32](https://github.com/pixel-brewery/ngpel/blob/main/libs/router/src/navigation/provider/IWithNavigationItemsOptions.ts#L32)

The order applied to every contributed item that declares none. Composition roots order
whole feature contributions with it, instead of every feature library baking a number into
its own items.
