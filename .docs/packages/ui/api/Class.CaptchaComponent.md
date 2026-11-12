---
title: 'Class: CaptchaComponent'
generated: true
editUrl: false
---
# Class: CaptchaComponent

Defined in: [libs/ui/src/components/captcha/CaptchaComponent.ts:108](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/captcha/CaptchaComponent.ts#L108)

Captcha component rendering a generated question with three answer options.

## Implements

- `OnInit`
- `ControlValueAccessor`

## Constructors

### Constructor

```ts
new CaptchaComponent(): CaptchaComponent;
```

Defined in: [libs/ui/src/components/captcha/CaptchaComponent.ts:129](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/captcha/CaptchaComponent.ts#L129)

Constructs a new instance of the `CaptchaComponent` class.

#### Returns

`CaptchaComponent`

## Properties

### challengeChange

```ts
readonly challengeChange: OutputEmitterRef<ICaptchaChallenge>;
```

Defined in: [libs/ui/src/components/captcha/CaptchaComponent.ts:167](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/captcha/CaptchaComponent.ts#L167)

Emitted when a new challenge is generated.

***

### disabled

```ts
readonly disabled: InputSignal<boolean>;
```

Defined in: [libs/ui/src/components/captcha/CaptchaComponent.ts:207](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/captcha/CaptchaComponent.ts#L207)

Disables answer selection.

***

### id

```ts
readonly id: InputSignal<string | null>;
```

Defined in: [libs/ui/src/components/captcha/CaptchaComponent.ts:191](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/captcha/CaptchaComponent.ts#L191)

Unique identifier for the component.

***

### invalidEvent

```ts
readonly invalidEvent: OutputEmitterRef<ICaptchaInvalidEvent>;
```

Defined in: [libs/ui/src/components/captcha/CaptchaComponent.ts:156](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/captcha/CaptchaComponent.ts#L156)

Emitted when verification fails.

***

### label

```ts
readonly label: InputSignal<string>;
```

Defined in: [libs/ui/src/components/captcha/CaptchaComponent.ts:199](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/captcha/CaptchaComponent.ts#L199)

Optional label text displayed above the captcha.

***

### maxValue

```ts
readonly maxValue: InputSignal<number>;
```

Defined in: [libs/ui/src/components/captcha/CaptchaComponent.ts:231](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/captcha/CaptchaComponent.ts#L231)

Maximum number for challenge operands.

***

### minValue

```ts
readonly minValue: InputSignal<number>;
```

Defined in: [libs/ui/src/components/captcha/CaptchaComponent.ts:223](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/captcha/CaptchaComponent.ts#L223)

Minimum number for challenge operands.

***

### operators

```ts
readonly operators: InputSignal<readonly CaptchaOperator[]>;
```

Defined in: [libs/ui/src/components/captcha/CaptchaComponent.ts:239](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/captcha/CaptchaComponent.ts#L239)

Operators to use for challenges.

***

### readonly

```ts
readonly readonly: InputSignal<boolean>;
```

Defined in: [libs/ui/src/components/captcha/CaptchaComponent.ts:215](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/captcha/CaptchaComponent.ts#L215)

Marks control as readonly.

***

### resolvedId

```ts
protected readonly resolvedId: Signal<string>;
```

Defined in: [libs/ui/src/components/captcha/CaptchaComponent.ts:247](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/captcha/CaptchaComponent.ts#L247)

Resolved unique identifier.

***

### retryEvent

```ts
readonly retryEvent: OutputEmitterRef<void>;
```

Defined in: [libs/ui/src/components/captcha/CaptchaComponent.ts:159](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/captcha/CaptchaComponent.ts#L159)

Emitted after the user requests a fresh security question.

***

### value

```ts
readonly value: ModelSignal<number | null>;
```

Defined in: [libs/ui/src/components/captcha/CaptchaComponent.ts:183](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/captcha/CaptchaComponent.ts#L183)

Selected answer value for Signal Forms integration.

***

### verifiedChange

```ts
readonly verifiedChange: OutputEmitterRef<boolean>;
```

Defined in: [libs/ui/src/components/captcha/CaptchaComponent.ts:175](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/captcha/CaptchaComponent.ts#L175)

Emitted when verified state changes.

***

### verifiedEvent

```ts
readonly verifiedEvent: OutputEmitterRef<ICaptchaVerifiedEvent>;
```

Defined in: [libs/ui/src/components/captcha/CaptchaComponent.ts:148](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/captcha/CaptchaComponent.ts#L148)

Emitted when verification succeeds.

## Accessors

### challenge

#### Get Signature

```ts
get challenge(): ICaptchaChallenge | null;
```

Defined in: [libs/ui/src/components/captcha/CaptchaComponent.ts:258](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/captcha/CaptchaComponent.ts#L258)

Current captcha challenge.

##### Returns

[`ICaptchaChallenge`](Interface.ICaptchaChallenge) \| `null`

***

### intl

#### Get Signature

```ts
get intl(): CaptchaComponentIntl;
```

Defined in: [libs/ui/src/components/captcha/CaptchaComponent.ts:298](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/captcha/CaptchaComponent.ts#L298)

Internationalization labels used by the captcha.

##### Returns

[`CaptchaComponentIntl`](Class.CaptchaComponentIntl)

***

### isInvalidAnswer

#### Get Signature

```ts
get isInvalidAnswer(): boolean;
```

Defined in: [libs/ui/src/components/captcha/CaptchaComponent.ts:288](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/captcha/CaptchaComponent.ts#L288)

Indicates whether the last answer was invalid.

##### Returns

`boolean`

***

### state

#### Get Signature

```ts
get state(): CaptchaState;
```

Defined in: [libs/ui/src/components/captcha/CaptchaComponent.ts:268](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/captcha/CaptchaComponent.ts#L268)

Current component state.

##### Returns

[`CaptchaState`](TypeAlias.CaptchaState)

***

### verified

#### Get Signature

```ts
get verified(): boolean;
```

Defined in: [libs/ui/src/components/captcha/CaptchaComponent.ts:278](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/captcha/CaptchaComponent.ts#L278)

Indicates whether the captcha has been verified.

##### Returns

`boolean`

## Methods

### registerOnChange()

```ts
registerOnChange(fn): void;
```

Defined in: [libs/ui/src/components/captcha/CaptchaComponent.ts:467](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/captcha/CaptchaComponent.ts#L467)

Registers a callback for value changes.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `fn` | (`value`) => `void` | The callback function. |

#### Returns

`void`

#### Implementation of

`ControlValueAccessor.registerOnChange`

***

### registerOnTouched()

```ts
registerOnTouched(fn): void;
```

Defined in: [libs/ui/src/components/captcha/CaptchaComponent.ts:477](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/captcha/CaptchaComponent.ts#L477)

Registers a callback for touch events.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `fn` | () => `void` | The callback function. |

#### Returns

`void`

#### Implementation of

`ControlValueAccessor.registerOnTouched`

***

### retry()

```ts
retry(): void;
```

Defined in: [libs/ui/src/components/captcha/CaptchaComponent.ts:350](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/captcha/CaptchaComponent.ts#L350)

Generates a new challenge and resets the state.

#### Returns

`void`

***

### validate()

```ts
validate(answer): void;
```

Defined in: [libs/ui/src/components/captcha/CaptchaComponent.ts:312](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/captcha/CaptchaComponent.ts#L312)

Validates selected answer and emits result.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `answer` | `number` | Selected answer option. |

#### Returns

`void`

***

### writeValue()

```ts
writeValue(value): void;
```

Defined in: [libs/ui/src/components/captcha/CaptchaComponent.ts:452](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/captcha/CaptchaComponent.ts#L452)

Writes a new value from the form model.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `value` | `number` \| `null` | The value to write. |

#### Returns

`void`

#### Implementation of

`ControlValueAccessor.writeValue`
