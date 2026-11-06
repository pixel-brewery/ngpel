---
title: 'Function: toStopEventPropagationEvents()'
generated: true
editUrl: false
---
# Function: toStopEventPropagationEvents()

```ts
function toStopEventPropagationEvents(value):
  | boolean
  | readonly StopEventPropagationEventName[];
```

Defined in: [libs/ui/src/directives/stop-event-propagation/toStopEventPropagationEvents.ts:23](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/directives/stop-event-propagation/toStopEventPropagationEvents.ts#L23)

Normalises the value bound to `ngpStopEventPropagation` into the shape the directive evaluates.

The bare attribute form (`<button ngpStopEventPropagation>`) reaches the input as the empty
string, which is neither `true`, `false` nor a list of event names; it means "stop every
supported event" and is therefore mapped onto `true`. Every other value passes through
unchanged.

Deliberately not part of the published surface: it exists as a separate module so that the
normalisation can be exercised directly. As an input transform it is unreachable from a spec,
because the specs substitute the input signal itself and the just-in-time compiler never applies
a transform in the first place.

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `value` | \| `boolean` \| `""` \| readonly [`StopEventPropagationEventName`](TypeAlias.StopEventPropagationEventName)[] | The bound value; the empty string for the bare attribute. |

## Returns

  \| `boolean`
  \| readonly [`StopEventPropagationEventName`](TypeAlias.StopEventPropagationEventName)[]

`true` for the bare attribute, the value itself otherwise.
