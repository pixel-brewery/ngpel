---
title: 'Interface: ICalendarDateNotBeforeValidationError'
generated: true
editUrl: false
---
# Interface: ICalendarDateNotBeforeValidationError

Defined in: [validators/ICalendarDateNotBeforeValidationError.ts:12](https://github.com/pixel-brewery/ngpel/blob/main/libs/forms/src/validators/ICalendarDateNotBeforeValidationError.ts#L12)

Validation error emitted when a calendar date precedes its minimum calendar day.

## Extends

- `ValidationError`

## Properties

### actualValue

```ts
readonly actualValue: Date;
```

Defined in: [validators/ICalendarDateNotBeforeValidationError.ts:18](https://github.com/pixel-brewery/ngpel/blob/main/libs/forms/src/validators/ICalendarDateNotBeforeValidationError.ts#L18)

The rejected field value.

***

### kind

```ts
readonly kind: "calendarDateNotBefore";
```

Defined in: [validators/ICalendarDateNotBeforeValidationError.ts:15](https://github.com/pixel-brewery/ngpel/blob/main/libs/forms/src/validators/ICalendarDateNotBeforeValidationError.ts#L15)

Identifies the kind of error.

#### Overrides

`ValidationError.kind`

***

### minDate

```ts
readonly minDate: Date;
```

Defined in: [validators/ICalendarDateNotBeforeValidationError.ts:21](https://github.com/pixel-brewery/ngpel/blob/main/libs/forms/src/validators/ICalendarDateNotBeforeValidationError.ts#L21)

The earliest accepted calendar date.
