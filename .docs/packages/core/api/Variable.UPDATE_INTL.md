---
title: 'Variable: UPDATE\_INTL'
generated: true
editUrl: false
---
# Variable: UPDATE\_INTL

```ts
const UPDATE_INTL: InjectionToken<IUpdateIntl>;
```

Defined in: [update/intl/UPDATE\_INTL.ts:15](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/update/intl/UPDATE_INTL.ts#L15)

Injection token carrying the [IUpdateIntl](Interface.IUpdateIntl) texts. Falls back to [DEFAULT\_UPDATE\_INTL](Variable.DEFAULT_UPDATE_INTL)
so strategies work without any configuration; `provideUpdate({ intl })` overrides it.
