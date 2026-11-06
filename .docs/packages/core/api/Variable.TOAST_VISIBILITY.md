---
title: 'Variable: TOAST\_VISIBILITY'
generated: true
editUrl: false
---
# Variable: TOAST\_VISIBILITY

```ts
const TOAST_VISIBILITY: InjectionToken<IToastVisibility>;
```

Defined in: [toast/TOAST\_VISIBILITY.ts:14](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/toast/TOAST_VISIBILITY.ts#L14)

Application-level toast visibility policy. Defaults to a policy that always allows toasts;
products override it to suppress toasts, for example while a modal surface is open.
