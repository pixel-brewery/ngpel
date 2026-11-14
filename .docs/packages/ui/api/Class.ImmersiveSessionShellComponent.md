---
title: 'Class: ImmersiveSessionShellComponent'
generated: true
editUrl: false
---
# Class: ImmersiveSessionShellComponent

Defined in: [libs/ui/src/components/immersive-session-shell/ImmersiveSessionShellComponent.ts:378](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/immersive-session-shell/ImmersiveSessionShellComponent.ts#L378)

Provides a responsive, business-agnostic shell for immersive sessions.

The component owns layout, phase presentation, rail attachment and modal focus. The consumer
controls session state, dismissal and all projected actions.

## Constructors

### Constructor

```ts
new ImmersiveSessionShellComponent(): ImmersiveSessionShellComponent;
```

Defined in: [libs/ui/src/components/immersive-session-shell/ImmersiveSessionShellComponent.ts:396](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/immersive-session-shell/ImmersiveSessionShellComponent.ts#L396)

Maintains focus when a phase or modal overlay changes which content is reachable.

#### Returns

`ImmersiveSessionShellComponent`

## Properties

### ariaLabel

```ts
readonly ariaLabel: InputSignal<string>;
```

Defined in: [libs/ui/src/components/immersive-session-shell/ImmersiveSessionShellComponent.ts:438](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/immersive-session-shell/ImmersiveSessionShellComponent.ts#L438)

Accessible name for the complete immersive session surface.

***

### effectiveRailState

```ts
protected readonly effectiveRailState: Signal<ImmersiveSessionRailState>;
```

Defined in: [libs/ui/src/components/immersive-session-shell/ImmersiveSessionShellComponent.ts:491](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/immersive-session-shell/ImmersiveSessionShellComponent.ts#L491)

***

### idleDetectionEnabled

```ts
protected readonly idleDetectionEnabled: Signal<boolean>;
```

Defined in: [libs/ui/src/components/immersive-session-shell/ImmersiveSessionShellComponent.ts:497](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/immersive-session-shell/ImmersiveSessionShellComponent.ts#L497)

***

### idleEnabled

```ts
readonly idleEnabled: InputSignal<boolean>;
```

Defined in: [libs/ui/src/components/immersive-session-shell/ImmersiveSessionShellComponent.ts:450](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/immersive-session-shell/ImmersiveSessionShellComponent.ts#L450)

Allows shell controls to fade during inactivity in the live phase on hover-capable devices.

***

### idleHoldSelector

```ts
protected readonly idleHoldSelector: Signal<string>;
```

Defined in: [libs/ui/src/components/immersive-session-shell/ImmersiveSessionShellComponent.ts:498](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/immersive-session-shell/ImmersiveSessionShellComponent.ts#L498)

***

### layout

```ts
readonly layout: InputSignal<"standard" | "orb">;
```

Defined in: [libs/ui/src/components/immersive-session-shell/ImmersiveSessionShellComponent.ts:444](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/immersive-session-shell/ImmersiveSessionShellComponent.ts#L444)

Uses the stage centered on a persistent orb with animated phase and rail transitions.

***

### modal

```ts
readonly modal: InputSignal<boolean>;
```

Defined in: [libs/ui/src/components/immersive-session-shell/ImmersiveSessionShellComponent.ts:453](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/immersive-session-shell/ImmersiveSessionShellComponent.ts#L453)

Enables modal semantics, automatic focus capture, trapping and focus restoration.

***

### orbLayout

```ts
protected readonly orbLayout: Signal<boolean>;
```

Defined in: [libs/ui/src/components/immersive-session-shell/ImmersiveSessionShellComponent.ts:495](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/immersive-session-shell/ImmersiveSessionShellComponent.ts#L495)

***

### orbPreflightTransform

```ts
protected readonly orbPreflightTransform: Signal<string | null>;
```

Defined in: [libs/ui/src/components/immersive-session-shell/ImmersiveSessionShellComponent.ts:496](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/immersive-session-shell/ImmersiveSessionShellComponent.ts#L496)

***

### overlayAriaLabel

```ts
readonly overlayAriaLabel: InputSignal<string | null>;
```

Defined in: [libs/ui/src/components/immersive-session-shell/ImmersiveSessionShellComponent.ts:486](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/immersive-session-shell/ImmersiveSessionShellComponent.ts#L486)

Accessible overlay name. Defaults to the shell's accessible name.

***

### overlayDismissed

```ts
readonly overlayDismissed: OutputEmitterRef<void>;
```

Defined in: [libs/ui/src/components/immersive-session-shell/ImmersiveSessionShellComponent.ts:489](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/immersive-session-shell/ImmersiveSessionShellComponent.ts#L489)

Requests dismissal after Escape or a backdrop click.

***

### overlayOpen

```ts
readonly overlayOpen: InputSignal<boolean>;
```

Defined in: [libs/ui/src/components/immersive-session-shell/ImmersiveSessionShellComponent.ts:483](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/immersive-session-shell/ImmersiveSessionShellComponent.ts#L483)

Controls the projected overlay and makes the underlying shell inert while open.

***

### phase

```ts
readonly phase: InputSignal<ImmersiveSessionPhase>;
```

Defined in: [libs/ui/src/components/immersive-session-shell/ImmersiveSessionShellComponent.ts:441](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/immersive-session-shell/ImmersiveSessionShellComponent.ts#L441)

Shows the preparation slot during preflight and the stage during connection, live and completion.

***

### preflightVisible

```ts
protected readonly preflightVisible: Signal<boolean>;
```

Defined in: [libs/ui/src/components/immersive-session-shell/ImmersiveSessionShellComponent.ts:494](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/immersive-session-shell/ImmersiveSessionShellComponent.ts#L494)

***

### railAriaLabel

```ts
readonly railAriaLabel: InputSignal<string | null>;
```

Defined in: [libs/ui/src/components/immersive-session-shell/ImmersiveSessionShellComponent.ts:472](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/immersive-session-shell/ImmersiveSessionShellComponent.ts#L472)

Optional accessible name for the contextual rail.

***

### railAttached

```ts
protected readonly railAttached: Signal<boolean>;
```

Defined in: [libs/ui/src/components/immersive-session-shell/ImmersiveSessionShellComponent.ts:493](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/immersive-session-shell/ImmersiveSessionShellComponent.ts#L493)

***

### railOpen

```ts
readonly railOpen: InputSignal<boolean>;
```

Defined in: [libs/ui/src/components/immersive-session-shell/ImmersiveSessionShellComponent.ts:461](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/immersive-session-shell/ImmersiveSessionShellComponent.ts#L461)

Indicates whether the contextual rail is currently rendered.

***

### railState

```ts
readonly railState: InputSignal<
  | ImmersiveSessionRailState
| undefined>;
```

Defined in: [libs/ui/src/components/immersive-session-shell/ImmersiveSessionShellComponent.ts:464](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/immersive-session-shell/ImmersiveSessionShellComponent.ts#L464)

Explicit rail state. When supplied, the rail retains its content while closed.

***

### railVisible

```ts
protected readonly railVisible: Signal<boolean>;
```

Defined in: [libs/ui/src/components/immersive-session-shell/ImmersiveSessionShellComponent.ts:492](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/immersive-session-shell/ImmersiveSessionShellComponent.ts#L492)

***

### railWidth

```ts
readonly railWidth: InputSignal<string | number>;
```

Defined in: [libs/ui/src/components/immersive-session-shell/ImmersiveSessionShellComponent.ts:480](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/immersive-session-shell/ImmersiveSessionShellComponent.ts#L480)

Preferred rail width. Numeric values are interpreted as CSS pixels.

***

### railWidthStyle

```ts
protected readonly railWidthStyle: Signal<string>;
```

Defined in: [libs/ui/src/components/immersive-session-shell/ImmersiveSessionShellComponent.ts:509](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/immersive-session-shell/ImmersiveSessionShellComponent.ts#L509)

CSS width derived from the public rail-width input.

***

### registerModalLayer

```ts
readonly registerModalLayer: InputSignal<((host) => () => void) | undefined>;
```

Defined in: [libs/ui/src/components/immersive-session-shell/ImmersiveSessionShellComponent.ts:447](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/immersive-session-shell/ImmersiveSessionShellComponent.ts#L447)

Registers the modal host in an application-owned layer and returns its cleanup.

## Methods

### requestOverlayDismissal()

```ts
protected requestOverlayDismissal(event?): void;
```

Defined in: [libs/ui/src/components/immersive-session-shell/ImmersiveSessionShellComponent.ts:515](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/immersive-session-shell/ImmersiveSessionShellComponent.ts#L515)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `event?` | `Event` |

#### Returns

`void`
