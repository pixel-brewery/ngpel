---
title: 'Type Alias: NotificationFeatureKind'
generated: true
editUrl: false
---
# Type Alias: NotificationFeatureKind

```ts
type NotificationFeatureKind = "notification-audio-interceptor" | "notification-console-interceptor";
```

Defined in: [notification/provider/NotificationFeatureKind.ts:8](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/notification/provider/NotificationFeatureKind.ts#L8)

The kind vocabulary of the notification composition root. Both kinds are single: one console sink
and one audio sink per composition, so a duplicated `with*` call is rejected instead of quietly
doubling every log line or playing a sound twice.
