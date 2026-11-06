import { describe, expect, it } from 'vitest';
import { featureKind } from './FeatureKind';

describe('featureKind', () => {
    it('brands the given name without changing its runtime value', () => {
        // Arrange
        const name = 'transcriber';

        // Act
        const kind = featureKind(name);

        // Assert
        expect(kind).toBe('transcriber');
    });

    it('produces distinct kinds for distinct names', () => {
        // Arrange
        const names = ['transcriber', 'telemetry'] as const;

        // Act
        const kinds = names.map((name) => featureKind(name));

        // Assert
        expect(new Set(kinds).size).toBe(2);
    });
});
