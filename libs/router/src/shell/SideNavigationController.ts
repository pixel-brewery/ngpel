// #region Imports

import { computed, DestroyRef, inject, type Signal, signal, type WritableSignal } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { booleanCodec, jsonCodec, type LocalStorageSignal, localStorageSignal } from '@pixel-brewery/ngpel-core/storage';
import type { ISideNavigationController } from './ISideNavigationController';
import type { ISideNavigationControllerConfig } from './ISideNavigationControllerConfig';
import { mediaQuerySignal } from './mediaQuerySignal';

// #endregion

const DEFAULT_CONFIG: Required<ISideNavigationControllerConfig> = {
    navigationStorageKey: 'presentation.isNavOpen',
    navigationCompactStorageKey: 'presentation.navigationIsRail',
    railStorageKey: 'presentation.isRailOpen',
    mobileRailStorageKey: 'presentation.isMobileRailOpen',
    railSplitPositionStorageKey: 'presentation.railSplitPosition',
    mobileMediaQuery: '(max-width: 959.98px)',
    autoOpenMediaQuery: '(min-width: 960px)',
    hasNavigationDataKey: 'hasNav',
    defaultRailSplitPosition: 60,
    minRailSplitPosition: 50,
    maxRailSplitPosition: 70,
};

/**
 * The {@link ISideNavigationController} implementation. Internal: it is reached through
 * {@link createSideNavigationController}, which owns the injection-context contract.
 *
 * @internal
 */
export class SideNavigationController implements ISideNavigationController {
    // #region Fields

    private readonly _config: Required<ISideNavigationControllerConfig>;
    private readonly _router: Router = inject(Router);
    private readonly _route: ActivatedRoute = inject(ActivatedRoute);
    private readonly _isNavigationOpenPreference: LocalStorageSignal<boolean>;
    private readonly _isNavigationCompactPreference: LocalStorageSignal<boolean>;
    private readonly _isDesktopRailOpen: LocalStorageSignal<boolean>;
    private readonly _isMobileRailOpen: LocalStorageSignal<boolean>;
    private readonly _railSplitPositionPreference: LocalStorageSignal<number>;
    private readonly _isNavigationOpenTransient: WritableSignal<boolean | undefined> = signal<boolean | undefined>(undefined);
    private readonly _hasRouteNavigation: WritableSignal<boolean>;
    private readonly _isMobile: Signal<boolean>;
    private readonly _isAutoOpenViewport: Signal<boolean>;
    private readonly _isAutoOpen: Signal<boolean>;
    private readonly _isNavigationOpen: Signal<boolean>;
    private readonly _isNavigationCompact: Signal<boolean>;
    private readonly _isRailOpen: Signal<boolean>;
    private readonly _railSplitPosition: Signal<number>;

    // #endregion

    // #region Ctor

    /**
     * Constructs a new instance of the `SideNavigationController` class. Must be called in an
     * injection context.
     *
     * @param config The configuration overrides.
     */
    public constructor(config?: ISideNavigationControllerConfig) {
        this._config = { ...DEFAULT_CONFIG, ...config };

        this._isNavigationOpenPreference = localStorageSignal(this._config.navigationStorageKey, booleanCodec());
        this._isNavigationCompactPreference = localStorageSignal(this._config.navigationCompactStorageKey, booleanCodec());
        this._isDesktopRailOpen = localStorageSignal(this._config.railStorageKey, booleanCodec());
        this._isMobileRailOpen = localStorageSignal(this._config.mobileRailStorageKey, booleanCodec());
        this._railSplitPositionPreference = localStorageSignal(
            this._config.railSplitPositionStorageKey,
            jsonCodec<number>((candidate): candidate is number => this.isPersistableSplitPosition(candidate)),
        );

        this._isMobile = mediaQuerySignal(this._config.mobileMediaQuery);
        this._isAutoOpenViewport = mediaQuerySignal(this._config.autoOpenMediaQuery);
        this._hasRouteNavigation = signal<boolean>(this.readHasRouteNavigation());
        this._isAutoOpen = computed((): boolean => this._isAutoOpenViewport() && this._hasRouteNavigation());

        this._isNavigationCompact = computed((): boolean => !this._isMobile() && (this._isNavigationCompactPreference() ?? false));
        this._isRailOpen = computed((): boolean => this.activeRailPreference()() ?? false);
        this._railSplitPosition = computed((): number => this._railSplitPositionPreference() ?? this._config.defaultRailSplitPosition);
        this._isNavigationOpen = computed((): boolean => {
            if (!this._isAutoOpen()) {
                return this._isNavigationOpenTransient() ?? false;
            }

            return this._isNavigationOpenPreference() ?? true;
        });

        const subscription = this._router.events.subscribe((event): void => {
            if (!(event instanceof NavigationEnd)) {
                return;
            }

            this._hasRouteNavigation.set(this.readHasRouteNavigation());

            if (this._isMobile() && this._isNavigationOpen()) {
                this._isNavigationOpenTransient.set(false);
            }
        });

        inject(DestroyRef).onDestroy((): void => subscription.unsubscribe());
    }

