---
title: 'Class: AgreementGateComponent'
generated: true
editUrl: false
---
# Class: AgreementGateComponent

Defined in: [libs/ui/src/components/agreement-gate/AgreementGateComponent.ts:61](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/agreement-gate/AgreementGateComponent.ts#L61)

Requests an explicit agreement without owning its content, persistence or protected action.

## Constructors

### Constructor

```ts
new AgreementGateComponent(): AgreementGateComponent;
```

#### Returns

`AgreementGateComponent`

## Properties

### accepted

```ts
readonly accepted: OutputEmitterRef<void>;
```

Defined in: [libs/ui/src/components/agreement-gate/AgreementGateComponent.ts:71](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/agreement-gate/AgreementGateComponent.ts#L71)

***

### actionLabel

```ts
readonly actionLabel: InputSignal<string>;
```

Defined in: [libs/ui/src/components/agreement-gate/AgreementGateComponent.ts:68](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/agreement-gate/AgreementGateComponent.ts#L68)

***

### description

```ts
readonly description: InputSignal<string>;
```

Defined in: [libs/ui/src/components/agreement-gate/AgreementGateComponent.ts:65](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/agreement-gate/AgreementGateComponent.ts#L65)

***

### errorText

```ts
readonly errorText: InputSignal<string | null>;
```

Defined in: [libs/ui/src/components/agreement-gate/AgreementGateComponent.ts:70](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/agreement-gate/AgreementGateComponent.ts#L70)

***

### isBusy

```ts
readonly isBusy: InputSignal<boolean>;
```

Defined in: [libs/ui/src/components/agreement-gate/AgreementGateComponent.ts:69](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/agreement-gate/AgreementGateComponent.ts#L69)

***

### linkLabel

```ts
readonly linkLabel: InputSignal<string>;
```

Defined in: [libs/ui/src/components/agreement-gate/AgreementGateComponent.ts:67](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/agreement-gate/AgreementGateComponent.ts#L67)

***

### safeUrl

```ts
protected readonly safeUrl: Signal<string | undefined>;
```

Defined in: [libs/ui/src/components/agreement-gate/AgreementGateComponent.ts:73](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/agreement-gate/AgreementGateComponent.ts#L73)

***

### title

```ts
readonly title: InputSignal<string>;
```

Defined in: [libs/ui/src/components/agreement-gate/AgreementGateComponent.ts:64](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/agreement-gate/AgreementGateComponent.ts#L64)

***

### url

```ts
readonly url: InputSignal<string>;
```

Defined in: [libs/ui/src/components/agreement-gate/AgreementGateComponent.ts:66](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/agreement-gate/AgreementGateComponent.ts#L66)

## Methods

### requestAcceptance()

```ts
requestAcceptance(): void;
```

Defined in: [libs/ui/src/components/agreement-gate/AgreementGateComponent.ts:95](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/agreement-gate/AgreementGateComponent.ts#L95)

Emits an explicit acceptance request while idle; the host remains responsible for saving it.

#### Returns

`void`
