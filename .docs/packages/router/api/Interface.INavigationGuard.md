---
title: 'Interface: INavigationGuard'
generated: true
editUrl: false
---
# Interface: INavigationGuard

Defined in: [navigation/INavigationGuard.ts:31](https://github.com/pixel-brewery/ngpel/blob/main/libs/router/src/navigation/INavigationGuard.ts#L31)

Decides which navigation items a user may see. Returning the item — possibly a modified copy,
for example with filtered children — allows it; returning `null` removes it entirely. Guards run
in registration order and each guard receives the previous guard's result, so they compose.

## Example

```typescript
@Injectable()
export class CapabilityNavigationGuard implements INavigationGuard {
    private readonly _permissions = inject(PermissionFacade);

    public get stateChanges(): Observable<unknown> {
        return this._permissions.changed;
    }

    public canRegister(nav: INavItem): INavItem | null {
        return this._permissions.hasAny(nav.capabilities) ? nav : null;
    }
}
```

## Properties

### stateChanges?

```ts
readonly optional stateChanges?: Observable<unknown>;
```

Defined in: [navigation/INavigationGuard.ts:39](https://github.com/pixel-brewery/ngpel/blob/main/libs/router/src/navigation/INavigationGuard.ts#L39)

Emits whenever the state this guard decides on changes — a sign-in, a sign-out, a permission
refresh — so the whole navigation is evaluated again. Guards without user-dependent state
omit it.

## Methods

### canRegister()

```ts
canRegister(nav):
  | INavItem
  | Promise<INavItem | null>
  | null;
```

Defined in: [navigation/INavigationGuard.ts:51](https://github.com/pixel-brewery/ngpel/blob/main/libs/router/src/navigation/INavigationGuard.ts#L51)

Decides about one item.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `nav` | [`INavItem`](Interface.INavItem) | The item as the previous guard left it. |

#### Returns

  \| [`INavItem`](Interface.INavItem)
  \| `Promise`\<[`INavItem`](Interface.INavItem) \| `null`\>
  \| `null`

The item to register, or `null` to remove it.
