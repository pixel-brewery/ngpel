---
title: 'Interface: IUpdateIntl'
generated: true
editUrl: false
---
# Interface: IUpdateIntl

Defined in: [update/intl/IUpdateIntl.ts:7](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/update/intl/IUpdateIntl.ts#L7)

User-facing texts of the update lifecycle. Products replace the neutral English defaults through
`provideUpdate({ intl })` instead of the package shipping a translation catalogue.

## Properties

### installationFailedHeader

```ts
readonly installationFailedHeader: string;
```

Defined in: [update/intl/IUpdateIntl.ts:33](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/update/intl/IUpdateIntl.ts#L33)

Headline shown when a newer version could not be installed.

***

### installationFailedMessage

```ts
readonly installationFailedMessage: string;
```

Defined in: [update/intl/IUpdateIntl.ts:38](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/update/intl/IUpdateIntl.ts#L38)

Body shown when a newer version could not be installed.

***

### noNewVersionMessage

```ts
readonly noNewVersionMessage: string;
```

Defined in: [update/intl/IUpdateIntl.ts:43](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/update/intl/IUpdateIntl.ts#L43)

Text shown when a check found no newer version.

***

### readyHeader

```ts
readonly readyHeader: string;
```

Defined in: [update/intl/IUpdateIntl.ts:13](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/update/intl/IUpdateIntl.ts#L13)

Headline shown when a newer version is ready for activation.

***

### readyMessage

```ts
readonly readyMessage: string;
```

Defined in: [update/intl/IUpdateIntl.ts:18](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/update/intl/IUpdateIntl.ts#L18)

Body shown when a newer version is ready for activation.

***

### reloadLabel

```ts
readonly reloadLabel: string;
```

Defined in: [update/intl/IUpdateIntl.ts:48](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/update/intl/IUpdateIntl.ts#L48)

Label of the action that reloads the application.

***

### unrecoverableHeader

```ts
readonly unrecoverableHeader: string;
```

Defined in: [update/intl/IUpdateIntl.ts:23](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/update/intl/IUpdateIntl.ts#L23)

Headline shown when the installed version can no longer be used.

***

### unrecoverableMessage

```ts
readonly unrecoverableMessage: string;
```

Defined in: [update/intl/IUpdateIntl.ts:28](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/update/intl/IUpdateIntl.ts#L28)

Body shown when the installed version can no longer be used.
