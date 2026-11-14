---
title: 'Class: ContentAnchorDirective'
generated: true
editUrl: false
---
# Class: ContentAnchorDirective

Defined in: [libs/ui/src/components/content-navigation/ContentAnchorDirective.ts:22](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/content-navigation/ContentAnchorDirective.ts#L22)

Registers a semantic heading or section as an in-page navigation destination.

## Implements

- `AfterViewInit`
- `OnInit`
- `OnDestroy`

## Constructors

### Constructor

```ts
new ContentAnchorDirective(): ContentAnchorDirective;
```

#### Returns

`ContentAnchorDirective`

## Properties

### anchor

```ts
readonly anchor: InputSignal<IContentNavigationItem>;
```

Defined in: [libs/ui/src/components/content-navigation/ContentAnchorDirective.ts:31](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/content-navigation/ContentAnchorDirective.ts#L31)

Stable destination metadata.

## Methods

### ngAfterViewInit()

```ts
ngAfterViewInit(): void;
```

Defined in: [libs/ui/src/components/content-navigation/ContentAnchorDirective.ts:71](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/content-navigation/ContentAnchorDirective.ts#L71)

Observes the anchor inside a narrow viewport band to keep the outline in sync with scrolling.

#### Returns

`void`

#### Implementation of

`AfterViewInit.ngAfterViewInit`

***

### ngOnDestroy()

```ts
ngOnDestroy(): void;
```

Defined in: [libs/ui/src/components/content-navigation/ContentAnchorDirective.ts:105](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/content-navigation/ContentAnchorDirective.ts#L105)

Removes the destination when its routed content is destroyed.

#### Returns

`void`

#### Implementation of

`OnDestroy.ngOnDestroy`

***

### ngOnInit()

```ts
ngOnInit(): void;
```

Defined in: [libs/ui/src/components/content-navigation/ContentAnchorDirective.ts:60](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/content-navigation/ContentAnchorDirective.ts#L60)

Registers the anchor after Angular has resolved the required input.

#### Returns

`void`

#### Implementation of

`OnInit.ngOnInit`
