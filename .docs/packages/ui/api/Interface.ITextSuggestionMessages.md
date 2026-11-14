---
title: 'Interface: ITextSuggestionMessages'
generated: true
editUrl: false
---
# Interface: ITextSuggestionMessages

Defined in: [libs/ui/src/directives/input-suggestions/ITextSuggestionMessages.ts:2](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/directives/input-suggestions/ITextSuggestionMessages.ts#L2)

Localized labels used by a whole-field suggestion list.

## Properties

### empty

```ts
readonly empty: string;
```

Defined in: [libs/ui/src/directives/input-suggestions/ITextSuggestionMessages.ts:10](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/directives/input-suggestions/ITextSuggestionMessages.ts#L10)

Status shown when the source returns no results.

***

### error

```ts
readonly error: string;
```

Defined in: [libs/ui/src/directives/input-suggestions/ITextSuggestionMessages.ts:13](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/directives/input-suggestions/ITextSuggestionMessages.ts#L13)

Status shown when the source fails.

***

### label?

```ts
readonly label?: string;
```

Defined in: [libs/ui/src/directives/input-suggestions/ITextSuggestionMessages.ts:4](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/directives/input-suggestions/ITextSuggestionMessages.ts#L4)

Accessible name of the listbox.

***

### loading

```ts
readonly loading: string;
```

Defined in: [libs/ui/src/directives/input-suggestions/ITextSuggestionMessages.ts:7](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/directives/input-suggestions/ITextSuggestionMessages.ts#L7)

Status shown during debounce and source lookup.
