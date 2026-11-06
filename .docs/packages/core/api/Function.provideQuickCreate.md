---
title: 'Function: provideQuickCreate()'
generated: true
editUrl: false
---
# Function: provideQuickCreate()

```ts
function provideQuickCreate(...features): EnvironmentProviders;
```

Defined in: [search/quick-create/provideQuickCreate.ts:17](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/search/quick-create/provideQuickCreate.ts#L17)

Provides the manager for feature-owned contextual create actions.

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| ...`features` | readonly [`IFeature`](Interface.IFeature)\<`"quick-create-items"`\>[] | Registrations from `withQuickCreateItems()`. |

## Returns

`EnvironmentProviders`

Environment providers for the application composition root.
