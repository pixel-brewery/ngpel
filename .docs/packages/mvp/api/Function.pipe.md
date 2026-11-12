---
title: 'Function: pipe()'
generated: true
editUrl: false
---
# Function: pipe()

```ts
function pipe<T, R>(input, ...operators): SignalSubject<R>;
```

Defined in: [signals/pipe.ts:20](https://github.com/pixel-brewery/ngpel/blob/main/libs/mvp/src/signals/pipe.ts#L20)

Applies a sequence of signal operators to a subject.

## Type Parameters

| Type Parameter | Description |
| ------ | ------ |
| <a id="type-parameter-t"></a> `T` | The source value type. |
| <a id="type-parameter-r"></a> `R` | The final value type. |

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `input` | [`SignalSubject`](Class.SignalSubject)\<`T`\> | The source subject. |
| ...`operators` | [`SignalOperator`](TypeAlias.SignalOperator)\<`any`, `any`\>[] | The transformations to apply in order. |

## Returns

[`SignalSubject`](Class.SignalSubject)\<`R`\>

The final subject, or the original subject when no operators are supplied.
