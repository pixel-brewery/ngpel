---
title: 'Interface: IUpdateConfig'
generated: true
editUrl: false
---
# Interface: IUpdateConfig

Defined in: [update/provider/IUpdateConfig.ts:12](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/update/provider/IUpdateConfig.ts#L12)

Options of `provideUpdate()`.

## Properties

### checkOnStart?

```ts
readonly optional checkOnStart?: boolean;
```

Defined in: [update/provider/IUpdateConfig.ts:20](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/update/provider/IUpdateConfig.ts#L20)

Runs an update check as soon as the application is stable.

#### Default

```ts
false
```

***

### intl?

```ts
readonly optional intl?: Partial<IUpdateIntl>;
```

Defined in: [update/provider/IUpdateConfig.ts:25](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/update/provider/IUpdateConfig.ts#L25)

Overrides for the neutral [IUpdateIntl](Interface.IUpdateIntl) texts; omitted keys keep their default.
