---
title: 'Function: provideContextOverlayRouting()'
generated: true
editUrl: false
---
# Function: provideContextOverlayRouting()

```ts
function provideContextOverlayRouting(options): EnvironmentProviders;
```

Defined in: [context-overlay/provideContextOverlayRouting.ts:14](https://github.com/pixel-brewery/ngpel/blob/main/libs/router/src/context-overlay/provideContextOverlayRouting.ts#L14)

Registers contextual URL synchronization at the application composition root.

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `options` | \| [`IContextOverlayRoutingOptions`](Interface.IContextOverlayRoutingOptions) \| (() => [`IContextOverlayRoutingOptions`](Interface.IContextOverlayRoutingOptions)) | Path scope and invalid-URL handling, or an injection-context factory for them. |

## Returns

`EnvironmentProviders`

Environment providers for the URL codec and active overlay coordinator.
