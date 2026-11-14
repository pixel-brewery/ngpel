import {
    afterNextRender,
    booleanAttribute,
    ChangeDetectionStrategy,
    Component,
    computed,
    effect,
    ElementRef,
    inject,
    Injector,
    input,
    signal,
    untracked,
    viewChildren,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import {
    BreakpointService,
    BreadcrumbComponent,
    BreadcrumbItemComponent,
    ButtonComponent,
    DividerComponent,
    FormatPipe,
    IconNameDirective,
    SkeletonComponent,
} from '@pixel-brewery/mosaik-elements-angular';
import { AnimationPlayer, AnimationPreset } from '@pixel-brewery/mosaik-elements-foundation';
import type { IPagePathLevel } from './IPagePathLevel';
import { PagePathRegistry } from './PagePathRegistry';

const LEVEL_DURATION = 200;
const LEVEL_STAGGER = 40;

/** Renders the current page path as a breadcrumb or a compact parent and title. @public */
@Component({
    selector: 'ngp-page-path-outlet',
    imports: [BreadcrumbComponent, BreadcrumbItemComponent, ButtonComponent, DividerComponent, FormatPipe, IconNameDirective, SkeletonComponent],
    template: `
        @if (isLoading() || displayedLevels().length) {
            @if (headerLayout() && !isCompact()) {
                <mosaik-divider part="divider" orientation="vertical" />
            }
            <nav part="path" [attr.aria-label]="ariaLabel()" [attr.aria-busy]="isLoading() || null">
                @if (isLoading()) {
                    <mosaik-skeleton
                        part="placeholder"
                        [width]="headerLayout() ? '180px' : '12rem'"
                        [height]="headerLayout() ? '16px' : '1em'"
                        [shimmer]="true"
                        aria-hidden="true"
                    />
                } @else if (isCompact()) {
                    <div part="compact-path">
                        @if (parent(); as parent) {
                            @if (parent.command; as command) {
                                @let accessibleBackLabel = backLabel() ?? parent.label;
                                <mosaik-button
                                    part="back"
                                    [attr.test-id]="'page-path-back'"
                                    [label]="headerLayout() ? (accessibleBackLabel | format: parent.label) : parent.label"
                                    [attr.aria-label]="headerLayout() ? null : accessibleBackLabel"
                                    [iconName]="headerLayout() ? 'chevronLeft' : 'chevron-left'"
                                    [iconSize]="headerLayout() ? 'small' : undefined"
                                    [appearance]="'plain'"
                                    [disabled]="!command.canExecute()"
                                    (click)="activate($event, parent)"
                                >
                                    @if (headerLayout()) {
                                        <span slot="label" part="back-label">{{ parent.label }}</span>
                                    }
                                </mosaik-button>
                            } @else {
                                <span part="context">{{ parent.label }}</span>
                            }
                        }
                        <span part="current" aria-current="page">{{ current()?.label }}</span>
                    </div>
                } @else {
                    <mosaik-breadcrumb part="breadcrumb">
                        @for (crumb of trail(); track crumb.key; let last = $last) {
                            @let command = last ? null : crumb.level.command;
                            <mosaik-breadcrumb-item
                                #levelElement
                                part="level"
                                [class.is-link]="!!command"
                                [label]="crumb.level.label"
                                [isActive]="last"
                                [underline]="command ? 'hover' : 'never'"
                                [attr.aria-current]="last ? 'page' : null"
                                [attr.role]="command ? 'link' : null"
                                [attr.aria-disabled]="command && !command.canExecute() ? 'true' : null"
                                [attr.tabindex]="command ? (command.canExecute() ? 0 : -1) : null"
                                (click)="activate($event, crumb.level, last)"
                                (keydown.enter)="activate($event, crumb.level, last)"
                            />
                        }
                    </mosaik-breadcrumb>
                }
            </nav>
        }
    `,
    styles: `
        :host,
        nav {
            display: block;
            min-width: 0;
        }
        [part='compact-path'] {
            display: flex;
            flex-wrap: wrap;
            align-items: center;
            gap: var(--mosaik-layout-space);
            min-width: 0;
        }
        [part='current'],
        [part='context'] {
            min-width: 0;
            overflow-wrap: anywhere;
        }

        // The outlet takes part in the flex layout of the header, so a long path shrinks and truncates instead of
        // running into the search.
        :host(.ngp-page-path-header) {
            display: flex;
            min-width: 0;
            align-items: center;
            gap: calc(var(--mosaik-layout-space) * 2);

            [part='divider'] {
                height: calc(var(--mosaik-layout-space) * 4);
                flex-shrink: 0;
            }

            [part='placeholder'] {
                --skeleton-background-color: var(--mosaik-scheme-highlight);

                min-width: 0;
                flex-shrink: 1;
            }

            [part='path'] {
                flex: 1 1 auto;
                display: flex;
                min-width: 0;
                align-items: center;
            }

            mosaik-breadcrumb {
                --breadcrumb-font-size: var(--mosaik-typography-body1-font-size);
                --breadcrumb-font-line-height: var(--mosaik-typography-body1-line-height);

                min-width: 0;
            }

            mosaik-breadcrumb-item {
                --breadcrumb-item-foreground-color: var(--mosaik-scheme-lowlight);

                // A level that gives way keeps room for its ellipsis, so two separators never meet.
                min-width: calc(var(--mosaik-layout-space) * 4);

                // Middle levels give way first, then the first level; the current page stays readable the longest.
                flex-shrink: 100;

                &:first-of-type {
                    flex-shrink: 10;
                }

                // A later level keeps its separator, which Mosaik draws inside the level and never lets give way, in addition to the
                // room for its ellipsis.
                &:not(:first-of-type) {
                    min-width: calc(var(--breadcrumb-item-separator-size) + var(--breadcrumb-item-gap) + var(--mosaik-layout-space) * 4);
                }

                // Only the label is the link: the separator in front of it takes no pointer and stays outside the focus frame.
                &.is-link {
                    pointer-events: none;

                    &::part(link) {
                        border-radius: var(--mosaik-layout-radius);
                        pointer-events: auto;
                    }

                    &:focus-visible {
                        outline: none;
                    }

                    // Keyboard focus rests on the level, so its label shows the underline that the pointer gets from Mosaik on hover.
                    &:focus-visible::part(link) {
                        outline: calc(var(--mosaik-layout-thickness) * 2) solid var(--mosaik-color-primary-500);
                        outline-offset: var(--mosaik-layout-thickness);
                        text-decoration-line: underline;
                    }
                }

                &[aria-current='page'] {
                    --breadcrumb-item-foreground-color: var(--mosaik-scheme-foreground);

                    min-width: 0;
                    flex-shrink: 1;

                    // The current page may give way down to its separator.
                    &:not(:first-of-type) {
                        min-width: calc(var(--breadcrumb-item-separator-size) + var(--breadcrumb-item-gap));
                    }
                }
            }

            [part='compact-path'] {
                display: flex;
                min-width: 0;
                flex-direction: column;
                flex-wrap: nowrap;
                align-items: stretch;
                gap: 0;
                justify-content: center;
            }

            [part='back'] {
                --button-min-height: 0px;
                --button-height: auto;
                --button-min-width: 0px;
                --button-padding-top: 0px;
                --button-padding-right: 0px;
                --button-padding-bottom: 0px;
                --button-padding-left: 0px;
                --button-gap: calc(var(--mosaik-layout-space) / 2);
                --button-font-family: var(--mosaik-typography-caption-font-family);
                --button-font-size: var(--mosaik-typography-caption-font-size);
                --button-font-line-height: var(--mosaik-typography-caption-line-height);
                --button-font-weight: var(--mosaik-typography-caption-font-weight);
                --button-font-letter-spacing: var(--mosaik-typography-caption-letter-spacing);
                --button-foreground-color: var(--mosaik-scheme-lowlight);

                max-width: 100%;
                align-self: flex-start;
            }

            [part='back-label'],
            [part='context'],
            [part='current'] {
                min-width: 0;
                overflow: hidden;
                overflow-wrap: normal;
                white-space: nowrap;
                text-overflow: ellipsis;
            }

            [part='back-label'],
            [part='context'] {
                font: var(--mosaik-typography-caption);
                color: var(--mosaik-scheme-lowlight);
            }

            [part='current'] {
                font: var(--mosaik-typography-subtitle1);
                color: var(--mosaik-scheme-foreground);

                // Semibold, like the current level of the Mosaik breadcrumb on wide viewports.
                font-weight: 600;
            }
        }
    `,
    host: { '[class.ngp-page-path-header]': 'headerLayout()' },
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PagePathOutletComponent {
    // #region Fields

    private readonly _registry = inject(PagePathRegistry);
    private readonly _animationPlayer = inject(AnimationPlayer, { optional: true });
    private readonly _injector = inject(Injector);
    private readonly _levelElements = viewChildren('levelElement', { read: ElementRef<HTMLElement> });
    private readonly _shownLevels = signal<ReadonlyArray<IPagePathLevel>>([]);
    private readonly _leavingElements = new Map<HTMLElement, ReturnType<AnimationPlayer['playToFinal']>>();
    private _pendingKey: string | undefined;
    private _transition = 0;
    private readonly _breakpoints = inject(BreakpointService, { optional: true });
    private readonly _compactViewport = this._breakpoints
        ? toSignal(this._breakpoints.observe('lt-md'), { initialValue: this._breakpoints.isMatched('lt-md') })
        : signal(false);

    // #endregion

    // #region Ctor

    public constructor() {
        effect(() => {
            if (!this.useMotion()) {
                this._pendingKey = undefined;
                this._transition++;
                this._leavingElements.clear();
                this._shownLevels.set([]);
                return;
            }

            // Declarations can be replaced during a render. Only animate the path that survives it.
            this.levels();
            untracked(() => afterNextRender({ mixedReadWrite: () => this.showLevels() }, { injector: this._injector }));
        });
    }

    // #endregion

    // #region Properties

    /** Accessible name for the page path navigation. */
    public readonly ariaLabel = input('Page path');
    /** Optional accessible label for the compact back action. In header layout, {0} inserts the parent label. */
    public readonly backLabel = input<string>();
    /** Opts into the header layout with truncating breadcrumbs and a two-line compact title. */
    public readonly headerLayout = input(false, { transform: booleanAttribute });
    /** Animates path changes when the application supplies Mosaik's AnimationPlayer. */
    public readonly animateLevels = input(false, { transform: booleanAttribute });
    /** Whether the view is transitioning and needs a loading placeholder. */
    public readonly isLoading = input(false);
    /** Overrides the application's compact breakpoint. */
    public readonly compact = input<boolean | null>(null);
    /** Live levels registered by the active page. */
    public readonly levels = this._registry.levels;
    /** Current page, or null before a page declares a path. */
    public readonly current = computed(() => this.levels().at(-1) ?? null);
    /** Immediate parent of the current page. */
    public readonly parent = computed(() => this.levels().at(-2) ?? null);
    /** Whether only the immediate parent and current page are displayed. */
    public readonly isCompact = computed(() => this.compact() ?? this._compactViewport());

    protected readonly displayedLevels = computed(() => (this.useMotion() ? this._shownLevels() : this.levels()));
    protected readonly trail = computed(() => {
        const levels = this.displayedLevels();
        return levels.map((level, index) => ({
            level,
            key: this.useMotion() || this.headerLayout() ? pathKey(levels.slice(0, index + 1)) : index,
        }));
    });

    private readonly useMotion = computed(() => this.animateLevels() && !!this._animationPlayer && !this.isCompact() && !this.isLoading());

    // #endregion

    // #region Methods

    protected activate(event: Event, level: IPagePathLevel, current = false): void {
        if (current || !level.command?.canExecute()) {
            return;
        }
        event.preventDefault();
        level.command.execute();
    }

    private showLevels(): void {
        const player = this._animationPlayer;
        if (!player || !this.useMotion()) {
            return;
        }
        const levels = this.levels();
        const key = pathKey(levels);
        if (key === this._pendingKey) {
            return;
        }

        const kept = countSharedLevels(this._shownLevels(), levels);
        const elements = this._levelElements().map(({ nativeElement }) => nativeElement);
        const transition = ++this._transition;
        for (const element of elements.slice(0, kept)) {
            if (this._leavingElements.delete(element)) {
                const { opacity, transform } = getComputedStyle(element);
                void player.stopAll(element).then(() => {
                    element.style.opacity = opacity;
                    element.style.transform = transform;
                    return player.playToFinal(element, AnimationPreset.fadeSlideIn, { duration: LEVEL_DURATION });
                });
            }
        }

        const leaving = elements.slice(kept);
        if (leaving.length === 0) {
            this.applyLevels(levels, elements.length === 0 ? 0 : kept, transition);
            return;
        }

        this._pendingKey = key;
        void Promise.all(
            leaving.map((element) => {
                const existing = this._leavingElements.get(element);
                if (existing) {
                    return existing;
                }
                const animation = player.playToFinal(element, AnimationPreset.fadeSlideOut, { duration: LEVEL_DURATION });
                this._leavingElements.set(element, animation);
                return animation;
            }),
        ).then(() => {
            const latest = this.levels();
            if (this.useMotion() && transition === this._transition && pathKey(latest) === key) {
                this.applyLevels(latest, kept, transition);
            }
        });
    }

    private applyLevels(levels: ReadonlyArray<IPagePathLevel>, enteringFrom: number, transition: number): void {
        this._pendingKey = undefined;
        this._leavingElements.clear();
        this._shownLevels.set(levels);

        afterNextRender(
            {
                write: () => {
                    if (transition !== this._transition || !this.useMotion()) {
                        return;
                    }
                    this._levelElements()
                        .slice(enteringFrom)
                        .forEach(({ nativeElement }, index) => {
                            void this._animationPlayer?.play(nativeElement, AnimationPreset.fadeSlideIn, {
                                duration: LEVEL_DURATION,
                                delay: index * LEVEL_STAGGER,
                                fill: 'both',
                            });
                        });
                },
            },
            { injector: this._injector },
        );
    }

    // #endregion
}

function countSharedLevels(shown: ReadonlyArray<IPagePathLevel>, next: ReadonlyArray<IPagePathLevel>): number {
    let index = 0;
    while (index < shown.length && index < next.length && shown[index]?.label === next[index]?.label) {
        index++;
    }
    return index;
}

function pathKey(levels: ReadonlyArray<IPagePathLevel>): string {
    return JSON.stringify(levels.map((level) => level.label));
}
