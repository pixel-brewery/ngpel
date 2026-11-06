---
title: 'Type Alias: NotificationDuration'
generated: true
editUrl: false
---
# Type Alias: NotificationDuration

```ts
type NotificationDuration = "short" | "long";
```

Defined in: [notification/models/NotificationDuration.ts:8](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/notification/models/NotificationDuration.ts#L8)

How long a notification stays relevant. Interceptors that render transient user interface use it
as their timeout, and [NotificationService](Class.NotificationService) uses it as the window within which an identical
message is deduplicated instead of raised twice.
