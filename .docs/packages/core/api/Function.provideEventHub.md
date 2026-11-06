---
title: 'Function: provideEventHub()'
generated: true
editUrl: false
---
# Function: provideEventHub()

```ts
function provideEventHub<TEvents>(...retainedKeys): EnvironmentProviders;
```

Defined in: events/provideEventHub.ts:12

Installs a hub in the current environment injector.

## Type Parameters

| Type Parameter | Default type |
| ------ | ------ |
| `TEvents` *extends* `object` | `Record`\<`string`, `unknown`\> |

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| ...`retainedKeys` | readonly `Extract`\<keyof `TEvents`, `string`\>[] | The finite set of event names for which `last` and `pop` keep a payload. |

## Returns

`EnvironmentProviders`

Providers for an independent event hub in this injector.
