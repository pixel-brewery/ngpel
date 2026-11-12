---
title: 'Interface: IOffsetCollectionLimits'
generated: true
editUrl: false
---
# Interface: IOffsetCollectionLimits

Defined in: [rx/pagination/IOffsetCollectionLimits.ts:2](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/rx/pagination/IOffsetCollectionLimits.ts#L2)

Limits on a complete offset collection load.

## Properties

### maxItems?

```ts
readonly maxItems?: number;
```

Defined in: [rx/pagination/IOffsetCollectionLimits.ts:7](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/rx/pagination/IOffsetCollectionLimits.ts#L7)

Maximum number of accumulated items. Defaults to 100,000.

***

### maxPages?

```ts
readonly maxPages?: number;
```

Defined in: [rx/pagination/IOffsetCollectionLimits.ts:4](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/rx/pagination/IOffsetCollectionLimits.ts#L4)

Maximum number of page requests. Defaults to 1,000.
