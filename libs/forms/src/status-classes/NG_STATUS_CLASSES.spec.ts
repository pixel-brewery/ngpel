import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { form, FormField, provideSignalFormsConfig, required } from '@angular/forms/signals';
import { describe, expect, it } from 'vitest';
import { NG_STATUS_CLASSES } from './NG_STATUS_CLASSES';

interface INameModel {
    name: string;
}

@Component({
    selector: 'ngp-status-class-host',
    imports: [FormField],
    template: '<input [formField]="model.name" />',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
class StatusClassHostComponent {
    public readonly model = form(signal<INameModel>({ name: '' }), (path) => {
        required(path.name);
    });
}

function renderStatusClassHost(): { readonly input: HTMLInputElement; readonly whenStable: () => Promise<unknown> } {
    TestBed.configureTestingModule({ providers: [provideSignalFormsConfig({ classes: NG_STATUS_CLASSES })] });

    const fixture = TestBed.createComponent(StatusClassHostComponent);
    fixture.detectChanges();

    const input = fixture.nativeElement.querySelector('input');

    if (input === null) {
        throw new Error('The host component did not render an input.');
    }

    return { input, whenStable: () => fixture.whenStable() };
}

describe('NG_STATUS_CLASSES', () => {
    it('marks an untouched, pristine and invalid field', () => {
        // Arrange
        const host = renderStatusClassHost();

        // Act
        const classes = [...host.input.classList].sort();

        // Assert
        expect(classes).toEqual(['ng-invalid', 'ng-pristine', 'ng-untouched']);
    });

    it('marks a touched, dirty and valid field once the user edits and leaves it', async () => {
        // Arrange
        const host = renderStatusClassHost();

        // Act
        host.input.value = 'Ada';
        host.input.dispatchEvent(new Event('input'));
        host.input.dispatchEvent(new Event('blur'));
        await host.whenStable();

        // Assert
        expect([...host.input.classList].sort()).toEqual(['ng-dirty', 'ng-touched', 'ng-valid']);
    });

    it('covers exactly the seven classic Angular status classes', () => {
        // Arrange
        const expected = ['ng-dirty', 'ng-invalid', 'ng-pending', 'ng-pristine', 'ng-touched', 'ng-untouched', 'ng-valid'];

        // Act
        const declared = Object.keys(NG_STATUS_CLASSES).sort();

        // Assert
        expect(declared).toEqual(expected);
    });
});
