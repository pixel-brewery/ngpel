---
title: 'Variable: SignalCacheChangedReason'
generated: true
editUrl: false
---
# Variable: SignalCacheChangedReason

```ts
const SignalCacheChangedReason: {
  Add: "add";
  Remove: "remove";
  Reset: "reset";
};
```

Defined in: [cache/SignalCacheChangedReason.ts:6](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/cache/SignalCacheChangedReason.ts#L6)

The reason a [SignalCacheRegistrar](Class.SignalCacheRegistrar) reported a change.

## Type Declaration

| Name | Type | Default value | Description | Defined in |
| ------ | ------ | ------ | ------ | ------ |
| <a id="property-add"></a> `Add` | `"add"` | `'add'` | One or more items were added to the collection. | [cache/SignalCacheChangedReason.ts:10](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/cache/SignalCacheChangedReason.ts#L10) |
| <a id="property-remove"></a> `Remove` | `"remove"` | `'remove'` | One or more items were removed from the collection. | [cache/SignalCacheChangedReason.ts:15](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/cache/SignalCacheChangedReason.ts#L15) |
| <a id="property-reset"></a> `Reset` | `"reset"` | `'reset'` | The contents of the collection changed dramatically. | [cache/SignalCacheChangedReason.ts:20](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/cache/SignalCacheChangedReason.ts#L20) |
