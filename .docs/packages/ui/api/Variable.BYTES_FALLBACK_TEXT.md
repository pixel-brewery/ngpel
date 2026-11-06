---
title: 'Variable: BYTES\_FALLBACK\_TEXT'
generated: true
editUrl: false
---
# Variable: BYTES\_FALLBACK\_TEXT

```ts
const BYTES_FALLBACK_TEXT: InjectionToken<string>;
```

Defined in: [libs/ui/src/pipes/bytes/BYTES\_FALLBACK\_TEXT.ts:19](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/pipes/bytes/BYTES_FALLBACK_TEXT.ts#L19)

The text [BytesPipe](Class.BytesPipe) renders for an unknown size, that is `null`, `undefined` or a
non-finite number. Defaults to `0 B`; provide a translated string such as "measuring…" where a
size is still being determined.

## Example

```typescript
providers: [{ provide: BYTES_FALLBACK_TEXT, useValue: '—' }]
```
