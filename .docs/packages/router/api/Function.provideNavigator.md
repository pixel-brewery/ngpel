---
title: 'Function: provideNavigator()'
generated: true
editUrl: false
---
# Function: provideNavigator()

```ts
function provideNavigator(): EnvironmentProviders;
```

Defined in: [navigator/provideNavigator.ts:23](https://github.com/pixel-brewery/ngpel/blob/main/libs/router/src/navigator/provideNavigator.ts#L23)

Registers [Navigator](Class.Navigator) and its [NavigatorJournal](Class.NavigatorJournal). Both are environment-scoped, so
the journal spans the whole application while its subscriptions end with the injector.

## Returns

`EnvironmentProviders`

Environment providers for the application composition root.

## Example

```typescript
export const appConfig: ApplicationConfig = {
    providers: [provideRouter(routes), provideNavigator()]
};
```
