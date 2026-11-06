---
title: 'Function: createSideNavigationController()'
generated: true
editUrl: false
---
# Function: createSideNavigationController()

```ts
function createSideNavigationController(config?): ISideNavigationController;
```

Defined in: [shell/createSideNavigationController.ts:39](https://github.com/pixel-brewery/ngpel/blob/main/libs/router/src/shell/createSideNavigationController.ts#L39)

Creates the responsive shell state — navigation sidebar, compact rail, right rail panel and its
split position — with the persistence and the viewport rules every application shell re-solves.
Must be called in an injection context, so the controller can read the router, the activated
route and the browser storage without the caller wiring them up.

The viewport is described by media query strings rather than by a design system's breakpoint
aliases, which keeps the controller usable with any UI library.

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `config?` | [`ISideNavigationControllerConfig`](Interface.ISideNavigationControllerConfig) | The storage keys, media queries and split bounds; omitted members keep their defaults. |

## Returns

[`ISideNavigationController`](Interface.ISideNavigationController)

The shell state controller.

## Example

```typescript
export class AppShellPresenter {
    private readonly _sideNavigation = createSideNavigationController({ mobileMediaQuery: '(max-width: 767.98px)' });

    public get isNavigationOpen(): Signal<boolean> {
        return this._sideNavigation.isNavigationOpen;
    }

    protected onMenuClick(): void {
        this._sideNavigation.toggleNavigation();
    }
}
```
