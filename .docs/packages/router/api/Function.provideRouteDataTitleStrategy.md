---
title: 'Function: provideRouteDataTitleStrategy()'
generated: true
editUrl: false
---
# Function: provideRouteDataTitleStrategy()

```ts
function provideRouteDataTitleStrategy(options?): EnvironmentProviders;
```

Defined in: [title/provideRouteDataTitleStrategy.ts:28](https://github.com/pixel-brewery/ngpel/blob/main/libs/router/src/title/provideRouteDataTitleStrategy.ts#L28)

Registers [RouteDataTitleStrategy](Class.RouteDataTitleStrategy) as the application's `TitleStrategy`. Translation of
the title segments stays a separate seam: bind `ROUTE_TITLE_TEXT_RESOLVER` when route data holds
translation keys.

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `options?` | [`IRouteTitleOptions`](Interface.IRouteTitleOptions) | The application name, separator and route data keys; omitted members keep their neutral defaults. |

## Returns

`EnvironmentProviders`

Environment providers for the application composition root.

## Example

```typescript
export const appConfig: ApplicationConfig = {
    providers: [provideRouter(routes), provideRouteDataTitleStrategy({ appName: 'Contoso' })]
};
```
