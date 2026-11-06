---
title: 'Interface: IToastVisibility'
generated: true
editUrl: false
---
# Interface: IToastVisibility

Defined in: [toast/IToastVisibility.ts:7](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/toast/IToastVisibility.ts#L7)

Decides whether the application may present toast notifications. Cross-package contract used by
notification interceptors, update strategies and drawers alike; the product supplies the policy.

## Methods

### canShow()

```ts
canShow(): boolean;
```

Defined in: [toast/IToastVisibility.ts:13](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/toast/IToastVisibility.ts#L13)

Returns `true` when a toast may be shown right now.

#### Returns

`boolean`
