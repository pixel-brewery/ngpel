// #region Imports

import { describe, expect, it } from 'vitest';
import { toStopEventPropagationEvents } from './toStopEventPropagationEvents';

// #endregion

describe('toStopEventPropagationEvents', () => {
    it('maps the bare attribute onto every supported event', () => {
        // Arrange

        // Act
        const result = toStopEventPropagationEvents('');

        // Assert
        expect(result).toBe(true);
    });

    it('keeps an explicit true', () => {
        // Arrange

        // Act
        const result = toStopEventPropagationEvents(true);

        // Assert
        expect(result).toBe(true);
    });

    it('keeps an explicit false instead of enabling the directive', () => {
        // Arrange

        // Act
        const result = toStopEventPropagationEvents(false);

        // Assert
        expect(result).toBe(false);
    });

    it('keeps a list of event names', () => {
        // Arrange
        const events = ['click'] as const;

        // Act
        const result = toStopEventPropagationEvents(events);

        // Assert
        expect(result).toBe(events);
    });

    it('keeps an empty list instead of enabling the directive', () => {
        // Arrange
        const events = [] as const;

        // Act
        const result = toStopEventPropagationEvents(events);

        // Assert
        expect(result).toBe(events);
    });
});
