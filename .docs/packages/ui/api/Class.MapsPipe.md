---
title: 'Class: MapsPipe'
generated: true
editUrl: false
---
# Class: MapsPipe

Defined in: [libs/ui/src/pipes/links/MapsPipe.ts:21](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/pipes/links/MapsPipe.ts#L21)

Turns an address into a map search link: `[href]="site.address | ngpMaps: site.name"`.

Both a single line of address text and a structured address are accepted; the parts of a
structured address are joined the way a postal address reads, and empty parts are dropped so no
query carries stray separators. An address that holds nothing yields `null`, so the template can
hide the link. The linked map service comes from [MAPS\_SEARCH\_URL\_FACTORY](Variable.MAPS_SEARCH_URL_FACTORY).

## Implements

- `PipeTransform`

## Constructors

### Constructor

```ts
new MapsPipe(): MapsPipe;
```

#### Returns

`MapsPipe`

## Methods

### transform()

```ts
transform(value, placeName?): string | null;
```

Defined in: [libs/ui/src/pipes/links/MapsPipe.ts:39](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/pipes/links/MapsPipe.ts#L39)

Builds the map search URL of `value`.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `value` | [`MapsValue`](TypeAlias.MapsValue) \| `null` \| `undefined` | The address. |
| `placeName?` | `string` \| `null` | The name of the place, prepended to the query so the map can match a well-known location before its street. |

#### Returns

`string` \| `null`

The map search URL, or `null` when the address holds nothing.

#### Implementation of

```ts
PipeTransform.transform
```
