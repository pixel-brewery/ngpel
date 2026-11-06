---
title: 'Interface: ILiveFilterPreference'
generated: true
editUrl: false
---
# Interface: ILiveFilterPreference

Defined in: [libs/ui/src/components/filter-bar/saved-filters/ILiveFilterPreference.ts:12](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/filter-bar/saved-filters/ILiveFilterPreference.ts#L12)

Stores an active filter so the presenter can restore it before the first list load.

## Properties

### openWhenActive?

```ts
readonly optional openWhenActive?: boolean;
```

Defined in: [libs/ui/src/components/filter-bar/saved-filters/ILiveFilterPreference.ts:17](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/filter-bar/saved-filters/ILiveFilterPreference.ts#L17)

Opens the filter panel when a nonempty preference is restored.

***

### storageKey

```ts
readonly storageKey: string;
```

Defined in: [libs/ui/src/components/filter-bar/saved-filters/ILiveFilterPreference.ts:14](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/filter-bar/saved-filters/ILiveFilterPreference.ts#L14)

Stable storage key, distinct from the named filter storage key.

## Methods

### restoreValues()

```ts
restoreValues(values): void;
```

Defined in: [libs/ui/src/components/filter-bar/saved-filters/ILiveFilterPreference.ts:20](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/filter-bar/saved-filters/ILiveFilterPreference.ts#L20)

Restores filter values without issuing a new load.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `values` | [`FilterValues`](TypeAlias.FilterValues) |

#### Returns

`void`
