---
title: 'Function: withTelemetry()'
generated: true
editUrl: false
---
# Function: withTelemetry()

```ts
function withTelemetry(id, ...providers): IFeature<AudioFeatureKind>;
```

Defined in: [audio/features/withTelemetry.ts:28](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/audio/features/withTelemetry.ts#L28)

Adds product-owned providers to the recorder composition — a logger, a metrics sink, anything
that observes recording without changing it. The feature is multi, so several telemetry
contributions compose; each one carries its own id, and a repeated id is reported as a conflict
instead of quietly registering the same observer twice.

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `id` | `string` | Stable id of this contribution, unique among the telemetry features of one composition. |
| ...`providers` | readonly `Provider`[] | The providers to contribute. |

## Returns

[`IFeature`](Interface.IFeature)\<[`AudioFeatureKind`](TypeAlias.AudioFeatureKind)\>

A feature for `provideAudioRecorder(...)`.

## Example

```typescript
provideAudioRecorder(
    withTelemetry('recording-logger', { provide: RECORDING_LOGGER, useClass: ConsoleRecordingLogger })
)
```
