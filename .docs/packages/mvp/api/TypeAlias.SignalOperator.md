---
title: 'Type Alias: SignalOperator\<T, R\>'
generated: true
editUrl: false
---
# Type Alias: SignalOperator\<T, R\>

```ts
type SignalOperator<T, R> = (source) => SignalSubject<R>;
```

Defined in: [signals/SignalOperator.ts:14](https://github.com/pixel-brewery/ngpel/blob/main/libs/mvp/src/signals/SignalOperator.ts#L14)

Transforms one signal subject into another.

## Type Parameters

| Type Parameter | Description |
| ------ | ------ |
| <a id="type-parameter-t"></a> `T` | The source value type. |
| <a id="type-parameter-r"></a> `R` | The resulting value type. |

## Parameters

| Parameter | Type |
| ------ | ------ |
| `source` | [`SignalSubject`](Class.SignalSubject)\<`T`\> |

## Returns

[`SignalSubject`](Class.SignalSubject)\<`R`\>
