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
import {
    ButtonComponent,
    EmptyStateComponent,
    ErrorStateComponent,
    SkeletonComponent,
    TimelineComponent,
    TimelineContentComponent,
    TimelineItemComponent,
    TimelineMarkerComponent,
    TimelineSeparatorComponent,
} from '@pixel-brewery/mosaik-elements-angular';
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
    imports: [
        ButtonComponent,
        EmptyStateComponent,
        ErrorStateComponent,
        NgTemplateOutlet,
        SkeletonComponent,
        TimelineComponent,
        TimelineContentComponent,
        TimelineItemComponent,
        TimelineMarkerComponent,
        TimelineSeparatorComponent,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
    styles: ':host { display: block; min-width: 0; }',
    template: `
        @let source = controller();
        @let text = resolvedLabels();
        @let detail = detailed();
        @let prefix = testIdPrefix();
        @switch (source.state()) {
            @case ('failed') {
                @if (detail) {
                    <mosaik-error-state
                        role="alert"
                        icon="errorState"
                        [header]="text.error"
                        [content]="text.errorDescription"
                        [attr.test-id]="prefix && prefix + '-error'"
                    >
                        <mosaik-button
                            slot="actions"
                            appearance="outline"
                            icon="arrowReset"
                            [label]="text.retry"
                            [attr.test-id]="prefix && prefix + '-retry'"
                            (click)="source.reloadCommand.execute()"
                        />
                    </mosaik-error-state>
                } @else {
                    <p role="alert">{{ text.error }}</p>
                    <mosaik-button [label]="text.retry" appearance="outline" (click)="source.reloadCommand.execute()" />
                }
            }
            @case ('loaded') {
                @if (visibleEntries().length || (!detail && source.hasMore())) {
                    <mosaik-timeline
                        part="list"
                        class="w-full min-w-0"
                        orientation="vertical"
                        [align]="detail ? 'start' : undefined"
                        [attr.aria-label]="text.heading"
                        [attr.test-id]="prefix && prefix + '-timeline'"
                    >
                        @if (showUnreadAtTop()) {
                            <ng-container [ngTemplateOutlet]="unread" />
                        }
                        @for (item of visibleEntries(); track controller().itemKey(item)) {
                            @if (unreadBoundary() === source.itemKey(item)) {
                                <ng-container [ngTemplateOutlet]="unread" />
                            }
                            <mosaik-timeline-item [attr.test-id]="prefix && prefix + '-entry-' + source.itemKey(item)">
                                @if (entryTemplate()?.marker(); as marker) {
                                    <mosaik-timeline-marker>
                                        <ng-container [ngTemplateOutlet]="marker" [ngTemplateOutletContext]="{ $implicit: item }" />
                                    </mosaik-timeline-marker>
                                }
                                <mosaik-timeline-content>
                                    @if (entryTemplate(); as entry) {
                                        <ng-container [ngTemplateOutlet]="entry.template" [ngTemplateOutletContext]="{ $implicit: item }" />
                                    }
                                </mosaik-timeline-content>
                            </mosaik-timeline-item>
                        }
                    </mosaik-timeline>
                } @else if (!source.hasMore()) {
                    @if (detail) {
                        <mosaik-empty-state icon="clock" [header]="text.empty" [content]="text.emptyDescription" [attr.test-id]="prefix && prefix + '-empty'" />
                    } @else {
                        <p>{{ text.empty }}</p>
                    }
                }
                @if (source.hasMore()) {
                    @if (detail) {
                        <div class="-mt-1 flex min-w-0 flex-col items-center gap-2">
                            @if (source.moreState() === 'loading') {
                                <ng-container [ngTemplateOutlet]="loadingEntry" />
                            } @else {
                                @let failed = source.moreState() === 'failed';
                                @if (failed) {
                                    <span part="more-error" role="alert">{{ text.moreError }}</span>
                                }
                                <mosaik-button
                                    class="@max-[35rem]:min-h-[44px]"
                                    appearance="outline"
                                    [icon]="failed ? 'arrowReset' : 'chevronDown'"
                                    [label]="failed ? text.retry : text.loadMore"
                                    [attr.test-id]="prefix && prefix + (failed ? '-load-more-retry' : '-load-more')"
                                    (click)="source.loadMoreCommand.execute()"
                                />
                            }
                        </div>
                    } @else {
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
            }
            @default {
                <div
                    class="flex min-w-0 flex-col"
                    role="status"
                    aria-busy="true"
                    [attr.aria-label]="text.loading"
                    [attr.test-id]="prefix && prefix + '-loading'"
                >
                    @for (index of placeholders; track index) {
                        @if (detail) {
                            <ng-container [ngTemplateOutlet]="loadingEntry" />
                        } @else {
                            <mosaik-skeleton width="100%" height="2rem" [shimmer]="true" />
                        }
                    }
                </div>
            }
        }
        <ng-template #unread>
            @if (detail) {
                <mosaik-timeline-separator
                    [label]="text.newChanges"
                    [description]="text.newChangesDescription"
                    variant="info"
                    appearance="solid"
                    icon="add"
                    [attr.test-id]="prefix && prefix + '-new-changes'"
                />
            } @else {
                <p part="unread-boundary">{{ text.newChanges }}</p>
            }
        </ng-template>
        <ng-template #loadingEntry>
            <div class="grid w-full min-w-0 grid-cols-[30px_minmax(0,1fr)] gap-x-3 pb-5" aria-hidden="true">
                <mosaik-skeleton [shape]="'circle'" [width]="'30px'" [height]="'30px'" [shimmer]="true" />
                <div class="flex min-w-0 flex-col gap-2">
                    <div class="flex min-h-[30px] items-center justify-between gap-3">
                        <div class="flex items-center gap-2">
                            <mosaik-skeleton [width]="'96px'" [height]="'12px'" [shimmer]="true" />
                            <mosaik-skeleton [width]="'132px'" [height]="'12px'" [shimmer]="true" />
                        </div>
                        <mosaik-skeleton [width]="'72px'" [height]="'12px'" [shimmer]="true" />
                    </div>
                    <div class="grid grid-cols-[186px_minmax(0,1fr)] gap-x-3 @max-[35rem]:grid-cols-1 @max-[35rem]:gap-y-1">
                        <mosaik-skeleton [width]="'96px'" [height]="'12px'" [shimmer]="true" />
                        <mosaik-skeleton [width]="'70%'" [height]="'12px'" [shimmer]="true" />
                    </div>
                    <div class="grid grid-cols-[186px_minmax(0,1fr)] gap-x-3 @max-[35rem]:grid-cols-1 @max-[35rem]:gap-y-1">
                        <mosaik-skeleton [width]="'96px'" [height]="'12px'" [shimmer]="true" />
                        <mosaik-skeleton [width]="'46%'" [height]="'12px'" [shimmer]="true" />
                    </div>
                </div>
            </div>
        </ng-template>
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
            untracked(() => {
                if (this.refreshOnMount() && controller.state() === 'loaded') {
                    controller.refresh();
                } else {
                    controller.ensureLoaded();
                }
            });
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
    /** Uses timeline-shaped skeletons, detailed empty and error states, and a timeline unread separator. */
    public readonly detailed = input(false);
    /** Stable identifier prefix for activity controls and records. */
    public readonly testIdPrefix = input<string>();
    /** Refreshes an already loaded log when the view is opened. */
    public readonly refreshOnMount = input(false);
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
