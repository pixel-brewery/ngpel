---
title: 'Type Alias: IntlTranslationMap\<TIntl\>'
generated: true
editUrl: false
---
# Type Alias: IntlTranslationMap\<TIntl\>

```ts
type IntlTranslationMap<TIntl> = Partial<Record<IntlLabelKey<TIntl>, string>>;
```

Defined in: [libs/ui/src/intl/IntlTranslationMap.ts:15](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/intl/IntlTranslationMap.ts#L15)

Maps the labels of an internationalization class onto the application's own translation keys.
Every key must name an existing string property of the class, so a renamed label breaks the build
instead of silently falling back to English.

## Type Parameters

| Type Parameter | Description |
| ------ | ------ |
| `TIntl` | The internationalization class. |
