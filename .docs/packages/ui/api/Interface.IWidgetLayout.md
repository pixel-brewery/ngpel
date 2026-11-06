---
title: 'Interface: IWidgetLayout'
generated: true
editUrl: false
---
# Interface: IWidgetLayout

Defined in: [libs/ui/src/widget/models/IWidgetLayout.ts:14](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/widget/models/IWidgetLayout.ts#L14)

The default placement and the resize constraints contributed by one widget. A persisted user
layout overrides the defaults without ever mutating the registered widget definition.

## Properties

### columnSpan

```ts
readonly columnSpan: IWidgetSpanRange;
```

Defined in: [libs/ui/src/widget/models/IWidgetLayout.ts:30](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/widget/models/IWidgetLayout.ts#L30)

The supported column-span range and the initial column span.

***

### defaultZone

```ts
readonly defaultZone: IWidgetZone;
```

Defined in: [libs/ui/src/widget/models/IWidgetLayout.ts:20](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/widget/models/IWidgetLayout.ts#L20)

The dynamically contributed semantic zone used until the user moves the widget.

***

### enabledByDefault

```ts
readonly enabledByDefault: boolean;
```

Defined in: [libs/ui/src/widget/models/IWidgetLayout.ts:25](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/widget/models/IWidgetLayout.ts#L25)

Whether the widget is visible before a user layout exists.

***

### rowSpan

```ts
readonly rowSpan: IWidgetSpanRange;
```

Defined in: [libs/ui/src/widget/models/IWidgetLayout.ts:35](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/widget/models/IWidgetLayout.ts#L35)

The supported row-span range and the initial row span.
