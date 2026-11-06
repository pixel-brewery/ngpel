---
title: 'Class: AuditLogComponent'
generated: true
editUrl: false
---
# Class: AuditLogComponent

Defined in: [libs/ui/src/components/audit-log/AuditLogComponent.ts:132](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/audit-log/AuditLogComponent.ts#L132)

Renders the inner content of a single audit log timeline entry.

## Constructors

### Constructor

```ts
new AuditLogComponent(): AuditLogComponent;
```

#### Returns

`AuditLogComponent`

## Properties

### actionText

```ts
readonly actionText: InputSignal<string>;
```

Defined in: [libs/ui/src/components/audit-log/AuditLogComponent.ts:141](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/audit-log/AuditLogComponent.ts#L141)

Human readable audit action text.

***

### actorAvatarUrl

```ts
readonly actorAvatarUrl: InputSignal<string>;
```

Defined in: [libs/ui/src/components/audit-log/AuditLogComponent.ts:165](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/audit-log/AuditLogComponent.ts#L165)

Optional actor avatar image URL.

***

### actorInitials

```ts
readonly actorInitials: InputSignal<string>;
```

Defined in: [libs/ui/src/components/audit-log/AuditLogComponent.ts:157](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/audit-log/AuditLogComponent.ts#L157)

Avatar initials of the actor.

***

### actorName

```ts
readonly actorName: InputSignal<string>;
```

Defined in: [libs/ui/src/components/audit-log/AuditLogComponent.ts:149](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/audit-log/AuditLogComponent.ts#L149)

Display name of the actor.

***

### afterLabel

```ts
readonly afterLabel: InputSignal<string>;
```

Defined in: [libs/ui/src/components/audit-log/AuditLogComponent.ts:237](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/audit-log/AuditLogComponent.ts#L237)

Label for the new state section.

***

### beforeLabel

```ts
readonly beforeLabel: InputSignal<string>;
```

Defined in: [libs/ui/src/components/audit-log/AuditLogComponent.ts:229](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/audit-log/AuditLogComponent.ts#L229)

Label for the previous state section.

***

### changes

```ts
readonly changes: InputSignal<readonly IAuditLogChange[]>;
```

Defined in: [libs/ui/src/components/audit-log/AuditLogComponent.ts:181](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/audit-log/AuditLogComponent.ts#L181)

Field changes shown in the before/after state comparison.

***

### changeValue

```ts
readonly changeValue: InputSignal<AuditLogChangeValueFormatterFn>;
```

Defined in: [libs/ui/src/components/audit-log/AuditLogComponent.ts:221](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/audit-log/AuditLogComponent.ts#L221)

Formats a raw before/after value for display.

***

### emptyValueLabel

```ts
readonly emptyValueLabel: InputSignal<string>;
```

Defined in: [libs/ui/src/components/audit-log/AuditLogComponent.ts:245](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/audit-log/AuditLogComponent.ts#L245)

Label used when a change side does not contain a value.

***

### fieldIcon

```ts
readonly fieldIcon: InputSignal<
  | AuditLogFieldIconResolverFn
| undefined>;
```

Defined in: [libs/ui/src/components/audit-log/AuditLogComponent.ts:213](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/audit-log/AuditLogComponent.ts#L213)

Resolves the icon of a field change.

***

### fieldLabel

```ts
readonly fieldLabel: InputSignal<AuditLogFieldLabelResolverFn>;
```

Defined in: [libs/ui/src/components/audit-log/AuditLogComponent.ts:205](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/audit-log/AuditLogComponent.ts#L205)

Resolves the display label of a field change.

***

### primaryChangeGroup

```ts
readonly primaryChangeGroup: InputSignal<IAuditLogChangeGroup | null>;
```

Defined in: [libs/ui/src/components/audit-log/AuditLogComponent.ts:189](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/audit-log/AuditLogComponent.ts#L189)

Optional primary-side comparison group for merge audit entries.

***

### secondaryChangeGroups

```ts
readonly secondaryChangeGroups: InputSignal<readonly IAuditLogChangeGroup[]>;
```

Defined in: [libs/ui/src/components/audit-log/AuditLogComponent.ts:197](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/audit-log/AuditLogComponent.ts#L197)

Optional secondary-side comparison groups for merge audit entries.

***

### selectedMergeGroupIndex

```ts
protected readonly selectedMergeGroupIndex: WritableSignal<number>;
```

Defined in: [libs/ui/src/components/audit-log/AuditLogComponent.ts:253](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/audit-log/AuditLogComponent.ts#L253)

Index of the currently visible secondary merge group.

***

### timestamp

```ts
readonly timestamp: InputSignal<string>;
```

Defined in: [libs/ui/src/components/audit-log/AuditLogComponent.ts:173](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/audit-log/AuditLogComponent.ts#L173)

Formatted timestamp label.

## Methods

### formatChangeValue()

```ts
protected formatChangeValue(change, side): string;
```

Defined in: [libs/ui/src/components/audit-log/AuditLogComponent.ts:267](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/audit-log/AuditLogComponent.ts#L267)

Formats a change value for the requested side.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `change` | [`IAuditLogChange`](Interface.IAuditLogChange) | The field change to render. |
| `side` | [`AuditLogChangeSide`](TypeAlias.AuditLogChangeSide) | The side whose value should be rendered. |

#### Returns

`string`

The formatted value text.

***

### mergeAfterLabel()

```ts
protected mergeAfterLabel(group): string;
```

Defined in: [libs/ui/src/components/audit-log/AuditLogComponent.ts:327](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/audit-log/AuditLogComponent.ts#L327)

Builds the after-card label for the primary merge group.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `group` | [`IAuditLogChangeGroup`](Interface.IAuditLogChangeGroup) | Primary merge group. |

#### Returns

`string`

Human readable after label.

***

### mergeBeforeLabel()

```ts
protected mergeBeforeLabel(group): string;
```

Defined in: [libs/ui/src/components/audit-log/AuditLogComponent.ts:316](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/audit-log/AuditLogComponent.ts#L316)

Builds the before-card label for a merge group.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `group` | [`IAuditLogChangeGroup`](Interface.IAuditLogChangeGroup) | Selected secondary merge group. |

#### Returns

`string`

Human readable before label.

***

### onMergeGroupIndicated()

```ts
protected onMergeGroupIndicated(event): void;
```

Defined in: [libs/ui/src/components/audit-log/AuditLogComponent.ts:299](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/audit-log/AuditLogComponent.ts#L299)

Handles indicator item selection.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `event` | `unknown` | Indicator event payload. |

#### Returns

`void`

***

### selectedSecondaryChangeGroup()

```ts
protected selectedSecondaryChangeGroup(): IAuditLogChangeGroup | null;
```

Defined in: [libs/ui/src/components/audit-log/AuditLogComponent.ts:283](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/audit-log/AuditLogComponent.ts#L283)

Returns the currently selected secondary merge group.

#### Returns

[`IAuditLogChangeGroup`](Interface.IAuditLogChangeGroup) \| `null`

The selected secondary group or `null` when none is available.
