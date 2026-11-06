---
title: 'Class: ContentFragmentLinkDirective'
generated: true
editUrl: false
---
# Class: ContentFragmentLinkDirective

Defined in: [libs/ui/src/components/content-navigation/ContentFragmentLinkDirective.ts:30](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/content-navigation/ContentFragmentLinkDirective.ts#L30)

Builds a same-document fragment link without losing the active application route.

A bare `href="#section"` would resolve against the document root and drop the route the user is
on, so the directive rebuilds the link from the current path and query and only replaces the
fragment. Clicking it activates the outline entry immediately, while the browser's own fragment
navigation does the scrolling.

## Example

```html
<a ngpContentFragmentLink="billing">Billing</a>
```

## Constructors

### Constructor

```ts
new ContentFragmentLinkDirective(): ContentFragmentLinkDirective;
```

#### Returns

`ContentFragmentLinkDirective`

## Properties

### fragmentId

```ts
readonly fragmentId: InputSignal<string>;
```

Defined in: [libs/ui/src/components/content-navigation/ContentFragmentLinkDirective.ts:52](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/content-navigation/ContentFragmentLinkDirective.ts#L52)

Identifier of the registered destination. Without one the link points at the current route
with an empty fragment, which is what a bare marker attribute means.

## Accessors

### href

#### Get Signature

```ts
get protected href(): Signal<string>;
```

Defined in: [libs/ui/src/components/content-navigation/ContentFragmentLinkDirective.ts:60](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/content-navigation/ContentFragmentLinkDirective.ts#L60)

Route-preserving link exposed to the host binding.

##### Returns

`Signal`\<`string`\>

## Methods

### onClick()

```ts
protected onClick(): void;
```

Defined in: [libs/ui/src/components/content-navigation/ContentFragmentLinkDirective.ts:73](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/content-navigation/ContentFragmentLinkDirective.ts#L73)

Updates the active outline immediately, while native fragment navigation scrolls the page.

#### Returns

`void`
