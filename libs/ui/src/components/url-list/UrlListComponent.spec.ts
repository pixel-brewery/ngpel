// #region Imports

import { signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { form, type FieldTree } from '@angular/forms/signals';
import { By } from '@angular/platform-browser';
import { CompoundComponent, FormFieldDirective } from '@pixel-brewery/mosaik-elements-angular';
import type { CompoundItemElement } from '@pixel-brewery/mosaik-elements-foundation';
import { afterEach, describe, expect, it, vi } from 'vitest';
import type { IUrlFormData } from './IUrlFormData';
import type { IUrlListLabels } from './IUrlListLabels';
import { UrlListComponent } from './UrlListComponent';

// #endregion

vi.mock('@pixel-brewery/mosaik-elements-angular', async () => {
    const angular = await vi.importActual<typeof import('@angular/core')>('@angular/core');
    const component = (selector: string, inputs: string[] = []) => angular.Component({ selector, template: '<ng-content />', inputs })(class {});

    return {
        AnchorComponent: component('mosaik-anchor', ['href', 'label', 'target', 'rel']),
        CompoundComponent: angular.Component({
            selector: 'mosaik-compound',
            template: '<ng-content />',
            inputs: [
                'layout',
                'viewMode',
                'header',
                'description',
                'controlsInHeader',
                'addLabel',
                'deleteLabel',
                'previousLabel',
                'nextLabel',
                'canAdd',
                'canDelete',
                'selectLastOnCollectionGrowth',
            ],
            outputs: ['addRequested', 'deleteRequested', 'selectedIndexChanged'],
        })(
            class {
                readonly addRequested = new angular.EventEmitter<void>();
                readonly deleteRequested = new angular.EventEmitter<{ readonly index: number }>();
                readonly selectedIndexChanged = new angular.EventEmitter<number>();
            },
        ),
        CompoundItemComponent: component('mosaik-compound-item'),
        FormFieldComponent: component('mosaik-form-field'),
        FormFieldDirective: angular.Directive({ selector: '[formField]', inputs: ['formField'] })(class {}),
        FormFieldStateDirective: angular.Directive({ selector: '[fieldState]', inputs: ['fieldState'] })(class {}),
        SelectComponent: component('mosaik-select', ['disabled', 'label', 'required']),
        SelectItemComponent: component('mosaik-select-item', ['label', 'value']),
        TextBoxComponent: component('mosaik-textbox', ['disabled', 'label', 'required']),
        ToggleSwitchComponent: component('mosaik-toggle-switch', ['disabled', 'label']),
    };
});

// #region Fields

const LABELS: IUrlListLabels = {
    title: 'Web links',
    description: 'Public links',
    type: 'Category',
    label: 'Label',
    url: 'URL',
    primary: 'Primary',
    active: 'Active',
    add: 'Add link',
    remove: 'Remove link',
    previous: 'Previous link',
    next: 'Next link',
    open: 'Open link',
};

// #endregion

// #region Methods

function setUp() {
    const fixture = TestBed.createComponent(UrlListComponent);
    const entries = signal<IUrlFormData[]>([
        { type: 'work', label: 'Workspace', url: 'https://example.com/work', isPrimary: true, isActive: true },
        { type: 'work', label: 'Support', url: 'https://example.com/help', isPrimary: false, isActive: true },
    ]);
    const fields = TestBed.runInInjectionContext(() => form(entries));
    Object.defineProperties(fixture.componentInstance, {
        fields: { value: signal(fields) },
        options: { value: signal([{ value: 'work', label: 'Work' }]) },
        labels: { value: signal(LABELS) },
    });
    fixture.detectChanges();

    const compound = fixture.debugElement.query(By.directive(CompoundComponent)).injector.get(CompoundComponent);
    const root = fixture.nativeElement as HTMLElement;

    return { fixture, entries, compound, root };
}

// #endregion

describe(UrlListComponent.name, () => {
    afterEach(() => TestBed.resetTestingModule());

    it('moves the category option hook to the selected row and keeps the existing Signal Form editor', () => {
        const { fixture, entries, compound, root } = setUp();
        const editor = fixture.debugElement.query(By.css('[test-id="url-list-label-0"]'));
        const binding = editor.injector.get(FormFieldDirective) as unknown as { readonly formField: FieldTree<string> };
        binding.formField().value.set('Edited workspace');

        compound.selectedIndexChanged.emit(1);
        fixture.detectChanges();

        const options = root.querySelectorAll('[test-id="url-list-option-work"]');
        expect(options).toHaveLength(1);
        expect(options[0]?.parentElement?.getAttribute('test-id')).toBe('url-list-type-1');
        expect(root.querySelector('[test-id="url-list-label-0"]')).toBe(editor.nativeElement);
        expect(entries()[0]?.label).toBe('Edited workspace');
    });

    it('forwards an add request and projects the row when its caller appends it', () => {
        const { fixture, entries, compound, root } = setUp();
        const added: IUrlFormData = { type: 'work', label: '', url: '', isPrimary: false, isActive: true };
        fixture.componentInstance.addRequested.subscribe(() => entries.update((current) => [...current, added]));

        compound.addRequested.emit();
        fixture.detectChanges();

        expect(entries()).toHaveLength(3);
        expect(root.querySelectorAll('mosaik-compound-item')).toHaveLength(3);
        expect(root.querySelector('[test-id="url-list-value-2"]')).not.toBeNull();
    });

    it('reports the requested removal position to the caller', () => {
        const { fixture, compound, root } = setUp();
        const requested = vi.fn();
        fixture.componentInstance.removeRequested.subscribe(requested);
        const item = root.querySelectorAll<CompoundItemElement>('mosaik-compound-item')[1]!;

        compound.deleteRequested.emit({ index: 1, item });

        expect(requested).toHaveBeenCalledExactlyOnceWith(1);
    });
});
