---
title: 'Class: ScrollToErrorTriggerDirective'
generated: true
editUrl: false
---
# Class: ScrollToErrorTriggerDirective

Defined in: [libs/ui/src/directives/scroll-to-error/ScrollToErrorTriggerDirective.ts:18](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/directives/scroll-to-error/ScrollToErrorTriggerDirective.ts#L18)

Triggers error navigation for a validation scope associated through the same Signal Forms state.

The trigger may live outside the validation scope, for example in a projected footer.

## Constructors

### Constructor

```ts
new ScrollToErrorTriggerDirective(registry?, injector?): ScrollToErrorTriggerDirective;
```

Defined in: [libs/ui/src/directives/scroll-to-error/ScrollToErrorTriggerDirective.ts:35](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/directives/scroll-to-error/ScrollToErrorTriggerDirective.ts#L35)

Constructs a new instance of the `ScrollToErrorTriggerDirective` class.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `registry?` | `ScrollToErrorRegistry` | Registry that resolves the associated validation scope. |
| `injector?` | `Injector` | Injector used to schedule post-render work. |

#### Returns

`ScrollToErrorTriggerDirective`

## Properties

### state

```ts
readonly state: InputSignal<ScrollToErrorState>;
```

Defined in: [libs/ui/src/directives/scroll-to-error/ScrollToErrorTriggerDirective.ts:50](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/directives/scroll-to-error/ScrollToErrorTriggerDirective.ts#L50)

Root Signal Forms state shared with the target validation scope.

## Methods

### onClick()

```ts
onClick(): void;
```

Defined in: [libs/ui/src/directives/scroll-to-error/ScrollToErrorTriggerDirective.ts:62](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/directives/scroll-to-error/ScrollToErrorTriggerDirective.ts#L62)

Requests error navigation after the action has run validation and Angular has rendered its result.

#### Returns

`void`
