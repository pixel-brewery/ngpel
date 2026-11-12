---
title: 'Class: InputSuggestionsDirective\<TOption\>'
generated: true
editUrl: false
---
# Class: InputSuggestionsDirective\<TOption\>

Defined in: [libs/ui/src/directives/input-suggestions/InputSuggestionsDirective.ts:39](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/directives/input-suggestions/InputSuggestionsDirective.ts#L39)

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

Defined in: [libs/ui/src/directives/input-suggestions/InputSuggestionsDirective.ts:62](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/directives/input-suggestions/InputSuggestionsDirective.ts#L62)

Listens before the input control can submit or consume an option key.

#### Returns

`InputSuggestionsDirective`\<`TOption`\>

## Properties

### attribution

```ts
readonly attribution: InputSignal<string | null>;
```

Defined in: [libs/ui/src/directives/input-suggestions/InputSuggestionsDirective.ts:89](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/directives/input-suggestions/InputSuggestionsDirective.ts#L89)

Optional attribution displayed beneath results.

***

### delay

```ts
readonly delay: InputSignal<number>;
```

Defined in: [libs/ui/src/directives/input-suggestions/InputSuggestionsDirective.ts:86](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/directives/input-suggestions/InputSuggestionsDirective.ts#L86)

Debounce in milliseconds.

***

### isOpen

```ts
readonly isOpen: Signal<boolean>;
```

Defined in: [libs/ui/src/directives/input-suggestions/InputSuggestionsDirective.ts:95](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/directives/input-suggestions/InputSuggestionsDirective.ts#L95)

Whether the listbox is open.

***

### menuId

```ts
readonly menuId: string;
```

Defined in: [libs/ui/src/directives/input-suggestions/InputSuggestionsDirective.ts:98](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/directives/input-suggestions/InputSuggestionsDirective.ts#L98)

Stable accessibility ID of the listbox.

***

### messages

```ts
readonly messages: InputSignal<ITextSuggestionMessages>;
```

Defined in: [libs/ui/src/directives/input-suggestions/InputSuggestionsDirective.ts:80](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/directives/input-suggestions/InputSuggestionsDirective.ts#L80)

Localized listbox and request state labels.

***

### minimumLength

```ts
readonly minimumLength: InputSignal<number>;
```

Defined in: [libs/ui/src/directives/input-suggestions/InputSuggestionsDirective.ts:83](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/directives/input-suggestions/InputSuggestionsDirective.ts#L83)

Minimum query length before the source is called.

***

### selected

```ts
readonly selected: OutputEmitterRef<TOption>;
```

Defined in: [libs/ui/src/directives/input-suggestions/InputSuggestionsDirective.ts:92](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/directives/input-suggestions/InputSuggestionsDirective.ts#L92)

Emits the selected result, including any extra data supplied by the source.

***

### source

```ts
readonly source: InputSignal<InputSuggestionSource<TOption>>;
```

Defined in: [libs/ui/src/directives/input-suggestions/InputSuggestionsDirective.ts:77](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/directives/input-suggestions/InputSuggestionsDirective.ts#L77)

Source called for each distinct query after the debounce.

## Methods

### dismiss()

```ts
dismiss(): void;
```

Defined in: [libs/ui/src/directives/input-suggestions/InputSuggestionsDirective.ts:146](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/directives/input-suggestions/InputSuggestionsDirective.ts#L146)

Closes suggestions and cancels the pending lookup.

#### Returns

`void`

***

### onCompositionEnd()

```ts
protected onCompositionEnd(event): void;
```

Defined in: [libs/ui/src/directives/input-suggestions/InputSuggestionsDirective.ts:171](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/directives/input-suggestions/InputSuggestionsDirective.ts#L171)

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

Defined in: [libs/ui/src/directives/input-suggestions/InputSuggestionsDirective.ts:166](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/directives/input-suggestions/InputSuggestionsDirective.ts#L166)

#### Returns

`void`

***

### onFocusIn()

```ts
protected onFocusIn(event): void;
```

Defined in: [libs/ui/src/directives/input-suggestions/InputSuggestionsDirective.ts:153](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/directives/input-suggestions/InputSuggestionsDirective.ts#L153)

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

Defined in: [libs/ui/src/directives/input-suggestions/InputSuggestionsDirective.ts:157](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/directives/input-suggestions/InputSuggestionsDirective.ts#L157)

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

Defined in: [libs/ui/src/directives/input-suggestions/InputSuggestionsDirective.ts:105](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/directives/input-suggestions/InputSuggestionsDirective.ts#L105)

Refreshes results from the current editable value.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `event?` | `Event` |

#### Returns

`void`
