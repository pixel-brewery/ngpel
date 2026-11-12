---
title: 'Interface: IUpdateManagerOptions'
generated: true
editUrl: false
---
# Interface: IUpdateManagerOptions

Defined in: [update/services/IUpdateManagerOptions.ts:12](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/update/services/IUpdateManagerOptions.ts#L12)

Construction options of the [UpdateManager](Class.UpdateManager).

## Properties

### checkOnStart?

```ts
readonly checkOnStart?: boolean;
```

Defined in: [update/services/IUpdateManagerOptions.ts:20](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/update/services/IUpdateManagerOptions.ts#L20)

Runs a check as soon as [IUpdateManagerOptions.isStable](#isstable) reports stability.

#### Default

```ts
false
```

***

### isStable?

```ts
readonly isStable?: Observable<boolean>;
```

Defined in: [update/services/IUpdateManagerOptions.ts:26](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/update/services/IUpdateManagerOptions.ts#L26)

Application stability stream every check waits for before it hits the source (typically
`ApplicationRef.isStable`). Defaults to an immediately stable application.
