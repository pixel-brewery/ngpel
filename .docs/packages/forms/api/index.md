---
title: '@pixel-brewery/ngpel-forms'
generated: true
editUrl: false
---
# @pixel-brewery/ngpel-forms

## Classes

| Class | Description |
| ------ | ------ |
| [PasswordStrengthService](Class.PasswordStrengthService) | Evaluates password strength against a configurable, regular-expression based policy. Register it with [providePasswordStrength](Function.providePasswordStrength) or construct it directly for use without dependency injection. |

## Interfaces

| Interface | Description |
| ------ | ------ |
| [IAllowedValueValidationError](Interface.IAllowedValueValidationError) | Validation error emitted when a value is not part of the allowed set. |
| [IAsyncSignalValidatorOptions](Interface.IAsyncSignalValidatorOptions) | Options of [useAsyncValidator](Function.useAsyncValidator): the validated path, how to derive request parameters from the field value, the resource factory performing the check, and how results and failures map to validation errors. |
| [IAsyncSignalValidatorWithDebounceOptions](Interface.IAsyncSignalValidatorWithDebounceOptions) | Options of [useAsyncValidatorWithDebounce](Function.useAsyncValidatorWithDebounce): the async validator options plus an optional debounce applied to the validated path before the validator is registered. |
| [IBicValidationError](Interface.IBicValidationError) | Validation error emitted for an invalid ISO 9362 Business Identifier Code. |
| [ICalendarDateNotBeforeValidationError](Interface.ICalendarDateNotBeforeValidationError) | Validation error emitted when a calendar date precedes its minimum calendar day. |
| [ICountryCodeValidationError](Interface.ICountryCodeValidationError) | Validation error emitted for an invalid ISO 3166-1 alpha-2 country code. |
| [ICurrencyCodeValidationError](Interface.ICurrencyCodeValidationError) | Validation error emitted for an invalid ISO 4217 alphabetic currency code. |
| [IDateAfterValidationError](Interface.IDateAfterValidationError) | Validation error emitted when a date is not strictly after its exclusive lower bound. |
| [IEmailAddressValidationError](Interface.IEmailAddressValidationError) | Validation error emitted for an invalid email address. |
| [IEqualToValidationError](Interface.IEqualToValidationError) | Validation error emitted when a value differs from its expected value. |
| [IFiniteValidationError](Interface.IFiniteValidationError) | Validation error emitted for a number that is `NaN` or infinite. |
| [IHexColorValidationError](Interface.IHexColorValidationError) | Validation error emitted for an invalid six-digit hexadecimal color. |
| [IHostnameValidationError](Interface.IHostnameValidationError) | Validation error emitted for a string that is not a fully qualified hostname. |
| [IHttpsUrlValidationError](Interface.IHttpsUrlValidationError) | Validation error emitted for a string that is not an absolute HTTPS URL. |
| [IHttpUrlValidationError](Interface.IHttpUrlValidationError) | Validation error emitted for a string that is not an absolute HTTP or HTTPS URL. |
| [IIbanValidationError](Interface.IIbanValidationError) | Validation error emitted for a structurally invalid IBAN or a failed IBAN checksum. |
| [ILanguageRegionCodeValidationError](Interface.ILanguageRegionCodeValidationError) | Validation error emitted for an invalid language-region code such as `de-DE`. |
| [IMaxDecimalPlacesValidationError](Interface.IMaxDecimalPlacesValidationError) | Validation error emitted when a number carries more decimal places than allowed. |
| [INonBlankValidationError](Interface.INonBlankValidationError) | Validation error emitted when a string contains no non-whitespace character. The kind aliases Angular's built-in `required` error so existing error slots match. |
| [IPasswordStrengthConfig](Interface.IPasswordStrengthConfig) | Password strength policy: an optional minimum length, weighted regular-expression rules and the thresholds mapping the normalized score to a [PasswordScore](Variable.PasswordScore). The policy is plain data owned by the application; the library ships no default. |
| [IPasswordStrengthRule](Interface.IPasswordStrengthRule) | One regular-expression rule contributing to the password strength score. |
| [IPasswordStrengthThresholds](Interface.IPasswordStrengthThresholds) | Lower bounds of the normalized score (`0..1`) for each strength level above `Blank`. A score reaching `veryStrong` maps to `VeryStrong`, a score reaching `strong` to `Strong`, and so on; anything below `weak` is `VeryWeak`. |
| [IPortValidationError](Interface.IPortValidationError) | Validation error emitted for a string that is not a TCP port number between 1 and 65535. |
| [ISafeIntegerValidationError](Interface.ISafeIntegerValidationError) | Validation error emitted for a number that is not a safe integer. |
| [ISafeScaledIntegerValidationError](Interface.ISafeScaledIntegerValidationError) | Validation error emitted when a number leaves JavaScript's safe-integer range once multiplied by its scale factor. |
| [ISingleLineValidationError](Interface.ISingleLineValidationError) | Validation error emitted when text contains control characters or Unicode line or paragraph separators. |
| [ITrimmedMinLengthValidationError](Interface.ITrimmedMinLengthValidationError) | Validation error emitted when trimmed text is shorter than its minimum length. The kind aliases Angular's built-in `minLength` error so existing error slots match. |
| [IUuidValidationError](Interface.IUuidValidationError) | Validation error emitted for a string that is not a canonical RFC 9562 UUID. |
| [IValidDateValidationError](Interface.IValidDateValidationError) | Validation error emitted for a value that is not a `Date` with a valid timestamp. |

