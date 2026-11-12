---
title: 'Interface: IResourceNavigationTarget'
generated: true
editUrl: false
---
# Interface: IResourceNavigationTarget

Defined in: [navigation/resource-navigation/IResourceNavigationTarget.ts:6](https://github.com/pixel-brewery/ngpel/blob/main/libs/router/src/navigation/resource-navigation/IResourceNavigationTarget.ts#L6)

A feature-owned canonical address for a resource.

## Properties

### canNavigate?

```ts
readonly canNavigate?: (resourceId) => boolean;
```

Defined in: [navigation/resource-navigation/IResourceNavigationTarget.ts:19](https://github.com/pixel-brewery/ngpel/blob/main/libs/router/src/navigation/resource-navigation/IResourceNavigationTarget.ts#L19)

Optional application policy evaluated when building a link.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `resourceId` | `string` |

#### Returns

`boolean`

***

### createUrl

```ts
readonly createUrl: (resourceId) => string;
```

Defined in: [navigation/resource-navigation/IResourceNavigationTarget.ts:22](https://github.com/pixel-brewery/ngpel/blob/main/libs/router/src/navigation/resource-navigation/IResourceNavigationTarget.ts#L22)

Creates a root-relative application URL for the resource, including any overlay parameters.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `resourceId` | `string` |

#### Returns

`string`

***

### sources?

```ts
readonly sources?: readonly {
  idField: string;
  key: string;
}[];
```

Defined in: [navigation/resource-navigation/IResourceNavigationTarget.ts:11](https://github.com/pixel-brewery/ngpel/blob/main/libs/router/src/navigation/resource-navigation/IResourceNavigationTarget.ts#L11)

Source rows that identify the resource, including rows with a different primary identifier.

***

### targetKey

```ts
readonly targetKey: string;
```

Defined in: [navigation/resource-navigation/IResourceNavigationTarget.ts:8](https://github.com/pixel-brewery/ngpel/blob/main/libs/router/src/navigation/resource-navigation/IResourceNavigationTarget.ts#L8)

Semantic key used by other features to locate the resource.
