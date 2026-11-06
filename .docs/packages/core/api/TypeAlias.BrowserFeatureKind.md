---
title: 'Type Alias: BrowserFeatureKind'
generated: true
editUrl: false
---
# Type Alias: BrowserFeatureKind

```ts
type BrowserFeatureKind = "clipboard" | "external-links" | "file-download";
```

Defined in: [browser/features/BrowserFeatureKind.ts:13](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/browser/features/BrowserFeatureKind.ts#L13)

The kinds of features `provideBrowser(...)` accepts. Each kind is non-multi: exactly one adapter
per capability may be registered.
