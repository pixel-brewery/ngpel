---
title: 'Function: connectRouterUrlChanges()'
generated: true
editUrl: false
---
# Function: connectRouterUrlChanges()

```ts
function connectRouterUrlChanges(
   location,
   router,
   listener
): () => void;
```

Defined in: [url/connectRouterUrlChanges.ts:27](https://github.com/pixel-brewery/ngpel/blob/main/libs/router/src/url/connectRouterUrlChanges.ts#L27)

Connects URL-driven UI state to the current URL and to every completed router navigation.

`Location.subscribe` only reports browser popstate events and therefore misses programmatic
router navigation. Direct `Location.go` calls are deliberately not observed because the caller
that issues them already applies the corresponding UI state.

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `location` | `Pick`\<`Location`, `"path"`\> | Angular location service, read once for the initial application URL. |
| `router` | `Pick`\<`Router`, `"events"`\> | Angular router whose completed navigations drive every later synchronization. |
| `listener` | (`url`) => `void` | Synchronization callback receiving the current application URL. |

## Returns

A function that disconnects the router listener.

() => `void`

## Example

```typescript
const disconnect = connectRouterUrlChanges(inject(Location), inject(Router), (url) => this.applyUrl(url));
inject(DestroyRef).onDestroy(disconnect);
```
