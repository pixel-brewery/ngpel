---
title: 'Class: ContentTableOfContentsComponent'
generated: true
editUrl: false
---
# Class: ContentTableOfContentsComponent

Defined in: [libs/ui/src/components/content-navigation/ContentTableOfContentsComponent.ts:103](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/content-navigation/ContentTableOfContentsComponent.ts#L103)

Renders an accessible fragment-link navigation for registered page content.

## Constructors

### Constructor

```ts
new ContentTableOfContentsComponent(): ContentTableOfContentsComponent;
```

#### Returns

`ContentTableOfContentsComponent`

## Properties

### label

```ts
readonly label: InputSignal<string>;
```

Defined in: [libs/ui/src/components/content-navigation/ContentTableOfContentsComponent.ts:115](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/content-navigation/ContentTableOfContentsComponent.ts#L115)

Accessible label and visible heading for the navigation.

***

### orientation

```ts
readonly orientation: InputSignal<"horizontal" | "vertical">;
```

Defined in: [libs/ui/src/components/content-navigation/ContentTableOfContentsComponent.ts:123](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/content-navigation/ContentTableOfContentsComponent.ts#L123)

Layout direction used by the surrounding shell.

## Accessors

### activeItemId

#### Get Signature

```ts
get protected activeItemId(): Signal<string | null>;
```

Defined in: [libs/ui/src/components/content-navigation/ContentTableOfContentsComponent.ts:151](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/content-navigation/ContentTableOfContentsComponent.ts#L151)

Destination currently represented by the viewport.

##### Returns

`Signal`\<`string` \| `null`\>

***

### items

#### Get Signature

```ts
get protected items(): Signal<readonly IContentNavigationItem[]>;
```

Defined in: [libs/ui/src/components/content-navigation/ContentTableOfContentsComponent.ts:141](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/content-navigation/ContentTableOfContentsComponent.ts#L141)

Registered destinations visible to the template.

##### Returns

`Signal`\<readonly [`IContentNavigationItem`](Interface.IContentNavigationItem)[]\>
