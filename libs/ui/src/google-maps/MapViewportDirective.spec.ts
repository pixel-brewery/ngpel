// #region Imports

import { Component, type InputSignal } from '@angular/core';
import { SIGNAL } from '@angular/core/primitives/signals';
import { TestBed } from '@angular/core/testing';
import { GoogleMap } from '@angular/google-maps';
import { Subject } from 'rxjs';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { MapViewportDirective } from './MapViewportDirective';

// #endregion

@Component({
    template: '',
    hostDirectives: [MapViewportDirective],
})
class TestHostComponent {
    // #region Fields
    // #endregion
    // #region Ctor
    // #endregion
    // #region Properties
    // #endregion
    // #region Methods
    // #endregion
}

const BOUNDS: google.maps.LatLngBoundsLiteral = { north: 53.55, south: 52.52, east: 13.405, west: 9.99 };

describe('Map server viewport projection', () => {
    let mapInitialized: Subject<google.maps.Map>;
    let idle: Subject<void>;
    let nativeMap: Pick<google.maps.Map, 'fitBounds' | 'setCenter' | 'setZoom' | 'getBounds'>;
    let angularMap: { mapInitialized: Subject<google.maps.Map>; idle: Subject<void>; googleMap?: google.maps.Map };

    beforeEach(() => {
        mapInitialized = new Subject<google.maps.Map>();
        idle = new Subject<void>();
        nativeMap = { fitBounds: vi.fn(), setCenter: vi.fn(), setZoom: vi.fn(), getBounds: vi.fn() };
        angularMap = { mapInitialized, idle };
        TestBed.configureTestingModule({
            imports: [TestHostComponent],
            providers: [{ provide: GoogleMap, useValue: angularMap }],
        });
    });

    afterEach(() => {
        TestBed.resetTestingModule();
        mapInitialized.complete();
        idle.complete();
        vi.restoreAllMocks();
    });

    it('waits for the native map before moving the viewport', () => {
        // arrange
        const { fixture } = render(BOUNDS);

        // act
        fixture.detectChanges();

        // assert
        expect(nativeMap.fitBounds).not.toHaveBeenCalled();
        expect(nativeMap.setCenter).not.toHaveBeenCalled();
    });

    it('applies the backend bounds unchanged when initialization completes', () => {
        // arrange
        const { fixture } = render(BOUNDS);
        fixture.detectChanges();

        // act
        mapInitialized.next(nativeMap as google.maps.Map);
        fixture.detectChanges();

        // assert
        expect(nativeMap.fitBounds).toHaveBeenCalledExactlyOnceWith(BOUNDS, 32);
    });

    it('applies bounds when the native map was initialized before the overlay template', () => {
        // arrange
        angularMap.googleMap = nativeMap as google.maps.Map;
        const { fixture } = render(BOUNDS);

        // act
        fixture.detectChanges();

        // assert
        expect(nativeMap.fitBounds).toHaveBeenCalledExactlyOnceWith(BOUNDS, 32);
    });

    it('replaces the old viewport with the new backend bounds including a dateline crossing', () => {
        // arrange
        angularMap.googleMap = nativeMap as google.maps.Map;
        const { fixture, directive } = render(BOUNDS);
        fixture.detectChanges();
        const next = { north: 20, south: 10, east: -179, west: 179 };

        // act
        setInput(directive.bounds, next);
        fixture.detectChanges();

        // assert
        expect(nativeMap.fitBounds).toHaveBeenLastCalledWith(next, 32);
    });

    it('preserves the server center and zoom when bounds are absent', () => {
        // arrange
        angularMap.googleMap = nativeMap as google.maps.Map;
        const { fixture } = render(null);

        // act
        fixture.detectChanges();

        // assert
        expect(nativeMap.setCenter).not.toHaveBeenCalled();
        expect(nativeMap.setZoom).not.toHaveBeenCalled();
        expect(nativeMap.fitBounds).not.toHaveBeenCalled();
    });

    it('reports settled visible bounds without moving the camera', () => {
        // arrange
        const bounds = { contains: vi.fn() } as unknown as google.maps.LatLngBounds;
        vi.mocked(nativeMap.getBounds).mockReturnValue(bounds);
        angularMap.googleMap = nativeMap as google.maps.Map;
        const { fixture, directive } = render(null);
        const onViewportChanged = vi.fn();
        directive.viewportChanged.subscribe(onViewportChanged);
        fixture.detectChanges();

        // act
        idle.next();

        // assert
        expect(onViewportChanged).toHaveBeenCalledExactlyOnceWith(bounds);
        expect(nativeMap.fitBounds).not.toHaveBeenCalled();
        expect(nativeMap.setCenter).not.toHaveBeenCalled();
        expect(nativeMap.setZoom).not.toHaveBeenCalled();
    });

    it('reports no focus when the map has no visible bounds', () => {
        // arrange
        const { fixture, directive } = render(null);
        const onViewportChanged = vi.fn();
        directive.viewportChanged.subscribe(onViewportChanged);
        fixture.detectChanges();

        // act
        idle.next();

        // assert
        expect(onViewportChanged).toHaveBeenCalledExactlyOnceWith(null);
    });

    it('does not move a map after the overlay template is destroyed', () => {
        // arrange
        const { fixture } = render(BOUNDS);
        fixture.detectChanges();

        // act
        fixture.destroy();
        mapInitialized.next(nativeMap as google.maps.Map);

        // assert
        expect(nativeMap.fitBounds).not.toHaveBeenCalled();
        expect(mapInitialized.observers).toHaveLength(0);
        expect(idle.observers).toHaveLength(0);
    });
});

function render(bounds: google.maps.LatLngBoundsLiteral | null) {
    const fixture = TestBed.createComponent(TestHostComponent);
    const directive = fixture.debugElement.injector.get(MapViewportDirective);
    setInput(directive.bounds, bounds);
    return { fixture, directive };
}

function setInput<TValue>(input: InputSignal<TValue>, value: TValue): void {
    const node = input[SIGNAL];
    node.applyValueToInputSignal(node, value);
}
