---
title: 'Class: Navigator'
generated: true
editUrl: false
---
# Class: Navigator

Defined in: [navigator/Navigator.ts:22](https://github.com/pixel-brewery/ngpel/blob/main/libs/router/src/navigator/Navigator.ts#L22)

A task-oriented facade over `Router` and `Location`: navigate by URL, by view type or by route
definition, step through the in-application [NavigatorJournal](Class.NavigatorJournal) with a fall back to the
browser history, and ask what is currently active. It also keeps the previous URL, which the
router itself does not expose.

Register it with `provideNavigator()`.

## Implements

- `OnDestroy`

## Constructors

### Constructor

```ts
new Navigator(): Navigator;
```

Defined in: [navigator/Navigator.ts:43](https://github.com/pixel-brewery/ngpel/blob/main/libs/router/src/navigator/Navigator.ts#L43)

Constructs a new instance of the `Navigator` class.

#### Returns

`Navigator`

## Accessors

### current

#### Get Signature

```ts
get current(): string;
```

Defined in: [navigator/Navigator.ts:99](https://github.com/pixel-brewery/ngpel/blob/main/libs/router/src/navigator/Navigator.ts#L99)

The currently active URL.

##### Returns

`string`

***

### currentTree

#### Get Signature

```ts
get currentTree(): UrlTree;
```

Defined in: [navigator/Navigator.ts:109](https://github.com/pixel-brewery/ngpel/blob/main/libs/router/src/navigator/Navigator.ts#L109)

[Navigator.current](#current) parsed into a URL tree.

##### Returns

`UrlTree`

***

### events

#### Get Signature

```ts
get events(): Observable<Event>;
```

Defined in: [navigator/Navigator.ts:129](https://github.com/pixel-brewery/ngpel/blob/main/libs/router/src/navigator/Navigator.ts#L129)

The router event stream.

##### Returns

`Observable`\<`Event`\>

***

### journal

#### Get Signature

```ts
get journal(): NavigatorJournal;
```

Defined in: [navigator/Navigator.ts:69](https://github.com/pixel-brewery/ngpel/blob/main/libs/router/src/navigator/Navigator.ts#L69)

The in-application navigation journal.

##### Returns

[`NavigatorJournal`](Class.NavigatorJournal)

***

### locationChanged

#### Get Signature

```ts
get locationChanged(): Observable<void>;
```

Defined in: [navigator/Navigator.ts:119](https://github.com/pixel-brewery/ngpel/blob/main/libs/router/src/navigator/Navigator.ts#L119)

Emits on every browser location change, including the ones the router does not cause.

##### Returns

`Observable`\<`void`\>

***

### previous

#### Get Signature

```ts
get previous(): string;
```

Defined in: [navigator/Navigator.ts:79](https://github.com/pixel-brewery/ngpel/blob/main/libs/router/src/navigator/Navigator.ts#L79)

The URL that was active before the current one; empty until the second navigation.

##### Returns

`string`

***

### previousTree

#### Get Signature

```ts
get previousTree(): UrlTree;
```

Defined in: [navigator/Navigator.ts:89](https://github.com/pixel-brewery/ngpel/blob/main/libs/router/src/navigator/Navigator.ts#L89)

[Navigator.previous](#previous) parsed into a URL tree.

##### Returns

`UrlTree`

## Methods

### back()

```ts
back(): void;
```

Defined in: [navigator/Navigator.ts:208](https://github.com/pixel-brewery/ngpel/blob/main/libs/router/src/navigator/Navigator.ts#L208)

Steps back through the journal, falling back to the browser history when the journal has no
earlier entry.

#### Returns

`void`

***

### dispose()

```ts
dispose(): void;
```

Defined in: [navigator/Navigator.ts:143](https://github.com/pixel-brewery/ngpel/blob/main/libs/router/src/navigator/Navigator.ts#L143)

Releases the location and router subscriptions. Called automatically when the injector that
provides the navigator is destroyed.

#### Returns

`void`

***

### forward()

```ts
forward(): void;
```

Defined in: [navigator/Navigator.ts:224](https://github.com/pixel-brewery/ngpel/blob/main/libs/router/src/navigator/Navigator.ts#L224)

Steps forward through the journal, falling back to the browser history when the journal has
no later entry.

#### Returns

`void`

***

### isActive()

```ts
isActive(url, matchOptions?): boolean;
```

Defined in: [navigator/Navigator.ts:258](https://github.com/pixel-brewery/ngpel/blob/main/libs/router/src/navigator/Navigator.ts#L258)

Determines whether a URL is currently active. Defaults to subset matching, so a parent URL
counts as active while a child route is shown.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `url` | `string` \| `UrlTree` | The URL to test. |
| `matchOptions?` | `IsActiveMatchOptions` | The match options. |

#### Returns

`boolean`

Whether the URL is active.

***

### navigateByRoute()

```ts
navigateByRoute(route, extras?): Promise<boolean>;
```

Defined in: [navigator/Navigator.ts:194](https://github.com/pixel-brewery/ngpel/blob/main/libs/router/src/navigator/Navigator.ts#L194)

Navigates to a route definition.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `route` | `Route` \| `undefined` | The route definition; a route without a path cannot be navigated to. |
| `extras?` | `NavigationExtras` | The navigation extras. |

#### Returns

`Promise`\<`boolean`\>

Whether the navigation succeeded.

***

### navigateByUrl()

```ts
navigateByUrl(url, extras?): Promise<boolean>;
```

Defined in: [navigator/Navigator.ts:166](https://github.com/pixel-brewery/ngpel/blob/main/libs/router/src/navigator/Navigator.ts#L166)

Navigates to an absolute URL.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `url` | `string` | The URL to navigate to. |
| `extras?` | `NavigationExtras` | The navigation extras. |

#### Returns

`Promise`\<`boolean`\>

Whether the navigation succeeded.

***

### navigateByView()

```ts
navigateByView<TView>(type, extras?): Promise<boolean>;
```

Defined in: [navigator/Navigator.ts:180](https://github.com/pixel-brewery/ngpel/blob/main/libs/router/src/navigator/Navigator.ts#L180)

Navigates to the route that renders the given view component, resolved from the router
configuration.

#### Type Parameters

| Type Parameter | Description |
| ------ | ------ |
| <a id="type-parameter-tview"></a> `TView` | The view component type. |

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `type` | `Type`\<`TView`\> | The component the target route renders. |
| `extras?` | `NavigationExtras` | The navigation extras. |

#### Returns

`Promise`\<`boolean`\>

Whether the navigation succeeded; `false` when no route renders the component.

***

### ngOnDestroy()

```ts
ngOnDestroy(): void;
```

Defined in: [navigator/Navigator.ts:154](https://github.com/pixel-brewery/ngpel/blob/main/libs/router/src/navigator/Navigator.ts#L154)

Releases the location and router subscriptions.

#### Returns

`void`

#### Implementation of

`OnDestroy.ngOnDestroy`

***

### update()

```ts
update(queryParams?): Promise<boolean>;
```

Defined in: [navigator/Navigator.ts:241](https://github.com/pixel-brewery/ngpel/blob/main/libs/router/src/navigator/Navigator.ts#L241)

Merges query parameters into the current URL without changing the route.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `queryParams?` | `Params` \| `null` | The parameters to merge; `null` removes all of them. |

#### Returns

`Promise`\<`boolean`\>

Whether the navigation succeeded.
