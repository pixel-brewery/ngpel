// #region Imports
import { expect, test } from 'vitest';
import { readReleaseMetadata } from './readReleaseMetadata.mjs';
// #endregion

const record = { source: 'a'.repeat(40), candidate: 'b'.repeat(40), version: '0.0.31', runId: 301 };

test('reads only a complete immutable release record', () => {
    // Arrange
    const body = JSON.stringify(record);
    // Act
    const result = readReleaseMetadata(body);
    // Assert
    expect(result).toEqual(record);
    expect(Object.isFrozen(result)).toBe(true);
});

for (const invalid of [
    null,
    [],
    {},
    { ...record, source: [record.source] },
    { ...record, candidate: record.source },
    { ...record, runId: '301' },
    { ...record, version: '0.0.31-next.0' },
    { ...record, extra: 'untrusted' },
]) {
    test(`rejects a malformed release record ${JSON.stringify(invalid)}`, () => {
        // Arrange
        const body = JSON.stringify(invalid);
        // Act
        const result = readReleaseMetadata(body);
        // Assert
        expect(result).toBeUndefined();
    });
}
