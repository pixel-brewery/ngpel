---
title: 'Class: ContextOverlayService'
generated: true
editUrl: false
---
# Class: ContextOverlayService

Defined in: [context-overlay/ContextOverlayService.ts:45](https://github.com/pixel-brewery/ngpel/blob/main/libs/router/src/context-overlay/ContextOverlayService.ts#L45)

Synchronizes a stack of contextual surfaces with the current browser URL. Register it once with
`provideContextOverlayRouting()` at application composition.

## Constructors

### Constructor

```ts
new ContextOverlayService(): ContextOverlayService;
```

Defined in: [context-overlay/ContextOverlayService.ts:70](https://github.com/pixel-brewery/ngpel/blob/main/libs/router/src/context-overlay/ContextOverlayService.ts#L70)

Starts synchronization and binds the mounted surfaces to the environment injector.

#### Returns

`ContextOverlayService`

## Accessors

### closedOutcome

#### Get Signature

```ts
get closedOutcome(): Observable<IContextOverlayOutcome>;
```

Defined in: [context-overlay/ContextOverlayService.ts:111](https://github.com/pixel-brewery/ngpel/blob/main/libs/router/src/context-overlay/ContextOverlayService.ts#L111)

Emits interactive close outcomes. URL-driven closes and disposal are silent.

##### Returns

`Observable`\<[`IContextOverlayOutcome`](Interface.IContextOverlayOutcome)\>

## Methods

### identifyCreated()

```ts
identifyCreated(key, id): boolean;
```

Defined in: [context-overlay/ContextOverlayService.ts:164](https://github.com/pixel-brewery/ngpel/blob/main/libs/router/src/context-overlay/ContextOverlayService.ts#L164)

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

Defined in: [context-overlay/ContextOverlayService.ts:128](https://github.com/pixel-brewery/ngpel/blob/main/libs/router/src/context-overlay/ContextOverlayService.ts#L128)

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

Defined in: [context-overlay/ContextOverlayService.ts:138](https://github.com/pixel-brewery/ngpel/blob/main/libs/router/src/context-overlay/ContextOverlayService.ts#L138)

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

Defined in: [context-overlay/ContextOverlayService.ts:153](https://github.com/pixel-brewery/ngpel/blob/main/libs/router/src/context-overlay/ContextOverlayService.ts#L153)

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
