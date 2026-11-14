---
title: 'Class: WidgetComponent'
generated: true
editUrl: false
---
# Class: WidgetComponent

Defined in: [libs/ui/src/widget/components/WidgetComponent.ts:140](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/widget/components/WidgetComponent.ts#L140)

Renders a single widget by lazy-loading its front and optional back view.

## Implements

- `AfterViewInit`
- `ITourAccessor`
- `OnDestroy`

## Constructors

### Constructor

```ts
new WidgetComponent(): WidgetComponent;
```

Defined in: [libs/ui/src/widget/components/WidgetComponent.ts:160](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/widget/components/WidgetComponent.ts#L160)

#### Returns

`WidgetComponent`

## Properties

### backCardClass

```ts
readonly backCardClass: Signal<string>;
```

Defined in: [libs/ui/src/widget/components/WidgetComponent.ts:271](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/widget/components/WidgetComponent.ts#L271)

CSS classes applied to the back Mosaik card host.

***

### backContentClass

```ts
readonly backContentClass: Signal<string>;
```

Defined in: [libs/ui/src/widget/components/WidgetComponent.ts:279](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/widget/components/WidgetComponent.ts#L279)

CSS classes applied to the back card content host.

***

### childInjector

```ts
readonly childInjector: Signal<Injector>;
```

Defined in: [libs/ui/src/widget/components/WidgetComponent.ts:228](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/widget/components/WidgetComponent.ts#L228)

Injector providing widget tokens to the lazy outlet component.

***

### configuration

```ts
readonly configuration: InputSignal<IWidget<IWidgetData>>;
```

Defined in: [libs/ui/src/widget/components/WidgetComponent.ts:176](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/widget/components/WidgetComponent.ts#L176)

Widget configuration rendered by this shell.

***

### effectiveGridSize

```ts
readonly effectiveGridSize: Signal<IWidgetSize>;
```

Defined in: [libs/ui/src/widget/components/WidgetComponent.ts:191](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/widget/components/WidgetComponent.ts#L191)

Current size, falling back to the contribution's default layout outside a grid.

***

### frontCardAppearance

```ts
readonly frontCardAppearance: Signal<Appearance>;
```

Defined in: [libs/ui/src/widget/components/WidgetComponent.ts:287](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/widget/components/WidgetComponent.ts#L287)

Mosaik appearance applied to the front card.

***

### frontCardClass

```ts
readonly frontCardClass: Signal<string>;
```

Defined in: [libs/ui/src/widget/components/WidgetComponent.ts:255](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/widget/components/WidgetComponent.ts#L255)

CSS classes applied to the front Mosaik card host.

***

### frontCardElevation

```ts
readonly frontCardElevation: Signal<ElevationWeight>;
```

Defined in: [libs/ui/src/widget/components/WidgetComponent.ts:295](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/widget/components/WidgetComponent.ts#L295)

Mosaik elevation of the front card.

***

### frontContentClass

```ts
readonly frontContentClass: Signal<string>;
```

Defined in: [libs/ui/src/widget/components/WidgetComponent.ts:263](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/widget/components/WidgetComponent.ts#L263)

CSS classes applied to the front card content host.

***

### gridSize

```ts
readonly gridSize: InputSignal<IWidgetSize | undefined>;
```

Defined in: [libs/ui/src/widget/components/WidgetComponent.ts:179](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/widget/components/WidgetComponent.ts#L179)

Current logical grid size used for adaptive widget presentation.

***

### hasBack

```ts
readonly hasBack: Signal<boolean>;
```

Defined in: [libs/ui/src/widget/components/WidgetComponent.ts:247](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/widget/components/WidgetComponent.ts#L247)

Indicates whether the widget has a settings side.

***

### isFrontHeaderVisible

```ts
readonly isFrontHeaderVisible: Signal<boolean>;
```

Defined in: [libs/ui/src/widget/components/WidgetComponent.ts:303](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/widget/components/WidgetComponent.ts#L303)

Indicates whether the front card header should be rendered.

***

### settingsBackLabel

```ts
readonly settingsBackLabel: InputSignal<string>;
```

Defined in: [libs/ui/src/widget/components/WidgetComponent.ts:188](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/widget/components/WidgetComponent.ts#L188)

Accessible name of the action that returns to the primary view.

***

### settingsOpenLabel

```ts
readonly settingsOpenLabel: InputSignal<string>;
```

Defined in: [libs/ui/src/widget/components/WidgetComponent.ts:185](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/widget/components/WidgetComponent.ts#L185)

Accessible name of the action that opens settings.

***

### settingsTitle

```ts
readonly settingsTitle: InputSignal<string>;
```

Defined in: [libs/ui/src/widget/components/WidgetComponent.ts:182](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/widget/components/WidgetComponent.ts#L182)

Title displayed on the settings face.

***

### targets

```ts
readonly targets: Signal<ReadonlyMap<string, ITourAccessorTarget>>;
```

Defined in: [libs/ui/src/widget/components/WidgetComponent.ts:204](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/widget/components/WidgetComponent.ts#L204)

Reactive widget and child-view targets available to a consuming tour.

#### Implementation of

`ITourAccessor.targets`

## Accessors

### backComponent

#### Get Signature

```ts
get backComponent(): Signal<Type<unknown> | undefined>;
```

Defined in: [libs/ui/src/widget/components/WidgetComponent.ts:321](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/widget/components/WidgetComponent.ts#L321)

The lazily resolved back component type.

##### Returns

`Signal`\<`Type`\<`unknown`\> \| `undefined`\>

***

### frontComponent

#### Get Signature

```ts
get frontComponent(): Signal<Type<unknown> | undefined>;
```

Defined in: [libs/ui/src/widget/components/WidgetComponent.ts:311](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/widget/components/WidgetComponent.ts#L311)

The lazily resolved front component type.

##### Returns

`Signal`\<`Type`\<`unknown`\> \| `undefined`\>

## Methods

### ngAfterViewInit()

```ts
ngAfterViewInit(): void;
```

Defined in: [libs/ui/src/widget/components/WidgetComponent.ts:334](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/widget/components/WidgetComponent.ts#L334)

Observes lazily and conditionally rendered widget areas marked for guided tours.

#### Returns

`void`

#### Implementation of

`AfterViewInit.ngAfterViewInit`

***

### ngOnDestroy()

```ts
ngOnDestroy(): void;
```

Defined in: [libs/ui/src/widget/components/WidgetComponent.ts:359](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/widget/components/WidgetComponent.ts#L359)

Releases the declarative target observer.

#### Returns

`void`

#### Implementation of

`OnDestroy.ngOnDestroy`
