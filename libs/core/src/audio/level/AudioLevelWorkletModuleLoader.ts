// #region Imports

import { DOCUMENT, inject, Injectable } from '@angular/core';
import { AUDIO_LEVEL_WORKLET_SOURCE } from './AUDIO_LEVEL_WORKLET_SOURCE';

// #endregion

/**
 * DI token and strategy for registering the level processor in one Web Audio context.
 * By default the browser loads a temporary blob URL. Hosts can provide a loader for a static
 * {@link AUDIO_LEVEL_WORKLET_SOURCE} asset under their content security policy.
 *
 * @public
 */
@Injectable({ providedIn: 'root', useFactory: () => new BrowserAudioLevelWorkletModuleLoader() })
export abstract class AudioLevelWorkletModuleLoader {
    // #region Methods

    /** Registers the level processor before the monitor connects the graph. */
    public abstract load(context: AudioContext): Promise<void>;

    // #endregion
}

class BrowserAudioLevelWorkletModuleLoader extends AudioLevelWorkletModuleLoader {
    // #region Fields

    private readonly _document = inject(DOCUMENT);

    // #endregion

    // #region Methods

    public override async load(context: AudioContext): Promise<void> {
        const view = this._document.defaultView;

        if (!context.audioWorklet?.addModule || typeof view?.URL?.createObjectURL !== 'function') {
            throw new Error('AudioWorklet module loading is unavailable.');
        }

        const url = view.URL.createObjectURL(new view.Blob([AUDIO_LEVEL_WORKLET_SOURCE], { type: 'text/javascript' }));

        try {
            await context.audioWorklet.addModule(url);
        } finally {
            view.URL.revokeObjectURL(url);
        }
    }

    // #endregion
}
