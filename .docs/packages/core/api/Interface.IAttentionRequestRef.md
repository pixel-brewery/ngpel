---
title: 'Interface: IAttentionRequestRef\<TAttempt\>'
generated: true
editUrl: false
---
# Interface: IAttentionRequestRef\<TAttempt\>

Defined in: [rx/operators/IAttentionRequestRef.ts:14](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/rx/operators/IAttentionRequestRef.ts#L14)

Structural contract of a UI surface (drawer, dialog) that exposes implicit close attempts and
can request the user's attention. Typed structurally so any UI kit's surface ref satisfies it.

## Type Parameters

| Type Parameter | Default type |
| ------ | ------ |
| <a id="type-parameter-tattempt"></a> `TAttempt` *extends* [`IPreventableCloseAttempt`](Interface.IPreventableCloseAttempt) | [`IPreventableCloseAttempt`](Interface.IPreventableCloseAttempt) |

## Properties

### closeAttempted

```ts
readonly closeAttempted: Observable<TAttempt>;
```

Defined in: [rx/operators/IAttentionRequestRef.ts:20](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/rx/operators/IAttentionRequestRef.ts#L20)

Emits before an implicit close operation, for example backdrop click or Escape.

## Methods

### requestAttention()

```ts
requestAttention(): Promise<boolean>;
```

Defined in: [rx/operators/IAttentionRequestRef.ts:29](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/rx/operators/IAttentionRequestRef.ts#L29)

Requests non-destructive visual attention for the surface.

#### Returns

`Promise`\<`boolean`\>
