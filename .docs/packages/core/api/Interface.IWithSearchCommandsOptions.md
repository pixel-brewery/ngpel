---
title: 'Interface: IWithSearchCommandsOptions'
generated: true
editUrl: false
---
# Interface: IWithSearchCommandsOptions

Defined in: [search/provider/IWithSearchCommandsOptions.ts:14](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/search/provider/IWithSearchCommandsOptions.ts#L14)

Options for contributing palette commands through `withSearchCommands()`.

## Properties

### commands?

```ts
readonly commands?: readonly ICommandItem[];
```

Defined in: [search/provider/IWithSearchCommandsOptions.ts:25](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/search/provider/IWithSearchCommandsOptions.ts#L25)

Static commands to contribute.

***

### id

```ts
readonly id: string;
```

Defined in: [search/provider/IWithSearchCommandsOptions.ts:20](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/search/provider/IWithSearchCommandsOptions.ts#L20)

Stable unique id of this contribution (unique among all command features).

***

### sources?

```ts
readonly sources?: readonly Type<ICommandSource>[];
```

Defined in: [search/provider/IWithSearchCommandsOptions.ts:32](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/search/provider/IWithSearchCommandsOptions.ts#L32)

Injectable classes contributing commands dynamically. Each class is registered as itself and
as a source, so it can inject services (a router, a permission service) and be injected in
turn.
