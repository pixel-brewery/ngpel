---
title: 'Interface: IRouteTitleOptions'
generated: true
editUrl: false
---
# Interface: IRouteTitleOptions

Defined in: [title/IRouteTitleOptions.ts:7](https://github.com/pixel-brewery/ngpel/blob/main/libs/router/src/title/IRouteTitleOptions.ts#L7)

Configures [RouteDataTitleStrategy](Class.RouteDataTitleStrategy). Every member is optional and product-neutral by
default: no application name is appended unless one is configured.

## Properties

### appName?

```ts
readonly optional appName?: string;
```

Defined in: [title/IRouteTitleOptions.ts:13](https://github.com/pixel-brewery/ngpel/blob/main/libs/router/src/title/IRouteTitleOptions.ts#L13)

Appended as the last title segment, for example `'Contoso'`. Defaults to no suffix.

***

### descriptionDataKey?

```ts
readonly optional descriptionDataKey?: string;
```

Defined in: [title/IRouteTitleOptions.ts:28](https://github.com/pixel-brewery/ngpel/blob/main/libs/router/src/title/IRouteTitleOptions.ts#L28)

The route data key carrying the meta description. Defaults to `'description'`.

***

### separator?

```ts
readonly optional separator?: string;
```

Defined in: [title/IRouteTitleOptions.ts:18](https://github.com/pixel-brewery/ngpel/blob/main/libs/router/src/title/IRouteTitleOptions.ts#L18)

Joins the title segments. Defaults to `' · '`.

***

### titleDataKey?

```ts
readonly optional titleDataKey?: string;
```

Defined in: [title/IRouteTitleOptions.ts:23](https://github.com/pixel-brewery/ngpel/blob/main/libs/router/src/title/IRouteTitleOptions.ts#L23)

The route data key carrying the title. Defaults to `'title'`.
