---
title: 'Class: StopEventPropagationDirective'
generated: true
editUrl: false
---
# Class: StopEventPropagationDirective

Defined in: [libs/ui/src/directives/stop-event-propagation/StopEventPropagationDirective.ts:43](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/directives/stop-event-propagation/StopEventPropagationDirective.ts#L43)

Stops the propagation of pointer, mouse and keyboard events at the host element, so nested
interactive controls (a delete button inside a clickable row, for instance) do not trigger the
surrounding handlers.

The directive intercepts `click`, `dblclick`, `mousedown`, `mouseup`, `pointerdown`,
`pointerup`, `keydown` and `keyup`. The list can be narrowed through the main input, and
keyboard events can additionally be filtered by key name through `ngpStopEventPropagationKeys`.

## Example

```html
<!-- Stop every supported event -->
<button ngpStopEventPropagation>Delete</button>

<!-- Only clicks and Enter/Space activations -->
<button [ngpStopEventPropagation]="['click', 'keydown']" [ngpStopEventPropagationKeys]="['enter', 'space']">Delete</button>
```

## Constructors

### Constructor

```ts
new StopEventPropagationDirective(): StopEventPropagationDirective;
```

#### Returns

`StopEventPropagationDirective`

## Properties

### events

```ts
readonly events: InputSignalWithTransform<
  | boolean
  | readonly StopEventPropagationEventName[],
  | boolean
  | ""
| readonly StopEventPropagationEventName[]>;
```

Defined in: [libs/ui/src/directives/stop-event-propagation/StopEventPropagationDirective.ts:53](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/directives/stop-event-propagation/StopEventPropagationDirective.ts#L53)

`true` (the default and the value of the bare attribute) stops every supported event, `false`
disables the directive and an array restricts the interception to the listed events.

***

### keys

```ts
readonly keys: InputSignal<readonly string[] | null>;
```

Defined in: [libs/ui/src/directives/stop-event-propagation/StopEventPropagationDirective.ts:66](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/directives/stop-event-propagation/StopEventPropagationDirective.ts#L66)

Optional key filter for `keydown`/`keyup`: only keyboard events whose `key` matches one of the
listed names (case-insensitive, `'space'` matches the space bar) are stopped. `null` stops
every key.

## Methods

### onEvent()

```ts
protected onEvent(event): void;
```

Defined in: [libs/ui/src/directives/stop-event-propagation/StopEventPropagationDirective.ts:78](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/directives/stop-event-propagation/StopEventPropagationDirective.ts#L78)

Stops the event when it matches the configured events and keys.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `event` | `Event` | The intercepted host event. |

#### Returns

`void`
