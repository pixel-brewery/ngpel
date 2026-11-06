import { NgTemplateOutlet } from '@angular/common';
import {
    DOCUMENT,
    ChangeDetectionStrategy,
    Component,
    DestroyRef,
    afterRenderEffect,
    computed,
    contentChild,
    effect,
    inject,
    input,
    output,
    signal,
    untracked,
} from '@angular/core';
import { ButtonComponent, SkeletonComponent, TimelineComponent, TimelineContentComponent, TimelineItemComponent } from '@pixel-brewery/mosaik-elements-angular';
import { ActivityLogEntryDirective } from './ActivityLogEntryDirective';
import type { IActivityLogController } from './IActivityLogController';
import type { IActivityLogLabels } from './IActivityLogLabels';

const LABELS: IActivityLogLabels = {
    heading: 'Activity',
    loading: 'Loading activity',
    empty: 'No activity yet.',
    error: 'Activity could not be loaded.',
    moreError: 'More activity could not be loaded.',
    retry: 'Try again',
    loadMore: 'Load more',
    newChanges: 'New changes',
};

/** Renders caller-projected entries with paging, load feedback and an optional unread boundary. @public */
@Component({
    selector: 'ngp-activity-log',
    imports: [ButtonComponent, NgTemplateOutlet, SkeletonComponent, TimelineComponent, TimelineContentComponent, TimelineItemComponent],
    changeDetection: ChangeDetectionStrategy.OnPush,
    styles: ':host { display: block; min-width: 0; }',
    template: `
        @let source = controller();
        @let text = resolvedLabels();
        @switch (source.state()) {
            @case ('failed') {
                <p role="alert">{{ text.error }}</p>
                <mosaik-button [label]="text.retry" appearance="outline" (click)="source.reloadCommand.execute()" />
            }
            @case ('loaded') {
                @if (visibleEntries().length || source.hasMore()) {
                    <mosaik-timeline orientation="vertical" [attr.aria-label]="text.heading">
                        @if (showUnreadAtTop()) {
                            <p part="unread-boundary">{{ text.newChanges }}</p>
                        }
                        @for (item of visibleEntries(); track controller().itemKey(item)) {
                            @if (unreadBoundary() === source.itemKey(item)) {
                                <p part="unread-boundary">{{ text.newChanges }}</p>
                            }
                            <mosaik-timeline-item>
                                <mosaik-timeline-content>
                                    @if (entryTemplate(); as entry) {
                                        <ng-container [ngTemplateOutlet]="entry.template" [ngTemplateOutletContext]="{ $implicit: item }" />
                                    }
                                </mosaik-timeline-content>
                            </mosaik-timeline-item>
                        }
                    </mosaik-timeline>
                } @else {
                    <p>{{ text.empty }}</p>
                }
                @if (source.hasMore()) {
                    @if (source.moreState() === 'failed') {
                        <p role="alert">{{ text.moreError }}</p>
                    }
                    <mosaik-button
                        appearance="outline"
                        [label]="source.moreState() === 'failed' ? text.retry : text.loadMore"
                        [isBusy]="source.moreState() === 'loading'"
                        (click)="source.loadMoreCommand.execute()"
                    />
                }
            }
            @default {
                <div role="status" aria-busy="true" [attr.aria-label]="text.loading">
                    @for (index of placeholders; track index) {
                        <mosaik-skeleton width="100%" height="2rem" [shimmer]="true" />
                    }
                </div>
            }
        }
    `,
})
export class ActivityLogComponent<T> {
    // #region Fields

    private readonly _document = inject(DOCUMENT);
    private readonly _documentVisible = signal(this._document.visibilityState === 'visible');
    private _lastRead?: { readonly controller: IActivityLogController<T>; readonly item: T | undefined };

    // #endregion

    // #region Ctor

    /** Starts the controller on display and reports only entries rendered in a visible document. */
    public constructor() {
        effect(() => {
            const controller = this.controller();
            untracked(() => controller.ensureLoaded());
        });
        const onVisibility = (): void => this._documentVisible.set(this._document.visibilityState === 'visible');
        this._document.addEventListener('visibilitychange', onVisibility);
        inject(DestroyRef).onDestroy(() => this._document.removeEventListener('visibilitychange', onVisibility));
        afterRenderEffect(() => {
            const controller = this.controller();
            if (controller.state() !== 'loaded' || !this._documentVisible()) {
                return;
            }
            const item = controller.entries()[0];
            if (controller !== this._lastRead?.controller || item !== this._lastRead.item) {
                this._lastRead = { controller, item };
                untracked(() => this.readRequested.emit(item));
            }
        });
    }

    // #endregion

    // #region Properties

    /** Provides the entries, load state and paging commands. */
    public readonly controller = input.required<IActivityLogController<T>>();
    /** Optional filter that affects rendering without changing paging or read position. */
    public readonly isVisible = input<(item: T) => boolean>();
    /** Localized labels; omitted labels retain their defaults. */
    public readonly labels = input<Partial<IActivityLogLabels>>({});
    /** Last acknowledged visible entry key. Supply null when all visible entries are new. */
    public readonly unreadBoundary = input<string | number | null>();
    /** Asks the host to persist the newest entry after a successful visible render. */
    public readonly readRequested = output<T | undefined>();

    protected readonly entryTemplate = contentChild<ActivityLogEntryDirective<T>>(ActivityLogEntryDirective);
    protected readonly placeholders = [0, 1, 2];
    protected readonly resolvedLabels = computed(() => ({ ...LABELS, ...this.labels() }));
    protected readonly visibleEntries = computed(() => {
        const entries = this.controller().entries();
        const filter = this.isVisible();
        return filter ? entries.filter(filter) : entries;
    });
    protected readonly showUnreadAtTop = computed(() => this.unreadBoundary() === null && this.visibleEntries().length > 0);

    // #endregion
}