## Type Aliases

| Type Alias | Description |
| ------ | ------ |
| [CalendarDateReference](TypeAlias.CalendarDateReference) | Static or context-dependent minimum calendar date accepted by [calendarDateNotBefore](Function.calendarDateNotBefore). `null` disables the bound. |
| [DateReference](TypeAlias.DateReference) | Static or context-dependent exclusive lower bound accepted by [dateAfter](Function.dateAfter). `null` disables the bound. |
| [EqualToReference](TypeAlias.EqualToReference) | Static or context-dependent expected value accepted by [equalTo](Function.equalTo). |
| [PasswordScore](TypeAlias.PasswordScore) | Union of the strength level names: `'Blank' | 'VeryWeak' | 'Weak' | 'Medium' | 'Strong' | 'VeryStrong'`. |
| [SignalValidatorConfig](TypeAlias.SignalValidatorConfig) | Shared configuration accepted by every ngpel Signal Forms validator: an optional message or a custom error (mutually exclusive) plus an optional activation condition. Messages and errors may be static values or `LogicFn`s evaluated against the field context, which is where a product plugs in its translation service. |

## Variables

| Variable | Description |
| ------ | ------ |
| [NG\_STATUS\_CLASSES](Variable.NG_STATUS_CLASSES) | The classic Angular status classes (`ng-touched`, `ng-dirty`, `ng-valid`, ...) expressed as Signal Forms class predicates, so stylesheets written for reactive forms keep working: `provideSignalFormsConfig({ classes: NG_STATUS_CLASSES })`. |
| [PasswordScore](Variable.PasswordScore) | Discrete password strength levels, ordered from weakest to strongest. |

## Functions

