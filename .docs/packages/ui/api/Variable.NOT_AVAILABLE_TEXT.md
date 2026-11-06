---
title: 'Variable: NOT\_AVAILABLE\_TEXT'
generated: true
editUrl: false
---
# Variable: NOT\_AVAILABLE\_TEXT

```ts
const NOT_AVAILABLE_TEXT: InjectionToken<string>;
```

Defined in: [libs/ui/src/pipes/text/NOT\_AVAILABLE\_TEXT.ts:18](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/pipes/text/NOT_AVAILABLE_TEXT.ts#L18)

The text [NotAvailablePipe](Class.NotAvailablePipe) renders for a missing value. Defaults to the locale-neutral
`n/a`; provide a translated string once the application knows its locale.

## Example

```typescript
providers: [{ provide: NOT_AVAILABLE_TEXT, useValue: '—' }]
```
