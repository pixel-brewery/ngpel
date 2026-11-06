// #region Imports

import { Injector, runInInjectionContext } from '@angular/core';
import { describe, expect, it, vi } from 'vitest';
import type { IViewMentionSource } from '../mentions/IViewMentionSource';
import { ViewMentionRegistry } from '../mentions/ViewMentionRegistry';
import { ViewPresenter } from '../presenters/ViewPresenter';
import { Mentionable } from './Mentionable';

// #endregion

class MentionablePresenter extends Mentionable(ViewPresenter) {
    // #region Methods

    public override getViewMentionSource(): IViewMentionSource {
        return { viewKey: 'orders.list', routePrefix: '/orders', items: () => [] };
    }

    // #endregion
}

class EmptyMentionablePresenter extends Mentionable(ViewPresenter) {
    // #region Methods

    public override getViewMentionSource(): null {
        return null;
    }

    // #endregion
}

describe('Mentionable presenter behavior', () => {
    it('registers the current source when initialized', () => {
        // Arrange
        const register = vi.fn().mockReturnValue(vi.fn());
        const injector = Injector.create({ providers: [{ provide: ViewMentionRegistry, useValue: { register } }] });
        const presenter = runInInjectionContext(injector, () => new MentionablePresenter());

        // Act
        presenter.initialize();

        // Assert
        expect(register).toHaveBeenCalledWith(expect.objectContaining({ viewKey: 'orders.list' }));
        expect(presenter.initialized()).toBe(true);
    });

    it('releases its registration when disposed', () => {
        // Arrange
        const unregister = vi.fn();
        const register = vi.fn().mockReturnValue(unregister);
        const injector = Injector.create({ providers: [{ provide: ViewMentionRegistry, useValue: { register } }] });
        const presenter = runInInjectionContext(injector, () => new MentionablePresenter());
        presenter.initialize();

        // Act
        presenter.dispose();

        // Assert
        expect(unregister).toHaveBeenCalledOnce();
        expect(presenter.disposed()).toBe(true);
    });

    it('replaces an earlier registration when initialized again', () => {
        // Arrange
        const firstUnregister = vi.fn();
        const secondUnregister = vi.fn();
        const register = vi.fn().mockReturnValueOnce(firstUnregister).mockReturnValueOnce(secondUnregister);
        const injector = Injector.create({ providers: [{ provide: ViewMentionRegistry, useValue: { register } }] });
        const presenter = runInInjectionContext(injector, () => new MentionablePresenter());
        presenter.initialize();

        // Act
        presenter.initialize();

        // Assert
        expect(firstUnregister).toHaveBeenCalledOnce();
        expect(secondUnregister).not.toHaveBeenCalled();
        expect(register).toHaveBeenCalledTimes(2);
    });

    it('does not register a presenter without a mention context', () => {
        // Arrange
        const register = vi.fn();
        const injector = Injector.create({ providers: [{ provide: ViewMentionRegistry, useValue: { register } }] });
        const presenter = runInInjectionContext(injector, () => new EmptyMentionablePresenter());

        // Act
        presenter.initialize();

        // Assert
        expect(register).not.toHaveBeenCalled();
    });

    it('does not release the registration again after disposal', () => {
        // Arrange
        const unregister = vi.fn();
        const register = vi.fn().mockReturnValue(unregister);
        const injector = Injector.create({ providers: [{ provide: ViewMentionRegistry, useValue: { register } }] });
        const presenter = runInInjectionContext(injector, () => new MentionablePresenter());
        presenter.initialize();
        presenter.dispose();

        // Act
        presenter.dispose();

        // Assert
        expect(unregister).toHaveBeenCalledOnce();
    });
});
