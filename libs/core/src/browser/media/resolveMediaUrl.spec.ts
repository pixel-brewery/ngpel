import { describe, expect, it } from 'vitest';
import { resolveMediaUrl } from './resolveMediaUrl';

describe('resolveMediaUrl', () => {
    it('resolves root-relative paths against the origin', () => {
        // Arrange
        const origin = 'https://api.example.test';

        // Act
        const resolved = resolveMediaUrl(origin, '/api/v1/users/7/avatar/content?v=1');

        // Assert
        expect(resolved).toBe('https://api.example.test/api/v1/users/7/avatar/content?v=1');
    });

    it('strips trailing slashes from the origin before joining', () => {
        // Arrange
        const origin = 'https://api.example.test///';

        // Act
        const resolved = resolveMediaUrl(origin, '/api/v1/tenants/3/logo/content');

        // Assert
        expect(resolved).toBe('https://api.example.test/api/v1/tenants/3/logo/content');
    });

    it.each([
        ['https://cdn.example.test/avatar.webp', 'https://cdn.example.test/avatar.webp'],
        ['data:image/png;base64,YXZhdGFy', 'data:image/png;base64,YXZhdGFy'],
        ['blob:generated-avatar', 'blob:generated-avatar'],
        ['//cdn.example.test/avatar.webp', '//cdn.example.test/avatar.webp'],
        ['relative/avatar.webp', 'relative/avatar.webp'],
        ['', ''],
        [null, ''],
        [undefined, ''],
    ])('preserves non-backend URL %j', (url, expected) => {
        // Arrange
        const origin = 'https://api.example.test';

        // Act
        const resolved = resolveMediaUrl(origin, url);

        // Assert
        expect(resolved).toBe(expected);
    });

    it('keeps root-relative paths unchanged when the origin is empty', () => {
        // Arrange
        const origin = '';

        // Act
        const resolved = resolveMediaUrl(origin, '/api/v1/tenants/3/logo/content?v=1');

        // Assert
        expect(resolved).toBe('/api/v1/tenants/3/logo/content?v=1');
    });
});
