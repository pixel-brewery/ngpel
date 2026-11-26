---
title: '@pixel-brewery/ngpel-ui'
description: 'The presentation layer: every component, directive and pipe the products share — AI surfaces, media tools, the collection view, the guided tour and the dashboard widget grid — plus a safe markdown pipeline. Mosaik and CodeMirror are optional peers.'
package: '@pixel-brewery/ngpel-ui'
category: 'UI'
order: 20
---

# @pixel-brewery/ngpel-ui

The presentation layer: every component, directive and pipe the products share — the AI surfaces, the media tools, the collection view, the guided tour and the dashboard widget grid — plus a safe markdown pipeline.

## Entry points

| Entry point                               | Public symbols | Peer dependencies                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| ----------------------------------------- | -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `@pixel-brewery/ngpel-ui`                 | 374            | `@angular/core`, `@angular/common`, `@angular/forms`, `@angular/router`, `@angular/cdk`, `@angular/platform-browser`, `@pixel-brewery/mosaik-elements`, `@pixel-brewery/mosaik-elements-angular`, `@pixel-brewery/mosaik-elements-foundation`, `@codemirror/autocomplete`, `@codemirror/commands`, `@codemirror/lang-html`, `@codemirror/lang-markdown`, `@codemirror/language`, `@codemirror/search`, `@codemirror/state`, `@codemirror/view`, `@lezer/highlight` |
| `@pixel-brewery/ngpel-ui/context-overlay` | 2              | `@angular/core`, `@pixel-brewery/mosaik-elements-angular`                                                                                                                                                                                                                                                                                                                                                                                                          |
| `@pixel-brewery/ngpel-ui/markdown`        | 9              | `marked`, `@pixel-brewery/markdowner-core`                                                                                                                                                                                                                                                                                                                                                                                                                         |
| `@pixel-brewery/ngpel-ui/google-maps`     | 8              | `@angular/core`, `@angular/common`, `@angular/google-maps`, `@googlemaps/markerclusterer`, `@pixel-brewery/mosaik-elements-angular`, `rxjs`                                                                                                                                                                                                                                                                                                                        |
| `@pixel-brewery/ngpel-ui/widget`          | 53             | `@angular/core`, `@angular/common`, `@angular/cdk`, `rxjs`, `@pixel-brewery/mosaik-elements-angular`, `@pixel-brewery/mosaik-elements-foundation`                                                                                                                                                                                                                                                                                                                  |

Every entry point is tree-shakable on its own: importing one never pulls the code of another.

## Quick start

```typescript
import { Component } from '@angular/core';
import { BytesPipe, InitialsPipe, PseudoLinkDirective } from '@pixel-brewery/ngpel-ui';

@Component({
    selector: 'app-file-row',
    imports: [BytesPipe, InitialsPipe, PseudoLinkDirective],
    template: `
        <span>{{ file.owner | ngpInitials }}</span>
        <span [ngpPseudoLink]="file.url">{{ file.name }}</span>
        <span>{{ file.size | ngpBytes }}</span>
    `,
})
export class FileRowComponent {}
```

## What stays in the application

Theme tokens, translation catalogues, product-specific layouts and domain views stay in the application. For Mosaik controls, use Mosaik Angular and Foundation 0.1.208 or later and import the providers from their Angular component entry points, for example `provideCalendarIntl` from `@pixel-brewery/mosaik-elements-angular/components/calendar`. Import Signal Forms validators and status classes from `@pixel-brewery/mosaik-elements-angular`. Import the providers for ngPEL components from ngPEL. Mosaik and CodeMirror are optional peers: install them only for the components that render through them.

## Migrating to Mosaik controls

- Import the Section, Compound, Dynamic Form, Condition Group and File families from `@pixel-brewery/mosaik-elements-angular`. Use their `mosaik-*` selectors. Import their schema types, constants and file preview functions from `@pixel-brewery/mosaik-elements-foundation`.
- Compose the compound editor with `mosaik-compound-item` children. Use `mosaik-data-compound` for a collection with registered item templates. Use the published shadow parts for styling and automation. Use a vertical `mosaik-divider` in place of `ngp-leading-line`.
- Compose `mosaik-files` with keyed `mosaik-file` children and put each `mosaik-file-source` in the `sources` slot. File actions expose the file key as `$event.key`; selected and rejected source events expose `$event.files`.
- Bind Dynamic Form with `[definition]`, `[value]` and `(valueChanged)`. Read `valid` and `canSubmit` as booleans on the native element. Provide initial answers in the model if the caller needs them before the first edit. Use the field template API when a field needs a custom editor.
- Condition Group reports `(removeGroupRequested)` for removal. `FilePreviewPipe` remains available from ngPEL for converting browser files into thumbnail previews with automatic object URL cleanup. `resolveDynamicFormLayoutClasses` remains available for caller-owned Tailwind layouts.

## API reference

The generated reference lives under [api/](./api/) and is rebuilt with `yarn nx run ui:docs`.
