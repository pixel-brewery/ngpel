---
title: 'Function: getContrastingTextColor()'
generated: true
editUrl: false
---
# Function: getContrastingTextColor()

```ts
function getContrastingTextColor(backgroundColor): "#000000" | "#ffffff";
```

Defined in: [libs/ui/src/pipes/color/getContrastingTextColor.ts:19](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/pipes/color/getContrastingTextColor.ts#L19)

Picks the text colour that stays readable on a background colour, using the YIQ brightness of the
background: dark text on a light ground, light text on a dark one.

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `backgroundColor` | `string` | The background as a `#rgb` or `#rrggbb` string. |

## Returns

`"#000000"` \| `"#ffffff"`

`#000000` or `#ffffff`; an unparsable background yields `#000000`.
