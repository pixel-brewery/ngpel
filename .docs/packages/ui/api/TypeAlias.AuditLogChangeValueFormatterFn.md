---
title: 'Type Alias: AuditLogChangeValueFormatterFn'
generated: true
editUrl: false
---
# Type Alias: AuditLogChangeValueFormatterFn

```ts
type AuditLogChangeValueFormatterFn = (value, change?) => string;
```

Defined in: [libs/ui/src/components/audit-log/AuditLogChangeValueFormatterFn.ts:12](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/audit-log/AuditLogChangeValueFormatterFn.ts#L12)

Formats a raw audit log value for display.

## Parameters

| Parameter | Type |
| ------ | ------ |
| `value` | `unknown` |
| `change?` | [`IAuditLogChange`](Interface.IAuditLogChange) |

## Returns

`string`
