// #region Imports

import type { Signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import type { FieldState } from '@angular/forms/signals';
import { DrawerService } from '@pixel-brewery/mosaik-elements-angular';
import { USER_PREFERENCE_STORAGE, type IUserPreferenceCodec, type IUserPreferenceStorage } from '@pixel-brewery/ngpel-core/storage';
import { describe, expect, it, vi } from 'vitest';
import { FilterBarComponent } from './FilterBarComponent';
import { FilterBarComponentIntl } from './FilterBarComponentIntl';
import type { AdvancedFilterNode, FilterBarModeValue, FilterValues, IAdvancedFilterRule, IAdvancedFilterValues, IFilterDefinition } from './IFilterDefinition';
import { FilterBarMode, FilterOperator, FilterType } from './IFilterDefinition';
import type { IAdvancedFilterRow } from './filterConditions';
import { isAdvancedFilterRule } from './filterConditions';

// #endregion

/** In-memory user preferences: ngpel composes the real storage, so a spec supplies its own. */
function inMemoryUserPreferenceStorage(): IUserPreferenceStorage {
    const entries = new Map<string, string>();

    return {
        read: <T>(key: string, codec: IUserPreferenceCodec<T>): T | undefined => {
            const serialized = entries.get(key);

            return serialized === undefined ? undefined : codec.parse(JSON.parse(serialized));
        },
        write: <T>(key: string, value: T, codec: IUserPreferenceCodec<T>): void => {
            entries.set(key, JSON.stringify(codec.serialize(value)));
        },
        remove: (key: string): void => {
            entries.delete(key);
        },
    };
}

vi.mock('@pixel-brewery/mosaik-elements-angular', async () => {
    const angular = await vi.importActual<typeof import('@angular/core')>('@angular/core');
    const inputs = [
        'appearance',
        'dropDownPlacement',
        'fieldState',
        'formField',
        'gap',
        'horizontalAlignment',
        'icon',
        'iconName',
        'isChecked',
        'isClearable',
        'label',
        'mosaikTooltip',
        'mosaikTypography',
        'orientation',
        'placeholder',
        'required',
        'text',
        'value',
        'variant',
    ];
    const outputs = ['changed', 'checked', 'click'];

    function createComponent(selector: string): unknown {
        class StubComponent {}

        angular.Component({
            selector,
            standalone: true,
            template: '<ng-content />',
            inputs,
            outputs,
        })(StubComponent);

        return StubComponent;
    }

    function createDirective(selector: string): unknown {
        class StubDirective {}

        angular.Directive({
            selector,
            standalone: true,
            inputs,
        })(StubDirective);

        return StubDirective;
    }

    return {
        ButtonComponent: createComponent('mosaik-button'),
        PressButtonComponent: createComponent('mosaik-press-button'),
        BadgeComponent: createComponent('mosaik-badge'),
        CardComponent: createComponent('mosaik-card'),
        CardContentComponent: createComponent('mosaik-card-content'),
        CardFooterComponent: createComponent('mosaik-card-footer'),
        CardHeaderComponent: createComponent('mosaik-card-header'),
        CardTitleComponent: createComponent('mosaik-card-title'),
        CheckboxComponent: createComponent('mosaik-checkbox'),
        DateBoxComponent: createComponent('mosaik-datebox'),
        Cancel: {
            positive: (result?: unknown) => ({ reason: 'positive', result }),
            negative: (result?: unknown) => ({ reason: 'negative', result }),
        },
        DRAWER_REF: new angular.InjectionToken('DRAWER_REF'),
        DRAWER_REF_DATA: new angular.InjectionToken('DRAWER_REF_DATA'),
        DrawerContentDirective: createDirective('ng-template[mosaikDrawerContent]'),
        DrawerFooterDirective: createDirective('ng-template[mosaikDrawerFooter]'),
        DrawerHeaderComponent: createComponent('mosaik-drawer-header'),
        DrawerHeaderDirective: createDirective('ng-template[mosaikDrawerHeader]'),
        DrawerService: class DrawerService {},
        DropDownButtonComponent: createComponent('mosaik-dropdown-button'),
        FormFieldComponent: createComponent('mosaik-form-field'),
        FormFieldDirective: createDirective('[formField]'),
        FormFieldStateDirective: createDirective('[fieldState]'),
        IconNameDirective: createDirective('[iconName]'),
        LocaleDirective: createDirective('[locale]'),
        MenuComponent: createComponent('mosaik-menu'),
        MenuItemComponent: createComponent('mosaik-menu-item'),
        NumberBoxComponent: createComponent('mosaik-numberbox'),
        SegmentComponent: createComponent('mosaik-segment'),
        SegmentItemComponent: createComponent('mosaik-segment-item'),
        SelectComponent: createComponent('mosaik-select'),
        SelectItemComponent: createComponent('mosaik-select-item'),
        SplitButtonComponent: createComponent('mosaik-split-button'),
        StackComponent: createComponent('mosaik-stack'),
        TextBoxComponent: createComponent('mosaik-textbox'),
        ToggleButtonComponent: createComponent('mosaik-toggle-button'),
        TooltipDirective: createDirective('[mosaikTooltip]'),
        GlobalDomRef: class GlobalDomRef {},
        TypographyDirective: createDirective('[mosaikTypography]'),
    };
});

// #region Models

interface IFilterBarComponentTestApi {
    readonly isFilterActive: Signal<boolean>;

    readonly advancedRows: Signal<ReadonlyArray<IAdvancedFilterRow>>;

    field(key: string): () => FieldState<unknown>;

    advancedField(key: string): () => FieldState<unknown>;

    advancedRuleControlKey(rule: IAdvancedFilterRule, kind: 'field' | 'operator' | 'value'): string;

    advancedRuleOperatorOptions(rule: IAdvancedFilterRule): ReadonlyArray<{ readonly label: string; readonly value: string }>;

    onModeChanged(mode: FilterBarModeValue): void;

    onReset(): void;

    normalizedValues(): FilterValues;
}

// #endregion

describe('FilterBarComponent', () => {
    it('should clear standard filter form values', () => {
        const api = createComponentApi();

        api.field('status')().value.set('OPEN');

        expect(api.isFilterActive()).toBe(true);

        api.onReset();

        expect(api.field('status')().value()).toBeNull();
        expect(api.isFilterActive()).toBe(false);
        expect(api.normalizedValues()).toEqual({});
    });

    it('should emit active advanced filter payloads', () => {
        const api = createComponentApi();

        api.onModeChanged(FilterBarMode.Advanced);

        const rule = findFirstRule(api.advancedRows());
        api.advancedField(api.advancedRuleControlKey(rule, 'value'))().value.set('Max');

        const payload = api.normalizedValues() as IAdvancedFilterValues;

        expect(api.isFilterActive()).toBe(true);
        expect(payload.mode).toBe(FilterBarMode.Advanced);
        expect(payload.root.children).toEqual([
            {
                kind: 'rule',
                id: rule.id,
                fieldKey: 'name',
                operator: FilterOperator.Contains,
                value: 'Max',
            },
        ]);
    });

    it('should reset advanced rules and values', () => {
        const api = createComponentApi();

        api.onModeChanged(FilterBarMode.Advanced);

        const rule = findFirstRule(api.advancedRows());
        api.advancedField(api.advancedRuleControlKey(rule, 'value'))().value.set('Max');

        expect(api.isFilterActive()).toBe(true);

        api.onReset();

        const resetRule = findFirstRule(api.advancedRows());

        expect(resetRule.id).not.toBe(rule.id);
        expect(api.advancedField(api.advancedRuleControlKey(resetRule, 'value'))().value()).toBeNull();
        expect(api.isFilterActive()).toBe(false);
    });

    it('should clear standard and advanced state together', () => {
        const api = createComponentApi();

        api.field('status')().value.set('OPEN');
        api.onModeChanged(FilterBarMode.Advanced);
        const rule = findFirstRule(api.advancedRows());
        api.advancedField(api.advancedRuleControlKey(rule, 'value'))().value.set('Max');

        api.onReset();
        api.onModeChanged(FilterBarMode.Standard);

        expect(api.field('status')().value()).toBeNull();
        expect(api.normalizedValues()).toEqual({});
    });

    it('should use intl labels for advanced operator options', () => {
        const api = createComponentApi(new TestFilterBarComponentIntl());

        api.onModeChanged(FilterBarMode.Advanced);

        const rule = findFirstRule(api.advancedRows());

        expect(api.advancedRuleOperatorOptions(rule)[0]).toEqual({
            label: 'Lokalisiert enthält',
            value: FilterOperator.Contains,
        });
    });
});

function createFilters(): ReadonlyArray<IFilterDefinition> {
    return [
        {
            key: 'name',
            label: 'Name',
            type: FilterType.Text,
        },
        {
            key: 'status',
            label: 'Status',
            type: FilterType.Select,
            options: [
                { label: 'Open', value: 'OPEN' },
                { label: 'Done', value: 'DONE' },
            ],
        },
    ];
}

function createComponentApi(intl?: FilterBarComponentIntl): IFilterBarComponentTestApi {
    let component: FilterBarComponent | undefined;

    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
        providers: [
            { provide: DrawerService, useValue: { show: vi.fn() } },
            { provide: USER_PREFERENCE_STORAGE, useValue: inMemoryUserPreferenceStorage() },
            ...(intl ? [{ provide: FilterBarComponentIntl, useValue: intl }] : []),
        ],
    });

    TestBed.runInInjectionContext(() => {
        component = new FilterBarComponent();
    });

    if (!component) {
        throw new Error('Expected FilterBarComponent to be created.');
    }

    Object.defineProperty(component, 'filters', {
        value: () => createFilters(),
    });
    component.ngOnInit();

    return component as unknown as IFilterBarComponentTestApi;
}

class TestFilterBarComponentIntl extends FilterBarComponentIntl {
    // #region Properties

    public override get containsOperatorLabel(): string {
        return 'Lokalisiert enthält';
    }

    // #endregion
}

function findFirstRule(rows: ReadonlyArray<IAdvancedFilterRow>): IAdvancedFilterRule {
    const node = rows.map((row) => row.node).find((rowNode: AdvancedFilterNode) => isAdvancedFilterRule(rowNode));

    if (!node) {
        throw new Error('Expected an advanced filter rule.');
    }

    return node;
}
