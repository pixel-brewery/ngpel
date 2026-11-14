// #region Imports

import { NgComponentOutlet } from '@angular/common';
import {
    AfterViewInit,
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    NgZone,
    ErrorHandler,
    Injector,
    OnDestroy,
    computed,
    effect,
    forwardRef,
    inject,
    input,
    signal,
    type Signal,
    type Type,
    viewChild,
    viewChildren,
} from '@angular/core';
import {
    ButtonComponent,
    CardComponent,
    CardContentComponent,
    CardHeaderComponent,
    createTourAccessorTarget,
    FlipComponent,
    FlipToDirective,
    IconNameDirective,
    TOUR_ACCESSOR,
    type ITourAccessor,
    type ITourAccessorTarget,
} from '@pixel-brewery/mosaik-elements-angular';
import type { Appearance, ElevationWeight, Variant } from '@pixel-brewery/mosaik-elements-foundation';
import { resolveDeclarativeTourTargetElements, WIDGET_TOUR_TARGETS } from '@pixel-brewery/ngpel-ui';
import type { IWidgetSize } from '../models/IWidgetSize';
import type { IWidgetViews } from '../models/IWidgetViews';
import { WIDGET_DATA } from '../provider/WIDGET_DATA';
import { WIDGET_SIZE } from '../provider/WIDGET_SIZE';
import type { IWidget } from '../models/IWidget';
import type { IWidgetVisualConfig } from '../models/IWidgetVisualConfig';
import { WIDGET_FLIP } from '../provider/WIDGET_FLIP';

// #endregion

/**
 * Renders a single widget by lazy-loading its front and optional back view.
 *
 * @public
 */
