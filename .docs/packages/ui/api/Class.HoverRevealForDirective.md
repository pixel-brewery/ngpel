---
title: 'Class: HoverRevealForDirective'
generated: true
editUrl: false
---
# Class: HoverRevealForDirective

Defined in: [libs/ui/src/directives/hover-reveal-for/HoverRevealForDirective.ts:36](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/directives/hover-reveal-for/HoverRevealForDirective.ts#L36)

Reveals its host element when the specified area is hovered or receives focus.

Attach this directive to an element that should remain hidden until a related area receives
pointer or keyboard focus. Typical use cases are row-level action buttons in tables or cards
whose actions appear contextually.

The directive preserves the host's layout while coordinating opacity and pointer events, so the
host remains focusable and keyboard focus can reveal it.

## Example

```html
<tr #row>
    <td>
        <div [ngpHoverRevealFor]="row">
            <button type="button">Delete</button>
        </div>
    </td>
</tr>
```

## Implements

- `OnInit`
- `AfterViewInit`

## Constructors

### Constructor

```ts
new HoverRevealForDirective(
   elementRef?,
   renderer?,
   destroyRef?
): HoverRevealForDirective;
```

Defined in: [libs/ui/src/directives/hover-reveal-for/HoverRevealForDirective.ts:57](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/directives/hover-reveal-for/HoverRevealForDirective.ts#L57)

Constructs a new instance of the `HoverRevealForDirective` class.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `elementRef?` | `ElementRef`\<`HTMLElement`\> | The host element that is revealed. |
| `renderer?` | `Renderer2` | The renderer used to listen and to apply the visual state. |
| `destroyRef?` | `DestroyRef` | The destruction lifecycle used to release listeners. |

#### Returns

`HoverRevealForDirective`

## Properties

### for

```ts
readonly for: InputSignal<HoverRevealTarget>;
```

Defined in: [libs/ui/src/directives/hover-reveal-for/HoverRevealForDirective.ts:79](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/directives/hover-reveal-for/HoverRevealForDirective.ts#L79)

Element reference, native element or component to monitor for pointer and focus events.
While the user hovers over or focuses within this target, the directive host becomes visible.

## Methods

### ngAfterViewInit()

```ts
ngAfterViewInit(): void;
```

Defined in: [libs/ui/src/directives/hover-reveal-for/HoverRevealForDirective.ts:99](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/directives/hover-reveal-for/HoverRevealForDirective.ts#L99)

Binds pointer and focus listeners once the view has been initialised.

#### Returns

`void`

#### Implementation of

`AfterViewInit.ngAfterViewInit`

***

### ngOnInit()

```ts
ngOnInit(): void;
```

Defined in: [libs/ui/src/directives/hover-reveal-for/HoverRevealForDirective.ts:90](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/directives/hover-reveal-for/HoverRevealForDirective.ts#L90)

Hides the host element on initialisation.

#### Returns

`void`

#### Implementation of

`OnInit.ngOnInit`
