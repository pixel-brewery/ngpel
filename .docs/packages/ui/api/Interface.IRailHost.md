---
title: 'Interface: IRailHost'
generated: true
editUrl: false
---
# Interface: IRailHost

Defined in: [libs/ui/src/components/rail/IRailHost.ts:12](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/rail/IRailHost.ts#L12)

Coordinates declarative rail actions with independently declared rail content.

## Properties

### activeContentKey

```ts
readonly activeContentKey: Signal<string | null>;
```

Defined in: [libs/ui/src/components/rail/IRailHost.ts:19](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/rail/IRailHost.ts#L19)

Key of the currently visible rail content.

## Methods

### activateContent()

```ts
activateContent(target): void;
```

Defined in: [libs/ui/src/components/rail/IRailHost.ts:27](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/rail/IRailHost.ts#L27)

Activates the rail content registered for the supplied key.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `target` | `string` | Stable content key selected by a rail action. |

#### Returns

`void`

***

### hasContent()

```ts
hasContent(target): boolean;
```

Defined in: [libs/ui/src/components/rail/IRailHost.ts:36](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/rail/IRailHost.ts#L36)

Indicates whether content is currently registered for a key.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `target` | `string` | Stable content key to inspect. |

#### Returns

`boolean`

Whether matching rail content exists.
