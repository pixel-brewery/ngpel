---
title: 'Class: CommandDirective'
generated: true
editUrl: false
---
# Class: CommandDirective

Defined in: [commands/CommandDirective.ts:32](https://github.com/pixel-brewery/ngpel/blob/main/libs/mvp/src/commands/CommandDirective.ts#L32)

Binds commands to the events of the host element.

The binding is an explicit event-to-command map rather than one command per event, so a single
element can answer several events — a Mosaik control that raises both `click` and a custom
`revealed` event, for instance — without stacking directives. Modifier syntax such as
`keydown.enter` is deliberately rejected: this directive attaches plain DOM listeners, and a
modifier key would silently never fire.

The command parameter is resolved in three steps: an explicit `ngpCommandParameter` wins, then a
mapper supplied through `ngpCommandParameterFromEvent`, then the `detail` of a `CustomEvent`, and
finally the event itself.

## Example

```html
<button type="button" [ngpCommand]="{ click: save }">Save</button>
```

## Constructors

### Constructor

```ts
new CommandDirective(elementRef?, destroyRef?): CommandDirective;
```

Defined in: [commands/CommandDirective.ts:50](https://github.com/pixel-brewery/ngpel/blob/main/libs/mvp/src/commands/CommandDirective.ts#L50)

Constructs a new instance of the `CommandDirective` class.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `elementRef` | `ElementRef`\<`HTMLElement`\> | The host element the listeners are attached to. |
| `destroyRef` | `DestroyRef` | The lifetime the listeners are bound to. |

#### Returns

`CommandDirective`

## Properties

### command

```ts
readonly command: ModelSignal<Readonly<Record<string, Command<unknown>>>>;
```

Defined in: [commands/CommandDirective.ts:75](https://github.com/pixel-brewery/ngpel/blob/main/libs/mvp/src/commands/CommandDirective.ts#L75)

The event-to-command bindings, for example `{ click: save, revealed: reveal }`.

***

### commandParameter

```ts
readonly commandParameter: InputSignal<unknown>;
```

Defined in: [commands/CommandDirective.ts:86](https://github.com/pixel-brewery/ngpel/blob/main/libs/mvp/src/commands/CommandDirective.ts#L86)

A fixed parameter that overrides whatever the event carries.

***

### commandParameterFromEvent

```ts
readonly commandParameterFromEvent: InputSignal<((event) => unknown) | undefined>;
```

Defined in: [commands/CommandDirective.ts:94](https://github.com/pixel-brewery/ngpel/blob/main/libs/mvp/src/commands/CommandDirective.ts#L94)

Derives the command parameter from the event.

***

### preventDefault

```ts
readonly preventDefault: InputSignal<boolean>;
```

Defined in: [commands/CommandDirective.ts:105](https://github.com/pixel-brewery/ngpel/blob/main/libs/mvp/src/commands/CommandDirective.ts#L105)

Whether the default browser behavior of the event is prevented.

***

### stopPropagation

```ts
readonly stopPropagation: InputSignal<boolean>;
```

Defined in: [commands/CommandDirective.ts:113](https://github.com/pixel-brewery/ngpel/blob/main/libs/mvp/src/commands/CommandDirective.ts#L113)

Whether the event stops propagating.
