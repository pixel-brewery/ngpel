---
title: 'Interface: IWithNavigationGuardOptions'
generated: true
editUrl: false
---
# Interface: IWithNavigationGuardOptions

Defined in: [navigation/provider/IWithNavigationGuardOptions.ts:13](https://github.com/pixel-brewery/ngpel/blob/main/libs/router/src/navigation/provider/IWithNavigationGuardOptions.ts#L13)

Options of `withNavigationGuard(...)`.

## Properties

### guard

```ts
readonly guard: Type<INavigationGuard>;
```

Defined in: [navigation/provider/IWithNavigationGuardOptions.ts:26](https://github.com/pixel-brewery/ngpel/blob/main/libs/router/src/navigation/provider/IWithNavigationGuardOptions.ts#L26)

The guard class; it is instantiated through DI, so it may inject the product's policy
services.

***

### id

```ts
readonly id: string;
```

Defined in: [navigation/provider/IWithNavigationGuardOptions.ts:20](https://github.com/pixel-brewery/ngpel/blob/main/libs/router/src/navigation/provider/IWithNavigationGuardOptions.ts#L20)

The stable id of this contribution, unique across every guard contribution of the
application.
