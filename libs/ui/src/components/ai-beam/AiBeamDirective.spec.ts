// #region Imports

import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { describe, expect, it } from 'vitest';
import { AiBeamDirective } from './AiBeamDirective';

// #endregion

@Component({
    imports: [AiBeamDirective],
    template: '<div *ngpAiBeam data-content>Content</div>',
})
class AiBeamHostComponent {}

@Component({
    imports: [AiBeamDirective],
    template: `<div
        *ngpAiBeam="
            'pulse-outside';
            palette: 'ocean';
            theme: 'auto';
            active: true;
            duration: 2.8;
            strength: 0.8;
            strokeOpacity: 0.9;
            innerOpacity: 0.4;
            bloomOpacity: 0.5
        "
    ></div>`,
})
class AiBeamMicrosyntaxHostComponent {}

describe('AiBeamDirective', () => {
    it('renders the host template inside an AI beam', async () => {
        // Arrange
        TestBed.configureTestingModule({ imports: [AiBeamHostComponent] });
        const fixture = TestBed.createComponent(AiBeamHostComponent);

        // Act
        fixture.detectChanges();
        await fixture.whenStable();

        // Assert
        const beam = (fixture.nativeElement as HTMLElement).querySelector('ngp-ai-beam');
        expect([beam?.getAttribute('data-preset'), beam?.querySelector('[data-content]')?.textContent]).toEqual(['md', 'Content']);
    });

    it('accepts every shorthand key of the microsyntax', async () => {
        // Arrange
        TestBed.configureTestingModule({ imports: [AiBeamMicrosyntaxHostComponent] });
        const fixture = TestBed.createComponent(AiBeamMicrosyntaxHostComponent);

        // Act
        fixture.detectChanges();
        await fixture.whenStable();

        // Assert
        expect((fixture.nativeElement as HTMLElement).querySelector('ngp-ai-beam')).not.toBeNull();
    });
});
