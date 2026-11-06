---
title: 'Type Alias: EnvExport'
generated: true
editUrl: false
---
# Type Alias: EnvExport

```ts
type EnvExport = Record<string, string>;
```

Defined in: [env/EnvExport.ts:7](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/env/EnvExport.ts#L7)

The shape of environment variables exposed to the application through the [ENV](Variable.ENV) token:
a flat, string-valued record such as the one produced by a build-time `.env` export.
