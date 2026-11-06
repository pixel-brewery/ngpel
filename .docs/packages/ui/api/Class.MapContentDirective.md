---
title: 'Class: MapContentDirective'
generated: true
editUrl: false
---
# Class: MapContentDirective

Defined in: libs/ui/src/google-maps/MapContentDirective.ts:14

Defers Angular map overlays until the SDK and their owning GoogleMap exist.

## Constructors

### Constructor

```ts
new MapContentDirective(): MapContentDirective;
```

#### Returns

`MapContentDirective`

## Properties

### template

```ts
readonly template: TemplateRef<{
  $implicit: GoogleMap;
}>;
```

Defined in: libs/ui/src/google-maps/MapContentDirective.ts:23

Overlay template with the Angular GoogleMap as its implicit context.

## Methods

### ngTemplateContextGuard()

```ts
static ngTemplateContextGuard(directive, context): context is { $implicit: GoogleMap };
```

Defined in: libs/ui/src/google-maps/MapContentDirective.ts:43

Supplies the typed map context to consuming Angular templates.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `directive` | `MapContentDirective` | Content declaration. |
| `context` | `unknown` | Context checked by Angular's template compiler. |

#### Returns

`context is { $implicit: GoogleMap }`

Whether the context is the map-content contract.
