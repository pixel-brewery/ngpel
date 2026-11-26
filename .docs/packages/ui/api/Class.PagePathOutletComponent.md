---
title: 'Class: PagePathOutletComponent'
generated: true
editUrl: false
---
# Class: PagePathOutletComponent

Defined in: [libs/ui/src/components/page-path/PagePathOutletComponent.ts:267](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/page-path/PagePathOutletComponent.ts#L267)

Renders the current page path as a breadcrumb or a compact parent and title.

## Constructors

### Constructor

```ts
new PagePathOutletComponent(): PagePathOutletComponent;
```

Defined in: [libs/ui/src/components/page-path/PagePathOutletComponent.ts:289](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/page-path/PagePathOutletComponent.ts#L289)

#### Returns

`PagePathOutletComponent`

## Properties

### animateLevels

```ts
readonly animateLevels: InputSignalWithTransform<boolean, unknown>;
```

Defined in: [libs/ui/src/components/page-path/PagePathOutletComponent.ts:322](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/page-path/PagePathOutletComponent.ts#L322)

Animates path changes when the application supplies Mosaik's AnimationPlayer.

***

### ariaLabel

```ts
readonly ariaLabel: InputSignal<string>;
```

Defined in: [libs/ui/src/components/page-path/PagePathOutletComponent.ts:316](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/page-path/PagePathOutletComponent.ts#L316)

Accessible name for the page path navigation.

***

### backLabel

```ts
readonly backLabel: InputSignal<string | undefined>;
```

Defined in: [libs/ui/src/components/page-path/PagePathOutletComponent.ts:318](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/page-path/PagePathOutletComponent.ts#L318)

Optional accessible label for the compact back action. In header layout, {0} inserts the parent label.

***

### compact

```ts
readonly compact: InputSignal<boolean | null>;
```

Defined in: [libs/ui/src/components/page-path/PagePathOutletComponent.ts:326](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/page-path/PagePathOutletComponent.ts#L326)

Overrides the application's compact breakpoint.

***

### current

```ts
readonly current: Signal<IPagePathLevel | null>;
```

Defined in: [libs/ui/src/components/page-path/PagePathOutletComponent.ts:330](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/page-path/PagePathOutletComponent.ts#L330)

Current page, or null before a page declares a path.

***

### displayedLevels

```ts
protected readonly displayedLevels: Signal<readonly IPagePathLevel[]>;
```

Defined in: [libs/ui/src/components/page-path/PagePathOutletComponent.ts:336](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/page-path/PagePathOutletComponent.ts#L336)

***

### headerLayout

```ts
readonly headerLayout: InputSignalWithTransform<boolean, unknown>;
```

Defined in: [libs/ui/src/components/page-path/PagePathOutletComponent.ts:320](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/page-path/PagePathOutletComponent.ts#L320)

Opts into the header layout with truncating breadcrumbs and a two-line compact title.

***

### isCompact

```ts
readonly isCompact: Signal<boolean>;
```

Defined in: [libs/ui/src/components/page-path/PagePathOutletComponent.ts:334](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/page-path/PagePathOutletComponent.ts#L334)

Whether only the immediate parent and current page are displayed.

***

### isLoading

```ts
readonly isLoading: InputSignal<boolean>;
```

Defined in: [libs/ui/src/components/page-path/PagePathOutletComponent.ts:324](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/page-path/PagePathOutletComponent.ts#L324)

Whether the view is transitioning and needs a loading placeholder.

***

### levels

```ts
readonly levels: Signal<readonly IPagePathLevel[]>;
```

Defined in: [libs/ui/src/components/page-path/PagePathOutletComponent.ts:328](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/page-path/PagePathOutletComponent.ts#L328)

Live levels registered by the active page.

***

### parent

```ts
readonly parent: Signal<IPagePathLevel | null>;
```

Defined in: [libs/ui/src/components/page-path/PagePathOutletComponent.ts:332](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/page-path/PagePathOutletComponent.ts#L332)

Immediate parent of the current page.

***

### trail

```ts
protected readonly trail: Signal<{
  key: string | number;
  level: IPagePathLevel;
}[]>;
```

Defined in: [libs/ui/src/components/page-path/PagePathOutletComponent.ts:337](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/page-path/PagePathOutletComponent.ts#L337)

## Methods

### activate()

```ts
protected activate(
   event,
   level,
   current?
): void;
```

Defined in: [libs/ui/src/components/page-path/PagePathOutletComponent.ts:351](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/page-path/PagePathOutletComponent.ts#L351)

#### Parameters

| Parameter | Type | Default value |
| ------ | ------ | ------ |
| `event` | `Event` | `undefined` |
| `level` | [`IPagePathLevel`](Interface.IPagePathLevel) | `undefined` |
| `current?` | `boolean` | `false` |

#### Returns

`void`
