---
title: 'Function: mapServiceWorkerEvent()'
generated: true
editUrl: false
---
# Function: mapServiceWorkerEvent()

```ts
function mapServiceWorkerEvent(event): IUpdateEvent;
```

Defined in: [update/service-worker/mapServiceWorkerEvent.ts:15](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/update/service-worker/mapServiceWorkerEvent.ts#L15)

Translates a `SwUpdate` event into the source-agnostic [IUpdateEvent](TypeAlias.IUpdateEvent) vocabulary.

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `event` | `VersionEvent` \| `UnrecoverableStateEvent` | A `versionUpdates` or `unrecoverable` event of `SwUpdate`. |

## Returns

[`IUpdateEvent`](TypeAlias.IUpdateEvent)

The equivalent update event.
