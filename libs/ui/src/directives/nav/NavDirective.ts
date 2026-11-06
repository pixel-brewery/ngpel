// #region Imports

import { DestroyRef, Directive, ElementRef, HostListener, inject, input, computed, effect } from '@angular/core';
import { Router, UrlTree, NavigationEnd, Event as RouterEvent } from '@angular/router';
import type { INavItem, NavHandle } from '@pixel-brewery/ngpel-router/navigation';
import { IParsedHandle, NavigationManager, parseHandle } from '@pixel-brewery/ngpel-router/navigation';
import { filter } from 'rxjs/operators';

// #endregion

/**
 * Attribute directive to bind a generic {@link INavItem} / handle to `<mosaik-menu-item/>`.
 *
 * - For `route:*` → computes active state and navigates.
 * - For `cmd:` / `ext:` → calls `NavigationManager.execute(item)`.
 *
 * @public
 */
@Directive({
    selector: 'mosaik-menu-item[ngpNav], mosaik-tab-strip-item[ngpNav], mosaik-button[ngpNav]',
})
export class NavDirective {
    // #region Fields

    private readonly _router: Router = inject(Router);
    private readonly _nav: NavigationManager = inject(NavigationManager);
    private readonly _destroyRef: DestroyRef = inject(DestroyRef);
    private readonly _elementRef: ElementRef<HTMLElement> = inject(ElementRef);
    /**
     * Binds a full navigation item.
     */
    public readonly ngpNav = input<INavItem | null>(null);
    /**
     * Binds a raw handle directly (overrides item.handle).
     */
    public readonly ngpNavHandle = input<NavHandle | null>(null);
    /**
     * When true, uses strict path comparison for active state.
     */
    public readonly ngpNavStrictActive = input<boolean>(false);
    private readonly _effectiveHandle = computed<NavHandle | null>(() => {
        const override = this.ngpNavHandle();
        if (override) {
            return override;
        }

        const it = this.ngpNav();
        if (!it) {
            return null;
        }

        if (it.handle) {
            return it.handle as NavHandle;
        }

        return null;
    });
    private readonly _parsed = computed<IParsedHandle | null>(() => {
        const h = this._effectiveHandle();

        return h ? parseHandle(h) : null;
    });
    private readonly _isRoute = computed<boolean>(() => this._parsed()?.scheme === 'route');
    private readonly _tree = computed<UrlTree | null>(() => {
        const p = this._parsed();
        if (!p || p.scheme !== 'route') {
            return null;
        }

        return this._router.createUrlTree([p.path], {
            queryParams: p.query as Record<string, unknown> | undefined,
        });
    });

    // #endregion

    // #region Ctor

    public constructor() {
        const el = this._elementRef.nativeElement;
        el.setAttribute('role', 'link');
        el.setAttribute('tabindex', '0');

        const teardown = effect(() => {
            const isRoute = this._isRoute();
            const tree = this._tree();
            const strict = this.ngpNavStrictActive();

            this.setActive(
                isRoute && tree
                    ? this._router.isActive(tree, {
                          paths: strict ? 'exact' : 'subset',
                          queryParams: strict ? 'exact' : 'subset',
                          fragment: 'ignored',
                          matrixParams: 'ignored',
                      })
                    : false,
            );

            const sub = this._router.events.pipe(filter((e: RouterEvent): e is NavigationEnd => e instanceof NavigationEnd)).subscribe(() => {
                const t = this._tree();
                const r = this._isRoute();
                this.setActive(
                    r && t
                        ? this._router.isActive(t, {
                              paths: strict ? 'exact' : 'subset',
                              queryParams: strict ? 'exact' : 'subset',
                              fragment: 'ignored',
                              matrixParams: 'ignored',
                          })
                        : false,
                );
            });

            this._destroyRef.onDestroy(() => sub.unsubscribe());
        });

        this._destroyRef.onDestroy(() => teardown.destroy());
    }

    // #endregion

    // #region Methods

    /**
     * Updates the active state on the host element.
     * Only sets attributes when active; removes them otherwise.
     */
    private setActive(active: boolean): void {
        const el = this._elementRef.nativeElement;
        if (active) {
            el.classList.add('active');
            el.setAttribute('is-active', '');
        } else {
            el.classList.remove('active');
            el.removeAttribute('is-active');
        }
    }

    /**
     * Click activates navigation or command.
     */
    @HostListener('click', ['$event'])
    protected async onClick(ev: Event): Promise<void> {
        ev.preventDefault();
        ev.stopPropagation();

        const item = this.ngpNav();
        if (item) {
            await this._nav.execute(item);

            return;
        }

        const h = this._effectiveHandle();
        if (!h) {
            return;
        }

        const tmp: INavItem = {
            key: `__tmp__:${h}`,
            label: '',
            handle: h,
        };
        await this._nav.execute(tmp);
    }

    /**
     * Keyboard support (Enter / Space).
     */
    @HostListener('keydown', ['$event'])
    protected async onKeydown(ev: KeyboardEvent): Promise<void> {
        if (ev.code === 'Enter' || ev.code === 'Space') {
            ev.preventDefault();
            await this.onClick(new MouseEvent('click'));
        }
    }

    // #endregion
}
