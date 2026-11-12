---
title: 'Class: EntityPickerFieldComponent'
generated: true
editUrl: false
---
# Class: EntityPickerFieldComponent

Defined in: [libs/ui/src/components/entity-picker-field/EntityPickerFieldComponent.ts:63](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/entity-picker-field/EntityPickerFieldComponent.ts#L63)

Presents the label of a selected entity and delegates choosing or clearing it to caller commands.
The value of a surrounding form field can remain an identifier independent of the display text.

## Constructors

### Constructor

```ts
new EntityPickerFieldComponent(): EntityPickerFieldComponent;
```

#### Returns

`EntityPickerFieldComponent`

## Properties

### actionsAvailable

```ts
protected readonly actionsAvailable: Signal<boolean>;
```

Defined in: [libs/ui/src/components/entity-picker-field/EntityPickerFieldComponent.ts:120](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/entity-picker-field/EntityPickerFieldComponent.ts#L120)

***

### availableClearCommand

```ts
protected readonly availableClearCommand: Signal<Command<unknown> | undefined>;
```

Defined in: [libs/ui/src/components/entity-picker-field/EntityPickerFieldComponent.ts:121](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/entity-picker-field/EntityPickerFieldComponent.ts#L121)

***

### clearable

```ts
readonly clearable: InputSignal<boolean>;
```

Defined in: [libs/ui/src/components/entity-picker-field/EntityPickerFieldComponent.ts:91](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/entity-picker-field/EntityPickerFieldComponent.ts#L91)

Allows clearing the current selection.

***

### clearActionLabel

```ts
readonly clearActionLabel: InputSignal<string>;
```

Defined in: [libs/ui/src/components/entity-picker-field/EntityPickerFieldComponent.ts:97](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/entity-picker-field/EntityPickerFieldComponent.ts#L97)

Accessible label required to show the clear action.

***

### clearActionTestId

```ts
readonly clearActionTestId: InputSignal<string | undefined>;
```

Defined in: [libs/ui/src/components/entity-picker-field/EntityPickerFieldComponent.ts:115](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/entity-picker-field/EntityPickerFieldComponent.ts#L115)

Optional explicit automation identifier for the clear action.

***

### clearCommand

```ts
readonly clearCommand: InputSignal<Command<unknown> | undefined>;
```

Defined in: [libs/ui/src/components/entity-picker-field/EntityPickerFieldComponent.ts:103](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/entity-picker-field/EntityPickerFieldComponent.ts#L103)

Command that clears the current selection.

***

### commandParameter

```ts
readonly commandParameter: InputSignal<unknown>;
```

Defined in: [libs/ui/src/components/entity-picker-field/EntityPickerFieldComponent.ts:109](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/entity-picker-field/EntityPickerFieldComponent.ts#L109)

Optional parameter passed to either command.

***

### disabled

```ts
readonly disabled: InputSignal<boolean>;
```

Defined in: [libs/ui/src/components/entity-picker-field/EntityPickerFieldComponent.ts:85](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/entity-picker-field/EntityPickerFieldComponent.ts#L85)

Disables the field and its picker actions.

***

### editable

```ts
readonly editable: InputSignal<boolean>;
```

Defined in: [libs/ui/src/components/entity-picker-field/EntityPickerFieldComponent.ts:88](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/entity-picker-field/EntityPickerFieldComponent.ts#L88)

Allows selection changes through the picker actions.

***

### invalid

```ts
protected readonly invalid: Signal<boolean>;
```

Defined in: [libs/ui/src/components/entity-picker-field/EntityPickerFieldComponent.ts:124](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/entity-picker-field/EntityPickerFieldComponent.ts#L124)

***

### label

```ts
readonly label: InputSignal<string>;
```

Defined in: [libs/ui/src/components/entity-picker-field/EntityPickerFieldComponent.ts:76](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/entity-picker-field/EntityPickerFieldComponent.ts#L76)

Visible field label.

***

### openActionLabel

```ts
readonly openActionLabel: InputSignal<string>;
```

Defined in: [libs/ui/src/components/entity-picker-field/EntityPickerFieldComponent.ts:100](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/entity-picker-field/EntityPickerFieldComponent.ts#L100)

Accessible label for the picker action.

***

### openActionTestId

```ts
readonly openActionTestId: InputSignal<string | undefined>;
```

Defined in: [libs/ui/src/components/entity-picker-field/EntityPickerFieldComponent.ts:118](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/entity-picker-field/EntityPickerFieldComponent.ts#L118)

Optional explicit automation identifier for the picker action.

***

### openCommand

```ts
readonly openCommand: InputSignal<Command<unknown>>;
```

Defined in: [libs/ui/src/components/entity-picker-field/EntityPickerFieldComponent.ts:106](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/entity-picker-field/EntityPickerFieldComponent.ts#L106)

Command that opens the picker.

***

### placeholder

```ts
readonly placeholder: InputSignal<string>;
```

Defined in: [libs/ui/src/components/entity-picker-field/EntityPickerFieldComponent.ts:79](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/entity-picker-field/EntityPickerFieldComponent.ts#L79)

Hint displayed when the selection has no label.

***

### required

```ts
readonly required: InputSignal<boolean>;
```

Defined in: [libs/ui/src/components/entity-picker-field/EntityPickerFieldComponent.ts:82](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/entity-picker-field/EntityPickerFieldComponent.ts#L82)

Whether the selection is required.

***

### selected

```ts
readonly selected: InputSignal<boolean>;
```

Defined in: [libs/ui/src/components/entity-picker-field/EntityPickerFieldComponent.ts:94](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/entity-picker-field/EntityPickerFieldComponent.ts#L94)

Indicates whether an entity is selected, independently of its display label.

***

### testId

```ts
readonly testId: InputSignal<string | undefined>;
```

Defined in: [libs/ui/src/components/entity-picker-field/EntityPickerFieldComponent.ts:112](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/entity-picker-field/EntityPickerFieldComponent.ts#L112)

Automation identifier for the textbox.

***

### value

```ts
readonly value: InputSignal<string>;
```

Defined in: [libs/ui/src/components/entity-picker-field/EntityPickerFieldComponent.ts:73](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/entity-picker-field/EntityPickerFieldComponent.ts#L73)

Display value of the selected entity.

## Methods

### actionTestId()

```ts
protected actionTestId(action): string | undefined;
```

Defined in: [libs/ui/src/components/entity-picker-field/EntityPickerFieldComponent.ts:134](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/entity-picker-field/EntityPickerFieldComponent.ts#L134)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `action` | `"clear"` \| `"open"` |

#### Returns

`string` \| `undefined`
