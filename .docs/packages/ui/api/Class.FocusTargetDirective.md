---
title: 'Class: FocusTargetDirective'
generated: true
editUrl: false
---
# Class: FocusTargetDirective

Defined in: [libs/ui/src/directives/focus-target/FocusTargetDirective.ts:42](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/directives/focus-target/FocusTargetDirective.ts#L42)

Scrolls to and focuses a descendant of the host whenever a focus key is requested.

Descendants are marked with an attribute (by default `data-focus-target`) whose value is the
key. Setting the key, or bumping the monotonic request marker while the key stays the same,
schedules the focus after two animation frames so freshly rendered content has been laid out.
The element that finally receives focus is the marked element itself when it is focusable,
otherwise its first focusable descendant; the marked element is scrolled into view either way.
When the host itself carries the marker it is the target, which is how a page can move focus
to a freshly rendered status heading. When the primary marker is absent, the directive uses
the first rendered fallback marker in the supplied order.

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

Defined in: [libs/ui/src/directives/focus-target/FocusTargetDirective.ts:60](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/directives/focus-target/FocusTargetDirective.ts#L60)

Constructs a new instance of the `FocusTargetDirective` class.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `elementRef?` | `ElementRef`\<`HTMLElement`\> | The host element whose descendants are focus targets. |
| `destroyRef?` | `DestroyRef` | The destruction lifecycle used to cancel a pending focus. |

#### Returns

`FocusTargetDirective`

## Properties

### attribute

```ts
readonly attribute: InputSignal<string>;
```

Defined in: [libs/ui/src/directives/focus-target/FocusTargetDirective.ts:92](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/directives/focus-target/FocusTargetDirective.ts#L92)

The attribute that marks focus targets (defaults to `data-focus-target`).

***

### fallbacks

```ts
readonly fallbacks: InputSignal<readonly IFocusTargetMarker[]>;
```

Defined in: [libs/ui/src/directives/focus-target/FocusTargetDirective.ts:100](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/directives/focus-target/FocusTargetDirective.ts#L100)

Ordered alternate markers considered when the primary marker is absent.

***

### focusableSelector

```ts
readonly focusableSelector: InputSignal<string>;
```

Defined in: [libs/ui/src/directives/focus-target/FocusTargetDirective.ts:108](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/directives/focus-target/FocusTargetDirective.ts#L108)

The selector that identifies focusable descendants of a target.

***

### key

```ts
readonly key: InputSignal<string | null>;
```

Defined in: [libs/ui/src/directives/focus-target/FocusTargetDirective.ts:76](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/directives/focus-target/FocusTargetDirective.ts#L76)

The key of the descendant to focus; `null` or an empty string clears the pending request.

***

### request

```ts
readonly request: InputSignal<number>;
```

Defined in: [libs/ui/src/directives/focus-target/FocusTargetDirective.ts:84](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/directives/focus-target/FocusTargetDirective.ts#L84)

Monotonic request marker used to focus the same key again.

***

### scrollBlock

```ts
readonly scrollBlock: InputSignal<ScrollLogicalPosition | null>;
```

Defined in: [libs/ui/src/directives/focus-target/FocusTargetDirective.ts:124](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/directives/focus-target/FocusTargetDirective.ts#L124)

The vertical alignment used to scroll the target into view; `null` skips scrolling.

***

### selfFocusableSelector

```ts
readonly selfFocusableSelector: InputSignal<string | null>;
```

Defined in: [libs/ui/src/directives/focus-target/FocusTargetDirective.ts:116](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/directives/focus-target/FocusTargetDirective.ts#L116)

The selector for focusing the marked element itself. Defaults to the descendant selector.
