# @pixel-brewery/ngpel-ui

The presentation layer: every component, directive and pipe the products share — the AI surfaces, the media and file components, the collection view, the guided tour and the dashboard widget grid — plus a safe markdown pipeline.

## Features

- **AI surfaces** — the AI beam that marks AI-produced content (one shared frame-rate-capped loop for the whole page), the AI rail with its choice, configuration and result sections, the AI presentation directive and the typewriter.
- **Voice and audio** — a live waveform, an activity orb, a signal-quality indicator, the session controls, the immersive session shell and the voice-recorder bridge onto the recorder of `ngpel-core`.
- **Collections** — a declarative collection view with table, flow, gallery and calendar variants, field definitions, the filter bar with named and optionally restored active filters, and CSV/Excel export.
- **Media and files** — file cards and lists, image crop, markup and preview, an image editor and the file-source picker.
- **Shell and navigation** — rails, sections, page toolbars, navigation menus, content navigation with an outline, the back-to-top control and the floating host.
- **Context drawers** — `provideContextDrawerTarget` binds a Mosaik drawer to a context target registered with `ngpel-router`.
- **Guided tour** — tour contributions, anchors and the `provideTour()` composition over the Mosaik tour overlay.
- **Display pipes and directives** — byte sizes, initials, truncation, hash colours, links, plus pseudo links, hover-reveal, event-propagation stops, infinite scroll, eye dropper and scroll-to-error.
- **Markdown** — a hardened pipeline over `marked` and `markdowner-core` that escapes ampersands first, drops raw HTML to text and rejects unsafe URL schemes.
- **Widgets** — the dashboard widget registry, the editable widget grid with drag and resize, and a framework-free layout algebra with a versioned codec.

## Import Options

```typescript
// @pixel-brewery/ngpel-ui — 399 exports
import { addAdvancedFilterNode, AdvancedFilterNode, AiAttention, AiBeamComponent, AiBeamDirective, AiBeamPalette /* … */ } from '@pixel-brewery/ngpel-ui';

// @pixel-brewery/ngpel-ui/markdown — 9 exports
import {
    createMarkdownExtensions,
    createMarkedRenderer,
    escapeMarkdownAttribute,
    escapeMarkdownText,
    IMarkdownRendererOptions,
    MarkdownRenderer /* … */,
} from '@pixel-brewery/ngpel-ui/markdown';

// @pixel-brewery/ngpel-ui/widget — 50 exports
import {
    collectWidgetZones,
    createDefaultWidgetGridLayout,
    IWidget,
    IWidgetData,
    IWidgetEditorCanvasZone,
    IWidgetGridItemDefinition /* … */,
} from '@pixel-brewery/ngpel-ui/widget';
```

## Peer Dependencies

| Package                                     | Range                           |
| ------------------------------------------- | ------------------------------- |
| `@angular/cdk`                              | `>=22.0.0 <23.0.0` _(optional)_ |
| `@angular/common`                           | `>=22.0.0 <23.0.0`              |
| `@angular/core`                             | `>=22.0.0 <23.0.0`              |
| `@angular/forms`                            | `>=22.0.0 <23.0.0`              |
| `@angular/platform-browser`                 | `>=22.0.0 <23.0.0`              |
| `@angular/router`                           | `>=22.0.0 <23.0.0`              |
| `@codemirror/autocomplete`                  | `>=6.0.0` _(optional)_          |
| `@codemirror/commands`                      | `>=6.0.0` _(optional)_          |
| `@codemirror/lang-html`                     | `>=6.0.0` _(optional)_          |
| `@codemirror/lang-markdown`                 | `>=6.0.0` _(optional)_          |
| `@codemirror/language`                      | `>=6.0.0` _(optional)_          |
| `@codemirror/search`                        | `>=6.0.0` _(optional)_          |
| `@codemirror/state`                         | `>=6.0.0` _(optional)_          |
| `@codemirror/view`                          | `>=6.0.0` _(optional)_          |
| `@lezer/highlight`                          | `>=1.2.0` _(optional)_          |
| `@pixel-brewery/markdowner-core`            | `>=0.1.96`                      |
| `@pixel-brewery/mosaik-elements-angular`    | `>=0.1.99` _(optional)_         |
| `@pixel-brewery/mosaik-elements-foundation` | `>=0.1.99` _(optional)_         |
| `@pixel-brewery/ngpel-core`                 | `0.0.2`                         |
| `@pixel-brewery/ngpel-mvp`                  | `0.0.2`                         |
| `@pixel-brewery/ngpel-router`               | `0.0.2`                         |
| `marked`                                    | `>=18.0.0`                      |
| `rxjs`                                      | `>=7.8.0 <8.0.0`                |

## Quick Start

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

## Layer

Layer 2 — depends on `@pixel-brewery/ngpel-core`, `@pixel-brewery/ngpel-mvp`, `@pixel-brewery/ngpel-router`. A package imports only packages of a strictly lower layer.

## What stays in the application

Theme tokens, the translation catalogue behind the `provide*Intl()` providers, product-specific layouts and every domain view stay in the application. Mosaik and CodeMirror are optional peers: install them only for the components that render through them.
