---
title: 'Class: FilesComponent'
generated: true
editUrl: false
---
# Class: FilesComponent

Defined in: [libs/ui/src/components/files/FilesComponent.ts:334](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/files/FilesComponent.ts#L334)

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

Defined in: [libs/ui/src/components/files/FilesComponent.ts:395](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/files/FilesComponent.ts#L395)

Accessible label of each file's contextual action menu.

***

### activeDropSource

```ts
protected readonly activeDropSource: Signal<FileSourceComponent | null>;
```

Defined in: [libs/ui/src/components/files/FilesComponent.ts:487](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/files/FilesComponent.ts#L487)

The drop source currently able to accept a drop, or null for the non-interactive frame.

***

### description

```ts
readonly description: InputSignal<string | null>;
```

Defined in: [libs/ui/src/components/files/FilesComponent.ts:356](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/files/FilesComponent.ts#L356)

Optional explanation rendered below the label.

***

### disabled

```ts
readonly disabled: InputSignal<boolean>;
```

Defined in: [libs/ui/src/components/files/FilesComponent.ts:365](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/files/FilesComponent.ts#L365)

Whether the complete control rejects interactions.

***

### dropSource

```ts
protected readonly dropSource: Signal<FileSourceComponent | null>;
```

Defined in: [libs/ui/src/components/files/FilesComponent.ts:480](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/files/FilesComponent.ts#L480)

The only picker source eligible for drop routing, or null for ambiguous configuration.

***

### emptyIconName

```ts
readonly emptyIconName: InputSignal<string | null>;
```

Defined in: [libs/ui/src/components/files/FilesComponent.ts:362](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/files/FilesComponent.ts#L362)

Optional icon overriding the empty representation's source-derived icon.

***

### emptyMessage

```ts
readonly emptyMessage: InputSignal<string | null>;
```

Defined in: [libs/ui/src/components/files/FilesComponent.ts:359](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/files/FilesComponent.ts#L359)

Optional text rendered when the collection is empty.

***

### filePresentation

```ts
protected readonly filePresentation: Signal<FilePresentationValue>;
```

Defined in: [libs/ui/src/components/files/FilesComponent.ts:443](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/files/FilesComponent.ts#L443)

Presentation derived from the container layout.

***

### files

```ts
readonly files: InputSignal<readonly IFileItem[]>;
```

Defined in: [libs/ui/src/components/files/FilesComponent.ts:344](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/files/FilesComponent.ts#L344)

Files rendered inside the container.

***

### fileSizeUnitLabel

```ts
readonly fileSizeUnitLabel: InputSignal<string>;
```

Defined in: [libs/ui/src/components/files/FilesComponent.ts:374](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/files/FilesComponent.ts#L374)

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

Defined in: [libs/ui/src/components/files/FilesComponent.ts:437](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/files/FilesComponent.ts#L437)

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

### inlineWithoutHeader

```ts
protected readonly inlineWithoutHeader: Signal<boolean>;
```

Defined in: [libs/ui/src/components/files/FilesComponent.ts:439](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/files/FilesComponent.ts#L439)

***

### label

```ts
readonly label: InputSignal<string>;
```

Defined in: [libs/ui/src/components/files/FilesComponent.ts:350](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/files/FilesComponent.ts#L350)

User-facing label framing the complete control.

***

### layout

```ts
readonly layout: InputSignal<FilesLayoutValue>;
```

Defined in: [libs/ui/src/components/files/FilesComponent.ts:347](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/files/FilesComponent.ts#L347)

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

Defined in: [libs/ui/src/components/files/FilesComponent.ts:431](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/files/FilesComponent.ts#L431)

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

Defined in: [libs/ui/src/components/files/FilesComponent.ts:416](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/files/FilesComponent.ts#L416)

Maximum number of copy lines shown per file.

***

### openDescription

```ts
readonly openDescription: InputSignal<string | null>;
```

Defined in: [libs/ui/src/components/files/FilesComponent.ts:380](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/files/FilesComponent.ts#L380)

Optional supporting text for each file's open action.

***

### openIconName

```ts
readonly openIconName: InputSignal<string>;
```

Defined in: [libs/ui/src/components/files/FilesComponent.ts:383](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/files/FilesComponent.ts#L383)

Icon used by each open action.

***

### openLabel

```ts
readonly openLabel: InputSignal<string | null>;
```

Defined in: [libs/ui/src/components/files/FilesComponent.ts:377](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/files/FilesComponent.ts#L377)

Accessible label enabling each file's open action.

***

### openRequested

```ts
readonly openRequested: OutputEmitterRef<string | number>;
```

Defined in: [libs/ui/src/components/files/FilesComponent.ts:419](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/files/FilesComponent.ts#L419)

Emits the stable identifier of a file requested for opening.

***

### previewFit

```ts
readonly previewFit: InputSignal<ObjectFit>;
```

Defined in: [libs/ui/src/components/files/FilesComponent.ts:407](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/files/FilesComponent.ts#L407)

Image and video fit used by preview layout.

***

### previewRatio

```ts
readonly previewRatio: InputSignal<string>;
```

Defined in: [libs/ui/src/components/files/FilesComponent.ts:410](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/files/FilesComponent.ts#L410)

Aspect ratio used by preview layout.

***

### removable

```ts
readonly removable: InputSignal<boolean>;
```

Defined in: [libs/ui/src/components/files/FilesComponent.ts:386](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/files/FilesComponent.ts#L386)

Whether each file may expose a removal action.

***

### removeDescription

```ts
readonly removeDescription: InputSignal<string | null>;
```

Defined in: [libs/ui/src/components/files/FilesComponent.ts:392](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/files/FilesComponent.ts#L392)

Optional supporting text for each file's remove action.

***

### removeLabel

```ts
readonly removeLabel: InputSignal<string | null>;
```

Defined in: [libs/ui/src/components/files/FilesComponent.ts:389](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/files/FilesComponent.ts#L389)

Accessible label for each removal action.

***

### removeRequested

```ts
readonly removeRequested: OutputEmitterRef<string | number>;
```

Defined in: [libs/ui/src/components/files/FilesComponent.ts:422](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/files/FilesComponent.ts#L422)

Emits the stable identifier of a file requested for removal.

***

### removeVariant

```ts
readonly removeVariant: InputSignal<Variant>;
```

Defined in: [libs/ui/src/components/files/FilesComponent.ts:401](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/files/FilesComponent.ts#L401)

Visual variant used by each removal action.

***

### renderedFiles

```ts
protected readonly renderedFiles: Signal<readonly IRenderedFileItem[]>;
```

Defined in: [libs/ui/src/components/files/FilesComponent.ts:457](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/files/FilesComponent.ts#L457)

Files enriched with stable previews, display descriptions, and automation ids.

***

### resolvedEmptyIconName

```ts
protected readonly resolvedEmptyIconName: Signal<string>;
```

Defined in: [libs/ui/src/components/files/FilesComponent.ts:469](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/files/FilesComponent.ts#L469)

Empty-state icon derived from an explicit override or one unambiguous source.

***

### resolvedPreviewRatio

```ts
protected readonly resolvedPreviewRatio: Signal<string>;
```

Defined in: [libs/ui/src/components/files/FilesComponent.ts:494](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/files/FilesComponent.ts#L494)

Non-empty aspect ratio used by preview layout and its empty placeholder.

***

### retryLabel

```ts
readonly retryLabel: InputSignal<string | null>;
```

Defined in: [libs/ui/src/components/files/FilesComponent.ts:404](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/files/FilesComponent.ts#L404)

Accessible label enabling retry actions for retry-state files.

***

### retryRequested

```ts
readonly retryRequested: OutputEmitterRef<string | number>;
```

Defined in: [libs/ui/src/components/files/FilesComponent.ts:425](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/files/FilesComponent.ts#L425)

Emits the stable identifier of a file requested for retry.

***

### separateListItems

```ts
readonly separateListItems: InputSignal<boolean>;
```

Defined in: [libs/ui/src/components/files/FilesComponent.ts:371](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/files/FilesComponent.ts#L371)

Whether list items are separated visually.

***

### showFileSize

```ts
readonly showFileSize: InputSignal<boolean>;
```

Defined in: [libs/ui/src/components/files/FilesComponent.ts:368](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/files/FilesComponent.ts#L368)

Whether file sizes are rendered when no item description is supplied.

***

### showHeader

```ts
readonly showHeader: InputSignal<boolean>;
```

Defined in: [libs/ui/src/components/files/FilesComponent.ts:353](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/files/FilesComponent.ts#L353)

Shows a section header around the files. Disable when the surrounding view already provides one.

***

### sources

```ts
protected readonly sources: Signal<readonly FileSourceComponent[]>;
```

Defined in: [libs/ui/src/components/files/FilesComponent.ts:428](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/files/FilesComponent.ts#L428)

Declaratively supplied headless acquisition sources.

***

### sourceSize

```ts
protected readonly sourceSize: Signal<"small" | "medium" | undefined>;
```

Defined in: [libs/ui/src/components/files/FilesComponent.ts:440](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/files/FilesComponent.ts#L440)

***

### sourceTypes

```ts
protected readonly sourceTypes: {
  Action: "action";
  Picker: "picker";
} = FileSourceType;
```

Defined in: [libs/ui/src/components/files/FilesComponent.ts:434](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/files/FilesComponent.ts#L434)

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

Defined in: [libs/ui/src/components/files/FilesComponent.ts:398](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/files/FilesComponent.ts#L398)

Prefix of the per-file automation identifiers; disables them when empty.

***

### variant

```ts
readonly variant: InputSignal<Variant>;
```

Defined in: [libs/ui/src/components/files/FilesComponent.ts:413](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/files/FilesComponent.ts#L413)

Visual variant used by the framing drop zone.

## Methods

### onDropZoneData()

```ts
protected onDropZoneData(event): void;
```

Defined in: [libs/ui/src/components/files/FilesComponent.ts:501](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/files/FilesComponent.ts#L501)

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

Defined in: [libs/ui/src/components/files/FilesComponent.ts:512](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/files/FilesComponent.ts#L512)

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

Defined in: [libs/ui/src/components/files/FilesComponent.ts:522](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/files/FilesComponent.ts#L522)

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

Defined in: [libs/ui/src/components/files/FilesComponent.ts:527](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/files/FilesComponent.ts#L527)

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

Defined in: [libs/ui/src/components/files/FilesComponent.ts:534](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/files/FilesComponent.ts#L534)

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

Defined in: [libs/ui/src/components/files/FilesComponent.ts:541](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/files/FilesComponent.ts#L541)

Emits a stable retry request for an interactive retry-state file.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `file` | [`IFileItem`](Interface.IFileItem) |

#### Returns

`void`
