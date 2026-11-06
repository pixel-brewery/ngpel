---
title: 'Interface: IActivityLogControllerOptions\<T\>'
generated: true
editUrl: false
---
# Interface: IActivityLogControllerOptions\<T\>

Defined in: libs/ui/src/components/activity-log/IActivityLogControllerOptions.ts:6

Data and identity supplied by the host for a paged activity log.

## Type Parameters

| Type Parameter |
| ------ |
| `T` |

## Properties

### pageSize?

```ts
readonly optional pageSize?: number;
```

Defined in: libs/ui/src/components/activity-log/IActivityLogControllerOptions.ts:14

Requested page size. Defaults to 100.

***

### scope?

```ts
readonly optional scope?: Signal<unknown>;
```

Defined in: libs/ui/src/components/activity-log/IActivityLogControllerOptions.ts:12

Changing this key discards the current pages and loads the new scope after first use.

## Methods

### itemKey()

```ts
itemKey(item): string | number;
```

Defined in: libs/ui/src/components/activity-log/IActivityLogControllerOptions.ts:10

Stable entry key used for deduplication and tracking.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `item` | `T` |

#### Returns

`string` \| `number`

***

### loadPage()

```ts
loadPage(offset, limit): Observable<IActivityLogPage<T>>;
```

Defined in: libs/ui/src/components/activity-log/IActivityLogControllerOptions.ts:8

Loads one page. Unsubscription cancels work when the host's loader supports it.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `offset` | `number` |
| `limit` | `number` |

#### Returns

`Observable`\<[`IActivityLogPage`](Interface.IActivityLogPage)\<`T`\>\>
