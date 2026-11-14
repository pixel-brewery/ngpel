// #region Imports

import { DOCUMENT, NgTemplateOutlet } from '@angular/common';
import {
    AfterContentInit,
    ChangeDetectionStrategy,
    Component,
    ContentChildren,
    computed,
    DestroyRef,
    effect,
    ElementRef,
    ErrorHandler,
    forwardRef,
    inject,
    input,
    QueryList,
    signal,
    untracked,
    viewChild,
    type InputSignal,
    type Signal,
    type WritableSignal,
} from '@angular/core';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import {
    BreakpointService,
    ButtonComponent,
    DRAWER_REF,
    IconNameDirective,
    type IDrawerRef,
    SheetComponent,
    SheetContentComponent,
    ToggleButtonComponent,
    TooltipDirective,
} from '@pixel-brewery/mosaik-elements-angular';
import { CommandDirective } from '@pixel-brewery/ngpel-mvp';
import { command, type Command } from '@pixel-brewery/ngpel-mvp';
import { RailComponentIntl, provideRailComponentIntl } from './RailComponentIntl';
import { RailDrawerController } from '../../services/RailDrawerController';
import type { IRailHost } from './IRailHost';
import { RailContentDirective } from './RailContentDirective';
import { RAIL_HOST } from './RailHostToken';

// #endregion

/**
 * Coordinates a compact action list with one independently declared drawer rail at a time.
 *
 * @public
 */
