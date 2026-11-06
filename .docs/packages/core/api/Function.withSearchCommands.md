---
title: 'Function: withSearchCommands()'
generated: true
editUrl: false
---
# Function: withSearchCommands()

```ts
function withSearchCommands(options): IFeature<SearchFeatureKind>;
```

Defined in: [search/provider/withSearchCommands.ts:27](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/search/provider/withSearchCommands.ts#L27)

Declaratively contributes palette commands to `provideSearch()`. The feature is multi-capable:
every contributing feature composes one `withSearchCommands()` call.

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `options` | [`IWithSearchCommandsOptions`](Interface.IWithSearchCommandsOptions) | The contribution: a stable id plus static commands and/or source classes. |

## Returns

[`IFeature`](Interface.IFeature)\<[`SearchFeatureKind`](TypeAlias.SearchFeatureKind)\>

The feature to pass to `provideSearch()`.

## Example

```typescript
provideSearch({ hotkey: 'meta+k' }, withSearchCommands({ id: 'settings', sources: [SettingsCommandSource] }));
```
