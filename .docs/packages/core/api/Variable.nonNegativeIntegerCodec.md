---
title: 'Variable: nonNegativeIntegerCodec'
generated: true
editUrl: false
---
# Variable: nonNegativeIntegerCodec

```ts
const nonNegativeIntegerCodec: LocalStorageCodec<number>;
```

Defined in: [storage/codecs/nonNegativeIntegerCodec.ts:14](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/storage/codecs/nonNegativeIntegerCodec.ts#L14)

Persists zero-based offsets and counters as safe integers (`0`, `1`, ...). Only the canonical
decimal representation parses, matching `positiveIntegerCodec`: a padded `"007"` did not come
from this codec and is treated as foreign data rather than silently coerced.
