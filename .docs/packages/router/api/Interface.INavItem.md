---
title: 'Interface: INavItem'
generated: true
editUrl: false
---
# Interface: INavItem

Defined in: [navigation/INavItem.ts:15](https://github.com/pixel-brewery/ngpel/blob/main/libs/router/src/navigation/INavItem.ts#L15)

One entry of the application navigation, contributed as plain data so any host — a sidebar, a
command palette, a mobile dock — can render the same registry. An item carries what to show
(`label`, `icon`, `badge`, `variant`), where it belongs (`region`, `parent`, `children`,
`order`), who may see it (`capabilities`) and what activating it does ([NavHandle](TypeAlias.NavHandle)).

## Properties

### badge?

```ts
readonly badge?: string | number;
```

Defined in: [navigation/INavItem.ts:74](https://github.com/pixel-brewery/ngpel/blob/main/libs/router/src/navigation/INavItem.ts#L74)

A badge rendered next to the label, for example an unread count.

***

### capabilities?

```ts
readonly capabilities?: readonly string[];
```

Defined in: [navigation/INavItem.ts:44](https://github.com/pixel-brewery/ngpel/blob/main/libs/router/src/navigation/INavItem.ts#L44)

The capabilities that make the item visible. An absent or empty list means unrestricted;
a non-empty list is OR-linked — one held capability is enough. Enforcement is a product
policy and belongs in an `INavigationGuard`.

***

### children?

```ts
readonly children?: readonly Omit<INavItem, "parent">[];
```

Defined in: [navigation/INavItem.ts:54](https://github.com/pixel-brewery/ngpel/blob/main/libs/router/src/navigation/INavItem.ts#L54)

The children of the item, declared inline.

***

### data?

```ts
readonly data?: Readonly<Record<string, unknown>>;
```

Defined in: [navigation/INavItem.ts:59](https://github.com/pixel-brewery/ngpel/blob/main/libs/router/src/navigation/INavItem.ts#L59)

Free-form data for the host, for example a tooltip or an analytics id.

***

### handle?

```ts
readonly handle?: NavHandle;
```

Defined in: [navigation/INavItem.ts:37](https://github.com/pixel-brewery/ngpel/blob/main/libs/router/src/navigation/INavItem.ts#L37)

What activating the item does. An item without a handle is a pure group.

***

### icon?

```ts
readonly icon?: string;
```

Defined in: [navigation/INavItem.ts:32](https://github.com/pixel-brewery/ngpel/blob/main/libs/router/src/navigation/INavItem.ts#L32)

The icon of the item, named in the host's icon vocabulary.

***

### key

```ts
readonly key: string;
```

Defined in: [navigation/INavItem.ts:22](https://github.com/pixel-brewery/ngpel/blob/main/libs/router/src/navigation/INavItem.ts#L22)

The unique key of the item. Two contributions sharing a key are merged into one item, which
is how several feature libraries fill one shared group.

***

### label

```ts
readonly label: string;
```

Defined in: [navigation/INavItem.ts:27](https://github.com/pixel-brewery/ngpel/blob/main/libs/router/src/navigation/INavItem.ts#L27)

The label of the item; a plain text or a translation key the host resolves.

***

### order?

```ts
readonly order?: number;
```

Defined in: [navigation/INavItem.ts:64](https://github.com/pixel-brewery/ngpel/blob/main/libs/router/src/navigation/INavItem.ts#L64)

The sort order within its region or parent; ascending, defaults to `0`.

***

### parent?

```ts
readonly parent?: string | INavItem;
```

Defined in: [navigation/INavItem.ts:49](https://github.com/pixel-brewery/ngpel/blob/main/libs/router/src/navigation/INavItem.ts#L49)

The parent of the item, as a key or as the item itself.

***

### region?

```ts
readonly region?: string;
```

Defined in: [navigation/INavItem.ts:69](https://github.com/pixel-brewery/ngpel/blob/main/libs/router/src/navigation/INavItem.ts#L69)

The area of the shell the item belongs to, for example `'main'` or `'profile'`.

***

### variant?

```ts
readonly variant?: string;
```

Defined in: [navigation/INavItem.ts:79](https://github.com/pixel-brewery/ngpel/blob/main/libs/router/src/navigation/INavItem.ts#L79)

A visual variant named in the host's design vocabulary, for example `'accent'`.
