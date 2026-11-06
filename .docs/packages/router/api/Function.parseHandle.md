---
title: 'Function: parseHandle()'
generated: true
editUrl: false
---
# Function: parseHandle()

```ts
function parseHandle(raw): IParsedHandle;
```

Defined in: [navigation/parseHandle.ts:27](https://github.com/pixel-brewery/ngpel/blob/main/libs/router/src/navigation/parseHandle.ts#L27)

Parses a [NavHandle](TypeAlias.NavHandle) into its scheme, value and query parameters. The scheme ends at the
**first** colon, so values that contain further colons — an `https://` URL, a namespaced command
id — survive intact.

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `raw` | [`NavHandle`](TypeAlias.NavHandle) | The handle to parse. |

## Returns

[`IParsedHandle`](Interface.IParsedHandle)

The parsed handle.

## Throws

Error when the handle carries no value or an unknown scheme.

## Example

```typescript
parseHandle('ext:https://example.test/docs?tab=api');
// { scheme: 'ext', path: 'https://example.test/docs', query: { tab: 'api' }, raw: '…' }
```
