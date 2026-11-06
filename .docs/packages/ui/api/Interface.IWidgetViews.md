---
title: 'Interface: IWidgetViews'
generated: true
editUrl: false
---
# Interface: IWidgetViews

Defined in: [libs/ui/src/widget/models/IWidgetViews.ts:14](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/widget/models/IWidgetViews.ts#L14)

The lazily loaded components of one widget: the face it normally shows and an optional back side
a shell may flip to. Both are loaders rather than component references, so a dashboard only pays
for the widgets it actually renders.

## Properties

### back?

```ts
readonly optional back?: () => Promise<Type<unknown>>;
```

Defined in: [libs/ui/src/widget/models/IWidgetViews.ts:25](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/widget/models/IWidgetViews.ts#L25)

Loads the component shown on the widget's back.

#### Returns

`Promise`\<`Type`\<`unknown`\>\>

***

### front

```ts
readonly front: () => Promise<Type<unknown>>;
```

Defined in: [libs/ui/src/widget/models/IWidgetViews.ts:20](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/widget/models/IWidgetViews.ts#L20)

Loads the component shown on the widget's front.

#### Returns

`Promise`\<`Type`\<`unknown`\>\>
