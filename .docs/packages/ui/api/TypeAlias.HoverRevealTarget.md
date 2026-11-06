---
title: 'Type Alias: HoverRevealTarget'
generated: true
editUrl: false
---
# Type Alias: HoverRevealTarget

```ts
type HoverRevealTarget =
  | ElementRef<HTMLElement>
  | HTMLElement
  | IHasElementRef
  | null;
```

Defined in: [libs/ui/src/directives/hover-reveal-for/HoverRevealTarget.ts:14](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/directives/hover-reveal-for/HoverRevealTarget.ts#L14)

Union of every value the hover-reveal directive can observe: an Angular `ElementRef`, a raw
`HTMLElement`, a component exposing an `elementRef`, or `null` to detach.
