---
title: 'Class: FilesComponent'
generated: true
editUrl: false
---
# Class: FilesComponent

Defined in: [libs/ui/src/components/files/FilesComponent.ts:291](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/files/FilesComponent.ts#L291)

Frames a file collection, its semantic layout, and declaratively projected acquisition sources.

## Constructors

### Constructor

```ts
new FilesComponent(): FilesComponent;
```

#### Returns

`FilesComponent`

## Properties

### actionsLabel

```ts
readonly actionsLabel: InputSignal<string | null>;
```

Defined in: [libs/ui/src/components/files/FilesComponent.ts:349](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/files/FilesComponent.ts#L349)

Accessible label of each file's contextual action menu.

***

### activeDropSource

```ts
protected readonly activeDropSource: Signal<FileSourceComponent | null>;
```

Defined in: [libs/ui/src/components/files/FilesComponent.ts:438](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/files/FilesComponent.ts#L438)

The drop source currently able to accept a drop, or null for the non-interactive frame.

***

### description

```ts
readonly description: InputSignal<string | null>;
```

Defined in: [libs/ui/src/components/files/FilesComponent.ts:310](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/files/FilesComponent.ts#L310)

Optional explanation rendered below the label.

***

### disabled

```ts
readonly disabled: InputSignal<boolean>;
```

Defined in: [libs/ui/src/components/files/FilesComponent.ts:319](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/files/FilesComponent.ts#L319)

Whether the complete control rejects interactions.

***

### dropSource

```ts
protected readonly dropSource: Signal<FileSourceComponent | null>;
```

Defined in: [libs/ui/src/components/files/FilesComponent.ts:431](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/files/FilesComponent.ts#L431)

The only picker source eligible for drop routing, or null for ambiguous configuration.

***

### emptyIconName

```ts
readonly emptyIconName: InputSignal<string | null>;
```

Defined in: [libs/ui/src/components/files/FilesComponent.ts:316](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/files/FilesComponent.ts#L316)

Optional icon overriding the empty representation's source-derived icon.

***

### emptyMessage

```ts
readonly emptyMessage: InputSignal<string | null>;
```

Defined in: [libs/ui/src/components/files/FilesComponent.ts:313](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/files/FilesComponent.ts#L313)

Optional text rendered when the collection is empty.

***

### filePresentation

```ts
protected readonly filePresentation: Signal<FilePresentationValue>;
```

Defined in: [libs/ui/src/components/files/FilesComponent.ts:394](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/files/FilesComponent.ts#L394)

Presentation derived from the container layout.

***

### files

```ts
readonly files: InputSignal<readonly IFileItem[]>;
```

Defined in: [libs/ui/src/components/files/FilesComponent.ts:301](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/files/FilesComponent.ts#L301)

Files rendered inside the container.

***

### fileSizeUnitLabel

```ts
readonly fileSizeUnitLabel: InputSignal<string>;
```

Defined in: [libs/ui/src/components/files/FilesComponent.ts:328](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/files/FilesComponent.ts#L328)

Unit label appended to rounded file sizes in kilobytes.

***

### fileStates

```ts
protected readonly fileStates: {
  Error: "error";
  Loading: "loading";
  Normal: "normal";
  Progress: "progress";
  Retry: "retry";
  Unavailable: "unavailable";
} = FileState;
```

Defined in: [libs/ui/src/components/files/FilesComponent.ts:391](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/files/FilesComponent.ts#L391)

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

### label

```ts
readonly label: InputSignal<string>;
```

Defined in: [libs/ui/src/components/files/FilesComponent.ts:307](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/files/FilesComponent.ts#L307)

User-facing label framing the complete control.

***

### layout

```ts
readonly layout: InputSignal<FilesLayoutValue>;
```

Defined in: [libs/ui/src/components/files/FilesComponent.ts:304](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/files/FilesComponent.ts#L304)

Visual arrangement used for file items; defaults to the tile gallery.

***

### layouts

```ts
protected readonly layouts: {
  Gallery: "gallery";
  Inline: "inline";
  List: "list";
  Preview: "preview";
} = FilesLayout;
```

Defined in: [libs/ui/src/components/files/FilesComponent.ts:385](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/files/FilesComponent.ts#L385)

Layout constants exposed to the template.

#### Gallery

```ts
readonly Gallery: "gallery" = 'gallery';
```

#### Inline

```ts
readonly Inline: "inline" = 'inline';
```

#### List

```ts
readonly List: "list" = 'list';
```

#### Preview

```ts
readonly Preview: "preview" = 'preview';
```

***

### maxTextLines

```ts
readonly maxTextLines: InputSignal<number | null>;
```

Defined in: [libs/ui/src/components/files/FilesComponent.ts:370](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/files/FilesComponent.ts#L370)

Maximum number of copy lines shown per file.

***

### openDescription

```ts
readonly openDescription: InputSignal<string | null>;
```

Defined in: [libs/ui/src/components/files/FilesComponent.ts:334](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/files/FilesComponent.ts#L334)

Optional supporting text for each file's open action.

***

### openIconName

```ts
readonly openIconName: InputSignal<string>;
```

Defined in: [libs/ui/src/components/files/FilesComponent.ts:337](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/files/FilesComponent.ts#L337)

Icon used by each open action.

***

### openLabel

```ts
readonly openLabel: InputSignal<string | null>;
```

Defined in: [libs/ui/src/components/files/FilesComponent.ts:331](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/files/FilesComponent.ts#L331)

Accessible label enabling each file's open action.

***

### openRequested

```ts
readonly openRequested: OutputEmitterRef<string | number>;
```

Defined in: [libs/ui/src/components/files/FilesComponent.ts:373](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/files/FilesComponent.ts#L373)

Emits the stable identifier of a file requested for opening.

***

### previewFit

```ts
readonly previewFit: InputSignal<ImageFit>;
```

Defined in: [libs/ui/src/components/files/FilesComponent.ts:361](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/files/FilesComponent.ts#L361)

Image and video fit used by preview layout.

***

### previewRatio

```ts
readonly previewRatio: InputSignal<string>;
```

Defined in: [libs/ui/src/components/files/FilesComponent.ts:364](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/files/FilesComponent.ts#L364)

Aspect ratio used by preview layout.

***

### removable

```ts
readonly removable: InputSignal<boolean>;
```

Defined in: [libs/ui/src/components/files/FilesComponent.ts:340](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/files/FilesComponent.ts#L340)

Whether each file may expose a removal action.

***

### removeDescription

```ts
readonly removeDescription: InputSignal<string | null>;
```

Defined in: [libs/ui/src/components/files/FilesComponent.ts:346](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/files/FilesComponent.ts#L346)

Optional supporting text for each file's remove action.

***

### removeLabel

```ts
readonly removeLabel: InputSignal<string | null>;
```

Defined in: [libs/ui/src/components/files/FilesComponent.ts:343](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/files/FilesComponent.ts#L343)

Accessible label for each removal action.

***

### removeRequested

```ts
readonly removeRequested: OutputEmitterRef<string | number>;
```

Defined in: [libs/ui/src/components/files/FilesComponent.ts:376](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/files/FilesComponent.ts#L376)

Emits the stable identifier of a file requested for removal.

***

### removeVariant

```ts
readonly removeVariant: InputSignal<Variant>;
```

Defined in: [libs/ui/src/components/files/FilesComponent.ts:355](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/files/FilesComponent.ts#L355)

Visual variant used by each removal action.

***

### renderedFiles

```ts
protected readonly renderedFiles: Signal<readonly IRenderedFileItem[]>;
```

Defined in: [libs/ui/src/components/files/FilesComponent.ts:408](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/files/FilesComponent.ts#L408)

Files enriched with stable previews, display descriptions, and automation ids.

***

### resolvedEmptyIconName

```ts
protected readonly resolvedEmptyIconName: Signal<string>;
```

Defined in: [libs/ui/src/components/files/FilesComponent.ts:420](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/files/FilesComponent.ts#L420)

Empty-state icon derived from an explicit override or one unambiguous source.

***

### resolvedPreviewRatio

```ts
protected readonly resolvedPreviewRatio: Signal<string>;
```

Defined in: [libs/ui/src/components/files/FilesComponent.ts:445](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/files/FilesComponent.ts#L445)

Non-empty aspect ratio used by preview layout and its empty placeholder.

***

### retryLabel

```ts
readonly retryLabel: InputSignal<string | null>;
```

Defined in: [libs/ui/src/components/files/FilesComponent.ts:358](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/files/FilesComponent.ts#L358)

Accessible label enabling retry actions for retry-state files.

***

### retryRequested

```ts
readonly retryRequested: OutputEmitterRef<string | number>;
```

Defined in: [libs/ui/src/components/files/FilesComponent.ts:379](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/files/FilesComponent.ts#L379)

Emits the stable identifier of a file requested for retry.

***

### separateListItems

```ts
readonly separateListItems: InputSignal<boolean>;
```

Defined in: [libs/ui/src/components/files/FilesComponent.ts:325](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/files/FilesComponent.ts#L325)

Whether list items are separated visually.

***

### showFileSize

```ts
readonly showFileSize: InputSignal<boolean>;
```

Defined in: [libs/ui/src/components/files/FilesComponent.ts:322](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/files/FilesComponent.ts#L322)

Whether file sizes are rendered when no item description is supplied.

***

### sources

```ts
protected readonly sources: Signal<readonly FileSourceComponent[]>;
```

Defined in: [libs/ui/src/components/files/FilesComponent.ts:382](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/files/FilesComponent.ts#L382)

Declaratively supplied headless acquisition sources.

***

### sourceTypes

```ts
protected readonly sourceTypes: {
  Action: "action";
  Picker: "picker";
} = FileSourceType;
```

Defined in: [libs/ui/src/components/files/FilesComponent.ts:388](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/files/FilesComponent.ts#L388)

Source-type constants exposed to the template.

#### Action

```ts
readonly Action: "action" = 'action';
```

#### Picker

```ts
readonly Picker: "picker" = 'picker';
```

***

### testIdPrefix

```ts
readonly testIdPrefix: InputSignal<string | null>;
```

Defined in: [libs/ui/src/components/files/FilesComponent.ts:352](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/files/FilesComponent.ts#L352)

Prefix of the per-file automation identifiers; disables them when empty.

***

### variant

```ts
readonly variant: InputSignal<Variant>;
```

Defined in: [libs/ui/src/components/files/FilesComponent.ts:367](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/files/FilesComponent.ts#L367)

Visual variant used by the framing drop zone.

## Methods

### onDropZoneData()

```ts
protected onDropZoneData(event): void;
```

Defined in: [libs/ui/src/components/files/FilesComponent.ts:452](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/files/FilesComponent.ts#L452)

Routes dropped files only when exactly one picker source owns drop acquisition.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `event` | `unknown` |

#### Returns

`void`

***

### onFilesPicked()

```ts
protected onFilesPicked(source, event): void;
```

Defined in: [libs/ui/src/components/files/FilesComponent.ts:463](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/files/FilesComponent.ts#L463)

Routes files selected by one rendered picker source.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `source` | [`FileSourceComponent`](Class.FileSourceComponent) |
| `event` | `unknown` |

#### Returns

`void`

***

### pickerAccept()

```ts
protected pickerAccept(source): string[];
```

Defined in: [libs/ui/src/components/files/FilesComponent.ts:473](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/files/FilesComponent.ts#L473)

Returns a mutable Mosaik-compatible copy of one source's accepted patterns.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `source` | [`FileSourceComponent`](Class.FileSourceComponent) |

#### Returns

`string`[]

***

### requestOpen()

```ts
protected requestOpen(file): void;
```

Defined in: [libs/ui/src/components/files/FilesComponent.ts:478](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/files/FilesComponent.ts#L478)

Emits a stable open request for an interactive available file.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `file` | [`IFileItem`](Interface.IFileItem) |

#### Returns

`void`

***

### requestRemoval()

```ts
protected requestRemoval(file): void;
```

Defined in: [libs/ui/src/components/files/FilesComponent.ts:485](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/files/FilesComponent.ts#L485)

Emits a stable removal request for an interactive file.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `file` | [`IFileItem`](Interface.IFileItem) |

#### Returns

`void`

***

### requestRetry()

```ts
protected requestRetry(file): void;
```

Defined in: [libs/ui/src/components/files/FilesComponent.ts:492](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/files/FilesComponent.ts#L492)

Emits a stable retry request for an interactive retry-state file.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `file` | [`IFileItem`](Interface.IFileItem) |

#### Returns

`void`
