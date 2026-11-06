---
title: 'Class: BooleanPipe'
generated: true
editUrl: false
---
# Class: BooleanPipe

Defined in: [libs/ui/src/pipes/logic/BooleanPipe.ts:17](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/pipes/logic/BooleanPipe.ts#L17)

Chooses between two values by a condition, which keeps the two-branch decisions a template makes
over and over out of the component: `[icon]="task.isDone | ngpBoolean: 'check' : 'clock'"`,
`[variant]="isCritical | ngpBoolean: 'danger' : 'default'"`.

The result keeps the type of the two branches, so a design-system token union survives the pipe.

## Implements

- `PipeTransform`

## Constructors

### Constructor

```ts
new BooleanPipe(): BooleanPipe;
```

#### Returns

`BooleanPipe`

## Methods

### transform()

```ts
transform<TValue>(
   condition,
   whenTrue,
   whenFalse
): TValue;
```

Defined in: [libs/ui/src/pipes/logic/BooleanPipe.ts:29](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/pipes/logic/BooleanPipe.ts#L29)

Returns `whenTrue` or `whenFalse` depending on `condition`.

#### Type Parameters

| Type Parameter |
| ------ |
| `TValue` |

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `condition` | `boolean` | The condition to evaluate. |
| `whenTrue` | `TValue` | The value for a met condition. |
| `whenFalse` | `TValue` | The value for an unmet condition. |

#### Returns

`TValue`

The chosen value.

#### Implementation of

```ts
PipeTransform.transform
```
