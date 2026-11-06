// #region Imports

import { type Signal, ɵresolveComponentResources as resolveComponentResources } from '@angular/core';
import { SIGNAL } from '@angular/core/primitives/signals';
import { TestBed } from '@angular/core/testing';
import { readFile } from 'node:fs/promises';
import { describe, expect, it, vi } from 'vitest';
import { ContentIndicatorNavigationComponent } from './ContentIndicatorNavigationComponent';
import { ContentNavigationContext } from './ContentNavigationContext';

// #endregion

vi.mock('@pixel-brewery/mosaik-elements-angular', async () => {
    const { Component } = await vi.importActual<typeof import('@angular/core')>('@angular/core');

    class TestIndicatorComponent {
        // #region Fields

        public orientation = 'vertical';
        public selected = 0;
        public total = 0;

        // #endregion

        // #region Ctor

        // #endregion

        // #region Properties

        // #endregion

        // #region Methods

        // #endregion
    }

    Component({
        selector: 'mosaik-indicator',
        template: '',
        inputs: ['orientation', 'selected', 'total'],
    })(TestIndicatorComponent);

    class TestTooltipComponent {
        // #region Fields

        public content = '';
        public control: HTMLElement | null = null;
        public placement = 'top';

        // #endregion

        // #region Ctor

        // #endregion

        // #region Properties

        // #endregion

        // #region Methods

        // #endregion
    }

    Component({
        selector: 'mosaik-tooltip',
        template: '',
        inputs: ['content', 'control', 'placement'],
    })(TestTooltipComponent);

    return {
        IndicatorComponent: TestIndicatorComponent,
        TooltipComponent: TestTooltipComponent,
    };
});

describe('Content indicator navigation', () => {
    it('navigates to the destination selected through its domain-specific trigger', async () => {
        // arrange
        await resolveComponentResources(async (resourceUrl) => readFile(new URL(resourceUrl, import.meta.url), 'utf8'));
        const context = new ContentNavigationContext();
        const navigateToDetails = vi.fn();
        context.register({ id: 'summary', label: 'Summary' });
        context.register({ id: 'details', label: 'Details' }, navigateToDetails);
        TestBed.configureTestingModule({
            imports: [ContentIndicatorNavigationComponent],
            providers: [{ provide: ContentNavigationContext, useValue: context }],
        });
        await TestBed.compileComponents();
        const fixture = TestBed.createComponent(ContentIndicatorNavigationComponent);
        setSignalInput(fixture.componentInstance.label, 'Sections');
        setSignalInput(fixture.componentInstance.itemTestIdPrefix, 'lead-section-navigation');
        fixture.detectChanges();
        const detailsTrigger = fixture.nativeElement.querySelector('[test-id="lead-section-navigation-details"]') as HTMLButtonElement;

        // act
        detailsTrigger.click();
        fixture.detectChanges();

        // assert
        expect(navigateToDetails).toHaveBeenCalledOnce();
        expect(context.activeItemId()).toBe('details');
        expect(detailsTrigger.getAttribute('aria-current')).toBe('location');
    });
});

function setSignalInput<T>(inputSignal: Signal<T>, value: T): void {
    const node = (
        inputSignal as Signal<T> & {
            [SIGNAL]: { applyValueToInputSignal(node: unknown, inputValue: T): void };
        }
    )[SIGNAL];
    node.applyValueToInputSignal(node, value);
}
