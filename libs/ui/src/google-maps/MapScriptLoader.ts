// #region Imports

import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { MAP_CONFIGURATION } from './MapConfigurationToken';
import { MapLoadError } from './MapLoadError';

// #endregion

/**
 * Loads only Google's rendering SDK through its supported script entry point.
 *
 * @public
 */
@Injectable({ providedIn: 'root' })
export class MapScriptLoader {
    // #region Fields

    private static readonly _loads = new WeakMap<Document, Promise<void>>();
    private static readonly _clustererLoads = new WeakMap<Document, Promise<void>>();
    private readonly _document = inject(DOCUMENT);
    private readonly _configuration = inject(MAP_CONFIGURATION, { optional: true });
    private readonly _platformId = inject(PLATFORM_ID);

    // #endregion
    // #region Ctor
    // #endregion
    // #region Properties
    // #endregion
    // #region Methods

    /**
     * Loads the map and marker libraries once per browser document.
     *
     * @returns Completion of the rendering SDK bootstrap.
     * @public
     */
    public async load(): Promise<void> {
        if (!isPlatformBrowser(this._platformId)) throw new MapLoadError('platform');
        const apiKey = this._configuration?.apiKey?.trim();
        if (!apiKey) throw new MapLoadError('configuration');
        const current = MapScriptLoader._loads.get(this._document);
        if (current) return current;

        const view = this._document.defaultView as
            | (Window & {
                  google?: { maps?: { Map?: unknown } };
                  ngpMapReady?: () => void;
              })
            | null;
        if (!view) throw new MapLoadError('platform');
        if (view.google?.maps?.Map) return;

        const url = new URL('https://maps.googleapis.com/maps/api/js');
        url.searchParams.set('key', apiKey);
        url.searchParams.set('v', 'quarterly');
        url.searchParams.set('loading', 'async');
        url.searchParams.set('libraries', 'maps,marker');
        url.searchParams.set('callback', 'ngpMapReady');
        if (this._configuration?.language) url.searchParams.set('language', this._configuration.language);
        if (this._configuration?.region) url.searchParams.set('region', this._configuration.region);

        const script = this._document.createElement('script');
        script.src = url.toString();
        script.async = true;
        script.nonce = this._document.querySelector<HTMLScriptElement>('script[nonce]')?.nonce ?? '';
        const load = new Promise<void>((resolve, reject) => {
            view.ngpMapReady = () => {
                delete view.ngpMapReady;
                resolve();
            };
            script.onerror = () => {
                delete view.ngpMapReady;
                script.remove();
                MapScriptLoader._loads.delete(this._document);
                reject(new MapLoadError('load'));
            };
        });
        MapScriptLoader._loads.set(this._document, load);
        this._document.head.append(script);
        return load;
    }

    /**
     * Prepares the official clustering library for Angular's native cluster overlay.
     *
     * @returns Completion of the rendering SDK and clustering bootstrap.
     * @public
     */
    public async loadMarkerClusterer(): Promise<void> {
        await this.load();
        const view = this._document.defaultView as (Window & { markerClusterer?: typeof import('@googlemaps/markerclusterer') }) | null;
        if (!view) throw new MapLoadError('platform');
        if (view.markerClusterer?.MarkerClusterer) return;
        const current = MapScriptLoader._clustererLoads.get(this._document);
        if (current) return current;

        const load = import('@googlemaps/markerclusterer')
            .then((library) => {
                view.markerClusterer = library;
            })
            .catch(() => {
                MapScriptLoader._clustererLoads.delete(this._document);
                throw new MapLoadError('load');
            });
        MapScriptLoader._clustererLoads.set(this._document, load);
        return load;
    }

    // #endregion
}
