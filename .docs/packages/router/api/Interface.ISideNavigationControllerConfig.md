---
title: 'Interface: ISideNavigationControllerConfig'
generated: true
editUrl: false
---
# Interface: ISideNavigationControllerConfig

Defined in: [shell/ISideNavigationControllerConfig.ts:7](https://github.com/pixel-brewery/ngpel/blob/main/libs/router/src/shell/ISideNavigationControllerConfig.ts#L7)

Configures [createSideNavigationController](Function.createSideNavigationController). Every member is optional; the defaults are the
`presentation.*` storage keys and the media queries of a 960px shell breakpoint.

## Properties

### autoOpenMediaQuery?

```ts
readonly autoOpenMediaQuery?: string;
```

Defined in: [shell/ISideNavigationControllerConfig.ts:47](https://github.com/pixel-brewery/ngpel/blob/main/libs/router/src/shell/ISideNavigationControllerConfig.ts#L47)

Media query of the viewport wide enough to show the navigation by default. Defaults to
`'(min-width: 960px)'`.

***

### defaultRailSplitPosition?

```ts
readonly defaultRailSplitPosition?: number;
```

Defined in: [shell/ISideNavigationControllerConfig.ts:59](https://github.com/pixel-brewery/ngpel/blob/main/libs/router/src/shell/ISideNavigationControllerConfig.ts#L59)

The split position used until the user moves the divider, as a percentage. Defaults to `60`.

***

### hasNavigationDataKey?

```ts
readonly hasNavigationDataKey?: string;
```

Defined in: [shell/ISideNavigationControllerConfig.ts:54](https://github.com/pixel-brewery/ngpel/blob/main/libs/router/src/shell/ISideNavigationControllerConfig.ts#L54)

Route data key a route sets to `false` to suppress the navigation, for example a full-screen
editor. Defaults to `'hasNav'`; every other value, including an absent one, means the route
has navigation.

***

### maxRailSplitPosition?

```ts
readonly maxRailSplitPosition?: number;
```

Defined in: [shell/ISideNavigationControllerConfig.ts:69](https://github.com/pixel-brewery/ngpel/blob/main/libs/router/src/shell/ISideNavigationControllerConfig.ts#L69)

The largest persisted split position, as a percentage. Defaults to `70`.

***

### minRailSplitPosition?

```ts
readonly minRailSplitPosition?: number;
```

Defined in: [shell/ISideNavigationControllerConfig.ts:64](https://github.com/pixel-brewery/ngpel/blob/main/libs/router/src/shell/ISideNavigationControllerConfig.ts#L64)

The smallest persisted split position, as a percentage. Defaults to `50`.

***

### mobileMediaQuery?

```ts
readonly mobileMediaQuery?: string;
```

Defined in: [shell/ISideNavigationControllerConfig.ts:41](https://github.com/pixel-brewery/ngpel/blob/main/libs/router/src/shell/ISideNavigationControllerConfig.ts#L41)

Media query that identifies the mobile layout. Defaults to `'(max-width: 959.98px)'`.

***

### mobileRailStorageKey?

```ts
readonly mobileRailStorageKey?: string;
```

Defined in: [shell/ISideNavigationControllerConfig.ts:30](https://github.com/pixel-brewery/ngpel/blob/main/libs/router/src/shell/ISideNavigationControllerConfig.ts#L30)

Storage key of the mobile rail preference, persisted separately so a phone does not inherit
a desktop rail. Defaults to `'presentation.isMobileRailOpen'`.

***

### navigationCompactStorageKey?

```ts
readonly navigationCompactStorageKey?: string;
```

Defined in: [shell/ISideNavigationControllerConfig.ts:19](https://github.com/pixel-brewery/ngpel/blob/main/libs/router/src/shell/ISideNavigationControllerConfig.ts#L19)

Storage key of the compact (icon-only) navigation preference. Defaults to
`'presentation.navigationIsRail'`.

***

### navigationStorageKey?

```ts
readonly navigationStorageKey?: string;
```

Defined in: [shell/ISideNavigationControllerConfig.ts:13](https://github.com/pixel-brewery/ngpel/blob/main/libs/router/src/shell/ISideNavigationControllerConfig.ts#L13)

Storage key of the navigation sidebar preference. Defaults to `'presentation.isNavOpen'`.

***

### railSplitPositionStorageKey?

```ts
readonly railSplitPositionStorageKey?: string;
```

Defined in: [shell/ISideNavigationControllerConfig.ts:36](https://github.com/pixel-brewery/ngpel/blob/main/libs/router/src/shell/ISideNavigationControllerConfig.ts#L36)

Storage key of the desktop rail split position. Defaults to
`'presentation.railSplitPosition'`.

***

### railStorageKey?

```ts
readonly railStorageKey?: string;
```

Defined in: [shell/ISideNavigationControllerConfig.ts:24](https://github.com/pixel-brewery/ngpel/blob/main/libs/router/src/shell/ISideNavigationControllerConfig.ts#L24)

Storage key of the desktop rail preference. Defaults to `'presentation.isRailOpen'`.
