---
title: 'Interface: IFilterController'
generated: true
editUrl: false
---
# Interface: IFilterController

Defined in: [libs/ui/src/components/filter-bar/saved-filters/IFilterController.ts:16](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/filter-bar/saved-filters/IFilterController.ts#L16)

Controller for list filter visibility, application and saved filters.

## Extends

- `IPresenterController`

## Properties

### activeFilters

```ts
readonly activeFilters: Signal<FilterValues>;
```

Defined in: [libs/ui/src/components/filter-bar/saved-filters/IFilterController.ts:20](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/filter-bar/saved-filters/IFilterController.ts#L20)

Active filter values.

***

### applyFilterCommand

```ts
readonly applyFilterCommand: Command<FilterValues>;
```

Defined in: [libs/ui/src/components/filter-bar/saved-filters/IFilterController.ts:50](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/filter-bar/saved-filters/IFilterController.ts#L50)

Applies filter values.

***

### applySavedFilterCommand

```ts
readonly applySavedFilterCommand: Command<string>;
```

Defined in: [libs/ui/src/components/filter-bar/saved-filters/IFilterController.ts:60](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/filter-bar/saved-filters/IFilterController.ts#L60)

Applies a saved filter.

***

### closeFilterCommand

```ts
readonly closeFilterCommand: Command<void>;
```

Defined in: [libs/ui/src/components/filter-bar/saved-filters/IFilterController.ts:45](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/filter-bar/saved-filters/IFilterController.ts#L45)

Closes the filter panel.

***

### deleteSavedFilterCommand

```ts
readonly deleteSavedFilterCommand: Command<string>;
```

Defined in: [libs/ui/src/components/filter-bar/saved-filters/IFilterController.ts:65](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/filter-bar/saved-filters/IFilterController.ts#L65)

Deletes a saved filter.

***

### host

```ts
readonly host: IPresenterControllerHostRef<IViewPresenter>;
```

Defined in: [libs/mvp/src/controllers/IPresenterController.ts:30](https://github.com/pixel-brewery/ngpel/blob/main/libs/mvp/src/controllers/IPresenterController.ts#L30)

The presenter that owns the controller.

#### Inherited from

`IPresenterController.host`

***

### isFilterActive

```ts
readonly isFilterActive: Signal<boolean>;
```

Defined in: [libs/ui/src/components/filter-bar/saved-filters/IFilterController.ts:30](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/filter-bar/saved-filters/IFilterController.ts#L30)

Whether a filter is active.

***

### isFilterVisible

```ts
readonly isFilterVisible: Signal<boolean>;
```

Defined in: [libs/ui/src/components/filter-bar/saved-filters/IFilterController.ts:25](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/filter-bar/saved-filters/IFilterController.ts#L25)

Whether the filter panel is visible.

***

### savedFilters

```ts
readonly savedFilters: Signal<readonly ISavedFilter[]>;
```

Defined in: [libs/ui/src/components/filter-bar/saved-filters/IFilterController.ts:35](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/filter-bar/saved-filters/IFilterController.ts#L35)

Persisted saved filters.

***

### saveFilterCommand

```ts
readonly saveFilterCommand: Command<ISavedFilterCreateRequest>;
```

Defined in: [libs/ui/src/components/filter-bar/saved-filters/IFilterController.ts:55](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/filter-bar/saved-filters/IFilterController.ts#L55)

Saves filter values.

***

### toggleFilterCommand

```ts
readonly toggleFilterCommand: Command<void>;
```

Defined in: [libs/ui/src/components/filter-bar/saved-filters/IFilterController.ts:40](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/filter-bar/saved-filters/IFilterController.ts#L40)

Toggles the filter panel.

## Methods

### presenterConnected()?

```ts
presenterConnected?(): void;
```

Defined in: [libs/mvp/src/controllers/IPresenterController.ts:42](https://github.com/pixel-brewery/ngpel/blob/main/libs/mvp/src/controllers/IPresenterController.ts#L42)

Called once, immediately after the controller was created in the presenter's injection
context.

#### Returns

`void`

#### Inherited from

`IPresenterController.presenterConnected`

***

### presenterDisconnected()?

```ts
presenterDisconnected?(): void;
```

Defined in: [libs/mvp/src/controllers/IPresenterController.ts:49](https://github.com/pixel-brewery/ngpel/blob/main/libs/mvp/src/controllers/IPresenterController.ts#L49)

Called once, while the owning presenter is disposed.

#### Returns

`void`

#### Inherited from

`IPresenterController.presenterDisconnected`
