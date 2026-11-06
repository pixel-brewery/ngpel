import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { afterEach, describe, expect, it } from 'vitest';
import type { ISearchResultRendererEntry } from '../models/ISearchResultRendererEntry';
import { SEARCH_RESULT_RENDERER_TOKEN } from './SEARCH_RESULT_RENDERER_TOKEN';
import { SearchKinds } from './SearchKinds';
import { withSearchRenderers } from './withSearchRenderers';

@Component({ selector: 'ngp-probe-customer-result', template: '' })
class ProbeCustomerResultView {}

describe('withSearchRenderers', () => {
    afterEach(() => {
        TestBed.resetTestingModule();
    });

    it('creates a multi feature of the renderers kind, not of the commands kind', () => {
        // Arrange
        const entries: ReadonlyArray<ISearchResultRendererEntry> = [{ id: 'crm.customers', component: ProbeCustomerResultView }];

        // Act
        const feature = withSearchRenderers({ id: 'crm', entries });

        // Assert
        expect(feature.id).toBe('crm');
        expect(feature.kind).toBe(SearchKinds.Renderers);
        expect(feature.options.multi).toBe(true);
    });

    it('contributes the entries as one batch under the renderer token', () => {
        // Arrange
        const entries: ReadonlyArray<ISearchResultRendererEntry> = [{ id: 'crm.customers', component: ProbeCustomerResultView }];
        TestBed.configureTestingModule({ providers: [...withSearchRenderers({ id: 'crm', entries }).provide()] });

        // Act
        const batches = TestBed.inject(SEARCH_RESULT_RENDERER_TOKEN);

        // Assert
        expect(batches).toEqual([entries]);
    });

    it('contributes an empty batch when the contribution registers no entry', () => {
        // Arrange
        TestBed.configureTestingModule({ providers: [...withSearchRenderers({ id: 'empty', entries: [] }).provide()] });

        // Act
        const batches = TestBed.inject(SEARCH_RESULT_RENDERER_TOKEN);

        // Assert
        expect(batches).toEqual([[]]);
    });
});
