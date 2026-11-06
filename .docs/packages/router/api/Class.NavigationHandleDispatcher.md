---
title: 'Class: NavigationHandleDispatcher'
generated: true
editUrl: false
---
# Class: NavigationHandleDispatcher

Defined in: [navigation/NavigationHandleDispatcher.ts:26](https://github.com/pixel-brewery/ngpel/blob/main/libs/router/src/navigation/NavigationHandleDispatcher.ts#L26)

Executes [NavHandle](TypeAlias.NavHandle) actions. `route:` goes through the Angular router and `ext:` through
the [NAVIGATION\_WINDOW](Variable.NAVIGATION_WINDOW) port; every other scheme — `cmd:` in particular — is delegated to
an [INavHandleHandler](Interface.INavHandleHandler) registered under `NAV_HANDLE_HANDLER`, which keeps the command
stack out of this package's dependencies.

Registered by `provideNavigation(...)`.

## Constructors

### Constructor

```ts
new NavigationHandleDispatcher(): NavigationHandleDispatcher;
```

Defined in: [navigation/NavigationHandleDispatcher.ts:42](https://github.com/pixel-brewery/ngpel/blob/main/libs/router/src/navigation/NavigationHandleDispatcher.ts#L42)

Constructs a new instance of the `NavigationHandleDispatcher` class.

#### Returns

`NavigationHandleDispatcher`

## Methods

### execute()

```ts
execute(item): Promise<void>;
```

Defined in: [navigation/NavigationHandleDispatcher.ts:59](https://github.com/pixel-brewery/ngpel/blob/main/libs/router/src/navigation/NavigationHandleDispatcher.ts#L59)

Executes the handle of an item. An item without a handle is a pure group and does nothing.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `item` | [`INavItem`](Interface.INavItem) | The navigation item. |

#### Returns

`Promise`\<`void`\>

#### Throws

Error when the handle is malformed or its scheme has no handler.

***

### executeHandle()

```ts
executeHandle(handle): Promise<void>;
```

Defined in: [navigation/NavigationHandleDispatcher.ts:74](https://github.com/pixel-brewery/ngpel/blob/main/libs/router/src/navigation/NavigationHandleDispatcher.ts#L74)

Executes a handle directly.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `handle` | [`NavHandle`](TypeAlias.NavHandle) | The handle to execute. |

#### Returns

`Promise`\<`void`\>

#### Throws

Error when the handle is malformed or its scheme has no handler.
