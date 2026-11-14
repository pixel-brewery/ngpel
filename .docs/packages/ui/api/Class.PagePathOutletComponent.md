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

Defined in: [libs/ui/src/components/page-path/PagePathOutletComponent.ts:286](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/page-path/PagePathOutletComponent.ts#L286)

#### Returns

`PagePathOutletComponent`

## Properties

### animateLevels

```ts
readonly animateLevels: InputSignalWithTransform<boolean, unknown>;
```

Defined in: [libs/ui/src/components/page-path/PagePathOutletComponent.ts:313](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/page-path/PagePathOutletComponent.ts#L313)

Animates path changes when the application supplies Mosaik's AnimationPlayer.

***

### ariaLabel

```ts
readonly ariaLabel: InputSignal<string>;
```

Defined in: [libs/ui/src/components/page-path/PagePathOutletComponent.ts:307](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/page-path/PagePathOutletComponent.ts#L307)

Accessible name for the page path navigation.

***

### backLabel

```ts
readonly backLabel: InputSignal<string | undefined>;
```

Defined in: [libs/ui/src/components/page-path/PagePathOutletComponent.ts:309](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/page-path/PagePathOutletComponent.ts#L309)

Optional accessible label for the compact back action. In header layout, {0} inserts the parent label.

***

### compact

```ts
readonly compact: InputSignal<boolean | null>;
```

Defined in: [libs/ui/src/components/page-path/PagePathOutletComponent.ts:317](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/page-path/PagePathOutletComponent.ts#L317)

Overrides the application's compact breakpoint.

***

### current

```ts
readonly current: Signal<IPagePathLevel | null>;
```

Defined in: [libs/ui/src/components/page-path/PagePathOutletComponent.ts:321](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/page-path/PagePathOutletComponent.ts#L321)

Current page, or null before a page declares a path.

***

### displayedLevels

```ts
protected readonly displayedLevels: Signal<readonly IPagePathLevel[]>;
```

Defined in: [libs/ui/src/components/page-path/PagePathOutletComponent.ts:327](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/page-path/PagePathOutletComponent.ts#L327)

***

### headerLayout

```ts
readonly headerLayout: InputSignalWithTransform<boolean, unknown>;
```

Defined in: [libs/ui/src/components/page-path/PagePathOutletComponent.ts:311](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/page-path/PagePathOutletComponent.ts#L311)

Opts into the header layout with truncating breadcrumbs and a two-line compact title.

***

### isCompact

```ts
readonly isCompact: Signal<boolean>;
```

Defined in: [libs/ui/src/components/page-path/PagePathOutletComponent.ts:325](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/page-path/PagePathOutletComponent.ts#L325)

Whether only the immediate parent and current page are displayed.

***

### isLoading

```ts
readonly isLoading: InputSignal<boolean>;
```

Defined in: [libs/ui/src/components/page-path/PagePathOutletComponent.ts:315](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/page-path/PagePathOutletComponent.ts#L315)

Whether the view is transitioning and needs a loading placeholder.

***

### levels

```ts
readonly levels: Signal<readonly IPagePathLevel[]>;
```

Defined in: [libs/ui/src/components/page-path/PagePathOutletComponent.ts:319](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/page-path/PagePathOutletComponent.ts#L319)

Live levels registered by the active page.

***

### parent

```ts
readonly parent: Signal<IPagePathLevel | null>;
```

Defined in: [libs/ui/src/components/page-path/PagePathOutletComponent.ts:323](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/page-path/PagePathOutletComponent.ts#L323)

Immediate parent of the current page.

***

### trail

```ts
protected readonly trail: Signal<{
  key: string | number;
  level: IPagePathLevel;
}[]>;
```

Defined in: [libs/ui/src/components/page-path/PagePathOutletComponent.ts:328](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/page-path/PagePathOutletComponent.ts#L328)

## Methods

### activate()

```ts
protected activate(
   event,
   level,
   current?
): void;
```

Defined in: [libs/ui/src/components/page-path/PagePathOutletComponent.ts:342](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/page-path/PagePathOutletComponent.ts#L342)

#### Parameters

| Parameter | Type | Default value |
| ------ | ------ | ------ |
| `event` | `Event` | `undefined` |
| `level` | [`IPagePathLevel`](Interface.IPagePathLevel) | `undefined` |
| `current?` | `boolean` | `false` |

#### Returns

`void`
