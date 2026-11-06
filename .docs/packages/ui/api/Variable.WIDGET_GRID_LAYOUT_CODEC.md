---
title: 'Variable: WIDGET\_GRID\_LAYOUT\_CODEC'
generated: true
editUrl: false
---
# Variable: WIDGET\_GRID\_LAYOUT\_CODEC

```ts
const WIDGET_GRID_LAYOUT_CODEC: IUserPreferenceCodec<IWidgetGridLayout>;
```

Defined in: [libs/ui/src/widget/layout/WIDGET\_GRID\_LAYOUT\_CODEC.ts:46](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/widget/layout/WIDGET_GRID_LAYOUT_CODEC.ts#L46)

The codec for a locally persisted widget-grid layout. It plugs straight into the user-preference
port of `@pixel-brewery/ngpel-core/storage`.

It validates every field of an untrusted payload and rejects the payload whole when anything is
off, so a hand-edited or truncated entry can never be applied in part. A version 1 payload is
migrated instead of rejected: its column spans are rescaled proportionally from the four-column
grid it was written against to the current six-column one.

## Example

```typescript
const stored = storage.read('dashboard.layout', WIDGET_GRID_LAYOUT_CODEC);
const layout = reconcileWidgetGridLayout(stored, zones, items);
storage.write('dashboard.layout', layout, WIDGET_GRID_LAYOUT_CODEC);
```
