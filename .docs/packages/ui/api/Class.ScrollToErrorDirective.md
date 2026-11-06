---
title: 'Class: ScrollToErrorDirective'
generated: true
editUrl: false
---
# Class: ScrollToErrorDirective

Defined in: [libs/ui/src/directives/scroll-to-error/ScrollToErrorDirective.ts:33](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/directives/scroll-to-error/ScrollToErrorDirective.ts#L33)

Defines a generic validation scope and reveals its first visible invalid control.

Apply the directive to a form or any container that owns the relevant controls. Triggers outside
the scope can associate with it through `ScrollToErrorTriggerDirective` by binding the
same root Signal Forms state.

## Implements

- `OnDestroy`
- `OnInit`

## Constructors

### Constructor

```ts
new ScrollToErrorDirective(
   elementRef?,
   scrollDispatcher?,
   registry?,
   injector?,
   destroyRef?
): ScrollToErrorDirective;
```

Defined in: [libs/ui/src/directives/scroll-to-error/ScrollToErrorDirective.ts:57](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/directives/scroll-to-error/ScrollToErrorDirective.ts#L57)

Constructs a new instance of the `ScrollToErrorDirective` class.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `elementRef` | `ElementRef`\<`HTMLElement`\> | Element that scopes invalid-control discovery. |
| `scrollDispatcher` | `ScrollDispatcher` | Dispatcher used to discover registered CDK scroll containers. |
| `registry` | `ScrollToErrorRegistry` | Registry used by triggers outside the validation scope. |
| `injector` | `Injector` | Injector used to schedule post-render work. |
| `destroyRef` | `DestroyRef` | Lifecycle used to dispose one-shot scroll listeners. |

#### Returns

`ScrollToErrorDirective`

## Properties

### state

```ts
readonly state: InputSignal<ScrollToErrorState>;
```

Defined in: [libs/ui/src/directives/scroll-to-error/ScrollToErrorDirective.ts:81](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/directives/scroll-to-error/ScrollToErrorDirective.ts#L81)

Root Signal Forms state associated with this validation scope.

## Methods

### ngOnDestroy()

```ts
ngOnDestroy(): void;
```

Defined in: [libs/ui/src/directives/scroll-to-error/ScrollToErrorDirective.ts:102](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/directives/scroll-to-error/ScrollToErrorDirective.ts#L102)

Removes the validation scope from the cross-DOM trigger registry.

#### Returns

`void`

#### Implementation of

```ts
OnDestroy.ngOnDestroy
```

***

### ngOnInit()

```ts
ngOnInit(): void;
```

Defined in: [libs/ui/src/directives/scroll-to-error/ScrollToErrorDirective.ts:92](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/directives/scroll-to-error/ScrollToErrorDirective.ts#L92)

Registers the validation scope after Angular has initialized its required input.

#### Returns

`void`

#### Implementation of

```ts
OnInit.ngOnInit
```

***

### onSubmit()

```ts
onSubmit(): void;
```

Defined in: [libs/ui/src/directives/scroll-to-error/ScrollToErrorDirective.ts:114](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/directives/scroll-to-error/ScrollToErrorDirective.ts#L114)

Supports native form submission when no separate trigger is needed.

#### Returns

`void`

***

### revealFirstInvalidControl()

```ts
revealFirstInvalidControl(): void;
```

Defined in: [libs/ui/src/directives/scroll-to-error/ScrollToErrorDirective.ts:125](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/directives/scroll-to-error/ScrollToErrorDirective.ts#L125)

Reveals and focuses the first visible invalid control in this scope.

#### Returns

`void`

#### Implementation of

```ts
IScrollToErrorTarget.revealFirstInvalidControl
```
