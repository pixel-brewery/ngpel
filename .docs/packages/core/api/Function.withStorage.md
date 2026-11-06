---
title: 'Function: withStorage()'
generated: true
editUrl: false
---
# Function: withStorage()

```ts
function withStorage(storage): IFeature<"storage">;
```

Defined in: [storage/angular/withStorage.ts:23](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/storage/angular/withStorage.ts#L23)

Binds `BROWSER_STORAGE` to a specific storage implementation. Pass a factory when the storage
must be resolved lazily or needs the injection context (for example a Capacitor bridge); pass
`null` to declare storage unavailable.

Binding `null` does not silently disable persistence; it declares its absence. Reads then degrade
to `undefined` and every mutation throws `LocalStorageUnavailableError`, which carries the entry
point's single unavailable-storage policy.

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `storage` | `Storage` \| (() => `Storage` \| `null`) \| `null` | The storage, `null`, or a factory producing either. |

## Returns

[`IFeature`](Interface.IFeature)\<`"storage"`\>

The storage feature for `provideBrowserStorage()`.
