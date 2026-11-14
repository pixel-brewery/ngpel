---
title: 'Class: FileComponent'
generated: true
editUrl: false
---
# Class: FileComponent

Defined in: [libs/ui/src/components/file/FileComponent.ts:437](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/file/FileComponent.ts#L437)

Displays one file as a Mosaik-based list row, gallery tile, full-width preview or inline chip.

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

Defined in: [libs/ui/src/components/file/FileComponent.ts:710](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/file/FileComponent.ts#L710)

Mosaik action-button size derived from the file size.

***

### actionsLabel

```ts
readonly actionsLabel: InputSignal<string | null>;
```

Defined in: [libs/ui/src/components/file/FileComponent.ts:595](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/file/FileComponent.ts#L595)

Accessible label of the contextual action menu; falls back to the file name.

***

### actionsTestId

```ts
protected readonly actionsTestId: Signal<string | null>;
```

Defined in: [libs/ui/src/components/file/FileComponent.ts:928](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/file/FileComponent.ts#L928)

Automation identifier of the contextual action menu.

***

### availableOpenLabel

```ts
protected readonly availableOpenLabel: Signal<string | null>;
```

Defined in: [libs/ui/src/components/file/FileComponent.ts:841](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/file/FileComponent.ts#L841)

Open-action label exposed only while the represented file is available.

***

### chipIcon

```ts
protected readonly chipIcon: Signal<string | undefined>;
```

Defined in: [libs/ui/src/components/file/FileComponent.ts:662](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/file/FileComponent.ts#L662)

***

### chipRemoveActionLabel

```ts
protected readonly chipRemoveActionLabel: Signal<string | null>;
```

Defined in: [libs/ui/src/components/file/FileComponent.ts:851](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/file/FileComponent.ts#L851)

***

### description

```ts
readonly description: InputSignal<string | null>;
```

Defined in: [libs/ui/src/components/file/FileComponent.ts:469](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/file/FileComponent.ts#L469)

Optional file metadata or status description.

***

### disabled

```ts
readonly disabled: InputSignal<boolean>;
```

Defined in: [libs/ui/src/components/file/FileComponent.ts:549](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/file/FileComponent.ts#L549)

Indicates whether file interactions are disabled.

***

### fileName

```ts
readonly fileName: InputSignal<string>;
```

Defined in: [libs/ui/src/components/file/FileComponent.ts:461](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/file/FileComponent.ts#L461)

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

Defined in: [libs/ui/src/components/file/FileComponent.ts:651](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/file/FileComponent.ts#L651)

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

Defined in: [libs/ui/src/components/file/FileComponent.ts:863](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/file/FileComponent.ts#L863)

Indicates whether at least one contextual action is currently offered.

***

### isBusy

```ts
protected readonly isBusy: Signal<boolean>;
```

Defined in: [libs/ui/src/components/file/FileComponent.ts:809](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/file/FileComponent.ts#L809)

Indicates whether assistive technologies should treat the file as busy.

***

### isChip

```ts
protected readonly isChip: Signal<boolean>;
```

Defined in: [libs/ui/src/components/file/FileComponent.ts:661](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/file/FileComponent.ts#L661)

***

### isCompact

```ts
protected readonly isCompact: Signal<boolean>;
```

Defined in: [libs/ui/src/components/file/FileComponent.ts:686](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/file/FileComponent.ts#L686)

Indicates whether the current Mosaik size uses the compact preview preset.

***

### isLarge

```ts
protected readonly isLarge: Signal<boolean>;
```

Defined in: [libs/ui/src/components/file/FileComponent.ts:698](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/file/FileComponent.ts#L698)

Indicates whether the current Mosaik size uses the large preview preset.

***

### isList

```ts
protected readonly isList: Signal<boolean>;
```

Defined in: [libs/ui/src/components/file/FileComponent.ts:659](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/file/FileComponent.ts#L659)

Indicates whether the component renders its list-row presentation.

***

### isPreview

```ts
protected readonly isPreview: Signal<boolean>;
```

Defined in: [libs/ui/src/components/file/FileComponent.ts:670](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/file/FileComponent.ts#L670)

Indicates whether the component renders its full-width preview presentation.

***

### isTile

```ts
protected readonly isTile: Signal<boolean>;
```

Defined in: [libs/ui/src/components/file/FileComponent.ts:678](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/file/FileComponent.ts#L678)

Indicates whether the component renders its compact gallery-tile presentation.

***

### isUnavailable

```ts
protected readonly isUnavailable: Signal<boolean>;
```

Defined in: [libs/ui/src/components/file/FileComponent.ts:817](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/file/FileComponent.ts#L817)

Indicates that the represented file cannot currently be accessed.

***

### maxTextHeight

```ts
protected readonly maxTextHeight: Signal<string | null>;
```

Defined in: [libs/ui/src/components/file/FileComponent.ts:785](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/file/FileComponent.ts#L785)

Host-level fallback for Mosaik themes that do not apply their internal line clamp.

***

### maxTextLines

```ts
readonly maxTextLines: InputSignal<number | null>;
```

Defined in: [libs/ui/src/components/file/FileComponent.ts:541](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/file/FileComponent.ts#L541)

Maximum number of rendered lines per text field, or no limit when null.

***

### openDescription

```ts
readonly openDescription: InputSignal<string | null>;
```

Defined in: [libs/ui/src/components/file/FileComponent.ts:560](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/file/FileComponent.ts#L560)

Optional supporting text for the open action.

***

### openIconName

```ts
readonly openIconName: InputSignal<string>;
```

Defined in: [libs/ui/src/components/file/FileComponent.ts:568](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/file/FileComponent.ts#L568)

Mosaik icon used by the optional open action.

***

### openLabel

```ts
readonly openLabel: InputSignal<string | null>;
```

Defined in: [libs/ui/src/components/file/FileComponent.ts:557](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/file/FileComponent.ts#L557)

Accessible label enabling the optional open action when non-empty.

***

### openRequested

```ts
readonly openRequested: OutputEmitterRef<void>;
```

Defined in: [libs/ui/src/components/file/FileComponent.ts:627](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/file/FileComponent.ts#L627)

Emits when the user requests the file to be opened.

***

### openTestId

```ts
protected readonly openTestId: Signal<string | null>;
```

Defined in: [libs/ui/src/components/file/FileComponent.ts:912](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/file/FileComponent.ts#L912)

Automation identifier of the open action.

***

### presentation

```ts
readonly presentation: InputSignal<FilePresentationValue>;
```

Defined in: [libs/ui/src/components/file/FileComponent.ts:485](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/file/FileComponent.ts#L485)

Semantic presentation used for the file.

***

### preview

```ts
readonly preview: InputSignal<ThumbnailPreview | null>;
```

Defined in: [libs/ui/src/components/file/FileComponent.ts:477](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/file/FileComponent.ts#L477)

Mosaik thumbnail preview rendered for the file.

***

### previewActionLabel

```ts
protected readonly previewActionLabel: Signal<string | null>;
```

Defined in: [libs/ui/src/components/file/FileComponent.ts:884](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/file/FileComponent.ts#L884)

Accessible name of the preview surface, naming the action and the file.

***

### previewExtensionLabel

```ts
protected readonly previewExtensionLabel: Signal<string | null>;
```

Defined in: [libs/ui/src/components/file/FileComponent.ts:722](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/file/FileComponent.ts#L722)

Upper-case file extension shown beside the icon of a file without a visual frame.

A browser renders images and video itself; audio and every other format share a
family icon, so the extension is what actually tells them apart. A list row is too
small to carry it.

***

### previewFit

```ts
readonly previewFit: InputSignal<ObjectFit>;
```

Defined in: [libs/ui/src/components/file/FileComponent.ts:493](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/file/FileComponent.ts#L493)

Image and video fit used by the full-width preview presentation.

***

### previewRatio

```ts
readonly previewRatio: InputSignal<string>;
```

Defined in: [libs/ui/src/components/file/FileComponent.ts:501](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/file/FileComponent.ts#L501)

Aspect ratio used by the full-width preview presentation.

***

### previewTestId

```ts
protected readonly previewTestId: Signal<string | null>;
```

Defined in: [libs/ui/src/components/file/FileComponent.ts:904](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/file/FileComponent.ts#L904)

Automation identifier of the preview surface.

***

### progress

```ts
readonly progress: InputSignal<number>;
```

Defined in: [libs/ui/src/components/file/FileComponent.ts:525](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/file/FileComponent.ts#L525)

Determinate upload progress between zero and one.

***

### removable

```ts
readonly removable: InputSignal<boolean>;
```

Defined in: [libs/ui/src/components/file/FileComponent.ts:576](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/file/FileComponent.ts#L576)

Indicates whether a removal action is available.

***

### removeDescription

```ts
readonly removeDescription: InputSignal<string | null>;
```

Defined in: [libs/ui/src/components/file/FileComponent.ts:587](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/file/FileComponent.ts#L587)

Optional supporting text for the remove action.

***

### removeLabel

```ts
readonly removeLabel: InputSignal<string | null>;
```

Defined in: [libs/ui/src/components/file/FileComponent.ts:584](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/file/FileComponent.ts#L584)

Accessible label for the optional removal action.

***

### removeRequested

```ts
readonly removeRequested: OutputEmitterRef<void>;
```

Defined in: [libs/ui/src/components/file/FileComponent.ts:635](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/file/FileComponent.ts#L635)

Emits when the user requests removal of the file.

***

### removeTestId

```ts
protected readonly removeTestId: Signal<string | null>;
```

Defined in: [libs/ui/src/components/file/FileComponent.ts:920](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/file/FileComponent.ts#L920)

Automation identifier of the removal action.

***

### removeVariant

```ts
readonly removeVariant: InputSignal<Variant>;
```

Defined in: [libs/ui/src/components/file/FileComponent.ts:611](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/file/FileComponent.ts#L611)

Mosaik variant used by the optional removal action.

***

### resolvedActionsLabel

```ts
protected readonly resolvedActionsLabel: Signal<string>;
```

Defined in: [libs/ui/src/components/file/FileComponent.ts:876](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/file/FileComponent.ts#L876)

Accessible name of the action menu, naming the file when no label is supplied.

The menu is the only route to the offered actions, so a missing label must never
hide it; the file name keeps the trigger announceable in that case.

***

### resolvedMaxTextLines

```ts
protected readonly resolvedMaxTextLines: Signal<number | null>;
```

Defined in: [libs/ui/src/components/file/FileComponent.ts:770](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/file/FileComponent.ts#L770)

Positive integral line limit accepted by the Mosaik text control.

***

### resolvedOpenLabel

```ts
protected readonly resolvedOpenLabel: Signal<string | null>;
```

Defined in: [libs/ui/src/components/file/FileComponent.ts:833](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/file/FileComponent.ts#L833)

Optional open-action label normalized for fail-closed rendering.

***

### resolvedPreview

```ts
protected readonly resolvedPreview: Signal<ThumbnailPreview>;
```

Defined in: [libs/ui/src/components/file/FileComponent.ts:735](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/file/FileComponent.ts#L735)

Preview handed to the Mosaik thumbnail.

Audio and unrenderable formats gain the family icon and the extension label unless
the caller already supplied its own; a supplied preview is never overridden.

***

### resolvedPreviewFit

```ts
protected readonly resolvedPreviewFit: Signal<ObjectFit>;
```

Defined in: [libs/ui/src/components/file/FileComponent.ts:754](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/file/FileComponent.ts#L754)

Media fit derived from the semantic presentation.

***

### resolvedPreviewRatio

```ts
protected readonly resolvedPreviewRatio: Signal<string>;
```

Defined in: [libs/ui/src/components/file/FileComponent.ts:762](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/file/FileComponent.ts#L762)

Non-empty aspect ratio used by the preview surface.

***

### resolvedProgress

```ts
protected readonly resolvedProgress: Signal<number>;
```

Defined in: [libs/ui/src/components/file/FileComponent.ts:797](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/file/FileComponent.ts#L797)

Upload progress clamped to the supported zero-to-one range.

***

### resolvedRemoveLabel

```ts
protected readonly resolvedRemoveLabel: Signal<string | null>;
```

Defined in: [libs/ui/src/components/file/FileComponent.ts:849](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/file/FileComponent.ts#L849)

Optional removal label normalized for fail-closed rendering.

***

### resolvedRetryLabel

```ts
protected readonly resolvedRetryLabel: Signal<string | null>;
```

Defined in: [libs/ui/src/components/file/FileComponent.ts:936](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/file/FileComponent.ts#L936)

Optional retry label normalized for fail-closed rendering.

***

### resolvedStateLabel

```ts
protected readonly resolvedStateLabel: Signal<string>;
```

Defined in: [libs/ui/src/components/file/FileComponent.ts:825](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/file/FileComponent.ts#L825)

Accessible status text with a deterministic file-name fallback.

***

### resolvedTestId

```ts
protected readonly resolvedTestId: Signal<string | null>;
```

Defined in: [libs/ui/src/components/file/FileComponent.ts:896](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/file/FileComponent.ts#L896)

Automation identifier normalized for fail-closed rendering.

***

### retryLabel

```ts
readonly retryLabel: InputSignal<string | null>;
```

Defined in: [libs/ui/src/components/file/FileComponent.ts:619](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/file/FileComponent.ts#L619)

Accessible label enabling the retry action in retry state when non-empty.

***

### retryRequested

```ts
readonly retryRequested: OutputEmitterRef<void>;
```

Defined in: [libs/ui/src/components/file/FileComponent.ts:643](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/file/FileComponent.ts#L643)

Emits when the user requests another upload attempt.

***

### size

```ts
readonly size: InputSignal<Size>;
```

Defined in: [libs/ui/src/components/file/FileComponent.ts:509](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/file/FileComponent.ts#L509)

Mosaik size used for the preview and actions.

***

### state

```ts
readonly state: InputSignal<FileStateValue>;
```

Defined in: [libs/ui/src/components/file/FileComponent.ts:517](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/file/FileComponent.ts#L517)

Current visual file state.

***

### stateLabel

```ts
readonly stateLabel: InputSignal<string | null>;
```

Defined in: [libs/ui/src/components/file/FileComponent.ts:533](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/file/FileComponent.ts#L533)

Accessible label announced for the current state.

***

### statusVariant

```ts
protected readonly statusVariant: Signal<Variant>;
```

Defined in: [libs/ui/src/components/file/FileComponent.ts:944](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/file/FileComponent.ts#L944)

Variant used for error copy and status visuals.

***

### testId

```ts
readonly testId: InputSignal<string | null>;
```

Defined in: [libs/ui/src/components/file/FileComponent.ts:603](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/file/FileComponent.ts#L603)

Stable automation identifier bound to the card and its actions.

## Methods

### onOpenActivated()

```ts
protected onOpenActivated(menu): void;
```

Defined in: [libs/ui/src/components/file/FileComponent.ts:977](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/file/FileComponent.ts#L977)

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

Defined in: [libs/ui/src/components/file/FileComponent.ts:955](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/file/FileComponent.ts#L955)

Emits an open request when the action is enabled.

#### Returns

`void`

***

### onPreviewActivated()

```ts
protected onPreviewActivated(): void;
```

Defined in: [libs/ui/src/components/file/FileComponent.ts:968](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/file/FileComponent.ts#L968)

Emits an open request for the activated preview surface.

The preview never removes anything, so selecting the card cannot destroy data.

#### Returns

`void`

***

### onRemoveActivated()

```ts
protected onRemoveActivated(menu): void;
```

Defined in: [libs/ui/src/components/file/FileComponent.ts:987](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/file/FileComponent.ts#L987)

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

Defined in: [libs/ui/src/components/file/FileComponent.ts:997](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/file/FileComponent.ts#L997)

Emits a removal request when the action is enabled.

#### Returns

`void`

***

### onRetryRequested()

```ts
protected onRetryRequested(): void;
```

Defined in: [libs/ui/src/components/file/FileComponent.ts:1008](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/file/FileComponent.ts#L1008)

Emits a retry request only from the retry state.

#### Returns

`void`
