// #region Imports

import { isPlatformBrowser, NgTemplateOutlet } from '@angular/common';
import {
    ChangeDetectionStrategy,
    Component,
    computed,
    contentChild,
    effect,
    inject,
    Injector,
    input,
    output,
    PLATFORM_ID,
    resource,
    viewChild,
    type ResourceRef,
    type Signal,
} from '@angular/core';
import { GoogleMap } from '@angular/google-maps';
import { ErrorStateComponent, SkeletonComponent } from '@pixel-brewery/mosaik-elements-angular';
import { MapContentDirective } from './MapContentDirective';
import { MapLoadError } from './MapLoadError';
import { MapScriptLoader } from './MapScriptLoader';

// #endregion

/**
 * Composes Angular Google Maps with lazy SDK loading and deferred native overlays.
 *
 * @public
 */
@Component({
    selector: 'ngp-map',
    exportAs: 'ngpMap',
    template: `
        <div
            part="surface"
            class="relative"
            role="region"
            [attr.aria-label]="label()"
            [attr.aria-busy]="sdk.isLoading()"
            [style.height]="height()"
            [style.width]="width()"
        >
            @if (sdk.error()) {
                <mosaik-error-state [icon]="'errorState'" part="error" class="flex h-full items-center justify-center" [header]="errorLabel()" />
            } @else if (sdk.hasValue()) {
                <google-map
                    part="map"
                    [height]="height()"
                    [width]="width()"
                    [options]="options()"
                    [center]="center()!"
                    [zoom]="zoom()!"
                    [mapId]="mapId()"
                    (mapInitialized)="mapInitialized.emit($event)"
                    (mapClick)="mapClick.emit($event)"
                    (authFailure)="authFailure.emit()"
                >
                    @if (map(); as angularMap) {
                        @if (content(); as mapContent) {
                            <ng-container
                                [ngTemplateOutlet]="mapContent.template"
                                [ngTemplateOutletContext]="{ $implicit: angularMap }"
                                [ngTemplateOutletInjector]="contentInjector()"
                            />
                        }
                    }
                </google-map>
            } @else {
                <mosaik-skeleton part="loading" height="100%" width="100%" [shimmer]="true" role="status" [attr.aria-label]="loadingLabel()" />
            }
        </div>
    `,
    styles: `
        :host {
            display: block;
        }
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [ErrorStateComponent, GoogleMap, NgTemplateOutlet, SkeletonComponent],
})
export class MapComponent {
    // #region Fields

    /**
     * Name for this map region, localized by the consuming feature.
     *
     * @public
     * @readonly
     */
    public readonly label = input.required<string>();

    /**
     * Accessible loading announcement, localized by the consuming feature.
     *
     * @public
     * @readonly
     */
    public readonly loadingLabel = input.required<string>();

    /**
     * SDK failure message, localized by the consuming feature.
     *
     * @public
     * @readonly
     */
    public readonly errorLabel = input.required<string>();

    /**
     * Map options, including camera, POI visibility, controls, and map ID.
     *
     * @public
     * @readonly
     */
    public readonly options = input<google.maps.MapOptions>({});

    /**
     * Loads the official clustering library before creating projected cluster overlays.
     *
     * @public
     * @readonly
     */
    public readonly markerClustering = input<boolean>(false);

    /**
     * Camera center; otherwise the options center applies.
     *
     * @public
     * @readonly
     */
    public readonly center = input<google.maps.LatLng | google.maps.LatLngLiteral>();

    /**
     * Camera zoom; otherwise the options zoom applies.
     *
     * @public
     * @readonly
     */
    public readonly zoom = input<number>();

    /**
     * Google Cloud map ID, required for Advanced Markers and immutable after creation.
     *
     * @public
     * @readonly
     */
    public readonly mapId = input<string>();

    /**
     * Reserved CSS height for the loading, failure, and map surface.
     *
     * @public
     * @readonly
     */
    public readonly height = input<string>('400px');

    /**
     * Reserved CSS width for the loading, failure, and map surface.
     *
     * @public
     * @readonly
     */
    public readonly width = input<string>('100%');

    /**
     * Native map instance for SDK capabilities beyond declarative overlays.
     *
     * @public
     * @readonly
     */
    public readonly mapInitialized = output<google.maps.Map>();

    /**
     * Map and POI clicks; POI events preserve their placeId and stop method.
     *
     * @public
     * @readonly
     */
    public readonly mapClick = output<google.maps.MapMouseEvent | google.maps.IconMouseEvent>();

    /**
     * Sanitized SDK bootstrap failure.
     *
     * @public
     * @readonly
     */
    public readonly loadError = output<MapLoadError>();

    /**
     * Google Maps authorization failure, such as invalid API restrictions.
     *
     * @public
     * @readonly
     */
    public readonly authFailure = output<void>();

    protected readonly map = viewChild(GoogleMap);
    protected readonly content = contentChild(MapContentDirective);
    protected readonly sdk: ResourceRef<boolean | undefined>;
    protected readonly contentInjector: Signal<Injector>;

    private readonly _loader = inject(MapScriptLoader);
    private readonly _injector = inject(Injector);
    private readonly _platformId = inject(PLATFORM_ID);

    // #endregion

    // #region Ctor

    /**
     * Loads the SDK on demand and supplies the actual map to deferred overlays.
     *
     * @public
     */
    public constructor() {
        this.sdk = resource({
            params: () => (isPlatformBrowser(this._platformId) ? this.markerClustering() : undefined),
            loader: async ({ params }) => {
                if (params) await this._loader.loadMarkerClusterer();
                else await this._loader.load();
                return true;
            },
        });
        this.contentInjector = computed(() => {
            const map = this.map();
            return map ? Injector.create({ parent: this._injector, providers: [{ provide: GoogleMap, useValue: map }] }) : this._injector;
        });
        effect(() => {
            const error = this.sdk.error();
            if (error) {
                this.loadError.emit(error instanceof MapLoadError ? error : new MapLoadError('load'));
            }
        });
    }

    // #endregion

    // #region Properties
    // #endregion

    // #region Methods
    // #endregion
}
