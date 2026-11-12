---
title: 'Class: PagePathComponent'
generated: true
editUrl: false
---
# Class: PagePathComponent

Defined in: [libs/ui/src/components/page-path/PagePathComponent.ts:12](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/page-path/PagePathComponent.ts#L12)

Declares the path of the enclosing page for the shell's path outlet.

## Implements

- `OnInit`

## Constructors

### Constructor

```ts
new PagePathComponent(): PagePathComponent;
```

#### Returns

`PagePathComponent`

## Properties

### levels

```ts
readonly levels: InputSignal<readonly IPagePathLevel[]>;
```

Defined in: [libs/ui/src/components/page-path/PagePathComponent.ts:23](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/page-path/PagePathComponent.ts#L23)

Path ordered from the outermost context to the current page.

## Methods

### ngOnInit()

```ts
ngOnInit(): void;
```

Defined in: [libs/ui/src/components/page-path/PagePathComponent.ts:30](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/page-path/PagePathComponent.ts#L30)

Registers the path after Angular sets its input.

#### Returns

`void`

#### Implementation of

`OnInit.ngOnInit`
