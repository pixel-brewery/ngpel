// #region Imports

import { signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { AgreementGateComponent } from './AgreementGateComponent';

// #endregion

vi.mock('@pixel-brewery/mosaik-elements-angular', () => ({
    AnchorComponent: class AnchorComponent {},
    BannerComponent: class BannerComponent {},
    BannerSubHeaderComponent: class BannerSubHeaderComponent {},
    ButtonComponent: class ButtonComponent {},
}));

describe('AgreementGateComponent', () => {
    beforeEach(() => TestBed.configureTestingModule({}));

    afterEach(() => {
        TestBed.resetTestingModule();
        vi.restoreAllMocks();
    });

    function create() {
        const isBusy = signal(false);
        const component = TestBed.runInInjectionContext(() => new AgreementGateComponent());
        Object.assign(component, { isBusy });
        const accepted = vi.fn();
        component.accepted.subscribe(accepted);
        TestBed.tick();
        return { component, isBusy, accepted };
    }

    it('does not accept merely from creating the gate', () => {
        const test = create();

        expect(test.accepted).not.toHaveBeenCalled();
    });

    it('emits an explicit acceptance request without an additional checkbox', () => {
        const test = create();

        test.component.requestAcceptance();

        expect(test.accepted).toHaveBeenCalledOnce();
    });

    it('refuses a request while busy and does not auto-submit when the host becomes idle', () => {
        const test = create();
        test.isBusy.set(true);

        test.component.requestAcceptance();
        expect(test.accepted).not.toHaveBeenCalled();
        test.isBusy.set(false);
        TestBed.tick();
        expect(test.accepted).not.toHaveBeenCalled();

        test.component.requestAcceptance();

        expect(test.accepted).toHaveBeenCalledOnce();
    });
});
