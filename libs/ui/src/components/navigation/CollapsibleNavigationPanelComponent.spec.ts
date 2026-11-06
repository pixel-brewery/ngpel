import { Component, ElementRef, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import assert from 'node:assert/strict';
import { describe, expect, it, vi } from 'vitest';
import { CollapsibleNavigationPanelComponent } from './CollapsibleNavigationPanelComponent';

vi.mock('@pixel-brewery/mosaik-elements-angular', async () => {
    const angular = await vi.importActual<typeof import('@angular/core')>('@angular/core');

    class ButtonStub {}
    angular.Component({
        selector: 'mosaik-button',
        template: '<ng-content />',
        inputs: ['type', 'appearance', 'size', 'iconSize'],
        host: { tabindex: '0' },
    })(ButtonStub);

    class TitleStub {}
    angular.Component({ selector: 'mosaik-card-title', template: '', inputs: ['text'] })(TitleStub);

    class IconStub {}
    angular.Directive({ selector: '[iconName]', inputs: ['iconName'] })(IconStub);

    class TypographyStub {}
    angular.Directive({ selector: '[mosaikTypography]', inputs: ['mosaikTypography'] })(TypographyStub);

    return {
        BreakpointService: class BreakpointService {},
        ButtonComponent: ButtonStub,
        CardTitleComponent: TitleStub,
        IconNameDirective: IconStub,
        TypographyDirective: TypographyStub,
    };
});

@Component({
    imports: [CollapsibleNavigationPanelComponent],
    template: `
        <ngp-collapsible-navigation-panel #panel>
            <input id="filter" />
            <button ngpCollapsibleNavigationPanelCollapsed>Compact</button>
        </ngp-collapsible-navigation-panel>
        <main [attr.inert]="panel.isOverlayOpen() ? '' : null">Results</main>
    `,
})
class PanelHostComponent {}

describe('CollapsibleNavigationPanelComponent', () => {
    it('releases the adjacent region and keeps expanded content mounted when the scrim is clicked', () => {
        // Arrange
        const { fixture, host, panel } = renderPanel();
        const scrim = host.querySelector<HTMLElement>('[part="scrim"]');
        const filter = host.querySelector<HTMLInputElement>('#filter');
        assert(scrim && filter);
        filter.value = 'Earlier filters';
        expect(host.querySelector('main')?.hasAttribute('inert')).toBe(true);

        // Act
        scrim.click();
        fixture.detectChanges();

        // Assert
        expect(panel.expanded()).toBe(false);
        expect(host.querySelector('[part="scrim"]')).toBeNull();
        expect(host.querySelector('main')?.hasAttribute('inert')).toBe(false);
        expect(host.querySelector('[part="expanded-content"]')?.hasAttribute('inert')).toBe(true);
        expect(host.querySelector('[part="collapsed-content"]')?.hasAttribute('inert')).toBe(false);
        expect(host.querySelector('#filter')).toBe(filter);
        expect(filter.value).toBe('Earlier filters');
    });

    it('returns focus to the toggle when Escape dismisses the overlay', () => {
        // Arrange
        const { fixture, host, panel } = renderPanel();
        const toggle = host.querySelector<HTMLElement>('[part="toggle"]');
        assert(toggle);
        const focus = vi.spyOn(toggle, 'focus');
        Object.assign(panel, { _toggle: signal(new ElementRef(toggle)) });
        const key = new KeyboardEvent('keydown', { key: 'Escape', bubbles: true, cancelable: true });

        // Act
        host.querySelector('#filter')?.dispatchEvent(key);
        fixture.detectChanges();

        // Assert
        expect(key.defaultPrevented).toBe(true);
        expect(panel.isOverlayOpen()).toBe(false);
        expect(focus).toHaveBeenCalledExactlyOnceWith({ preventScroll: true });
    });
});

function renderPanel() {
    const fixture = TestBed.createComponent(PanelHostComponent);
    const panel = fixture.debugElement.query(By.directive(CollapsibleNavigationPanelComponent)).componentInstance as CollapsibleNavigationPanelComponent;
    Object.assign(panel, {
        title: signal('Folders'),
        contentId: signal('folders'),
        expandLabel: signal('Expand folders'),
        collapseLabel: signal('Collapse folders'),
        overlay: signal(true),
    });
    fixture.detectChanges();
    return { fixture, panel, host: fixture.nativeElement as HTMLElement };
}
