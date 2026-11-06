---
title: 'Class: ColorSelectorComponentIntl'
generated: true
editUrl: false
---
# Class: ColorSelectorComponentIntl

Defined in: [libs/ui/src/components/color-selector/ColorSelectorComponentIntl.ts:15](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/color-selector/ColorSelectorComponentIntl.ts#L15)

Internationalization labels for the color selector component.

## Constructors

### Constructor

```ts
new ColorSelectorComponentIntl(): ColorSelectorComponentIntl;
```

Defined in: [libs/ui/src/components/color-selector/ColorSelectorComponentIntl.ts:30](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/color-selector/ColorSelectorComponentIntl.ts#L30)

Constructs a new instance of the `ColorSelectorComponentIntl` class.

#### Returns

`ColorSelectorComponentIntl`

## Accessors

### changes

#### Get Signature

```ts
get changes(): Subject<void>;
```

Defined in: [libs/ui/src/components/color-selector/ColorSelectorComponentIntl.ts:45](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/color-selector/ColorSelectorComponentIntl.ts#L45)

Emits when any label changes.

##### Returns

`Subject`\<`void`\>

***

### colorAriaLabel

#### Get Signature

```ts
get colorAriaLabel(): string;
```

Defined in: [libs/ui/src/components/color-selector/ColorSelectorComponentIntl.ts:54](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/color-selector/ColorSelectorComponentIntl.ts#L54)

Aria label template for color swatch buttons. Use `{0}` as placeholder for the color value.

##### Returns

`string`
