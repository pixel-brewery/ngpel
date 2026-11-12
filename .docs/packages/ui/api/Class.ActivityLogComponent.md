---
title: 'Class: ActivityLogComponent\<T\>'
generated: true
editUrl: false
---
# Class: ActivityLogComponent\<T\>

Defined in: [libs/ui/src/components/activity-log/ActivityLogComponent.ts:91](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/activity-log/ActivityLogComponent.ts#L91)

Renders caller-projected entries with paging, load feedback and an optional unread boundary.

## Type Parameters

| Type Parameter |
| ------ |
| <a id="type-parameter-t"></a> `T` |

## Constructors

### Constructor

```ts
new ActivityLogComponent<T>(): ActivityLogComponent<T>;
```

Defined in: [libs/ui/src/components/activity-log/ActivityLogComponent.ts:103](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/activity-log/ActivityLogComponent.ts#L103)

Starts the controller on display and reports only entries rendered in a visible document.

#### Returns

`ActivityLogComponent`\<`T`\>

## Properties

### controller

```ts
readonly controller: InputSignal<IActivityLogController<T>>;
```

Defined in: [libs/ui/src/components/activity-log/ActivityLogComponent.ts:129](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/activity-log/ActivityLogComponent.ts#L129)

Provides the entries, load state and paging commands.

***

### entryTemplate

```ts
protected readonly entryTemplate: Signal<
  | ActivityLogEntryDirective<T>
| undefined>;
```

Defined in: [libs/ui/src/components/activity-log/ActivityLogComponent.ts:139](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/activity-log/ActivityLogComponent.ts#L139)

***

### isVisible

```ts
readonly isVisible: InputSignal<((item) => boolean) | undefined>;
```

Defined in: [libs/ui/src/components/activity-log/ActivityLogComponent.ts:131](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/activity-log/ActivityLogComponent.ts#L131)

Optional filter that affects rendering without changing paging or read position.

***

### labels

```ts
readonly labels: InputSignal<Partial<IActivityLogLabels>>;
```

Defined in: [libs/ui/src/components/activity-log/ActivityLogComponent.ts:133](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/activity-log/ActivityLogComponent.ts#L133)

Localized labels; omitted labels retain their defaults.

***

### placeholders

```ts
protected readonly placeholders: number[];
```

Defined in: [libs/ui/src/components/activity-log/ActivityLogComponent.ts:140](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/activity-log/ActivityLogComponent.ts#L140)

***

### readRequested

```ts
readonly readRequested: OutputEmitterRef<T | undefined>;
```

Defined in: [libs/ui/src/components/activity-log/ActivityLogComponent.ts:137](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/activity-log/ActivityLogComponent.ts#L137)

Asks the host to persist the newest entry after a successful visible render.

***

### resolvedLabels

```ts
protected readonly resolvedLabels: Signal<{
  empty: string;
  error: string;
  heading: string;
  loading: string;
  loadMore: string;
  moreError: string;
  newChanges: string;
  retry: string;
}>;
```

Defined in: [libs/ui/src/components/activity-log/ActivityLogComponent.ts:141](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/activity-log/ActivityLogComponent.ts#L141)

***

### showUnreadAtTop

```ts
protected readonly showUnreadAtTop: Signal<boolean>;
```

Defined in: [libs/ui/src/components/activity-log/ActivityLogComponent.ts:147](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/activity-log/ActivityLogComponent.ts#L147)

***

### unreadBoundary

```ts
readonly unreadBoundary: InputSignal<string | number | null | undefined>;
```

Defined in: [libs/ui/src/components/activity-log/ActivityLogComponent.ts:135](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/activity-log/ActivityLogComponent.ts#L135)

Last acknowledged visible entry key. Supply null when all visible entries are new.

***

### visibleEntries

```ts
protected readonly visibleEntries: Signal<readonly T[]>;
```

Defined in: [libs/ui/src/components/activity-log/ActivityLogComponent.ts:142](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/activity-log/ActivityLogComponent.ts#L142)
