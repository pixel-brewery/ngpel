import { describe, expect, it } from 'vitest';
import { ContextOverlayUrl } from './ContextOverlayUrl';

const codec = new ContextOverlayUrl((path) => path.startsWith('/app/'));

describe('ContextOverlayUrl', () => {
    it('addresses a nested create surface without changing background filters or encoding', () => {
        // Arrange
        const url = '/app/report?filter=one%20two&team=1&team=2#chart';
        const stack = [
            { key: 'report.detail', id: '42' },
            { key: 'task.new', context: 'report:42' },
        ];

        // Act
        const nested = codec.writeStack(url, stack);

        // Assert
        expect(nested).toBe(
            '/app/report?filter=one%20two&team=1&team=2&overlay=report.detail&overlayId=42&overlay.1=task.new&overlayContext.1=report%3A42#chart',
        );
        expect(codec.parseStack(nested)).toEqual(stack);
        expect(codec.writeStack(nested, [])).toBe(url);
    });

    it.each([
        '//another-host/app/report?overlay=report.detail',
        'https://another-host/app/report?overlay=report.detail',
        '/app/report?overlay=',
        '/app/report?overlay=report.detail&overlay=report.other',
        '/app/report?overlay=Report.Detail',
        '/app/report?overlayId=42',
        '/app/report?overlay=report.detail&overlayId=42&overlayId=43',
        '/app/report?overlay=report.detail&overlayId=',
        '/app/report?overlay=report.detail&overlayId=%2Fother',
        '/app/report?overlay=report.detail&overlayContext=',
        '/app/report?overlay=report.detail&overlayContext=%2Fother',
        '/app/report?overlay.1=task.new',
        '/app/report?overlay=report.detail&overlayContext.1=team%3A7',
        '/app/report?overlay=report.detail&overlay.2=task.new',
        '/app/report?overlay=report.detail&overlay.01=task.new',
        '/app/report?overlay=report.detail&overlay.8=task.new',
    ])('rejects malformed overlay URLs without accepting a partial stack (%s)', (url) => {
        // Act
        const parsed = codec.parseStack(url);

        // Assert
        expect(parsed).toBe('invalid');
    });

    it('ignores overlay parameters and encoded return URLs outside the configured path scope', () => {
        const returnUrl = encodeURIComponent('/app/report?overlay=report.detail');

        // Act
        const stack = codec.parseStack(`/sign-in?overlay=report.detail&returnUrl=${returnUrl}`);

        // Assert
        expect(stack).toEqual([]);
    });

    it('builds a shareable detail link over an existing drawer', () => {
        // Arrange
        const current = '/app/report?filter=one%20two&overlay=report.detail&overlayId=42#chart';

        // Act
        const link = codec.add(current, 'task.detail', '5', 'report:42');

        // Assert
        expect(link).toBe(`${current.split('#')[0]}&overlay.1=task.detail&overlayId.1=5&overlayContext.1=report%3A42#chart`);
    });

    it.each([
        ['/app/report', 'report.detail', '/other'],
        ['/app/report', 'Report.Detail', '42'],
        ['//another-host/app/report', 'report.detail', '42'],
        ['/sign-in', 'report.detail', '42'],
    ])('rejects an unsafe overlay link for %s', (background, key, id) => {
        // Act and assert
        expect(() => codec.add(background, key, id)).toThrow();
    });

    it('removes only the top drawer from a return URL', () => {
        // Arrange
        const current = '/app/report?filter=one%20two&overlay=report.detail&overlayId=42&overlay.1=task.new&overlayContext.1=report%3A42#chart';

        // Act
        const link = codec.remove(current);

        // Assert
        expect(link).toBe('/app/report?filter=one%20two&overlay=report.detail&overlayId=42#chart');
    });
});
