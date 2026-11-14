---
title: 'Class: UrlListComponent\<TCategory\>'
generated: true
editUrl: false
---
# Class: UrlListComponent\<TCategory\>

Defined in: [libs/ui/src/components/url-list/UrlListComponent.ts:146](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/url-list/UrlListComponent.ts#L146)

Edits categorized web links with caller-owned Signal Forms state, choices and mutations.

## Type Parameters

| Type Parameter | Default type |
| ------ | ------ |
| <a id="type-parameter-tcategory"></a> `TCategory` *extends* `string` | `string` |

## Constructors

### Constructor

```ts
new UrlListComponent<TCategory>(): UrlListComponent<TCategory>;
```

#### Returns

`UrlListComponent`\<`TCategory`\>

## Properties

### addRequested

```ts
readonly addRequested: OutputEmitterRef<void>;
```

Defined in: [libs/ui/src/components/url-list/UrlListComponent.ts:164](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/url-list/UrlListComponent.ts#L164)

Requests an additional row from the caller.

***

### canAdd

```ts
protected readonly canAdd: Signal<boolean>;
```

Defined in: [libs/ui/src/components/url-list/UrlListComponent.ts:168](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/url-list/UrlListComponent.ts#L168)

***

### controlsInHeader

```ts
readonly controlsInHeader: InputSignal<boolean>;
```

Defined in: [libs/ui/src/components/url-list/UrlListComponent.ts:156](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/url-list/UrlListComponent.ts#L156)

Places collection actions in the heading instead of beneath the active URL.

***

### disabled

```ts
readonly disabled: InputSignal<boolean>;
```

Defined in: [libs/ui/src/components/url-list/UrlListComponent.ts:158](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/url-list/UrlListComponent.ts#L158)

Disables editing and collection mutations. Valid links can still be opened.

***

### fields

```ts
readonly fields: InputSignal<FieldTree<IUrlFormData<TCategory>[]>>;
```

Defined in: [libs/ui/src/components/url-list/UrlListComponent.ts:150](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/url-list/UrlListComponent.ts#L150)

The editable collection owned by the calling feature.

***

### labels

```ts
readonly labels: InputSignal<IUrlListLabels>;
```

Defined in: [libs/ui/src/components/url-list/UrlListComponent.ts:154](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/url-list/UrlListComponent.ts#L154)

Translated presentation text supplied by the caller.

***

### maximumItems

```ts
readonly maximumItems: InputSignal<number | null>;
```

Defined in: [libs/ui/src/components/url-list/UrlListComponent.ts:160](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/url-list/UrlListComponent.ts#L160)

Optional collection limit for the add action.

***

### options

```ts
readonly options: InputSignal<readonly {
  label: string;
  value: TCategory;
}[]>;
```

Defined in: [libs/ui/src/components/url-list/UrlListComponent.ts:152](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/url-list/UrlListComponent.ts#L152)

Categories available for each URL.

***

### removeRequested

```ts
readonly removeRequested: OutputEmitterRef<number>;
```

Defined in: [libs/ui/src/components/url-list/UrlListComponent.ts:166](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/url-list/UrlListComponent.ts#L166)

Requests removal of one row by index.

***

### testIdPrefix

```ts
readonly testIdPrefix: InputSignal<string>;
```

Defined in: [libs/ui/src/components/url-list/UrlListComponent.ts:162](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/url-list/UrlListComponent.ts#L162)

Prefix for automation hooks.

## Methods

### row()

```ts
protected row(index):
  | (() => FieldState<IUrlFormData<TCategory>, number>) & { readonly [K in keyof IUrlFormData<TCategory> as IUrlFormData<TCategory>[K] extends Function ? never : K]: FieldTree<Exclude<IUrlFormData<TCategory>[K], undefined>, string, "writable"> } & {
} & {
  type: FieldTree<string, string>;
}
  | undefined;
```

Defined in: [libs/ui/src/components/url-list/UrlListComponent.ts:177](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/url-list/UrlListComponent.ts#L177)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `index` | `number` |

#### Returns

  \| (() => `FieldState`\<[`IUrlFormData`](Interface.IUrlFormData)\<`TCategory`\>, `number`\>) & `{ readonly [K in keyof IUrlFormData<TCategory> as IUrlFormData<TCategory>[K] extends Function ? never : K]: FieldTree<Exclude<IUrlFormData<TCategory>[K], undefined>, string, "writable"> }` & \{
\} & \{
  `type`: `FieldTree`\<`string`, `string`\>;
\}
  \| `undefined`

***

### webLink()

```ts
protected webLink(value): string | null;
```

Defined in: [libs/ui/src/components/url-list/UrlListComponent.ts:183](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/url-list/UrlListComponent.ts#L183)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `value` | `string` |

#### Returns

`string` \| `null`
