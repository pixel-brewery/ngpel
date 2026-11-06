import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateService } from '@pixel-brewery/mosaik-elements-angular';
import { NEVER } from 'rxjs';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { ExpandableMultilineDirective } from './ExpandableMultilineDirective';
import { MultilineExpansionBoundaryDirective } from './MultilineExpansionBoundaryDirective';

vi.mock('@pixel-brewery/mosaik-elements-angular', () => ({
    TranslateService: class TranslateService {},
}));

@Component({
    imports: [ExpandableMultilineDirective, MultilineExpansionBoundaryDirective],
    template: `
        <div ngpMultilineExpansionBoundary>
            <div
                [ngpExpandableMultiline]="{
                    actionTestId: 'first-expansion-toggle',
                    expandLabel: 'Expand first field',
                    collapseLabel: 'Collapse first field',
                }"
                #first="ngpExpandableMultiline"
            ></div>
            <div
                [ngpExpandableMultiline]="{
                    actionTestId: 'second-expansion-toggle',
                    expandLabel: 'Expand second field',
                    collapseLabel: 'Collapse second field',
                }"
                #second="ngpExpandableMultiline"
            ></div>
            <div ngpExpandableMultiline #localized="ngpExpandableMultiline"></div>
        </div>
    `,
})
class TestHostComponent {}

describe('ExpandableMultilineDirective', () => {
    let fixture: ComponentFixture<TestHostComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [TestHostComponent],
            providers: [
                {
                    provide: TranslateService,
                    useValue: {
                        languageChanged: NEVER,
                        translate: (key: string) => key,
                    },
                },
            ],
        });
        fixture = TestBed.createComponent(TestHostComponent);
        fixture.detectChanges();
    });

    it('provides a keyboard-accessible expansion action with an optional feature configuration', () => {
        const action = getAction('first-expansion-toggle');

        expect(action.getAttribute('aria-label')).toBe('Expand first field');
        expect(action.getAttribute('aria-pressed')).toBe('false');
        expect(action.tabIndex).toBe(0);
    });

    it('uses the shared localized action labels by default', () => {
        const host = fixture.debugElement.children[0]?.children[2]?.nativeElement as HTMLElement;
        const action = host.querySelector('mosaik-button') as HTMLElement;
        const tooltip = host.querySelector('mosaik-tooltip') as HTMLElement & { content: string };

        expect(action.getAttribute('aria-label')).toBe('loc.expandableMultiline.actions.expand');
        expect(tooltip.content).toBe('loc.expandableMultiline.actions.expand');

        action.click();
        fixture.detectChanges();

        expect(action.getAttribute('aria-label')).toBe('loc.expandableMultiline.actions.collapse');
        expect(tooltip.content).toBe('loc.expandableMultiline.actions.collapse');
    });

    it('exposes the current expansion action through a Mosaik tooltip', () => {
        const action = getAction('first-expansion-toggle');
        const tooltip = action.parentElement?.querySelector('mosaik-tooltip') as HTMLElement & {
            content: string;
        };

        expect(tooltip.content).toBe('Expand first field');
        expect(action.hasAttribute('title')).toBe(false);

        action.click();
        fixture.detectChanges();

        expect(tooltip.content).toBe('Collapse first field');
    });

    it('keeps at most one multiline field expanded inside a boundary', () => {
        const directives = getDirectives();

        getAction('first-expansion-toggle').click();
        expect(directives[0]?.isExpanded()).toBe(true);

        getAction('second-expansion-toggle').click();
        expect(directives[0]?.isExpanded()).toBe(false);
        expect(directives[1]?.isExpanded()).toBe(true);
    });

    it('temporarily expands and then restores the Mosaik multiline row limits', () => {
        const action = getAction('first-expansion-toggle');
        const host = action.parentElement as ITestTextBoxElement;
        const shadowRoot = host.attachShadow({ mode: 'open' });
        const editor = document.createElement('div');
        const textarea = document.createElement('textarea');
        editor.className = 'editor';
        editor.style.paddingTop = '10px';
        textarea.style.height = '80px';
        textarea.style.lineHeight = 'normal';
        Object.defineProperty(editor, 'clientHeight', { configurable: true, value: 210 });
        editor.append(textarea);
        shadowRoot.append(editor);
        host.multilineRows = 4;
        host.multilineMaxRows = 8;

        action.click();

        expect(host.multilineRows).toBe(10);
        expect(host.multilineMaxRows).toBe(10);
        expect(textarea.style.height).toBe('200px');

        action.click();

        expect(host.multilineRows).toBe(4);
        expect(host.multilineMaxRows).toBe(8);
        expect(textarea.style.height).toBe('80px');
    });

    it('collapses with Escape and returns focus to its expansion action', () => {
        const action = getAction('first-expansion-toggle');
        const host = action.parentElement as HTMLElement;
        action.click();

        host.dispatchEvent(new KeyboardEvent('keydown', { bubbles: true, key: 'Escape' }));

        expect(getDirectives()[0]?.isExpanded()).toBe(false);
        expect(action.getAttribute('aria-label')).toBe('Expand first field');
        expect(document.activeElement).toBe(action);
    });

    function getAction(testId: string): HTMLElement {
        return fixture.nativeElement.querySelector(`[test-id="${testId}"]`) as HTMLElement;
    }

    function getDirectives(): ExpandableMultilineDirective[] {
        return fixture.debugElement.children[0]?.children.map((child) => child.injector.get(ExpandableMultilineDirective)) ?? [];
    }
});

interface ITestTextBoxElement extends HTMLElement {
    multilineMaxRows: number | null;
    multilineRows: number;
}
