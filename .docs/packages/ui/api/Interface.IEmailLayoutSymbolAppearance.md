---
title: 'Interface: IEmailLayoutSymbolAppearance'
generated: true
editUrl: false
---
# Interface: IEmailLayoutSymbolAppearance

Defined in: [libs/ui/src/components/email-layout-symbol/IEmailLayoutSymbolAppearance.ts:6](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/email-layout-symbol/IEmailLayoutSymbolAppearance.ts#L6)

Presentation-only appearance contract for the compact email-layout symbol.

## Properties

### accentPosition

```ts
readonly accentPosition: "START" | "END" | "NONE" | "TOP" | "BOTTOM";
```

Defined in: [libs/ui/src/components/email-layout-symbol/IEmailLayoutSymbolAppearance.ts:53](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/email-layout-symbol/IEmailLayoutSymbolAppearance.ts#L53)

Position of the dominant color accent.

***

### actionAlignment

```ts
readonly actionAlignment: "START" | "CENTER" | "END" | "STRETCH";
```

Defined in: [libs/ui/src/components/email-layout-symbol/IEmailLayoutSymbolAppearance.ts:77](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/email-layout-symbol/IEmailLayoutSymbolAppearance.ts#L77)

Visual alignment of the action placeholder.

***

### backgroundColor

```ts
readonly backgroundColor: string;
```

Defined in: [libs/ui/src/components/email-layout-symbol/IEmailLayoutSymbolAppearance.ts:13](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/email-layout-symbol/IEmailLayoutSymbolAppearance.ts#L13)

Outer canvas color.

***

### compact

```ts
readonly compact: boolean;
```

Defined in: [libs/ui/src/components/email-layout-symbol/IEmailLayoutSymbolAppearance.ts:101](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/email-layout-symbol/IEmailLayoutSymbolAppearance.ts#L101)

Indicates whether the symbol uses compact spacing.

***

### contentAlignment

```ts
readonly contentAlignment: "START" | "CENTER" | "END";
```

Defined in: [libs/ui/src/components/email-layout-symbol/IEmailLayoutSymbolAppearance.ts:69](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/email-layout-symbol/IEmailLayoutSymbolAppearance.ts#L69)

Visual alignment of the content lines.

***

### footerTone

```ts
readonly footerTone: "SURFACE" | "MUTED" | "PRIMARY";
```

Defined in: [libs/ui/src/components/email-layout-symbol/IEmailLayoutSymbolAppearance.ts:85](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/email-layout-symbol/IEmailLayoutSymbolAppearance.ts#L85)

Footer surface treatment.

***

### framed

```ts
readonly framed: boolean;
```

Defined in: [libs/ui/src/components/email-layout-symbol/IEmailLayoutSymbolAppearance.ts:93](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/email-layout-symbol/IEmailLayoutSymbolAppearance.ts#L93)

Indicates whether the inner message surface has a visible frame.

***

### logoAlignment

```ts
readonly logoAlignment: "START" | "CENTER" | "END";
```

Defined in: [libs/ui/src/components/email-layout-symbol/IEmailLayoutSymbolAppearance.ts:61](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/email-layout-symbol/IEmailLayoutSymbolAppearance.ts#L61)

Visual alignment of the logo placeholder.

***

### mutedColor

```ts
readonly mutedColor: string;
```

Defined in: [libs/ui/src/components/email-layout-symbol/IEmailLayoutSymbolAppearance.ts:45](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/email-layout-symbol/IEmailLayoutSymbolAppearance.ts#L45)

Secondary line and frame color.

***

### primaryColor

```ts
readonly primaryColor: string;
```

Defined in: [libs/ui/src/components/email-layout-symbol/IEmailLayoutSymbolAppearance.ts:29](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/email-layout-symbol/IEmailLayoutSymbolAppearance.ts#L29)

Main accent color.

***

### primaryContrastColor

```ts
readonly primaryContrastColor: string;
```

Defined in: [libs/ui/src/components/email-layout-symbol/IEmailLayoutSymbolAppearance.ts:37](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/email-layout-symbol/IEmailLayoutSymbolAppearance.ts#L37)

Color rendered on primary surfaces.

***

### surfaceColor

```ts
readonly surfaceColor: string;
```

Defined in: [libs/ui/src/components/email-layout-symbol/IEmailLayoutSymbolAppearance.ts:21](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/email-layout-symbol/IEmailLayoutSymbolAppearance.ts#L21)

Inner message surface color.
