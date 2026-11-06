---
title: 'Class: ValueMagnitudeDirective'
generated: true
editUrl: false
---
# Class: ValueMagnitudeDirective

Defined in: [libs/ui/src/directives/value-magnitude/ValueMagnitudeDirective.ts:18](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/directives/value-magnitude/ValueMagnitudeDirective.ts#L18)

Scales a Mosaik text element by the magnitude of a numeric value.

## Constructors

### Constructor

```ts
new ValueMagnitudeDirective(): ValueMagnitudeDirective;
```

#### Returns

`ValueMagnitudeDirective`

## Properties

### ngpValueMagnitude

```ts
ngpValueMagnitude: number = 0;
```

Defined in: [libs/ui/src/directives/value-magnitude/ValueMagnitudeDirective.ts:38](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/directives/value-magnitude/ValueMagnitudeDirective.ts#L38)

Numeric value whose absolute magnitude determines the text size.

## Accessors

### fontSize

#### Get Signature

```ts
get protected fontSize(): string;
```

Defined in: [libs/ui/src/directives/value-magnitude/ValueMagnitudeDirective.ts:46](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/directives/value-magnitude/ValueMagnitudeDirective.ts#L46)

Bounded font size applied through the Mosaik text custom property.

##### Returns

`string`
