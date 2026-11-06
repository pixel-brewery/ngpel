---
title: 'Interface: IAuditLogChange'
generated: true
editUrl: false
---
# Interface: IAuditLogChange

Defined in: [libs/ui/src/components/audit-log/IAuditLogChange.ts:6](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/audit-log/IAuditLogChange.ts#L6)

Field-level change rendered by the audit log component.

## Properties

### after?

```ts
readonly optional after?: unknown;
```

Defined in: [libs/ui/src/components/audit-log/IAuditLogChange.ts:29](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/audit-log/IAuditLogChange.ts#L29)

Value after the mutation.

***

### before?

```ts
readonly optional before?: unknown;
```

Defined in: [libs/ui/src/components/audit-log/IAuditLogChange.ts:21](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/audit-log/IAuditLogChange.ts#L21)

Value before the mutation.

***

### field

```ts
readonly field: string;
```

Defined in: [libs/ui/src/components/audit-log/IAuditLogChange.ts:13](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/audit-log/IAuditLogChange.ts#L13)

Changed field key.
