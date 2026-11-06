---
title: 'Interface: ICommandSource'
generated: true
editUrl: false
---
# Interface: ICommandSource

Defined in: [search/models/ICommandSource.ts:13](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/search/models/ICommandSource.ts#L13)

A dynamic contributor of command items. Sources are injectable classes and are asked on every
query, so labels and permissions that resolve late (translations, session state) stay current.

## Properties

### id

```ts
readonly id: string;
```

Defined in: [search/models/ICommandSource.ts:19](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/search/models/ICommandSource.ts#L19)

Unique identifier of the source, typically the contributing feature (e.g. `'settings'`).

## Methods

### getCommands()

```ts
getCommands(query, signal?):
  | readonly ICommandItem[]
| Promise<readonly ICommandItem[]>;
```

Defined in: [search/models/ICommandSource.ts:33](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/search/models/ICommandSource.ts#L33)

Returns the commands matching the given query. An empty query asks for the complete
catalogue — the palette uses it to fill its suggestion list before the user types.
Implementations may use the signal to stop work when the caller cancels.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `query` | `string` | The trimmed query, or an empty string for "return everything you have". |
| `signal?` | `AbortSignal` | Cancels the request when supplied by the caller. |

#### Returns

  \| readonly [`ICommandItem`](Interface.ICommandItem)[]
  \| `Promise`\<readonly [`ICommandItem`](Interface.ICommandItem)[]\>
