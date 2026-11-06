---
title: 'Variable: NotificationType'
generated: true
editUrl: false
---
# Variable: NotificationType

```ts
const NotificationType: {
  Error: "error";
  Info: "info";
  None: "";
  Success: "success";
  Warning: "warning";
};
```

Defined in: [notification/models/NotificationType.ts:8](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/notification/models/NotificationType.ts#L8)

Severity of a notification. `None` is the neutral grade a message without an explicit type
receives, so every interceptor has to answer for it; it is deliberately the empty string, which
keeps a missing severity falsy for consumers that only care whether one was stated.

## Type Declaration

| Name | Type | Default value | Description | Defined in |
| ------ | ------ | ------ | ------ | ------ |
| <a id="property-error"></a> `Error` | `"error"` | `'error'` | The operation failed. | [notification/models/NotificationType.ts:27](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/notification/models/NotificationType.ts#L27) |
| <a id="property-info"></a> `Info` | `"info"` | `'info'` | Informational message that needs no reaction. | [notification/models/NotificationType.ts:17](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/notification/models/NotificationType.ts#L17) |
| <a id="property-none"></a> `None` | `""` | `''` | No severity was stated; the message is plain information. | [notification/models/NotificationType.ts:12](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/notification/models/NotificationType.ts#L12) |
| <a id="property-success"></a> `Success` | `"success"` | `'success'` | The operation succeeded. | [notification/models/NotificationType.ts:32](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/notification/models/NotificationType.ts#L32) |
| <a id="property-warning"></a> `Warning` | `"warning"` | `'warning'` | The operation succeeded, but something deserves attention. | [notification/models/NotificationType.ts:22](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/notification/models/NotificationType.ts#L22) |
