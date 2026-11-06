---
title: 'Type Alias: NotificationSoundSettingKey'
generated: true
editUrl: false
---
# Type Alias: NotificationSoundSettingKey

```ts
type NotificationSoundSettingKey = "error" | "info" | "success" | "warning";
```

Defined in: [notification/services/NotificationSoundSettingKey.ts:7](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/notification/services/NotificationSoundSettingKey.ts#L7)

The severities a user can silence individually. [NotificationType.None](Variable.NotificationType#property-none) has no key: an
ungraded notification is never gated by a sound preference.