@Component({
    selector: 'ngp-rail',
    imports: [
        ButtonComponent,
        CommandDirective,
        IconNameDirective,
        NgTemplateOutlet,
        SheetComponent,
        SheetContentComponent,
        ToggleButtonComponent,
        TooltipDirective,
    ],
    template: `
        <div #actionsLayer part="actions" [class.rail-floating-actions]="usesFloatingActions()" [class.hidden]="!isFloating() && activeContentKey() !== null">
            <ng-content select="ngp-rail-actions" />
        </div>
        @if (isFloating()) {
            @if (activeContentKey() !== null) {
                <mosaik-sheet
                    part="sheet"
                    [class.rail-in-drawer-sheet]="usesFloatingActions()"
                    animate.enter="rail-sheet-enter"
                    animate.leave="rail-sheet-exit"
                    [attr.test-id]="usesFloatingActions() ? 'rail-sheet' : null"
                    [style.--sheet-max-width]="usesFloatingActions() ? '100%' : null"
                    [width]="'100%'"
                    [height]="'90dvh'"
                    [snaps]="['90dvh']"
                    [dragMode]="'handle'"
                    [isModal]="true"
                    [hasBackdrop]="true"
                    [closeable]="true"
                    [pressEscapeToClose]="true"
                    [clickOutsideToClose]="true"
                    (closeAttempted)="onSheetCloseAttempted()"
                    (closed)="onSheetClosed()"
                >
                    <mosaik-sheet-content>
                        <ng-container [ngTemplateOutlet]="content" />
                    </mosaik-sheet-content>
                </mosaik-sheet>
            }
        } @else {
            <div [class.hidden]="activeContentKey() === null">
                <ng-container [ngTemplateOutlet]="content" />
            </div>
        }
        <ng-template #content>
            <div
                class="h-full min-h-0 w-full"
                [class.relative]="isAdaptiveDrawer()"
                [class.flex]="!isAdaptiveDrawer()"
                [class.flex-row]="!isAdaptiveDrawer()"
                [class.gap-4]="!isAdaptiveDrawer()"
            >
                @if (isAdaptiveDrawer()) {
                    <div class="absolute right-0 top-0 z-10">
                        <mosaik-button
                            [attr.test-id]="closeTestId() || null"
                            [attr.aria-label]="closeLabel()"
                            [iconName]="'dismiss'"
                            [appearance]="'plain'"
                            [size]="'small'"
                            [ngpCommand]="{ click: backCommand }"
                        />
                    </div>
                } @else {
                    <div class="flex shrink-0 flex-col gap-2">
                        <mosaik-toggle-button
                            [attr.test-id]="(isFloating() ? closeTestId() : backTestId()) || null"
                            [attr.aria-label]="isFloating() ? closeLabel() : backLabel()"
                            [mosaikTooltip]="isFloating() ? closeLabel() : backLabel()"
                            [iconName]="isFloating() ? 'close' : 'arrow-left'"
                            [appearance]="'plain'"
                            [variant]="'neutral'"
                            [size]="'small'"
                            [ngpCommand]="{ click: backCommand }"
                        />
                    </div>
                }
                <div class="min-w-0 flex-1" [class.h-full]="isAdaptiveDrawer()" [class.min-h-0]="isAdaptiveDrawer()">
                    <ng-content select="[ngpRailContent]" />
                </div>
            </div>
        </ng-template>
    `,
    styles: `
        .rail-floating-actions {
            position: absolute;
            inset-inline-end: calc(var(--mosaik-layout-space) * 3);
            bottom: calc(var(--rail-floating-offset, 0px) + var(--mosaik-layout-space) * 3);
            z-index: 20;
        }
        .rail-in-drawer-sheet::part(backdrop) {
            opacity: 1;
            pointer-events: all;
            background: var(--backdrop-background-color);
            backdrop-filter: blur(var(--backdrop-blur));
            -webkit-backdrop-filter: blur(var(--backdrop-blur));
        }
        .rail-in-drawer-sheet.rail-sheet-enter {
            animation: ngp-rail-sheet-fade var(--mosaik-duration-short) ease-out both;
        }
        .rail-in-drawer-sheet.rail-sheet-exit {
            animation: ngp-rail-sheet-fade var(--mosaik-duration-short) ease-in both reverse;
        }
        .rail-in-drawer-sheet.rail-sheet-enter::part(root) {
            animation: ngp-rail-sheet-slide var(--mosaik-duration-short) ease-out both;
        }
        .rail-in-drawer-sheet.rail-sheet-exit::part(root) {
            animation: ngp-rail-sheet-slide var(--mosaik-duration-short) ease-in both reverse;
        }
        @keyframes ngp-rail-sheet-fade {
            from {
                opacity: 0;
            }
            to {
                opacity: 1;
            }
        }
        @keyframes ngp-rail-sheet-slide {
            from {
                transform: translate3d(0, 100%, 0);
            }
            to {
                transform: translate3d(0, 0, 0);
            }
        }
        @media (prefers-reduced-motion: reduce) {
            .rail-in-drawer-sheet.rail-sheet-enter,
            .rail-in-drawer-sheet.rail-sheet-exit,
            .rail-in-drawer-sheet.rail-sheet-enter::part(root),
            .rail-in-drawer-sheet.rail-sheet-exit::part(root) {
                animation-duration: 0.01ms;
            }
        }
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        class: 'block h-full min-h-0 w-full',
    },
    providers: [
        {
            provide: RAIL_HOST,
            useExisting: forwardRef(() => RailComponent),
        },
        provideRailComponentIntl({
            backLabel: 'loc.rail.backLabel',
            closeLabel: 'loc.rail.closeLabel',
        }),
    ],
})
export class RailComponent implements AfterContentInit, IRailHost {
    // #region Fields

    private readonly _destroyRef: DestroyRef = inject(DestroyRef);
    private readonly _document = inject(DOCUMENT);
    private readonly _hostElement = inject(ElementRef<HTMLElement>);
    private readonly _breakpoints = inject(BreakpointService, { optional: true });
    private readonly _compactViewport = this._breakpoints
        ? toSignal(this._breakpoints.observe('lt-md'), { initialValue: this._breakpoints.isMatched('lt-md') })
        : signal(false).asReadonly();
    private readonly _errorHandler = inject(ErrorHandler);
    private readonly _intl: RailComponentIntl = inject(RailComponentIntl, { optional: true }) ?? new RailComponentIntl();
    private readonly _drawerRef: IDrawerRef | null = inject(DRAWER_REF, { optional: true }) as IDrawerRef | null;
    private readonly _drawerController: RailDrawerController | null = this._drawerRef
        ? new RailDrawerController({
              element: this._drawerRef.element,
              readWidth: () => this._drawerRef?.component.width(),
              setWidth: (width) => this._drawerRef?.component.setInput('width', width),
          })
        : null;
    private readonly _activeContentKey: WritableSignal<string | null> = signal<string | null>(null);
    private readonly _sheet = viewChild(SheetComponent);
    private readonly _actionsLayer = viewChild<ElementRef<HTMLElement>>('actionsLayer');
    private readonly _contentRegistrationVersion: WritableSignal<number> = signal(0);
    private readonly _backCommand: Command<void> = command(
        () => this.requestClose(),
        computed(() => this._activeContentKey() !== null),
    );

    // #endregion

    // #region Ctor

    /**
     * Constructs a rail coordinator and restores its drawer when the local rail is destroyed.
     *
     * @public
     */
    public constructor() {
        let wasFloating = this.isFloating();
        effect(() => {
            const floating = this.isFloating();
            if (floating !== wasFloating) {
                wasFloating = floating;
                untracked(() => this.closeContent());
            }
        });
        effect((onCleanup) => {
            const sheet = this._sheet();
            if (!sheet) {
                return;
            }
            let current = true;
            onCleanup(() => {
                current = false;
            });
            const element = sheet.elementRef.nativeElement;
            void Promise.resolve(element.updateComplete)
                .then(() => {
                    if (current && element.isConnected) {
                        return sheet.invoke('open');
                    }
                    return undefined;
                })
                .catch((error: unknown) => {
                    if (current) {
                        this.closeContent();
                        this._errorHandler.handleError(error);
                    }
                });
        });
        effect((onCleanup) => {
            const layer = this._actionsLayer()?.nativeElement;
            if (!this.usesFloatingActions() || !layer) {
                return;
            }
            untracked(() => this._drawerController?.float(layer));
            onCleanup(() => this._drawerController?.dock());
        });
        effect((onCleanup) => {
            const view = this._document.defaultView;
            if (!this.usesFloatingActions() || this._activeContentKey() === null || !view) {
                return;
            }
            const onKeydown = (event: KeyboardEvent): void => this.closeSheetOnEscape(event);
            view.addEventListener('keydown', onKeydown, { capture: true });
            onCleanup(() => view.removeEventListener('keydown', onKeydown, { capture: true }));
        });
        this._destroyRef.onDestroy(() => this._drawerController?.close());
    }

    // #endregion

    // #region Properties

    /**
     * Accessible label and tooltip of the generic return action.
     *
     * @public
     * @readonly
     */
    public readonly backLabel: InputSignal<string> = input(this._intl.backLabel);

    /**
     * Stable automation contract for the generic return action.
     *
     * @public
     * @readonly
     */
    public readonly backTestId: InputSignal<string> = input('');

    /** Presents activated content in a sheet, leaving the host drawer width intact. */
    public readonly floating = input(false);

    /** Uses an adaptive drawer rail with floating actions below the Mosaik medium breakpoint. */
    public readonly layout = input<'standard' | 'adaptive-drawer'>('standard');

    protected readonly isAdaptiveDrawer = computed(() => this.layout() === 'adaptive-drawer');

    /** Current presentation mode, available to participating rail actions. */
    public readonly isFloating: Signal<boolean> = computed(() => (this.isAdaptiveDrawer() ? this._compactViewport() : this.floating()));

    /** Whether the rail gives its column back to the drawer and shows floating action buttons. */
    public readonly usesFloatingActions: Signal<boolean> = computed(() => this.isAdaptiveDrawer() && this.isFloating());

    /** Accessible label of the sheet's close action. */
    public readonly closeLabel = input(this._intl.closeLabel);

    /** Optional automation identifier for the sheet's close action. */
    public readonly closeTestId = input('');

    /**
     * Key of the independently declared content currently visible in the rail.
     *
     * @public
     * @readonly
     */
    public readonly activeContentKey: Signal<string | null> = this._activeContentKey.asReadonly();

    /**
     * Rail contents registered below this local coordinator.
     *
     * @protected
     * @readonly
     */
    @ContentChildren(RailContentDirective, { descendants: true })
    protected contents!: QueryList<RailContentDirective>;

    /**
     * Command that restores the compact action overview.
     *
     * @protected
     * @readonly
     */
    protected get backCommand(): Command<void> {
        return this._backCommand;
    }

    // #endregion

    // #region Methods

    /**
     * Keeps the coordinator consistent when conditionally declared rail content disappears.
     *
     * @public
     */
    public ngAfterContentInit(): void {
        this._contentRegistrationVersion.update((version) => version + 1);
        this.contents.changes.pipe(takeUntilDestroyed(this._destroyRef)).subscribe(() => {
            this._contentRegistrationVersion.update((version) => version + 1);
            const activeContentKey = this._activeContentKey();
            if (activeContentKey !== null && !this.hasContent(activeContentKey)) {
                this.closeContent();
            }
        });
    }

    /**
     * Activates registered content and expands the surrounding drawer rail.
     *
     * @param target - Stable key selected by a rail action.
     * @public
     */
    public activateContent(target: string): void {
        if (!this.hasContent(target) || this._activeContentKey() === target) {
            return;
        }

        this._activeContentKey.set(target);
        if (!this.isFloating()) {
            this._drawerController?.open();
        }
    }

    /**
     * Indicates whether content is currently registered for a key.
     *
     * @param target - Stable content key to inspect.
     * @returns Whether matching content exists.
     * @public
     */
    public hasContent(target: string): boolean {
        this._contentRegistrationVersion();
        return this.contents?.some((content) => content.contentKey === target) ?? false;
    }

    protected onSheetClosed(): void {
        this.closeContent();
    }

    protected onSheetCloseAttempted(): void {
        if (this.usesFloatingActions()) {
            this.closeContent();
        }
    }

    private requestClose(): void {
        const sheet = this._sheet();
        if (!sheet || this.usesFloatingActions()) {
            this.closeContent();
            return;
        }
        void Promise.resolve(sheet.invoke('close')).catch((error: unknown) => this._errorHandler.handleError(error));
    }

    private closeSheetOnEscape(event: KeyboardEvent): void {
        if (event.key !== 'Escape') {
            return;
        }
        const ownPane = this._hostElement.nativeElement.closest('.cdk-overlay-pane');
        const focusedPane = event.composedPath().find((target) => target instanceof Element && target.classList.contains('cdk-overlay-pane'));
        if (focusedPane && focusedPane !== ownPane) {
            return;
        }

        event.preventDefault();
        event.stopPropagation();
        this.closeContent();
    }

    private closeContent(): void {
        if (this._activeContentKey() === null) {
            return;
        }

        this._activeContentKey.set(null);
        this._drawerController?.close();
    }

    // #endregion
}
