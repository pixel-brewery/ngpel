---
title: 'Class: RailContentDirective'
generated: true
editUrl: false
---
# Class: RailContentDirective

Defined in: [libs/ui/src/components/rail/RailContentDirective.ts:19](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/rail/RailContentDirective.ts#L19)

Registers independently declared content with its nearest generic rail coordinator.

## Constructors

### Constructor

```ts
new RailContentDirective(): RailContentDirective;
```

#### Returns

`RailContentDirective`

## Properties

### isActive

```ts
protected readonly isActive: Signal<boolean>;
```

Defined in: [libs/ui/src/components/rail/RailContentDirective.ts:53](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/rail/RailContentDirective.ts#L53)

Indicates whether this content is selected by the surrounding rail.

## Accessors

### contentKey

#### Get Signature

```ts
get contentKey(): string;
```

Defined in: [libs/ui/src/components/rail/RailContentDirective.ts:43](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/rail/RailContentDirective.ts#L43)

##### Returns

`string`

#### Set Signature

```ts
set contentKey(value): void;
```

Defined in: [libs/ui/src/components/rail/RailContentDirective.ts:39](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/rail/RailContentDirective.ts#L39)

Stable key matched by a declarative rail action.

##### Parameters

| Parameter | Type |
| ------ | ------ |
| `value` | `string` |

##### Returns

`void`
