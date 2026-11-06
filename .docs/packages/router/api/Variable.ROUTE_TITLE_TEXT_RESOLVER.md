---
title: 'Variable: ROUTE\_TITLE\_TEXT\_RESOLVER'
generated: true
editUrl: false
---
# Variable: ROUTE\_TITLE\_TEXT\_RESOLVER

```ts
const ROUTE_TITLE_TEXT_RESOLVER: InjectionToken<IRouteTitleTextResolver>;
```

Defined in: [title/ROUTE\_TITLE\_TEXT\_RESOLVER.ts:21](https://github.com/pixel-brewery/ngpel/blob/main/libs/router/src/title/ROUTE_TITLE_TEXT_RESOLVER.ts#L21)

Injection token for the [IRouteTitleTextResolver](Interface.IRouteTitleTextResolver). Defaults to an identity resolver.

## Example

```typescript
{ provide: ROUTE_TITLE_TEXT_RESOLVER, useFactory: () => {
      const translations = inject(TranslationService);
      return { resolve: (text: string): string => translations.translate(text) };
  } }
```
