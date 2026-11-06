// #region Imports

import { TestBed } from '@angular/core/testing';
import { TranslateService } from '@pixel-brewery/mosaik-elements-angular';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { AiRailComponentIntl, provideAiRailComponentIntl } from './AiRailComponentIntl';

// #endregion

// Mosaik's runtime bundle cannot be loaded outside a browser build, and only the token is needed.
vi.mock('@pixel-brewery/mosaik-elements-angular', () => ({ TranslateService: class TranslateService {} }));

describe('provideAiRailComponentIntl', () => {
    afterEach(() => {
        TestBed.resetTestingModule();
        vi.restoreAllMocks();
    });

    it('serves the built-in English labels when nothing is translated', () => {
        // Arrange
        TestBed.configureTestingModule({ providers: [provideAiRailComponentIntl({})] });

        // Act
        const intl = TestBed.inject(AiRailComponentIntl);

        // Assert
        expect(intl.backLabel).toBe('Back');
    });

    it('replaces a label with the application translation', () => {
        // Arrange
        TestBed.configureTestingModule({
            providers: [{ provide: TranslateService, useValue: { translate: () => 'Zurück' } }, provideAiRailComponentIntl({ backLabel: 'navigation.back' })],
        });

        // Act
        const intl = TestBed.inject(AiRailComponentIntl);

        // Assert
        expect(intl.backLabel).toBe('Zurück');
    });
});
