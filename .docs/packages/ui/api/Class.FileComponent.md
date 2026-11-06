---
title: 'Class: FileComponent'
generated: true
editUrl: false
---
# Class: FileComponent

Defined in: [libs/ui/src/components/file/FileComponent.ts:350](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/file/FileComponent.ts#L350)

Displays one file as a Mosaik-based list row, gallery tile, or full-width preview.

## Constructors

### Constructor

```ts
new FileComponent(): FileComponent;
```

#### Returns

`FileComponent`

## Properties

### actionSize

```ts
protected readonly actionSize: Signal<Size>;
```

Defined in: [libs/ui/src/components/file/FileComponent.ts:614](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/file/FileComponent.ts#L614)

Mosaik action-button size derived from the file size.

***

### actionsLabel

```ts
readonly actionsLabel: InputSignal<string | null>;
```

Defined in: [libs/ui/src/components/file/FileComponent.ts:502](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/file/FileComponent.ts#L502)

Accessible label of the contextual action menu; falls back to the file name.

***

### actionsTestId

```ts
protected readonly actionsTestId: Signal<string | null>;
```

Defined in: [libs/ui/src/components/file/FileComponent.ts:826](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/file/FileComponent.ts#L826)

Automation identifier of the contextual action menu.

***

### availableOpenLabel

```ts
protected readonly availableOpenLabel: Signal<string | null>;
```

Defined in: [libs/ui/src/components/file/FileComponent.ts:745](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/file/FileComponent.ts#L745)

Open-action label exposed only while the represented file is available.

***

### description

```ts
readonly description: InputSignal<string | null>;
```

Defined in: [libs/ui/src/components/file/FileComponent.ts:382](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/file/FileComponent.ts#L382)

Optional file metadata or status description.

***

### disabled

```ts
readonly disabled: InputSignal<boolean>;
```

Defined in: [libs/ui/src/components/file/FileComponent.ts:462](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/file/FileComponent.ts#L462)

Indicates whether file interactions are disabled.

***

### fileName

```ts
readonly fileName: InputSignal<string>;
```

Defined in: [libs/ui/src/components/file/FileComponent.ts:374](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/file/FileComponent.ts#L374)

Primary file name.

***

### fileState

```ts
protected readonly fileState: {
  Error: "error";
  Loading: "loading";
  Normal: "normal";
  Progress: "progress";
  Retry: "retry";
  Unavailable: "unavailable";
} = FileState;
```

Defined in: [libs/ui/src/components/file/FileComponent.ts:558](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/file/FileComponent.ts#L558)

File-state constants exposed to the template.

#### Error

```ts
readonly Error: "error" = 'error';
```

#### Loading

```ts
readonly Loading: "loading" = 'loading';
```

#### Normal

```ts
readonly Normal: "normal" = 'normal';
```

#### Progress

```ts
readonly Progress: "progress" = 'progress';
```

#### Retry

```ts
readonly Retry: "retry" = 'retry';
```

#### Unavailable

```ts
readonly Unavailable: "unavailable" = 'unavailable';
```

***

### hasActions

```ts
protected readonly hasActions: Signal<boolean>;
```

Defined in: [libs/ui/src/components/file/FileComponent.ts:761](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/file/FileComponent.ts#L761)

Indicates whether at least one contextual action is currently offered.

***

### isBusy

```ts
protected readonly isBusy: Signal<boolean>;
```

Defined in: [libs/ui/src/components/file/FileComponent.ts:713](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/file/FileComponent.ts#L713)

Indicates whether assistive technologies should treat the file as busy.

***

### isCompact

```ts
protected readonly isCompact: Signal<boolean>;
```

Defined in: [libs/ui/src/components/file/FileComponent.ts:590](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/file/FileComponent.ts#L590)

Indicates whether the current Mosaik size uses the compact preview preset.

***

### isLarge

```ts
protected readonly isLarge: Signal<boolean>;
```

Defined in: [libs/ui/src/components/file/FileComponent.ts:602](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/file/FileComponent.ts#L602)

Indicates whether the current Mosaik size uses the large preview preset.

***

### isList

```ts
protected readonly isList: Signal<boolean>;
```

Defined in: [libs/ui/src/components/file/FileComponent.ts:566](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/file/FileComponent.ts#L566)

Indicates whether the component renders its list-row presentation.

***

### isPreview

```ts
protected readonly isPreview: Signal<boolean>;
```

Defined in: [libs/ui/src/components/file/FileComponent.ts:574](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/file/FileComponent.ts#L574)

Indicates whether the component renders its full-width preview presentation.

***

### isTile

```ts
protected readonly isTile: Signal<boolean>;
```

Defined in: [libs/ui/src/components/file/FileComponent.ts:582](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/file/FileComponent.ts#L582)

Indicates whether the component renders its compact gallery-tile presentation.

***

### isUnavailable

```ts
protected readonly isUnavailable: Signal<boolean>;
```

Defined in: [libs/ui/src/components/file/FileComponent.ts:721](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/file/FileComponent.ts#L721)

Indicates that the represented file cannot currently be accessed.

***

### maxTextHeight

```ts
protected readonly maxTextHeight: Signal<string | null>;
```

Defined in: [libs/ui/src/components/file/FileComponent.ts:689](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/file/FileComponent.ts#L689)

Host-level fallback for Mosaik themes that do not apply their internal line clamp.

***

### maxTextLines

```ts
readonly maxTextLines: InputSignal<number | null>;
```

Defined in: [libs/ui/src/components/file/FileComponent.ts:454](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/file/FileComponent.ts#L454)

Maximum number of rendered lines per text field, or no limit when null.

***

### openIconName

```ts
readonly openIconName: InputSignal<string>;
```

Defined in: [libs/ui/src/components/file/FileComponent.ts:478](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/file/FileComponent.ts#L478)

Mosaik icon used by the optional open action.

***

### openLabel

```ts
readonly openLabel: InputSignal<string | null>;
```

Defined in: [libs/ui/src/components/file/FileComponent.ts:470](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/file/FileComponent.ts#L470)

Accessible label enabling the optional open action when non-empty.

***

### openRequested

```ts
readonly openRequested: OutputEmitterRef<void>;
```

Defined in: [libs/ui/src/components/file/FileComponent.ts:534](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/file/FileComponent.ts#L534)

Emits when the user requests the file to be opened.

***

### openTestId

```ts
protected readonly openTestId: Signal<string | null>;
```

Defined in: [libs/ui/src/components/file/FileComponent.ts:810](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/file/FileComponent.ts#L810)

Automation identifier of the open action.

***

### presentation

```ts
readonly presentation: InputSignal<FilePresentationValue>;
```

Defined in: [libs/ui/src/components/file/FileComponent.ts:398](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/file/FileComponent.ts#L398)

Semantic presentation used for the file.

***

### preview

```ts
readonly preview: InputSignal<ThumbnailPreview | null>;
```

Defined in: [libs/ui/src/components/file/FileComponent.ts:390](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/file/FileComponent.ts#L390)

Mosaik thumbnail preview rendered for the file.

***

### previewActionLabel

```ts
protected readonly previewActionLabel: Signal<string | null>;
```

Defined in: [libs/ui/src/components/file/FileComponent.ts:782](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/file/FileComponent.ts#L782)

Accessible name of the preview surface, naming the action and the file.

***

### previewExtensionLabel

```ts
protected readonly previewExtensionLabel: Signal<string | null>;
```

Defined in: [libs/ui/src/components/file/FileComponent.ts:626](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/file/FileComponent.ts#L626)

Upper-case file extension shown beside the icon of a file without a visual frame.

A browser renders images and video itself; audio and every other format share a
family icon, so the extension is what actually tells them apart. A list row is too
small to carry it.

***

### previewFit

```ts
readonly previewFit: InputSignal<ImageFit>;
```

Defined in: [libs/ui/src/components/file/FileComponent.ts:406](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/file/FileComponent.ts#L406)

Image and video fit used by the full-width preview presentation.

***

### previewRatio

```ts
readonly previewRatio: InputSignal<string>;
```

Defined in: [libs/ui/src/components/file/FileComponent.ts:414](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/file/FileComponent.ts#L414)

Aspect ratio used by the full-width preview presentation.

***

### previewTestId

```ts
protected readonly previewTestId: Signal<string | null>;
```

Defined in: [libs/ui/src/components/file/FileComponent.ts:802](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/file/FileComponent.ts#L802)

Automation identifier of the preview surface.

***

### progress

```ts
readonly progress: InputSignal<number>;
```

Defined in: [libs/ui/src/components/file/FileComponent.ts:438](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/file/FileComponent.ts#L438)

Determinate upload progress between zero and one.

***

### removable

```ts
readonly removable: InputSignal<boolean>;
```

Defined in: [libs/ui/src/components/file/FileComponent.ts:486](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/file/FileComponent.ts#L486)

Indicates whether a removal action is available.

***

### removeLabel

```ts
readonly removeLabel: InputSignal<string | null>;
```

Defined in: [libs/ui/src/components/file/FileComponent.ts:494](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/file/FileComponent.ts#L494)

Accessible label for the optional removal action.

***

### removeRequested

```ts
readonly removeRequested: OutputEmitterRef<void>;
```

Defined in: [libs/ui/src/components/file/FileComponent.ts:542](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/file/FileComponent.ts#L542)

Emits when the user requests removal of the file.

***

### removeTestId

```ts
protected readonly removeTestId: Signal<string | null>;
```

Defined in: [libs/ui/src/components/file/FileComponent.ts:818](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/file/FileComponent.ts#L818)

Automation identifier of the removal action.

***

### removeVariant

```ts
readonly removeVariant: InputSignal<Variant>;
```

Defined in: [libs/ui/src/components/file/FileComponent.ts:518](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/file/FileComponent.ts#L518)

Mosaik variant used by the optional removal action.

***

### resolvedActionsLabel

```ts
protected readonly resolvedActionsLabel: Signal<string>;
```

Defined in: [libs/ui/src/components/file/FileComponent.ts:774](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/file/FileComponent.ts#L774)

Accessible name of the action menu, naming the file when no label is supplied.

The menu is the only route to the offered actions, so a missing label must never
hide it; the file name keeps the trigger announceable in that case.

***

### resolvedMaxTextLines

```ts
protected readonly resolvedMaxTextLines: Signal<number | null>;
```

Defined in: [libs/ui/src/components/file/FileComponent.ts:674](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/file/FileComponent.ts#L674)

Positive integral line limit accepted by the Mosaik text control.

***

### resolvedOpenLabel

```ts
protected readonly resolvedOpenLabel: Signal<string | null>;
```

Defined in: [libs/ui/src/components/file/FileComponent.ts:737](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/file/FileComponent.ts#L737)

Optional open-action label normalized for fail-closed rendering.

***

### resolvedPreview

```ts
protected readonly resolvedPreview: Signal<ThumbnailPreview>;
```

Defined in: [libs/ui/src/components/file/FileComponent.ts:639](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/file/FileComponent.ts#L639)

Preview handed to the Mosaik thumbnail.

Audio and unrenderable formats gain the family icon and the extension label unless
the caller already supplied its own; a supplied preview is never overridden.

***

### resolvedPreviewFit

```ts
protected readonly resolvedPreviewFit: Signal<ImageFit>;
```

Defined in: [libs/ui/src/components/file/FileComponent.ts:658](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/file/FileComponent.ts#L658)

Media fit derived from the semantic presentation.

***

### resolvedPreviewRatio

```ts
protected readonly resolvedPreviewRatio: Signal<string>;
```

Defined in: [libs/ui/src/components/file/FileComponent.ts:666](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/file/FileComponent.ts#L666)

Non-empty aspect ratio used by the preview surface.

***

### resolvedProgress

```ts
protected readonly resolvedProgress: Signal<number>;
```

Defined in: [libs/ui/src/components/file/FileComponent.ts:701](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/file/FileComponent.ts#L701)

Upload progress clamped to the supported zero-to-one range.

***

### resolvedRemoveLabel

```ts
protected readonly resolvedRemoveLabel: Signal<string | null>;
```

Defined in: [libs/ui/src/components/file/FileComponent.ts:753](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/file/FileComponent.ts#L753)

Optional removal label normalized for fail-closed rendering.

***

### resolvedRetryLabel

```ts
protected readonly resolvedRetryLabel: Signal<string | null>;
```

Defined in: [libs/ui/src/components/file/FileComponent.ts:834](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/file/FileComponent.ts#L834)

Optional retry label normalized for fail-closed rendering.

***

### resolvedStateLabel

```ts
protected readonly resolvedStateLabel: Signal<string>;
```

Defined in: [libs/ui/src/components/file/FileComponent.ts:729](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/file/FileComponent.ts#L729)

Accessible status text with a deterministic file-name fallback.

***

### resolvedTestId

```ts
protected readonly resolvedTestId: Signal<string | null>;
```

Defined in: [libs/ui/src/components/file/FileComponent.ts:794](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/file/FileComponent.ts#L794)

Automation identifier normalized for fail-closed rendering.

***

### retryLabel

```ts
readonly retryLabel: InputSignal<string | null>;
```

Defined in: [libs/ui/src/components/file/FileComponent.ts:526](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/file/FileComponent.ts#L526)

Accessible label enabling the retry action in retry state when non-empty.

***

### retryRequested

```ts
readonly retryRequested: OutputEmitterRef<void>;
```

Defined in: [libs/ui/src/components/file/FileComponent.ts:550](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/file/FileComponent.ts#L550)

Emits when the user requests another upload attempt.

***

### size

```ts
readonly size: InputSignal<Size>;
```

Defined in: [libs/ui/src/components/file/FileComponent.ts:422](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/file/FileComponent.ts#L422)

Mosaik size used for the preview and actions.

***

### state

```ts
readonly state: InputSignal<FileStateValue>;
```

Defined in: [libs/ui/src/components/file/FileComponent.ts:430](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/file/FileComponent.ts#L430)

Current visual file state.

***

### stateLabel

```ts
readonly stateLabel: InputSignal<string | null>;
```

Defined in: [libs/ui/src/components/file/FileComponent.ts:446](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/file/FileComponent.ts#L446)

Accessible label announced for the current state.

***

### statusVariant

```ts
protected readonly statusVariant: Signal<Variant>;
```

Defined in: [libs/ui/src/components/file/FileComponent.ts:842](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/file/FileComponent.ts#L842)

Variant used for error copy and status visuals.

***

### testId

```ts
readonly testId: InputSignal<string | null>;
```

Defined in: [libs/ui/src/components/file/FileComponent.ts:510](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/file/FileComponent.ts#L510)

Stable automation identifier bound to the card and its actions.

## Methods

### onOpenActivated()

```ts
protected onOpenActivated(menu): void;
```

Defined in: [libs/ui/src/components/file/FileComponent.ts:875](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/file/FileComponent.ts#L875)

Emits an open request and closes the contextual menu it was selected in.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `menu` | `DropDownButtonComponent` |

#### Returns

`void`

***

### onOpenRequested()

```ts
protected onOpenRequested(): void;
```

Defined in: [libs/ui/src/components/file/FileComponent.ts:853](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/file/FileComponent.ts#L853)

Emits an open request when the action is enabled.

#### Returns

`void`

***

### onPreviewActivated()

```ts
protected onPreviewActivated(): void;
```

Defined in: [libs/ui/src/components/file/FileComponent.ts:866](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/file/FileComponent.ts#L866)

Emits an open request for the activated preview surface.

The preview never removes anything, so selecting the card cannot destroy data.

#### Returns

`void`

***

### onRemoveActivated()

```ts
protected onRemoveActivated(menu): void;
```

Defined in: [libs/ui/src/components/file/FileComponent.ts:885](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/file/FileComponent.ts#L885)

Emits a removal request and closes the contextual menu it was selected in.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `menu` | `DropDownButtonComponent` |

#### Returns

`void`

***

### onRemoveRequested()

```ts
protected onRemoveRequested(): void;
```

Defined in: [libs/ui/src/components/file/FileComponent.ts:895](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/file/FileComponent.ts#L895)

Emits a removal request when the action is enabled.

#### Returns

`void`

***

### onRetryRequested()

```ts
protected onRetryRequested(): void;
```

Defined in: [libs/ui/src/components/file/FileComponent.ts:906](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/file/FileComponent.ts#L906)

Emits a retry request only from the retry state.

#### Returns

`void`
