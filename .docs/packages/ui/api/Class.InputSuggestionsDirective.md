---
title: 'Class: InputSuggestionsDirective\<TOption\>'
generated: true
editUrl: false
---
# Class: InputSuggestionsDirective\<TOption\>

Defined in: [libs/ui/src/directives/input-suggestions/InputSuggestionsDirective.ts:40](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/directives/input-suggestions/InputSuggestionsDirective.ts#L40)

Adds whole-field suggestions to an editable input. Selection emits the original option;
the caller owns writing the selected value to its form.

## Type Parameters

| Type Parameter | Default type |
| ------ | ------ |
| <a id="type-parameter-toption"></a> `TOption` *extends* [`ITextSuggestionOption`](Interface.ITextSuggestionOption) | [`ITextSuggestionOption`](Interface.ITextSuggestionOption) |

## Constructors

### Constructor

```ts
new InputSuggestionsDirective<TOption>(): InputSuggestionsDirective<TOption>;
```

Defined in: [libs/ui/src/directives/input-suggestions/InputSuggestionsDirective.ts:63](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/directives/input-suggestions/InputSuggestionsDirective.ts#L63)

Listens before the input control can submit or consume an option key.

#### Returns

`InputSuggestionsDirective`\<`TOption`\>

## Properties

### attribution

```ts
readonly attribution: InputSignal<string | null>;
```

Defined in: [libs/ui/src/directives/input-suggestions/InputSuggestionsDirective.ts:90](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/directives/input-suggestions/InputSuggestionsDirective.ts#L90)

Optional attribution displayed beneath results.

***

### delay

```ts
readonly delay: InputSignal<number>;
```

Defined in: [libs/ui/src/directives/input-suggestions/InputSuggestionsDirective.ts:87](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/directives/input-suggestions/InputSuggestionsDirective.ts#L87)

Debounce in milliseconds.

***

### isOpen

```ts
readonly isOpen: Signal<boolean>;
```

Defined in: [libs/ui/src/directives/input-suggestions/InputSuggestionsDirective.ts:96](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/directives/input-suggestions/InputSuggestionsDirective.ts#L96)

Whether the listbox is open.

***

### menuId

```ts
readonly menuId: string;
```

Defined in: [libs/ui/src/directives/input-suggestions/InputSuggestionsDirective.ts:99](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/directives/input-suggestions/InputSuggestionsDirective.ts#L99)

Stable accessibility ID of the listbox.

***

### messages

```ts
readonly messages: InputSignal<ITextSuggestionMessages>;
```

Defined in: [libs/ui/src/directives/input-suggestions/InputSuggestionsDirective.ts:81](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/directives/input-suggestions/InputSuggestionsDirective.ts#L81)

Localized listbox and request state labels.

***

### minimumLength

```ts
readonly minimumLength: InputSignal<number>;
```

Defined in: [libs/ui/src/directives/input-suggestions/InputSuggestionsDirective.ts:84](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/directives/input-suggestions/InputSuggestionsDirective.ts#L84)

Minimum query length before the source is called.

***

### selected

```ts
readonly selected: OutputEmitterRef<TOption>;
```

Defined in: [libs/ui/src/directives/input-suggestions/InputSuggestionsDirective.ts:93](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/directives/input-suggestions/InputSuggestionsDirective.ts#L93)

Emits the selected result, including any extra data supplied by the source.

***

### source

```ts
readonly source: InputSignal<InputSuggestionSource<TOption>>;
```

Defined in: [libs/ui/src/directives/input-suggestions/InputSuggestionsDirective.ts:78](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/directives/input-suggestions/InputSuggestionsDirective.ts#L78)

Source called for each distinct query after the debounce.

## Methods

### dismiss()

```ts
dismiss(): void;
```

Defined in: [libs/ui/src/directives/input-suggestions/InputSuggestionsDirective.ts:147](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/directives/input-suggestions/InputSuggestionsDirective.ts#L147)

Closes suggestions and cancels the pending lookup.

#### Returns

`void`

***

### onCompositionEnd()

```ts
protected onCompositionEnd(event): void;
```

Defined in: [libs/ui/src/directives/input-suggestions/InputSuggestionsDirective.ts:172](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/directives/input-suggestions/InputSuggestionsDirective.ts#L172)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `event` | `Event` |

#### Returns

`void`

***

### onCompositionStart()

```ts
protected onCompositionStart(): void;
```

Defined in: [libs/ui/src/directives/input-suggestions/InputSuggestionsDirective.ts:167](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/directives/input-suggestions/InputSuggestionsDirective.ts#L167)

#### Returns

`void`

***

### onFocusIn()

```ts
protected onFocusIn(event): void;
```

Defined in: [libs/ui/src/directives/input-suggestions/InputSuggestionsDirective.ts:154](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/directives/input-suggestions/InputSuggestionsDirective.ts#L154)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `event` | `Event` |

#### Returns

`void`

***

### onFocusOut()

```ts
protected onFocusOut(event): void;
```

Defined in: [libs/ui/src/directives/input-suggestions/InputSuggestionsDirective.ts:158](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/directives/input-suggestions/InputSuggestionsDirective.ts#L158)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `event` | `Event` |

#### Returns

`void`

***

### refresh()

```ts
refresh(event?): void;
```

Defined in: [libs/ui/src/directives/input-suggestions/InputSuggestionsDirective.ts:106](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/directives/input-suggestions/InputSuggestionsDirective.ts#L106)

Refreshes results from the current editable value.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `event?` | `Event` |

#### Returns

`void`
