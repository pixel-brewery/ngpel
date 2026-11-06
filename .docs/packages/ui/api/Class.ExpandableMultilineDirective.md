---
title: 'Class: ExpandableMultilineDirective'
generated: true
editUrl: false
---
# Class: ExpandableMultilineDirective

Defined in: libs/ui/src/directives/expandable-multiline/ExpandableMultilineDirective.ts:55

## Implements

- `AfterViewInit`

## Constructors

### Constructor

```ts
new ExpandableMultilineDirective(): ExpandableMultilineDirective;
```

Defined in: libs/ui/src/directives/expandable-multiline/ExpandableMultilineDirective.ts:76

#### Returns

`ExpandableMultilineDirective`

## Properties

### isExpanded

```ts
readonly isExpanded: Signal<boolean>;
```

Defined in: libs/ui/src/directives/expandable-multiline/ExpandableMultilineDirective.ts:118

Whether the host field currently occupies its expansion boundary.

## Accessors

### configuration

#### Set Signature

```ts
set configuration(value): void;
```

Defined in: libs/ui/src/directives/expandable-multiline/ExpandableMultilineDirective.ts:113

##### Parameters

| Parameter | Type |
| ------ | ------ |
| `value` | \| `""` \| [`IExpandableMultilineConfiguration`](Interface.IExpandableMultilineConfiguration) \| `null` \| `undefined` |

##### Returns

`void`

## Methods

### ngAfterViewInit()

```ts
ngAfterViewInit(): void;
```

Defined in: libs/ui/src/directives/expandable-multiline/ExpandableMultilineDirective.ts:120

A callback method that is invoked immediately after
Angular has completed initialization of a component's view.
It is invoked only once when the view is instantiated.

#### Returns

`void`

#### Implementation of

```ts
AfterViewInit.ngAfterViewInit
```
