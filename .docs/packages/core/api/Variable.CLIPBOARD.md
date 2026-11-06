---
title: 'Variable: CLIPBOARD'
generated: true
editUrl: false
---
# Variable: CLIPBOARD

```ts
const CLIPBOARD: InjectionToken<IClipboard>;
```

Defined in: [browser/clipboard/CLIPBOARD.ts:15](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/browser/clipboard/CLIPBOARD.ts#L15)

Injection token for the [IClipboard](Interface.IClipboard) port. Registered by `withClipboard()` through
`provideBrowser(...)`; nothing is registered by default, so a missing composition surfaces as a
`NullInjectorError` instead of a silently inert clipboard.
