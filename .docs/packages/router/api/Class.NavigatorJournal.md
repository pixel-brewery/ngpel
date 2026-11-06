---
title: 'Class: NavigatorJournal'
generated: true
editUrl: false
---
# Class: NavigatorJournal

Defined in: [navigator/NavigatorJournal.ts:21](https://github.com/pixel-brewery/ngpel/blob/main/libs/router/src/navigator/NavigatorJournal.ts#L21)

An in-application navigation journal: the URLs the application itself navigated to, with a
cursor that `goBack()` and `goForward()` move through. Unlike the browser history it is scoped
to the running application, so a shell can offer back and forward affordances that never leave
it. Traversal moves the cursor instead of appending, so forward entries survive a step back.

Register it with `provideNavigator()`; [Navigator](Class.Navigator) feeds it on every completed navigation.

## Constructors

### Constructor

```ts
new NavigatorJournal(): NavigatorJournal;
```

#### Returns

`NavigatorJournal`

## Accessors

### canGoBack

#### Get Signature

```ts
get canGoBack(): boolean;
```

Defined in: [navigator/NavigatorJournal.ts:60](https://github.com/pixel-brewery/ngpel/blob/main/libs/router/src/navigator/NavigatorJournal.ts#L60)

Whether an earlier entry exists.

##### Returns

`boolean`

***

### canGoForward

#### Get Signature

```ts
get canGoForward(): boolean;
```

Defined in: [navigator/NavigatorJournal.ts:70](https://github.com/pixel-brewery/ngpel/blob/main/libs/router/src/navigator/NavigatorJournal.ts#L70)

Whether a later entry exists.

##### Returns

`boolean`

***

### entries

#### Get Signature

```ts
get entries(): readonly INavigatorJournalEntry[];
```

Defined in: [navigator/NavigatorJournal.ts:50](https://github.com/pixel-brewery/ngpel/blob/main/libs/router/src/navigator/NavigatorJournal.ts#L50)

The recorded entries, oldest first.

##### Returns

readonly [`INavigatorJournalEntry`](Interface.INavigatorJournalEntry)[]

***

### journalChanged

#### Get Signature

```ts
get journalChanged(): Observable<void>;
```

Defined in: [navigator/NavigatorJournal.ts:40](https://github.com/pixel-brewery/ngpel/blob/main/libs/router/src/navigator/NavigatorJournal.ts#L40)

Emits whenever entries are recorded, the cursor moves or the journal is cleared.

##### Returns

`Observable`\<`void`\>

## Methods

### clear()

```ts
clear(): void;
```

Defined in: [navigator/NavigatorJournal.ts:83](https://github.com/pixel-brewery/ngpel/blob/main/libs/router/src/navigator/NavigatorJournal.ts#L83)

Drops every entry, for example on sign-out.

#### Returns

`void`

***

### goBack()

```ts
goBack(): void;
```

Defined in: [navigator/NavigatorJournal.ts:96](https://github.com/pixel-brewery/ngpel/blob/main/libs/router/src/navigator/NavigatorJournal.ts#L96)

Navigates to the previous entry, keeping the later entries reachable through
[NavigatorJournal.goForward](#goforward).

#### Returns

`void`

***

### goForward()

```ts
goForward(): void;
```

Defined in: [navigator/NavigatorJournal.ts:105](https://github.com/pixel-brewery/ngpel/blob/main/libs/router/src/navigator/NavigatorJournal.ts#L105)

Navigates to the next entry.

#### Returns

`void`

***

### recordNavigation()

```ts
recordNavigation(entry): void;
```

Defined in: [navigator/NavigatorJournal.ts:117](https://github.com/pixel-brewery/ngpel/blob/main/libs/router/src/navigator/NavigatorJournal.ts#L117)

Records a completed navigation. A repeated navigation to the current entry is ignored, a
navigation issued by [NavigatorJournal.goBack](#goback) or [NavigatorJournal.goForward](#goforward)
only moves the cursor, and any other navigation truncates the forward entries.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `entry` | [`INavigatorJournalEntry`](Interface.INavigatorJournalEntry) | The entry to record. |

#### Returns

`void`
