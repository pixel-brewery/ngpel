import { createHash } from 'node:crypto';
import { expect, it } from 'vitest';
import { verifyPublishedIntegrity } from './verify-published-packages.mjs';

it('rejects different tarball bytes even when the package name and version were unchanged', () => {
    const published = Buffer.from('original tarball');
    const downloaded = Buffer.from('altered tarball');
    const integrity = `sha512-${createHash('sha512').update(published).digest('base64')}`;

    expect(() => verifyPublishedIntegrity(downloaded, integrity)).toThrow('does not match the registry integrity');
});
