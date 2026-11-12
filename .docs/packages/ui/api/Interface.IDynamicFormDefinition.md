---
title: 'Interface: IDynamicFormDefinition'
generated: true
editUrl: false
---
# Interface: IDynamicFormDefinition

Defined in: [libs/ui/src/components/dynamic-form/IDynamicFormDefinition.ts:12](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/dynamic-form/IDynamicFormDefinition.ts#L12)

Versioned, UI-owned definition of a dynamic form.

## Properties

### description?

```ts
readonly description?: string;
```

Defined in: [libs/ui/src/components/dynamic-form/IDynamicFormDefinition.ts:43](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/dynamic-form/IDynamicFormDefinition.ts#L43)

Optional form description.

***

### key

```ts
readonly key: string;
```

Defined in: [libs/ui/src/components/dynamic-form/IDynamicFormDefinition.ts:19](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/dynamic-form/IDynamicFormDefinition.ts#L19)

Stable form definition key.

***

### sections

```ts
readonly sections: readonly IDynamicFormSectionDefinition[];
```

Defined in: [libs/ui/src/components/dynamic-form/IDynamicFormDefinition.ts:51](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/dynamic-form/IDynamicFormDefinition.ts#L51)

Ordered visual sections.

***

### title?

```ts
readonly title?: string;
```

Defined in: [libs/ui/src/components/dynamic-form/IDynamicFormDefinition.ts:35](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/dynamic-form/IDynamicFormDefinition.ts#L35)

Optional form title.

***

### version

```ts
readonly version: number;
```

Defined in: [libs/ui/src/components/dynamic-form/IDynamicFormDefinition.ts:27](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/dynamic-form/IDynamicFormDefinition.ts#L27)

Immutable definition version.
