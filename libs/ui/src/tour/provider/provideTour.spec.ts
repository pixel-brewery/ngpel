// #region Imports

import type { Provider } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { TOUR_BEHAVIORS, TOUR_DEFINITIONS, TourService, type TourDefinitionSource } from '@pixel-brewery/mosaik-elements-angular';
import { type ITourBehaviorContext, type ITourCameraBehaviorConfig, type ITourDefinition } from '@pixel-brewery/mosaik-elements-foundation';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { provideTour } from './provideTour';
import { TourFeatureKinds } from './TourFeatureKinds';
import { withTourDefinitions } from './withTourDefinitions';

// #endregion

vi.mock('@pixel-brewery/mosaik-elements-angular', async () => {
    const { InjectionToken, makeEnvironmentProviders } = await vi.importActual<typeof import('@angular/core')>('@angular/core');
    class MockDialogService {}
    class MockGlobalDomRef {
        public get document(): Document {
            return document;
        }

        public get window(): Window {
            return window;
        }
    }
    class MockTranslateService {
        public translate(key: string): string {
            return key;
        }
    }
    class MockTourService {}
    class MockTourCameraBehavior {
        public readonly config: Readonly<Record<string, unknown>>;

        public constructor(config?: Readonly<Record<string, unknown>>) {
            this.config = config ?? {};
        }
    }
    interface IMockTourFeature {
        readonly behaviorType?: typeof MockTourCameraBehavior;
        provide(): ReadonlyArray<Provider>;
    }
    const definitions = new InjectionToken<ReadonlyArray<unknown>>('MOCK_MOSAIK_TOUR_DEFINITIONS');
    const behaviors = new InjectionToken<ReadonlyArray<typeof MockTourCameraBehavior>>('MOCK_MOSAIK_TOUR_BEHAVIORS');

    return {
        DialogService: MockDialogService,
        GlobalDomRef: MockGlobalDomRef,
        TOUR_BEHAVIORS: behaviors,
        TOUR_DEFINITIONS: definitions,
        TourService: MockTourService,
        TranslateService: MockTranslateService,
        provideTours: (...features: ReadonlyArray<IMockTourFeature>) =>
            makeEnvironmentProviders([
                MockTourService,
                ...features.map((feature) => ({
                    provide: behaviors,
                    useValue: feature.behaviorType,
                    multi: true,
                })),
                ...features.flatMap((feature) => feature.provide()),
            ]),
        withTourCameraBehavior: (config?: Readonly<Record<string, unknown>>): IMockTourFeature => ({
            behaviorType: MockTourCameraBehavior,
            provide: () => [
                {
                    provide: MockTourCameraBehavior,
                    useFactory: () => new MockTourCameraBehavior(config),
                },
            ],
        }),
    };
});

const FIRST_DEFINITION: ITourDefinition = {
    id: 'first-tour',
    steps: [
        {
            id: 'first-step',
            anchorId: 'first-anchor',
            title: 'First step',
            content: 'First content',
        },
    ],
};

const SECOND_DEFINITION: ITourDefinition = {
    id: 'second-tour',
    steps: [
        {
            id: 'second-step',
            anchorId: 'second-anchor',
            title: 'Second step',
            content: 'Second content',
        },
    ],
};

describe('Tour feature composition', () => {
    beforeEach(() => {
        TestBed.resetTestingModule();
    });

    it('combines independently owned definitions with the native tour runtime', () => {
        // arrange
        const firstFeature = withTourDefinitions({
            id: 'first-tour-feature',
            definitions: [FIRST_DEFINITION],
        });
        const secondFeature = withTourDefinitions({
            id: 'second-tour-feature',
            definitions: [SECOND_DEFINITION],
        });
        TestBed.configureTestingModule({
            providers: [provideTour(firstFeature, secondFeature)],
        });

        // act
        const resolved = {
            definitions: TestBed.inject<ReadonlyArray<TourDefinitionSource>>(TOUR_DEFINITIONS),
            service: TestBed.inject(TourService),
        };

        // assert
        expect(resolved.service).toBeInstanceOf(TourService);
        expect(resolved.definitions).toEqual([FIRST_DEFINITION, SECOND_DEFINITION]);
        expect(firstFeature.kind).toBe(TourFeatureKinds.Definition);
        expect(firstFeature.options.multi).toBe(true);
    });

    it('applies one camera behavior to page and runtime-dialog tours', () => {
        // arrange
        TestBed.configureTestingModule({
            providers: [provideTour()],
        });
        const behaviorTypes = TestBed.inject(TOUR_BEHAVIORS);
        const [cameraType] = behaviorTypes;

        if (cameraType === undefined) {
            throw new Error('The tour feature registered no behavior.');
        }

        const camera = TestBed.inject(cameraType) as unknown as {
            readonly config: Readonly<ITourCameraBehaviorConfig>;
        };
        const pageSurface = document.createElement('main');
        const pageTour = document.createElement('div');
        const dialogPortal = document.createElement('div');
        const dialogSurface = document.createElement('mosaik-dialog');
        const dialogTour = document.createElement('div');
        pageSurface.setAttribute('data-mosaik-tour-camera-surface', '');
        document.body.append(pageSurface, pageTour);
        dialogPortal.append(dialogSurface, dialogTour);
        document.body.append(dialogPortal);

        // act
        const resolveSurface = camera.config.surface;

        // assert
        expect(behaviorTypes).toHaveLength(2);
        expect(typeof resolveSurface).toBe('function');
        if (typeof resolveSurface === 'function') {
            expect(resolveSurface(createBehaviorContext(pageTour))).toBe(pageSurface);
            expect(resolveSurface(createBehaviorContext(dialogTour))).toBe(dialogSurface);
        }
        expect(camera.config.scale).toBe(1.16);
        expect(camera.config.duration).toBe(650);
        expect(camera.config.viewportPadding).toBe(40);

        pageSurface.remove();
        pageTour.remove();
        dialogPortal.remove();
    });

    describe('edge cases', () => {
        it('provides the native runtime without optional feature contributions', () => {
            // arrange
            TestBed.configureTestingModule({
                providers: [provideTour()],
            });

            // act
            const service = TestBed.inject(TourService);

            // assert
            expect(service).toBeInstanceOf(TourService);
        });

        it('rejects duplicate feature identifiers before configuring dependency injection', () => {
            // arrange
            const duplicateFeature = withTourDefinitions({
                id: 'duplicate-tour-feature',
                definitions: [FIRST_DEFINITION],
            });

            // act
            const composeDuplicateFeatures = (): unknown => provideTour(duplicateFeature, duplicateFeature);

            // assert
            expect(composeDuplicateFeatures).toThrow("Feature conflict: duplicate id 'duplicate-tour-feature' within kind 'tour-definition'.");
        });

        it('allows a feature to own no definitions without creating invalid providers', () => {
            // arrange
            const emptyFeature = withTourDefinitions({
                id: 'empty-tour-feature',
                definitions: [],
            });

            // act
            const providers = emptyFeature.provide();

            // assert
            expect(providers).toEqual([]);
        });
    });
});

function createBehaviorContext(tour: HTMLElement): ITourBehaviorContext {
    return {
        document,
        tour,
        tourId: 'test-tour',
        updatePosition: () => undefined,
    };
}
