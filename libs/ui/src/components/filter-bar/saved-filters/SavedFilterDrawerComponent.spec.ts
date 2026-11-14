// #region Imports

import { TestBed } from '@angular/core/testing';
import type { FieldTree } from '@angular/forms/signals';
import { DRAWER_REF, DRAWER_REF_DATA, SignalFormValidator, ToastService } from '@pixel-brewery/mosaik-elements-angular';
import { EMPTY } from 'rxjs';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { FilterBarComponentIntl } from '../FilterBarComponentIntl';
import { SavedFilterDrawerComponent } from './SavedFilterDrawerComponent';

// #endregion

vi.mock('@pixel-brewery/mosaik-elements-angular', async () => {
    const angular = await vi.importActual<typeof import('@angular/core')>('@angular/core');

    return {
        ButtonComponent: class ButtonComponent {},
        Cancel: {
            positive: (result?: unknown) => ({ reason: 'positive', result }),
            negative: (result?: unknown) => ({ reason: 'negative', result }),
        },
        TranslateService: class TranslateService {},
        DIALOG_REF: new angular.InjectionToken('DIALOG_REF'),
        DIALOG_REF_DATA: new angular.InjectionToken('DIALOG_REF_DATA'),
        DialogContentDirective: class DialogContentDirective {},
        DialogFooterDirective: class DialogFooterDirective {},
        DialogHeaderComponent: class DialogHeaderComponent {},
        DialogHeaderDirective: class DialogHeaderDirective {},
        DRAWER_REF: new angular.InjectionToken('DRAWER_REF'),
        DRAWER_REF_DATA: new angular.InjectionToken('DRAWER_REF_DATA'),
        DrawerContentDirective: class DrawerContentDirective {},
        DrawerFooterDirective: class DrawerFooterDirective {},
        DrawerHeaderComponent: class DrawerHeaderComponent {},
        DrawerHeaderDirective: class DrawerHeaderDirective {},
        FormFieldComponent: class FormFieldComponent {},
        FormFieldDirective: class FormFieldDirective {},
        FormFieldStateDirective: class FormFieldStateDirective {},
        SignalFormValidator: class SignalFormValidator {},
        TextBoxComponent: class TextBoxComponent {},
        ToastService: class ToastService {},
        TypographyDirective: class TypographyDirective {},
    };
});

interface ISavedFilterFormData {
    readonly name: string;
}

interface ITestValidationBuilder {
    onErrors(callback: () => void): ITestValidationBuilder;

    onSuccess(callback: (value: ISavedFilterFormData) => void): ITestValidationBuilder;

    run(): void;
}

describe('SavedFilterDrawerComponent', () => {
    const close = vi.fn();
    const showToast = vi.fn();
    let component: SavedFilterDrawerComponent;

    beforeEach(() => {
        close.mockReset();
        showToast.mockReset();

        TestBed.configureTestingModule({
            providers: [
                FilterBarComponentIntl,
                {
                    provide: DRAWER_REF,
                    useValue: {
                        close,
                        closeAttempted: EMPTY,
                        requestAttention: vi.fn().mockResolvedValue(true),
                    },
                },
                {
                    provide: DRAWER_REF_DATA,
                    useValue: {
                        filters: [],
                        values: {},
                    },
                },
                {
                    provide: ToastService,
                    useValue: {
                        show: showToast,
                    },
                },
                {
                    provide: SignalFormValidator,
                    useValue: {
                        build: (form: FieldTree<ISavedFilterFormData>) => createValidationBuilder(form),
                    },
                },
            ],
        });

        component = TestBed.runInInjectionContext(() => new SavedFilterDrawerComponent());
    });

    it('should validate and notify without closing when the name is empty', () => {
        component.onSave();

        expect(component.form.name().touched()).toBe(true);
        expect(showToast).toHaveBeenCalledOnce();
        expect(close).not.toHaveBeenCalled();
    });

    it('should close with the trimmed name when the form is valid', () => {
        component.form.name().value.set('  My filter  ');

        component.onSave();

        expect(showToast).not.toHaveBeenCalled();
        expect(close).toHaveBeenCalledWith(
            expect.objectContaining({
                result: {
                    name: 'My filter',
                    values: {},
                },
            }),
        );
    });
});

function createValidationBuilder(form: FieldTree<ISavedFilterFormData>): ITestValidationBuilder {
    let onErrors: (() => void) | undefined;
    let onSuccess: ((value: ISavedFilterFormData) => void) | undefined;
    const builder: ITestValidationBuilder = {
        onErrors: (callback) => {
            onErrors = callback;

            return builder;
        },
        onSuccess: (callback) => {
            onSuccess = callback;

            return builder;
        },
        run: () => {
            form.name().markAsTouched();
            if (form.name().errors().length > 0) {
                onErrors?.();
            } else {
                onSuccess?.(form().value());
            }
        },
    };

    return builder;
}
