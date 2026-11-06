---
title: 'Interface: IHydratable'
generated: true
editUrl: false
---
# Interface: IHydratable

Defined in: [behaviors/IHydratable.ts:14](https://github.com/pixel-brewery/ngpel/blob/main/libs/mvp/src/behaviors/IHydratable.ts#L14)

Contract of the Hydratable presenter behavior: the one-time load that has to finish before the
View can show anything, kept apart from the ongoing loading state.

## Properties

### isHydrating

```ts
readonly isHydrating: Signal<boolean>;
```

Defined in: [behaviors/IHydratable.ts:20](https://github.com/pixel-brewery/ngpel/blob/main/libs/mvp/src/behaviors/IHydratable.ts#L20)

Whether the presenter is still loading the data required for its initial presentation.

## Methods

### onHydrate()

```ts
onHydrate(): HydrationOperation;
```

Defined in: [behaviors/IHydratable.ts:36](https://github.com/pixel-brewery/ngpel/blob/main/libs/mvp/src/behaviors/IHydratable.ts#L36)

Creates the initial hydration operation. Override in presenters that need asynchronous
initial data.

#### Returns

[`HydrationOperation`](TypeAlias.HydrationOperation)

The hydration operation, or `undefined` when no initial data is required.

#### Remarks

Public because TypeScript mixins cannot declare protected extension points. It is a subclass
extension point — do not call it from a template.

***

### onHydrationError()

```ts
onHydrationError(error): void;
```

Defined in: [behaviors/IHydratable.ts:44](https://github.com/pixel-brewery/ngpel/blob/main/libs/mvp/src/behaviors/IHydratable.ts#L44)

Handles a hydration error the operation did not handle itself. Override when the presenter
has domain-specific recovery; the default rethrows.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `error` | `unknown` | The unhandled hydration error. |

#### Returns

`void`
