import { ChangeDetectionStrategy, Component, computed, inject, input, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import {
    BreakpointService,
    BreadcrumbComponent,
    BreadcrumbItemComponent,
    ButtonComponent,
    IconNameDirective,
    SkeletonComponent,
} from '@pixel-brewery/mosaik-elements-angular';
import type { IPagePathLevel } from './IPagePathLevel';
import { PagePathRegistry } from './PagePathRegistry';

/** Renders the current page path as a breadcrumb or a compact parent and title. @public */
@Component({
    selector: 'ngp-page-path-outlet',
    imports: [BreadcrumbComponent, BreadcrumbItemComponent, ButtonComponent, IconNameDirective, SkeletonComponent],
    template: `
        @if (isLoading() || current()) {
            <nav part="path" [attr.aria-label]="ariaLabel()" [attr.aria-busy]="isLoading() || null">
                @if (isLoading()) {
                    <mosaik-skeleton part="placeholder" width="12rem" height="1em" [shimmer]="true" aria-hidden="true" />
                } @else if (isCompact()) {
                    <div part="compact-path">
                        @if (parent(); as parent) {
                            @if (parent.command; as command) {
                                <mosaik-button
                                    part="back"
                                    [label]="parent.label"
                                    [attr.aria-label]="backLabel() ?? parent.label"
                                    [iconName]="'chevron-left'"
                                    [appearance]="'plain'"
                                    [disabled]="!command.canExecute()"
                                    (click)="activate($event, parent)"
                                />
                            } @else {
                                <span part="context">{{ parent.label }}</span>
                            }
                        }
                        <span part="current" aria-current="page">{{ current()?.label }}</span>
                    </div>
                } @else {
                    <mosaik-breadcrumb part="breadcrumb">
                        @for (level of levels(); track $index; let last = $last) {
                            @let command = last ? null : level.command;
                            <mosaik-breadcrumb-item
                                part="level"
                                [label]="level.label"
                                [isActive]="last"
                                [underline]="command ? 'hover' : 'never'"
                                [attr.aria-current]="last ? 'page' : null"
                                [attr.role]="command ? 'link' : null"
                                [attr.aria-disabled]="command && !command.canExecute() ? 'true' : null"
                                [attr.tabindex]="command ? (command.canExecute() ? 0 : -1) : null"
                                (click)="activate($event, level, last)"
                                (keydown.enter)="activate($event, level, last)"
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
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PagePathOutletComponent {
    // #region Fields

    private readonly _registry = inject(PagePathRegistry);
    private readonly _breakpoints = inject(BreakpointService, { optional: true });
    private readonly _compactViewport = this._breakpoints
        ? toSignal(this._breakpoints.observe('lt-md'), { initialValue: this._breakpoints.isMatched('lt-md') })
        : signal(false);

    // #endregion

    // #region Properties

    /** Accessible name for the page path navigation. */
    public readonly ariaLabel = input('Page path');
    /** Optional accessible label for the compact back action. */
    public readonly backLabel = input<string>();
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

    // #endregion

    // #region Methods

    protected activate(event: Event, level: IPagePathLevel, current = false): void {
        if (current || !level.command?.canExecute()) {
            return;
        }
        event.preventDefault();
        level.command.execute();
    }

    // #endregion
}
