---
title: 'Class: PointerIdleDirective'
generated: true
editUrl: false
---
# Class: PointerIdleDirective

Defined in: [libs/ui/src/directives/pointer-idle/PointerIdleDirective.ts:43](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/directives/pointer-idle/PointerIdleDirective.ts#L43)

Reports pointer inactivity on its host.

Pointer, wheel, keyboard and focus activity on the host restarts a UI timer. When the timer
elapses, the host is reported idle unless the pointer rests on a hold region or a hold region
contains visible keyboard focus. Devices without hover capability are never reported idle.

## Example

```html
<section ngpPointerIdle #idle="ngpPointerIdle" [attr.data-idle]="idle.isIdle() ? '' : null">
    <footer part="footer">…</footer>
</section>
```

## Constructors

### Constructor

```ts
new PointerIdleDirective(): PointerIdleDirective;
```

Defined in: [libs/ui/src/directives/pointer-idle/PointerIdleDirective.ts:63](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/directives/pointer-idle/PointerIdleDirective.ts#L63)

Observes host activity on hover-capable browsers and follows the disabled state.

#### Returns

`PointerIdleDirective`

## Properties

### disabled

```ts
readonly disabled: InputSignal<boolean>;
```

Defined in: [libs/ui/src/directives/pointer-idle/PointerIdleDirective.ts:103](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/directives/pointer-idle/PointerIdleDirective.ts#L103)

Suspends idle detection; the host is reported active while it is disabled.

***

### hold

```ts
readonly hold: InputSignal<string | null>;
```

Defined in: [libs/ui/src/directives/pointer-idle/PointerIdleDirective.ts:111](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/directives/pointer-idle/PointerIdleDirective.ts#L111)

CSS selector list of regions that keep the host active while hovered or keyboard-focused.

***

### timeout

```ts
readonly timeout: InputSignal<number>;
```

Defined in: [libs/ui/src/directives/pointer-idle/PointerIdleDirective.ts:95](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/directives/pointer-idle/PointerIdleDirective.ts#L95)

Inactivity in milliseconds before the host is reported idle.

## Accessors

### isIdle

#### Get Signature

```ts
get isIdle(): Signal<boolean>;
```

Defined in: [libs/ui/src/directives/pointer-idle/PointerIdleDirective.ts:119](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/directives/pointer-idle/PointerIdleDirective.ts#L119)

Indicates whether the host is currently idle.

##### Returns

`Signal`\<`boolean`\>
