---
title: 'Class: RouteDataTitleStrategy'
generated: true
editUrl: false
---
# Class: RouteDataTitleStrategy

Defined in: [title/RouteDataTitleStrategy.ts:33](https://github.com/pixel-brewery/ngpel/blob/main/libs/router/src/title/RouteDataTitleStrategy.ts#L33)

A `TitleStrategy` that composes the document title breadcrumb-style from `route.data`, deepest
segment first, and appends the configured application name. Every segment passes through the
[IRouteTitleTextResolver](Interface.IRouteTitleTextResolver), so products that put translation keys in the route data get
translated titles without this package depending on an i18n library. When no route declares a
title, Angular's own `route.title` resolution is used as the fallback.

Register it with `provideRouteDataTitleStrategy(...)`.

## Example

```typescript
{
    path: 'recipes',
    loadComponent: () => import('./RecipesView').then((m) => m.RecipesView),
    data: { title: 'app.recipes.title', description: 'Every recipe of the season.' }
}
```

## Extends

- `TitleStrategy`

## Constructors

### Constructor

```ts
new RouteDataTitleStrategy(): RouteDataTitleStrategy;
```

#### Returns

`RouteDataTitleStrategy`

#### Inherited from

```ts
TitleStrategy.constructor
```

## Methods

### updateTitle()

```ts
updateTitle(routerState): void;
```

Defined in: [title/RouteDataTitleStrategy.ts:50](https://github.com/pixel-brewery/ngpel/blob/main/libs/router/src/title/RouteDataTitleStrategy.ts#L50)

Updates the document title and, when the route declares one, the meta description.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `routerState` | `RouterStateSnapshot` | The router state after a completed navigation. |

#### Returns

`void`

#### Overrides

```ts
TitleStrategy.updateTitle
```
