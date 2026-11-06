---
title: 'Function: resolveDynamicFormLayoutClasses()'
generated: true
editUrl: false
---
# Function: resolveDynamicFormLayoutClasses()

```ts
function resolveDynamicFormLayoutClasses(layout?): string;
```

Defined in: [libs/ui/src/components/dynamic-form/resolveDynamicFormLayoutClasses.ts:137](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/dynamic-form/resolveDynamicFormLayoutClasses.ts#L137)

Resolves semantic grid placement into statically discoverable Tailwind classes.

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `layout?` | [`IDynamicFormFieldLayout`](Interface.IDynamicFormFieldLayout) | Responsive field layout. |

## Returns

`string`

Classes for a twelve-column field wrapper.