@Component({
    selector: 'ngp-widget',
    template: `
        <mosaik-flip class="widget-flip">
            <mosaik-card [class]="frontCardClass()" [appearance]="frontCardAppearance()" [elevation]="frontCardElevation()" slot="front">
                @if (isFrontHeaderVisible()) {
                    <mosaik-card-header
                        [attr.test-id]="'widget-header-' + configuration().id"
                        [text]="configuration().title()"
                        [subText]="configuration().subTitle?.() ?? ''"
                    >
                        @if (hasBack()) {
                            <mosaik-button
                                slot="suffix"
                                [attr.test-id]="'widget-settings-' + configuration().id"
                                [attr.aria-label]="settingsOpenLabel()"
                                appearance="plain"
                                [iconName]="'gear'"
                                [mosaikFlipTo]="'back'"
                            />
                        }
                    </mosaik-card-header>
                }
                <mosaik-card-content [class]="frontContentClass()">
                    @if (frontComponent(); as component) {
                        <ng-container *ngComponentOutlet="component; injector: childInjector()" />
                    }
                </mosaik-card-content>
            </mosaik-card>

            @if (hasBack()) {
                <mosaik-card [class]="backCardClass()" [appearance]="'default'" [elevation]="'light'" slot="back">
                    <mosaik-card-header [text]="settingsTitle()">
                        <mosaik-button
                            slot="prefix"
                            [attr.test-id]="'widget-settings-back-' + configuration().id"
                            [attr.aria-label]="settingsBackLabel()"
                            appearance="plain"
                            [iconName]="'arrowLeft'"
                            [mosaikFlipTo]="'front'"
                        />
                    </mosaik-card-header>
                    <mosaik-card-content [class]="backContentClass()">
                        @if (backComponent(); as component) {
                            <ng-container *ngComponentOutlet="component; injector: childInjector()" />
                        }
                    </mosaik-card-content>
                </mosaik-card>
            }
        </mosaik-flip>
    `,
    styles: `
        :host {
            display: flex;
            position: relative;
            inline-size: 100%;
            block-size: 100%;

            .widget-flip {
                flex: 1;
                min-inline-size: 0;
                min-block-size: 0;
                block-size: 100%;
            }

            mosaik-card {
                flex: 1;
                min-inline-size: 0;
                block-size: 100%;
            }

            .widget-card-content {
                min-block-size: 0;
                padding: 0;
            }
        }
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [NgComponentOutlet, CardComponent, CardHeaderComponent, CardContentComponent, FlipComponent, FlipToDirective, IconNameDirective, ButtonComponent],
    providers: [
        {
            provide: TOUR_ACCESSOR,
            useExisting: forwardRef(() => WidgetComponent),
        },
    ],
})
export class WidgetComponent implements AfterViewInit, ITourAccessor, OnDestroy {
    // #region Fields

    private readonly _parentInjector = inject(Injector);
    private readonly _errorHandler = inject(ErrorHandler);
    private readonly _hostElementRef: ElementRef<HTMLElement> = inject(ElementRef);
    private readonly _ngZone: NgZone = inject(NgZone);
    private readonly _flip = viewChild(FlipComponent);
    private readonly _componentOutlets = viewChildren(NgComponentOutlet);
    private readonly _frontComponent = signal<Type<unknown> | undefined>(undefined);
    private readonly _backComponent = signal<Type<unknown> | undefined>(undefined);
    private readonly _declarativeTourTargetElements = signal<ReadonlyMap<string, HTMLElement>>(new Map());
    private readonly _surfaceTourTarget = createTourAccessorTarget(computed(() => this._hostElementRef.nativeElement));
    private _componentLoadSequence = 0;
    private _tourTargetObserver: MutationObserver | undefined;

    // #endregion

    // #region Ctor

    public constructor() {
        effect(() => {
            void this.loadComponents(this.configuration().views);
        });
    }

    // #endregion

    // #region Properties

    /**
     * Widget configuration rendered by this shell.
     *
     * @public
     * @readonly
     */
    public readonly configuration = input.required<IWidget>();

    /** Current logical grid size used for adaptive widget presentation. */
    public readonly gridSize = input<IWidgetSize>();

    /** Title displayed on the settings face. */
    public readonly settingsTitle = input('Settings');

    /** Accessible name of the action that opens settings. */
    public readonly settingsOpenLabel = input('Open settings');

    /** Accessible name of the action that returns to the primary view. */
    public readonly settingsBackLabel = input('Back');

    /** Current size, falling back to the contribution's default layout outside a grid. */
    public readonly effectiveGridSize: Signal<IWidgetSize> = computed(() => {
        const configuredSize = this.gridSize();
        const layout = this.configuration().layout;

        return configuredSize ?? { columnSpan: layout.columnSpan.default, rowSpan: layout.rowSpan.default };
    });

    /**
     * Reactive widget and child-view targets available to a consuming tour.
     *
     * @public
     * @readonly
     */
    public readonly targets: Signal<ReadonlyMap<string, ITourAccessorTarget>> = computed(() => {
        const targets = new Map<string, ITourAccessorTarget>([[WIDGET_TOUR_TARGETS.surface, this._surfaceTourTarget]]);

        for (const key of this._declarativeTourTargetElements().keys()) {
            targets.set(key, createTourAccessorTarget(computed(() => this._declarativeTourTargetElements().get(key) ?? null)));
        }

        const frontComponent = this._componentOutlets().at(0)?.componentInstance;

        if (isTourAccessor(frontComponent)) {
            for (const [key, target] of frontComponent.targets()) {
                targets.set(key, target);
            }
        }

        return targets;
    });

    /**
     * Injector providing widget tokens to the lazy outlet component.
     *
     * @public
     * @readonly
     */
    public readonly childInjector: Signal<Injector> = computed(() => {
        const config = this.configuration();

        return Injector.create({
            parent: this._parentInjector,
            providers: [
                { provide: WIDGET_DATA, useValue: config.data ?? { id: config.id } },
                { provide: WIDGET_FLIP, useValue: (side: 'front' | 'back') => this.flipTo(side) },
                { provide: WIDGET_SIZE, useValue: this.effectiveGridSize },
            ],
        });
    });

    /**
     * Indicates whether the widget has a settings side.
     *
     * @public
     * @readonly
     */
    public readonly hasBack: Signal<boolean> = computed(() => !!this.configuration().views.back);

    /**
     * CSS classes applied to the front Mosaik card host.
     *
     * @public
     * @readonly
     */
    public readonly frontCardClass: Signal<string> = computed(() => this.resolveCardClass('front', this.configuration().visual));

    /**
     * CSS classes applied to the front card content host.
     *
     * @public
     * @readonly
     */
    public readonly frontContentClass: Signal<string> = computed(() => this.resolveContentClass(this.configuration().visual));

    /**
     * CSS classes applied to the back Mosaik card host.
     *
     * @public
     * @readonly
     */
    public readonly backCardClass: Signal<string> = computed(() => this.resolveCardClass('back'));

    /**
     * CSS classes applied to the back card content host.
     *
     * @public
     * @readonly
     */
    public readonly backContentClass: Signal<string> = computed(() => this.resolveContentClass());

    /**
     * Mosaik appearance applied to the front card.
     *
     * @public
     * @readonly
     */
    public readonly frontCardAppearance: Signal<Appearance> = computed(() => this.resolveAppearance(this.configuration().visual));

    /**
     * Mosaik elevation of the front card.
     *
     * @public
     * @readonly
     */
    public readonly frontCardElevation: Signal<ElevationWeight> = computed(() => this.configuration().visual?.elevation ?? 'semilight');

    /**
     * Indicates whether the front card header should be rendered.
     *
     * @public
     * @readonly
     */
    public readonly isFrontHeaderVisible: Signal<boolean> = computed(() => this.configuration().visual?.header !== 'hidden');

    /**
     * The lazily resolved front component type.
     *
     * @public
     * @readonly
     */
    public get frontComponent(): Signal<Type<unknown> | undefined> {
        return this._frontComponent.asReadonly();
    }

    /**
     * The lazily resolved back component type.
     *
     * @public
     * @readonly
     */
    public get backComponent(): Signal<Type<unknown> | undefined> {
        return this._backComponent.asReadonly();
    }

    // #endregion

    // #region Methods

    /**
     * Observes lazily and conditionally rendered widget areas marked for guided tours.
     *
     * @public
     */
    public ngAfterViewInit(): void {
        const MutationObserverConstructor = this._hostElementRef.nativeElement.ownerDocument.defaultView?.MutationObserver;

        this.synchronizeDeclarativeTourTargets();

        if (!MutationObserverConstructor) {
            return;
        }

        this._ngZone.runOutsideAngular(() => {
            this._tourTargetObserver = new MutationObserverConstructor(() => this._ngZone.run(() => this.synchronizeDeclarativeTourTargets()));
            this._tourTargetObserver.observe(this._hostElementRef.nativeElement, {
                attributeFilter: ['data-widget-tour-target'],
                attributes: true,
                childList: true,
                subtree: true,
            });
        });
    }

    /**
     * Releases the declarative target observer.
     *
     * @public
     */
    public ngOnDestroy(): void {
        this._componentLoadSequence++;
        this._tourTargetObserver?.disconnect();
    }

    private async loadComponents(views: IWidgetViews): Promise<void> {
        const loadSequence = ++this._componentLoadSequence;
        this._frontComponent.set(undefined);
        this._backComponent.set(undefined);
        this.flipTo('front');

        try {
            const [front, back] = await Promise.all([views.front(), views.back?.()]);
            if (loadSequence === this._componentLoadSequence) {
                this._frontComponent.set(front);
                this._backComponent.set(back);
            }
        } catch (error) {
            if (loadSequence === this._componentLoadSequence) {
                this._errorHandler.handleError(error);
            }
        }
    }

    private flipTo(side: 'front' | 'back'): void {
        this._flip()?.setInput('side', side);
    }

    private synchronizeDeclarativeTourTargets(): void {
        const targetElements = resolveDeclarativeTourTargetElements(this._hostElementRef.nativeElement, 'data-widget-tour-target');

        const currentTargetElements = this._declarativeTourTargetElements();
        const unchanged =
            currentTargetElements.size === targetElements.size &&
            Array.from(targetElements).every(([key, element]) => currentTargetElements.get(key) === element);

        if (!unchanged) {
            this._declarativeTourTargetElements.set(targetElements);
        }
    }

    private resolveCardClass(side: 'back' | 'front', visual?: IWidgetVisualConfig): string {
        const appearance = this.resolveAppearance(visual);
        const variant = this.resolveVariant(visual);
        const headerClass = visual?.header === 'hidden' ? ' widget-card--header-hidden' : '';

        return `widget-card widget-card--${side} widget-card--appearance-${appearance} widget-card--variant-${variant}${headerClass}`;
    }

    private resolveContentClass(visual?: IWidgetVisualConfig): string {
        return visual?.header === 'hidden' ? 'widget-card-content widget-card-content--full-height' : 'widget-card-content';
    }

    private resolveAppearance(visual?: IWidgetVisualConfig): Appearance {
        return visual?.appearance ?? 'default';
    }

    private resolveVariant(visual?: IWidgetVisualConfig): Variant {
        return visual?.variant ?? 'default';
    }

    // #endregion
}

function isTourAccessor(value: unknown): value is ITourAccessor {
    return typeof value === 'object' && value !== null && 'targets' in value && typeof value.targets === 'function';
}