| Function | Description |
| ------ | ------ |
| [allowedValue](Function.allowedValue) | Requires a value to be part of an allowed set (`Array.prototype.includes` semantics). |
| [bic](Function.bic) | Validates an optional ISO 9362 Business Identifier Code of eight or eleven characters. Empty strings pass so the validator composes with `required`. |
| [calendarDateNotBefore](Function.calendarDateNotBefore) | Requires a present valid `Date` to fall on or after a minimum calendar day. Times are deliberately ignored because form dates represent business calendar days rather than instants; the comparison uses the local calendar day of both values. Invalid dates are left to `validDate`; `null` values and a `null` bound pass. |
| [countryCode](Function.countryCode) | Validates the shape of an optional ISO 3166-1 alpha-2 country code (two letters, no country table). Empty strings pass so the validator composes with `required`. |
| [currencyCode](Function.currencyCode) | Validates the shape of an optional ISO 4217 alphabetic currency code (three letters, no currency table). Empty strings pass so the validator composes with `required`. |
| [dateAfter](Function.dateAfter) | Requires a present valid `Date` to be strictly after an exclusive lower bound, compared as instants. Invalid dates are left to `validDate`; `null` values and a `null` bound pass. |
| [emailAddress](Function.emailAddress) | Validates an optional email address with a qualified domain using the framework-free `isEmailAddress` predicate of `@pixel-brewery/ngpel-core`, so pipes and validators agree on one definition. Empty strings pass so the validator composes with `required`. |
| [equalTo](Function.equalTo) | Requires a value to equal a static or context-dependent reference value, compared with `Object.is` (so `NaN` equals `NaN` and `+0` differs from `-0`). Typical use: a password confirmation field resolving the reference through `context.valueOf(schema.password)`. |
| [finite](Function.finite) | Requires a present numeric value to be finite (`NaN` and infinities are rejected). `null` passes so the validator composes with `required`. |
| [hexColor](Function.hexColor) | Validates an optional six-digit hexadecimal color including its leading hash; surrounding whitespace is ignored. Empty strings pass so the validator composes with `required`. |
| [hostname](Function.hostname) | Validates that an optional string is a fully qualified hostname per RFC 5321 (single-label names such as `localhost` are rejected). Empty strings pass so the validator composes with `required`. |
| [httpsUrl](Function.httpsUrl) | Validates that an optional string is an absolute HTTPS URL; plain HTTP is rejected. Empty strings pass so the validator composes with `required`. |
| [httpUrl](Function.httpUrl) | Validates that an optional string is an absolute HTTP or HTTPS URL with a hostname, as parsed by the WHATWG `URL` constructor; surrounding whitespace is ignored. Empty strings pass so the validator composes with `required`. |
| [iban](Function.iban) | Validates that an optional string is an IBAN with a known country code, the registered length for that country and a valid ISO 7064 mod-97 checksum. Whitespace and casing are ignored. Empty strings pass so the validator composes with `required`. |
| [isLanguageRegionCode](Function.isLanguageRegionCode) | Determines whether text is a normalized language-region code such as `de-DE` (lower-case language, upper-case region). Surrounding whitespace is ignored. |
| [languageRegionCode](Function.languageRegionCode) | Validates an optional normalized language-region code such as `de-DE`. Empty strings pass so the validator composes with `required`. |
| [maxDecimalPlaces](Function.maxDecimalPlaces) | Validates the maximum decimal precision of a present finite number. Non-finite numbers and `null` pass so the validator composes with `finite` and `required`. |
| [nonBlank](Function.nonBlank) | Requires a string to contain at least one non-whitespace character. Unlike the other text validators an empty string fails; the error kind is `required` so it fills the same error slot as Angular's built-in validator. |
| [port](Function.port) | Validates that an optional string is an integral TCP port number from 1 to 65535. Empty strings pass so the validator composes with `required`. |
| [providePasswordStrength](Function.providePasswordStrength) | Registers a [PasswordStrengthService](Class.PasswordStrengthService) configured with the application's password policy. |
| [resolveSignalValidatorError](Function.resolveSignalValidatorError) | Produces the validation result of a failed validator: the configured custom `error` when one is present, otherwise the validator's default error built by `createError` with the resolved `message`. Product validators built on [SignalValidatorConfig](TypeAlias.SignalValidatorConfig) share this tail. |
| [resolveSignalValidatorOption](Function.resolveSignalValidatorOption) | Resolves a validator option that is either a static value or a `LogicFn` evaluated against the field context. |
| [safeInteger](Function.safeInteger) | Requires a present numeric value to be a safe integer (`Number.isSafeInteger`). `null` passes so the validator composes with `required`. |
| [safeScaledInteger](Function.safeScaledInteger) | Requires a present numeric value to remain a safe integer after multiplication by a fixed scale factor (for example `100` for amounts stored in cents). Decimal precision is validated separately by `maxDecimalPlaces`; `null` passes so the validator composes with `required`. |
| [shouldApplySignalValidator](Function.shouldApplySignalValidator) | Determines whether a validator applies to the current field state by evaluating the optional `when` condition of its configuration. Validators without a condition always apply. |
| [singleLine](Function.singleLine) | Validates that optional text can be represented on one line: control characters and Unicode line or paragraph separators are rejected. Empty strings pass so the validator composes with `required`. |
| [trimmedMinLength](Function.trimmedMinLength) | Validates the minimum length of a string after removing surrounding whitespace. Empty strings pass so the validator composes with `required`; the error kind is `minLength` so it fills the same error slot as Angular's built-in validator. |
| [useAsyncValidator](Function.useAsyncValidator) | Registers an asynchronous Signal Forms validator that checks a field through a resource factory (typically an HTTP lookup) and maps the result to validation errors. Rejections report no error unless `onError` is configured. |
| [useAsyncValidatorWithDebounce](Function.useAsyncValidatorWithDebounce) | Registers an asynchronous Signal Forms validator and, when a duration or debouncer is configured, debounces the validated path first so the resource is not created on every keystroke. |
| [uuid](Function.uuid) | Validates an optional RFC 9562 UUID in canonical textual form (versions 1 to 8). Empty strings pass so the validator composes with `required`. |
| [validDate](Function.validDate) | Requires a present value to be a `Date` with a valid timestamp; invalid dates and non-date runtime values are rejected. `null` passes so the validator composes with `required`. |
