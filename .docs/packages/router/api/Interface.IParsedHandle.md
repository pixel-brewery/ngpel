---
title: 'Interface: IParsedHandle'
generated: true
editUrl: false
---
# Interface: IParsedHandle

Defined in: [navigation/IParsedHandle.ts:13](https://github.com/pixel-brewery/ngpel/blob/main/libs/router/src/navigation/IParsedHandle.ts#L13)

The parsed representation of a [NavHandle](TypeAlias.NavHandle).

## Properties

### path

```ts
readonly path: string;
```

Defined in: [navigation/IParsedHandle.ts:25](https://github.com/pixel-brewery/ngpel/blob/main/libs/router/src/navigation/IParsedHandle.ts#L25)

The value without scheme and without the query part, for example `/main/users` or
`dialog.open.settings`.

***

### query

```ts
readonly query: Readonly<Record<string, unknown>>;
```

Defined in: [navigation/IParsedHandle.ts:30](https://github.com/pixel-brewery/ngpel/blob/main/libs/router/src/navigation/IParsedHandle.ts#L30)

The decoded query parameters; a repeated parameter becomes an array.

***

### raw

```ts
readonly raw: NavHandle;
```

Defined in: [navigation/IParsedHandle.ts:35](https://github.com/pixel-brewery/ngpel/blob/main/libs/router/src/navigation/IParsedHandle.ts#L35)

The handle this representation was parsed from.

***

### scheme

```ts
readonly scheme: NavHandleScheme;
```

Defined in: [navigation/IParsedHandle.ts:19](https://github.com/pixel-brewery/ngpel/blob/main/libs/router/src/navigation/IParsedHandle.ts#L19)

The scheme in front of the first colon.
