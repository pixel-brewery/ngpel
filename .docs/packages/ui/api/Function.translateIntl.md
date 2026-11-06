---
title: 'Function: translateIntl()'
generated: true
editUrl: false
---
# Function: translateIntl()

```ts
function translateIntl<TIntl>(intl, translations): TIntl;
```

Defined in: [libs/ui/src/intl/translateIntl.ts:31](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/intl/translateIntl.ts#L31)

Replaces the labels of an internationalization instance with the application's translations,
resolved through Mosaik's translate service.

A label the map does not mention keeps the built-in English default, so an application translates
as much or as little as it wants — and an application that composes ngpel without Mosaik keeps
every default, because the translate service is resolved optionally. Call it from the
`useFactory` of the provider that supplies the internationalization class, which is where an
injection context exists.

## Type Parameters

| Type Parameter | Description |
| ------ | ------ |
| `TIntl` *extends* `object` | The internationalization class. |

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `intl` | `TIntl` | The instance to translate. |
| `translations` | [`IntlTranslationMap`](TypeAlias.IntlTranslationMap)\<`TIntl`\> | The label-to-translation-key map. |

## Returns

`TIntl`

The same instance, with its translated labels applied.

## Example

```typescript
provideRailComponentIntl({ backLabel: 'navigation.back' });
```
