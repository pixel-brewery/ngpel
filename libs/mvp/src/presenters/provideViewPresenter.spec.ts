// #region Imports

import { Injectable } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { afterEach, describe, expect, it } from 'vitest';
import { provideViewPresenter } from './provideViewPresenter';
import { VIEW_PRESENTER } from './VIEW_PRESENTER';
import { ViewPresenter } from './ViewPresenter';

// #endregion

@Injectable()
class OrderViewPresenter extends ViewPresenter {}

describe('provideViewPresenter', () => {
    afterEach(() => {
        TestBed.resetTestingModule();
    });

    it('binds the given presenter to the view presenter token', () => {
        // Arrange
        TestBed.configureTestingModule({ providers: provideViewPresenter(OrderViewPresenter) });

        // Act
        const actual = TestBed.inject(VIEW_PRESENTER);

        // Assert
        expect(actual).toBeInstanceOf(OrderViewPresenter);
        expect(actual.initialized()).toBe(false);
    });

    it('leaves the token unbound when it was not used', () => {
        // Arrange
        TestBed.configureTestingModule({ providers: [] });

        // Act
        const actual = TestBed.inject(VIEW_PRESENTER, null);

        // Assert
        expect(actual).toBeNull();
    });
});
