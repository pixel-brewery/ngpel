// #region Imports

import { describe, expect, it } from 'vitest';
import { mapAiRailPromptSubmittedEvent } from './mapAiRailPromptSubmittedEvent';

// #endregion

describe('mapAiRailPromptSubmittedEvent', () => {
    it('maps the prompt value from the Mosaik submission detail', () => {
        const event = new CustomEvent('promptSubmitted', {
            detail: {
                entries: [],
                value: 'Describe the complete draft',
            },
        });

        expect(mapAiRailPromptSubmittedEvent(event)).toBe('Describe the complete draft');
    });
});
