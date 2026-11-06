---
title: 'Interface: IMapsAddress'
generated: true
editUrl: false
---
# Interface: IMapsAddress

Defined in: [libs/ui/src/pipes/links/IMapsAddress.ts:7](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/pipes/links/IMapsAddress.ts#L7)

A postal address as [MapsPipe](Class.MapsPipe) reads it. Every part is optional, because the shape mirrors
what an API actually returns rather than what a complete address would hold.

## Properties

### city?

```ts
readonly optional city?: string | null;
```

Defined in: [libs/ui/src/pipes/links/IMapsAddress.ts:13](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/pipes/links/IMapsAddress.ts#L13)

The city.

***

### country?

```ts
readonly optional country?: string | null;
```

Defined in: [libs/ui/src/pipes/links/IMapsAddress.ts:20](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/pipes/links/IMapsAddress.ts#L20)

The country.

***

### postalCode?

```ts
readonly optional postalCode?: string | null;
```

Defined in: [libs/ui/src/pipes/links/IMapsAddress.ts:27](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/pipes/links/IMapsAddress.ts#L27)

The postal code.

***

### street?

```ts
readonly optional street?: string | null;
```

Defined in: [libs/ui/src/pipes/links/IMapsAddress.ts:34](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/pipes/links/IMapsAddress.ts#L34)

The street without its number.

***

### streetNumber?

```ts
readonly optional streetNumber?: string | null;
```

Defined in: [libs/ui/src/pipes/links/IMapsAddress.ts:41](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/pipes/links/IMapsAddress.ts#L41)

The house number.
