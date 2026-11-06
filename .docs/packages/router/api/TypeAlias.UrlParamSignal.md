---
title: 'Type Alias: UrlParamSignal\<T\>'
generated: true
editUrl: false
---
# Type Alias: UrlParamSignal\<T\>

```ts
type UrlParamSignal<T> = Signal<T | undefined> & {
  clear: Promise<boolean>;
  set: Promise<boolean>;
  update: Promise<boolean>;
};
```

Defined in: [signals/UrlParamSignal.ts:15](https://github.com/pixel-brewery/ngpel/blob/main/libs/router/src/signals/UrlParamSignal.ts#L15)

A URL-backed signal. `set()`, `update()` and `clear()` perform a router navigation instead of
mutating a local shadow value, so the next signal value always comes from the activated URL and
a manual URL edit, a bookmark and the back button all stay authoritative.

## Type Declaration

| Name | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| `clear()` | () => `Promise`\<`boolean`\> | Navigates so that the parameter is absent. | [signals/UrlParamSignal.ts:41](https://github.com/pixel-brewery/ngpel/blob/main/libs/router/src/signals/UrlParamSignal.ts#L41) |
| `set()` | (`value`) => `Promise`\<`boolean`\> | Navigates so that the parameter carries `value`; `undefined` removes it. **Throws** TypeError when the codec refuses to serialize the value. | [signals/UrlParamSignal.ts:25](https://github.com/pixel-brewery/ngpel/blob/main/libs/router/src/signals/UrlParamSignal.ts#L25) |
| `update()` | (`updater`) => `Promise`\<`boolean`\> | Navigates to the updater's result, computed from the value of the activated URL. **Throws** TypeError when the codec refuses to serialize the value. | [signals/UrlParamSignal.ts:34](https://github.com/pixel-brewery/ngpel/blob/main/libs/router/src/signals/UrlParamSignal.ts#L34) |

## Type Parameters

| Type Parameter | Description |
| ------ | ------ |
| `T` | The typed application value. |
