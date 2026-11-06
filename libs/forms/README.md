# @pixel-brewery/ngpel-forms

Signal Forms validators, the async validator helpers, the status-class map all three products duplicated, and the password-strength service.

## Features

- **Validators** — IBAN with a mod-97 check and a country-length table, BIC, email, hostname, HTTP and HTTPS URLs, UUID, hex colour, country, currency and language-region codes, ports, safe integers, decimal places, dates and cross-field comparisons.
- **Dynamic and trimmed values** — `allowedValue` accepts a static list or a resolver that reads other fields or signals; `trimmedMinLength` and `trimmedMaxLength` ignore surrounding whitespace.
- **Typed errors** — every validator ships its own `I*ValidationError` shape, so a template can react to the specific failure rather than a boolean.
- **Async helpers** — `useAsyncValidator` and its debounced variant, both honouring the shared `when` option.
- **Status classes** — `NG_STATUS_CLASSES` wires `provideSignalFormsConfig` in one line.
- **Password strength** — a configurable rule set with thresholds and a score signal.

## Import Options

```typescript
// @pixel-brewery/ngpel-forms — 69 exports
import { allowedValue, bic, calendarDateNotBefore, CalendarDateReference, countryCode, currencyCode /* … */ } from '@pixel-brewery/ngpel-forms';
```

## Peer Dependencies

| Package                     | Range              |
| --------------------------- | ------------------ |
| `@angular/core`             | `>=22.0.0 <23.0.0` |
| `@angular/forms`            | `>=22.0.0 <23.0.0` |
| `@pixel-brewery/ngpel-core` | `0.0.3`            |

## Quick Start

```typescript
import { form, schema } from '@angular/forms/signals';
import { emailAddress, iban, NG_STATUS_CLASSES, trimmedMinLength } from '@pixel-brewery/ngpel-forms';

const paymentSchema = schema<IPayment>((path) => {
    emailAddress(path.email);
    iban(path.iban);
    trimmedMinLength(path.reference, 3);
});

// Once, in the application configuration:
provideSignalFormsConfig({ classes: NG_STATUS_CLASSES });
```

## Layer

Layer 1 — depends on `@pixel-brewery/ngpel-core`. A package imports only packages of a strictly lower layer.

## What stays in the application

Locale-specific catalogues such as academic titles, and any validator bound to a product domain, stay in the application.
