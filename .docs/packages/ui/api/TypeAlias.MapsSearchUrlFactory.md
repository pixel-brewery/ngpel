---
title: 'Type Alias: MapsSearchUrlFactory'
generated: true
editUrl: false
---
# Type Alias: MapsSearchUrlFactory

```ts
type MapsSearchUrlFactory = (query) => string;
```

Defined in: [libs/ui/src/pipes/links/MapsSearchUrlFactory.ts:8](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/pipes/links/MapsSearchUrlFactory.ts#L8)

Builds the URL of a map search for an already assembled address query.

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `query` | `string` | The address query, not yet URL-encoded. |

## Returns

`string`

The URL that opens the map search.
