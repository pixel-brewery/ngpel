---
title: 'Interface: ILegalLink'
generated: true
editUrl: false
---
# Interface: ILegalLink

Defined in: [libs/ui/src/components/legal-links/ILegalLink.ts:6](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/legal-links/ILegalLink.ts#L6)

Describes a trusted website-level legal or company link.

## Properties

### label

```ts
readonly label: string;
```

Defined in: [libs/ui/src/components/legal-links/ILegalLink.ts:8](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/legal-links/ILegalLink.ts#L8)

Human-readable label and fallback when no translation is supplied.

***

### openInNewTab?

```ts
readonly openInNewTab?: boolean;
```

Defined in: [libs/ui/src/components/legal-links/ILegalLink.ts:27](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/legal-links/ILegalLink.ts#L27)

Whether the destination opens in a separate browser context.

***

### translationKey?

```ts
readonly translationKey?: string;
```

Defined in: [libs/ui/src/components/legal-links/ILegalLink.ts:11](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/legal-links/ILegalLink.ts#L11)

Optional translation key resolved in the surrounding application.

***

### url

```ts
readonly url: string;
```

Defined in: [libs/ui/src/components/legal-links/ILegalLink.ts:19](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/legal-links/ILegalLink.ts#L19)

Trusted destination URL.
