---
title: 'Type Alias: NotificationText'
generated: true
editUrl: false
---
# Type Alias: NotificationText

```ts
type NotificationText = Signal<string> | string;
```

Defined in: [notification/models/NotificationText.ts:14](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/notification/models/NotificationText.ts#L14)

Text of a notification. A plain string is the simple case; a signal lets a translated or
otherwise reactive caption keep updating after the notification was raised, which matters for a
notification history that outlives a language switch.
