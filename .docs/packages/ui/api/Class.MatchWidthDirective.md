---
title: 'Class: MatchWidthDirective'
generated: true
editUrl: false
---
# Class: MatchWidthDirective

Defined in: libs/ui/src/directives/match-width/MatchWidthDirective.ts:24

Keeps the host's inline size equal to another element's rendered width.

This is useful for balanced layouts whose centered content is surrounded by
asymmetric leading and trailing slots. The source is observed for later size
changes, so the matching element follows responsive or content-driven updates.

## Implements

- `AfterViewInit`

## Constructors

### Constructor

```ts
new MatchWidthDirective(): MatchWidthDirective;
```

Defined in: libs/ui/src/directives/match-width/MatchWidthDirective.ts:43

Creates the source-reactive observer lifecycle.

#### Returns

`MatchWidthDirective`

## Properties

### source

```ts
readonly source: InputSignal<MatchWidthSource>;
```

Defined in: libs/ui/src/directives/match-width/MatchWidthDirective.ts:36

Element, element reference, or component whose rendered width should be matched.

## Methods

### ngAfterViewInit()

```ts
ngAfterViewInit(): void;
```

Defined in: libs/ui/src/directives/match-width/MatchWidthDirective.ts:60

Applies the initial width once projected elements have been rendered.

#### Returns

`void`

#### Implementation of

```ts
AfterViewInit.ngAfterViewInit
```
