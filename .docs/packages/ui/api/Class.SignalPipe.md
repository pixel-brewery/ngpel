---
title: 'Class: SignalPipe\<TValue\>'
generated: true
editUrl: false
---
# Class: SignalPipe\<TValue\>

Defined in: [libs/ui/src/pipes/signals/SignalPipe.ts:19](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/pipes/signals/SignalPipe.ts#L19)

Wraps a template expression in a signal, so a plain value can be handed to an input, a directive
or a helper that expects one: `<ngp-chart [series]="rows() | ngpSignal" />`.

A value that already is a signal is passed through unchanged. A plain value is written into one
signal the pipe keeps, so the consumer sees a stable reference and merely a new value whenever
the expression changes. The pipe is impure by necessity: a pure pipe would not run again for a
changed value once the reference stayed the same.

## Type Parameters

| Type Parameter | Default type |
| ------ | ------ |
| <a id="type-parameter-tvalue"></a> `TValue` | `unknown` |

## Implements

- `PipeTransform`

## Constructors

### Constructor

```ts
new SignalPipe<TValue>(): SignalPipe<TValue>;
```

#### Returns

`SignalPipe`\<`TValue`\>

## Methods

### transform()

```ts
transform(value): Signal<TValue>;
```

Defined in: [libs/ui/src/pipes/signals/SignalPipe.ts:35](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/pipes/signals/SignalPipe.ts#L35)

Returns `value` as a signal.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `value` | `TValue` \| `Signal`\<`TValue`\> | The signal to pass through, or the plain value to wrap. |

#### Returns

`Signal`\<`TValue`\>

The signal carrying the value.

#### Implementation of

`PipeTransform.transform`
