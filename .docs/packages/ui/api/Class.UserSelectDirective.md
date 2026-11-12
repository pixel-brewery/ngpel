---
title: 'Class: UserSelectDirective'
generated: true
editUrl: false
---
# Class: UserSelectDirective

Defined in: [libs/ui/src/directives/user-select/UserSelectDirective.ts:17](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/directives/user-select/UserSelectDirective.ts#L17)

Ignores initial and bound-value selections emitted while Mosaik reconciles items.

## Constructors

### Constructor

```ts
new UserSelectDirective(): UserSelectDirective;
```

Defined in: [libs/ui/src/directives/user-select/UserSelectDirective.ts:31](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/directives/user-select/UserSelectDirective.ts#L31)

Subscribes to the owning Mosaik select for the directive lifetime.

#### Returns

`UserSelectDirective`

## Properties

### userSelected

```ts
readonly userSelected: OutputEmitterRef<string>;
```

Defined in: [libs/ui/src/directives/user-select/UserSelectDirective.ts:53](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/directives/user-select/UserSelectDirective.ts#L53)

Emits user-originated selections.
