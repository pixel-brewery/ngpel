---
title: 'Class: PagePathOutletComponent'
generated: true
editUrl: false
---
# Class: PagePathOutletComponent

Defined in: [libs/ui/src/components/page-path/PagePathOutletComponent.ts:85](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/page-path/PagePathOutletComponent.ts#L85)

Renders the current page path as a breadcrumb or a compact parent and title.

## Constructors

### Constructor

```ts
new PagePathOutletComponent(): PagePathOutletComponent;
```

#### Returns

`PagePathOutletComponent`

## Properties

### ariaLabel

```ts
readonly ariaLabel: InputSignal<string>;
```

Defined in: [libs/ui/src/components/page-path/PagePathOutletComponent.ts:99](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/page-path/PagePathOutletComponent.ts#L99)

Accessible name for the page path navigation.

***

### backLabel

```ts
readonly backLabel: InputSignal<string | undefined>;
```

Defined in: [libs/ui/src/components/page-path/PagePathOutletComponent.ts:101](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/page-path/PagePathOutletComponent.ts#L101)

Optional accessible label for the compact back action.

***

### compact

```ts
readonly compact: InputSignal<boolean | null>;
```

Defined in: [libs/ui/src/components/page-path/PagePathOutletComponent.ts:105](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/page-path/PagePathOutletComponent.ts#L105)

Overrides the application's compact breakpoint.

***

### current

```ts
readonly current: Signal<IPagePathLevel | null>;
```

Defined in: [libs/ui/src/components/page-path/PagePathOutletComponent.ts:109](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/page-path/PagePathOutletComponent.ts#L109)

Current page, or null before a page declares a path.

***

### isCompact

```ts
readonly isCompact: Signal<boolean>;
```

Defined in: [libs/ui/src/components/page-path/PagePathOutletComponent.ts:113](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/page-path/PagePathOutletComponent.ts#L113)

Whether only the immediate parent and current page are displayed.

***

### isLoading

```ts
readonly isLoading: InputSignal<boolean>;
```

Defined in: [libs/ui/src/components/page-path/PagePathOutletComponent.ts:103](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/page-path/PagePathOutletComponent.ts#L103)

Whether the view is transitioning and needs a loading placeholder.

***

### levels

```ts
readonly levels: Signal<readonly IPagePathLevel[]>;
```

Defined in: [libs/ui/src/components/page-path/PagePathOutletComponent.ts:107](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/page-path/PagePathOutletComponent.ts#L107)

Live levels registered by the active page.

***

### parent

```ts
readonly parent: Signal<IPagePathLevel | null>;
```

Defined in: [libs/ui/src/components/page-path/PagePathOutletComponent.ts:111](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/page-path/PagePathOutletComponent.ts#L111)

Immediate parent of the current page.

## Methods

### activate()

```ts
protected activate(
   event,
   level,
   current?
): void;
```

Defined in: [libs/ui/src/components/page-path/PagePathOutletComponent.ts:119](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/page-path/PagePathOutletComponent.ts#L119)

#### Parameters

| Parameter | Type | Default value |
| ------ | ------ | ------ |
| `event` | `Event` | `undefined` |
| `level` | [`IPagePathLevel`](Interface.IPagePathLevel) | `undefined` |
| `current?` | `boolean` | `false` |

#### Returns

`void`
