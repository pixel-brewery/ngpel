---
title: 'Function: providePasswordStrength()'
generated: true
editUrl: false
---
# Function: providePasswordStrength()

```ts
function providePasswordStrength(config): EnvironmentProviders;
```

Defined in: [password-strength/providePasswordStrength.ts:16](https://github.com/pixel-brewery/ngpel/blob/main/libs/forms/src/password-strength/providePasswordStrength.ts#L16)

Registers a [PasswordStrengthService](Class.PasswordStrengthService) configured with the application's password policy.

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `config` | [`IPasswordStrengthConfig`](Interface.IPasswordStrengthConfig) | The policy defining minimum length, rules and thresholds. |

## Returns

`EnvironmentProviders`

Environment providers for the composition root.
