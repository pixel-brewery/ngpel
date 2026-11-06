// #region Imports

import { describe, expect, it } from 'vitest';
import { mapAiRailSelectionChangedEvent } from './mapAiRailSelectionChangedEvent';

// #endregion

describe('mapAiRailSelectionChangedEvent', () => {
    it('maps the value of the item a Mosaik select reports as selected', () => {
        // arrange
        const detail = { oldValue: null, newValue: { value: 'claude-opus' } };

        // act
        const actual = mapAiRailSelectionChangedEvent(detail);

        // assert
        expect(actual).toBe('claude-opus');
    });
});
