---
title: 'Function: provideNotification()'
generated: true
editUrl: false
---
# Function: provideNotification()

```ts
function provideNotification(...features): EnvironmentProviders;
```

Defined in: [notification/provider/provideNotification.ts:32](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/notification/provider/provideNotification.ts#L32)

Root environment provider of the notification pipeline: registers [NotificationService](Class.NotificationService) and
composes the sinks the passed features contribute. Composed without a feature the service still
works — messages are materialized and kept in the history, they just reach no sink.

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| ...`features` | readonly [`IFeature`](Interface.IFeature)\<[`NotificationFeatureKind`](TypeAlias.NotificationFeatureKind)\>[] | `withConsoleNotificationInterceptor()` and `withAudioNotificationInterceptor()`. |

## Returns

`EnvironmentProviders`

Environment providers for the application or route composition root.

## Throws

Error when two features of the same kind are composed.

## Example

```typescript
export const appConfig = {
    providers: [
        provideNotification(
            withConsoleNotificationInterceptor({ isDisabled: environment.production }),
            withAudioNotificationInterceptor({ sounds: { error: '/audio/alert.mp3' } })
        )
    ]
};
```
