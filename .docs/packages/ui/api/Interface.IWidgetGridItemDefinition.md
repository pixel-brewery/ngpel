---
title: 'Interface: IWidgetGridItemDefinition'
generated: true
editUrl: false
---
# Interface: IWidgetGridItemDefinition

Defined in: [libs/ui/src/widget/layout/IWidgetGridItemDefinition.ts:14](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/widget/layout/IWidgetGridItemDefinition.ts#L14)

One item a widget grid can place, with its text already resolved. It is the framework-free
projection of an `IWidget`: `toWidgetGridItemDefinition(...)` derives it, and a host that has no
widget registry at all can build it by hand.

## Properties

### columnSpan

```ts
readonly columnSpan: IWidgetSpanRange;
```

Defined in: [libs/ui/src/widget/layout/IWidgetGridItemDefinition.ts:55](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/widget/layout/IWidgetGridItemDefinition.ts#L55)

The supported column-span range and the initial column span.

***

### defaultZoneId

```ts
readonly defaultZoneId: string;
```

Defined in: [libs/ui/src/widget/layout/IWidgetGridItemDefinition.ts:40](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/widget/layout/IWidgetGridItemDefinition.ts#L40)

The zone the item starts out in.

***

### description?

```ts
readonly description?: string;
```

Defined in: [libs/ui/src/widget/layout/IWidgetGridItemDefinition.ts:30](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/widget/layout/IWidgetGridItemDefinition.ts#L30)

The resolved item description shown in the editor toolbox.

***

### enabledByDefault

```ts
readonly enabledByDefault: boolean;
```

Defined in: [libs/ui/src/widget/layout/IWidgetGridItemDefinition.ts:50](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/widget/layout/IWidgetGridItemDefinition.ts#L50)

Whether a newly discovered item is visible before the user customizes it.

***

### iconName?

```ts
readonly iconName?: string;
```

Defined in: [libs/ui/src/widget/layout/IWidgetGridItemDefinition.ts:35](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/widget/layout/IWidgetGridItemDefinition.ts#L35)

The icon shown in the editor toolbox, named in the host's icon vocabulary.

***

### id

```ts
readonly id: string;
```

Defined in: [libs/ui/src/widget/layout/IWidgetGridItemDefinition.ts:20](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/widget/layout/IWidgetGridItemDefinition.ts#L20)

The stable item identifier, equal to the id of the widget it represents.

***

### order

```ts
readonly order: number;
```

Defined in: [libs/ui/src/widget/layout/IWidgetGridItemDefinition.ts:45](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/widget/layout/IWidgetGridItemDefinition.ts#L45)

The item order within its zone, used until the user reorders the zone.

***

### rowSpan

```ts
readonly rowSpan: IWidgetSpanRange;
```

Defined in: [libs/ui/src/widget/layout/IWidgetGridItemDefinition.ts:60](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/widget/layout/IWidgetGridItemDefinition.ts#L60)

The supported row-span range and the initial row span.

***

### title

```ts
readonly title: string;
```

Defined in: [libs/ui/src/widget/layout/IWidgetGridItemDefinition.ts:25](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/widget/layout/IWidgetGridItemDefinition.ts#L25)

The resolved item title shown in the editor toolbox.
