import { signal, type Signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { FormFieldStateDirective } from '@pixel-brewery/mosaik-elements-angular';
import { command, type Command } from '@pixel-brewery/ngpel-mvp';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { EntityPickerFieldComponent } from './EntityPickerFieldComponent';

vi.mock('@pixel-brewery/mosaik-elements-angular', () => ({
    ButtonComponent: class ButtonComponent {},
    FormFieldStateDirective: class FormFieldStateDirective {},
    IconNameDirective: class IconNameDirective {},
    StackComponent: class StackComponent {},
    TextBoxComponent: class TextBoxComponent {},
}));

interface IEntityPickerFieldTestApi {
    readonly actionsAvailable: Signal<boolean>;
    readonly availableClearCommand: Signal<Command<unknown> | undefined>;
    readonly invalid: Signal<boolean>;

    actionTestId(action: 'clear' | 'open'): string | undefined;
}

describe('EntityPickerFieldComponent', () => {
    afterEach(() => TestBed.resetTestingModule());

    it('uses the selection state to offer a clear action even when the entity has no display label', () => {
        // Arrange
        const component = createComponent();
        const clear = command(vi.fn());
        const selected = signal(false);
        Object.defineProperties(component, {
            clearActionLabel: { value: signal('Clear selected entity') },
            clearCommand: { value: signal(clear) },
            selected: { value: selected },
        });
        const api = component as unknown as IEntityPickerFieldTestApi;
        expect(api.availableClearCommand()).toBeUndefined();

        // Act
        selected.set(true);

        // Assert
        expect(component.value()).toBe('');
        expect(api.availableClearCommand()).toBe(clear);
    });

    it('hides picker actions for a disabled field', () => {
        // Arrange
        const component = createComponent();
        const disabled = signal(false);
        Object.defineProperty(component, 'disabled', { value: disabled });
        const api = component as unknown as IEntityPickerFieldTestApi;

        // Act
        disabled.set(true);

        // Assert
        expect(api.actionsAvailable()).toBe(false);
    });

    it('follows the surrounding form field invalid state after the field has been touched', () => {
        // Arrange
        const touched = signal(false);
        TestBed.configureTestingModule({
            providers: [{ provide: FormFieldStateDirective, useValue: { fieldState: signal({ invalid: signal(true), touched }) } }],
        });
        const api = TestBed.runInInjectionContext(() => new EntityPickerFieldComponent()) as unknown as IEntityPickerFieldTestApi;
        expect(api.invalid()).toBe(false);

        // Act
        touched.set(true);

        // Assert
        expect(api.invalid()).toBe(true);
    });

    it('uses explicit action IDs and derives the others from the field ID', () => {
        // Arrange
        const component = createComponent();
        Object.defineProperties(component, {
            testId: { value: signal('customer') },
            openActionTestId: { value: signal('choose-customer') },
        });
        const api = component as unknown as IEntityPickerFieldTestApi;

        // Act
        const ids = [api.actionTestId('open'), api.actionTestId('clear')];

        // Assert
        expect(ids).toEqual(['choose-customer', 'customer-clear']);
    });
});

function createComponent(): EntityPickerFieldComponent {
    TestBed.configureTestingModule({});

    return TestBed.runInInjectionContext(() => new EntityPickerFieldComponent());
}
