// #region Imports

import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { OverlayScrollBoundaryDirective } from './OverlayScrollBoundaryDirective';

// #endregion

@Component({
    template: '<div ngpOverlayScrollBoundary><div>Item</div></div>',
    imports: [OverlayScrollBoundaryDirective],
})
class TestHostComponent {}

describe('OverlayScrollBoundaryDirective', () => {
    afterEach(() => TestBed.resetTestingModule());

    it('should keep wheel events away from a document scroll lock without cancelling native scrolling', () => {
        const fixture = TestBed.createComponent(TestHostComponent);
        fixture.detectChanges();
        const host = fixture.nativeElement.firstElementChild as HTMLElement;
        Object.defineProperties(host, {
            scrollHeight: { value: 400 },
            clientHeight: { value: 100 },
        });
        const documentListener = vi.fn();
        document.addEventListener('wheel', documentListener, { capture: true });
        const event = new WheelEvent('wheel', { bubbles: true, cancelable: true });

        host.dispatchEvent(event);

        expect(documentListener).not.toHaveBeenCalled();
        expect(event.defaultPrevented).toBe(false);
        document.removeEventListener('wheel', documentListener, { capture: true });
        fixture.destroy();
    });

    it('should let events from a non-scrollable host continue through the document', () => {
        const fixture = TestBed.createComponent(TestHostComponent);
        fixture.detectChanges();
        const host = fixture.nativeElement.firstElementChild as HTMLElement;
        const documentListener = vi.fn();
        document.addEventListener('wheel', documentListener, { capture: true });

        host.dispatchEvent(new WheelEvent('wheel', { bubbles: true, cancelable: true }));

        expect(documentListener).toHaveBeenCalledOnce();
        document.removeEventListener('wheel', documentListener, { capture: true });
        fixture.destroy();
    });
});
