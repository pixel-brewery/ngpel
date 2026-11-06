---
title: 'Class: SheetAutoOpenDirective'
generated: true
editUrl: false
---
# Class: SheetAutoOpenDirective

Defined in: libs/ui/src/directives/sheet-auto-open/SheetAutoOpenDirective.ts:20

Opens a declaratively rendered sheet as soon as its Mosaik element has connected.

Render the sheet conditionally and let this directive run the regular open lifecycle,
so snap measurement, modal focus handling and the close-attempt contract behave exactly
as for a sheet opened through the service.

## Constructors

### Constructor

```ts
new SheetAutoOpenDirective(): SheetAutoOpenDirective;
```

Defined in: libs/ui/src/directives/sheet-auto-open/SheetAutoOpenDirective.ts:34

Constructs the directive and schedules the open call after the first render.

#### Returns

`SheetAutoOpenDirective`
