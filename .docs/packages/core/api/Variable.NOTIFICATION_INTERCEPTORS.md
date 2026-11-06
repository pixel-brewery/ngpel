---
title: 'Variable: NOTIFICATION\_INTERCEPTORS'
generated: true
editUrl: false
---
# Variable: NOTIFICATION\_INTERCEPTORS

```ts
const NOTIFICATION_INTERCEPTORS: InjectionToken<readonly INotificationInterceptor<object>[]>;
```

Defined in: [notification/provider/NOTIFICATION\_INTERCEPTORS.ts:14](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/notification/provider/NOTIFICATION_INTERCEPTORS.ts#L14)

Multi-provider token of the sinks [NotificationService](Class.NotificationService) fans every raised notification out
to. Each `with*NotificationInterceptor()` feature contributes one configured interceptor.
