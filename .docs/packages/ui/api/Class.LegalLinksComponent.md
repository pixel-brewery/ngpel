---
title: 'Class: LegalLinksComponent'
generated: true
editUrl: false
---
# Class: LegalLinksComponent

Defined in: [libs/ui/src/components/legal-links/LegalLinksComponent.ts:87](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/legal-links/LegalLinksComponent.ts#L87)

Renders trusted website-level legal navigation without accepting HTML content.

## Constructors

### Constructor

```ts
new LegalLinksComponent(): LegalLinksComponent;
```

#### Returns

`LegalLinksComponent`

## Properties

### additionalLinks

```ts
readonly additionalLinks: InputSignal<readonly ILegalLink[]>;
```

Defined in: [libs/ui/src/components/legal-links/LegalLinksComponent.ts:106](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/legal-links/LegalLinksComponent.ts#L106)

Additional website-level links such as tenant-specific terms and conditions.
Contract attachments are intentionally outside this component's responsibility.

***

### alignment

```ts
readonly alignment: InputSignal<"start" | "center">;
```

Defined in: [libs/ui/src/components/legal-links/LegalLinksComponent.ts:124](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/legal-links/LegalLinksComponent.ts#L124)

Horizontal alignment used by the surrounding shell.

***

### ariaLabel

```ts
readonly ariaLabel: InputSignal<string>;
```

Defined in: [libs/ui/src/components/legal-links/LegalLinksComponent.ts:116](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/legal-links/LegalLinksComponent.ts#L116)

Accessible navigation label.

***

### leadingSeparator

```ts
readonly leadingSeparator: InputSignal<boolean>;
```

Defined in: [libs/ui/src/components/legal-links/LegalLinksComponent.ts:140](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/legal-links/LegalLinksComponent.ts#L140)

Whether the first link is prefixed with a separator supplied by the surrounding sequence.

***

### links

```ts
readonly links: InputSignal<readonly ILegalLink[]>;
```

Defined in: [libs/ui/src/components/legal-links/LegalLinksComponent.ts:97](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/legal-links/LegalLinksComponent.ts#L97)

The website and legal navigation to render. Every product ships its own, so this package
carries no defaults.

***

### tone

```ts
readonly tone: InputSignal<"default" | "inverse">;
```

Defined in: [libs/ui/src/components/legal-links/LegalLinksComponent.ts:132](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/legal-links/LegalLinksComponent.ts#L132)

Color treatment for light and inverse shell backgrounds.

## Accessors

### allLinks

#### Get Signature

```ts
get protected allLinks(): Signal<readonly ILegalLink[]>;
```

Defined in: [libs/ui/src/components/legal-links/LegalLinksComponent.ts:157](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/legal-links/LegalLinksComponent.ts#L157)

Combined legal navigation links visible to the template.

##### Returns

`Signal`\<readonly [`ILegalLink`](Interface.ILegalLink)[]\>
