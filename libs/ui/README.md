# @pixel-brewery/ngpel-ui

The presentation layer: every component, directive and pipe the products share — the AI surfaces, the media and file components, the collection view, the guided tour and the dashboard widget grid — plus a safe markdown pipeline.

## Features

- **AI surfaces** — the AI beam that marks AI-produced content (one shared frame-rate-capped loop for the whole page), the AI rail with its choice, configuration and result sections, the AI presentation directive and the typewriter.
- **Voice and audio** — a live waveform, an activity orb, a signal-quality indicator, the session controls, the immersive session shell with separate preparation and session content and optional idle controls, and the voice-recorder bridge onto the recorder of `ngpel-core`.
- **Collections** — table, flow, gallery and calendar views, persisted table column widths and visibility, managed list rows with loading and contextual actions, numeric and named filters, and CSV/Excel export.
- **Forms and decisions** — configurable entity and color pickers, asynchronous input suggestions, dynamic radio and multiple-choice fields, nested condition groups, stacked compound editors, URL lists, agreement prompts and recurrence editing.
- **Media and files** — file cards, lists and inline chips, image crop, markup and preview, an image editor, and a document drawer with retry, download and optional PDF rendering supplied by the host.
- **Shell and navigation** — a composable navigation bar with an accessible collapse control, a separate collapsible navigation panel with a narrow-screen overlay, responsive toolbar actions, registered page paths, rails, content navigation and the floating host. Connect `NavigationCollapseToggleComponent` to `createSideNavigationController` from `ngpel-router/shell` for a persisted desktop preference.
- **Context drawers** — compose `provideContextOverlayRouting` with `provideContextDrawerTarget` and the application’s Mosaik drawer provider. The feature supplies its allowed modes, lazy content and how to turn the ID and context into drawer data. `resolveDetailData` can restore that data from a direct link.
- **Context menus** — `ngp-context-menu` renders a caller-owned Mosaik menu for one item. Use `ngpContextMenuTriggerFor` on an item with `ngpContextMenuValue`, or directly on a Mosaik data table to resolve the row under the pointer. Right-click, the context-menu key and Shift+F10 open the menu. Set `ngpContextMenuOpenOnClick` on a visible action button for touch and pointer use.
- **Activity** — a paged timeline with projected entries and optional read markers, long-text comparisons, and themed chart options with escaped tooltips.
- **Guided tour** — tour contributions, anchors and the `provideTour()` composition over the Mosaik tour overlay.
- **Display pipes and directives** — byte sizes, initials, truncation, hash colours, links, plus pseudo links, hover-reveal, event-propagation stops, infinite scroll, eye dropper and scroll-to-error.
- **Markdown** — a hardened string pipeline and a semantic Angular renderer for documents, compact previews and editor preview hooks. Raw HTML is rendered as text.
- **Widgets** — the dashboard widget registry, the editable widget grid with drag and resize, value summaries with optional hints, and a framework-free layout algebra with a versioned codec.
- **Google Maps adapter** — the optional `/google-maps` import handles browser script loading, projected map content and viewport bounds. The host provides its own key and data loaders.

## Import Options

```typescript
// @pixel-brewery/ngpel-ui — 486 exports
import {
    ActionStripComponent,
    ActionStripContentDirective,
    ActionStripTriggerDirective,
    ActivityLogComponent,
    ActivityLogEntryDirective,
    ActivityLogState /* … */,
} from '@pixel-brewery/ngpel-ui';

// @pixel-brewery/ngpel-ui/context-overlay — 2 exports
import { IContextDrawerTarget, provideContextDrawerTarget } from '@pixel-brewery/ngpel-ui/context-overlay';

// @pixel-brewery/ngpel-ui/markdown — 9 exports
import {
    createMarkdownExtensions,
    createMarkedRenderer,
    escapeMarkdownAttribute,
    escapeMarkdownText,
    IMarkdownRendererOptions,
    MarkdownRenderer /* … */,
} from '@pixel-brewery/ngpel-ui/markdown';

// @pixel-brewery/ngpel-ui/google-maps — 8 exports
import {
    IMapConfiguration,
    MAP_CONFIGURATION,
    MapComponent,
    MapContentDirective,
    MapLoadError,
    MapScriptLoader /* … */,
} from '@pixel-brewery/ngpel-ui/google-maps';

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
| `@angular/google-maps`                      | `>=22.0.0 <23.0.0` _(optional)_ |
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
| `@googlemaps/markerclusterer`               | `>=2.6.2 <3` _(optional)_       |
| `@lezer/highlight`                          | `>=1.2.0` _(optional)_          |
| `@pixel-brewery/markdowner-core`            | `>=0.1.96`                      |
| `@pixel-brewery/mosaik-elements-angular`    | `>=0.1.188` _(optional)_        |
| `@pixel-brewery/mosaik-elements-foundation` | `>=0.1.188` _(optional)_        |
| `@pixel-brewery/ngpel-core`                 | `0.0.3`                         |
| `@pixel-brewery/ngpel-mvp`                  | `0.0.3`                         |
| `@pixel-brewery/ngpel-router`               | `0.0.3`                         |
| `apexcharts`                                | `>=5.0.0` _(optional)_          |
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
