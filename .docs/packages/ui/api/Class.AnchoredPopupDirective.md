---
title: 'Class: AnchoredPopupDirective\<TEvent, TResult\>'
generated: true
editUrl: false
---
# Class: AnchoredPopupDirective\<TEvent, TResult\>

Defined in: libs/ui/src/directives/anchored-popup/AnchoredPopupDirective.ts:11

Coordinates one popup across changing anchors and asynchronous content.

## Type Parameters

| Type Parameter |
| ------ |
| `TEvent` *extends* [`IAnchoredPopupEvent`](Interface.IAnchoredPopupEvent) |
| `TResult` |

## Constructors

### Constructor

```ts
new AnchoredPopupDirective<TEvent, TResult>(): AnchoredPopupDirective<TEvent, TResult>;
```

Defined in: libs/ui/src/directives/anchored-popup/AnchoredPopupDirective.ts:25

#### Returns

`AnchoredPopupDirective`\<`TEvent`, `TResult`\>

## Properties

### current

```ts
readonly current: WritableSignal<TEvent | null>;
```

Defined in: libs/ui/src/directives/anchored-popup/AnchoredPopupDirective.ts:13

***

### failed

```ts
readonly failed: WritableSignal<boolean>;
```

Defined in: libs/ui/src/directives/anchored-popup/AnchoredPopupDirective.ts:16

***

### load

```ts
readonly load: InputSignal<(event) => Promise<TResult | null>>;
```

Defined in: libs/ui/src/directives/anchored-popup/AnchoredPopupDirective.ts:12

***

### loading

```ts
readonly loading: WritableSignal<boolean>;
```

Defined in: libs/ui/src/directives/anchored-popup/AnchoredPopupDirective.ts:15

***

### result

```ts
readonly result: WritableSignal<TResult | null>;
```

Defined in: libs/ui/src/directives/anchored-popup/AnchoredPopupDirective.ts:14

## Methods

### hide()

```ts
hide(anchor, force?): void;
```

Defined in: libs/ui/src/directives/anchored-popup/AnchoredPopupDirective.ts:62

#### Parameters

| Parameter | Type | Default value |
| ------ | ------ | ------ |
| `anchor` | `HTMLElement` | `undefined` |
| `force` | `boolean` | `false` |

#### Returns

`void`

***

### show()

```ts
show(event): void;
```

Defined in: libs/ui/src/directives/anchored-popup/AnchoredPopupDirective.ts:33

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `event` | `TEvent` |

#### Returns

`void`
