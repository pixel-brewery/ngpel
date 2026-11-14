import { ChangeDetectionStrategy, Component, computed, effect, input, signal } from '@angular/core';
import { ButtonComponent } from '@pixel-brewery/mosaik-elements-angular';
import type { ActivityTextParagraph } from './ActivityTextParagraph';

type ParagraphGroup = Extract<ActivityTextParagraph, { readonly unchanged: false }> | { readonly unchanged: true; readonly texts: string[] };

/** Renders a word comparison and lets the reader reveal runs of unchanged paragraphs. @public */
@Component({
    selector: 'ngp-activity-text-change',
    imports: [ButtonComponent],
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: { '[class.ngp-detailed]': 'detailed()' },
    template: `
        @for (group of groups(); track $index) {
            @if (group.unchanged) {
                @let index = $index;
                @let isExpanded = expanded().has(index);
                <mosaik-button
                    part="toggle"
                    appearance="plain"
                    size="small"
                    [variant]="detailed() ? 'info' : undefined"
                    [icon]="detailed() ? (isExpanded ? 'chevronUp' : 'chevronDown') : undefined"
                    [label]="unchangedLabel()(group.texts.length, isExpanded)"
                    [attr.aria-expanded]="isExpanded"
                    (click)="toggle(index)"
                />
                @if (isExpanded) {
                    @for (paragraph of group.texts; track $index) {
                        <p part="paragraph">{{ paragraph }}</p>
                    }
                }
            } @else {
                <p part="paragraph">
                    @for (part of group.parts; track $index) {
                        @switch (part.kind) {
                            @case ('removed') {
                                <del part="text-removed">
                                    @if (beforeLabel(); as before) {
                                        <span class="sr-only">{{ before }}</span>
                                    }
                                    {{ part.text }}</del
                                >
                            }
                            @case ('added') {
                                <ins part="text-added">
                                    @if (afterLabel(); as after) {
                                        <span class="sr-only">{{ after }}</span>
                                    }
                                    {{ part.text }}</ins
                                >
                            }
                            @default {
                                {{ part.text }}
                            }
                        }
                    }
                </p>
            }
        }
    `,
    styles: `
        :host {
            display: grid;
            gap: var(--mosaik-layout-space, 4px);
            min-inline-size: 0;
        }
        [part='toggle'] {
            justify-self: start;
        }
        p {
            margin: 0;
            white-space: pre-wrap;
            overflow-wrap: anywhere;
        }
        del {
            background: var(--ngp-activity-text-removed-background, var(--mosaik-color-danger-100));
            color: var(--ngp-activity-text-removed-foreground, var(--mosaik-color-danger-700));
        }
        ins {
            background: var(--ngp-activity-text-added-background, var(--mosaik-color-success-100));
            color: var(--ngp-activity-text-added-foreground, var(--mosaik-color-success-700));
        }
        :host(.ngp-detailed) {
            display: flex;
            flex-direction: column;
            gap: 0.25rem;

            [part='toggle'] {
                align-self: start;
                margin-inline-start: -0.25rem;
                font: var(--mosaik-typography-body2);
                font-weight: 600;
            }

            p {
                font: var(--mosaik-typography-body1);
                color: var(--mosaik-scheme-foreground);
                white-space: normal;
                overflow-wrap: break-word;
                hyphens: none;
            }

            del,
            ins {
                padding-inline: 2px;
                border-radius: 3px;
            }

            del {
                text-decoration: line-through;
                text-decoration-thickness: 1px;
            }

            ins {
                text-decoration: underline;
                text-underline-offset: 3px;
            }
        }
    `,
})
export class ActivityTextChangeComponent {
    /** Paragraphs produced by `diffActivityText`. */
    public readonly paragraphs = input.required<ReadonlyArray<ActivityTextParagraph>>();

    /** Builds the localized toggle label for an unchanged run. */
    public readonly unchangedLabel = input.required<(count: number, expanded: boolean) => string>();

    /** Uses the activity timeline's typography and a directional toggle icon. */
    public readonly detailed = input(false);

    /** Announces the meaning of removed text for assistive technology. */
    public readonly beforeLabel = input<string>();

    /** Announces the meaning of added text for assistive technology. */
    public readonly afterLabel = input<string>();

    protected readonly expanded = signal<ReadonlySet<number>>(new Set());
    protected readonly groups = computed(() => {
        const groups: ParagraphGroup[] = [];
        for (const paragraph of this.paragraphs()) {
            const last = groups.at(-1);
            if (paragraph.unchanged && last?.unchanged) {
                last.texts.push(paragraph.text);
            } else if (paragraph.unchanged) {
                groups.push({ unchanged: true, texts: [paragraph.text] });
            } else {
                groups.push(paragraph);
            }
        }
        return groups;
    });

    /** Resets the expanded paragraphs when a different comparison arrives. */
    public constructor() {
        effect(() => {
            this.paragraphs();
            this.expanded.set(new Set());
        });
    }

    protected toggle(index: number): void {
        this.expanded.update((current) => {
            const next = new Set(current);
            if (!next.delete(index)) {
                next.add(index);
            }
            return next;
        });
    }
}
