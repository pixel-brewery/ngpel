---
title: 'Function: provideBrowser()'
generated: true
editUrl: false
---
# Function: provideBrowser()

```ts
function provideBrowser(...features): EnvironmentProviders;
```

Defined in: [browser/features/provideBrowser.ts:26](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/browser/features/provideBrowser.ts#L26)

Composes the browser capability ports. Only the capabilities contributed by the given features
are registered — `provideBrowser()` without features registers nothing.

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| ...`features` | readonly [`IFeature`](Interface.IFeature)\<[`BrowserFeatureKind`](TypeAlias.BrowserFeatureKind)\>[] | Capability features such as `withClipboard()`, `withExternalLinks()` and `withFileDownload()`. |

## Returns

`EnvironmentProviders`

Environment providers for the application or route composition root.

## Throws

Error when two features of the same kind are given.

## Example

```typescript
export const appConfig = {
    providers: [provideBrowser(withClipboard(), withExternalLinks(), withFileDownload())]
};
```
