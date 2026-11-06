---
title: 'Interface: ICaptchaVerifiedEvent'
generated: true
editUrl: false
---
# Interface: ICaptchaVerifiedEvent

Defined in: [libs/ui/src/components/captcha/ICaptchaVerifiedEvent.ts:8](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/captcha/ICaptchaVerifiedEvent.ts#L8)

Payload emitted when captcha verification succeeds.

## Properties

### answer

```ts
readonly answer: number;
```

Defined in: [libs/ui/src/components/captcha/ICaptchaVerifiedEvent.ts:15](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/captcha/ICaptchaVerifiedEvent.ts#L15)

Selected answer value.

***

### challenge

```ts
readonly challenge: ICaptchaChallenge;
```

Defined in: [libs/ui/src/components/captcha/ICaptchaVerifiedEvent.ts:23](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/captcha/ICaptchaVerifiedEvent.ts#L23)

The challenge that was solved.
