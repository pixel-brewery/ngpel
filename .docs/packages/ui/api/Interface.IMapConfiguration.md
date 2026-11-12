---
title: 'Interface: IMapConfiguration'
generated: true
editUrl: false
---
# Interface: IMapConfiguration

Defined in: [libs/ui/src/google-maps/IMapConfiguration.ts:6](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/google-maps/IMapConfiguration.ts#L6)

Application-owned browser credentials and localization for Google Maps.

## Properties

### apiKey

```ts
readonly apiKey: string | undefined;
```

Defined in: [libs/ui/src/google-maps/IMapConfiguration.ts:13](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/google-maps/IMapConfiguration.ts#L13)

Rendering SDK API key supplied by the application environment.

***

### language?

```ts
readonly language?: string;
```

Defined in: [libs/ui/src/google-maps/IMapConfiguration.ts:21](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/google-maps/IMapConfiguration.ts#L21)

Maps language code; otherwise Google's browser-language default applies.

***

### region?

```ts
readonly region?: string;
```

Defined in: [libs/ui/src/google-maps/IMapConfiguration.ts:29](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/google-maps/IMapConfiguration.ts#L29)

Region bias for Google Maps, independent of the current viewport.
