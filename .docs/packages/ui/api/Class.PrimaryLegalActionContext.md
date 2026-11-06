---
title: 'Class: PrimaryLegalActionContext'
generated: true
editUrl: false
---
# Class: PrimaryLegalActionContext

Defined in: [libs/ui/src/components/primary-legal-action/PrimaryLegalActionContext.ts:15](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/primary-legal-action/PrimaryLegalActionContext.ts#L15)

Route-scoped bridge through which routed content can expose one prominent
legal action without depending on its surrounding shell.

## Constructors

### Constructor

```ts
new PrimaryLegalActionContext(): PrimaryLegalActionContext;
```

#### Returns

`PrimaryLegalActionContext`

## Accessors

### action

#### Get Signature

```ts
get action(): Signal<IPrimaryLegalAction | null>;
```

Defined in: [libs/ui/src/components/primary-legal-action/PrimaryLegalActionContext.ts:29](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/primary-legal-action/PrimaryLegalActionContext.ts#L29)

##### Returns

`Signal`\<[`IPrimaryLegalAction`](Interface.IPrimaryLegalAction) \| `null`\>

## Methods

### register()

```ts
register(action): () => void;
```

Defined in: [libs/ui/src/components/primary-legal-action/PrimaryLegalActionContext.ts:37](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/primary-legal-action/PrimaryLegalActionContext.ts#L37)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `action` | [`IPrimaryLegalAction`](Interface.IPrimaryLegalAction) |

#### Returns

() => `void`
