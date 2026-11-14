---
title: 'Class: PagePathOutletComponent'
generated: true
editUrl: false
---
# Class: PagePathOutletComponent

Defined in: [libs/ui/src/components/page-path/PagePathOutletComponent.ts:266](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/page-path/PagePathOutletComponent.ts#L266)

Renders the current page path as a breadcrumb or a compact parent and title.

## Constructors

### Constructor

```ts
new PagePathOutletComponent(): PagePathOutletComponent;
```

Defined in: [libs/ui/src/components/page-path/PagePathOutletComponent.ts:288](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/page-path/PagePathOutletComponent.ts#L288)

#### Returns

`PagePathOutletComponent`

## Properties

### animateLevels

```ts
readonly animateLevels: InputSignalWithTransform<boolean, unknown>;
```

Defined in: [libs/ui/src/components/page-path/PagePathOutletComponent.ts:321](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/page-path/PagePathOutletComponent.ts#L321)

Animates path changes when the application supplies Mosaik's AnimationPlayer.

***

### ariaLabel

```ts
readonly ariaLabel: InputSignal<string>;
```

Defined in: [libs/ui/src/components/page-path/PagePathOutletComponent.ts:315](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/page-path/PagePathOutletComponent.ts#L315)

Accessible name for the page path navigation.

***

### backLabel

```ts
readonly backLabel: InputSignal<string | undefined>;
```

Defined in: [libs/ui/src/components/page-path/PagePathOutletComponent.ts:317](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/page-path/PagePathOutletComponent.ts#L317)

Optional accessible label for the compact back action. In header layout, {0} inserts the parent label.

***

### compact

```ts
readonly compact: InputSignal<boolean | null>;
```

Defined in: [libs/ui/src/components/page-path/PagePathOutletComponent.ts:325](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/page-path/PagePathOutletComponent.ts#L325)

Overrides the application's compact breakpoint.

***

### current

```ts
readonly current: Signal<IPagePathLevel | null>;
```

Defined in: [libs/ui/src/components/page-path/PagePathOutletComponent.ts:329](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/page-path/PagePathOutletComponent.ts#L329)

Current page, or null before a page declares a path.

***

### displayedLevels

```ts
protected readonly displayedLevels: Signal<readonly IPagePathLevel[]>;
```

Defined in: [libs/ui/src/components/page-path/PagePathOutletComponent.ts:335](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/page-path/PagePathOutletComponent.ts#L335)

***

### headerLayout

```ts
readonly headerLayout: InputSignalWithTransform<boolean, unknown>;
```

Defined in: [libs/ui/src/components/page-path/PagePathOutletComponent.ts:319](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/page-path/PagePathOutletComponent.ts#L319)

Opts into the header layout with truncating breadcrumbs and a two-line compact title.

***

### isCompact

```ts
readonly isCompact: Signal<boolean>;
```

Defined in: [libs/ui/src/components/page-path/PagePathOutletComponent.ts:333](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/page-path/PagePathOutletComponent.ts#L333)

Whether only the immediate parent and current page are displayed.

***

### isLoading

```ts
readonly isLoading: InputSignal<boolean>;
```

Defined in: [libs/ui/src/components/page-path/PagePathOutletComponent.ts:323](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/page-path/PagePathOutletComponent.ts#L323)

Whether the view is transitioning and needs a loading placeholder.

***

### levels

```ts
readonly levels: Signal<readonly IPagePathLevel[]>;
```

Defined in: [libs/ui/src/components/page-path/PagePathOutletComponent.ts:327](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/page-path/PagePathOutletComponent.ts#L327)

Live levels registered by the active page.

***

### parent

```ts
readonly parent: Signal<IPagePathLevel | null>;
```

Defined in: [libs/ui/src/components/page-path/PagePathOutletComponent.ts:331](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/page-path/PagePathOutletComponent.ts#L331)

Immediate parent of the current page.

***

### trail

```ts
protected readonly trail: Signal<{
  key: string | number;
  level: IPagePathLevel;
}[]>;
```

Defined in: [libs/ui/src/components/page-path/PagePathOutletComponent.ts:336](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/page-path/PagePathOutletComponent.ts#L336)

## Methods

### activate()

```ts
protected activate(
   event,
   level,
   current?
): void;
```

Defined in: [libs/ui/src/components/page-path/PagePathOutletComponent.ts:350](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/page-path/PagePathOutletComponent.ts#L350)

#### Parameters

| Parameter | Type | Default value |
| ------ | ------ | ------ |
| `event` | `Event` | `undefined` |
| `level` | [`IPagePathLevel`](Interface.IPagePathLevel) | `undefined` |
| `current?` | `boolean` | `false` |

#### Returns

`void`
