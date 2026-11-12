---
title: 'Interface: IPresentationRoutesOptions'
generated: true
editUrl: false
---
# Interface: IPresentationRoutesOptions

Defined in: [shell/IPresentationRoutesOptions.ts:13](https://github.com/pixel-brewery/ngpel/blob/main/libs/router/src/shell/IPresentationRoutesOptions.ts#L13)

Options of `presentationRoutes(...)`.

## Properties

### data?

```ts
readonly data?: Data;
```

Defined in: [shell/IPresentationRoutesOptions.ts:43](https://github.com/pixel-brewery/ngpel/blob/main/libs/router/src/shell/IPresentationRoutesOptions.ts#L43)

Static data attached to the shell route.

***

### guards?

```ts
readonly guards?: IPresentationRouteGuards;
```

Defined in: [shell/IPresentationRoutesOptions.ts:38](https://github.com/pixel-brewery/ngpel/blob/main/libs/router/src/shell/IPresentationRoutesOptions.ts#L38)

The guards protecting the shell route.

***

### path?

```ts
readonly path?: string;
```

Defined in: [shell/IPresentationRoutesOptions.ts:27](https://github.com/pixel-brewery/ngpel/blob/main/libs/router/src/shell/IPresentationRoutesOptions.ts#L27)

The path segment the shell is mounted at. Defaults to `'main'`.

***

### redirectTo?

```ts
readonly redirectTo?: string;
```

Defined in: [shell/IPresentationRoutesOptions.ts:33](https://github.com/pixel-brewery/ngpel/blob/main/libs/router/src/shell/IPresentationRoutesOptions.ts#L33)

The child route the empty path redirects to, for example `'explore'`. Without it the shell
has no default child.

***

### shell

```ts
readonly shell: () =>
  | Type<unknown>
  | Observable<Type<unknown> | DefaultExport<Type<unknown>>>
| Promise<Type<unknown> | DefaultExport<Type<unknown>>>;
```

Defined in: [shell/IPresentationRoutesOptions.ts:22](https://github.com/pixel-brewery/ngpel/blob/main/libs/router/src/shell/IPresentationRoutesOptions.ts#L22)

Loads the shell component the feature routes are rendered inside. The shell itself stays in
the product: it composes the brand, the search launcher and everything else this package has
no opinion about. Pass a dynamic import for a lazy shell, or `() => AppShellView` for an
eager one.

#### Returns

  \| `Type`\<`unknown`\>
  \| `Observable`\<`Type`\<`unknown`\> \| `DefaultExport`\<`Type`\<`unknown`\>\>\>
  \| `Promise`\<`Type`\<`unknown`\> \| `DefaultExport`\<`Type`\<`unknown`\>\>\>
