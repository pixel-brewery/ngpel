---
title: 'Function: withExternalLinks()'
generated: true
editUrl: false
---
# Function: withExternalLinks()

```ts
function withExternalLinks(adapter?): IFeature<BrowserFeatureKind>;
```

Defined in: [browser/features/withExternalLinks.ts:20](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/browser/features/withExternalLinks.ts#L20)

Registers the [EXTERNAL\_LINK\_OPENER](Variable.EXTERNAL_LINK_OPENER) port.

## Parameters

| Parameter | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `adapter` | `Type`\<[`IExternalLinkOpener`](Interface.IExternalLinkOpener)\> | `ExternalLinkService` | The adapter class to instantiate; defaults to the `DOCUMENT`-based [ExternalLinkService](Class.ExternalLinkService). |

## Returns

[`IFeature`](Interface.IFeature)\<[`BrowserFeatureKind`](TypeAlias.BrowserFeatureKind)\>

A feature for `provideBrowser(...)`.
