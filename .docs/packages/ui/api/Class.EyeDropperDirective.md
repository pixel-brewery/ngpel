---
title: 'Class: EyeDropperDirective'
generated: true
editUrl: false
---
# Class: EyeDropperDirective

Defined in: [libs/ui/src/directives/eye-dropper/EyeDropperDirective.ts:34](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/directives/eye-dropper/EyeDropperDirective.ts#L34)

## Constructors

### Constructor

```ts
new EyeDropperDirective(): EyeDropperDirective;
```

#### Returns

`EyeDropperDirective`

## Properties

### canceled

```ts
readonly canceled: OutputEmitterRef<void>;
```

Defined in: [libs/ui/src/directives/eye-dropper/EyeDropperDirective.ts:42](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/directives/eye-dropper/EyeDropperDirective.ts#L42)

***

### colorChange

```ts
readonly colorChange: OutputEmitterRef<IEyeDropperColorChange>;
```

Defined in: [libs/ui/src/directives/eye-dropper/EyeDropperDirective.ts:39](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/directives/eye-dropper/EyeDropperDirective.ts#L39)

***

### disabled

```ts
readonly disabled: InputSignal<boolean>;
```

Defined in: [libs/ui/src/directives/eye-dropper/EyeDropperDirective.ts:37](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/directives/eye-dropper/EyeDropperDirective.ts#L37)

***

### failed

```ts
readonly failed: OutputEmitterRef<IEyeDropperError>;
```

Defined in: [libs/ui/src/directives/eye-dropper/EyeDropperDirective.ts:41](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/directives/eye-dropper/EyeDropperDirective.ts#L41)

***

### isOpen

```ts
readonly isOpen: WritableSignal<boolean>;
```

Defined in: [libs/ui/src/directives/eye-dropper/EyeDropperDirective.ts:44](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/directives/eye-dropper/EyeDropperDirective.ts#L44)

***

### isSupported

```ts
readonly isSupported: Signal<boolean>;
```

Defined in: [libs/ui/src/directives/eye-dropper/EyeDropperDirective.ts:46](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/directives/eye-dropper/EyeDropperDirective.ts#L46)

***

### unsupported

```ts
readonly unsupported: OutputEmitterRef<void>;
```

Defined in: [libs/ui/src/directives/eye-dropper/EyeDropperDirective.ts:40](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/directives/eye-dropper/EyeDropperDirective.ts#L40)

## Methods

### onClick()

```ts
onClick(event): Promise<void>;
```

Defined in: [libs/ui/src/directives/eye-dropper/EyeDropperDirective.ts:53](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/directives/eye-dropper/EyeDropperDirective.ts#L53)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `event` | `MouseEvent` |

#### Returns

`Promise`\<`void`\>
