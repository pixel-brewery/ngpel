---
title: 'Interface: IOffsetCollectionLimits'
generated: true
editUrl: false
---
# Interface: IOffsetCollectionLimits

Defined in: rx/pagination/IOffsetCollectionLimits.ts:2

Limits on a complete offset collection load.

## Properties

### maxItems?

```ts
readonly optional maxItems?: number;
```

Defined in: rx/pagination/IOffsetCollectionLimits.ts:7

Maximum number of accumulated items. Defaults to 100,000.

***

### maxPages?

```ts
readonly optional maxPages?: number;
```

Defined in: rx/pagination/IOffsetCollectionLimits.ts:4

Maximum number of page requests. Defaults to 1,000.
