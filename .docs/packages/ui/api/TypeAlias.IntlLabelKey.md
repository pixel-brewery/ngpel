---
title: 'Type Alias: IntlLabelKey\<TIntl\>'
generated: true
editUrl: false
---
# Type Alias: IntlLabelKey\<TIntl\>

```ts
type IntlLabelKey<TIntl> = { [TKey in keyof TIntl]: TIntl[TKey] extends string ? TKey : never }[keyof TIntl] & string;
```

Defined in: [libs/ui/src/intl/IntlLabelKey.ts:8](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/intl/IntlLabelKey.ts#L8)

The string-valued property keys of an internationalization class — the labels an application may
translate.

## Type Parameters

| Type Parameter | Description |
| ------ | ------ |
| <a id="type-parameter-tintl"></a> `TIntl` | The internationalization class. |
