---
title: 'Variable: NG\_STATUS\_CLASSES'
generated: true
editUrl: false
---
# Variable: NG\_STATUS\_CLASSES

```ts
const NG_STATUS_CLASSES: Readonly<NonNullable<SignalFormsConfig["classes"]>>;
```

Defined in: [status-classes/NG\_STATUS\_CLASSES.ts:14](https://github.com/pixel-brewery/ngpel/blob/main/libs/forms/src/status-classes/NG_STATUS_CLASSES.ts#L14)

The classic Angular status classes (`ng-touched`, `ng-dirty`, `ng-valid`, ...) expressed as Signal
Forms class predicates, so stylesheets written for reactive forms keep working:
`provideSignalFormsConfig({ classes: NG_STATUS_CLASSES })`.
