---
title: 'Function: map()'
generated: true
editUrl: false
---
# Function: map()

```ts
function map<T, R>(project): SignalOperator<T, R>;
```

Defined in: [signals/operators/map.ts:17](https://github.com/pixel-brewery/ngpel/blob/main/libs/mvp/src/signals/operators/map.ts#L17)

Projects the current and subsequent values of a signal subject.

## Type Parameters

| Type Parameter | Description |
| ------ | ------ |
| <a id="type-parameter-t"></a> `T` | The source value type. |
| <a id="type-parameter-r"></a> `R` | The projected value type. |

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `project` | (`value`) => `R` | The projection applied to each emission. |

## Returns

[`SignalOperator`](TypeAlias.SignalOperator)\<`T`, `R`\>

An operator that creates the projected subject.
