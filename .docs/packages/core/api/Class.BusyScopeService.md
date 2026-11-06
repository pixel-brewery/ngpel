---
title: 'Class: BusyScopeService'
generated: true
editUrl: false
---
# Class: BusyScopeService

Defined in: [state/BusyScopeService.ts:14](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/state/BusyScopeService.ts#L14)

Factory service for per-component [BusyScope](Class.BusyScope) instances with strict typing.

## Constructors

### Constructor

```ts
new BusyScopeService(): BusyScopeService;
```

#### Returns

`BusyScopeService`

## Methods

### create()

```ts
create<TState>(states, options?): BusyScope<TState>;
```

Defined in: [state/BusyScopeService.ts:26](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/state/BusyScopeService.ts#L26)

Creates a strictly typed [BusyScope](Class.BusyScope). Only the provided `states` are allowed.

#### Type Parameters

| Type Parameter | Description |
| ------ | ------ |
| `TState` *extends* `string` | A string union of all allowed state names. |

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `states` | readonly `TState`[] | The allowed state names for the new scope (use a `const` tuple for best typing). |
| `options?` | \{ `name?`: `string`; \} | Optional settings (diagnostic `name`). |
| `options.name?` | `string` | - |

#### Returns

[`BusyScope`](Class.BusyScope)\<`TState`\>

A fully initialized [BusyScope](Class.BusyScope).
