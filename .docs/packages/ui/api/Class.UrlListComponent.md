---
title: 'Class: UrlListComponent\<TCategory\>'
generated: true
editUrl: false
---
# Class: UrlListComponent\<TCategory\>

Defined in: libs/ui/src/components/url-list/UrlListComponent.ts:141

Edits categorized web links with caller-owned Signal Forms state, choices and mutations.

## Type Parameters

| Type Parameter | Default type |
| ------ | ------ |
| `TCategory` *extends* `string` | `string` |

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

Defined in: libs/ui/src/components/url-list/UrlListComponent.ts:157

Requests an additional row from the caller.

***

### canAdd

```ts
protected readonly canAdd: Signal<boolean>;
```

Defined in: libs/ui/src/components/url-list/UrlListComponent.ts:161

***

### disabled

```ts
readonly disabled: InputSignal<boolean>;
```

Defined in: libs/ui/src/components/url-list/UrlListComponent.ts:151

Disables editing and collection mutations. Valid links can still be opened.

***

### fields

```ts
readonly fields: InputSignal<FieldTree<IUrlFormData<TCategory>[]>>;
```

Defined in: libs/ui/src/components/url-list/UrlListComponent.ts:145

The editable collection owned by the calling feature.

***

### labels

```ts
readonly labels: InputSignal<IUrlListLabels>;
```

Defined in: libs/ui/src/components/url-list/UrlListComponent.ts:149

Translated presentation text supplied by the caller.

***

### maximumItems

```ts
readonly maximumItems: InputSignal<number | null>;
```

Defined in: libs/ui/src/components/url-list/UrlListComponent.ts:153

Optional collection limit for the add action.

***

### options

```ts
readonly options: InputSignal<readonly {
  label: string;
  value: TCategory;
}[]>;
```

Defined in: libs/ui/src/components/url-list/UrlListComponent.ts:147

Categories available for each URL.

***

### removeRequested

```ts
readonly removeRequested: OutputEmitterRef<number>;
```

Defined in: libs/ui/src/components/url-list/UrlListComponent.ts:159

Requests removal of one row by index.

***

### testIdPrefix

```ts
readonly testIdPrefix: InputSignal<string>;
```

Defined in: libs/ui/src/components/url-list/UrlListComponent.ts:155

Prefix for automation hooks.

## Methods

### row()

```ts
protected row(index):
  | () => FieldState<IUrlFormData<TCategory>, number> & { readonly [K in keyof IUrlFormData<TCategory> as IUrlFormData<TCategory>[K] extends Function ? never : K]: FieldTree<Exclude<IUrlFormData<TCategory>[K], undefined>, string, "writable"> } & {
} & {
  type: FieldTree<string, string>;
}
  | undefined;
```

Defined in: libs/ui/src/components/url-list/UrlListComponent.ts:170

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `index` | `number` |

#### Returns

  \| () => `FieldState`\<[`IUrlFormData`](Interface.IUrlFormData)\<`TCategory`\>, `number`\> & `{ readonly [K in keyof IUrlFormData<TCategory> as IUrlFormData<TCategory>[K] extends Function ? never : K]: FieldTree<Exclude<IUrlFormData<TCategory>[K], undefined>, string, "writable"> }` & \{
\} & \{
  `type`: `FieldTree`\<`string`, `string`\>;
\}
  \| `undefined`

***

### webLink()

```ts
protected webLink(value): string | null;
```

Defined in: libs/ui/src/components/url-list/UrlListComponent.ts:176

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `value` | `string` |

#### Returns

`string` \| `null`
