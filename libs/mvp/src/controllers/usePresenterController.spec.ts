// #region Imports

import { EnvironmentInjector, Injectable } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { describe, expect, it } from 'vitest';
import { ViewPresenter } from '../presenters/ViewPresenter';
import type { IPresenterController } from './IPresenterController';
import type { IPresenterControllerHostRef } from './IPresenterControllerHostRef';
import { usePresenterController } from './usePresenterController';
import type { IViewPresenter } from '../presenters/IViewPresenter';
import type { PresenterControllerFactory } from './PresenterControllerFactory';

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
});
