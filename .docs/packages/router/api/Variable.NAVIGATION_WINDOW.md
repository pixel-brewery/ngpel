---
title: 'Variable: NAVIGATION\_WINDOW'
generated: true
editUrl: false
---
# Variable: NAVIGATION\_WINDOW

```ts
const NAVIGATION_WINDOW: InjectionToken<Window | null>;
```

Defined in: [navigation/NAVIGATION\_WINDOW.ts:15](https://github.com/pixel-brewery/ngpel/blob/main/libs/router/src/navigation/NAVIGATION_WINDOW.ts#L15)

The window `ext:` handles are opened on. Defaults to the window of the injected `DOCUMENT`, so
the package needs no global access and stays safe where there is none. Desktop shells that route
external URLs through their own process rebind it, or bind `null` to suppress external
navigation entirely.
