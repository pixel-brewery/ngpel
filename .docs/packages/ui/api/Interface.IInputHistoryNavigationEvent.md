---
title: 'Interface: IInputHistoryNavigationEvent'
generated: true
editUrl: false
---
# Interface: IInputHistoryNavigationEvent

Defined in: [libs/ui/src/directives/input-history-navigation/InputHistoryNavigationDirective.ts:16](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/directives/input-history-navigation/InputHistoryNavigationDirective.ts#L16)

Describes a value recalled through input history navigation.

## Properties

### direction

```ts
readonly direction: InputHistoryNavigationDirection;
```

Defined in: [libs/ui/src/directives/input-history-navigation/InputHistoryNavigationDirective.ts:31](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/directives/input-history-navigation/InputHistoryNavigationDirective.ts#L31)

Navigation operation that produced the value.

***

### historyIndex

```ts
readonly historyIndex: number | null;
```

Defined in: [libs/ui/src/directives/input-history-navigation/InputHistoryNavigationDirective.ts:39](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/directives/input-history-navigation/InputHistoryNavigationDirective.ts#L39)

Index in the history collection, or `null` when the original draft was restored.

***

### value

```ts
readonly value: string;
```

Defined in: [libs/ui/src/directives/input-history-navigation/InputHistoryNavigationDirective.ts:23](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/directives/input-history-navigation/InputHistoryNavigationDirective.ts#L23)

Value written into the editable control.
