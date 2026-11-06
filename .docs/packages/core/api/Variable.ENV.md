---
title: 'Variable: ENV'
generated: true
editUrl: false
---
# Variable: ENV

```ts
const ENV: InjectionToken<EnvExport>;
```

Defined in: [env/ENV.ts:14](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/env/ENV.ts#L14)

Injection token carrying the application's environment variables. Products provide it at the
composition root, for example `{ provide: ENV, useValue: environment }`.
