---
title: 'Class: ResourceNavigationRegistry'
generated: true
editUrl: false
---
# Class: ResourceNavigationRegistry

Defined in: [navigation/resource-navigation/ResourceNavigationRegistry.ts:18](https://github.com/pixel-brewery/ngpel/blob/main/libs/router/src/navigation/resource-navigation/ResourceNavigationRegistry.ts#L18)

Resolves feature-owned resource links by semantic target or source.

## Constructors

### Constructor

```ts
new ResourceNavigationRegistry(): ResourceNavigationRegistry;
```

Defined in: [navigation/resource-navigation/ResourceNavigationRegistry.ts:29](https://github.com/pixel-brewery/ngpel/blob/main/libs/router/src/navigation/resource-navigation/ResourceNavigationRegistry.ts#L29)

Indexes targets and source aliases contributed at application composition.

#### Returns

`ResourceNavigationRegistry`

## Methods

### resolve()

```ts
resolve(targetKey):
  | IResourceNavigationTarget
  | undefined;
```

Defined in: [navigation/resource-navigation/ResourceNavigationRegistry.ts:76](https://github.com/pixel-brewery/ngpel/blob/main/libs/router/src/navigation/resource-navigation/ResourceNavigationRegistry.ts#L76)

Finds a target by its semantic key.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `targetKey` | `string` | Registered target key. |

#### Returns

  \| [`IResourceNavigationTarget`](Interface.IResourceNavigationTarget)
  \| `undefined`

The target, if registered.

***

### resolveSource()

```ts
resolveSource(sourceKey):
  | IResourceNavigationSource
  | undefined;
```

Defined in: [navigation/resource-navigation/ResourceNavigationRegistry.ts:86](https://github.com/pixel-brewery/ngpel/blob/main/libs/router/src/navigation/resource-navigation/ResourceNavigationRegistry.ts#L86)

Finds the resource destination described by a source row.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `sourceKey` | `string` | Registered source alias. |

#### Returns

  \| [`IResourceNavigationSource`](Interface.IResourceNavigationSource)
  \| `undefined`

The target and identifier field, if registered.

***

### urlFor()

```ts
urlFor(targetKey, resourceId): string;
```

Defined in: [navigation/resource-navigation/ResourceNavigationRegistry.ts:98](https://github.com/pixel-brewery/ngpel/blob/main/libs/router/src/navigation/resource-navigation/ResourceNavigationRegistry.ts#L98)

Builds a canonical root-relative address for a registered resource.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `targetKey` | `string` | Registered target key. |
| `resourceId` | `string` | A nonempty identifier of at most 128 characters. |

#### Returns

`string`

The application URL, including its query and fragment.

#### Throws

Error if the target is unavailable, the identifier is invalid, the target denies the link or the URL is unsafe.