    // #endregion

    // #region Properties

    /**
     * Whether the navigation sidebar is open.
     *
     * @public
     * @readonly
     */
    public get isNavigationOpen(): Signal<boolean> {
        return this._isNavigationOpen;
    }

    /**
     * Whether the navigation is shown as an icon-only rail.
     *
     * @public
     * @readonly
     */
    public get isNavigationCompact(): Signal<boolean> {
        return this._isNavigationCompact;
    }

    /**
     * Whether the rail panel is open for the current viewport.
     *
     * @public
     * @readonly
     */
    public get isRailOpen(): Signal<boolean> {
        return this._isRailOpen;
    }

    /**
     * The persisted desktop split position, as a percentage.
     *
     * @public
     * @readonly
     */
    public get railSplitPosition(): Signal<number> {
        return this._railSplitPosition;
    }

    /**
     * Whether the shell currently uses its mobile layout.
     *
     * @public
     * @readonly
     */
    public get isMobile(): Signal<boolean> {
        return this._isMobile;
    }

    // #endregion

    // #region Methods

    /**
     * Toggles the navigation sidebar.
     *
     * @public
     */
    public toggleNavigation(): void {
        this.setNavigationOpen(!this._isNavigationOpen());
    }

    /**
     * Opens or closes the navigation sidebar. On a viewport that shows the navigation by default
     * the choice is persisted; where the navigation is an overlay it stays transient, so closing a
     * phone drawer does not hide the desktop sidebar on the next visit.
     *
     * @public
     * @param isOpen The new state.
     */
    public setNavigationOpen(isOpen: boolean): void {
        if (this._isAutoOpen()) {
            this._isNavigationOpenPreference.set(isOpen);

            return;
        }

        this._isNavigationOpenTransient.set(isOpen);
    }

    /**
     * Toggles the navigation between its expanded and its icon-only display.
     *
     * @public
     */
    public toggleNavigationCompact(): void {
        this._isNavigationCompactPreference.set(!(this._isNavigationCompactPreference() ?? false));
    }

    /**
     * Toggles the rail panel of the current viewport.
     *
     * @public
     */
    public toggleRail(): void {
        const preference = this.activeRailPreference();

        preference.set(!(preference() ?? false));
    }

    /**
     * Closes the rail panel of the current viewport.
     *
     * @public
     */
    public closeRail(): void {
        this.activeRailPreference().set(false);
    }

    /**
     * Applies a split position the user dragged to.
     *
     * @public
     * @param position The split position as a percentage of the available width.
     */
    public setRailSplitPosition(position: number): void {
        if (this._isMobile() || !Number.isFinite(position)) {
            return;
        }

        this._isDesktopRailOpen.set(position < 100);

        if (this.isPersistableSplitPosition(position)) {
            this._railSplitPositionPreference.set(position);
        }
    }

    /**
     * The rail preference of the current viewport.
     */
    private activeRailPreference(): LocalStorageSignal<boolean> {
        return this._isMobile() ? this._isMobileRailOpen : this._isDesktopRailOpen;
    }

    /**
     * Reads the `hasNav` flag of the deepest activated route.
     */
    private readHasRouteNavigation(): boolean {
        let route = this._route;

        while (route.firstChild !== null) {
            route = route.firstChild;
        }

        return route.snapshot.data[this._config.hasNavigationDataKey] !== false;
    }

    /**
     * Whether a split position may be persisted; positions outside the bounds are transient drag
     * states such as a fully collapsed rail.
     */
    private isPersistableSplitPosition(candidate: unknown): candidate is number {
        return (
            typeof candidate === 'number' &&
            Number.isFinite(candidate) &&
            candidate >= this._config.minRailSplitPosition &&
            candidate <= this._config.maxRailSplitPosition
        );
    }

    // #endregion
}
