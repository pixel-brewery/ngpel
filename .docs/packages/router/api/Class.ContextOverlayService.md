---
title: 'Class: ContextOverlayService'
generated: true
editUrl: false
---
# Class: ContextOverlayService

Defined in: [context-overlay/ContextOverlayService.ts:59](https://github.com/pixel-brewery/ngpel/blob/main/libs/router/src/context-overlay/ContextOverlayService.ts#L59)

Synchronizes a stack of contextual surfaces with the current browser URL. Register it once with
`provideContextOverlayRouting()` at application composition.

## Constructors

### Constructor

```ts
new ContextOverlayService(): ContextOverlayService;
```

Defined in: [context-overlay/ContextOverlayService.ts:84](https://github.com/pixel-brewery/ngpel/blob/main/libs/router/src/context-overlay/ContextOverlayService.ts#L84)

Starts synchronization and binds the mounted surfaces to the environment injector.

#### Returns

`ContextOverlayService`

## Accessors

### closed

#### Get Signature

```ts
get closed(): Observable<IContextOverlayState>;
```

Defined in: [context-overlay/ContextOverlayService.ts:125](https://github.com/pixel-brewery/ngpel/blob/main/libs/router/src/context-overlay/ContextOverlayService.ts#L125)

Emits the address of each overlay closed by its surface, for callers that only need to refresh related data.

##### Returns

`Observable`\<[`IContextOverlayState`](Interface.IContextOverlayState)\>

***

### closedOutcome

#### Get Signature

```ts
get closedOutcome(): Observable<IContextOverlayOutcome>;
```

Defined in: [context-overlay/ContextOverlayService.ts:130](https://github.com/pixel-brewery/ngpel/blob/main/libs/router/src/context-overlay/ContextOverlayService.ts#L130)

Emits interactive close outcomes. URL-driven closes and disposal are silent.

##### Returns

`Observable`\<[`IContextOverlayOutcome`](Interface.IContextOverlayOutcome)\>

## Methods

### hasTarget()

```ts
hasTarget(key): boolean;
```

Defined in: [context-overlay/ContextOverlayService.ts:143](https://github.com/pixel-brewery/ngpel/blob/main/libs/router/src/context-overlay/ContextOverlayService.ts#L143)

Checks whether a feature registered an overlay key, regardless of access to a particular address.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `key` | `string` | Semantic target key. |

#### Returns

`boolean`

Whether the key belongs to the overlay registry.

***

### identifyCreated()

```ts
identifyCreated(key, id): boolean;
```

Defined in: [context-overlay/ContextOverlayService.ts:192](https://github.com/pixel-brewery/ngpel/blob/main/libs/router/src/context-overlay/ContextOverlayService.ts#L192)

Promotes the mounted top create surface to a persisted identity without remounting it.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `key` | `string` | Key of the active create target. |
| `id` | `string` | Newly persisted resource identifier. |

#### Returns

`boolean`

Whether the active surface was updated.

***

### open()

```ts
open(
   key,
   id?,
   context?,
   transient?
): boolean;
```

Defined in: [context-overlay/ContextOverlayService.ts:156](https://github.com/pixel-brewery/ngpel/blob/main/libs/router/src/context-overlay/ContextOverlayService.ts#L156)

Opens a registered overlay above the current page and appends one browser history entry.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `key` | `string` | Registered target key. |
| `id?` | `string` | Identifier for a detail surface. Omit it for creation. |
| `context?` | `string` | Optional addressable feature context. |
| `transient?` | `unknown` | Optional in-memory data for this opening only. |

#### Returns

`boolean`

Whether the address was accepted.

***

### openFromUrl()

```ts
openFromUrl(url): boolean;
```

Defined in: [context-overlay/ContextOverlayService.ts:166](https://github.com/pixel-brewery/ngpel/blob/main/libs/router/src/context-overlay/ContextOverlayService.ts#L166)

Opens the top address of an in-scope resource URL over the current page.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `url` | `string` | Resource URL containing the overlay address. |

#### Returns

`boolean`

Whether the address was accepted.

***

### replaceTop()

```ts
replaceTop(
   key,
   id?,
   context?
): boolean;
```

Defined in: [context-overlay/ContextOverlayService.ts:181](https://github.com/pixel-brewery/ngpel/blob/main/libs/router/src/context-overlay/ContextOverlayService.ts#L181)

Switches the top overlay within the current browser history entry.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `key` | `string` | Registered target key. |
| `id?` | `string` | Identifier for a detail surface. Omit it for creation. |
| `context?` | `string` | Optional addressable feature context. |

#### Returns

`boolean`

Whether the replacement was accepted.
