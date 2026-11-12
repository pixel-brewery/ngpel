---
title: 'Interface: IResourceNavigationSource'
generated: true
editUrl: false
---
# Interface: IResourceNavigationSource

Defined in: [navigation/resource-navigation/IResourceNavigationSource.ts:4](https://github.com/pixel-brewery/ngpel/blob/main/libs/router/src/navigation/resource-navigation/IResourceNavigationSource.ts#L4)

The target and identifier field associated with a registered source.

## Properties

### idField

```ts
readonly idField: string;
```

Defined in: [navigation/resource-navigation/IResourceNavigationSource.ts:9](https://github.com/pixel-brewery/ngpel/blob/main/libs/router/src/navigation/resource-navigation/IResourceNavigationSource.ts#L9)

Field on the source row that identifies the destination resource.

***

### target

```ts
readonly target: IResourceNavigationTarget;
```

Defined in: [navigation/resource-navigation/IResourceNavigationSource.ts:6](https://github.com/pixel-brewery/ngpel/blob/main/libs/router/src/navigation/resource-navigation/IResourceNavigationSource.ts#L6)

Destination described by the source row.
