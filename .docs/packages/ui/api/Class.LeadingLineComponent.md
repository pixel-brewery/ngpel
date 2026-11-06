---
title: 'Class: LeadingLineComponent'
generated: true
editUrl: false
---
# Class: LeadingLineComponent

Defined in: libs/ui/src/components/leading-line/LeadingLineComponent.ts:33

Marks nested content with a narrow vertical line instead of a frame.

The line owns how nesting depth is expressed in color. Consumers only supply the level, so the gradation
can change here without touching the components that render nested levels.

## Constructors

### Constructor

```ts
new LeadingLineComponent(): LeadingLineComponent;
```

#### Returns

`LeadingLineComponent`

## Properties

### color

```ts
protected readonly color: Signal<string>;
```

Defined in: libs/ui/src/components/leading-line/LeadingLineComponent.ts:50

Color of the line resolved from the nesting level.

***

### level

```ts
readonly level: InputSignal<number>;
```

Defined in: libs/ui/src/components/leading-line/LeadingLineComponent.ts:42

Nesting level of the marked content, where the first nested level is `2`.
