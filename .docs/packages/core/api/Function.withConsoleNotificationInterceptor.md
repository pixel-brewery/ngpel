---
title: 'Function: withConsoleNotificationInterceptor()'
generated: true
editUrl: false
---
# Function: withConsoleNotificationInterceptor()

```ts
function withConsoleNotificationInterceptor(options?): IFeature<NotificationFeatureKind>;
```

Defined in: [notification/provider/withConsoleNotificationInterceptor.ts:28](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/notification/provider/withConsoleNotificationInterceptor.ts#L28)

Adds the [ConsoleNotificationInterceptor](Class.ConsoleNotificationInterceptor) to `provideNotification()`, so every raised
notification is also written to a diagnostic channel. The interceptor is configured while it is
constructed, which makes it behave the same whether it is reached through the pipeline or
injected directly, and it is disposed with the injector it was composed into.

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `options` | [`IConsoleNotificationInterceptorConfig`](Interface.IConsoleNotificationInterceptorConfig) | Diagnostic channel and disable switch; defaults to the global console, enabled. |

## Returns

[`IFeature`](Interface.IFeature)\<[`NotificationFeatureKind`](TypeAlias.NotificationFeatureKind)\>

The feature to pass to `provideNotification()`.

## Example

```typescript
provideNotification(withConsoleNotificationInterceptor({ isDisabled: environment.production }));
```
