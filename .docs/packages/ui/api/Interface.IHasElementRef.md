---
title: 'Interface: IHasElementRef'
generated: true
editUrl: false
---
# Interface: IHasElementRef

Defined in: [libs/ui/src/directives/hover-reveal-for/IHasElementRef.ts:13](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/directives/hover-reveal-for/IHasElementRef.ts#L13)

Represents any object that exposes a native element reference, which lets the hover-reveal
directive accept Angular components that inject and expose their `ElementRef`.

## Properties

### elementRef

```ts
readonly elementRef: ElementRef<HTMLElement>;
```

Defined in: [libs/ui/src/directives/hover-reveal-for/IHasElementRef.ts:19](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/directives/hover-reveal-for/IHasElementRef.ts#L19)

The element reference of the object.
