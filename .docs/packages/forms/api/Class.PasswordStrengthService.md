---
title: 'Class: PasswordStrengthService'
generated: true
editUrl: false
---
# Class: PasswordStrengthService

Defined in: [password-strength/PasswordStrengthService.ts:14](https://github.com/pixel-brewery/ngpel/blob/main/libs/forms/src/password-strength/PasswordStrengthService.ts#L14)

Evaluates password strength against a configurable, regular-expression based policy. Register it
with [providePasswordStrength](Function.providePasswordStrength) or construct it directly for use without dependency injection.

## Constructors

### Constructor

```ts
new PasswordStrengthService(config): PasswordStrengthService;
```

Defined in: [password-strength/PasswordStrengthService.ts:29](https://github.com/pixel-brewery/ngpel/blob/main/libs/forms/src/password-strength/PasswordStrengthService.ts#L29)

Constructs a new instance of the `PasswordStrengthService` class.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `config` | [`IPasswordStrengthConfig`](Interface.IPasswordStrengthConfig) | The policy defining minimum length, rules and thresholds. |

#### Returns

`PasswordStrengthService`

## Methods

### validate()

```ts
validate(password): "Blank" | "VeryWeak" | "Weak" | "Medium" | "Strong" | "VeryStrong";
```

Defined in: [password-strength/PasswordStrengthService.ts:45](https://github.com/pixel-brewery/ngpel/blob/main/libs/forms/src/password-strength/PasswordStrengthService.ts#L45)

Scores a password. Empty input is `Blank`, input below the minimum length is `VeryWeak`, and
otherwise the weighted share of matching rules is mapped through the configured thresholds.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `password` | `string` \| `null` \| `undefined` | The password to evaluate (`null`, `undefined` and `''` count as blank). |

#### Returns

`"Blank"` \| `"VeryWeak"` \| `"Weak"` \| `"Medium"` \| `"Strong"` \| `"VeryStrong"`

The strength level name.
