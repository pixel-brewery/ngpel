import { ApplicationRef, resource, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { form, type FieldTree } from '@angular/forms/signals';
import { describe, expect, it } from 'vitest';
import { useAsyncValidator } from './useAsyncValidator';

const TAKEN_NAME = 'ada';

interface INameModel {
    name: string;
}

function loadIsTaken(name: string | undefined): Promise<boolean> {
    return Promise.resolve(name === TAKEN_NAME);
}

function rejectLookup(): Promise<boolean> {
    return Promise.reject(new Error('The lookup failed.'));
}

function createNameForm(
    initialName: string,
    load: (name: string | undefined) => Promise<boolean>,
    options?: { readonly when?: () => boolean; readonly onError?: () => unknown },
): FieldTree<INameModel> {
    return TestBed.runInInjectionContext(() =>
        form(signal<INameModel>({ name: initialName }), (path) => {
            useAsyncValidator({
                path: path.name,
                paramsFn: (context) => context.value(),
                factoryFn: (params) => resource({ params: () => params(), loader: ({ params: name }) => load(name) }),
                mapResultToError: (isTaken) => (isTaken === true ? { kind: 'nameTaken' } : null),
                onError: options?.onError,
                when: options?.when,
            });
        }),
    );
}

describe('useAsyncValidator', () => {
    it('reports no error when the resource resolves to a valid result', async () => {
        // Arrange
        const field = createNameForm('grace', loadIsTaken);

        // Act
        await TestBed.inject(ApplicationRef).whenStable();

        // Assert
        expect(field.name().errors()).toEqual([]);
    });

    it('reports the mapped error when the resource resolves to an invalid result', async () => {
        // Arrange
        const field = createNameForm(TAKEN_NAME, loadIsTaken);

        // Act
        await TestBed.inject(ApplicationRef).whenStable();

        // Assert
        expect(field.name().errors()).toEqual([expect.objectContaining({ kind: 'nameTaken' })]);
    });

    it('skips the lookup while the activation condition fails', async () => {
        // Arrange
        const field = createNameForm(TAKEN_NAME, loadIsTaken, { when: () => false });

        // Act
        await TestBed.inject(ApplicationRef).whenStable();

        // Assert
        expect(field.name().errors()).toEqual([]);
    });

    it('reports the error mapped by onError when the resource rejects', async () => {
        // Arrange
        const field = createNameForm('grace', rejectLookup, { onError: () => ({ kind: 'lookupFailed' }) });

        // Act
        await TestBed.inject(ApplicationRef).whenStable();

        // Assert
        expect(field.name().errors()).toEqual([expect.objectContaining({ kind: 'lookupFailed' })]);
    });

    it('reports no error when the resource rejects and no onError is configured', async () => {
        // Arrange
        const field = createNameForm('grace', rejectLookup);

        // Act
        await TestBed.inject(ApplicationRef).whenStable();

        // Assert
        expect(field.name().errors()).toEqual([]);
    });
});
