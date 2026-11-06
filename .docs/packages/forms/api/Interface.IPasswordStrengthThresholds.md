---
title: 'Interface: IPasswordStrengthThresholds'
generated: true
editUrl: false
---
# Interface: IPasswordStrengthThresholds

Defined in: [password-strength/IPasswordStrengthThresholds.ts:8](https://github.com/pixel-brewery/ngpel/blob/main/libs/forms/src/password-strength/IPasswordStrengthThresholds.ts#L8)

Lower bounds of the normalized score (`0..1`) for each strength level above `Blank`. A score
reaching `veryStrong` maps to `VeryStrong`, a score reaching `strong` to `Strong`, and so on;
anything below `weak` is `VeryWeak`.

## Properties

### medium

```ts
readonly medium: number;
```

Defined in: [password-strength/IPasswordStrengthThresholds.ts:18](https://github.com/pixel-brewery/ngpel/blob/main/libs/forms/src/password-strength/IPasswordStrengthThresholds.ts#L18)

Lower bound of `Medium`.

***

### strong

```ts
readonly strong: number;
```

Defined in: [password-strength/IPasswordStrengthThresholds.ts:21](https://github.com/pixel-brewery/ngpel/blob/main/libs/forms/src/password-strength/IPasswordStrengthThresholds.ts#L21)

Lower bound of `Strong`.

***

### veryStrong

```ts
readonly veryStrong: number;
```

Defined in: [password-strength/IPasswordStrengthThresholds.ts:24](https://github.com/pixel-brewery/ngpel/blob/main/libs/forms/src/password-strength/IPasswordStrengthThresholds.ts#L24)

Lower bound of `VeryStrong`.

***

### veryWeak

```ts
readonly veryWeak: number;
```

Defined in: [password-strength/IPasswordStrengthThresholds.ts:12](https://github.com/pixel-brewery/ngpel/blob/main/libs/forms/src/password-strength/IPasswordStrengthThresholds.ts#L12)

Lower bound of `VeryWeak`; informational, every non-blank password is at least very weak.

***

### weak

```ts
readonly weak: number;
```

Defined in: [password-strength/IPasswordStrengthThresholds.ts:15](https://github.com/pixel-brewery/ngpel/blob/main/libs/forms/src/password-strength/IPasswordStrengthThresholds.ts#L15)

Lower bound of `Weak`.
