---
title: 'Interface: ICaptchaChallenge'
generated: true
editUrl: false
---
# Interface: ICaptchaChallenge

Defined in: [libs/ui/src/components/captcha/ICaptchaChallenge.ts:8](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/captcha/ICaptchaChallenge.ts#L8)

Represents a generated captcha challenge.

## Properties

### answer

```ts
readonly answer: number;
```

Defined in: [libs/ui/src/components/captcha/ICaptchaChallenge.ts:23](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/captcha/ICaptchaChallenge.ts#L23)

Correct answer value.

***

### operator

```ts
readonly operator: CaptchaOperator;
```

Defined in: [libs/ui/src/components/captcha/ICaptchaChallenge.ts:39](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/captcha/ICaptchaChallenge.ts#L39)

Operator used in this challenge.

***

### options

```ts
readonly options: readonly number[];
```

Defined in: [libs/ui/src/components/captcha/ICaptchaChallenge.ts:31](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/captcha/ICaptchaChallenge.ts#L31)

Answer options displayed as buttons.

***

### question

```ts
readonly question: string;
```

Defined in: [libs/ui/src/components/captcha/ICaptchaChallenge.ts:15](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/captcha/ICaptchaChallenge.ts#L15)

Question text displayed to the user.
