---
title: 'Class: CollectionExportDrawerComponentIntl'
generated: true
editUrl: false
---
# Class: CollectionExportDrawerComponentIntl

Defined in: [libs/ui/src/collection-view/exporting/CollectionExportDrawerComponentIntl.ts:16](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/collection-view/exporting/CollectionExportDrawerComponentIntl.ts#L16)

Internationalization labels for the collection export dialog component.

## Constructors

### Constructor

```ts
new CollectionExportDrawerComponentIntl(): CollectionExportDrawerComponentIntl;
```

Defined in: [libs/ui/src/collection-view/exporting/CollectionExportDrawerComponentIntl.ts:42](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/collection-view/exporting/CollectionExportDrawerComponentIntl.ts#L42)

Constructs a new instance of the `CollectionExportDrawerComponentIntl` class.

#### Returns

`CollectionExportDrawerComponentIntl`

## Accessors

### cancelLabel

#### Get Signature

```ts
get cancelLabel(): string;
```

Defined in: [libs/ui/src/collection-view/exporting/CollectionExportDrawerComponentIntl.ts:158](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/collection-view/exporting/CollectionExportDrawerComponentIntl.ts#L158)

Label for the cancel button.

##### Returns

`string`

***

### changes

#### Get Signature

```ts
get changes(): Subject<void>;
```

Defined in: [libs/ui/src/collection-view/exporting/CollectionExportDrawerComponentIntl.ts:68](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/collection-view/exporting/CollectionExportDrawerComponentIntl.ts#L68)

Emits when any label changes.

##### Returns

`Subject`\<`void`\>

***

### columnsRequiredMessage

#### Get Signature

```ts
get columnsRequiredMessage(): string;
```

Defined in: [libs/ui/src/collection-view/exporting/CollectionExportDrawerComponentIntl.ts:176](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/collection-view/exporting/CollectionExportDrawerComponentIntl.ts#L176)

Validation message shown when no export column is selected.

##### Returns

`string`

***

### columnsSelectedLabel

#### Get Signature

```ts
get columnsSelectedLabel(): string;
```

Defined in: [libs/ui/src/collection-view/exporting/CollectionExportDrawerComponentIntl.ts:95](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/collection-view/exporting/CollectionExportDrawerComponentIntl.ts#L95)

Suffix shown after the column count (e.g. "3 / 5 columns selected").

##### Returns

`string`

***

### columnsTitleLabel

#### Get Signature

```ts
get columnsTitleLabel(): string;
```

Defined in: [libs/ui/src/collection-view/exporting/CollectionExportDrawerComponentIntl.ts:86](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/collection-view/exporting/CollectionExportDrawerComponentIntl.ts#L86)

Heading above the column selection section.

##### Returns

`string`

***

### csvFormatLabel

#### Get Signature

```ts
get csvFormatLabel(): string;
```

Defined in: [libs/ui/src/collection-view/exporting/CollectionExportDrawerComponentIntl.ts:140](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/collection-view/exporting/CollectionExportDrawerComponentIntl.ts#L140)

Label for the CSV export format.

##### Returns

`string`

***

### deselectAllLabel

#### Get Signature

```ts
get deselectAllLabel(): string;
```

Defined in: [libs/ui/src/collection-view/exporting/CollectionExportDrawerComponentIntl.ts:113](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/collection-view/exporting/CollectionExportDrawerComponentIntl.ts#L113)

Label for the "deselect all" button.

##### Returns

`string`

***

### exportLabel

#### Get Signature

```ts
get exportLabel(): string;
```

Defined in: [libs/ui/src/collection-view/exporting/CollectionExportDrawerComponentIntl.ts:167](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/collection-view/exporting/CollectionExportDrawerComponentIntl.ts#L167)

Label for the export / confirm button.

##### Returns

`string`

***

### formatTitleLabel

#### Get Signature

```ts
get formatTitleLabel(): string;
```

Defined in: [libs/ui/src/collection-view/exporting/CollectionExportDrawerComponentIntl.ts:122](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/collection-view/exporting/CollectionExportDrawerComponentIntl.ts#L122)

Heading above the format selection section.

##### Returns

`string`

***

### odsFormatLabel

#### Get Signature

```ts
get odsFormatLabel(): string;
```

Defined in: [libs/ui/src/collection-view/exporting/CollectionExportDrawerComponentIntl.ts:149](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/collection-view/exporting/CollectionExportDrawerComponentIntl.ts#L149)

Label for the OpenDocument export format.

##### Returns

`string`

***

### recordsLabel

#### Get Signature

```ts
get recordsLabel(): string;
```

Defined in: [libs/ui/src/collection-view/exporting/CollectionExportDrawerComponentIntl.ts:181](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/collection-view/exporting/CollectionExportDrawerComponentIntl.ts#L181)

Label shown after the number of records to export.

##### Returns

`string`

***

### selectAllLabel

#### Get Signature

```ts
get selectAllLabel(): string;
```

Defined in: [libs/ui/src/collection-view/exporting/CollectionExportDrawerComponentIntl.ts:104](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/collection-view/exporting/CollectionExportDrawerComponentIntl.ts#L104)

Label for the "select all" button.

##### Returns

`string`

***

### titleLabel

#### Get Signature

```ts
get titleLabel(): string;
```

Defined in: [libs/ui/src/collection-view/exporting/CollectionExportDrawerComponentIntl.ts:77](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/collection-view/exporting/CollectionExportDrawerComponentIntl.ts#L77)

Title of the export dialog.

##### Returns

`string`

***

### xlsxFormatLabel

#### Get Signature

```ts
get xlsxFormatLabel(): string;
```

Defined in: [libs/ui/src/collection-view/exporting/CollectionExportDrawerComponentIntl.ts:131](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/collection-view/exporting/CollectionExportDrawerComponentIntl.ts#L131)

Label for the Excel export format.

##### Returns

`string`

## Methods

### getFormatLabel()

```ts
getFormatLabel(format): string;
```

Defined in: [libs/ui/src/collection-view/exporting/CollectionExportDrawerComponentIntl.ts:196](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/collection-view/exporting/CollectionExportDrawerComponentIntl.ts#L196)

Resolves the display label for an export format.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `format` | [`CollectionExportFormat`](TypeAlias.CollectionExportFormat) | Export format value. |

#### Returns

`string`

The translated display label.
