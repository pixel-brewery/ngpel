---
title: 'Class: InputHistoryNavigationDirective'
generated: true
editUrl: false
---
# Class: InputHistoryNavigationDirective

Defined in: [libs/ui/src/directives/input-history-navigation/InputHistoryNavigationDirective.ts:102](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/directives/input-history-navigation/InputHistoryNavigationDirective.ts#L102)

Adds shell-like submitted-value history navigation to `mosaik-chat-prompt-box` elements.

`ArrowUp` recalls older entries and `ArrowDown` recalls newer entries. Once the
newest entry is passed, the value that existed before navigation started is restored.

By default, navigation starts only while the control is empty. This prevents arrow-key
navigation inside an existing multi-line prompt from unexpectedly replacing user input.

## Example

```html
<mosaik-chat-prompt-box
    [ngpInputHistoryNavigation]="submittedPrompts()"
    [placeholder]="'Type a message...'" />
```

## Constructors

### Constructor

```ts
new InputHistoryNavigationDirective(): InputHistoryNavigationDirective;
```

#### Returns

`InputHistoryNavigationDirective`

## Properties

### disabled

```ts
readonly disabled: InputSignalWithTransform<boolean, unknown>;
```

Defined in: [libs/ui/src/directives/input-history-navigation/InputHistoryNavigationDirective.ts:150](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/directives/input-history-navigation/InputHistoryNavigationDirective.ts#L150)

Determines whether keyboard-based history navigation is disabled.

***

### history

```ts
readonly history: InputSignal<readonly string[]>;
```

Defined in: [libs/ui/src/directives/input-history-navigation/InputHistoryNavigationDirective.ts:140](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/directives/input-history-navigation/InputHistoryNavigationDirective.ts#L140)

Previously submitted values ordered from oldest to newest.

The directive does not modify this collection. Applications should update the
collection immutably after a prompt, command, or query has been submitted.

***

### navigated

```ts
readonly navigated: OutputEmitterRef<IInputHistoryNavigationEvent>;
```

Defined in: [libs/ui/src/directives/input-history-navigation/InputHistoryNavigationDirective.ts:174](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/directives/input-history-navigation/InputHistoryNavigationDirective.ts#L174)

Emits whenever a history value or the captured draft is written into the control.

***

### onlyWhenEmpty

```ts
readonly onlyWhenEmpty: InputSignalWithTransform<boolean, unknown>;
```

Defined in: [libs/ui/src/directives/input-history-navigation/InputHistoryNavigationDirective.ts:163](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/directives/input-history-navigation/InputHistoryNavigationDirective.ts#L163)

Determines whether a history session may begin only while the control is empty.

When disabled, `ArrowUp` can replace an unfinished draft and `ArrowDown` restores it.

## Methods

### onFocusOut()

```ts
protected onFocusOut(): void;
```

Defined in: [libs/ui/src/directives/input-history-navigation/InputHistoryNavigationDirective.ts:322](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/directives/input-history-navigation/InputHistoryNavigationDirective.ts#L322)

Ends navigation once focus leaves the editable control.

#### Returns

`void`

***

### onInput()

```ts
protected onInput(): void;
```

Defined in: [libs/ui/src/directives/input-history-navigation/InputHistoryNavigationDirective.ts:311](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/directives/input-history-navigation/InputHistoryNavigationDirective.ts#L311)

Cancels navigation after genuine user editing.

Synthetic input events dispatched by this directive are excluded so repeated
`ArrowUp` and `ArrowDown` actions remain part of the same navigation session.

#### Returns

`void`

***

### onKeydown()

```ts
protected onKeydown(event): void;
```

Defined in: [libs/ui/src/directives/input-history-navigation/InputHistoryNavigationDirective.ts:285](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/directives/input-history-navigation/InputHistoryNavigationDirective.ts#L285)

Handles keyboard navigation from the directive host element.

IME composition and modified arrow-key combinations remain untouched so the
directive does not break text composition or native selection shortcuts.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `event` | `KeyboardEvent` | Keyboard event raised by the chat input element. |

#### Returns

`void`

***

### recallNext()

```ts
recallNext(): boolean;
```

Defined in: [libs/ui/src/directives/input-history-navigation/InputHistoryNavigationDirective.ts:252](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/directives/input-history-navigation/InputHistoryNavigationDirective.ts#L252)

Recalls the next submitted value or restores the captured draft.

#### Returns

`boolean`

`true` when the keyboard action belongs to history navigation and its
browser default should be prevented.

***

### recallPrevious()

```ts
recallPrevious(): boolean;
```

Defined in: [libs/ui/src/directives/input-history-navigation/InputHistoryNavigationDirective.ts:202](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/directives/input-history-navigation/InputHistoryNavigationDirective.ts#L202)

Recalls the previous submitted value.

#### Returns

`boolean`

`true` when the keyboard action belongs to history navigation and its
browser default should be prevented.

***

### reset()

```ts
reset(): void;
```

Defined in: [libs/ui/src/directives/input-history-navigation/InputHistoryNavigationDirective.ts:190](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/directives/input-history-navigation/InputHistoryNavigationDirective.ts#L190)

Ends the active navigation session without changing the current control value.

This can be used after application-level actions such as submitting or clearing
the associated prompt.

#### Returns

`void`
