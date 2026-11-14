---
title: 'Interface: IWidgetVisualConfig'
generated: true
editUrl: false
---
# Interface: IWidgetVisualConfig

Defined in: [libs/ui/src/widget/models/IWidgetVisualConfig.ts:12](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/widget/models/IWidgetVisualConfig.ts#L12)

Visual treatment applied by the shared widget shell.

## Properties

### appearance?

```ts
readonly appearance?: Appearance;
```

Defined in: [libs/ui/src/widget/models/IWidgetVisualConfig.ts:21](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/widget/models/IWidgetVisualConfig.ts#L21)

Mosaik card appearance used by the widget shell.

***

### elevation?

```ts
readonly elevation?: ElevationWeight;
```

Defined in: [libs/ui/src/widget/models/IWidgetVisualConfig.ts:24](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/widget/models/IWidgetVisualConfig.ts#L24)

Mosaik elevation of the outer widget card.

***

### header?

```ts
readonly header?: "hidden" | "visible";
```

Defined in: [libs/ui/src/widget/models/IWidgetVisualConfig.ts:40](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/widget/models/IWidgetVisualConfig.ts#L40)

Header visibility for dense visual widgets.

***

### variant?

```ts
readonly variant?: Variant;
```

Defined in: [libs/ui/src/widget/models/IWidgetVisualConfig.ts:32](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/widget/models/IWidgetVisualConfig.ts#L32)

Mosaik variant used to derive widget shell theme variables.
