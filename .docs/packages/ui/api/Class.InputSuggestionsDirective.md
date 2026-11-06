---
title: 'Class: InputSuggestionsDirective\<TOption\>'
generated: true
editUrl: false
---
# Class: InputSuggestionsDirective\<TOption\>

Defined in: libs/ui/src/directives/input-suggestions/InputSuggestionsDirective.ts:39

Adds whole-field suggestions to an editable input. Selection emits the original option;
the caller owns writing the selected value to its form.

## Type Parameters

| Type Parameter | Default type |
| ------ | ------ |
| `TOption` *extends* [`ITextSuggestionOption`](Interface.ITextSuggestionOption) | [`ITextSuggestionOption`](Interface.ITextSuggestionOption) |

## Constructors

### Constructor

```ts
new InputSuggestionsDirective<TOption>(): InputSuggestionsDirective<TOption>;
```

Defined in: libs/ui/src/directives/input-suggestions/InputSuggestionsDirective.ts:62

Listens before the input control can submit or consume an option key.

#### Returns

`InputSuggestionsDirective`\<`TOption`\>

## Properties

### attribution

```ts
readonly attribution: InputSignal<string | null>;
```

Defined in: libs/ui/src/directives/input-suggestions/InputSuggestionsDirective.ts:89

Optional attribution displayed beneath results.

***

### delay

```ts
readonly delay: InputSignal<number>;
```

Defined in: libs/ui/src/directives/input-suggestions/InputSuggestionsDirective.ts:86

Debounce in milliseconds.

***

### isOpen

```ts
readonly isOpen: Signal<boolean>;
```

Defined in: libs/ui/src/directives/input-suggestions/InputSuggestionsDirective.ts:95

Whether the listbox is open.

***

### menuId

```ts
readonly menuId: string;
```

Defined in: libs/ui/src/directives/input-suggestions/InputSuggestionsDirective.ts:98

Stable accessibility ID of the listbox.

***

### messages

```ts
readonly messages: InputSignal<ITextSuggestionMessages>;
```

Defined in: libs/ui/src/directives/input-suggestions/InputSuggestionsDirective.ts:80

Localized listbox and request state labels.

***

### minimumLength

```ts
readonly minimumLength: InputSignal<number>;
```

Defined in: libs/ui/src/directives/input-suggestions/InputSuggestionsDirective.ts:83

Minimum query length before the source is called.

***

### selected

```ts
readonly selected: OutputEmitterRef<TOption>;
```

Defined in: libs/ui/src/directives/input-suggestions/InputSuggestionsDirective.ts:92

Emits the selected result, including any extra data supplied by the source.

***

### source

```ts
readonly source: InputSignal<InputSuggestionSource<TOption>>;
```

Defined in: libs/ui/src/directives/input-suggestions/InputSuggestionsDirective.ts:77

Source called for each distinct query after the debounce.

## Methods

### dismiss()

```ts
dismiss(): void;
```

Defined in: libs/ui/src/directives/input-suggestions/InputSuggestionsDirective.ts:146

Closes suggestions and cancels the pending lookup.

#### Returns

`void`

***

### onCompositionEnd()

```ts
protected onCompositionEnd(event): void;
```

Defined in: libs/ui/src/directives/input-suggestions/InputSuggestionsDirective.ts:171

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

Defined in: libs/ui/src/directives/input-suggestions/InputSuggestionsDirective.ts:166

#### Returns

`void`

***

### onFocusIn()

```ts
protected onFocusIn(event): void;
```

Defined in: libs/ui/src/directives/input-suggestions/InputSuggestionsDirective.ts:153

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

Defined in: libs/ui/src/directives/input-suggestions/InputSuggestionsDirective.ts:157

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

Defined in: libs/ui/src/directives/input-suggestions/InputSuggestionsDirective.ts:105

Refreshes results from the current editable value.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `event?` | `Event` |

#### Returns

`void`
