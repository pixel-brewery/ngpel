---
title: 'Interface: IMapConfiguration'
generated: true
editUrl: false
---
# Interface: IMapConfiguration

Defined in: libs/ui/src/google-maps/IMapConfiguration.ts:6

Application-owned browser credentials and localization for Google Maps.

## Properties

### apiKey

```ts
readonly apiKey: string | undefined;
```

Defined in: libs/ui/src/google-maps/IMapConfiguration.ts:13

Rendering SDK API key supplied by the application environment.

***

### language?

```ts
readonly optional language?: string;
```

Defined in: libs/ui/src/google-maps/IMapConfiguration.ts:21

Maps language code; otherwise Google's browser-language default applies.

***

### region?

```ts
readonly optional region?: string;
```

Defined in: libs/ui/src/google-maps/IMapConfiguration.ts:29

Region bias for Google Maps, independent of the current viewport.
