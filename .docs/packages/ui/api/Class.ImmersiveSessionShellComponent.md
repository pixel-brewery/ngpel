---
title: 'Class: ImmersiveSessionShellComponent'
generated: true
editUrl: false
---
# Class: ImmersiveSessionShellComponent

Defined in: [libs/ui/src/components/immersive-session-shell/ImmersiveSessionShellComponent.ts:204](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/immersive-session-shell/ImmersiveSessionShellComponent.ts#L204)

Provides a responsive, business-agnostic shell for immersive sessions.

The component owns layout and optional modal focus semantics. Overlay
lifecycle, session state and all projected actions remain the responsibility
of the consumer.

## Constructors

### Constructor

```ts
new ImmersiveSessionShellComponent(): ImmersiveSessionShellComponent;
```

#### Returns

`ImmersiveSessionShellComponent`

## Properties

### ariaLabel

```ts
readonly ariaLabel: InputSignal<string>;
```

Defined in: [libs/ui/src/components/immersive-session-shell/ImmersiveSessionShellComponent.ts:213](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/immersive-session-shell/ImmersiveSessionShellComponent.ts#L213)

Accessible name for the complete immersive session surface.

***

### modal

```ts
readonly modal: InputSignal<boolean>;
```

Defined in: [libs/ui/src/components/immersive-session-shell/ImmersiveSessionShellComponent.ts:216](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/immersive-session-shell/ImmersiveSessionShellComponent.ts#L216)

Enables modal semantics, automatic focus capture, trapping and focus restoration.

***

### railAriaLabel

```ts
readonly railAriaLabel: InputSignal<string | null>;
```

Defined in: [libs/ui/src/components/immersive-session-shell/ImmersiveSessionShellComponent.ts:232](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/immersive-session-shell/ImmersiveSessionShellComponent.ts#L232)

Optional accessible name for the contextual rail.

***

### railOpen

```ts
readonly railOpen: InputSignal<boolean>;
```

Defined in: [libs/ui/src/components/immersive-session-shell/ImmersiveSessionShellComponent.ts:224](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/immersive-session-shell/ImmersiveSessionShellComponent.ts#L224)

Indicates whether the contextual rail is currently rendered.

***

### railWidth

```ts
readonly railWidth: InputSignal<string | number>;
```

Defined in: [libs/ui/src/components/immersive-session-shell/ImmersiveSessionShellComponent.ts:240](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/immersive-session-shell/ImmersiveSessionShellComponent.ts#L240)

Preferred rail width. Numeric values are interpreted as CSS pixels.

***

### railWidthStyle

```ts
protected readonly railWidthStyle: Signal<string>;
```

Defined in: [libs/ui/src/components/immersive-session-shell/ImmersiveSessionShellComponent.ts:248](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/immersive-session-shell/ImmersiveSessionShellComponent.ts#L248)

CSS width derived from the public rail-width input.
