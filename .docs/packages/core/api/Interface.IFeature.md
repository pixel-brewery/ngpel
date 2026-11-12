---
title: 'Interface: IFeature\<TKind\>'
generated: true
editUrl: false
---
# Interface: IFeature\<TKind\>

Defined in: [features/IFeature.ts:15](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/features/IFeature.ts#L15)

A generic, DI-provider contributing feature.

## Type Parameters

| Type Parameter | Description |
| ------ | ------ |
| <a id="type-parameter-tkind"></a> `TKind` *extends* `string` | String literal type restricting the feature kind space (e.g. 'transcriber' \| 'telemetry'). |

## Properties

### id

```ts
readonly id: string;
```

Defined in: [features/IFeature.ts:21](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/features/IFeature.ts#L21)

Stable unique identifier **within** its kind.

***

### kind

```ts
readonly kind: FeatureKind<TKind>;
```

Defined in: [features/IFeature.ts:26](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/features/IFeature.ts#L26)

The functional category this feature belongs to.

***

### options

```ts
readonly options: Readonly<IFeatureOptions>;
```

Defined in: [features/IFeature.ts:31](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/features/IFeature.ts#L31)

Composition options (e.g. multi).

## Methods

### provide()

```ts
provide(): readonly Provider[];
```

Defined in: [features/IFeature.ts:40](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/features/IFeature.ts#L40)

Contributes providers for composition.

#### Returns

readonly `Provider`[]
