---
title: 'Interface: IPasswordStrengthRule'
generated: true
editUrl: false
---
# Interface: IPasswordStrengthRule

Defined in: [password-strength/IPasswordStrengthRule.ts:6](https://github.com/pixel-brewery/ngpel/blob/main/libs/forms/src/password-strength/IPasswordStrengthRule.ts#L6)

One regular-expression rule contributing to the password strength score.

## Properties

### regex

```ts
readonly regex: RegExp;
```

Defined in: [password-strength/IPasswordStrengthRule.ts:10](https://github.com/pixel-brewery/ngpel/blob/main/libs/forms/src/password-strength/IPasswordStrengthRule.ts#L10)

Pattern the password must match for the rule to count (digits, upper-case letters, symbols, ...).

***

### weight

```ts
readonly weight: number;
```

Defined in: [password-strength/IPasswordStrengthRule.ts:13](https://github.com/pixel-brewery/ngpel/blob/main/libs/forms/src/password-strength/IPasswordStrengthRule.ts#L13)

Weight of the rule in the normalized score; must be zero or positive.
