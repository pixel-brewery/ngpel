---
title: 'Class: LegalLinksComponent'
generated: true
editUrl: false
---
# Class: LegalLinksComponent

Defined in: [libs/ui/src/components/legal-links/LegalLinksComponent.ts:102](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/legal-links/LegalLinksComponent.ts#L102)

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

Defined in: [libs/ui/src/components/legal-links/LegalLinksComponent.ts:121](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/legal-links/LegalLinksComponent.ts#L121)

Additional website-level links such as tenant-specific terms and conditions.
Contract attachments are intentionally outside this component's responsibility.

***

### alignment

```ts
readonly alignment: InputSignal<"start" | "center">;
```

Defined in: [libs/ui/src/components/legal-links/LegalLinksComponent.ts:139](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/legal-links/LegalLinksComponent.ts#L139)

Horizontal alignment used by the surrounding shell.

***

### ariaLabel

```ts
readonly ariaLabel: InputSignal<string>;
```

Defined in: [libs/ui/src/components/legal-links/LegalLinksComponent.ts:131](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/legal-links/LegalLinksComponent.ts#L131)

Accessible navigation label.

***

### firstRowSize

```ts
readonly firstRowSize: InputSignal<number | undefined>;
```

Defined in: [libs/ui/src/components/legal-links/LegalLinksComponent.ts:158](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/legal-links/LegalLinksComponent.ts#L158)

Number of links in the first fixed row. Remaining links form a second row. Omit for flexible wrapping.

***

### fixedRows

```ts
protected readonly fixedRows: Signal<boolean>;
```

Defined in: [libs/ui/src/components/legal-links/LegalLinksComponent.ts:164](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/legal-links/LegalLinksComponent.ts#L164)

***

### leadingSeparator

```ts
readonly leadingSeparator: InputSignal<boolean>;
```

Defined in: [libs/ui/src/components/legal-links/LegalLinksComponent.ts:155](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/legal-links/LegalLinksComponent.ts#L155)

Whether the first link is prefixed with a separator supplied by the surrounding sequence.

***

### linkRows

```ts
protected readonly linkRows: Signal<readonly (readonly ILegalLink[])[]>;
```

Defined in: [libs/ui/src/components/legal-links/LegalLinksComponent.ts:179](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/legal-links/LegalLinksComponent.ts#L179)

Legal links grouped into the configured display rows.

***

### links

```ts
readonly links: InputSignal<readonly ILegalLink[]>;
```

Defined in: [libs/ui/src/components/legal-links/LegalLinksComponent.ts:112](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/legal-links/LegalLinksComponent.ts#L112)

The website and legal navigation to render. Every product ships its own, so this package
carries no defaults.

***

### tone

```ts
readonly tone: InputSignal<"default" | "inverse">;
```

Defined in: [libs/ui/src/components/legal-links/LegalLinksComponent.ts:147](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/legal-links/LegalLinksComponent.ts#L147)

Color treatment for light and inverse shell backgrounds.
