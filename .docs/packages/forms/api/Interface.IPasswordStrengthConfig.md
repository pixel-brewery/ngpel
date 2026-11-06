---
title: 'Interface: IPasswordStrengthConfig'
generated: true
editUrl: false
---
# Interface: IPasswordStrengthConfig

Defined in: [password-strength/IPasswordStrengthConfig.ts:15](https://github.com/pixel-brewery/ngpel/blob/main/libs/forms/src/password-strength/IPasswordStrengthConfig.ts#L15)

Password strength policy: an optional minimum length, weighted regular-expression rules and the
thresholds mapping the normalized score to a [PasswordScore](Variable.PasswordScore). The policy is plain data owned
by the application; the library ships no default.

## Properties

### minLength?

```ts
readonly optional minLength?: number;
```

Defined in: [password-strength/IPasswordStrengthConfig.ts:19](https://github.com/pixel-brewery/ngpel/blob/main/libs/forms/src/password-strength/IPasswordStrengthConfig.ts#L19)

Minimum password length; shorter passwords are `VeryWeak` regardless of the rules.

***

### rules

```ts
readonly rules: readonly IPasswordStrengthRule[];
```

Defined in: [password-strength/IPasswordStrengthConfig.ts:22](https://github.com/pixel-brewery/ngpel/blob/main/libs/forms/src/password-strength/IPasswordStrengthConfig.ts#L22)

Weighted rules evaluated against the password.

***

### thresholds

```ts
readonly thresholds: IPasswordStrengthThresholds;
```

Defined in: [password-strength/IPasswordStrengthConfig.ts:25](https://github.com/pixel-brewery/ngpel/blob/main/libs/forms/src/password-strength/IPasswordStrengthConfig.ts#L25)

Normalized-score thresholds per strength level.
