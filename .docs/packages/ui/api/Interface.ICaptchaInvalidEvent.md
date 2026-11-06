---
title: 'Interface: ICaptchaInvalidEvent'
generated: true
editUrl: false
---
# Interface: ICaptchaInvalidEvent

Defined in: [libs/ui/src/components/captcha/ICaptchaInvalidEvent.ts:8](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/captcha/ICaptchaInvalidEvent.ts#L8)

Payload emitted when captcha verification fails.

## Properties

### answer

```ts
readonly answer: number;
```

Defined in: [libs/ui/src/components/captcha/ICaptchaInvalidEvent.ts:15](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/captcha/ICaptchaInvalidEvent.ts#L15)

Selected (wrong) answer value.

***

### challenge

```ts
readonly challenge: ICaptchaChallenge;
```

Defined in: [libs/ui/src/components/captcha/ICaptchaInvalidEvent.ts:23](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/captcha/ICaptchaInvalidEvent.ts#L23)

The challenge that was attempted.
