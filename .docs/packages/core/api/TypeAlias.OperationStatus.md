---
title: 'Type Alias: OperationStatus'
generated: true
editUrl: false
---
# Type Alias: OperationStatus

```ts
type OperationStatus =
  | "pending"
  | "committing"
  | "committed"
  | "rejecting"
  | "rolling-back"
  | "rolled-back"
  | "rejected"
  | "failed";
```

Defined in: [operation-queue/models/OperationStatus.ts:10](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/operation-queue/models/OperationStatus.ts#L10)

Union of all possible lifecycle states for an [IOperationEntry](Interface.IOperationEntry).
