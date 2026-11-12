---
title: 'Class: PseudoLinkDirective'
generated: true
editUrl: false
---
# Class: PseudoLinkDirective

Defined in: [libs/ui/src/directives/pseudo-link/PseudoLinkDirective.ts:26](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/directives/pseudo-link/PseudoLinkDirective.ts#L26)

Removes the user-agent link styling from an anchor element while preserving every link
capability: routing, `href`, context menu, middle-click and keyboard activation. Use it when an
anchor wraps composed content such as cards, brand marks or table cells; text-only hyperlinks
keep the regular anchor styling.

## Example

```html
<a ngpPseudoLink [routerLink]="['/tickets', ticket.id]" title="Open ticket">
    <my-ticket-card [ticket]="ticket" />
</a>
```

## Implements

- `OnInit`

## Constructors

### Constructor

```ts
new PseudoLinkDirective(elementRef?, renderer?): PseudoLinkDirective;
```

Defined in: [libs/ui/src/directives/pseudo-link/PseudoLinkDirective.ts:43](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/directives/pseudo-link/PseudoLinkDirective.ts#L43)

Constructs a new instance of the `PseudoLinkDirective` class.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `elementRef?` | `ElementRef`\<`HTMLElement`\> | The host anchor element. |
| `renderer?` | `Renderer2` | The renderer used to apply the neutralising styles. |

#### Returns

`PseudoLinkDirective`

## Methods

### ngOnInit()

```ts
ngOnInit(): void;
```

Defined in: [libs/ui/src/directives/pseudo-link/PseudoLinkDirective.ts:57](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/directives/pseudo-link/PseudoLinkDirective.ts#L57)

Neutralises the user-agent link styling on initialisation.

#### Returns

`void`

#### Implementation of

`OnInit.ngOnInit`
