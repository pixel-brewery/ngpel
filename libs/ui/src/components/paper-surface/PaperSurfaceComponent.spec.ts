// #region Imports

import { ɵresolveComponentResources as resolveComponentResources } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { TranslateService } from '@pixel-brewery/mosaik-elements-angular';
import { readFile } from 'node:fs/promises';
import { describe, expect, it, vi } from 'vitest';
import { PaperSurfaceComponent } from './PaperSurfaceComponent';

// #endregion

vi.mock('@pixel-brewery/mosaik-elements-angular', () => ({
    TranslateService: class TranslateService {},
}));

describe('Paper surface', () => {
    describe('responsive document semantics', () => {
        it('renders projected content at paper width with natural height and no inner scrolling', async () => {
            // arrange
            await resolveComponentResources(async (resourceUrl) => readFile(new URL(resourceUrl, import.meta.url), 'utf8'));
            TestBed.configureTestingModule({
                imports: [PaperSurfaceComponent],
                providers: [
                    {
                        provide: TranslateService,
                        useValue: { translate: (_key: string, fallback: string): string => fallback },
                    },
                ],
            });
            await TestBed.compileComponents();
            const fixture = TestBed.createComponent(PaperSurfaceComponent);

            // act
            fixture.detectChanges();

            // assert
            const document = fixture.nativeElement.querySelector('[role="document"]') as HTMLElement | null;
            expect(document?.classList.contains('w-full')).toBe(true);
            expect(document?.classList.contains('max-w-[210mm]')).toBe(true);
            expect(document?.classList.contains('overflow-visible')).toBe(true);
            expect(document?.classList.contains('aspect-[210/297]')).toBe(false);
            expect(document?.classList.contains('overflow-y-auto')).toBe(false);
        });
    });
});
