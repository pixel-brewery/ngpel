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

***

### isFloating?

```ts
readonly isFloating?: Signal<boolean>;
```

Defined in: [libs/ui/src/components/rail/IRailHost.ts:22](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/rail/IRailHost.ts#L22)

Whether the current layout presents rail content in a floating sheet.

***

### usesFloatingActions?

```ts
readonly usesFloatingActions?: Signal<boolean>;
```

Defined in: [libs/ui/src/components/rail/IRailHost.ts:24](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/rail/IRailHost.ts#L24)

Whether actions are presented as floating action buttons inside the drawer.

## Methods

### activateContent()

```ts
activateContent(target): void;
```

Defined in: [libs/ui/src/components/rail/IRailHost.ts:32](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/rail/IRailHost.ts#L32)

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

Defined in: [libs/ui/src/components/rail/IRailHost.ts:41](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/rail/IRailHost.ts#L41)

Indicates whether content is currently registered for a key.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `target` | `string` | Stable content key to inspect. |

#### Returns

`boolean`

Whether matching rail content exists.
