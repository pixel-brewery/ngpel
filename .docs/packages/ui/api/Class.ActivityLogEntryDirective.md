---
title: 'Class: ActivityLogEntryDirective\<T\>'
generated: true
editUrl: false
---
# Class: ActivityLogEntryDirective\<T\>

Defined in: libs/ui/src/components/activity-log/ActivityLogEntryDirective.ts:6

Marks a projected entry template. Bind the controller's entries to infer the item type.

## Type Parameters

| Type Parameter |
| ------ |
| `T` |

## Constructors

### Constructor

```ts
new ActivityLogEntryDirective<T>(): ActivityLogEntryDirective<T>;
```

#### Returns

`ActivityLogEntryDirective`\<`T`\>

## Properties

### items

```ts
readonly items: InputSignal<readonly T[]>;
```

Defined in: libs/ui/src/components/activity-log/ActivityLogEntryDirective.ts:8

Entry collection used to infer the projected context.

***

### template

```ts
readonly template: TemplateRef<IActivityLogEntryContext<T>>;
```

Defined in: libs/ui/src/components/activity-log/ActivityLogEntryDirective.ts:10

Template rendered for each item.

## Methods

### ngTemplateContextGuard()

```ts
static ngTemplateContextGuard<TItem>(_directive, value): value is IActivityLogEntryContext<TItem>;
```

Defined in: libs/ui/src/components/activity-log/ActivityLogEntryDirective.ts:13

Supplies the template context type to Angular's compiler.

#### Type Parameters

| Type Parameter |
| ------ |
| `TItem` |

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `_directive` | `ActivityLogEntryDirective`\<`TItem`\> |
| `value` | `unknown` |

#### Returns

`value is IActivityLogEntryContext<TItem>`
