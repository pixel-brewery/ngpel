---
title: 'Class: FilesComponent'
generated: true
editUrl: false
---
# Class: FilesComponent

Defined in: [libs/ui/src/components/files/FilesComponent.ts:274](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/files/FilesComponent.ts#L274)

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

Defined in: [libs/ui/src/components/files/FilesComponent.ts:326](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/files/FilesComponent.ts#L326)

Accessible label of each file's contextual action menu.

***

### activeDropSource

```ts
protected readonly activeDropSource: Signal<FileSourceComponent | null>;
```

Defined in: [libs/ui/src/components/files/FilesComponent.ts:413](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/files/FilesComponent.ts#L413)

The drop source currently able to accept a drop, or null for the non-interactive frame.

***

### description

```ts
readonly description: InputSignal<string | null>;
```

Defined in: [libs/ui/src/components/files/FilesComponent.ts:293](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/files/FilesComponent.ts#L293)

Optional explanation rendered below the label.

***

### disabled

```ts
readonly disabled: InputSignal<boolean>;
```

Defined in: [libs/ui/src/components/files/FilesComponent.ts:302](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/files/FilesComponent.ts#L302)

Whether the complete control rejects interactions.

***

### dropSource

```ts
protected readonly dropSource: Signal<FileSourceComponent | null>;
```

Defined in: [libs/ui/src/components/files/FilesComponent.ts:406](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/files/FilesComponent.ts#L406)

The only picker source eligible for drop routing, or null for ambiguous configuration.

***

### emptyIconName

```ts
readonly emptyIconName: InputSignal<string | null>;
```

Defined in: [libs/ui/src/components/files/FilesComponent.ts:299](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/files/FilesComponent.ts#L299)

Optional icon overriding the empty representation's source-derived icon.

***

### emptyMessage

```ts
readonly emptyMessage: InputSignal<string | null>;
```

Defined in: [libs/ui/src/components/files/FilesComponent.ts:296](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/files/FilesComponent.ts#L296)

Optional text rendered when the collection is empty.

***

### filePresentation

```ts
protected readonly filePresentation: Signal<FilePresentationValue>;
```

Defined in: [libs/ui/src/components/files/FilesComponent.ts:371](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/files/FilesComponent.ts#L371)

Presentation derived from the container layout.

***

### files

```ts
readonly files: InputSignal<readonly IFileItem[]>;
```

Defined in: [libs/ui/src/components/files/FilesComponent.ts:284](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/files/FilesComponent.ts#L284)

Files rendered inside the container.

***

### fileSizeUnitLabel

```ts
readonly fileSizeUnitLabel: InputSignal<string>;
```

Defined in: [libs/ui/src/components/files/FilesComponent.ts:311](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/files/FilesComponent.ts#L311)

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

Defined in: [libs/ui/src/components/files/FilesComponent.ts:368](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/files/FilesComponent.ts#L368)

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

Defined in: [libs/ui/src/components/files/FilesComponent.ts:290](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/files/FilesComponent.ts#L290)

User-facing label framing the complete control.

***

### layout

```ts
readonly layout: InputSignal<FilesLayoutValue>;
```

Defined in: [libs/ui/src/components/files/FilesComponent.ts:287](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/files/FilesComponent.ts#L287)

Visual arrangement used for file items; defaults to the tile gallery.

***

### layouts

```ts
protected readonly layouts: {
  Gallery: "gallery";
  List: "list";
  Preview: "preview";
} = FilesLayout;
```

Defined in: [libs/ui/src/components/files/FilesComponent.ts:362](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/files/FilesComponent.ts#L362)

Layout constants exposed to the template.

#### Gallery

```ts
readonly Gallery: "gallery" = 'gallery';
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

Defined in: [libs/ui/src/components/files/FilesComponent.ts:347](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/files/FilesComponent.ts#L347)

Maximum number of copy lines shown per file.

***

### openIconName

```ts
readonly openIconName: InputSignal<string>;
```

Defined in: [libs/ui/src/components/files/FilesComponent.ts:317](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/files/FilesComponent.ts#L317)

Icon used by each open action.

***

### openLabel

```ts
readonly openLabel: InputSignal<string | null>;
```

Defined in: [libs/ui/src/components/files/FilesComponent.ts:314](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/files/FilesComponent.ts#L314)

Accessible label enabling each file's open action.

***

### openRequested

```ts
readonly openRequested: OutputEmitterRef<string | number>;
```

Defined in: [libs/ui/src/components/files/FilesComponent.ts:350](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/files/FilesComponent.ts#L350)

Emits the stable identifier of a file requested for opening.

***

### previewFit

```ts
readonly previewFit: InputSignal<ImageFit>;
```

Defined in: [libs/ui/src/components/files/FilesComponent.ts:338](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/files/FilesComponent.ts#L338)

Image and video fit used by preview layout.

***

### previewRatio

```ts
readonly previewRatio: InputSignal<string>;
```

Defined in: [libs/ui/src/components/files/FilesComponent.ts:341](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/files/FilesComponent.ts#L341)

Aspect ratio used by preview layout.

***

### removable

```ts
readonly removable: InputSignal<boolean>;
```

Defined in: [libs/ui/src/components/files/FilesComponent.ts:320](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/files/FilesComponent.ts#L320)

Whether each file may expose a removal action.

***

### removeLabel

```ts
readonly removeLabel: InputSignal<string | null>;
```

Defined in: [libs/ui/src/components/files/FilesComponent.ts:323](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/files/FilesComponent.ts#L323)

Accessible label for each removal action.

***

### removeRequested

```ts
readonly removeRequested: OutputEmitterRef<string | number>;
```

Defined in: [libs/ui/src/components/files/FilesComponent.ts:353](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/files/FilesComponent.ts#L353)

Emits the stable identifier of a file requested for removal.

***

### removeVariant

```ts
readonly removeVariant: InputSignal<Variant>;
```

Defined in: [libs/ui/src/components/files/FilesComponent.ts:332](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/files/FilesComponent.ts#L332)

Visual variant used by each removal action.

***

### renderedFiles

```ts
protected readonly renderedFiles: Signal<readonly IRenderedFileItem[]>;
```

Defined in: [libs/ui/src/components/files/FilesComponent.ts:383](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/files/FilesComponent.ts#L383)

Files enriched with stable previews, display descriptions, and automation ids.

***

### resolvedEmptyIconName

```ts
protected readonly resolvedEmptyIconName: Signal<string>;
```

Defined in: [libs/ui/src/components/files/FilesComponent.ts:395](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/files/FilesComponent.ts#L395)

Empty-state icon derived from an explicit override or one unambiguous source.

***

### resolvedPreviewRatio

```ts
protected readonly resolvedPreviewRatio: Signal<string>;
```

Defined in: [libs/ui/src/components/files/FilesComponent.ts:420](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/files/FilesComponent.ts#L420)

Non-empty aspect ratio used by preview layout and its empty placeholder.

***

### retryLabel

```ts
readonly retryLabel: InputSignal<string | null>;
```

Defined in: [libs/ui/src/components/files/FilesComponent.ts:335](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/files/FilesComponent.ts#L335)

Accessible label enabling retry actions for retry-state files.

***

### retryRequested

```ts
readonly retryRequested: OutputEmitterRef<string | number>;
```

Defined in: [libs/ui/src/components/files/FilesComponent.ts:356](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/files/FilesComponent.ts#L356)

Emits the stable identifier of a file requested for retry.

***

### separateListItems

```ts
readonly separateListItems: InputSignal<boolean>;
```

Defined in: [libs/ui/src/components/files/FilesComponent.ts:308](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/files/FilesComponent.ts#L308)

Whether list items are separated visually.

***

### showFileSize

```ts
readonly showFileSize: InputSignal<boolean>;
```

Defined in: [libs/ui/src/components/files/FilesComponent.ts:305](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/files/FilesComponent.ts#L305)

Whether file sizes are rendered when no item description is supplied.

***

### sources

```ts
protected readonly sources: Signal<readonly FileSourceComponent[]>;
```

Defined in: [libs/ui/src/components/files/FilesComponent.ts:359](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/files/FilesComponent.ts#L359)

Declaratively supplied headless acquisition sources.

***

### sourceTypes

```ts
protected readonly sourceTypes: {
  Action: "action";
  Picker: "picker";
} = FileSourceType;
```

Defined in: [libs/ui/src/components/files/FilesComponent.ts:365](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/files/FilesComponent.ts#L365)

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

Defined in: [libs/ui/src/components/files/FilesComponent.ts:329](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/files/FilesComponent.ts#L329)

Prefix of the per-file automation identifiers; disables them when empty.

***

### variant

```ts
readonly variant: InputSignal<Variant>;
```

Defined in: [libs/ui/src/components/files/FilesComponent.ts:344](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/files/FilesComponent.ts#L344)

Visual variant used by the framing drop zone.

## Methods

### onDropZoneData()

```ts
protected onDropZoneData(event): void;
```

Defined in: [libs/ui/src/components/files/FilesComponent.ts:427](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/files/FilesComponent.ts#L427)

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

Defined in: [libs/ui/src/components/files/FilesComponent.ts:438](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/files/FilesComponent.ts#L438)

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

Defined in: [libs/ui/src/components/files/FilesComponent.ts:448](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/files/FilesComponent.ts#L448)

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

Defined in: [libs/ui/src/components/files/FilesComponent.ts:453](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/files/FilesComponent.ts#L453)

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

Defined in: [libs/ui/src/components/files/FilesComponent.ts:460](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/files/FilesComponent.ts#L460)

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

Defined in: [libs/ui/src/components/files/FilesComponent.ts:467](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/files/FilesComponent.ts#L467)

Emits a stable retry request for an interactive retry-state file.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `file` | [`IFileItem`](Interface.IFileItem) |

#### Returns

`void`
