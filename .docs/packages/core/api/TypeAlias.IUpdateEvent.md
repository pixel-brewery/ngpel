---
title: 'Type Alias: IUpdateEvent'
generated: true
editUrl: false
---
# Type Alias: IUpdateEvent

```ts
type IUpdateEvent =
  | IUpdateVersionDetectedEvent
  | IUpdateVersionReadyEvent
  | IUpdateVersionInstallationFailedEvent
  | IUpdateNoNewVersionDetectedEvent
  | IUpdateUnrecoverableEvent;
```

Defined in: [update/models/IUpdateEvent.ts:18](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/update/models/IUpdateEvent.ts#L18)

Discriminated union of every event an [IUpdateSource](Interface.IUpdateSource) can emit. It replaces the
`@angular/service-worker` event classes in the strategy contract, so the primary entry point has
no service-worker dependency and any platform can implement the port.
