---
title: 'Class: AgreementGateComponent'
generated: true
editUrl: false
---
# Class: AgreementGateComponent

Defined in: [libs/ui/src/components/agreement-gate/AgreementGateComponent.ts:70](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/agreement-gate/AgreementGateComponent.ts#L70)

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

Defined in: [libs/ui/src/components/agreement-gate/AgreementGateComponent.ts:80](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/agreement-gate/AgreementGateComponent.ts#L80)

***

### actionLabel

```ts
readonly actionLabel: InputSignal<string>;
```

Defined in: [libs/ui/src/components/agreement-gate/AgreementGateComponent.ts:77](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/agreement-gate/AgreementGateComponent.ts#L77)

***

### description

```ts
readonly description: InputSignal<string>;
```

Defined in: [libs/ui/src/components/agreement-gate/AgreementGateComponent.ts:74](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/agreement-gate/AgreementGateComponent.ts#L74)

***

### errorText

```ts
readonly errorText: InputSignal<string | null>;
```

Defined in: [libs/ui/src/components/agreement-gate/AgreementGateComponent.ts:79](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/agreement-gate/AgreementGateComponent.ts#L79)

***

### isBusy

```ts
readonly isBusy: InputSignal<boolean>;
```

Defined in: [libs/ui/src/components/agreement-gate/AgreementGateComponent.ts:78](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/agreement-gate/AgreementGateComponent.ts#L78)

***

### linkLabel

```ts
readonly linkLabel: InputSignal<string>;
```

Defined in: [libs/ui/src/components/agreement-gate/AgreementGateComponent.ts:76](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/agreement-gate/AgreementGateComponent.ts#L76)

***

### safeUrl

```ts
protected readonly safeUrl: Signal<string | undefined>;
```

Defined in: [libs/ui/src/components/agreement-gate/AgreementGateComponent.ts:82](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/agreement-gate/AgreementGateComponent.ts#L82)

***

### title

```ts
readonly title: InputSignal<string>;
```

Defined in: [libs/ui/src/components/agreement-gate/AgreementGateComponent.ts:73](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/agreement-gate/AgreementGateComponent.ts#L73)

***

### url

```ts
readonly url: InputSignal<string>;
```

Defined in: [libs/ui/src/components/agreement-gate/AgreementGateComponent.ts:75](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/agreement-gate/AgreementGateComponent.ts#L75)

## Methods

### requestAcceptance()

```ts
requestAcceptance(): void;
```

Defined in: [libs/ui/src/components/agreement-gate/AgreementGateComponent.ts:104](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/agreement-gate/AgreementGateComponent.ts#L104)

Emits an explicit acceptance request while idle; the host remains responsible for saving it.

#### Returns

`void`
