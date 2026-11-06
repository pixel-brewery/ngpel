// #region Imports

import { NgComponentOutlet } from '@angular/common';
import {
    ChangeDetectionStrategy,
    Component,
    computed,
    effect,
    inject,
    Injector,
    input,
    signal,
    type Signal,
    type Type,
    type WritableSignal,
} from '@angular/core';
import { type IViewSlotDefinition, VIEW_SLOT_CONTEXT, ViewSlotRegistry } from '@pixel-brewery/mosaik-elements-angular';
import { ViewSlotAnchorTargetDirective } from '../../directives/view-slot-anchor-target/ViewSlotAnchorTargetDirective';

// #endregion

interface ILoadedViewSlotComponent {
    readonly viewId: string;
    readonly component: Type<unknown>;
}

/**
 * Renders active Mosaik view-slot entries with stable DOM anchors.
 *
 * @public
 */
@Component({
    selector: 'ngp-view-slot-anchor-outlet',
    template: `
        @for (view of displayedViews(); track view.id) {
            <div
                class="flex flex-col scroll-mt-4"
                [class.min-h-0]="fillItems()"
                [class.flex-1]="fillItems()"
                [class.shrink-0]="!fillItems()"
                [attr.id]="view.id"
                [attr.test-id]="'view-slot-' + view.id"
                [ngpViewSlotAnchorTarget]="view.id"
                [ngpViewSlotActiveAnchor]="activeViewId()"
                [ngpViewSlotAnchorRequest]="anchorRequest()"
            >
                @if (getComponent(view.id); as component) {
                    <ng-container *ngComponentOutlet="component; injector: getInjectorForView(view.id)" />
                }
            </div>
        }
    `,
    styles: `
        :host {
            display: flex;
            flex-direction: column;
            flex: 1;
            min-height: 0;
        }
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [NgComponentOutlet, ViewSlotAnchorTargetDirective],
})
export class ViewSlotAnchorOutletComponent<TSelection = unknown> {
    // #region Fields

    private readonly _registry: ViewSlotRegistry;
    private readonly _parentInjector: Injector;
    private readonly _loadedComponents: WritableSignal<Array<ILoadedViewSlotComponent>> = signal([]);
    private readonly _loadingViewId: WritableSignal<string | null> = signal(null);
    private readonly _viewInjectors: Map<string, Injector> = new Map<string, Injector>();

    // #endregion

    // #region Ctor

    /**
     * Constructs a new instance of the `ViewSlotAnchorOutletComponent` class.
     *
     * @public
     */
    public constructor(registry: ViewSlotRegistry = inject(ViewSlotRegistry), parentInjector: Injector = inject(Injector)) {
        this._registry = registry;
        this._parentInjector = parentInjector;
        this.views = computed(() => this._registry.getActiveViews<TSelection>(this.slot(), this.selection)());
        this.displayedViews = computed(() => {
            const views = this.views();
            const visibleIds = this.visibleViewIds();
            const visibleId = this.visibleViewId();

            if (visibleIds !== null) {
                return views.filter((view) => visibleIds.has(view.id));
            }

            if (visibleId === null || visibleId === undefined) {
                return views;
            }

            return views.filter((view) => view.id === visibleId);
        });
        this.isLoading = computed(() => this._loadingViewId() !== null);
        this.loadingViewId = this._loadingViewId.asReadonly();
        this.hasViews = computed(() => this.views().length > 0);

        effect(() => this.loadVisibleComponents());
    }

    // #endregion

    // #region Properties

    /**
     * Slot identifier whose active views should be rendered.
     *
     * @public
     * @readonly
     */
    public readonly slot = input.required<string>();

    /**
     * Selection forwarded to registered view-slot activation predicates.
     *
     * @public
     * @readonly
     */
    public readonly selection = input<TSelection | null>(null);

    /**
     * Active view ID that should be scrolled into view.
     *
     * @public
     * @readonly
     */
    public readonly activeViewId = input<string | null>(null);

    /**
     * When set, only the view with this ID is rendered.
     * All other views remain in the slot registry but are hidden.
     *
     * @public
     * @readonly
     */
    public readonly visibleViewId = input<string | null>(null);

    /**
     * When set, only views whose IDs belong to this set are rendered.
     *
     * @public
     * @readonly
     */
    public readonly visibleViewIds = input<ReadonlySet<string> | null>(null);

    /**
     * Indicates whether each rendered view should fill the available outlet height.
     *
     * @public
     * @readonly
     */
    public readonly fillItems = input(false);

    /**
     * Monotonic request marker used to re-scroll the same active view.
     *
     * @public
     * @readonly
     */
    public readonly anchorRequest = input<number>(0);

    /**
     * Active view definitions in the current slot.
     *
     * @public
     * @readonly
     */
    public readonly views: Signal<Array<IViewSlotDefinition<TSelection>>>;

    /**
     * Views that should actually be rendered.
     *
     * @public
     * @readonly
     */
    public readonly displayedViews: Signal<Array<IViewSlotDefinition<TSelection>>>;

    /**
     * Indicates whether a lazy view component is loading.
     *
     * @public
     * @readonly
     */
    public readonly isLoading: Signal<boolean>;

    /**
     * Identifier of the view currently loading.
     *
     * @public
     * @readonly
     */
    public readonly loadingViewId: Signal<string | null>;

    /**
     * Indicates whether the active slot contains visible views.
     *
     * @public
     * @readonly
     */
    public readonly hasViews: Signal<boolean>;

    // #endregion

    // #region Methods

    /**
     * Gets a stable injector for the rendered view component.
     *
     * @param viewId - View identifier inside the slot.
     * @returns Injector carrying the Mosaik view-slot context.
     * @public
     */
    public getInjectorForView(viewId: string): Injector {
        const key = `${this.slot()}:${viewId}`;
        const existingInjector = this._viewInjectors.get(key);

        if (existingInjector) {
            return existingInjector;
        }

        const injector = Injector.create({
            parent: this._parentInjector,
            providers: [
                {
                    provide: VIEW_SLOT_CONTEXT,
                    useValue: {
                        slotId: this.slot(),
                        viewId,
                        selection: this.selection,
                        isLoading: this.isLoading,
                    },
                },
            ],
        });

        this._viewInjectors.set(key, injector);
        return injector;
    }

    /**
     * Gets the loaded Angular component for a view.
     *
     * @param viewId - View identifier inside the slot.
     * @returns Component type when loaded; otherwise `null`.
     * @public
     */
    public getComponent(viewId: string): Type<unknown> | null {
        return this._loadedComponents().find((loadedComponent) => loadedComponent.viewId === viewId)?.component ?? null;
    }

    private addLoadedComponent(viewId: string, component: Type<unknown>): void {
        if (this._loadedComponents().some((loadedComponent) => loadedComponent.viewId === viewId)) {
            return;
        }

        this._loadedComponents.update((loadedComponents) => [
            ...loadedComponents,
            {
                viewId,
                component,
            },
        ]);
    }

    private getViewDefinition(viewId: string): IViewSlotDefinition<TSelection> | undefined {
        return this.views().find((view) => view.id === viewId);
    }

    private isViewLoaded(viewId: string): boolean {
        return this._loadedComponents().some((loadedComponent) => loadedComponent.viewId === viewId);
    }

    private async loadViewComponent(viewId: string): Promise<void> {
        const view = this.getViewDefinition(viewId);

        if (!view) {
            return;
        }

        if (view.component) {
            this.addLoadedComponent(viewId, view.component);
            return;
        }

        if (!view.loadComponent) {
            return;
        }

        this._loadingViewId.set(viewId);

        try {
            this.addLoadedComponent(viewId, await view.loadComponent());
        } finally {
            this._loadingViewId.set(null);
        }
    }

    private loadVisibleComponents(): void {
        for (const view of this.displayedViews()) {
            if (!this.isViewLoaded(view.id)) {
                void this.loadViewComponent(view.id);
            }
        }
    }

    // #endregion
}
