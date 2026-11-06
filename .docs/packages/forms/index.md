---
title: '@pixel-brewery/ngpel-forms'
description: 'Signal Forms validators, async validator helpers, the shared status-class map and the password-strength service.'
package: '@pixel-brewery/ngpel-forms'
category: 'Presentation'
order: 10
---

# @pixel-brewery/ngpel-forms

Signal Forms validators, the async validator helpers, the status-class map all three products duplicated, and the password-strength service.

## Entry points

| Entry point                  | Public symbols | Peer dependencies                 |
| ---------------------------- | -------------- | --------------------------------- |
| `@pixel-brewery/ngpel-forms` | 69             | `@angular/core`, `@angular/forms` |

Every entry point is tree-shakable on its own: importing one never pulls the code of another.

## Quick start

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

## What stays in the application

Locale-specific catalogues such as academic titles, and any validator bound to a product domain, stay in the application.

## API reference

The generated reference lives under [api/](./api/) and is rebuilt with `yarn nx run forms:docs`.
