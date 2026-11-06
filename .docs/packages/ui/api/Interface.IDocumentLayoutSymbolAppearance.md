---
title: 'Interface: IDocumentLayoutSymbolAppearance'
generated: true
editUrl: false
---
# Interface: IDocumentLayoutSymbolAppearance

Defined in: [libs/ui/src/components/document-layout-symbol/IDocumentLayoutSymbolAppearance.ts:6](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/document-layout-symbol/IDocumentLayoutSymbolAppearance.ts#L6)

Presentation-only appearance contract for the compact document-layout symbol.

## Properties

### accentColor

```ts
readonly accentColor: string;
```

Defined in: [libs/ui/src/components/document-layout-symbol/IDocumentLayoutSymbolAppearance.ts:29](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/document-layout-symbol/IDocumentLayoutSymbolAppearance.ts#L29)

Secondary highlight color.

***

### footerStyle

```ts
readonly footerStyle: "PLAIN" | "COLUMNS" | "BAND";
```

Defined in: [libs/ui/src/components/document-layout-symbol/IDocumentLayoutSymbolAppearance.ts:85](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/document-layout-symbol/IDocumentLayoutSymbolAppearance.ts#L85)

Footer composition.

***

### headerStyle

```ts
readonly headerStyle: "CLASSIC" | "SPLIT" | "CENTERED" | "SIDE" | "MINIMAL";
```

Defined in: [libs/ui/src/components/document-layout-symbol/IDocumentLayoutSymbolAppearance.ts:45](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/document-layout-symbol/IDocumentLayoutSymbolAppearance.ts#L45)

Header composition used by the symbol.

***

### itemStyle

```ts
readonly itemStyle: "ROWS" | "COMPACT_ROWS" | "CARDS";
```

Defined in: [libs/ui/src/components/document-layout-symbol/IDocumentLayoutSymbolAppearance.ts:69](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/document-layout-symbol/IDocumentLayoutSymbolAppearance.ts#L69)

Line-item representation.

***

### logoPlacement

```ts
readonly logoPlacement: "START" | "CENTER" | "END" | "FOOTER" | "NONE";
```

Defined in: [libs/ui/src/components/document-layout-symbol/IDocumentLayoutSymbolAppearance.ts:53](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/document-layout-symbol/IDocumentLayoutSymbolAppearance.ts#L53)

Logo placeholder position.

***

### mutedColor

```ts
readonly mutedColor: string;
```

Defined in: [libs/ui/src/components/document-layout-symbol/IDocumentLayoutSymbolAppearance.ts:37](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/document-layout-symbol/IDocumentLayoutSymbolAppearance.ts#L37)

Secondary line color.

***

### partyColumns

```ts
readonly partyColumns: 1 | 2;
```

Defined in: [libs/ui/src/components/document-layout-symbol/IDocumentLayoutSymbolAppearance.ts:61](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/document-layout-symbol/IDocumentLayoutSymbolAppearance.ts#L61)

Number of party columns represented by the symbol.

***

### primaryColor

```ts
readonly primaryColor: string;
```

Defined in: [libs/ui/src/components/document-layout-symbol/IDocumentLayoutSymbolAppearance.ts:21](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/document-layout-symbol/IDocumentLayoutSymbolAppearance.ts#L21)

Main brand color.

***

### showAddressLine

```ts
readonly showAddressLine: boolean;
```

Defined in: [libs/ui/src/components/document-layout-symbol/IDocumentLayoutSymbolAppearance.ts:93](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/document-layout-symbol/IDocumentLayoutSymbolAppearance.ts#L93)

Indicates whether an address line is represented below the header.

***

### showPageNumber

```ts
readonly showPageNumber: boolean;
```

Defined in: [libs/ui/src/components/document-layout-symbol/IDocumentLayoutSymbolAppearance.ts:101](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/document-layout-symbol/IDocumentLayoutSymbolAppearance.ts#L101)

Indicates whether a page-number marker is represented in the footer.

***

### surfaceColor

```ts
readonly surfaceColor: string;
```

Defined in: [libs/ui/src/components/document-layout-symbol/IDocumentLayoutSymbolAppearance.ts:13](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/document-layout-symbol/IDocumentLayoutSymbolAppearance.ts#L13)

Paper color.

***

### totalsAlignment

```ts
readonly totalsAlignment: "START" | "END" | "STRETCH";
```

Defined in: [libs/ui/src/components/document-layout-symbol/IDocumentLayoutSymbolAppearance.ts:77](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/document-layout-symbol/IDocumentLayoutSymbolAppearance.ts#L77)

Totals placeholder alignment.
