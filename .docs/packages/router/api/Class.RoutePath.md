---
title: 'Class: RoutePath\<TPath\>'
generated: true
editUrl: false
---
# Class: RoutePath\<TPath\>

Defined in: [path/RoutePath.ts:27](https://github.com/pixel-brewery/ngpel/blob/main/libs/router/src/path/RoutePath.ts#L27)

An immutable, root-relative route path template. The literal path type is carried through every
fluent call, so [RoutePath.format](#format) only accepts parameter names the template actually
declares. Deliberately free of any Angular import: unauthenticated route files can build their
paths without pulling in the router.

## Example

```typescript
const userPath = RoutePath.create('users').withParam(':userId');

userPath.toRoute(); // '/users/:userId'
userPath.format('userId', '4711'); // 'users/4711'
```

## Type Parameters

| Type Parameter | Default type | Description |
| ------ | ------ | ------ |
| <a id="type-parameter-tpath"></a> `TPath` *extends* `string` | `string` | The literal path template. |

## Accessors

### path

#### Get Signature

```ts
get path(): TPath;
```

Defined in: [path/RoutePath.ts:64](https://github.com/pixel-brewery/ngpel/blob/main/libs/router/src/path/RoutePath.ts#L64)

The root-relative path template without a leading slash.

##### Returns

`TPath`

## Methods

### create()

```ts
static create<TPath>(path): RoutePath<TPath>;
```

Defined in: [path/RoutePath.ts:81](https://github.com/pixel-brewery/ngpel/blob/main/libs/router/src/path/RoutePath.ts#L81)

Creates a route path from a template.

#### Type Parameters

| Type Parameter | Default type | Description |
| ------ | ------ | ------ |
| <a id="type-parameter-tpath-1"></a> `TPath` *extends* `string` | `string` | The literal path template. |

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `path` | `TPath` | The root-relative path template. |

#### Returns

`RoutePath`\<`TPath`\>

The created route path.

#### Throws

Error when the path carries a query or fragment part, or is not root-relative.

***

### equals()

```ts
equals(path): boolean;
```

Defined in: [path/RoutePath.ts:93](https://github.com/pixel-brewery/ngpel/blob/main/libs/router/src/path/RoutePath.ts#L93)

Compares a URL path with this template. A leading slash as well as query and fragment parts
of the argument are ignored, so a value taken straight from `Router.url` can be compared.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `path` | `string` | The path to compare. |

#### Returns

`boolean`

`true` when both denote the same path.

***

### format()

```ts
format(parameter, value): string;
```

Defined in: [path/RoutePath.ts:127](https://github.com/pixel-brewery/ngpel/blob/main/libs/router/src/path/RoutePath.ts#L127)

Replaces one declared parameter placeholder with a URL-encoded value.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `parameter` | `ParseRouteParams`\<`TPath`\> | The parameter name declared by the template. |
| `value` | `string` | The raw value; it is URL-encoded. |

#### Returns

`string`

The path with the placeholder replaced.

***

### toRoute()

```ts
toRoute(): `/${TPath}`;
```

Defined in: [path/RoutePath.ts:115](https://github.com/pixel-brewery/ngpel/blob/main/libs/router/src/path/RoutePath.ts#L115)

Returns the absolute path template.

#### Returns

`` `/${TPath}` ``

The path with a leading slash.

***

### toString()

```ts
toString(): TPath;
```

Defined in: [path/RoutePath.ts:105](https://github.com/pixel-brewery/ngpel/blob/main/libs/router/src/path/RoutePath.ts#L105)

Returns the root-relative path template.

#### Returns

`TPath`

The path without a leading slash.

***

### withChild()

```ts
withChild<TChild>(childPath): RoutePath<`${TPath}/${TChild}`>;
```

Defined in: [path/RoutePath.ts:156](https://github.com/pixel-brewery/ngpel/blob/main/libs/router/src/path/RoutePath.ts#L156)

Appends a child segment to the template.

#### Type Parameters

| Type Parameter | Description |
| ------ | ------ |
| <a id="type-parameter-tchild"></a> `TChild` *extends* `string` | The child segment. |

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `childPath` | `TChild` | The child segment without a leading slash. |

#### Returns

`RoutePath`\<`` `${TPath}/${TChild}` ``\>

The extended route path.

***

### withParam()

```ts
withParam<TParam>(parameter): RoutePath<`${TPath}/:${TParam}`>;
```

Defined in: [path/RoutePath.ts:140](https://github.com/pixel-brewery/ngpel/blob/main/libs/router/src/path/RoutePath.ts#L140)

Appends a parameter placeholder to the template. Appending a placeholder the template
already declares returns the same path.

#### Type Parameters

| Type Parameter | Description |
| ------ | ------ |
| <a id="type-parameter-tparam"></a> `TParam` *extends* `string` | The parameter name. |

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `parameter` | `` `:${TParam}` `` | The placeholder including its leading colon, for example `':userId'`. |

#### Returns

`RoutePath`\<`` `${TPath}/:${TParam}` ``\>

The extended route path.
