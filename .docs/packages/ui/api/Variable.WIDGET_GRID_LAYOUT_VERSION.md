---
title: 'Variable: WIDGET\_GRID\_LAYOUT\_VERSION'
generated: true
editUrl: false
---
# Variable: WIDGET\_GRID\_LAYOUT\_VERSION

```ts
const WIDGET_GRID_LAYOUT_VERSION: 2 = 2;
```

Defined in: [libs/ui/src/widget/layout/WIDGET\_GRID\_LAYOUT\_VERSION.ts:8](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/widget/layout/WIDGET_GRID_LAYOUT_VERSION.ts#L8)

The schema version of the persisted widget-grid layout. `WIDGET_GRID_LAYOUT_CODEC` migrates
older payloads to it and rejects payloads it does not understand, so a stored layout never
reaches the grid half-applied.
