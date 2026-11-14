---
title: 'Class: FileSourceComponent'
generated: true
editUrl: false
---
# Class: FileSourceComponent

Defined in: [libs/ui/src/components/file-source/FileSourceComponent.ts:23](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/file-source/FileSourceComponent.ts#L23)

Declares one headless acquisition source rendered by a parent [FilesComponent](Class.FilesComponent).

## Constructors

### Constructor

```ts
new FileSourceComponent(): FileSourceComponent;
```

#### Returns

`FileSourceComponent`

## Properties

### accept

```ts
readonly accept: InputSignal<readonly string[]>;
```

Defined in: [libs/ui/src/components/file-source/FileSourceComponent.ts:51](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/file-source/FileSourceComponent.ts#L51)

Accepted file extensions or MIME patterns for picker sources.

***

### appearance

```ts
readonly appearance: InputSignal<Appearance>;
```

Defined in: [libs/ui/src/components/file-source/FileSourceComponent.ts:69](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/file-source/FileSourceComponent.ts#L69)

Visual appearance of the rendered source action.

***

### busy

```ts
readonly busy: InputSignal<boolean>;
```

Defined in: [libs/ui/src/components/file-source/FileSourceComponent.ts:66](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/file-source/FileSourceComponent.ts#L66)

Whether the source currently performs an operation.

***

### description

```ts
readonly description: InputSignal<string | null>;
```

Defined in: [libs/ui/src/components/file-source/FileSourceComponent.ts:48](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/file-source/FileSourceComponent.ts#L48)

Optional explanatory copy rendered below the action.

***

### directory

```ts
readonly directory: InputSignal<boolean>;
```

Defined in: [libs/ui/src/components/file-source/FileSourceComponent.ts:57](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/file-source/FileSourceComponent.ts#L57)

Whether a picker source may select directories.

***

### disabled

```ts
readonly disabled: InputSignal<boolean>;
```

Defined in: [libs/ui/src/components/file-source/FileSourceComponent.ts:63](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/file-source/FileSourceComponent.ts#L63)

Whether the source rejects user interactions.

***

### dropEnabled

```ts
readonly dropEnabled: InputSignal<boolean>;
```

Defined in: [libs/ui/src/components/file-source/FileSourceComponent.ts:60](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/file-source/FileSourceComponent.ts#L60)

Whether dropped files are routed to this picker source.

***

### filesRejected

```ts
readonly filesRejected: OutputEmitterRef<readonly File[]>;
```

Defined in: [libs/ui/src/components/file-source/FileSourceComponent.ts:81](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/file-source/FileSourceComponent.ts#L81)

Emits files rejected by a picker source.

***

### filesSelected

```ts
readonly filesSelected: OutputEmitterRef<readonly File[]>;
```

Defined in: [libs/ui/src/components/file-source/FileSourceComponent.ts:78](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/file-source/FileSourceComponent.ts#L78)

Emits files accepted by a picker source.

***

### iconName

```ts
readonly iconName: InputSignal<string>;
```

Defined in: [libs/ui/src/components/file-source/FileSourceComponent.ts:45](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/file-source/FileSourceComponent.ts#L45)

Mosaik icon rendered with the action.

***

### key

```ts
readonly key: InputSignal<string>;
```

Defined in: [libs/ui/src/components/file-source/FileSourceComponent.ts:33](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/file-source/FileSourceComponent.ts#L33)

Stable key used to identify the source.

***

### label

```ts
readonly label: InputSignal<string>;
```

Defined in: [libs/ui/src/components/file-source/FileSourceComponent.ts:42](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/file-source/FileSourceComponent.ts#L42)

Visible action label.

***

### multiple

```ts
readonly multiple: InputSignal<boolean>;
```

Defined in: [libs/ui/src/components/file-source/FileSourceComponent.ts:54](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/file-source/FileSourceComponent.ts#L54)

Whether one picker interaction may select multiple files.

***

### requested

```ts
readonly requested: OutputEmitterRef<void>;
```

Defined in: [libs/ui/src/components/file-source/FileSourceComponent.ts:75](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/file-source/FileSourceComponent.ts#L75)

Emits when an action source is invoked.

***

### testId

```ts
readonly testId: InputSignal<string | null>;
```

Defined in: [libs/ui/src/components/file-source/FileSourceComponent.ts:36](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/file-source/FileSourceComponent.ts#L36)

Stable automation identifier of the rendered acquisition action.

***

### type

```ts
readonly type: InputSignal<FileSourceTypeValue>;
```

Defined in: [libs/ui/src/components/file-source/FileSourceComponent.ts:39](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/file-source/FileSourceComponent.ts#L39)

Acquisition mechanism provided by the source.

***

### variant

```ts
readonly variant: InputSignal<Variant>;
```

Defined in: [libs/ui/src/components/file-source/FileSourceComponent.ts:72](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/file-source/FileSourceComponent.ts#L72)

Visual variant of the rendered source action.

## Methods

### rejectFiles()

```ts
rejectFiles(files): void;
```

Defined in: [libs/ui/src/components/file-source/FileSourceComponent.ts:102](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/file-source/FileSourceComponent.ts#L102)

Emits a rejected non-empty file selection for an enabled picker source.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `files` | readonly `File`[] |

#### Returns

`void`

***

### request()

```ts
request(): void;
```

Defined in: [libs/ui/src/components/file-source/FileSourceComponent.ts:88](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/file-source/FileSourceComponent.ts#L88)

Invokes an enabled action source.

#### Returns

`void`

***

### selectFiles()

```ts
selectFiles(files): void;
```

Defined in: [libs/ui/src/components/file-source/FileSourceComponent.ts:95](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/file-source/FileSourceComponent.ts#L95)

Emits an accepted non-empty file selection for an enabled picker source.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `files` | readonly `File`[] |

#### Returns

`void`
