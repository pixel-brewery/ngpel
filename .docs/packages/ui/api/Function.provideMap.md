---
title: 'Function: provideMap()'
generated: true
editUrl: false
---
# Function: provideMap()

```ts
function provideMap(configuration): EnvironmentProviders;
```

Defined in: libs/ui/src/google-maps/provideMap.ts:16

Registers application-owned Maps configuration without loading Google's SDK.

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `configuration` | [`IMapConfiguration`](Interface.IMapConfiguration) | Public browser key and optional Maps localization. |

## Returns

`EnvironmentProviders`

Application-level providers for maps and Places consumers.
