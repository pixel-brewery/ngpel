---
title: 'Class: FocusTargetDirective'
generated: true
editUrl: false
---
# Class: FocusTargetDirective

Defined in: [libs/ui/src/directives/focus-target/FocusTargetDirective.ts:40](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/directives/focus-target/FocusTargetDirective.ts#L40)

Scrolls to and focuses a descendant of the host whenever a focus key is requested.

Descendants are marked with an attribute (by default `data-focus-target`) whose value is the
key. Setting the key, or bumping the monotonic request marker while the key stays the same,
schedules the focus after two animation frames so freshly rendered content has been laid out.
The element that finally receives focus is the marked element itself when it is focusable,
otherwise its first focusable descendant; the marked element is scrolled into view either way.
When the host itself carries the marker it is the target, which is how a page can move focus
to a freshly rendered status heading.

## Example

```html
<form [ngpFocusTarget]="presenter.focusedField()" [ngpFocusTargetRequest]="presenter.focusRequest()">
    <label data-focus-target="email">E-mail <input type="email" /></label>
    <h2 data-focus-target="summary" tabindex="-1">Summary</h2>
</form>
```

## Constructors

### Constructor

```ts
new FocusTargetDirective(elementRef?, destroyRef?): FocusTargetDirective;
```

Defined in: [libs/ui/src/directives/focus-target/FocusTargetDirective.ts:58](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/directives/focus-target/FocusTargetDirective.ts#L58)

Constructs a new instance of the `FocusTargetDirective` class.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `elementRef` | `ElementRef`\<`HTMLElement`\> | The host element whose descendants are focus targets. |
| `destroyRef` | `DestroyRef` | The destruction lifecycle used to cancel a pending focus. |

#### Returns

`FocusTargetDirective`

## Properties

### attribute

```ts
readonly attribute: InputSignal<string>;
```

Defined in: [libs/ui/src/directives/focus-target/FocusTargetDirective.ts:90](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/directives/focus-target/FocusTargetDirective.ts#L90)

The attribute that marks focus targets (defaults to `data-focus-target`).

***

### focusableSelector

```ts
readonly focusableSelector: InputSignal<string>;
```

Defined in: [libs/ui/src/directives/focus-target/FocusTargetDirective.ts:98](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/directives/focus-target/FocusTargetDirective.ts#L98)

The selector that identifies focusable elements within a target.

***

### key

```ts
readonly key: InputSignal<string | null>;
```

Defined in: [libs/ui/src/directives/focus-target/FocusTargetDirective.ts:74](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/directives/focus-target/FocusTargetDirective.ts#L74)

The key of the descendant to focus; `null` or an empty string clears the pending request.

***

### request

```ts
readonly request: InputSignal<number>;
```

Defined in: [libs/ui/src/directives/focus-target/FocusTargetDirective.ts:82](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/directives/focus-target/FocusTargetDirective.ts#L82)

Monotonic request marker used to focus the same key again.

***

### scrollBlock

```ts
readonly scrollBlock: InputSignal<ScrollLogicalPosition | null>;
```

Defined in: [libs/ui/src/directives/focus-target/FocusTargetDirective.ts:106](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/directives/focus-target/FocusTargetDirective.ts#L106)

The vertical alignment used to scroll the target into view; `null` skips scrolling.
