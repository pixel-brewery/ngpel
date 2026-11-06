import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { describe, expect, it } from 'vitest';
import { MediaUrlPipe } from './MediaUrlPipe';
import { provideMediaUrls } from './provideMediaUrls';
import { withApiOrigin } from './withApiOrigin';

@Component({
    selector: 'ngp-media-url-probe',
    imports: [MediaUrlPipe],
    template: '{{ url() | ngpMediaUrl }}',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
class MediaUrlProbeComponent {
    public readonly url = signal<string | null>('/api/v1/users/7/avatar/content');
}

describe('MediaUrlPipe', () => {
    it('resolves template bindings under the ngpMediaUrl name', () => {
        // Arrange
        TestBed.configureTestingModule({
            imports: [MediaUrlProbeComponent],
            providers: [provideMediaUrls(withApiOrigin('https://api.example.test'))],
        });
        const fixture = TestBed.createComponent(MediaUrlProbeComponent);

        // Act
        fixture.detectChanges();

        // Assert
        expect((fixture.nativeElement as HTMLElement).textContent?.trim()).toBe('https://api.example.test/api/v1/users/7/avatar/content');
    });

    it.each([null, undefined])('returns an empty string for %j', (value) => {
        // Arrange
        TestBed.configureTestingModule({ providers: [provideMediaUrls(withApiOrigin('https://api.example.test'))] });
        const pipe = TestBed.runInInjectionContext(() => new MediaUrlPipe());

        // Act
        const result = pipe.transform(value);

        // Assert
        expect(result).toBe('');
    });

    it('passes paths through when media URLs are not configured', () => {
        // Arrange
        const pipe = TestBed.runInInjectionContext(() => new MediaUrlPipe());

        // Act
        const result = pipe.transform('/api/v1/avatar');

        // Assert
        expect(result).toBe('/api/v1/avatar');
    });
});
