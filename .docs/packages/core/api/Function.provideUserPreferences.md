---
title: 'Function: provideUserPreferences()'
generated: true
editUrl: false
---
# Function: provideUserPreferences()

```ts
function provideUserPreferences(...features): EnvironmentProviders;
```

Defined in: [storage/preferences/provideUserPreferences.ts:18](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/storage/preferences/provideUserPreferences.ts#L18)

Composes the user-preference port. Exactly one storage feature (`withLocalStorage()`,
`withSessionStorage()` or `withUserPreferenceStorage()`) binds `USER_PREFERENCE_STORAGE`; two
raise the kernel's feature-conflict error, none leaves the token unbound.

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| ...`features` | readonly [`IFeature`](Interface.IFeature)\<`"storage"`\>[] | The preference features. |

## Returns

`EnvironmentProviders`

Environment providers for the composition root.
