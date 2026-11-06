// #region Imports

import { Injectable, signal, type Signal } from '@angular/core';
import type { IPrimaryLegalAction } from './IPrimaryLegalAction';

// #endregion

/**
 * Route-scoped bridge through which routed content can expose one prominent
 * legal action without depending on its surrounding shell.
 *
 * @public
 */
@Injectable()
export class PrimaryLegalActionContext {
    // #region Fields

    private readonly _action = signal<IPrimaryLegalAction | null>(null);
    private readonly _registrations = new Map<number, IPrimaryLegalAction>();
    private _registrationSequence = 0;

    // #endregion

    // #region Ctor
    // #endregion

    // #region Properties

    public get action(): Signal<IPrimaryLegalAction | null> {
        return this._action.asReadonly();
    }

    // #endregion

    // #region Methods

    public register(action: IPrimaryLegalAction): () => void {
        const normalized = this.normalize(action);
        const registrationSequence = ++this._registrationSequence;
        this._registrations.set(registrationSequence, normalized);
        this.publishLatestRegistration();

        let isRegistered = true;
        return (): void => {
            if (!isRegistered) {
                return;
            }

            isRegistered = false;
            this._registrations.delete(registrationSequence);
            this.publishLatestRegistration();
        };
    }

    private normalize(action: IPrimaryLegalAction): IPrimaryLegalAction {
        const label = action.label.trim();
        const url = action.url.trim();
        if (label.length === 0) {
            throw new Error('A primary legal action requires a label.');
        }
        if (!/^\/[A-Za-z0-9/_:.-]+$/u.test(url) || url.startsWith('//')) {
            throw new Error('A primary legal action requires a safe same-origin path.');
        }
        return { label, url };
    }

    private publishLatestRegistration(): void {
        const registrations = Array.from(this._registrations.values());
        this._action.set(registrations.at(-1) ?? null);
    }

    // #endregion
}
