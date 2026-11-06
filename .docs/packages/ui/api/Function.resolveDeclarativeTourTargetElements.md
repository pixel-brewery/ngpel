---
title: 'Function: resolveDeclarativeTourTargetElements()'
generated: true
editUrl: false
---
# Function: resolveDeclarativeTourTargetElements()

```ts
function resolveDeclarativeTourTargetElements(host, attributeName): ReadonlyMap<string, HTMLElement>;
```

Defined in: [libs/ui/src/tour/contributions/resolveDeclarativeTourTargetElements.ts:9](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/tour/contributions/resolveDeclarativeTourTargetElements.ts#L9)

Collects the first rendered element for every declarative tour target value.

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `host` | `HTMLElement` | Host containing lazy or conditionally rendered tour content. |
| `attributeName` | `` `data-${string}` `` | Data attribute used to identify tour targets. |

## Returns

`ReadonlyMap`\<`string`, `HTMLElement`\>

The currently rendered target elements keyed by attribute value.
