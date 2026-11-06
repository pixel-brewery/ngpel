import { TestBed } from '@angular/core/testing';
import { afterEach, describe, expect, it } from 'vitest';
import type { ISearchConfig } from './ISearchConfig';
import { SEARCH_CONFIG } from './SEARCH_CONFIG';

describe('SEARCH_CONFIG', () => {
    afterEach(() => {
        TestBed.resetTestingModule();
    });

    it('publishes the configuration passed to the composition root', () => {
        // Arrange
        const config: ISearchConfig = { hotkey: 'meta+k', resultTake: 10 };
        TestBed.configureTestingModule({ providers: [{ provide: SEARCH_CONFIG, useValue: config }] });

        // Act
        const injected = TestBed.inject(SEARCH_CONFIG);

        // Assert
        expect(injected).toBe(config);
    });

    it('is absent when the search capability was never provided', () => {
        // Arrange
        TestBed.configureTestingModule({});

        // Act
        const injected = TestBed.inject(SEARCH_CONFIG, null, { optional: true });

        // Assert
        expect(injected).toBeNull();
    });
});
