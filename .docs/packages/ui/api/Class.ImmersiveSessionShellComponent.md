---
title: 'Class: ImmersiveSessionShellComponent'
generated: true
editUrl: false
---
# Class: ImmersiveSessionShellComponent

Defined in: [libs/ui/src/components/immersive-session-shell/ImmersiveSessionShellComponent.ts:328](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/immersive-session-shell/ImmersiveSessionShellComponent.ts#L328)

Provides a responsive, business-agnostic shell for immersive sessions.

The component owns layout, phase presentation, rail attachment and modal focus. The consumer
controls session state, dismissal and all projected actions.

## Constructors

### Constructor

```ts
new ImmersiveSessionShellComponent(): ImmersiveSessionShellComponent;
```

Defined in: [libs/ui/src/components/immersive-session-shell/ImmersiveSessionShellComponent.ts:342](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/immersive-session-shell/ImmersiveSessionShellComponent.ts#L342)

Maintains focus when a phase or modal overlay changes which content is reachable.

#### Returns

`ImmersiveSessionShellComponent`

## Properties

### ariaLabel

```ts
readonly ariaLabel: InputSignal<string>;
```

Defined in: [libs/ui/src/components/immersive-session-shell/ImmersiveSessionShellComponent.ts:357](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/immersive-session-shell/ImmersiveSessionShellComponent.ts#L357)

Accessible name for the complete immersive session surface.

***

### effectiveRailState

```ts
protected readonly effectiveRailState: Signal<ImmersiveSessionRailState>;
```

Defined in: [libs/ui/src/components/immersive-session-shell/ImmersiveSessionShellComponent.ts:404](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/immersive-session-shell/ImmersiveSessionShellComponent.ts#L404)

***

### idleDetectionEnabled

```ts
protected readonly idleDetectionEnabled: Signal<boolean>;
```

Defined in: [libs/ui/src/components/immersive-session-shell/ImmersiveSessionShellComponent.ts:408](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/immersive-session-shell/ImmersiveSessionShellComponent.ts#L408)

***

### idleEnabled

```ts
readonly idleEnabled: InputSignal<boolean>;
```

Defined in: [libs/ui/src/components/immersive-session-shell/ImmersiveSessionShellComponent.ts:363](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/immersive-session-shell/ImmersiveSessionShellComponent.ts#L363)

Allows shell controls to fade during inactivity in the live phase on hover-capable devices.

***

### idleHoldSelector

```ts
protected readonly idleHoldSelector: "[part='header'], [part='footer'], [part='rail'], [part='rail-handle']" = "[part='header'], [part='footer'], [part='rail'], [part='rail-handle']";
```

Defined in: [libs/ui/src/components/immersive-session-shell/ImmersiveSessionShellComponent.ts:409](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/immersive-session-shell/ImmersiveSessionShellComponent.ts#L409)

***

### modal

```ts
readonly modal: InputSignal<boolean>;
```

Defined in: [libs/ui/src/components/immersive-session-shell/ImmersiveSessionShellComponent.ts:366](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/immersive-session-shell/ImmersiveSessionShellComponent.ts#L366)

Enables modal semantics, automatic focus capture, trapping and focus restoration.

***

### overlayAriaLabel

```ts
readonly overlayAriaLabel: InputSignal<string | null>;
```

Defined in: [libs/ui/src/components/immersive-session-shell/ImmersiveSessionShellComponent.ts:399](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/immersive-session-shell/ImmersiveSessionShellComponent.ts#L399)

Accessible overlay name. Defaults to the shell's accessible name.

***

### overlayDismissed

```ts
readonly overlayDismissed: OutputEmitterRef<void>;
```

Defined in: [libs/ui/src/components/immersive-session-shell/ImmersiveSessionShellComponent.ts:402](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/immersive-session-shell/ImmersiveSessionShellComponent.ts#L402)

Requests dismissal after Escape or a backdrop click.

***

### overlayOpen

```ts
readonly overlayOpen: InputSignal<boolean>;
```

Defined in: [libs/ui/src/components/immersive-session-shell/ImmersiveSessionShellComponent.ts:396](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/immersive-session-shell/ImmersiveSessionShellComponent.ts#L396)

Controls the projected overlay and makes the underlying shell inert while open.

***

### phase

```ts
readonly phase: InputSignal<ImmersiveSessionPhase>;
```

Defined in: [libs/ui/src/components/immersive-session-shell/ImmersiveSessionShellComponent.ts:360](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/immersive-session-shell/ImmersiveSessionShellComponent.ts#L360)

Shows the preparation slot during preflight and the stage during connection, live and completion.

***

### preflightVisible

```ts
protected readonly preflightVisible: Signal<boolean>;
```

Defined in: [libs/ui/src/components/immersive-session-shell/ImmersiveSessionShellComponent.ts:407](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/immersive-session-shell/ImmersiveSessionShellComponent.ts#L407)

***

### railAriaLabel

```ts
readonly railAriaLabel: InputSignal<string | null>;
```

Defined in: [libs/ui/src/components/immersive-session-shell/ImmersiveSessionShellComponent.ts:385](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/immersive-session-shell/ImmersiveSessionShellComponent.ts#L385)

Optional accessible name for the contextual rail.

***

### railAttached

```ts
protected readonly railAttached: Signal<boolean>;
```

Defined in: [libs/ui/src/components/immersive-session-shell/ImmersiveSessionShellComponent.ts:406](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/immersive-session-shell/ImmersiveSessionShellComponent.ts#L406)

***

### railOpen

```ts
readonly railOpen: InputSignal<boolean>;
```

Defined in: [libs/ui/src/components/immersive-session-shell/ImmersiveSessionShellComponent.ts:374](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/immersive-session-shell/ImmersiveSessionShellComponent.ts#L374)

Indicates whether the contextual rail is currently rendered.

***

### railState

```ts
readonly railState: InputSignal<
  | ImmersiveSessionRailState
| undefined>;
```

Defined in: [libs/ui/src/components/immersive-session-shell/ImmersiveSessionShellComponent.ts:377](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/immersive-session-shell/ImmersiveSessionShellComponent.ts#L377)

Explicit rail state. When supplied, the rail retains its content while closed.

***

### railVisible

```ts
protected readonly railVisible: Signal<boolean>;
```

Defined in: [libs/ui/src/components/immersive-session-shell/ImmersiveSessionShellComponent.ts:405](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/immersive-session-shell/ImmersiveSessionShellComponent.ts#L405)

***

### railWidth

```ts
readonly railWidth: InputSignal<string | number>;
```

Defined in: [libs/ui/src/components/immersive-session-shell/ImmersiveSessionShellComponent.ts:393](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/immersive-session-shell/ImmersiveSessionShellComponent.ts#L393)

Preferred rail width. Numeric values are interpreted as CSS pixels.

***

### railWidthStyle

```ts
protected readonly railWidthStyle: Signal<string>;
```

Defined in: [libs/ui/src/components/immersive-session-shell/ImmersiveSessionShellComponent.ts:417](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/immersive-session-shell/ImmersiveSessionShellComponent.ts#L417)

CSS width derived from the public rail-width input.

## Methods

### requestOverlayDismissal()

```ts
protected requestOverlayDismissal(event?): void;
```

Defined in: [libs/ui/src/components/immersive-session-shell/ImmersiveSessionShellComponent.ts:423](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/immersive-session-shell/ImmersiveSessionShellComponent.ts#L423)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `event?` | `Event` |

#### Returns

`void`
