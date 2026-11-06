---
title: 'Interface: IViewMentionOption'
generated: true
editUrl: false
---
# Interface: IViewMentionOption

Defined in: [mentions/IViewMentionOption.ts:6](https://github.com/pixel-brewery/ngpel/blob/main/libs/mvp/src/mentions/IViewMentionOption.ts#L6)

One identity-bearing resource currently offered by an active view.

## Properties

### descriptionKey

```ts
readonly descriptionKey: string;
```

Defined in: [mentions/IViewMentionOption.ts:32](https://github.com/pixel-brewery/ngpel/blob/main/libs/mvp/src/mentions/IViewMentionOption.ts#L32)

Localization key describing the resource.

***

### icon

```ts
readonly icon: string;
```

Defined in: [mentions/IViewMentionOption.ts:27](https://github.com/pixel-brewery/ngpel/blob/main/libs/mvp/src/mentions/IViewMentionOption.ts#L27)

Icon name chosen by the resource owner.

***

### label

```ts
readonly label: string;
```

Defined in: [mentions/IViewMentionOption.ts:22](https://github.com/pixel-brewery/ngpel/blob/main/libs/mvp/src/mentions/IViewMentionOption.ts#L22)

Display label used for filtering mention suggestions.

***

### resourceId

```ts
readonly resourceId: string;
```

Defined in: [mentions/IViewMentionOption.ts:17](https://github.com/pixel-brewery/ngpel/blob/main/libs/mvp/src/mentions/IViewMentionOption.ts#L17)

Stable identifier of the resource within its type.

***

### resourceType

```ts
readonly resourceType: string;
```

Defined in: [mentions/IViewMentionOption.ts:12](https://github.com/pixel-brewery/ngpel/blob/main/libs/mvp/src/mentions/IViewMentionOption.ts#L12)

Application-owned resource type used to resolve a mention.
