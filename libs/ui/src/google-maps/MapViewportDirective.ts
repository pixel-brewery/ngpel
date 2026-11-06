// #region Imports

import { Directive, effect, inject, input, output } from '@angular/core';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { GoogleMap } from '@angular/google-maps';
import { startWith } from 'rxjs';

// #endregion

/**
 * Applies the server-provided bounds to the native Angular map after initialization.
 *
 * @public
 */
@Directive({ selector: '[ngpMapViewport]' })
export class MapViewportDirective {
    // #region Fields

    /**
     * Server-provided viewport bounds; null preserves the center and zoom inputs.
     *
     * @public
     * @readonly
     */
    public readonly bounds = input.required<google.maps.LatLngBoundsLiteral | null>({ alias: 'ngpMapViewport' });

    /** Actual visible bounds after the camera finishes moving or zooming. */
    public readonly viewportChanged = output<google.maps.LatLngBounds | null>();

    private readonly _angularMap = inject(GoogleMap);
    private readonly _map = toSignal(this._angularMap.mapInitialized.pipe(startWith(this._angularMap.googleMap)), {
        requireSync: true,
    });

    // #endregion

    // #region Ctor

    /**
     * Reframes when the native map or the server-provided bounds change.
     *
     * @public
     */
    public constructor() {
        effect(() => {
            const map = this._map();
            const bounds = this.bounds();
            if (!map || !bounds) return;
            map.fitBounds(bounds, 32);
        });
        this._angularMap.idle.pipe(takeUntilDestroyed()).subscribe(() => {
            this.viewportChanged.emit(this._angularMap.googleMap?.getBounds() ?? null);
        });
    }

    // #endregion

    // #region Properties
    // #endregion

    // #region Methods
    // #endregion
}
