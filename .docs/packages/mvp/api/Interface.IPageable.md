---
title: 'Interface: IPageable'
generated: true
editUrl: false
---
# Interface: IPageable

Defined in: [behaviors/IPageable.ts:14](https://github.com/pixel-brewery/ngpel/blob/main/libs/mvp/src/behaviors/IPageable.ts#L14)

Contract of the Pageable presenter behavior: the paging window a data query needs and the
command a paginator binds to.

## Properties

### currentPage

```ts
readonly currentPage: Signal<number>;
```

Defined in: [behaviors/IPageable.ts:35](https://github.com/pixel-brewery/ngpel/blob/main/libs/mvp/src/behaviors/IPageable.ts#L35)

Current page, counted from one.

***

### pageChangedCommand

```ts
readonly pageChangedCommand: Command<unknown>;
```

Defined in: [behaviors/IPageable.ts:45](https://github.com/pixel-brewery/ngpel/blob/main/libs/mvp/src/behaviors/IPageable.ts#L45)

Command a paginator executes when the page changes.

#### Remarks

Accepts a one-based page number, an object carrying a zero-based `pageIndex`, or a custom
event whose `detail` carries one. Anything else is ignored, so an unrecognised event cannot
move the presenter to an undefined page.

***

### skip

```ts
readonly skip: Signal<number>;
```

Defined in: [behaviors/IPageable.ts:20](https://github.com/pixel-brewery/ngpel/blob/main/libs/mvp/src/behaviors/IPageable.ts#L20)

Number of items to skip for the current page.

***

### take

```ts
readonly take: Signal<number>;
```

Defined in: [behaviors/IPageable.ts:25](https://github.com/pixel-brewery/ngpel/blob/main/libs/mvp/src/behaviors/IPageable.ts#L25)

Number of items per page.

***

### total

```ts
readonly total: Signal<number>;
```

Defined in: [behaviors/IPageable.ts:30](https://github.com/pixel-brewery/ngpel/blob/main/libs/mvp/src/behaviors/IPageable.ts#L30)

Total number of items available, as reported by [IPageable.setTotal](#settotal).

## Methods

### onPageChanged()

```ts
onPageChanged(): void;
```

Defined in: [behaviors/IPageable.ts:58](https://github.com/pixel-brewery/ngpel/blob/main/libs/mvp/src/behaviors/IPageable.ts#L58)

Runs after the page changed. Override to reload the data for the new window.

#### Returns

`void`

#### Remarks

Public because TypeScript mixins cannot declare protected extension points. It is a subclass
extension point — do not call it from a template.

***

### resetPage()

```ts
resetPage(): void;
```

Defined in: [behaviors/IPageable.ts:70](https://github.com/pixel-brewery/ngpel/blob/main/libs/mvp/src/behaviors/IPageable.ts#L70)

Returns to the first page, for example after a filter changed.

#### Returns

`void`

***

### setTotal()

```ts
setTotal(value): void;
```

Defined in: [behaviors/IPageable.ts:65](https://github.com/pixel-brewery/ngpel/blob/main/libs/mvp/src/behaviors/IPageable.ts#L65)

Reports how many items exist in total.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `value` | `number` | The new total. |

#### Returns

`void`
