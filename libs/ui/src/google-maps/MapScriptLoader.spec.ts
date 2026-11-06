// #region Imports

import { DOCUMENT } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { MAP_CONFIGURATION } from './MapConfigurationToken';
import { MapLoadError } from './MapLoadError';
import { MapScriptLoader } from './MapScriptLoader';

// #endregion

describe('Map rendering SDK bootstrap', () => {
    let page: Document;
    let view: {
        google?: { maps: { Map: unknown } };
        ngpMapReady?: () => void;
        markerClusterer?: typeof import('@googlemaps/markerclusterer');
    };

    beforeEach(() => {
        page = document.implementation.createHTMLDocument();
        view = {};
        Object.defineProperty(page, 'defaultView', { value: view });
        TestBed.configureTestingModule({
            providers: [
                { provide: DOCUMENT, useValue: page },
                { provide: PLATFORM_ID, useValue: 'browser' },
                { provide: MAP_CONFIGURATION, useValue: { apiKey: 'test-rendering-key' } },
            ],
        });
    });

    afterEach(() => TestBed.resetTestingModule());

    it('deduplicates overlapping loads and waits for the SDK callback', async () => {
        // arrange
        const loader = TestBed.inject(MapScriptLoader);

        // act
        const loads = [loader.load(), loader.load()];
        view.ngpMapReady?.();
        await Promise.all(loads);

        // assert
        expect(page.scripts).toHaveLength(1);
        expect(view.ngpMapReady).toBeUndefined();
    });

    it('reuses an already initialized SDK without another provider request', async () => {
        // arrange
        view.google = { maps: { Map: class {} } };

        // act
        await TestBed.inject(MapScriptLoader).load();

        // assert
        expect(page.scripts).toHaveLength(0);
    });

    it('removes a failed load and permits a later retry without exposing credentials', async () => {
        // arrange
        const loader = TestBed.inject(MapScriptLoader);
        const first = loader.load();

        // act
        page.scripts[0]!.dispatchEvent(new Event('error'));
        await expect(first).rejects.toEqual(new MapLoadError('load'));
        const retry = loader.load();
        view.ngpMapReady?.();
        await retry;

        // assert
        expect(page.scripts).toHaveLength(1);
        expect(view.ngpMapReady).toBeUndefined();
    });

    it('rejects missing credentials before inserting a script', async () => {
        // arrange
        TestBed.overrideProvider(MAP_CONFIGURATION, { useValue: { apiKey: ' ' } });

        // act
        const load = TestBed.inject(MapScriptLoader).load();

        // assert
        await expect(load).rejects.toEqual(new MapLoadError('configuration'));
        expect(page.scripts).toHaveLength(0);
    });

    it('rejects server rendering without accessing a browser SDK', async () => {
        // arrange
        TestBed.overrideProvider(PLATFORM_ID, { useValue: 'server' });

        // act
        const load = TestBed.inject(MapScriptLoader).load();

        // assert
        await expect(load).rejects.toEqual(new MapLoadError('platform'));
        expect(page.scripts).toHaveLength(0);
    });

    it('prepares the official cluster overlay only after the SDK and shares overlapping loads', async () => {
        // arrange
        const loader = TestBed.inject(MapScriptLoader);

        // act
        const loads = [loader.loadMarkerClusterer(), loader.loadMarkerClusterer()];

        // assert
        expect(view.markerClusterer).toBeUndefined();
        view.ngpMapReady?.();
        await Promise.all(loads);
        const library = await import('@googlemaps/markerclusterer');
        expect(view.markerClusterer).toBe(library);
        expect(page.scripts).toHaveLength(1);
        await loader.loadMarkerClusterer();
        expect(view.markerClusterer).toBe(library);
        expect(page.scripts).toHaveLength(1);
    });

    it('reuses an initialized clustering library with an existing SDK', async () => {
        // arrange
        view.google = { maps: { Map: class {} } };
        const library = await import('@googlemaps/markerclusterer');
        view.markerClusterer = library;

        // act
        await TestBed.inject(MapScriptLoader).loadMarkerClusterer();

        // assert
        expect(view.markerClusterer).toBe(library);
        expect(page.scripts).toHaveLength(0);
    });

    it('does not install clustering when the map SDK fails and permits a retry', async () => {
        // arrange
        const loader = TestBed.inject(MapScriptLoader);
        const load = loader.loadMarkerClusterer();

        // act
        page.scripts[0]!.dispatchEvent(new Event('error'));
        await expect(load).rejects.toEqual(new MapLoadError('load'));

        // assert
        expect(view.markerClusterer).toBeUndefined();
        const retry = loader.loadMarkerClusterer();
        view.ngpMapReady?.();
        await retry;
        expect(view.markerClusterer?.MarkerClusterer).toBeDefined();
        expect(page.scripts).toHaveLength(1);
    });

    it('rejects clustering during server rendering before loading either library', async () => {
        // arrange
        TestBed.overrideProvider(PLATFORM_ID, { useValue: 'server' });

        // act
        const load = TestBed.inject(MapScriptLoader).loadMarkerClusterer();

        // assert
        await expect(load).rejects.toEqual(new MapLoadError('platform'));
        expect(view.markerClusterer).toBeUndefined();
        expect(page.scripts).toHaveLength(0);
    });
});
