// #region Imports

import { TestBed } from '@angular/core/testing';
import { afterEach, describe, expect, it } from 'vitest';
import { ViewportClearanceService } from './ViewportClearanceService';

// #endregion

describe('ViewportClearanceService', () => {
    afterEach(() => TestBed.resetTestingModule());

    it('keeps a floating surface clear of the widest reserved area along each edge', () => {
        // arrange
        const service = TestBed.inject(ViewportClearanceService);
        const sidePanel = service.reserve('right');
        const transcript = service.reserve('right');
        const dock = service.reserve('bottom');

        // act
        sidePanel.update(420);
        transcript.update(380.4);
        dock.update(84);

        // assert
        expect(service.right()).toBe(420);
        expect(service.bottom()).toBe(84);
    });

    it('frees the space again when a surface closes', () => {
        // arrange
        const service = TestBed.inject(ViewportClearanceService);
        const sidePanel = service.reserve('right');
        sidePanel.update(420);

        // act
        sidePanel.release();

        // assert
        expect(service.right()).toBe(0);
    });

    it('counts only the surfaces of an open modal layer, because everything beneath it is covered', () => {
        // arrange
        const service = TestBed.inject(ViewportClearanceService);
        const portal = document.createElement('main');
        const session = document.createElement('section');
        const sessionDock = document.createElement('div');
        session.append(sessionDock);
        service.reserve('right', portal).update(420);
        service.reserve('bottom', sessionDock).update(84);

        // act
        const closeLayer = service.openLayer(session);

        // assert
        expect(service.right()).toBe(0);
        expect(service.bottom()).toBe(84);

        closeLayer();
        expect(service.right()).toBe(420);
    });

    it('ignores negative or invalid distances', () => {
        // arrange
        const service = TestBed.inject(ViewportClearanceService);
        const dock = service.reserve('bottom');

        // act
        dock.update(-12);

        // assert
        expect(service.bottom()).toBe(0);

        dock.update(Number.NaN);
        expect(service.bottom()).toBe(0);
    });
});
