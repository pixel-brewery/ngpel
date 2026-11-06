---
title: 'Interface: INavHandleHandler'
generated: true
editUrl: false
---
# Interface: INavHandleHandler

Defined in: [navigation/INavHandleHandler.ts:24](https://github.com/pixel-brewery/ngpel/blob/main/libs/router/src/navigation/INavHandleHandler.ts#L24)

Executes the handles of one [NavHandleScheme](TypeAlias.NavHandleScheme). The dispatcher handles `route:` and `ext:`
itself; `cmd:` has no built-in handler because the command stack is not a dependency of this
package — a product binds its own handler under `NAV_HANDLE_HANDLER`. A registered handler also
replaces a built-in scheme, which is how a shell can intercept `route:` navigation.

## Example

```typescript
{ provide: NAV_HANDLE_HANDLER, multi: true, useFactory: () => {
      const commands = inject(CommandRegistry);
      return { scheme: 'cmd', execute: (handle) => commands.resolve(handle.path).execute() };
  } }
```

## Properties

### scheme

```ts
readonly scheme: NavHandleScheme;
```

Defined in: [navigation/INavHandleHandler.ts:30](https://github.com/pixel-brewery/ngpel/blob/main/libs/router/src/navigation/INavHandleHandler.ts#L30)

The scheme this handler is responsible for.

## Methods

### execute()

```ts
execute(handle): void | Promise<void>;
```

Defined in: [navigation/INavHandleHandler.ts:41](https://github.com/pixel-brewery/ngpel/blob/main/libs/router/src/navigation/INavHandleHandler.ts#L41)

Executes one parsed handle.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `handle` | [`IParsedHandle`](Interface.IParsedHandle) | The parsed handle. |

#### Returns

`void` \| `Promise`\<`void`\>
