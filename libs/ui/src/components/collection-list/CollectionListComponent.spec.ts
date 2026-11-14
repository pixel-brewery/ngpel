import { ChangeDetectorRef, Component, type Signal, type Type, TemplateRef, ViewChild, signal } from '@angular/core';
import { SIGNAL } from '@angular/core/primitives/signals';
import { By } from '@angular/platform-browser';
import { TestBed, type ComponentFixture } from '@angular/core/testing';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import type { ContextMenuComponent } from '../context-menu/ContextMenuComponent';
import { CollectionListComponent } from './CollectionListComponent';
import { ContextMenuTriggerDirective } from '../context-menu/ContextMenuTriggerDirective';
import { StopEventPropagationDirective } from '../../directives/stop-event-propagation/StopEventPropagationDirective';

vi.mock('@pixel-brewery/mosaik-elements-angular', async () => {
    const angular = await vi.importActual<typeof import('@angular/core')>('@angular/core');
    const component = (selector: string, inputs: string[] = []) => angular.Component({ selector, template: '<ng-content/>', inputs })(class {});
    return {
        ButtonComponent: component('mosaik-button', ['appearance', 'label', 'iconName']),
        DividerComponent: component('mosaik-divider'),
        DropDownButtonComponent: component('mosaik-dropdown-button', ['label', 'appearance', 'dropDownPlacement']),
        HintComponent: component('mosaik-hint', ['text', 'textOverflow']),
        IconComponent: component('mosaik-icon', ['icon', 'appearance', 'variant', 'size']),
        IconNameDirective: angular.Directive({ selector: '[iconName]', inputs: ['iconName'] })(class {}),
        ListComponent: component('mosaik-list'),
        ListItemComponent: component('mosaik-list-item', ['disabled', 'value']),
        MenuComponent: component('mosaik-menu'),
        MenuItemComponent: component('mosaik-menu-item', ['label', 'isChecked']),
        SkeletonComponent: component('mosaik-skeleton', ['width', 'height', 'shimmer']),
        TextComponent: component('mosaik-text', ['text', 'wrap']),
        TypographyDirective: angular.Directive({ selector: '[mosaikTypography]', inputs: ['mosaikTypography'] })(class {}),
    };
});

@Component({
    imports: [CollectionListComponent],
    template: `
        <ngp-collection-list
            [items]="items"
            [compact]="true"
            [isLoading]="loading"
            [listLabel]="'Records'"
            [itemTestIdPrefix]="'record'"
            [contextMenu]="menu"
            (itemActivated)="activated($event)"
        >
            <ng-template #row let-item>{{ item.id }}</ng-template>
            <div slot="footer" test-id="record-navigation"></div>
        </ngp-collection-list>
    `,
})
class HostComponent {
    @ViewChild('row', { static: true })
    public row!: TemplateRef<unknown>;

    public readonly items = [{ id: 'second' }];
    public loading = false;
    public readonly open = vi.fn(async () => undefined);
    public readonly menu = { open: this.open } as unknown as ContextMenuComponent<(typeof this.items)[number]>;
    public readonly activated = vi.fn();
}

describe('compact collection list', () => {
    beforeEach(() => {
        exposeJitInputs(CollectionListComponent, ['items', 'compact', 'isLoading', 'listLabel', 'itemTestIdPrefix', 'contextMenu']);
        TestBed.overrideComponent(CollectionListComponent, { add: { outputs: ['itemActivated'] } });
        exposeJitInputs(ContextMenuTriggerDirective, [
            'menu: ngpContextMenuTriggerFor',
            'value: ngpContextMenuValue',
            'openOnClick: ngpContextMenuOpenOnClick',
        ]);
        exposeJitInputs(StopEventPropagationDirective, ['events: ngpStopEventPropagation']);
    });

    afterEach(() => TestBed.resetTestingModule());

    it('keeps the footer with the scrollable list while loading', () => {
        const fixture = TestBed.createComponent(HostComponent);
        fixture.componentInstance.loading = true;
        fixture.detectChanges();

        const navigation = fixture.nativeElement.querySelector('[test-id="record-navigation"]') as HTMLElement;
        expect(navigation.parentElement?.getAttribute('aria-busy')).toBe('true');
        expect(navigation.parentElement?.querySelector('[test-id="record-second"]')).toBeNull();
    });

    it('opens the menu for its own item without triggering the row action', () => {
        const fixture = TestBed.createComponent(HostComponent);
        fixture.detectChanges();

        renderRows(fixture);
        const action = fixture.nativeElement.querySelector('[test-id="record-actions-second"]') as HTMLElement;
        action.click();

        const { open, items, activated } = fixture.componentInstance;
        expect(open).toHaveBeenCalledWith(expect.objectContaining({ context: items[0] }));
        expect(activated).not.toHaveBeenCalled();
    });

    it('emits the complete item when its row is activated', () => {
        const fixture = TestBed.createComponent(HostComponent);
        fixture.detectChanges();

        renderRows(fixture);
        (fixture.nativeElement.querySelector('[test-id="record-second"]') as HTMLElement).click();

        expect(fixture.componentInstance.activated).toHaveBeenCalledWith(fixture.componentInstance.items[0]);
    });
});

function exposeJitInputs(type: Type<unknown>, declarations: string[]): void {
    const inputs = declarations.map((declaration) => {
        const separator = declaration.indexOf(': ');
        const property = separator === -1 ? declaration : declaration.slice(0, separator);
        const alias = separator === -1 ? declaration : declaration.slice(separator + 2);
        const setter = `set_${property}`;
        Object.defineProperty(type.prototype, setter, {
            configurable: true,
            set(this: Record<string, Signal<unknown>>, value: unknown) {
                const input = this[property];
                if (!input) {
                    throw new Error(`Missing test input ${property}`);
                }
                const node = input[SIGNAL] as { applyValueToInputSignal(node: unknown, value: unknown): void };
                node.applyValueToInputSignal(node, value);
            },
        });
        return `${setter}: ${alias}`;
    });
    if (type === CollectionListComponent) {
        TestBed.overrideComponent(type, { add: { inputs } });
    } else {
        TestBed.overrideDirective(type, { add: { inputs } });
    }
}

function renderRows(fixture: ComponentFixture<HostComponent>): void {
    const list = fixture.debugElement.query(By.directive(CollectionListComponent));
    Object.defineProperty(list.componentInstance, 'itemTemplate', { value: signal(fixture.componentInstance.row) });
    list.injector.get(ChangeDetectorRef).markForCheck();
    fixture.detectChanges();
}
