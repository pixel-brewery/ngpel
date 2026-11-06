---
title: 'Interface: IPresentationRouteGuards'
generated: true
editUrl: false
---
# Interface: IPresentationRouteGuards

Defined in: [shell/IPresentationRouteGuards.ts:12](https://github.com/pixel-brewery/ngpel/blob/main/libs/router/src/shell/IPresentationRouteGuards.ts#L12)

The guards protecting the presentation shell route.

## Properties

### canActivate?

```ts
readonly optional canActivate?: (CanActivateFn | DeprecatedGuard)[];
```

Defined in: [shell/IPresentationRouteGuards.ts:18](https://github.com/pixel-brewery/ngpel/blob/main/libs/router/src/shell/IPresentationRouteGuards.ts#L18)

Guards run before the shell is activated, typically an authentication guard.

***

### canMatch?

```ts
readonly optional canMatch?: (DeprecatedGuard | CanMatchFn)[];
```

Defined in: [shell/IPresentationRouteGuards.ts:24](https://github.com/pixel-brewery/ngpel/blob/main/libs/router/src/shell/IPresentationRouteGuards.ts#L24)

Guards run before the shell route is matched at all, so an unauthenticated visitor falls
through to a public route instead of being redirected.
