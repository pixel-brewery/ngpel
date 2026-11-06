// #region Imports

import { TestBed } from '@angular/core/testing';
import { TranslateService } from '@pixel-brewery/mosaik-elements-angular';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { translateIntl } from './translateIntl';

// #endregion

vi.mock('@pixel-brewery/mosaik-elements-angular', () => ({
    TranslateService: class TranslateService {},
}));

class TestIntl {
    // #region Fields

    private readonly _label = 'Fallback label';

    // #endregion

    // #region Ctor

    // #endregion

    // #region Properties

    public get label(): string {
        return this._label;
    }

    // #endregion

    // #region Methods

    // #endregion
}

describe('internationalization translation mapping', () => {
    afterEach(() => {
        TestBed.resetTestingModule();
        vi.restoreAllMocks();
    });

    it('applies a translated value to a getter-only label', () => {
        // arrange
        const translate = vi.fn(() => 'Translated label');
        TestBed.configureTestingModule({
            providers: [{ provide: TranslateService, useValue: { translate } }],
        });

        // act
        const intl = TestBed.runInInjectionContext(() => translateIntl(new TestIntl(), { label: 'loc.test.label' }));

        // assert
        expect(intl.label).toBe('Translated label');
        expect(translate).toHaveBeenCalledWith('loc.test.label');
    });
});
