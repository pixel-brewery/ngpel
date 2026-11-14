---
title: 'Class: DetailPanelComponent'
generated: true
editUrl: false
---
# Class: DetailPanelComponent

Defined in: [libs/ui/src/components/detail-panel/DetailPanelComponent.ts:232](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/detail-panel/DetailPanelComponent.ts#L232)

## Constructors

### Constructor

```ts
new DetailPanelComponent(): DetailPanelComponent;
```

Defined in: [libs/ui/src/components/detail-panel/DetailPanelComponent.ts:270](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/detail-panel/DetailPanelComponent.ts#L270)

#### Returns

`DetailPanelComponent`

## Properties

### backdropLabel

```ts
readonly backdropLabel: InputSignal<string>;
```

Defined in: [libs/ui/src/components/detail-panel/DetailPanelComponent.ts:258](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/detail-panel/DetailPanelComponent.ts#L258)

***

### canCloseByBackdrop

```ts
protected readonly canCloseByBackdrop: Signal<boolean>;
```

Defined in: [libs/ui/src/components/detail-panel/DetailPanelComponent.ts:266](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/detail-panel/DetailPanelComponent.ts#L266)

***

### closeLabel

```ts
readonly closeLabel: InputSignal<string>;
```

Defined in: [libs/ui/src/components/detail-panel/DetailPanelComponent.ts:257](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/detail-panel/DetailPanelComponent.ts#L257)

***

### closeOnBackdropClick

```ts
readonly closeOnBackdropClick: InputSignal<boolean>;
```

Defined in: [libs/ui/src/components/detail-panel/DetailPanelComponent.ts:249](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/detail-panel/DetailPanelComponent.ts#L249)

***

### closeOnEscape

```ts
readonly closeOnEscape: InputSignal<boolean>;
```

Defined in: [libs/ui/src/components/detail-panel/DetailPanelComponent.ts:250](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/detail-panel/DetailPanelComponent.ts#L250)

***

### closing

```ts
protected readonly closing: WritableSignal<boolean>;
```

Defined in: [libs/ui/src/components/detail-panel/DetailPanelComponent.ts:243](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/detail-panel/DetailPanelComponent.ts#L243)

***

### disabled

```ts
readonly disabled: InputSignal<boolean>;
```

Defined in: [libs/ui/src/components/detail-panel/DetailPanelComponent.ts:247](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/detail-panel/DetailPanelComponent.ts#L247)

***

### handleVariant

```ts
readonly handleVariant: InputSignal<DetailPanelHandleVariant>;
```

Defined in: [libs/ui/src/components/detail-panel/DetailPanelComponent.ts:253](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/detail-panel/DetailPanelComponent.ts#L253)

***

### hasBackdrop

```ts
readonly hasBackdrop: InputSignal<boolean>;
```

Defined in: [libs/ui/src/components/detail-panel/DetailPanelComponent.ts:248](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/detail-panel/DetailPanelComponent.ts#L248)

***

### opened

```ts
readonly opened: ModelSignal<boolean>;
```

Defined in: [libs/ui/src/components/detail-panel/DetailPanelComponent.ts:245](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/detail-panel/DetailPanelComponent.ts#L245)

***

### openedChangeReason

```ts
readonly openedChangeReason: OutputEmitterRef<IDetailPanelChange>;
```

Defined in: [libs/ui/src/components/detail-panel/DetailPanelComponent.ts:260](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/detail-panel/DetailPanelComponent.ts#L260)

***

### openLabel

```ts
readonly openLabel: InputSignal<string>;
```

Defined in: [libs/ui/src/components/detail-panel/DetailPanelComponent.ts:256](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/detail-panel/DetailPanelComponent.ts#L256)

***

### panelClosed

```ts
readonly panelClosed: OutputEmitterRef<IDetailPanelChange>;
```

Defined in: [libs/ui/src/components/detail-panel/DetailPanelComponent.ts:262](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/detail-panel/DetailPanelComponent.ts#L262)

***

### panelId

```ts
protected readonly panelId: string;
```

Defined in: [libs/ui/src/components/detail-panel/DetailPanelComponent.ts:242](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/detail-panel/DetailPanelComponent.ts#L242)

***

### panelLabel

```ts
readonly panelLabel: InputSignal<string>;
```

Defined in: [libs/ui/src/components/detail-panel/DetailPanelComponent.ts:255](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/detail-panel/DetailPanelComponent.ts#L255)

***

### panelOpened

```ts
readonly panelOpened: OutputEmitterRef<IDetailPanelChange>;
```

Defined in: [libs/ui/src/components/detail-panel/DetailPanelComponent.ts:261](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/detail-panel/DetailPanelComponent.ts#L261)

***

### restoreFocusOnClose

```ts
readonly restoreFocusOnClose: InputSignal<boolean>;
```

Defined in: [libs/ui/src/components/detail-panel/DetailPanelComponent.ts:251](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/detail-panel/DetailPanelComponent.ts#L251)

## Methods

### close()

```ts
close(reason?): void;
```

Defined in: [libs/ui/src/components/detail-panel/DetailPanelComponent.ts:304](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/detail-panel/DetailPanelComponent.ts#L304)

#### Parameters

| Parameter | Type | Default value |
| ------ | ------ | ------ |
| `reason?` | [`DetailPanelCloseReason`](TypeAlias.DetailPanelCloseReason) | `'api'` |

#### Returns

`void`

***

### handleIconName()

```ts
protected handleIconName(): string;
```

Defined in: [libs/ui/src/components/detail-panel/DetailPanelComponent.ts:327](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/detail-panel/DetailPanelComponent.ts#L327)

#### Returns

`string`

***

### onPanelTransitionEnd()

```ts
protected onPanelTransitionEnd(event): void;
```

Defined in: [libs/ui/src/components/detail-panel/DetailPanelComponent.ts:335](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/detail-panel/DetailPanelComponent.ts#L335)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `event` | `TransitionEvent` |

#### Returns

`void`

***

### open()

```ts
open(reason?): void;
```

Defined in: [libs/ui/src/components/detail-panel/DetailPanelComponent.ts:294](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/detail-panel/DetailPanelComponent.ts#L294)

#### Parameters

| Parameter | Type | Default value |
| ------ | ------ | ------ |
| `reason?` | [`DetailPanelCloseReason`](TypeAlias.DetailPanelCloseReason) | `'api'` |

#### Returns

`void`

***

### toggle()

```ts
toggle(reason?): void;
```

Defined in: [libs/ui/src/components/detail-panel/DetailPanelComponent.ts:318](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/detail-panel/DetailPanelComponent.ts#L318)

#### Parameters

| Parameter | Type | Default value |
| ------ | ------ | ------ |
| `reason?` | [`DetailPanelCloseReason`](TypeAlias.DetailPanelCloseReason) | `'handle'` |

#### Returns

`void`
