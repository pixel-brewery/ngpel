---
title: 'Variable: ReactiveCacheChangedReason'
generated: true
editUrl: false
---
# Variable: ReactiveCacheChangedReason

```ts
const ReactiveCacheChangedReason: {
  Add: "add";
  Remove: "remove";
  Reset: "reset";
};
```

Defined in: [rx/cache/ReactiveCacheChangedReason.ts:6](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/rx/cache/ReactiveCacheChangedReason.ts#L6)

The reason a [ReactiveCacheRegistrar](Class.ReactiveCacheRegistrar) reported a change.

## Type Declaration

| Name | Type | Default value | Description | Defined in |
| ------ | ------ | ------ | ------ | ------ |
| <a id="property-add"></a> `Add` | `"add"` | `'add'` | One or more items were added to the collection. | [rx/cache/ReactiveCacheChangedReason.ts:10](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/rx/cache/ReactiveCacheChangedReason.ts#L10) |
| <a id="property-remove"></a> `Remove` | `"remove"` | `'remove'` | One or more items were removed from the collection. | [rx/cache/ReactiveCacheChangedReason.ts:15](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/rx/cache/ReactiveCacheChangedReason.ts#L15) |
| <a id="property-reset"></a> `Reset` | `"reset"` | `'reset'` | The contents of the collection changed dramatically. | [rx/cache/ReactiveCacheChangedReason.ts:20](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/rx/cache/ReactiveCacheChangedReason.ts#L20) |
