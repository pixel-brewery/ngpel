import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { beforeEach, describe, expect, it } from 'vitest';
import { Navigator } from './Navigator';
import { NavigatorJournal } from './NavigatorJournal';
import { provideNavigator } from './provideNavigator';

describe('provideNavigator', () => {
    beforeEach(() => {
        TestBed.resetTestingModule();
    });

    it('registers the navigator together with its journal', () => {
        // Arrange
        TestBed.configureTestingModule({ providers: [provideRouter([]), provideNavigator()] });

        // Act
        const navigator = TestBed.inject(Navigator);

        // Assert
        expect(navigator).toBeInstanceOf(Navigator);
        expect(navigator.journal).toBe(TestBed.inject(NavigatorJournal));
    });

    it('registers nothing without the call', () => {
        // Arrange
        TestBed.configureTestingModule({ providers: [provideRouter([])] });

        // Act
        const navigator = TestBed.inject(Navigator, null);

        // Assert
        expect(navigator).toBeNull();
    });
});
