import type { IContextOverlayTarget } from './IContextOverlayTarget';
import { isContextOverlayKey } from './isContextOverlayKey';

/** Registry of feature-owned overlay targets. @internal */
export class ContextOverlayRegistry {
    // #region Fields

    private readonly _targets = new Map<string, IContextOverlayTarget>();

    // #endregion

    // #region Ctor

    public constructor(targets: ReadonlyArray<IContextOverlayTarget>) {
        for (const target of targets) {
            if (!target || !isContextOverlayKey(target.key) || typeof target.canOpen !== 'function' || typeof target.prepare !== 'function') {
                throw new Error('Invalid contextual overlay target.');
            }
            if (this._targets.has(target.key)) {
                throw new Error(`Duplicate contextual overlay target: "${target.key}".`);
            }
            this._targets.set(target.key, target);
        }
    }

    // #endregion

    // #region Methods

    public resolve(key: string): IContextOverlayTarget | undefined {
        return this._targets.get(key);
    }

    // #endregion
}
