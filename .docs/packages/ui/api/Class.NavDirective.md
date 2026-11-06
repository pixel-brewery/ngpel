---
title: 'Class: NavDirective'
generated: true
editUrl: false
---
# Class: NavDirective

Defined in: [libs/ui/src/directives/nav/NavDirective.ts:22](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/directives/nav/NavDirective.ts#L22)

Attribute directive to bind a generic INavItem / handle to `<mosaik-menu-item/>`.

- For `route:*` → computes active state and navigates.
- For `cmd:` / `ext:` → calls `NavigationManager.execute(item)`.

## Constructors

### Constructor

```ts
new NavDirective(): NavDirective;
```

Defined in: [libs/ui/src/directives/nav/NavDirective.ts:79](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/directives/nav/NavDirective.ts#L79)

#### Returns

`NavDirective`

## Properties

### ngpNav

```ts
readonly ngpNav: InputSignal<INavItem | null>;
```

Defined in: [libs/ui/src/directives/nav/NavDirective.ts:32](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/directives/nav/NavDirective.ts#L32)

Binds a full navigation item.

***

### ngpNavHandle

```ts
readonly ngpNavHandle: InputSignal<NavHandle | null>;
```

Defined in: [libs/ui/src/directives/nav/NavDirective.ts:36](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/directives/nav/NavDirective.ts#L36)

Binds a raw handle directly (overrides item.handle).

***

### ngpNavStrictActive

```ts
readonly ngpNavStrictActive: InputSignal<boolean>;
```

Defined in: [libs/ui/src/directives/nav/NavDirective.ts:40](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/directives/nav/NavDirective.ts#L40)

When true, uses strict path comparison for active state.

## Methods

### onClick()

```ts
protected onClick(ev): Promise<void>;
```

Defined in: [libs/ui/src/directives/nav/NavDirective.ts:144](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/directives/nav/NavDirective.ts#L144)

Click activates navigation or command.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `ev` | `Event` |

#### Returns

`Promise`\<`void`\>

***

### onKeydown()

```ts
protected onKeydown(ev): Promise<void>;
```

Defined in: [libs/ui/src/directives/nav/NavDirective.ts:172](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/directives/nav/NavDirective.ts#L172)

Keyboard support (Enter / Space).

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `ev` | `KeyboardEvent` |

#### Returns

`Promise`\<`void`\>
