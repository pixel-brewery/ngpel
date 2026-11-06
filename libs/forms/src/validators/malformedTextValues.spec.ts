import { signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { form, type SchemaFn } from '@angular/forms/signals';
import { describe, expect, it } from 'vitest';
import {
    bic,
    countryCode,
    currencyCode,
    emailAddress,
    hexColor,
    hostname,
    httpsUrl,
    httpUrl,
    iban,
    languageRegionCode,
    nonBlank,
    port,
    singleLine,
    trimmedMaxLength,
    trimmedMinLength,
    uuid,
} from '../index';

const validators: ReadonlyArray<readonly [kind: string, register: SchemaFn<string>]> = [
    ['bic', bic],
    ['countryCode', countryCode],
    ['currencyCode', currencyCode],
    ['email', emailAddress],
    ['hexColor', hexColor],
    ['hostname', hostname],
    ['httpsUrl', httpsUrl],
    ['httpUrl', httpUrl],
    ['iban', iban],
    ['languageRegionCode', languageRegionCode],
    ['required', nonBlank],
    ['port', port],
    ['singleLine', singleLine],
    ['maxLength', (path) => trimmedMaxLength(path, 10)],
    ['minLength', (path) => trimmedMinLength(path, 1)],
    ['uuid', uuid],
];

describe('text validation of persisted data', () => {
    it.each(validators)('reports %s for a malformed runtime value', (kind, register) => {
        // Arrange
        const value = null as unknown as string;
        const field = TestBed.runInInjectionContext(() => form(signal(value), register));

        // Act
        const errors = field().errors();

        // Assert
        expect(errors).toEqual([expect.objectContaining({ kind, actualValue: null })]);
    });
});
