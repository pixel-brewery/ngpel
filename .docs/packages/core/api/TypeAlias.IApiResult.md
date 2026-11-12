---
title: 'Type Alias: IApiResult\<TData\>'
generated: true
editUrl: false
---
# Type Alias: IApiResult\<TData\>

```ts
type IApiResult<TData> =
  | IApiSuccess<TData>
  | IApiFailure;
```

Defined in: [results/IApiResult.ts:22](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/results/IApiResult.ts#L22)

Discriminated union type for API responses. Narrow through the `success` discriminator.

## Type Parameters

| Type Parameter |
| ------ |
| <a id="type-parameter-tdata"></a> `TData` |

## Example

```typescript
if (result.success) {
    console.log(result.data); // typed as TData
} else {
    console.error(result.problem.code); // typed as IProblemDetail
}
```
