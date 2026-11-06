---
title: 'Interface: ISideNavigationController'
generated: true
editUrl: false
---
# Interface: ISideNavigationController

Defined in: [shell/ISideNavigationController.ts:14](https://github.com/pixel-brewery/ngpel/blob/main/libs/router/src/shell/ISideNavigationController.ts#L14)

The responsive state of an application shell: the navigation sidebar on the left and the rail
panel on the right, both persisted per user and both aware of the current viewport. Created by
[createSideNavigationController](Function.createSideNavigationController).

## Properties

### isMobile

```ts
readonly isMobile: Signal<boolean>;
```

Defined in: [shell/ISideNavigationController.ts:53](https://github.com/pixel-brewery/ngpel/blob/main/libs/router/src/shell/ISideNavigationController.ts#L53)

Whether the shell currently uses its mobile layout.

***

### isNavigationCompact

```ts
readonly isNavigationCompact: Signal<boolean>;
```

Defined in: [shell/ISideNavigationController.ts:31](https://github.com/pixel-brewery/ngpel/blob/main/libs/router/src/shell/ISideNavigationController.ts#L31)

Whether the navigation is shown as an icon-only rail. Always `false` on mobile, where a
compact rail has no room.

***

### isNavigationOpen

```ts
readonly isNavigationOpen: Signal<boolean>;
```

Defined in: [shell/ISideNavigationController.ts:23](https://github.com/pixel-brewery/ngpel/blob/main/libs/router/src/shell/ISideNavigationController.ts#L23)

Whether the navigation sidebar is open, combining the persisted preference, the viewport and
the current route.

***

### isRailOpen

```ts
readonly isRailOpen: Signal<boolean>;
```

Defined in: [shell/ISideNavigationController.ts:39](https://github.com/pixel-brewery/ngpel/blob/main/libs/router/src/shell/ISideNavigationController.ts#L39)

Whether the rail panel is open for the current viewport; desktop and mobile are persisted
independently.

***

### railSplitPosition

```ts
readonly railSplitPosition: Signal<number>;
```

Defined in: [shell/ISideNavigationController.ts:46](https://github.com/pixel-brewery/ngpel/blob/main/libs/router/src/shell/ISideNavigationController.ts#L46)

The persisted desktop split position, as a percentage of the available width.

## Methods

### closeRail()

```ts
closeRail(): void;
```

Defined in: [shell/ISideNavigationController.ts:85](https://github.com/pixel-brewery/ngpel/blob/main/libs/router/src/shell/ISideNavigationController.ts#L85)

Closes the rail panel of the current viewport.

#### Returns

`void`

***

### setNavigationOpen()

```ts
setNavigationOpen(isOpen): void;
```

Defined in: [shell/ISideNavigationController.ts:70](https://github.com/pixel-brewery/ngpel/blob/main/libs/router/src/shell/ISideNavigationController.ts#L70)

Opens or closes the navigation sidebar, for a host whose own component reports a
user-initiated change such as a swipe.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `isOpen` | `boolean` | The new state. |

#### Returns

`void`

***

### setRailSplitPosition()

```ts
setRailSplitPosition(position): void;
```

Defined in: [shell/ISideNavigationController.ts:94](https://github.com/pixel-brewery/ngpel/blob/main/libs/router/src/shell/ISideNavigationController.ts#L94)

Applies a split position the user dragged to: the rail counts as closed at `100`, and a
position within the configured bounds is persisted. Ignored on mobile, where the rail is a
sheet rather than a split.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `position` | `number` | The split position as a percentage of the available width. |

#### Returns

`void`

***

### toggleNavigation()

```ts
toggleNavigation(): void;
```

Defined in: [shell/ISideNavigationController.ts:62](https://github.com/pixel-brewery/ngpel/blob/main/libs/router/src/shell/ISideNavigationController.ts#L62)

Toggles the navigation sidebar.

#### Returns

`void`

***

### toggleNavigationCompact()

```ts
toggleNavigationCompact(): void;
```

Defined in: [shell/ISideNavigationController.ts:75](https://github.com/pixel-brewery/ngpel/blob/main/libs/router/src/shell/ISideNavigationController.ts#L75)

Toggles the navigation between its expanded and its icon-only display.

#### Returns

`void`

***

### toggleRail()

```ts
toggleRail(): void;
```

Defined in: [shell/ISideNavigationController.ts:80](https://github.com/pixel-brewery/ngpel/blob/main/libs/router/src/shell/ISideNavigationController.ts#L80)

Toggles the rail panel of the current viewport.

#### Returns

`void`
