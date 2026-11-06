---
title: 'Class: CaptchaComponentIntl'
generated: true
editUrl: false
---
# Class: CaptchaComponentIntl

Defined in: [libs/ui/src/components/captcha/CaptchaComponentIntl.ts:15](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/captcha/CaptchaComponentIntl.ts#L15)

Internationalization labels for the captcha component.

## Constructors

### Constructor

```ts
new CaptchaComponentIntl(): CaptchaComponentIntl;
```

Defined in: [libs/ui/src/components/captcha/CaptchaComponentIntl.ts:36](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/captcha/CaptchaComponentIntl.ts#L36)

Constructs a new instance of the `CaptchaComponentIntl` class.

#### Returns

`CaptchaComponentIntl`

## Accessors

### changes

#### Get Signature

```ts
get changes(): Subject<void>;
```

Defined in: [libs/ui/src/components/captcha/CaptchaComponentIntl.ts:57](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/captcha/CaptchaComponentIntl.ts#L57)

Emits when any label changes.

##### Returns

`Subject`\<`void`\>

***

### invalidMessage

#### Get Signature

```ts
get invalidMessage(): string;
```

Defined in: [libs/ui/src/components/captcha/CaptchaComponentIntl.ts:111](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/captcha/CaptchaComponentIntl.ts#L111)

Message displayed when verification fails.

##### Returns

`string`

***

### label

#### Get Signature

```ts
get label(): string;
```

Defined in: [libs/ui/src/components/captcha/CaptchaComponentIntl.ts:66](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/captcha/CaptchaComponentIntl.ts#L66)

Optional label text displayed above the captcha.

##### Returns

`string`

***

### questionAdd

#### Get Signature

```ts
get questionAdd(): string;
```

Defined in: [libs/ui/src/components/captcha/CaptchaComponentIntl.ts:75](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/captcha/CaptchaComponentIntl.ts#L75)

Question template text for addition.

##### Returns

`string`

***

### questionMultiply

#### Get Signature

```ts
get questionMultiply(): string;
```

Defined in: [libs/ui/src/components/captcha/CaptchaComponentIntl.ts:93](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/captcha/CaptchaComponentIntl.ts#L93)

Question template text for multiplication.

##### Returns

`string`

***

### questionSubtract

#### Get Signature

```ts
get questionSubtract(): string;
```

Defined in: [libs/ui/src/components/captcha/CaptchaComponentIntl.ts:84](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/captcha/CaptchaComponentIntl.ts#L84)

Question template text for subtraction.

##### Returns

`string`

***

### retryLabel

#### Get Signature

```ts
get retryLabel(): string;
```

Defined in: [libs/ui/src/components/captcha/CaptchaComponentIntl.ts:120](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/captcha/CaptchaComponentIntl.ts#L120)

Label for the retry action button.

##### Returns

`string`

***

### verifiedMessage

#### Get Signature

```ts
get verifiedMessage(): string;
```

Defined in: [libs/ui/src/components/captcha/CaptchaComponentIntl.ts:102](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/captcha/CaptchaComponentIntl.ts#L102)

Message displayed when verification succeeds.

##### Returns

`string`
