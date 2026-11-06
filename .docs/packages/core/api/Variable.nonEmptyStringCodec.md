---
title: 'Variable: nonEmptyStringCodec'
generated: true
editUrl: false
---
# Variable: nonEmptyStringCodec

```ts
const nonEmptyStringCodec: LocalStorageCodec<string>;
```

Defined in: [storage/codecs/nonEmptyStringCodec.ts:13](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/storage/codecs/nonEmptyStringCodec.ts#L13)

Accepts meaningful textual values while rejecting empty or whitespace-only persisted state.
Values are trimmed on both sides of the boundary.
