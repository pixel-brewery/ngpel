---
title: 'Interface: IPagePathLevel'
generated: true
editUrl: false
---
# Interface: IPagePathLevel

Defined in: libs/ui/src/components/page-path/IPagePathLevel.ts:4

One level of a page path. The last level names the current page.

## Properties

### command?

```ts
readonly optional command?: Command<void> | null;
```

Defined in: libs/ui/src/components/page-path/IPagePathLevel.ts:8

Optional navigation command for a parent level.

***

### label

```ts
readonly label: string;
```

Defined in: libs/ui/src/components/page-path/IPagePathLevel.ts:6

Display label supplied by the feature.
