---
title: 'Type Alias: UrlParamCodec\<T\>'
generated: true
editUrl: false
---
# Type Alias: UrlParamCodec\<T\>

```ts
type UrlParamCodec<T> = IValueCodec<string | null, T>;
```

Defined in: [signals/UrlParamCodec.ts:23](https://github.com/pixel-brewery/ngpel/blob/main/libs/router/src/signals/UrlParamCodec.ts#L23)

A codec over the serialized representation of a URL parameter, where an absent parameter reaches
`parse()` as `null`. This is the same contract that backs Web Storage in
`@pixel-brewery/ngpel-core/storage`, so every codec of that package becomes a URL parameter
codec through `fromNullable(...)` — the router package deliberately ships no codec set of its own.

## Type Parameters

| Type Parameter | Description |
| ------ | ------ |
| `T` | The typed application value. |

## Example

```typescript
import { fromNullable, positiveIntegerCodec } from '@pixel-brewery/ngpel-core/storage';

const codec: UrlParamCodec<number> = fromNullable(positiveIntegerCodec);
```
