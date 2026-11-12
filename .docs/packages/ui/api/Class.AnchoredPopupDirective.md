---
title: 'Class: AnchoredPopupDirective\<TEvent, TResult\>'
generated: true
editUrl: false
---
# Class: AnchoredPopupDirective\<TEvent, TResult\>

Defined in: [libs/ui/src/directives/anchored-popup/AnchoredPopupDirective.ts:11](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/directives/anchored-popup/AnchoredPopupDirective.ts#L11)

Coordinates one popup across changing anchors and asynchronous content.

## Type Parameters

| Type Parameter |
| ------ |
| <a id="type-parameter-tevent"></a> `TEvent` *extends* [`IAnchoredPopupEvent`](Interface.IAnchoredPopupEvent) |
| <a id="type-parameter-tresult"></a> `TResult` |

## Constructors

### Constructor

```ts
new AnchoredPopupDirective<TEvent, TResult>(): AnchoredPopupDirective<TEvent, TResult>;
```

Defined in: [libs/ui/src/directives/anchored-popup/AnchoredPopupDirective.ts:25](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/directives/anchored-popup/AnchoredPopupDirective.ts#L25)

#### Returns

`AnchoredPopupDirective`\<`TEvent`, `TResult`\>

## Properties

### current

```ts
readonly current: WritableSignal<TEvent | null>;
```

Defined in: [libs/ui/src/directives/anchored-popup/AnchoredPopupDirective.ts:13](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/directives/anchored-popup/AnchoredPopupDirective.ts#L13)

***

### failed

```ts
readonly failed: WritableSignal<boolean>;
```

Defined in: [libs/ui/src/directives/anchored-popup/AnchoredPopupDirective.ts:16](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/directives/anchored-popup/AnchoredPopupDirective.ts#L16)

***

### load

```ts
readonly load: InputSignal<(event) => Promise<TResult | null>>;
```

Defined in: [libs/ui/src/directives/anchored-popup/AnchoredPopupDirective.ts:12](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/directives/anchored-popup/AnchoredPopupDirective.ts#L12)

***

### loading

```ts
readonly loading: WritableSignal<boolean>;
```

Defined in: [libs/ui/src/directives/anchored-popup/AnchoredPopupDirective.ts:15](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/directives/anchored-popup/AnchoredPopupDirective.ts#L15)

***

### result

```ts
readonly result: WritableSignal<TResult | null>;
```

Defined in: [libs/ui/src/directives/anchored-popup/AnchoredPopupDirective.ts:14](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/directives/anchored-popup/AnchoredPopupDirective.ts#L14)

## Methods

### hide()

```ts
hide(anchor, force?): void;
```

Defined in: [libs/ui/src/directives/anchored-popup/AnchoredPopupDirective.ts:62](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/directives/anchored-popup/AnchoredPopupDirective.ts#L62)

#### Parameters

| Parameter | Type | Default value |
| ------ | ------ | ------ |
| `anchor` | `HTMLElement` | `undefined` |
| `force?` | `boolean` | `false` |

#### Returns

`void`

***

### show()

```ts
show(event): void;
```

Defined in: [libs/ui/src/directives/anchored-popup/AnchoredPopupDirective.ts:33](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/directives/anchored-popup/AnchoredPopupDirective.ts#L33)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `event` | `TEvent` |

#### Returns

`void`
