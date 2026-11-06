import { ApplicationRef, ChangeDetectionStrategy, Component, resource, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { form, FormField, type FieldTree } from '@angular/forms/signals';
import { describe, expect, it } from 'vitest';
import { useAsyncValidatorWithDebounce } from './useAsyncValidatorWithDebounce';

const TAKEN_NAME = 'ada';

interface INameModel {
    name: string;
}

function loadIsTaken(name: string | undefined): Promise<boolean> {
    return Promise.resolve(name === TAKEN_NAME);
}

function createNameForm(initialName: string, durationOrDebouncer: number): FieldTree<INameModel> {
    return TestBed.runInInjectionContext(() =>
        form(signal<INameModel>({ name: initialName }), (path) => {
            useAsyncValidatorWithDebounce({
                path: path.name,
                paramsFn: (context) => context.value(),
                factoryFn: (params) => resource({ params: () => params(), loader: ({ params: name }) => loadIsTaken(name) }),
                mapResultToError: (isTaken) => (isTaken === true ? { kind: 'nameTaken' } : null),
                config: { durationOrDebouncer },
            });
        }),
    );
}

@Component({
    selector: 'ngp-debounced-name-host',
    imports: [FormField],
    template: '<input [formField]="model.name" />',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
class DebouncedNameHostComponent {
    public readonly debouncedControlValues: string[] = [];

    public readonly model = form(signal<INameModel>({ name: '' }), (path) => {
        useAsyncValidatorWithDebounce({
            path: path.name,
            paramsFn: (context) => context.value(),
            factoryFn: (params) => resource({ params: () => params(), loader: ({ params: name }) => loadIsTaken(name) }),
            mapResultToError: (isTaken) => (isTaken === true ? { kind: 'nameTaken' } : null),
            config: {
                durationOrDebouncer: (context): Promise<void> => {
                    this.debouncedControlValues.push(context.state.controlValue());

                    return new Promise<void>(() => undefined);
                },
            },
        });
    });
}

@Component({
    selector: 'ngp-undebounced-name-host',
    imports: [FormField],
    template: '<input [formField]="model.name" />',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
class UndebouncedNameHostComponent {
    public readonly model = form(signal<INameModel>({ name: '' }), (path) => {
        useAsyncValidatorWithDebounce({
            path: path.name,
            paramsFn: (context) => context.value(),
            factoryFn: (params) => resource({ params: () => params(), loader: ({ params: name }) => loadIsTaken(name) }),
            mapResultToError: (isTaken) => (isTaken === true ? { kind: 'nameTaken' } : null),
        });
    });
}

async function typeIntoHost(fixture: { nativeElement: HTMLElement; whenStable: () => Promise<unknown> }, text: string): Promise<void> {
    const input = fixture.nativeElement.querySelector('input');

    if (input === null) {
        throw new Error('The host component did not render an input.');
    }

    input.value = text;
    input.dispatchEvent(new Event('input'));

    await fixture.whenStable();
}

describe('useAsyncValidatorWithDebounce', () => {
    it('reports no error when the resource resolves to a valid result', async () => {
        // Arrange
        const field = createNameForm('grace', 25);

        // Act
        await TestBed.inject(ApplicationRef).whenStable();

        // Assert
        expect(field.name().errors()).toEqual([]);
    });

    it('reports the mapped error when the resource resolves to an invalid result', async () => {
        // Arrange
        const field = createNameForm(TAKEN_NAME, 25);

        // Act
        await TestBed.inject(ApplicationRef).whenStable();

        // Assert
        expect(field.name().errors()).toEqual([expect.objectContaining({ kind: 'nameTaken' })]);
    });

    it('still registers the validator when the configured duration is zero', async () => {
        // Arrange
        const field = createNameForm(TAKEN_NAME, 0);

        // Act
        await TestBed.inject(ApplicationRef).whenStable();

        // Assert
        expect(field.name().errors()).toEqual([expect.objectContaining({ kind: 'nameTaken' })]);
    });

    it('routes control updates through the configured debouncer and holds the model back', async () => {
        // Arrange
        const fixture = TestBed.createComponent(DebouncedNameHostComponent);
        fixture.detectChanges();

        // Act
        await typeIntoHost(fixture, TAKEN_NAME);

        // Assert
        expect({ debounced: fixture.componentInstance.debouncedControlValues, value: fixture.componentInstance.model.name().value() }).toEqual({
            debounced: [TAKEN_NAME],
            value: '',
        });
    });

    it('applies control updates immediately when no debounce is configured', async () => {
        // Arrange
        const fixture = TestBed.createComponent(UndebouncedNameHostComponent);
        fixture.detectChanges();

        // Act
        await typeIntoHost(fixture, TAKEN_NAME);

        // Assert
        expect(fixture.componentInstance.model.name().value()).toBe(TAKEN_NAME);
    });
});
