---
title: 'Class: ActivityLogComponent\<T\>'
generated: true
editUrl: false
---
# Class: ActivityLogComponent\<T\>

Defined in: [libs/ui/src/components/activity-log/ActivityLogComponent.ts:216](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/activity-log/ActivityLogComponent.ts#L216)

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

Defined in: [libs/ui/src/components/activity-log/ActivityLogComponent.ts:228](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/activity-log/ActivityLogComponent.ts#L228)

Starts the controller on display and reports only entries rendered in a visible document.

#### Returns

`ActivityLogComponent`\<`T`\>

## Properties

### controller

```ts
readonly controller: InputSignal<IActivityLogController<T>>;
```

Defined in: [libs/ui/src/components/activity-log/ActivityLogComponent.ts:260](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/activity-log/ActivityLogComponent.ts#L260)

Provides the entries, load state and paging commands.

***

### detailed

```ts
readonly detailed: InputSignal<boolean>;
```

Defined in: [libs/ui/src/components/activity-log/ActivityLogComponent.ts:268](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/activity-log/ActivityLogComponent.ts#L268)

Uses timeline-shaped skeletons, detailed empty and error states, and a timeline unread separator.

***

### entryTemplate

```ts
protected readonly entryTemplate: Signal<
  | ActivityLogEntryDirective<T>
| undefined>;
```

Defined in: [libs/ui/src/components/activity-log/ActivityLogComponent.ts:276](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/activity-log/ActivityLogComponent.ts#L276)

***

### isVisible

```ts
readonly isVisible: InputSignal<((item) => boolean) | undefined>;
```

Defined in: [libs/ui/src/components/activity-log/ActivityLogComponent.ts:262](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/activity-log/ActivityLogComponent.ts#L262)

Optional filter that affects rendering without changing paging or read position.

***

### labels

```ts
readonly labels: InputSignal<Partial<IActivityLogLabels>>;
```

Defined in: [libs/ui/src/components/activity-log/ActivityLogComponent.ts:264](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/activity-log/ActivityLogComponent.ts#L264)

Localized labels; omitted labels retain their defaults.

***

### placeholders

```ts
protected readonly placeholders: number[];
```

Defined in: [libs/ui/src/components/activity-log/ActivityLogComponent.ts:277](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/activity-log/ActivityLogComponent.ts#L277)

***

### readRequested

```ts
readonly readRequested: OutputEmitterRef<T | undefined>;
```

Defined in: [libs/ui/src/components/activity-log/ActivityLogComponent.ts:274](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/activity-log/ActivityLogComponent.ts#L274)

Asks the host to persist the newest entry after a successful visible render.

***

### refreshOnMount

```ts
readonly refreshOnMount: InputSignal<boolean>;
```

Defined in: [libs/ui/src/components/activity-log/ActivityLogComponent.ts:272](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/activity-log/ActivityLogComponent.ts#L272)

Refreshes an already loaded log when the view is opened.

***

### resolvedLabels

```ts
protected readonly resolvedLabels: Signal<{
  empty: string;
  emptyDescription?: string;
  error: string;
  errorDescription?: string;
  heading: string;
  loading: string;
  loadMore: string;
  moreError: string;
  newChanges: string;
  newChangesDescription?: string;
  retry: string;
}>;
```

Defined in: [libs/ui/src/components/activity-log/ActivityLogComponent.ts:278](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/activity-log/ActivityLogComponent.ts#L278)

***

### showUnreadAtTop

```ts
protected readonly showUnreadAtTop: Signal<boolean>;
```

Defined in: [libs/ui/src/components/activity-log/ActivityLogComponent.ts:284](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/activity-log/ActivityLogComponent.ts#L284)

***

### testIdPrefix

```ts
readonly testIdPrefix: InputSignal<string | undefined>;
```

Defined in: [libs/ui/src/components/activity-log/ActivityLogComponent.ts:270](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/activity-log/ActivityLogComponent.ts#L270)

Stable identifier prefix for activity controls and records.

***

### unreadBoundary

```ts
readonly unreadBoundary: InputSignal<string | number | null | undefined>;
```

Defined in: [libs/ui/src/components/activity-log/ActivityLogComponent.ts:266](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/activity-log/ActivityLogComponent.ts#L266)

Last acknowledged visible entry key. Supply null when all visible entries are new.

***

### visibleEntries

```ts
protected readonly visibleEntries: Signal<readonly T[]>;
```

Defined in: [libs/ui/src/components/activity-log/ActivityLogComponent.ts:279](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/activity-log/ActivityLogComponent.ts#L279)
