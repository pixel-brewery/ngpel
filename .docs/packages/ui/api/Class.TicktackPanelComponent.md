---
title: 'Class: TicktackPanelComponent'
generated: true
editUrl: false
---
# Class: TicktackPanelComponent

Defined in: [libs/ui/src/components/ticktack-panel/TicktackPanelComponent.ts:184](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/ticktack-panel/TicktackPanelComponent.ts#L184)

Horizontally switches between a primary and secondary content surface.

The default slot contains the primary surface. Content marked with
`ngpTicktackPanelSecondary` is projected into the secondary surface.

## Constructors

### Constructor

```ts
new TicktackPanelComponent(): TicktackPanelComponent;
```

#### Returns

`TicktackPanelComponent`

## Properties

### \_intl

```ts
protected readonly _intl: TicktackPanelComponentIntl;
```

Defined in: [libs/ui/src/components/ticktack-panel/TicktackPanelComponent.ts:189](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/ticktack-panel/TicktackPanelComponent.ts#L189)

***

### backwardLabel

```ts
readonly backwardLabel: InputSignal<string>;
```

Defined in: [libs/ui/src/components/ticktack-panel/TicktackPanelComponent.ts:206](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/ticktack-panel/TicktackPanelComponent.ts#L206)

***

### disabled

```ts
readonly disabled: InputSignal<boolean>;
```

Defined in: [libs/ui/src/components/ticktack-panel/TicktackPanelComponent.ts:202](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/ticktack-panel/TicktackPanelComponent.ts#L202)

***

### forwardLabel

```ts
readonly forwardLabel: InputSignal<string>;
```

Defined in: [libs/ui/src/components/ticktack-panel/TicktackPanelComponent.ts:205](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/ticktack-panel/TicktackPanelComponent.ts#L205)

***

### panelChanged

```ts
readonly panelChanged: OutputEmitterRef<ITicktackPanelChange>;
```

Defined in: [libs/ui/src/components/ticktack-panel/TicktackPanelComponent.ts:207](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/ticktack-panel/TicktackPanelComponent.ts#L207)

***

### primaryPanelId

```ts
protected readonly primaryPanelId: string;
```

Defined in: [libs/ui/src/components/ticktack-panel/TicktackPanelComponent.ts:191](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/ticktack-panel/TicktackPanelComponent.ts#L191)

***

### primaryPanelLabel

```ts
readonly primaryPanelLabel: InputSignal<string>;
```

Defined in: [libs/ui/src/components/ticktack-panel/TicktackPanelComponent.ts:203](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/ticktack-panel/TicktackPanelComponent.ts#L203)

***

### secondaryActive

```ts
readonly secondaryActive: ModelSignal<boolean>;
```

Defined in: [libs/ui/src/components/ticktack-panel/TicktackPanelComponent.ts:201](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/ticktack-panel/TicktackPanelComponent.ts#L201)

***

### secondaryPanelId

```ts
protected readonly secondaryPanelId: string;
```

Defined in: [libs/ui/src/components/ticktack-panel/TicktackPanelComponent.ts:192](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/ticktack-panel/TicktackPanelComponent.ts#L192)

***

### secondaryPanelLabel

```ts
readonly secondaryPanelLabel: InputSignal<string>;
```

Defined in: [libs/ui/src/components/ticktack-panel/TicktackPanelComponent.ts:204](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/ticktack-panel/TicktackPanelComponent.ts#L204)

## Methods

### showPrimary()

```ts
showPrimary(reason?): void;
```

Defined in: [libs/ui/src/components/ticktack-panel/TicktackPanelComponent.ts:234](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/ticktack-panel/TicktackPanelComponent.ts#L234)

Shows the primary surface.

#### Parameters

| Parameter | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `reason` | [`TicktackPanelChangeReason`](TypeAlias.TicktackPanelChangeReason) | `'api'` | Trigger for the state change. |

#### Returns

`void`

***

### showSecondary()

```ts
showSecondary(reason?): void;
```

Defined in: [libs/ui/src/components/ticktack-panel/TicktackPanelComponent.ts:219](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/ticktack-panel/TicktackPanelComponent.ts#L219)

Shows the secondary surface.

#### Parameters

| Parameter | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `reason` | [`TicktackPanelChangeReason`](TypeAlias.TicktackPanelChangeReason) | `'api'` | Trigger for the state change. |

#### Returns

`void`
