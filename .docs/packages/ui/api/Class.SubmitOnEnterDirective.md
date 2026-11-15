---
title: 'Class: SubmitOnEnterDirective'
generated: true
editUrl: false
---
# Class: SubmitOnEnterDirective

Defined in: [libs/ui/src/directives/submit-on-enter/SubmitOnEnterDirective.ts:24](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/directives/submit-on-enter/SubmitOnEnterDirective.ts#L24)

Submits the containing form when Enter is pressed on a marked input.

Use this on inputs that need an explicit keyboard submission. Submission runs through
the browser's form validation and submit event. Enter during text composition is ignored.

## Example

```html
<form (submit)="submit($event)">
    <mosaik-textbox ngpSubmitOnEnter />
</form>
```

## Constructors

### Constructor

```ts
new SubmitOnEnterDirective(): SubmitOnEnterDirective;
```

#### Returns

`SubmitOnEnterDirective`

## Methods

### onEnter()

```ts
protected onEnter(event): void;
```

Defined in: [libs/ui/src/directives/submit-on-enter/SubmitOnEnterDirective.ts:33](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/directives/submit-on-enter/SubmitOnEnterDirective.ts#L33)

Forwards a completed Enter keystroke to the containing form.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `event` | `Event` | The keyboard event from the marked input. |

#### Returns

`void`
