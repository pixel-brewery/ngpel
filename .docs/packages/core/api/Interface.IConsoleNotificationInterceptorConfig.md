---
title: 'Interface: IConsoleNotificationInterceptorConfig'
generated: true
editUrl: false
---
# Interface: IConsoleNotificationInterceptorConfig

Defined in: [notification/interception/IConsoleNotificationInterceptorConfig.ts:6](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/notification/interception/IConsoleNotificationInterceptorConfig.ts#L6)

Options of the [ConsoleNotificationInterceptor](Class.ConsoleNotificationInterceptor).

## Properties

### isDisabled?

```ts
readonly isDisabled?: boolean;
```

Defined in: [notification/interception/IConsoleNotificationInterceptorConfig.ts:13](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/notification/interception/IConsoleNotificationInterceptorConfig.ts#L13)

When `true` the interceptor stays registered but writes nothing, so a production build can
silence it without changing the composition.

***

### logger?

```ts
readonly logger?: Pick<Console, "error" | "info" | "log" | "warn">;
```

Defined in: [notification/interception/IConsoleNotificationInterceptorConfig.ts:18](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/notification/interception/IConsoleNotificationInterceptorConfig.ts#L18)

Diagnostic channel to write to; defaults to the global console.
