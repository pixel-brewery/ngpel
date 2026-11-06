import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { afterEach, describe, expect, it } from 'vitest';
import type { ISearchResultRendererEntry } from '../models/ISearchResultRendererEntry';
import { SEARCH_RESULT_RENDERER_TOKEN } from './SEARCH_RESULT_RENDERER_TOKEN';

@Component({ selector: 'ngp-probe-result', template: '' })
class ProbeResultView {}

describe('SEARCH_RESULT_RENDERER_TOKEN', () => {
    afterEach(() => {
        TestBed.resetTestingModule();
    });

    it('aggregates one batch per contributing feature', () => {
        // Arrange
        const crmEntries: ReadonlyArray<ISearchResultRendererEntry> = [{ id: 'crm.customers', component: ProbeResultView }];
        const salesEntries: ReadonlyArray<ISearchResultRendererEntry> = [{ id: 'sales.orders', component: ProbeResultView }];
        TestBed.configureTestingModule({
            providers: [
                { provide: SEARCH_RESULT_RENDERER_TOKEN, useValue: crmEntries, multi: true },
                { provide: SEARCH_RESULT_RENDERER_TOKEN, useValue: salesEntries, multi: true },
            ],
        });

        // Act
        const batches = TestBed.inject(SEARCH_RESULT_RENDERER_TOKEN);

        // Assert
        expect(batches).toEqual([crmEntries, salesEntries]);
    });

    it('is absent when no feature contributed renderers', () => {
        // Arrange
        TestBed.configureTestingModule({});

        // Act
        const batches = TestBed.inject(SEARCH_RESULT_RENDERER_TOKEN, null, { optional: true });

        // Assert
        expect(batches).toBeNull();
    });
});
