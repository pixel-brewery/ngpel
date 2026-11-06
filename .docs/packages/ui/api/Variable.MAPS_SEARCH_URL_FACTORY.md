---
title: 'Variable: MAPS\_SEARCH\_URL\_FACTORY'
generated: true
editUrl: false
---
# Variable: MAPS\_SEARCH\_URL\_FACTORY

```ts
const MAPS_SEARCH_URL_FACTORY: InjectionToken<MapsSearchUrlFactory>;
```

Defined in: [libs/ui/src/pipes/links/MAPS\_SEARCH\_URL\_FACTORY.ts:24](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/pipes/links/MAPS_SEARCH_URL_FACTORY.ts#L24)

The map service [MapsPipe](Class.MapsPipe) links to. Defaults to the Google Maps search URL; provide a
different factory to link to another map provider or to an in-house map view.

## Example

```typescript
providers: [
    {
        provide: MAPS_SEARCH_URL_FACTORY,
        useValue: (query: string): string => `https://www.openstreetmap.org/search?query=${encodeURIComponent(query)}`
    }
]
```
