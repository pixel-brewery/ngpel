---
title: 'Interface: ICaptchaProps'
generated: true
editUrl: false
---
# Interface: ICaptchaProps

Defined in: [libs/ui/src/components/captcha/ICaptchaProps.ts:15](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/captcha/ICaptchaProps.ts#L15)

Public captcha component state contract.

## Properties

### challenge

```ts
readonly challenge: ICaptchaChallenge | null;
```

Defined in: [libs/ui/src/components/captcha/ICaptchaProps.ts:22](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/captcha/ICaptchaProps.ts#L22)

Current captcha challenge.

***

### invalid

```ts
readonly invalid: boolean;
```

Defined in: [libs/ui/src/components/captcha/ICaptchaProps.ts:46](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/captcha/ICaptchaProps.ts#L46)

Indicates whether the last answer was invalid.

***

### state

```ts
readonly state: CaptchaState;
```

Defined in: [libs/ui/src/components/captcha/ICaptchaProps.ts:30](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/captcha/ICaptchaProps.ts#L30)

Current component state.

***

### verified

```ts
readonly verified: boolean;
```

Defined in: [libs/ui/src/components/captcha/ICaptchaProps.ts:38](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/captcha/ICaptchaProps.ts#L38)

Indicates whether the captcha has been verified.
