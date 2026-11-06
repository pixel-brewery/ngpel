---
title: 'Function: withUserPreferenceStorage()'
generated: true
editUrl: false
---
# Function: withUserPreferenceStorage()

```ts
function withUserPreferenceStorage(factory): IFeature<"storage">;
```

Defined in: [storage/preferences/withUserPreferenceStorage.ts:18](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/storage/preferences/withUserPreferenceStorage.ts#L18)

Binds a custom adapter of the user-preference port, for hosts whose preferences live outside
Web Storage (an Electron bridge, a remote profile). The factory runs in the injection context.

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `factory` | () => [`IUserPreferenceStorage`](Interface.IUserPreferenceStorage) | Creates the adapter. |

## Returns

[`IFeature`](Interface.IFeature)\<`"storage"`\>

The storage feature for `provideUserPreferences()`.
