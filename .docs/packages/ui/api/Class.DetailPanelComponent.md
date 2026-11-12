---
title: 'Class: DetailPanelComponent'
generated: true
editUrl: false
---
# Class: DetailPanelComponent

Defined in: [libs/ui/src/components/detail-panel/DetailPanelComponent.ts:231](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/detail-panel/DetailPanelComponent.ts#L231)

## Constructors

### Constructor

```ts
new DetailPanelComponent(): DetailPanelComponent;
```

Defined in: [libs/ui/src/components/detail-panel/DetailPanelComponent.ts:269](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/detail-panel/DetailPanelComponent.ts#L269)

#### Returns

`DetailPanelComponent`

## Properties

### backdropLabel

```ts
readonly backdropLabel: InputSignal<string>;
```

Defined in: [libs/ui/src/components/detail-panel/DetailPanelComponent.ts:257](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/detail-panel/DetailPanelComponent.ts#L257)

***

### canCloseByBackdrop

```ts
protected readonly canCloseByBackdrop: Signal<boolean>;
```

Defined in: [libs/ui/src/components/detail-panel/DetailPanelComponent.ts:265](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/detail-panel/DetailPanelComponent.ts#L265)

***

### closeLabel

```ts
readonly closeLabel: InputSignal<string>;
```

Defined in: [libs/ui/src/components/detail-panel/DetailPanelComponent.ts:256](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/detail-panel/DetailPanelComponent.ts#L256)

***

### closeOnBackdropClick

```ts
readonly closeOnBackdropClick: InputSignal<boolean>;
```

Defined in: [libs/ui/src/components/detail-panel/DetailPanelComponent.ts:248](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/detail-panel/DetailPanelComponent.ts#L248)

***

### closeOnEscape

```ts
readonly closeOnEscape: InputSignal<boolean>;
```

Defined in: [libs/ui/src/components/detail-panel/DetailPanelComponent.ts:249](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/detail-panel/DetailPanelComponent.ts#L249)

***

### closing

```ts
protected readonly closing: WritableSignal<boolean>;
```

Defined in: [libs/ui/src/components/detail-panel/DetailPanelComponent.ts:242](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/detail-panel/DetailPanelComponent.ts#L242)

***

### disabled

```ts
readonly disabled: InputSignal<boolean>;
```

Defined in: [libs/ui/src/components/detail-panel/DetailPanelComponent.ts:246](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/detail-panel/DetailPanelComponent.ts#L246)

***

### handleVariant

```ts
readonly handleVariant: InputSignal<DetailPanelHandleVariant>;
```

Defined in: [libs/ui/src/components/detail-panel/DetailPanelComponent.ts:252](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/detail-panel/DetailPanelComponent.ts#L252)

***

### hasBackdrop

```ts
readonly hasBackdrop: InputSignal<boolean>;
```

Defined in: [libs/ui/src/components/detail-panel/DetailPanelComponent.ts:247](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/detail-panel/DetailPanelComponent.ts#L247)

***

### opened

```ts
readonly opened: ModelSignal<boolean>;
```

Defined in: [libs/ui/src/components/detail-panel/DetailPanelComponent.ts:244](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/detail-panel/DetailPanelComponent.ts#L244)

***

### openedChangeReason

```ts
readonly openedChangeReason: OutputEmitterRef<IDetailPanelChange>;
```

Defined in: [libs/ui/src/components/detail-panel/DetailPanelComponent.ts:259](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/detail-panel/DetailPanelComponent.ts#L259)

***

### openLabel

```ts
readonly openLabel: InputSignal<string>;
```

Defined in: [libs/ui/src/components/detail-panel/DetailPanelComponent.ts:255](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/detail-panel/DetailPanelComponent.ts#L255)

***

### panelClosed

```ts
readonly panelClosed: OutputEmitterRef<IDetailPanelChange>;
```

Defined in: [libs/ui/src/components/detail-panel/DetailPanelComponent.ts:261](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/detail-panel/DetailPanelComponent.ts#L261)

***

### panelId

```ts
protected readonly panelId: string;
```

Defined in: [libs/ui/src/components/detail-panel/DetailPanelComponent.ts:241](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/detail-panel/DetailPanelComponent.ts#L241)

***

### panelLabel

```ts
readonly panelLabel: InputSignal<string>;
```

Defined in: [libs/ui/src/components/detail-panel/DetailPanelComponent.ts:254](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/detail-panel/DetailPanelComponent.ts#L254)

***

### panelOpened

```ts
readonly panelOpened: OutputEmitterRef<IDetailPanelChange>;
```

Defined in: [libs/ui/src/components/detail-panel/DetailPanelComponent.ts:260](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/detail-panel/DetailPanelComponent.ts#L260)

***

### restoreFocusOnClose

```ts
readonly restoreFocusOnClose: InputSignal<boolean>;
```

Defined in: [libs/ui/src/components/detail-panel/DetailPanelComponent.ts:250](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/detail-panel/DetailPanelComponent.ts#L250)

## Methods

### close()

```ts
close(reason?): void;
```

Defined in: [libs/ui/src/components/detail-panel/DetailPanelComponent.ts:303](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/detail-panel/DetailPanelComponent.ts#L303)

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

Defined in: [libs/ui/src/components/detail-panel/DetailPanelComponent.ts:326](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/detail-panel/DetailPanelComponent.ts#L326)

#### Returns

`string`

***

### onPanelTransitionEnd()

```ts
protected onPanelTransitionEnd(event): void;
```

Defined in: [libs/ui/src/components/detail-panel/DetailPanelComponent.ts:334](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/detail-panel/DetailPanelComponent.ts#L334)

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

Defined in: [libs/ui/src/components/detail-panel/DetailPanelComponent.ts:293](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/detail-panel/DetailPanelComponent.ts#L293)

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

Defined in: [libs/ui/src/components/detail-panel/DetailPanelComponent.ts:317](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/detail-panel/DetailPanelComponent.ts#L317)

#### Parameters

| Parameter | Type | Default value |
| ------ | ------ | ------ |
| `reason?` | [`DetailPanelCloseReason`](TypeAlias.DetailPanelCloseReason) | `'handle'` |

#### Returns

`void`
