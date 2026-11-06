// #region Imports

import { Component, EnvironmentInjector, inject, Injectable, InjectionToken } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { describe, expect, it } from 'vitest';
import { ViewPresenter } from '../presenters/ViewPresenter';
import type { IPresenterController } from './IPresenterController';
import type { IPresenterControllerHostRef } from './IPresenterControllerHostRef';
import { usePresenterController } from './usePresenterController';
import type { IViewPresenter } from '../presenters/IViewPresenter';
import type { PresenterControllerFactory } from './PresenterControllerFactory';
import { provideViewPresenter } from '../presenters/provideViewPresenter';
import { View } from '../views/View';

// #endregion

/** Records the lifecycle hooks the host presenter drives. */
class RecordingController<TPresenter extends IViewPresenter = IViewPresenter> implements IPresenterController<TPresenter> {
    public readonly connections: Array<string> = [];

    public constructor(public readonly host: IPresenterControllerHostRef<TPresenter>) {}

    public presenterConnected(): void {
        this.connections.push('connected');
    }

    public presenterDisconnected(): void {
        this.connections.push('disconnected');
    }
}

@Injectable()
class HostViewPresenter extends ViewPresenter {
    public readonly controller = usePresenterController(RecordingController);
}

class SpecificViewPresenter extends ViewPresenter {
    public readonly context = 'specific';
}

class SpecificController implements IPresenterController<SpecificViewPresenter> {
    public constructor(public readonly host: IPresenterControllerHostRef<SpecificViewPresenter>) {}
}

const SCOPED_CONTEXT = new InjectionToken<string>('SCOPED_CONTEXT');

@Injectable()
class ScopedViewPresenter extends ViewPresenter {
    public readonly controller = usePresenterController((host) => ({
        host,
        constructorContext: inject(SCOPED_CONTEXT),
        hostContext: host.injector.get(SCOPED_CONTEXT),
        presenterDisconnected: (): void => {
            this.disconnections += 1;
        },
    }));

    public disconnections = 0;
}

@Component({
    selector: 'ngp-scoped-presenter-view',
    template: '',
    providers: [provideViewPresenter(ScopedViewPresenter), { provide: SCOPED_CONTEXT, useValue: 'scoped' }],
})
class ScopedPresenterView extends View<ScopedViewPresenter> {}

describe('usePresenterController', () => {
    it('connects the controller to the presenter that created it', () => {
        // Arrange
        TestBed.configureTestingModule({ providers: [HostViewPresenter] });

        // Act
        const presenter = TestBed.inject(HostViewPresenter);

        // Assert
        expect(presenter.controller.connections).toEqual(['connected']);
    });

    it('hands the presenter injector to the controller', () => {
        // Arrange
        TestBed.configureTestingModule({ providers: [HostViewPresenter] });

        // Act
        const presenter = TestBed.inject(HostViewPresenter);

        // Assert
        expect(presenter.controller.host.injector).toBe(TestBed.inject(EnvironmentInjector));
    });

    it('retains the original presenter context alias', () => {
        // Arrange
        TestBed.configureTestingModule({ providers: [HostViewPresenter] });

        // Act
        const presenter = TestBed.inject(HostViewPresenter);

        // Assert
        expect(presenter.controller.host.presenter).toBe(presenter.controller.host.injector);
    });

    it('accepts the original presenter and controller type parameters', () => {
        // Arrange
        const factory: PresenterControllerFactory<HostViewPresenter, RecordingController<HostViewPresenter>> = (host) => new RecordingController(host);

        // Act
        const controller = TestBed.runInInjectionContext(() => usePresenterController<HostViewPresenter, RecordingController<HostViewPresenter>>(factory));

        // Assert
        expect(controller.connections).toEqual(['connected']);
        expect(controller.host.injector).toBe(TestBed.inject(EnvironmentInjector));
    });

    it('accepts the controller-only factory type parameter', () => {
        // Arrange
        const factory: PresenterControllerFactory<RecordingController> = RecordingController;

        // Act
        const controller = TestBed.runInInjectionContext(() => usePresenterController<RecordingController>(factory));

        // Assert
        expect(controller.connections).toEqual(['connected']);
    });

    it('infers the concrete controller from an original generic host constructor', () => {
        // Arrange
        const factory = SpecificController;

        // Act
        const controller: SpecificController = TestBed.runInInjectionContext(() => usePresenterController(factory));

        // Assert
        expect(controller).toBeInstanceOf(SpecificController);
    });

    it('infers the concrete controller from an original generic host factory', () => {
        // Arrange
        const factory = (host: IPresenterControllerHostRef<SpecificViewPresenter>): SpecificController => new SpecificController(host);

        // Act
        const controller: SpecificController = TestBed.runInInjectionContext(() => usePresenterController(factory));

        // Assert
        expect(controller).toBeInstanceOf(SpecificController);
    });

    it('disconnects the controller when the owning injector is destroyed', () => {
        // Arrange
        TestBed.configureTestingModule({ providers: [HostViewPresenter] });
        const presenter = TestBed.inject(HostViewPresenter);

        // Act
        TestBed.resetTestingModule();

        // Assert
        expect(presenter.controller.connections).toEqual(['connected', 'disconnected']);
    });

    it('resolves collaborators from the actual View presenter scope', () => {
        // Arrange
        TestBed.configureTestingModule({ imports: [ScopedPresenterView] });

        // Act
        const fixture = TestBed.createComponent(ScopedPresenterView);

        // Assert
        expect(fixture.componentInstance.presenter.controller).toMatchObject({ constructorContext: 'scoped', hostContext: 'scoped' });
    });

    it('disconnects only controllers of the View that was destroyed', () => {
        // Arrange
        TestBed.configureTestingModule({ imports: [ScopedPresenterView] });
        const first = TestBed.createComponent(ScopedPresenterView);
        const firstPresenter = first.componentInstance.presenter;
        const secondPresenter = TestBed.createComponent(ScopedPresenterView).componentInstance.presenter;

        // Act
        first.destroy();

        // Assert
        expect(firstPresenter.disconnections).toBe(1);
        expect(secondPresenter.disconnections).toBe(0);
    });
});
