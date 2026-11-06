---
title: 'Interface: IViewItemActionable'
generated: true
editUrl: false
---
# Interface: IViewItemActionable

Defined in: item-actions/IViewItemActionable.ts:12

Presenter-facing contract for registered contextual item actions.

## Properties

### executeViewItemActionCommand

```ts
readonly executeViewItemActionCommand: AsyncCommand<IViewItemActionSelection>;
```

Defined in: item-actions/IViewItemActionable.ts:15

***

### openViewItemActionCommand

```ts
readonly openViewItemActionCommand: Command<string>;
```

Defined in: item-actions/IViewItemActionable.ts:14

***

### viewItemActions

```ts
readonly viewItemActions: Signal<readonly IViewItemAction[]>;
```

Defined in: item-actions/IViewItemActionable.ts:13
