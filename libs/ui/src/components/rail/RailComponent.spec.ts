// #region Imports

import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { TranslateService } from '@pixel-brewery/mosaik-elements-angular';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { RailComponent } from './RailComponent';
import { RailContentDirective } from './RailContentDirective';

// #endregion

// Mosaik's runtime bundle cannot be loaded outside a browser build, so the controls the rail
// composes are replaced by markup-only stands-in with the same selectors and inputs.
vi.mock('@pixel-brewery/mosaik-elements-angular', async () => {
    const angular = await vi.importActual<typeof import('@angular/core')>('@angular/core');

    class ToggleButtonStub {}
    angular.Component({
        selector: 'mosaik-toggle-button',
        template: '<ng-content />',
        inputs: ['appearance', 'command', 'size', 'variant'],
    })(ToggleButtonStub);

    class IconNameStub {}
    angular.Directive({ selector: '[iconName]', inputs: ['iconName'] })(IconNameStub);

    class TooltipStub {}
    angular.Directive({ selector: '[mosaikTooltip]', inputs: ['mosaikTooltip'] })(TooltipStub);

    return {
        DialogService: class DialogService {},
        DRAWER_REF: new angular.InjectionToken('DRAWER_REF'),
        GlobalDomRef: class GlobalDomRef {},
        IconNameDirective: IconNameStub,
        provideGlobalDom: () => [],
        ToastService: class ToastService {},
        ToggleButtonComponent: ToggleButtonStub,
        TooltipDirective: TooltipStub,
        TranslateService: class TranslateService {},
    };
});

@Component({
    imports: [RailComponent, RailContentDirective],
    template: `
        <ngp-rail>
            <div ngpRailContent="ai" test-id="ai-content">AI</div>
            <div ngpRailContent="tour" test-id="tour-content">Tour</div>
        </ngp-rail>
    `,
})
class RailHostComponent {}

describe('RailComponent', () => {
    let rail: RailComponent;
    let host: HTMLElement;
    let detectChanges: () => void;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [RailHostComponent],
            providers: [{ provide: TranslateService, useValue: { translate: (_key: string, fallback: string): string => fallback } }],
        });

        const fixture = TestBed.createComponent(RailHostComponent);
        fixture.detectChanges();
        detectChanges = () => fixture.detectChanges();
        host = fixture.nativeElement as HTMLElement;
        rail = fixture.debugElement.query(By.directive(RailComponent)).componentInstance as RailComponent;
    });

    it('starts in the action state, with no content selected', () => {
        // Arrange
        // Act
        const activeContentKey = rail.activeContentKey();

        // Assert
        expect(activeContentKey).toBeNull();
    });

    it('registers every independently declared content by its key', () => {
        // Arrange
        // Act
        const registered = ['ai', 'tour', 'settings'].map((key) => rail.hasContent(key));

        // Assert
        expect(registered).toEqual([true, true, false]);
    });

    it('shows exactly the activated content and hides the others', () => {
        // Arrange
        // Act
        rail.activateContent('ai');
        detectChanges();

        // Assert
        expect([
            rail.activeContentKey(),
            (host.querySelector('[test-id="ai-content"]') as HTMLElement).hidden,
            (host.querySelector('[test-id="tour-content"]') as HTMLElement).hidden,
        ]).toEqual(['ai', false, true]);
    });

    it('returns to the action state when the back command runs', () => {
        // Arrange
        rail.activateContent('ai');
        detectChanges();
        const { backCommand } = rail as unknown as { readonly backCommand: { execute(parameter: void): void } };

        // Act
        backCommand.execute(undefined);
        detectChanges();

        // Assert
        expect(rail.activeContentKey()).toBeNull();
    });
});
