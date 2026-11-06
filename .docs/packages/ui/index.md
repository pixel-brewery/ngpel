---
title: '@pixel-brewery/ngpel-ui'
description: 'The presentation layer: every component, directive and pipe the products share — AI surfaces, media and file components, the collection view, the guided tour and the dashboard widget grid — plus a safe markdown pipeline. Mosaik and CodeMirror are optional peers.'
package: '@pixel-brewery/ngpel-ui'
category: 'UI'
order: 20
---

# @pixel-brewery/ngpel-ui

The presentation layer: every component, directive and pipe the products share — the AI surfaces, the media and file components, the collection view, the guided tour and the dashboard widget grid — plus a safe markdown pipeline.

## Entry points

| Entry point                        | Public symbols | Peer dependencies                                                                                                                                                                                                                                                                                                                                                                                                                |
| ---------------------------------- | -------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `@pixel-brewery/ngpel-ui`          | 399            | `@angular/core`, `@angular/common`, `@angular/forms`, `@angular/router`, `@angular/cdk`, `@angular/platform-browser`, `@pixel-brewery/mosaik-elements-angular`, `@pixel-brewery/mosaik-elements-foundation`, `@codemirror/autocomplete`, `@codemirror/commands`, `@codemirror/lang-html`, `@codemirror/lang-markdown`, `@codemirror/language`, `@codemirror/search`, `@codemirror/state`, `@codemirror/view`, `@lezer/highlight` |
| `@pixel-brewery/ngpel-ui/markdown` | 9              | `marked`, `@pixel-brewery/markdowner-core`                                                                                                                                                                                                                                                                                                                                                                                       |
| `@pixel-brewery/ngpel-ui/widget`   | 50             | `@angular/core`, `@angular/common`, `@angular/cdk`, `rxjs`, `@pixel-brewery/mosaik-elements-angular`, `@pixel-brewery/mosaik-elements-foundation`                                                                                                                                                                                                                                                                                |

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

Theme tokens, the translation catalogue behind the `provide*Intl()` providers, product-specific layouts and every domain view stay in the application. Mosaik and CodeMirror are optional peers: install them only for the components that render through them.

## API reference

The generated reference lives under [api/](./api/) and is rebuilt with `yarn nx run ui:docs`.
