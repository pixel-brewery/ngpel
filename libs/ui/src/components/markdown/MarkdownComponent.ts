// #region Imports

import { NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, input, ViewEncapsulation } from '@angular/core';
import { escapeMarkdownText, renderPlainMarkdown } from '@pixel-brewery/ngpel-ui/markdown';
import type { IMarkdownDocument } from './MarkdownDocument';
import { MarkdownParser } from './MarkdownParser';

// #endregion

/** Safely renders the supported Markdown dialect as semantic Angular DOM. */
@Component({
    selector: 'ngp-markdown',
    template: `
        <ng-template #inline let-nodes>
            @for (node of nodes; track $index) {
                @switch (node.type) {
                    @case ('text') {
                        <span part="text">{{ node.text }}</span>
                    }
                    @case ('strong') {
                        <strong part="strong"><ng-container [ngTemplateOutlet]="inline" [ngTemplateOutletContext]="{ $implicit: node.children }" /></strong>
                    }
                    @case ('emphasis') {
                        <em part="emphasis"><ng-container [ngTemplateOutlet]="inline" [ngTemplateOutletContext]="{ $implicit: node.children }" /></em>
                    }
                    @case ('deletion') {
                        <del part="deletion"><ng-container [ngTemplateOutlet]="inline" [ngTemplateOutletContext]="{ $implicit: node.children }" /></del>
                    }
                    @case ('code') {
                        <code part="inline-code">{{ node.text }}</code>
                    }
                    @case ('break') {
                        <br part="break" />
                    }
                    @case ('link') {
                        @if (resolveLink(node.href); as destination) {
                            <a part="link" [href]="destination" [attr.title]="node.title"
                                ><ng-container [ngTemplateOutlet]="inline" [ngTemplateOutletContext]="{ $implicit: node.children }"
                            /></a>
                        } @else {
                            <span part="text"><ng-container [ngTemplateOutlet]="inline" [ngTemplateOutletContext]="{ $implicit: node.children }" /></span>
                        }
                    }
                    @case ('image') {
                        <img
                            part="image"
                            [src]="node.src"
                            [alt]="node.alt"
                            [attr.title]="node.title"
                            [attr.width]="node.width"
                            [attr.height]="node.height"
                            loading="lazy"
                        />
                    }
                }
            }
        </ng-template>

        <ng-template #blocks let-nodes>
            @for (node of nodes; track $index) {
                @switch (node.type) {
                    @case ('heading') {
                        @switch (node.depth) {
                            @case (1) {
                                <h1 part="heading heading-1">
                                    <ng-container [ngTemplateOutlet]="inline" [ngTemplateOutletContext]="{ $implicit: node.children }" />
                                </h1>
                            }
                            @case (2) {
                                <h2 part="heading heading-2">
                                    <ng-container [ngTemplateOutlet]="inline" [ngTemplateOutletContext]="{ $implicit: node.children }" />
                                </h2>
                            }
                            @case (3) {
                                <h3 part="heading heading-3">
                                    <ng-container [ngTemplateOutlet]="inline" [ngTemplateOutletContext]="{ $implicit: node.children }" />
                                </h3>
                            }
                            @case (4) {
                                <h4 part="heading heading-4">
                                    <ng-container [ngTemplateOutlet]="inline" [ngTemplateOutletContext]="{ $implicit: node.children }" />
                                </h4>
                            }
                            @case (5) {
                                <h5 part="heading heading-5">
                                    <ng-container [ngTemplateOutlet]="inline" [ngTemplateOutletContext]="{ $implicit: node.children }" />
                                </h5>
                            }
                            @default {
                                <h6 part="heading heading-6">
                                    <ng-container [ngTemplateOutlet]="inline" [ngTemplateOutletContext]="{ $implicit: node.children }" />
                                </h6>
                            }
                        }
                    }
                    @case ('paragraph') {
                        <p part="paragraph">
                            <ng-container [ngTemplateOutlet]="inline" [ngTemplateOutletContext]="{ $implicit: node.children }" />
                        </p>
                    }
                    @case ('thematic-break') {
                        <hr part="thematic-break" />
                    }
                    @case ('code') {
                        <figure part="code-block">
                            @if (node.fileName) {
                                <figcaption part="code-caption">{{ node.fileName }}</figcaption>
                            }
                            <pre><code [attr.data-language]="node.language" [attr.data-highlights]="node.highlights">{{ node.text }}</code></pre>
                        </figure>
                    }
                    @case ('blockquote') {
                        <blockquote part="blockquote" [attr.data-variant]="node.variant">
                            <ng-container [ngTemplateOutlet]="blocks" [ngTemplateOutletContext]="{ $implicit: node.children }" />
                        </blockquote>
                    }
                    @case ('list') {
                        @if (node.ordered) {
                            <ol part="list ordered-list" [attr.start]="node.start === 1 ? null : node.start">
                                @for (item of node.items; track $index) {
                                    <li part="list-item">
                                        @if (item.task) {
                                            <input part="task-checkbox" type="checkbox" [checked]="item.checked" disabled />
                                        }
                                        <ng-container [ngTemplateOutlet]="blocks" [ngTemplateOutletContext]="{ $implicit: item.children }" />
                                    </li>
                                }
                            </ol>
                        } @else {
                            <ul part="list unordered-list">
                                @for (item of node.items; track $index) {
                                    <li part="list-item">
                                        @if (item.task) {
                                            <input part="task-checkbox" type="checkbox" [checked]="item.checked" disabled />
                                        }
                                        <ng-container [ngTemplateOutlet]="blocks" [ngTemplateOutletContext]="{ $implicit: item.children }" />
                                    </li>
                                }
                            </ul>
                        }
                    }
                    @case ('table') {
                        <div part="table-scroller">
                            <table part="table">
                                <thead>
                                    <tr>
                                        @for (cell of node.header; track $index) {
                                            <th part="table-header-cell" [style.text-align]="cell.align">
                                                <ng-container [ngTemplateOutlet]="inline" [ngTemplateOutletContext]="{ $implicit: cell.children }" />
                                            </th>
                                        }
                                    </tr>
                                </thead>
                                <tbody>
                                    @for (row of node.rows; track $index) {
                                        <tr>
                                            @for (cell of row; track $index) {
                                                <td part="table-cell" [style.text-align]="cell.align">
                                                    <ng-container [ngTemplateOutlet]="inline" [ngTemplateOutletContext]="{ $implicit: cell.children }" />
                                                </td>
                                            }
                                        </tr>
                                    }
                                </tbody>
                            </table>
                        </div>
                    }
                    @case ('callout') {
                        <aside part="callout" [attr.data-variant]="node.variant">
                            @if (node.title) {
                                <strong part="callout-title">{{ node.title }}</strong>
                            }
                            <ng-container [ngTemplateOutlet]="blocks" [ngTemplateOutletContext]="{ $implicit: node.children }" />
                        </aside>
                    }
                    @case ('details') {
                        <details part="details">
                            <summary part="details-summary">{{ node.title }}</summary>
                            <div part="details-content">
                                <ng-container [ngTemplateOutlet]="blocks" [ngTemplateOutletContext]="{ $implicit: node.children }" />
                            </div>
                        </details>
                    }
                    @case ('card') {
                        <article part="card" [attr.data-variant]="node.variant">
                            <header part="card-header">
                                <h6>{{ node.title }}</h6>
                                @if (node.subtitle) {
                                    <p part="card-subtitle">{{ node.subtitle }}</p>
                                }
                            </header>
                            <ng-container [ngTemplateOutlet]="blocks" [ngTemplateOutletContext]="{ $implicit: node.children }" />
                        </article>
                    }
                    @case ('button') {
                        @if (resolveLink(node.href); as destination) {
                            <a part="button" [attr.data-variant]="node.variant" [attr.data-appearance]="node.appearance" [href]="destination">{{
                                node.label
                            }}</a>
                        } @else {
                            <span part="button">{{ node.label }}</span>
                        }
                    }
                    @case ('splits') {
                        <section part="splits">
                            @for (item of node.items; track $index) {
                                <article part="split" [attr.data-variant]="item.variant">
                                    <h6 part="split-title">
                                        <ng-container [ngTemplateOutlet]="inline" [ngTemplateOutletContext]="{ $implicit: item.title }" />
                                    </h6>
                                    <ng-container [ngTemplateOutlet]="blocks" [ngTemplateOutletContext]="{ $implicit: item.children }" />
                                </article>
                            }
                        </section>
                    }
                    @case ('steps') {
                        <ol part="steps">
                            @for (item of node.items; track $index) {
                                <li part="step">
                                    <strong part="step-title">{{ item.title }}</strong>
                                    <ng-container [ngTemplateOutlet]="blocks" [ngTemplateOutletContext]="{ $implicit: item.children }" />
                                </li>
                            }
                        </ol>
                    }
                    @case ('tabs') {
                        <section part="tabs">
                            @for (item of node.items; track $index) {
                                <details part="tab" [attr.data-variant]="item.variant" [open]="$first">
                                    <summary part="tab-title">{{ item.title }}</summary>
                                    <div part="tab-content">
                                        <ng-container [ngTemplateOutlet]="blocks" [ngTemplateOutletContext]="{ $implicit: item.children }" />
                                    </div>
                                </details>
                            }
                        </section>
                    }
                }
            }
        </ng-template>

        @if (mode() === 'inline') {
            <span part="inline-root"><ng-container [ngTemplateOutlet]="inline" [ngTemplateOutletContext]="{ $implicit: document().inline }" /></span>
        } @else {
            <div part="document-root">
                <ng-container [ngTemplateOutlet]="blocks" [ngTemplateOutletContext]="{ $implicit: document().blocks }" />
            </div>
        }
    `,
    styles: `
        :host {
            --ngp-markdown-color: var(--mosaik-scheme-foreground);
            --ngp-markdown-muted-color: var(--mosaik-scheme-lowlight);
            --ngp-markdown-link-color: var(--mosaik-color-primary-600);
            --ngp-markdown-border-color: var(--mosaik-scheme-highlight);
            --ngp-markdown-surface-color: var(--mosaik-scheme-background);
            --ngp-markdown-accent-color: var(--mosaik-color-primary-400);
            --ngp-markdown-radius: var(--mosaik-layout-radius);
            --ngp-markdown-block-gap: calc(var(--mosaik-layout-space) * 3);
            --ngp-markdown-inline-gap: var(--mosaik-layout-space);
            --ngp-markdown-content-padding: calc(var(--mosaik-layout-space) * 3);
            --ngp-markdown-body-font: var(--mosaik-typography-body1);
            --ngp-markdown-heading-1-font: var(--mosaik-typography-headline2);
            --ngp-markdown-heading-2-font: var(--mosaik-typography-headline3);
            --ngp-markdown-heading-3-font: var(--mosaik-typography-headline4);
            --ngp-markdown-heading-4-font: var(--mosaik-typography-headline5);
            --ngp-markdown-heading-5-font: var(--mosaik-typography-headline6);
            --ngp-markdown-heading-6-font: var(--mosaik-typography-body1);

            display: block;
            min-width: 0;
            color: var(--ngp-markdown-color);
            font: var(--ngp-markdown-body-font);
            overflow-wrap: anywhere;
        }

        :host([data-ngp-mode='inline']) {
            display: inline;
            width: auto;
        }

        :host([data-ngp-preset='chat']) {
            --ngp-markdown-block-gap: calc(var(--mosaik-layout-space) * 2);
            --ngp-markdown-content-padding: calc(var(--mosaik-layout-space) * 2);
            --ngp-markdown-heading-1-font: var(--mosaik-typography-headline4);
            --ngp-markdown-heading-2-font: var(--mosaik-typography-headline5);
            --ngp-markdown-heading-3-font: var(--mosaik-typography-headline6);
        }

        :host([data-ngp-preset='compact']) {
            --ngp-markdown-block-gap: var(--mosaik-layout-space);
            --ngp-markdown-content-padding: calc(var(--mosaik-layout-space) * 2);
            --ngp-markdown-body-font: var(--mosaik-typography-body2);
            --ngp-markdown-heading-1-font: var(--mosaik-typography-headline5);
            --ngp-markdown-heading-2-font: var(--mosaik-typography-headline6);
            --ngp-markdown-heading-3-font: var(--mosaik-typography-body1);
        }

        * {
            box-sizing: border-box;
        }

        [part='document-root'] {
            display: grid;
            min-width: 0;
            gap: var(--ngp-markdown-block-gap);
        }

        [part='inline-root'] {
            white-space: normal;
        }

        h1,
        h2,
        h3,
        h4,
        h5,
        h6,
        p,
        figure,
        blockquote,
        ul,
        ol,
        table {
            margin: 0;
        }

        h1 {
            font: var(--ngp-markdown-heading-1-font);
        }

        h2 {
            font: var(--ngp-markdown-heading-2-font);
        }

        h3 {
            font: var(--ngp-markdown-heading-3-font);
        }

        h4 {
            font: var(--ngp-markdown-heading-4-font);
        }

        h5 {
            font: var(--ngp-markdown-heading-5-font);
        }

        h6 {
            font: var(--ngp-markdown-heading-6-font);
            font-weight: var(--mosaik-typography-button-font-weight);
        }

        strong {
            font-weight: var(--mosaik-typography-button-font-weight);
        }

        a {
            color: var(--ngp-markdown-link-color);
            text-decoration: underline;
            text-underline-offset: 0.15em;
        }

        a:hover {
            text-decoration-thickness: 0.12em;
        }

        code,
        pre {
            font-family: ui-monospace, 'SFMono-Regular', Consolas, 'Liberation Mono', monospace;
        }

        [part='inline-code'] {
            padding: 0.1em 0.35em;
            border: var(--mosaik-layout-thickness) solid var(--ngp-markdown-border-color);
            border-radius: calc(var(--ngp-markdown-radius) / 2);
            background: var(--ngp-markdown-surface-color);
            font-size: 0.9em;
        }

        [part='image'] {
            max-width: 100%;
            height: auto;
            border-radius: var(--ngp-markdown-radius);
        }

        [part='thematic-break'] {
            width: 100%;
            margin: 0;
            border: 0;
            border-block-start: var(--mosaik-layout-thickness) solid var(--ngp-markdown-border-color);
        }

        [part='code-block'] {
            min-width: 0;
            overflow: hidden;
            border: var(--mosaik-layout-thickness) solid var(--ngp-markdown-border-color);
            border-radius: var(--ngp-markdown-radius);
            background: var(--ngp-markdown-surface-color);
        }

        [part='code-caption'] {
            padding: var(--mosaik-layout-space) var(--ngp-markdown-content-padding);
            border-block-end: var(--mosaik-layout-thickness) solid var(--ngp-markdown-border-color);
            color: var(--ngp-markdown-muted-color);
            font: var(--mosaik-typography-supporting);
        }

        pre {
            max-width: 100%;
            padding: var(--ngp-markdown-content-padding);
            overflow: auto;
            white-space: pre;
        }

        [part='blockquote'],
        [part='callout'] {
            display: grid;
            gap: var(--mosaik-layout-space);
            padding: var(--ngp-markdown-content-padding);
            border-inline-start: calc(var(--mosaik-layout-thickness) * 4) solid var(--ngp-markdown-accent-color);
            border-radius: var(--ngp-markdown-radius);
            background: var(--ngp-markdown-surface-color);
        }

        [data-variant='info'] {
            --ngp-markdown-accent-color: var(--mosaik-color-info-500);
        }

        [data-variant='warning'] {
            --ngp-markdown-accent-color: var(--mosaik-color-warning-500);
        }

        [data-variant='danger'],
        [data-variant='error'] {
            --ngp-markdown-accent-color: var(--mosaik-color-danger-500);
        }

        [data-variant='success'] {
            --ngp-markdown-accent-color: var(--mosaik-color-success-500);
        }

        ul,
        ol {
            display: grid;
            gap: var(--ngp-markdown-inline-gap);
            padding-inline-start: calc(var(--ngp-markdown-content-padding) * 1.5);
        }

        li > p {
            display: inline;
        }

        [part='task-checkbox'] {
            margin: 0 var(--mosaik-layout-space) 0 0;
            accent-color: var(--ngp-markdown-link-color);
        }

        [part='table-scroller'] {
            max-width: 100%;
            overflow-x: auto;
            border: var(--mosaik-layout-thickness) solid var(--ngp-markdown-border-color);
            border-radius: var(--ngp-markdown-radius);
        }

        table {
            width: 100%;
            border-collapse: collapse;
        }

        th,
        td {
            padding: calc(var(--mosaik-layout-space) * 2) var(--ngp-markdown-content-padding);
            border-block-end: var(--mosaik-layout-thickness) solid var(--ngp-markdown-border-color);
            vertical-align: top;
        }

        th {
            background: var(--ngp-markdown-surface-color);
            font-weight: var(--mosaik-typography-button-font-weight);
            text-align: left;
        }

        tbody tr:last-child td {
            border-block-end: 0;
        }

        [part='details'],
        [part='tab'] {
            border: var(--mosaik-layout-thickness) solid var(--ngp-markdown-border-color);
            border-radius: var(--ngp-markdown-radius);
        }

        [part='details-summary'],
        [part='tab-title'] {
            padding: calc(var(--mosaik-layout-space) * 2) var(--ngp-markdown-content-padding);
            cursor: pointer;
            font-weight: var(--mosaik-typography-button-font-weight);
        }

        [part='details-content'],
        [part='tab-content'] {
            display: grid;
            gap: var(--ngp-markdown-block-gap);
            padding: 0 var(--ngp-markdown-content-padding) var(--ngp-markdown-content-padding);
        }

        [part='card'],
        [part='split'] {
            display: grid;
            gap: calc(var(--mosaik-layout-space) * 2);
            min-width: 0;
            padding: var(--ngp-markdown-content-padding);
            border: var(--mosaik-layout-thickness) solid var(--ngp-markdown-border-color);
            border-radius: var(--ngp-markdown-radius);
        }

        [part='card-header'] {
            display: grid;
            gap: var(--mosaik-layout-space);
        }

        [part='card-subtitle'] {
            color: var(--ngp-markdown-muted-color);
        }

        [part='button'] {
            display: inline-flex;
            width: fit-content;
            padding: calc(var(--mosaik-layout-space) * 2) var(--ngp-markdown-content-padding);
            border: var(--mosaik-layout-thickness) solid var(--ngp-markdown-link-color);
            border-radius: var(--ngp-markdown-radius);
            background: var(--ngp-markdown-link-color);
            color: var(--mosaik-color-neutral-0);
            font-weight: var(--mosaik-typography-button-font-weight);
            text-decoration: none;
        }

        [part='button'][data-appearance='soft'] {
            background: var(--ngp-markdown-surface-color);
            color: var(--ngp-markdown-link-color);
        }

        [part='button'][data-appearance='plain'] {
            border-color: transparent;
            background: transparent;
            color: var(--ngp-markdown-link-color);
        }

        [part='splits'] {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(min(16rem, 100%), 1fr));
            gap: var(--ngp-markdown-block-gap);
        }

        [part='steps'] {
            list-style: none;
            counter-reset: markdown-step;
            padding-inline-start: 0;
        }

        [part='step'] {
            counter-increment: markdown-step;
            position: relative;
            display: grid;
            gap: var(--mosaik-layout-space);
            padding-inline-start: calc(var(--ngp-markdown-content-padding) * 2);
        }

        [part='step']::before {
            content: counter(markdown-step);
            position: absolute;
            inset-inline-start: 0;
            display: grid;
            width: calc(var(--ngp-markdown-content-padding) * 1.4);
            aspect-ratio: 1;
            place-items: center;
            border-radius: 50%;
            background: var(--ngp-markdown-link-color);
            color: var(--mosaik-color-neutral-0);
        }

        [part='tabs'] {
            display: grid;
            gap: var(--mosaik-layout-space);
        }
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.ShadowDom,
    imports: [NgTemplateOutlet],
    host: {
        '[attr.data-ngp-mode]': 'mode()',
        '[attr.data-ngp-preset]': 'preset()',
        '[attr.data-ngp-markdown-fallback]': 'document().fallback ? "" : null',
    },
})
export class MarkdownComponent {
    // #region Fields

    private readonly _parser = new MarkdownParser();

    // #endregion

    // #region Ctor

    // #endregion

    // #region Properties

    /** Markdown source to render. */
    public readonly text = input<string>('');

    /** Whether single line breaks become explicit line breaks. */
    public readonly breaks = input<boolean>(false);

    /** Renders only standard Markdown, without custom block extensions. */
    public readonly sanitize = input(false);

    /** Escaped source for consumers that need a text-only binding. */
    public readonly safeMarkdownText = computed(() => escapeMarkdownText(this.text()));

    /** Standard HTML representation for consumers that need HTML instead of the component DOM. */
    public readonly renderedHtml = computed(() => renderPlainMarkdown(this.text(), this.breaks()));

    /** Selects complete document rendering or inline-only rendering. */
    public readonly mode = input<'document' | 'inline'>('document');

    /** Selects the density and typography preset. */
    public readonly preset = input<'article' | 'chat' | 'compact'>('article');

    /** Optionally maps safe Markdown destinations to application routes. */
    public readonly linkResolver = input<((href: string) => string | null) | null>(null);

    /** Safe normalized representation of the current Markdown source. */
    protected readonly document = computed<IMarkdownDocument>(() => this._parser.parse(this.text(), this.breaks(), this.sanitize()));

    protected resolveLink(href: string): string | null {
        return this.linkResolver()?.(href) ?? (this.linkResolver() ? null : href);
    }

    // #endregion

    // #region Methods

    // #endregion
}
