// #region Imports

import { Injector, signal } from '@angular/core';
import { describe, expect, it } from 'vitest';
import type { IViewPresenter } from './IViewPresenter';
import { VIEW_PRESENTER } from './VIEW_PRESENTER';

// #endregion

function createPresenter(): IViewPresenter {
    return {
        initialized: signal(false),
        disposed: signal(false),
        isLoading: signal(false),
        initialize: (): void => undefined,
        dispose: (): void => undefined,
    };
}

describe('VIEW_PRESENTER', () => {
    it('resolves the presenter a View provided for it', () => {
        // Arrange
        const presenter = createPresenter();
        const injector = Injector.create({ providers: [{ provide: VIEW_PRESENTER, useValue: presenter }] });

        // Act
        const actual = injector.get(VIEW_PRESENTER);

        // Assert
        expect(actual).toBe(presenter);
    });

    it('fails when no View provided a presenter', () => {
        // Arrange
        const injector = Injector.create({ providers: [] });

        // Act
        const resolve = (): IViewPresenter => injector.get(VIEW_PRESENTER);

        // Assert
        expect(resolve).toThrow();
    });
});
