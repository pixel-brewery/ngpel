---
title: 'Class: CommandDirective'
generated: true
editUrl: false
---
# Class: CommandDirective

Defined in: [commands/CommandDirective.ts:37](https://github.com/pixel-brewery/ngpel/blob/main/libs/mvp/src/commands/CommandDirective.ts#L37)

Binds commands to the events of the host element.

The binding is an explicit event-to-command map rather than one command per event, so a single
element can answer several events — a Mosaik control that raises both `click` and a custom
`revealed` event, for instance — without stacking directives. Modifier syntax such as
`keydown.enter` is deliberately rejected: this directive attaches plain DOM listeners, and a
modifier key would silently never fire.

The command parameter is resolved in three steps: an explicit `ngpCommandParameter` wins, then a
mapper supplied through `ngpCommandParameterFromEvent`, then the `detail` of a `CustomEvent`, and
finally the event itself.

A `click` command that cannot execute disables its host, so a click is never swallowed silently. A
`[disabled]` binding on the same element still applies: the host is disabled while either is true.
Commands that must stay clickable — for example to report why an action is not possible — keep
`canExecute` true and explain the reason when they run.

## Example

```html
<button type="button" [ngpCommand]="{ click: save }">Save</button>
```

## Constructors

### Constructor

```ts
new CommandDirective(elementRef?, destroyRef?): CommandDirective;
```

Defined in: [commands/CommandDirective.ts:55](https://github.com/pixel-brewery/ngpel/blob/main/libs/mvp/src/commands/CommandDirective.ts#L55)

Constructs a new instance of the `CommandDirective` class.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `elementRef?` | `ElementRef`\<`HTMLElement`\> | The host element the listeners are attached to. |
| `destroyRef?` | `DestroyRef` | The lifetime the listeners are bound to. |

#### Returns

`CommandDirective`

## Properties

### command

```ts
readonly command: ModelSignal<Readonly<Record<string, Command<unknown>>>>;
```

Defined in: [commands/CommandDirective.ts:85](https://github.com/pixel-brewery/ngpel/blob/main/libs/mvp/src/commands/CommandDirective.ts#L85)

The event-to-command bindings, for example `{ click: save, revealed: reveal }`.

***

### commandParameter

```ts
readonly commandParameter: InputSignal<unknown>;
```

Defined in: [commands/CommandDirective.ts:96](https://github.com/pixel-brewery/ngpel/blob/main/libs/mvp/src/commands/CommandDirective.ts#L96)

A fixed parameter that overrides whatever the event carries.

***

### commandParameterFromEvent

```ts
readonly commandParameterFromEvent: InputSignal<((event) => unknown) | undefined>;
```

Defined in: [commands/CommandDirective.ts:104](https://github.com/pixel-brewery/ngpel/blob/main/libs/mvp/src/commands/CommandDirective.ts#L104)

Derives the command parameter from the event.

***

### disabled

```ts
readonly disabled: InputSignal<boolean | null | undefined>;
```

Defined in: [commands/CommandDirective.ts:131](https://github.com/pixel-brewery/ngpel/blob/main/libs/mvp/src/commands/CommandDirective.ts#L131)

The element's own `[disabled]` binding; the host is disabled while it is set or the `click` command cannot execute.

***

### preventDefault

```ts
readonly preventDefault: InputSignal<boolean>;
```

Defined in: [commands/CommandDirective.ts:115](https://github.com/pixel-brewery/ngpel/blob/main/libs/mvp/src/commands/CommandDirective.ts#L115)

Whether the default browser behavior of the event is prevented.

***

### stopPropagation

```ts
readonly stopPropagation: InputSignal<boolean>;
```

Defined in: [commands/CommandDirective.ts:123](https://github.com/pixel-brewery/ngpel/blob/main/libs/mvp/src/commands/CommandDirective.ts#L123)

Whether the event stops propagating.
