---
title: 'Type Alias: NavHandle'
generated: true
editUrl: false
---
# Type Alias: NavHandle

```ts
type NavHandle = `route:${string}` | `cmd:${string}` | `ext:${string}`;
```

Defined in: [navigation/NavHandle.ts:17](https://github.com/pixel-brewery/ngpel/blob/main/libs/router/src/navigation/NavHandle.ts#L17)

A navigation handle: what activating a navigation item does, encoded as `<scheme>:<value>`.
Keeping the action in a string instead of a callback is what lets navigation items be plain,
serializable data that any host can render.

## Example

```typescript
const handles: ReadonlyArray<NavHandle> = [
    'route:/main/users?page=2',
    'cmd:dialog.open.settings',
    'ext:https://example.test/docs'
];
```
